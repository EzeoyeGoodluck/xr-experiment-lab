// Headset controllers (VR) and screen taps (phone AR).
//
// VR, either hand:  trigger = grab & move objects (in edit mode)
//                   grip    = run → stop → back to setup
//                   stick   = scrub the comparison timeline
//                   A / X   = play / pause the replay
// AR (phone):       tap a surface to place the lab, tap an object to select it.
import * as THREE from 'three';
import { ObjectViews } from './objectViews.js';

const AR_TABLETOP_SCALE = 0.35;

export class XRInput {
  constructor({ stage, sim, views, editor, actions }) {
    this.stage = stage;
    this.sim = sim;
    this.views = views;
    this.editor = editor;
    this.actions = actions; // { cycleRun, togglePlay, scrubBy }
    this.raycaster = new THREE.Raycaster();
    this.grabs = new Map(); // controller -> { id, mesh }
    this.prevButtons = new Map();

    this.controllers = [0, 1].map((i) => this.setupController(i));

    // AR placement
    this.hitTestSource = null;
    this.placing = false;
    this.arScale = AR_TABLETOP_SCALE;
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.065, 40).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff }));
    this.reticle.matrixAutoUpdate = false;
    this.reticle.visible = false;
    stage.scene.add(this.reticle);

    stage.addEventListener('mode', (e) => this.onMode(e.detail.mode));
  }

  setupController(index) {
    const controller = this.stage.renderer.xr.getController(index);
    const ray = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    ray.scale.z = 2;
    ray.visible = false;
    controller.add(ray);
    controller.userData.ray = ray;

    controller.addEventListener('connected', (e) => {
      controller.userData.inputSource = e.data;
      ray.visible = e.data.targetRayMode === 'tracked-pointer';
    });
    controller.addEventListener('disconnected', () => {
      this.release(controller);
      controller.userData.inputSource = null;
      ray.visible = false;
    });
    controller.addEventListener('selectstart', () => this.onSelectStart(controller));
    controller.addEventListener('selectend', () => this.release(controller));
    controller.addEventListener('squeezestart', () => this.actions.cycleRun());
    this.stage.scene.add(controller);

    const grip = this.stage.renderer.xr.getControllerGrip(index);
    grip.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.1), new THREE.MeshStandardMaterial({ color: 0x9aa4b5 })));
    this.stage.scene.add(grip);
    return controller;
  }

  hitFromController(controller) {
    const m = new THREE.Matrix4().extractRotation(controller.matrixWorld);
    this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(m);
    return this.raycaster.intersectObjects(this.views.pickables(), true)[0] || null;
  }

  onSelectStart(controller) {
    const source = controller.userData.inputSource;
    if (this.stage.mode === 'ar' && source?.targetRayMode === 'screen') {
      if (this.placing || !this.placed) { this.placeLab(); return; }
      const hit = this.hitFromController(controller);
      if (hit) this.editor.select(ObjectViews.idFromHit(hit));
      return;
    }
    const hit = this.hitFromController(controller);
    if (!hit) return;
    const id = ObjectViews.idFromHit(hit);
    this.editor.select(id);
    if (this.sim.state !== 'edit') return;
    const mesh = this.views.meshOf(id);
    if (!mesh) return;
    controller.attach(mesh);
    this.views.held.add(id);
    this.grabs.set(controller, { id, mesh });
  }

  release(controller) {
    const grab = this.grabs.get(controller);
    if (!grab) return;
    this.grabs.delete(controller);
    this.views.group.attach(grab.mesh);
    this.views.held.delete(grab.id);
    this.sim.setPose(grab.id, grab.mesh.position.toArray(), grab.mesh.quaternion.toArray());
  }

  async onMode(mode) {
    this.placed = mode !== 'ar';
    this.placing = mode === 'ar';
    this.hitTestSource = null;
    this.reticle.visible = false;
    if (mode !== 'ar') return;
    const session = this.stage.renderer.xr.getSession();
    try {
      const viewer = await session.requestReferenceSpace('viewer');
      this.hitTestSource = await session.requestHitTestSource({ space: viewer });
    } catch (err) {
      console.warn('[ar] hit-test unavailable; placing the lab in front of you instead', err);
      this.placeLabInFront();
    }
  }

  startPlacing() {
    if (this.stage.mode === 'ar') this.placing = true;
  }

  setArScale(scale) {
    this.arScale = scale;
    this.stage.labRoot.scale.setScalar(scale);
  }

  /** Put the experiment centre (lab-local 0,0,-1.2) on the reticle, facing the viewer. */
  placeLab() {
    if (!this.reticle.visible) { if (!this.hitTestSource) this.placeLabInFront(); return; }
    const hit = new THREE.Vector3().setFromMatrixPosition(this.reticle.matrix);
    this.placeAt(hit);
  }

  placeLabInFront() {
    const cam = this.stage.renderer.xr.getCamera();
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion).setY(0).normalize();
    const hit = cam.position.clone().addScaledVector(dir, 0.6);
    hit.y -= 0.4;
    this.placeAt(hit);
  }

  placeAt(hit) {
    const root = this.stage.labRoot;
    const cam = this.stage.renderer.xr.getCamera().position;
    const yaw = Math.atan2(cam.x - hit.x, cam.z - hit.z);
    root.scale.setScalar(this.arScale);
    root.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const centre = new THREE.Vector3(0, 0, -1.2).multiplyScalar(this.arScale).applyQuaternion(root.quaternion);
    root.position.copy(hit).sub(centre);
    root.position.y = hit.y;
    this.placed = true;
    this.placing = false;
    this.reticle.visible = false;
  }

  update(dt, frame) {
    const session = this.stage.renderer.xr.getSession();
    if (!session) return;

    if (frame && this.hitTestSource && this.placing) {
      const results = frame.getHitTestResults(this.hitTestSource);
      const ref = this.stage.renderer.xr.getReferenceSpace();
      const pose = results.length ? results[0].getPose(ref) : null;
      this.reticle.visible = !!pose;
      if (pose) this.reticle.matrix.fromArray(pose.transform.matrix);
    }

    for (const source of session.inputSources) {
      const gp = source.gamepad;
      if (!gp) continue;
      const x = gp.axes.length >= 4 ? gp.axes[2] : (gp.axes[0] ?? 0);
      if (Math.abs(x) > 0.2) this.actions.scrubBy(x * dt * 1.5);
      const prev = this.prevButtons.get(source) || [];
      const pressed = gp.buttons.map((b) => b.pressed);
      if (pressed[4] && !prev[4]) this.actions.togglePlay();
      this.prevButtons.set(source, pressed);
    }
  }
}
