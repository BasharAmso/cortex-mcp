---
id: SKL-0020
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
relatedFragments: [SKL-0001, SKL-0029, AGT-0003]
dependencies: []
synonyms: ["design the user flow", "plan my app screens", "what should the onboarding look like", "map out how users navigate", "sketch the layout before building"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/gztchan/awesome-design"
difficulty: intermediate
---

# UX Design

Design user experiences that are intuitive, accessible, and implementable. Every screen must be designed before it is built. Leverages the design ecosystem of tools, resources, and best practices.

## Design Resource Stack

Select tools before starting design work:

| Need | Recommended Tools |
|------|------------------|
| UI Design | Figma (collaborative), Sketch (Mac), Adobe XD |
| Prototyping | Figma prototypes, InVision, Principle, Framer |
| Color palettes | Coolors, Material Palette, Color Hunt |
| Typography | Google Fonts, Font Squirrel, Typewolf for pairing |
| Icons | Material Design Icons, Heroicons, Phosphor, Font Awesome |
| Stock images | Unsplash, Pexels (free), Stocksy (premium) |
| Mockups | Mockup World, Smartmockups, BrowserFrame |
| User testing | Hotjar (heatmaps), UserTesting, Maze Design |

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

For every screen in the flow, define all four dimensions:

| Dimension | What to Specify |
|-----------|----------------|
| Layout | Element placement, visual hierarchy, whitespace |
| Content | Exact labels, headings, button text (never lorem ipsum) |
| Interactions | Tap, click, swipe, submit behaviors |
| States | Loading, error, empty, populated. All four, every screen. |

### 4. Apply UX Principles

- **Clarity:** One primary action per screen. Error messages tell the user what to do next.
- **Reduce friction:** Minimize taps, default to common choice, never re-enter provided info.
- **Platform conventions:** Follow iOS HIG, Material Design, or web patterns as appropriate.
- **Color and contrast:** Minimum 4.5:1 for text. Never use color as the sole means of conveying information.
- **Typography:** Limit to 2 font families. Establish clear hierarchy with size and weight.

### 5. Design Onboarding (New Apps)

1. Show value before asking for anything
2. Ask for minimum permissions, only when needed in context
3. Progress indicators so users know how long it takes
4. Skip option for experienced users
5. First success moment within 60 seconds

### 6. Usability Gut-Check

- Can a new user find the primary action in under 5 seconds?
- Is there anything that could be removed without losing function?
- Does every element earn its place on the screen?
- Would this work at 200% zoom and on a mobile viewport?

## Output

Write design document to `docs/ux/[feature-name]-flow.md`.

## Key Rules

- Never start building before the flow is mapped
- Every screen needs all four states designed (empty, loading, error, success)
- Accessibility is not optional: contrast, keyboard nav, screen reader support
- Design decisions must reference the target user, not personal preference
