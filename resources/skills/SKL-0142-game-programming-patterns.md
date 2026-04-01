---
id: SKL-0142
name: Game Programming Patterns
category: skills
tags: [game-dev, design-patterns, command, flyweight, observer, state, game-loop, component, object-pool, optimization]
capabilities: [pattern-selection, game-architecture, performance-optimization, behavior-modeling, decoupling-techniques]
useWhen:
  - choosing a design pattern for a game system
  - decoupling game systems like input, physics, and rendering
  - optimizing memory or CPU in a game with many objects
  - structuring game entity behavior and state
  - learning which classic patterns apply to game development
estimatedTokens: 750
relatedFragments: [PAT-0064, PAT-0065, PAT-0066, SKL-0143, EX-0018, EX-0049]
dependencies: []
synonyms: ["game design patterns overview", "which pattern should I use for my game", "how to structure game code", "game architecture best practices", "common patterns in game development", "how do game engines organize code"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/munificent/game-programming-patterns"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Programming Patterns

## Purpose

Guide pattern selection for common game development problems. These 20 patterns from Robert Nystrom's *Game Programming Patterns* address the unique constraints of games: real-time performance, complex state, many interacting objects, and tight update loops.

## Pattern Catalog

### Design Patterns Revisited

| Pattern | Problem It Solves | Game Example |
|---------|-------------------|-------------|
| **Command** | Decouple input from action | Rebindable keys, undo/redo, replay systems |
| **Flyweight** | Too many objects waste memory | Shared tile/terrain data across a large map |
| **Observer** | Systems need to react without tight coupling | Achievement system listening to game events |
| **Prototype** | Spawning many similar objects | Monster spawner cloning a template entity |
| **Singleton** | Global access to a single instance | Use sparingly; prefer Service Locator instead |
| **State** | Complex conditional behavior | Character states: idle, running, jumping, attacking |

### Sequencing Patterns

| Pattern | Problem It Solves | Game Example |
|---------|-------------------|-------------|
| **Double Buffer** | Readers see incomplete writes | Frame rendering, screen tearing prevention |
| **Game Loop** | Game must run independent of hardware speed | Fixed update + variable render cycle |
| **Update Method** | Many objects need per-frame behavior | Each entity's `update(dt)` called every frame |

### Behavioral Patterns

| Pattern | Problem It Solves | Game Example |
|---------|-------------------|-------------|
| **Bytecode** | Designers need to script behavior without recompiling | Spell effects, AI behavior scripts |
| **Subclass Sandbox** | Many similar subclasses sharing base behavior | Different power-ups sharing a base class |
| **Type Object** | Too many subclasses for entity types | Data-driven monster types loaded from JSON |

### Decoupling Patterns

| Pattern | Problem It Solves | Game Example |
|---------|-------------------|-------------|
| **Component** | Monolithic entity classes touching every system | Entity = Physics + Render + AI components |
| **Event Queue** | Decouple event sender from handler timing | Sound system queuing audio play requests |
| **Service Locator** | Access a service without hardcoding the provider | Swap real audio for null audio in tests |

### Optimization Patterns

| Pattern | Problem It Solves | Game Example |
|---------|-------------------|-------------|
| **Data Locality** | Cache misses from scattered memory layout | Contiguous arrays for hot component data |
| **Dirty Flag** | Recomputing expensive derived data unnecessarily | Recalculate world transform only when moved |
| **Object Pool** | Frequent allocation/deallocation causes GC spikes | Bullet pool, particle pool |
| **Spatial Partition** | Finding nearby objects in a large world | Quadtree for collision detection |

## Pattern Selection Guide

| Situation | Start With |
|-----------|-----------|
| Player input feels rigid | Command |
| Character has complex behavior modes | State |
| Too many objects, running out of memory | Flyweight, Object Pool |
| Systems are tangled together | Component, Observer, Event Queue |
| Frame rate drops with many entities | Data Locality, Spatial Partition |
| Game speed varies across machines | Game Loop (fixed timestep) |
| Need runtime-configurable entity types | Type Object, Prototype |

## Key Insight

Games combine real-time constraints with complex state in ways most apps do not. The patterns above are not game-specific inventions; they are classic software patterns applied to the unique demands of interactive simulations running at 60 frames per second.

## Anti-Patterns

- Overusing Singleton for convenience (creates hidden coupling)
- Deep inheritance hierarchies for game entities (use Component instead)
- Allocating memory every frame (use Object Pool)
- Checking every entity against every other entity (use Spatial Partition)
- Hardcoding behavior that designers should be able to tune (use Type Object or Bytecode)
