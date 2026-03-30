---
id: SKL-0115
name: User Onboarding Flows
category: skills
tags: [onboarding, tooltips, checklists, progressive-disclosure, empty-states, activation, ux, product-tour]
capabilities: [onboarding-design, tooltip-tours, checklist-flows, empty-state-design, activation-tracking]
useWhen:
  - designing first-time user experiences
  - building product tours or tooltip walkthroughs
  - creating setup checklists or progress trackers
  - designing empty states that guide new users
  - improving activation rates and time-to-value
estimatedTokens: 700
relatedFragments: [SKL-0020, SKL-0023, SKL-0005, PAT-0051]
dependencies: []
synonyms: ["how to onboard new users", "build a product tour", "add tooltips to guide users", "first-time user experience", "setup wizard", "getting started flow"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/uixmat/onborda"
difficulty: intermediate
---

# User Onboarding Flows

Design onboarding experiences that reduce time-to-value through progressive disclosure, guided tours, checklists, and contextual help. Good onboarding teaches by doing, not by explaining.

## Core Principles

| Principle | Description |
|-----------|-------------|
| Progressive disclosure | Reveal features as users need them, not all at once |
| Action over explanation | Get users doing the core action within 60 seconds |
| Skippable always | Every onboarding step must have a clear exit |
| Contextual timing | Show help at the moment of relevance, not on first load |
| Celebrate progress | Acknowledge completions to build momentum |

## Onboarding Pattern Toolkit

### 1. Tooltip Tours (Step-by-Step)

Best for: feature discovery in complex UIs.

```tsx
// Step definition pattern (inspired by Onborda)
const steps = [
  {
    selector: "#create-button",
    title: "Create your first project",
    content: "Click here to get started",
    side: "bottom",
    showControls: true,
    pointerPadding: 10
  }
];

// Wrap target elements with identifiable selectors
<button id="create-button">New Project</button>
```

Key rules:
- Maximum 5 steps per tour (3 is ideal)
- Each step should highlight one action, not explain a concept
- Position tooltips so they do not obscure the target element
- Include step count indicator ("2 of 4")
- Allow dismiss and "do not show again"

### 2. Setup Checklists

Best for: multi-step activation (SaaS products, dashboards).

```
[ ] Connect your account        -- 2 min
[x] Upload your first file      -- done
[ ] Invite a teammate           -- 1 min
[ ] Send your first message     -- 1 min
```

Checklist rules:
- 3-5 items maximum
- Show estimated time per step
- Pre-complete any steps the system can auto-detect
- Use a progress bar (e.g., "2 of 4 complete")
- Persist state across sessions (localStorage or server)

### 3. Empty State Onboarding

Best for: content-driven apps where the product is empty at first.

Empty states should answer three questions:
1. What will appear here? (context)
2. Why is it empty? (reassurance)
3. What should I do? (single CTA)

### 4. Contextual Help

Best for: complex forms, settings pages, advanced features.

- Inline hints next to form fields (not modals)
- "Learn more" links to docs, not full explanations inline
- Hotspot indicators (pulsing dots) for new features
- Dismissable banners for time-sensitive guidance

## Activation Metrics

Track these to measure onboarding effectiveness:

| Metric | Definition | Target |
|--------|-----------|--------|
| Time to first value | Seconds from signup to core action | Under 2 minutes |
| Checklist completion | % of users who finish all steps | Above 60% |
| Tour completion | % who finish tooltip tour without skipping | Above 40% |
| Day-1 retention | % who return within 24 hours | Above 30% |
| Activation rate | % who reach your "aha moment" | Track and improve weekly |

## Anti-Patterns

- Mandatory tours that block the UI with no skip option
- Showing all features on first load (information overload)
- Onboarding that teaches navigation instead of value
- Videos as the primary onboarding (most users skip them)
- Tours that reset on every visit
- Tooltip tours longer than 5 steps
