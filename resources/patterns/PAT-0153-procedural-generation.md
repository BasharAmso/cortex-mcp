---
id: PAT-0153
name: Procedural Generation
category: patterns
tags: [procedural-generation, random-maps, noise-functions, roguelike, seed-based, dungeon-generation]
capabilities: [noise-based-terrain, dungeon-layout-generation, seed-reproducibility, content-variation]
useWhen:
  - generating random or semi-random game levels
  - creating roguelike dungeon layouts
  - using noise functions for terrain or world generation
  - implementing seed-based generation for reproducible worlds
  - adding variety to game content without hand-crafting every piece
estimatedTokens: 680
relatedFragments: [SKL-0293, SKL-0291, PAT-0152]
dependencies: []
synonyms: ["how to generate random levels", "procedural dungeon generation", "perlin noise for terrain", "seed-based world generation", "roguelike map generation", "random map algorithm"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: advanced
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Procedural Generation

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0153 |
| **Name** | Procedural Generation |
| **Category** | Patterns |
| **Complexity** | Advanced |

## Core Concepts

Procedural generation creates game content algorithmically rather than by hand. The goal is **controlled randomness**: enough variety to surprise the player, enough structure to remain playable. The key enabler is **seed-based determinism**, where the same seed always produces the same output.

### Noise Functions (Terrain and Organic Shapes)

Noise functions produce smooth random values across a coordinate space. They are the foundation of terrain generation, cave systems, and natural-looking variation.

| Function | Characteristics | Best For |
|----------|----------------|----------|
| **Perlin Noise** | Smooth gradients, predictable | Terrain height maps, cloud textures |
| **Simplex Noise** | Less directional artifacts, faster in higher dimensions | Same as Perlin, better at scale |
| **Cellular (Worley)** | Cell-like patterns | Cave systems, organic textures |

Layer multiple octaves of noise at different frequencies and amplitudes to create fractal detail:

```python
func generate_heightmap(width, height, seed):
    var noise = FastNoiseLite.new()
    noise.seed = seed
    noise.noise_type = FastNoiseLite.TYPE_SIMPLEX_SMOOTH

    var map = []
    for y in range(height):
        var row = []
        for x in range(width):
            # Layer octaves: base terrain + hills + detail
            var value = noise.get_noise_2d(x * 0.01, y * 0.01) * 1.0
            value += noise.get_noise_2d(x * 0.05, y * 0.05) * 0.5
            value += noise.get_noise_2d(x * 0.1, y * 0.1) * 0.25
            row.append(value)
        map.append(row)
    return map
```

### Dungeon Generation (BSP Algorithm)

Binary Space Partitioning recursively divides a rectangle into rooms:

1. Start with the full map area as one partition.
2. Split it vertically or horizontally at a random point (within constraints).
3. Recursively split each half until partitions reach minimum room size.
4. Place a room inside each leaf partition (smaller than the partition, randomly offset).
5. Connect sibling rooms with corridors by walking back up the BSP tree.

This guarantees every room is reachable and rooms do not overlap.

### Cellular Automata (Cave Generation)

For organic cave shapes:

1. Fill a grid randomly (55% wall, 45% open).
2. Run 4-5 simulation steps: a cell becomes wall if 5+ of its 8 neighbors are walls, otherwise it becomes open.
3. Flood-fill to find the largest connected region; fill smaller isolated pockets.

The result looks like natural cave systems with smooth walls and open chambers.

### Wave Function Collapse (Tile-Based)

WFC generates tile maps by propagating constraints:

1. Start with every cell in a superposition of all possible tiles.
2. Collapse the lowest-entropy cell to a single tile.
3. Propagate constraints to neighbors (only tiles whose edges match the collapsed tile remain valid).
4. Repeat until all cells are collapsed or a contradiction is found (backtrack).

WFC excels at generating maps that look hand-designed because it respects adjacency rules defined by the tile set.

### Seed-Based Determinism

Always accept a seed parameter and use seeded random number generators. Benefits:

- **Reproducibility** - Players can share seeds for the same experience.
- **Debugging** - Reproduce exact generation bugs by replaying the seed.
- **Daily challenges** - Use the date as a seed for shared daily content.

```python
var rng = RandomNumberGenerator.new()
rng.seed = hash(seed_string)
var room_width = rng.randi_range(5, 12)
```

### Validation and Playability

Generated content must be playable. After generation:

- **Connectivity check** - Flood-fill from spawn to verify all required areas are reachable.
- **Difficulty bounds** - Count enemies, resources, and path length to ensure they fall within acceptable ranges.
- **Reject and retry** - If validation fails, increment the seed and regenerate. Cap retries at 10-20.

## Key Takeaways

- Layer multiple octaves of noise for natural-looking terrain with fine detail
- Use BSP for structured dungeon rooms or cellular automata for organic caves
- Always use seeded RNG so generation is deterministic and reproducible
- Validate every generated level for connectivity and difficulty bounds before presenting it
- Wave Function Collapse produces hand-designed-looking tile maps from adjacency rules
