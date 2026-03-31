---
id: SKL-0304
name: Camera Systems
category: skills
tags: [game-dev, camera, follow-camera, zoom, screen-shake, smooth-scrolling]
capabilities: [camera-follow, zoom-control, screen-effects, camera-bounds, deadzone-setup]
useWhen:
  - implementing a camera that follows the player smoothly
  - adding screen shake for impact feedback
  - setting up zoom controls for strategy or editor views
  - constraining camera movement to level bounds
  - creating cinematic camera pans or transitions
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0303, PAT-0159, PAT-0064]
dependencies: []
synonyms: ["how to make the camera follow the player", "smooth camera scrolling in Phaser", "how to add screen shake", "camera zoom in and out", "camera bounds and deadzone", "cinematic camera pan effect"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: intermediate
owner: "cortex"
pillar: "game-dev"
---

# Skill: Camera Systems

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0304 |
| **Name** | Camera Systems |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

The camera determines what the player sees. A poorly tuned camera creates motion sickness or disorientation. A well-tuned camera feels invisible, keeping the action centered without jarring movement.

### Camera Follow with Lerp

The simplest camera follows the player directly, but snapping creates stiff movement. Linear interpolation (lerp) smooths the transition:

```javascript
// Phaser: smooth follow with lerp
this.cameras.main.startFollow(player, true, 0.08, 0.08);
```

Lerp values range from 0 to 1. Lower values (0.05-0.15) create smooth, cinematic tracking. A value of 1 snaps instantly. Tune separately for X and Y axes: platformers often want tighter vertical tracking (0.15) and looser horizontal (0.08).

### Dead Zones

A dead zone is a region in the center of the screen where the player can move without triggering camera movement. This prevents jittery scrolling during small movements:

```javascript
this.cameras.main.setDeadzone(200, 150);
```

Dead zones work well for platformers where the player frequently reverses direction. Size the zone to roughly 30-40% of the viewport.

### Camera Bounds

Constrain the camera to prevent showing empty space beyond the level:

```javascript
// Lock camera to the tilemap dimensions
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
```

Always set bounds after loading the level map. Without bounds, the camera follows the player into empty void at level edges.

### Zoom

```javascript
// Instant zoom
this.cameras.main.setZoom(2);

// Animated zoom
this.cameras.main.zoomTo(1.5, 1000); // zoom to 1.5x over 1 second
```

Zoom is essential for strategy games (zoom out for overview, zoom in for detail) and for dramatic moments in action games. Use `zoomTo()` with easing for smooth transitions.

### Screen Shake

Screen shake communicates impact: explosions, heavy landings, boss attacks.

```javascript
// duration (ms), intensity (0-1)
this.cameras.main.shake(200, 0.01);
```

Keep shake subtle (intensity 0.005-0.02) and short (100-300ms). Heavy shake causes discomfort. Always respect `prefers-reduced-motion` by providing an option to disable shake.

### Camera Effects Pipeline

| Effect | Method | Use Case |
|--------|--------|----------|
| **Follow** | `startFollow()` | Track player or target |
| **Pan** | `pan(x, y, duration)` | Cinematic reveal, cutscene |
| **Zoom** | `zoomTo(level, duration)` | Focus on detail or show overview |
| **Shake** | `shake(duration, intensity)` | Impact feedback |
| **Fade** | `fadeIn()` / `fadeOut()` | Scene transitions |
| **Rotate** | `rotateTo(radians, duration)` | Disorientation, special effects |

### Multiple Cameras

Use a second camera for HUD elements that should not scroll or shake with the world:

```javascript
const hudCamera = this.cameras.add(0, 0, 800, 600);
hudCamera.ignore(worldObjects); // HUD camera ignores world
this.cameras.main.ignore(hudObjects); // Main camera ignores HUD
```

## Anti-Patterns

- Snapping camera with no lerp (jarring, especially at high speeds)
- Screen shake with high intensity or long duration (causes discomfort)
- No camera bounds (shows empty space beyond the level)
- Ignoring accessibility: always offer a way to disable shake and flash effects

## Key Takeaways

- Use lerp values between 0.05-0.15 for smooth follow that feels natural
- Dead zones prevent jitter during small player movements
- Always set camera bounds to match your level dimensions
- Keep screen shake subtle and short, with an accessibility toggle
- Use a separate camera for HUD to isolate it from world effects
