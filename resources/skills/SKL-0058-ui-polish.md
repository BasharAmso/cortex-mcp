---
id: SKL-0058
name: UI Polish Checklist
category: skills
tags: [ui, polish, shadows, transitions, states, design, css, ux]
capabilities: [shadow-system, border-consistency, hover-states, transition-timing, empty-state-design, loading-state-design]
useWhen:
  - a page works but looks unfinished or like a prototype
  - adding hover states, transitions, and micro-interactions
  - designing empty states, loading states, and error states
  - making shadows, borders, and border-radius consistent
  - doing a final visual pass before shipping
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0054, SKL-0057]
dependencies: []
synonyms: ["my app works but looks like a developer made it", "how to make my UI feel more polished", "the little details that make a site feel professional", "my page looks like a prototype not a product", "what am I missing that makes real apps look better"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# UI Polish Checklist

The difference between "works" and "feels good" is polish. This checklist covers the details that separate prototypes from products.

## Shadows

Shadows create depth and hierarchy. Use a consistent system:

| Level | CSS | Use For |
|-------|-----|---------|
| None | `none` | Flat elements, inline content |
| Subtle | `0 1px 2px hsl(0 0% 0% / 0.05)` | Cards at rest, input fields |
| Medium | `0 4px 6px -1px hsl(0 0% 0% / 0.07)` | Dropdowns, popovers |
| Elevated | `0 10px 25px -3px hsl(0 0% 0% / 0.1)` | Modals, floating elements |
| Hover lift | `0 8px 16px -2px hsl(0 0% 0% / 0.1)` | Cards on hover (add with transition) |

**Rule:** Shadows should always go downward and slightly outward. Never use equal spread on all sides (it looks like a glow, not a shadow).

## Borders and Border Radius

| Element | Border Radius | Border |
|---------|--------------|--------|
| Buttons | 6-8px (or pill: 9999px) | None, or 1px on secondary/outline variants |
| Cards | 8-12px | 1px subtle (`hsl(0 0% 0% / 0.08)`) or none with shadow |
| Inputs | 6-8px (match buttons) | 1px, darken on focus |
| Modals | 12-16px | None, use shadow |
| Avatars | 9999px (circle) | 2px white ring for overlapping |
| Badges/chips | 4-6px or pill | None or 1px |

**Consistency rule:** Pick ONE radius for interactive elements (buttons, inputs, selects) and stick with it across the entire app.

## Hover and Focus States

Every interactive element needs three visible states:

| State | What Changes | Example |
|-------|-------------|---------|
| **Default** | Base appearance | `bg-blue-500` |
| **Hover** | Subtle shift | Darken 10%, lift shadow, slight scale(1.02) |
| **Active/Pressed** | Feedback | Darken 15%, scale(0.98), shadow inset |
| **Focus** | Keyboard indicator | `outline: 2px solid var(--color-primary); outline-offset: 2px` |
| **Disabled** | Clearly inactive | opacity 0.5, cursor: not-allowed, no hover effect |

## Transition Timing

| What | Duration | Easing | Why |
|------|----------|--------|-----|
| Color/background | 150ms | ease | Quick, responsive feel |
| Shadow/transform | 200ms | ease-out | Smooth lift effect |
| Layout changes | 200-300ms | ease-in-out | Perceptible but not slow |
| Page transitions | 300ms | ease-in-out | Noticeable entrance |
| Modals/overlays | 200ms in, 150ms out | ease-out / ease-in | Enter slow, exit fast |

**Never exceed 400ms** for UI transitions. Users perceive anything longer as laggy.

Apply transitions to the specific property, not `all`:
```css
transition: background-color 150ms ease, box-shadow 200ms ease-out;
```

## The Three Forgotten States

Most devs build the happy path. Ship all four:

### Empty State
- Friendly illustration or icon (not a blank page)
- Clear headline: what this area is for
- Action button: how to populate it
- Example: "No projects yet. Create your first project to get started."

### Loading State
- Skeleton screens for content areas (not spinners)
- Pulse animation on skeletons: `animate-pulse` or custom
- Match the actual layout shape (prevents layout shift)
- Show skeletons immediately, no delay

### Error State
- What went wrong (plain language, not error codes)
- What the user can do about it (retry button, alternative action)
- Do not blame the user ("Something went wrong" not "Invalid input")
- Persistent errors need a way to dismiss or recover

## Final Polish Checklist

- [ ] Every clickable element has a hover state
- [ ] Focus indicators are visible and match the design language
- [ ] Disabled elements look clearly disabled
- [ ] All transitions use consistent timing from the table above
- [ ] Shadows follow the elevation system (not random values)
- [ ] Border radius is consistent for same-category elements
- [ ] Empty, loading, and error states exist for every data-driven view
- [ ] No layout shift when content loads (skeletons match final layout)
- [ ] Buttons have active/pressed feedback (not just hover)
- [ ] Icons and text are vertically aligned (not off by 1-2px)
