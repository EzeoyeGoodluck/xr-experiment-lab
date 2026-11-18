// The HTML control panel (desktop, and phone AR via DOM overlay).
import { KINDS, EXAMPLES, CONSTRAINT_KINDS, isConstraint, isObject } from '../core/defs.js';
import { compareMetrics, gapAt } from '../core/metrics.js';
import { diffSetups } from '../core/setupDiff.js';
import { fieldsFor, formatField, applyField, currentSpringLength } from './fields.js';
import { graphData } from './graphModel.js';
import { PanelGraph } from '../view/graph.js';
import { VELOCITY_COLOR, FORCE_COLOR } from '../view/arrows.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (v, unit, digits = 2) => (v === null || v === undefined ? '—' : `${v.toFixed(digits)}${unit ? ' ' + unit : ''}`);
const fmtDelta = (v, unit) => (v === null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(2)}${unit ? ' ' + unit : ''}`);
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;

export class Panel {
  constructor({ root, app }) {
    this.root = root;
    this.app = app;
    this.root.innerHTML = this.template();
    this.$ = (sel) => this.root.querySelector(sel);
    this.graph = new PanelGraph(this.$('#graph'), {
      onScrub: (t) => { app.replay.playing = false; app.actions.setScrub(t); },
    });
    this.bind();
    this.refreshAll();
  }

  get sim() { return this.app.sim; }
  get store() { return this.app.store; }
  get editor() { return this.app.editor; }

  template() {
    return `
      <section>
        <div class="row spread"><h1>XR Experiment Lab</h1><span class="badge" id="state-badge">Editing</span></div>
        <p class="muted" style="margin:6px 0 0">Build a setup, run it, change something, run again, then compare the two runs in space.</p>
        <p class="notice hidden" id="notice" role="alert"></p>
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
          <button type="button" data-connect="spring" title="Then click two objects">⌇ Spring</button>
          <button type="button" data-connect="hinge" title="Then click two objects">⦿ Hinge</button>
          <button type="button" data-act="cancel-connect" id="btn-cancel-connect" class="hidden">Cancel</button>
        </div>
        <p class="prompt hidden" id="connect-prompt" role="status"></p>
        <div class="row" style="margin-top:6px">
          <label class="muted" for="example">Example</label>
          <select id="example">${Object.entries(EXAMPLES).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</select>
          <button type="button" data-act="example">Load</button>
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
        <div class="row spread"><h2 style="margin:0" id="graph-title">Graph</h2>
          <select id="graph-kind" aria-label="Quantity to graph"></select></div>
        <canvas id="graph" class="graph" aria-label="Graph of the selected quantity over time for Run A, Run B and the live run"></canvas>
        <div class="row legend-row"><span class="key a">Run A</span><span class="key b">Run B</span><span class="key live">Live run</span>
          <small>Drag on the graph to scrub.</small></div>
      </section>

      <section>
        <div class="row spread"><h2 style="margin:0">Runs</h2><small id="run-count"></small></div>
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

      <section>
        <details id="diagnostics">
          <summary><h2 style="display:inline">Diagnostics &amp; study tools</h2></summary>
          <dl class="diag" id="diag"></dl>
          <div class="row" style="margin-top:6px">
            <button type="button" data-act="benchmark">Run physics benchmark</button>
            <button type="button" data-act="export-perf">Performance log (CSV)</button>
          </div>
          <pre class="bench hidden" id="bench"></pre>
          <h2 style="margin-top:12px">User-study log</h2>
          <p class="muted" style="margin:0 0 6px">Records actions with timestamps (no personal data). Label is optional, e.g. P01.</p>
          <div class="row">
            <input type="text" id="participant" placeholder="Participant label" aria-label="Participant label" style="width:150px">
            <button type="button" data-act="log-reset">Start new log</button>
            <button type="button" data-act="export-log">Download log (CSV)</button>
          </div>
          <small id="log-count"></small>
        </details>
      </section>

      <section class="help">
        <h2>Controls</h2>
        <p><b>Mouse:</b> drag to orbit, scroll to zoom, click an object to select it.</p>
        <p><kbd>W</kbd> move · <kbd>E</kbd> rotate · <kbd>Del</kbd> delete · <kbd>Esc</kbd> deselect / cancel</p>
        <p><kbd>Space</kbd> run / stop · <kbd>R</kbd> back to setup · <kbd>P</kbd> play replay · <kbd>←</kbd><kbd>→</kbd> scrub</p>
        <p><b>VR:</b> point and pull the trigger to use the floating panel, select or grab objects. Grip runs / stops / resets, thumbstick scrubs, A/X plays, B/Y hides the panel.</p>
        <p><b>No headset?</b> Add <code>?emulate=quest3</code> to the address to try VR with an emulated Quest 3.</p>
      </section>`;
  }

  bind() {
    const a = this.app;
    this.root.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.add) { a.actions.spawn(btn.dataset.add); return; }
      if (btn.dataset.connect) { this.editor.beginConnect(btn.dataset.connect); return; }
      if (btn.dataset.choice) { this.onField(btn.dataset.field, btn.dataset.choice); this.renderInspector(true); return; }
      this.onAction(btn.dataset.act, btn);
    });

    this.root.addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.field) this.onField(t.dataset.field, t.type === 'checkbox' ? t.checked : parseFloat(t.value), t);
      if (t.dataset.name) this.sim.update(this.editor.selectedId, { name: t.value });
      if (t.id === 'scrub') { a.replay.playing = false; a.actions.setScrub(parseFloat(t.value)); }
      if (t.id === 'notes') this.store.setNotes(this.store.slots.B, t.value);
    });

    this.root.addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'slotA') this.store.setSlot('A', t.value);
      if (t.name === 'slotB') this.store.setSlot('B', t.value);
      if (t.dataset.rename) this.store.rename(t.dataset.rename, t.value.trim() || 'Untitled run');
      if (t.dataset.opt) a.actions.setOverlayOption(t.dataset.opt, t.checked);
      if (t.id === 'speed') a.replay.speed = parseFloat(t.value);
      if (t.id === 'graph-kind') a.actions.setGraphKind(t.value);
      if (t.dataset.name) this.renderRuns();
      if (t.id === 'import-file' && t.files[0]) this.importFile(t.files[0]);
    });

    // In phone AR, taps on the panel must not also count as taps in the 3D scene.
    this.root.closest('#ui-root')?.addEventListener('beforexrselect', (e) => e.preventDefault());
  }

  onField(key, value, input) {
    const id = this.editor.selectedId;
    const def = this.sim.defs.get(id);
    if (!def) return;
    const field = fieldsFor(def).find((f) => f.key === key);
    const out = input?.closest('.slider')?.querySelector('output');
    if (out && field) out.textContent = formatField(field, value);
    const structural = applyField(this.sim, id, key, value);
    this.app.log('edit', { id, field: key, value });
    if (structural) this.renderInspector(true);
  }

  onAction(act, btn) {
    const { sim, store, app } = this;
    switch (act) {
      case 'example': app.actions.loadExample(this.$('#example').value); break;
      case 'clear-scene': app.actions.clearScene(); break;
      case 'run': app.actions.run(); break;
      case 'stop': sim.stop(); break;
      case 'reset': sim.reset(); break;
      case 'cancel-connect': this.editor.cancelConnect(); break;
      case 'delete': app.actions.deleteSelected(); break;
      case 'hook-spring': this.editor.connectSelectedToHook('spring'); break;
      case 'hook-hinge': this.editor.connectSelectedToHook('hinge'); break;
      case 'rest-now': {
        const def = sim.defs.get(this.editor.selectedId);
        const len = currentSpringLength(sim, def);
        if (len) { sim.update(def.id, { restLength: +len.toFixed(3) }); this.renderInspector(true); }
        break;
      }
      case 'mode-translate': this.editor.setMode('translate'); break;
      case 'mode-rotate': this.editor.setMode('rotate'); break;
      case 'play': app.actions.togglePlay(); break;
      case 'open': {
        const run = store.get(btn.dataset.id);
        if (run) { sim.load(run.setup); sim.snapshot = null; app.actions.toast(`Opened the setup from ${run.name}`); app.log('open-setup', { id: run.id }); }
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
      case 'ar-place': app.xrInput.startPlacing(); app.actions.toast('Tap a surface to place the lab'); break;
      case 'ar-scale': app.xrInput.setArScale(parseFloat(btn.dataset.scale)); break;
      case 'benchmark': this.runBenchmark(); break;
      case 'export-perf': this.download(`performance-${stamp()}.csv`, app.perf.csv(), 'text/csv'); break;
      case 'log-reset': app.interactionLog.reset(this.$('#participant').value.trim()); this.updateDiagnostics(); app.actions.toast('New study log started'); break;
      case 'export-log': this.download(`interaction-log-${app.interactionLog.label || 'session'}-${stamp()}.csv`, app.interactionLog.csv(), 'text/csv'); break;
      default: break;
    }
  }

  // ---------- rendering ----------

  refreshAll() {
    this.renderInspector(true);
    this.refreshState();
    this.renderRuns();
    this.renderCompare();
    this.renderConnect();
  }

  notice(text) {
    const el = this.$('#notice');
    el.textContent = text || '';
    el.classList.toggle('hidden', !text);
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
      s === 'edit' ? (this.sim.defs.size ? 'Edit the setup, then press Run. Every run is recorded.' : 'Add objects or load an example.')
      : s === 'running' ? 'Recording this run…'
      : `${last?.name ?? 'Run'} saved (${last?.endReason ?? 'stopped'}). It is now Run B. Go back to the setup, change something and run again.`;
    this.updateClock();
    this.renderInspector();
  }

  updateClock() {
    const t = this.sim.state === 'edit' ? 0 : this.sim.time;
    this.$('#clock').textContent = `${t.toFixed(2)} s`;
  }

  renderConnect(message = null) {
    const prompt = this.$('#connect-prompt');
    const text = message || this.editor.connectPrompt();
    prompt.textContent = text;
    prompt.classList.toggle('hidden', !text);
    this.$('#btn-cancel-connect').classList.toggle('hidden', !this.editor.connecting);
    for (const b of this.root.querySelectorAll('[data-connect]')) b.classList.toggle('active', this.editor.connecting?.kind === b.dataset.connect);
  }

  renderInspector(force = false) {
    const el = this.$('#inspector');
    // Don't rebuild the inspector under the user's pointer mid-drag.
    if (!force && el.contains(document.activeElement) && document.activeElement !== el) return;
    const def = this.sim.defs.get(this.editor.selectedId);
    if (!def) {
      el.innerHTML = `<h2>Inspector</h2><p class="muted" style="margin:0">Click an object, spring or hinge to edit it.</p>`;
      return;
    }
    const locked = this.sim.state !== 'edit';
    const kindLabel = (KINDS[def.kind] || CONSTRAINT_KINDS[def.kind]).label;
    const controls = fieldsFor(def).map((f) => {
      if (f.type === 'slider') return `
        <div class="slider">
          <label for="f-${f.key}">${f.label}</label>
          <input id="f-${f.key}" type="range" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.value}" data-field="${f.key}">
          <output>${formatField(f)}</output>
        </div>`;
      if (f.type === 'toggle') return `<label class="check"><input type="checkbox" data-field="${f.key}" ${f.value ? 'checked' : ''}> ${f.label} (does not move)</label>`;
      if (f.type === 'choice') return `<div class="row" style="margin:6px 0"><span class="muted" style="width:92px">${f.label}</span>
        ${f.options.map((o) => `<button type="button" class="small ${f.value === o ? 'active' : ''}" data-field="${f.key}" data-choice="${o}">${o.toUpperCase()}</button>`).join('')}</div>`;
      return '';
    }).join('');
    const extra = [];
    if (isObject(def) && def.kind !== 'target') {
      const n = this.sim.connectionsOf(def.id).length;
      extra.push(`<div class="row" style="margin-top:6px">
        <button type="button" class="small" data-act="hook-spring" title="Add a fixed hook above and a spring to it">Hang on spring</button>
        <button type="button" class="small" data-act="hook-hinge" title="Add a fixed hook and a hinge (pendulum)">Hang on hinge</button>
        ${n ? `<small>${n} connection${n > 1 ? 's' : ''}</small>` : ''}</div>`);
    }
    if (def.kind === 'spring') {
      const len = currentSpringLength(this.sim, def);
      extra.push(`<div class="row" style="margin-top:6px"><button type="button" class="small" data-act="rest-now">Set rest length to current (${len?.toFixed(2)} m)</button></div>`);
    }
    const ends = isConstraint(def) ? `<p class="muted" style="margin:2px 0 6px">${esc(this.sim.defs.get(def.a)?.name ?? def.a)} ↔ ${esc(this.sim.defs.get(def.b)?.name ?? def.b)}</p>` : '';
    el.innerHTML = `
      <div class="row spread">
        <h2 style="margin:0">Inspector</h2>
        <div class="row">
          ${isObject(def) ? `
          <button type="button" class="small ${this.editor.mode === 'translate' ? 'active' : ''}" data-act="mode-translate" title="Move (W)">Move</button>
          <button type="button" class="small ${this.editor.mode === 'rotate' ? 'active' : ''}" data-act="mode-rotate" title="Rotate (E)">Rotate</button>` : ''}
          <button type="button" class="small danger" data-act="delete" title="Delete (Del)">Delete</button>
        </div>
      </div>
      <div class="row" style="margin:8px 0 4px">
        <input type="text" data-name="1" value="${esc(def.name)}" aria-label="Name" style="flex:1">
        <small>${kindLabel}</small>
      </div>
      ${ends}
      ${locked ? '<p class="muted" style="margin:4px 0">Changing a value returns to the setup first.</p>' : ''}
      ${controls}
      ${extra.join('')}`;
  }

  /** Keep the slope slider in step with gizmo rotation. */
  syncSlope() {
    const def = this.sim.defs.get(this.editor.selectedId);
    const input = this.root.querySelector('[data-field="slope"]');
    if (!def || !input || document.activeElement === input) return;
    const f = fieldsFor(def).find((x) => x.key === 'slope');
    input.value = f.value;
    input.closest('.slider').querySelector('output').textContent = formatField(f);
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
      this.drawGraph();
      return;
    }
    const primary = (B || A).metrics.primaryId;
    const rows = compareMetrics(A?.metrics, B?.metrics, primary);
    const primaryName = (B || A).setup.find((d) => d.id === primary)?.name ?? 'object';
    const changes = A && B ? diffSetups(A.setup, B.setup) : [];
    const o = this.app.overlay.options;
    const dur = this.app.overlay.duration();
    const opt = (k, label, extra = '') => `<label class="check"><input type="checkbox" data-opt="${k}" ${o[k] ? 'checked' : ''}> ${label}${extra}</label>`;
    el.innerHTML = `
      <div class="row spread"><h2 style="margin:0">Compare</h2><button type="button" class="small" data-act="swap" title="Swap A and B">⇄ Swap</button></div>
      <div class="legend" style="margin-top:8px">
        <div class="a" title="${esc(A?.name ?? '')}">A · ${esc(A?.name ?? '—')}</div>
        <div class="b" title="${esc(B?.name ?? '')}">B · ${esc(B?.name ?? '—')}</div>
      </div>
      <div class="row">
        ${opt('paths', 'Paths')}${opt('ghosts', 'Ghosts')}${opt('setups', 'Setups')}${opt('impacts', 'Hits')}
        ${opt('arrows', 'Arrows', ` <span class="swatch" style="background:${hex(VELOCITY_COLOR)}" title="velocity"></span><span class="swatch" style="background:${hex(FORCE_COLOR)}" title="contact force"></span>`)}
      </div>
      <div class="scrub">
        <button type="button" class="small" data-act="play" id="btn-play" aria-label="Play replay">▶</button>
        <input type="range" id="scrub" min="0" max="${dur}" step="${1 / 120}" value="${this.app.replay.time}" aria-label="Replay time">
        <output id="scrub-out"></output>
      </div>
      <div class="row spread">
        <span class="gap" id="gap"></span>
        <label class="muted" style="font-size:13px">Speed <select id="speed">
          ${[0.1, 0.25, 0.5, 1, 2].map((s) => `<option value="${s}" ${this.app.replay.speed === s ? 'selected' : ''}>${s}×</option>`).join('')}
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
    this.drawGraph();
    const scrub = this.$('#scrub');
    if (!scrub) return;
    const dur = this.app.overlay.duration();
    if (document.activeElement !== scrub) scrub.value = this.app.replay.time;
    this.$('#scrub-out').textContent = `${this.app.replay.time.toFixed(2)} / ${dur.toFixed(2)} s`;
    const play = this.$('#btn-play');
    play.textContent = this.app.replay.playing ? '❚❚' : '▶';
    play.setAttribute('aria-label', this.app.replay.playing ? 'Pause replay' : 'Play replay');
    const { A, B } = this.store.slotRuns();
    const id = (B || A)?.metrics.primaryId;
    const gap = A && B ? gapAt(A, B, id, this.app.replay.time) : null;
    this.$('#gap').textContent = gap === null ? '' : `Gap between A and B at this moment: ${(gap * 100).toFixed(1)} cm`;
  }

  drawGraph() {
    const data = graphData(this.app);
    this.$('#graph-title').textContent = data.kind ? `Graph · ${data.subjectName}` : 'Graph';
    const sel = this.$('#graph-kind');
    const key = data.kinds.join(',');
    if (sel.dataset.kinds !== key) {
      sel.innerHTML = data.kinds.map((k) => `<option value="${k}">${esc(graphLabel(k))}</option>`).join('');
      sel.dataset.kinds = key;
    }
    if (data.kind && sel.value !== data.kind) sel.value = data.kind;
    sel.disabled = data.kinds.length < 2;
    this.graph.draw({ ...data, unit: data.unit });
  }

  updateDiagnostics() {
    const d = this.$('#diagnostics');
    if (!d.open) return;
    const s = this.app.perf.stats();
    const st = this.app.status;
    const xr = this.app.stage.xr.support;
    const rows = [
      ['Mode', this.app.stage.mode],
      ['Frame rate', s ? `${s.fps.toFixed(0)} fps (budget ${s.budgetMs.toFixed(1)} ms)` : '—'],
      ['Frame time', s ? `avg ${s.frameAvgMs.toFixed(1)} · p95 ${s.frameP95Ms.toFixed(1)} · max ${s.frameMaxMs.toFixed(0)} ms` : '—'],
      ['Over budget', s ? `${s.overBudgetPct.toFixed(1)} % of frames` : '—'],
      ['Physics / render', s ? `${s.physicsAvgMs.toFixed(2)} / ${s.renderAvgMs.toFixed(2)} ms per frame` : '—'],
      ['Recording', `${(this.app.recordingBytes() / 1024).toFixed(0)} KB in ${this.store.runs.length} runs`],
      ['WebXR', `${xr.api ? 'available' : 'not available'}${xr.secure ? '' : ' (page not secure)'} · VR ${xr.vr ? 'yes' : 'no'} · AR ${xr.ar ? 'yes' : 'no'}${this.app.emulated ? ' · emulated Quest 3' : ''}`],
      ['Session', st.trackingLost ? 'tracking lost (paused)' : st.hidden ? 'hidden (paused)' : this.app.stage.xr.session ? `running${this.app.stage.xr.floorFallback ? ', floor height assumed' : ''}` : '—'],
      ['Storage', this.store.storage ? 'saving runs in this browser' : 'not available: export to keep runs'],
    ];
    this.$('#diag').innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
    this.$('#log-count').textContent = `${this.app.interactionLog.events.length} events logged${this.app.interactionLog.label ? ` for ${this.app.interactionLog.label}` : ''}`;
  }

  runBenchmark() {
    const out = this.$('#bench');
    out.classList.remove('hidden');
    out.textContent = 'Running…';
    setTimeout(() => {
      const res = this.app.actions.benchmark();
      out.textContent = ['example     ms/step  × real time', ...res.map((r) =>
        `${r.example.padEnd(11)} ${r.msPerStep.toFixed(3).padStart(7)}  ${r.realtimeFactor.toFixed(0).padStart(6)}×`)].join('\n');
    }, 30);
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
      this.app.actions.toast(`Imported runs from ${file.name}`);
    } catch (err) {
      this.app.actions.toast(`Could not import: ${err.message}`);
    }
    this.$('#import-file').value = '';
  }
}

function graphLabel(k) {
  return { speed: 'Speed', height: 'Height', distance: 'Distance to target', stretch: 'Spring stretch', force: 'Spring force', angle: 'Hinge angle' }[k] || k;
}

function stamp() {
  return new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
}
