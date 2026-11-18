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
await page.locator('#p-drag').fill('0.55');
await page.locator('#p-drag').dispatchEvent('input');
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
await page.waitForFunction(() => window.app && window.app.store.runs.length === 2);
check(true, 'runs are still there after a page reload');
await page.screenshot({ path: `${out}/4-after-reload.png` });

// Narrow (phone-sized) layout renders.
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/5-phone.png` });

const relevant = problems.filter((p) => !/GPU stall|swiftshader|WebGL.*fallback|Automatic fallback/i.test(p));
check(relevant.length === 0, `no console errors${relevant.length ? ': ' + relevant.join(' | ') : ''}`);
await browser.close();
console.log('All browser checks passed.');
