---
id: PAT-0103
name: Small Business Analytics
category: patterns
tags: [analytics, dashboards, revenue-tracking, customer-lifetime-value, trend-analysis, data-visualization]
capabilities: [dashboard-creation, metric-tracking, trend-identification, report-scheduling]
useWhen:
  - building a revenue dashboard for a small business
  - tracking customer lifetime value and repeat purchase rates
  - identifying busiest hours and seasonal trends
  - setting up automated reports for weekly business reviews
  - choosing which metrics to track without a data analytics background
estimatedTokens: 650
relatedFragments: [SKL-0194, PAT-0101, PAT-0100]
dependencies: []
synonyms: ["how do I build a business dashboard", "what metrics should a small business track", "how to calculate customer lifetime value", "how do I identify my busiest hours and days", "how to set up automated weekly business reports"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Small Business Analytics

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0103 |
| **Name** | Small Business Analytics |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Small business analytics is about answering specific business questions with data you already have. Metabase demonstrates this philosophy: non-technical users can "ask questions" of their data without writing SQL, build "handsome, interactive dashboards," and schedule automated reports to email or Slack. The key insight is that useful analytics does not require a data team; it requires asking the right questions of the data your POS, invoicing, and booking systems already collect.

### The Five Essential Metrics

Start with five metrics that apply to nearly every small business:

1. **Revenue by period**: Daily, weekly, and monthly revenue with trend lines. This is your pulse. Track it on a rolling 12-month view to see seasonal patterns.
2. **Average transaction value**: Total revenue divided by number of transactions. A declining average signals discounting problems or product mix shifts.
3. **Customer count**: New customers versus returning customers per period. A healthy business grows new customers while retaining existing ones.
4. **Top products/services**: Ranked by revenue and by quantity sold. These are often different lists, and both matter.
5. **Outstanding receivables**: For B2B or invoiced businesses, track unpaid invoices by aging bucket (current, 30 days, 60 days, 90+ days).

Metabase's question builder lets you create each of these without SQL knowledge by selecting a table, applying filters, and choosing a visualization type.

### Customer Lifetime Value

Customer lifetime value (CLV) predicts total revenue from a customer over the entire relationship. The simplified formula for small businesses: `CLV = average purchase value * purchase frequency per year * average customer lifespan in years`. If your average customer spends $25 per visit, comes 3 times per month (36 times per year), and stays for 2 years, their CLV is $25 * 36 * 2 = $1,800. This number tells you how much you can afford to spend acquiring a new customer and which customer segments deserve the most attention.

### Busiest Hours and Day Analysis

Service businesses and retail benefit enormously from understanding traffic patterns. Create a heatmap showing transaction count by hour of day and day of week. This reveals:

- **Peak staffing needs**: Schedule your strongest team during high-traffic windows
- **Promotion opportunities**: Slow periods (Tuesday 2-4 PM) are candidates for targeted promotions
- **Operational efficiency**: If prep work overlaps with peak hours, restructure the schedule

Metabase's visualization tools render this as an interactive dashboard that updates automatically as new transaction data flows in.

### Dashboard Design for Business Owners

A business owner dashboard should answer the question "how is my business doing" in under 30 seconds. Organize it in three sections:

- **Today**: Revenue so far today vs. same day last week, transaction count, and any alerts (low stock, overdue invoices)
- **This Week/Month**: Revenue trend, customer count, and top-selling items
- **Health Indicators**: Average transaction value trend, customer return rate, and receivables aging

Metabase supports dashboard filters, auto-refresh, and fullscreen mode so this can display on a mounted screen in the back office.

### Automated Reporting

Manual report generation does not happen consistently. Metabase's scheduling feature lets you "schedule dashboard subscriptions to email, Slack, or even a webhook." Set up a weekly business review email that arrives Monday morning with last week's key metrics. Set up daily alerts for anomalies: revenue dropping below a threshold, inventory hitting reorder points, or no-show rates spiking. Alerts and subscriptions transform analytics from something you check into something that notifies you.

### Starting Without a Data Warehouse

Most small businesses do not need a data warehouse. Connect Metabase directly to your existing database (the PostgreSQL, MySQL, or SQLite behind your POS, booking, or invoicing system). Start with three dashboards: daily operations, weekly review, and monthly trends. Add complexity only when you have a specific question the current setup cannot answer.

## Key Takeaways

- Track five essential metrics first: revenue, average transaction value, customer count, top products, and receivables
- Calculate customer lifetime value to guide acquisition spending and retention priorities
- Use hour-by-day heatmaps to optimize staffing and identify promotion opportunities for slow periods
- Design dashboards that answer "how is my business doing" in under 30 seconds
- Automate weekly reports and anomaly alerts so analytics comes to you instead of waiting to be checked
