---
id: SKL-0299
name: Mobile Game Optimization
category: skills
tags: [game-dev, mobile, optimization, performance, touch-controls, battery]
capabilities: [mobile-performance-tuning, touch-input-design, memory-management, screen-adaptation]
useWhen:
  - optimizing a game for mobile devices
  - designing touch controls that feel responsive
  - reducing battery drain and thermal throttling
  - handling different screen sizes and aspect ratios
  - debugging frame rate issues on mobile hardware
estimatedTokens: 700
relatedFragments: [SKL-0142, SKL-0143, PAT-0064, SKL-0301]
dependencies: []
synonyms: ["how to optimize my game for phones", "mobile game performance tips", "touch controls best practices", "my game drains battery too fast", "how to handle different screen sizes in games", "mobile game runs slow on older phones"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: Mobile Game Optimization

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0299 |
| **Name** | Mobile Game Optimization |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Mobile games run on thermally constrained, battery-powered hardware with variable screen sizes and imprecise touch input. Optimization is not optional; it determines whether your game ships or stutters into obscurity.

### Frame Rate and Thermal Budget

Target **30 FPS** as baseline, **60 FPS** for action games. Mobile GPUs throttle aggressively when hot. A game that runs at 60 FPS for the first 10 minutes and then drops to 25 FPS has a thermal problem, not a performance problem.

| Budget Area | Target (mid-range device) | Measurement |
|-------------|---------------------------|-------------|
| Frame time | < 16ms (60 FPS) or < 33ms (30 FPS) | GPU/CPU profiler |
| Draw calls | < 100 per frame | Rendering stats |
| Memory | < 500 MB total | OS memory profiler |
| Battery | < 15% per hour of play | Device battery stats |

### Memory Management

Mobile devices have 2-6 GB RAM shared between OS and apps. The OS will kill your game without warning if memory pressure gets too high.

1. **Use texture atlases.** Combine small textures into atlases to reduce draw calls and memory fragmentation. Compress with ASTC (modern standard) or ETC2 (broad compatibility).
2. **Pool objects aggressively.** Never allocate during gameplay. Pre-allocate bullets, particles, and enemies. Object pooling eliminates GC spikes that cause frame hitches.
3. **Stream assets.** Load only what the current scene needs. Unload aggressively when transitioning. A loading screen between levels is better than an OOM crash.
4. **Reduce texture resolution.** Mobile screens are 6 inches, not 27 inches. A 512x512 texture often looks identical to 1024x1024 on a phone.

### Touch Controls

Touch input lacks the precision of mouse/keyboard and the tactile feedback of controllers. Design for fat fingers on small screens.

- **Minimum touch target: 44x44 points** (Apple HIG) or 48x48 dp (Material). Anything smaller causes misclicks.
- **Virtual joysticks** should appear where the player touches, not at a fixed position. Floating joysticks feel more natural.
- **Dead zones** prevent jittery movement from imprecise thumb placement. Use a 10-15% radius dead zone.
- **Visual feedback** is critical. Without physical buttons, players need visual/haptic confirmation that their input registered.
- **Gesture conflicts**: avoid swipe inputs that conflict with OS gestures (swipe from edge = back/home on most devices).

### Screen Adaptation

Design for a **16:9 reference resolution**, then handle wider (20:9 tall phones) and squarer (4:3 tablets) by expanding the viewport or adding letterboxing. Use a safe zone for UI that works across all ratios.

### Battery Optimization

- Cap frame rate when appropriate. Menus do not need 60 FPS; drop to 30 FPS or lower.
- Reduce GPU overdraw. Avoid full-screen transparent overlays and particle effects that cover the entire screen.
- Minimize network calls. Batch analytics events and sync on intervals, not per-action.
- Dim or simplify effects when battery is below 20% (if the OS exposes battery level).

## Key Takeaways

- Target 30 FPS minimum; profile on mid-range devices, not just flagships
- Object pooling and texture atlases are non-negotiable for mobile performance
- Touch targets must be at least 44x44 points; floating joysticks beat fixed ones
- Design UI within a safe zone that works from 4:3 tablets to 20:9 phones
- Cap frame rate on menus and idle screens to preserve battery life
