---
id: SKL-0301
name: Game Accessibility
category: skills
tags: [game-dev, accessibility, colorblind, difficulty, subtitles, remapping]
capabilities: [accessibility-implementation, colorblind-support, input-remapping, difficulty-scaling]
useWhen:
  - making a game playable for people with disabilities
  - adding colorblind modes or high contrast options
  - implementing customizable difficulty settings
  - adding subtitle and caption support
  - allowing input remapping for controllers and keyboard
estimatedTokens: 650
relatedFragments: [SKL-0299, SKL-0302, SKL-0142]
dependencies: []
synonyms: ["how to make my game accessible", "colorblind mode for games", "game difficulty options best practices", "how to add subtitles to my game", "controller remapping in games", "accessible game design guide"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Accessibility

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0301 |
| **Name** | Game Accessibility |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Approximately 15-20% of gamers have some form of disability. Accessibility features are not charity; they expand your audience and improve the experience for everyone. Many accessibility features (subtitle options, remappable controls, adjustable difficulty) are now expected by mainstream players.

### The Four Pillars of Game Accessibility

| Pillar | Disability Area | Key Features |
|--------|----------------|--------------|
| **Visual** | Blindness, low vision, colorblindness | Colorblind modes, high contrast, screen reader support, scalable UI |
| **Auditory** | Deafness, hard of hearing | Subtitles, captions, visual cues for audio events, speaker identification |
| **Motor** | Limited mobility, dexterity | Remappable controls, adjustable timing, one-handed modes, auto-aim |
| **Cognitive** | Learning disabilities, ADHD | Difficulty options, tutorials, objective reminders, reduced visual clutter |

### Colorblind Support

8% of men and 0.5% of women have color vision deficiency. Never use color alone to convey critical information.

- **Add shape or icon differentiation.** If red = enemy and green = ally, also use different silhouettes or icons.
- **Offer colorblind filters.** Provide Protanopia, Deuteranopia, and Tritanopia modes that shift the palette. Godot and Unity both support post-processing color filters.
- **Test with a simulator.** Use tools like Color Oracle or the built-in colorblind simulation in Chrome DevTools to verify your UI.

### Subtitles and Captions

- **Speaker identification**: label who is speaking with name and color
- **Background sounds**: caption important non-speech audio: "[explosion in distance]", "[footsteps approaching]"
- **Scalable text size**: minimum 24px at 1080p, with options to increase to 32px or 40px
- **Background opacity**: provide a semi-transparent background behind subtitle text for readability

### Input Remapping

Allow players to rebind every action to any input. This is the single most impactful motor accessibility feature.

- Support alternative input devices (adaptive controllers, switch access, eye tracking where platform APIs allow)
- Allow separate bindings for keyboard, mouse, and gamepad
- Provide presets (one-handed left, one-handed right, simplified) alongside full custom remapping
- Never hardcode "press X to continue" when X might be remapped

### Difficulty and Assist Options

The modern approach separates difficulty into independent sliders rather than a single Easy/Normal/Hard toggle:

- **Damage received** (50% to 200%)
- **Enemy speed/aggression**
- **Timing windows** (QTEs, parry windows)
- **Auto-aim strength**
- **Puzzle hints** (optional, progressive)

Games like Celeste and The Last of Us Part II demonstrated that granular assist options receive critical acclaim and expand audience without diminishing the experience for players who want a challenge.

### Implementation Checklist

1. Remappable controls for all input methods
2. Subtitle system with speaker ID, sizing, and background
3. Colorblind mode (at minimum Deuteranopia filter)
4. Scalable UI (text and HUD elements)
5. Adjustable difficulty sliders (not just a single toggle)
6. Visual alternatives for all audio-only cues
7. Option to disable screen shake, flashing, and rapid motion

## Key Takeaways

- Never rely on color alone to communicate critical gameplay information
- Remappable controls are the single most impactful accessibility feature
- Subtitles need speaker identification, scalable size, and background contrast
- Replace single difficulty toggles with granular independent sliders
- Test with colorblind simulators and screen readers during development, not after
