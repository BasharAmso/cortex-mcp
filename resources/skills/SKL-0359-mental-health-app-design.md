---
id: SKL-0359
name: Mental Health App Design
category: skills
tags: [mental-health, mood-tracking, journaling, cbt, mindfulness, crisis-resources, wellness, therapy]
capabilities: [mood-tracking-design, journaling-features, cbt-exercise-builder, crisis-resource-integration]
useWhen:
  - building a mood tracking or mental wellness application
  - adding journaling features to a health app
  - implementing CBT-based exercises in a digital format
  - designing crisis resource flows and safety planning
  - creating mindfulness or meditation features
estimatedTokens: 650
relatedFragments: [SKL-0361, SKL-0364, PAT-0184, PAT-0187]
dependencies: []
synonyms: ["how to build a mood tracker app", "CBT app design guide", "mental wellness app features", "digital journaling for mental health", "crisis hotline integration in app", "mindfulness app development"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Mental Health App Design

Mental health apps help users track mood, practice therapeutic techniques, and access crisis resources. Responsible design means balancing engagement with clinical safety.

## Core Feature Set

| Feature | Purpose | Clinical Basis |
|---------|---------|---------------|
| **Mood Tracking** | Log emotional state over time | Self-monitoring improves emotional awareness |
| **Journaling** | Free-form and prompted writing | Expressive writing reduces stress (Pennebaker, 1997) |
| **CBT Exercises** | Thought records, cognitive restructuring | Evidence-based therapy technique |
| **Breathing Exercises** | Guided paced breathing | Activates parasympathetic nervous system |
| **Crisis Resources** | Hotlines, safety plans, emergency contacts | Duty of care for distress detection |

## Mood Tracking Design

```typescript
interface MoodEntry {
  id: string;
  userId: string;
  timestamp: Date;
  mood: 1 | 2 | 3 | 4 | 5;       // 1=very low, 5=great
  emotions: string[];               // ['anxious', 'hopeful', 'tired']
  activities: string[];             // ['work', 'exercise', 'socializing']
  sleepHours?: number;
  note?: string;
  factors?: string[];               // ['weather', 'conflict', 'achievement']
}
```

Design considerations for mood tracking:
- Use a simple 5-point scale with emoji or color-coded faces for quick entry
- Allow selecting multiple emotions (people rarely feel just one thing)
- Link mood to activities and context to help users identify patterns
- Show weekly and monthly trends as line charts, not just daily snapshots
- Send gentle reminders but never guilt-trip for missed entries

## CBT Thought Record

The thought record is the core CBT exercise. Guide users through it step by step:

```
1. Situation: What happened? (Brief description)
2. Automatic Thought: What went through your mind?
3. Emotion: What did you feel? How intense (0-100%)?
4. Evidence For: What supports this thought?
5. Evidence Against: What contradicts this thought?
6. Balanced Thought: A more realistic perspective
7. Re-rate Emotion: How intense now (0-100%)?
```

Present each step on its own screen. Do not show all fields at once since that overwhelms users new to CBT. Save completed records so users can review patterns in their thinking.

## Crisis Resource Design

This is non-negotiable for any mental health app:

- **Always visible** crisis button (not buried in settings)
- **988 Suicide & Crisis Lifeline** (US) with tap-to-call
- **Crisis Text Line** (text HOME to 741741)
- **User's personal emergency contacts** (set during onboarding)
- **Safety plan** the user creates in advance: warning signs, coping strategies, reasons for living, people to contact

```typescript
// Detect potential crisis keywords in journal entries
const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'no reason to live', 'self-harm'];

function checkForCrisisLanguage(text: string): boolean {
  const lower = text.toLowerCase();
  return crisisKeywords.some(keyword => lower.includes(keyword));
}
// If detected: show crisis resources immediately, do NOT just log it silently
```

## Responsible Design Principles

1. **Not a replacement for therapy.** State this clearly in onboarding and Terms of Service.
2. **No diagnosis.** The app tracks and supports but never diagnoses conditions.
3. **Data sensitivity.** Mental health data is among the most sensitive. Encrypt everything, minimize collection, allow full data deletion.
4. **Inclusive language.** Avoid clinical jargon. Use warm, non-judgmental phrasing.
5. **No streaks for mood logging.** Gamification that punishes missed days adds guilt, which is counterproductive for mental health.

## Key Takeaways

- Mood tracking should be quick (under 30 seconds) with optional depth for those who want it
- CBT exercises work best as step-by-step guided flows, not all-at-once forms
- Crisis resources must be always accessible and never more than one tap away
- Never gamify mental health tracking with streaks or punitive mechanics
- Be transparent that the app supports wellness but does not replace professional care
