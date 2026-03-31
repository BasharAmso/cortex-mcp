---
id: SKL-0291
name: 2D Game Physics
category: skills
tags: [physics, collision-detection, gravity, velocity, rigid-body, game-engine]
capabilities: [physics-body-setup, collision-handling, gravity-configuration, velocity-management]
useWhen:
  - adding physics-based movement to a 2D game
  - implementing collision detection between sprites or tiles
  - choosing between arcade and matter.js physics engines
  - configuring gravity, bounce, and friction for game objects
  - building platformer or top-down physics interactions
estimatedTokens: 650
relatedFragments: [SKL-0296, SKL-0293, PAT-0154]
dependencies: []
synonyms: ["how do I add physics to my game", "collision detection in 2D games", "gravity and jumping in platformers", "arcade physics vs matter physics", "how to make objects bounce and collide", "rigid body physics for 2D"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: 2D Game Physics

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0291 |
| **Name** | 2D Game Physics |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Most 2D game frameworks offer tiered physics systems. Phaser, for example, provides Arcade Physics (lightweight, AABB-only) and Matter.js (full rigid-body with polygons, constraints, and compound bodies). Pick the lightest system that meets your needs.

### Arcade Physics (Simple and Fast)

Arcade physics uses axis-aligned bounding boxes (AABBs). Objects are rectangles or circles with velocity, acceleration, gravity, bounce, and drag properties. Collision checks are broadphase grid-based, making it performant for hundreds of bodies.

```javascript
// Enable arcade physics on a sprite
this.physics.add.existing(player);
player.body.setGravityY(300);
player.body.setCollideWorldBounds(true);

// Collide player with ground layer
this.physics.add.collider(player, groundLayer);

// Overlap detection (no physical response)
this.physics.add.overlap(player, coins, collectCoin);
```

Key arcade properties: `velocity`, `acceleration`, `drag`, `bounce`, `gravity`, `maxVelocity`, `immovable`. Set `immovable: true` on platforms so the player does not push them.

### Matter.js Physics (Complex Interactions)

Use Matter when you need polygon collisions, joints, constraints, sensors, or realistic stacking. Matter bodies have friction, restitution, density, and angle. Performance cost is higher, so reserve it for games that need it (physics puzzles, ragdolls).

```javascript
// Matter body with custom shape
const crate = this.matter.add.image(400, 200, 'crate');
crate.setBody({ type: 'rectangle', width: 64, height: 64 });
crate.setFriction(0.5);
crate.setBounce(0.3);
```

### Collision Layers and Groups

Organize bodies into collision categories to control what collides with what. This prevents unnecessary checks and lets certain objects pass through each other (e.g., player bullets ignore friendly NPCs).

### Common Pitfalls

- **Tunneling:** Fast-moving objects pass through thin walls. Fix by increasing physics steps per frame or using continuous collision detection.
- **Jitter on slopes:** Arcade AABB on diagonal tiles causes vibration. Use tile collision callbacks or switch to Matter for sloped terrain.
- **Frame-rate dependence:** Always multiply velocity changes by delta time or use the engine's built-in fixed-step update.

## Key Takeaways

- Start with Arcade physics; upgrade to Matter only when you need polygons or constraints
- Use collision categories and groups to optimize broadphase and control interaction rules
- Multiply velocity by delta time to keep physics frame-rate independent
- Set `immovable: true` on static platforms to prevent player-push artifacts
- Watch for tunneling with fast projectiles and use substeps or raycasting to fix it
