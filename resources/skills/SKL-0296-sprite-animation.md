---
id: SKL-0296
name: Sprite Animation
category: skills
tags: [sprites, animation, sprite-sheets, tweens, particle-effects, frame-animation]
capabilities: [sprite-sheet-setup, frame-animation-creation, tween-animation, particle-system-design]
useWhen:
  - animating game characters with sprite sheets
  - creating smooth movement and transition animations
  - adding particle effects like explosions, fire, or sparkles
  - using tweens for UI animations and non-sprite motion
  - optimizing sprite sheet packing and performance
estimatedTokens: 630
relatedFragments: [SKL-0291, SKL-0292, SKL-0294]
dependencies: []
synonyms: ["how to animate sprites", "sprite sheet animation setup", "tween animations in games", "particle effects for explosions", "frame-by-frame game animation", "how to make characters walk and run"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Sprite Animation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0296 |
| **Name** | Sprite Animation |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Game animation breaks into three techniques: **frame animation** (sprite sheets), **tweens** (property interpolation), and **particles** (mass small-sprite systems). Most 2D games use all three.

### Sprite Sheets and Frame Animation

A sprite sheet is a single image containing all animation frames in a grid. The engine displays frames sequentially to create motion.

```javascript
// Load sprite sheet (32x32 frames, 6 columns)
this.load.spritesheet('hero', 'hero.png', {
  frameWidth: 32,
  frameHeight: 32
});

// Define animations
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }),
  frameRate: 10,
  repeat: -1  // loop forever
});

this.anims.create({
  key: 'idle',
  frames: this.anims.generateFrameNumbers('hero', { start: 6, end: 9 }),
  frameRate: 6,
  repeat: -1
});

// Play animation
player.anims.play('walk', true);
```

**Frame rate guidelines:** Walk cycles work at 8-12 fps. Idle animations at 4-6 fps. Attack animations at 12-15 fps for snappy feedback.

### Texture Atlases (Better Than Grid Sheets)

For production, use a texture atlas (JSON + PNG) instead of grid-based sprite sheets. Atlases pack frames tightly, eliminating wasted transparent space. Tools like TexturePacker or free alternatives (ShoeBox, Free Texture Packer) generate atlas files.

```javascript
this.load.atlas('hero', 'hero.png', 'hero.json');
this.anims.create({
  key: 'run',
  frames: this.anims.generateFrameNames('hero', {
    prefix: 'run_', end: 7, zeroPad: 2
  }),
  frameRate: 12,
  repeat: -1
});
```

### Tweens (Property Animation)

Tweens smoothly interpolate any numeric property over time. Use them for movement, scaling, rotation, fading, and UI transitions.

```javascript
this.tweens.add({
  targets: coin,
  y: coin.y - 20,
  alpha: 0,
  duration: 500,
  ease: 'Power2',
  onComplete: () => coin.destroy()
});
```

Common easing functions: `Linear` (constant), `Power2` (ease-out for natural motion), `Bounce` (collectible pop), `Elastic` (springy UI).

### Particle Effects

Particle emitters create visual effects by spawning many small sprites with randomized properties.

```javascript
const emitter = this.add.particles(x, y, 'spark', {
  speed: { min: 50, max: 200 },
  scale: { start: 0.5, end: 0 },
  lifespan: 600,
  quantity: 20,
  emitting: false
});

// Burst on event
emitter.explode(20);
```

Use particles for: explosions, dust trails, collectible sparkles, rain, fire, smoke. Keep particle counts under 200-300 active at once for mobile performance.

### Animation State Management

Tie animations to game state with a simple priority system:

1. **Hurt** (highest) - Always plays when taking damage
2. **Attack** - Plays during attack action
3. **Jump/Fall** - Plays when airborne
4. **Walk/Run** - Plays when moving on ground
5. **Idle** (lowest) - Default when nothing else applies

Check from highest to lowest priority each frame and switch animation only when the key changes.

## Key Takeaways

- Use texture atlases over grid sprite sheets for tighter packing and less waste
- Match frame rates to action speed: idle slow (4-6 fps), walk medium (8-12), attack fast (12-15)
- Use tweens for any smooth property change (position, scale, alpha, rotation)
- Keep active particle counts under 300 for mobile performance
- Manage animation states with a priority system to prevent flickering between animations
