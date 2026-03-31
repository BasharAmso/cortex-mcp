---
id: SKL-0303
name: Tile Map Design
category: skills
tags: [game-dev, tilemaps, tiled-editor, collision-layers, auto-tiling, level-design]
capabilities: [tilemap-creation, collision-setup, layer-management, auto-tiling-rules, map-editor-workflow]
useWhen:
  - building levels for a 2D game using tile-based maps
  - setting up collision layers for platforms or walls
  - using the Tiled map editor with Phaser or another engine
  - choosing between orthogonal, isometric, or hexagonal tile layouts
  - optimizing large maps with multiple layers
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0142, PAT-0064, PAT-0159]
dependencies: []
synonyms: ["how to create a tilemap for my game", "how to use Tiled with Phaser", "setting up collision on tiles", "what is auto-tiling", "how to design levels with tiles", "tilemap layers explained"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Tile Map Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0303 |
| **Name** | Tile Map Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Tilemaps let you build large game worlds from small, reusable tile images arranged on a grid. Instead of drawing one massive background, you paint levels from a tileset (a sprite sheet of square tiles) and the engine renders only what the camera sees.

### Tilemap Architecture

```
Tilemap
├── Tileset (the image containing all tile graphics)
├── Ground Layer (terrain, floors, paths)
├── Collision Layer (walls, platforms, obstacles)
├── Decoration Layer (trees, furniture, non-interactive)
└── Object Layer (spawn points, triggers, NPCs)
```

### Map Orientations

| Orientation | Layout | Best For |
|-------------|--------|----------|
| **Orthogonal** | Square grid | Platformers, top-down RPGs, puzzle games |
| **Isometric** | Diamond grid | Strategy games, city builders, tactical RPGs |
| **Hexagonal** | Hex grid | Turn-based strategy, board games |
| **Staggered** | Offset rows | Alternative isometric style |

### Tiled Editor Workflow

The free **Tiled** map editor is the standard tool for designing tilemaps. The workflow: create a tileset from your sprite sheet, paint layers, set custom properties (like `collides: true`), and export as JSON.

```javascript
// Loading a Tiled JSON map in Phaser
const map = this.make.tilemap({ key: 'level1' });
const tileset = map.addTilesetImage('terrain', 'terrainImage');
const ground = map.createLayer('Ground', tileset);
const walls = map.createLayer('Walls', tileset);
walls.setCollisionByProperty({ collides: true });
this.physics.add.collider(player, walls);
```

### Auto-Tiling

Auto-tiling automatically selects the correct tile variant based on neighboring tiles. A 47-tile bitmask tileset covers all edge and corner combinations for seamless terrain. Most engines and Tiled support auto-tile rules: define which tile connects to which neighbors, and the editor fills in transitions automatically.

### Collision Layers

Separate visual layers from collision layers. Mark collision tiles with a custom property in Tiled, then use `setCollisionByProperty()` or `setCollisionByExclusion()` in code. This keeps collision logic independent of visual changes.

### Performance Tips

1. **Use tile layers, not individual sprites** for static terrain. Tile layers render as a single draw call per layer.
2. **Limit visible layers** to 3-5. Each layer adds a draw call.
3. **Cull off-screen tiles** automatically by enabling camera culling (Phaser does this by default).
4. **Use Object layers** for spawn points and triggers rather than invisible tile markers.

## Anti-Patterns

- Using individual sprites for every tile (kills performance on large maps)
- Mixing collision and decoration on the same layer (hard to maintain)
- Hardcoding tile indices instead of using named properties
- Creating one enormous layer instead of splitting ground, walls, and decoration

## Key Takeaways

- Tilemaps turn small reusable tiles into large worlds efficiently
- Separate visual layers from collision layers for maintainability
- Use the Tiled editor and export JSON for engine-agnostic level design
- Auto-tiling with bitmask tilesets eliminates manual edge-matching
- Keep layers minimal (3-5) to preserve rendering performance
