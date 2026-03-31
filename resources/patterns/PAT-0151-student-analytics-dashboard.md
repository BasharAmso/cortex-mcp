---
id: PAT-0151
name: Student Analytics Dashboard
category: patterns
tags: [analytics, student-engagement, at-risk-detection, learning-outcomes, dashboards, retention]
capabilities: [engagement-metrics-design, at-risk-identification, learning-outcome-tracking, analytics-dashboard-architecture]
useWhen:
  - building an instructor dashboard showing student engagement
  - implementing at-risk student detection and early warnings
  - designing learning outcome metrics and reporting
  - tracking course completion rates and drop-off points
  - creating institutional analytics for administrators
estimatedTokens: 650
relatedFragments: [SKL-0147, SKL-0290, SKL-0287, PAT-0149]
dependencies: []
synonyms: ["how to track student engagement", "at-risk student detection system", "learning analytics dashboard", "course completion metrics", "how to identify struggling students", "student performance reporting"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Pattern: Student Analytics Dashboard

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0151 |
| **Name** | Student Analytics Dashboard |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Student analytics translate raw platform activity into actionable insights for instructors and administrators. The goal is not data volume but **signal clarity** — surfacing the students who need attention and the content that needs improvement. Architecture draws from product analytics patterns (event tracking, funnels, cohorts) adapted for educational outcomes.

### Event Tracking Foundation

Track these core events as the data layer for all metrics:

| Event | Properties | Purpose |
|-------|-----------|---------|
| `lesson.viewed` | student_id, lesson_id, duration_seconds | Engagement depth |
| `assessment.submitted` | student_id, assessment_id, score, attempt_number | Performance tracking |
| `assignment.submitted` | student_id, assignment_id, submitted_at, is_late | Submission behavior |
| `video.watched` | student_id, video_id, percent_watched, paused_at[] | Content engagement |
| `discussion.posted` | student_id, thread_id, is_reply | Participation |
| `session.started` / `session.ended` | student_id, duration, pages_visited | Activity patterns |

Store events in an append-only event store (PostgreSQL with time partitioning, or a dedicated analytics DB like ClickHouse for scale). Keep raw events immutable; compute metrics as materialized views or scheduled aggregations.

### Instructor Dashboard Metrics

Organize the instructor view into three panels:

**Panel 1 — Class Overview**
- Total active students (logged in within 7 days) vs enrolled
- Average course progress (% of modules completed)
- Average assessment score with distribution histogram
- Submission rate (% of assignments submitted on time)

**Panel 2 — Content Effectiveness**
- Per-lesson average time spent (flag outliers: too short = skipped, too long = confusing)
- Per-assessment average score (flag assessments where >30% score below passing)
- Video completion rates (identify where students drop off)
- Discussion participation rate per module

**Panel 3 — Student Roster**
- Sortable table: student name, last active, progress %, average score, submissions on time, risk flag
- Click-through to individual student detail view

### At-Risk Detection

At-risk detection uses a composite score from multiple signals. A simple weighted model:

```
risk_score = (
  0.30 * inactivity_score +     // Days since last login, normalized 0-1
  0.25 * grade_trend_score +     // Declining grades over last 3 assessments
  0.20 * submission_score +      // Late or missing submissions ratio
  0.15 * engagement_score +      // Below-average time on content
  0.10 * participation_score     // No discussion posts or questions
)
```

Thresholds: `risk_score > 0.7` = high risk (red), `0.4-0.7` = moderate (yellow), `< 0.4` = on track (green). Always display with text labels alongside colors for accessibility.

**Alert system**: When a student crosses from moderate to high risk, send the instructor a notification with the specific contributing factors. Generic "student at risk" alerts without context get ignored.

### Individual Student View

The detail view for a single student shows:
- **Activity timeline** — Login sessions plotted on a calendar heatmap (like GitHub contribution graphs). Reveals patterns: regular vs. cramming before deadlines.
- **Grade trajectory** — Line chart of assessment scores over time. Overlay the class average for comparison.
- **Module progress** — Checklist of modules with completion status, time spent, and scores. Highlight gaps.
- **Engagement signals** — Video watch patterns, discussion posts, time between content access and submission.

### Institutional Analytics

For administrators overseeing multiple courses:
- **Course health matrix** — Grid of courses with completion rate, average satisfaction, and at-risk student count. Color-coded for quick scanning.
- **Instructor comparison** — Average student outcomes per instructor (anonymized in large institutions). Identifies courses that may need instructional support.
- **Cohort analysis** — Compare outcomes across enrollment terms, demographics, or course formats (online vs. hybrid). Requires careful handling of demographic data under FERPA.
- **Retention funnel** — Enrollment > First lesson > Midpoint > Completion. Identify the stage with highest drop-off across the institution.

### Performance Considerations

Analytics queries are expensive. Protect the production database:
- Run aggregation queries against a read replica or separate analytics database
- Pre-compute daily and weekly rollups via scheduled jobs (not real-time for dashboard metrics)
- Cache dashboard responses with 15-minute TTL — instructors do not need second-level freshness
- At-risk scoring runs as a nightly batch job, not on every page load

## Key Takeaways

- Track 6-8 core events consistently; derive all metrics from these rather than adding ad-hoc counters
- At-risk detection requires a composite score from multiple signals — no single metric is reliable alone
- Alert instructors with specific contributing factors, not just "student at risk" flags
- Pre-compute aggregations and cache dashboard responses; analytics queries should never hit the production database
- Pair every color-coded indicator with a text label for accessibility compliance
