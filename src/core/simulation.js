// The edit → run → review → reset workflow. Owns the experiment setup (defs),
// the physics runtime and the recorder. No rendering code, so the whole
// workflow can be driven and tested headlessly.
import { PhysicsRuntime, FIXED_DT } from './physicsRuntime.js';
import { RunRecorder } from './recorder.js';
import { makeDef, makeConstraintDef, makeHook, cloneDef, cloneSetup, EXAMPLES, KINDS, CONSTRAINT_KINDS,
  isConstraint, isObject, toWorld, toLocal, poseOfDef, dist } from './defs.js';

export const MAX_RUN_SECONDS = 12;
const MAX_STEPS_PER_FRAME = 8;

export class Simulation extends EventTarget {
  constructor({ runStore }) {
    super();
    this.physics = new PhysicsRuntime();
    this.recorder = new RunRecorder();
    this.runStore = runStore;
    /** @type {Map<string, object>} */
    this.defs = new Map();
    this.state = 'edit'; // 'edit' | 'running' | 'review'
    this.time = 0;
    this.accumulator = 0;
    this.snapshot = null;
    this.version = 0; // bumps whenever objects are added/removed/rebuilt
    this.idCounters = {};
  }

  // ---------- setup editing ----------

  newId(kind) {
    this.idCounters[kind] = (this.idCounters[kind] || 0) + 1;
    let id = `${kind}-${this.idCounters[kind]}`;
    while (this.defs.has(id)) id = `${kind}-${++this.idCounters[kind]}`;
    return id;
  }

  add(kind, overrides = {}) {
    if (!KINDS[kind]) throw new Error(`Unknown kind ${kind}`);
    this.ensureEditable();
    const def = makeDef(kind, this.newId(kind), overrides);
    this.defs.set(def.id, def);
    this.physics.setObject(def);
    this.structureChanged();
    return def.id;
  }

  /**
   * Connect two objects with a spring or hinge. Rest length / pivot come from
   * the current layout, so the connection starts relaxed.
   */
  connect(kind, a, b, overrides = {}) {
    if (!CONSTRAINT_KINDS[kind]) throw new Error(`Unknown connection ${kind}`);
    this.ensureEditable();
    const A = this.defs.get(a), B = this.defs.get(b);
    if (!isObject(A) || !isObject(B) || a === b) throw new Error('Pick two different objects');
    if (A.kind === 'target' || B.kind === 'target') throw new Error('Targets cannot be connected');
    const opts = { a, b };
    if (kind === 'spring') {
      opts.restLength = Math.max(0.05, +dist(A.position, B.position).toFixed(3));
    } else {
      // Pivot where the two objects meet: B's centre if B is a small hook, else halfway between them.
      const small = B.size && Math.max(B.size.x ?? 0, B.size.y ?? 0, B.size.z ?? 0, B.size.radius ?? 0) <= 0.08;
      const pivot = small ? B.position : A.position.map((v, i) => (v + B.position[i]) / 2);
      opts.pivotA = toLocal(poseOfDef(A), pivot);
    }
    const def = makeConstraintDef(kind, this.newId(kind), { ...opts, ...overrides });
    this.defs.set(def.id, def);
    this.structureChanged();
    return def.id;
  }

  /** One-click hanging point: a fixed hook above `a` joined by a spring or hinge. */
  connectToHook(kind, a) {
    this.ensureEditable();
    const A = this.defs.get(a);
    if (!isObject(A) || A.kind === 'target') throw new Error('Pick an object to hang');
    let hookPos;
    if (kind === 'hinge' && A.kind !== 'ball') {
      // Hang from the top end of the object's longest vertical-ish extent.
      hookPos = toWorld(poseOfDef(A), [0, (A.size.y ?? 0.1) / 2, 0]);
    } else {
      hookPos = [A.position[0], A.position[1] + (kind === 'spring' ? 0.35 : 0.3), A.position[2]];
    }
    const hookId = this.newId('box');
    this.defs.set(hookId, makeHook(hookId, hookPos));
    this.physics.setObject(this.defs.get(hookId));
    return this.connect(kind, a, hookId);
  }

  remove(id) {
    this.ensureEditable();
    const def = this.defs.get(id);
    if (!def) return;
    this.defs.delete(id);
    if (isObject(def)) {
      this.physics.removeObject(id);
      // Connections can't exist without both ends.
      for (const c of [...this.defs.values()]) if (isConstraint(c) && (c.a === id || c.b === id)) this.defs.delete(c.id);
    }
    this.structureChanged();
  }

  connectionsOf(id) {
    return [...this.defs.values()].filter((d) => isConstraint(d) && (d.a === id || d.b === id));
  }

  /** Change properties. Shape/kind/static changes rebuild the body. */
  update(id, patch) {
    this.ensureEditable();
    const def = this.defs.get(id);
    if (!def) return;
    Object.assign(def, cloneDef(patch));
    if (isObject(def)) this.physics.setObject(def); // connections are rebuilt when a run starts
    this.structureChanged();
  }

  setPose(id, position, quaternion) {
    if (this.state !== 'edit') return;
    const def = this.defs.get(id);
    if (!isObject(def)) return;
    def.position = [...position];
    def.quaternion = [...quaternion];
    this.physics.setPose(id, def.position, def.quaternion);
    this.dispatchEvent(new CustomEvent('pose', { detail: { id } }));
  }

  serialize() {
    return cloneSetup([...this.defs.values()]);
  }

  load(defs) {
    this.state = 'edit';
    this.time = 0;
    this.defs = new Map(cloneSetup(defs).map((d) => [d.id, d]));
    for (const d of this.defs.values()) {
      const n = parseInt(d.id.split('-').pop(), 10);
      if (!Number.isNaN(n)) this.idCounters[d.kind] = Math.max(this.idCounters[d.kind] || 0, n);
    }
    this.physics = new PhysicsRuntime(); // fresh world: no leftover clock, contacts or sleep timers
    this.physics.load([...this.defs.values()]);
    this.structureChanged();
    this.stateChanged();
  }

  loadExample(name = 'ramp') {
    this.snapshot = null;
    this.load((EXAMPLES[name] || EXAMPLES.ramp).build());
  }

  ensureEditable() {
    if (this.state !== 'edit') this.reset();
  }

  // ---------- run lifecycle ----------

  start() {
    if (this.state === 'running') return;
    if (this.state === 'review') this.reset();
    this.snapshot = this.serialize();
    // A brand-new physics world per run makes runs exactly repeatable.
    this.physics = new PhysicsRuntime();
    this.physics.load(this.snapshot);
    this.physics.wakeAll();
    this.time = 0;
    this.accumulator = 0;
    this.recorder.start({ setup: this.snapshot, dt: FIXED_DT, trackedIds: this.physics.dynamicIds() });
    this.recorder.capture((id) => this.physics.pose(id));
    this.state = 'running';
    this.stateChanged();
  }

  /** Advance by real elapsed seconds using a fixed physics step. */
  tick(elapsed) {
    if (this.state !== 'running') return;
    this.accumulator += Math.min(elapsed, 0.1);
    let steps = 0;
    while (this.accumulator >= FIXED_DT && steps < MAX_STEPS_PER_FRAME && this.state === 'running') {
      this.stepOnce();
      this.accumulator -= FIXED_DT;
      steps++;
    }
  }

  stepOnce() {
    this.physics.step();
    this.time += FIXED_DT;
    this.recorder.capture((id) => this.physics.pose(id));
    if (this.time >= MAX_RUN_SECONDS) this.stop('time limit');
    else if (this.time > 0.3 && this.physics.allDynamicAsleep()) this.stop('all objects at rest');
    else if (this.physics.dynamicIds().every((id) => this.physics.pose(id).p[1] < -2)) this.stop('objects fell away');
  }

  /** Run to completion without real time (tests, batch runs). */
  runToEnd() {
    this.start();
    while (this.state === 'running') this.stepOnce();
    return this.lastRun;
  }

  stop(reason = 'stopped by user') {
    if (this.state !== 'running') return null;
    const { id, name } = this.runStore.nextName();
    const run = this.recorder.finish({ id, name, endReason: reason });
    this.lastRun = this.runStore.add(run);
    this.state = 'review';
    this.stateChanged();
    this.dispatchEvent(new CustomEvent('run', { detail: { run: this.lastRun } }));
    return this.lastRun;
  }

  /** Back to the setup the last run started from. */
  reset() {
    if (this.state === 'running') this.stop();
    if (this.snapshot) this.load(this.snapshot);
    else { this.state = 'edit'; this.stateChanged(); }
  }

  /** Pose to draw an object at right now. */
  /** Velocity right now (running/review), for live arrows. */
  liveVelocity(id) {
    return this.state === 'edit' ? null : this.physics.velocity(id);
  }

  livePose(id) {
    if (this.state === 'edit') {
      const d = this.defs.get(id);
      return d ? { p: d.position, q: d.quaternion } : null;
    }
    return this.physics.pose(id) || (this.defs.get(id) ? { p: this.defs.get(id).position, q: this.defs.get(id).quaternion } : null);
  }

  structureChanged() {
    this.version++;
    this.dispatchEvent(new Event('structure'));
  }

  stateChanged() {
    this.dispatchEvent(new Event('state'));
  }
}
