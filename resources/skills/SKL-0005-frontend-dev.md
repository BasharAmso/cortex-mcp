---
id: SKL-0005
name: Frontend Development
category: skills
tags: [frontend, ui, react, css, responsive, components, web]
capabilities: [component-building, responsive-design, visual-polish, accessibility, scroll-animations]
useWhen:
  - building web UI components or pages
  - implementing responsive layouts and styling
  - adding scroll animations, micro-interactions, or visual polish
  - creating accessible, mobile-first web interfaces
estimatedTokens: 700
relatedFragments: [SKL-0006, SKL-0013, PAT-0002]
dependencies: []
---

# Frontend Development

Build web UI components, pages, and styling with a mandatory visual polish pass covering animations, typography, and design depth.

## Procedure

### 1. Read Context

- Confirm framework (React, Next.js, Vue, Astro) and styling (Tailwind, CSS modules) from project decisions
- Extract brand tone and visual expectations from the PRD
- Scan existing code for conventions, color tokens, font choices

### 2. Build the Component

- Mobile-first responsive design
- Semantic HTML with ARIA labels and keyboard navigation
- Handle all states: loading, error, empty, populated
- No hardcoded data — use props, state, or labeled placeholders
- Match existing file structure and naming conventions

### 3. Visual Polish Pass (Mandatory)

Every page must pass these checks before it is done:

**Typography Rhythm**
- Clear heading hierarchy with noticeable size jumps
- Body line-height 1.5-1.7, headings 1.1-1.3
- At least one "wow" text moment (oversized headline, italic quote, distinct stat)

**Scroll Animations**
- Sections animate in on scroll (fade-up, slide-in, scale)
- Lists and card groups stagger entrance (50-100ms delay between items)
- All animations respect `prefers-reduced-motion`

**Micro-Interactions**
- Buttons have visible hover beyond color change (scale, shadow lift)
- All state changes use transitions (minimum 200ms)
- Visible focus indicators matching the design language

**Visual Depth**
- At least one section with overlapping or layered elements
- Subtle shadows on cards and elevated elements
- Generous whitespace between sections (py-16 to py-24)

**Color and Contrast**
- Limited palette: 1 primary, 1 accent, 2-3 neutrals
- WCAG 2.1 AA contrast ratios (4.5:1 normal text, 3:1 large)
- At least one dark/inverted section for variety

### 4. Final Quality Check

- Test at 320px, 768px, and 1440px
- Verify light and dark modes (if applicable)
- Confirm at least one visual moment worth screenshotting

## Key Constraints

- Never modify backend or API files
- Never hardcode data that should come from an API or prop
- Use component libraries (shadcn/ui, Radix) when available — do not rebuild what exists
- Visual polish is not optional, even for "simple" pages
