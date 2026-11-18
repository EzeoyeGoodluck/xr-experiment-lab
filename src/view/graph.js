// Time-series graph drawn on a 2D canvas: Run A, Run B and the live run
// overlaid, with a cursor at the replay time. drawGraph() draws into any
// rectangle of any canvas (desktop panel or the in-headset panel).

function niceStep(range, target = 4) {
  const raw = range / target;
  const mag = 10 ** Math.floor(Math.log10(raw || 1));
  const n = raw / mag;
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag;
}

/**
 * @param {CanvasRenderingContext2D} g
 * @param {{x:number,y:number,w:number,h:number}} r
 * @param {{series:Array<{t:number[],v:number[],color:string,width?:number,dash?:number[]}>, cursor?:number|null,
 *          tMax?:number, unit?:string, font?:number, empty?:string}} o
 */
export function drawGraph(g, r, o) {
  const font = o.font ?? 11;
  const padL = font * 4.2, padB = font * 2, padT = font * 0.8, padR = font * 0.8;
  const px = r.x + padL, py = r.y + padT, pw = r.w - padL - padR, ph = r.h - padT - padB;
  g.save();
  g.font = `${font}px system-ui, sans-serif`;
  g.fillStyle = 'rgba(255,255,255,0.03)';
  g.fillRect(px, py, pw, ph);

  const all = o.series.filter((s) => s && s.t.length > 1);
  if (!all.length) {
    g.fillStyle = '#7d8799';
    g.textAlign = 'center';
    g.fillText(o.empty || 'No data yet', px + pw / 2, py + ph / 2);
    g.restore();
    return null;
  }
  const tMax = o.tMax || Math.max(...all.map((s) => s.t[s.t.length - 1])) || 1;
  let vMin = Infinity, vMax = -Infinity;
  for (const s of all) for (const v of s.v) { if (v < vMin) vMin = v; if (v > vMax) vMax = v; }
  if (vMin > 0 && vMin < (vMax - vMin) * 0.5) vMin = 0;
  if (vMax - vMin < 1e-6) { vMax += 0.5; vMin -= 0.5; }
  const span = vMax - vMin;
  vMax += span * 0.06; vMin -= vMin === 0 ? 0 : span * 0.06;

  const X = (t) => px + (t / tMax) * pw;
  const Y = (v) => py + ph - ((v - vMin) / (vMax - vMin)) * ph;

  // Grid and labels.
  g.strokeStyle = 'rgba(255,255,255,0.08)';
  g.fillStyle = '#8f99ab';
  g.lineWidth = 1;
  const vs = niceStep(vMax - vMin);
  g.textAlign = 'right'; g.textBaseline = 'middle';
  for (let v = Math.ceil(vMin / vs) * vs; v <= vMax; v += vs) {
    const y = Y(v);
    g.beginPath(); g.moveTo(px, y); g.lineTo(px + pw, y); g.stroke();
    g.fillText(`${+v.toFixed(3)}`, px - font * 0.4, y);
  }
  const ts = niceStep(tMax, 5);
  g.textAlign = 'center'; g.textBaseline = 'top';
  for (let t = 0; t <= tMax + 1e-9; t += ts) {
    const x = X(t);
    g.beginPath(); g.moveTo(x, py); g.lineTo(x, py + ph); g.stroke();
    g.fillText(`${+t.toFixed(2)}s`, x, py + ph + font * 0.35);
  }
  if (vMin < 0 && vMax > 0) {
    g.strokeStyle = 'rgba(255,255,255,0.25)';
    g.beginPath(); g.moveTo(px, Y(0)); g.lineTo(px + pw, Y(0)); g.stroke();
  }
  if (o.unit) {
    g.textAlign = 'left'; g.textBaseline = 'top'; g.fillStyle = '#8f99ab';
    g.fillText(o.unit, r.x + 2, r.y + 2);
  }

  // Series.
  g.save();
  g.beginPath(); g.rect(px, py, pw, ph); g.clip();
  for (const s of all) {
    g.strokeStyle = s.color;
    g.lineWidth = s.width ?? 2;
    g.setLineDash(s.dash || []);
    g.beginPath();
    for (let i = 0; i < s.t.length; i++) {
      const x = X(s.t[i]), y = Y(s.v[i]);
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.stroke();
  }
  g.restore();

  // Cursor at replay time, with the value of each series there.
  if (o.cursor !== null && o.cursor !== undefined) {
    const x = X(Math.min(o.cursor, tMax));
    g.strokeStyle = '#ffffff';
    g.lineWidth = 1;
    g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(x, py); g.lineTo(x, py + ph); g.stroke();
    g.setLineDash([]);
    for (const s of all) {
      const v = valueAt(s, o.cursor);
      if (v === null) continue;
      g.fillStyle = s.color;
      g.beginPath(); g.arc(x, Y(v), font * 0.32, 0, Math.PI * 2); g.fill();
    }
  }
  g.restore();
  return { px, pw, tMax };
}

export function valueAt(s, t) {
  if (!s || !s.t.length) return null;
  if (t <= s.t[0]) return s.v[0];
  if (t >= s.t[s.t.length - 1]) return s.v[s.v.length - 1];
  let lo = 0, hi = s.t.length - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (s.t[mid] <= t) lo = mid; else hi = mid; }
  const f = (t - s.t[lo]) / (s.t[hi] - s.t[lo] || 1);
  return s.v[lo] + (s.v[hi] - s.v[lo]) * f;
}

/** A graph in the HTML panel; click or drag on it to scrub. */
export class PanelGraph {
  constructor(canvas, { onScrub }) {
    this.canvas = canvas;
    this.layout = null;
    let dragging = false;
    const scrub = (e) => {
      if (!this.layout) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const t = ((x - this.layout.px) / this.layout.pw) * this.layout.tMax;
      onScrub(Math.max(0, Math.min(this.layout.tMax, t)));
    };
    canvas.addEventListener('pointerdown', (e) => { dragging = true; canvas.setPointerCapture(e.pointerId); scrub(e); });
    canvas.addEventListener('pointermove', (e) => { if (dragging) scrub(e); });
    canvas.addEventListener('pointerup', () => { dragging = false; });
  }

  draw(opts) {
    const c = this.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(50, Math.round(c.clientWidth * dpr)), h = Math.max(40, Math.round(c.clientHeight * dpr));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d');
    g.clearRect(0, 0, w, h);
    this.layout = drawGraph(g, { x: 0, y: 0, w, h }, { font: 11 * dpr, ...opts });
  }
}
