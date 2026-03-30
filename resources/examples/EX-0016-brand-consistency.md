---
id: EX-0016
name: Brand Visual Consistency
category: examples
tags: [brand, style-guide, visual-identity, canva, figma, colors, typography, templates, content-creation]
capabilities: [brand-kit-setup, template-creation, cross-platform-visual-identity]
useWhen:
  - setting up a brand kit with colors, fonts, and logo guidelines
  - creating reusable templates in Canva or Figma
  - building a lightweight style guide for content creators
  - maintaining visual consistency across multiple platforms at scale
estimatedTokens: 750
relatedFragments: [SKL-0091, EX-0014, EX-0015]
dependencies: []
synonyms: ["how to keep my brand consistent", "brand kit setup guide", "style guide for social media", "how to make templates in canva", "visual identity across platforms"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Brand Visual Consistency

How to define, document, and enforce a visual identity so every piece of content looks like it belongs to the same brand.

## Brand Kit Setup

Every brand kit needs five elements:

### 1. Color Palette

Define exactly these roles:

| Role | Example | Usage |
|------|---------|-------|
| Primary | #2563EB (blue) | Headers, buttons, key accents |
| Secondary | #F59E0B (amber) | Highlights, callouts, CTAs |
| Neutral dark | #1E293B (slate) | Body text, borders |
| Neutral light | #F8FAFC (off-white) | Backgrounds, cards |
| Alert/accent | #EF4444 (red) | Errors, warnings, urgent badges |

Store hex values, RGB, and HSL. Include WCAG contrast ratios for each text/background pairing. Minimum 4.5:1 for body text, 3:1 for large text.

### 2. Typography

Pick two fonts maximum:

- **Heading font** -- a distinctive sans-serif (Inter, Plus Jakarta Sans, or Satoshi).
- **Body font** -- a highly readable serif or sans-serif (Source Sans 3, Lora, or system font stack).
- **Sizes:** H1 = 32-40px, H2 = 24-28px, H3 = 18-22px, Body = 16px, Caption = 14px.
- **Line height:** 1.5 for body, 1.2 for headings.

### 3. Logo Usage

Document minimum clear space (usually 1x the logo mark height around all sides), minimum display size (typically 24px height for digital), and what NOT to do (stretch, recolor, place on busy backgrounds).

### 4. Image Style

Define the visual tone: photography vs. illustration, warm vs. cool, candid vs. staged. Pick one direction and reference 3-5 example images.

### 5. Graphic Elements

Consistent use of: rounded vs. sharp corners, line weight for icons, shadow depth, border radius. Small details compound into recognizable identity.

## Template Creation

### In Canva

1. Go to **Brand Kit** (requires Canva Pro) and upload colors, fonts, and logos.
2. Create one master template per content type:
   - LinkedIn post (1200 x 1200)
   - Twitter/X header (1500 x 500)
   - Instagram story (1080 x 1920)
   - YouTube thumbnail (1280 x 720)
   - Presentation slide (1920 x 1080)
3. Lock background layers, logo placement, and font styles. Leave text and image areas editable.
4. Save each as a **Brand Template** so team members can duplicate without altering the original.

### In Figma

1. Create a **Brand Library** file with:
   - Color styles (Primary/500, Primary/100, etc.)
   - Text styles (H1, H2, Body, Caption with font, size, weight, line-height)
   - Component variants for buttons, cards, banners, and social post frames
2. Publish as a **Team Library** so all project files pull from one source of truth.
3. Use **Auto Layout** on template frames so content reflows cleanly when text length changes.
4. Add **annotations** on each component explaining when and how to use it.

## Style Guide Essentials

A lightweight style guide fits on one page:

```
BRAND STYLE GUIDE -- [Brand Name]

COLORS       Primary: #2563EB | Secondary: #F59E0B | Dark: #1E293B | Light: #F8FAFC
FONTS        Headings: Plus Jakarta Sans Bold | Body: Source Sans 3 Regular
LOGO         Min size: 24px height | Clear space: 1x mark height | No recoloring
TONE         Warm, direct, encouraging (see tone profile for copy guidelines)
IMAGES       Candid photography, warm lighting, real people over stock
CORNERS      8px border radius on cards and buttons
ICONS        Lucide set, 1.5px stroke, 24px grid
```

## Cross-Platform Visual Identity

| Element | LinkedIn | Twitter/X | YouTube | Instagram |
|---------|----------|-----------|---------|-----------|
| Profile photo | Logo mark, 400x400 | Same logo mark | Same logo mark | Same logo mark |
| Banner | Brand tagline + colors | Shortened tagline | Channel art with schedule | N/A (use highlights) |
| Post template | 1200x1200 branded frame | 1200x675 card | 1280x720 thumbnail | 1080x1080 feed post |
| Color usage | Primary headers, neutral body | Accent on key text | High contrast for thumbnails | Full palette allowed |

## Maintaining Consistency at Scale

1. **Single source of truth** -- one Figma library or Canva Brand Kit. Never duplicate style definitions.
2. **Template-first workflow** -- creators start from a template, never from a blank canvas.
3. **Batch create** -- design a week or month of content in one session to maintain visual rhythm.
4. **Audit quarterly** -- screenshot 10 recent posts side by side. If any look like they come from a different brand, update the template or retrain the creator.
5. **Automate where possible** -- use Canva Bulk Create or Figma plugins to generate variants from a data source (CSV of post titles, stats, dates).

## Key Points

- **Two fonts, five colors** -- constraints create recognition faster than variety
- **Templates prevent drift** -- every new content piece should start from an approved template
- **Lock what matters** -- logo position, font choices, and color palette are non-negotiable; imagery and copy flex
- **Test across platforms** -- a brand kit designed only for LinkedIn may look wrong on Instagram; verify each format
- **Document the "don'ts"** -- showing what NOT to do prevents more mistakes than showing what to do
