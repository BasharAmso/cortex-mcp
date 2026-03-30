---
id: SKL-0057
name: Design Tokens
category: skills
tags: [design-tokens, css-variables, theming, design-system, figma, dark-mode]
capabilities: [token-definition, css-custom-properties, theme-switching, naming-conventions, figma-token-sync]
useWhen:
  - setting up a design token system for a project
  - creating CSS custom properties for colors, spacing, and typography
  - implementing theme switching (light/dark mode)
  - naming design tokens consistently
  - syncing design decisions between Figma and code
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0048, SKL-0054, SKL-0059]
dependencies: []
synonyms: ["what are design tokens and do I need them", "how to set up css variables for my theme", "organize my colors and spacing in one place", "how to make dark mode easy to switch", "keep my figma and code colors in sync"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Design Tokens

Design tokens are named values (colors, spacing, fonts, shadows) stored in one place and used everywhere. They are the single source of truth for your visual language.

## Why Tokens Matter

Without tokens: you have `#3B82F6` scattered across 47 files. Changing your brand blue means find-and-replace and prayer.

With tokens: you change `--color-primary` in one place and everything updates. Dark mode becomes a variable swap, not a rewrite.

## Token Naming Convention

Use a three-tier naming system:

| Tier | Purpose | Example |
|------|---------|---------|
| **Global** | Raw values, never used directly | `--blue-500: hsl(217, 91%, 60%)` |
| **Semantic** | Purpose-based, used in components | `--color-primary: var(--blue-500)` |
| **Component** | Scoped overrides (optional) | `--btn-bg: var(--color-primary)` |

**Always use semantic tokens in your components.** Global tokens are the palette; semantic tokens are the decisions.

## CSS Custom Properties Setup

```css
:root {
  /* Global: the palette */
  --blue-500: hsl(217, 91%, 60%);
  --blue-600: hsl(217, 91%, 50%);
  --gray-50: hsl(217, 8%, 97%);
  --gray-900: hsl(217, 8%, 12%);

  /* Semantic: the decisions */
  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-600);
  --color-bg: var(--gray-50);
  --color-text: var(--gray-900);
  --color-border: hsl(217, 8%, 85%);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --leading-body: 1.6;
  --leading-heading: 1.2;

  /* Shadows */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.07);
  --shadow-lg: 0 10px 25px hsl(0 0% 0% / 0.1);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

## Theme Switching

Dark mode is a semantic token remap, not a rewrite:

```css
[data-theme="dark"] {
  --color-bg: hsl(217, 8%, 8%);
  --color-text: hsl(217, 8%, 90%);
  --color-primary: hsl(217, 85%, 65%);  /* slightly lighter, less saturated */
  --color-border: hsl(217, 8%, 22%);
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.2);
  --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.3);
}
```

Toggle with JavaScript:
```js
document.documentElement.dataset.theme =
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
```

## Tailwind Integration

If using Tailwind, map tokens in `tailwind.config.js`:

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

For most dev projects: define tokens in CSS, document them in a simple table, and update Figma manually when they change. Do not over-engineer this.

## Token Audit Checklist

- [ ] Every color in the codebase references a token (no raw hex/hsl in components)
- [ ] Spacing uses token scale values (no `13px` or `27px`)
- [ ] Font sizes come from the type scale
- [ ] Shadows and radii are tokenized
- [ ] Dark mode works by swapping semantic tokens only
- [ ] Token names describe purpose, not appearance (`--color-primary` not `--blue`)
