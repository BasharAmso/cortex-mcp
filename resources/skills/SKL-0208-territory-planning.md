---
id: SKL-0208
name: Territory Planning
category: skills
tags: [territory-planning, quota-allocation, segmentation, geographic-sales, account-distribution, capacity]
capabilities: [territory-design, quota-modeling, account-segmentation, coverage-analysis]
useWhen:
  - dividing accounts or regions among sales reps
  - setting quotas that reflect territory potential
  - rebalancing territories after team changes
  - analyzing coverage gaps in your sales footprint
  - building a data-driven territory model
estimatedTokens: 650
relatedFragments: [SKL-0206, SKL-0210, PAT-0108]
dependencies: []
synonyms: ["how to divide sales territories", "how to set fair sales quotas", "territory rebalancing strategy", "account-based territory planning", "how to allocate accounts to reps", "geographic vs named-account territories"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Skill: Territory Planning

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0208 |
| **Name** | Territory Planning |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Territory planning determines who sells to whom. Done well, it maximizes coverage, balances workload, and sets achievable quotas. Done poorly, it creates resentment, leaves revenue on the table, and burns out top performers.

### Territory Models

Choose your model based on product complexity and market structure:

| Model | Best For | Consideration |
|-------|----------|---------------|
| **Geographic** | Field sales, local relationships | Simple but ignores account value differences |
| **Named Account** | Enterprise sales, strategic accounts | Precise but requires strong account data |
| **Industry Vertical** | Specialized products, domain expertise | Deep knowledge but limits total addressable accounts |
| **Hybrid** | Most scaling teams | Combines geography + account tier for balanced coverage |

### Data-Driven Design

Territory planning without data is just politics. Use BI tools like Metabase to build dashboards that visualize account distribution, revenue potential by segment, and rep capacity. Metabase's approach of democratizing data access through intuitive queries means sales ops can build territory models without waiting for engineering.

Key data inputs for territory modeling:
- **Account count and revenue potential** per segment
- **Historical win rates** by region and rep
- **Travel time and geographic density** for field teams
- **Current rep capacity** (active deals, quota attainment)

### Quota Allocation

Quotas should reflect territory potential, not be divided equally. A territory with 200 enterprise accounts in a dense metro deserves a higher quota than one with 50 mid-market accounts spread across rural regions. Use a weighted formula:

Quota = Territory Revenue Potential x Coverage Factor x Historical Conversion Rate

Review and adjust quarterly. Annual-only quota setting ignores market shifts and creates misalignment by Q3.

### Rebalancing Triggers

Territories need adjustment when any of these occur:
- A rep consistently exceeds or misses quota by more than 20%
- The team adds or loses headcount
- A new product launches that changes the addressable market
- Account data reveals significant potential imbalance

### Coverage Gap Analysis

Map your accounts against rep assignments to find gaps. Metabase-style analytics with filters and custom views reveal unassigned high-potential accounts, over-concentrated territories, and underserved segments. Set up alerts on your territory data to catch imbalances proactively rather than discovering them at quarter-end.

## Key Takeaways

- Choose a territory model (geographic, named, vertical, or hybrid) based on your sales motion
- Build territory plans from account data and revenue potential, not gut feel
- Weight quotas to territory potential rather than splitting evenly
- Rebalance when reps consistently over- or under-perform by 20%+
- Use dashboards to visualize coverage gaps and monitor territory health continuously
