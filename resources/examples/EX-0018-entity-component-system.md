---
id: EX-0018
name: Game Entity Component System
category: examples
tags: [ecs, entity, component, system, game, architecture, composition, typescript]
capabilities: [entity-management, component-composition, game-architecture]
useWhen:
  - building a game with many entity types that share behaviors
  - implementing composition over inheritance for game objects
  - structuring a game engine with ECS architecture
estimatedTokens: 600
relatedFragments: [PAT-0065, SKL-0142, PAT-0064, EX-0017]
dependencies: []
synonyms: ["ecs pattern", "entity component system example", "game ecs implementation", "composition over inheritance game", "game object architecture"]
sourceUrl: "https://github.com/SanderMertens/ecs-faq"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "game-dev"
---

# Game Entity Component System

A minimal ECS implementation with typed components and system iteration.

## Implementation

```typescript
// --- Components (pure data) ---
type Entity = number;

interface Position { x: number; y: number }
interface Velocity { dx: number; dy: number }
interface Health { current: number; max: number }
interface Sprite { texture: string; width: number; height: number }

// --- World (entity + component storage) ---
class World {
  private nextId = 0;
  private components = new Map<string, Map<Entity, unknown>>();

  createEntity(): Entity {
    return this.nextId++;
  }

  addComponent<T>(entity: Entity, name: string, data: T): void {
    if (!this.components.has(name)) {
      this.components.set(name, new Map());
    }
    this.components.get(name)!.set(entity, data);
  }

  getComponent<T>(entity: Entity, name: string): T | undefined {
    return this.components.get(name)?.get(entity) as T | undefined;
  }

  removeComponent(entity: Entity, name: string): void {
    this.components.get(name)?.delete(entity);
  }

  // Query entities that have ALL specified components
  query(...componentNames: string[]): Entity[] {
    const sets = componentNames.map(n => this.components.get(n));
    if (sets.some(s => !s)) return [];

    const smallest = sets.reduce((a, b) => (a!.size < b!.size ? a : b))!;
    return [...smallest.keys()].filter(entity =>
      sets.every(s => s!.has(entity))
    );
  }

  destroyEntity(entity: Entity): void {
    for (const store of this.components.values()) {
      store.delete(entity);
    }
  }
}

// --- Systems (behavior) ---
function movementSystem(world: World, dt: number): void {
  for (const entity of world.query('position', 'velocity')) {
    const pos = world.getComponent<Position>(entity, 'position')!;
    const vel = world.getComponent<Velocity>(entity, 'velocity')!;
    pos.x += vel.dx * dt;
    pos.y += vel.dy * dt;
  }
}

function damageSystem(world: World, entity: Entity, amount: number): void {
  const health = world.getComponent<Health>(entity, 'health');
  if (!health) return;
  health.current = Math.max(0, health.current - amount);
  if (health.current <= 0) {
    world.destroyEntity(entity);
  }
}

// --- Usage ---
const world = new World();

const player = world.createEntity();
world.addComponent<Position>(player, 'position', { x: 100, y: 200 });
world.addComponent<Velocity>(player, 'velocity', { dx: 0, dy: 0 });
world.addComponent<Health>(player, 'health', { current: 100, max: 100 });
world.addComponent<Sprite>(player, 'sprite', { texture: 'hero.png', width: 32, height: 48 });

const enemy = world.createEntity();
world.addComponent<Position>(enemy, 'position', { x: 400, y: 200 });
world.addComponent<Velocity>(enemy, 'velocity', { dx: -50, dy: 0 });
world.addComponent<Health>(enemy, 'health', { current: 30, max: 30 });

// Game loop calls systems each frame
movementSystem(world, 1 / 60);
```

## Key Patterns

- **Components are plain data**: no methods, no inheritance hierarchy
- **Systems operate on component queries**: `world.query('position', 'velocity')` finds all movable entities
- **Entities are just IDs**: composition determined by which components are attached
- **Smallest-set optimization**: query starts from the rarest component for faster iteration
