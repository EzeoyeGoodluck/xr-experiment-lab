// Desktop editing: click to select, gizmo to move/rotate, keyboard shortcuts.
import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { ObjectViews } from './objectViews.js';

export class Editor extends EventTarget {
  constructor({ stage, sim, views }) {
    super();
    this.stage = stage;
    this.sim = sim;
    this.views = views;
    this.selectedId = null;
    this.mode = 'translate';

    const dom = stage.renderer.domElement;
    this.gizmo = new TransformControls(stage.camera, dom);
    this.gizmo.setSize(0.8);
    stage.scene.add(this.gizmo.getHelper());
    this.gizmo.addEventListener('dragging-changed', (e) => { stage.orbit.enabled = !e.value; });
    this.gizmo.addEventListener('objectChange', () => {
      const mesh = this.views.meshOf(this.selectedId);
      if (mesh) this.sim.setPose(this.selectedId, mesh.position.toArray(), mesh.quaternion.toArray());
    });

    this.raycaster = new THREE.Raycaster();
    let down = null;
    dom.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
    dom.addEventListener('pointerup', (e) => {
      if (!down || this.gizmo.dragging) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      down = null;
      if (moved > 5 || this.gizmo.axis) return;
      this.pickAt(e.clientX, e.clientY);
    });
  }

  pickAt(clientX, clientY) {
    const rect = this.stage.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.stage.camera);
    const hit = this.raycaster.intersectObjects(this.views.pickables(), true)[0];
    this.select(hit ? ObjectViews.idFromHit(hit) : null);
  }

  select(id) {
    this.selectedId = id && this.sim.defs.has(id) ? id : null;
    this.views.setHighlight(this.selectedId);
    this.refresh();
    this.dispatchEvent(new Event('select'));
  }

  setMode(mode) {
    this.mode = mode;
    this.gizmo.setMode(mode);
    this.dispatchEvent(new Event('select'));
  }

  /** Re-attach the gizmo after rebuilds or state changes. */
  refresh() {
    if (this.selectedId && !this.sim.defs.has(this.selectedId)) {
      this.selectedId = null;
      this.views.setHighlight(null);
    }
    const mesh = this.views.meshOf(this.selectedId);
    const editable = this.sim.state === 'edit' && this.stage.mode === 'desktop';
    if (mesh && editable) {
      if (this.gizmo.object !== mesh) this.gizmo.attach(mesh);
      this.gizmo.setMode(this.mode);
    } else if (this.gizmo.object) {
      this.gizmo.detach();
    }
  }
}
