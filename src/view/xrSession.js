// Robust WebXR session handling: capability detection with plain-language
// reasons, our own Enter VR / Enter AR buttons, reference-space fallback,
// visibility (system menu) and recentering events, frame-rate selection, and
// clean recovery when a session fails or ends.
const VR_FEATURES = ['local-floor', 'bounded-floor', 'hand-tracking'];
const AR_FEATURES = ['local-floor', 'hit-test', 'dom-overlay', 'anchors'];

export class XRSessionManager extends EventTarget {
  constructor(renderer, { overlayRoot, host }) {
    super();
    this.renderer = renderer;
    this.overlayRoot = overlayRoot;
    this.host = host;
    this.session = null;
    this.mode = null; // 'vr' | 'ar' | null
    this.floorFallback = false;
    this.support = { secure: window.isSecureContext, api: 'xr' in navigator, vr: false, ar: false, reasons: {} };
    this.buttons = {};
    if (host) this.renderButtons();
  }

  async detect() {
    const s = this.support;
    s.reasons = {};
    if (!s.secure) {
      s.reasons.vr = s.reasons.ar = 'WebXR needs a secure page: open the https:// (GitHub Pages) link or localhost.';
    } else if (!s.api) {
      s.reasons.vr = 'This browser has no WebXR. Use Chrome or Edge with the Immersive Web Emulator extension, or add ?emulate=quest3 to the address.';
      s.reasons.ar = 'This browser has no WebXR. AR works in Chrome on an ARCore-capable Android phone.';
    } else {
      const check = async (mode) => {
        try { return await navigator.xr.isSessionSupported(mode); } catch { return false; }
      };
      [s.vr, s.ar] = await Promise.all([check('immersive-vr'), check('immersive-ar')]);
      if (!s.vr) s.reasons.vr = 'No VR headset found. Try the Immersive Web Emulator extension, ?emulate=quest3, or open this page in a Quest browser.';
      if (!s.ar) s.reasons.ar = 'AR is not available here. It works in Chrome on an ARCore-capable Android phone (and on Quest 3).';
    }
    this.renderButtons();
    this.dispatchEvent(new CustomEvent('support', { detail: s }));
    return s;
  }

  renderButtons() {
    if (!this.host) return;
    this.host.innerHTML = '';
    for (const mode of ['vr', 'ar']) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'xr-button';
      btn.dataset.mode = mode;
      const active = this.mode === mode;
      const ok = this.support[mode];
      btn.textContent = active ? `Exit ${mode.toUpperCase()}` : `Enter ${mode.toUpperCase()}`;
      btn.disabled = !active && (!ok || !!this.session);
      btn.title = ok || active ? '' : this.support.reasons[mode] || '';
      btn.setAttribute('aria-describedby', 'xr-reason');
      btn.addEventListener('click', () => (active ? this.end() : this.enter(mode)));
      this.host.appendChild(btn);
      this.buttons[mode] = btn;
    }
    const reason = document.createElement('p');
    reason.id = 'xr-reason';
    reason.className = 'xr-reason';
    const why = !this.session && (!this.support.vr ? this.support.reasons.vr : '');
    reason.textContent = why || '';
    reason.hidden = !why;
    this.host.appendChild(reason);
  }

  async enter(mode) {
    if (this.session) return;
    const init = mode === 'vr'
      ? { optionalFeatures: VR_FEATURES }
      : { optionalFeatures: AR_FEATURES, domOverlay: { root: this.overlayRoot } };
    let session;
    try {
      session = await navigator.xr.requestSession(mode === 'vr' ? 'immersive-vr' : 'immersive-ar', init);
    } catch (err) {
      this.fail(`Could not start ${mode.toUpperCase()}: ${err.message || err.name}`);
      return;
    }
    try {
      // Prefer a floor-level origin; fall back to 'local' (eye level) and correct for it.
      this.floorFallback = false;
      try {
        await session.requestReferenceSpace('local-floor');
        this.renderer.xr.setReferenceSpaceType('local-floor');
      } catch {
        this.renderer.xr.setReferenceSpaceType('local');
        this.floorFallback = true;
      }
      this.renderer.xr.setFoveation(0.5);
      await this.renderer.xr.setSession(session);
    } catch (err) {
      session.end().catch(() => {});
      this.fail(`${mode.toUpperCase()} session failed to start: ${err.message || err.name}`);
      return;
    }

    this.session = session;
    this.mode = mode;
    this.blend = session.environmentBlendMode || (mode === 'ar' ? 'alpha-blend' : 'opaque');
    session.addEventListener('end', () => this.onEnd(), { once: true });
    session.addEventListener('visibilitychange', () => {
      this.dispatchEvent(new CustomEvent('visibility', { detail: { state: session.visibilityState } }));
    });
    const ref = this.renderer.xr.getReferenceSpace();
    ref?.addEventListener?.('reset', () => this.dispatchEvent(new Event('recenter')));
    this.pickFrameRate(session);
    this.renderButtons();
    this.dispatchEvent(new CustomEvent('start', { detail: { mode, floorFallback: this.floorFallback, blend: this.blend } }));
  }

  pickFrameRate(session) {
    const rates = session.supportedFrameRates ? Array.from(session.supportedFrameRates) : [];
    const best = rates.filter((r) => r <= 90).sort((a, b) => b - a)[0];
    if (best && session.updateTargetFrameRate) session.updateTargetFrameRate(best).catch(() => {});
    this.targetFrameRate = best || null;
  }

  async end() {
    if (this.session) await this.session.end().catch(() => this.onEnd());
  }

  onEnd() {
    const mode = this.mode;
    this.session = null;
    this.mode = null;
    this.renderButtons();
    this.dispatchEvent(new CustomEvent('end', { detail: { mode } }));
  }

  fail(message) {
    console.warn('[xr]', message);
    this.renderButtons();
    this.dispatchEvent(new CustomEvent('error', { detail: { message } }));
  }
}

/** Can we draw 3D at all? Returns a reason string if not. */
export function webglProblem() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return 'This browser or device cannot show 3D graphics (WebGL is unavailable or disabled).';
    return null;
  } catch {
    return 'This browser or device cannot show 3D graphics (WebGL failed to start).';
  }
}
