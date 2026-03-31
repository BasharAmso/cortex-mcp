---
id: PAT-0120
name: Data Visualization for Research
category: patterns
tags: [data-visualization, charts, dashboards, storytelling, research-presentation, visual-analytics]
capabilities: [chart-selection, dashboard-design, data-storytelling, visual-encoding]
useWhen:
  - choosing the right chart type to communicate research findings
  - designing a dashboard to present market research data
  - building a data narrative for stakeholders or investors
  - visualizing survey results, market trends, or competitive data
  - deciding between tables, charts, and infographics for a given dataset
estimatedTokens: 650
relatedFragments: [SKL-0231, SKL-0232, PAT-0122]
dependencies: []
synonyms: ["what chart should I use for this data", "how to visualize research data", "dashboard design for market research", "data storytelling best practices", "how to present data findings", "which visualization for survey results"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Data Visualization for Research

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0120 |
| **Name** | Data Visualization for Research |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Choosing the wrong visualization obscures insight. Choosing the right one makes the finding obvious at a glance. The goal is not decoration but clarity: the viewer should understand the key takeaway within 5 seconds.

### Chart Selection by Research Question

| Research Question | Best Chart Type | Why |
|-------------------|----------------|-----|
| How does X change over time? | Line chart | Shows trend, seasonality, inflection points |
| How do categories compare? | Bar chart (horizontal for many categories) | Easy magnitude comparison |
| What is the distribution? | Histogram or box plot | Shows spread, outliers, central tendency |
| What is the part-to-whole relationship? | Stacked bar or treemap (not pie charts) | Pie charts are hard to read past 3 segments |
| How do two variables relate? | Scatter plot | Reveals correlation, clusters, outliers |
| What is the geographic pattern? | Choropleth or bubble map | Spatial relationships at a glance |
| What is the flow or conversion? | Funnel or Sankey diagram | Shows drop-off between stages |

### Dashboard Layout Principles

Business intelligence tools like Metabase demonstrate effective dashboard patterns:

1. **Lead with the KPI.** Place 3-5 key metrics at the top as large numbers with trend indicators (up/down arrows with percentage change). The viewer gets the headline before exploring details.
2. **Progressive disclosure.** Top row: KPIs. Middle: primary charts that explain the KPIs. Bottom: supporting detail and filters. The viewer drills deeper only when the headline raises a question.
3. **Filters at the top.** Date range, segment, geography. Every chart on the dashboard should respond to the same filter set for consistent context.
4. **One insight per chart.** A chart with two Y-axes or three overlaid series is trying to say too much. Split into separate charts with clear titles.
5. **Annotation over decoration.** Add reference lines (targets, benchmarks, prior period) and callout text for anomalies. Remove gridlines, borders, and 3D effects.

### Data Storytelling Structure

When presenting research findings, follow the narrative arc:

1. **Setup:** What question did we investigate and why does it matter?
2. **Tension:** What did the data reveal that challenges assumptions or demands attention?
3. **Resolution:** What does this mean for our strategy, and what action should we take?

Each visualization in the presentation should advance this arc. If a chart does not serve the narrative, cut it.

### Visual Encoding Best Practices

- **Position** is the most accurate visual encoding (bar length, scatter position). Use it for your most important comparisons.
- **Color** communicates category or intensity, not precise values. Limit to 5-7 distinct colors. Use colorblind-safe palettes.
- **Size** (bubble radius) is the least accurate encoding. Use it only as a secondary dimension.
- **Labels beat legends.** Direct-label data points when space permits rather than forcing the viewer to look back and forth to a legend.

### Common Pitfalls

- Using pie charts for more than 3 categories (switch to horizontal bar).
- Truncating Y-axis to exaggerate small differences.
- Presenting raw data without summary or annotation ("here is the data" is not an insight).
- Using color as the sole means of distinguishing categories (accessibility issue).

## Key Takeaways

- Match chart type to research question; the wrong chart hides the insight
- Lead dashboards with 3-5 KPIs, then progressively disclose supporting detail
- Structure data presentations as setup, tension, resolution; every chart should advance the narrative
- Position (bar length, axis placement) is the most accurate visual encoding; use it for primary comparisons
- Annotate charts with reference lines and callouts rather than relying on the viewer to find the insight
