---
id: PAT-0144
name: Question Bank Pattern
category: patterns
tags: [question-bank, quizzes, randomization, item-analysis, assessments, difficulty-tagging]
capabilities: [question-pool-management, quiz-randomization, difficulty-calibration, item-analysis]
useWhen:
  - building a quiz or assessment system with reusable questions
  - implementing randomized exams from a question pool
  - tagging and calibrating question difficulty
  - analyzing which questions are too easy, too hard, or ambiguous
  - preventing cheating through question randomization
estimatedTokens: 650
relatedFragments: [SKL-0275, SKL-0276, PAT-0143]
dependencies: []
synonyms: ["how to build a question bank", "randomize quiz questions", "question difficulty tagging", "item analysis for quizzes", "reusable question pool", "assessment question management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Pattern: Question Bank Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0144 |
| **Name** | Question Bank Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

A question bank separates question authoring from quiz assembly. Instead of writing questions directly into a quiz, authors add questions to a shared pool. Quizzes draw from the pool, enabling randomization, reuse, and data-driven quality improvement.

### Question Data Model

Each question is a standalone record with rich metadata:

```
questions:
  id, bank_id, type (multiple_choice | fill_blank | short_answer | matching | ordering),
  stem (the question text), options (JSON array for MC), correct_answer,
  explanation, difficulty (1-5), tags (topic, subtopic, learning_objective),
  status (draft | active | retired), created_by, created_at
```

Store the explanation separately from the correct answer. Explanations are shown after submission and are critical for learning, not just grading.

### Question Types

Support a core set of question types with consistent grading logic:

| Type | Auto-Gradable | Notes |
|------|---------------|-------|
| **Multiple Choice (single)** | Yes | Most common, easiest to analyze |
| **Multiple Choice (multi-select)** | Yes | Partial credit optional |
| **True/False** | Yes | Use sparingly, 50% guess rate |
| **Fill in the Blank** | Yes (pattern match) | Accept multiple correct spellings |
| **Ordering/Sequencing** | Yes | Grade by correct position count |
| **Short Answer** | Semi (keyword match or AI) | Manual grading fallback needed |
| **Matching** | Yes | Pair items from two columns |

### Quiz Assembly with Randomization

A quiz definition references the bank, not individual questions:

```
quiz_rules: quiz_id, bank_id, count (pick N questions),
            difficulty_range (min-max), required_tags, randomize_order,
            randomize_options, time_limit, max_attempts
```

At quiz start, the system selects N questions matching the criteria, randomizes their order, and optionally shuffles answer options within each question. Each student gets a different combination, reducing cheating on shared assessments.

### Difficulty Calibration

Initial difficulty is set by the author (estimated). After enough responses (50+ attempts), replace the estimate with empirical difficulty based on the percentage of students who answer correctly:

| Correct Rate | Calibrated Difficulty |
|-------------|----------------------|
| 90%+ | 1 (very easy) |
| 70-89% | 2 (easy) |
| 50-69% | 3 (medium) |
| 30-49% | 4 (hard) |
| Below 30% | 5 (very hard) |

Questions below 20% correct should be reviewed -- they may be poorly worded rather than genuinely difficult.

### Item Analysis

For each question, track:

- **Discrimination index**: do high-performing students get this right more often than low-performing ones? A question everyone gets wrong (or right) regardless of ability is not discriminating and should be revised.
- **Distractor analysis** (for MC): which wrong answers are most commonly selected? A distractor chosen more than the correct answer signals a confusing question.
- **Time-to-answer**: questions that take significantly longer than peers may be ambiguously worded.

Surface these metrics in an instructor dashboard. Flag questions that fail discrimination or have suspicious distractor patterns.

### Retiring Questions

When a question becomes widely known (shared in study groups) or shows poor item analysis metrics, retire it. Retired questions remain in the database for historical records but are excluded from future quiz assembly.

## Key Takeaways

- Separate question authoring from quiz assembly -- questions live in banks, quizzes draw from them
- Randomize both question selection and answer option order to reduce cheating
- Replace author-estimated difficulty with empirical difficulty after 50+ student attempts
- Use item analysis (discrimination index, distractor analysis) to identify bad questions
- Retire compromised or poorly performing questions without deleting historical data
