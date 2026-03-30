---
id: SKL-0026
name: GDD Writing
category: skills
tags: [game-design, gdd, planning, vision, mechanics, MDA-framework, gameplay-loops, design-pillars]
capabilities: [game-design-document, gameplay-loop-design, design-pillars, mda-framework, player-type-analysis]
useWhen:
  - writing a Game Design Document for a new game
  - defining core fantasy, gameplay loops, and design pillars
  - structuring game mechanics using MDA Framework and Bartle Types
  - planning MVP scope for a game project
  - validating a game concept before development
estimatedTokens: 800
relatedFragments: [SKL-0001, SKL-0023, SKL-0025]
dependencies: []
synonyms: ["write a game design doc", "plan my game mechanics", "I want to make a game", "design the gameplay loops", "define how my game works"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: intermediate
---

# GDD Writing

Write a Game Design Document through conversational interview, incorporating game design theory (MDA Framework, Bartle Player Types, Self-Determination Theory). The game-development parallel to PRD Writing. Applies PM-grade rigor: problem-first thinking, scope discipline, and validation before commitment.

## Game Vision Challenge (Mandatory First Step)

Before any interview, establish the foundation. This mirrors the Vision Challenge in PRD Writing:

| Element | Question | Failure Mode If Skipped |
|---------|----------|------------------------|
| Core Fantasy | What does the player *feel* while playing? | Mechanics without emotional anchor |
| 30-Second Loop | What does moment-to-moment gameplay feel like? | Complex systems built on a boring core |
| Differentiation | What existing game is closest, and how is yours different? | Building a clone without knowing it |
| Scope Posture | EXPANSION / HOLD SCOPE / REDUCTION? | Endless feature creep or premature cuts |

If the 30-second loop is not fun in isolation, nothing else matters. Validate this first.

## Interview Rounds

| Round | Covers | Key Frameworks |
|-------|--------|---------------|
| 1. Identity & Fantasy | Genre, platform, audience, elevator pitch, unique hook | Market positioning |
| 2. Gameplay Loops | 30-second loop, 5-15 minute cycle, session arc, long-term progression | 4-timescale model |
| 3. Design Pillars | 3-5 falsifiable pillars, anti-pillars, MDA aesthetics ranking | MDA Framework, Bartle Types, SDT |
| 4. Art & Audio | Visual style, tone, audio direction, game feel goals | Juiciness principles |
| 5. Scope & Constraints | MVP features (MoSCoW), exclusions, tech constraints, monetization, kill rule | PM scope discipline |

**Interview approach:** Conversational. One round at a time. Never dump all questions at once. Use follow-ups to deepen understanding. ABC: Always Be Coaching the designer on why each element matters.

## MDA Framework Quick Reference

| Layer | Definition | Example |
|-------|-----------|---------|
| Mechanics | Rules and systems | "Tap to jump, hold to glide" |
| Dynamics | Emergent behavior from mechanics | "Players discover wall-jumping is faster" |
| Aesthetics | Emotional response in the player | "Sensation of mastery after a perfect run" |

Design from Aesthetics backward: decide what the player should feel, then design dynamics and mechanics to create that feeling.

## GDD Structure (14 Sections)

1. Game Identity, 2. Core Fantasy, 3. Design Pillars, 4. Gameplay Loops, 5. Core Mechanics, 6. Progression & Economy, 7. Player Experience, 8. Art Direction, 9. Audio Direction, 10. MVP Scope, 11. NOT in Scope, 12. Risks & Assumptions, 13. Open Questions, 14. References

## Key Rules

- Never skip the core fantasy. Mechanics come after the fantasy is established.
- Never write mechanics before the 30-second loop is defined and validated.
- Design pillars must be falsifiable. Reject vague pillars like "be fun."
- Once a scope posture is chosen, commit to it. Posture changes require explicit re-decision.
- The GDD is a living document. Update it as design evolves during development.
