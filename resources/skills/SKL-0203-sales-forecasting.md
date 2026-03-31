---
id: SKL-0203
name: Sales Forecasting
category: skills
tags: [sales-forecasting, revenue-prediction, pipeline-analytics, forecast-accuracy, sales-metrics, data-analysis]
capabilities: [forecast-modeling, pipeline-analysis, revenue-prediction, forecast-accuracy-tracking]
useWhen:
  - building sales forecasting features in a CRM or dashboard
  - predicting quarterly revenue from pipeline data
  - measuring and improving forecast accuracy
  - designing sales analytics dashboards
  - setting up weighted pipeline forecasting
estimatedTokens: 650
relatedFragments: [SKL-0199, PAT-0105, SKL-0197]
dependencies: []
synonyms: ["how to forecast sales", "how to predict revenue", "what is pipeline forecasting", "how to build a sales dashboard", "best way to forecast deals", "how accurate is my sales forecast"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Skill: Sales Forecasting

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0203 |
| **Name** | Sales Forecasting |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Sales forecasting predicts how much revenue your team will close in a given period. Analytics tools like Metabase make it possible for anyone to query pipeline data and build forecasting dashboards without writing SQL. The key is choosing the right forecasting method and tracking accuracy so the forecast improves over time.

### Forecasting Methods

**1. Weighted Pipeline Forecasting**
Multiply each deal's value by its stage probability:

```
Forecast = SUM(Deal Value x Stage Probability)
```

Example: A $100K deal at Proposal stage (60% probability) contributes $60K to the forecast. Simple, widely used, but only as good as your probability assumptions.

**2. Historical Conversion Forecasting**
Use actual conversion rates from past data instead of assumed probabilities:

```
Forecast = Deals in Stage x Historical Conversion Rate x Avg Deal Size
```

This is more accurate because it reflects your team's real performance, not theoretical stage weights.

**3. Rep-Based Forecasting (Bottom-Up)**
Each rep commits to a number based on their assessment of each deal. Roll up for the team forecast. Most accurate when reps are experienced and honest, but subject to sandbagging and optimism bias.

**4. Multi-Variable Forecasting**
Combine pipeline data with engagement signals, historical patterns, and external factors:

- Deal age (older deals close at lower rates)
- Number of stakeholders engaged
- Competitor presence in the deal
- Time of year (seasonal patterns)

### Building Forecast Dashboards

Using Metabase's approach of connecting directly to your database:

1. **Pipeline snapshot query:** Current pipeline value by stage, with weighted forecast.
2. **Forecast vs. actual trend:** Compare predicted revenue to actual closed revenue over past quarters.
3. **Forecast accuracy metric:** `1 - ABS(Forecast - Actual) / Actual`. Track this monthly.
4. **Coverage ratio gauge:** Pipeline value / Quota target. Green above 3x, yellow at 2-3x, red below 2x.
5. **Deal aging report:** Deals past their expected close date, flagged for review.

### Forecast Categories

Layer deal-level confidence on top of stage probability:

| Category | Definition | Weight |
|----------|-----------|--------|
| **Commit** | Rep is confident this closes | 90% |
| **Best Case** | Likely but not certain | 60% |
| **Pipeline** | Possible, needs work | 30% |
| **Upside** | Long shot | 10% |

### Common Forecasting Mistakes

- **Counting on big deals:** One large deal skews the entire forecast. Separate whale deals from the base forecast.
- **Ignoring deal velocity:** A deal that has been in Negotiation for 3 months is not the same as one that arrived last week. Factor in deal age.
- **Static probabilities:** Update stage probabilities quarterly based on actual conversion data.
- **No accountability loop:** If forecasts are never compared to actuals, they never improve.

## Key Takeaways

- Weighted pipeline forecasting is the starting point; graduate to historical conversion rates as you accumulate data.
- Track forecast accuracy (`1 - ABS(Forecast - Actual) / Actual`) and review it monthly.
- Maintain 3x+ pipeline coverage ratio as a leading indicator of quota attainment.
- Separate large deals from the base forecast to reduce volatility.
- Build dashboards that show pipeline snapshots, forecast trends, and deal aging in one view.
