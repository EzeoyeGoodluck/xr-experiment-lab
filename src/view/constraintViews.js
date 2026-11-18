// Visuals for springs (a coil between two anchor points) and hinges (an axle
// at the pivot). Used for the live scene and, in run colours, for ghosts.
import * as THREE from 'three';
import { AXES } from '../core/defs.js';

const COIL_TURNS = 12;
const COIL_POINTS = 180;
const UP = new THREE.Vector3(0, 1, 0);

export function createConstraintVisual(def, { ghost = null } = {}) {
  const color = ghost ? ghost.color : def.color;
  const opacity = ghost ? (ghost.opacity ?? 0.7) : 1;
  const root = new THREE.Group();
  root.userData.objectId = def.id;
  let update;

  if (def.kind === 'spring') {
    const radius = ghost ? 0.018 : 0.022;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COIL_POINTS * 3), 3));
    const coil = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: ghost !== null, opacity }));
    coil.frustumCulled = false;
    const endGeo = new THREE.SphereGeometry(0.012, 10, 6);
    const endMat = new THREE.MeshBasicMaterial({ color, transparent: ghost !== null, opacity });
    const endA = new THREE.Mesh(endGeo, endMat), endB = new THREE.Mesh(endGeo, endMat);
    const proxy = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 8, 1, true), new THREE.MeshBasicMaterial({ visible: false }));
    root.add(coil, endA, endB);
    if (!ghost) root.add(proxy);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), d = new THREE.Vector3(), u = new THREE.Vector3(), w = new THREE.Vector3();
    update = (pa, pb) => {
      a.fromArray(pa); b.fromArray(pb);
      endA.position.copy(a); endB.position.copy(b);
      d.subVectors(b, a);
      const len = d.length() || 1e-6;
      d.divideScalar(len);
      u.copy(Math.abs(d.y) < 0.9 ? UP : new THREE.Vector3(1, 0, 0)).cross(d).normalize();
      w.crossVectors(d, u);
      const pos = geo.attributes.position;
      const lead = Math.min(0.03, len * 0.15); // straight bits at both ends
      for (let i = 0; i < COIL_POINTS; i++) {
        const f = i / (COIL_POINTS - 1);
        const along = f * len;
        const inCoil = along > lead && along < len - lead;
        const ang = f * COIL_TURNS * Math.PI * 2;
        const r = inCoil ? radius : 0;
        pos.setXYZ(i,
          a.x + d.x * along + (u.x * Math.cos(ang) + w.x * Math.sin(ang)) * r,
          a.y + d.y * along + (u.y * Math.cos(ang) + w.y * Math.sin(ang)) * r,
          a.z + d.z * along + (u.z * Math.cos(ang) + w.z * Math.sin(ang)) * r);
      }
      pos.needsUpdate = true;
      proxy.position.copy(a).addScaledVector(d, len / 2);
      proxy.scale.set(1, len, 1);
      proxy.quaternion.setFromUnitVectors(UP, d);
    };
  } else {
    const mat = ghost
      ? new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
      : new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.5 });
    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.14, 16), mat);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 8, 24), mat);
    const holder = new THREE.Group();
    holder.add(axle, ring);
    ring.rotation.x = Math.PI / 2; // ring perpendicular to the axle
    holder.quaternion.setFromUnitVectors(UP, new THREE.Vector3(...(AXES[def.axis] || AXES.z)));
    root.add(holder);
    if (ghost) { axle.raycast = () => {}; ring.raycast = () => {}; }
    update = (pivot) => { holder.position.fromArray(pivot); };
  }

  root.traverse((o) => { o.userData.objectId = def.id; });
  return { root, update, signature: JSON.stringify([def.kind, def.axis, def.color]) };
}

export class ConstraintViews {
  constructor(parent) {
    this.group = new THREE.Group();
    this.group.name = 'connections';
    parent.add(this.group);
    this.items = new Map(); // id -> { def, root, update, signature }
    this.highlighted = null;
  }

  reconcile(defs) {
    const wanted = new Map(defs.map((d) => [d.id, d]));
    for (const [id, item] of this.items) {
      if (!wanted.has(id) || item.signature !== JSON.stringify([wanted.get(id).kind, wanted.get(id).axis, wanted.get(id).color])) {
        item.root.removeFromParent();
        item.root.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
        this.items.delete(id);
      }
    }
    for (const def of defs) {
      if (!this.items.has(def.id)) {
        const v = createConstraintVisual(def);
        this.group.add(v.root);
        this.items.set(def.id, { ...v, def });
      } else {
        this.items.get(def.id).def = def;
      }
    }
    this.setHighlight(this.highlighted);
  }

  /** @param {(id:string, local:number[]) => number[]|null} pointOf lab-space point of a local point on an object */
  update(pointOf) {
    for (const item of this.items.values()) {
      const d = item.def;
      if (d.kind === 'spring') {
        const pa = pointOf(d.a, d.anchorA), pb = pointOf(d.b, d.anchorB);
        if (pa && pb) item.update(pa, pb);
      } else {
        const p = pointOf(d.a, d.pivotA);
        if (p) item.update(p);
      }
    }
  }

  pickables() {
    return [...this.items.values()].map((i) => i.root);
  }

  setHighlight(id) {
    this.highlighted = id;
    for (const [iid, item] of this.items) {
      item.root.traverse((o) => {
        if (!o.material || o.material.visible === false) return;
        if (o.material.emissive) o.material.emissive.setHex(iid === id ? 0x555555 : 0);
        else if (o.isLine || o.isMesh) o.material.color.set(iid === id ? '#ffffff' : item.def.color);
      });
    }
  }
}
