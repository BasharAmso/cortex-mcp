---
id: SKL-0260
name: Discount & Promotion Engine
category: skills
tags: [ecommerce, discounts, promotions, coupons, pricing-rules, campaigns]
capabilities: [promotion-management, coupon-validation, discount-calculation, campaign-orchestration]
useWhen:
  - building a coupon code or discount system
  - implementing percentage or fixed-amount promotions
  - designing promotion rules with conditions and eligibility
  - managing promotional campaigns with budgets and date ranges
  - handling discount stacking and priority logic
estimatedTokens: 650
relatedFragments: [PAT-0061, SKL-0141, SKL-0258, PAT-0062]
dependencies: []
synonyms: ["how to build a coupon system", "discount engine design", "promotion rules and conditions", "how to handle discount stacking", "ecommerce promotion architecture", "buy one get one free implementation"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Discount & Promotion Engine

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0260 |
| **Name** | Discount & Promotion Engine |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A promotion engine applies discounts to carts based on rules, conditions, and eligibility criteria. It must be flexible enough to support marketing creativity while preventing abuse and maintaining margin control.

### Promotion Types

| Type | Mechanism | Example |
|------|-----------|---------|
| **Percentage** | Reduce price by a percentage | 20% off all t-shirts |
| **Fixed amount** | Subtract a flat value | $10 off your order |
| **Free shipping** | Zero out shipping cost | Free shipping over $50 |
| **Buy X get Y** | Add free or discounted items | Buy 2 get 1 free |
| **Gift card** | Pre-loaded credit applied at checkout | $25 gift card |

### Application Targets

Promotions apply at different scopes:

| Target | Applies To | Example |
|--------|-----------|---------|
| **Order** | Entire cart total | $15 off orders over $100 |
| **Line item** | Specific products or categories | 30% off Summer Collection |
| **Shipping** | Shipping method cost | Free standard shipping |

### Promotion Data Model

```
Campaign ("Summer Sale 2026")
├── starts_at / ends_at
├── budget (max total discount across all uses)
└── Promotions[]
    ├── code: "SUMMER20"
    ├── type: "standard"
    ├── application_method
    │   ├── type: "percentage"
    │   ├── value: 20
    │   ├── target_type: "items"
    │   └── currency_code: "usd"
    └── rules[]
        ├── min_order_value: 5000  (cents)
        ├── eligible_categories: ["summer-collection"]
        └── max_uses: 1000
```

Campaigns group promotions under shared date ranges and budgets. A campaign can contain multiple promotion codes with different rules.

### Rule Evaluation

When a promotion code is applied, validate in this order:

1. **Code exists** and is active (not expired, not archived)
2. **Campaign check:** within campaign date range and under budget
3. **Usage limits:** per-customer limit and global limit not exceeded
4. **Eligibility:** cart meets minimum order value, contains eligible products/categories
5. **Customer conditions:** new customer only, specific customer group, first order
6. **Calculate:** compute discount amount, cap at maximum if defined
7. **Apply:** attach adjustment to cart items or order total

### Stacking and Priority

Discount stacking is the most common source of margin erosion:

| Strategy | Behavior |
|----------|----------|
| **No stacking** | Only one promotion per cart. Simplest, safest. |
| **Best discount wins** | Calculate all eligible promotions, apply the one with highest value. |
| **Ordered stacking** | Apply promotions sequentially by priority. Each applies to the already-discounted total. |
| **Category stacking** | Allow one promotion per type (one coupon + one automatic sale). |

Recommended default: allow one coupon code plus automatic promotions (sales). This balances marketing flexibility with margin protection.

### Automatic vs Code-Based

| Type | Trigger | Use Case |
|------|---------|----------|
| **Code-based** | Customer enters a code | Influencer campaigns, email exclusives |
| **Automatic** | Applied when conditions are met | Site-wide sales, threshold discounts |

Automatic promotions evaluate on every cart recalculation. Code-based promotions only evaluate when explicitly applied. Keep automatic promotions limited to avoid performance overhead on every cart update.

### Preventing Abuse

- **Rate limiting:** Cap code redemption attempts per session
- **Single-use codes:** Generate unique codes for influencer or referral campaigns
- **Minimum order value:** Prevent tiny orders exploiting free shipping
- **Usage tracking:** Log every application with customer ID, order ID, and discount amount
- **Expiration:** Always set end dates; never leave promotions active indefinitely

## Key Takeaways

- Group promotions into campaigns with shared date ranges and budgets for marketing control
- Validate promotions server-side in a strict order: existence, dates, limits, eligibility, then calculate
- Default to allowing one coupon code plus automatic promotions to balance flexibility and margin safety
- Generate unique single-use codes for influencer and referral campaigns to prevent sharing abuse
- Always set expiration dates and usage limits on every promotion
