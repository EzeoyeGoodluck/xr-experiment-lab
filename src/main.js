// Entry point: wires the simulation core to the 3D view, XR input, the HTML
// panel and the in-headset panel; owns the render loop and app-level actions.
import * as THREE from 'three';
import { Simulation } from './core/simulation.js';
import { RunStore } from './core/runStore.js';
import { PerfMonitor, benchmark } from './core/perf.js';
import { InteractionLog } from './core/interactionLog.js';
import { EXAMPLES, BENCH, isConstraint, toWorld } from './core/defs.js';
import { contactForceAt, velocityAt } from './core/derived.js';
import { webglProblem } from './view/xrSession.js';

// ?emulate=quest3 installs Meta's Immersive Web Emulation Runtime (IWER), so VR
// can be tried and tested in any desktop browser without a headset.
const params = new URLSearchParams(location.search);
let emulated = false;
if (params.has('emulate')) {
  const { XRDevice, metaQuest3 } = await import('../lib/iwer/iwer.module.js');
  window.xrDevice = new XRDevice(metaQuest3);
  window.xrDevice.installRuntime({ forceInstall: true }); // replace Chrome's device-less native WebXR
  emulated = true;
}

function fatal(title, text) {
  const el = document.createElement('div');
  el.id = 'fatal';
  el.innerHTML = `<div><h1></h1><p></p></div>`;
  el.querySelector('h1').textContent = title;
  el.querySelector('p').textContent = text;
  document.body.appendChild(el);
}

const glProblem = webglProblem();
if (glProblem) {
  fatal('3D graphics are not available', `${glProblem} Try an up-to-date Chrome, Edge or Firefox, and check that hardware acceleration is turned on.`);
  throw new Error(glProblem);
}

const [{ Stage }, { ObjectViews, applyPose }, { ConstraintViews }, { ComparisonOverlay }, { ArrowSet }, { Editor },
  { XRInput }, { Panel }, { VRMenu }] = await Promise.all([
  import('./view/stage.js'), import('./view/objectViews.js'), import('./view/constraintViews.js'), import('./view/overlay.js'),
  import('./view/arrows.js'), import('./view/editor.js'), import('./view/xrInput.js'), import('./ui/panel.js'), import('./ui/vrMenu.js'),
]);

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
const links = new ConstraintViews(views.group);
const overlay = new ComparisonOverlay(stage.labRoot);
const liveArrows = new ArrowSet(stage.labRoot);
const editor = new Editor({ stage, sim, views, links });
const perf = new PerfMonitor();
const interactionLog = new InteractionLog();
interactionLog.reset('');

const app = {
  sim, store, stage, views, links, overlay, editor, perf, interactionLog, emulated,
  replay: { time: 0, playing: false, speed: 1 },
  graphState: { kind: 'speed', subject: null },
  status: { trackingLost: false, hidden: false },
  log(type, detail = {}) { interactionLog.add(type, { mode: stage.mode, ...detail }); },
  recordingBytes() {
    let n = 0;
    for (const r of store.runs) for (const t of Object.values(r.tracks)) n += t.samples.byteLength;
    return n;
  },
};

let toastTimer = null;
const toastEl = document.getElementById('toast');
const SPEEDS = [0.1, 0.25, 0.5, 1, 2];

const actions = app.actions = {
  run() {
    app.replay.playing = false;
    editor.cancelConnect();
    sim.start();
    app.log('run-start', { value: sim.defs.size });
  },
  /** One button for headsets: run → stop → back to setup. */
  cycleRun() {
    if (sim.state === 'edit') actions.run();
    else if (sim.state === 'running') sim.stop();
    else { sim.reset(); app.log('reset'); }
  },
  spawn(kind, { nearUser = false } = {}) {
    let overrides = {};
    const n = sim.defs.size;
    if (nearUser && stage.mode !== 'desktop') {
      // In front of the headset, clamped onto the bench.
      const cam = stage.renderer.xr.getCamera();
      const head = new THREE.Vector3(), q = new THREE.Quaternion();
      cam.getWorldPosition(head); cam.getWorldQuaternion(q);
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(q).setY(0).normalize();
      const p = stage.toLab(head.addScaledVector(fwd, 0.6));
      const x = THREE.MathUtils.clamp(p.x, -BENCH.width / 2 + 0.2, BENCH.width / 2 - 0.2);
      const z = THREE.MathUtils.clamp(p.z, BENCH.centerZ - BENCH.depth / 2 + 0.2, BENCH.centerZ + BENCH.depth / 2 - 0.2);
      overrides = { position: [x, kind === 'target' ? 0.002 : kind === 'ramp' ? 0.25 : 0.35, z] };
    } else {
      const x = -0.2 + (n % 4) * 0.15;
      overrides = { ball: { position: [x, 0.6, -1.2] }, box: { position: [x, 0.3, -1.0] },
        target: { position: [0.6 + (n % 3) * 0.1, 0.002, -1.2] }, ramp: {} }[kind];
    }
    const id = sim.add(kind, overrides);
    editor.select(id);
    app.log('add', { id, value: kind });
    return id;
  },
  loadExample(name) {
    sim.loadExample(name);
    const first = { ramp: 'ramp-1', pendulum: 'box-2', spring: 'spring-1' }[name];
    editor.select(first || null);
    actions.toast(`Loaded: ${EXAMPLES[name].label}`);
    app.log('example', { value: name });
  },
  clearScene() {
    sim.snapshot = null;
    sim.load([]);
    editor.select(null);
    app.log('clear-scene');
  },
  deleteSelected() {
    if (!editor.selectedId) return;
    app.log('delete', { id: editor.selectedId });
    sim.remove(editor.selectedId);
  },
  togglePlay() {
    const dur = overlay.duration();
    if (!dur) return;
    if (!app.replay.playing && app.replay.time >= dur - 1e-3) app.replay.time = 0;
    app.replay.playing = !app.replay.playing;
    app.log(app.replay.playing ? 'replay-play' : 'replay-pause', { value: +app.replay.time.toFixed(3) });
    panel.updateScrub();
  },
  setScrub(t) {
    app.replay.time = Math.max(0, Math.min(t, overlay.duration()));
    overlay.setTime(app.replay.time);
    panel.updateScrub();
    scrubLogDue = true;
  },
  scrubBy(dt) {
    app.replay.playing = false;
    actions.setScrub(app.replay.time + dt);
  },
  cycleSpeed() {
    app.replay.speed = SPEEDS[(SPEEDS.indexOf(app.replay.speed) + 1) % SPEEDS.length];
    panel.renderCompare();
  },
  stepSlot(slot, dir) {
    const runs = store.runs;
    if (!runs.length) return;
    const i = runs.findIndex((r) => r.id === store.slots[slot]);
    const next = runs[(i + dir + runs.length) % runs.length];
    store.setSlot(slot, next.id);
    app.log('slot', { id: next.id, value: slot });
  },
  setOverlayOption(key, value) {
    overlay.setOptions({ [key]: value });
    panel.renderCompare();
    app.log('overlay', { value: `${key}=${value}` });
  },
  setGraphKind(kind) {
    if (!kind) return;
    app.graphState.kind = kind;
    panel.drawGraph();
  },
  benchmark() {
    const res = benchmark({ Simulation, RunStore, examples: Object.keys(EXAMPLES), repeats: 3 });
    app.log('benchmark', { value: res.map((r) => `${r.example}:${r.msPerStep.toFixed(3)}ms`).join(' ') });
    return res;
  },
  toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
    app.menu?.say(text);
  },
  log: (type, detail) => app.log(type, detail),
  onTrackedPointer() { if (stage.mode !== 'desktop' && !menu.visible) { menu.place(); menu.show(true); } },
};
let scrubLogDue = false;

const menu = app.menu = new VRMenu(app);
const xrInput = app.xrInput = new XRInput({ stage, sim, views, editor, menu, actions });
const panel = app.panel = new Panel({ root: document.getElementById('panel'), app });

// ---------- events ----------

function reconcileViews() {
  const defs = [...sim.defs.values()];
  views.reconcile(defs);
  links.reconcile(defs.filter(isConstraint));
}

sim.addEventListener('structure', () => {
  reconcileViews();
  editor.refresh();
  panel.renderInspector();
  panel.refreshState();
});
sim.addEventListener('state', () => {
  if (sim.state === 'edit') reconcileViews();
  if (sim.state !== 'running') liveArrows.clear();
  editor.refresh();
  panel.refreshState();
  panel.drawGraph();
});
sim.addEventListener('pose', (e) => {
  const id = e.detail.id;
  const def = sim.defs.get(id);
  const mesh = views.meshOf(id);
  if (def && mesh && !views.held.has(id)) applyPose(mesh, def.position, def.quaternion);
  if (id === editor.selectedId) panel.syncSlope();
});
sim.addEventListener('run', (e) => {
  app.replay.time = 0;
  app.replay.playing = false;
  actions.toast(`${e.detail.run.name} recorded`);
  app.log('run-end', { id: e.detail.run.id, value: +e.detail.run.duration.toFixed(3), reason: e.detail.run.endReason });
});
store.addEventListener('change', () => {
  overlay.setRuns(store.slotRuns());
  app.replay.time = Math.min(app.replay.time, overlay.duration());
  overlay.setTime(app.replay.time);
  panel.renderRuns();
  panel.renderCompare();
});
editor.addEventListener('select', () => { panel.renderInspector(true); panel.drawGraph(); });
editor.addEventListener('connect', (e) => {
  panel.renderConnect(e.detail.message);
  if (e.detail.message) menu.say(e.detail.message);
});

// XR lifecycle and robustness
stage.addEventListener('mode', (e) => {
  const { mode } = e.detail;
  editor.refresh();
  app.status.trackingLost = false;
  app.status.hidden = false;
  perf.setTargetFps(mode === 'desktop' ? 60 : stage.xr.targetFrameRate || 72);
  if (mode === 'desktop') menu.show(false);
  app.log('mode', { value: mode });
  panel.notice(mode !== 'desktop' && stage.xr.floorFallback
    ? 'This device did not report the floor height, so a standing eye height of 1.6 m is assumed.' : '');
});
stage.xr.addEventListener('error', (e) => { actions.toast(e.detail.message); panel.notice(e.detail.message); app.log('xr-error', { value: e.detail.message }); });
stage.xr.addEventListener('visibility', (e) => {
  app.status.hidden = e.detail.state !== 'visible';
  app.log('xr-visibility', { value: e.detail.state });
});
stage.xr.addEventListener('recenter', () => { if (menu.visible) menu.place(); app.log('xr-recenter'); });
stage.xr.addEventListener('support', () => panel.updateDiagnostics());

const canvas = stage.renderer.domElement;
canvas.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  panel.notice('The graphics context was lost (the GPU was reset or the tab was suspended). Your runs are saved; reloading…');
  setTimeout(() => location.reload(), 2500);
});

window.addEventListener('error', (e) => { console.error(e.error || e.message); actions.toast(`Something went wrong: ${e.message}`); });
window.addEventListener('unhandledrejection', (e) => { console.error(e.reason); actions.toast(`Something went wrong: ${e.reason?.message || e.reason}`); });

document.getElementById('panel-toggle').addEventListener('click', (e) => {
  const p = document.getElementById('panel');
  const collapsed = p.classList.toggle('collapsed');
  e.currentTarget.setAttribute('aria-expanded', String(!collapsed));
  e.currentTarget.textContent = collapsed ? 'Show panel' : 'Hide panel';
  setTimeout(() => stage.resize(), 50);
});
document.getElementById('diagnostics').addEventListener('toggle', () => panel.updateDiagnostics());

window.addEventListener('keydown', (e) => {
  const typing = e.target.closest('textarea, select, input[type="text"], input[type="file"]');
  if (typing && e.key !== 'Escape') return;
  const k = e.key.toLowerCase();
  if (k === ' ' && e.target.closest('button')) return; // the focused button handles Space itself
  if ((k === 'arrowleft' || k === 'arrowright') && e.target.matches('input[type="range"]')) return;
  if (k === ' ') { e.preventDefault(); sim.state === 'running' ? sim.stop() : actions.run(); }
  else if (k === 'r') sim.reset();
  else if (k === 'w') editor.setMode('translate');
  else if (k === 'e') editor.setMode('rotate');
  else if (k === 'p') actions.togglePlay();
  else if (k === 'arrowleft') { e.preventDefault(); actions.scrubBy(e.shiftKey ? -0.25 : -1 / 30); }
  else if (k === 'arrowright') { e.preventDefault(); actions.scrubBy(e.shiftKey ? 0.25 : 1 / 30); }
  else if ((k === 'delete' || k === 'backspace') && editor.selectedId) { e.preventDefault(); actions.deleteSelected(); }
  else if (k === 'escape') { if (editor.connecting) editor.cancelConnect(); else editor.select(null); }
});

// ---------- start ----------

sim.loadExample(EXAMPLES[params.get('example')] ? params.get('example') : 'ramp');
overlay.setRuns(store.slotRuns());
panel.refreshAll();
if (restored && store.runs.length) actions.toast(`Restored ${store.runs.length} saved run(s)`);
if (emulated) panel.notice('Emulated Quest 3 is active (?emulate). Press Enter VR to try the headset view in this browser.');

perf.context = () => ({ mode: stage.mode, state: sim.state, objects: sim.defs.size, runs: store.runs.length });

const timer = new THREE.Timer();
timer.connect(document);
const tmpV = new THREE.Vector3();
let slowUiTimer = 0;
let lastFrameAt = performance.now();

/** Lab-space position of a local point on an object, from its mesh (works while it's held). */
function pointOnObject(id, local) {
  const mesh = views.meshOf(id);
  if (!mesh) return null;
  tmpV.fromArray(local);
  mesh.localToWorld(tmpV);
  views.group.worldToLocal(tmpV);
  return tmpV.toArray();
}

stage.renderer.setAnimationLoop((timestamp, frame) => {
  const now = performance.now();
  const frameMs = now - lastFrameAt;
  lastFrameAt = now;
  timer.update(timestamp);
  const dt = Math.min(timer.getDelta(), 0.1);

  // Pause the simulation (not the recording's timeline) while tracking is lost or the system menu is open.
  if (frame && stage.mode !== 'desktop') {
    const lost = !frame.getViewerPose(stage.renderer.xr.getReferenceSpace());
    if (lost !== app.status.trackingLost) { app.status.trackingLost = lost; app.log('tracking', { value: lost ? 'lost' : 'restored' }); }
  }
  const paused = app.status.trackingLost || app.status.hidden;

  const t0 = performance.now();
  if (!paused) sim.tick(dt);
  const physicsMs = performance.now() - t0;

  if (sim.state !== 'edit') views.updatePoses((id) => sim.livePose(id));
  links.update(pointOnObject);

  if (sim.state === 'running') {
    panel.updateClock();
    if (overlay.options.arrows) {
      liveArrows.set(sim.physics.dynamicIds().map((id) => {
        const buf = sim.recorder.buffers.get(id);
        const def = sim.defs.get(id);
        return { id, origin: sim.livePose(id).p, velocity: sim.liveVelocity(id),
          force: buf && buf.length > 70 ? contactForceAt(buf, sim.recorder.dt, sim.time - 5 * sim.recorder.dt, def?.mass ?? 1) : null };
      }));
    }
  }

  if (app.replay.playing && !paused) {
    const dur = overlay.duration();
    app.replay.time += dt * app.replay.speed;
    if (app.replay.time >= dur) { app.replay.time = dur; app.replay.playing = false; }
    overlay.setTime(app.replay.time);
    panel.updateScrub();
  }

  if (stage.mode !== 'desktop') xrInput.update(dt, frame);
  menu.update(dt);

  slowUiTimer += dt;
  if (slowUiTimer > 0.25) {
    slowUiTimer = 0;
    if (sim.state === 'running') panel.drawGraph();
    panel.updateDiagnostics();
    if (scrubLogDue) { scrubLogDue = false; app.log('scrub', { value: +app.replay.time.toFixed(3) }); }
  }

  const r0 = performance.now();
  stage.render();
  perf.record(frameMs, physicsMs, performance.now() - r0);
});

// Handy for debugging in the browser console and for automated browser tests.
window.app = app;
