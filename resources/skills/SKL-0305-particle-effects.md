---
id: SKL-0305
name: Particle Effects
category: skills
tags: [game-dev, particles, emitters, visual-effects, polish, performance-optimization]
capabilities: [particle-emitter-setup, effect-presets, performance-tuning, visual-polish, particle-pooling]
useWhen:
  - adding visual effects like explosions, fire, smoke, or sparkles
  - polishing a game with juice and feedback effects
  - optimizing particle systems that cause frame drops
  - creating weather effects like rain or snow
  - building trail effects for projectiles or movement
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0304, SKL-0142, PAT-0064]
dependencies: []
synonyms: ["how to add particle effects to my game", "explosion effect in Phaser", "fire and smoke particles", "how to optimize particles for performance", "adding juice and polish to gameplay", "weather effects with particles"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: Particle Effects

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0305 |
| **Name** | Particle Effects |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Particle systems create visual effects by spawning many small, short-lived sprites that move according to configurable rules. They are the primary tool for "game juice": the visual feedback that makes actions feel impactful.

### Emitter Architecture

```
Particle Manager
├── Emitter: "explosion"
│   ├── Texture (small circle or spark sprite)
│   ├── Lifespan: 300ms
│   ├── Speed: 100-300
│   ├── Scale: 1.0 → 0.0 (shrink over lifetime)
│   ├── Alpha: 1.0 → 0.0 (fade out)
│   └── Quantity: 20 (burst)
├── Emitter: "fire"
│   ├── Texture (orange/yellow gradient)
│   ├── Lifespan: 500ms
│   ├── Speed: 50-100 (upward)
│   ├── Scale: 0.5 → 0.0
│   └── Frequency: 50ms (continuous)
└── Emitter: "trail"
    ├── Follow: projectile sprite
    ├── Lifespan: 200ms
    └── Quantity: 1 per frame
```

### Common Effect Presets

| Effect | Key Settings |
|--------|-------------|
| **Explosion** | Burst of 15-30 particles, radial speed 100-400, lifespan 200-400ms, scale down to 0, tint orange-to-red |
| **Fire** | Continuous upward flow, slight horizontal drift, lifespan 400-600ms, tint gradient yellow-orange-red |
| **Smoke** | Slow upward drift, lifespan 800-1200ms, low alpha (0.3-0.5), scale up over time, gray tint |
| **Sparkle** | Random positions in area, short lifespan 100-200ms, twinkle via alpha oscillation, white/gold tint |
| **Rain** | Top-of-screen emitter, downward + slight angle, high quantity, thin streak texture |
| **Trail** | Follow a moving object, 1-2 particles per frame, short lifespan, no gravity |

### Phaser Particle Example

```javascript
// Explosion burst on enemy death
const emitter = this.add.particles(x, y, 'spark', {
  speed: { min: 100, max: 300 },
  scale: { start: 0.6, end: 0 },
  alpha: { start: 1, end: 0 },
  lifespan: 300,
  quantity: 20,
  emitting: false
});
emitter.explode(); // single burst
```

```javascript
// Continuous fire effect
const fire = this.add.particles(torchX, torchY, 'flame', {
  speed: { min: 50, max: 100 },
  angle: { min: -110, max: -70 },
  scale: { start: 0.5, end: 0 },
  alpha: { start: 0.8, end: 0 },
  lifespan: 500,
  frequency: 50,
  tint: [0xffff00, 0xff8800, 0xff0000]
});
```

### Performance Optimization

1. **Set maxParticles.** Cap emitters to prevent runaway particle counts. 50-200 per emitter is usually sufficient.
2. **Use small textures.** A 4x4 or 8x8 pixel sprite is enough for most particles. Large textures waste GPU fill rate.
3. **Pool emitters.** Reuse emitter instances instead of creating new ones for repeated effects (gunshots, footsteps).
4. **Limit active emitters.** Track how many are running simultaneously. Disable off-screen emitters.
5. **Reduce lifespan.** Shorter lifespans mean fewer active particles at any moment.
6. **Disable blending when possible.** Additive blending looks great but doubles GPU cost per particle.

### The "Juice" Checklist

Apply particles as feedback for player actions:

- Player lands after a jump: small dust burst at feet
- Enemy hit: small spark or blood particles at impact point
- Collectible picked up: sparkle burst outward
- Projectile: trailing particles behind the bullet/arrow
- Environmental: ambient floating dust, fireflies, rain

## Anti-Patterns

- Creating new emitter instances every frame (use pools or burst mode)
- Unlimited maxParticles (causes frame drops on weaker devices)
- Over-juicing: too many simultaneous effects create visual noise
- Large particle textures (wasteful; tiny sprites with scale work better)

## Key Takeaways

- Particles are the primary tool for making game actions feel impactful
- Configure lifespan, speed, scale, and alpha curves to define each effect
- Cap maxParticles and pool emitters to maintain 60fps
- Use burst mode for one-shot effects and frequency for continuous effects
- Apply the juice checklist: land, hit, collect, shoot, and ambient
