---
id: PAT-0117
name: Segmentation Model
category: patterns
tags: [segmentation, rfm, behavioral-segmentation, psychographic-segmentation, cohort-analysis, customer-segments]
capabilities: [segment-definition, rfm-scoring, behavioral-clustering, segment-prioritization]
useWhen:
  - defining customer segments for marketing or product decisions
  - building an RFM model to identify high-value customers
  - choosing which user cohort to prioritize for a feature
  - creating targeted messaging for different audience groups
  - analyzing user behavior patterns across segments
estimatedTokens: 650
relatedFragments: [SKL-0225, SKL-0228, PAT-0119]
dependencies: []
synonyms: ["how to segment my users", "RFM analysis template", "how to define customer segments", "behavioral segmentation framework", "which customers should I focus on", "customer cohort analysis"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Pattern: Segmentation Model

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0117 |
| **Name** | Segmentation Model |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Segmentation divides your user base into groups that behave differently and therefore require different strategies. PostHog implements this through cohorts (behavioral groupings), feature flags (segment-specific experiences), and autocapture (event-based segmentation without manual instrumentation). The pattern below gives you the framework to define segments regardless of tooling.

### Three Segmentation Approaches

**1. RFM Segmentation (Transactional Products)**
Score each user on three dimensions:
- **Recency** — How recently did they last engage? (1 = long ago, 5 = very recent)
- **Frequency** — How often do they engage? (1 = rarely, 5 = very often)
- **Monetary** — How much value do they generate? (1 = low, 5 = high)

Combine scores into segments:

| Segment | RFM Profile | Strategy |
|---------|------------|----------|
| Champions | 5-5-5, 5-5-4 | Reward, ask for referrals, co-create |
| Loyal | 4-4-4, 3-4-4 | Upsell, deepen engagement |
| At Risk | 2-3-3, 1-3-3 | Win-back campaigns, survey for churn reasons |
| Hibernating | 1-1-1, 1-2-1 | Low-cost reactivation or let go |

**2. Behavioral Segmentation (SaaS / Product-Led)**
PostHog's cohort system groups users by actions: "completed onboarding AND used feature X within 7 days." Define segments by:
- **Activation behavior** — Did they reach the "aha moment"?
- **Feature adoption** — Which features do they use? Power users vs. single-feature users.
- **Engagement pattern** — Daily actives, weekly actives, churned.

Build a 2x2 matrix: (Activation: Yes/No) x (Engagement: High/Low). Each quadrant has a different intervention:
- Activated + High engagement = nurture and expand.
- Activated + Low engagement = re-engage with relevant content.
- Not activated + High engagement = remove activation friction.
- Not activated + Low engagement = evaluate if they're the right audience.

**3. Psychographic Segmentation (Brand / Content)**
Group by motivations, values, and attitudes rather than behavior. Useful for positioning (SKL-0225) and messaging:
- **Goals** — What outcome are they trying to achieve?
- **Pain tolerance** — How much friction will they accept before switching?
- **Decision style** — Do they research extensively or buy impulsively?

Psychographic segments are harder to measure directly. Infer them from survey data (SKL-0224) and brand perception research (SKL-0229).

### Implementation Pattern

1. **Start with behavioral segmentation.** It requires only product analytics data (PostHog cohorts, Mixpanel segments, or even database queries).
2. **Add RFM when you have transactional data.** Revenue or engagement frequency enables RFM scoring.
3. **Layer psychographic segments last.** These require qualitative research and are most useful for marketing messaging, not product decisions.
4. **Validate segments.** A valid segment must be: measurable (you can count members), substantial (large enough to matter), accessible (you can reach them), and differentiable (they respond differently to different strategies).

## Key Takeaways

- Start with behavioral segmentation using product analytics data. RFM and psychographic layers come later.
- Every segment must pass the MSAD test: Measurable, Substantial, Accessible, Differentiable.
- Use the 2x2 activation/engagement matrix to prioritize interventions for product-led growth.
- RFM scoring turns transactional data into actionable customer tiers with clear strategies per tier.
- Psychographic segments power messaging and positioning but require qualitative research to define.
