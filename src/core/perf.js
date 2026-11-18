// Frame-time and physics-cost monitoring, plus a repeatable physics benchmark.
// Produces the evidence for performance claims (frame rate, p95 frame time,
// budget overruns) and can export it as CSV. Pure JS.

export class PerfMonitor {
  constructor({ size = 600 } = {}) {
    this.size = size;
    this.frame = new Float32Array(size);
    this.physics = new Float32Array(size);
    this.render = new Float32Array(size);
    this.count = 0;
    this.head = 0;
    this.budgetMs = 1000 / 60;
    this.log = [];
    this.secondAcc = { t: 0, frames: 0, frameSum: 0, frameMax: 0, physSum: 0, renderSum: 0, over: 0 };
    this.context = () => ({});
  }

  setTargetFps(fps) {
    this.budgetMs = 1000 / (fps || 60);
  }

  record(frameMs, physicsMs, renderMs) {
    const i = this.head;
    this.frame[i] = frameMs; this.physics[i] = physicsMs; this.render[i] = renderMs;
    this.head = (i + 1) % this.size;
    this.count = Math.min(this.count + 1, this.size);

    const s = this.secondAcc;
    s.t += frameMs; s.frames++; s.frameSum += frameMs; s.frameMax = Math.max(s.frameMax, frameMs);
    s.physSum += physicsMs; s.renderSum += renderMs;
    if (frameMs > this.budgetMs * 1.5) s.over++;
    if (s.t >= 1000) {
      this.log.push({
        at: new Date().toISOString(), fps: +(s.frames * 1000 / s.t).toFixed(1),
        frameAvgMs: +(s.frameSum / s.frames).toFixed(2), frameMaxMs: +s.frameMax.toFixed(2),
        physicsAvgMs: +(s.physSum / s.frames).toFixed(3), renderAvgMs: +(s.renderSum / s.frames).toFixed(3),
        overBudgetFrames: s.over, budgetMs: +this.budgetMs.toFixed(2), ...this.context(),
      });
      if (this.log.length > 3600) this.log.shift();
      this.secondAcc = { t: 0, frames: 0, frameSum: 0, frameMax: 0, physSum: 0, renderSum: 0, over: 0 };
    }
  }

  stats() {
    const n = this.count;
    if (!n) return null;
    const frames = Array.from(this.frame.subarray(0, n)).sort((a, b) => a - b);
    const sum = (arr) => { let s = 0; for (let i = 0; i < n; i++) s += arr[i]; return s; };
    const avg = sum(this.frame) / n;
    return {
      samples: n,
      fps: 1000 / avg,
      frameAvgMs: avg,
      frameP95Ms: frames[Math.min(n - 1, Math.floor(n * 0.95))],
      frameMaxMs: frames[n - 1],
      overBudgetPct: (frames.filter((f) => f > this.budgetMs * 1.5).length / n) * 100,
      physicsAvgMs: sum(this.physics) / n,
      renderAvgMs: sum(this.render) / n,
      budgetMs: this.budgetMs,
    };
  }

  csv() {
    if (!this.log.length) return 'no data\n';
    const keys = Object.keys(this.log[0]);
    return [keys.join(','), ...this.log.map((r) => keys.map((k) => JSON.stringify(r[k] ?? '')).join(','))].join('\n');
  }
}

/** Physics cost per step for each example, measured with runToEnd(). */
export function benchmark({ Simulation, RunStore, examples, repeats = 3, now = () => performance.now() }) {
  const results = [];
  for (const name of examples) {
    let steps = 0, ms = 0, simSeconds = 0;
    for (let r = 0; r < repeats; r++) {
      const sim = new Simulation({ runStore: new RunStore() });
      sim.loadExample(name);
      const t0 = now();
      const run = sim.runToEnd();
      ms += now() - t0;
      steps += run.frameCount;
      simSeconds += run.duration;
    }
    results.push({
      example: name,
      steps,
      msPerStep: ms / steps,
      realtimeFactor: (simSeconds * 1000) / ms, // how many times faster than real time
    });
  }
  return results;
}
