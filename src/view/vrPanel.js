// A minimal in-headset UI toolkit: widgets drawn on a canvas texture, operated
// by controller rays. Supports buttons, toggles, sliders (drag), labels and
// custom-drawn areas (graphs). The layout/hit-testing logic has no WebGL
// dependency so it can be reasoned about and tested on its own.
import * as THREE from 'three';

export const THEME = {
  bg: 'rgba(17,20,27,0.94)', panel: '#1b212c', line: '#2c3341', text: '#e8ecf3', muted: '#98a2b3',
  accent: '#7c8cff', button: '#262e3c', hover: '#323c50', active: '#3b4670', danger: '#fca5a5',
};

/** Simple row-based layout helper (pixel rects). */
export class Layout {
  constructor(width, { pad = 24, gap = 12, top = 24 } = {}) {
    this.width = width; this.pad = pad; this.gap = gap; this.y = top;
  }
  row(height, weights = [1]) {
    const total = weights.reduce((a, b) => a + b, 0);
    const inner = this.width - this.pad * 2 - this.gap * (weights.length - 1);
    let x = this.pad;
    const rects = weights.map((w) => {
      const r = { x, y: this.y, w: (inner * w) / total, h: height };
      x += r.w + this.gap;
      return r;
    });
    this.y += height + this.gap;
    return rects;
  }
  full(height) { return this.row(height)[0]; }
  space(h) { this.y += h; }
}

export function hitWidget(widgets, px, py) {
  for (let i = widgets.length - 1; i >= 0; i--) {
    const w = widgets[i];
    if (!w.rect || w.type === 'label') continue;
    const r = w.rect;
    if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) return w;
  }
  return null;
}

/** Two widget objects are "the same" control if type, position and text match (the panel is rebuilt often). */
export function sameWidget(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;
  return a.type === b.type && a.rect.x === b.rect.x && a.rect.y === b.rect.y && (a.text ?? a.label) === (b.text ?? b.label);
}

export function sliderValueAt(w, px) {
  const r = trackRect(w);
  const f = Math.max(0, Math.min(1, (px - r.x) / r.w));
  let v = w.min + f * (w.max - w.min);
  if (w.step) v = Math.round(v / w.step) * w.step;
  return Math.max(w.min, Math.min(w.max, +v.toFixed(6)));
}

function trackRect(w) {
  const r = w.rect;
  const labelW = w.label ? r.w * 0.34 : 0;
  const valueW = r.w * 0.16;
  return { x: r.x + labelW + 10, y: r.y, w: r.w - labelW - valueW - 20, h: r.h };
}

export class CanvasPanel {
  constructor({ widthM = 0.62, px = 1024, aspect = 0.78 } = {}) {
    this.W = px;
    this.H = Math.round(px * aspect);
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.W; this.canvas.height = this.H;
    this.g = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthM, widthM * aspect),
      new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, depthWrite: true }));
    this.mesh.name = 'vr-panel';
    this.mesh.renderOrder = 20;
    this.widgets = [];
    this.pointers = new Map(); // pointer key -> { hover, pressed, dragging }
    this.dirty = true;
  }

  setWidgets(widgets) {
    this.widgets = widgets;
    this.dirty = true;
  }

  uvToPx(uv) {
    return [uv.x * this.W, (1 - uv.y) * this.H];
  }

  /** Pointer moved (uv = null when the ray left the panel). Returns true if over the panel. */
  move(key, uv) {
    const p = this.pointers.get(key) || {};
    this.pointers.set(key, p);
    if (!uv) {
      if (p.hover) { p.hover = null; this.dirty = true; }
      return false;
    }
    const [x, y] = this.uvToPx(uv);
    p.x = x; p.y = y;
    if (p.dragging) {
      const w = p.dragging;
      if (w.type === 'slider') {
        const v = sliderValueAt(w, x);
        if (v !== w.value) { w.value = v; w.onChange?.(v); this.dirty = true; }
      } else if (w.type === 'custom') w.onDrag?.((x - w.rect.x) / w.rect.w, (y - w.rect.y) / w.rect.h);
      return true;
    }
    const hover = hitWidget(this.widgets, x, y);
    if (!sameWidget(hover, p.hover)) this.dirty = true;
    p.hover = hover;
    return true;
  }

  press(key, uv) {
    if (!uv) return false;
    this.move(key, uv);
    const p = this.pointers.get(key);
    const w = hitWidget(this.widgets, p.x, p.y);
    p.pressed = w;
    if (w && !w.disabled) {
      if (w.type === 'slider') {
        p.dragging = w;
        const v = sliderValueAt(w, p.x);
        w.value = v; w.onChange?.(v);
      } else if (w.type === 'custom' && (w.onPress || w.onDrag)) {
        p.dragging = w;
        const u = (p.x - w.rect.x) / w.rect.w, v = (p.y - w.rect.y) / w.rect.h;
        w.onPress?.(u, v); w.onDrag?.(u, v);
      }
    }
    this.dirty = true;
    return true;
  }

  release(key) {
    const p = this.pointers.get(key);
    if (!p) return false;
    const w = p.pressed;
    const wasDragging = p.dragging;
    p.pressed = null; p.dragging = null;
    this.dirty = true;
    if (wasDragging) { wasDragging.onCommit?.(wasDragging.value); return true; }
    if (w && !w.disabled) {
      const still = hitWidget(this.widgets, p.x, p.y);
      if (sameWidget(still, w)) {
        if (w.type === 'button') w.onClick?.();
        if (w.type === 'toggle') { w.value = !w.value; w.onChange?.(w.value); }
      }
      return true;
    }
    return !!w;
  }

  isHovered(w) {
    for (const p of this.pointers.values()) if (sameWidget(p.hover, w) || sameWidget(p.dragging, w)) return true;
    return false;
  }

  draw() {
    if (!this.dirty) return;
    this.dirty = false;
    const g = this.g;
    g.clearRect(0, 0, this.W, this.H);
    g.fillStyle = THEME.bg;
    roundRect(g, 0, 0, this.W, this.H, 34); g.fill();
    for (const w of this.widgets) this.drawWidget(w);
    this.texture.needsUpdate = true;
  }

  drawWidget(w) {
    const g = this.g, r = w.rect;
    const hover = this.isHovered(w);
    g.textBaseline = 'middle';
    if (w.type === 'label') {
      g.fillStyle = w.color || THEME.text;
      g.font = `${w.bold ? 600 : 400} ${w.size || 28}px system-ui, sans-serif`;
      g.textAlign = w.align || 'left';
      const x = w.align === 'center' ? r.x + r.w / 2 : w.align === 'right' ? r.x + r.w : r.x;
      g.fillText(fit(g, w.text, r.w), x, r.y + r.h / 2);
    } else if (w.type === 'button' || w.type === 'toggle') {
      const on = w.type === 'toggle' ? w.value : w.active;
      g.fillStyle = w.disabled ? '#1e242f' : on ? (w.color || THEME.active) : hover ? THEME.hover : THEME.button;
      roundRect(g, r.x, r.y, r.w, r.h, 14); g.fill();
      g.strokeStyle = on ? (w.color || THEME.accent) : hover && !w.disabled ? '#5b6680' : '#343d4d';
      g.lineWidth = 3; g.stroke();
      g.fillStyle = w.disabled ? '#5c6577' : w.danger ? THEME.danger : THEME.text;
      g.font = `600 ${w.size || 28}px system-ui, sans-serif`;
      g.textAlign = 'center';
      const label = w.type === 'toggle' ? `${w.value ? '●' : '○'} ${w.text}` : w.text;
      g.fillText(fit(g, label, r.w - 16), r.x + r.w / 2, r.y + r.h / 2 + 1);
    } else if (w.type === 'slider') {
      g.font = `400 ${w.size || 26}px system-ui, sans-serif`;
      g.textAlign = 'left'; g.fillStyle = THEME.muted;
      if (w.label) g.fillText(fit(g, w.label, r.w * 0.33), r.x, r.y + r.h / 2);
      const t = trackRect(w);
      const f = (w.value - w.min) / (w.max - w.min || 1);
      g.fillStyle = '#343d4d';
      roundRect(g, t.x, t.y + t.h / 2 - 6, t.w, 12, 6); g.fill();
      g.fillStyle = THEME.accent;
      roundRect(g, t.x, t.y + t.h / 2 - 6, t.w * f, 12, 6); g.fill();
      g.fillStyle = hover ? '#ffffff' : '#c9d0ff';
      g.beginPath(); g.arc(t.x + t.w * f, t.y + t.h / 2, hover ? 18 : 15, 0, Math.PI * 2); g.fill();
      g.textAlign = 'right'; g.fillStyle = THEME.text;
      g.fillText(w.format ? w.format(w.value) : w.value.toFixed(2), r.x + r.w, r.y + r.h / 2);
    } else if (w.type === 'custom') {
      w.draw?.(g, r, { hover });
    }
  }

  /** Small dot showing where a ray hits the panel. */
  static cursor() {
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.006, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false }));
    m.renderOrder = 30;
    m.visible = false;
    return m;
  }
}

function fit(g, text, maxW) {
  text = String(text ?? '');
  if (g.measureText(text).width <= maxW) return text;
  while (text.length > 1 && g.measureText(text + '…').width > maxW) text = text.slice(0, -1);
  return text + '…';
}

export function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
