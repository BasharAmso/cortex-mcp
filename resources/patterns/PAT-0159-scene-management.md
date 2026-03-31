---
id: PAT-0159
name: Scene Management Pattern
category: patterns
tags: [game-dev, scenes, scene-transitions, loading-screens, game-state, lifecycle]
capabilities: [scene-lifecycle, scene-transitions, loading-screens, state-passing, parallel-scenes]
useWhen:
  - organizing a game into multiple screens (menu, gameplay, game over)
  - implementing transitions between game scenes
  - building a loading screen with progress feedback
  - passing data between scenes (score, level, player state)
  - running overlay scenes like HUD or pause menu
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0304, SKL-0142, PAT-0064]
dependencies: []
synonyms: ["how to switch between game scenes", "game scene lifecycle explained", "how to make a loading screen", "passing data between scenes in Phaser", "pause menu overlay scene", "game screen management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Scene Management

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0159 |
| **Name** | Scene Management Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Scenes are the top-level organizational unit in a game. Every distinct screen (title menu, gameplay, inventory, game over) is a scene with its own lifecycle. Good scene management keeps each screen self-contained while enabling smooth transitions and data flow between them.

### Standard Scene Map

```
Boot Scene (load minimal assets, show splash)
    ↓
Preload Scene (load all game assets, show progress bar)
    ↓
Menu Scene (title screen, settings, credits)
    ↓ [start game]
Game Scene (core gameplay loop)
    ↕ [parallel]
    HUD Scene (score, health, minimap overlay)
    Pause Scene (pause menu overlay)
    ↓ [game ends]
Game Over Scene (results, retry, return to menu)
```

### Scene Lifecycle

Every scene follows a predictable lifecycle. Understanding when each method runs prevents initialization bugs:

| Method | When It Runs | Use For |
|--------|-------------|---------|
| `init(data)` | First, every time the scene starts | Receive data passed from another scene |
| `preload()` | After init, before create | Load assets (only in boot/preload scenes) |
| `create()` | After preload completes | Set up game objects, physics, input |
| `update(time, delta)` | Every frame while scene is active | Game logic, movement, collision |
| `shutdown()` | When scene is stopped or switched away | Clean up listeners and timers |

### Passing Data Between Scenes

Pass data through the `start` or `launch` call. The receiving scene picks it up in `init()`:

```javascript
// Sending scene
this.scene.start('GameOver', {
  score: this.score,
  level: this.currentLevel,
  time: this.elapsedTime
});

// Receiving scene (GameOver)
init(data) {
  this.finalScore = data.score;
  this.level = data.level;
}
```

### Scene Transitions

Raw scene switches are jarring. Add transitions for polish:

```javascript
// Fade out current scene, then start new one
this.cameras.main.fadeOut(500, 0, 0, 0);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextLevel', { level: this.level + 1 });
});

// Receiving scene fades in
create() {
  this.cameras.main.fadeIn(500);
  // ... set up scene
}
```

Common transitions: fade to black, fade to white, slide, iris wipe (circle closing/opening), and crossfade.

### Loading Screens

Never load assets in the gameplay scene. Use a dedicated preload scene with a progress bar:

```javascript
class PreloadScene extends Phaser.Scene {
  preload() {
    // Progress bar
    const bar = this.add.rectangle(400, 300, 0, 30, 0x00ff00);
    this.load.on('progress', (value) => {
      bar.width = 600 * value; // fill from 0 to 600px
    });
    this.load.on('complete', () => {
      this.scene.start('Menu');
    });

    // Load all game assets here
    this.load.image('player', 'assets/player.png');
    this.load.spritesheet('enemies', 'assets/enemies.png', { frameWidth: 32 });
    this.load.audio('bgm', 'assets/music.mp3');
    this.load.tilemapTiledJSON('level1', 'assets/level1.json');
  }
}
```

### Parallel Scenes (Overlays)

HUD, pause menus, and dialog boxes run as parallel scenes overlaying the game:

```javascript
// Launch HUD alongside the game scene (both run simultaneously)
this.scene.launch('HUD');

// Pause: launch pause menu, pause game scene
this.scene.launch('PauseMenu');
this.scene.pause('Game');

// Resume: stop pause menu, resume game scene
this.scene.stop('PauseMenu');
this.scene.resume('Game');
```

Parallel scenes are key for separation of concerns. The HUD scene manages score display and health bars without touching game logic.

### Scene Registry (Global Data)

For data that persists across all scenes (player profile, settings, total score), use a scene registry or global data store instead of passing through every transition:

```javascript
// Set from any scene
this.registry.set('totalCoins', 42);

// Read from any scene
const coins = this.registry.get('totalCoins');

// Listen for changes
this.registry.events.on('changedata-totalCoins', (parent, value) => {
  this.coinText.setText(`Coins: ${value}`);
});
```

## Anti-Patterns

- Loading assets in the game scene (causes visible stutter or freeze)
- Hardcoding scene names as strings everywhere (use a constants file)
- Forgetting to clean up event listeners in `shutdown()` (causes memory leaks and duplicate handlers)
- Passing large objects between scenes instead of using the registry for shared state
- Skipping transitions (instant scene switches feel broken)

## Key Takeaways

- Every distinct screen in your game should be its own scene with a clear lifecycle
- Load all assets in a dedicated preload scene with a visible progress bar
- Pass data between scenes via `start(key, data)` and receive it in `init(data)`
- Use parallel scenes for HUD and pause overlays to separate concerns
- Add fade or transition effects between scenes for professional polish
