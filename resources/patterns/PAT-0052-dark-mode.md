---
id: PAT-0052
name: Dark Mode Implementation
category: patterns
tags: [dark-mode, theming, css-variables, color-scheme, accessibility, design-tokens, prefers-color-scheme]
capabilities: [dark-mode-implementation, theme-toggling, semantic-color-system, image-dark-adaptation]
useWhen:
  - adding dark mode to a web app or site
  - building a theme toggling system with user preference
  - designing semantic color tokens that work across themes
  - handling images, shadows, and charts in dark mode
  - respecting system-level color scheme preferences
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0003, PAT-0053, PAT-0048]
dependencies: []
synonyms: ["how to add dark mode", "light and dark theme toggle", "CSS dark theme implementation", "make my app work in dark mode", "theme switching", "night mode for my website"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
difficulty: intermediate
owner: builder
---

# Dark Mode Implementation

Dark mode is not just inverted colors. It requires a semantic color system, careful contrast management, and attention to images, shadows, and elevation. Done well, it reduces eye strain, saves battery on OLED screens, and signals design maturity.

## Semantic Color Tokens

Define colors by purpose, not by value. This makes theming a token swap, not a CSS rewrite.

```css
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-elevated: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-border: #e0e0e0;
  --color-accent: #2563eb;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --color-bg-primary: #121212;
  --color-bg-secondary: #1e1e1e;
  --color-bg-elevated: #2a2a2a;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-border: #333333;
  --color-accent: #60a5fa;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
}
```

Rules for dark backgrounds:
- Never use pure black (#000000). Use #121212 or similar dark gray.
- Elevation = lighter, not shadowed. Higher surfaces get slightly lighter backgrounds.
- Reduce shadow opacity (shadows are less visible on dark backgrounds).

## System Preference Detection

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* dark token values here */
  }
}
```

This respects the OS setting but allows manual override. The `data-theme` attribute takes priority.

## Theme Toggle (JavaScript)

```js
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// On page load: restore preference
const saved = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (systemDark ? 'dark' : 'light'));

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
```

Three-state toggle order: System (default) > Light > Dark.

## Image Handling

| Image Type | Dark Mode Strategy |
|------------|-------------------|
| Photos | No change needed (already have natural contrast) |
| Illustrations (light bg) | Provide dark variant or add subtle background |
| Logos (dark text) | Swap to light variant or use `filter: invert(1)` |
| Screenshots | Add a subtle border to prevent blending into background |
| SVG icons | Use `currentColor` so they inherit text color |

```css
[data-theme="dark"] .invertible-image {
  filter: invert(1) hue-rotate(180deg);
}
```

Use this sparingly. Prefer providing actual dark variants for important images.

## Contrast Requirements

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Body text | 4.5:1 min on white | 4.5:1 min on dark bg |
| Large text (18px+) | 3:1 min | 3:1 min |
| Interactive elements | 3:1 against adjacent | 3:1 against adjacent |
| Accent colors | May need lighter variant | Often need lighter variant |

Test with browser DevTools contrast checker in both themes.

## Common Pitfalls

| Issue | Fix |
|-------|-----|
| Color defined as hex, not token | Use CSS custom properties for all colors |
| Hardcoded white backgrounds | Replace with `var(--color-bg-primary)` |
| Box shadows invisible in dark | Reduce shadow, increase surface lightness |
| Charts unreadable | Use theme-aware chart palettes |
| Flash of wrong theme on load | Set `data-theme` in `<head>` before render |

## Anti-Patterns

- Pure black (#000) backgrounds (harsh contrast, OLED smearing)
- Inverting all colors programmatically (breaks photos, brand colors)
- Dark mode as an afterthought (build token system from the start)
- Forgetting to test form inputs, selects, and third-party embeds
- No transition between themes (add `transition: background-color 0.2s`)
- Storing preference only in memory (lost on refresh)
