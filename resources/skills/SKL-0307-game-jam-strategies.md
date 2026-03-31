---
id: SKL-0307
name: Game Jam Strategies
category: skills
tags: [game-dev, game-jam, rapid-prototyping, scope-management, time-management, post-mortem]
capabilities: [jam-planning, scope-control, rapid-prototyping, time-budgeting, post-mortem-analysis]
useWhen:
  - participating in a game jam with a fixed deadline
  - scoping a game idea to fit a short development window
  - deciding what to cut to ship on time
  - writing a post-mortem after a jam
  - learning rapid game development techniques
estimatedTokens: 650
relatedFragments: [SKL-0143, SKL-0306, SKL-0142, PAT-0159]
dependencies: []
synonyms: ["how to survive a game jam", "game jam tips and tricks", "how to scope a game for a 48-hour jam", "what to cut when running out of time", "rapid game prototyping", "game jam post-mortem template"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/photonstorm/phaser"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Jam Strategies

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0307 |
| **Name** | Game Jam Strategies |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Game jams compress the full game development cycle into 24-72 hours. Success depends on ruthless scope control, not technical skill. The goal is a complete, playable experience, not an impressive tech demo.

### Time Budget (48-Hour Jam)

| Phase | Hours | Focus |
|-------|-------|-------|
| **Brainstorm** | 2-3 | Interpret theme, pick ONE mechanic, sketch on paper |
| **Prototype** | 6-8 | Core mechanic playable with placeholder art |
| **Playtest checkpoint** | 1 | Is the core loop fun? Pivot now or never |
| **Content** | 8-10 | Levels, enemies, progression, art, sound |
| **Polish** | 6-8 | Juice (particles, shake, sound), UI, tutorial |
| **Ship prep** | 2-3 | Build, test on target platform, upload, write description |
| **Sleep** | 12-16 | Non-negotiable. Tired developers make scope-expanding decisions |

### The One-Mechanic Rule

Your game should be built around exactly one core mechanic. If you need more than one sentence to explain how the game works, the scope is too large.

Good: "You control gravity direction to navigate platforms."
Too big: "You control gravity and can also shoot and there are puzzles and a shop."

### Scope Management Framework

**Must have (core loop):**
- One player action (move, jump, click, drag)
- One challenge (obstacle, timer, enemy, puzzle)
- One feedback signal (score, progress bar, win/lose state)

**Should have (if time allows):**
- Sound effects for key actions
- 3-5 levels or increasing difficulty
- Simple title screen and game-over screen

**Cut immediately:**
- Story or cutscenes
- Multiple enemy types
- Save/load systems
- Multiplayer
- Procedural generation (unless it IS the mechanic)
- Settings menus

### Rapid Prototyping Tactics

1. **Use a framework you already know.** A jam is not the time to learn a new engine. Phaser, Godot, Unity, or Love2D are all proven jam choices.
2. **Start with the mechanic, not the art.** Colored rectangles are fine for the first 8 hours.
3. **Use free asset packs.** Kenney.nl, OpenGameArt, and freesound.org provide jam-legal assets.
4. **Commit to version control early.** Initialize a git repo immediately. Commit every hour. You will break something at 3am.
5. **Playtest at the halfway mark.** If the core mechanic is not fun yet, simplify further or pivot. Do not add more features to fix a boring mechanic.

### The "Done Enough" Checklist

Before submitting, verify:

- [ ] Game starts without errors
- [ ] Player understands what to do within 10 seconds (or there is a one-screen tutorial)
- [ ] There is a win or lose condition
- [ ] The game can be restarted without refreshing the page/app
- [ ] Build runs on the target platform (web builds: test in Chrome AND Firefox)
- [ ] Submission page has screenshots and a description

### Post-Mortem Template

Write a post-mortem within 24 hours of the jam ending, while memory is fresh:

1. **What went right** (3 things that worked well)
2. **What went wrong** (3 things that caused problems)
3. **What I would do differently** (concrete changes for next jam)
4. **Time breakdown** (actual vs. planned per phase)
5. **Key learning** (one sentence takeaway)

Post your post-mortem on the jam page or your blog. The community reads them, and writing forces reflection.

## Anti-Patterns

- Spending the first 6 hours debating ideas instead of prototyping
- Adding features to fix a boring core mechanic (simplify instead)
- Skipping sleep (quality drops dramatically after 20+ hours awake)
- Starting with art and music before the core mechanic works
- Submitting without testing the final build on a fresh browser/machine

## Key Takeaways

- One mechanic, one sentence to explain it, that is your entire scope
- Playtest at the halfway mark and cut ruthlessly if the loop is not fun
- Sleep is not optional; tired developers expand scope and introduce bugs
- Ship a complete, playable experience over an impressive but broken prototype
- Write a post-mortem within 24 hours to lock in the learning
