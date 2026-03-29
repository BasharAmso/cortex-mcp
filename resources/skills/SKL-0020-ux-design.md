---
id: SKL-0020
name: UX Design
category: skills
tags: [ux, design, user-flow, wireframe, onboarding]
capabilities: [user-flow-mapping, screen-design, onboarding-design, accessibility-planning]
useWhen:
  - designing user flows before building screens
  - planning onboarding experiences for new apps
  - defining screen layouts with all states (empty, loading, error, success)
  - creating interaction patterns and navigation structures
estimatedTokens: 650
relatedFragments: [SKL-0001, SKL-0029, AGT-0003]
dependencies: []
---

# UX Design

Design user experiences that are intuitive, accessible, and implementable. Every screen must be designed before it is built.

## Procedure

### 1. Define the User and Goal

- Who is the user? (persona or role)
- What are they trying to accomplish?
- Where are they coming from? (entry point)
- What does success look like?

### 2. Map the Full User Flow

Before designing any screen:

- **Happy path** from entry to completion
- **Decision points** where the flow branches
- **Error paths** for when things go wrong
- **Edge cases** like empty states, first-time use, and returning users

### 3. Design Each Screen

For every screen in the flow:

- **Layout:** What elements appear and where
- **Content:** Exact labels, headings, and button text (not lorem ipsum)
- **Interactions:** What happens on tap, click, swipe, submit
- **States:** Loading, error, empty, and populated. All four, every screen.

### 4. Apply UX Principles

- **Clarity:** One primary action per screen. Plain language labels. Error messages tell the user what to do next.
- **Reduce friction:** Minimize taps, default to common choice, never re-enter provided info.
- **Platform conventions:** Follow iOS, Android, or web patterns as appropriate.
- **Beginner-friendly:** Assume first-time user. Empty states explain what to do.

### 5. Design Onboarding (New Apps)

- Show value before asking for anything
- Ask for minimum permissions, only when needed
- Progress indicators so users know how long it takes
- Skip option for experienced users
- First success moment within 60 seconds

### 6. Usability Gut-Check

- Can a new user find the primary action in under 5 seconds?
- Is there anything that could be removed?
- Does every element earn its place?

## Output

Write design document to `docs/ux/[feature-name]-flow.md`.
