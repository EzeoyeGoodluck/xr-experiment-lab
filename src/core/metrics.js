// Measurements derived from a recorded run. Pure JS.
import { STRIDE, samplePose } from './recorder.js';
import { primaryObjectId, targetDef } from './defs.js';

const REST_SPEED = 0.03; // m/s: below this an object counts as stopped
const ZONE_HEIGHT = 0.5; // m above the target that still counts as "in"

export function computeTrackMetrics(samples, dt, target) {
  const n = samples.length / STRIDE;
  let pathLength = 0;
  let maxSpeed = 0;
  let lastMovingFrame = 0;
  let minDistance = Infinity;
  let minDistanceTime = null;
  let hitTime = null;

  for (let i = 0; i < n; i++) {
    const o = i * STRIDE;
    const x = samples[o], y = samples[o + 1], z = samples[o + 2];
    if (i > 0) {
      const d = Math.hypot(x - samples[o - STRIDE], y - samples[o - STRIDE + 1], z - samples[o - STRIDE + 2]);
      pathLength += d;
      const speed = d / dt;
      if (speed > maxSpeed) maxSpeed = speed;
      if (speed > REST_SPEED) lastMovingFrame = i;
    }
    if (target) {
      const h = Math.hypot(x - target.position[0], z - target.position[2]);
      if (h < minDistance) {
        minDistance = h;
        minDistanceTime = i * dt;
      }
      const dy = y - target.position[1];
      if (hitTime === null && h <= target.size.radius && dy >= -0.1 && dy <= ZONE_HEIGHT) hitTime = i * dt;
    }
  }

  const last = (n - 1) * STRIDE;
  const finalPosition = n > 0 ? [samples[last], samples[last + 1], samples[last + 2]] : null;
  const finalDistance = target && finalPosition
    ? Math.hypot(finalPosition[0] - target.position[0], finalPosition[2] - target.position[2])
    : null;
  const endsInTarget = target && finalDistance !== null ? finalDistance <= target.size.radius : null;

  return {
    pathLength,
    maxSpeed,
    timeToRest: lastMovingFrame * dt,
    finalPosition,
    finalDistance,
    endsInTarget,
    minDistance: target ? minDistance : null,
    minDistanceTime,
    hitTime,
  };
}

export function computeRunMetrics(run) {
  const target = targetDef(run.setup);
  const tracks = {};
  for (const [id, track] of Object.entries(run.tracks)) {
    tracks[id] = computeTrackMetrics(track.samples, run.dt, target);
  }
  return { primaryId: primaryObjectId(run.setup), targetId: target ? target.id : null, tracks };
}

export const METRIC_ROWS = [
  { key: 'finalDistance', label: 'Final distance to target', unit: 'm', better: 'lower' },
  { key: 'minDistance', label: 'Closest approach to target', unit: 'm', better: 'lower' },
  { key: 'hitTime', label: 'Time to reach target', unit: 's', better: 'lower' },
  { key: 'maxSpeed', label: 'Top speed', unit: 'm/s' },
  { key: 'pathLength', label: 'Distance travelled', unit: 'm' },
  { key: 'timeToRest', label: 'Time until stopped', unit: 's' },
];

/** Side-by-side rows for one object across two runs. */
export function compareMetrics(ma, mb, objectId) {
  const a = ma?.tracks[objectId] || null;
  const b = mb?.tracks[objectId] || null;
  return METRIC_ROWS.map((row) => {
    const va = a ? a[row.key] : null;
    const vb = b ? b[row.key] : null;
    const delta = va !== null && vb !== null ? vb - va : null;
    let winner = null;
    if (row.better && delta !== null && Math.abs(delta) > 1e-3) {
      winner = (row.better === 'lower') === (delta < 0) ? 'B' : 'A';
    }
    return { ...row, a: va, b: vb, delta, winner };
  });
}

/** Distance between the same object in two runs at time t. */
export function gapAt(runA, runB, objectId, t) {
  const ta = runA?.tracks[objectId];
  const tb = runB?.tracks[objectId];
  if (!ta || !tb) return null;
  const pa = samplePose(ta.samples, runA.dt, t);
  const pb = samplePose(tb.samples, runB.dt, t);
  if (!pa || !pb) return null;
  return Math.hypot(pa.p[0] - pb.p[0], pa.p[1] - pb.p[1], pa.p[2] - pb.p[2]);
}
