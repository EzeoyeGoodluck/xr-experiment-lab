// Quantities derived from a recording after the fact: time series for graphs,
// velocity/force vectors for arrows, and impacts. Works on finished runs and
// on the live recording buffers. Pure JS.
import { STRIDE, samplePose } from './recorder.js';
import { AXES, toWorld, dist, quatMultiply, quatConjugate, poseOfDef, targetDef, isConstraint, isObject } from './defs.js';

const G = 9.81;
const MAX_POINTS = 600;

export const GRAPH_KINDS = {
  speed:    { label: 'Speed', unit: 'm/s', applies: 'object' },
  height:   { label: 'Height above bench', unit: 'm', applies: 'object' },
  distance: { label: 'Distance to target', unit: 'm', applies: 'object', needsTarget: true },
  stretch:  { label: 'Spring stretch', unit: 'm', applies: 'spring' },
  force:    { label: 'Spring force', unit: 'N', applies: 'spring' },
  angle:    { label: 'Hinge angle', unit: '°', applies: 'hinge' },
};

/** Which graphs make sense for a subject in a setup. */
export function graphKindsFor(setup, subjectId) {
  const def = setup.find((d) => d.id === subjectId);
  if (!def) return [];
  const applies = isConstraint(def) ? def.kind : 'object';
  const hasTarget = !!targetDef(setup);
  return Object.entries(GRAPH_KINDS)
    .filter(([, g]) => g.applies === applies && (!g.needsTarget || hasTarget))
    .map(([key]) => key);
}

const frameCount = (samples) => Math.floor(samples.length / STRIDE);

function posAt(samples, i) {
  const o = i * STRIDE;
  return [samples[o], samples[o + 1], samples[o + 2]];
}

function poseAtFrame(samples, i) {
  const o = i * STRIDE;
  return { p: [samples[o], samples[o + 1], samples[o + 2]], q: [samples[o + 3], samples[o + 4], samples[o + 5], samples[o + 6]] };
}

/** Velocity at frame i by central difference over ±k frames. */
export function velocityAtFrame(samples, dt, i, k = 2) {
  const n = frameCount(samples);
  if (n < 2) return [0, 0, 0];
  const a = Math.max(0, i - k), b = Math.min(n - 1, i + k);
  if (a === b) return [0, 0, 0];
  const pa = posAt(samples, a), pb = posAt(samples, b);
  const span = (b - a) * dt;
  return [(pb[0] - pa[0]) / span, (pb[1] - pa[1]) / span, (pb[2] - pa[2]) / span];
}

export function velocityAt(samples, dt, t) {
  const n = frameCount(samples);
  return velocityAtFrame(samples, dt, Math.max(0, Math.min(n - 1, Math.round(t / dt))));
}

/** Smoothed acceleration (m/s²) at time t, from velocities ±k frames apart. */
export function accelerationAt(samples, dt, t, k = 4) {
  const n = frameCount(samples);
  const i = Math.max(0, Math.min(n - 1, Math.round(t / dt)));
  const a = Math.max(0, i - k), b = Math.min(n - 1, i + k);
  if (a === b) return [0, 0, 0];
  const va = velocityAtFrame(samples, dt, a), vb = velocityAtFrame(samples, dt, b);
  const span = (b - a) * dt;
  return [(vb[0] - va[0]) / span, (vb[1] - va[1]) / span, (vb[2] - va[2]) / span];
}

/**
 * Total force on an object from everything except gravity (contacts, springs,
 * hinges): F = m·a − m·g. Zero while it rests. Pointing where it is pushed.
 */
export function contactForceAt(samples, dt, t, mass) {
  const a = accelerationAt(samples, dt, t);
  return [mass * a[0], mass * (a[1] + G), mass * a[2]];
}

/** Pose of any object in a run at time t: from its track if it moved, else from the setup. */
export function poseInRun(run, id, t) {
  const track = run.tracks[id];
  if (track) return samplePose(track.samples, run.dt, t);
  const def = run.setup.find((d) => d.id === id);
  return def && isObject(def) ? poseOfDef(def) : null;
}

/** Spring end points in lab space at time t. */
export function springEnds(run, spring, t, poseOf = (id) => poseInRun(run, id, t)) {
  const pa = poseOf(spring.a), pb = poseOf(spring.b);
  if (!pa || !pb) return null;
  return [toWorld(pa, spring.anchorA), toWorld(pb, spring.anchorB)];
}

function hingeAngleDeg(qa, qb, qa0, qb0, axis) {
  const rel = quatMultiply(quatConjugate(qb), qa);
  const rel0 = quatMultiply(quatConjugate(qb0), qa0);
  const d = quatMultiply(rel, quatConjugate(rel0));
  const s = d[0] * axis[0] + d[1] * axis[1] + d[2] * axis[2];
  return (2 * Math.atan2(s, d[3]) * 180) / Math.PI;
}

/**
 * A time series for a graph. `source` is a finished run or a live view
 * `{ dt, setup, tracks }` whose sample arrays are still growing.
 * Returns { t: number[], v: number[] } downsampled to ≤ MAX_POINTS points.
 */
export function series(source, kind, subjectId) {
  const { dt, setup, tracks } = source;
  const def = setup.find((d) => d.id === subjectId);
  if (!def) return null;
  const n = (() => {
    if (isObject(def)) return tracks[subjectId] ? frameCount(tracks[subjectId].samples) : 0;
    const ids = [def.a, def.b].filter((id) => tracks[id]);
    return ids.length ? Math.min(...ids.map((id) => frameCount(tracks[id].samples))) : 0;
  })();
  if (n === 0) return { t: [], v: [] };
  const step = Math.max(1, Math.ceil(n / MAX_POINTS));
  const t = [], v = [];
  const target = targetDef(setup);
  const poseAt = (id, i) => (tracks[id] ? poseAtFrame(tracks[id].samples, Math.min(i, frameCount(tracks[id].samples) - 1)) : poseOfDef(setup.find((d) => d.id === id)));

  for (let i = 0; i < n; i += step) {
    let value = null;
    if (kind === 'speed') {
      const vel = velocityAtFrame(tracks[subjectId].samples, dt, i);
      value = Math.hypot(...vel);
    } else if (kind === 'height') {
      value = tracks[subjectId].samples[i * STRIDE + 1];
    } else if (kind === 'distance' && target) {
      const p = posAt(tracks[subjectId].samples, i);
      value = Math.hypot(p[0] - target.position[0], p[2] - target.position[2]);
    } else if ((kind === 'stretch' || kind === 'force') && def.kind === 'spring') {
      const len = dist(toWorld(poseAt(def.a, i), def.anchorA), toWorld(poseAt(def.b, i), def.anchorB));
      value = kind === 'stretch' ? len - def.restLength : def.stiffness * (len - def.restLength);
    } else if (kind === 'angle' && def.kind === 'hinge') {
      const a = poseAt(def.a, i), b = poseAt(def.b, i), a0 = poseAt(def.a, 0), b0 = poseAt(def.b, 0);
      value = hingeAngleDeg(a.q, b.q, a0.q, b0.q, AXES[def.axis] || AXES.z);
    }
    if (value === null) continue;
    t.push(i * dt);
    v.push(value);
  }
  return { t, v };
}

/** Moments where an object's velocity changed sharply: bounces and hits. */
export function impacts(samples, dt, { threshold = 0.6, minGap = 0.12 } = {}) {
  const n = frameCount(samples);
  const out = [];
  let last = -Infinity;
  for (let i = 2; i < n - 1; i++) {
    const v0 = velocityAtFrame(samples, dt, i - 1, 1);
    const v1 = velocityAtFrame(samples, dt, i + 1, 1);
    const dv = Math.hypot(v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]);
    if (dv < threshold) continue;
    const time = i * dt;
    if (time - last < minGap) {
      if (dv > out[out.length - 1].dv) Object.assign(out[out.length - 1], { t: time, p: posAt(samples, i), dv });
      continue;
    }
    out.push({ t: time, p: posAt(samples, i), dv });
    last = time;
  }
  return out;
}
