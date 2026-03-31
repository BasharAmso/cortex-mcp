---
id: SKL-0233
name: Channel Analysis
category: skills
tags: [channel-analysis, distribution, acquisition, marketing-channels, channel-mix, attribution]
capabilities: [channel-evaluation, attribution-analysis, channel-mix-optimization, distribution-strategy]
useWhen:
  - deciding which acquisition channels to invest in
  - evaluating the performance of existing distribution channels
  - planning a go-to-market distribution strategy
  - comparing organic vs paid channel effectiveness
  - diagnosing why growth has stalled despite product improvements
estimatedTokens: 650
relatedFragments: [SKL-0231, SKL-0235, PAT-0123]
dependencies: []
synonyms: ["which marketing channels should I use", "how to evaluate distribution channels", "where should I acquire users", "channel mix optimization", "how to analyze traffic sources", "which acquisition channels work best"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/plausible/analytics"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Channel Analysis

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0233 |
| **Name** | Channel Analysis |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Channel analysis evaluates where your users come from and which distribution paths deliver sustainable, cost-effective growth. The goal is not to be everywhere but to find the 2-3 channels that work for your specific product and audience.

### The Channel Evaluation Framework

For each candidate channel, assess five dimensions:

| Dimension | Question | Measurement |
|-----------|----------|-------------|
| **Reach** | How many potential users can this channel access? | Total addressable audience |
| **Cost** | What does it cost per acquired user? | CAC (Customer Acquisition Cost) |
| **Conversion** | What percentage of reached users convert? | Conversion rate by funnel stage |
| **Retention** | Do users from this channel stick around? | Cohort retention by source |
| **Scalability** | Can volume increase without proportional cost increase? | CAC trajectory at 2x, 5x, 10x volume |

### Channel Categories

**Owned channels:** Your website, blog, email list, app store listing. Low marginal cost, slow to build, high long-term value. Track with privacy-respecting analytics (Plausible-style: page views, referral sources, UTM parameters, conversion goals without invasive tracking).

**Earned channels:** Word of mouth, press coverage, organic search, social sharing. Zero marginal cost but unpredictable. Measure through referral source analysis, branded search volume, and inbound link growth.

**Paid channels:** Search ads, social ads, sponsorships, influencer partnerships. Predictable and scalable but expensive. Track rigorously with UTM parameters and conversion attribution.

**Product channels:** Viral loops, referral programs, integrations, marketplaces. Scale with usage but require product investment. Measure viral coefficient (K-factor) and time-to-invite.

### Running a Channel Analysis

1. **List all active and candidate channels.** Include channels you are not yet using but competitors leverage.
2. **Instrument tracking.** Set up UTM parameters for all paid and earned campaigns. Configure conversion goals (signups, activations, purchases). Use privacy-first analytics to track source attribution without invasive cookies.
3. **Collect baseline data.** Run each channel for a minimum viable period (2-4 weeks for paid, 2-3 months for organic) before drawing conclusions.
4. **Calculate unit economics per channel.** CAC, LTV-to-CAC ratio, payback period. A channel is healthy when LTV:CAC exceeds 3:1.
5. **Analyze by funnel stage.** A channel may drive top-of-funnel awareness but convert poorly, or attract fewer visitors who convert at high rates. Both patterns inform different strategies.
6. **Build a channel scorecard.** Rank channels on the five dimensions above. Invest in the top 2-3; run low-cost experiments on the next 2; cut the rest.

### Attribution Pitfalls

- **Last-click bias:** Attributing all credit to the final touchpoint ignores channels that introduced the user. Use multi-touch attribution or at minimum track first-touch alongside last-touch.
- **Vanity metrics:** Traffic volume without conversion data is misleading. A channel sending 100 visitors who convert at 10% beats one sending 10,000 at 0.05%.
- **Over-indexing on paid:** Paid channels show results immediately but can mask weak organic foundations. If turning off ads collapses growth, you have a dependency problem.

## Key Takeaways

- Evaluate channels on reach, cost, conversion, retention, and scalability rather than just traffic volume
- Healthy channels have an LTV:CAC ratio above 3:1 with a reasonable payback period
- Invest deeply in 2-3 winning channels rather than spreading thinly across many
- Track both first-touch and last-touch attribution to understand the full acquisition journey
- Privacy-respecting analytics (UTM parameters, conversion goals, referral sources) provide sufficient signal without invasive tracking
