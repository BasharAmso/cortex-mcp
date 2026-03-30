---
id: SKL-0112
name: Tailwind CSS Patterns
category: skills
tags: [tailwind, css, utility-first, responsive-design, dark-mode, theming, component-extraction, design-system]
capabilities: [utility-styling, responsive-layouts, dark-mode, custom-themes, component-patterns]
useWhen:
  - styling components with Tailwind CSS utility classes
  - implementing responsive layouts across breakpoints
  - adding dark mode support to a web app
  - customizing Tailwind theme with brand tokens
  - extracting reusable component patterns from utility classes
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0013, PAT-0006]
dependencies: []
synonyms: ["how to use Tailwind CSS", "Tailwind responsive design", "dark mode with Tailwind", "Tailwind custom theme", "when to extract Tailwind components", "utility-first CSS"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/tailwindlabs/tailwindcss"
difficulty: beginner
---

# Tailwind CSS Patterns

Style web interfaces with utility-first CSS classes. Compose styles directly in markup instead of writing custom CSS. Tailwind purges unused classes in production for minimal bundle size.

## Utility-First Workflow

1. **Start with utilities.** Build the component entirely with utility classes. Avoid writing custom CSS until you have a working design.
2. **Responsive mobile-first.** Unprefixed utilities apply to all screens. Use `sm:`, `md:`, `lg:`, `xl:` for progressively larger breakpoints.
3. **State variants.** Apply `hover:`, `focus:`, `active:`, `disabled:` prefixes for interactive states. Chain them: `hover:bg-blue-600 focus:ring-2`.
4. **Group and peer modifiers.** Use `group-hover:` for parent-triggered styles and `peer-checked:` for sibling-based styling.

## Responsive Design

| Breakpoint | Min Width | Typical Device |
|-----------|-----------|----------------|
| (default) | 0px | Mobile |
| `sm:` | 640px | Large phone/small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

Design mobile-first: start with the default (smallest) and layer up.

## Dark Mode

Enable with `darkMode: 'class'` in config (recommended) or `'media'` for system preference. Apply dark variants: `dark:bg-gray-900 dark:text-white`. Toggle the `dark` class on `<html>` for manual control.

## Custom Theme

Extend the default theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f0f9ff', 500: '#3b82f6', 900: '#1e3a5f' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

Use CSS variables for runtime theming: define variables in `:root`, reference in config with `var(--color-brand)`.

## Component Extraction Rules

| Signal | Action |
|--------|--------|
| Same utility string repeated 3+ times | Extract to a component (React/Vue/Svelte component) |
| 10+ utilities on one element | Extract with `@apply` in a CSS class (use sparingly) |
| Design token shared across project | Add to `theme.extend` in config |

Prefer framework components over `@apply`. The `@apply` directive loses Tailwind's co-location advantage.

## Anti-Patterns

- Writing custom CSS for things Tailwind already handles (margins, padding, colors).
- Using `@apply` extensively, recreating a BEM-style system inside Tailwind.
- Hardcoding pixel values instead of using the spacing scale (`p-4` not `p-[17px]`).
- Ignoring the `prose` class from `@tailwindcss/typography` for rich text content.
