---
id: SKL-0288
name: Homework & Assignment System
category: skills
tags: [homework, assignments, submission, grading, plagiarism-detection, feedback, rubrics]
capabilities: [assignment-workflow-design, submission-management, grading-systems, feedback-loops]
useWhen:
  - building a homework submission and grading workflow
  - implementing file upload with plagiarism detection
  - designing rubric-based grading for instructors
  - adding feedback loops between instructor and student
  - creating assignment scheduling with due dates and late policies
estimatedTokens: 650
relatedFragments: [SKL-0147, SKL-0148, SKL-0287, PAT-0150]
dependencies: []
synonyms: ["how to build a homework submission system", "assignment grading workflow", "plagiarism check for student work", "rubric-based grading system", "how to handle late submissions", "instructor feedback on assignments"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Homework & Assignment System

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0288 |
| **Name** | Homework & Assignment System |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

An assignment system manages the full lifecycle from creation through submission, grading, and feedback. The core data model centers on three entities: **Assignment** (the task definition), **Submission** (student work), and **Grade** (instructor evaluation).

### Assignment Lifecycle

```
Created → Published → Open for Submission → Closed → Grading → Grades Released
```

Each state transition has rules:
- **Published** makes the assignment visible but not yet submittable (useful for advance notice)
- **Open** enables the submission endpoint between `open_date` and `due_date`
- **Closed** stops new submissions (unless late policy allows)
- **Grading** locks submissions from edits while instructors evaluate
- **Released** makes grades and feedback visible to students

### Submission Handling

Support multiple submission types in a single assignment:

| Type | Storage | Validation |
|------|---------|------------|
| File upload (PDF, DOCX) | Object storage (S3) | Max size, file type whitelist |
| Text entry (rich text) | Database (HTML sanitized) | Max word count |
| Code submission | Object storage + sandbox | Language-specific linting |
| URL link | Database | URL format + reachability check |

Key rules: Store every submission version (append-only, never overwrite). Record `submitted_at` timestamps for late policy enforcement. Generate a SHA-256 hash of each file for integrity and plagiarism fingerprinting.

### Grading Models

**Rubric-based grading** is the most scalable approach:
- Define criteria rows (e.g., "Clarity", "Accuracy", "Completeness")
- Each criterion has point levels (e.g., Excellent: 5, Good: 3, Needs Work: 1)
- Instructor clicks the appropriate level per criterion; total auto-calculates
- Store rubric scores as structured data, not just a final number — this enables analytics

**Late penalty policies** (configurable per assignment):
- None (accept anytime)
- Percentage deduction per day (e.g., -10%/day)
- Hard cutoff (reject after due date)
- Grace period (X hours after due date at full credit)

### Plagiarism Detection

Two practical approaches without building a full detection engine:
1. **Hash comparison** — Compare submission file hashes across the class. Identical hashes flag exact copies.
2. **External API integration** — Send text content to services like Turnitin or Copyscape via API. Store the similarity score and flagged passages on the submission record.

Display results to instructors as a similarity percentage with highlighted matching sections. Never auto-penalize — always require instructor review of flagged submissions.

### Feedback Loop

Effective feedback is timely, specific, and actionable:
- **Inline comments** — Instructors annotate specific parts of the submission (paragraph-level for text, line-level for code)
- **Summary feedback** — A text field for overall comments attached to the grade
- **Resubmission** — Optionally allow students to revise and resubmit after feedback, creating a new submission version linked to the original

Notify students immediately when grades are released. Include a direct link to the graded submission with feedback visible.

## Key Takeaways

- Model assignments as a state machine with clear lifecycle transitions
- Store every submission version (append-only) with timestamps for audit and late policy enforcement
- Rubric-based grading produces structured data that powers analytics and consistency
- Plagiarism detection should flag, never auto-penalize — instructor judgment is required
- The feedback-resubmission loop is where real learning happens; make it frictionless
