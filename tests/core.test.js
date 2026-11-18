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
