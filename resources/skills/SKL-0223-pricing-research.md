---
id: SKL-0223
name: Pricing Research
category: skills
tags: [pricing-research, market-research, van-westendorp, conjoint-analysis, competitive-pricing, willingness-to-pay]
capabilities: [price-sensitivity-analysis, willingness-to-pay-measurement, competitive-price-benchmarking, pricing-model-evaluation]
useWhen:
  - determining the right price point for a new product
  - evaluating whether to use subscription, usage-based, or hybrid pricing
  - conducting willingness-to-pay research before launch
  - benchmarking pricing against competitors
  - deciding between free tier strategies
estimatedTokens: 650
relatedFragments: [SKL-0218, SKL-0220, SKL-0217]
dependencies: []
synonyms: ["how much should I charge", "pricing strategy research", "willingness to pay analysis", "Van Westendorp pricing", "how to price my SaaS product", "usage-based vs subscription pricing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/getlago/lago"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Pricing Research

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0223 |
| **Name** | Pricing Research |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Pricing research determines what customers will pay and how to structure pricing for maximum revenue and adoption. Lago, the open-source billing platform, demonstrates the complexity of modern pricing models: usage-based metering, hybrid plans (subscription + usage), prepaid credits, and tiered structures. Understanding pricing research methods helps you choose the right model and price point.

### Pricing Model Options

| Model | How It Works | Best For |
|-------|-------------|----------|
| **Flat subscription** | Fixed monthly/annual fee | Simple products, predictable value |
| **Per-seat** | Price per user | Collaboration tools, clear per-user value |
| **Usage-based** | Pay for what you consume | Infrastructure, API products, variable usage |
| **Hybrid** | Base subscription + usage overage | Products with baseline + variable components |
| **Freemium** | Free tier with paid upgrades | Developer tools, PLG products |
| **Tiered** | Predefined bundles at price points | Products with clear feature differentiation |

Lago's architecture supports event-based metering for usage-based billing, showing that the technical implementation must match the pricing model. Research the model before building the billing system.

### Van Westendorp Price Sensitivity Meter

A lightweight survey method using four questions:
1. At what price would this be **too expensive** (you would not consider it)?
2. At what price would this be **expensive** (you'd think twice but consider it)?
3. At what price would this be a **bargain** (a great buy)?
4. At what price would this be **too cheap** (you'd question the quality)?

Plot the cumulative distribution curves. The intersections reveal:
- **Point of Marginal Cheapness**: Where "too cheap" meets "expensive."
- **Point of Marginal Expensiveness**: Where "too expensive" meets "bargain."
- **Optimal Price Point**: Where "too cheap" meets "too expensive."
- **Acceptable Price Range**: Between marginal cheapness and marginal expensiveness.

Requires 50-200 responses from your target segment. Works best for products with a clear value proposition.

### Competitive Price Benchmarking

Systematic approach to mapping competitor pricing:
1. **Collect pricing pages**: Screenshot and document all competitor tiers, features, and prices.
2. **Normalize to comparable units**: Convert per-seat, per-event, and flat-rate prices to a common metric (e.g., annual cost for a 10-person team doing X events/month).
3. **Map price-to-value**: Plot competitors on a chart with perceived value (features, quality) on X-axis and price on Y-axis.
4. **Identify white space**: Find positions where no competitor sits (high value/low price, or niche-specific tiers).

### Willingness-to-Pay Interviews

For deeper qualitative insight, conduct 15-20 interviews:
- Ask about current spending on solutions to this problem (including time costs).
- Present your product concept and ask what they would expect to pay.
- Test specific price points: "Would you pay $X/month for this?" Then probe reactions.
- Ask about deal-breakers: "What would need to be true at this price point?"

### Common Pricing Pitfalls

- **Underpricing**: The most common mistake for new products. Low prices signal low value and are hard to raise later.
- **Complexity**: If customers cannot estimate their bill, they will not buy. Lago addresses this with transparent metering.
- **Ignoring value metrics**: Price should correlate with the value unit customers care about (events, users, storage, revenue processed).
- **One-size pricing**: Different segments have different willingness to pay. At minimum, have a starter and pro tier.

## Key Takeaways

- Choose pricing model based on how customers experience value, not what is easiest to implement
- Van Westendorp is the fastest quantitative pricing method: 4 questions, 50+ responses, clear output
- Normalize competitor pricing to comparable units before benchmarking
- Underpricing is the most common mistake: it is easier to discount than to raise prices
- Test pricing before building billing infrastructure; changing billing systems is expensive
