---
id: SKL-0058
name: Design Tokens
category: skills
tags: [design-tokens, css-variables, theming, design-system, figma, dark-mode, style-dictionary, tailwind, semantic]
capabilities: [token-definition, css-custom-properties, theme-switching, naming-conventions, figma-token-sync]
useWhen:
  - setting up a design token system for a project
  - creating CSS custom properties for colors, spacing, and typography
  - implementing theme switching (light/dark mode)
  - naming design tokens consistently
  - syncing design decisions between Figma and code
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0049, SKL-0055, SKL-0060]
dependencies: []
synonyms: ["what are design tokens and do I need them", "how to set up css variables for my theme", "organize my colors and spacing in one place", "how to make dark mode easy to switch", "keep my figma and code colors in sync"]
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: designer
pillar: "ux-design"
---

# Design Tokens

Design tokens are named values (colors, spacing, fonts, shadows) stored in one place and used everywhere. They are the single source of truth for your visual language. Every major design system (Material, Carbon, Polaris, Spectrum, Lightning) uses this architecture.

## Why Tokens Matter

Without tokens: `#3B82F6` scattered across 47 files. Changing your brand blue means find-and-replace and prayer.

With tokens: change `--color-primary` in one place and everything updates. Dark mode becomes a variable swap, not a rewrite.

## Token Naming Convention (Three-Tier)

| Tier | Purpose | Example |
|------|---------|---------|
| **Global** | Raw values, never used directly in components | `--blue-500: hsl(217, 91%, 60%)` |
| **Semantic** | Purpose-based, used in components | `--color-primary: var(--blue-500)` |
| **Component** | Scoped overrides (optional) | `--btn-bg: var(--color-primary)` |

**Always use semantic tokens in components.** Global tokens are the palette; semantic tokens are the decisions. This is the pattern used by IBM Carbon, Shopify Polaris, and Adobe Spectrum.

## CSS Custom Properties Setup

```css
:root {
  /* Global: the palette */
  --blue-500: hsl(217, 91%, 60%);
  --gray-50: hsl(217, 8%, 97%);
  --gray-900: hsl(217, 8%, 12%);

  /* Semantic: the decisions */
  --color-primary: var(--blue-500);
  --color-bg: var(--gray-50);
  --color-text: var(--gray-900);
  --color-border: hsl(217, 8%, 85%);

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;
  --space-4: 16px; --space-8: 32px;

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --text-base: 1rem; --text-lg: 1.25rem;
  --leading-body: 1.6; --leading-heading: 1.2;

  /* Shadows & Radii */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.07);
  --radius-sm: 4px; --radius-md: 8px; --radius-full: 9999px;
}
```

## Theme Switching

Dark mode is a semantic token remap:

```css
[data-theme="dark"] {
  --color-bg: hsl(217, 8%, 8%);
  --color-text: hsl(217, 8%, 90%);
  --color-primary: hsl(217, 85%, 65%);
  --color-border: hsl(217, 8%, 22%);
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.2);
}
```

## Tailwind Integration

Map tokens in `tailwind.config.js` so utility classes reference your token system:

```js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      background: 'var(--color-bg)',
      foreground: 'var(--color-text)',
    }
  }
}
```

Now `bg-primary` and `text-foreground` use your tokens.

## Syncing with Figma

| Approach | Complexity | Best For |
|----------|-----------|----------|
| **Manual** | Low | Small teams, <20 tokens |
| **Tokens Studio plugin** | Medium | Figma plugin that exports tokens as JSON |
| **Style Dictionary** | High | Enterprise, multi-platform (web + iOS + Android) |

For most dev projects: define tokens in CSS, document in a simple table, update Figma manually. Do not over-engineer this until you have 3+ platforms consuming the same tokens.

## Token Audit Checklist

- Every color in the codebase references a token (no raw hex/hsl in components)
- Spacing uses token scale values (no `13px` or `27px`)
- Font sizes come from the type scale
- Shadows and radii are tokenized
- Dark mode works by swapping semantic tokens only
- Token names describe purpose, not appearance (`--color-primary` not `--blue`)
