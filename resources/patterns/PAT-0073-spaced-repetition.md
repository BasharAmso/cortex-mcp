---
id: PAT-0073
name: Spaced Repetition
category: patterns
tags: [spaced-repetition, fsrs, memory, review-scheduling, learning-algorithms, retention, flashcards]
capabilities: [review-scheduling-design, memory-optimization, adaptive-learning]
useWhen:
  - building a flashcard or review-based learning system
  - implementing adaptive review scheduling
  - designing a system that optimizes long-term retention
  - choosing between SM-2, FSRS, or custom scheduling algorithms
  - adding spaced repetition to an existing course platform
estimatedTokens: 650
relatedFragments: [SKL-0147, PAT-0074, SKL-0148]
dependencies: []
synonyms: ["how does spaced repetition work", "flashcard scheduling algorithm", "how to build an Anki-like app", "FSRS algorithm explained", "how to optimize study intervals", "when should I review flashcards"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/open-spaced-repetition/fsrs4anki"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Spaced Repetition

Review material right before you would forget it. Space reviews further apart as memory strengthens. This is the most effective technique for long-term retention.

## The Forgetting Curve

Memory decays exponentially after learning. Without review, recall drops to ~40% after 24 hours and ~20% after a week. Each well-timed review flattens the curve, making the memory more durable and extending the optimal interval before the next review.

## Core Parameters

| Parameter | Meaning | Typical Range |
|-----------|---------|---------------|
| **Difficulty** | How hard this item is for this learner | 0.0 (easy) to 1.0 (hard) |
| **Stability** | How many days until recall drops to 90% | 1 day (new) to 365+ days (mature) |
| **Retrievability** | Predicted probability of recall right now | 0.0 to 1.0 |
| **Interval** | Days until the next scheduled review | Derived from stability and target retention |

## FSRS Algorithm Overview

FSRS (Free Spaced Repetition Scheduler) is the modern replacement for SM-2. It models memory with two variables: stability (S) and difficulty (D).

1. **On first review**: Initialize stability and difficulty based on the learner's rating (Again, Hard, Good, Easy).
2. **On successful recall**: Increase stability. The increase depends on current difficulty, stability, and retrievability. Harder items gain stability more slowly.
3. **On failed recall (lapse)**: Reduce stability significantly. Increase difficulty slightly. Schedule a short re-learning interval.
4. **Schedule next review**: `interval = S * ln(target_retention) / ln(0.9)` where target_retention is typically 0.9 (90%).

## Rating Scale

| Rating | Meaning | Effect on Scheduling |
|--------|---------|---------------------|
| **Again (1)** | Could not recall | Reset interval, decrease stability |
| **Hard (2)** | Recalled with significant difficulty | Slight stability increase, raise difficulty |
| **Good (3)** | Recalled with moderate effort | Normal stability increase |
| **Easy (4)** | Recalled instantly | Large stability increase, lower difficulty |

## Data Model

```
ReviewCard {
  card_id: string
  user_id: string
  difficulty: float       // 0.0 - 1.0
  stability: float        // days
  last_review: datetime
  next_review: datetime
  reps: integer           // total successful reviews
  lapses: integer         // total failures
  state: "new" | "learning" | "review" | "relearning"
}
```

## Implementation Steps

1. **Start with fixed intervals for new cards.** Learning phase: 1 minute, 10 minutes, 1 day. Once the card graduates from learning, apply the algorithm.
2. **Use FSRS over SM-2 for new projects.** FSRS is more accurate, adapts to individual learners, and has a well-documented open-source implementation.
3. **Target 90% retention.** This balances workload and memory strength. Adjustable per user.
4. **Sort the review queue by overdue percentage.** Cards most overdue relative to their interval get priority.
5. **Cap daily new cards.** 10-20 new cards per day prevents overwhelming the learner. Reviews of existing cards always take priority.

## Anti-Patterns

- Fixed intervals with no adaptation (every card reviewed every 3 days regardless of performance)
- No distinction between learning and review phases
- Allowing learners to skip overdue reviews without consequence
- Ignoring lapses when calculating future intervals
- Showing too many new cards at once (leads to a crushing review backlog)
