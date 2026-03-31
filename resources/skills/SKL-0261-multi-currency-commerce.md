---
id: SKL-0261
name: Multi-Currency Commerce
category: skills
tags: [ecommerce, multi-currency, regional-pricing, tax-calculation, internationalization, price-lists]
capabilities: [currency-management, regional-pricing, price-list-design, tax-integration]
useWhen:
  - selling products in multiple currencies or regions
  - implementing region-specific pricing strategies
  - designing price lists for customer groups or wholesale tiers
  - handling currency display and rounding rules
  - integrating tax calculation with multi-currency pricing
estimatedTokens: 650
relatedFragments: [SKL-0141, PAT-0135, SKL-0257, SKL-0260]
dependencies: []
synonyms: ["how to sell in multiple currencies", "regional pricing strategy", "multi-currency ecommerce setup", "price list design for wholesale", "how to handle currency conversion in a store", "international pricing architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: advanced
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Multi-Currency Commerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0261 |
| **Name** | Multi-Currency Commerce |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Selling internationally means more than converting prices with exchange rates. Each region has its own pricing psychology, tax rules, and currency formatting conventions. A well-designed multi-currency system handles all of this without duplicating products.

### Pricing Architecture

```
Variant: "Classic T-Shirt, Size M, Blue"
└── Price Set
    ├── { amount: 2500, currency: "usd" }              // base price
    ├── { amount: 2200, currency: "eur" }              // manually set for EU
    ├── { amount: 3500, currency: "cad" }              // CAD market price
    ├── { amount: 2000, currency: "usd", list: "wholesale" }  // wholesale tier
    └── { amount: 2500, currency: "usd", min_qty: 10 }       // bulk tier
```

Each variant has a price set containing one or more prices. Prices are stored as integers in the smallest currency unit (cents for USD, pence for GBP) to avoid floating-point errors.

### Set Prices vs Convert Prices

| Strategy | How | When to Use |
|----------|-----|-------------|
| **Manually set** | Explicit price per currency | Control pricing psychology ($29.99 not $29.37) |
| **Auto-convert** | Base price x exchange rate | Quick launch in new markets |
| **Hybrid** | Auto-convert with manual overrides | Start with conversion, refine top sellers |

**Recommended:** manually set prices for your top markets. Use auto-conversion as a fallback for secondary markets. Always round to psychologically appealing price points (e.g., .99 or .00).

### Regions and Currency Assignment

A region defines the commerce context for a geographic area:

| Region Field | Purpose |
|-------------|---------|
| `currency_code` | Which currency customers see and pay in |
| `countries[]` | Which countries belong to this region |
| `tax_rate` | Default tax rate for the region |
| `tax_provider` | Service that calculates precise tax |
| `payment_providers[]` | Available payment methods for this region |
| `fulfillment_providers[]` | Available shipping for this region |

Regions let you vary not just price but the entire commerce experience by geography: different payment methods, shipping options, and tax rules per region.

### Price Lists

Price lists override standard pricing for specific contexts:

| Use Case | Price List Configuration |
|----------|------------------------|
| **Wholesale** | Customer group = "wholesale", lower prices |
| **VIP customers** | Customer group = "vip", 15% discount |
| **Flash sale** | Date-bounded, 30% off selected variants |
| **B2B contract** | Customer-specific negotiated pricing |

Price lists have higher priority than base prices. When multiple lists match, the system applies the most specific one (customer-specific beats group-level beats date-bounded).

### Currency Display Rules

| Currency | Symbol | Decimal Places | Example |
|----------|--------|---------------|---------|
| USD | $ | 2 | $25.00 |
| EUR | EUR | 2 | 22,00 EUR |
| JPY | JPY | 0 | 2,500 JPY |
| KWD | KWD | 3 | 7.650 KWD |

Store amounts as integers in smallest unit. Format for display using the currency's conventions (decimal separator, symbol position, decimal places). Use `Intl.NumberFormat` on the frontend for locale-aware formatting.

### Integration with Tax

Multi-currency interacts with tax in two ways:

- **Tax-exclusive pricing** (US model): displayed price + tax calculated at checkout based on destination
- **Tax-inclusive pricing** (EU model): displayed price already includes VAT; tax is extracted from the total

Your pricing module must know whether prices for a given region are inclusive or exclusive. Mixing the two in a single cart causes incorrect totals.

## Key Takeaways

- Store prices as integers in the smallest currency unit to eliminate floating-point errors
- Manually set prices for top markets (pricing psychology matters); use auto-conversion as fallback
- Use regions to bundle currency, tax rules, payment methods, and fulfillment options per geography
- Price lists enable wholesale, VIP, and time-bounded pricing without duplicating variants
- Always track whether a region uses tax-inclusive or tax-exclusive pricing to prevent calculation errors
