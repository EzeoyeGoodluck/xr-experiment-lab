// The in-headset editor: a floating panel with Build / Inspect / Compare /
// Info pages, so a whole experiment can be built, run and compared without
// taking the headset off. Operated with controller rays + trigger.
import * as THREE from 'three';
import { CanvasPanel, Layout, THEME, roundRect } from '../view/vrPanel.js';
import { drawGraph } from '../view/graph.js';
import { RUN_CSS } from '../view/overlay.js';
import { KINDS, EXAMPLES, CONSTRAINT_KINDS, isObject, isConstraint } from '../core/defs.js';
import { compareMetrics } from '../core/metrics.js';
import { fieldsFor, formatField, applyField, currentSpringLength } from './fields.js';
import { graphData, nextKind } from './graphModel.js';

const PAGES = [['build', 'Build'], ['inspect', 'Inspect'], ['compare', 'Compare'], ['info', 'Info']];
const W = 1024;
const ASPECT = 0.9;
const H = Math.round(W * ASPECT);
const ROW = 64;

export class VRMenu {
  constructor(app) {
    this.app = app;
    this.panel = new CanvasPanel({ widthM: 0.62, px: W, aspect: ASPECT });
    this.panel.mesh.visible = false;
    app.stage.scene.add(this.panel.mesh);
    this.page = 'build';
    this.visible = false;
    this.rebuildTimer = 0;
    this.message = '';
    this.messageTimer = 0;
  }

  get mesh() { return this.panel.mesh; }

  show(v = true) {
    this.visible = v;
    this.panel.mesh.visible = v;
    if (v) this.rebuild();
  }

  toggle() {
    if (this.visible) this.show(false);
    else { this.place(); this.show(true); }
  }

  /** Float the panel at your left side, angled towards you, clear of the bench in front. */
  place() {
    const cam = this.app.stage.renderer.xr.getCamera();
    const head = new THREE.Vector3(), q = new THREE.Quaternion();
    cam.getWorldPosition(head);
    cam.getWorldQuaternion(q);
    // Until the headset reports a pose the camera sits at the origin: wait, or the
    // panel would be placed on (or under) the floor.
    if (!this.app.stage.renderer.xr.isPresenting || head.lengthSq() < 1e-6 || this.app.status.trackingLost) {
      this.pendingPlace = true;
      return;
    }
    this.pendingPlace = false;
    const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(q).setY(0);
    if (fwd.lengthSq() < 1e-4) fwd.set(0, 0, -1);
    fwd.normalize();
    const left = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), fwd).normalize();
    const pos = head.clone().addScaledVector(fwd, 0.38).addScaledVector(left, 0.5);
    pos.y = head.y - 0.25;
    this.panel.mesh.position.copy(pos);
    this.panel.mesh.lookAt(head.x, pos.y + 0.05, head.z);
  }

  say(text) {
    this.message = text;
    this.messageTimer = 3;
    this.rebuild();
  }

  update(dt) {
    if (!this.visible) return;
    if (this.pendingPlace) this.place();
    this.messageTimer = Math.max(0, this.messageTimer - dt);
    if (this.messageTimer === 0 && this.message) { this.message = ''; this.rebuild(); }
    this.rebuildTimer += dt;
    // Rebuild a few times a second (state, values, graphs), and immediately on interaction.
    const dragging = [...this.panel.pointers.values()].some((p) => p.dragging);
    if (this.rebuildTimer > 0.12 && !dragging) this.rebuild();
    this.panel.draw();
  }

  rebuild() {
    this.rebuildTimer = 0;
    this.panel.setWidgets(this.build());
  }

  // ---------- page building ----------

  build() {
    const a = this.app;
    const w = [];
    const L = new Layout(W, { pad: 28, gap: 12, top: 24 });

    const [title, status] = L.row(48, [1, 1]);
    w.push({ type: 'label', rect: title, text: 'XR Experiment Lab', bold: true, size: 32 });
    const stateText = { edit: 'Editing', running: 'Recording', review: 'Run finished' }[a.sim.state];
    w.push({ type: 'label', rect: status, align: 'right', size: 28, color: a.sim.state === 'running' ? '#fca5a5' : THEME.muted,
      text: `${stateText} · ${(a.sim.state === 'edit' ? 0 : a.sim.time).toFixed(2)} s` });

    const tabs = L.row(ROW, PAGES.map(() => 1));
    PAGES.forEach(([id, label], i) => w.push({ type: 'button', rect: tabs[i], text: label, active: this.page === id,
      onClick: () => { this.page = id; this.rebuild(); } }));
    L.space(6);

    const content = { build: () => this.buildPage(L, w), inspect: () => this.inspectPage(L, w),
      compare: () => this.comparePage(L, w), info: () => this.infoPage(L, w) }[this.page];
    content();

    // Footer: run controls and prompts, always visible.
    const F = new Layout(W, { pad: 28, gap: 12, top: H - 24 - ROW - 50 });
    const prompt = a.editor.connectPrompt() || this.message;
    w.push({ type: 'label', rect: F.full(38), text: prompt, color: prompt ? '#fde68a' : THEME.muted, size: 26 });
    const [run, stop, reset] = F.row(ROW, [1, 1, 1]);
    w.push({ type: 'button', rect: run, text: '▶ Run', active: true, color: '#4b57b8', disabled: a.sim.state === 'running', onClick: () => a.actions.run() });
    w.push({ type: 'button', rect: stop, text: '■ Stop', disabled: a.sim.state !== 'running', onClick: () => a.sim.stop() });
    w.push({ type: 'button', rect: reset, text: '↺ Back to setup', disabled: a.sim.state === 'edit', onClick: () => a.sim.reset() });
    return w;
  }

  heading(L, w, text) {
    w.push({ type: 'label', rect: L.full(34), text, color: THEME.muted, size: 24, bold: true });
  }

  buildPage(L, w) {
    const a = this.app;
    this.heading(L, w, 'ADD — appears in front of you');
    const kinds = Object.keys(KINDS);
    L.row(ROW, kinds.map(() => 1)).forEach((r, i) => w.push({ type: 'button', rect: r, text: `+ ${KINDS[kinds[i]].label}`,
      onClick: () => a.actions.spawn(kinds[i], { nearUser: true }) }));
    this.heading(L, w, 'EXAMPLES');
    const ex = Object.keys(EXAMPLES);
    L.row(ROW, ex.map(() => 1)).forEach((r, i) => w.push({ type: 'button', rect: r, text: EXAMPLES[ex[i]].label, size: 25,
      onClick: () => a.actions.loadExample(ex[i]) }));
    this.heading(L, w, 'CONNECT — then point at two objects');
    const c = a.editor.connecting;
    const [sp, hi, cancel] = L.row(ROW, [1, 1, 1]);
    w.push({ type: 'button', rect: sp, text: 'Spring', active: c?.kind === 'spring', onClick: () => a.editor.beginConnect('spring') });
    w.push({ type: 'button', rect: hi, text: 'Hinge', active: c?.kind === 'hinge', onClick: () => a.editor.beginConnect('hinge') });
    w.push({ type: 'button', rect: cancel, text: 'Cancel', disabled: !c, onClick: () => a.editor.cancelConnect() });
    const sel = a.sim.defs.get(a.editor.selectedId);
    const canHook = isObject(sel) && sel.kind !== 'target';
    const [hs, hh] = L.row(ROW, [1, 1]);
    w.push({ type: 'button', rect: hs, text: 'Hang selected on spring', disabled: !canHook, size: 25, onClick: () => a.editor.connectSelectedToHook('spring') });
    w.push({ type: 'button', rect: hh, text: 'Hang selected on hinge', disabled: !canHook, size: 25, onClick: () => a.editor.connectSelectedToHook('hinge') });
    L.space(4);
    w.push({ type: 'button', rect: L.row(ROW, [1, 2])[0], text: 'Clear scene', danger: true, onClick: () => a.actions.clearScene() });
  }

  inspectPage(L, w) {
    const a = this.app;
    const def = a.sim.defs.get(a.editor.selectedId);
    if (!def) {
      w.push({ type: 'label', rect: L.full(48), text: 'Point at an object or connection and pull the trigger.', color: THEME.muted });
      w.push({ type: 'label', rect: L.full(48), text: 'Hold the trigger on an object to grab and move it.', color: THEME.muted });
      return;
    }
    const kindLabel = (KINDS[def.kind] || CONSTRAINT_KINDS[def.kind]).label;
    const [name, del, desel] = L.row(ROW, [2.2, 1, 1]);
    w.push({ type: 'label', rect: name, text: `${def.name} (${kindLabel})`, bold: true, size: 30 });
    w.push({ type: 'button', rect: del, text: 'Delete', danger: true, onClick: () => a.actions.deleteSelected() });
    w.push({ type: 'button', rect: desel, text: 'Deselect', onClick: () => a.editor.select(null) });
    if (isConstraint(def)) {
      const ends = [def.a, def.b].map((id) => a.sim.defs.get(id)?.name ?? id).join(' ↔ ');
      w.push({ type: 'label', rect: L.full(36), text: ends, color: THEME.muted, size: 25 });
    }
    for (const f of fieldsFor(def)) {
      if (f.type === 'slider') {
        w.push({ type: 'slider', rect: L.full(ROW - 6), label: f.label, min: f.min, max: f.max, step: f.step, value: f.value,
          format: (v) => formatField(f, v), onChange: (v) => { applyField(a.sim, def.id, f.key, v); a.log('edit', { id: def.id, field: f.key, value: v }); } });
      } else if (f.type === 'toggle') {
        w.push({ type: 'toggle', rect: L.row(ROW - 6, [1, 1])[0], text: f.label, value: f.value,
          onChange: (v) => { applyField(a.sim, def.id, f.key, v); this.rebuild(); } });
      } else if (f.type === 'choice') {
        const rects = L.row(ROW - 6, [1.4, ...f.options.map(() => 1)]);
        w.push({ type: 'label', rect: rects[0], text: f.label, color: THEME.muted, size: 26 });
        f.options.forEach((opt, i) => w.push({ type: 'button', rect: rects[i + 1], text: opt.toUpperCase(), active: f.value === opt,
          onClick: () => { applyField(a.sim, def.id, f.key, opt); this.rebuild(); } }));
      }
    }
    if (def.kind === 'spring') {
      const len = currentSpringLength(a.sim, def);
      w.push({ type: 'button', rect: L.row(ROW - 6, [1, 1])[0], text: `Rest length = now (${len?.toFixed(2)} m)`, size: 24,
        onClick: () => a.sim.update(def.id, { restLength: +len.toFixed(3) }) });
    }
    if (a.sim.state !== 'edit') w.push({ type: 'label', rect: L.full(34), text: 'Changing a value returns to the setup first.', color: THEME.muted, size: 24 });
  }

  comparePage(L, w) {
    const a = this.app;
    const { A, B } = a.store.slotRuns();
    for (const slot of ['A', 'B']) {
      const run = slot === 'A' ? A : B;
      const [lab, prev, next] = L.row(52, [4, 1, 1]);
      w.push({ type: 'custom', rect: lab, draw: (g, r) => {
        g.fillStyle = THEME.panel; roundRect(g, r.x, r.y, r.w, r.h, 12); g.fill();
        g.fillStyle = RUN_CSS[slot]; g.fillRect(r.x, r.y + 6, 8, r.h - 12);
        g.fillStyle = THEME.text; g.font = '600 26px system-ui, sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle';
        g.fillText(`${slot} · ${run?.name ?? '—'}`, r.x + 22, r.y + r.h / 2);
      } });
      w.push({ type: 'button', rect: prev, text: '◀', disabled: !a.store.runs.length, onClick: () => a.actions.stepSlot(slot, -1) });
      w.push({ type: 'button', rect: next, text: '▶', disabled: !a.store.runs.length, onClick: () => a.actions.stepSlot(slot, 1) });
    }
    const o = a.overlay.options;
    const opts = [['paths', 'Paths'], ['ghosts', 'Ghosts'], ['setups', 'Setups'], ['arrows', 'Arrows'], ['impacts', 'Hits']];
    L.row(54, opts.map(() => 1)).forEach((r, i) => w.push({ type: 'toggle', rect: r, text: opts[i][1], value: o[opts[i][0]], size: 24,
      onChange: (v) => a.actions.setOverlayOption(opts[i][0], v) }));

    const dur = a.overlay.duration();
    const [play, scrub, speed] = L.row(56, [0.7, 5, 1]);
    w.push({ type: 'button', rect: play, text: a.replay.playing ? '❚❚' : '▶', disabled: !dur, onClick: () => a.actions.togglePlay() });
    w.push({ type: 'slider', rect: scrub, min: 0, max: dur || 1, step: 1 / 120, value: a.replay.time,
      format: (v) => `${v.toFixed(2)} s`, onChange: (v) => { a.replay.playing = false; a.actions.setScrub(v); } });
    w.push({ type: 'button', rect: speed, text: `${a.replay.speed}×`, size: 24, onClick: () => a.actions.cycleSpeed() });

    const gd = graphData(a);
    const [gprev, glabel, gnext] = L.row(44, [1, 5, 1]);
    w.push({ type: 'button', rect: gprev, text: '◀', disabled: gd.kinds.length < 2, onClick: () => a.actions.setGraphKind(nextKind(gd, -1)) });
    w.push({ type: 'label', rect: glabel, align: 'center', size: 25, text: gd.kind ? `${gd.label} — ${gd.subjectName}` : 'Graph' });
    w.push({ type: 'button', rect: gnext, text: '▶', disabled: gd.kinds.length < 2, onClick: () => a.actions.setGraphKind(nextKind(gd, 1)) });
    w.push({ type: 'custom', rect: L.full(190), draw: (g, r) => drawGraph(g, r, { ...gd, font: 20 }),
      onDrag: (u) => { if (dur) { a.replay.playing = false; a.actions.setScrub(u * gd.tMax); } } });

    const id = (B || A)?.metrics.primaryId;
    const rows = compareMetrics(A?.metrics, B?.metrics, id).slice(0, 3);
    w.push({ type: 'custom', rect: L.full(rows.length * 34 + 6), draw: (g, r) => {
      g.font = '400 24px system-ui, sans-serif'; g.textBaseline = 'middle';
      rows.forEach((row, i) => {
        const y = r.y + 18 + i * 34;
        g.textAlign = 'left'; g.fillStyle = THEME.muted; g.fillText(row.label, r.x, y);
        g.textAlign = 'right';
        g.fillStyle = row.winner === 'A' ? RUN_CSS.A : THEME.text; g.fillText(fmt(row.a, row.unit), r.x + r.w * 0.78, y);
        g.fillStyle = row.winner === 'B' ? RUN_CSS.B : THEME.text; g.fillText(fmt(row.b, row.unit), r.x + r.w, y);
      });
    } });
  }

  infoPage(L, w) {
    const a = this.app;
    const lines = [
      'Trigger: press buttons, grab objects, pick ends to connect',
      'Grip: run → stop → back to setup',
      'Thumbstick left/right: scrub the replay',
      'A / X: play or pause the replay   ·   B / Y: hide or show this panel',
    ];
    this.heading(L, w, 'CONTROLS');
    for (const t of lines) w.push({ type: 'label', rect: L.full(36), text: t, size: 25 });
    this.heading(L, w, 'PERFORMANCE');
    const s = a.perf.stats();
    const text = s ? `${s.fps.toFixed(0)} fps · p95 frame ${s.frameP95Ms.toFixed(1)} ms · physics ${s.physicsAvgMs.toFixed(2)} ms · over budget ${s.overBudgetPct.toFixed(1)}%` : 'Measuring…';
    w.push({ type: 'label', rect: L.full(36), text, size: 25 });
    const notes = [];
    if (a.stage.xr.floorFallback) notes.push('Floor height unknown on this device: assumed 1.6 m eye height.');
    if (a.status.trackingLost) notes.push('Tracking lost: the simulation is paused.');
    if (a.status.hidden) notes.push('Paused while the system menu is open.');
    for (const n of notes) w.push({ type: 'label', rect: L.full(36), text: n, color: '#fde68a', size: 24 });
    L.space(6);
    const [recenter, exit] = L.row(ROW, [1, 1]);
    w.push({ type: 'button', rect: recenter, text: 'Move panel here', onClick: () => this.place() });
    w.push({ type: 'button', rect: exit, text: 'Exit VR', danger: true, onClick: () => a.stage.xr.end() });
  }
}

function fmt(v, unit) {
  return v === null || v === undefined ? '—' : `${v.toFixed(2)} ${unit}`;
}
