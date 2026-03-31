---
id: PAT-0100
name: Loyalty Points System
category: patterns
tags: [loyalty, points, rewards, tiers, retention, customer-engagement]
capabilities: [point-accumulation, redemption-management, tier-progression, expiration-handling]
useWhen:
  - designing a loyalty program with points and rewards for a small business
  - implementing tier-based customer progression (silver, gold, platinum)
  - setting up point expiration and redemption rules
  - increasing repeat purchases through a rewards system
  - choosing between points-based and visit-based loyalty models
estimatedTokens: 650
relatedFragments: [SKL-0196, SKL-0194, PAT-0101]
dependencies: []
synonyms: ["how do I set up a loyalty points program", "what is the best way to reward repeat customers", "how to design loyalty tiers for my business", "should loyalty points expire", "how do I calculate point redemption value"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/odoo/odoo"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Loyalty Points System

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0100 |
| **Name** | Loyalty Points System |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

A loyalty points system rewards repeat customers and increases retention by making each purchase build toward a tangible reward. Odoo's integrated modular approach demonstrates how a loyalty program connects to the Point of Sale, eCommerce, and accounting modules so that points are earned and redeemed seamlessly across all sales channels.

### Point Accumulation Rules

The foundation is the earn rate: how many points a customer receives per unit of spending. A common starting point is 1 point per dollar spent. Keep the ratio simple so customers can mentally calculate their balance. Define which transactions qualify for points (product purchases yes, gift cards no, returns deduct points). Bonus point events drive specific behaviors: double points on slow days, triple points on a new product launch, or bonus points for purchasing a specific category.

### Redemption Rules

Redemption converts abstract points into perceived value. Define a clear exchange rate: 100 points equals $5 off, or 200 points equals a free item. The redemption threshold (minimum points required to redeem) matters more than most businesses realize. Set it achievable within 3-5 visits for your average customer. If it takes 20 visits to earn a single reward, customers lose interest before reaching the first milestone. Also decide whether points can be combined with other promotions; generally, allow it to avoid frustrating customers at checkout.

### Tier Progression

Tiers add aspiration to the program. A three-tier model works for most small businesses:

- **Base tier**: All enrolled customers. Standard earn rate (1x points). Basic perks like birthday rewards.
- **Mid tier** (e.g., Silver): Reached after $500 annual spend. Enhanced earn rate (1.5x). Early access to new products or events.
- **Top tier** (e.g., Gold): Reached after $1,500 annual spend. Premium earn rate (2x). Exclusive discounts, priority booking, or complimentary upgrades.

Tier qualification should reset annually to maintain engagement. Notify customers when they are close to the next tier to motivate incremental spending.

### Expiration Policies

Points should expire to manage liability on your balance sheet and to create urgency. The industry standard is 12 months of inactivity (not 12 months from earning). This means any transaction resets the expiration clock, rewarding continued engagement. Send a reminder email 30 days before expiration with the customer's balance and suggestions for redemption.

### Implementation Pattern

The data model for a loyalty system requires:

- **Member record**: Customer ID, current points balance, current tier, enrollment date
- **Transaction log**: Every point earn and redemption with timestamp, amount, and source
- **Tier rules**: Spend thresholds, earn rate multipliers, and qualification period
- **Redemption catalog**: Available rewards with point costs

The transaction log is critical. It provides an audit trail for customer disputes and data for analyzing which rewards drive the most engagement.

### Avoiding Devaluation

The biggest risk to a loyalty program is devaluation: changing the redemption rate after customers have accumulated points. This destroys trust instantly. If you must adjust economics, grandfather existing balances at the old rate and apply new rates only to future earnings. Communicate any changes 60 days in advance.

## Key Takeaways

- Set a simple earn rate (1 point per dollar) that customers can calculate mentally
- Make the first reward achievable within 3-5 visits to maintain engagement
- Use a three-tier model with escalating earn rates and perks to add aspiration
- Expire points based on inactivity (12 months) rather than a fixed date from earning
- Never devalue existing point balances; grandfather old rates if changes are necessary
