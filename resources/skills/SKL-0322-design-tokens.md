---
id: SKL-0322
name: Design Tokens Implementation
category: skills
tags: [design-tokens, style-dictionary, theming, color-tokens, spacing-tokens, typography-tokens]
capabilities: [token-definition, style-dictionary-config, theme-switching, token-naming, multi-platform-tokens]
useWhen:
  - setting up a design token pipeline with Style Dictionary
  - defining color, spacing, and typography tokens for a design system
  - implementing theme switching (light/dark mode) using tokens
  - generating platform-specific outputs from a single token source
  - establishing token naming conventions for a team
estimatedTokens: 650
relatedFragments: [SKL-0058, SKL-0049, SKL-0005, SKL-0327]
dependencies: []
synonyms: ["how to use style dictionary", "how to set up design tokens in code", "best naming convention for design tokens", "how to build a theme switching system", "how to share design tokens across platforms", "design token pipeline setup"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/amzn/style-dictionary"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Skill: Design Tokens Implementation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0322 |
| **Name** | Design Tokens Implementation |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Design tokens are the atomic values of a design system: colors, spacing, typography, shadows, and motion. They bridge design tools and code by providing a single source of truth that compiles to any platform (CSS, iOS, Android, React Native). Style Dictionary by Amazon is the leading open-source tool for this pipeline.

### Token Hierarchy

Tokens work best in three tiers:

| Tier | Purpose | Example |
|------|---------|---------|
| **Global** | Raw values, the full palette | `color.blue.500: #3B82F6` |
| **Alias/Semantic** | Purpose-driven references | `color.primary: {color.blue.500}` |
| **Component** | Scoped to a specific component | `button.primary.bg: {color.primary}` |

Never reference global tokens directly in components. Always go through semantic tokens. This makes theme switching a matter of swapping the alias layer.

### Style Dictionary Setup

```json
// tokens/color/base.json
{
  "color": {
    "blue": {
      "500": { "value": "#3B82F6", "type": "color" }
    },
    "neutral": {
      "900": { "value": "#111827", "type": "color" }
    }
  }
}

// tokens/color/semantic.json
{
  "color": {
    "primary": { "value": "{color.blue.500}" },
    "text": { "value": "{color.neutral.900}" }
  }
}
```

Style Dictionary compiles these into platform outputs: CSS custom properties, SCSS variables, Swift constants, Kotlin objects, or JSON.

### Naming Convention

Use a consistent CTI (Category-Type-Item) structure:

```
{category}.{type}.{item}.{subitem}.{state}
color.background.surface.default
color.background.surface.hover
spacing.padding.component.sm
typography.fontSize.heading.lg
```

Rules: lowercase, dot-separated, no abbreviations except standard ones (sm, md, lg, xl). State goes last (default, hover, active, disabled, focus).

### Theme Switching

Define each theme as a separate token set that overrides the alias layer:

```json
// tokens/themes/dark.json
{
  "color": {
    "primary": { "value": "{color.blue.400}" },
    "text": { "value": "{color.neutral.100}" },
    "background": { "value": "{color.neutral.900}" }
  }
}
```

At build time, Style Dictionary generates separate CSS files per theme. At runtime, swap themes by toggling a class or data attribute on the root element:

```css
[data-theme="dark"] {
  --color-primary: #60A5FA;
  --color-text: #F3F4F6;
  --color-background: #111827;
}
```

### Multi-Platform Output

Style Dictionary's power is one source, many outputs. Configure platforms in `config.json`:

- **Web**: CSS custom properties, SCSS variables
- **iOS**: Swift `UIColor` extensions, asset catalogs
- **Android**: XML resource files, Kotlin constants
- **React Native**: JavaScript/TypeScript objects

Each platform uses the same token definitions but gets native output. Changes to the source tokens propagate everywhere on rebuild.

## Key Takeaways

- Design tokens are the single source of truth connecting design decisions to every platform
- Use a three-tier hierarchy: global values, semantic aliases, and component-scoped tokens
- Never reference global tokens directly; always use semantic aliases for theme flexibility
- Style Dictionary compiles one token source into CSS, Swift, Kotlin, and more
- Theme switching becomes trivial when it only requires swapping the alias layer
