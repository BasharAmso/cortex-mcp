---
id: PAT-0111
name: Sales Dashboard Pattern
category: patterns
tags: [sales, dashboard, pipeline, metrics, forecasting, leaderboard]
capabilities: [pipeline-visualization, activity-tracking, forecast-charting, performance-leaderboards]
useWhen:
  - building a sales pipeline dashboard for leadership
  - visualizing rep activity metrics and conversion rates
  - creating forecast charts for revenue planning
  - designing leaderboards to drive healthy competition
  - monitoring sales health indicators in real time
estimatedTokens: 650
relatedFragments: [SKL-0213, PAT-0113, PAT-0112]
dependencies: []
synonyms: ["how do I build a sales dashboard", "what is the best way to visualize pipeline", "sales metrics dashboard", "pipeline view design", "sales leaderboard setup", "forecast chart for sales"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Pattern: Sales Dashboard

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0111 |
| **Name** | Sales Dashboard Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

A sales dashboard turns CRM data into actionable visibility. Metabase's approach of letting anyone ask questions of data without SQL makes it particularly well-suited: sales leaders can build and iterate on dashboards without waiting for engineering.

### The Four Essential Views

Every sales dashboard needs four core views. Resist the temptation to add more until these four are solid.

**1. Pipeline View**

A horizontal funnel or kanban showing deal count and value at each stage. The most important metric is not total pipeline value but **stage-to-stage conversion rates**. If 100 deals enter Discovery but only 5 make it to Proposal, the problem is qualification, not lead generation.

Metabase's built-in chart types (bar, funnel, row) handle this well. Use filters for time period, rep, and segment so the same dashboard serves multiple audiences.

**2. Activity Metrics**

Leading indicators that predict future pipeline health:
- Calls made, emails sent, meetings booked (per rep, per week)
- New opportunities created
- Pipeline generated (dollar value of new opportunities)

Activity metrics matter because pipeline is a lagging indicator. By the time pipeline looks thin, it is too late to fix. Activity metrics give you 30-60 days of lead time.

**3. Leaderboard**

A ranked view of reps by a chosen metric (revenue closed, pipeline generated, meetings booked). Leaderboards drive healthy competition when used correctly:
- Show the **top performers**, not the bottom. Public shaming demotivates.
- Rotate the metric monthly to reward different selling behaviors.
- Include a "most improved" category so ramping reps can compete.

**4. Forecast Chart**

A time-series chart showing committed, best-case, and pipeline revenue against the quarterly or monthly target. Metabase's dashboard subscriptions can email this chart weekly to leadership, replacing the manual "send me the forecast" request.

Build the forecast with three layers:
- **Closed-won**: revenue already in the bank.
- **Committed**: deals the rep and manager agree will close this period.
- **Upside**: deals that could close but are not certain.

### Design Principles

- **One screen, one story**: each dashboard should answer one question. Do not combine pipeline health and rep activity on the same screen.
- **Filters over dashboards**: use Metabase's filter widgets to let users slice by rep, team, time period, and segment rather than building separate dashboards for each.
- **Auto-refresh**: set dashboards to refresh every 15-30 minutes during business hours so the data feels alive.
- **Mobile-friendly**: sales leaders check dashboards on phones between meetings. Ensure the layout works on small screens.

### Common Anti-Patterns

- **Vanity metrics**: showing total pipeline without conversion rates makes everyone feel good while hiding problems.
- **Data lag**: if the dashboard shows yesterday's data, reps will not trust it. Real-time or near-real-time is essential.
- **Too many charts**: more than 6-8 charts per dashboard causes cognitive overload. Edit ruthlessly.

## Key Takeaways

- Build four views first: pipeline, activity metrics, leaderboard, and forecast chart.
- Stage-to-stage conversion rates matter more than total pipeline value.
- Activity metrics are leading indicators; pipeline is lagging. Track both.
- Use filters instead of building separate dashboards for each team or segment.
- Keep dashboards to 6-8 charts maximum and ensure they render well on mobile.
