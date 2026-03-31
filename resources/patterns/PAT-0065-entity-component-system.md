---
id: PAT-0065
name: Entity Component System (ECS)
category: patterns
tags: [game-dev, ecs, entity, component, system, composition, game-architecture, data-oriented]
capabilities: [entity-management, composition-architecture, system-behavior-separation, performance-optimization]
useWhen:
  - building a game with many different entity types
  - avoiding deep inheritance hierarchies for game objects
  - optimizing for performance with many active entities
  - designing a data-driven game architecture
  - learning entity component systems for the first time
estimatedTokens: 600
relatedFragments: [SKL-0142, PAT-0064, PAT-0066, SKL-0143]
dependencies: []
synonyms: ["what is an entity component system", "composition over inheritance in games", "how to avoid deep class hierarchies in games", "ECS architecture for beginners", "data oriented game design", "how game engines organize entities"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/munificent/game-programming-patterns"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Entity Component System (ECS)

ECS replaces deep inheritance trees with composition. Entities are just IDs. Components hold data. Systems provide behavior. This separation makes it easy to create diverse game objects without combinatorial class explosions.

## The Three Parts

```
Entity:    Just an ID (number or UUID). No data, no behavior.
Component: Pure data attached to an entity. No logic.
System:    Logic that operates on entities with specific components.
```

### Example

```
Entity #42
  ├── Position { x: 100, y: 200 }
  ├── Velocity { dx: 5, dy: 0 }
  ├── Sprite { texture: "goblin", frame: 3 }
  └── Health { current: 80, max: 100 }

Entity #43
  ├── Position { x: 400, y: 200 }
  ├── Sprite { texture: "tree", frame: 0 }
  └── (no Velocity, no Health — it's a static prop)
```

Both entities share Position and Sprite, but only #42 moves and takes damage. No class hierarchy needed.

## How Systems Work

Each system queries for entities that have a specific set of components and processes them:

```
MovementSystem:
  query: entities with [Position, Velocity]
  each frame: position.x += velocity.dx * dt
              position.y += velocity.dy * dt

RenderSystem:
  query: entities with [Position, Sprite]
  each frame: draw sprite.texture at position.x, position.y

DamageSystem:
  query: entities with [Health]
  on event: health.current -= damage.amount
            if health.current <= 0: mark entity for destruction
```

Systems run in a defined order each frame: Input, Physics/Movement, Collision, Damage, Render.

## Why ECS Beats Inheritance

| Problem | Inheritance Approach | ECS Approach |
|---------|---------------------|-------------|
| Flying enemy that shoots | `FlyingShootingEnemy extends FlyingEnemy`? Or `ShootingEnemy`? | Entity + Velocity + Position + Shooter + AI |
| Static decoration | `StaticObject extends GameObject` | Entity + Position + Sprite |
| Invisible trigger zone | `TriggerZone extends ???` | Entity + Position + Collider + TriggerScript |
| New combo of behaviors | Create yet another subclass | Attach the right components |

With inheritance, every new combination risks a new class. With ECS, you combine existing components freely.

## Data Locality Bonus

When components of the same type are stored in contiguous arrays, systems iterate through cache-friendly memory:

```
// All Position components packed together
positions: [Pos, Pos, Pos, Pos, Pos, ...]

// MovementSystem iterates linearly through positions and velocities
// CPU cache loves this — no pointer chasing
```

This is why ECS is popular in performance-critical games with thousands of entities.

## When to Use ECS

| Scenario | Recommendation |
|----------|---------------|
| Small game (<50 entity types) | Simple objects or Component pattern may suffice |
| Many entity types with shared traits | ECS shines |
| Performance-critical (thousands of entities) | Full ECS with data-oriented storage |
| Rapid prototyping | Lightweight ECS or just composition |

## ECS in Popular Engines

- **Unity DOTS** uses a full ECS for high-performance scenarios
- **Godot** uses a node/component model (not pure ECS, but composition-based)
- **Phaser** uses game objects with optional components (lightweight composition)
- **Bevy** (Rust) is built entirely around ECS from the ground up

## Anti-Patterns

- Putting logic in components (components are data only)
- Giant "God components" that hold too much data (split into focused components)
- Systems that reach into other systems' data (communicate through components or events)
- Using ECS for a game with 5 entity types (over-engineering)
- Forgetting system execution order (physics must run before collision detection)
