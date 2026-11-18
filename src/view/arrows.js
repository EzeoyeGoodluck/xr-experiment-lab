// Velocity and force arrows attached to objects (live or ghost).
import * as THREE from 'three';

export const VELOCITY_COLOR = 0x22d3ee;
export const FORCE_COLOR = 0xe879f9;
const VEL_SCALE = 0.22; // metres of arrow per m/s
const FORCE_SCALE = 0.035; // metres of arrow per newton
const MAX_LEN = 0.7;
const MIN_LEN = 0.012;

function makeArrow(color) {
  const a = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 0.1, color, 0.04, 0.025);
  a.line.material.depthTest = false;
  a.cone.material.depthTest = false;
  a.renderOrder = 10;
  a.traverse((o) => { o.raycast = () => {}; });
  return a;
}

const dir = new THREE.Vector3();

function setArrow(arrow, origin, vec, scale) {
  dir.fromArray(vec);
  const len = Math.min(MAX_LEN, dir.length() * scale);
  if (len < MIN_LEN) { arrow.visible = false; return; }
  arrow.visible = true;
  arrow.position.fromArray(origin);
  arrow.setDirection(dir.normalize());
  arrow.setLength(len, Math.min(0.04, len * 0.4), Math.min(0.025, len * 0.25));
}

export class ArrowSet {
  constructor(parent) {
    this.group = new THREE.Group();
    this.group.name = 'arrows';
    parent.add(this.group);
    this.items = new Map(); // id -> { vel, force }
  }

  ensure(id) {
    let item = this.items.get(id);
    if (!item) {
      item = { vel: makeArrow(VELOCITY_COLOR), force: makeArrow(FORCE_COLOR) };
      this.group.add(item.vel, item.force);
      this.items.set(id, item);
    }
    return item;
  }

  /** @param {Array<{id:string, origin:number[], velocity?:number[]|null, force?:number[]|null}>} list */
  set(list, { velocity = true, force = true } = {}) {
    const seen = new Set();
    for (const e of list) {
      seen.add(e.id);
      const item = this.ensure(e.id);
      if (velocity && e.velocity) setArrow(item.vel, e.origin, e.velocity, VEL_SCALE); else item.vel.visible = false;
      if (force && e.force) setArrow(item.force, e.origin, e.force, FORCE_SCALE); else item.force.visible = false;
    }
    for (const [id, item] of this.items) {
      if (!seen.has(id)) { item.vel.visible = false; item.force.visible = false; }
    }
  }

  clear() {
    for (const item of this.items.values()) { item.vel.visible = false; item.force.visible = false; }
  }
}
