---
id: SKL-0147
name: Course & LMS Design
category: skills
tags: [lms, course-design, enrollment, progress-tracking, certificates, content-hierarchy, learning-management]
capabilities: [lms-architecture, course-content-modeling, learner-progress-systems]
useWhen:
  - building a learning management system or course platform
  - designing course content hierarchy (courses, modules, lessons)
  - implementing enrollment and progress tracking
  - adding certificates or completion verification
  - modeling roles like instructor, learner, and admin
estimatedTokens: 650
relatedFragments: [PAT-0073, PAT-0074, SKL-0148, EX-0027]
dependencies: []
synonyms: ["how to build an online course platform", "course module lesson structure", "how to track student progress", "how to issue certificates", "LMS database design", "how to build an e-learning site"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/lms"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Course & LMS Design

A learning management system organizes content into a hierarchy, tracks who enrolled, what they completed, and whether they earned a credential. Keep the content model simple and the progress tracking precise.

## Content Hierarchy

```
Course
  └── Chapter (or Module)
        └── Lesson
              └── Content Block (video, text, quiz, assignment)
```

Three levels is the sweet spot. Courses contain chapters that provide thematic grouping. Chapters contain lessons that are the atomic learning unit. A lesson holds one or more content blocks of different types.

## Data Model (Core Entities)

| Entity | Key Fields | Notes |
|--------|-----------|-------|
| **Course** | title, description, status (draft/published/archived), instructor_id, thumbnail | Top-level container |
| **Chapter** | title, course_id, sort_order | Groups lessons by topic |
| **Lesson** | title, chapter_id, sort_order, content_type, estimated_minutes | The unit learners complete |
| **Enrollment** | user_id, course_id, enrolled_at, status (active/completed/dropped) | Links learner to course |
| **Progress** | user_id, lesson_id, status (not_started/in_progress/completed), completed_at | Tracks per-lesson completion |
| **Certificate** | user_id, course_id, issued_at, template_id, verification_code | Proof of completion |

## Roles and Permissions

| Role | Can Do |
|------|--------|
| **Admin** | Create courses, manage users, view all analytics |
| **Instructor** | Create and edit own courses, view enrolled learners, grade assignments |
| **Learner** | Browse catalog, enroll, consume content, submit assignments, earn certificates |

## Progress Tracking

1. **Track at the lesson level.** Mark each lesson as not_started, in_progress, or completed. Course completion is derived from lesson completion.
2. **Calculate course progress as a percentage.** `completed_lessons / total_lessons * 100`. Display this prominently on the learner dashboard.
3. **Define completion criteria per course.** Some courses require 100% lesson completion. Others require passing a final quiz. Make this configurable.
4. **Record timestamps.** When did the learner start? When did they finish? How long did each lesson take? This data feeds analytics and certificate issuance.

## Batches and Live Classes

Group learners into batches with a start date, end date, and scheduled live sessions. Batches add a cohort-based experience on top of self-paced content. Each batch can have its own schedule of live classes, office hours, and deadlines.

## Certificate Issuance

- Issue automatically when completion criteria are met, or manually by the instructor.
- Include a unique verification code and a public URL where anyone can verify authenticity.
- Use a template system so different courses can have different certificate designs.

## Anti-Patterns

- Flat content with no hierarchy (learners lose context and navigation is painful)
- Tracking progress only at the course level (no visibility into where the learner is stuck)
- Hardcoding a single content type (plan for video, text, quizzes, and assignments from the start)
- Issuing certificates without verification codes (no way to confirm authenticity)
- Requiring enrollment to browse the catalog (reduces discoverability and conversion)
