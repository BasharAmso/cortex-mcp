---
id: SKL-0274
name: Online Course Platform
category: skills
tags: [lms, courses, enrollment, progress-tracking, certificates, e-learning]
capabilities: [course-structuring, enrollment-management, progress-tracking, certificate-generation]
useWhen:
  - building a course platform or learning management system
  - implementing course enrollment and student onboarding
  - designing course structures with modules, lessons, and units
  - adding completion tracking and certificate delivery
  - creating instructor dashboards for course management
estimatedTokens: 650
relatedFragments: [SKL-0276, SKL-0277, SKL-0279, PAT-0143]
dependencies: []
synonyms: ["how to build an LMS", "create an online course site", "build a learning platform", "how to structure courses online", "course enrollment system", "education platform architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Skill: Online Course Platform

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0274 |
| **Name** | Online Course Platform |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

An online course platform has four foundational layers: **catalog**, **enrollment**, **delivery**, and **completion**.

### Course Structure Hierarchy

Model content as a tree: **Course > Section > Lesson > Block**. Each level has its own metadata (title, description, ordering, visibility). Blocks are the atomic content units -- video, text, quiz, exercise, or downloadable resource. This hierarchy mirrors Open edX's proven architecture (courseware > chapter > sequential > vertical).

### Enrollment Engine

Enrollment connects a student to a course with a status (active, paused, completed, expired). Store enrollment as a join table with timestamps and metadata:

```
enrollments: student_id, course_id, enrolled_at, status, expires_at, payment_id
```

Support multiple enrollment modes: open (anyone joins), invite-only, paid, and cohort-based. Gate access at the enrollment layer, not the content layer.

### Progress Tracking

Track progress at the block level. When a student completes a block (watches a video, passes a quiz, submits an exercise), record a `completion` event. Roll up block completions to calculate lesson, section, and course percentages. Store both the raw events and the computed percentages -- events are the source of truth, percentages are cached for fast dashboard rendering.

### Instructor Tools

Instructors need: a course builder (drag-and-drop ordering), student roster, grade book, and announcement system. Use a role-based permission model -- `owner`, `instructor`, `teaching_assistant`, `student` -- each with scoped access. Allow instructors to preview courses as a student would.

### Content Delivery

Serve content through a sequential unlock model (linear) or open navigation (non-linear). Linear mode enforces prerequisite completion before advancing. Non-linear allows browsing but still tracks what has been completed. Let course creators choose per-section.

### Certificates and Completion

When course-level progress reaches 100% (or a configured threshold), trigger certificate generation. Certificates should include a unique verification URL, student name, course title, completion date, and an optional digital signature. Store the certificate as a record, not just a PDF -- render on demand.

## Key Takeaways

- Model courses as a four-level hierarchy (course, section, lesson, block) for maximum flexibility
- Track progress at the atomic block level and roll up to higher levels for dashboards
- Enrollment is a first-class entity with its own status lifecycle, not just a boolean flag
- Support both linear (prerequisite-gated) and open navigation per section
- Generate certificates from structured records with unique verification URLs
