// Renderer, camera, lights, the workbench and room, and XR mode changes.
// Everything belonging to the experiment lives under `labRoot`, whose origin is
// the bench top. In VR the bench stands at table height in front of you; in AR
// the whole lab is placed (and can be scaled) on a real surface.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BENCH } from '../core/defs.js';
import { XRSessionManager } from './xrSession.js';

const BACKGROUND = 0x1b1f27;
const ASSUMED_EYE_HEIGHT = 1.6; // used only if the device can't report the floor

function benchTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#323a48'; g.fillRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,0.10)'; g.lineWidth = 2; g.strokeRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,0.05)'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(64, 0); g.lineTo(64, 128); g.moveTo(0, 64); g.lineTo(128, 64); g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(BENCH.width / 0.2, BENCH.depth / 0.2); // 20 cm squares, 10 cm sub-lines
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export class Stage extends EventTarget {
  constructor(container, { overlayRoot, xrButtonHost }) {
    super();
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.xr.enabled = true;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(BACKGROUND);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 60);
    this.camera.position.set(1.0, BENCH.height + 0.95, 0.4);
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.target.set(0, BENCH.height + 0.2, BENCH.centerZ);
    this.orbit.maxPolarAngle = Math.PI * 0.62;
    this.orbit.minDistance = 0.3;
    this.orbit.maxDistance = 8;
    this.orbit.enableDamping = true;
    this.orbit.update();
    this.resize();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4250, 1.4));

    this.labRoot = new THREE.Group();
    this.labRoot.name = 'lab-root';
    this.labRoot.position.y = BENCH.height;
    this.scene.add(this.labRoot);

    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(1.5, 3.2, BENCH.centerZ + 1.6);
    sun.target.position.set(0, 0, BENCH.centerZ);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -2.2, right: 2.2, top: 2.2, bottom: -2.2, near: 0.5, far: 8 });
    sun.shadow.bias = -0.0005;
    this.labRoot.add(sun, sun.target);

    // Workbench: top surface at lab y = 0.
    this.bench = new THREE.Group();
    this.bench.name = 'bench';
    const top = new THREE.Mesh(new THREE.BoxGeometry(BENCH.width, 0.06, BENCH.depth),
      [null, null, new THREE.MeshStandardMaterial({ map: benchTexture(), roughness: 0.9 }), null, null, null]
        .map((m) => m || new THREE.MeshStandardMaterial({ color: 0x262c37, roughness: 0.9 })));
    top.position.set(0, -0.03, BENCH.centerZ);
    top.receiveShadow = true;
    top.name = 'bench-top';
    this.bench.add(top);
    const legGeo = new THREE.BoxGeometry(0.06, BENCH.height - 0.06, 0.06);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1d222b, roughness: 0.8 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(sx * (BENCH.width / 2 - 0.08), -BENCH.height / 2 - 0.03, BENCH.centerZ + sz * (BENCH.depth / 2 - 0.08));
      this.bench.add(leg);
    }
    this.shadowCatcher = new THREE.Mesh(new THREE.PlaneGeometry(BENCH.width, BENCH.depth), new THREE.ShadowMaterial({ opacity: 0.35 }));
    this.shadowCatcher.rotation.x = -Math.PI / 2;
    this.shadowCatcher.position.set(0, 0.0005, BENCH.centerZ);
    this.shadowCatcher.receiveShadow = true;
    this.shadowCatcher.visible = false;
    this.labRoot.add(this.bench, this.shadowCatcher);

    // Room floor (world y = 0), not part of the lab.
    this.room = new THREE.Group();
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: 0x20252e, roughness: 1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    const grid = new THREE.GridHelper(14, 14, 0x3a4250, 0x2b313c);
    grid.position.y = 0.001;
    this.room.add(floor, grid);
    this.scene.add(this.room);

    new ResizeObserver(() => { if (!this.renderer.xr.isPresenting) this.resize(); }).observe(container);

    this.mode = 'desktop'; // 'desktop' | 'vr' | 'ar'
    this.xr = new XRSessionManager(this.renderer, { overlayRoot, host: xrButtonHost });
    this.xr.addEventListener('start', (e) => this.onSessionStart(e.detail));
    this.xr.addEventListener('end', () => this.onSessionEnd());
    this.xr.detect();
  }

  resize() {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 1 ? 72 : 55; // wider view on portrait phones
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  onSessionStart({ mode, floorFallback }) {
    this.mode = mode;
    this.resetLabTransform();
    // With an eye-level origin, lower the lab so the bench is still at table height.
    if (floorFallback && mode === 'vr') this.labRoot.position.y = BENCH.height - ASSUMED_EYE_HEIGHT;
    if (mode === 'ar') {
      this.scene.background = null;
      this.room.visible = false;
      this.bench.visible = false;
      this.shadowCatcher.visible = true;
    }
    document.body.classList.add(`xr-${mode}`);
    this.dispatchEvent(new CustomEvent('mode', { detail: { mode, floorFallback } }));
  }

  onSessionEnd() {
    document.body.classList.remove('xr-vr', 'xr-ar');
    this.mode = 'desktop';
    this.scene.background = new THREE.Color(BACKGROUND);
    this.room.visible = true;
    this.bench.visible = true;
    this.shadowCatcher.visible = false;
    this.resetLabTransform();
    this.resize();
    this.dispatchEvent(new CustomEvent('mode', { detail: { mode: 'desktop' } }));
  }

  resetLabTransform() {
    this.labRoot.position.set(0, BENCH.height, 0);
    this.labRoot.quaternion.identity();
    this.labRoot.scale.setScalar(1);
  }

  /** Convert a world-space point to lab-local coordinates. */
  toLab(v) {
    return this.labRoot.worldToLocal(v.clone());
  }

  render() {
    if (this.mode === 'desktop') this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  }
}
