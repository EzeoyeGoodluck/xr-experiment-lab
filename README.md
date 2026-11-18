# XR Experiment Lab

A WebXR physics sandbox built around **spatial experiment comparison**. Build a setup on a virtual workbench with balls, boxes, ramps, targets, springs and hinges, then run it. Change something, run it again, and compare both runs *in the same space*: overlaid motion paths, impact markers, translucent "ghost" objects you can replay and scrub through time, velocity and force arrows, live graphs, a table of measurements, and an automatic list of exactly what changed.

> Run A → change the setup → Run B → see both recorded paths → scrub through their motion.

It runs in an ordinary desktop browser (mouse and keyboard), in a VR headset through WebXR with a full in-headset editor, and in AR (Android phone, or Quest passthrough). **No headset?** Add `?emulate=quest3` to the address to use an emulated Meta Quest 3 in your browser.

## Credits and inspiration

The idea extends **MR Blueprint** ([skylarhknight/MR-Blueprint](https://github.com/skylarhknight/MR-Blueprint)), a Unity mixed-reality physics sandbox for Meta Quest. Its create → simulate → inspect workflow, and features such as drawn springs and hinges, live graphs and force vectors, are the starting point. **No code from MR Blueprint is used.** This is an independent WebXR implementation, written because MR Blueprint needs a Quest 3, an MX Ink stylus and Unity to run.

Third-party code is included in `lib/` under its own licence:

| Library | Version | Licence | Used for |
|---|---|---|---|
| [three.js](https://threejs.org) | r187 | MIT (`lib/three/LICENSE`) | Rendering, WebXR, orbit and transform controls |
| [cannon-es](https://github.com/pmndrs/cannon-es) | 0.20.0 | MIT (`lib/cannon-es/LICENSE`) | Rigid-body physics, springs, hinges |
| [IWER](https://github.com/meta-quest/immersive-web-emulation-runtime) (Meta) | 2.8.0 | MIT (`lib/iwer/LICENSE`) | Optional emulated Quest 3 (`?emulate`) and automated VR tests |
| ↳ [gl-matrix](https://github.com/toji/gl-matrix), [webxr-layers-polyfill](https://github.com/immersive-web/webxr-layers-polyfill) | | MIT / Apache-2.0 (`lib/iwer/`) | Bundled inside IWER |

The libraries are copied into the repository rather than loaded from a CDN, so the app works offline and every test uses exactly the same versions. IWER is only loaded when `?emulate` is in the address.

## Running it

ES modules don't load from `file://`, so serve the folder with any static web server:

```bash
python3 -m http.server 8000      # Windows: py -m http.server 8000
# then open http://localhost:8000
```

Other options: `npx serve`, or the **Live Server** extension in VS Code. Useful addresses:

| Address | What it does |
|---|---|
| `/` | Desktop app with the ramp example |
| `/?example=pendulum` or `/?example=spring` | Start with another example |
| `/?emulate=quest3` | Emulated Meta Quest 3: **Enter VR** works without a headset |

WebXR needs **HTTPS** or `localhost`. GitHub Pages gives you HTTPS for phones and headsets:

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, then choose `main` and `/ (root)`.
3. After a minute the app is live at `https://<your-username>.github.io/<repo-name>/`.

## Using it

1. **Build.** Add balls, boxes, ramps and targets, or load an example (*Ramp & target*, *Pendulum (hinge)*, *Mass on a spring*). Click an object to select it and move or rotate it with the gizmo (`W` / `E`). The inspector edits mass, friction, bounciness, rolling drag, size and slope.
2. **Connect.** Press **Spring** or **Hinge**, then click two objects. You can also select an object and use **Hang on spring** or **Hang on hinge**, which adds a fixed hook above it. Select a spring to edit its stiffness, damping and rest length, or a hinge to choose its swing axis.
3. **Run.** Press **Run** (or `Space`). Every run is recorded at 120 Hz and stops when everything is at rest, after 12 s, or when you press Stop.
4. **Change and run again.** Press **Back to setup** (`R`), change something, and run again. The newest run becomes **B** (orange) and the previous one **A** (blue).
5. **Compare.**
   - **Paths:** both trajectories, with white ticks every 0.25 s (wider spacing means faster).
   - **Hits:** rings where an object hit something. They light up once the replay passes them.
   - **Ghosts:** translucent copies of each run's objects, springs and hinges. Drag the timeline, press play (`P`), or step with `←` `→`. A white line shows the gap between A and B.
   - **Arrows:** velocity (cyan) and contact/connection force (magenta) on the ghosts, and on the live objects while a run is recording.
   - **Setups:** wireframes of each run's fixed objects (e.g. the ramp at its angle in that run).
   - **Graph:** A, B and the live run overlaid: speed, height, distance to target, or (with a spring or hinge selected) spring stretch, spring force or hinge angle. Drag on the graph to scrub.
   - **Measurements and "What changed":** final distance to target, closest approach, time to reach the target, top speed, distance travelled and time until stopped, plus an automatic list of the setup differences between A and B.
6. **Keep a notebook.** Runs are saved in the browser. Rename them, add notes, pick any two to compare, **Open** a run to reload the exact setup it started from, and export as JSON (re-importable) or CSV.

### In VR

When the controllers connect, a panel appears at your left side with **Build / Inspect / Compare / Info** pages. From the panel you can do everything you can do at a desktop: add objects (they appear in front of you), load examples, connect objects, edit every property with sliders, choose which runs to compare, toggle overlays, scrub, and see the graph and measurements.

| Controller (either hand) | |
|---|---|
| Trigger | Press panel buttons and drag sliders. On an object: select it and grab it (while editing). In connect mode: pick the two ends. |
| Grip | Run → stop → back to setup |
| Thumbstick left/right | Scrub the replay |
| A / X | Play / pause the replay |
| B / Y | Hide / show the panel (it reappears beside you) |

### In AR

- **Android phone (Chrome):** tap a surface to place the lab, tabletop-sized or life-size. The normal HTML panel works over the camera view.
- **Quest 3 passthrough:** the virtual bench and room are hidden, shadows stay, and the in-headset panel works as in VR.

### Desktop controls

| Key | |
|---|---|
| Drag / scroll | Orbit / zoom |
| Click | Select (or pick an end while connecting) |
| `W` / `E` | Move / rotate gizmo |
| `Space` / `R` | Run–stop / back to setup |
| `P`, `←` `→` (`Shift` = bigger steps) | Play / scrub replay |
| `Del`, `Esc` | Delete / deselect or cancel connecting |

## Robustness

- **Capability detection with reasons.** The Enter VR / Enter AR buttons say why they're unavailable (page not secure, no WebXR in this browser, no headset found, no AR support) and suggest what to try instead. If WebGL itself is missing, the app shows a clear message instead of a blank page.
- **Session lifecycle.** The app uses its own session manager instead of three.js's stock buttons. A refused or failed session shows the reason and leaves the buttons usable. Ending a session restores the desktop view, and the panel and controller state are reset.
- **Reference-space fallback.** If a device can't report the floor (`local-floor`), the app falls back to an eye-level origin, lowers the bench to keep it at table height, and tells the user.
- **Pausing.** The simulation pauses while tracking is lost or the system menu is open (`visibilitychange`), so recordings never contain jumps from the headset being taken off. Recentering re-places the panel.
- **Frame rate.** The app picks the highest supported frame rate up to 90 Hz and enables foveated rendering.
- **Other failures.** WebGL context loss triggers an automatic reload (runs are already saved). Unhandled errors show a notice instead of failing silently. If browser storage is unavailable (private mode), the app still works and tells you to export.
- **Deterministic physics.** Each run uses a brand-new physics world and a fixed 120 Hz step, so the same setup always produces the same recording. Any difference between A and B is therefore caused by the setup change.

## Evidence for evaluation

- **Diagnostics** (in the panel, and on the VR Info page): frame rate, average / 95th-percentile / maximum frame time, the share of frames over the frame budget, physics and render time per frame, and recording memory.
- **Performance log (CSV):** one row per second with the mode, state and object count, for comparing desktop and VR or scene sizes.
- **Physics benchmark:** milliseconds per physics step and speed relative to real time, for every example.
- **User-study log (CSV):** timestamped actions (runs, edits, grabs, scrubs, overlay toggles, mode changes) with an optional participant label and no personal data. Useful for task-time and behaviour analysis.
- **Run exports (JSON/CSV):** every measurement for every run, with notes.

## Automated tests

```bash
npm test               # 22 unit tests of the core logic in Node (no browser)
npm run test:browser   # desktop end-to-end in headless Chrome
npm run test:vr        # VR/AR end-to-end with an emulated Quest 3 (IWER)
```

The browser suites need `playwright` (`npm i -D playwright`) and a server on port 8000. [`docs/TESTING.md`](docs/TESTING.md) lists every check and the bugs the tests found.

## Project structure

```
index.html              page shell + import map
src/main.js             wiring, app actions, render loop, robustness handlers
src/core/               no rendering code: all testable in Node
  defs.js               serialisable object + connection definitions, examples, maths
  physicsRuntime.js     cannon-es: bench, bodies, springs, hinges, rolling resistance
  simulation.js         edit → run → review → reset; connect; deterministic runs
  recorder.js           every object's pose at every physics step; interpolation
  derived.js            graph series, velocity, contact force, impacts, spring/hinge state
  metrics.js            per-run measurements, A/B comparison, gap at time t
  setupDiff.js          "what changed" between two setups (objects and connections)
  runStore.js           run history, A/B slots, browser storage, JSON import/export
  perf.js               frame-time monitor, per-second log, physics benchmark
  interactionLog.js     timestamped user-study log
src/view/               three.js
  stage.js              renderer, camera, workbench, room, XR mode changes
  xrSession.js          capability detection, Enter VR/AR, session lifecycle, fallbacks
  objectViews.js        object meshes built from the same definitions as the physics
  constraintViews.js    spring coils and hinge axles (live and ghost)
  overlay.js            comparison paths, ticks, impacts, ghosts, arrows, gap line
  arrows.js             velocity / force arrows
  graph.js              canvas graph (desktop panel and in-headset panel)
  editor.js             selection, connect tool, desktop gizmo
  xrInput.js            controllers (panel, grab, connect, grip, stick), AR placement
  vrPanel.js            in-headset UI toolkit (buttons, sliders, toggles on a canvas)
src/ui/
  panel.js              HTML control panel
  vrMenu.js             in-headset pages: Build / Inspect / Compare / Info
  fields.js             editable properties shared by both inspectors
  graphModel.js         what the graph shows, shared by both panels
lib/                    third-party libraries (see Credits)
tests/                  unit, desktop and VR end-to-end tests
docs/TESTING.md         test inventory and findings
```

## Known limitations

- **Tested in emulation, not yet on a physical headset or phone.** Every VR and AR path is exercised automatically with Meta's emulator (IWER), but real-device testing (comfort, tracking quality, AR hit-testing on a real surface, performance on Quest hardware) still needs doing.
- **Quest AR uses the bench's default position.** Tap-to-place exists only on phones. Placing the lab with a controller ray in passthrough is not implemented yet.
- **Game physics, not a scientific solver.** cannon-es is plausible and repeatable, and validated against textbook results for free fall, bounce timing, resting force and spring equilibrium (see tests). But it approximates friction from gravity rather than from contact force, which over-damps fast sideways impacts: a high-friction pendulum barely moves a ball. The pendulum example uses a low-friction rod for this reason. It also has no rolling resistance, so this app adds a simple model.
- **Hinge axes are fixed in lab space** when the run starts (X, Y or Z), and hinge angles are measured relative to the start.
- **Runs are stored per browser** (localStorage, last 30 runs). Export to keep them.
