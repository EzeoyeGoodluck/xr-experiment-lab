// End-to-end VR test with an emulated Meta Quest 3 (IWER, loaded by ?emulate).
// Drives the app the way a person would: aims controllers at the floating panel
// and at objects, pulls triggers, drags sliders, squeezes grips, uses the stick.
// Usage: server on :8000, then node tests/vr-e2e.mjs [--chrome path] [--out dir]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const url = opt('--url', 'http://localhost:8000/');
const out = opt('--out', 'screenshots');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: opt('--chrome', undefined), args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const problems = [];
page.on('console', (m) => { if (m.type() === 'error') problems.push(m.text()); });
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
const check = (cond, msg) => { if (!cond) throw new Error(`FAILED: ${msg}`); console.log(`  ✓ ${msg}`); };
const frames = (n = 3) => page.evaluate((k) => new Promise((res) => { let i = 0; const f = () => (++i >= k ? res() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);

await page.goto(`${url}?emulate=quest3`);
await page.waitForFunction(() => window.app && window.xrDevice && window.app.stage.xr.support.vr);

// Helpers that live in the page: aim a controller at a world point, press buttons.
await page.evaluate(async () => {
  const THREE = await import('/lib/three/three.module.js');
  const dev = window.xrDevice;
  const app = window.app;
  window.__t = {
    aimAt(hand, target, from) {
      const c = dev.controllers[hand];
      const eye = new THREE.Vector3(...(from || [hand === 'right' ? 0.18 : -0.18, 1.35, -0.05]));
      const m = new THREE.Matrix4().lookAt(eye, new THREE.Vector3(...target), new THREE.Vector3(0, 1, 0));
      const q = new THREE.Quaternion().setFromRotationMatrix(m);
      c.position.set(eye.x, eye.y, eye.z);
      c.quaternion.set(q.x, q.y, q.z, q.w);
    },
    widget(text) {
      const w = app.menu.panel.widgets.find((x) => (x.text ?? x.label) === text || (x.text ?? '').startsWith(text));
      return w || null;
    },
    /** World point of a pixel inside the panel canvas. */
    panelPoint(px, py) {
      const p = app.menu.panel;
      const geo = p.mesh.geometry.parameters;
      const v = new THREE.Vector3((px / p.W - 0.5) * geo.width, (0.5 - py / p.H) * geo.height, 0.001);
      return p.mesh.localToWorld(v).toArray();
    },
    widgetPoint(text, fx = 0.5) {
      const w = this.widget(text);
      if (!w) throw new Error(`no widget "${text}"`);
      return this.panelPoint(w.rect.x + w.rect.w * fx, w.rect.y + w.rect.h / 2);
    },
    objectPoint(id) {
      const mesh = app.views.meshOf(id);
      return mesh.getWorldPosition(new THREE.Vector3()).toArray();
    },
    button(hand, id, v) { dev.controllers[hand].updateButtonValue(id, v); },
    axes(hand, x, y) { dev.controllers[hand].updateAxes('thumbstick', x, y); },
  };
});

const aim = (target, hand = 'right', from) => page.evaluate(([t, h, f]) => window.__t.aimAt(h, t, f), [target, hand, from]);
async function press(hand, button = 'trigger') {
  await page.evaluate(([h, b]) => window.__t.button(h, b, 1), [hand, button]); await frames(3);
  await page.evaluate(([h, b]) => window.__t.button(h, b, 0), [hand, button]); await frames(3);
}
async function tapPanel(text, hand = 'right') {
  const p = await page.evaluate((t) => window.__t.widgetPoint(t), text);
  await aim(p, hand);
  await frames(3);
  await press(hand);
}
const state = () => page.evaluate(() => window.app.sim.state);
const waitState = (s) => page.waitForFunction((st) => window.app.sim.state === st, s, { timeout: 20000 });

// ---- enter VR ----
await page.click('.xr-button[data-mode="vr"]');
await page.waitForFunction(() => window.app.stage.mode === 'vr');
await frames(10);
check(await page.evaluate(() => window.app.menu.visible), 'entering VR shows the floating panel once controllers connect');
await page.screenshot({ path: `${out}/vr-1-enter.png` });

// ---- Build page: load the pendulum example, add a ball in front of the user ----
await tapPanel('Pendulum (hinge)');
check(await page.evaluate(() => window.app.sim.defs.has('hinge-1')), 'panel button loads the pendulum example');
const before = await page.evaluate(() => window.app.sim.defs.size);
await tapPanel('+ Ball');
const spawned = await page.evaluate(() => { const s = window.app.sim; const id = window.app.editor.selectedId; return { n: s.defs.size, id, p: s.defs.get(id)?.position }; });
check(spawned.n === before + 1 && spawned.id.startsWith('ball'), `"+ Ball" adds a ball (${spawned.id}) on the bench in front of you`);
check(spawned.p[2] > -1.2 && spawned.p[2] < -0.3, `spawned near the user (z = ${spawned.p[2].toFixed(2)})`);

// ---- grab and move that ball with the trigger ----
const ballWorld = await page.evaluate((id) => window.__t.objectPoint(id), spawned.id);
await aim(ballWorld, 'left', [-0.1, 1.2, -0.1]);
await frames(3);
await page.evaluate(() => window.__t.button('left', 'trigger', 1));
await frames(3);
await page.evaluate(() => { const c = window.xrDevice.controllers.left; c.position.x += 0.25; });
await frames(4);
await page.evaluate(() => window.__t.button('left', 'trigger', 0));
await frames(3);
const moved = await page.evaluate((id) => window.app.sim.defs.get(id).position, spawned.id);
check(Math.abs(moved[0] - spawned.p[0] - 0.25) < 0.03, `grabbing moves the ball by the controller's motion (Δx = ${(moved[0] - spawned.p[0]).toFixed(3)} m)`);
check(await page.evaluate(() => window.app.views.held.size === 0), 'releasing the trigger lets go');

// ---- delete it from the Inspect page ----
await tapPanel('Inspect');
await tapPanel('Delete');
check(await page.evaluate((id) => !window.app.sim.defs.has(id), spawned.id), 'Inspect → Delete removes the selected ball');

// ---- select the pendulum rod by pointing at it, then drag its mass slider ----
const rodWorld = await page.evaluate(() => window.__t.objectPoint('box-2'));
await aim(rodWorld);
await frames(3);
await press('right');
check(await page.evaluate(() => window.app.editor.selectedId === 'box-2'), 'pointing at the pendulum and pulling the trigger selects it');
await page.evaluate(() => window.app.menu.rebuild());
const sliderStart = await page.evaluate(() => window.__t.widgetPoint('Mass (kg)', 0.42));
const sliderEnd = await page.evaluate(() => window.__t.widgetPoint('Mass (kg)', 0.62));
await aim(sliderStart); await frames(3);
await page.evaluate(() => window.__t.button('right', 'trigger', 1)); await frames(3);
await aim(sliderEnd); await frames(4);
await page.evaluate(() => window.__t.button('right', 'trigger', 0)); await frames(3);
const mass = await page.evaluate(() => window.app.sim.defs.get('box-2').mass);
check(mass > 0.6 + 0.3, `dragging the Mass slider with the ray changes it (0.60 → ${mass.toFixed(2)} kg)`);
await page.screenshot({ path: `${out}/vr-2-inspect.png` });

// ---- Run A / Run B with the grip ----
await page.evaluate(() => { window.app.sim.update('box-2', { mass: 0.6 }); });
await press('right', 'squeeze');
check(await state() === 'running', 'grip starts a run');
await page.evaluate(() => window.app.sim.stop());
await waitState('review');
await press('right', 'squeeze');
check(await state() === 'edit', 'grip again goes back to the setup');
await page.evaluate(() => window.app.sim.update('box-2', { mass: 1.5 }));
await press('right', 'squeeze');
await page.evaluate(() => { const s = window.app.sim; while (s.state === 'running' && s.time < 3) s.stepOnce(); s.stop(); });
await waitState('review');
check(await page.evaluate(() => window.app.store.runs.length >= 2), 'two runs recorded from inside VR');

// ---- Compare page: arrows on, scrub with the thumbstick, play with A ----
await tapPanel('Compare');
await tapPanel('Arrows');
check(await page.evaluate(() => window.app.overlay.options.arrows), 'Compare → Arrows toggle turns on velocity/force arrows');
await page.evaluate(() => window.__t.axes('right', 1, 0));
await frames(30);
await page.evaluate(() => window.__t.axes('right', 0, 0));
const scrubbed = await page.evaluate(() => window.app.replay.time);
check(scrubbed > 0.1, `thumbstick scrubs the replay (t = ${scrubbed.toFixed(2)} s)`);
check(await page.evaluate(() => [...window.app.overlay.arrows.items.values()].some((a) => a.vel.visible)), 'ghost velocity arrows are shown while scrubbing');
await press('right', 'a-button');
check(await page.evaluate(() => window.app.replay.playing), 'A button plays the replay');
await page.evaluate(() => { window.app.replay.playing = false; window.app.actions.setScrub(0.32); });
// Look at the pendulum for the screenshot.
await page.evaluate(() => { window.xrDevice.position.set(-0.2, 1.25, -0.35); });
await frames(6);
await page.screenshot({ path: `${out}/vr-3-compare.png` });
await page.evaluate(() => { window.xrDevice.position.set(0, 1.6, 0); });

// ---- connect two objects with a spring, in VR ----
await tapPanel('Build');
await tapPanel('Spring');
check(await page.evaluate(() => window.app.editor.connecting?.kind === 'spring'), 'Build → Spring starts connect mode');
const ballPos = await page.evaluate(() => window.__t.objectPoint('ball-1'));
await aim(ballPos); await frames(3); await press('right');
const hookPos = await page.evaluate(() => window.__t.objectPoint('box-1'));
await aim(hookPos); await frames(3); await press('right');
const springs = await page.evaluate(() => [...window.app.sim.defs.values()].filter((d) => d.kind === 'spring').map((d) => [d.a, d.b]));
if (!springs.length) console.log('DEBUG', await page.evaluate(() => ({ connecting: window.app.editor.connecting, sel: window.app.editor.selectedId, msg: window.app.menu.message, state: window.app.sim.state, log: window.app.interactionLog.events.slice(-6) })), ballPos, hookPos);
check(springs.some(([a, b]) => a === 'ball-1' && b === 'box-1'), 'pointing at the ball then the hook creates a spring between them');

// ---- B hides the panel; Info → Exit VR ----
await press('right', 'b-button');
check(await page.evaluate(() => !window.app.menu.visible), 'B button hides the panel');
await press('right', 'b-button');
check(await page.evaluate(() => window.app.menu.visible), 'B again brings it back in front of you');
await tapPanel('Info');
await page.screenshot({ path: `${out}/vr-4-info.png` });
await tapPanel('Exit VR');
await page.waitForFunction(() => window.app.stage.mode === 'desktop', null, { timeout: 5000 });
check(true, 'Info → Exit VR ends the session and returns to the desktop view');
check(await page.evaluate(() => !window.app.menu.visible && document.querySelector('.xr-button[data-mode="vr"]').textContent === 'Enter VR'), 'panel hidden and Enter VR button restored');

// ---- AR (passthrough on Quest 3) starts and hides the virtual bench ----
await page.click('.xr-button[data-mode="ar"]');
await page.waitForFunction(() => window.app.stage.mode === 'ar', null, { timeout: 5000 });
await frames(5);
check(await page.evaluate(() => !window.app.stage.bench.visible && !window.app.stage.room.visible && window.app.stage.shadowCatcher.visible),
  'AR hides the virtual bench and room and keeps shadows');
await page.evaluate(() => window.app.stage.xr.end());
await page.waitForFunction(() => window.app.stage.mode === 'desktop');
check(await page.evaluate(() => window.app.stage.bench.visible), 'leaving AR restores the bench');

// ---- robustness: a device that can't report the floor (eye-level origin only) ----
await page.evaluate(() => {
  const proto = window.XRSession.prototype;
  window.__origRef = proto.requestReferenceSpace;
  proto.requestReferenceSpace = function (type) {
    return type === 'local-floor' ? Promise.reject(new DOMException('not supported', 'NotSupportedError')) : window.__origRef.call(this, type);
  };
});
await page.click('.xr-button[data-mode="vr"]');
await page.waitForFunction(() => window.app.stage.mode === 'vr', null, { timeout: 5000 });
const fb = await page.evaluate(() => ({ fallback: window.app.stage.xr.floorFallback, labY: window.app.stage.labRoot.position.y,
  notice: document.querySelector('#notice').textContent }));
check(fb.fallback && Math.abs(fb.labY - (0.75 - 1.6)) < 1e-6, `without local-floor it falls back to an eye-level origin and lowers the bench (lab y = ${fb.labY.toFixed(2)})`);
check(/floor height/.test(fb.notice), 'and tells the user the floor height is assumed');
await page.evaluate(() => window.app.stage.xr.end());
await page.waitForFunction(() => window.app.stage.mode === 'desktop');
await page.evaluate(() => { window.XRSession.prototype.requestReferenceSpace = window.__origRef; });
check(await page.evaluate(() => window.app.stage.labRoot.position.y === 0.75), 'leaving VR restores the normal bench height');

// ---- robustness: the headset refuses to start a session ----
await page.evaluate(() => {
  window.__origReq = navigator.xr.requestSession.bind(navigator.xr);
  navigator.xr.requestSession = () => Promise.reject(new DOMException('The user denied permission.', 'NotAllowedError'));
});
await page.click('.xr-button[data-mode="vr"]');
await page.waitForFunction(() => /Could not start VR/.test(document.querySelector('#notice').textContent), null, { timeout: 5000 });
const after = await page.evaluate(() => ({ mode: window.app.stage.mode, enabled: !document.querySelector('.xr-button[data-mode="vr"]').disabled }));
check(after.mode === 'desktop' && after.enabled, 'a refused session shows the reason and leaves Enter VR usable');
await page.evaluate(() => { navigator.xr.requestSession = window.__origReq; });

// ---- the interaction log captured the session ----
const types = await page.evaluate(() => [...new Set(window.app.interactionLog.events.map((e) => e.type))]);
for (const t of ['mode', 'example', 'add', 'grab', 'release', 'edit', 'run-start', 'run-end', 'overlay', 'replay-play', 'scrub']) {
  if (!types.includes(t)) throw new Error(`FAILED: interaction log is missing "${t}" (has ${types.join(', ')})`);
}
check(true, `interaction log recorded ${types.length} kinds of event`);

check(problems.length === 0, `no console errors${problems.length ? ': ' + problems.join(' | ') : ''}`);
await browser.close();
console.log('All VR checks passed.');
