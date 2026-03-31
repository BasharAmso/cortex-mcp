---
id: PAT-0184
name: Health Dashboard Pattern
category: patterns
tags: [health-dashboard, vitals, trends, goals, alerts, wellness, data-visualization, monitoring]
capabilities: [vitals-overview-design, trend-visualization, goal-tracking, health-alerts]
useWhen:
  - designing a health or wellness dashboard
  - displaying vital signs and health metrics overview
  - showing health trends over time with goal progress
  - implementing health alert thresholds and notifications
  - creating a unified view of multiple health data sources
estimatedTokens: 650
relatedFragments: [SKL-0358, SKL-0362, PAT-0186, PAT-0187]
dependencies: []
synonyms: ["how to design a health dashboard", "vitals overview screen layout", "health metrics visualization", "wellness dashboard components", "patient health summary display", "fitness stats dashboard design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Health Dashboard Pattern

A health dashboard gives users a single-screen overview of their most important health metrics, trends, and goals. It must balance information density with clarity since overwhelming users with data causes disengagement.

## Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│  Good morning, Sarah        Today: March 30     │
│  Your health score: 82/100  ↑ 3 from last week  │
├──────────────────────┬──────────────────────────┤
│  ❤️ Heart Rate        │  😴 Sleep                │
│  68 bpm (resting)    │  7h 23m (goal: 8h)      │
│  ▁▂▃▂▁▂▃▄▃▂         │  Deep: 1h 45m           │
│  Range: 58-112 today │  Quality: Good           │
├──────────────────────┼──────────────────────────┤
│  🚶 Steps             │  🔥 Calories             │
│  6,234 / 10,000      │  1,850 / 2,200          │
│  [██████░░░░] 62%    │  [████████░░] 84%       │
│  1.2 km remaining    │  350 remaining           │
├──────────────────────┴──────────────────────────┤
│  📊 Weekly Trends                                │
│  Steps: ↑ 12%  Sleep: ↔ stable  HR: ↓ 2bpm     │
├─────────────────────────────────────────────────┤
│  ⚠️ Alerts                                       │
│  • Blood pressure reading due (last: 14 days)   │
│  • Medication refill needed in 5 days            │
└─────────────────────────────────────────────────┘
```

## Card Component Pattern

Each health metric follows a consistent card structure:

```typescript
interface HealthCard {
  title: string;              // 'Heart Rate'
  currentValue: string;       // '68 bpm'
  qualifier: string;          // 'resting'
  goal?: { target: number; current: number; unit: string };
  trend: 'up' | 'down' | 'stable';
  trendValue: string;         // '↑ 3 from last week'
  sparkline: number[];        // Mini chart data points
  status: 'normal' | 'warning' | 'alert';
  lastUpdated: Date;
}
```

Design principles for health cards:
- Show the current value prominently (large font, high contrast)
- Include context (resting vs. active, goal progress, trend direction)
- Use sparkline mini-charts for at-a-glance trend visibility
- Color-code status: green (on track), yellow (needs attention), red (action required)

## Alert System

Health alerts drive action. Prioritize by urgency:

| Priority | Example | Behavior |
|----------|---------|----------|
| **Critical** | Heart rate above 120 at rest | Push notification + dashboard banner |
| **Warning** | Missed 3 medication doses this week | Dashboard card highlight |
| **Informational** | New weekly report available | Badge indicator only |
| **Reminder** | Blood pressure check due | Gentle prompt in dashboard |

```typescript
interface HealthAlert {
  id: string;
  priority: 'critical' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  actionLabel?: string;       // 'Log blood pressure'
  actionUrl?: string;
  dismissible: boolean;       // Critical alerts are not dismissible
  createdAt: Date;
  expiresAt?: Date;
}
```

## Trend Visualization

Show trends at multiple time scales:

- **Today**: hourly data points as a sparkline or area chart
- **This week**: daily aggregates with day-over-day comparison
- **This month**: weekly averages with 30-day trend line
- **Custom range**: user-selectable date range for deeper analysis

Use relative comparisons ("12% more steps than last week") rather than just raw numbers. Relative changes are more meaningful and motivating.

## Personalization

Not every metric matters to every user:

- Let users choose which cards appear on their dashboard (drag-and-drop reorder)
- Default to the 4-6 most commonly tracked metrics
- Show "Add metric" card at the bottom for discovery
- Remember card arrangement across sessions

## Key Takeaways

- Lead with the most important metric (user-configurable) and limit to 4-6 cards
- Every card needs current value, trend direction, and goal progress at a glance
- Color-code alerts by urgency and make critical alerts non-dismissible
- Show relative trends ("12% more than last week") rather than only absolute numbers
- Let users personalize which metrics appear and in what order
