// Selection, the connect tool (springs/hinges), and desktop editing with a
// move/rotate gizmo. `pick(id)` is the shared entry point for mouse clicks,
// VR controller rays and AR taps.
import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { ObjectViews } from './objectViews.js';
import { isObject, CONSTRAINT_KINDS } from '../core/defs.js';

export class Editor extends EventTarget {
  constructor({ stage, sim, views, links }) {
    super();
    this.stage = stage;
    this.sim = sim;
    this.views = views;
    this.links = links;
    this.selectedId = null;
    this.mode = 'translate';
    this.connecting = null; // { kind, first }

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
      this.pick(this.idAtScreen(e.clientX, e.clientY));
    });
  }

  /** What a click/ray can land on. While connecting, only objects (an axle must not hide the hook behind it). */
  pickables() {
    return this.connecting ? this.views.pickables() : [...this.views.pickables(), ...this.links.pickables()];
  }

  idAtScreen(clientX, clientY) {
    const rect = this.stage.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.stage.camera);
    const hit = this.raycaster.intersectObjects(this.pickables(), true)[0];
    return hit ? ObjectViews.idFromHit(hit) : null;
  }

  /** A click/tap/trigger landed on `id` (or on nothing). */
  pick(id) {
    if (this.connecting) { this.connectPick(id); return; }
    this.select(id);
  }

  // ---------- connect tool ----------

  beginConnect(kind) {
    if (!CONSTRAINT_KINDS[kind]) return;
    this.sim.ensureEditable();
    // Always pick both ends explicitly: silently reusing the selection was confusing.
    this.connecting = { kind, first: null };
    this.emitConnect();
  }

  cancelConnect() {
    if (!this.connecting) return;
    this.connecting = null;
    this.emitConnect();
  }

  connectPick(id) {
    const def = this.sim.defs.get(id);
    if (!isObject(def) || def.kind === 'target') {
      this.emitConnect(id ? 'Pick a ball, box or ramp (not a target or connection).' : null);
      return;
    }
    const c = this.connecting;
    if (!c.first) {
      c.first = id;
      this.select(id, { keepConnect: true });
      this.emitConnect();
      return;
    }
    if (id === c.first) { this.emitConnect('Pick a different object for the other end.'); return; }
    try {
      const newId = this.sim.connect(c.kind, c.first, id);
      this.connecting = null;
      this.emitConnect();
      this.select(newId);
    } catch (err) {
      this.emitConnect(err.message);
    }
  }

  /** Spring/hinge from the selected object to a new fixed hook above it. */
  connectSelectedToHook(kind) {
    const def = this.sim.defs.get(this.selectedId);
    if (!isObject(def) || def.kind === 'target') return;
    const id = this.sim.connectToHook(kind, def.id);
    this.connecting = null;
    this.emitConnect();
    this.select(id);
  }

  emitConnect(message = null) {
    this.dispatchEvent(new CustomEvent('connect', { detail: { connecting: this.connecting, message } }));
  }

  connectPrompt() {
    const c = this.connecting;
    if (!c) return '';
    const label = CONSTRAINT_KINDS[c.kind].label.toLowerCase();
    if (!c.first) return `New ${label}: pick the first object.`;
    return `New ${label} from ${this.sim.defs.get(c.first)?.name ?? 'object'}: pick the second object.`;
  }

  // ---------- selection ----------

  select(id, { keepConnect = false } = {}) {
    if (!keepConnect && this.connecting) this.cancelConnect();
    this.selectedId = id && this.sim.defs.has(id) ? id : null;
    this.views.setHighlight(this.selectedId);
    this.links.setHighlight(this.selectedId);
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
      this.links.setHighlight(null);
      this.dispatchEvent(new Event('select'));
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
