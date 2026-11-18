// Records a run: the setup it started from plus a pose for every moving object
// at every physics step. Pure JS so it can be unit-tested in Node.
import { cloneSetup } from './defs.js';

export const STRIDE = 7; // px py pz qx qy qz qw

export class RunRecorder {
  constructor() {
    this.active = false;
  }

  start({ setup, dt, trackedIds }) {
    this.setup = cloneSetup(setup);
    this.dt = dt;
    this.buffers = new Map(trackedIds.map((id) => [id, []]));
    this.frames = 0;
    this.active = true;
  }

  /** @param {(id: string) => ({p:number[], q:number[]} | null)} poseOf */
  capture(poseOf) {
    if (!this.active) return;
    for (const [id, buf] of this.buffers) {
      const pose = poseOf(id);
      if (!pose) continue;
      buf.push(pose.p[0], pose.p[1], pose.p[2], pose.q[0], pose.q[1], pose.q[2], pose.q[3]);
    }
    this.frames++;
  }

  finish({ id, name, endReason }) {
    this.active = false;
    const tracks = {};
    for (const [objId, buf] of this.buffers) tracks[objId] = { samples: Float32Array.from(buf) };
    return {
      schema: 1,
      id,
      name,
      createdAt: new Date().toISOString(),
      dt: this.dt,
      frameCount: this.frames,
      duration: Math.max(0, (this.frames - 1) * this.dt),
      endReason,
      setup: this.setup,
      tracks,
      notes: '',
    };
  }
}

/** Interpolated pose of a track at time t (clamped to the recorded range). */
export function samplePose(samples, dt, t) {
  const n = samples.length / STRIDE;
  if (n === 0) return null;
  const f = Math.max(0, Math.min(n - 1, t / dt));
  const i = Math.floor(f);
  const j = Math.min(n - 1, i + 1);
  const a = f - i;
  const o = i * STRIDE;
  const u = j * STRIDE;
  const p = [0, 1, 2].map((k) => samples[o + k] + (samples[u + k] - samples[o + k]) * a);
  // Normalised lerp, taking the short way round.
  let qb = [3, 4, 5, 6].map((k) => samples[u + k]);
  const qa = [3, 4, 5, 6].map((k) => samples[o + k]);
  if (qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2] + qa[3] * qb[3] < 0) qb = qb.map((v) => -v);
  const q = qa.map((v, k) => v + (qb[k] - v) * a);
  const len = Math.hypot(...q) || 1;
  return { p, q: q.map((v) => v / len) };
}

export function trackLength(samples) {
  return samples.length / STRIDE;
}
