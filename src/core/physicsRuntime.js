// Thin wrapper over cannon-es. Works in lab-local coordinates (metres, +Y up,
// bench top at y = 0), independent of where the lab is placed in the XR world.
import * as CANNON from 'cannon-es';
import { BENCH, AXES, isConstraint, isObject, toWorld, toLocal, rotateVec, quatConjugate } from './defs.js';

export const FIXED_DT = 1 / 120;
const ROLLING_SCALE = 0.25; // drag 0..1 → rolling-resistance coefficient 0..0.25

const vec = (a) => new CANNON.Vec3(a[0], a[1], a[2]);

export class PhysicsRuntime {
  constructor() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.81, 0) });
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    this.world.solver.iterations = 20;
    this.world.defaultContactMaterial.friction = 0.4;
    this.world.defaultContactMaterial.restitution = 0.3;

    // The bench (top at y = 0) and the room floor below it.
    this.benchMaterial = new CANNON.Material({ friction: 0.8, restitution: 0.6 });
    const bench = new CANNON.Body({ mass: 0, type: CANNON.Body.STATIC, material: this.benchMaterial });
    bench.addShape(new CANNON.Box(new CANNON.Vec3(BENCH.width / 2, 0.05, BENCH.depth / 2)));
    bench.position.set(0, -0.05, BENCH.centerZ);
    const floor = new CANNON.Body({ mass: 0, type: CANNON.Body.STATIC, material: this.benchMaterial });
    floor.addShape(new CANNON.Plane());
    floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    floor.position.set(0, -BENCH.height, 0);
    this.world.addBody(bench);
    this.world.addBody(floor);

    /** @type {Map<string, CANNON.Body>} */
    this.bodies = new Map();
    /** @type {Map<string, {kind:string, spring?:CANNON.Spring, constraint?:CANNON.Constraint}>} */
    this.constraints = new Map();
    this.world.addEventListener('preStep', () => {
      for (const c of this.constraints.values()) if (c.spring) c.spring.applyForce();
    });
  }

  /** Create (or replace) the body for an object def. Targets have no body: they are measurement zones. */
  setObject(def) {
    if (!isObject(def)) return;
    this.removeObject(def.id);
    if (def.kind === 'target') return;

    const material = new CANNON.Material({ friction: def.friction, restitution: def.restitution });
    const isStatic = def.isStatic || def.mass <= 0;
    const body = new CANNON.Body({
      mass: isStatic ? 0 : def.mass,
      type: isStatic ? CANNON.Body.STATIC : CANNON.Body.DYNAMIC,
      material,
      linearDamping: 0.01,
      angularDamping: 0.01,
      allowSleep: true,
      sleepSpeedLimit: 0.02,
      sleepTimeLimit: 0.4,
    });
    if (def.kind === 'ball') {
      body.addShape(new CANNON.Sphere(def.size.radius));
    } else {
      const { x, y, z } = def.size;
      body.addShape(new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)));
    }
    body.position.set(...def.position);
    body.quaternion.set(...def.quaternion);
    body.objectId = def.id;
    // cannon-es has no rolling resistance, so balls would roll forever.
    // We model it as a constant deceleration while the ball touches something.
    body.rollingResistance = def.kind === 'ball' ? def.drag * ROLLING_SCALE : 0;
    this.world.addBody(body);
    this.bodies.set(def.id, body);
  }

  /**
   * Create a spring or hinge. Bodies must already exist and be at their def poses.
   * Returns false (and creates nothing) if an end is missing, e.g. a target.
   */
  setConstraint(def) {
    this.removeConstraint(def.id);
    const A = this.bodies.get(def.a);
    const B = this.bodies.get(def.b);
    if (!A || !B || A === B) return false;
    const poseA = this.pose(def.a), poseB = this.pose(def.b);

    if (def.kind === 'spring') {
      const spring = new CANNON.Spring(A, B, {
        localAnchorA: vec(def.anchorA), localAnchorB: vec(def.anchorB),
        restLength: def.restLength, stiffness: def.stiffness, damping: def.damping,
      });
      this.constraints.set(def.id, { kind: 'spring', spring });
    } else if (def.kind === 'hinge') {
      const pivotWorld = toWorld(poseA, def.pivotA);
      const axis = AXES[def.axis] || AXES.z;
      const hinge = new CANNON.HingeConstraint(A, B, {
        pivotA: vec(def.pivotA),
        axisA: vec(rotateVec(quatConjugate(poseA.q), axis)),
        pivotB: vec(toLocal(poseB, pivotWorld)),
        axisB: vec(rotateVec(quatConjugate(poseB.q), axis)),
        collideConnected: false,
        maxForce: 1e6,
      });
      this.world.addConstraint(hinge);
      this.constraints.set(def.id, { kind: 'hinge', constraint: hinge });
    }
    return true;
  }

  removeConstraint(id) {
    const c = this.constraints.get(id);
    if (!c) return;
    if (c.constraint) this.world.removeConstraint(c.constraint);
    this.constraints.delete(id);
  }

  removeObject(id) {
    const body = this.bodies.get(id);
    if (body) {
      this.world.removeBody(body);
      this.bodies.delete(id);
    }
  }

  clear() {
    for (const id of [...this.constraints.keys()]) this.removeConstraint(id);
    for (const id of [...this.bodies.keys()]) this.removeObject(id);
  }

  /** Objects first, then the connections between them. */
  load(defs) {
    this.clear();
    for (const def of defs) if (isObject(def)) this.setObject(def);
    for (const def of defs) if (isConstraint(def)) this.setConstraint(def);
  }

  setPose(id, position, quaternion) {
    const body = this.bodies.get(id);
    if (!body) return;
    body.position.set(...position);
    body.quaternion.set(...quaternion);
    body.velocity.set(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
  }

  wakeAll() {
    for (const body of this.bodies.values()) body.wakeUp();
  }

  step() {
    this.world.step(FIXED_DT);
    this.applyRollingResistance();
  }

  applyRollingResistance() {
    const touching = new Set();
    for (const c of this.world.contacts) { touching.add(c.bi); touching.add(c.bj); }
    const g = this.world.gravity.length();
    for (const body of touching) {
      if (!body.rollingResistance || body.type !== CANNON.Body.DYNAMIC) continue;
      const v = body.velocity;
      const speed = v.length();
      if (speed < 1e-6) continue;
      const newSpeed = Math.max(0, speed - body.rollingResistance * g * FIXED_DT);
      const k = newSpeed / speed;
      v.scale(k, v);
      body.angularVelocity.scale(k, body.angularVelocity);
    }
  }

  dynamicIds() {
    return [...this.bodies.entries()].filter(([, b]) => b.type === CANNON.Body.DYNAMIC).map(([id]) => id);
  }

  allDynamicAsleep() {
    for (const body of this.bodies.values()) {
      if (body.type === CANNON.Body.DYNAMIC && body.sleepState !== CANNON.Body.SLEEPING) return false;
    }
    return true;
  }

  pose(id) {
    const b = this.bodies.get(id);
    if (!b) return null;
    return {
      p: [b.position.x, b.position.y, b.position.z],
      q: [b.quaternion.x, b.quaternion.y, b.quaternion.z, b.quaternion.w],
    };
  }

  /** Velocity of a body (m/s), for live arrows. */
  velocity(id) {
    const b = this.bodies.get(id);
    return b ? [b.velocity.x, b.velocity.y, b.velocity.z] : null;
  }
}
