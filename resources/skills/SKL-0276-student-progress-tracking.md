---
id: SKL-0276
name: Student Progress Tracking
category: skills
tags: [analytics, progress, gradebook, dashboards, learning-analytics, completion]
capabilities: [progress-calculation, grade-management, learning-dashboards, completion-reporting]
useWhen:
  - building dashboards to show student or course progress
  - implementing grade books or scoring systems
  - tracking course completion rates and drop-off points
  - creating learning analytics for instructors
  - designing student-facing progress indicators
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0275, PAT-0143]
dependencies: []
synonyms: ["how to track student progress", "build a grade book", "learning analytics dashboard", "course completion tracking", "show progress to students", "student performance metrics"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Student Progress Tracking

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0276 |
| **Name** | Student Progress Tracking |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Progress tracking answers two questions: "How far along is this student?" and "Where are students getting stuck?" The first serves students and instructors. The second drives course improvement.

### Event-Sourced Progress Model

Record every learning event as an immutable log entry:

```
progress_events: student_id, course_id, block_id, event_type, score, timestamp, metadata
```

Event types include: `block_started`, `block_completed`, `quiz_submitted`, `video_watched`, `assignment_graded`. From these raw events, compute derived metrics (completion percentage, average score, time spent). Never store only the derived value -- you lose the ability to recalculate when grading rules change.

### Completion Calculation

Completion is hierarchical. Define a completion rule at each level:

- **Block**: depends on type (video = watched 90%+, quiz = submitted, text = viewed)
- **Lesson**: all required blocks completed
- **Section**: all required lessons completed
- **Course**: all required sections completed OR score above threshold

Cache completion percentages in a `progress_summary` table for fast reads. Recalculate when underlying events change. Use a background job for recalculation, not synchronous updates.

### Grade Book

A grade book maps assessable blocks (quizzes, assignments, projects) to weighted scores. Define a grading policy per course:

```
grading_policy: { quizzes: 30%, assignments: 40%, final_project: 30% }
```

Support multiple grading modes: points-based, percentage-based, pass/fail, and rubric-based. Allow instructors to override individual scores with an audit trail. Display both the raw score and the weighted contribution to the final grade.

### Student-Facing Dashboard

Students need three things at a glance: **where they are** (current lesson), **how far along** (progress bar per section), and **what is next** (next uncompleted block). Use visual progress indicators -- filled circles for completed, half-filled for in-progress, empty for not started. Show estimated time remaining based on average completion pace.

### Instructor Analytics

Instructors need aggregate views: enrollment trends, completion funnel (how many students finish each section), average scores per assessment, and time-on-task distribution. Highlight problem spots -- blocks where completion drops sharply or average scores are unusually low. These signals drive content revision.

### Drop-off Detection

Track the "last active" timestamp per enrollment. Students inactive for a configurable threshold (e.g., 7 days) enter an "at risk" state. Surface at-risk students in the instructor dashboard. Optionally trigger automated re-engagement emails.

## Key Takeaways

- Store raw learning events and derive progress metrics from them, never just the summary
- Completion rules vary by block type -- define them explicitly per content type
- Grade books need weighted policies with instructor override capability
- Student dashboards should answer: where am I, how far along, what is next
- Track drop-off signals to enable instructor intervention before students disappear
