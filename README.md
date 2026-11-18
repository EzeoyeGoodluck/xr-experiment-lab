# XR Experiment Lab

A WebXR physics sandbox built around **spatial experiment comparison**. Build a setup, run it, change something, run it again, then compare both runs *in the same space*: overlaid motion paths, translucent "ghost" objects you can replay and scrub through time, wireframes of each run's setup, and a table of measurements with a list of exactly what changed.

> Run A → change the setup → Run B → see both recorded paths → scrub through their motion.

It runs in an ordinary desktop browser (mouse and keyboard), in a VR headset through WebXR, and in phone AR on Android.

## Credits and inspiration

The idea extends **MR Blueprint** by Skylar Knight and collaborators ([skylarhknight/MR-Blueprint](https://github.com/skylarhknight/MR-Blueprint)), a Unity mixed-reality physics sandbox for Meta Quest. That project's create → simulate → inspect workflow is the starting point. **No code from MR Blueprint is used here.** This is an independent browser implementation, written because MR Blueprint needs a Quest 3, an MX Ink stylus and Unity to run.

Third-party libraries are included in `lib/` under their own MIT licences:

| Library | Version | Licence | Used for |
|---|---|---|---|
| [three.js](https://threejs.org) | r187 | MIT (`lib/three/LICENSE`) | Rendering, WebXR, orbit and transform controls |
| [cannon-es](https://github.com/pmndrs/cannon-es) | 0.20.0 | MIT (`lib/cannon-es/LICENSE`) | Rigid-body physics |

The libraries are copied into the repository rather than loaded from a CDN, so the app runs offline and every test uses the exact same versions.

## Running it

ES modules don't load from `file://`, so serve the folder with any static web server:

```bash
# Python (already on most machines)
python3 -m http.server 8000
# then open http://localhost:8000
```

Other options: `npx serve`, or the **Live Server** extension in VS Code.

WebXR (VR/AR) needs **HTTPS** or `localhost`. The easiest way to get HTTPS on other devices is GitHub Pages (below).

### Publish with GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, then choose `main` and `/ (root)`.
3. After a minute the app is live at `https://<your-username>.github.io/<repo-name>/`. Open that URL on any computer, phone or headset.

## Using it

1. **Build.** Load the ramp example, or add balls, boxes, ramps and targets. Click an object to select it. Move or rotate it with the gizmo (`W` / `E`), and use the inspector for mass, friction, bounciness, rolling drag, size and slope.
2. **Run.** Press **Run** (or `Space`). Every run is recorded automatically and stops when everything comes to rest, after 12 s, or when you press Stop.
3. **Change and run again.** Press **Back to setup** (`R`), change something, and run again. The newest run becomes **B** (orange) and the previous one **A** (blue).
4. **Compare.**
   - **Paths:** both recorded trajectories, with white ticks every 0.25 s (wider spacing means faster).
   - **Ghosts:** translucent copies of each run's objects. Drag the timeline, press play (`P`), or step with `←` `→`. The white line shows the gap between A and B at that moment.
   - **Setups:** wireframes of each run's fixed objects (e.g. the ramp at its angle in that run).
   - **Measurements:** final distance to target, closest approach, time to reach the target, top speed, distance travelled, and time until stopped.
   - **What changed:** an automatic list of the setup differences between A and B.
5. **Keep a notebook.** Runs are saved in the browser. Rename them, add notes, pick any two to compare, **Open** a run to reload the exact setup it started from, and export everything as JSON (re-importable) or CSV (for analysis).

### Controls

| Desktop | |
|---|---|
| Drag / scroll | Orbit / zoom |
| Click | Select object |
| `W` / `E` | Move / rotate gizmo |
| `Space` | Run / stop |
| `R` | Back to setup |
| `P`, `←` `→` (`Shift` = bigger steps) | Play / scrub replay |
| `Del`, `Esc` | Delete / deselect |

| VR controllers (either hand) | |
|---|---|
| Trigger | Grab and move an object (while editing) |
| Grip | Run → stop → back to setup |
| Thumbstick left/right | Scrub the replay |
| A / X | Play / pause the replay |

A status board in the headset shows the run state, Run A vs Run B and the replay time.

**Phone AR (Android Chrome):** tap a surface to place the lab, either tabletop-sized or life-size. The normal panel works over the camera view.

## Testing without a headset

| Option | How |
|---|---|
| Desktop browser | Everything except entering VR/AR works with mouse and keyboard. |
| **Immersive Web Emulator** | Install Meta's free [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) for Chrome or Edge. Open DevTools → *WebXR* tab, then press **Enter VR** on the page. You can move the emulated headset and controllers and press their buttons. |
| Android phone | Open the GitHub Pages URL in Chrome and press **Enter AR** (needs ARCore support). iPhone Safari does not support WebXR AR. |
| Meta Quest (if you can borrow one) | Open the GitHub Pages URL in the Quest Browser and press **Enter VR**. |

## Automated tests

```bash
npm test                 # core logic in Node (no browser needed)
npm run test:browser     # end-to-end in headless Chrome (needs `npm i -D playwright` and a server on :8000)
```

- `tests/core.test.js` checks that runs are deterministic (the same setup gives an identical recording), that reset restores the exact starting setup, that the recording is complete, scrubbing interpolation, Run A vs Run B metrics and setup differences, export/import round trips, reopening a saved setup, and storage failures.
- `tests/browser-smoke.mjs` drives the real UI: it runs the example, selects the ball by clicking it in 3D, changes a slider, records Run B, checks the comparison table and "What changed", scrubs, replays, reopens Run A's setup, reloads the page, checks the phone layout, and fails on any console error. Screenshots go to `screenshots/`.

## Project structure

```
index.html            page shell + import map
src/main.js           wires everything together, render loop, keyboard shortcuts
src/core/             no rendering code: testable in Node
  defs.js             serialisable object definitions, example setup, maths helpers
  physicsRuntime.js   cannon-es wrapper (fixed 120 Hz step, rolling resistance)
  simulation.js       edit → run → review → reset state machine
  recorder.js         records every object's pose at every physics step; interpolation
  metrics.js          measurements per run, A/B comparison, gap at time t
  setupDiff.js        "what changed" between two setups
  runStore.js         run history, A/B slots, browser storage, JSON import/export
src/view/             three.js
  stage.js            renderer, camera, lights, floor, VR/AR session entry
  objectViews.js      meshes built from the same definitions as the physics
  overlay.js          comparison paths, ticks, ghosts, setup wireframes, gap line
  editor.js           desktop selection and transform gizmo
  xrInput.js          VR controllers, AR hit-test placement
  hud.js              in-headset status board
src/ui/panel.js       HTML control panel
lib/                  third-party libraries (MIT)
tests/                unit and browser tests
```

### Design decisions

- **Definitions are the single source of truth.** Every object is a plain JSON definition. Physics bodies and meshes are always rebuilt from it, so any run's setup can be saved, diffed and reopened exactly.
- **Deterministic runs.** Each run uses a brand-new physics world and a fixed time step, so the same setup always produces the same recording. Any difference between A and B is therefore caused by the setup change, not by randomness. An earlier version reused the world between runs and produced runs one step apart, which the determinism test caught.
- **Record everything, compute later.** Poses are recorded at every physics step (120 Hz). Metrics and replays are derived from the recording, so new measurements can be added without re-running experiments.
- **Lab-local coordinates.** All experiment content lives under one `labRoot` node. In AR the whole lab can be placed and scaled on a real surface without changing the physics.
- **Rolling resistance.** cannon-es has none, so balls would roll forever. A constant deceleration (`drag × 0.25 × g`) is applied while a ball touches something.

## Status and limitations

- Tested: desktop Chrome (headless, automated) and the phone-sized layout.
- **Not yet tested on real hardware or in the emulator:** VR controller interaction, the in-headset board, and AR placement. These are written against the WebXR and three.js APIs but still need checking in the Immersive Web Emulator and on a device.
- Desktop editing is richer than VR editing. In VR you can grab and reposition objects but not yet change their properties.
- Physics is a real-time game engine (cannon-es), not a scientific solver. Results are plausible and repeatable but not exact.
- Runs are stored per browser (localStorage). Export to keep them.
