---
id: SKL-0187
name: Small Business Reporting
category: skills
tags: [reporting, dashboards, analytics, revenue-tracking, kpis, data-visualization]
capabilities: [dashboard-creation, report-scheduling, revenue-analytics, inventory-tracking]
useWhen:
  - building daily or weekly business reports
  - creating dashboards for revenue and customer metrics
  - setting up automated report delivery to stakeholders
  - tracking inventory levels and sales trends
  - making data-driven decisions without SQL knowledge
estimatedTokens: 650
relatedFragments: [SKL-0190, SKL-0188, PAT-0098]
dependencies: []
synonyms: ["how do I track my business revenue", "how to create a dashboard for my store", "weekly business reports for small business", "how to see my sales data", "simple analytics for my business", "business dashboard for owners", "daily sales report"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Small Business Reporting

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0187 |
| **Name** | Small Business Reporting |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Small business reporting turns raw transaction data into decisions. Metabase, an open-source business intelligence tool, demonstrates how to make data accessible to non-technical business owners with a setup time measured in minutes, not weeks.

### The Four Reports Every Small Business Needs

1. **Daily Revenue Summary**: Total sales, transaction count, average order value, and comparison to the same day last week. This is your daily health check.
2. **Weekly Customer Report**: New vs returning customers, top customers by spend, and customer acquisition source. Tells you where growth is coming from.
3. **Monthly P&L Snapshot**: Revenue minus costs by category. Even a rough version beats flying blind.
4. **Inventory Status** (if applicable): Current stock levels, items below reorder threshold, and days-of-supply estimate per product.

### Dashboard Design

Metabase lets non-technical users "ask questions" about their data without writing SQL, using a visual query builder. Apply this principle: your dashboards should answer questions in under 5 seconds. Put the most important number (usually today's revenue) in the top-left, largest. Use filters for date range and location. Enable auto-refresh for dashboards displayed on a wall screen.

Design tip: limit each dashboard to 6-8 cards. More than that and nobody reads them. Create separate dashboards for daily operations vs monthly strategy reviews.

### Connecting Your Data

Metabase connects to PostgreSQL, MySQL, MongoDB, and dozens of other databases. For small businesses, your data likely lives in: your POS system's database, your ecommerce platform's API, your accounting software (QuickBooks, Xero), and spreadsheets. The integration pattern is: extract data into a simple database (even SQLite works for small volumes), then point Metabase at it.

### Scheduled Reports

Metabase's dashboard subscriptions deliver reports via email, Slack, or webhooks on a schedule. Set up three automated deliveries: daily morning revenue email to the owner, weekly Monday customer report to the team, and monthly P&L to your accountant. Automated delivery means reports get read. Reports that require manual login get ignored.

### Metrics That Matter

Avoid vanity metrics. For a small business, track these KPIs: **revenue per day**, **gross margin**, **customer acquisition cost**, **repeat purchase rate**, and **average order value**. Each metric should have a target and a trend direction. Metabase's visualization tools make trend lines and comparisons straightforward to set up.

### Starting Simple

You do not need a data warehouse to start. Connect Metabase directly to your application database (use a read replica if available to avoid impacting performance). Build one dashboard. Use it for a week. Then iterate based on what questions you actually ask.

## Key Takeaways

- Start with four reports: daily revenue, weekly customers, monthly P&L, and inventory status
- Keep dashboards to 6-8 cards maximum so they actually get read
- Automate report delivery via email or Slack on a fixed schedule
- Track five core KPIs: revenue, gross margin, acquisition cost, repeat rate, and average order value
- Connect directly to your existing database to start, no data warehouse required
