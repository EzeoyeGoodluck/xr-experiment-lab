// In-headset status board (VR only): state, Run A vs Run B and the controls.
import * as THREE from 'three';
import { RUN_CSS } from './overlay.js';

const W = 1024, H = 600;

export class Hud {
  constructor(parent) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W; this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9 * H / W),
      new THREE.MeshBasicMaterial({ map: this.texture, transparent: true }));
    this.mesh.position.set(-0.1, 1.35, -2.1);
    this.mesh.visible = false;
    this.mesh.raycast = () => {};
    parent.add(this.mesh);
    this.last = '';
  }

  setVisible(v) { this.mesh.visible = v; }

  /** @param {{state:string,time:number,scrub:number,duration:number,playing:boolean,gap:number|null,rows:Array,names:{A?:string,B?:string}}} s */
  update(s) {
    if (!this.mesh.visible) return;
    const key = JSON.stringify(s);
    if (key === this.last) return;
    this.last = key;
    const g = this.ctx;
    g.clearRect(0, 0, W, H);
    g.fillStyle = 'rgba(17,20,27,0.88)';
    roundRect(g, 0, 0, W, H, 36); g.fill();
    g.fillStyle = '#fff';
    g.font = '600 44px system-ui, sans-serif';
    const label = { edit: 'Editing setup', running: 'Running', review: 'Run finished' }[s.state];
    g.fillText(`${label}  ·  t = ${s.time.toFixed(2)} s`, 40, 70);

    g.font = '500 34px system-ui, sans-serif';
    let y = 135;
    for (const slot of ['A', 'B']) {
      g.fillStyle = RUN_CSS[slot];
      g.fillText(`${slot}: ${s.names[slot] || '—'}`, 40 + (slot === 'B' ? 480 : 0), y);
    }
    y += 60;
    g.font = '400 30px system-ui, sans-serif';
    for (const r of s.rows.slice(0, 4)) {
      g.fillStyle = '#c8cfdb';
      g.fillText(r.label, 40, y);
      g.fillStyle = r.winner === 'A' ? RUN_CSS.A : '#fff';
      g.fillText(fmt(r.a, r.unit), 560, y);
      g.fillStyle = r.winner === 'B' ? RUN_CSS.B : '#fff';
      g.fillText(fmt(r.b, r.unit), 790, y);
      y += 48;
    }
    g.fillStyle = '#fff';
    g.font = '500 32px system-ui, sans-serif';
    const gap = s.gap === null ? '' : `   gap ${(s.gap * 100).toFixed(1)} cm`;
    g.fillText(`Replay ${s.playing ? '▶' : '❚❚'} ${s.scrub.toFixed(2)} / ${s.duration.toFixed(2)} s${gap}`, 40, y + 20);
    const barY = y + 45;
    g.fillStyle = '#3a4252'; g.fillRect(40, barY, W - 80, 12);
    g.fillStyle = '#fff'; g.fillRect(40, barY, (W - 80) * (s.duration ? s.scrub / s.duration : 0), 12);
    g.fillStyle = '#8f99ab';
    g.font = '400 26px system-ui, sans-serif';
    g.fillText('Trigger: grab   Grip: run / stop / reset   Stick: scrub   A/X: play', 40, H - 32);
    this.texture.needsUpdate = true;
  }
}

function fmt(v, unit) {
  if (v === null || v === undefined) return '—';
  return `${v.toFixed(unit === 's' ? 2 : 2)} ${unit}`;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
