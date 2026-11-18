// Spatial comparison: draws the recorded paths of Run A and Run B in the same
// scene, with time ticks, impact markers, translucent "ghost" objects (and
// ghost springs/hinges) you can scrub through time, velocity/force arrows on
// the ghosts, wireframes of each run's fixed setup, and a link showing the gap.
import * as THREE from 'three';
import { buildMesh, applyPose, disposeObject } from './objectViews.js';
import { createConstraintVisual } from './constraintViews.js';
import { ArrowSet } from './arrows.js';
import { samplePose, STRIDE } from '../core/recorder.js';
import { velocityAt, contactForceAt, impacts, springEnds, poseInRun } from '../core/derived.js';
import { isConstraint, isObject, toWorld } from '../core/defs.js';

export const RUN_COLORS = { A: 0x3b82f6, B: 0xf97316 };
export const RUN_CSS = { A: '#3b82f6', B: '#f97316' };
const TICK_SECONDS = 0.25;
const MIN_PATH = 0.01;

export class ComparisonOverlay {
  constructor(parent) {
    this.group = new THREE.Group();
    this.group.name = 'comparison-overlay';
    parent.add(this.group);
    this.runs = { A: null, B: null };
    this.parts = { A: null, B: null };
    this.options = { paths: true, ghosts: true, setups: true, arrows: false, impacts: true };
    this.time = 0;

    const linkGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    this.link = new THREE.Line(linkGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
    this.link.visible = false;
    this.link.frustumCulled = false;
    this.group.add(this.link);
    this.arrows = new ArrowSet(this.group);
  }

  setRuns(slots) {
    for (const slot of ['A', 'B']) {
      const run = slots[slot] || null;
      if (this.runs[slot] === run) continue;
      if (this.parts[slot]) disposeObject(this.parts[slot].root);
      this.parts[slot] = run ? this.buildPart(run, slot) : null;
      this.runs[slot] = run;
    }
    this.applyOptions();
    this.setTime(this.time);
  }

  buildPart(run, slot) {
    const color = RUN_COLORS[slot];
    const root = new THREE.Group();
    root.name = `run-${slot}`;
    const paths = new THREE.Group();
    const marks = new THREE.Group();
    const ghosts = new Map();
    const ghostLinks = [];
    const setups = new THREE.Group();
    const defsById = new Map(run.setup.map((d) => [d.id, d]));

    for (const [id, track] of Object.entries(run.tracks)) {
      const def = defsById.get(id);
      if (!def) continue;
      const pts = [];
      const n = track.samples.length / STRIDE;
      const every = Math.max(1, Math.floor(n / 400));
      for (let i = 0; i < n; i += every) {
        const o = i * STRIDE;
        pts.push(new THREE.Vector3(track.samples[o], track.samples[o + 1], track.samples[o + 2]));
      }
      const lastO = (n - 1) * STRIDE;
      pts.push(new THREE.Vector3(track.samples[lastO], track.samples[lastO + 1], track.samples[lastO + 2]));
      const travelled = run.metrics?.tracks[id]?.pathLength ?? 1;

      if (pts.length >= 2 && travelled > MIN_PATH) {
        const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, Math.min(800, pts.length * 2), 0.006, 6, false),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
        tube.raycast = () => {};
        paths.add(tube);

        // Equal-time ticks: spacing shows speed at a glance (every 4th tick is brighter = 1 s).
        const tickCount = Math.floor(run.duration / TICK_SECONDS) + 1;
        const ticks = new THREE.InstancedMesh(new THREE.SphereGeometry(0.011, 10, 6),
          new THREE.MeshBasicMaterial({ color: 0xffffff }), tickCount);
        const m = new THREE.Matrix4();
        for (let k = 0; k < tickCount; k++) {
          const pose = samplePose(track.samples, run.dt, k * TICK_SECONDS);
          m.makeTranslation(pose.p[0], pose.p[1], pose.p[2]);
          ticks.setMatrixAt(k, m);
          ticks.setColorAt(k, new THREE.Color(k % 4 === 0 ? 0xffffff : color).lerp(new THREE.Color(0xffffff), 0.35));
        }
        ticks.raycast = () => {};
        paths.add(ticks);

        // Impact markers: flat rings where the object hit something.
        for (const hit of impacts(track.samples, run.dt)) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.min(0.05, 0.015 + hit.dv * 0.01), 0.004, 6, 24),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, depthTest: false }));
          ring.position.fromArray(hit.p);
          ring.rotation.x = Math.PI / 2;
          ring.renderOrder = 5;
          ring.userData.impact = hit;
          ring.raycast = () => {};
          marks.add(ring);
        }
      }

      const ghost = buildMesh(def, { ghost: { color, opacity: 0.5 } });
      ghosts.set(id, ghost);
      root.add(ghost);
    }

    // Ghost springs and hinges follow the ghost objects.
    for (const def of run.setup.filter(isConstraint)) {
      const v = createConstraintVisual(def, { ghost: { color, opacity: 0.75 } });
      root.add(v.root);
      ghostLinks.push({ def, ...v });
    }

    // Wireframes of the fixed parts of this run's setup (e.g. the ramp at its angle in this run).
    for (const def of run.setup) {
      if (!isObject(def) || run.tracks[def.id]) continue;
      const wire = buildMesh(def, { ghost: { color, opacity: 0.55, wireframe: def.kind !== 'target' } });
      applyPose(wire, def.position, def.quaternion);
      setups.add(wire);
    }

    root.add(paths, marks, setups);
    this.group.add(root);
    return { root, paths, marks, ghosts, ghostLinks, setups, primaryId: run.metrics?.primaryId ?? null };
  }

  setOptions(opts) {
    Object.assign(this.options, opts);
    this.applyOptions();
    this.setTime(this.time);
  }

  applyOptions() {
    for (const part of Object.values(this.parts)) {
      if (!part) continue;
      part.paths.visible = this.options.paths;
      part.marks.visible = this.options.impacts;
      part.setups.visible = this.options.setups;
      for (const g of part.ghosts.values()) g.visible = this.options.ghosts;
      for (const l of part.ghostLinks) l.root.visible = this.options.ghosts;
    }
    this.updateLink();
  }

  duration() {
    return Math.max(this.runs.A?.duration ?? 0, this.runs.B?.duration ?? 0);
  }

  setTime(t) {
    this.time = Math.max(0, Math.min(t, this.duration()));
    const arrows = [];
    for (const slot of ['A', 'B']) {
      const part = this.parts[slot];
      const run = this.runs[slot];
      if (!part) continue;
      for (const [id, ghost] of part.ghosts) {
        const track = run.tracks[id];
        const pose = samplePose(track.samples, run.dt, this.time);
        if (!pose) continue;
        applyPose(ghost, pose.p, pose.q);
        if (this.options.arrows && this.options.ghosts) {
          const def = run.setup.find((d) => d.id === id);
          arrows.push({
            id: `${slot}:${id}`, origin: pose.p,
            velocity: velocityAt(track.samples, run.dt, this.time),
            force: contactForceAt(track.samples, run.dt, this.time, def?.mass ?? 1),
          });
        }
      }
      const poseOf = (id) => poseInRun(run, id, this.time);
      for (const l of part.ghostLinks) {
        if (l.def.kind === 'spring') {
          const ends = springEnds(run, l.def, this.time, poseOf);
          if (ends) l.update(ends[0], ends[1]);
        } else {
          const pa = poseOf(l.def.a);
          if (pa) l.update(toWorld(pa, l.def.pivotA));
        }
      }
    }
    this.arrows.set(arrows);
    this.updateLink();
    // Highlight impacts that have already happened by this time.
    for (const part of Object.values(this.parts)) {
      if (!part) continue;
      for (const ring of part.marks.children) ring.material.opacity = ring.userData.impact.t <= this.time + 1e-6 ? 0.95 : 0.3;
    }
  }

  /** White line between the primary object in A and B at the current time. */
  updateLink() {
    const a = this.parts.A, b = this.parts.B;
    const id = a?.primaryId && a.primaryId === b?.primaryId ? a.primaryId : null;
    const ga = id && a.ghosts.get(id);
    const gb = id && b.ghosts.get(id);
    if (!ga || !gb || !this.options.ghosts) { this.link.visible = false; return; }
    const pos = this.link.geometry.attributes.position;
    pos.setXYZ(0, ga.position.x, ga.position.y, ga.position.z);
    pos.setXYZ(1, gb.position.x, gb.position.y, gb.position.z);
    pos.needsUpdate = true;
    this.link.visible = true;
  }

  setVisible(v) {
    this.group.visible = v;
  }
}
