---
id: PAT-0221
name: SaaS Metrics Dashboard
category: patterns
tags: [saas-metrics, mrr, churn, ltv, cac, cohort-analysis, dashboard]
capabilities: [metrics-dashboard-design, mrr-tracking, cohort-visualization, unit-economics]
useWhen:
  - building a SaaS metrics dashboard for stakeholders
  - tracking MRR, churn, LTV, and CAC
  - setting up cohort analysis for subscription products
  - reporting business health to investors or leadership
  - understanding unit economics for a subscription business
estimatedTokens: 700
relatedFragments: [SKL-0428, SKL-0433, SKL-0012, SKL-0425]
dependencies: []
synonyms: ["how to track MRR", "how to calculate LTV and CAC", "SaaS dashboard metrics", "how to build a metrics dashboard", "what SaaS metrics should I track", "how to do cohort analysis for subscriptions"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# SaaS Metrics Dashboard

Essential metrics, calculations, and dashboard layout for subscription businesses.

## The Five Core SaaS Metrics

| Metric | Formula | Why It Matters |
|--------|---------|---------------|
| **MRR** | Sum of all monthly recurring revenue | Total recurring revenue health |
| **Churn Rate** | Lost customers / Start-of-period customers | Speed of customer loss |
| **LTV** | ARPU / Monthly churn rate | Total revenue per customer lifetime |
| **CAC** | Total acquisition spend / New customers | Cost to acquire one customer |
| **LTV:CAC Ratio** | LTV / CAC | Unit economics viability |

### MRR Breakdown

MRR is not a single number. Break it into components to understand growth dynamics:

| Component | Definition |
|-----------|-----------|
| **New MRR** | Revenue from new customers this month |
| **Expansion MRR** | Revenue increase from upgrades and add-ons |
| **Contraction MRR** | Revenue decrease from downgrades |
| **Churned MRR** | Revenue lost from cancellations |
| **Net New MRR** | New + Expansion - Contraction - Churned |

**Healthy sign:** Net New MRR is positive and growing. **Warning:** Churned MRR exceeds New MRR (shrinking business).

## Dashboard Layout

A well-structured metrics dashboard follows this hierarchy:

### Row 1: Health at a Glance
- **MRR** (big number + trend arrow)
- **Net New MRR** (this month vs. last)
- **Active customers** (count + trend)
- **Monthly churn rate** (% + trend)

### Row 2: Growth Dynamics
- **MRR waterfall chart** (New, Expansion, Contraction, Churned, Net)
- **Customer count waterfall** (same breakdown for logos)

### Row 3: Unit Economics
- **LTV** with trend
- **CAC** with trend
- **LTV:CAC ratio** (target > 3:1)
- **Months to recover CAC** (target < 12)

### Row 4: Cohort Analysis
- **Retention heatmap** — rows are signup cohorts (monthly), columns are months since signup, cells show % retained. Color-coded: green (above average), red (below).

## Cohort Analysis Deep Dive

Cohort analysis is the most important analytical tool for subscription businesses. Metabase and similar BI tools make this straightforward:

```
         Month 0  Month 1  Month 2  Month 3  Month 4
Jan '26   100%     72%      58%      52%      50%
Feb '26   100%     75%      62%      55%      --
Mar '26   100%     78%      65%      --       --
```

**Reading the grid:**
- Read across: How does each cohort degrade over time?
- Read down: Are newer cohorts retaining better? (Product improving?)
- Look for flattening: Where does the curve stabilize? (Your "forever" retention floor)

## Benchmark Targets

| Metric | Seed Stage | Growth Stage | Scale |
|--------|-----------|-------------|-------|
| Monthly churn | < 8% | < 5% | < 2% |
| Net revenue retention | > 90% | > 100% | > 120% |
| LTV:CAC | > 3:1 | > 3:1 | > 5:1 |
| CAC payback | < 18 months | < 12 months | < 6 months |
| MRR growth rate | > 15% m/m | > 10% m/m | > 5% m/m |

## Implementation with Metabase

Metabase (open-source BI tool) is well-suited for building SaaS dashboards:
1. Connect to your production database (read replica recommended)
2. Create saved questions for each core metric
3. Build a dashboard with the layout above
4. Set up automatic daily/weekly email reports
5. Add filters for date range, plan type, and customer segment

## Anti-Patterns

- Tracking only aggregate MRR without the waterfall breakdown
- Ignoring cohort analysis (aggregate retention hides worsening trends)
- LTV:CAC below 1:1 (spending more to acquire than you earn back)
- Vanity metrics on the dashboard (total signups, page views) instead of unit economics
- No date range filters (metrics without time context are misleading)

## Key Takeaways
- Break MRR into New, Expansion, Contraction, and Churned for actionable insights
- LTV:CAC ratio above 3:1 indicates sustainable unit economics
- Cohort retention heatmaps reveal whether the product is improving over time
- Net revenue retention above 100% means existing customers grow faster than they churn
- Build the dashboard early; data-driven decisions compound over time
