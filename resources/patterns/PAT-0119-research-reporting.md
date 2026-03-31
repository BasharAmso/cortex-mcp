---
id: PAT-0119
name: Research Reporting Pattern
category: patterns
tags: [research-reporting, executive-summary, data-visualization, actionable-insights, stakeholder-communication, decision-support]
capabilities: [executive-summary-writing, insight-visualization, recommendation-framing, report-structure-design]
useWhen:
  - writing a market research report for stakeholders
  - summarizing research findings into actionable recommendations
  - presenting data insights to non-technical audiences
  - creating an executive summary from detailed analysis
  - structuring a competitive analysis deliverable
estimatedTokens: 650
relatedFragments: [SKL-0226, SKL-0229, PAT-0118]
dependencies: []
synonyms: ["how to write a research report", "how to present research findings", "executive summary template", "how to make data actionable", "research report structure", "how to communicate insights to leadership"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Research Reporting Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0119 |
| **Name** | Research Reporting Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Research has no value until it changes a decision. The reporting pattern transforms raw findings into documents that drive action. Metabase embodies this philosophy: it exists because the gap between "data available" and "insight acted upon" is where most organizations fail. Their approach (no-code querying, interactive dashboards, scheduled subscriptions, AI-powered Metabot) is designed to close that gap. Apply the same principles to your research reports.

### The Inverted Pyramid Structure

Structure every research report top-down. Decision-makers read the top; analysts read the bottom.

**Level 1 — Executive Summary (1 page max)**
- The question we investigated.
- The answer we found (stated plainly, no hedging).
- The recommended action with expected impact.
- Key risk if we don't act.

This is the only section most executives will read. If it doesn't stand alone, the report fails.

**Level 2 — Key Findings (2-3 pages)**
- 3-5 findings, each stated as a complete sentence (not a topic label). "Customers cite pricing as the #1 reason for choosing competitors" not "Pricing."
- Each finding supported by one data point and one qualitative quote.
- Findings ordered by strategic importance, not by the sequence you discovered them.

**Level 3 — Detailed Analysis (appendix)**
- Methodology: sample size, time period, data sources, limitations.
- Full data tables, charts, and statistical details.
- Raw quotes and verbatim feedback organized by theme.

### Data Visualization Principles

Metabase supports multiple visualization types because different data requires different visual treatments. Follow these rules:

| Data Type | Best Visualization | Avoid |
|-----------|-------------------|-------|
| Trend over time | Line chart | Pie chart |
| Comparison across categories | Bar chart (horizontal for many categories) | 3D charts |
| Part of whole | Stacked bar or treemap | Pie chart with 6+ slices |
| Correlation | Scatter plot | Dual-axis charts (misleading) |
| Single key metric | Big number with trend arrow | Table with one cell |

**Rules for every chart:**
- Title states the insight, not the data ("Churn spiked 40% after the price increase" not "Monthly churn rate").
- Remove gridlines, borders, and legends when the chart is self-explanatory.
- Use color to highlight the finding, not to decorate.

### Making Recommendations Actionable

Each recommendation must include four elements:
1. **What** — The specific action to take.
2. **Why** — Which finding supports it (link back to Level 2).
3. **Impact** — Expected outcome if acted upon (quantified when possible).
4. **Effort** — Rough cost or timeline to implement.

Format recommendations as a prioritized table:

| Priority | Recommendation | Supporting Finding | Expected Impact | Effort |
|----------|---------------|--------------------|----------------|--------|
| 1 | Reduce onboarding steps from 7 to 3 | 62% of churned users never completed setup | +15% activation rate | 2 sprints |
| 2 | Add competitor comparison page | 3 of 5 lost deals cited lack of comparison info | +10% conversion | 1 sprint |

### Distribution Strategy

Metabase enables scheduled dashboard subscriptions via email, Slack, and webhooks. Apply the same thinking to report distribution:
- **Stakeholders who decide** get the executive summary via email/Slack with a link to the full report.
- **Stakeholders who execute** get the full report with the recommendations table highlighted.
- **Stakeholders who need context** get access to the appendix and raw data.

Never send a 20-page report without a 1-paragraph summary at the top. The summary is not optional.

## Key Takeaways

- Use the inverted pyramid: executive summary first, detailed analysis last. Most readers stop at page one.
- State findings as complete sentences with a data point and a quote, not topic labels.
- Chart titles should state the insight, not describe the data.
- Every recommendation needs four elements: what, why, impact, and effort.
- Distribute the right depth to the right audience. Decision-makers get the summary; executors get the recommendations table.
