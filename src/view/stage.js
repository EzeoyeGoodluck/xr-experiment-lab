// Renderer, camera, lights, floor and XR session entry. Everything belonging
// to the experiment lives under `labRoot`, so in AR the whole lab can be
// placed on a real surface without touching the physics coordinates.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

export const LAB_CENTER = new THREE.Vector3(0, 0.3, -1.2);
const BACKGROUND = 0x1b1f27;

export class Stage extends EventTarget {
  constructor(container, { overlayRoot, xrButtonHost }) {
    super();
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.xr.enabled = true;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(BACKGROUND);

    this.camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.01, 60);
    this.camera.position.set(1.0, 1.25, 0.55);
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.target.copy(LAB_CENTER);
    this.orbit.maxPolarAngle = Math.PI * 0.495;
    this.orbit.minDistance = 0.3;
    this.orbit.maxDistance = 8;
    this.orbit.enableDamping = true;
    this.orbit.update();
    this.resize();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4250, 1.4));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(1.5, 4, 0.5);
    sun.target.position.copy(LAB_CENTER);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 10 });
    sun.shadow.bias = -0.0005;
    this.sun = sun;

    this.labRoot = new THREE.Group();
    this.labRoot.name = 'lab-root';
    this.scene.add(this.labRoot);
    this.labRoot.add(sun, sun.target);

    this.floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0x2a303b, roughness: 0.95 }));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.floor.name = 'floor';
    this.shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.ShadowMaterial({ opacity: 0.35 }));
    this.shadowFloor.rotation.x = -Math.PI / 2;
    this.shadowFloor.receiveShadow = true;
    this.shadowFloor.visible = false;
    this.grid = new THREE.GridHelper(10, 100, 0x5b6578, 0x343b48);
    this.grid.position.y = 0.0005;
    this.labRoot.add(this.floor, this.shadowFloor, this.grid);

    new ResizeObserver(() => { if (!this.renderer.xr.isPresenting) this.resize(); }).observe(container);

    this.mode = 'desktop'; // 'desktop' | 'vr' | 'ar'
    this.renderer.xr.addEventListener('sessionstart', () => this.onSessionStart());
    this.renderer.xr.addEventListener('sessionend', () => this.onSessionEnd());

    if (xrButtonHost) {
      xrButtonHost.appendChild(VRButton.createButton(this.renderer));
      xrButtonHost.appendChild(ARButton.createButton(this.renderer, {
        optionalFeatures: ['hit-test', 'dom-overlay'],
        domOverlay: { root: overlayRoot },
      }));
    }
  }

  resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.fov = w / h < 1 ? 72 : 55; // wider view on portrait phones
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  onSessionStart() {
    const session = this.renderer.xr.getSession();
    const blend = session.environmentBlendMode;
    this.mode = blend && blend !== 'opaque' ? 'ar' : 'vr';
    if (this.mode === 'ar') {
      this.scene.background = null;
      this.floor.visible = false;
      this.grid.visible = false;
      this.shadowFloor.visible = true;
    }
    document.body.classList.add(`xr-${this.mode}`);
    this.dispatchEvent(new CustomEvent('mode', { detail: { mode: this.mode } }));
  }

  onSessionEnd() {
    document.body.classList.remove('xr-vr', 'xr-ar');
    this.mode = 'desktop';
    this.scene.background = new THREE.Color(BACKGROUND);
    this.floor.visible = true;
    this.grid.visible = true;
    this.shadowFloor.visible = false;
    this.labRoot.position.set(0, 0, 0);
    this.labRoot.quaternion.identity();
    this.labRoot.scale.setScalar(1);
    this.dispatchEvent(new CustomEvent('mode', { detail: { mode: this.mode } }));
  }

  render() {
    if (this.mode === 'desktop') this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  }
}
