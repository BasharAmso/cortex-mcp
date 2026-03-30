---
id: SKL-0045
name: CSS Architecture
category: skills
tags: [css, tailwind, styling, architecture, design-tokens, modules, organization]
capabilities: [style-organization, naming-conventions, specificity-management, token-systems, css-strategy]
useWhen:
  - choosing a CSS approach for a new project
  - organizing stylesheets to prevent specificity conflicts
  - setting up design tokens or a theming system
  - migrating from one CSS approach to another
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0048, SKL-0020, PAT-0006]
dependencies: []
synonyms: ["how should I organize my CSS", "tailwind or CSS modules which is better", "my styles keep overriding each other", "how to set up design tokens", "my CSS is a mess and I need to fix it"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# CSS Architecture

Pick a CSS strategy, organize it cleanly, and never fight specificity wars again.

## Approach Comparison

| Approach | Best For | Trade-off |
|----------|----------|-----------|
| **Utility-first (Tailwind)** | Rapid prototyping, consistent spacing/color | Verbose class lists, learning curve |
| **CSS Modules** | Component isolation, team projects | Extra file per component, no global utilities |
| **CSS-in-JS (styled-components)** | Dynamic styles based on props | Runtime cost, bundle size, React-only |
| **Vanilla CSS + BEM** | Simple projects, no build tools | Manual discipline required, no scoping |

## Recommended: Utility-First + Component Layer

For most React/Next.js projects, use Tailwind for layout and spacing, with a component layer for complex or reusable styles.

### File Organization

```
styles/
  globals.css          # Tailwind directives, CSS reset, custom properties
  tokens.css           # Design tokens as CSS custom properties
components/
  Button/
    Button.tsx
    Button.module.css  # Only if Tailwind classes get unwieldy
```

### Design Tokens as CSS Custom Properties

```css
:root {
  --color-primary: #2563eb;
  --color-surface: #ffffff;
  --radius-md: 0.5rem;
  --space-4: 1rem;
  --font-body: 'Inter', sans-serif;
}
```

Reference tokens in Tailwind config or CSS modules. Never hardcode hex values in components.

## Naming Conventions

| Approach | Convention | Example |
|----------|-----------|---------|
| BEM | block__element--modifier | `.card__title--highlighted` |
| CSS Modules | camelCase | `styles.cardTitle` |
| Tailwind | Utility classes | `text-lg font-bold text-gray-900` |

## Avoiding Specificity Wars

1. **Never use `!important`** unless overriding third-party CSS.
2. **Never use ID selectors** for styling.
3. **Keep nesting to 2 levels max** in preprocessors.
4. **Use CSS Modules or Tailwind** for automatic scoping.
5. **Order your stylesheet layers:** reset, tokens, base, components, utilities.

## CSS Layer Order (if using `@layer`)

```css
@layer reset, tokens, base, components, utilities;
```

Later layers beat earlier layers regardless of specificity. This eliminates most conflicts.

## Migration Checklist

When moving to a new CSS approach:

1. Audit current styles -- identify global, component, and one-off styles.
2. Extract design tokens (colors, spacing, fonts) into custom properties.
3. Migrate component-by-component, not all at once.
4. Delete old styles only after verifying the component visually.
5. Set up linting (Stylelint) to enforce the new conventions.
