---
id: SKL-0330
name: Design Handoff
category: skills
tags: [design-handoff, developer-specs, component-mapping, annotations, storybook, qa]
capabilities: [spec-preparation, annotation-creation, component-mapping, handoff-documentation, qa-checklist]
useWhen:
  - preparing design files for developer implementation
  - annotating designs with interaction details and edge cases
  - mapping design components to existing code components
  - creating a QA checklist based on design specifications
  - establishing a smooth designer-developer handoff process
estimatedTokens: 650
relatedFragments: [SKL-0327, SKL-0324, SKL-0049, SKL-0005]
dependencies: []
synonyms: ["how to hand off designs to developers", "what should a design spec include", "how to annotate designs for developers", "how to map designs to code components", "design to development workflow", "how to do design QA"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/storybookjs/storybook"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: Design Handoff

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0330 |
| **Name** | Design Handoff |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Design handoff is the process of transferring design intent to developers with enough detail to build accurately. Poor handoffs cause implementation drift, rework cycles, and designer-developer friction. A good handoff is a conversation supported by documentation, not a file thrown over a wall.

### What a Complete Handoff Includes

| Artifact | Purpose | Format |
|----------|---------|--------|
| **Screen designs** | Visual reference for every state | Figma frames, organized by flow |
| **Component specs** | Spacing, sizing, color, typography values | Auto-generated from Figma (inspect panel) |
| **Interaction annotations** | Hover states, transitions, animations | Text annotations on Figma frames |
| **Edge case screens** | Loading, empty, error, overflow, permission states | Separate Figma page or section |
| **Responsive behavior** | How the layout adapts at each breakpoint | Multiple frames or written description |
| **Component mapping** | Which existing code components to use | Table linking design to Storybook |

### Annotation Best Practices

Annotate directly on the design file. Developers should not need to guess behavior:

- **Hover/focus states**: "On hover, background changes to `color.primary.100`. On focus, show 2px ring."
- **Transitions**: "Sidebar slides in from left over 200ms with ease-out."
- **Conditional content**: "Show 'Upgrade' badge only for free-tier users."
- **Truncation**: "Title truncates with ellipsis after 2 lines. Tooltip shows full text on hover."
- **Dynamic data**: "If more than 5 items, show 'View All' link. If 0 items, show empty state (see frame X)."

### Component Mapping Table

Before building, map design elements to existing code components to maximize reuse:

| Design Element | Code Component | Storybook Link | Notes |
|---------------|---------------|----------------|-------|
| Primary button | `<Button variant="primary">` | /story/button | Use `size="lg"` on hero sections |
| User avatar | `<Avatar>` | /story/avatar | Falls back to initials if no image |
| Notification toast | `<Toast>` | /story/toast | Auto-dismiss after 5s |
| Card layout | `<Card>` | /story/card | New component needed for pricing card variant |

Flag components that do not exist yet. These need to be built first and may affect the implementation timeline.

### Edge Cases to Specify

Developers need explicit designs for these states, not just the happy path:

| State | What to Show |
|-------|-------------|
| **Loading** | Skeleton screen, spinner, or progress bar |
| **Empty** | Empty state with explanation and CTA |
| **Error** | Error message with recovery action |
| **Overflow** | How text, lists, and grids handle excess content |
| **Permission** | What unauthorized users see |
| **First-time** | Onboarding hints, tutorials, or guided setup |
| **Offline** | Cached content indicator, retry prompts |

If you do not design these states, developers will improvise them, and the result will be inconsistent.

### Handoff Meeting Agenda

A 30-minute walkthrough prevents hours of back-and-forth:

1. **Flow walkthrough** (10 min): Walk through the user flow, explaining decisions and priorities
2. **Component review** (10 min): Review the component mapping, flag new components, discuss reuse
3. **Edge cases** (5 min): Walk through non-happy-path states
4. **Questions** (5 min): Developer questions, timeline discussion, identify unknowns

### Design QA Process

After implementation, the designer reviews the build against the spec:

1. Compare each screen side-by-side with the design at every breakpoint
2. Check all interactive states (hover, focus, active, disabled)
3. Verify edge cases (empty, loading, error, overflow)
4. Test with real content (not placeholder data)
5. Log discrepancies as specific tickets with screenshots showing design vs. build

Keep QA focused on design intent, not pixel perfection. Small spacing differences matter less than broken interactions or missing states.

## Key Takeaways

- A complete handoff includes screens, annotations, edge case states, responsive behavior, and component mapping
- Annotate interaction details directly on design files; developers should never guess behavior
- Map design elements to existing code components before building to maximize reuse
- Always design loading, empty, error, and overflow states; developers will improvise if you do not
- Run a design QA pass after implementation focusing on intent, not pixel perfection
