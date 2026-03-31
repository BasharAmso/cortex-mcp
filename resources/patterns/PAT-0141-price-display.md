---
id: PAT-0141
name: Price Display Pattern
category: patterns
tags: [pricing, currency-formatting, sale-prices, bulk-discounts, price-comparison, ecommerce]
capabilities: [price-formatting, discount-display, multi-currency-pricing, bulk-pricing-ui]
useWhen:
  - displaying product prices with sale or comparison pricing
  - formatting prices across multiple currencies
  - showing bulk or volume discount tiers on product pages
  - building a pricing UI that communicates value clearly
  - handling tax-inclusive vs tax-exclusive price display
estimatedTokens: 650
relatedFragments: [SKL-0272, SKL-0271, PAT-0140]
dependencies: []
synonyms: ["how to display sale prices", "price formatting best practices", "how to show bulk discount pricing", "multi-currency price display", "strike-through pricing pattern", "how to show tax-inclusive prices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Price Display Pattern

Price presentation directly impacts conversion. Unclear pricing creates hesitation; clear pricing builds confidence to buy.

## Sale Price Display

When a product is on sale, show three elements: the original price (struck through), the sale price (prominent), and the discount percentage or amount saved.

```html
<div class="price-block">
  <span class="price-original" aria-label="Original price">
    <s>$89.99</s>
  </span>
  <span class="price-sale" aria-label="Sale price">$59.99</span>
  <span class="price-savings">Save 33%</span>
</div>
```

Use `aria-label` attributes so screen readers announce prices correctly. Never rely on color alone (red for sale) to communicate the discount.

## Currency Formatting

Always use `Intl.NumberFormat` (or equivalent) for currency display. Never manually concatenate currency symbols with numbers.

```typescript
function formatPrice(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount / 100); // amounts stored as integers (cents)
}

formatPrice(5999, "USD", "en-US"); // "$59.99"
formatPrice(5999, "EUR", "de-DE"); // "59,99 €"
formatPrice(5999, "JPY", "ja-JP"); // "￥5,999"
```

Saleor's multi-channel architecture stores per-channel pricing with currency, allowing a single product to have different prices in different markets. Store prices as integers (cents/pence) to avoid floating-point errors.

## Bulk Discount Tiers

For B2B or volume-discount products, display tiers as a table on the product page:

| Quantity | Unit Price | Savings |
|----------|-----------|---------|
| 1-9 | $12.00 | -- |
| 10-49 | $10.50 | 12% off |
| 50-99 | $9.00 | 25% off |
| 100+ | $7.50 | 37% off |

Highlight the tier the customer qualifies for based on their current quantity. Show a nudge when they are close to the next tier: "Add 3 more to save 12%."

## Tax Display Rules

Tax display varies by region and is often legally required:

| Region | Standard | Display |
|--------|----------|---------|
| **US** | Tax-exclusive | Show price + "plus tax" |
| **EU/UK** | Tax-inclusive (VAT) | Show price including VAT |
| **Australia** | Tax-inclusive (GST) | Show price including GST |

Show the tax treatment clearly. For mixed-region stores, detect locale and switch display mode. Saleor supports per-channel tax configuration for this purpose.

## Price Range for Variable Products

When a product has variants at different prices, show a range: "From $29.99" or "$29.99 - $49.99". Update to the exact price once the customer selects a variant. Never show $0.00 or blank prices as defaults.

## Accessibility Checklist

- Use semantic markup (`<s>` for struck-through original prices, not CSS-only strikethrough)
- Include `aria-label` on price elements for screen reader clarity
- Ensure sufficient color contrast between original and sale prices (4.5:1 minimum)
- Do not use color as the sole indicator of a discount

## Key Takeaways

- Always show original price, sale price, and savings amount together for sale items
- Use `Intl.NumberFormat` for currency formatting; never concatenate symbols manually
- Store prices as integers (cents) to prevent floating-point rounding errors
- Display bulk discount tiers as a table and nudge customers toward the next tier
- Handle tax-inclusive vs tax-exclusive display based on regional requirements
