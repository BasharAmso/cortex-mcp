---
id: SKL-0448
name: "Color Palettes: E-commerce"
category: skills
tags: [color-palette, ecommerce, shopping, retail, marketplace, conversion, cta, wcag]
capabilities: [select-color-palette, apply-brand-colors, ensure-contrast-compliance]
useWhen:
  - "Building an e-commerce store, marketplace, or product catalog and need colors that drive conversions."
  - "Designing a shopping experience where product images should be the hero, not the chrome."
  - "Need high-contrast CTA colors that stand out without clashing with product photography."
estimatedTokens: 430
relatedFragments: [SKL-0055, SKL-0445, SKL-0005]
dependencies: []
synonyms:
  - "what colors for an online store"
  - "e-commerce color palette"
  - "shopping app color scheme"
  - "marketplace design colors"
  - "colors that convert for retail"
sourceUrl: ""
lastUpdated: "2026-04-06"
difficulty: beginner
owner: "designer"
pillar: "ux-design"
---

# Color Palettes: E-commerce & Retail

Palettes for online stores, marketplaces, and product catalogs. E-commerce UI should fade behind the product. Neutral chrome, bold CTAs.

## Palette 1: Clean Neutral (product-first)

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#18181B` | Navigation, headers |
| CTA | `#2563EB` | Add to cart, buy now, primary actions |
| CTA Hover | `#1D4ED8` | Hover state for CTAs |
| Accent | `#F59E0B` | Sale badges, ratings stars |
| Background | `#FFFFFF` | Page background (products pop on white) |
| Surface | `#F4F4F5` | Category cards, filter panels |
| Text | `#18181B` | Body text (15.4:1 on white) |
| Text Secondary | `#71717A` | Prices, specs (4.7:1 on white) |
| Sale | `#DC2626` | Discount labels, clearance |
| Success | `#16A34A` | In stock, order confirmed |

**Dark mode:** Background `#18181B`, Surface `#27272A`, Text `#FAFAFA`

## Palette 2: Warm Luxury (fashion/lifestyle)

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#292524` | Navigation, typography |
| CTA | `#92400E` | Add to cart (warm, inviting) |
| Accent | `#D4A574` | Gold accents, premium labels |
| Background | `#FAF9F7` | Warm white background |
| Surface | `#F5F5F4` | Cards |
| Text | `#1C1917` | Body text |
| Sale | `#B91C1C` | Discounts |

**Dark mode:** Background `#1C1917`, Surface `#292524`, Text `#FAFAF9`

## Palette 3: Bold Marketplace (multi-vendor)

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#7C3AED` | Brand, navigation |
| CTA | `#EA580C` | High-contrast buy button |
| Accent | `#0891B2` | Seller badges, categories |
| Background | `#FAFAFA` | Page background |
| Surface | `#FFFFFF` | Product cards |
| Text | `#171717` | Body text |
| Sale | `#DC2626` | Discounts |

**Dark mode:** Background `#171717`, Surface `#262626`, Text `#FAFAFA`

## E-commerce-Specific Rules

- **CTA must be the loudest color on the page.** If the "Add to Cart" button doesn't jump off the screen, the palette is wrong.
- **Keep the chrome neutral.** Navigation, filters, and layout should never compete with product images.
- **Sale/discount = red.** This is universal. Don't try to rebrand urgency.
- **Star ratings = amber/gold** (`#F59E0B` or similar). Don't use other colors for stars.
- **Price typography** matters more than price color. Use font weight, not color, to distinguish sale from original price.
