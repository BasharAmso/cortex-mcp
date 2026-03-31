---
id: SKL-0269
name: Customer Loyalty in Ecommerce
category: skills
tags: [loyalty-programs, customer-retention, vip-tiers, reward-points, repeat-purchase, ecommerce]
capabilities: [loyalty-program-design, customer-segmentation, reward-mechanics, retention-strategy]
useWhen:
  - designing a loyalty or rewards program for an online store
  - adding point-based incentives to increase repeat purchases
  - building VIP tiers with escalating benefits
  - segmenting customers into groups for targeted promotions
  - reducing churn by rewarding long-term customers
estimatedTokens: 650
relatedFragments: [PAT-0142, SKL-0271, PAT-0140]
dependencies: []
synonyms: ["how do I build a loyalty program", "what is the best way to reward repeat customers", "how to create VIP tiers", "customer retention strategy ecommerce", "points and rewards system", "how to reduce customer churn"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Customer Loyalty in Ecommerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0269 |
| **Name** | Customer Loyalty in Ecommerce |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Customer loyalty programs drive repeat revenue by rewarding behavior you want to encourage. The three dominant models are points-based, tier-based, and paid membership programs. Most platforms (Medusa, Shopify, WooCommerce) provide customer groups as the foundational primitive; loyalty mechanics are built on top through custom workflows or plugins.

### Points-Based Programs

Award points per dollar spent (typical ratio: 1 point per $1). Let customers redeem points as store credit or discounts. Track a `points_balance` on the customer record and adjust it via order-completed and refund webhooks. Set expiration windows (12 months is standard) to create urgency.

### Tier-Based Programs

Define 2-4 tiers based on cumulative spend or order count within a rolling window (e.g., 12 months). Each tier unlocks escalating benefits:

| Tier | Threshold | Benefits |
|------|-----------|----------|
| Bronze | $0+ | Earn 1x points, birthday discount |
| Silver | $500+ | Earn 1.5x points, free shipping |
| Gold | $1,500+ | Earn 2x points, early access, dedicated support |

Recalculate tier status monthly. Allow a grace period (one quarter) before downgrading to reduce frustration.

### Implementation with Customer Groups

Platforms like Medusa support organizing customers into groups, which can be linked to the Promotion Module for targeted discounts. Map loyalty tiers to customer groups, then attach group-specific pricing rules, free shipping thresholds, or exclusive product visibility.

### Referral Layer

Add a referral program on top of loyalty: reward both referrer and referee (e.g., $10 credit each). Track referral codes per customer. Cap referral rewards to prevent abuse (10 per month is reasonable).

### Measuring Success

Track these metrics monthly: repeat purchase rate (target 30%+), customer lifetime value (CLV), redemption rate (target 60-80% of earned points), and program enrollment rate. Low redemption means rewards are not compelling enough. Low enrollment means the value proposition is unclear at signup.

## Key Takeaways

- Start with a simple points program before adding tiers; complexity kills adoption
- Use customer groups as the data primitive and layer loyalty logic via webhooks and promotions
- Set point expiration windows to drive urgency without punishing loyal customers
- Measure redemption rate as the primary health metric for your program
- Cap referral rewards to prevent gaming while still incentivizing word-of-mouth
