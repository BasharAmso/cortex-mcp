---
id: SKL-0278
name: Tutoring & Mentorship Platform
category: skills
tags: [tutoring, mentorship, scheduling, matching, sessions, feedback]
capabilities: [tutor-matching, session-scheduling, feedback-collection, availability-management]
useWhen:
  - building a platform that connects tutors with students
  - implementing session scheduling for 1-on-1 learning
  - designing a matching algorithm for mentors and mentees
  - adding session feedback and rating systems
  - creating availability management for educators
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0277, SKL-0279]
dependencies: []
synonyms: ["build a tutoring app", "connect students with tutors", "mentorship matching platform", "schedule tutoring sessions", "how to build a booking system for tutors", "online tutoring marketplace"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Tutoring & Mentorship Platform

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0278 |
| **Name** | Tutoring & Mentorship Platform |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A tutoring platform solves a coordination problem: matching the right tutor to the right student at the right time. The core loop is **discover > book > meet > review**.

### Tutor and Student Profiles

Both roles need distinct profile structures:

**Tutor profile**: subjects/topics, experience level, hourly rate, bio, availability windows, languages, ratings, verification status, timezone.

**Student profile**: learning goals, subjects needed, preferred schedule, budget range, timezone, session history.

Store profiles in a shared `users` table with a `role` field and role-specific detail tables. A user can be both a tutor (in one subject) and a student (in another).

### Matching Algorithm

Start simple and add sophistication as data accumulates:

1. **Filter**: subject match, overlapping availability, price range, language
2. **Rank**: rating score, response time, completion rate, proximity in timezone
3. **Display**: show top matches with key differentiators (rating, price, availability)

Avoid over-engineering matching early. Manual search with filters works until you have enough session data to power recommendations. Cal.com's approach demonstrates that simple availability-based matching scales well before algorithmic matching is needed.

### Scheduling and Availability

Model availability as recurring weekly time slots with override capability (specific dates blocked or opened). Inspired by Cal.com's architecture:

```
availability_rules: tutor_id, day_of_week, start_time, end_time, timezone
availability_overrides: tutor_id, date, available (boolean), start_time, end_time
```

When a student books, create a `session` record and block that time slot. Send calendar invites (ICS) to both parties. Handle timezone conversion server-side -- always store times in UTC and display in the user's local timezone.

### Session Lifecycle

A session moves through states: `requested > confirmed > in_progress > completed > reviewed`. Support cancellation with a configurable policy (free cancellation 24h before, partial refund 12h before, no refund within 2h). Integrate video conferencing (Daily.co, Zoom, or Google Meet) with auto-generated meeting links attached to confirmed sessions.

### Feedback and Ratings

After each session, both parties rate the experience (1-5 stars) and leave optional written feedback. Separate rating dimensions for tutors: knowledge, communication, punctuality. Calculate a rolling average displayed on profiles. Flag tutors whose rating drops below a threshold for review.

### Payments

For paid tutoring, hold payment at booking time and release to the tutor after session completion (escrow model). This protects both parties. Integrate Stripe Connect for marketplace payments -- students pay the platform, the platform pays tutors minus a commission.

## Key Takeaways

- Start with filter-based matching (subject, availability, price) before building algorithmic recommendations
- Model availability as recurring weekly slots with date-specific overrides
- Sessions follow a clear lifecycle: requested, confirmed, in-progress, completed, reviewed
- Use an escrow payment model to protect both tutors and students
- Collect structured feedback (multiple rating dimensions) after every session
