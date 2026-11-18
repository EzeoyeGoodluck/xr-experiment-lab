// End-to-end smoke test in a real (headless) Chrome.
// Usage: start a server on :8000 (npm start), then
//   node tests/browser-smoke.mjs [--chrome /path/to/chrome] [--out screenshots]
// Needs the `playwright` package available to Node.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const url = opt('--url', 'http://localhost:8000/');
const out = opt('--out', 'screenshots');
const executablePath = opt('--chrome', undefined);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1400, height: 860 } });
const problems = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(`${m.type()}: ${m.text()}`); });
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));

const check = (cond, msg) => { if (!cond) throw new Error(`FAILED: ${msg}`); console.log(`  ✓ ${msg}`); };
const waitState = (s) => page.waitForFunction((st) => window.app?.sim.state === st, s, { timeout: 20000 });

await page.goto(url);
await page.waitForFunction(() => window.app && window.app.views.meshes.size === 3);
check(true, 'page loads and builds the example scene (ramp, ball, target)');
await page.screenshot({ path: `${out}/1-setup.png` });

// Run A, using the real button.
await page.click('#btn-run');
await waitState('review');
const runA = await page.evaluate(() => {
  const r = window.app.store.runs.at(-1);
  return { name: r.name, frames: r.frameCount, reason: r.endReason, dist: r.metrics.tracks['ball-1'].finalDistance };
});
check(runA.frames > 100, `Run A recorded ${runA.frames} frames (${runA.reason})`);
await page.screenshot({ path: `${out}/2-after-run-a.png` });

// Back to setup, select the ball by clicking it in 3D, change its drag with the slider.
await page.click('#btn-reset');
await waitState('edit');
const ballScreen = await page.evaluate(() => {
  const { views, stage } = window.app;
  const mesh = views.meshOf('ball-1');
  const p = mesh.getWorldPosition(mesh.position.clone());
  p.project(stage.camera);
  const r = stage.renderer.domElement.getBoundingClientRect();
  return { x: r.left + (p.x + 1) / 2 * r.width, y: r.top + (1 - p.y) / 2 * r.height };
});
await page.mouse.click(ballScreen.x, ballScreen.y);
await page.waitForFunction(() => window.app.editor.selectedId === 'ball-1');
check(true, 'clicking the ball in the 3D view selects it');
await page.locator('#f-drag').fill('0.55');
await page.locator('#f-drag').dispatchEvent('input');
const drag = await page.evaluate(() => window.app.sim.defs.get('ball-1').drag);
check(Math.abs(drag - 0.55) < 1e-6, 'inspector slider changes the ball drag');

// Run B with the keyboard shortcut.
await page.locator('#viewport canvas').focus();
await page.keyboard.press('Space');
await waitState('review');
const cmp = await page.evaluate(() => {
  const { store } = window.app;
  const { A, B } = store.slotRuns();
  return {
    runs: store.runs.length, a: A?.name, b: B?.name,
    changes: [...document.querySelectorAll('.changes li')].map((li) => li.textContent),
    rows: document.querySelectorAll('table.metrics tbody tr').length,
    paths: window.app.overlay.parts.A?.paths.children.length + window.app.overlay.parts.B?.paths.children.length,
  };
});
check(cmp.runs === 2 && cmp.a && cmp.b, `two runs saved, comparing ${cmp.a} vs ${cmp.b}`);
check(cmp.changes.some((c) => /drag 0\.4 → 0\.55/.test(c)), `"What changed" lists: ${cmp.changes.join('; ')}`);
check(cmp.rows === 6 && cmp.paths >= 4, 'metrics table and both recorded paths are drawn');

// Scrub to the middle.
const dur = await page.evaluate(() => window.app.overlay.duration());
await page.locator('#scrub').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, dur * 0.55);
const gapText = await page.textContent('#gap');
check(/Gap between A and B/.test(gapText), `scrubbing updates the gap readout (${gapText.trim()})`);
await page.evaluate(() => {
  const { stage } = window.app;
  stage.camera.position.set(0.25, 1.15, 0.35);
  stage.orbit.target.set(0.2, 0.15, -1.2);
});
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/3-compare-scrub.png` });

// Replay plays and stops at the end.
await page.click('#btn-play');
await page.waitForFunction(() => !window.app.replay.playing, null, { timeout: 15000 });
check(await page.evaluate(() => Math.abs(window.app.replay.time - window.app.overlay.duration()) < 1e-6), 'replay plays to the end');

// Reopen Run A's setup: the drag goes back to 0.4.
await page.locator('.run').last().locator('[data-act="open"]').click();
check(await page.evaluate(() => window.app.sim.defs.get('ball-1').drag) === 0.4, 'reopening Run A restores its setup');

// Persistence across reload.
await page.reload();
await page.waitForFunction(() => window.app && window.app.store.runs.length >= 2);
check(true, 'runs are still there after a page reload');
await page.screenshot({ path: `${out}/4-after-reload.png` });

// ---- Springs, hinges, graphs, arrows ----
const screenOf = (id) => page.evaluate((oid) => {
  const { views, stage } = window.app;
  const mesh = views.meshOf(oid);
  const p = mesh.getWorldPosition(mesh.position.clone());
  p.project(stage.camera);
  const r = stage.renderer.domElement.getBoundingClientRect();
  return { x: r.left + (p.x + 1) / 2 * r.width, y: r.top + (1 - p.y) / 2 * r.height };
}, id);

await page.selectOption('#example', 'pendulum');
await page.click('[data-act="example"]');
check(await page.evaluate(() => window.app.sim.defs.has('hinge-1') && window.app.links.items.size === 1), 'pendulum example loads with its hinge drawn');
await page.click('#btn-run');
await page.waitForFunction(() => window.app.sim.time > 0.5);
const liveSeries = await page.evaluate(() => window.app.panel.graph.layout !== null);
check(liveSeries, 'the graph draws the live run while recording');
await page.click('#btn-stop');
await page.click('#btn-reset');
await page.evaluate(() => window.app.sim.update('box-2', { mass: 1.5 }));
await page.click('#btn-run');
await page.waitForFunction(() => window.app.sim.time > 2.5);
await page.click('#btn-stop');
await page.evaluate(() => window.app.editor.select('hinge-1'));
const kinds = await page.$$eval('#graph-kind option', (o) => o.map((x) => x.value));
check(kinds.join() === 'angle', `selecting the hinge switches the graph to its angle (${kinds.join()})`);
await page.evaluate(() => window.app.editor.select(null));
check((await page.$$eval('#graph-kind option', (o) => o.map((x) => x.value))).includes('speed'), 'deselecting goes back to the ball\'s graphs');

await page.check('[data-opt="arrows"]');
await page.locator('#scrub').evaluate((el) => { el.value = '0.4'; el.dispatchEvent(new Event('input', { bubbles: true })); });
check(await page.evaluate(() => [...window.app.overlay.arrows.items.values()].some((a) => a.vel.visible)), 'arrows toggle shows velocity arrows on the ghosts');
const changesP = await page.$$eval('.changes li', (l) => l.map((x) => x.textContent));
check(changesP.some((c) => /Pendulum mass 0\.6 → 1\.5/.test(c)), `pendulum comparison lists: ${changesP.join('; ')}`);
await page.evaluate(() => {
  const { stage } = window.app;
  stage.camera.position.set(-0.1, 1.35, 0.15);
  stage.orbit.target.set(-0.2, 0.95, -1.2);
});
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/6-pendulum-compare.png` });

// Connect tool with the mouse: Spring, click the ball, click the hook.
await page.click('#btn-reset');
await page.waitForFunction(() => window.app.sim.state === 'edit');
await page.click('[data-connect="spring"]');
check(/pick the first object/.test(await page.textContent('#connect-prompt')), 'Spring button asks for the first object');
const pBall = await screenOf('ball-1');
await page.mouse.click(pBall.x, pBall.y);
check(/pick the second object/.test(await page.textContent('#connect-prompt')), 'then for the second');
const pHook = await screenOf('box-1');
await page.mouse.click(pHook.x, pHook.y);
const newSpring = await page.evaluate(() => [...window.app.sim.defs.values()].find((d) => d.kind === 'spring'));
check(newSpring && newSpring.a === 'ball-1' && newSpring.b === 'box-1', 'clicking two objects creates a spring between them, drawn as a coil');
check(await page.evaluate((id) => window.app.editor.selectedId === id && !!document.querySelector('[data-field="stiffness"]'), newSpring.id),
  'the new spring is selected with stiffness/damping/rest-length controls');

// Diagnostics and benchmark.
await page.click('#diagnostics summary');
await page.click('[data-act="benchmark"]');
await page.waitForFunction(() => /pendulum/.test(document.querySelector('#bench').textContent), null, { timeout: 20000 });
const bench = await page.textContent('#bench');
check(/ramp/.test(bench) && /spring/.test(bench), `benchmark reports every example:\n${bench}`);
check(/fps/.test(await page.textContent('#diag')), 'diagnostics show the frame rate');

// Narrow (phone-sized) layout renders.
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/5-phone.png` });

const relevant = problems.filter((p) => !/GPU stall|swiftshader|WebGL.*fallback|Automatic fallback/i.test(p));
check(relevant.length === 0, `no console errors${relevant.length ? ': ' + relevant.join(' | ') : ''}`);
await browser.close();
console.log('All browser checks passed.');
