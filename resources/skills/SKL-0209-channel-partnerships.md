---
id: SKL-0209
name: Channel Partnerships
category: skills
tags: [channel-sales, partnerships, co-selling, revenue-sharing, partner-program, resellers]
capabilities: [partner-program-design, co-selling-coordination, revenue-share-modeling, partner-enablement]
useWhen:
  - designing a partner or reseller program
  - structuring revenue sharing with channel partners
  - enabling partners to sell your product effectively
  - evaluating whether to sell direct or through channels
  - building co-selling motions with strategic partners
estimatedTokens: 650
relatedFragments: [SKL-0210, PAT-0108, SKL-0206]
dependencies: []
synonyms: ["how to build a partner program", "channel sales vs direct sales", "how to structure revenue sharing", "reseller program design", "co-selling with partners", "how to enable channel partners"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Skill: Channel Partnerships

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0209 |
| **Name** | Channel Partnerships |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Channel partnerships let you sell through others who already have relationships with your target buyers. When structured correctly, they multiply your sales capacity without proportionally increasing headcount. When structured poorly, they create conflicts, margin erosion, and brand confusion.

### Partner Types

| Type | Role | Revenue Model |
|------|------|---------------|
| **Reseller** | Sells your product under their relationship | Margin on resale (15-40%) |
| **Referral** | Sends qualified leads to your sales team | Referral fee (5-15% of first-year revenue) |
| **Implementation** | Deploys and customizes your product | Services revenue, with your license attached |
| **Technology** | Integrates their product with yours | Joint value, co-marketing, shared pipeline |

### Program Design

ERPNext's selling module demonstrates the core building blocks of partner management: sales partner entities, commission structures, territory assignments, and pricing rules. Translate these into your program:

1. **Tiering** -- Create 2-3 partner tiers (e.g., Silver, Gold, Platinum) with clear requirements and benefits. Requirements should include revenue minimums, certification count, and customer satisfaction scores.
2. **Enablement** -- Partners cannot sell what they do not understand. Provide sales decks, demo environments, competitive battle cards, and objection-handling guides. Certification programs ensure quality.
3. **Deal registration** -- Protect partners who bring opportunities by giving them a defined window (typically 90 days) of exclusivity on registered deals. This prevents channel conflict.
4. **Pricing rules** -- Set clear guidelines for partner pricing. ERPNext's pricing rule system shows how to enforce discount limits and approval workflows so partners cannot erode margins without oversight.

### Revenue Sharing Models

The right model depends on partner involvement:

- **Flat commission** -- Simple percentage on closed deals. Best for referral partners.
- **Tiered commission** -- Higher percentage as annual volume increases. Motivates growth.
- **Recurring revenue share** -- Partner earns a percentage of ongoing subscription revenue. Aligns long-term incentives.

ERPNext supports payment terms templates and commission calculations that model these structures. Define payout schedules (monthly or quarterly), clawback rules for churned customers, and split rules when multiple partners contribute to a deal.

### Co-Selling Execution

Joint selling works when roles are clear. Define who owns the relationship, who presents the solution, and who handles procurement. Create shared pipeline visibility so both sides can track deal progress. Regular partner pipeline reviews (bi-weekly for active partners) keep deals moving.

## Key Takeaways

- Choose partner types based on the value they add: distribution, expertise, or technology integration
- Design tiered programs with clear requirements, enablement, and deal protection
- Match the revenue sharing model to partner involvement level
- Enforce pricing rules to prevent uncontrolled margin erosion
- Run regular joint pipeline reviews to keep co-selling deals on track
