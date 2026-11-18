// The HTML control panel (desktop, and phone AR via DOM overlay).
import { KINDS, quatFromAxisAngle, quatMultiply, rotateVec } from '../core/defs.js';
import { compareMetrics, gapAt } from '../core/metrics.js';
import { diffSetups } from '../core/setupDiff.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (v, unit, digits = 2) => (v === null || v === undefined ? '—' : `${v.toFixed(digits)}${unit ? ' ' + unit : ''}`);
const fmtDelta = (v, unit) => (v === null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(2)}${unit ? ' ' + unit : ''}`);

/** Split a rotation into yaw (about Y) and slope (tilt about the object's Z). */
export function yawAndSlope(q) {
  const f = rotateVec(q, [1, 0, 0]);
  const slope = -Math.asin(Math.max(-1, Math.min(1, f[1]))) * 180 / Math.PI;
  const yaw = Math.atan2(-f[2], f[0]) * 180 / Math.PI;
  return { yaw, slope };
}

export class Panel {
  constructor({ root, sim, store, editor, overlay, replay, actions, xrInput }) {
    Object.assign(this, { root, sim, store, editor, overlay, replay, actions, xrInput });
    this.root.innerHTML = this.template();
    this.$ = (sel) => this.root.querySelector(sel);
    this.bind();
    this.refreshAll();
  }

  template() {
    return `
      <section>
        <div class="row spread"><h1>XR Experiment Lab</h1><span class="badge" id="state-badge">Editing</span></div>
        <p class="muted" style="margin:6px 0 0">Build a setup, run it, change something, run again — then compare the two runs in space.</p>
      </section>

      <section class="ar-only">
        <h2>AR placement</h2>
        <div class="row">
          <button type="button" data-act="ar-place">Move lab</button>
          <button type="button" data-act="ar-scale" data-scale="0.35">Tabletop</button>
          <button type="button" data-act="ar-scale" data-scale="1">Life size</button>
        </div>
      </section>

      <section>
        <h2>Build</h2>
        <div class="row">
          ${Object.entries(KINDS).map(([k, v]) => `<button type="button" data-add="${k}">+ ${v.label}</button>`).join('')}
        </div>
        <div class="row" style="margin-top:6px">
          <button type="button" data-act="example">Load ramp example</button>
          <button type="button" data-act="clear-scene" class="danger">Clear scene</button>
        </div>
      </section>

      <section id="inspector"></section>

      <section>
        <h2>Simulate</h2>
        <div class="row">
          <button type="button" class="primary" data-act="run" id="btn-run">▶ Run</button>
          <button type="button" data-act="stop" id="btn-stop">■ Stop</button>
          <button type="button" data-act="reset" id="btn-reset">↺ Back to setup</button>
          <span class="clock" id="clock">0.00 s</span>
        </div>
        <div class="status" id="status"></div>
      </section>

      <section id="compare"></section>

      <section>
        <div class="row spread"><h2>Runs</h2><small id="run-count"></small></div>
        <ul class="runs" id="runs"></ul>
      </section>

      <section>
        <h2>Data</h2>
        <div class="row">
          <button type="button" data-act="export">Export runs (JSON)</button>
          <button type="button" data-act="export-csv">Comparison (CSV)</button>
          <button type="button" data-act="import">Import…</button>
          <button type="button" data-act="clear-runs" class="danger">Clear runs</button>
          <input type="file" id="import-file" accept="application/json,.json" class="hidden">
        </div>
      </section>

      <section class="help">
        <h2>Controls</h2>
        <p><b>Mouse:</b> drag to orbit, scroll to zoom, click an object to select it.</p>
        <p><kbd>W</kbd> move · <kbd>E</kbd> rotate · <kbd>Del</kbd> delete · <kbd>Esc</kbd> deselect</p>
        <p><kbd>Space</kbd> run / stop · <kbd>R</kbd> back to setup · <kbd>P</kbd> play replay · <kbd>←</kbd><kbd>→</kbd> scrub</p>
        <p><b>VR:</b> trigger grabs, grip runs / stops / resets, thumbstick scrubs, A/X plays.</p>
      </section>`;
  }

  bind() {
    this.root.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.add) {
        const id = this.sim.add(btn.dataset.add, this.spawnOverrides(btn.dataset.add));
        this.editor.select(id);
        return;
      }
      this.onAction(btn.dataset.act, btn);
    });

    this.root.addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.prop) this.onPropInput(t);
      if (t.id === 'scrub') { this.replay.playing = false; this.actions.setScrub(parseFloat(t.value)); }
      if (t.id === 'notes') this.store.setNotes(this.store.slots.B, t.value);
    });

    this.root.addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'slotA') this.store.setSlot('A', t.value);
      if (t.name === 'slotB') this.store.setSlot('B', t.value);
      if (t.dataset.rename) this.store.rename(t.dataset.rename, t.value.trim() || 'Untitled run');
      if (t.dataset.opt) this.overlay.setOptions({ [t.dataset.opt]: t.checked });
      if (t.id === 'speed') this.replay.speed = parseFloat(t.value);
      if (t.id === 'import-file' && t.files[0]) this.importFile(t.files[0]);
    });

    // In phone AR, taps on the panel must not also count as taps in the 3D scene.
    this.root.closest('#ui-root')?.addEventListener('beforexrselect', (e) => e.preventDefault());
  }

  spawnOverrides(kind) {
    // Drop new objects near the middle of the lab, slightly staggered.
    const n = this.sim.defs.size;
    const x = -0.2 + (n % 4) * 0.15;
    if (kind === 'ball') return { position: [x, 0.6, -1.2] };
    if (kind === 'box') return { position: [x, 0.3, -1.0] };
    if (kind === 'target') return { position: [0.6 + (n % 3) * 0.1, 0.002, -1.2] };
    return {};
  }

  onAction(act, btn) {
    const { sim, store } = this;
    switch (act) {
      case 'example': sim.loadExample(); this.editor.select('ramp-1'); break;
      case 'clear-scene': sim.load([]); break;
      case 'run': this.actions.run(); break;
      case 'stop': sim.stop(); break;
      case 'reset': sim.reset(); break;
      case 'delete': if (this.editor.selectedId) sim.remove(this.editor.selectedId); break;
      case 'mode-translate': this.editor.setMode('translate'); break;
      case 'mode-rotate': this.editor.setMode('rotate'); break;
      case 'play': this.actions.togglePlay(); break;
      case 'open': {
        const run = store.get(btn.dataset.id);
        if (run) { sim.load(run.setup); sim.snapshot = null; this.actions.toast(`Opened the setup from ${run.name}`); }
        break;
      }
      case 'del-run': store.remove(btn.dataset.id); break;
      case 'swap': store.slots = { A: store.slots.B, B: store.slots.A }; store.changed(); break;
      case 'export': this.download(`experiment-runs-${stamp()}.json`, JSON.stringify(store.toJSON(), null, 1), 'application/json'); break;
      case 'export-csv': this.exportCsv(); break;
      case 'import': this.$('#import-file').click(); break;
      case 'clear-runs':
        if (btn.dataset.confirm) { store.clear(); delete btn.dataset.confirm; btn.textContent = 'Clear runs'; }
        else { btn.dataset.confirm = '1'; btn.textContent = 'Click again to clear'; setTimeout(() => { delete btn.dataset.confirm; btn.textContent = 'Clear runs'; }, 3000); }
        break;
      case 'ar-place': this.xrInput?.startPlacing(); this.actions.toast('Tap a surface to place the lab'); break;
      case 'ar-scale': this.xrInput?.setArScale(parseFloat(btn.dataset.scale)); break;
      default: break;
    }
  }

  onPropInput(t) {
    const id = this.editor.selectedId;
    const def = this.sim.defs.get(id);
    if (!def) return;
    const prop = t.dataset.prop;
    const value = t.type === 'checkbox' ? t.checked : t.type === 'text' ? t.value : parseFloat(t.value);
    const out = t.closest('.slider')?.querySelector('output');
    if (out) out.textContent = t.dataset.unit === '°' ? `${value.toFixed(0)}°` : value.toFixed(2);

    if (prop === 'slope') {
      const { yaw } = yawAndSlope(def.quaternion);
      const q = quatMultiply(quatFromAxisAngle([0, 1, 0], yaw), quatFromAxisAngle([0, 0, 1], -value));
      const position = [...def.position];
      if (def.kind === 'ramp' && this.restsOnFloor(def)) {
        position[1] = (def.size.x / 2) * Math.sin(Math.abs(value) * Math.PI / 180) + (def.size.y / 2) * Math.cos(value * Math.PI / 180);
      }
      this.sim.ensureEditable();
      this.sim.setPose(id, position, q);
      this.editor.refresh();
      return;
    }
    if (prop.startsWith('size.')) {
      const k = prop.slice(5);
      this.sim.update(id, { size: { ...def.size, [k]: value } });
      return;
    }
    if (prop === 'isStatic') {
      this.sim.update(id, { isStatic: value, mass: value ? 0 : (def.mass > 0 ? def.mass : 1) });
      this.renderInspector(true);
      return;
    }
    this.sim.update(id, { [prop]: value });
    if (prop === 'name') this.renderRuns();
  }

  restsOnFloor(def) {
    const { slope } = yawAndSlope(def.quaternion);
    const r = slope * Math.PI / 180;
    const bottom = def.position[1] - ((def.size.x / 2) * Math.sin(Math.abs(r)) + (def.size.y / 2) * Math.cos(r));
    return Math.abs(bottom) < 0.02;
  }

  // ---------- rendering ----------

  refreshAll() {
    this.renderInspector(true);
    this.refreshState();
    this.renderRuns();
    this.renderCompare();
  }

  refreshState() {
    const s = this.sim.state;
    const badge = this.$('#state-badge');
    badge.textContent = { edit: 'Editing', running: 'Recording', review: 'Run finished' }[s];
    badge.className = `badge ${s}`;
    this.$('#btn-run').disabled = s === 'running' || this.sim.defs.size === 0;
    this.$('#btn-stop').disabled = s !== 'running';
    this.$('#btn-reset').disabled = s === 'edit';
    const last = this.sim.lastRun;
    this.$('#status').textContent =
      s === 'edit' ? (this.sim.defs.size ? 'Edit the setup, then press Run. Every run is recorded.' : 'Add objects or load the ramp example.')
      : s === 'running' ? 'Recording this run…'
      : `${last?.name ?? 'Run'} saved (${last?.endReason ?? 'stopped'}). It is now Run B below. Go back to the setup, change something and run again.`;
    this.updateClock();
    this.renderInspector();
  }

  updateClock() {
    const t = this.sim.state === 'edit' ? 0 : this.sim.time;
    this.$('#clock').textContent = `${t.toFixed(2)} s`;
  }

  renderInspector(force = false) {
    const el = this.$('#inspector');
    // Don't rebuild the inspector under the user's pointer mid-drag.
    if (!force && el.contains(document.activeElement) && document.activeElement !== el) return;
    const def = this.sim.defs.get(this.editor.selectedId);
    if (!def) {
      el.innerHTML = `<h2>Inspector</h2><p class="muted" style="margin:0">Click an object to edit it.</p>`;
      return;
    }
    const locked = this.sim.state !== 'edit';
    const slider = (prop, label, min, max, step, value, unit = '') => `
      <div class="slider">
        <label for="p-${prop}">${label}</label>
        <input id="p-${prop}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-prop="${prop}" data-unit="${unit}">
        <output>${unit === '°' ? `${value.toFixed(0)}°` : value.toFixed(2)}</output>
      </div>`;
    const parts = [];
    if (def.kind !== 'target') {
      parts.push(`<label class="check"><input type="checkbox" data-prop="isStatic" ${def.isStatic ? 'checked' : ''}> Fixed in place (does not move)</label>`);
      if (!def.isStatic) parts.push(slider('mass', 'Mass (kg)', 0.05, 5, 0.05, def.mass));
      parts.push(slider('friction', 'Friction', 0, 1, 0.01, def.friction));
      parts.push(slider('restitution', 'Bounciness', 0, 1, 0.01, def.restitution));
      if (def.kind === 'ball') parts.push(slider('drag', 'Rolling drag', 0, 1, 0.01, def.drag));
    }
    if (def.kind === 'ball' || def.kind === 'target') {
      parts.push(slider('size.radius', 'Radius (m)', def.kind === 'ball' ? 0.02 : 0.05, def.kind === 'ball' ? 0.3 : 0.6, 0.005, def.size.radius));
    } else {
      parts.push(slider('size.x', 'Length (m)', 0.04, 2.5, 0.01, def.size.x));
      parts.push(slider('size.y', 'Thickness (m)', 0.02, 1, 0.01, def.size.y));
      parts.push(slider('size.z', 'Width (m)', 0.04, 1.5, 0.01, def.size.z));
      parts.push(slider('slope', 'Slope', -60, 60, 0.5, yawAndSlope(def.quaternion).slope, '°'));
    }
    el.innerHTML = `
      <div class="row spread">
        <h2 style="margin:0">Inspector</h2>
        <div class="row">
          <button type="button" class="small ${this.editor.mode === 'translate' ? 'active' : ''}" data-act="mode-translate" title="Move (W)">Move</button>
          <button type="button" class="small ${this.editor.mode === 'rotate' ? 'active' : ''}" data-act="mode-rotate" title="Rotate (E)">Rotate</button>
          <button type="button" class="small danger" data-act="delete" title="Delete (Del)">Delete</button>
        </div>
      </div>
      <div class="row" style="margin:8px 0 4px">
        <input type="text" data-prop="name" value="${esc(def.name)}" aria-label="Object name" style="flex:1">
        <small>${KINDS[def.kind].label}</small>
      </div>
      ${locked ? '<p class="muted" style="margin:4px 0">Changing a value returns to the setup first.</p>' : ''}
      ${parts.join('')}`;
  }

  /** Update just the current object's slider for slope after gizmo rotation. */
  syncSlope() {
    const def = this.sim.defs.get(this.editor.selectedId);
    const input = this.root.querySelector('[data-prop="slope"]');
    if (!def || !input || document.activeElement === input) return;
    const s = yawAndSlope(def.quaternion).slope;
    input.value = s;
    input.closest('.slider').querySelector('output').textContent = `${s.toFixed(0)}°`;
  }

  renderRuns() {
    const { runs, slots } = this.store;
    this.$('#run-count').textContent = runs.length ? `${runs.length} saved` : '';
    const list = this.$('#runs');
    if (!runs.length) {
      list.innerHTML = '<li class="muted">No runs yet. Press Run to record one.</li>';
      return;
    }
    list.innerHTML = [...runs].reverse().map((r) => {
      const m = r.metrics?.tracks[r.metrics.primaryId];
      const summary = [`${r.duration.toFixed(2)} s`];
      if (m?.finalDistance != null) summary.push(m.endsInTarget ? 'ends in target' : `${(m.finalDistance * 100).toFixed(0)} cm from target`);
      const cls = [slots.A === r.id ? 'is-a' : '', slots.B === r.id ? 'is-b' : ''].join(' ');
      return `
        <li class="run ${cls}">
          <label class="slot a" title="Compare as Run A"><input type="radio" name="slotA" value="${r.id}" ${slots.A === r.id ? 'checked' : ''}>A</label>
          <label class="slot b" title="Compare as Run B"><input type="radio" name="slotB" value="${r.id}" ${slots.B === r.id ? 'checked' : ''}>B</label>
          <div><input type="text" value="${esc(r.name)}" data-rename="${r.id}" aria-label="Run name"><small>${summary.join(' · ')}</small></div>
          <button type="button" class="small" data-act="open" data-id="${r.id}" title="Reopen the setup this run started from">Open</button>
          <button type="button" class="small danger" data-act="del-run" data-id="${r.id}" aria-label="Delete ${esc(r.name)}">×</button>
        </li>`;
    }).join('');
  }

  renderCompare() {
    const el = this.$('#compare');
    const { A, B } = this.store.slotRuns();
    if (!A && !B) {
      el.innerHTML = `<h2>Compare</h2><p class="muted" style="margin:0">Record two runs to compare them. The newest run becomes B and the one before it A.</p>`;
      return;
    }
    const primary = (B || A).metrics.primaryId;
    const rows = compareMetrics(A?.metrics, B?.metrics, primary);
    const primaryName = (B || A).setup.find((d) => d.id === primary)?.name ?? 'object';
    const changes = A && B ? diffSetups(A.setup, B.setup) : [];
    const o = this.overlay.options;
    const dur = this.overlay.duration();
    el.innerHTML = `
      <div class="row spread"><h2 style="margin:0">Compare</h2><button type="button" class="small" data-act="swap" title="Swap A and B">⇄ Swap</button></div>
      <div class="legend" style="margin-top:8px">
        <div class="a" title="${esc(A?.name ?? '')}">A · ${esc(A?.name ?? '—')}</div>
        <div class="b" title="${esc(B?.name ?? '')}">B · ${esc(B?.name ?? '—')}</div>
      </div>
      <div class="row">
        <label class="check"><input type="checkbox" data-opt="paths" ${o.paths ? 'checked' : ''}> Paths</label>
        <label class="check"><input type="checkbox" data-opt="ghosts" ${o.ghosts ? 'checked' : ''}> Ghosts</label>
        <label class="check"><input type="checkbox" data-opt="setups" ${o.setups ? 'checked' : ''}> Setups</label>
      </div>
      <div class="scrub">
        <button type="button" class="small" data-act="play" id="btn-play" aria-label="Play replay">▶</button>
        <input type="range" id="scrub" min="0" max="${dur}" step="${1 / 120}" value="${this.replay.time}" aria-label="Replay time">
        <output id="scrub-out"></output>
      </div>
      <div class="row spread">
        <span class="gap" id="gap"></span>
        <label class="muted" style="font-size:13px">Speed <select id="speed">
          ${[0.1, 0.25, 0.5, 1, 2].map((s) => `<option value="${s}" ${this.replay.speed === s ? 'selected' : ''}>${s}×</option>`).join('')}
        </select></label>
      </div>
      <table class="metrics">
        <thead><tr><th>${esc(primaryName)}</th><th class="a">A</th><th class="b">B</th><th>B − A</th></tr></thead>
        <tbody>
          ${rows.map((r) => `<tr><td>${r.label}</td>
            <td class="${r.winner === 'A' ? 'win-a' : ''}">${fmt(r.a, r.unit)}</td>
            <td class="${r.winner === 'B' ? 'win-b' : ''}">${fmt(r.b, r.unit)}</td>
            <td>${fmtDelta(r.delta, r.unit)}</td></tr>`).join('')}
        </tbody>
      </table>
      ${A && B ? `<h2 style="margin-top:12px">What changed from A to B</h2>
        ${changes.length ? `<ul class="changes">${changes.map((c) => `<li>${esc(c.text)}</li>`).join('')}</ul>`
          : '<p class="muted" style="margin:0">Same setup. The runs should match exactly, because the simulation is deterministic.</p>'}` : ''}
      ${B ? `<h2 style="margin-top:12px">Notes for ${esc(B.name)}</h2>
        <textarea id="notes" placeholder="What did you change, and what did you expect to happen?">${esc(B.notes || '')}</textarea>` : ''}`;
    this.updateScrub();
  }

  updateScrub() {
    const scrub = this.$('#scrub');
    if (!scrub) return;
    const dur = this.overlay.duration();
    if (document.activeElement !== scrub) scrub.value = this.replay.time;
    this.$('#scrub-out').textContent = `${this.replay.time.toFixed(2)} / ${dur.toFixed(2)} s`;
    this.$('#btn-play').textContent = this.replay.playing ? '❚❚' : '▶';
    this.$('#btn-play').setAttribute('aria-label', this.replay.playing ? 'Pause replay' : 'Play replay');
    const { A, B } = this.store.slotRuns();
    const id = (B || A)?.metrics.primaryId;
    const gap = A && B ? gapAt(A, B, id, this.replay.time) : null;
    this.$('#gap').textContent = gap === null ? '' : `Gap between A and B at this moment: ${(gap * 100).toFixed(1)} cm`;
  }

  // ---------- data ----------

  download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  exportCsv() {
    const header = ['run_id', 'run_name', 'created_at', 'duration_s', 'end_reason', 'object', 'final_distance_m', 'min_distance_m',
      'hit_time_s', 'max_speed_mps', 'path_length_m', 'time_to_rest_s', 'ends_in_target', 'notes'];
    const lines = [header.join(',')];
    for (const r of this.store.runs) {
      for (const [id, m] of Object.entries(r.metrics.tracks)) {
        const name = r.setup.find((d) => d.id === id)?.name ?? id;
        const cells = [r.id, r.name, r.createdAt, r.duration.toFixed(3), r.endReason, name, m.finalDistance, m.minDistance,
          m.hitTime, m.maxSpeed, m.pathLength, m.timeToRest, m.endsInTarget, r.notes || '']
          .map((v) => (typeof v === 'number' ? v.toFixed(4) : v === null || v === undefined ? '' : `"${String(v).replace(/"/g, '""')}"`));
        lines.push(cells.join(','));
      }
    }
    this.download(`experiment-runs-${stamp()}.csv`, lines.join('\n'), 'text/csv');
  }

  async importFile(file) {
    try {
      this.store.loadJSON(JSON.parse(await file.text()), { replace: false });
      this.actions.toast(`Imported runs from ${file.name}`);
    } catch (err) {
      this.actions.toast(`Could not import: ${err.message}`);
    }
    this.$('#import-file').value = '';
  }
}

function stamp() {
  return new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
}
