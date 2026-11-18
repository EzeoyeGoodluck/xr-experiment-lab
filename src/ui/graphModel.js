// What the graph shows: which subject (selected object/connection, or the
// primary object), which quantity, and the A / B / live series. Shared by the
// desktop panel and the in-headset panel.
import { series, graphKindsFor, GRAPH_KINDS } from '../core/derived.js';
import { primaryObjectId } from '../core/defs.js';
import { RUN_CSS } from '../view/overlay.js';

export const LIVE_CSS = '#ffffff';

export function graphData({ sim, store, editor, replay, graphState }) {
  const { A, B } = store.slotRuns();
  const live = sim.state === 'running' && sim.recorder.active
    ? { dt: sim.recorder.dt, setup: sim.recorder.setup,
        tracks: Object.fromEntries([...sim.recorder.buffers].map(([id, buf]) => [id, { samples: buf }])) }
    : null;
  const setups = [live?.setup, B?.setup, A?.setup, sim.serialize()].filter(Boolean);

  const kindsFor = (id) => [...new Set(setups.flatMap((s) => graphKindsFor(s, id)))];
  let subject = editor.selectedId && kindsFor(editor.selectedId).length ? editor.selectedId : null;
  if (!subject && graphState.subject && kindsFor(graphState.subject).length) subject = graphState.subject;
  if (!subject) subject = setups.map(primaryObjectId).find(Boolean) || null;
  const kinds = subject ? kindsFor(subject) : [];
  const kind = kinds.includes(graphState.kind) ? graphState.kind : kinds[0] || null;
  const name = setups.map((s) => s.find((d) => d.id === subject)?.name).find(Boolean) || '';

  const list = [];
  if (kind) {
    if (A) list.push({ ...series(A, kind, subject), color: RUN_CSS.A, slot: 'A' });
    if (B) list.push({ ...series(B, kind, subject), color: RUN_CSS.B, slot: 'B' });
    if (live) list.push({ ...series(live, kind, subject), color: LIVE_CSS, width: 2.5, slot: 'live' });
  }
  const tMax = Math.max(A?.duration ?? 0, B?.duration ?? 0, live ? sim.time : 0, 0.5);
  return {
    subject, subjectName: name, kind, kinds,
    label: kind ? GRAPH_KINDS[kind].label : '', unit: kind ? GRAPH_KINDS[kind].unit : '',
    series: list.filter((s) => s.t), tMax,
    cursor: (A || B) && !live ? replay.time : null,
    empty: subject ? 'Run the experiment to see a graph' : 'Add a moving object',
  };
}

export function nextKind(data, dir = 1) {
  if (!data.kinds.length) return null;
  const i = data.kinds.indexOf(data.kind);
  return data.kinds[(i + dir + data.kinds.length) % data.kinds.length];
}

export { GRAPH_KINDS };
