// Thin wrapper over cannon-es. Works in lab-local coordinates (metres, +Y up),
// independent of where the lab is placed in the XR world.
import * as CANNON from 'cannon-es';

export const FIXED_DT = 1 / 120;
const ROLLING_SCALE = 0.25; // drag 0..1 → rolling-resistance coefficient 0..0.25

export class PhysicsRuntime {
  constructor() {
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.81, 0) });
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    this.world.solver.iterations = 20;
    this.world.defaultContactMaterial.friction = 0.4;
    this.world.defaultContactMaterial.restitution = 0.3;

    this.floorMaterial = new CANNON.Material({ friction: 0.8, restitution: 0.6 });
    const floor = new CANNON.Body({ mass: 0, type: CANNON.Body.STATIC, material: this.floorMaterial });
    floor.addShape(new CANNON.Plane());
    floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.addBody(floor);

    /** @type {Map<string, CANNON.Body>} */
    this.bodies = new Map();
  }

  /** Create (or replace) the body for a def. Targets have no body: they are measurement zones. */
  setObject(def) {
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

  removeObject(id) {
    const body = this.bodies.get(id);
    if (body) {
      this.world.removeBody(body);
      this.bodies.delete(id);
    }
  }

  clear() {
    for (const id of [...this.bodies.keys()]) this.removeObject(id);
  }

  load(defs) {
    this.clear();
    for (const def of defs) this.setObject(def);
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
}
