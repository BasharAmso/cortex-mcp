---
id: PAT-0146
name: Grading & Rubric Pattern
category: patterns
tags: [grading, rubrics, auto-grading, grade-distribution, assessment, scoring]
capabilities: [rubric-design, auto-grading-implementation, grade-calculation, grade-distribution]
useWhen:
  - designing a grading system for an educational platform
  - implementing rubric-based assessment for assignments
  - building auto-grading for quizzes or coding exercises
  - calculating weighted grades across assignment categories
  - generating grade distribution reports
estimatedTokens: 650
relatedFragments: [SKL-0282, SKL-0285, PAT-0147]
dependencies: []
synonyms: ["how to build a grading system", "rubric design for assignments", "auto-grading implementation", "how to calculate weighted grades", "grade distribution reporting", "assessment scoring best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Grading & Rubric Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0146 |
| **Name** | Grading & Rubric Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Grading systems must be transparent, consistent, and auditable. Open edX's approach combines rubric-based manual grading with auto-grading for scalable assessment. The key design decision is choosing the right grading model for each assignment type.

### Grading Models

| Model | Best For | How It Works |
|-------|----------|-------------|
| **Points-based** | Quizzes, tests | Each question has a point value. Score = sum of earned points / total points. |
| **Rubric-based** | Essays, projects | Criteria matrix with levels. Each criterion scored independently. |
| **Auto-graded** | Code, math, multiple choice | Test cases or answer keys evaluated programmatically. |
| **Peer-graded** | Large courses | Students grade each other using a rubric. Calibrated and averaged. |

### Rubric Data Model

```
Rubric {
  rubricId, assignmentId, name,
  criteria: [
    {
      criterionId, name, weight,
      levels: [
        { levelId, name, points, description }
      ]
    }
  ]
}
```

Example rubric criterion:

| Level | Points | Description |
|-------|--------|-------------|
| Excellent | 4 | Complete, well-organized, no errors |
| Proficient | 3 | Mostly complete, minor errors |
| Developing | 2 | Partially complete, several errors |
| Beginning | 1 | Incomplete or major errors |

### Weighted Grade Calculation

Organize assignments into categories with configurable weights:

```
Final Grade = Σ (category_weight × category_average)

Example:
  Homework (20%) × 0.85 = 0.170
  Quizzes (30%)  × 0.78 = 0.234
  Midterm (20%)  × 0.72 = 0.144
  Final (30%)    × 0.88 = 0.264
  ─────────────────────────
  Final Grade           = 0.812 (81.2%, B-)
```

Support configurable grading scales (A/B/C/D/F, Pass/Fail, percentage) and allow dropping the lowest N scores per category.

### Auto-Grading Implementation

For objective assessments:

1. **Multiple choice / true-false**: Compare against answer key. Instant scoring.
2. **Numeric answers**: Accept within a tolerance range (e.g., 3.14 ± 0.01).
3. **Code submissions**: Run against hidden test suite in sandboxed environment. Score = tests passed / total tests.
4. **Fill-in-the-blank**: Normalize whitespace and case before comparison. Support multiple accepted answers.

Store the answer key and grading logic separately from the student-facing assignment. Never expose test cases to students before submission.

### Grade Distribution and Reporting

Generate these standard reports:

- **Distribution histogram**: Visualize grade spread per assignment or overall.
- **Class average and median**: Flag assignments where median < 60% (may indicate poor instruction, not poor students).
- **Individual progress**: Track student performance over time across assignments.
- **At-risk alerts**: Flag students whose running average drops below a threshold.

### Audit Trail

Every grade change must be logged: `{ gradeId, previousScore, newScore, changedBy, timestamp, reason }`. Support grade appeals with a workflow that routes to the instructor for review.

## Key Takeaways

- Choose the grading model per assignment type: points for quizzes, rubrics for projects, auto-grading for code.
- Rubrics need clear level descriptions so grading is consistent across instructors.
- Weighted categories with configurable drop-lowest policies handle real gradebook complexity.
- Auto-grading requires sandboxed execution and hidden test cases that are never exposed pre-submission.
- Log every grade change with who, when, and why for auditability.
