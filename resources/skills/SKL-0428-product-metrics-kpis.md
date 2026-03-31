---
id: SKL-0428
name: Product Metrics & KPIs
category: skills
tags: [metrics, kpis, north-star, aarrr, retention, dau-mau, product-analytics]
capabilities: [metric-definition, kpi-framework, retention-analysis, growth-measurement]
useWhen:
  - defining KPIs for a new product or feature
  - choosing a north star metric
  - building a product analytics dashboard
  - measuring product-market fit quantitatively
  - reporting product health to stakeholders
estimatedTokens: 700
relatedFragments: [SKL-0427, SKL-0012, PAT-0221, SKL-0433]
dependencies: []
synonyms: ["what metrics should I track", "how to define a north star metric", "what is the AARRR framework", "how to measure product market fit", "what KPIs matter for a SaaS product", "how to track DAU MAU ratio"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Skill: Product Metrics & KPIs

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0428 |
| **Name** | Product Metrics & KPIs |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Metrics tell you whether your product is working. The challenge is not collecting data (tools make that easy) but choosing the right metrics and interpreting them honestly.

### The North Star Metric

Your north star is the single metric that best captures the value you deliver to users. Everything else ladders up to it.

| Product Type | North Star Example |
|-------------|-------------------|
| Marketplace | Transactions completed per week |
| SaaS tool | Weekly active users completing core action |
| Content platform | Time spent consuming content |
| Communication app | Messages sent per day |
| Developer tool | API calls per active account |

A good north star is: measurable, tied to user value (not vanity), leading (predicts future success), and actionable (teams can influence it).

### The AARRR (Pirate Metrics) Framework

| Stage | Metric | Question |
|-------|--------|----------|
| **Acquisition** | Signups, visits | Are people finding us? |
| **Activation** | Activation rate, time-to-value | Do they experience the core value? |
| **Retention** | D1/D7/D30 retention, DAU/MAU | Do they come back? |
| **Revenue** | MRR, ARPU, conversion rate | Do they pay? |
| **Referral** | Viral coefficient, NPS | Do they tell others? |

Work the funnel top-to-bottom. Acquisition without activation is a leaky bucket.

### Retention Curves

Retention is the most important metric for long-term viability. A healthy product shows a retention curve that flattens (not declines to zero).

- **Day 1 retention > 30%** — Users found enough value to return
- **Day 7 retention > 15%** — Habit is forming
- **Day 30 retention > 10%** — Product has staying power
- **DAU/MAU ratio > 20%** — Healthy engagement (50%+ is exceptional)

### Cohort Analysis

Never look at aggregate metrics alone. Break users into cohorts by signup week and compare their retention curves. This reveals whether your product is improving over time or just growing while losing old users.

### Vanity Metrics vs. Actionable Metrics

| Vanity (Avoid) | Actionable (Track) |
|----------------|-------------------|
| Total signups | Weekly active users |
| Page views | Conversion rate |
| App downloads | Activation rate |
| Social followers | Referral rate |
| Total revenue | MRR growth rate |

### Product-Market Fit Quantified

Sean Ellis PMF survey: "How would you feel if you could no longer use this product?"
- **> 40% say "Very disappointed"** = Strong product-market fit
- **25-40%** = Getting closer, iterate on value prop
- **< 25%** = Have not found PMF yet, pivot or refine

## Key Takeaways
- Choose one north star metric that reflects user value delivered
- Use AARRR to identify which funnel stage needs the most attention
- Retention curves that flatten indicate product viability; declining to zero means trouble
- Always analyze metrics by cohort, not in aggregate
- The 40% "very disappointed" threshold is the quantitative PMF benchmark
