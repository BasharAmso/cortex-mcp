---
id: SKL-0106
name: Wireframing & Prototyping
category: skills
tags: [wireframing, prototyping, low-fidelity, high-fidelity, clickable-prototype, design-handoff, component-library, design-system]
capabilities: [wireframe-creation, prototype-planning, fidelity-selection, design-handoff-prep, component-reuse]
useWhen:
  - creating low-fidelity wireframes before visual design
  - deciding between paper sketches, wireframes, and clickable prototypes
  - planning a clickable prototype for usability testing
  - preparing design specs for developer handoff
estimatedTokens: 650
relatedFragments: [SKL-0023, SKL-0105, SKL-0104, SKL-0003]
dependencies: []
synonyms: ["sketch out my app screens", "build a clickable prototype", "wireframe before coding", "what fidelity should my prototype be", "how to hand off designs to developers", "mockup my feature"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Patternslib/Patterns"
difficulty: beginner
owner: designer
pillar: "ux-design"
---

# Wireframing & Prototyping

Build prototypes with the least investment needed to answer your specific question. Every fidelity level serves a different purpose. Match the prototype to the decision you need to make.

## Fidelity Ladder

| Level | What It Is | Time | Best For |
|-------|-----------|------|----------|
| **Paper sketch** | Hand-drawn screens on paper or whiteboard | Minutes | Early brainstorming, team alignment, exploring many ideas fast |
| **Low-fi wireframe** | Grayscale boxes and text, no styling | Hours | Structure, layout, content hierarchy, flow validation |
| **Mid-fi wireframe** | Real content, basic interactions, no visual polish | Hours-days | Usability testing, stakeholder review, flow completeness |
| **High-fi mockup** | Full visual design with colors, typography, imagery | Days | Brand validation, pixel-level review, visual design approval |
| **Clickable prototype** | Interactive screens with realistic navigation | Days | Task-based usability testing, developer understanding, stakeholder demos |

## When to Use Each

- **Exploring ideas**: Paper sketches. Draw 6-8 variations in 30 minutes. Discard most.
- **Validating structure**: Low-fi wireframes. Focus on what goes where, not how it looks.
- **Testing with users**: Mid-fi or clickable prototype. Users need enough realism to complete tasks.
- **Getting visual sign-off**: High-fi mockups. Stakeholders react to aesthetics; show them the real thing.
- **Handing off to developers**: Annotated high-fi mockups with interaction specs.

## Wireframe Essentials

Every wireframe screen must communicate:

1. **Layout and hierarchy**: What elements appear and in what order of importance
2. **Real content**: Use actual labels, headings, and button text. Never "Lorem ipsum."
3. **Navigation context**: Where this screen sits in the overall flow, how users arrive and leave
4. **All states**: Empty, loading, populated, error. Design all four for every screen.

## Component-Based Prototyping

Reuse components from an existing design system or pattern library rather than designing from scratch:

- **Identify existing patterns**: Buttons, form fields, cards, navigation bars, modals, tooltips
- **Use consistent interaction behaviors**: A collapsible section should work the same everywhere
- **Document pattern variations**: Toggle states, active/inactive, hover/focus/disabled
- **Leverage HTML-driven patterns**: Libraries like Patternslib enable interactive prototypes using class-based triggers without custom JavaScript, keeping prototypes accessible and semantic

## Design Handoff Checklist

When transferring designs to development:

| What to Include | Why |
|-----------------|-----|
| Screen designs with all states | Developers need every state, not just the happy path |
| Interaction annotations | Click, hover, swipe, transition behaviors for each element |
| Spacing and sizing specs | Margins, padding, font sizes, line heights |
| Component mapping | Which design components map to which code components |
| Responsive breakpoints | How layouts adapt at mobile, tablet, and desktop widths |
| Assets | Icons, images, and illustrations exported at required resolutions |

## Common Mistakes

- Jumping to high-fidelity too early (locks in decisions before exploring alternatives)
- Wireframing without real content (layout changes when real text replaces placeholder)
- Skipping error and empty states (developers will invent their own, usually poorly)
- Prototyping everything instead of the riskiest flows (waste of time on obvious screens)
