---
id: SKL-0143
name: Phaser Web Game Development
category: skills
tags: [game-dev, phaser, html5, web-games, sprites, physics, scenes, tilemaps, arcade-physics, matter-js]
capabilities: [scene-management, sprite-animation, physics-setup, input-handling, tilemap-rendering, asset-loading]
useWhen:
  - building a 2D game for the web browser
  - setting up Phaser scenes, sprites, and physics
  - choosing between Arcade Physics and Matter.js
  - creating animations, tilemaps, or input controls in Phaser
  - learning the Phaser framework for the first time
estimatedTokens: 700
relatedFragments: [SKL-0142, PAT-0064, PAT-0065, PAT-0066]
dependencies: []
synonyms: ["how to make a web game with Phaser", "Phaser getting started guide", "browser game framework", "2D game in JavaScript", "how to add physics to my web game", "Phaser scenes and sprites tutorial"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Phaser Web Game Development

## Purpose

Build 2D games that run in any web browser using Phaser. Covers the core concepts needed to go from empty page to playable game: scenes, sprites, physics, input, and asset management.

## Phaser Architecture

```
Phaser.Game (config)
├── Scene Manager
│   ├── Boot Scene (load minimal assets, show loading bar)
│   ├── Menu Scene (title screen, start button)
│   ├── Game Scene (main gameplay)
│   └── GameOver Scene (score, retry)
├── Physics Engine (Arcade or Matter)
├── Input Manager (keyboard, mouse, touch, gamepad)
├── Loader (images, spritesheets, audio, tilemaps, JSON)
├── Camera System
└── Sound Manager
```

## Scene Lifecycle

Every Phaser scene has three core methods:

| Method | Purpose |
|--------|---------|
| `preload()` | Load assets (images, audio, spritesheets). Runs before the scene starts. |
| `create()` | Set up game objects, physics, input bindings. Runs once after preload completes. |
| `update(time, delta)` | Runs every frame. Game logic, movement, collision checks. |

Scenes can run in parallel (e.g., a HUD scene overlaying the game scene) or transition sequentially.

## Sprites & Game Objects

```javascript
// Create a sprite with physics
const player = this.physics.add.sprite(100, 300, 'player');
player.setCollideWorldBounds(true);
player.setBounce(0.2);

// Play an animation
player.anims.play('walk', true);
```

Key game objects: `Sprite`, `Image` (no physics), `TileSprite` (repeating), `Text`, `Container` (group transforms), `Particles`.

## Physics Engines

| Feature | Arcade | Matter.js |
|---------|--------|-----------|
| **Complexity** | Simple AABB and circle | Full rigid body simulation |
| **Performance** | Fast, handles hundreds of objects | Slower, realistic physics |
| **Collision shapes** | Rectangles and circles only | Polygons, compound shapes, constraints |
| **Best for** | Platformers, shooters, casual games | Puzzles, ragdoll, realistic simulations |
| **Rotation physics** | No | Yes (torque, angular velocity) |

Start with Arcade. Switch to Matter only when you need non-rectangular collisions, joints, or realistic rotation.

## Input Handling

```javascript
// Keyboard
const cursors = this.input.keyboard.createCursorKeys();
if (cursors.left.isDown) player.setVelocityX(-160);

// Pointer (mouse + touch)
this.input.on('pointerdown', (pointer) => {
  this.shoot(pointer.x, pointer.y);
});

// Gamepad
const pad = this.input.gamepad.getPad(0);
if (pad.left) player.setVelocityX(-160);
```

## Tilemaps

Tilemaps power large levels without creating individual sprites. Use **Tiled** (free map editor) to design levels, export as JSON, and load in Phaser:

```javascript
const map = this.make.tilemap({ key: 'level1' });
const tileset = map.addTilesetImage('terrain', 'terrainImage');
const ground = map.createLayer('Ground', tileset);
ground.setCollisionByProperty({ collides: true });
this.physics.add.collider(player, ground);
```

## Asset Loading Best Practices

1. **Load in a Boot scene** with a progress bar. Never block the game scene with loading.
2. **Use texture atlases** (spritesheets packed into one image) to reduce draw calls.
3. **Preload audio** to avoid playback delays on first trigger.
4. **Use `this.load.on('progress')`** to show loading percentage.

## Common Game Structure

| File | Purpose |
|------|---------|
| `config.js` | Phaser game config (size, physics, scenes) |
| `scenes/BootScene.js` | Asset loading + progress bar |
| `scenes/MenuScene.js` | Title screen, settings |
| `scenes/GameScene.js` | Core gameplay |
| `scenes/HUDScene.js` | Score, health, overlays |
| `scenes/GameOverScene.js` | Results, retry |

## Anti-Patterns

- Putting all logic in one giant scene (split into multiple scenes)
- Creating new objects every frame instead of pooling (use Groups with `maxSize`)
- Using Matter.js when Arcade physics is sufficient (unnecessary performance cost)
- Loading assets in the game scene (causes visible stutter)
- Forgetting `delta` in update (physics tied to frame rate)
