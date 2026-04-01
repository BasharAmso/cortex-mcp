---
id: SKL-0392
name: IoT Dashboard Design
category: skills
tags: [dashboard, visualization, real-time, grafana, gauges, device-status, alerts]
capabilities: [dashboard-layout, real-time-visualization, alert-display, historical-charting]
useWhen:
  - building a dashboard to monitor IoT devices and sensors
  - displaying real-time gauge and chart data from telemetry streams
  - designing alert and notification panels for device status
  - choosing visualization types for different sensor data
  - creating historical trend views for time-series data
estimatedTokens: 650
relatedFragments: [PAT-0076, PAT-0203, SKL-0149, PAT-0201, EX-0028]
dependencies: []
synonyms: ["how to build an IoT dashboard", "show sensor data on a screen", "real-time device monitoring UI", "grafana for IoT", "visualize temperature readings", "device status page design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/grafana/grafana"
difficulty: beginner
owner: "cortex"
pillar: "iot"
---

# Skill: IoT Dashboard Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0392 |
| **Name** | IoT Dashboard Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

An IoT dashboard translates raw device telemetry into actionable information. The goal is not to display all available data but to surface what matters for decision-making.

### Visualization Selection Guide

Match the visualization type to the data characteristic:

| Data Type | Best Visualization | Example |
|-----------|-------------------|---------|
| Current value (single number) | Stat panel or gauge | Current temperature: 72F |
| Value with threshold | Gauge with colored zones | CPU usage with green/yellow/red bands |
| Change over time | Line chart (time-series) | Temperature over last 24 hours |
| Multiple related values | Stacked area or grouped bar | Energy consumption by room |
| Binary state | Status indicator (on/off dot) | Door open/closed, device online/offline |
| Geographic distribution | Map with markers | Sensor locations across a facility |
| Event log | Table with timestamps | Recent motion detections, door openings |

### Dashboard Layout Principles

Grafana's dashboard design patterns apply broadly to any IoT visualization:

1. **Top row: summary stats.** Show the 3-5 most critical values as large stat panels. These should answer "is everything okay?" at a glance.
2. **Middle section: trends.** Time-series charts showing patterns over configurable windows (1h, 24h, 7d). Users spend most time here diagnosing issues.
3. **Bottom section: details.** Tables, logs, and secondary metrics for deep investigation.
4. **Sidebar or top bar: alerts.** Active alerts with severity indicators (critical, warning, info). Always visible regardless of scroll position.

### Real-Time Update Strategy

- **Polling**: Refresh dashboard every 5-30 seconds. Simple and reliable. Grafana uses this by default.
- **WebSocket push**: Server pushes updates on change. Lower latency but more complex. Use for critical real-time indicators (security, safety).
- **Hybrid**: Poll for historical charts, push for current-value panels. Best balance of simplicity and responsiveness.

Avoid refreshing faster than your data source updates. If sensors report every 30 seconds, refreshing the dashboard every 5 seconds wastes resources with no benefit.

### Alert Integration

Dashboards should surface alerts prominently without requiring users to check a separate system:
- Color-code panels when values breach thresholds (green to yellow to red)
- Show an alert count badge in the header
- Include an alert history panel showing recent triggers and resolutions
- Link from alert to the relevant detail panel for investigation

### Common Pitfalls

- **Data overload**: Showing every sensor on one page. Group by room, device type, or function instead.
- **Missing time context**: Always show timestamps and time range selectors. "72 degrees" means nothing without knowing when.
- **No mobile consideration**: IoT dashboards are frequently checked on phones. Design panels to stack vertically on narrow screens.

## Key Takeaways

- Match visualization type to data characteristic: gauges for current values, line charts for trends, status dots for binary state
- Organize dashboards top-to-bottom: summary stats, trend charts, detail tables
- Refresh rate should match data source update frequency, not faster
- Surface alerts directly on the dashboard with color-coded severity
- Design for mobile: IoT dashboards are often checked on phones
