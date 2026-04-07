---
id: SKL-0450
name: "Font Pairings by Mood"
category: skills
tags: [typography, font-pairing, google-fonts, heading, body, design-system, readability]
capabilities: [select-font-pairing, apply-typography, build-type-scale]
useWhen:
  - "Starting a new project and need to pick a heading + body font combination."
  - "Want a curated Google Font pairing that matches the project's tone (professional, playful, editorial, etc.)."
  - "Building a design system and need a typographic foundation with proven pairings."
estimatedTokens: 500
relatedFragments: [SKL-0056, SKL-0055, SKL-0005]
dependencies: []
synonyms:
  - "what fonts should I use"
  - "good font pairing for my app"
  - "google font combinations"
  - "heading and body font"
  - "typography for my project"
  - "font pairing recommendations"
sourceUrl: ""
lastUpdated: "2026-04-06"
difficulty: beginner
owner: "designer"
pillar: "ux-design"
---

# Font Pairings by Mood

Curated Google Font pairings organized by project tone. Every pairing listed has been tested for readability at body size and visual contrast at heading size.

## Corporate / Professional

| Heading | Body | Vibe |
|---------|------|------|
| **Inter** (600-700) | **Inter** (400) | Clean, neutral, universal. The safe choice that never looks wrong. |
| **Plus Jakarta Sans** (700) | **Inter** (400) | Modern corporate with slightly more personality than pure Inter. |
| **Outfit** (600) | **Source Sans 3** (400) | Geometric precision. Good for dashboards and data-heavy interfaces. |

## Editorial / Content

| Heading | Body | Vibe |
|---------|------|------|
| **Playfair Display** (700) | **Source Serif 4** (400) | Classic editorial. Elegant headlines, readable long-form. |
| **Fraunces** (700) | **Literata** (400) | Warm editorial with old-style numerals. Blog, magazine, publishing. |
| **Libre Baskerville** (700) | **Source Sans 3** (400) | Serif headlines + sans body. Traditional authority with modern readability. |

## Playful / Friendly

| Heading | Body | Vibe |
|---------|------|------|
| **Fredoka** (600) | **Nunito** (400) | Rounded, warm, approachable. Kids apps, casual products, onboarding. |
| **Baloo 2** (700) | **Quicksand** (400) | Bubbly and fun. Games, education, community platforms. |
| **Comfortaa** (700) | **Nunito Sans** (400) | Geometric rounded. Friendly but not childish. |

## Technical / Developer

| Heading | Body | Vibe |
|---------|------|------|
| **Space Grotesk** (700) | **IBM Plex Sans** (400) | Technical precision with character. Dev tools, documentation. |
| **JetBrains Mono** (700) | **Inter** (400) | Monospace headlines signal "built for developers." |
| **Manrope** (700) | **IBM Plex Sans** (400) | Geometric, modern, slightly techy. API products, developer platforms. |

## Luxury / Premium

| Heading | Body | Vibe |
|---------|------|------|
| **Cormorant Garamond** (600) | **Montserrat** (400) | High contrast serif + clean geometric. Fashion, luxury, fine dining. |
| **DM Serif Display** (400) | **DM Sans** (400) | Same family, serif/sans contrast. Elegant and cohesive. |
| **Instrument Serif** (400) | **Instrument Sans** (400) | Matching family with editorial flair. Premium SaaS, creative agencies. |

## How to Apply

1. **Load only 2 fonts** (heading + body). If same family, load 1.
2. **Heading weights:** 600-700 for sans-serif, 400-600 for serif (serifs look heavier at the same weight).
3. **Body weight:** Always 400. Never bold body text.
4. **Size scale:** Use a ratio (1.25 for compact UI, 1.333 for content-heavy, 1.5 for editorial). Heading sizes: base * ratio^n.
5. **Line height:** Body 1.5-1.7, headings 1.1-1.3. Tighter headings + relaxed body creates rhythm.
6. **Letter spacing:** Uppercase labels +0.05em. Large headings can go -0.01em to -0.02em.
