// Describes what changed between two experiment setups, so a comparison is
// tied to the design change that caused it. Pure JS.
import { quatAngleDeg } from './defs.js';

const NUM_FIELDS = [
  { key: 'mass', label: 'mass', unit: 'kg', tol: 1e-3 },
  { key: 'friction', label: 'friction', unit: '', tol: 1e-3 },
  { key: 'restitution', label: 'bounciness', unit: '', tol: 1e-3 },
  { key: 'drag', label: 'drag', unit: '', tol: 1e-3 },
];

const fmt = (v) => (Math.round(v * 1000) / 1000).toString();

export function diffSetups(setupA, setupB) {
  const changes = [];
  const byIdA = new Map(setupA.map((d) => [d.id, d]));
  const byIdB = new Map(setupB.map((d) => [d.id, d]));

  for (const [id, b] of byIdB) {
    const a = byIdA.get(id);
    if (!a) {
      changes.push({ id, name: b.name, field: 'added', text: `${b.name} added` });
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
