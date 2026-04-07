---
id: SKL-0446
name: "Color Palettes: Fintech"
category: skills
tags: [color-palette, fintech, banking, finance, payments, trust, security, wcag]
capabilities: [select-color-palette, apply-brand-colors, ensure-contrast-compliance]
useWhen:
  - "Building a banking app, payment platform, or financial dashboard and need colors that convey trust and security."
  - "Designing a fintech product where users handle money and need to feel confident in the interface."
  - "Need WCAG-compliant palettes specifically suited to financial data visualization."
estimatedTokens: 450
relatedFragments: [SKL-0055, SKL-0445, SKL-0005]
dependencies: []
synonyms:
  - "what colors for a banking app"
  - "fintech color palette"
  - "color scheme for payment platform"
  - "financial dashboard colors"
  - "colors that convey trust and security"
sourceUrl: ""
lastUpdated: "2026-04-06"
difficulty: beginner
owner: "designer"
pillar: "ux-design"
---

# Color Palettes: Fintech & Finance

Palettes for banking, payments, investing, and financial tools. Finance demands trust, clarity, and zero ambiguity in positive/negative states.

## Palette 1: Navy Authority

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#1E3A5F` | Navigation, headers, trust elements |
| Primary Light | `#2563EB` | Links, interactive elements |
| Accent | `#10B981` | Positive values, gains, success |
| Background | `#F8FAFC` | Page background |
| Surface | `#FFFFFF` | Cards, account panels |
| Text | `#0F172A` | Body text (13.8:1 on white) |
| Text Secondary | `#475569` | Labels, timestamps (6.1:1 on white) |
| Positive | `#16A34A` | Money in, gains, positive balance |
| Negative | `#DC2626` | Money out, losses, alerts |
| Warning | `#D97706` | Pending, requires attention |

**Dark mode:** Background `#0C1220`, Surface `#162032`, Text `#E2E8F0`

## Palette 2: Slate Minimal

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#334155` | Navigation, primary actions |
| Accent | `#6366F1` | Premium features, insights |
| Background | `#FAFAFA` | Page background |
| Surface | `#FFFFFF` | Cards |
| Text | `#0F172A` | Body text |
| Positive | `#059669` | Gains |
| Negative | `#E11D48` | Losses |

**Dark mode:** Background `#0F172A`, Surface `#1E293B`, Text `#F1F5F9`

## Palette 3: Teal Trust (neobank style)

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#0D9488` | Brand, CTAs |
| Accent | `#F59E0B` | Rewards, points, highlights |
| Background | `#F0FDFA` | Tinted background |
| Surface | `#FFFFFF` | Cards |
| Text | `#134E4A` | Body text (7.5:1 on white) |
| Positive | `#16A34A` | Income, gains |
| Negative | `#DC2626` | Expenses, losses |

**Dark mode:** Background `#042F2E`, Surface `#0F3D3C`, Text `#CCFBF1`

## Finance-Specific Rules

- **Never use red/green alone** to indicate positive/negative. Always pair with icons (arrow up/down) or labels. Color blindness affects ~8% of males.
- **Positive = green, Negative = red** is universal in Western finance. Don't get creative with this.
- **Money amounts** need high contrast. Use primary text color, never secondary.
- **Charts:** Use the primary + accent + 2-3 muted tones. Avoid rainbow chart palettes.
