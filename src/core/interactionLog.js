// A timestamped log of what the user did, for user studies (export as CSV/JSON).
// Records actions only, never personal data; the participant label is optional
// and chosen by the researcher.
export class InteractionLog {
  constructor({ max = 20000 } = {}) {
    this.max = max;
    this.events = [];
    this.t0 = Date.now();
    this.label = '';
  }

  add(type, detail = {}) {
    this.events.push({ t: (Date.now() - this.t0) / 1000, at: new Date().toISOString(), type, ...detail });
    if (this.events.length > this.max) this.events.shift();
  }

  reset(label = this.label) {
    this.events = [];
    this.t0 = Date.now();
    this.label = label;
    this.add('session-start', { label });
  }

  csv() {
    const keys = ['t', 'at', 'type', 'mode', 'id', 'value', 'detail'];
    const rows = this.events.map((e) => {
      const { t, at, type, mode, id, value, ...rest } = e;
      const detail = Object.keys(rest).length ? JSON.stringify(rest) : '';
      return [t.toFixed(3), at, type, mode ?? '', id ?? '', value ?? '', detail].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });
    return [keys.join(','), ...rows].join('\n');
  }
}
