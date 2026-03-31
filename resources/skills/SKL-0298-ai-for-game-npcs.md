---
id: SKL-0298
name: AI for Game NPCs
category: skills
tags: [game-dev, ai, pathfinding, behavior-trees, finite-state-machines, npc]
capabilities: [npc-behavior-design, pathfinding-implementation, behavior-tree-architecture, decision-making-systems]
useWhen:
  - building NPC behavior that feels intelligent and responsive
  - choosing between behavior trees and finite state machines
  - implementing pathfinding for enemies or companions
  - creating enemy AI with patrol, chase, and attack behaviors
  - designing boss fight AI with multiple phases
estimatedTokens: 700
relatedFragments: [PAT-0066, SKL-0142, PAT-0064]
dependencies: []
synonyms: ["how to make enemy AI in games", "behavior trees vs state machines for NPCs", "how does pathfinding work in games", "how to make NPCs feel smart", "game AI decision making", "A star pathfinding tutorial"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: AI for Game NPCs

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0298 |
| **Name** | AI for Game NPCs |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Game AI does not need to be smart. It needs to *feel* smart. The goal is believable behavior, not optimal play. An enemy that occasionally misses or hesitates feels more alive than one that always finds the perfect path.

### Decision Architecture: FSM vs Behavior Tree

**Finite State Machines (FSMs)** are the simplest approach. Each NPC has a current state (Idle, Patrol, Chase, Attack) and transitions between them based on conditions. FSMs work well for simple NPCs but become unwieldy beyond 5-6 states because every state needs explicit transitions to every other reachable state.

**Behavior Trees (BTs)** scale better. They evaluate a tree of nodes each tick, flowing through Selectors (try children until one succeeds), Sequences (run children in order, stop on failure), and leaf Action/Condition nodes. BTs are modular: you can add a "flee when low health" branch without rewiring every existing behavior.

| Approach | Best For | Limitation |
|----------|----------|------------|
| FSM | Simple NPCs (< 5 states) | Transition explosion with complexity |
| Behavior Tree | Complex NPCs, reusable behaviors | Harder to debug, tree traversal overhead |
| Utility AI | Many competing goals (Sims-style) | Tuning weights is trial-and-error |
| GOAP | NPCs that plan multi-step actions | High CPU cost, harder to implement |

### Pathfinding

**A* (A-star)** is the standard pathfinding algorithm. It finds the shortest path on a graph by evaluating nodes with `f(n) = g(n) + h(n)` where `g` is cost so far and `h` is estimated cost to goal. Most engines (Godot's NavigationServer, Unity's NavMesh) provide built-in A* implementations.

**Navigation Meshes** replace grid-based pathfinding for 3D or complex 2D environments. Instead of a grid, the walkable area is a mesh of convex polygons. Agents find paths between polygons, then steer within them. This handles variable-width corridors and obstacles naturally.

**Steering behaviors** handle local movement: arrive (decelerate near target), flee, pursue (intercept moving target), avoid obstacles, and flock (separation + alignment + cohesion for groups). Layer steering on top of A* for natural-looking movement.

### Practical NPC Pattern

```
Behavior Tree (strategic decisions)
  └─ Selector: "What should I do?"
       ├─ Sequence: "Flee" [health < 20%] → run to cover
       ├─ Sequence: "Attack" [enemy in range] → face target → shoot
       ├─ Sequence: "Chase" [enemy detected] → A* path → follow
       └─ Action: "Patrol" → follow waypoints
```

### Performance Tips

- **Stagger AI updates.** Not every NPC needs to think every frame. Spread decision-making across frames (NPC 1 thinks on frame 0, NPC 2 on frame 1, etc.).
- **Use perception ranges.** Only activate full AI when the player is nearby. Distant NPCs can run simplified behavior or freeze entirely.
- **Cache paths.** Recalculate A* paths only when the destination changes or an obstacle appears, not every frame.

## Key Takeaways

- Game AI prioritizes believable behavior over optimal decision-making
- Use FSMs for simple NPCs (< 5 states), behavior trees for complex ones
- A* with navigation meshes handles most pathfinding needs; engines provide built-in support
- Stagger AI updates across frames to avoid per-frame CPU spikes
- Layer steering behaviors on top of pathfinding for natural movement
