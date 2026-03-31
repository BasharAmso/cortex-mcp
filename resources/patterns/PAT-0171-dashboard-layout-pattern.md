---
id: PAT-0171
name: Dashboard Layout Pattern
category: patterns
tags: [dashboard, widgets, kpi-cards, data-visualization, chart-selection, responsive-dashboard]
capabilities: [dashboard-layout, kpi-card-design, chart-selection, widget-grid, responsive-dashboard]
useWhen:
  - designing a dashboard that surfaces key metrics and data
  - choosing between different chart types for data visualization
  - laying out KPI cards, charts, and tables on a dashboard
  - making a dashboard responsive across desktop and mobile
  - deciding which metrics to surface on a summary dashboard
estimatedTokens: 650
relatedFragments: [SKL-0012, SKL-0323, PAT-0166, SKL-0328]
dependencies: []
synonyms: ["how to design a dashboard layout", "which chart type should I use", "KPI card design best practices", "how to make a responsive dashboard", "dashboard widget grid layout", "what metrics to show on a dashboard"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Dashboard Layout Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0171 |
| **Name** | Dashboard Layout Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

A dashboard is a single screen that surfaces the most important information a user needs to make decisions. The best dashboards answer specific questions at a glance. The worst ones show every metric available and answer none.

### Dashboard Anatomy

A well-structured dashboard follows a consistent visual hierarchy:

```
┌──────────────────────────────────────────────┐
│ Header: Title, date range picker, filters     │
├───────┬───────┬───────┬──────────────────────┤
│ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4               │
├───────┴───────┴───────┴──────────────────────┤
│ Primary chart (trend line, full width)        │
├──────────────────────┬───────────────────────┤
│ Secondary chart      │ Secondary chart        │
│ (bar chart)          │ (pie/donut)           │
├──────────────────────┴───────────────────────┤
│ Data table (detailed breakdown)               │
└──────────────────────────────────────────────┘
```

Hierarchy rules:
1. **Top row: KPI cards** with the 3-5 most critical numbers
2. **Middle: Primary visualization** showing the main trend or comparison
3. **Lower: Secondary charts** providing supporting context
4. **Bottom: Detail table** for users who need to drill down

### KPI Card Design

KPI cards are the first thing users read. Make them scannable:

```
┌─────────────────┐
│ Revenue          │
│ $124,500    ↑12% │
│ vs $111,200 last │
│ month            │
└─────────────────┘
```

Each KPI card should include:
- **Label**: What this metric is (plain language)
- **Current value**: The primary number, large and bold
- **Comparison**: Change vs. previous period (arrow + percentage)
- **Trend indicator**: Color-coded (green for positive, red for negative, or neutral for context-dependent)
- **Sparkline** (optional): Tiny trend line showing recent history

Limit to 3-5 KPI cards. More than 5 dilutes attention and makes none of them feel important.

### Chart Type Selection

Choose the chart type based on what question you are answering:

| Question | Chart Type | Example |
|----------|-----------|---------|
| How does it change over time? | **Line chart** | Revenue over 12 months |
| How do categories compare? | **Bar chart** (vertical) | Sales by region |
| What is the composition? | **Stacked bar** or **donut** | Traffic sources breakdown |
| What is the distribution? | **Histogram** | User session duration ranges |
| How do two variables relate? | **Scatter plot** | Price vs. conversion rate |
| What is progress toward goal? | **Progress bar** or **gauge** | Quarterly target completion |
| What is the rank order? | **Horizontal bar** | Top 10 products by revenue |

Rules:
- Never use pie charts for more than 5 slices (use horizontal bar instead)
- Always start Y-axis at zero for bar charts to avoid misleading comparisons
- Use consistent colors across charts (same metric = same color everywhere)
- Label axes clearly; do not assume users know what the chart shows

### Widget Grid System

Use a 12-column grid for flexible dashboard layouts:

| Widget Size | Columns | Use For |
|------------|---------|---------|
| Small | 3 cols (1/4 width) | KPI cards |
| Medium | 6 cols (1/2 width) | Secondary charts, small tables |
| Large | 12 cols (full width) | Primary trend chart, data tables |

Maintain consistent gutter spacing (16-24px) between widgets. Align widget heights within rows when possible.

### Responsive Dashboard

Dashboards must work on smaller screens:

| Breakpoint | Adaptation |
|-----------|-----------|
| **Desktop (1024px+)** | Full grid layout as designed |
| **Tablet (768-1023px)** | 2-column layout, KPI cards stack to 2x2 |
| **Mobile (< 768px)** | Single column, KPI cards full width, charts simplified |

On mobile:
- KPI cards stack vertically (most important first)
- Charts maintain their aspect ratio but reduce to full width
- Tables switch to a card-based view or horizontal scroll
- Filters collapse into a filter button/sheet
- Consider showing a simplified mobile dashboard with fewer widgets

### Date Range and Filters

Every dashboard needs temporal context:

- **Date range picker**: Default to a sensible period (last 30 days, current month)
- **Quick presets**: Today, 7 days, 30 days, 90 days, Year, Custom
- **Comparison toggle**: "Compare to previous period"
- **Global filters**: Applied to all widgets simultaneously (team, project, region)
- **Filter persistence**: Remember the user's last filter selection across sessions

## Anti-Patterns

- Showing 20+ metrics with no hierarchy (everything is equally unimportant)
- Pie charts with 8+ slices (unreadable; use bar charts)
- No date range picker (users cannot tell if data is current)
- 3D charts or excessive visual decoration that obscures the data
- Dashboard that requires scrolling to see the most important metrics

## Key Takeaways

- A dashboard should answer 3-5 specific questions at a glance; more metrics means less clarity
- Follow the visual hierarchy: KPI cards at top, primary chart in the middle, detail table at the bottom
- Choose chart types based on the question being answered, not aesthetics
- Use a 12-column grid for flexible widget sizing and maintain consistent spacing
- Always provide date range controls and persist filter selections across sessions
