---
id: PAT-0147
name: Enrollment & Access Control
category: patterns
tags: [enrollment, access-control, cohorts, prerequisites, waitlists, course-registration]
capabilities: [enrollment-workflow, cohort-management, prerequisite-enforcement, waitlist-handling]
useWhen:
  - designing course enrollment and registration flows
  - implementing prerequisite checks for advanced courses
  - building cohort-based access control for course content
  - adding waitlist functionality to capacity-limited courses
  - managing student access across multiple courses or programs
estimatedTokens: 650
relatedFragments: [SKL-0282, PAT-0146, PAT-0148]
dependencies: []
synonyms: ["how to build course enrollment", "student registration system design", "prerequisite checking for courses", "waitlist system for classes", "cohort-based access control", "course capacity management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Enrollment & Access Control

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0147 |
| **Name** | Enrollment & Access Control |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Enrollment is the gateway to every learning experience. It determines who can access what content and when. Open edX handles enrollment at scale with cohort-based access, prerequisite chains, and multiple enrollment modes. Get this pattern right and everything downstream (grading, communication, certification) works cleanly.

### Enrollment Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Open** | Anyone can enroll, no approval | MOOCs, free courses |
| **Invite-only** | Instructor sends enrollment links | Private cohorts, corporate training |
| **Application** | Student applies, instructor approves | Selective programs, limited seats |
| **Paid** | Enrollment requires payment | Commercial courses, certification programs |
| **Auto-enroll** | System enrolls based on criteria | Required courses in a degree program |

### Enrollment Data Model

```
Enrollment {
  enrollmentId, studentId, courseId,
  mode: "open" | "invite" | "application" | "paid",
  status: "active" | "pending" | "waitlisted" | "dropped" | "completed",
  enrolledAt, droppedAt, completedAt,
  cohortId, paymentId
}
```

### Prerequisite Enforcement

Model prerequisites as a directed acyclic graph (DAG):

```
Course A (Intro) → Course B (Intermediate) → Course C (Advanced)
                 → Course D (Elective)
```

Before allowing enrollment in Course B, verify the student has `status: "completed"` for Course A. Support multiple prerequisite paths ("complete A OR pass placement test"). Store prerequisites as: `{ courseId, requires: [{ courseId, minGrade }] }`.

### Cohort Management

Cohorts group students within a course for differentiated experiences:

- **Time-based cohorts**: "Spring 2026" vs "Fall 2026" with different start/end dates.
- **Section-based cohorts**: Same course, different instructors or meeting times.
- **Ability-based cohorts**: Honors vs standard track with different content depth.

Each cohort can have its own assignment due dates, discussion forums, and content visibility. Implement as a many-to-many relationship: `student ↔ cohort ↔ course`.

### Waitlist System

When a course reaches capacity:

1. **Add to waitlist** with a position number and timestamp.
2. **Notify on opening** when a seat becomes available (student drops or capacity increases).
3. **Time-limited acceptance**: Student has 48 hours to confirm enrollment before the seat goes to the next person.
4. **Auto-promote**: If enabled, automatically enroll the next waitlisted student when a seat opens.

```
Waitlist {
  waitlistId, studentId, courseId,
  position, joinedAt,
  status: "waiting" | "offered" | "accepted" | "expired",
  offerExpiresAt
}
```

### Access Control Rules

Content access is determined by enrollment status plus cohort membership:

```
canAccess(student, content) =
  student.enrollment.status === "active"
  AND content.availableAfter <= now()
  AND (content.cohortRestriction === null
       OR student.cohortId IN content.cohortRestriction)
  AND prerequisites.allMet(student, content.prerequisites)
```

Support drip-scheduling: release modules on specific dates or N days after enrollment. This prevents students from rushing through content and supports instructor pacing.

### Drop and Withdrawal

Define clear policies:

- **Drop period**: Full refund, no transcript record (first 2 weeks typical).
- **Withdrawal period**: Partial or no refund, "W" on transcript (weeks 3-10 typical).
- **After withdrawal deadline**: No drops allowed without special approval.

Implement as status transitions with date-based rules. Dropped students lose access immediately. Store the reason for analytics.

## Key Takeaways

- Support multiple enrollment modes (open, invite, application, paid) to cover different course types.
- Model prerequisites as a DAG and enforce before enrollment, not at content access time.
- Cohorts enable differentiated experiences within the same course structure.
- Waitlists need time-limited offers and auto-promotion to fill seats efficiently.
- Drip-scheduling controls content pacing and prevents rushing through material.
