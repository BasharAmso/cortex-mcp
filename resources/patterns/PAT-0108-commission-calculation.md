---
id: PAT-0108
name: Commission Calculation
category: patterns
tags: [commission, compensation, sales-incentives, payout, tiered-commission, split-rules]
capabilities: [commission-modeling, tier-calculation, split-resolution, payout-scheduling]
useWhen:
  - designing a commission structure for a sales team
  - calculating commissions with tiered or accelerator models
  - handling split commissions between multiple contributors
  - building a payout schedule and clawback policy
  - auditing commission accuracy for fairness and compliance
estimatedTokens: 650
relatedFragments: [SKL-0209, SKL-0208, PAT-0107]
dependencies: []
synonyms: ["how to calculate sales commissions", "tiered commission structure design", "split commission rules", "commission clawback policy", "sales compensation plan design", "accelerator commission model"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Pattern: Commission Calculation

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0108 |
| **Name** | Commission Calculation |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Commission structures drive sales behavior. A well-designed plan motivates the right actions. A poorly designed one creates sandbagging, cherry-picking, and misaligned incentives. The calculation model must be simple enough for reps to predict their earnings and precise enough for finance to audit.

### Commission Models

| Model | How It Works | Best For |
|-------|-------------|----------|
| **Flat rate** | Fixed percentage on every deal (e.g., 10%) | Simple products, consistent deal sizes |
| **Tiered** | Percentage increases at quota thresholds (e.g., 8% to 100%, 12% above) | Motivating overachievement |
| **Accelerator** | Multiplier kicks in above quota (e.g., 2x rate above 120%) | Rewarding top performers |
| **Gross margin** | Commission on profit, not revenue | High-variable-cost products |
| **Activity-based** | Bonus for meetings booked, demos completed | SDR/BDR teams focused on pipeline generation |

ERPNext's selling module implements commission calculation at the transaction level with sales partner entities and incentive formulas, demonstrating that commission logic belongs close to the deal record, not in a separate spreadsheet.

### Tiered Calculation Example

For a rep with $500K quota and tiered plan:

| Tier | Range | Rate | Commission |
|------|-------|------|------------|
| Base | $0 - $500K | 8% | Up to $40K |
| Accelerator | $500K - $750K | 12% | Up to $30K |
| Super-accelerator | $750K+ | 15% | Uncapped |

A rep closing $800K earns: ($500K x 8%) + ($250K x 12%) + ($50K x 15%) = $40K + $30K + $7.5K = $77.5K

### Split Rules

When multiple people contribute to a deal, define split rules in advance:

- **Primary/Overlay** -- Primary rep gets 100% credit, overlay (solutions engineer, partner) gets a separate overlay commission (typically 2-5% of deal value)
- **Percentage split** -- Two reps share credit (e.g., 60/40 based on involvement)
- **Double credit** -- Both reps get full credit (expensive but eliminates territory disputes)

ERPNext handles splits through sales team entries on each transaction, linking multiple salespeople with percentage allocations. Build your system similarly: attach contributors to deals at creation, not after close.

### Payout Schedule and Clawbacks

| Policy | Standard Practice |
|--------|------------------|
| **Payout timing** | Monthly or bi-monthly, 1 pay period after deal closes |
| **Clawback window** | 3-6 months; if customer churns within window, commission is reversed |
| **Draw against commission** | Guaranteed base for ramp period (typically 3-6 months for new hires) |
| **Cap** | Optional; most high-growth companies leave uncapped to reward outliers |

### Transparency

Reps must be able to calculate their own commission at any time. Provide a self-service dashboard or calculator. ERPNext's payment terms templates show how to formalize payout conditions so both finance and sales reference the same rules.

## Key Takeaways

- Choose a commission model that rewards the behavior you want, not just revenue
- Use tiered structures with accelerators to motivate overachievement
- Define split rules before deals close, not after disputes arise
- Set clear clawback windows and communicate them during onboarding
- Make commission calculations transparent and self-service for reps
