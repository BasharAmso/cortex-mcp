---
id: PAT-0156
name: Achievement System Pattern
category: patterns
tags: [game-dev, achievements, gamification, notifications, persistence, progression]
capabilities: [achievement-tracking, unlock-condition-evaluation, notification-display, progress-persistence]
useWhen:
  - adding achievements or trophies to a game
  - designing unlock conditions for player milestones
  - implementing achievement notification popups
  - persisting achievement progress across sessions
  - integrating with platform achievement systems (Steam, Xbox, PlayStation)
estimatedTokens: 650
relatedFragments: [SKL-0297, SKL-0142, PAT-0155, SKL-0302]
dependencies: []
synonyms: ["how to add achievements to my game", "achievement system architecture", "how do game trophies work", "tracking player milestones", "achievement notification popup", "saving achievement progress"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Achievement System Pattern

An achievement system tracks player milestones, rewards exploration and mastery, and increases retention by giving players secondary goals. The pattern uses an event-driven architecture where game events are evaluated against achievement conditions.

## Architecture

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
│  Game Events  │────>│  Achievement Mgr  │────>│  Notification UI │
│  (Observer)   │     │  (Evaluate + Track)│    │  (Toast Popup)   │
└──────────────┘     └───────────────────┘     └──────────────────┘
                              │
                       ┌──────┴──────┐
                       │  Save/Load   │
                       │  (Persist)   │
                       └─────────────┘
```

The Achievement Manager listens for game events (enemy killed, item collected, level completed) and checks them against a registry of achievement definitions. When conditions are met, it marks the achievement as unlocked and triggers a notification.

## Achievement Definition

```json
{
  "achievements": [
    {
      "id": "first_blood",
      "name": "First Blood",
      "description": "Defeat your first enemy",
      "icon": "achievements/first_blood.png",
      "type": "single",
      "condition": { "event": "enemy_defeated", "count": 1 },
      "hidden": false,
      "points": 10
    },
    {
      "id": "monster_hunter",
      "name": "Monster Hunter",
      "description": "Defeat 100 enemies",
      "type": "progressive",
      "condition": { "event": "enemy_defeated", "count": 100 },
      "hidden": false,
      "points": 50
    },
    {
      "id": "secret_room",
      "name": "???",
      "description": "Find the hidden chamber beneath the library",
      "type": "single",
      "condition": { "event": "area_discovered", "area": "secret_library" },
      "hidden": true,
      "points": 25
    }
  ]
}
```

## Achievement Types

| Type | Behavior | Example |
|------|----------|---------|
| **Single** | One-time event triggers unlock | "Complete the tutorial" |
| **Progressive** | Counter increments toward a goal | "Collect 50 gems" (shows 23/50) |
| **Cumulative** | Tracks a total across sessions | "Walk 100 miles total" |
| **Conditional** | Multiple conditions must all be true | "Beat boss without taking damage" |
| **Hidden** | Title/description hidden until unlocked | "???" reveals "Find the secret ending" |
| **Tiered** | Bronze/Silver/Gold thresholds | "Defeat 10/50/100 enemies" |

## Event-Driven Evaluation

The achievement manager subscribes to game events through the Observer pattern (see SKL-0142). When an event fires:

1. **Filter**: which achievements listen for this event type?
2. **Update**: increment counters or check conditions for matching achievements
3. **Evaluate**: has the achievement's condition been fully met?
4. **Unlock**: if met, mark as unlocked, record timestamp, trigger notification
5. **Persist**: save updated progress immediately (do not wait for a save point)

```
on_event("enemy_defeated"):
  for each achievement listening to "enemy_defeated":
    achievement.progress += 1
    if achievement.progress >= achievement.condition.count:
      unlock(achievement)
      save_progress()
```

## Notification Design

Achievement popups should celebrate without interrupting gameplay:

- **Toast notification**: slide in from a screen edge, display for 3-5 seconds, auto-dismiss
- **Non-blocking**: never pause gameplay for an achievement notification
- **Queue system**: if multiple achievements unlock simultaneously, queue them with a 1-second gap
- **Sound effect**: a brief, satisfying audio cue reinforces the reward feeling
- **Icon + name + points**: show enough to feel rewarding without covering the screen

## Persistence Strategy

Achievement progress must survive game crashes, not just clean exits:

- **Save on every progress update**, not just on unlock. A player at 99/100 who crashes should not lose that progress.
- **Store as a simple dictionary**: `{ "achievement_id": { "progress": 45, "unlocked": false, "unlock_time": null } }`
- **Platform sync**: if targeting Steam, Xbox, or PlayStation, sync local state with platform achievement APIs on startup and on unlock. Handle conflicts by taking the more-progressed state.
- **Migration**: when adding new achievements in updates, initialize them with zero progress. Never reset existing progress.

## Integration with Game Economy

Achievements can reward currency, cosmetics, or titles (see SKL-0297 for economy design). Keep achievement rewards meaningful but not required for progression. Players who ignore achievements should not feel punished; players who pursue them should feel celebrated.

## Key Takeaways

- Use event-driven architecture: game events trigger achievement evaluation
- Save progress on every update, not just on unlock, to survive crashes
- Achievement notifications must be non-blocking and queued if simultaneous
- Support progressive, hidden, and tiered types for variety
- Sync with platform APIs (Steam, Xbox) but keep local state as the source of truth
