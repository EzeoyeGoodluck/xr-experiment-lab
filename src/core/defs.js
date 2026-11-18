// Definitions ("defs") are plain, serialisable descriptions of everything in an
// experiment: objects (ball, box, ramp, target) and connections between them
// (spring, hinge). Physics bodies and meshes are always rebuilt from defs, so a
// saved setup can be diffed and reopened exactly. No three.js / cannon here.

export const KINDS = {
  ball:   { label: 'Ball',   color: '#e11d48' },
  box:    { label: 'Box',    color: '#10b981' },
  ramp:   { label: 'Ramp',   color: '#8b5cf6' },
  target: { label: 'Target', color: '#f59e0b' },
};

export const CONSTRAINT_KINDS = {
  spring: { label: 'Spring', color: '#e5e7eb' },
  hinge:  { label: 'Hinge',  color: '#fbbf24' },
};

/** The workbench every experiment sits on (lab-local metres; bench top is y = 0). */
export const BENCH = { width: 3.2, depth: 1.6, height: 0.75, centerZ: -1.2 };

export const isConstraint = (def) => !!CONSTRAINT_KINDS[def?.kind];
export const isObject = (def) => !!KINDS[def?.kind];

// ---------- small vector / quaternion helpers (arrays) ----------

export function quatFromAxisAngle(axis, degrees) {
  const [x, y, z] = axis;
  const len = Math.hypot(x, y, z) || 1;
  const half = (degrees * Math.PI) / 360;
  const s = Math.sin(half) / len;
  return [x * s, y * s, z * s, Math.cos(half)];
}

export function quatMultiply(a, b) {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
}

export const quatConjugate = (q) => [-q[0], -q[1], -q[2], q[3]];

/** Rotate vector v by unit quaternion q. */
export function rotateVec(q, v) {
  const [qx, qy, qz, qw] = q;
  const [vx, vy, vz] = v;
  const tx = 2 * (qy * vz - qz * vy);
  const ty = 2 * (qz * vx - qx * vz);
  const tz = 2 * (qx * vy - qy * vx);
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ];
}

export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** Point given in an object's local frame → lab space. */
export const toWorld = (pose, local) => add(pose.p, rotateVec(pose.q, local));
/** Lab-space point → an object's local frame. */
export const toLocal = (pose, world) => rotateVec(quatConjugate(pose.q), sub(world, pose.p));

/** Angle in degrees between two unit quaternions. */
export function quatAngleDeg(a, b) {
  const dot = Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);
  return (2 * Math.acos(Math.min(1, dot)) * 180) / Math.PI;
}

export const AXES = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] };

// ---------- defs ----------

export function makeDef(kind, id, overrides = {}) {
  const base = {
    id,
    kind,
    name: `${KINDS[kind].label} ${id.split('-').pop()}`,
    color: KINDS[kind].color,
    position: [0, 0.5, -1.2],
    quaternion: [0, 0, 0, 1],
    mass: 1,
    friction: 0.5,
    restitution: 0.3,
    drag: 0.1,
    isStatic: false,
  };
  const perKind = {
    ball:   { size: { radius: 0.05 }, mass: 0.2, restitution: 0.4, drag: 0.4 },
    box:    { size: { x: 0.12, y: 0.12, z: 0.12 }, mass: 0.5, friction: 0.6 },
    ramp:   { size: { x: 1.0, y: 0.04, z: 0.3 }, isStatic: true, friction: 0.4, mass: 0,
              position: [0, 0.25, -1.2], quaternion: quatFromAxisAngle([0, 0, 1], -20) },
    target: { size: { radius: 0.12 }, isStatic: true, mass: 0, position: [0.6, 0.002, -1.2] },
  };
  return cloneDef({ ...base, ...perKind[kind], ...overrides });
}

/**
 * A spring or hinge between objects a and b.
 * Spring: anchors are in each object's local frame.
 * Hinge: pivotA is in a's local frame; axis is a lab axis ('x' | 'y' | 'z').
 */
export function makeConstraintDef(kind, id, { a, b, ...rest }) {
  const base = {
    id,
    kind,
    name: `${CONSTRAINT_KINDS[kind].label} ${id.split('-').pop()}`,
    color: CONSTRAINT_KINDS[kind].color,
    a,
    b,
  };
  const perKind = {
    spring: { anchorA: [0, 0, 0], anchorB: [0, 0, 0], restLength: 0.3, stiffness: 40, damping: 0.4 },
    hinge:  { pivotA: [0, 0, 0], axis: 'z' },
  };
  return cloneDef({ ...base, ...perKind[kind], ...rest });
}

export function cloneDef(def) {
  return JSON.parse(JSON.stringify(def));
}

export function cloneSetup(defs) {
  return defs.map(cloneDef);
}

export const poseOfDef = (def) => ({ p: def.position, q: def.quaternion });

/** A small fixed block used as a hanging point for springs and hinges. */
export function makeHook(id, position) {
  return makeDef('box', id, {
    name: `Hook ${id.split('-').pop()}`, size: { x: 0.06, y: 0.06, z: 0.06 }, color: '#9aa4b5',
    isStatic: true, mass: 0, position,
  });
}

// ---------- examples ----------

/** Ramp, ball and target: the project's original example. */
export function rampExample() {
  const ramp = makeDef('ramp', 'ramp-1', {
    size: { x: 1.0, y: 0.04, z: 0.3 },
    position: [-0.55, 0.21, -1.2],
    quaternion: quatFromAxisAngle([0, 0, 1], -22),
  });
  const ball = makeDef('ball', 'ball-1', {
    position: toWorld(poseOfDef(ramp), [-0.4, ramp.size.y / 2 + 0.06, 0]),
  });
  const target = makeDef('target', 'target-1', { position: [0.9, 0.002, -1.2] });
  return [ramp, ball, target];
}

/** A pendulum (rod on a hinge) swings down and knocks a ball towards a target. */
export function pendulumExample() {
  const hookPos = [-0.5, 0.58, -1.2];
  const hook = makeHook('box-1', hookPos);
  const rodLen = 0.55;
  const angle = -60; // released 60° out to the left
  const q = quatFromAxisAngle([0, 0, 1], angle);
  const rod = makeDef('box', 'box-2', {
    name: 'Pendulum', size: { x: 0.04, y: rodLen, z: 0.04 }, mass: 0.6, color: '#38bdf8', friction: 0.02, restitution: 0.6,
    quaternion: q,
    position: toWorld({ p: hookPos, q }, [0, -rodLen / 2, 0]),
  });
  const hinge = makeConstraintDef('hinge', 'hinge-1', {
    a: rod.id, b: hook.id, pivotA: [0, rodLen / 2, 0], axis: 'z',
  });
  const ball = makeDef('ball', 'ball-1', { position: [hookPos[0] + 0.072, 0.05, -1.2], drag: 0.4 });
  const target = makeDef('target', 'target-1', { position: [0.7, 0.002, -1.2] });
  return [hook, rod, hinge, ball, target];
}

/** A block hanging from a spring: change mass or stiffness and compare the bounce. */
export function springExample() {
  const hookPos = [0, 0.95, -1.2];
  const hook = makeHook('box-1', hookPos);
  const block = makeDef('box', 'box-2', {
    name: 'Weight', size: { x: 0.1, y: 0.1, z: 0.1 }, mass: 0.5, color: '#10b981', position: [0, 0.55, -1.2],
  });
  const spring = makeConstraintDef('spring', 'spring-1', {
    a: block.id, b: hook.id, anchorA: [0, 0.05, 0], anchorB: [0, -0.03, 0],
    restLength: 0.22, stiffness: 30, damping: 0.25,
  });
  return [hook, block, spring];
}

export const EXAMPLES = {
  ramp: { label: 'Ramp & target', build: rampExample },
  pendulum: { label: 'Pendulum (hinge)', build: pendulumExample },
  spring: { label: 'Mass on a spring', build: springExample },
};

/** Kept for compatibility: the default example. */
export const exampleSetup = rampExample;

/** The object whose motion is summarised in comparisons. */
export function primaryObjectId(defs) {
  const objs = defs.filter(isObject);
  const ball = objs.find((d) => d.kind === 'ball' && !d.isStatic);
  if (ball) return ball.id;
  const dyn = objs.find((d) => d.kind !== 'target' && !d.isStatic);
  return dyn ? dyn.id : null;
}

export function targetDef(defs) {
  return defs.find((d) => d.kind === 'target') || null;
}
