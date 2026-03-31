---
id: PAT-0150
name: Content Dripping Pattern
category: patterns
tags: [content-dripping, scheduled-release, prerequisites, pacing, progressive-disclosure, enrollment-gating]
capabilities: [scheduled-content-release, prerequisite-enforcement, pacing-strategy-design, progressive-content-access]
useWhen:
  - releasing course content on a schedule rather than all at once
  - implementing prerequisite chains between modules
  - designing pacing strategies to prevent student overwhelm
  - gating content behind completion milestones
  - building cohort-based courses with synchronized progress
estimatedTokens: 650
relatedFragments: [SKL-0147, SKL-0288, PAT-0149, SKL-0289]
dependencies: []
synonyms: ["how to drip content to students", "scheduled course content release", "prerequisite-based content unlocking", "how to pace an online course", "gated content for learning", "cohort-based course delivery"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Pattern: Content Dripping Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0150 |
| **Name** | Content Dripping Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Content dripping controls when learners gain access to content. Instead of exposing the entire course at enrollment, content is revealed progressively — by date, by prerequisite completion, or by cohort schedule. This prevents overwhelm, encourages consistent engagement, and supports pedagogical sequencing.

### Three Dripping Strategies

**1. Date-based dripping**
Content unlocks on a fixed calendar date, regardless of student progress. Best for cohort-based courses where all students start together.

```
Module 1: Available immediately
Module 2: Available Jan 15
Module 3: Available Jan 22
Module 4: Available Jan 29
```

Implementation: Each module has an `available_at` timestamp. The content API checks `available_at <= now` before serving content. Store dates in UTC; display in the learner's timezone.

**2. Enrollment-relative dripping**
Content unlocks N days after the individual student enrolls. Best for self-paced courses where students start at different times.

```
Module 1: Available at enrollment
Module 2: Available enrollment + 7 days
Module 3: Available enrollment + 14 days
Module 4: Available enrollment + 21 days
```

Implementation: Calculate `enrollment_date + offset_days` per module per student. This requires a per-student content access check rather than a global date comparison.

**3. Prerequisite-based dripping**
Content unlocks when the student completes a prior module or meets a score threshold. Best for subjects with strong dependency chains (math, programming).

```
Module 1: Available immediately
Module 2: Requires Module 1 completion
Module 3: Requires Module 2 with score >= 70%
Module 4: Requires Modules 2 AND 3
```

Implementation: Model prerequisites as a directed acyclic graph (DAG). Before granting access, traverse the graph and verify all prerequisite conditions are met. Store prerequisite rules as structured JSON on the module record.

### Data Model

```
ContentAccess
  module_id
  drip_strategy: "date" | "enrollment_relative" | "prerequisite"
  config: JSON
    - date: { available_at: "2026-02-15T00:00:00Z" }
    - enrollment_relative: { offset_days: 7 }
    - prerequisite: { requires: [{ module_id: "...", min_score: 70 }] }

StudentAccess (materialized view or cache)
  student_id, module_id, is_accessible (boolean), accessible_at, reason
```

Materialize access state when it changes (enrollment, module completion, date trigger) rather than recalculating on every page load. Use a background job to process date-based unlocks at midnight UTC.

### Locked Content UX

How you present locked content matters as much as when you unlock it:

- **Show the outline** — Display locked module titles and descriptions. Learners should see the full course structure to understand where they are headed.
- **Show the unlock condition** — "Available January 22" or "Complete Module 2 to unlock." Ambiguous locks frustrate users.
- **Visual distinction** — Locked modules appear dimmed with a lock icon. Never hide them entirely — hidden content provides no motivation to continue.
- **Notification on unlock** — Send an email or push notification when new content becomes available. Include a direct link to the newly unlocked module.

### Combining Strategies

Strategies can be combined. A common pattern: date-based dripping for the primary schedule, with prerequisite gates on key assessments. Example: Module 3 becomes available on January 22 AND requires Module 2 quiz passed. The student must meet both conditions.

### Pacing Anti-Patterns

- **Too aggressive** — Dripping daily content in a complex course leads to falling behind and drop-off. Weekly cadence works better for most subjects.
- **No catch-up path** — If a student falls behind in a cohort course, they should be able to access past modules. Only gate future content.
- **Over-gating** — Requiring a passing score on every quiz before proceeding frustrates students who learn by reading ahead. Reserve score gates for genuinely prerequisite knowledge.

## Key Takeaways

- Choose drip strategy based on course type: date-based for cohorts, enrollment-relative for self-paced, prerequisite for sequential subjects
- Always show locked content outlines with clear unlock conditions — hidden content kills motivation
- Materialize access state on change events rather than recalculating on every request
- Combine date and prerequisite strategies for courses that need both pacing and mastery gates
- Avoid over-gating: reserve score thresholds for modules where prior knowledge is genuinely required
