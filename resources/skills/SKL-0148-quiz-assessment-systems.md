---
id: SKL-0148
name: Quiz & Assessment Systems
category: skills
tags: [quizzes, assessments, question-banks, scoring, timed-exams, randomization, grading, review-mode]
capabilities: [assessment-system-design, question-bank-management, scoring-algorithms]
useWhen:
  - building a quiz or exam system for an educational platform
  - designing a question bank with multiple question types
  - implementing timed assessments with auto-submission
  - adding scoring algorithms with partial credit
  - creating review mode so learners can study mistakes
estimatedTokens: 650
relatedFragments: [SKL-0147, PAT-0073, PAT-0074]
dependencies: []
synonyms: ["how to build a quiz app", "question bank database design", "how to implement timed tests", "multiple choice quiz system", "how to score quizzes with partial credit", "how to randomize quiz questions"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/lms"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Quiz & Assessment Systems

A quiz system needs a question bank, flexible question types, fair scoring, and a review mode that turns mistakes into learning. Get these four right and the rest follows.

## Question Types

| Type | Structure | Scoring |
|------|-----------|---------|
| **Single Choice** | One correct answer from N options | Binary: full marks or zero |
| **Multiple Choice** | One or more correct answers from N options | Partial credit: points per correct selection, penalty per wrong |
| **True/False** | Binary choice | Binary |
| **Fill in the Blank** | Text input matched against accepted answers | Exact match or fuzzy (case-insensitive, trimmed) |
| **Short Answer** | Free text graded by instructor or rubric | Manual or AI-assisted grading |
| **Ordering** | Arrange items in correct sequence | Partial credit by number of correctly placed items |
| **Matching** | Pair items from two columns | Partial credit per correct pair |

## Data Model

```
QuestionBank {
  bank_id, title, course_id, tags[]
}

Question {
  question_id, bank_id, type, prompt, options[],
  correct_answer, explanation, difficulty, points
}

Quiz {
  quiz_id, title, course_id, time_limit_minutes,
  passing_score, randomize_questions, randomize_options,
  show_results_after, max_attempts
}

QuizAttempt {
  attempt_id, quiz_id, user_id, started_at,
  submitted_at, score, status (in_progress/submitted/graded)
}

Response {
  attempt_id, question_id, answer, is_correct, points_earned
}
```

## Randomization

1. **Randomize question order per attempt.** Draw N questions from the bank in random order. This reduces cheating between learners who take the quiz at different times.
2. **Randomize option order per question.** Shuffle the choices so "A is always correct" patterns disappear.
3. **Use question pools.** Define the quiz as "10 questions from a pool of 50." Each learner gets a different subset. Tag questions by topic and difficulty to ensure balanced coverage.
4. **Seed the randomization.** Store the random seed per attempt so the exact quiz can be reconstructed for review or dispute resolution.

## Timed Exams

- **Store start time server-side.** Never trust the client clock. Calculate remaining time as `time_limit - (now - started_at)`.
- **Auto-submit on expiry.** When the timer reaches zero, save whatever answers exist and mark the attempt as submitted. Warn the learner at 5 minutes and 1 minute remaining.
- **Handle disconnections gracefully.** If the learner loses connection and reconnects, resume from saved state. Do not restart the timer.

## Scoring Algorithms

| Strategy | Formula | Use Case |
|----------|---------|----------|
| **Simple percentage** | `earned / total * 100` | Most quizzes |
| **Weighted sections** | Each section has a weight; section scores are weighted-averaged | Exams with mixed difficulty sections |
| **Negative marking** | Deduct points for wrong answers | Competitive exams to discourage guessing |
| **Partial credit** | Award proportional points for partially correct answers | Multiple choice, ordering, matching |

## Review Mode

After submission, let learners see each question, their answer, the correct answer, and an explanation. This is where the actual learning happens. Review mode should show:

- Which questions were correct, incorrect, and skipped
- The correct answer with an explanation for each question
- Time spent per question (helps identify areas of struggle)
- Option to retry only the questions they got wrong

## Anti-Patterns

- Client-side timer without server-side enforcement (easy to manipulate)
- No explanation for wrong answers (missed learning opportunity)
- Fixed question order with no randomization (enables answer sharing)
- All-or-nothing scoring on multi-select questions (unfairly punishes partial knowledge)
- Unlimited attempts with no cooldown (learners brute-force instead of studying)
