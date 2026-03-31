---
id: PAT-0187
name: Wellness Goal Pattern
category: patterns
tags: [wellness, goals, habits, streaks, motivation, gamification, health-goals, behavior-change]
capabilities: [goal-setting-design, streak-tracking, habit-building, motivational-design]
useWhen:
  - designing goal setting features for a health or wellness app
  - implementing streak tracking and habit formation
  - creating motivational systems that sustain user engagement
  - building progress visualization for health goals
  - designing reward mechanics for wellness milestones
estimatedTokens: 650
relatedFragments: [SKL-0361, SKL-0360, SKL-0359, PAT-0184]
dependencies: []
synonyms: ["how to design health goal tracking", "habit streak feature design", "wellness gamification without toxicity", "fitness goal progress visualization", "behavior change app mechanics", "motivational design for health apps"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Wellness Goal Pattern

Wellness goals help users build healthy habits through structured target-setting, progress tracking, and motivational feedback. The challenge is designing systems that motivate without inducing guilt when users inevitably have off days.

## Goal Data Model

```typescript
interface WellnessGoal {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'milestone';
  category: 'steps' | 'sleep' | 'water' | 'exercise' | 'nutrition' | 'meditation' | 'custom';
  target: number;
  unit: string;                   // 'steps', 'hours', 'glasses', 'minutes'
  currentValue: number;
  frequency: 'daily' | 'weekly';
  startDate: Date;
  endDate?: Date;
  streak: StreakInfo;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
}

interface StreakInfo {
  current: number;                // Consecutive days/weeks meeting goal
  longest: number;                // All-time best streak
  lastCompletedDate: Date;
  freezesRemaining: number;       // Grace days that don't break the streak
}

interface GoalProgress {
  goalId: string;
  date: Date;
  value: number;
  percentComplete: number;
  metGoal: boolean;
}
```

## Goal Setting Best Practices

Help users set achievable goals using behavioral science principles:

1. **Start small.** Default goals should be 80% achievable. A 6,000-step goal that gets hit daily builds more habit than a 10,000-step goal that creates daily failure.
2. **One goal at a time.** When onboarding, suggest starting with one goal. Let users add more after a week of consistency.
3. **Adjustable targets.** Show a slider, not a text field. Include preset levels (Easy / Moderate / Ambitious) with data-informed defaults.
4. **No all-or-nothing.** Partial progress counts. 7,000 of 10,000 steps is 70%, not failure.

```typescript
// Suggest personalized goals based on recent activity
function suggestGoal(recentData: GoalProgress[], category: string): number {
  const avgValue = recentData.reduce((sum, d) => sum + d.value, 0) / recentData.length;
  // Set goal at 110% of current average (achievable stretch)
  return Math.round(avgValue * 1.1);
}
```

## Streak Design

Streaks are powerful motivators but can become toxic if a single missed day erases weeks of progress:

- **Streak freezes**: give users 1-2 free "rest days" per week that do not break the streak
- **Weekend mode**: optionally lower targets on weekends
- **Recovery streaks**: after a broken streak, show "New streak: 3 days" alongside "Best streak: 21 days" so progress feels recoverable
- **Never punish**: no negative messaging for broken streaks. Use "Let's start fresh" not "You lost your streak"

## Progress Visualization

```
Daily View:
┌─────────────────────────────┐
│  Steps Today: 7,234/10,000  │
│  [███████░░░] 72%           │
│  2,766 to go · ~25 min walk │
└─────────────────────────────┘

Weekly View:
Mon  Tue  Wed  Thu  Fri  Sat  Sun
 ●    ●    ●    ◐    ○    ○    ○
10k  10k  10k  7k   --   --   --

Monthly Heatmap:
Dark green = exceeded goal
Light green = met goal
Yellow = 50-99% of goal
Gray = below 50% or no data
```

## Motivational Mechanics

| Mechanic | How It Works | Why It Works |
|----------|-------------|-------------|
| **Milestones** | "You've walked 100km total!" | Cumulative progress feels meaningful |
| **Comparisons** | "12% more active than last week" | Self-comparison (not social) drives growth |
| **Celebrations** | Confetti animation on goal completion | Immediate positive reinforcement |
| **Insights** | "You sleep 23 min more on days you exercise" | Data-driven self-awareness |
| **Nudges** | "You're 800 steps from your goal, take a short walk?" | Timely, actionable prompts |

Avoid social comparison leaderboards in health apps. They demotivate users who are not at the top and can trigger unhealthy competition.

## Key Takeaways

- Default goals to 80% achievable; consistent small wins build lasting habits
- Streak freezes and recovery messaging prevent single bad days from destroying motivation
- Show partial progress as positive (72% is great) rather than framing shortfalls as failure
- Use self-comparison trends ("better than last week") rather than social leaderboards
- Celebrate milestones with immediate visual feedback to reinforce the behavior loop
