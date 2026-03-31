---
id: PAT-0064
name: Game Loop Pattern
category: patterns
tags: [game-dev, game-loop, timestep, delta-time, frame-rate, input-update-render, fixed-timestep]
capabilities: [frame-independence, timestep-management, input-update-render-cycle, performance-budgeting]
useWhen:
  - building the core update cycle for a game
  - ensuring game speed is consistent across different hardware
  - choosing between fixed and variable timestep
  - debugging frame rate or physics inconsistencies
  - understanding how game engines process each frame
estimatedTokens: 600
relatedFragments: [SKL-0142, PAT-0065, PAT-0066, SKL-0143]
dependencies: []
synonyms: ["how does a game loop work", "fixed vs variable timestep", "what is delta time in games", "input update render cycle", "how to make my game run at the same speed on every computer", "frame rate independence"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/munificent/game-programming-patterns"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Game Loop Pattern

The game loop decouples game progression from hardware speed and user input. It continuously processes input, updates game state, and renders, ensuring the game feels the same on fast and slow machines.

## The Core Cycle

```
while (running) {
  processInput();    // read keyboard, mouse, gamepad
  update(dt);        // advance game state by dt
  render();          // draw the current frame
}
```

Every game, from Pong to open-world RPGs, runs some version of this loop. The key question is how to handle **time**.

## Timestep Strategies

### 1. Fixed Timestep with Sleep

```
const MS_PER_UPDATE = 16;  // ~60 FPS

while (running) {
  let start = now();
  processInput();
  update(MS_PER_UPDATE);
  render();
  sleep(start + MS_PER_UPDATE - now());
}
```

Simple and deterministic. Physics behaves identically every run. Fails if the update takes longer than the budget (game slows down).

### 2. Variable Timestep

```
while (running) {
  let dt = timeSinceLastFrame();
  processInput();
  update(dt);
  render();
}
```

Adapts to hardware speed. But floating-point accumulation causes physics drift. Two players on different machines get different results. Avoid for physics-heavy or multiplayer games.

### 3. Fixed Update, Variable Render (Recommended)

```
const MS_PER_UPDATE = 16;
let lag = 0;

while (running) {
  let elapsed = timeSinceLastFrame();
  lag += elapsed;

  processInput();

  while (lag >= MS_PER_UPDATE) {
    update(MS_PER_UPDATE);    // always same dt
    lag -= MS_PER_UPDATE;
  }

  render(lag / MS_PER_UPDATE);  // interpolation factor
}
```

**Why this wins:**
- Physics uses a fixed timestep (deterministic, stable)
- Rendering adapts to hardware (fast machines get smoother frames)
- The interpolation factor lets render draw between update steps for visual smoothness
- If the machine is slow, it catches up by running multiple updates before rendering

## Delta Time Explained

Delta time (`dt`) is the elapsed time since the last frame. Multiply movement by `dt` to make it frame-independent:

```
// Wrong: moves faster on faster machines
position.x += 5;

// Right: moves the same regardless of frame rate
position.x += speed * dt;
```

This applies to all time-dependent values: movement, animation progress, cooldown timers, particle lifetimes.

## Frame Budget

At 60 FPS, each frame has ~16.6ms. Budget it:

| System | Typical Budget |
|--------|---------------|
| Input | <1ms |
| Physics / update | 4-6ms |
| Rendering | 8-10ms |
| Audio | <1ms |
| Headroom | 1-2ms |

If you exceed 16.6ms, frames drop. Profile to find the bottleneck before optimizing.

## Platform Considerations

- **Web browsers** own the loop. Use `requestAnimationFrame` instead of a manual while-loop. The browser calls your function at the display refresh rate.
- **Game engines** (Phaser, Unity, Godot) manage the loop internally. You implement `update(dt)` and `render()` hooks.
- **Mobile** games should cap frame rate to preserve battery.

## Anti-Patterns

- Using variable timestep for physics (non-deterministic, causes tunneling)
- Forgetting to multiply by `dt` (game speed tied to frame rate)
- Busy-waiting instead of sleeping (wastes CPU and battery)
- Running physics and rendering at the same rate (either wastes CPU or starves physics)
- No frame budget awareness (adding features until it stutters, then panicking)
