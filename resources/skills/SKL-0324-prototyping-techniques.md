---
id: SKL-0324
name: Prototyping Techniques
category: skills
tags: [prototyping, wireframes, low-fidelity, high-fidelity, interactive-prototype, design-process]
capabilities: [fidelity-selection, paper-prototyping, wireframe-creation, interactive-prototype, prototype-testing]
useWhen:
  - deciding what fidelity of prototype to build at each design stage
  - creating paper prototypes for early concept validation
  - building interactive prototypes for usability testing
  - communicating design intent to developers and stakeholders
  - choosing between prototyping tools and approaches
estimatedTokens: 650
relatedFragments: [SKL-0320, SKL-0325, SKL-0023, SKL-0330]
dependencies: []
synonyms: ["when should I use a paper prototype", "how to choose prototype fidelity", "best prototyping approach for my stage", "wireframe vs prototype difference", "how to build an interactive prototype", "fastest way to test a design idea"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: Prototyping Techniques

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0324 |
| **Name** | Prototyping Techniques |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Prototyping is thinking with your hands. The purpose is to answer specific design questions as cheaply as possible before committing to code. The right fidelity depends on what question you are trying to answer, not how far along the project is.

### Fidelity Spectrum

| Fidelity | Time | Tools | Best For |
|----------|------|-------|----------|
| **Paper** | 15-30 min | Paper, pen, sticky notes | Exploring multiple concepts, team brainstorming |
| **Low-fi wireframe** | 1-2 hours | Balsamiq, Whimsical, hand-drawn | Layout, content hierarchy, flow validation |
| **Mid-fi wireframe** | 2-4 hours | Figma, Sketch (grayscale) | Spacing, component sizing, navigation structure |
| **High-fi mockup** | 4-8 hours | Figma, Sketch (full visual) | Visual design review, stakeholder approval |
| **Interactive prototype** | 1-3 days | Figma prototyping, Framer, code | Usability testing, developer handoff, user flows |

### Paper Prototyping

Paper prototypes are underused and underrated. They are the fastest way to test layout concepts:

1. Draw each screen on a separate sheet of paper or index card
2. One person plays "the computer," swapping screens when the user taps
3. The user talks through what they expect at each step
4. Iterate immediately: cross out, redraw, add screens in real time

Paper works because low fidelity sets expectations. Users critique the concept, not the colors. Stakeholders feel permission to suggest changes. Nobody has invested hours in pixel work.

### When to Use Each Fidelity

| Question to Answer | Fidelity Needed |
|--------------------|----------------|
| "Is this the right concept?" | Paper or low-fi |
| "Does this layout make sense?" | Low-fi to mid-fi |
| "Can users complete this task?" | Mid-fi with click-through |
| "Does this look and feel right?" | High-fi mockup |
| "Is this interaction intuitive?" | Interactive prototype |
| "Will this work in production?" | Coded prototype |

The key rule: never use higher fidelity than the question demands. High fidelity too early wastes time and makes teams reluctant to throw away ideas that took days to polish.

### Interactive Prototype Tips

When you need interactivity for usability testing:

- **Prototype only the flow being tested.** Do not build every screen; link only the path the user will take
- **Use realistic content.** Lorem ipsum undermines testing; users need real text to evaluate information hierarchy
- **Handle dead ends gracefully.** If a user taps something outside the prototype, show a "not part of this test" message rather than breaking the illusion
- **Hotspot everything the user might try.** Watch 2-3 pilot sessions to identify unexpected taps, then add hotspots
- **Keep transitions simple.** Dissolve or slide; complex animations distract from the test objective

### Common Prototyping Mistakes

- **Starting at high fidelity**: Investing 8 hours before validating the concept wastes time and creates attachment
- **Prototyping everything**: Only prototype the screens and flows with the most uncertainty or risk
- **Confusing prototypes with specs**: Prototypes prove a concept; specs define implementation. They are different artifacts
- **No clear test question**: Every prototype should answer a specific question, not just "look cool"

## Key Takeaways

- Match prototype fidelity to the question you need to answer, not the project phase
- Paper prototyping is the fastest way to explore and eliminate concepts
- Use realistic content in prototypes; placeholder text undermines usability testing
- Only prototype flows with uncertainty or risk; do not build every screen
- Prototypes are disposable; if you are reluctant to throw one away, you built at too high a fidelity
