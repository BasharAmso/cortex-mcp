---
id: SKL-0302
name: Game Testing and QA
category: skills
tags: [game-dev, testing, qa, playtesting, bug-reporting, balance-testing]
capabilities: [playtest-facilitation, bug-tracking, balance-validation, regression-testing]
useWhen:
  - setting up a QA process for a game project
  - running effective playtesting sessions
  - creating a bug reporting workflow for game development
  - validating game balance through testing
  - preventing regressions in a game with frequent updates
estimatedTokens: 650
relatedFragments: [SKL-0301, SKL-0142, PAT-0064]
dependencies: []
synonyms: ["how to test my game", "game QA process", "how to run a playtest", "game bug reporting best practices", "how to balance test a game", "regression testing for games"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/godotengine/godot"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Skill: Game Testing and QA

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0302 |
| **Name** | Game Testing and QA |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Game testing goes beyond software QA. You are testing an experience, not just functionality. A game can be bug-free and still fail because the difficulty curve is wrong, controls feel sluggish, or a level is confusing. Game QA covers three domains: **functional testing** (does it work?), **balance testing** (is it fair and fun?), and **experience testing** (does it feel right?).

### Testing Phases

| Phase | When | Focus | Who |
|-------|------|-------|-----|
| **Developer testing** | During development | Core mechanics, crash bugs | Developer |
| **Alpha playtest** | Feature-complete prototype | Fun factor, flow, confusion points | Small trusted group (5-10) |
| **Beta playtest** | Content-complete build | Balance, difficulty, edge cases | Wider group (20-100) |
| **Regression testing** | After each update/patch | Nothing broke that was working | Automated + manual |
| **Release QA** | Pre-launch | Platform compliance, first-time experience | QA team + fresh eyes |

### Playtesting Best Practices

Playtesting reveals how real players experience your game. The golden rule: **observe, don't explain.**

1. **Give no instructions beyond "play the game."** If you have to explain something, the game failed to communicate it. Note where confusion happens.
2. **Watch faces, not screens.** Frustration, delight, and boredom show on the player's face before they articulate it.
3. **Record sessions.** Screen recording with a face cam (with consent) lets you review later. You will miss details in real time.
4. **Ask open questions after.** "What was confusing?" and "When were you having the most fun?" yield more insight than "Did you like it?"
5. **Test with your target audience.** Hardcore gamers will breeze through a children's game and call it boring. Casual players will struggle with mechanics core gamers find trivial.

### Bug Reporting Format

Consistent bug reports save hours of debugging:

```
Title: [Area] Brief description
Severity: Critical / Major / Minor / Cosmetic
Steps to Reproduce:
  1. Start at [location/menu]
  2. Do [action]
  3. Observe [unexpected result]
Expected: [what should happen]
Actual: [what actually happens]
Platform: [device, OS version, build number]
Screenshot/Video: [attached]
```

Severity levels: **Critical** = crash or data loss. **Major** = gameplay blocked or major feature broken. **Minor** = annoying but workaround exists. **Cosmetic** = visual glitch, no gameplay impact.

### Balance Testing

Balance testing ensures no strategy, character, or item dominates unfairly.

- **Metrics tracking**: log win rates, completion times, item usage rates, death locations. Data reveals imbalances faster than opinions.
- **Extreme playstyles**: test with aggressive, defensive, exploitative, and passive players. If one strategy always wins, the game is unbalanced.
- **Economy validation**: track currency earned vs spent at each progression stage. Cross-reference with your economy model (see SKL-0297).
- **A/B testing**: for live games, test balance changes on a subset of players before rolling out globally.

### Regression Testing

Every patch risks breaking something that worked. Automate what you can:

- **Automated smoke tests**: boot the game, load each level, verify no crashes. Run on every build.
- **Replay systems**: record input sequences and replay them to detect physics or logic changes.
- **Screenshot comparison**: capture key frames and diff against baselines to catch visual regressions.
- **Checklists for manual passes**: critical path walkthrough, all menu transitions, save/load cycle, multiplayer join flow.

## Key Takeaways

- Game QA covers functionality, balance, and experience; bug-free does not mean fun
- During playtests, observe silently and ask open questions after
- Use consistent bug report format with severity, reproduction steps, and platform info
- Track gameplay metrics (win rates, death locations, item usage) to detect balance issues
- Automate smoke tests and screenshot comparisons to catch regressions on every build
