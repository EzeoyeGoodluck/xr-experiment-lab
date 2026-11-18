// Keeps the run history ("experiment notebook"), persists it in the browser
// and imports/exports it as JSON. Pure JS apart from optional localStorage.
import { computeRunMetrics } from './metrics.js';

const STORAGE_KEY = 'xr-experiment-lab.runs.v1';
const MAX_RUNS = 30;

export function runToJSON(run) {
  const tracks = {};
  for (const [id, t] of Object.entries(run.tracks)) tracks[id] = { samples: Array.from(t.samples, (v) => +v.toFixed(5)) };
  const { metrics, ...rest } = run;
  return { ...rest, tracks };
}

export function runFromJSON(obj) {
  if (!obj || obj.schema !== 1 || !obj.tracks || !Array.isArray(obj.setup)) throw new Error('Not a recognised run file');
  const tracks = {};
  for (const [id, t] of Object.entries(obj.tracks)) tracks[id] = { samples: Float32Array.from(t.samples) };
  const run = { ...obj, tracks };
  run.metrics = computeRunMetrics(run);
  return run;
}

export class RunStore extends EventTarget {
  constructor({ storage = null } = {}) {
    super();
    this.storage = storage;
    this.runs = [];
    this.counter = 0;
    this.slots = { A: null, B: null };
  }

  nextName() {
    this.counter += 1;
    return { id: `run-${Date.now().toString(36)}-${this.counter}`, name: `Run ${this.counter}` };
  }

  add(run) {
    run.metrics = computeRunMetrics(run);
    this.runs.push(run);
    while (this.runs.length > MAX_RUNS) this.runs.shift();
    // Newest run goes to B, the previous B moves to A: the natural "before / after".
    const prevB = this.get(this.slots.B);
    this.slots.A = prevB ? prevB.id : this.slots.A;
    this.slots.B = run.id;
    if (this.slots.A === this.slots.B) this.slots.A = null;
    this.changed();
    return run;
  }

  get(id) {
    return this.runs.find((r) => r.id === id) || null;
  }

  remove(id) {
    this.runs = this.runs.filter((r) => r.id !== id);
    for (const k of ['A', 'B']) if (this.slots[k] === id) this.slots[k] = null;
    this.changed();
  }

  rename(id, name) {
    const run = this.get(id);
    if (run) { run.name = name; this.changed(); }
  }

  setNotes(id, notes) {
    const run = this.get(id);
    if (run) { run.notes = notes; this.changed({ quiet: true }); }
  }

  setSlot(slot, id) {
    this.slots[slot] = id && this.get(id) ? id : null;
    this.changed();
  }

  slotRuns() {
    return { A: this.get(this.slots.A), B: this.get(this.slots.B) };
  }

  clear() {
    this.runs = [];
    this.slots = { A: null, B: null };
    this.changed();
  }

  toJSON() {
    return { app: 'xr-experiment-lab', schema: 1, exportedAt: new Date().toISOString(),
      counter: this.counter, slots: this.slots, runs: this.runs.map(runToJSON) };
  }

  loadJSON(obj, { replace = true } = {}) {
    if (!obj || obj.app !== 'xr-experiment-lab') throw new Error('Not an XR Experiment Lab file');
    const runs = obj.runs.map(runFromJSON);
    if (replace) {
      this.runs = runs;
      this.slots = { A: null, B: null, ...(obj.slots || {}) };
    } else {
      const known = new Set(this.runs.map((r) => r.id));
      this.runs.push(...runs.filter((r) => !known.has(r.id)));
    }
    this.counter = Math.max(this.counter, obj.counter || 0, this.runs.length);
    this.changed();
  }

  save() {
    if (!this.storage) return;
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.toJSON()));
    } catch (err) {
      console.warn('[runs] could not save to browser storage', err);
    }
  }

  restore() {
    if (!this.storage) return false;
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      if (!raw) return false;
      this.loadJSON(JSON.parse(raw));
      return true;
    } catch (err) {
      console.warn('[runs] could not restore saved runs', err);
      return false;
    }
  }

  changed({ quiet = false } = {}) {
    this.save();
    if (!quiet) this.dispatchEvent(new Event('change'));
  }
}
