---
id: PAT-0143
name: Adaptive Learning Path
category: patterns
tags: [adaptive-learning, prerequisites, mastery, branching, personalization, difficulty]
capabilities: [prerequisite-enforcement, difficulty-adjustment, mastery-gating, path-branching]
useWhen:
  - designing courses that adapt to student skill level
  - implementing prerequisite chains between lessons or modules
  - building mastery-based progression instead of time-based
  - creating personalized learning experiences
  - adjusting content difficulty based on student performance
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0276, PAT-0144]
dependencies: []
synonyms: ["how to build adaptive learning", "personalized course paths", "prerequisite system for courses", "mastery-based progression", "difficulty adjustment in learning", "branching learning paths"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: advanced
owner: "cortex"
pillar: "education"
---

# Pattern: Adaptive Learning Path

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0143 |
| **Name** | Adaptive Learning Path |
| **Category** | Patterns |
| **Complexity** | Advanced |

## Core Concepts

Traditional courses are linear: everyone follows the same path at the same pace. Adaptive learning paths adjust the route based on what each student knows and where they struggle. The goal is efficiency -- skip what you know, spend more time on what you don't.

### Prerequisite Graph

Model course content as a directed acyclic graph (DAG), not a flat list. Each node (lesson or module) can declare prerequisites:

```
prerequisites: lesson_id, required_lesson_id, requirement_type (completed | score_above | badge_earned)
```

Before unlocking a node, check all incoming edges. This supports complex structures: parallel tracks that converge, optional deep-dive branches, and multiple valid paths to the same destination. Validate the graph on course publish to catch cycles and orphaned nodes.

### Mastery Gates

Replace "did they finish the lesson?" with "did they demonstrate mastery?" A mastery gate requires a minimum score on an assessment before the student can proceed. This prevents students from rushing through content without understanding.

Mastery thresholds should be configurable per gate (70% for introductory content, 90% for safety-critical material). When a student fails a mastery gate, route them to remediation content -- a simpler explanation, practice exercises, or an alternative teaching approach -- before allowing a retry.

### Difficulty Adjustment

Track student performance across assessments to estimate their current ability level. Use a simple model:

1. **Rolling accuracy**: average score over the last N assessments
2. **If above 85%**: increase difficulty (skip review content, present harder problems)
3. **If below 60%**: decrease difficulty (add scaffolding, simpler examples, more practice)
4. **Between 60-85%**: maintain current level (optimal learning zone)

Tag every content block and question with a difficulty level (1-5). Use the student's estimated level to select appropriately challenging material.

### Branching Paths

Offer students choices at branch points: "Do you want to learn this concept through a video lecture, a hands-on exercise, or a reading?" Different modalities suit different learners. Track which modality produces better outcomes per student and surface recommendations over time.

Also support topic branching: after completing core material, let students choose a specialization track (e.g., "Frontend Focus" vs. "Backend Focus" within a web development course).

### Implementation Approach

Start simple. Phase 1: prerequisite enforcement (DAG-based unlocking). Phase 2: mastery gates on key assessments. Phase 3: difficulty tagging and adjustment. Phase 4: modality branching. Each phase adds value independently. Do not try to build a fully adaptive system on day one.

### State Machine per Student-Course

Each student's path through a course is a state machine. Store the current state (active nodes, completed nodes, locked nodes, failed gates) and recompute available next steps after every completion event. This model handles arbitrary graph complexity without special-case logic.

## Key Takeaways

- Model course structure as a directed acyclic graph with prerequisite edges, not a flat sequence
- Mastery gates require demonstrated understanding before progression, not just completion
- Difficulty adjustment uses rolling accuracy to keep students in the optimal challenge zone (60-85%)
- Implement adaptivity in phases: prerequisites first, then mastery gates, then difficulty, then branching
- Track each student's path as a state machine for clean, predictable progression logic
