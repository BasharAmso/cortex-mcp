---
id: PAT-0162
name: Layout Pattern
category: patterns
tags: [layout, css-grid, flexbox, responsive, breakpoints, container-queries]
capabilities: [responsive-layout, grid-design, flexbox-patterns, breakpoint-strategy]
useWhen:
  - building responsive page layouts
  - choosing between CSS Grid and Flexbox
  - implementing responsive breakpoints
  - using container queries for component-level responsiveness
  - creating common layouts like sidebar, header-main-footer, or dashboard grid
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0308, PAT-0163]
dependencies: []
synonyms: ["how to build a responsive layout", "css grid vs flexbox", "how to create a sidebar layout", "how to use container queries", "how to set up responsive breakpoints", "best way to layout a web page"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "frontend"
---

# Pattern: Layout

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0162 |
| **Name** | Layout Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

CSS layout is solved by two tools: Flexbox for one-dimensional flow (rows or columns) and Grid for two-dimensional placement (rows AND columns). The decision is straightforward.

### Flexbox vs Grid Decision

| Use Case | Tool | Why |
|----------|------|-----|
| Navigation bar | Flexbox | Items flow in a single row |
| Card grid | Grid | Equal-sized columns and rows |
| Centering content | Flexbox or Grid | Both work; Grid is slightly less code |
| Sidebar + main content | Grid | Two-column layout with fixed sidebar width |
| Form fields in a row | Flexbox | Variable widths in one direction |
| Dashboard with panels | Grid | Complex two-dimensional placement |

**Rule of thumb:** If content flows in one direction, use Flexbox. If you need rows AND columns, use Grid.

### Common Layout Patterns

**Holy Grail (Header + Sidebar + Main + Footer):**

```css
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

**Responsive card grid:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

This creates as many columns as fit, each at least 300px wide, with equal spacing. No media queries needed.

**Centered content with max-width:**

```css
.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1rem;
}
```

### Responsive Breakpoints

A mobile-first approach using standard breakpoints:

| Breakpoint | Width | Target |
|------------|-------|--------|
| **sm** | 640px | Large phones |
| **md** | 768px | Tablets |
| **lg** | 1024px | Laptops |
| **xl** | 1280px | Desktops |
| **2xl** | 1536px | Large screens |

With Tailwind CSS, these are built in: `md:grid-cols-2 lg:grid-cols-3`.

**Mobile-first means writing styles for mobile by default and adding complexity at larger breakpoints:**

```css
/* Mobile: single column */
.grid { display: grid; gap: 1rem; }

/* Tablet: two columns */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: three columns */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Container Queries

Container queries make components responsive to their container's width, not the viewport. This is essential for reusable components:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}

@container (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
```

A card component adapts whether it is in a narrow sidebar or a wide main content area, without knowing which.

### Spacing System

Use a consistent spacing scale instead of arbitrary values:

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 0.25rem (4px) | Tight gaps, icon padding |
| `--space-2` | 0.5rem (8px) | Input padding, small gaps |
| `--space-4` | 1rem (16px) | Card padding, standard gap |
| `--space-6` | 1.5rem (24px) | Section gaps |
| `--space-8` | 2rem (32px) | Large section padding |
| `--space-16` | 4rem (64px) | Page section spacing |

### Sticky and Fixed Positioning

```css
/* Sticky header */
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white; /* prevent content showing through */
}

/* Sticky sidebar within a scrollable area */
.sidebar {
  position: sticky;
  top: 4rem; /* offset for fixed header */
  height: fit-content;
}
```

## Anti-Patterns

- Using `float` for layout (deprecated approach, use Flexbox or Grid)
- Fixed pixel widths on containers (use `max-width` with percentage or fluid units)
- Desktop-first responsive design (harder to maintain, larger mobile CSS)
- Nesting Flexbox containers more than 2-3 levels deep (Grid is usually clearer)
- Arbitrary spacing values (inconsistent visual rhythm)

## Key Takeaways

- Flexbox for one-dimensional layouts (rows or columns), Grid for two-dimensional layouts
- `auto-fill` + `minmax()` creates responsive grids without media queries
- Mobile-first: write mobile styles by default, add complexity at larger breakpoints
- Container queries make components responsive to their container, not the viewport
- Use a consistent spacing scale for visual rhythm across the entire application
