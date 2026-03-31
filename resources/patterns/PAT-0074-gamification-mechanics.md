---
id: PAT-0074
name: Gamification Mechanics
category: patterns
tags: [gamification, points, badges, leaderboards, streaks, achievements, progress-bars, engagement]
capabilities: [gamification-system-design, engagement-mechanics, reward-systems]
useWhen:
  - adding points, badges, or leaderboards to an application
  - designing streak or daily engagement mechanics
  - building an achievement or unlock system
  - increasing user retention through game mechanics
  - implementing progress tracking with motivational feedback
estimatedTokens: 700
relatedFragments: [SKL-0147, PAT-0073, SKL-0148]
dependencies: []
synonyms: ["how to add gamification to my app", "points and badges system design", "how to build a leaderboard", "streak mechanics for user engagement", "how to design achievements", "gamification database schema"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/isuru89/oasis"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Gamification Mechanics

Gamification applies game elements to non-game contexts to drive engagement. The key is matching the right mechanic to the behavior you want to reinforce. Points without purpose feel hollow.

## Core Game Elements

| Element | Purpose | Example |
|---------|---------|---------|
| **Points** | Quantify contribution and effort | +10 XP for completing a lesson, +5 for a correct answer |
| **Badges** | Recognize milestones and achievements | "First Course Completed", "7-Day Streak", "Top Contributor" |
| **Leaderboards** | Create social comparison and competition | Weekly top learners, all-time point leaders |
| **Streaks** | Encourage daily habit formation | "5-day learning streak" with escalating bonuses |
| **Progress Bars** | Visualize advancement toward a goal | "72% through Module 3", "8/10 badges earned" |
| **Unlockable Content** | Reward progress with access | Advanced lessons unlock after completing prerequisites |

## Event-Driven Architecture

Gamification systems are event-driven. User actions emit events; rules evaluate those events and produce rewards.

```
User Action → Event → Rule Engine → Reward(s) → Notification
```

1. **Events** are facts about what happened: `lesson_completed`, `quiz_passed`, `login`.
2. **Rules** define conditions: "Award 'Streak Master' badge when login streak reaches 7 days."
3. **Rewards** are the output: points added, badges granted, leaderboard updated.

## Rule Types

| Rule Type | Trigger | Example |
|-----------|---------|---------|
| **Threshold** | Cumulative count reaches N | "Complete 10 quizzes" → badge |
| **Streak** | Consecutive days of activity | "Log in 7 consecutive days" → bonus points |
| **Time-bound** | Action within a time window | "Finish the course within 30 days" → achievement |
| **Conditional** | Specific event with criteria | "Score 100% on a quiz" → badge |
| **Milestone** | Points reach a level boundary | "Reach 1000 XP" → unlock advanced content |

## Data Model

```
PointAccount {
  user_id, point_type, balance, lifetime_total
}

Badge {
  badge_id, name, description, icon, rule_id
}

UserBadge {
  user_id, badge_id, earned_at
}

Streak {
  user_id, activity_type, current_count, longest_count, last_activity_date
}

LeaderboardEntry {
  user_id, board_id, score, period (daily/weekly/all-time), rank
}
```

## Leaderboard Design

- **Use multiple time windows.** All-time boards discourage newcomers. Weekly or monthly boards give everyone a fresh start.
- **Show relative position.** "You are #47 of 1,200" is more motivating than just "#47".
- **Consider friend-only boards.** Competing against people you know drives more engagement than anonymous global rankings.
- **Update asynchronously.** Recalculate ranks in a background job, not on every point change.

## Streak Mechanics

- **Define the activity window clearly.** A "daily streak" means at least one qualifying action per calendar day in the user's timezone.
- **Add streak freezes.** Allow 1-2 "freeze" days to forgive occasional misses. This reduces frustration without removing the incentive.
- **Escalate rewards.** Day 3 streak: +5 bonus. Day 7: +20 bonus. Day 30: badge. Escalation maintains motivation.

## Anti-Patterns

- Points with no visible purpose or redemption path (meaningless numbers)
- Leaderboards dominated by a few power users (demotivates everyone else)
- Badges that are too easy or given automatically (feel like participation trophies)
- Resetting streaks without any forgiveness mechanism (punishes real life)
- Gamifying everything regardless of whether the behavior should be encouraged
- Out-of-order event handling causing missed badge awards (use event timestamps, not arrival order)
