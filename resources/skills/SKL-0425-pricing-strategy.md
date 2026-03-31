---
id: SKL-0425
name: Pricing Strategy
category: skills
tags: [pricing, freemium, tiered-pricing, usage-based, price-anchoring, saas, revenue-model]
capabilities: [pricing-model-design, tier-structuring, price-anchoring, revenue-optimization]
useWhen:
  - choosing a pricing model for a new product
  - restructuring pricing tiers for an existing product
  - deciding between freemium, flat-rate, or usage-based pricing
  - setting price points for SaaS plans
  - designing upgrade triggers and plan differentiation
estimatedTokens: 700
relatedFragments: [SKL-0011, PAT-0216, SKL-0428, SKL-0433]
dependencies: []
synonyms: ["how should I price my product", "freemium vs paid pricing", "how to set up pricing tiers", "what pricing model should I use", "how to price a SaaS product", "usage-based pricing strategy"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/getlago/lago"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Skill: Pricing Strategy

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0425 |
| **Name** | Pricing Strategy |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Pricing is a product decision, not just a finance decision. Your pricing model shapes user behavior, defines your market position, and determines your growth ceiling.

### Pricing Models Compared

| Model | How It Works | Best For | Risk |
|-------|-------------|----------|------|
| **Flat rate** | One price, all features | Simple products | Leaves money on the table |
| **Tiered** | Good/Better/Best plans | SaaS with varied users | Complexity in feature gating |
| **Usage-based** | Pay for what you use | API, infrastructure, AI | Revenue unpredictability |
| **Per-seat** | Price per user | Collaboration tools | Discourages adoption |
| **Freemium** | Free tier + paid upgrade | PLG, wide top-of-funnel | Free users never convert |
| **Hybrid** | Base fee + usage overage | Modern SaaS | Billing complexity |

### The Three-Tier Structure

Most SaaS products benefit from three tiers. Each serves a psychological purpose:

1. **Free / Starter** — Acquisition. Remove friction to try. Limit by volume, not features.
2. **Pro** — Revenue engine. This is the plan most users should land on. Price it as the obvious choice.
3. **Enterprise / Scale** — Anchoring. A high-priced tier makes Pro look reasonable. Also captures high-value accounts.

### Price Anchoring Principles

- Always show the expensive plan first (left-to-right or top-to-bottom)
- Highlight the middle tier as "Most Popular" or "Recommended"
- Use annual billing discount to increase commitment (typically 15-20% off monthly)
- Show per-month pricing even for annual plans (lower number is psychologically easier)

### Usage-Based Pricing (Lago Model)

Modern billing engines like Lago enable hybrid models. Key concepts:
- **Billable metrics** — define what you meter (API calls, events, storage, compute)
- **Graduated tiers** — first 1,000 events free, next 10,000 at $0.01, remainder at $0.005
- **Spending caps** — let users set limits to avoid bill shock
- **Real-time usage dashboards** — transparency builds trust

### Pricing Mistakes to Avoid

- Pricing too low out of fear (undervalues your product, attracts wrong customers)
- Too many tiers or complex feature matrices (decision paralysis)
- Hiding pricing (losing trust-sensitive buyers)
- Never raising prices (you will always undercharge on day one)
- Gating core value behind the paywall so aggressively that free users get no value

## Key Takeaways
- Three tiers serve acquisition, revenue, and anchoring purposes
- Usage-based pricing aligns cost with value but needs spending controls
- Show expensive options first to anchor perception
- Price too low is worse than price too high (you can always discount)
- Revisit pricing quarterly as you learn what users actually value
