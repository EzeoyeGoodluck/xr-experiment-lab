// The editable properties of each kind of def, shared by the desktop
// inspector and the in-headset inspector so both always offer the same
// controls and apply changes the same way.
import { quatFromAxisAngle, quatMultiply, rotateVec, isConstraint, dist, toWorld, poseOfDef } from '../core/defs.js';

/** Split a rotation into yaw (about Y) and slope (tilt about the object's Z), in degrees. */
export function yawAndSlope(q) {
  const f = rotateVec(q, [1, 0, 0]);
  const slope = -Math.asin(Math.max(-1, Math.min(1, f[1]))) * 180 / Math.PI;
  const yaw = Math.atan2(-f[2], f[0]) * 180 / Math.PI;
  return { yaw, slope };
}

const slider = (key, label, min, max, step, value, unit = '', digits = 2) =>
  ({ type: 'slider', key, label, min, max, step, value, unit, digits });

export function fieldsFor(def) {
  if (!def) return [];
  const f = [];
  if (def.kind === 'spring') {
    f.push(slider('stiffness', 'Stiffness (N/m)', 2, 400, 1, def.stiffness, 'N/m', 0));
    f.push(slider('damping', 'Damping', 0, 5, 0.05, def.damping));
    f.push(slider('restLength', 'Rest length (m)', 0.02, 2, 0.01, def.restLength, 'm'));
    return f;
  }
  if (def.kind === 'hinge') {
    f.push({ type: 'choice', key: 'axis', label: 'Swing axis', value: def.axis, options: ['x', 'y', 'z'] });
    return f;
  }
  if (def.kind !== 'target') {
    f.push({ type: 'toggle', key: 'isStatic', label: 'Fixed in place', value: def.isStatic });
    if (!def.isStatic) f.push(slider('mass', 'Mass (kg)', 0.05, 5, 0.05, def.mass, 'kg'));
    f.push(slider('friction', 'Friction', 0, 1, 0.01, def.friction));
    f.push(slider('restitution', 'Bounciness', 0, 1, 0.01, def.restitution));
    if (def.kind === 'ball') f.push(slider('drag', 'Rolling drag', 0, 1, 0.01, def.drag));
  }
  if (def.kind === 'ball' || def.kind === 'target') {
    f.push(slider('size.radius', 'Radius (m)', def.kind === 'ball' ? 0.02 : 0.05, def.kind === 'ball' ? 0.3 : 0.6, 0.005, def.size.radius, 'm', 3));
  } else {
    f.push(slider('size.x', 'Length (m)', 0.04, 2.5, 0.01, def.size.x, 'm'));
    f.push(slider('size.y', 'Thickness (m)', 0.02, 1, 0.01, def.size.y, 'm'));
    f.push(slider('size.z', 'Width (m)', 0.04, 1.5, 0.01, def.size.z, 'm'));
    f.push(slider('slope', 'Slope', -60, 60, 0.5, yawAndSlope(def.quaternion).slope, '°', 0));
  }
  return f;
}

export function formatField(field, value = field.value) {
  if (field.unit === '°') return `${value.toFixed(0)}°`;
  return value.toFixed(field.digits ?? 2);
}

function restsOnBench(def) {
  const { slope } = yawAndSlope(def.quaternion);
  const r = slope * Math.PI / 180;
  const bottom = def.position[1] - ((def.size.x / 2) * Math.sin(Math.abs(r)) + (def.size.y / 2) * Math.cos(r));
  return Math.abs(bottom) < 0.02;
}

/** Apply one field change to the simulation. Returns true if the field list itself may have changed. */
export function applyField(sim, id, key, value) {
  const def = sim.defs.get(id);
  if (!def) return false;
  if (key === 'slope') {
    const { yaw } = yawAndSlope(def.quaternion);
    const q = quatMultiply(quatFromAxisAngle([0, 1, 0], yaw), quatFromAxisAngle([0, 0, 1], -value));
    const position = [...def.position];
    // A ramp resting on the bench stays resting on it as it tilts.
    if (def.kind === 'ramp' && restsOnBench(def)) {
      position[1] = (def.size.x / 2) * Math.sin(Math.abs(value) * Math.PI / 180) + (def.size.y / 2) * Math.cos(value * Math.PI / 180);
    }
    sim.ensureEditable();
    sim.setPose(id, position, q);
    return false;
  }
  if (key.startsWith('size.')) {
    const k = key.slice(5);
    sim.update(id, { size: { ...def.size, [k]: value } });
    return false;
  }
  if (key === 'isStatic') {
    sim.update(id, { isStatic: value, mass: value ? 0 : (def.mass > 0 ? def.mass : 1) });
    return true;
  }
  sim.update(id, { [key]: value });
  return false;
}

/** For springs: the current distance between the two anchor points. */
export function currentSpringLength(sim, def) {
  if (!isConstraint(def) || def.kind !== 'spring') return null;
  const a = sim.defs.get(def.a), b = sim.defs.get(def.b);
  if (!a || !b) return null;
  return dist(toWorld(poseOfDef(a), def.anchorA), toWorld(poseOfDef(b), def.anchorB));
}
