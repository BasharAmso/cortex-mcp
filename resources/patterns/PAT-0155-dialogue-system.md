---
id: PAT-0155
name: Dialogue System Pattern
category: patterns
tags: [game-dev, dialogue, branching-narrative, localization, conditions, conversation]
capabilities: [dialogue-tree-design, branching-logic, condition-evaluation, localization-support]
useWhen:
  - building a conversation system for NPCs
  - implementing branching dialogue with player choices
  - adding conditional dialogue based on game state
  - supporting localization in a dialogue system
  - designing a data format for dialogue content
estimatedTokens: 700
relatedFragments: [SKL-0298, SKL-0142, PAT-0066, PAT-0156]
dependencies: []
synonyms: ["how to build a dialogue system for my game", "branching dialogue implementation", "NPC conversation system", "dialogue tree data format", "how to localize game dialogue", "conditional dialogue based on player choices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Dialogue System Pattern

A dialogue system manages conversations between the player and NPCs, handling text display, player choices, branching paths, conditions, and localization. The pattern separates dialogue data from rendering, making content authorable by non-programmers.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Dialogue Data   │────>│  Dialogue Engine  │────>│   UI Renderer   │
│  (JSON/Resource) │     │  (State Machine)  │     │  (Text + Choices)│
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
         │                ┌──────┴──────┐
         │                │  Condition   │
         │                │  Evaluator   │
         │                └─────────────┘
         │                       │
         └───────────────>┌──────┴──────┐
                          │  Game State  │
                          │  (Variables) │
                          └─────────────┘
```

## Dialogue Data Format

Store dialogue as data, not code. A node-based structure works for most games:

```json
{
  "dialogue_id": "blacksmith_greeting",
  "nodes": {
    "start": {
      "speaker": "Greta",
      "text": "dialog.blacksmith.greeting",
      "conditions": [
        { "variable": "quest_sword_complete", "op": "eq", "value": false }
      ],
      "choices": [
        { "text": "dialog.blacksmith.ask_sword", "next": "sword_quest" },
        { "text": "dialog.blacksmith.browse_shop", "next": "open_shop" },
        { "text": "dialog.common.goodbye", "next": "end" }
      ]
    },
    "sword_quest": {
      "speaker": "Greta",
      "text": "dialog.blacksmith.sword_quest_intro",
      "effects": [{ "action": "set_variable", "variable": "quest_sword_active", "value": true }],
      "next": "end"
    }
  }
}
```

### Key Design Decisions

| Decision | Recommendation | Reason |
|----------|---------------|--------|
| Data format | JSON or custom resource | Authoring tools can read/write; no recompile needed |
| Text storage | Localization keys, not raw strings | Enables translation without touching dialogue logic |
| Conditions | Variable-based expressions | Game state drives branching without code changes |
| Effects | Declarative actions (set_variable, give_item) | Content authors can trigger game events safely |
| Node linking | String IDs, not array indices | Reordering nodes does not break connections |

## Branching and Conditions

Conditions gate which nodes and choices appear. Evaluate conditions against a game state dictionary:

- **Variable conditions**: `quest_complete == true`, `player_gold >= 100`
- **Relationship conditions**: `npc_affinity("Greta") > 50`
- **Inventory conditions**: `has_item("broken_sword")`
- **Time/event conditions**: `day_count > 3`, `event_occurred("dragon_attack")`

Choices with unmet conditions are hidden entirely (not grayed out) to avoid cluttering the interface.

## Localization Strategy

1. **All player-visible text stored as keys**, never inline strings. `"dialog.blacksmith.greeting"` maps to localized string files.
2. **One string file per language**: `locale/en.json`, `locale/es.json`, `locale/ja.json`.
3. **Variable interpolation**: `"You need {count} more {item_name}."` with runtime substitution.
4. **Speaker names are localized too.** Some games translate character names.
5. **Test with long strings.** German and French text can be 30-40% longer than English. UI must accommodate.

## Typewriter Effect and Pacing

Display text character-by-character with a configurable speed (default: 30 characters/second). Allow the player to press a button to reveal the full line instantly. Add brief pauses after punctuation (200ms after periods, 100ms after commas) for natural reading rhythm.

## Common Mistakes

- **Hardcoding dialogue in scripts**: makes it impossible for writers to edit without programmer help
- **No skip/fast-forward**: players replaying content or re-reading after a death need to skip quickly
- **Ignoring text overflow**: localized strings that are longer than English break UI layouts
- **No save/load support**: if the player saves mid-conversation, the system must restore the exact node on load

## Key Takeaways

- Store dialogue as external data (JSON/resource), not in code
- Use localization keys for all visible text from the start
- Gate choices with declarative conditions evaluated against game state
- Support typewriter display with skip functionality and punctuation pauses
- Test with the longest localized strings to prevent UI overflow
