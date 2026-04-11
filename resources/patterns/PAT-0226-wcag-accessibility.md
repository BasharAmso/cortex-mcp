---
id: PAT-0226
name: WCAG 2.1 AA Accessibility Standards
category: patterns
tags: [accessibility, wcag, a11y, aria, semantic-html, keyboard-navigation, screen-reader, color-contrast, responsive-design]
capabilities: [accessibility-audit, ui-quality, inclusive-design]
useWhen:
  - building or reviewing user-facing UI or web content
  - adding forms, navigation, or interactive elements
  - checking color contrast or visual design for accessibility
  - writing marketing pages, landing pages, or public-facing content
  - conducting a UI review or friction audit
estimatedTokens: 500
relatedFragments: [SKL-0005, SKL-0023, PAT-0222]
dependencies: []
synonyms: ["make my site accessible", "wcag compliance", "accessibility checklist", "screen reader support", "keyboard navigation", "color contrast check", "a11y audit", "aria attributes"]
lastUpdated: "2026-04-11"
sourceUrl: "https://www.w3.org/WAI/WCAG21/quickref/"
difficulty: intermediate
owner: builder
pillar: "frontend"
---

# WCAG 2.1 AA Accessibility Standards

Apply these standards when building or reviewing user-facing UI or content.

## Core Requirements

1. **Semantic HTML** — Use headings, landmarks, lists, and ARIA attributes correctly.
2. **Keyboard Navigation** — All interactive elements keyboard-accessible with visible focus indicators.
3. **Color Contrast** — Minimum 4.5:1 for normal text, 3:1 for large text.
4. **Alt Text** — All images have meaningful `alt` (or `alt=""` for decorative).
5. **Form Labels** — All inputs have associated `<label>` elements.
6. **Screen Reader** — Logical reading order and live region announcements.
7. **Motion** — Respect `prefers-reduced-motion`; no auto-playing media.
8. **Responsive** — Usable at 200% zoom and on mobile viewports.

## Quick-Check Matrix

| Element | Check | Standard |
|---------|-------|----------|
| Images | `alt` attribute present | WCAG 1.1.1 |
| Links | Descriptive link text (no "click here") | WCAG 2.4.4 |
| Forms | Labels and error messages | WCAG 1.3.1, 3.3.2 |
| Color | Not sole means of conveying info | WCAG 1.4.1 |
| Focus | Visible focus indicator | WCAG 2.4.7 |
| Language | `lang` attribute on `<html>` | WCAG 3.1.1 |

## Content Standards

1. **Clarity** — Plain language; target 8th-grade reading level for public content.
2. **Consistency** — Uniform voice, tone, and terminology.
3. **SEO** — Proper heading hierarchy, meta descriptions, semantic markup.
4. **CTAs** — Clear, actionable, appropriately prominent.

## Guardrails

- Never approve UI that fails WCAG 2.1 AA color contrast.
- Never remove accessibility attributes to "simplify" code.
- Prefer semantic HTML over `<div>` with ARIA.
- Flag jargon without explanation in user-facing contexts.
