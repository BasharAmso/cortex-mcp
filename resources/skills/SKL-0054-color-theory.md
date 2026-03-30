---
id: SKL-0054
name: Color Theory for Devs
category: skills
tags: [color, palette, contrast, dark-mode, design, accessibility, css]
capabilities: [palette-generation, contrast-checking, color-harmony, dark-mode-adaptation, brand-color-selection]
useWhen:
  - choosing colors for a new project or feature
  - building a color palette from a single brand color
  - checking or fixing color contrast for accessibility
  - adapting a light theme to dark mode
  - picking colors that actually look good together
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0059]
dependencies: []
synonyms: ["how do I pick colors for my app", "my colors look ugly together", "what colors go with this brand color", "make my color palette not look terrible", "how to choose good colors for a website"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Color Theory for Devs

Pick colors that work together, pass accessibility checks, and adapt to dark mode. No design degree required.

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
| **Primary light** | L → 95% | `hsl(217, 91%, 95%)` — backgrounds |
| **Primary dark** | L → 35% | `hsl(217, 91%, 35%)` — hover states |
| **Accent** | Shift H by 30-60 degrees | `hsl(260, 80%, 60%)` — purple complement |
| **Neutral 50** | Same H, S → 5-10%, L → 97% | `hsl(217, 8%, 97%)` — page bg |
| **Neutral 900** | Same H, S → 5-10%, L → 12% | `hsl(217, 8%, 12%)` — body text |
| **Success** | H → 142 | `hsl(142, 72%, 45%)` |
| **Warning** | H → 38 | `hsl(38, 95%, 55%)` |
| **Danger** | H → 0 | `hsl(0, 84%, 60%)` |

## Color Harmony Patterns

| Pattern | Rule | When to Use |
|---------|------|------------|
| **Monochromatic** | One hue, vary S and L | Safe, professional, hard to mess up |
| **Analogous** | Adjacent hues (30 degrees apart) | Warm/cool palettes, feels cohesive |
| **Complementary** | Opposite hues (180 degrees) | High contrast CTAs against backgrounds |
| **Split-complementary** | Base + two adjacent to complement | Vibrant but balanced |

## Contrast Checklist

- [ ] Body text on background: minimum 4.5:1 ratio (WCAG AA)
- [ ] Large text (18px+ bold, 24px+ normal): minimum 3:1
- [ ] Interactive elements against background: minimum 3:1
- [ ] Never rely on color alone to convey meaning (add icons or text)
- [ ] Test with a contrast checker: plug in foreground and background HSL values

## Dark Mode Color Adaptation

Do NOT just invert your colors. Instead:

1. **Flip lightness:** Light backgrounds (L: 95-100%) become dark (L: 8-12%). Dark text (L: 10-15%) becomes light (L: 85-90%).
2. **Reduce saturation:** Vivid colors that work on white feel harsh on dark. Drop S by 10-20%.
3. **Avoid pure black:** Use `hsl(H, 5%, 8%)` instead of `#000`. Pure black creates harsh edges.
4. **Elevate with lightness:** Instead of shadows, slightly increase background lightness for elevated surfaces (cards, modals).

## Common Mistakes

- Using too many colors (stick to 1 primary + 1 accent + neutrals + semantic)
- Picking saturated colors for large background areas (they vibrate on screen)
- Gray without a hue tint (pure gray looks lifeless; tint it with your brand hue at 3-8% saturation)
- Ignoring how colors look on both light and dark backgrounds
