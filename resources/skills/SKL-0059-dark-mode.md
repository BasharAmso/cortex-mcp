---
id: SKL-0059
name: Dark Mode Implementation
category: skills
tags: [dark-mode, theming, colors, accessibility, css, design, user-preference]
capabilities: [color-mapping, semantic-color-system, image-adaptation, preference-detection, theme-switching]
useWhen:
  - adding dark mode to an existing app
  - planning a color system that supports both light and dark themes
  - fixing dark mode issues like low contrast or harsh colors
  - detecting and respecting user system theme preferences
  - adapting images and icons for dark backgrounds
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0048, SKL-0054, SKL-0057]
dependencies: []
synonyms: ["how do I add dark mode to my app", "my dark mode looks terrible and washed out", "make my site work in dark and light mode", "detect if user wants dark mode", "my images look wrong on dark background"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Dark Mode Implementation

Dark mode done well is a color remapping, not an inversion. Build it on semantic tokens and it becomes a variable swap.

## Color Mapping Strategy

Do NOT use `filter: invert(1)`. Build a semantic color layer that remaps per theme:

| Semantic Token | Light Value | Dark Value | Notes |
|---------------|-------------|------------|-------|
| `--color-bg` | `hsl(0, 0%, 100%)` | `hsl(220, 10%, 8%)` | NOT pure black |
| `--color-bg-elevated` | `hsl(0, 0%, 100%)` | `hsl(220, 10%, 12%)` | Cards, modals |
| `--color-bg-subtle` | `hsl(220, 15%, 96%)` | `hsl(220, 10%, 15%)` | Hover, secondary areas |
| `--color-text` | `hsl(220, 10%, 10%)` | `hsl(220, 10%, 90%)` | NOT pure white |
| `--color-text-secondary` | `hsl(220, 5%, 45%)` | `hsl(220, 5%, 60%)` | Muted text |
| `--color-border` | `hsl(220, 10%, 88%)` | `hsl(220, 10%, 20%)` | Subtle dividers |
| `--color-primary` | `hsl(217, 91%, 55%)` | `hsl(217, 85%, 65%)` | Lighter, less saturated |

## The Five Common Mistakes

### 1. Pure Black Backgrounds
`#000000` creates maximum contrast that causes eye strain. Use `hsl(220, 10%, 8%)` with a slight hue tint for warmth.

### 2. Pure White Text
`#FFFFFF` on dark backgrounds vibrates. Use `hsl(220, 10%, 90%)` for body text and reserve near-white for headings only.

### 3. Same Colors on Both Themes
Primary colors that pop on white can be dull or harsh on dark. Increase lightness by 10% and reduce saturation by 5-10% for dark mode.

### 4. Ignoring Elevation
In light mode, elevated elements use shadows. In dark mode, shadows are invisible. Instead, use progressively lighter backgrounds:
- Page: L 8%
- Card: L 12%
- Dropdown: L 16%
- Modal: L 18%

### 5. Forgetting Borders
Light mode borders at `hsl(0,0%,90%)` disappear on dark backgrounds. Every border needs a dark mode equivalent.

## Image and Icon Adaptation

| Asset Type | Light Mode | Dark Mode |
|-----------|------------|-----------|
| **Logos** | Dark version | Light/white version |
| **Icons (SVG)** | `currentColor` (inherits text color) | Works automatically |
| **Icons (PNG)** | As-is | Add `filter: brightness(0) invert(1)` or provide dark variants |
| **Photos** | As-is | Reduce brightness slightly: `filter: brightness(0.9)` |
| **Screenshots** | As-is | Add subtle border so white screenshots don't bleed into dark bg |
| **Illustrations** | Light bg variants | Dark bg variants (or reduce opacity to 0.85) |

**Best practice:** Use SVG icons with `currentColor` so they adapt automatically.

## User Preference Detection

```js
// 1. Check saved preference first, fall back to system
function getTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 2. Apply theme
document.documentElement.dataset.theme = getTheme();

// 3. Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    }
  });
```

**Priority order:** User explicit toggle > localStorage > system preference.

## CSS Structure

```css
/* Light is default */
:root {
  --color-bg: hsl(0, 0%, 100%);
  --color-text: hsl(220, 10%, 10%);
}

/* Dark via data attribute */
[data-theme="dark"] {
  --color-bg: hsl(220, 10%, 8%);
  --color-text: hsl(220, 10%, 90%);
}

/* Respect system preference if no explicit choice */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: hsl(220, 10%, 8%);
    --color-text: hsl(220, 10%, 90%);
  }
}
```

## Testing Checklist

- [ ] Body text passes 4.5:1 contrast on dark background
- [ ] No pure black (#000) backgrounds
- [ ] No pure white (#FFF) body text
- [ ] Elevated surfaces are visibly distinct from page background
- [ ] Borders are visible in both themes
- [ ] Images and logos adapt (or at minimum do not break)
- [ ] Theme persists across page navigation (localStorage)
- [ ] System preference is respected when no explicit choice is saved
- [ ] Focus indicators are visible on dark backgrounds
- [ ] Colored elements (success, warning, danger) are readable on dark
