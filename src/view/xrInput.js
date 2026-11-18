// Headset controllers (VR / passthrough AR) and screen taps (phone AR).
//
// Controllers, either hand:
//   trigger  = press panel buttons / drag sliders; on an object: select it and
//              grab it (while editing); in connect mode: pick the ends
//   grip     = run → stop → back to setup
//   stick    = scrub the replay           A / X = play / pause
//   B / Y    = hide / show the panel
// Phone AR: tap a surface to place the lab, tap an object to select it.
import * as THREE from 'three';
import { ObjectViews } from './objectViews.js';
import { CanvasPanel } from './vrPanel.js';

const AR_TABLETOP_SCALE = 0.35;
const RAY_LENGTH = 3;

export class XRInput {
  constructor({ stage, sim, views, editor, menu, actions }) {
    Object.assign(this, { stage, sim, views, editor, menu, actions });
    this.raycaster = new THREE.Raycaster();
    this.grabs = new Map(); // controller -> { id, mesh }
    this.prevButtons = new Map();
    this.controllers = [0, 1].map((i) => this.setupController(i));

    // AR placement
    this.hitTestSource = null;
    this.placing = false;
    this.placed = true;
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
    ray.scale.z = RAY_LENGTH;
    ray.visible = false;
    controller.add(ray);
    controller.userData.ray = ray;
    controller.userData.cursor = CanvasPanel.cursor();
    this.stage.scene.add(controller.userData.cursor);

    controller.addEventListener('connected', (e) => {
      controller.userData.inputSource = e.data;
      ray.visible = e.data.targetRayMode === 'tracked-pointer';
      if (ray.visible) this.actions.onTrackedPointer?.();
    });
    controller.addEventListener('disconnected', () => {
      this.release(controller);
      this.menu.panel.release(controller);
      controller.userData.inputSource = null;
      ray.visible = false;
      controller.userData.cursor.visible = false;
    });
    controller.addEventListener('selectstart', () => this.onSelectStart(controller));
    controller.addEventListener('selectend', () => this.onSelectEnd(controller));
    controller.addEventListener('squeezestart', () => this.actions.cycleRun());
    this.stage.scene.add(controller);

    const grip = this.stage.renderer.xr.getControllerGrip(index);
    grip.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.1), new THREE.MeshStandardMaterial({ color: 0x9aa4b5 })));
    this.stage.scene.add(grip);
    return controller;
  }

  setRayFrom(controller) {
    const m = new THREE.Matrix4().extractRotation(controller.matrixWorld);
    this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(m);
  }

  panelHit(controller) {
    if (!this.menu.visible) return null;
    this.setRayFrom(controller);
    return this.raycaster.intersectObject(this.menu.mesh, false)[0] || null;
  }

  objectHit(controller) {
    this.setRayFrom(controller);
    return this.raycaster.intersectObjects(this.editor.pickables(), true)[0] || null;
  }

  onSelectStart(controller) {
    const source = controller.userData.inputSource;
    if (source?.targetRayMode === 'screen') {
      // Phone AR: first taps place the lab, later taps select.
      if (this.placing || !this.placed) { this.placeLab(); return; }
      const hit = this.objectHit(controller);
      this.editor.pick(hit ? ObjectViews.idFromHit(hit) : null);
      return;
    }
    const ph = this.panelHit(controller);
    if (ph) { this.menu.panel.press(controller, ph.uv); controller.userData.onPanel = true; return; }

    const hit = this.objectHit(controller);
    const id = hit ? ObjectViews.idFromHit(hit) : null;
    if (this.editor.connecting) { this.editor.pick(id); return; }
    this.editor.pick(id);
    if (!id || this.sim.state !== 'edit') return;
    const mesh = this.views.meshOf(id);
    if (!mesh) return; // connections can be selected but not grabbed
    controller.attach(mesh);
    this.views.held.add(id);
    this.grabs.set(controller, { id, mesh });
    this.actions.log?.('grab', { id });
  }

  onSelectEnd(controller) {
    if (controller.userData.onPanel) {
      controller.userData.onPanel = false;
      this.menu.panel.release(controller);
      return;
    }
    this.release(controller);
  }

  release(controller) {
    const grab = this.grabs.get(controller);
    if (!grab) return;
    this.grabs.delete(controller);
    this.views.group.attach(grab.mesh);
    this.views.held.delete(grab.id);
    this.sim.setPose(grab.id, grab.mesh.position.toArray(), grab.mesh.quaternion.toArray());
    this.actions.log?.('release', { id: grab.id });
  }

  async onMode(mode) {
    this.placed = mode !== 'ar';
    this.placing = mode === 'ar';
    this.hitTestSource = null;
    this.reticle.visible = false;
    for (const c of this.controllers) { this.release(c); c.userData.cursor.visible = false; }
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
    if (this.stage.mode === 'ar') this.stage.labRoot.scale.setScalar(scale);
  }

  /** Put the bench centre on the reticle (or in front of you), facing the viewer. */
  placeLab() {
    if (this.reticle.visible) this.placeAt(new THREE.Vector3().setFromMatrixPosition(this.reticle.matrix));
    else if (!this.hitTestSource) this.placeLabInFront();
  }

  placeLabInFront() {
    const cam = this.stage.renderer.xr.getCamera();
    const head = new THREE.Vector3(); cam.getWorldPosition(head);
    const q = new THREE.Quaternion(); cam.getWorldQuaternion(q);
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(q).setY(0).normalize();
    const hit = head.clone().addScaledVector(dir, 0.6);
    hit.y -= 0.4;
    this.placeAt(hit);
  }

  placeAt(hit) {
    const root = this.stage.labRoot;
    const cam = new THREE.Vector3(); this.stage.renderer.xr.getCamera().getWorldPosition(cam);
    const yaw = Math.atan2(cam.x - hit.x, cam.z - hit.z);
    root.scale.setScalar(this.arScale);
    root.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const centre = new THREE.Vector3(0, 0, -1.2).multiplyScalar(this.arScale).applyQuaternion(root.quaternion);
    root.position.copy(hit).sub(centre);
    root.position.y = hit.y;
    this.placed = true;
    this.placing = false;
    this.reticle.visible = false;
    this.actions.log?.('ar-place', { value: this.arScale });
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

    // Ray cursors on the panel, panel drags, and ray length.
    for (const c of this.controllers) {
      const src = c.userData.inputSource;
      if (!src || src.targetRayMode !== 'tracked-pointer') continue;
      const ph = this.panelHit(c);
      this.menu.panel.move(c, ph ? ph.uv : null);
      c.userData.cursor.visible = !!ph;
      if (ph) {
        c.userData.cursor.position.copy(ph.point).addScaledVector(this.raycaster.ray.direction, -0.002);
        c.userData.cursor.quaternion.copy(this.menu.mesh.quaternion);
        c.userData.ray.scale.z = ph.distance;
      } else {
        const oh = this.grabs.has(c) ? null : this.objectHit(c);
        c.userData.ray.scale.z = oh ? oh.distance : RAY_LENGTH;
      }
    }

    for (const source of session.inputSources) {
      const gp = source.gamepad;
      if (!gp) continue;
      const x = gp.axes.length >= 4 ? gp.axes[2] : (gp.axes[0] ?? 0);
      if (Math.abs(x) > 0.25) this.actions.scrubBy(Math.sign(x) * (Math.abs(x) - 0.25) * dt * 2);
      const prev = this.prevButtons.get(source) || [];
      const pressed = gp.buttons.map((b) => b.pressed);
      if (pressed[4] && !prev[4]) this.actions.togglePlay();
      if (pressed[5] && !prev[5]) this.menu.toggle();
      this.prevButtons.set(source, pressed);
    }
  }
}
