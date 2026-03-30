---
id: SKL-0005
name: Frontend Development
category: skills
tags: [frontend, ui, react, css, responsive, components, web, next-js, tailwind, accessibility, shadcn]
capabilities: [component-building, responsive-design, visual-polish, accessibility, scroll-animations]
useWhen:
  - building web UI components or pages
  - implementing responsive layouts and styling
  - adding scroll animations, micro-interactions, or visual polish
  - creating accessible, mobile-first web interfaces
  - choosing React component libraries or state management
estimatedTokens: 750
relatedFragments: [SKL-0006, SKL-0013, PAT-0002]
dependencies: []
synonyms: ["build a web page", "make the UI look good", "create a React component", "I need a responsive layout", "add animations to my site"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/enaqx/awesome-react"
difficulty: intermediate
---

# Frontend Development

Build web UI components, pages, and styling with a mandatory visual polish pass. Grounded in the awesome-react ecosystem covering frameworks (Next.js, Remix, Vike), component libraries (shadcn/ui, Radix, Mantine), state management (Zustand, TanStack Query, Jotai), and testing (React Testing Library, Playwright).

## Recommended Stack Defaults

| Concern | Default | Alternatives |
|---------|---------|-------------|
| Framework | Next.js | Remix, Vike, Gatsby |
| Components | shadcn/ui + Radix | Mantine, Chakra, Ant Design |
| Styling | Tailwind CSS | CSS Modules, vanilla-extract |
| State (client) | Zustand | Jotai, Redux Toolkit |
| State (server) | TanStack Query | SWR, Apollo Client |
| Forms | react-hook-form | TanStack Form |
| Tables | TanStack Table | react-data-grid |
| Animation | Framer Motion | react-spring, auto-animate |
| Testing | React Testing Library + Playwright | Cypress, Jest |

## Procedure

### 1. Read Context

- Confirm framework and styling from project decisions
- Extract brand tone and visual expectations from the PRD
- Scan existing code for conventions, color tokens, font choices

### 2. Build the Component

- Mobile-first responsive design (320px, 768px, 1440px breakpoints)
- Semantic HTML with ARIA labels and keyboard navigation
- Handle all states: loading, error, empty, populated
- No hardcoded data -- use props, state, or labeled placeholders
- Match existing file structure and naming conventions

### 3. Visual Polish Pass (Mandatory)

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
- Run accessibility check (heading order, alt text, focus management)

## Key Constraints

- Never modify backend or API files
- Never hardcode data that should come from an API or prop
- Use component libraries (shadcn/ui, Radix) when available -- do not rebuild what exists
- Visual polish is not optional, even for "simple" pages
