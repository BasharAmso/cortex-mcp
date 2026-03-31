---
id: PAT-0142
name: Checkout Recovery Pattern
category: patterns
tags: [abandoned-cart, cart-recovery, email-sequences, checkout-optimization, conversion, ecommerce]
capabilities: [abandoned-cart-detection, recovery-email-design, checkout-incentives, conversion-optimization]
useWhen:
  - reducing checkout abandonment rates
  - building abandoned cart email sequences
  - deciding when and how to offer recovery incentives
  - implementing exit-intent or cart persistence strategies
  - measuring and improving checkout conversion funnels
estimatedTokens: 650
relatedFragments: [PAT-0140, SKL-0269, SKL-0273]
dependencies: []
synonyms: ["how to recover abandoned carts", "abandoned cart email strategy", "reduce checkout abandonment", "cart recovery best practices", "when to send abandoned cart emails", "how to win back customers who left checkout"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Checkout Recovery Pattern

Average cart abandonment rate is 70%. Even recovering 5-10% of abandoned carts represents significant revenue. Recovery is a system, not a single email.

## Abandonment Detection

A cart is "abandoned" when a customer adds items and provides an email but does not complete purchase within a defined window. Track the cart lifecycle:

| State | Trigger | Timer Starts |
|-------|---------|-------------|
| **Active** | Item added to cart | -- |
| **Identified** | Email captured (checkout step 1, account login, or email popup) | -- |
| **Abandoned** | No activity for 1 hour after identification | Recovery sequence begins |
| **Recovered** | Customer completes purchase | Cancel sequence |
| **Expired** | 30 days with no activity | Archive cart |

You cannot recover anonymous carts. Capturing email early (before payment step) is the single most important design decision for recovery.

## Email Recovery Sequence

Send a 3-email sequence with escalating urgency:

| Email | Timing | Subject Line Strategy | Content |
|-------|--------|----------------------|---------|
| **#1 Reminder** | 1 hour after abandonment | "You left something behind" | Cart contents with images, direct link to resume checkout. No discount. |
| **#2 Social proof** | 24 hours | "Still thinking it over?" | Add reviews, ratings, or "selling fast" indicators. Still no discount. |
| **#3 Incentive** | 72 hours | "Here's 10% off to complete your order" | Time-limited discount code (48-hour expiry). Last chance framing. |

Do not lead with a discount. Customers who would have purchased anyway learn to abandon carts for coupons. The first email typically recovers 40-50% of all recoverable carts without any incentive.

## Cart Link Architecture

Each recovery email must contain a unique, pre-authenticated link that restores the exact cart state. Implementation:

1. Generate a signed token tied to the cart ID and customer email
2. Token expires after 30 days (matching cart expiry)
3. On click: restore cart contents, apply any offered discount, redirect to checkout
4. Invalidate the token once the order is placed

Use Medusa's cart and draft order APIs to persist cart state server-side so it survives across devices and sessions.

## On-Site Recovery Tactics

Before the customer leaves:

- **Cart persistence**: Save cart server-side (not just localStorage) so it survives across sessions and devices
- **Exit-intent popup**: Trigger on mouse movement toward browser close (desktop only). Offer email capture, not a discount. Limit to once per session.
- **Progress indicators**: Show checkout steps (1 of 3) to reduce perceived effort
- **Guest checkout**: Never force account creation. Offer it after purchase.

## Measuring Recovery

| Metric | Target | Calculation |
|--------|--------|-------------|
| **Recovery rate** | 5-10% | Recovered carts / total abandoned carts |
| **Email open rate** | 40%+ | Opens / emails sent (for recovery emails) |
| **Revenue recovered** | Track monthly | Sum of order values from recovery-attributed purchases |
| **Discount cost** | Monitor | Total discount given via email #3 / recovered revenue |

Track whether customers start abandoning intentionally to receive discounts. If discount-driven recovery exceeds 30% of total recovery, reduce incentive frequency or switch to free shipping instead of percentage off.

## Key Takeaways

- Capture email at the earliest checkout step; you cannot recover anonymous carts
- Send 3 emails: reminder (1h), social proof (24h), incentive (72h). Do not lead with a discount.
- Use signed, expiring cart links that restore exact cart state across devices
- Implement server-side cart persistence so carts survive session and device changes
- Monitor for intentional abandonment gaming and adjust incentive strategy accordingly
