// Meshes for experiment objects. Built from the same defs as the physics.
import * as THREE from 'three';
import { isObject } from '../core/defs.js';

const textureCache = new Map();

/** Two-tone striped texture so you can see a ball rolling. */
function ballTexture(color) {
  if (textureCache.has(color)) return textureCache.get(color);
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = color; g.fillRect(0, 0, 256, 128);
  g.fillStyle = '#ffffff';
  g.fillRect(0, 54, 256, 20);
  g.fillRect(0, 0, 64, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(color, tex);
  return tex;
}

/**
 * @param {object} def
 * @param {{ghost?: {color:number, opacity?:number, wireframe?:boolean}}} [opts]
 */
export function buildMesh(def, { ghost = null } = {}) {
  const material = ghost
    ? new THREE.MeshBasicMaterial({ color: ghost.color, transparent: true, opacity: ghost.opacity ?? 0.4,
        depthWrite: false, wireframe: !!ghost.wireframe })
    : new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.55, metalness: 0.05 });

  let obj;
  if (def.kind === 'ball') {
    if (!ghost) { material.map = ballTexture(def.color); material.color.set(0xffffff); }
    obj = new THREE.Mesh(new THREE.SphereGeometry(def.size.radius, 32, 16), material);
  } else if (def.kind === 'box' || def.kind === 'ramp') {
    const { x, y, z } = def.size;
    obj = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), material);
    if (!ghost && def.isStatic) material.roughness = 0.8;
  } else if (def.kind === 'target') {
    const r = def.size.radius;
    obj = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.78, r, 48), material);
    ring.rotation.x = -Math.PI / 2;
    obj.add(ring);
    if (!ghost) {
      material.side = THREE.DoubleSide;
      const fill = new THREE.Mesh(new THREE.CircleGeometry(r * 0.78, 48),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.18, depthWrite: false }));
      fill.rotation.x = -Math.PI / 2;
      const zone = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.5, 48, 1, true),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide }));
      zone.position.y = 0.25;
      zone.raycast = () => {}; // only the ring/fill are clickable
      obj.add(fill, zone);
    }
  } else {
    throw new Error(`No mesh for kind ${def.kind}`);
  }

  obj.traverse((o) => {
    o.userData.objectId = def.id;
    if (o.isMesh && !ghost) { o.castShadow = def.kind !== 'target'; o.receiveShadow = true; }
    if (ghost) o.raycast = () => {};
  });
  obj.userData.objectId = def.id;
  obj.userData.signature = signature(def);
  return obj;
}

export function signature(def) {
  return JSON.stringify([def.kind, def.size, def.color, def.isStatic]);
}

export function applyPose(obj, p, q) {
  obj.position.set(p[0], p[1], p[2]);
  obj.quaternion.set(q[0], q[1], q[2], q[3]);
}

export function disposeObject(obj) {
  obj.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
  });
  obj.removeFromParent();
}

export class ObjectViews {
  constructor(parent) {
    this.group = new THREE.Group();
    this.group.name = 'experiment-objects';
    parent.add(this.group);
    /** @type {Map<string, THREE.Object3D>} */
    this.meshes = new Map();
    this.highlighted = null;
    this.held = new Set(); // ids currently held by a controller: don't overwrite their pose
  }

  /** Make the meshes match the defs (add, remove, rebuild, re-pose). */
  reconcile(allDefs) {
    const defs = allDefs.filter(isObject);
    const ids = new Set(defs.map((d) => d.id));
    for (const [id, mesh] of this.meshes) {
      if (!ids.has(id)) { disposeObject(mesh); this.meshes.delete(id); }
    }
    for (const def of defs) {
      let mesh = this.meshes.get(def.id);
      if (mesh && mesh.userData.signature !== signature(def)) {
        disposeObject(mesh);
        mesh = null;
      }
      if (!mesh) {
        mesh = buildMesh(def);
        this.group.add(mesh);
        this.meshes.set(def.id, mesh);
      }
      if (!this.held.has(def.id)) applyPose(mesh, def.position, def.quaternion);
    }
    this.setHighlight(this.highlighted);
  }

  updatePoses(poseOf) {
    for (const [id, mesh] of this.meshes) {
      if (this.held.has(id)) continue;
      const pose = poseOf(id);
      if (pose) applyPose(mesh, pose.p, pose.q);
    }
  }

  meshOf(id) {
    return this.meshes.get(id) || null;
  }

  pickables() {
    return [...this.meshes.values()];
  }

  /** Find the object id behind a raycast hit. */
  static idFromHit(hit) {
    let o = hit?.object;
    while (o && !o.userData.objectId) o = o.parent;
    return o ? o.userData.objectId : null;
  }

  setHighlight(id) {
    this.highlighted = id;
    for (const [mid, mesh] of this.meshes) {
      mesh.traverse((o) => {
        if (o.isMesh && o.material.emissive) o.material.emissive.setHex(mid === id ? 0x3a3a3a : 0x000000);
      });
    }
  }
}
