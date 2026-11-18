// Describes what changed between two experiment setups, so a comparison is
// tied to the design change that caused it. Pure JS.
import { quatAngleDeg, isConstraint, dist } from './defs.js';

const NUM_FIELDS = [
  { key: 'mass', label: 'mass', unit: 'kg', tol: 1e-3 },
  { key: 'friction', label: 'friction', unit: '', tol: 1e-3 },
  { key: 'restitution', label: 'bounciness', unit: '', tol: 1e-3 },
  { key: 'drag', label: 'drag', unit: '', tol: 1e-3 },
];

const CONSTRAINT_FIELDS = [
  { key: 'stiffness', label: 'stiffness', unit: 'N/m', tol: 1e-3 },
  { key: 'damping', label: 'damping', unit: '', tol: 1e-3 },
  { key: 'restLength', label: 'rest length', unit: 'm', tol: 1e-4 },
];

const fmt = (v) => (Math.round(v * 1000) / 1000).toString();

function diffConstraint(a, b, names) {
  const out = [];
  const push = (field, text, from, to) => out.push({ id: b.id, name: b.name, field, from, to, text });
  if (a.a !== b.a || a.b !== b.b) push('ends', `${b.name} now joins ${names(b.a)} and ${names(b.b)}`, [a.a, a.b], [b.a, b.b]);
  for (const f of CONSTRAINT_FIELDS) {
    if (a[f.key] === undefined || b[f.key] === undefined) continue;
    if (Math.abs(a[f.key] - b[f.key]) > f.tol) {
      push(f.key, `${b.name} ${f.label} ${fmt(a[f.key])} → ${fmt(b[f.key])}${f.unit ? ' ' + f.unit : ''}`, a[f.key], b[f.key]);
    }
  }
  if (a.axis !== b.axis) push('axis', `${b.name} axis ${a.axis.toUpperCase()} → ${b.axis.toUpperCase()}`, a.axis, b.axis);
  for (const k of ['anchorA', 'anchorB', 'pivotA']) {
    if (a[k] && b[k] && dist(a[k], b[k]) > 0.002) push(k, `${b.name} attachment point moved ${(dist(a[k], b[k]) * 100).toFixed(1)} cm`, a[k], b[k]);
  }
  return out;
}

export function diffSetups(setupA, setupB) {
  const changes = [];
  const byIdA = new Map(setupA.map((d) => [d.id, d]));
  const byIdB = new Map(setupB.map((d) => [d.id, d]));

  const names = (id) => (byIdB.get(id) || byIdA.get(id))?.name ?? id;

  for (const [id, b] of byIdB) {
    const a = byIdA.get(id);
    if (!a) {
      changes.push({ id, name: b.name, field: 'added', text: `${b.name} added` });
      continue;
    }
    if (isConstraint(a) || isConstraint(b)) {
      if (a.kind !== b.kind) changes.push({ id, name: b.name, field: 'kind', text: `${b.name} changed type` });
      else changes.push(...diffConstraint(a, b, names));
      continue;
    }
    const moved = Math.hypot(b.position[0] - a.position[0], b.position[1] - a.position[1], b.position[2] - a.position[2]);
    if (moved > 0.002) {
      changes.push({ id, name: b.name, field: 'position', from: a.position, to: b.position,
        text: `${b.name} moved ${(moved * 100).toFixed(1)} cm` });
    }
    const turned = quatAngleDeg(a.quaternion, b.quaternion);
    if (turned > 0.5) {
      changes.push({ id, name: b.name, field: 'rotation', from: 0, to: turned,
        text: `${b.name} rotated ${turned.toFixed(1)}°` });
    }
    for (const f of NUM_FIELDS) {
      if (Math.abs((a[f.key] ?? 0) - (b[f.key] ?? 0)) > f.tol) {
        changes.push({ id, name: b.name, field: f.key, from: a[f.key], to: b[f.key],
          text: `${b.name} ${f.label} ${fmt(a[f.key])} → ${fmt(b[f.key])}${f.unit ? ' ' + f.unit : ''}` });
      }
    }
    if (a.isStatic !== b.isStatic) {
      changes.push({ id, name: b.name, field: 'isStatic', from: a.isStatic, to: b.isStatic,
        text: `${b.name} ${b.isStatic ? 'fixed in place' : 'set free to move'}` });
    }
    for (const k of Object.keys(b.size)) {
      if (Math.abs(a.size[k] - b.size[k]) > 1e-4) {
        changes.push({ id, name: b.name, field: `size.${k}`, from: a.size[k], to: b.size[k],
          text: `${b.name} ${k === 'radius' ? 'radius' : 'size ' + k} ${fmt(a.size[k])} → ${fmt(b.size[k])} m` });
      }
    }
  }
  for (const [id, a] of byIdA) {
    if (!byIdB.has(id)) changes.push({ id, name: a.name, field: 'removed', text: `${a.name} removed` });
  }
  return changes;
}
