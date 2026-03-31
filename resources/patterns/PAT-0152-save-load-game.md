---
id: PAT-0152
name: Save/Load Game Pattern
category: patterns
tags: [save-system, serialization, persistence, save-slots, auto-save, cloud-sync]
capabilities: [game-state-serialization, save-slot-management, auto-save-implementation, save-data-migration]
useWhen:
  - implementing a save/load system for a game
  - designing save slot management with multiple profiles
  - adding auto-save functionality at checkpoints
  - migrating save data between game versions
  - choosing between local and cloud save storage
estimatedTokens: 650
relatedFragments: [SKL-0293, SKL-0295, PAT-0154]
dependencies: []
synonyms: ["how to save game progress", "save and load system for games", "auto-save at checkpoints", "save slot management", "serialize game state", "cloud save for games"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Save/Load Game

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0152 |
| **Name** | Save/Load Game Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

A save system captures enough game state to reconstruct the player's progress. The key challenge is deciding **what** to save (not everything) and keeping saves **forward-compatible** as the game evolves.

### What to Save

Divide game state into three categories:

| Category | Save? | Examples |
|----------|-------|---------|
| **Player state** | Yes | Position, health, inventory, stats, quest progress |
| **World state** | Selective | Opened chests, defeated bosses, toggled switches |
| **Derived state** | No | Calculated stats, UI state, particle positions |

Only save source-of-truth data. Anything that can be recalculated from saved data on load should be recalculated.

### Serialization Strategy

Use a single serializable object that collects data from all saveable systems:

```python
# Godot-style save pattern
func create_save_data() -> Dictionary:
    return {
        "version": 3,
        "timestamp": Time.get_unix_time_from_system(),
        "player": {
            "position": {"x": player.position.x, "y": player.position.y},
            "health": player.health,
            "inventory": player.inventory.serialize()
        },
        "world": {
            "opened_chests": world.get_opened_chest_ids(),
            "defeated_bosses": world.get_defeated_boss_ids(),
            "current_level": level_manager.current_level_id
        },
        "settings": {
            "difficulty": game.difficulty
        }
    }
```

### Save Slot Management

Provide 3-5 manual save slots plus one auto-save slot. Each slot stores:

- Save data (the game state)
- Metadata (timestamp, play time, level name, thumbnail)
- Version number (for migration)

Display metadata in the load screen so players can identify saves without loading them.

### Auto-Save

Trigger auto-save at natural boundaries:

- **Checkpoint reached** - Entering a new area or safe zone
- **Major event** - Boss defeated, quest completed, item acquired
- **Time interval** - Every 5-10 minutes as a fallback

Always auto-save to a dedicated slot, never overwriting manual saves. Show a brief non-blocking indicator (spinning icon in corner) during auto-save.

### Version Migration

Games change between updates. Include a version number in every save file and write migration functions:

```python
func migrate_save(data: Dictionary) -> Dictionary:
    if data["version"] < 2:
        # v1 -> v2: inventory changed from array to dictionary
        data["player"]["inventory"] = convert_inventory(data["player"]["inventory"])
        data["version"] = 2
    if data["version"] < 3:
        # v2 -> v3: added difficulty setting
        data["settings"] = {"difficulty": "normal"}
        data["version"] = 3
    return data
```

Run migrations sequentially on load. Never modify old save formats retroactively.

### Storage Options

| Storage | Platform | Pros | Cons |
|---------|----------|------|------|
| **localStorage** | Web | Simple, synchronous | 5-10MB limit, per-origin |
| **IndexedDB** | Web | Large storage, async | More complex API |
| **File system** | Desktop | Unlimited, user-accessible | Platform-specific paths |
| **Cloud** | Cross-platform | Sync across devices | Requires backend, conflict resolution |

For cloud sync, use a "last write wins" strategy with conflict detection. Show the player both versions and let them choose when timestamps conflict.

## Key Takeaways

- Save only source-of-truth data; recalculate derived state on load
- Include a version number in every save and write sequential migration functions
- Auto-save at checkpoints and major events to a dedicated slot, never overwriting manual saves
- Store metadata (timestamp, level, playtime) alongside save data for the load screen
- For cloud saves, detect conflicts and let the player choose which version to keep
