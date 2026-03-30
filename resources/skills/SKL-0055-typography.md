---
id: SKL-0055
name: Typography
category: skills
tags: [typography, fonts, type-scale, responsive, css, design, readability, google-fonts, variable-fonts, font-pairing]
capabilities: [font-pairing, type-scale-generation, responsive-sizing, web-font-loading, line-height-tuning]
useWhen:
  - choosing fonts for a new project
  - setting up a type scale system
  - making text responsive across screen sizes
  - fixing text that feels off but you cannot explain why
  - optimizing web font loading performance
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0020, SKL-0048, SKL-0054]
dependencies: []
synonyms: ["what font should I use for my app", "my text looks weird and I dont know why", "how to make fonts look good on mobile", "pick fonts that go together", "my headings and body text dont match"]
sourceUrl: "https://github.com/gztchan/awesome-design"
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Typography

Make text look intentional. Good typography is the single fastest way to make a dev project look designed.

## Font Selection Resources

| Resource | Purpose |
|----------|---------|
| **Google Fonts** | Free, open-source typeface library (the default starting point) |
| **Font Squirrel** | 100% free for commercial use |
| **Typewolf** | What is trending in type, real-world usage examples |
| **Fonts in Use** | Typography indexed by typeface, format, and industry |
| **Butterick's Practical Typography** | Comprehensive methodology for developers |

## Font Pairing Rules

Pick two fonts maximum. One for headings, one for body.

| Pairing Strategy | Example | Why It Works |
|-----------------|---------|-------------|
| **Sans + Sans** | Inter (headings) + Inter (body) | Safe default, one font does everything |
| **Serif + Sans** | Playfair Display + Inter | Classic contrast, editorial feel |
| **Geometric + Humanist** | Poppins + Source Sans 3 | Modern headings, readable body |
| **Monospace accent** | JetBrains Mono for code/data | Technical products, dashboards |

**Safe defaults if you cannot decide:** Inter, system-ui, or Geist for body. Same font at heavier weight for headings.

## Type Scale System

Use a ratio to generate consistent sizes. Do not pick sizes randomly.

| Scale Name | Ratio | Good For |
|-----------|-------|----------|
| Minor Third | 1.2 | Compact UIs, dashboards, mobile |
| Major Third | 1.25 | General purpose (recommended start) |
| Perfect Fourth | 1.333 | Marketing pages, editorial |
| Golden Ratio | 1.618 | Hero sections, dramatic headings |

**Base size:** 16px (browser default, never go smaller for body text).

| Step | Major Third (1.25) | Use For |
|------|-------------------|---------|
| xs | 12.8px (0.8rem) | Captions, labels |
| sm | 14px (0.875rem) | Secondary text, metadata |
| base | 16px (1rem) | Body text |
| lg | 20px (1.25rem) | Lead paragraphs, card titles |
| xl | 25px (1.563rem) | Section headings (H3) |
| 2xl | 31.25px (1.953rem) | Page headings (H2) |
| 3xl | 39px (2.441rem) | Hero headings (H1) |

## Responsive Font Sizing with Clamp

```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); }
body { font-size: clamp(1rem, 1.2vw, 1.125rem); }
```

## Line Height and Spacing

| Element | Line Height | Letter Spacing |
|---------|------------|----------------|
| Body text | 1.5 - 1.7 | 0 (default) |
| Headings | 1.1 - 1.3 | -0.01em to -0.03em (tighten) |
| Captions/labels | 1.4 | 0.02em to 0.05em (loosen) |
| ALL CAPS text | 1.2 | 0.05em to 0.1em (always loosen) |

**Measure (line length):** Keep body text between 45-75 characters per line. Use `max-width: 65ch`.

## Web Font Loading Strategy

1. **Preload** critical fonts in HTML `<head>` with `rel="preload"`.
2. **Use `font-display: swap`** to prevent invisible text during loading.
3. **Set system font fallback** with similar metrics.
4. **Use variable fonts** (one file for all weights) to reduce requests.
5. **Self-host** instead of Google Fonts for privacy and speed.
6. **Limit to 2 font families** maximum.

## Quick Diagnosis

| Symptom | Fix |
|---------|-----|
| Text feels cramped | Increase line-height to 1.6, add paragraph margin |
| Headings feel disconnected | Tighten letter-spacing (-0.02em), reduce line-height to 1.2 |
| Everything looks same importance | Increase scale ratio or add weight contrast |
| Body text is hard to read | Check line length (max 65ch) and size (min 16px) |
| Page feels unprofessional | Probably 3+ fonts. Cut to 1-2. |
