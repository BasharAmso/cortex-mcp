---
id: PAT-0049
name: Dashboard Design
category: patterns
tags: [dashboard, data-visualization, kpi, charts, filters, drill-down, skeleton-loading, responsive-grid]
capabilities: [dashboard-layout, kpi-display, data-card-design, filter-patterns, drill-down-navigation]
useWhen:
  - designing an analytics or admin dashboard
  - laying out KPI cards, charts, and data tables
  - building filter and drill-down interactions
  - implementing skeleton loading for data-heavy pages
  - choosing chart types for different data stories
estimatedTokens: 750
relatedFragments: [SKL-0005, SKL-0012, SKL-0023, PAT-0048]
dependencies: []
synonyms: ["how to design a dashboard", "build an admin panel", "show KPI metrics", "data dashboard layout", "analytics page design", "charts and graphs page"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/dashboarddesignpatterns/dashboarddesignpatterns.github.io"
difficulty: intermediate
---

# Dashboard Design

Dashboards provide a curated lens on complex data. Good dashboards answer the user's top questions at a glance, then offer paths to explore deeper. Design for scanning first, analysis second.

## Layout Patterns

| Pattern | Best For | Description |
|---------|----------|-------------|
| Stratified | Most dashboards | KPI summary row at top, charts in middle, detail tables at bottom |
| Grid/Tiled | Equal-weight metrics | Uniform cards in a responsive grid, reorderable |
| Grouped | Multi-domain data | Visually separated sections (borders, background) per data group |
| Schematic | Spatial data | Widgets placed on maps or floor plans |

The stratified layout is the most common and safest default: high-level numbers on top, trends in the middle, raw data at the bottom.

## KPI Card Pattern

```html
<div class="kpi-card">
  <span class="kpi-label">Monthly Revenue</span>
  <span class="kpi-value">$48,200</span>
  <span class="kpi-trend positive">+12% vs last month</span>
</div>
```

KPI card rules:
- Large number as the focal point (2-3x body text size)
- Label above or below the number, never competing for attention
- Trend indicator: arrow or percentage with color coding (green positive, red negative)
- Include comparison period ("vs last month", "vs target")
- Maximum 4-6 KPI cards in the summary row

## Chart Selection Guide

| Data Story | Chart Type | Avoid |
|------------|-----------|-------|
| Trend over time | Line chart | Pie chart |
| Part of whole | Donut or stacked bar | 3D pie |
| Comparison | Horizontal bar | Radar chart |
| Distribution | Histogram or box plot | Line chart |
| Correlation | Scatter plot | Bar chart |
| Single value vs target | Gauge or progress bar | Full table |

Rules:
- Never use pie charts with more than 5 slices
- Always include axis labels and units
- Use consistent color palette across all charts
- Provide tooltips for exact values on hover

## Filter and Drill-Down

Filters belong in a persistent bar (top or sidebar), not scattered across widgets.

| Pattern | Use When |
|---------|----------|
| Date range picker | Time-series data is primary |
| Dropdown filters | 5-20 categorical options |
| Search + multi-select | Large category sets (50+) |
| Segmented control | 2-4 mutually exclusive views |
| Drill-down links | KPI cards or chart segments that open detail views |

Drill-down hierarchy: Overview > Category > Individual Record. Each level should have a breadcrumb path back.

## Skeleton Loading

Never show a blank dashboard while data loads. Use skeleton screens with a shimmer animation (`background: linear-gradient` with animated `background-position`). Match skeleton shapes to actual content. Load KPI cards first (smallest payload, highest value), then charts, then tables.

## Responsive Grid

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}
.widget-wide { grid-column: span 2; }
```

- KPI row: 4 columns on desktop, 2 on tablet, 1 on mobile
- Charts: 2 columns on desktop, full-width on mobile
- Tables: always full-width with horizontal scroll on small screens

## Anti-Patterns

- Overloading: more than 8-10 widgets per view
- Inconsistent time ranges across widgets
- Charts without labels or legends
- Real-time refresh without user control (causes distraction)
- Color as the only way to distinguish data series (accessibility failure)
- Hiding critical data behind multiple filter steps
