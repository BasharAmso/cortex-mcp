---
id: SKL-0268
name: Analytics for Ecommerce
category: skills
tags: [analytics, conversion-funnels, aov, cohort-retention, product-analytics, ecommerce]
capabilities: [conversion-funnel-analysis, aov-tracking, cohort-retention-measurement, product-performance-analytics]
useWhen:
  - setting up conversion funnel tracking for an online store
  - analyzing average order value and revenue metrics
  - measuring customer retention with cohort analysis
  - identifying which products drive repeat purchases
  - diagnosing where customers drop off in the purchase flow
estimatedTokens: 650
relatedFragments: [SKL-0267, SKL-0263, PAT-0137]
dependencies: []
synonyms: ["how to track ecommerce conversions", "how to measure AOV", "cohort retention analysis for online store", "ecommerce funnel analytics setup", "product analytics for ecommerce", "how to find where customers drop off"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Analytics for Ecommerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0268 |
| **Name** | Analytics for Ecommerce |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

PostHog provides event-based product analytics with autocapture, conversion funnels, cohort retention, and session replay. For ecommerce, this means tracking the full customer journey from landing page through purchase and repeat buying, all through structured events rather than page views. PostHog's data warehouse capability also lets you join product analytics with external data from Stripe or your order database.

### The Ecommerce Event Schema

Define a consistent event taxonomy before instrumenting anything:

| Event Name | Properties | Funnel Stage |
|------------|-----------|--------------|
| `page_viewed` | `page_type`, `category`, `referrer` | Awareness |
| `product_viewed` | `product_id`, `product_name`, `price`, `category` | Interest |
| `product_added_to_cart` | `product_id`, `quantity`, `cart_value` | Intent |
| `checkout_started` | `cart_value`, `item_count`, `coupon_code` | Decision |
| `payment_submitted` | `payment_method`, `order_value` | Purchase |
| `order_completed` | `order_id`, `order_value`, `item_count`, `is_first_order` | Conversion |
| `order_refunded` | `order_id`, `refund_amount`, `reason` | Post-purchase |

Always include `user_id` (for logged-in users) and `anonymous_id` (for pre-login) to stitch sessions.

### Conversion Funnel Analysis

PostHog's funnel tool shows drop-off between each step. The standard ecommerce funnel:

```
Product Viewed → Added to Cart → Checkout Started → Order Completed
```

Healthy benchmarks:
- Product view to add-to-cart: 8-12%
- Add-to-cart to checkout: 30-50%
- Checkout to purchase: 50-70%
- Overall (view to purchase): 1-4%

When diagnosing drop-offs, use session replay on users who dropped at each stage. Look for: confusing UI, unexpected shipping costs revealed at checkout, payment method limitations, slow page loads.

### Average Order Value (AOV) Tracking

AOV = Total Revenue / Number of Orders. Track it as a trend, not a single number.

Segment AOV by:
- **Acquisition channel** — Which channels bring higher-value customers?
- **First order vs. repeat** — Repeat customers typically have 15-25% higher AOV
- **Device type** — Mobile AOV is often 20-30% lower than desktop
- **Coupon usage** — Discounts reduce AOV but may increase volume

AOV improvement levers: cross-sell recommendations, bundle offers, free shipping thresholds (set 15-20% above current AOV), minimum order for discount eligibility.

### Cohort Retention Analysis

Group customers by their first purchase month, then track what percentage make a second purchase in subsequent months:

| Cohort | Month 1 | Month 2 | Month 3 | Month 6 |
|--------|---------|---------|---------|---------|
| Jan buyers | 100% | 18% | 12% | 8% |
| Feb buyers | 100% | 22% | 15% | 10% |

Healthy retention: 20-30% making a second purchase within 90 days. If retention is flat or declining across cohorts, the product is not generating repeat demand. If improving, your post-purchase experience is working.

### Product Performance Metrics

Track per-product to identify winners and losers:

| Metric | What It Reveals |
|--------|----------------|
| **View-to-cart rate** | Product page effectiveness |
| **Cart-to-purchase rate** | Price/value perception |
| **Return rate** | Quality or description accuracy |
| **Repeat purchase rate** | Product satisfaction and consumability |
| **Revenue per view** | Combined attractiveness and conversion efficiency |

Products with high views but low cart rate need better product pages. Products with high cart rate but low purchase rate have checkout friction or price sensitivity.

### Dashboard Structure

Organize ecommerce analytics into three dashboards:

1. **Revenue** — Daily revenue, AOV, orders, refund rate (executive view)
2. **Funnel** — Conversion rates by stage, drop-off analysis, device/channel breakdown (growth team)
3. **Product** — Top products by revenue, view-to-purchase rates, return rates, inventory velocity (merchandising)

## Key Takeaways

- Define a consistent event schema before instrumenting; include product, cart, and order events
- Track the four-stage conversion funnel and benchmark each transition rate
- Segment AOV by channel, device, and customer type to find improvement opportunities
- Use cohort retention (first purchase month) to measure whether post-purchase experience drives repeat buying
- Build three dashboards: revenue (executive), funnel (growth), product (merchandising)
