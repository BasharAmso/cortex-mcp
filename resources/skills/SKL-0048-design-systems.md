---
id: SKL-0048
name: Design Systems
category: skills
tags: [design-system, tokens, theming, storybook, components, documentation, versioning, radix, material, polaris]
capabilities: [token-architecture, component-api-design, storybook-setup, theme-switching, system-documentation]
useWhen:
  - building a shared component library for a team or product
  - setting up design tokens for colors, spacing, and typography
  - creating a Storybook for component documentation
  - implementing dark mode or theme switching
  - evaluating existing design systems to adopt
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0045, SKL-0020, SKL-0049]
dependencies: []
synonyms: ["how do I build a component library", "set up design tokens for my project", "I want to add dark mode to my app", "how to document my components with Storybook", "keep my UI consistent across the app"]
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Design Systems

Build a token-based design system that keeps your UI consistent, themeable, and documented. Over 150 active design systems exist globally; learn from the best.

## Learn from Production Systems

| System | Owner | Key Strength | Open Source |
|--------|-------|-------------|-------------|
| **Material Design** | Google | Comprehensive specs, components, tokens | Yes |
| **Carbon** | IBM | Full ecosystem: components, voice, tokens, a11y | Yes |
| **Polaris** | Shopify | Strong voice/tone guidelines alongside components | Yes |
| **Radix** | WorkOS | Unstyled, accessible primitives for composition | Yes |
| **Ant Design** | Alibaba | Massive component library with design tokens | Yes |
| **Lightning** | Salesforce | Enterprise patterns, data-dense layouts | Yes |
| **Spectrum** | Adobe | Multi-platform, robust accessibility | Yes |
| **Fluent** | Microsoft | Cross-platform consistency (web, Windows, mobile) | Yes |

## Token Architecture

Design tokens are the single source of truth. Define them at three levels:

| Level | Purpose | Example |
|-------|---------|---------|
| **Primitive** | Raw values | `blue-500: #3b82f6` |
| **Semantic** | Meaning-based aliases | `color-primary: var(--blue-500)` |
| **Component** | Per-component overrides | `button-bg: var(--color-primary)` |

```
tokens/
  primitives.css     # Raw color, spacing, font values
  semantic.css       # Semantic aliases (primary, surface, danger)
  components.css     # Optional component-level tokens
```

## Component API Design Principles

Every shared component needs a deliberate API. Follow these rules from production systems:

1. **Minimal props.** Start with 2-3 props. Add more when real use cases demand them.
2. **Consistent naming.** Use `variant`, `size`, `disabled`, `className` across all components.
3. **Composable.** Prefer `children` over config objects (Radix and Headless UI approach).
4. **Accessible by default.** Bake in ARIA attributes, keyboard support, and focus management.

## Documentation with Storybook

```
components/
  Button/
    Button.tsx
    Button.stories.tsx   # All variants and states
    Button.test.tsx
```

Each story file should cover: all variants, all sizes, disabled state, loading state, and with/without icons. Production systems like Carbon and Polaris document voice, tone, and usage guidelines alongside code.

## Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| New component | Minor (0.X.0) | Add `<Tooltip>` |
| New prop on existing component | Minor (0.X.0) | Add `loading` to `<Button>` |
| Bug fix, style tweak | Patch (0.0.X) | Fix focus ring color |
| Remove prop or component | Major (X.0.0) | Remove `<LegacyModal>` |

## New Component Checklist

1. Tokens used for all colors, spacing, radii, and fonts (no hardcoded values).
2. Works in light and dark themes.
3. Keyboard accessible with visible focus indicator.
4. Storybook story with all variants documented.
5. TypeScript props interface exported for consumers.
6. No internal state that should be controlled by the parent.
