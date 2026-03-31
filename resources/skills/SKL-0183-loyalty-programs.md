---
id: SKL-0183
name: Loyalty Programs
category: skills
tags: [loyalty, rewards, points, referrals, retention, small-business]
capabilities: [points-system-design, tier-management, referral-tracking, reward-redemption]
useWhen:
  - building a customer loyalty or rewards program
  - designing a points system for repeat purchases
  - implementing digital punch cards for a small business
  - creating referral incentives to grow customer base
  - setting up tier-based rewards with escalating benefits
estimatedTokens: 650
relatedFragments: [SKL-0182, SKL-0180, PAT-0095]
dependencies: []
synonyms: ["how do I create a loyalty program for my business", "how to build a digital punch card system", "what is the best way to reward repeat customers", "how do I set up a referral program", "how to design a points and rewards system", "how do I create customer tiers like gold and silver"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/odoo/odoo"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Loyalty Programs

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0183 |
| **Name** | Loyalty Programs |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Loyalty programs turn one-time buyers into regulars. Odoo's loyalty module demonstrates a flexible architecture: a rule engine that awards points based on configurable triggers, a reward catalog for redemption, and multi-channel support across POS and e-commerce.

### Program Types

Odoo's loyalty module supports several program structures that map to common small business needs:

- **Points Program**: Earn points per dollar spent (e.g., 1 point per $1), redeem for discounts or free items. Coffee shops, restaurants, salons.
- **Digital Punch Card**: Buy 9 coffees, get the 10th free. Simpler than points — just track visit/purchase count toward a threshold.
- **Tiered Rewards**: Bronze, Silver, Gold based on cumulative spend. Each tier unlocks better perks (priority booking, exclusive discounts, free add-ons).
- **Referral Program**: Existing customer refers a friend, both get a reward when the friend makes a first purchase.
- **Coupon/Gift Card**: Generate unique codes with a stored value or discount percentage.

### Rule Engine Design

The core pattern is a **trigger-condition-reward** engine. A **rule** defines: what action earns points (purchase, referral, review), what conditions apply (minimum spend, specific products, time window), and how many points to award. Odoo separates rules from rewards so you can mix and match — the same points balance can be redeemed against different reward options.

### Points Ledger

Maintain a ledger per customer: every earn and burn is a transaction with a timestamp, source (which rule triggered it), and balance after. This audit trail prevents disputes ("I should have more points") and enables analytics (which rules drive the most engagement). Points can have expiration dates — common for preventing hoarded balances.

### Redemption Flow

At checkout (POS or online), the system checks the customer's point balance against available rewards. Display what they can redeem: "You have 150 points — redeem 100 for $5 off?" Apply the reward as a line-item discount on the order. Odoo's POS integration makes this seamless at the register.

### Referral Mechanics

Track referrals with unique codes or links per customer. When a new customer makes their first purchase using a referral code, credit both the referrer and the new customer. Set limits (max 10 referral rewards per month) to prevent abuse. The referral reward should be compelling but not so generous it attracts deal-seekers with no retention.

## Key Takeaways

- Start simple (punch card or basic points) and add tiers later as your customer base grows
- Separate earn rules from reward definitions for flexibility
- A points ledger with full transaction history prevents disputes and enables analytics
- Referral programs are the cheapest customer acquisition channel for local businesses
- Point expiration encourages regular redemption and keeps liabilities manageable
