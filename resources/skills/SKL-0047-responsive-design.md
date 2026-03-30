---
id: SKL-0047
name: Responsive Design
category: skills
tags: [responsive, mobile-first, breakpoints, typography, images, layout, fluid, container-queries, clamp]
capabilities: [mobile-first-layout, breakpoint-strategy, fluid-typography, responsive-images, container-queries]
useWhen:
  - building layouts that need to work across phone, tablet, and desktop
  - choosing a breakpoint strategy for a new project
  - implementing fluid typography that scales smoothly
  - optimizing images for different screen sizes
  - using container queries for reusable components
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0045, SKL-0053, SKL-0020]
dependencies: []
synonyms: ["how do I make my website look good on phones", "my layout breaks on mobile", "what breakpoints should I use", "how to make text scale with screen size", "images are too big on mobile"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Responsive Design

Build layouts that work on every screen size. Start with mobile, add complexity as space allows.

## Mobile-First Approach

Write base styles for the smallest screen (320px), then add breakpoints for larger screens. This forces content prioritization.

```css
/* Base: mobile */
.grid { display: flex; flex-direction: column; gap: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .grid { flex-direction: row; flex-wrap: wrap; }
  .grid > * { flex: 1 1 calc(50% - 0.5rem); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid > * { flex: 1 1 calc(33.33% - 0.67rem); }
}
```

## Breakpoint Strategy

Align with Tailwind defaults (used by Chakra UI, Mantine, and most component libraries):

| Breakpoint | Name | Target |
|------------|------|--------|
| 0-639px | Mobile | Phones (portrait) |
| 640px | `sm` | Large phones (landscape) |
| 768px | `md` | Tablets |
| 1024px | `lg` | Small laptops |
| 1280px | `xl` | Desktops |
| 1536px | `2xl` | Large monitors |

**Rule:** Design for 3 layouts max (mobile, tablet, desktop). More breakpoints means more maintenance.

## Fluid Typography

Scale text smoothly between viewport sizes using `clamp()`:

```css
h1 { font-size: clamp(1.75rem, 4vw + 0.5rem, 3.5rem); }
body { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); }
```

The formula: `clamp(minimum, preferred, maximum)`. The preferred value uses `vw` units to scale with the viewport.

## Container Queries

Style components based on their container width, not the viewport. Essential for reusable components that appear in different-sized containers (sidebar vs main content):

```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

Container queries let components be truly responsive regardless of page layout, a concept React component libraries like Radix and Headless UI encourage through composable design.

## Responsive Images

| Technique | Purpose |
|-----------|---------|
| `srcset` + `sizes` | Serve different resolutions based on viewport |
| `<picture>` element | Serve different crops or formats (WebP, AVIF) |
| `object-fit: cover` | Prevent image distortion in fixed containers |
| `loading="lazy"` | Defer offscreen images for faster page load |

```html
<img
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="hero-800.webp"
  alt="Product screenshot showing the dashboard"
  loading="lazy"
/>
```

## Testing Checklist

1. Test at 320px, 768px, 1024px, and 1440px widths.
2. No horizontal scrollbar at any width.
3. Touch targets are at least 44x44px on mobile.
4. Text is readable without zooming (minimum 16px body text on mobile).
5. Images do not overflow their containers.
6. Navigation is usable on mobile (hamburger menu or bottom nav).
