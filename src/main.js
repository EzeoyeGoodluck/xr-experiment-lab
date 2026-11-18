// Entry point: wires the simulation core to the 3D view, XR input and panel.
import * as THREE from 'three';
import { Simulation } from './core/simulation.js';
import { RunStore } from './core/runStore.js';
import { compareMetrics, gapAt } from './core/metrics.js';
import { Stage } from './view/stage.js';
import { ObjectViews, applyPose } from './view/objectViews.js';
import { ComparisonOverlay } from './view/overlay.js';
import { Editor } from './view/editor.js';
import { XRInput } from './view/xrInput.js';
import { Hud } from './view/hud.js';
import { Panel } from './ui/panel.js';

function browserStorage() {
  try {
    const s = window.localStorage;
    const k = '__xr_lab_probe__';
    s.setItem(k, '1');
    s.removeItem(k);
    return s;
  } catch {
    return null; // private mode, sandboxed iframe, etc.: runs then last for this visit only
  }
}

const store = new RunStore({ storage: browserStorage() });
const restored = store.restore();
const sim = new Simulation({ runStore: store });
store.counter = Math.max(store.counter, store.runs.length);

const stage = new Stage(document.getElementById('viewport'), {
  overlayRoot: document.getElementById('ui-root'),
  xrButtonHost: document.getElementById('xr-buttons'),
});
const views = new ObjectViews(stage.labRoot);
const overlay = new ComparisonOverlay(stage.labRoot);
const editor = new Editor({ stage, sim, views });
const hud = new Hud(stage.labRoot);
const replay = { time: 0, playing: false, speed: 1 };

let toastTimer = null;
const toastEl = document.getElementById('toast');

const actions = {
  run() {
    replay.playing = false;
    sim.start();
  },
  /** One button for headsets: run → stop → back to setup. */
  cycleRun() {
    if (sim.state === 'edit') actions.run();
    else if (sim.state === 'running') sim.stop();
    else sim.reset();
  },
  togglePlay() {
    const dur = overlay.duration();
    if (!dur) return;
    if (!replay.playing && replay.time >= dur - 1e-3) replay.time = 0;
    replay.playing = !replay.playing;
    panel.updateScrub();
  },
  setScrub(t) {
    replay.time = Math.max(0, Math.min(t, overlay.duration()));
    overlay.setTime(replay.time);
    panel.updateScrub();
  },
  scrubBy(dt) {
    replay.playing = false;
    actions.setScrub(replay.time + dt);
  },
  toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  },
};

const xrInput = new XRInput({ stage, sim, views, editor, actions });
const panel = new Panel({ root: document.getElementById('panel'), sim, store, editor, overlay, replay, actions, xrInput });

// ---------- events ----------

sim.addEventListener('structure', () => {
  views.reconcile([...sim.defs.values()]);
  editor.refresh();
  panel.renderInspector();
  panel.refreshState();
});
sim.addEventListener('state', () => {
  if (sim.state === 'edit') views.reconcile([...sim.defs.values()]);
  editor.refresh();
  panel.refreshState();
});
sim.addEventListener('pose', (e) => {
  const id = e.detail.id;
  const def = sim.defs.get(id);
  const mesh = views.meshOf(id);
  if (def && mesh && !views.held.has(id)) applyPose(mesh, def.position, def.quaternion);
  if (id === editor.selectedId) panel.syncSlope();
});
sim.addEventListener('run', (e) => {
  replay.time = 0;
  replay.playing = false;
  actions.toast(`${e.detail.run.name} recorded`);
});
store.addEventListener('change', () => {
  overlay.setRuns(store.slotRuns());
  replay.time = Math.min(replay.time, overlay.duration());
  overlay.setTime(replay.time);
  panel.renderRuns();
  panel.renderCompare();
});
editor.addEventListener('select', () => panel.renderInspector(true));
stage.addEventListener('mode', (e) => {
  hud.setVisible(e.detail.mode === 'vr');
  editor.refresh();
});

document.getElementById('panel-toggle').addEventListener('click', (e) => {
  const p = document.getElementById('panel');
  const collapsed = p.classList.toggle('collapsed');
  e.currentTarget.setAttribute('aria-expanded', String(!collapsed));
  e.currentTarget.textContent = collapsed ? 'Show panel' : 'Hide panel';
  setTimeout(() => stage.resize(), 50);
});

window.addEventListener('keydown', (e) => {
  const typing = e.target.closest('textarea, select, input[type="text"], input[type="file"]');
  if (typing && e.key !== 'Escape') return;
  const k = e.key.toLowerCase();
  if (k === ' ' && e.target.closest('button')) return; // the focused button handles Space itself
  // Arrow keys on a focused slider adjust that slider, not the replay.
  if ((k === 'arrowleft' || k === 'arrowright') && e.target.matches('input[type="range"]')) return;
  if (k === ' ') { e.preventDefault(); sim.state === 'running' ? sim.stop() : actions.run(); }
  else if (k === 'r') sim.reset();
  else if (k === 'w') editor.setMode('translate');
  else if (k === 'e') editor.setMode('rotate');
  else if (k === 'p') actions.togglePlay();
  else if (k === 'arrowleft') { e.preventDefault(); actions.scrubBy(e.shiftKey ? -0.25 : -1 / 30); }
  else if (k === 'arrowright') { e.preventDefault(); actions.scrubBy(e.shiftKey ? 0.25 : 1 / 30); }
  else if ((k === 'delete' || k === 'backspace') && editor.selectedId) { e.preventDefault(); sim.remove(editor.selectedId); }
  else if (k === 'escape') editor.select(null);
});

// ---------- start ----------

sim.loadExample();
overlay.setRuns(store.slotRuns());
panel.refreshAll();
if (restored && store.runs.length) actions.toast(`Restored ${store.runs.length} saved run(s)`);

const timer = new THREE.Timer();
timer.connect(document);
let hudTimer = 0;

stage.renderer.setAnimationLoop((timestamp, frame) => {
  timer.update(timestamp);
  const dt = Math.min(timer.getDelta(), 0.1);
  sim.tick(dt);
  if (sim.state !== 'edit') views.updatePoses((id) => sim.livePose(id));
  if (sim.state === 'running') panel.updateClock();

  if (replay.playing) {
    const dur = overlay.duration();
    replay.time += dt * replay.speed;
    if (replay.time >= dur) { replay.time = dur; replay.playing = false; }
    overlay.setTime(replay.time);
    panel.updateScrub();
  }

  if (stage.mode !== 'desktop') xrInput.update(dt, frame);

  hudTimer += dt;
  if (stage.mode === 'vr' && hudTimer > 0.1) {
    hudTimer = 0;
    const { A, B } = store.slotRuns();
    const id = (B || A)?.metrics.primaryId;
    hud.update({
      state: sim.state,
      time: sim.state === 'edit' ? 0 : sim.time,
      scrub: replay.time,
      duration: overlay.duration(),
      playing: replay.playing,
      gap: A && B ? gapAt(A, B, id, replay.time) : null,
      rows: compareMetrics(A?.metrics, B?.metrics, id),
      names: { A: A?.name, B: B?.name },
    });
  }

  stage.render();
});

// Handy for debugging in the browser console and for automated browser tests.
window.app = { sim, store, overlay, replay, stage, views, editor, panel, actions, xrInput };
