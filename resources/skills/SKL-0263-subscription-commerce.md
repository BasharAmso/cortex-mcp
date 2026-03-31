---
id: SKL-0263
name: Subscription Commerce
category: skills
tags: [subscription, recurring-billing, subscription-boxes, billing-cycles, recurring-orders, ecommerce]
capabilities: [subscription-plan-design, billing-cycle-management, recurring-order-automation, churn-reduction]
useWhen:
  - building a subscription box or replenishment service
  - adding recurring billing to an existing store
  - designing subscription tiers with different billing cycles
  - implementing trial periods and subscription upgrades/downgrades
  - reducing involuntary churn from failed payments
estimatedTokens: 650
relatedFragments: [SKL-0265, SKL-0268, PAT-0139]
dependencies: []
synonyms: ["how to build a subscription store", "how to set up recurring orders", "subscription box billing model", "how to handle recurring payments in ecommerce", "subscription management for online store", "how to reduce subscription churn"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Subscription Commerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0263 |
| **Name** | Subscription Commerce |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Medusa's modular architecture treats commerce capabilities as composable modules resolved from a dependency container. Subscription commerce extends this pattern by layering recurring order logic on top of standard order and payment modules. The key insight: a subscription is not a special product type — it is an order lifecycle strategy applied to any product.

### Subscription Data Model

A subscription system requires three core entities beyond a standard order:

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| **Subscription Plan** | Defines billing terms | `interval` (daily/weekly/monthly/annual), `interval_count`, `trial_days`, `metadata` |
| **Subscription** | Links customer to plan | `status` (active/paused/cancelled/past_due), `current_period_start`, `current_period_end`, `customer_id` |
| **Subscription Order** | Each recurring fulfillment | `subscription_id`, `order_id`, `sequence_number`, `scheduled_at` |

### Billing Cycle Workflow

Each billing cycle follows this sequence:

1. **Schedule** — A scheduled job triggers before the period ends (e.g., 3 days ahead for physical goods needing fulfillment lead time)
2. **Payment capture** — Charge the stored payment method via the payment module. If it fails, enter a retry sequence (attempt 1, 3, 5, 7 days) before marking `past_due`
3. **Order creation** — Generate a new order with the subscription line items at current prices (or locked-in prices, depending on plan rules)
4. **Inventory reservation** — Reserve stock through the inventory module before confirming the order
5. **Fulfillment** — Route to the fulfillment workflow like any standard order

### Handling Plan Changes

Three mutation types need explicit rules:

- **Upgrade** — Apply immediately, prorate the current period, charge the difference
- **Downgrade** — Queue for next period start to avoid partial refund complexity
- **Pause** — Set a `resume_date` or leave open-ended. Paused subscriptions skip billing cycles but retain the customer record

### Dunning: Recovering Failed Payments

Involuntary churn (failed cards) accounts for 20-40% of subscription cancellations. A dunning sequence should:

- Retry the charge on an escalating schedule (days 1, 3, 5, 7)
- Send email notifications at each retry with a link to update payment info
- Grace period before cancellation (typically 7-14 days after first failure)
- Mark subscription `past_due` during retries, `cancelled` only after exhausting attempts

### Subscription Metrics to Track

- **MRR** (Monthly Recurring Revenue) — Sum of all active subscription values normalized to monthly
- **Churn rate** — Cancelled subscriptions / total active at period start
- **LTV** (Lifetime Value) — Average revenue per subscriber x average subscription duration
- **Trial conversion rate** — Trial-to-paid conversions / total trials started

## Key Takeaways

- Model subscriptions as an order lifecycle strategy, not a special product type
- Separate the subscription plan (terms) from the subscription instance (customer state)
- Implement dunning with escalating retries and customer notification to recover failed payments
- Queue downgrades for next period start; apply upgrades immediately with proration
- Track MRR, churn rate, and trial conversion as primary health metrics
