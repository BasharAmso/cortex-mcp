---
id: SKL-0294
name: Game UI/HUD Design
category: skills
tags: [game-ui, hud, health-bar, menus, inventory, responsive-ui]
capabilities: [hud-layout-design, menu-system-creation, health-bar-implementation, responsive-game-ui]
useWhen:
  - designing a heads-up display for a game
  - building game menus (main menu, pause, settings)
  - implementing health bars, score displays, or inventory screens
  - making game UI work across different screen sizes
  - choosing between diegetic and non-diegetic UI elements
estimatedTokens: 620
relatedFragments: [SKL-0293, SKL-0296, PAT-0154]
dependencies: []
synonyms: ["how to make a game HUD", "health bar in my game", "game menu design", "inventory screen for games", "responsive UI for games", "score display and counters"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game UI/HUD Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0294 |
| **Name** | Game UI/HUD Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Game UI divides into two categories: **HUD** (always visible during gameplay) and **menus** (full-screen or overlay panels). Both must communicate information quickly without blocking the player's view of the action.

### HUD Design Principles

The HUD displays real-time game state: health, score, ammo, minimap, cooldowns. Follow these rules:

- **Corners and edges only.** Keep the center of the screen clear for gameplay. Place health top-left, score top-right, abilities bottom-center.
- **Minimal and glanceable.** Players look at the HUD for fractions of a second. Use icons, bars, and numbers instead of text labels.
- **Consistent position.** Never move HUD elements during gameplay. Players build spatial memory for where to look.
- **Progressive disclosure.** Only show elements when relevant. Ammo count appears when a weapon is equipped; quest tracker appears in the quest zone.

### Health Bars and Meters

```
[████████░░░░] 67/100 HP
```

- Use color gradients (green to yellow to red) for instant readability.
- Animate damage with a delayed "ghost bar" that shrinks slower than the actual health, showing how much was just lost.
- For boss health bars, place them at the top center of the screen with the boss name.

### Menu Systems

Game menus follow a stack pattern: each new menu pushes onto the stack, and pressing back pops it.

| Menu | Contents |
|------|----------|
| **Main Menu** | Play, Settings, Credits, Quit |
| **Pause Menu** | Resume, Settings, Main Menu |
| **Settings** | Volume sliders, controls, display options |
| **Inventory** | Grid or list of items with tooltips |

Ensure every menu is navigable by both mouse/touch and keyboard/gamepad. Highlight the focused element clearly.

### Responsive Game UI

Games run on varied resolutions. Use anchor-based layouts:

- **Anchors** - Pin UI elements to screen edges or corners so they reposition on resize.
- **Containers** - Use HBox/VBox containers (Godot) or Flex layouts for groups of elements.
- **Scale modes** - Choose between stretch (distorts), keep-aspect (letterbox), or expand (more visible area). Keep-aspect is safest for most games.

In Godot, set Control node anchors to the appropriate preset (top-left, center, full-rect) and use `size_flags` for dynamic sizing within containers.

### Diegetic vs Non-Diegetic UI

| Type | Description | Example |
|------|-------------|---------|
| **Non-diegetic** | Overlaid on screen, not part of game world | Traditional HUD bars |
| **Diegetic** | Exists within the game world | Health meter on character's back (Dead Space) |
| **Spatial** | Attached to game objects | Floating name plates above NPCs |
| **Meta** | Affects the screen itself | Blood splatter on edges when damaged |

Diegetic UI increases immersion but reduces glanceability. Choose based on your game's tone.

## Key Takeaways

- Place HUD elements at screen edges, keep the center clear for gameplay
- Use color-coded bars with ghost animations for health and meters
- Build menus as a navigable stack supporting both pointer and gamepad input
- Anchor UI elements to screen edges for responsive multi-resolution support
- Choose diegetic or non-diegetic UI based on your game's immersion goals
