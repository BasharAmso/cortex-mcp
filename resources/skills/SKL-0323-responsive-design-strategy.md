---
id: SKL-0323
name: Responsive Design Strategy
category: skills
tags: [responsive-design, mobile-first, breakpoints, fluid-typography, adaptive-layouts, media-queries]
capabilities: [mobile-first-design, breakpoint-planning, fluid-typography, adaptive-layout, responsive-images]
useWhen:
  - planning a responsive layout strategy for a new project
  - choosing breakpoints and deciding mobile-first vs desktop-first
  - implementing fluid typography that scales smoothly across viewports
  - making existing layouts work across phone, tablet, and desktop
  - optimizing images and media for different screen sizes
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0048, SKL-0322, PAT-0171]
dependencies: []
synonyms: ["how to make my site responsive", "what breakpoints should I use", "mobile first design explained", "how to do fluid typography", "best responsive layout approach", "how to handle different screen sizes"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: Responsive Design Strategy

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0323 |
| **Name** | Responsive Design Strategy |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Responsive design ensures your interface works across all screen sizes by fluidly adapting layout, typography, and content. Mobile-first is not just a CSS technique; it is a design philosophy that forces you to prioritize content and interactions before adding complexity for larger screens.

### Mobile-First Approach

Start with the smallest viewport and add complexity as space increases:

1. **Content priority**: What must the user see first on a 320px screen?
2. **Single column**: Default to a stacked layout; it works everywhere
3. **Progressive enhancement**: Add multi-column grids, sidebar panels, and hover states as the viewport grows
4. **Performance**: Mobile-first CSS loads the lightest styles by default; larger screens get additional rules

```css
/* Base: mobile (no media query needed) */
.container { padding: 1rem; }
.grid { display: flex; flex-direction: column; gap: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .grid { flex-direction: row; flex-wrap: wrap; }
  .grid > * { flex: 1 1 calc(50% - 0.5rem); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid > * { flex: 1 1 calc(33.333% - 0.67rem); }
}
```

### Breakpoint Strategy

Avoid device-specific breakpoints. Instead, set breakpoints where your content breaks:

| Name | Width | Typical Use |
|------|-------|------------|
| **sm** | 640px | Large phones in landscape |
| **md** | 768px | Tablets, small laptops |
| **lg** | 1024px | Standard laptops |
| **xl** | 1280px | Large desktops |
| **2xl** | 1536px | Ultra-wide monitors |

The best breakpoint is wherever your layout stops looking good. Test by slowly resizing; add a breakpoint where content wraps awkwardly or becomes unreadable.

### Fluid Typography

Instead of jumping between fixed sizes at breakpoints, use `clamp()` for smooth scaling:

```css
/* Scales from 16px at 320px viewport to 20px at 1280px viewport */
body { font-size: clamp(1rem, 0.875rem + 0.5vw, 1.25rem); }

/* Headings scale more aggressively */
h1 { font-size: clamp(1.75rem, 1.25rem + 2vw, 3rem); }
h2 { font-size: clamp(1.375rem, 1rem + 1.5vw, 2.25rem); }
```

This eliminates typography breakpoints entirely. Text scales smoothly across all viewport widths.

### Adaptive Layout Patterns

| Pattern | Description | Use When |
|---------|------------|----------|
| **Stack to grid** | Single column on mobile, multi-column on desktop | Card layouts, feature lists |
| **Off-canvas** | Side panel hidden on mobile, visible on desktop | Navigation, filters |
| **Priority+ nav** | Shows top items, collapses rest into "More" menu | Horizontal navigation with many items |
| **Content choreography** | Reorder elements by importance per viewport | Hero sections, landing pages |

### Responsive Images

Serve appropriately sized images per viewport to save bandwidth:

```html
<picture>
  <source srcset="hero-lg.webp" media="(min-width: 1024px)" />
  <source srcset="hero-md.webp" media="(min-width: 640px)" />
  <img src="hero-sm.webp" alt="Product screenshot" loading="lazy" />
</picture>
```

## Key Takeaways

- Mobile-first forces content prioritization and delivers lighter CSS to constrained devices
- Set breakpoints where your content breaks, not at device pixel widths
- Use `clamp()` for fluid typography that scales without breakpoint jumps
- Choose adaptive layout patterns based on content type, not arbitrary grids
- Serve responsive images with `<picture>` and `srcset` to save bandwidth on smaller devices
