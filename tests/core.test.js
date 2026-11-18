import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/core/simulation.js';
import { RunStore, runToJSON, runFromJSON } from '../src/core/runStore.js';
import { samplePose, STRIDE } from '../src/core/recorder.js';
import { compareMetrics, gapAt } from '../src/core/metrics.js';
import { diffSetups } from '../src/core/setupDiff.js';
import { quatFromAxisAngle, quatAngleDeg } from '../src/core/defs.js';

function freshSim() {
  const store = new RunStore();
  const sim = new Simulation({ runStore: store });
  sim.loadExample();
  return { sim, store };
}

test('same setup gives an identical run (deterministic replay)', () => {
  const { sim } = freshSim();
  const a = sim.runToEnd();
  sim.reset();
  const b = sim.runToEnd();
  assert.equal(a.frameCount, b.frameCount);
  assert.deepEqual(Array.from(a.tracks['ball-1'].samples), Array.from(b.tracks['ball-1'].samples));
});

test('reset restores the exact setup the run started from', () => {
  const { sim } = freshSim();
  const before = sim.serialize();
  sim.runToEnd();
  assert.equal(sim.state, 'review');
  assert.notDeepEqual(sim.livePose('ball-1').p, before.find((d) => d.id === 'ball-1').position);
  sim.reset();
  assert.equal(sim.state, 'edit');
  assert.deepEqual(sim.serialize(), before);
});

test('recording captures every physics step, starting at t = 0', () => {
  const { sim } = freshSim();
  const start = sim.serialize().find((d) => d.id === 'ball-1').position;
  const run = sim.runToEnd();
  const s = run.tracks['ball-1'].samples;
  assert.equal(s.length / STRIDE, run.frameCount);
  assert.ok(Math.abs(s[0] - start[0]) < 1e-5 && Math.abs(s[1] - start[1]) < 1e-5);
  assert.ok(!('ramp-1' in run.tracks), 'static objects are not tracked');
  assert.ok(!('target-1' in run.tracks), 'targets are not tracked');
});

test('scrubbing interpolates between samples and clamps at the ends', () => {
  const { sim } = freshSim();
  const run = sim.runToEnd();
  const s = run.tracks['ball-1'].samples;
  const p0 = samplePose(s, run.dt, -5).p;
  assert.deepEqual(p0, [s[0], s[1], s[2]]);
  const end = samplePose(s, run.dt, 999).p;
  const last = (run.frameCount - 1) * STRIDE;
  assert.deepEqual(end, [s[last], s[last + 1], s[last + 2]]);
  const mid = samplePose(s, run.dt, 1.5 * run.dt).p;
  const expectX = (s[STRIDE] + s[2 * STRIDE]) / 2;
  assert.ok(Math.abs(mid[0] - expectX) < 1e-6);
  const q = samplePose(s, run.dt, 0.77).q;
  assert.ok(Math.abs(Math.hypot(...q) - 1) < 1e-6, 'interpolated rotation stays normalised');
});

test('a design change produces a measurable, explained difference (Run A vs Run B)', () => {
  const { sim, store } = freshSim();
  const runA = sim.runToEnd();
  sim.reset();
  sim.update('ball-1', { drag: 0.6 });
  sim.update('ramp-1', { friction: 0.6 });
  const runB = sim.runToEnd();

  const { A, B } = store.slotRuns();
  assert.equal(A.id, runA.id, 'previous run moves to slot A');
  assert.equal(B.id, runB.id, 'newest run goes to slot B');

  const rows = compareMetrics(A.metrics, B.metrics, 'ball-1');
  const dist = rows.find((r) => r.key === 'pathLength');
  assert.ok(dist.b < dist.a, 'more drag means a shorter path');

  const changes = diffSetups(A.setup, B.setup);
  const fields = changes.map((c) => `${c.id}:${c.field}`).sort();
  assert.deepEqual(fields, ['ball-1:drag', 'ramp-1:friction']);
  assert.match(changes.find((c) => c.field === 'drag').text, /drag 0\.4 → 0\.6/);

  assert.equal(gapAt(A, B, 'ball-1', 0), 0, 'both runs start from the same place');
  assert.ok(gapAt(A, B, 'ball-1', 2.5) > 0.05, 'paths have separated by 2.5 s');
});

test('setup diff reports moves, rotations, added and removed objects', () => {
  const { sim } = freshSim();
  const a = sim.serialize();
  sim.setPose('ramp-1', [-0.55, 0.3, -1.2], quatFromAxisAngle([0, 0, 1], -30));
  sim.remove('target-1');
  sim.add('box');
  const changes = diffSetups(a, sim.serialize());
  const fields = changes.map((c) => c.field).sort();
  assert.deepEqual(fields, ['added', 'position', 'removed', 'rotation']);
  const rot = changes.find((c) => c.field === 'rotation');
  assert.ok(Math.abs(rot.to - 8) < 0.1, `rotation reported as ${rot.to}`);
  assert.ok(Math.abs(quatAngleDeg(quatFromAxisAngle([0, 1, 0], 10), [0, 0, 0, 1]) - 10) < 1e-6);
});

test('runs survive export and import (experiment notebook)', () => {
  const { sim, store } = freshSim();
  sim.runToEnd();
  sim.reset();
  sim.update('ball-1', { mass: 0.5 });
  sim.runToEnd();
  const json = JSON.parse(JSON.stringify(store.toJSON()));

  const other = new RunStore();
  other.loadJSON(json);
  assert.equal(other.runs.length, 2);
  assert.deepEqual(other.slots, store.slots);
  const r0 = store.runs[0], r1 = other.runs[0];
  assert.equal(r1.metrics.tracks['ball-1'].pathLength.toFixed(3), r0.metrics.tracks['ball-1'].pathLength.toFixed(3));

  // Reopening a saved setup reproduces the original run.
  const sim2 = new Simulation({ runStore: new RunStore() });
  sim2.load(r1.setup);
  const replay = sim2.runToEnd();
  assert.equal(replay.frameCount, r0.frameCount);
  assert.throws(() => runFromJSON({ schema: 2 }), /recognised/);
  assert.ok(runToJSON(r0).tracks['ball-1'].samples.length > 0);
});

test('persistence uses browser storage when available and tolerates failures', () => {
  const mem = new Map();
  const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
  const store = new RunStore({ storage });
  const sim = new Simulation({ runStore: store });
  sim.loadExample();
  sim.runToEnd();
  const restored = new RunStore({ storage });
  assert.equal(restored.restore(), true);
  assert.equal(restored.runs.length, 1);

  const broken = new RunStore({ storage: { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('full'); } } });
  assert.equal(broken.restore(), false);
  assert.doesNotThrow(() => broken.save());
});

test('editing while reviewing a run first restores the setup', () => {
  const { sim } = freshSim();
  sim.runToEnd();
  sim.update('ball-1', { mass: 1 });
  assert.equal(sim.state, 'edit');
  const ball = sim.serialize().find((d) => d.id === 'ball-1');
  assert.equal(ball.mass, 1);
  assert.ok(ball.position[1] > 0.3, 'ball is back at the top of the ramp');
});

// ---------- springs & hinges ----------
import { EXAMPLES, isConstraint, toWorld, dist as distance } from '../src/core/defs.js';

test('every example runs deterministically', () => {
  for (const name of Object.keys(EXAMPLES)) {
    const sim = new Simulation({ runStore: new RunStore() });
    sim.loadExample(name);
    const a = sim.runToEnd();
    sim.reset();
    const b = sim.runToEnd();
    assert.deepEqual(Array.from(a.tracks[a.metrics.primaryId].samples), Array.from(b.tracks[b.metrics.primaryId].samples), name);
  }
});

test('a hinge keeps its pivot point fixed while the pendulum swings', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.loadExample('pendulum');
  const hinge = sim.defs.get('hinge-1');
  const hook = sim.defs.get(hinge.b).position;
  sim.start();
  let maxError = 0, minX = Infinity, maxX = -Infinity;
  for (let i = 0; i < 240; i++) {
    sim.stepOnce();
    const rod = sim.physics.pose(hinge.a);
    maxError = Math.max(maxError, distance(toWorld(rod, hinge.pivotA), hook));
    minX = Math.min(minX, rod.p[0]); maxX = Math.max(maxX, rod.p[0]);
  }
  assert.ok(maxError < 0.01, `pivot drifted ${maxError.toFixed(4)} m`);
  assert.ok(maxX - minX > 0.2, 'the pendulum actually swings');
});

test('the pendulum knocks the ball; a heavier pendulum knocks it further', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.loadExample('pendulum');
  const a = sim.runToEnd();
  sim.reset();
  sim.update('box-2', { mass: 1.5 });
  const b = sim.runToEnd();
  const pa = a.metrics.tracks['ball-1'].pathLength, pb = b.metrics.tracks['ball-1'].pathLength;
  assert.ok(pa > 0.2, `ball moved ${pa.toFixed(2)} m`);
  assert.ok(pb > pa, `heavier pendulum: ${pb.toFixed(2)} m vs ${pa.toFixed(2)} m`);
});

test('a stiffer spring oscillates faster', () => {
  const crossings = (run) => {
    const s = run.tracks['box-2'].samples; let n = 0; let prev = null;
    let mean = 0;
    for (let i = 0; i < s.length / 7; i++) mean += s[i * 7 + 1] / (s.length / 7);
    for (let i = 0; i < s.length / 7; i++) { const above = s[i * 7 + 1] > mean; if (prev !== null && above !== prev) n++; prev = above; }
    return n;
  };
  const sim = new Simulation({ runStore: new RunStore() });
  sim.loadExample('spring');
  const soft = sim.runToEnd();
  sim.reset();
  sim.update('spring-1', { stiffness: 120 });
  const stiff = sim.runToEnd();
  assert.ok(crossings(stiff) > crossings(soft), `${crossings(stiff)} vs ${crossings(soft)} crossings`);
  const changes = diffSetups(soft.setup, stiff.setup);
  assert.deepEqual(changes.map((c) => c.text), ['Spring 1 stiffness 30 → 120 N/m']);
});

test('connecting objects: spring rest length, hooks, and cleanup on delete', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.load([]);
  const a = sim.add('box', { position: [0, 0.3, -1.2] });
  const b = sim.add('ball', { position: [0.4, 0.3, -1.2] });
  const s = sim.connect('spring', a, b);
  assert.equal(sim.defs.get(s).restLength, 0.4);
  assert.throws(() => sim.connect('spring', a, a), /different/);
  const t = sim.add('target');
  assert.throws(() => sim.connect('hinge', a, t), /Targets/);

  const h = sim.connectToHook('hinge', b);
  const hookId = sim.defs.get(h).b;
  assert.ok(sim.defs.get(hookId).isStatic, 'hook is fixed');
  assert.equal(sim.connectionsOf(b).length, 2);

  sim.remove(b);
  assert.equal([...sim.defs.values()].filter(isConstraint).length, 0, 'connections removed with their object');
});

// ---------- derived quantities ----------
import { series, velocityAt, contactForceAt, impacts, graphKindsFor } from '../src/core/derived.js';

test('speed graph matches the recorded motion and the top-speed metric', () => {
  const { sim } = freshSim();
  const run = sim.runToEnd();
  const s = series(run, 'speed', 'ball-1');
  assert.ok(s.t.length > 50 && s.t.length <= 600);
  const peak = Math.max(...s.v);
  const metric = run.metrics.tracks['ball-1'].maxSpeed;
  assert.ok(Math.abs(peak - metric) / metric < 0.15, `graph peak ${peak.toFixed(2)} vs metric ${metric.toFixed(2)}`);
  assert.ok(s.v.at(-1) < 0.05, 'ends at rest');
  const h = series(run, 'height', 'ball-1');
  assert.ok(h.v[0] > h.v.at(-1), 'ball ends lower than it starts');
});

test('a resting object feels a contact force equal to its weight; a falling one feels none', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.load([]);
  sim.add('box', { position: [0, 0.06, -1.2], mass: 2 });      // resting on the bench
  sim.add('ball', { position: [0.5, 0.6, -1.2], mass: 0.5 });  // dropped
  sim.start();
  for (let i = 0; i < 30; i++) sim.stepOnce();
  const run = sim.stop();
  const rest = contactForceAt(run.tracks['box-1'].samples, run.dt, 0.15, 2);
  assert.ok(Math.abs(rest[1] - 2 * 9.81) < 0.6, `resting force ${rest[1].toFixed(2)} N`);
  const fall = contactForceAt(run.tracks['ball-1'].samples, run.dt, 0.12, 0.5);
  assert.ok(Math.hypot(...fall) < 0.2, `free-fall force ${Math.hypot(...fall).toFixed(3)} N`);
  const v = velocityAt(run.tracks['ball-1'].samples, run.dt, 0.2);
  assert.ok(Math.abs(v[1] + 9.81 * 0.2) < 0.1, `fall speed ${v[1].toFixed(2)} m/s ≈ g·t`);
});

test('impacts are detected when a dropped ball bounces', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.load([]);
  sim.add('ball', { position: [0, 0.5, -1.2], restitution: 0.9 });
  const run = sim.runToEnd();
  const hits = impacts(run.tracks['ball-1'].samples, run.dt);
  assert.ok(hits.length >= 2, `${hits.length} bounces found`);
  const firstExpected = Math.sqrt((2 * (0.5 - 0.05)) / 9.81);
  assert.ok(Math.abs(hits[0].t - firstExpected) < 0.03, `first bounce at ${hits[0].t.toFixed(3)} s, expected ${firstExpected.toFixed(3)} s`);
  assert.ok(hits[0].p[1] < 0.07, 'first impact is on the bench');
});

test('spring stretch and hinge angle graphs', () => {
  const sim = new Simulation({ runStore: new RunStore() });
  sim.loadExample('spring');
  const run = sim.runToEnd();
  const st = series(run, 'stretch', 'spring-1');
  const f = series(run, 'force', 'spring-1');
  const tail = st.v.slice(-50).reduce((a, b) => a + b, 0) / 50;
  assert.ok(Math.abs(tail - (0.5 * 9.81) / 30) < 0.02, `settles at stretch ${tail.toFixed(3)} m ≈ mg/k`);
  assert.ok(Math.abs(f.v.at(-1) - 30 * st.v.at(-1)) < 1e-6);
  assert.deepEqual(graphKindsFor(run.setup, 'spring-1'), ['stretch', 'force']);

  sim.loadExample('pendulum');
  const p = sim.runToEnd();
  const ang = series(p, 'angle', 'hinge-1');
  assert.equal(ang.v[0], 0);
  const peak = Math.max(...ang.v.map(Math.abs));
  assert.ok(peak > 40 && peak < 90, `swings through ${peak.toFixed(1)}°`);
  assert.deepEqual(graphKindsFor(p.setup, 'ball-1'), ['speed', 'height', 'distance']);
});

test('graphs also work on a live, still-growing recording', () => {
  const { sim } = freshSim();
  sim.start();
  for (let i = 0; i < 100; i++) sim.stepOnce();
  const live = { dt: sim.recorder.dt, setup: sim.recorder.setup, tracks: { 'ball-1': { samples: sim.recorder.buffers.get('ball-1') } } };
  const s = series(live, 'speed', 'ball-1');
  assert.equal(s.t.length, 101);
});

// ---------- performance & logging ----------
import { PerfMonitor, benchmark } from '../src/core/perf.js';
import { InteractionLog } from '../src/core/interactionLog.js';

test('performance monitor computes fps, p95 and budget overruns, and logs per second', () => {
  const p = new PerfMonitor({ size: 100 });
  p.setTargetFps(72);
  for (let i = 0; i < 90; i++) p.record(i % 10 === 0 ? 40 : 13.9, 0.5, 2);
  const s = p.stats();
  assert.ok(Math.abs(s.budgetMs - 13.89) < 0.01);
  assert.ok(s.overBudgetPct > 9 && s.overBudgetPct < 12, `${s.overBudgetPct}% over budget`);
  assert.equal(s.frameMaxMs, 40);
  assert.ok(s.frameP95Ms >= 13.9);
  assert.ok(p.log.length >= 1, 'a per-second row was logged');
  assert.match(p.csv(), /^at,fps,frameAvgMs/);
});

test('benchmark runs every example faster than real time', () => {
  const res = benchmark({ Simulation, RunStore, examples: Object.keys(EXAMPLES), repeats: 1 });
  for (const r of res) assert.ok(r.realtimeFactor > 1, `${r.example}: ${r.realtimeFactor.toFixed(1)}× real time`);
});

test('interaction log exports CSV with quoted details', () => {
  const log = new InteractionLog();
  log.reset('P01');
  log.add('run-start', { mode: 'vr', id: 'run-1' });
  log.add('edit', { id: 'ball-1', value: 0.5, field: 'drag "rolling"' });
  const csv = log.csv().split('\n');
  assert.equal(csv.length, 4);
  assert.match(csv[3], /"edit"/);
  assert.ok(csv[3].includes('drag \\""rolling\\""'), 'quotes inside details are escaped');
});
