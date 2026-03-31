---
id: PAT-0113
name: Territory Assignment Pattern
category: patterns
tags: [sales, territory, assignment, workload-balance, geographic, account-based]
capabilities: [territory-design, workload-balancing, account-distribution, coverage-planning]
useWhen:
  - assigning territories to sales reps for a new fiscal year
  - rebalancing territories after team growth or attrition
  - designing account-based territory models
  - ensuring fair distribution of opportunity across the sales team
  - transitioning from geographic to account-based territory models
estimatedTokens: 650
relatedFragments: [SKL-0213, PAT-0111, PAT-0112]
dependencies: []
synonyms: ["how do I assign sales territories", "what is the best way to balance territories", "territory planning for sales", "account distribution model", "fair territory assignment", "sales coverage planning"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Pattern: Territory Assignment

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0113 |
| **Name** | Territory Assignment Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Territory assignment determines which accounts or regions each sales rep is responsible for. Poor territory design is one of the most common and least-discussed causes of sales underperformance: it creates unequal opportunity, causes rep conflict, and leaves accounts uncovered.

### Territory Models

There are three primary models, each with trade-offs:

**Geographic territories** divide the market by region (East/West, state, country). Advantages: simple to understand, minimizes travel costs, and avoids account overlap. Disadvantages: market density varies wildly. A rep covering Montana has far fewer accounts than a rep covering Manhattan.

**Account-based territories** assign named accounts to reps regardless of location. Advantages: enables specialization (a rep can focus on financial services accounts nationally). Disadvantages: multiple reps may be calling into the same building, and travel costs increase.

**Hybrid territories** combine geography with account characteristics (industry, company size, or revenue potential). This is the most common model for scaling teams. Example: "Enterprise financial services accounts in the Northeast" narrows by geography, segment, and industry.

### Balancing for Fairness

The goal is not equal numbers of accounts but equal **opportunity**. Use Metabase or similar BI tools to analyze territory balance across three dimensions:

1. **Total addressable market (TAM)** - The revenue potential of all accounts in the territory. Weighted by fit score if available.
2. **Existing pipeline** - Accounts already in-flight carry more near-term value than greenfield accounts.
3. **Historical performance** - What revenue did this territory produce in the last 4 quarters? Adjust for rep performance to isolate territory quality.

Build a scorecard:

| Territory | # Accounts | TAM ($M) | Existing Pipeline ($K) | Last 4Q Revenue ($K) | Score |
|-----------|-----------|----------|----------------------|---------------------|-------|
| Northeast Enterprise | 85 | 12.5 | 450 | 890 | A |
| Southeast Mid-Market | 210 | 8.2 | 280 | 520 | B |
| West SMB | 1,400 | 6.1 | 120 | 310 | C |

If scores vary by more than 20% between territories, rebalance before the new period starts.

### Assignment Rules

- **Tenure-based priority**: experienced reps get first pick or retain existing territories to protect customer relationships.
- **Ramp-adjusted assignment**: new reps receive smaller or less complex territories with a path to expand as they ramp.
- **No orphans**: every account in your ICP must belong to a territory. Unassigned accounts are unworked accounts.
- **Clear rules of engagement**: define how to handle accounts that span territories (e.g., a company headquartered in New York with offices in Chicago). Document the rule and enforce it; ambiguity causes rep conflict.

### Territory Transitions

When territories change (due to rebalancing, departures, or restructuring):
- **30-day overlap**: the departing and incoming reps should overlap for active deals. Cold handoffs kill pipeline.
- **Customer notification**: inform key contacts about their new rep with a warm introduction.
- **Pipeline protection**: deals past the proposal stage should stay with the original rep through close, even if the account moves to a new territory.

### Reviewing and Adjusting

Review territory balance quarterly using the same scorecard metrics. Small adjustments each quarter are healthier than annual overhauls that disrupt the entire team. Track **territory vacancy rate** (% of territories without a productive rep) as a management health metric.

## Key Takeaways

- Balance territories by opportunity (TAM and pipeline), not just account count.
- Hybrid models combining geography with account characteristics work best for scaling teams.
- Define clear rules of engagement for cross-territory accounts to prevent rep conflict.
- Handle territory transitions with 30-day overlaps and warm customer introductions to protect pipeline.
- Review and adjust quarterly rather than disrupting the entire team with annual overhauls.
