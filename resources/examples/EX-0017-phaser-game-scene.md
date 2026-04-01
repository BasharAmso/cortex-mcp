---
id: EX-0017
name: Phaser Game Scene Setup
category: examples
tags: [phaser, game, scene, sprite, physics, 2d, javascript, typescript, web-game]
capabilities: [game-scene-creation, sprite-loading, physics-setup, game-loop]
useWhen:
  - setting up a Phaser 3 game scene from scratch
  - creating a 2D browser game with physics
  - loading sprites and handling player input in Phaser
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0291, PAT-0159, PAT-0064, EX-0018]
dependencies: []
synonyms: ["phaser game setup", "how to start a phaser game", "2d browser game example", "phaser scene with physics", "web game boilerplate"]
sourceUrl: "https://github.com/phaserjs/examples"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "game-dev"
---

# Phaser Game Scene Setup

A complete Phaser 3 scene with sprite loading, arcade physics, and keyboard input.

## Implementation

```typescript
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create(): void {
    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Player with physics
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Collisions
    this.physics.add.collider(this.player, this.platforms);

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // UI
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#fff',
    });
  }

  update(): void {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle');
    }

    if (this.cursors.up.isDown && this.player.body!.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

// Game config
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 300 }, debug: false },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
```

## Key Patterns

- **Scene lifecycle**: `preload()` loads assets, `create()` sets up the world, `update()` runs every frame
- **Arcade physics**: lightweight 2D physics with gravity, collision, and bounce
- **Sprite animations**: frame-based animation from spritesheets
- **Input handling**: Phaser's built-in cursor keys mapped to velocity changes
