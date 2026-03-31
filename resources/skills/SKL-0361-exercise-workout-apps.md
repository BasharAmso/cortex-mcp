---
id: SKL-0361
name: Exercise & Workout Apps
category: skills
tags: [exercise, workout, fitness, rep-tracking, rest-timer, progress-charts, training, strength]
capabilities: [workout-plan-design, rep-tracking, rest-timer-implementation, progress-visualization]
useWhen:
  - building a workout tracking or fitness application
  - implementing rep and set tracking for strength training
  - designing rest timer and exercise flow interfaces
  - creating workout plan builders with exercise libraries
  - visualizing fitness progress with charts and personal records
estimatedTokens: 650
relatedFragments: [SKL-0358, SKL-0360, PAT-0184, PAT-0187]
dependencies: []
synonyms: ["how to build a workout tracker app", "fitness app rep counter design", "exercise library for workout apps", "rest timer between sets implementation", "gym tracker app development", "strength training progress charts"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Exercise & Workout Apps

Workout apps help users follow training plans, log exercises, and track progress over time. The core UX challenge is making logging fast enough to use mid-workout without disrupting the session.

## Data Model

```typescript
interface Exercise {
  id: string;
  name: string;                   // 'Barbell Bench Press'
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight';
  muscleGroups: string[];         // ['chest', 'triceps', 'shoulders']
  equipment: string[];            // ['barbell', 'bench']
  instructions?: string;
  videoUrl?: string;
}

interface WorkoutSet {
  setNumber: number;
  weight?: number;                // kg or lbs
  reps?: number;
  duration?: number;              // seconds (for cardio/planks)
  distance?: number;              // meters (for running/rowing)
  restAfter: number;              // seconds of rest after this set
  completed: boolean;
}

interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
}

interface Workout {
  id: string;
  userId: string;
  name: string;                   // 'Push Day A'
  startTime: Date;
  endTime?: Date;
  exercises: WorkoutExercise[];
  totalVolume: number;            // sum of (weight x reps) across all sets
}
```

## Active Workout Screen

The active workout screen is where users spend 90% of their time. Design for one-handed use:

```
┌─────────────────────────────┐
│  Bench Press          3/4   │  ← Exercise name, set progress
│  Previous: 80kg x 8        │  ← Last session's performance
├─────────────────────────────┤
│  Weight: [80] kg            │  ← Large tap targets
│  Reps:   [8]                │  ← Pre-filled from previous
│                             │
│  [ Complete Set ✓ ]         │  ← Big button, easy to tap
├─────────────────────────────┤
│  Rest Timer: 1:32 / 2:00   │  ← Auto-starts on set completion
│  [Skip Rest]                │
├─────────────────────────────┤
│  Set 1: 80kg x 8 ✓         │
│  Set 2: 80kg x 7 ✓         │
│  Set 3: 80kg x 8 ✓         │
│  Set 4: __ x __             │  ← Current set
└─────────────────────────────┘
```

Key UX decisions:
- Pre-fill weight and reps from the previous session (progressive overload tracking)
- Auto-start rest timer when a set is completed
- Show previous session performance for comparison
- Large touch targets since users may have sweaty hands or be fatigued

## Rest Timer

```typescript
function RestTimer({ duration, onComplete, onSkip }: RestTimerProps) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { onComplete(); clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [duration]);

  // Vibrate device when timer completes
  // Play subtle audio cue (configurable in settings)
}
```

## Progress Tracking

Track these metrics to show meaningful progress:

- **Volume per muscle group** over time (weight x reps, weekly total)
- **Estimated 1RM** using Epley formula: `weight * (1 + reps / 30)`
- **Personal records** for each exercise (heaviest weight, most reps, highest volume)
- **Workout frequency** as a calendar heatmap (similar to GitHub contribution graph)
- **Body measurements** (optional): weight, body fat %, circumferences

## Workout Plan Templates

Provide starter plans so new users do not face a blank screen:

| Plan | Structure | Level |
|------|-----------|-------|
| **Push/Pull/Legs** | 6 days, muscle group split | Intermediate |
| **Full Body 3x** | 3 days, compound movements | Beginner |
| **Upper/Lower** | 4 days, alternating focus | Intermediate |
| **5/3/1** | 4 days, percentage-based progression | Advanced |

## Key Takeaways

- Pre-fill sets from previous workouts to minimize mid-workout data entry
- Auto-start rest timers with haptic feedback when they expire
- Track volume (weight x reps) as the primary progress metric, not just max weight
- Provide template workout plans so beginners are not overwhelmed by a blank slate
- Design for one-handed, sweaty-finger use with large touch targets
