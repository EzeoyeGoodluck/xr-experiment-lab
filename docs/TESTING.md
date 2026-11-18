# Testing record

Three automated suites cover the app. All three passed at the last commit.

| Suite | Command | Environment | Checks |
|---|---|---|---|
| Core unit tests | `npm test` | Node 22, no browser | 22 tests |
| Desktop end-to-end | `npm run test:browser` | Headless Chrome (SwiftShader WebGL), 1400×860 and 390×844 | 24 checks |
| VR/AR end-to-end | `npm run test:vr` | Headless Chrome + IWER 2.8.0 emulating a Meta Quest 3 | 30 checks |

The end-to-end suites need a static server on port 8000 and `playwright`. Pass `--chrome /path/to/chrome` to use an installed Chrome.

## Core unit tests (`tests/core.test.js`)

**Workflow and recording**
- The same setup gives an identical recording, for every example (determinism).
- Reset restores the exact setup a run started from.
- Every physics step is recorded from t = 0. Fixed objects and targets are not tracked.
- Scrubbing interpolates between samples, clamps at both ends, and keeps rotations normalised.
- Editing while reviewing a run first returns to the setup.

**Comparison**
- A design change (more drag) produces measurably shorter travel. The newest run goes to slot B and the previous one to A.
- "What changed" reports drag, friction, moves, rotations, added and removed objects, and spring stiffness.
- The gap between A and B is zero at t = 0 and non-zero once the paths separate.

**Physics validation against textbook values**
- Free fall: velocity after 0.2 s matches g·t within 0.1 m/s.
- Bounce: the first impact of a ball dropped from 0.5 m happens at √(2h/g) within 30 ms.
- Rest: a 2 kg box resting on the bench feels a contact force of m·g (±0.6 N). A falling ball feels none.
- Spring: a hanging mass settles at a stretch of m·g/k (±2 cm), and a stiffer spring oscillates faster.
- Hinge: the pivot point stays fixed (drift < 1 cm) while the pendulum swings. A heavier pendulum knocks the ball further.

**Derived data**
- The speed graph's peak matches the top-speed metric (within 15 %). Graphs work on live, still-growing recordings.
- Hinge angle starts at 0° and swings through 40–90°. The right graph types are offered for objects, springs and hinges.

**Connections**
- A spring's rest length comes from the current layout. Self-connections and connections to targets are rejected.
- Hanging an object adds a fixed hook. Deleting an object removes its connections.

**Data and evidence**
- Export/import round trips preserve runs, slots and metrics. Reopening an imported setup reproduces the original run.
- Browser storage is used when available, and failures (denied, full) are tolerated.
- The performance monitor computes fps, p95 frame time, budget overruns and per-second logs.
- The benchmark shows every example running faster than real time.
- The interaction log CSV escapes quotes correctly.

## Desktop end-to-end (`tests/browser-smoke.mjs`)

These tests use the real UI: clicks in the 3D view, the panel and the keyboard.

- Loads the ramp example. Records Run A with the Run button.
- Clicking the ball in 3D selects it, and the inspector's drag slider changes it.
- Space records Run B. The comparison shows both runs, "What changed" lists `drag 0.4 → 0.55`, and both paths are drawn.
- Scrubbing updates the gap readout. The replay plays to the end. Reopening Run A restores its setup.
- Runs survive a page reload.
- The pendulum example loads with its hinge drawn, and the graph draws the live run while recording.
- Selecting the hinge switches the graph to hinge angle, and deselecting switches back.
- The arrows toggle shows velocity arrows on the ghosts. "What changed" lists `Pendulum mass 0.6 → 1.5 kg`.
- Connect tool: Spring → click ball → click hook creates a spring, which is selected with its controls.
- Diagnostics show the frame rate, and the benchmark reports every example.
- The phone-sized layout renders, and the console has no errors.

## VR/AR end-to-end (`tests/vr-e2e.mjs`)

These tests aim emulated controllers at the panel and at objects, and press real emulated buttons.

- Entering VR shows the floating panel when controllers connect.
- **Panel:** loads an example, and "+ Ball" adds a ball on the bench in front of the user.
- **Grab:** moving the controller with the trigger held moves the ball by the same amount (0.25 m), and releasing lets go.
- **Inspect:** Delete removes the selected object. Pointing at the pendulum selects it. Dragging the Mass slider with the ray changes it.
- **Grip:** runs, then returns to the setup. Two runs are recorded from inside VR.
- **Compare:** the Arrows toggle works, the thumbstick scrubs, ghost arrows appear, and A plays the replay.
- **Connect in VR:** Spring, then point at ball and hook, creates the spring.
- **B button:** hides the panel and brings it back. Info → Exit VR returns to desktop with the buttons restored.
- **AR (Quest passthrough):** hides the virtual bench and room and keeps shadows. Leaving AR restores them.
- **Floor fallback:** with `local-floor` refused, the app falls back to an eye-level origin, lowers the bench (lab y = −0.85) and tells the user. Leaving restores the bench.
- **Refused session:** the reason is shown and Enter VR stays usable.
- The interaction log captured 16 kinds of event, and the console has no errors.

## Bugs the tests found (and fixes)

| Found by | Problem | Fix |
|---|---|---|
| Determinism unit test | Two runs of the same setup differed by one step. The physics world kept its clock, contacts and sleep timers between runs. | A fresh physics world for every run. |
| Desktop E2E | Space didn't start a run after using a slider, because shortcuts were ignored whenever any input had focus. | Only ignore keys in text fields. Let buttons and sliders keep their own keys. |
| Spring unit test (test bug) | Oscillations were counted around a fixed height, but a stiffer spring hangs higher. | Count crossings of each run's own mean height. |
| Pendulum tuning | The pendulum stopped dead on hitting the ball. cannon-es estimates friction from gravity, over-damping fast sideways impacts. | Low-friction rod in the example. Documented as an engine limitation. |
| VR E2E (screenshot) | The panel was placed before the headset reported a pose, so it appeared 22 cm below the floor. | Wait for a real head pose before placing. |
| VR E2E | The panel, placed front-left, blocked rays (and the view) to the left of the bench. | Moved it to the user's left side. |
| VR E2E | "Spring" silently used the selected object as the first end, so the wrong objects were connected. | Connect mode always asks for both ends. "Hang selected on…" covers the selected-object case. |
| Desktop E2E | A hinge axle at a hook's centre hid the hook from clicks while connecting. | While connecting, only objects can be picked. |

## Not covered by automation

- Real headsets and phones: comfort, tracking quality, real AR surfaces, controller ergonomics, hand tracking.
- Performance on Quest hardware. Use the in-app diagnostics, performance log and benchmark on the device.
- User experience and learning outcomes. Use the interaction log and a study protocol.
