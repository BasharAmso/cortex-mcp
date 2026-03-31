---
id: PAT-0149
name: Achievement & Badge System
category: patterns
tags: [badges, achievements, gamification, portfolios, motivation, recognition]
capabilities: [badge-criteria-design, achievement-tracking, gamification-balance, digital-portfolios]
useWhen:
  - adding gamification to a learning platform
  - designing badge criteria and award logic
  - building a student achievement portfolio
  - balancing motivation without trivializing learning
  - implementing shareable credentials or micro-certifications
estimatedTokens: 650
relatedFragments: [PAT-0074, SKL-0147, SKL-0148, PAT-0150]
dependencies: []
synonyms: ["how to add badges to my app", "gamification for education", "achievement system design", "digital badge portfolio", "how to award badges automatically", "micro-credentials for learning"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Pattern: Achievement & Badge System

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0149 |
| **Name** | Achievement & Badge System |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Badges and achievements translate learning progress into visible recognition. The pattern works when badges represent genuine accomplishment and fails when they reward trivial actions. The key design tension is **motivation without trivialization**.

### Badge Taxonomy

Organize badges into tiers that map to increasing effort:

| Tier | Name | Criteria Example | Rarity |
|------|------|-----------------|--------|
| Bronze | **Participation** | Complete first lesson, submit first assignment | Common (~80% earn) |
| Silver | **Competency** | Pass a module assessment with 80%+, complete 5 assignments | Moderate (~40% earn) |
| Gold | **Mastery** | Complete a full course, score 90%+ on final exam | Uncommon (~15% earn) |
| Platinum | **Excellence** | Top 5% of cohort, complete all optional challenges | Rare (~5% earn) |

Avoid creating too many badges. 10-15 per course is a practical ceiling. More than that dilutes their meaning.

### Data Model

```
Badge
  id, name, description, tier, image_url, criteria_type, criteria_config (JSON)

UserBadge
  id, user_id, badge_id, awarded_at, evidence_snapshot (JSON)

BadgeCriteria types:
  - completion: { resource_type: "course", resource_id: "..." }
  - score_threshold: { assessment_id: "...", min_score: 80 }
  - streak: { action: "daily_login", count: 7 }
  - count: { action: "assignments_submitted", count: 10 }
  - compound: { all: [criteria_1_id, criteria_2_id] }
```

The `evidence_snapshot` field captures the state at award time (score, date, assessments completed). This makes the badge verifiable even if the underlying data changes.

### Award Engine

Use an event-driven approach:

1. Student completes an action (lesson, quiz, assignment)
2. System emits an event (e.g., `assessment.completed`)
3. Badge engine listens and evaluates all applicable badge criteria
4. If criteria met, create a `UserBadge` record and notify the student

Process badge evaluation asynchronously (queue or background job). Badge checks should never block the primary learning flow. Idempotency: if the badge is already awarded, skip silently.

### Display and Portfolios

- **Profile page** — Show earned badges in a grid, organized by tier. Unearned badges shown as locked silhouettes with criteria hints ("Complete 5 modules to unlock").
- **Achievement feed** — Announce new badges in a class activity feed. Social visibility motivates without direct competition.
- **Exportable portfolio** — Allow learners to export badges as Open Badges 2.0 format (JSON-LD). This standard is recognized by employers and other institutions. Include issuer info, criteria URL, and evidence hash.

### Gamification Balance

The risk of badge systems is undermining intrinsic motivation. Guard against this:

- **No badges for attendance alone.** Logging in is not an achievement. Tie badges to demonstrated learning.
- **Celebrate progress, not just perfection.** "Improved by 20%" is a more motivating badge than "Got 100%."
- **Avoid leaderboards in most cases.** Public ranking creates anxiety and discourages struggling students. If used, make them opt-in and show cohort percentile ranges rather than individual ranks.
- **Sunset stale badges.** Review badge criteria each term. Remove or update badges that no longer align with learning objectives.

## Key Takeaways

- Tiered badges (bronze through platinum) create clear progression without overwhelming learners
- Event-driven award engines decouple badge logic from core learning flows
- Open Badges 2.0 makes credentials portable and verifiable outside your platform
- Badge systems fail when they reward trivial actions — tie every badge to demonstrated learning
- Avoid public leaderboards in education; celebrate individual progress instead
