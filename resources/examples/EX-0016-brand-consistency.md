---
id: EX-0016
name: Brand Visual Consistency
category: examples
tags: [brand, style-guide, visual-identity, canva, figma, colors, typography, templates, content-creation]
capabilities: [brand-kit-setup, template-creation, cross-platform-visual-identity]
useWhen:
  - setting up a brand kit with colors, fonts, and logo guidelines
  - creating reusable templates in Canva or Figma
  - building a lightweight style guide for content creators
  - maintaining visual consistency across multiple platforms at scale
estimatedTokens: 750
relatedFragments: [SKL-0092, EX-0014, EX-0015]
dependencies: []
synonyms: ["how to keep my brand consistent", "brand kit setup guide", "style guide for social media", "how to make templates in canva", "visual identity across platforms"]
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
---

# Brand Visual Consistency

How to define, document, and enforce a visual identity using design system principles from leading systems (Material, Carbon, Polaris, Spectrum).

## Design Tokens (CSS Custom Properties)

```css
/* Brand tokens: single source of truth for visual identity */
/* Pattern from design systems: tokens define, components consume */
:root {
  /* Color palette (5 roles max) */
  --brand-primary: #2563eb;
  --brand-secondary: #f59e0b;
  --brand-neutral-dark: #1e293b;
  --brand-neutral-light: #f8fafc;
  --brand-alert: #ef4444;

  /* Typography scale */
  --font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --text-h1: 2.25rem;   /* 36px */
  --text-h2: 1.5rem;    /* 24px */
  --text-h3: 1.25rem;   /* 20px */
  --text-body: 1rem;     /* 16px */
  --text-caption: 0.875rem; /* 14px */
  --leading-heading: 1.2;
  --leading-body: 1.5;

  /* Spacing and shape */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

## Brand Card Component

```html
<!-- Reusable brand component using design tokens -->
<article class="brand-card">
  <h3 class="brand-card-title">Feature Title</h3>
  <p class="brand-card-body">Description of the feature or content block.</p>
  <a href="/learn-more" class="brand-cta">Learn more</a>
</article>
```

```css
.brand-card {
  background: var(--brand-neutral-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.brand-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: 700;
  line-height: var(--leading-heading);
  color: var(--brand-neutral-dark);
  margin-bottom: 0.5rem;
}

.brand-card-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  color: var(--brand-neutral-dark);
}

/* WCAG 4.5:1 contrast: --brand-primary on white background */
.brand-cta {
  display: inline-block;
  margin-top: 1rem;
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.brand-cta:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

## One-Page Style Guide Template

```
BRAND STYLE GUIDE -- [Brand Name]

COLORS       Primary: #2563EB | Secondary: #F59E0B | Dark: #1E293B | Light: #F8FAFC
FONTS        Headings: Plus Jakarta Sans Bold | Body: Source Sans 3 Regular
LOGO         Min size: 24px height | Clear space: 1x mark height | No recoloring
TONE         Warm, direct, encouraging
IMAGES       Candid photography, warm lighting, real people over stock
CORNERS      8px border radius on cards and buttons
ICONS        Lucide set, 1.5px stroke, 24px grid
```

## Cross-Platform Consistency

| Element | LinkedIn | Twitter/X | YouTube | Instagram |
|---------|----------|-----------|---------|-----------|
| Profile photo | Logo mark, 400x400 | Same | Same | Same |
| Post template | 1200x1200 | 1200x675 | 1280x720 | 1080x1080 |
| Color usage | Primary headers | Accent on key text | High contrast | Full palette |

## Key Points

- **Design tokens are the foundation**: leading systems (Material, Carbon, Polaris) define tokens that components consume
- **Two fonts, five colors** -- constraints create recognition faster than variety
- **Templates prevent drift** -- every new content piece starts from an approved template
- **Single source of truth** -- one Figma library or Canva Brand Kit, never duplicated
- **Document the "don'ts"** -- showing what NOT to do prevents more mistakes than showing what to do
- **Audit quarterly** -- screenshot 10 recent posts side by side to catch visual drift
