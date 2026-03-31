---
id: SKL-0280
name: Flashcard & Memorization Systems
category: skills
tags: [spaced-repetition, flashcards, memorization, learning-intervals, recall, study-tools]
capabilities: [card-design, spaced-repetition-scheduling, deck-organization, learning-analytics]
useWhen:
  - building a flashcard or study app with spaced repetition
  - designing a memorization feature for educational content
  - implementing learning interval algorithms
  - adding review scheduling to a knowledge-retention tool
  - choosing between fixed and adaptive repetition schedules
estimatedTokens: 650
relatedFragments: [SKL-0281, SKL-0282, PAT-0146]
dependencies: []
synonyms: ["how do I build a flashcard app", "what is spaced repetition", "how to implement study intervals", "best way to design review schedules", "how to build an Anki-like app", "memorization algorithm for learning"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/ankitects/anki"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Flashcard & Memorization Systems

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0280 |
| **Name** | Flashcard & Memorization Systems |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Spaced repetition is the most effective evidence-based technique for long-term retention. The core idea: review material at increasing intervals based on how well you remember it. Anki's algorithm (SM-2 variant) is the industry standard.

### Card Design Principles

Cards should test one atomic fact each. Avoid "mega-cards" that combine multiple concepts. Effective card types:

| Card Type | Use Case | Example |
|-----------|----------|---------|
| **Basic** (front/back) | Simple recall | Term on front, definition on back |
| **Cloze deletion** | Contextual recall | "The {{c1::mitochondria}} is the powerhouse of the cell" |
| **Reversed** | Bidirectional learning | Auto-generates both directions |
| **Image occlusion** | Visual/spatial learning | Anatomy diagrams with hidden labels |

### Spaced Repetition Algorithm

The SM-2 algorithm assigns each card an ease factor (default 2.5) and interval:

1. **New cards** start with learning steps (e.g., 1 min, 10 min, 1 day).
2. **On correct recall**, multiply the current interval by the ease factor. A card at 3 days with ease 2.5 next appears in 7.5 days.
3. **On incorrect recall**, reset the interval to 1 day and reduce ease by 0.2 (minimum 1.3).
4. **Graduating** moves a card from learning to review phase.

### Deck Organization

Organize decks by subject, not by source. Flat structures outperform deep nesting. Use tags for cross-cutting categories (e.g., "exam-2", "chapter-5") rather than creating sub-decks.

### Implementation Architecture

```
User answers card → Rate difficulty (Again/Hard/Good/Easy)
  → Update ease factor and interval
  → Schedule next review date
  → Persist to card store (SQLite or similar)
  → Fetch next due card from priority queue
```

Store card state as: `{ cardId, easeFactor, interval, dueDate, lapses, reviewCount }`. Sort the review queue by due date ascending. New cards interleave with review cards at a configurable ratio (e.g., 20 new per day).

### Learning Analytics

Track retention rate (correct reviews / total reviews), average ease factor, and cards mature vs. young. A healthy deck shows 85-95% retention. Below 80% means intervals are too aggressive.

## Key Takeaways

- One fact per card. Atomic cards dramatically outperform complex ones.
- SM-2 with ease factor adjustment is the proven baseline algorithm. Start there before innovating.
- Flat deck structures with tags beat deeply nested hierarchies.
- Target 85-90% retention rate. Adjust new card volume and intervals if retention drops.
- Track lapses per card to identify "leeches" that need rewriting, not more repetition.
