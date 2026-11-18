// Object definitions ("defs") are plain, serialisable descriptions of every
// object in an experiment. Physics bodies and meshes are always rebuilt from
// defs, so a saved setup can be reopened exactly. No three.js / cannon here.

export const KINDS = {
  ball:   { label: 'Ball',   color: '#e11d48' },
  box:    { label: 'Box',    color: '#10b981' },
  ramp:   { label: 'Ramp',   color: '#8b5cf6' },
  target: { label: 'Target', color: '#f59e0b' },
};

export const PHYSICAL_FIELDS = ['mass', 'friction', 'restitution', 'drag', 'isStatic'];

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

/** Angle in degrees between two unit quaternions. */
export function quatAngleDeg(a, b) {
  const dot = Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);
  return (2 * Math.acos(Math.min(1, dot)) * 180) / Math.PI;
}

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

export function cloneDef(def) {
  return JSON.parse(JSON.stringify(def));
}

export function cloneSetup(defs) {
  return defs.map(cloneDef);
}

/** The ball-and-ramp example from the project plan. */
export function exampleSetup() {
  const rampAngle = -22;
  const ramp = makeDef('ramp', 'ramp-1', {
    size: { x: 1.0, y: 0.04, z: 0.3 },
    position: [-0.55, 0.21, -1.2],
    quaternion: quatFromAxisAngle([0, 0, 1], rampAngle),
  });
  // Put the ball just above the high end of the ramp surface.
  const along = -0.4; // metres from ramp centre, along its length
  const local = [along, ramp.size.y / 2 + 0.05 + 0.01, 0];
  const offset = rotateVec(ramp.quaternion, local);
  const ball = makeDef('ball', 'ball-1', {
    position: [ramp.position[0] + offset[0], ramp.position[1] + offset[1], ramp.position[2] + offset[2]],
  });
  const target = makeDef('target', 'target-1', { position: [0.9, 0.002, -1.2] });
  return [ramp, ball, target];
}

/** The object whose motion is summarised in comparisons. */
export function primaryObjectId(defs) {
  const ball = defs.find((d) => d.kind === 'ball' && !d.isStatic);
  if (ball) return ball.id;
  const dyn = defs.find((d) => d.kind !== 'target' && !d.isStatic);
  return dyn ? dyn.id : null;
}

export function targetDef(defs) {
  return defs.find((d) => d.kind === 'target') || null;
}
