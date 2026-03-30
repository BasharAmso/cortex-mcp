---
id: SKL-0046
name: CSS Architecture
category: skills
tags: [css, tailwind, styling, architecture, bem, modules, organization, postcss, sass, specificity]
capabilities: [style-organization, naming-conventions, specificity-management, token-systems, css-strategy]
useWhen:
  - choosing a CSS approach for a new project
  - organizing stylesheets to prevent specificity conflicts
  - setting up design tokens or a theming system
  - migrating from one CSS approach to another
  - establishing a team-wide CSS convention
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0049, SKL-0023, PAT-0006]
dependencies: []
synonyms: ["how should I organize my CSS", "tailwind or CSS modules which is better", "my styles keep overriding each other", "how to set up design tokens", "my CSS is a mess and I need to fix it"]
sourceUrl: "https://github.com/awesome-css-group/awesome-css"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
---

# CSS Architecture

Pick a CSS strategy, organize it cleanly, and never fight specificity wars again.

## Methodology Comparison

| Methodology | Core Idea | Best For | Trade-off |
|-------------|-----------|----------|-----------|
| **BEM** | Block__Element--Modifier naming | Vanilla CSS, server-rendered apps | Manual discipline, verbose class names |
| **OOCSS** | Separate structure from skin | Large-scale sites with reusable patterns | Requires upfront planning |
| **SMACSS** | Categorize rules (base, layout, module, state, theme) | Team projects needing clear organization | Learning curve for categories |
| **ITCSS** | Inverted triangle by specificity (settings > tools > generic > elements > objects > components > utilities) | Enterprise codebases | Over-engineered for small projects |
| **Utility-first (Tailwind)** | Composable utility classes | Rapid prototyping, consistent design | Verbose class lists, learning curve |
| **CSS Modules** | Locally scoped class names via build tool | Component isolation in React/Vue | Extra file per component |

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

## Preprocessor and Tooling Selection

| Tool | Role | When to Use |
|------|------|-------------|
| **PostCSS** | Plugin-based CSS transforms | Always (Tailwind uses it, handles autoprefixer) |
| **Sass** | Nesting, mixins, partials | Legacy projects, complex theming without Tailwind |
| **Vanilla Extract** | Type-safe CSS in TypeScript | TypeScript-heavy projects needing static extraction |
| **Styled Components** | CSS-in-JS with dynamic props | Existing projects already using it (avoid for new) |

## Avoiding Specificity Wars

1. **Never use `!important`** unless overriding third-party CSS.
2. **Never use ID selectors** for styling.
3. **Keep nesting to 2 levels max** in preprocessors.
4. **Use CSS Modules or Tailwind** for automatic scoping.
5. **Order stylesheet layers:** reset, tokens, base, components, utilities.

## CSS Cascade Layers

```css
@layer reset, tokens, base, components, utilities;
```

Later layers beat earlier layers regardless of specificity. This eliminates most conflicts and is the modern replacement for ITCSS ordering.

## Naming Conventions

| Approach | Convention | Example |
|----------|-----------|---------|
| BEM | block__element--modifier | `.card__title--highlighted` |
| SUIT CSS | ComponentName-descendant--modifier | `.Card-title--active` |
| CSS Modules | camelCase | `styles.cardTitle` |
| Tailwind | Utility classes | `text-lg font-bold text-gray-900` |

## Migration Checklist

1. Audit current styles: identify global, component, and one-off styles.
2. Extract design tokens (colors, spacing, fonts) into CSS custom properties.
3. Migrate component-by-component, not all at once.
4. Delete old styles only after visual verification.
5. Set up Stylelint to enforce the new conventions.
