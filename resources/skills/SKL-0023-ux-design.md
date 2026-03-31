---
id: SKL-0023
name: UX Design
category: skills
tags: [ux, design, user-flow, wireframe, onboarding, prototyping, accessibility, color]
capabilities: [user-flow-mapping, screen-design, onboarding-design, accessibility-planning, design-system-selection]
useWhen:
  - designing user flows before building screens
  - planning onboarding experiences for new apps
  - defining screen layouts with all states (empty, loading, error, success)
  - creating interaction patterns and navigation structures
  - selecting colors, typography, and design tools for a project
estimatedTokens: 650
relatedFragments: [SKL-0004, SKL-0033, AGT-0003]
dependencies: []
synonyms: ["design the user flow", "plan my app screens", "what should the onboarding look like", "map out how users navigate", "sketch the layout before building"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/gztchan/awesome-design"
difficulty: intermediate
owner: designer
pillar: "framework-core"
---

# Skill: UX Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0023 |
| **Version** | 1.0 |
| **Owner** | designer |
| **Inputs** | Task description, STATE.md, DECISIONS.md, PRD, existing designs, target platform |
| **Outputs** | Design doc at docs/ux/, DECISIONS.md updated, STATE.md updated |
| **Triggers** | `UX_DESIGN_REQUESTED` |

---

## Purpose

Design user experiences that are intuitive, accessible, and implementable. Every screen must be designed before it is built. Work upstream of the builder agent — their input is this skill's output.

---

## Procedure

1. **Define the user and their goal:**
   - Who is the user? (persona or role)
   - What are they trying to accomplish?
   - Where are they coming from? (entry point)
   - What does success look like?

2. **Map the full user flow** before designing screens:
   - Happy path from entry to completion
   - Decision points where the flow branches
   - Error paths — what happens when things go wrong
   - Edge cases — empty states, first-time use, returning users

3. **Design each screen** in the flow:
   - **Layout:** what elements appear and where
   - **Content:** exact labels, headings, button text (not lorem ipsum)
   - **Interactions:** what happens on tap, click, swipe, submit
   - **States:** loading, error, empty, and populated — all four, every screen

4. **Apply UX principles:**
   - **Clarity:** one primary action per screen, plain language labels, error messages tell user what to do next
   - **Reduce friction:** minimize taps, default to common choice, never re-enter provided info
   - **Platform conventions:** iOS (nav bar top, tab bar bottom), Android (bottom nav, back button), Web (persistent nav, breadcrumbs, hover states)
   - **Beginner-friendly:** assume first-time user, empty states explain what to do, onboarding shows value before asking

5. **Design onboarding** (for new apps/major features):
   - Show value before asking for anything
   - Ask for minimum permissions, only when needed
   - Progress indicators — user knows how long it takes
   - Skip option for experienced users
   - First success moment within 60 seconds
   - Template: define first launch goal, value moment, minimum required before value, deferred asks, steps, skip path, re-entry

6. **Usability gut-check:**
   - Can a new user find the primary action in under 5 seconds?
   - Is there anything that could be removed?
   - Does every element earn its place?
   - What would confuse a first-time user?

7. **Write design document** to `docs/ux/[feature-name]-flow.md`.

8. **Log UX decisions** to DECISIONS.md.

9. **Update STATE.md.**

---

## Constraints

- Never writes code — design only
- Never skips user flow map and jumps to screen design
- Never skips onboarding design for a new app or major feature
- Never designs a screen without defining its empty and error states
- Always writes designs implementable without further clarification
- Always uses plain language — no design jargon

---

## Primary Agent

designer

---

## Definition of Done

- [ ] User and goal defined before designing
- [ ] Full user flow mapped including alternative paths
- [ ] Every screen designed with layout, interactions, and all four states
- [ ] Onboarding flow designed with value moment identified (for new apps)
- [ ] UX principles applied and gut-check completed
- [ ] Design document written to docs/ux/[feature-name]-flow.md
- [ ] UX decisions logged to DECISIONS.md
- [ ] STATE.md updated
