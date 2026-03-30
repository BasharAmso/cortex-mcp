---
id: SKL-0055
name: Color Theory for Devs
category: skills
tags: [color, palette, contrast, dark-mode, design, accessibility, css, hsl, coolors, brand-colors]
capabilities: [palette-generation, contrast-checking, color-harmony, dark-mode-adaptation, brand-color-selection]
useWhen:
  - choosing colors for a new project or feature
  - building a color palette from a single brand color
  - checking or fixing color contrast for accessibility
  - adapting a light theme to dark mode
  - picking colors that actually look good together
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0023, SKL-0049, SKL-0060]
dependencies: []
synonyms: ["how do I pick colors for my app", "my colors look ugly together", "what colors go with this brand color", "make my color palette not look terrible", "how to choose good colors for a website"]
sourceUrl: "https://github.com/gztchan/awesome-design"
lastUpdated: "2026-03-29"
difficulty: beginner
owner: designer
---

# Color Theory for Devs

Pick colors that work together, pass accessibility checks, and adapt to dark mode. No design degree required.

## Essential Color Tools

| Tool | Purpose | URL |
|------|---------|-----|
| **Coolors** | Fast palette generation from a seed color | coolors.co |
| **Color Hunt** | Curated hand-picked palettes | colorhunt.co |
| **Paletton** | Color harmony generator (complementary, triadic) | paletton.com |
| **Palettable** | Palette building via like/dislike | palettable.io |
| **uiGradients** | Ready-made gradient combinations | uigradients.com |
| **Realtime Colors** | Preview palette on a live website layout | realtimecolors.com |

## Think in HSL, Not Hex

Hex codes (`#3B82F6`) are unreadable. HSL (`hsl(217, 91%, 60%)`) lets you reason about color:

| Component | What It Controls | Dev Intuition |
|-----------|-----------------|---------------|
| **H** (Hue) | The color itself | 0=red, 120=green, 210=blue, 270=purple |
| **S** (Saturation) | Intensity | 0%=gray, 100%=vivid. UI text: 5-15%. Buttons: 70-90%. |
| **L** (Lightness) | Brightness | 0%=black, 100%=white. Generate shades by varying only this. |

**Key insight:** To create a shade scale from one color, keep H and S fixed, vary L from 95% (lightest) down to 15% (darkest).

## Quick Palette Recipe

Start with ONE brand color. Build everything from it:

| Role | How to Derive | Example (brand H=217) |
|------|--------------|----------------------|
| **Primary** | Your brand color | `hsl(217, 91%, 60%)` |
| **Primary light** | L to 95% | `hsl(217, 91%, 95%)` |
| **Primary dark** | L to 35% | `hsl(217, 91%, 35%)` |
| **Accent** | Shift H by 30-60 degrees | `hsl(260, 80%, 60%)` |
| **Neutral 50** | Same H, S to 5-10%, L to 97% | `hsl(217, 8%, 97%)` |
| **Neutral 900** | Same H, S to 5-10%, L to 12% | `hsl(217, 8%, 12%)` |
| **Success** | H to 142 | `hsl(142, 72%, 45%)` |
| **Warning** | H to 38 | `hsl(38, 95%, 55%)` |
| **Danger** | H to 0 | `hsl(0, 84%, 60%)` |

## Color Harmony Patterns

| Pattern | Rule | When to Use |
|---------|------|------------|
| **Monochromatic** | One hue, vary S and L | Safe, professional, hard to mess up |
| **Analogous** | Adjacent hues (30 degrees apart) | Warm/cool palettes, feels cohesive |
| **Complementary** | Opposite hues (180 degrees) | High contrast CTAs against backgrounds |
| **Split-complementary** | Base + two adjacent to complement | Vibrant but balanced |

## Contrast Checklist (WCAG AA)

- Body text on background: minimum 4.5:1 ratio
- Large text (18px+ bold, 24px+ normal): minimum 3:1
- Interactive elements against background: minimum 3:1
- Never rely on color alone to convey meaning (add icons or text)
- Test with a contrast checker: plug in foreground and background values

## Common Mistakes

- Using too many colors (stick to 1 primary + 1 accent + neutrals + semantic)
- Picking saturated colors for large background areas (they vibrate on screen)
- Gray without a hue tint (pure gray looks lifeless; tint with brand hue at 3-8% saturation)
- Ignoring how colors look on both light and dark backgrounds
