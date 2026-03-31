---
id: PAT-0077
name: Health Tracking Data Models
category: patterns
tags: [health, fitness, workout, nutrition, body-measurement, progress, tracking, exercise, goals, privacy]
capabilities: [workout-modeling, nutrition-logging, body-tracking, progress-visualization, goal-management]
useWhen:
  - designing a fitness or workout tracking app
  - modeling exercise routines with sets, reps, and progression
  - building nutrition logging with calorie and macro tracking
  - implementing body measurement and progress tracking
  - adding goal-setting and progress visualization features
estimatedTokens: 700
relatedFragments: [SKL-0151, PAT-0004, PAT-0078]
dependencies: []
synonyms: ["how to build a workout tracker", "how to model exercise data", "how to track calories and macros", "how to store fitness progress", "how to design a health app database", "how to build a body measurement tracker"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/wger-project/wger"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Health Tracking Data Models

Data models and patterns for fitness, nutrition, and body measurement tracking applications. Based on patterns from wger, an open-source workout and fitness manager.

## Core Domain Models

### Workout Structure

```
Routine -> Day -> Exercise slot -> Set (reps x weight)
```

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **Routine** | name, description, is_active | Named workout plan |
| **Day** | routine_id, name, day_of_week | Groups exercises for a session |
| **Exercise** | name, muscle_group, equipment, description | Exercise catalog entry |
| **Set** | exercise_id, day_id, reps, weight, order | Single set within a workout |
| **WorkoutLog** | date, day_id, user_id, duration, notes | Completed session record |

### Progression Rules

Track weight progression automatically. Common strategies:
- **Linear:** Add fixed weight each session (e.g., +2.5kg per week)
- **Percentage:** Increase by % of current working weight
- **RPE-based:** Adjust based on rate of perceived exertion

Store progression config per exercise slot so routines auto-calculate target weights.

## Nutrition Logging

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **Ingredient** | name, calories, protein, carbs, fat, fiber | Food database entry |
| **Meal** | date, name (breakfast/lunch/dinner/snack) | Groups food items |
| **MealItem** | meal_id, ingredient_id, amount_grams | Portion of a food |
| **NutritionPlan** | user_id, calories_target, protein_target | Daily macro goals |

Use a public food database (Open Food Facts) as the ingredient source. Let users add custom ingredients for foods not in the database.

## Body Measurements

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **WeightEntry** | date, weight_kg, user_id | Daily weigh-in |
| **Measurement** | date, category, value, unit | Chest, waist, arms, etc. |
| **ProgressPhoto** | date, image_url, user_id, visibility | Visual progress tracking |

## Progress and Goals

1. **Time-series storage** for all measurements. Every entry is a (date, value) pair.
2. **Charts** show trends over configurable periods (1 week, 1 month, 3 months, 1 year).
3. **Goals** have a target value, deadline, and current value. Calculate progress percentage and projected completion.
4. **Streaks** track consecutive days of logging to encourage consistency.

## Privacy Considerations

- Body measurements and photos are deeply personal. Default visibility to private.
- Never share health data with third parties without explicit consent.
- Allow full data export (JSON/CSV) so users own their data.
- Allow complete account and data deletion.
- If multi-user (gym/trainer mode), trainers see only what clients explicitly share.
- Store progress photos encrypted at rest.

## Anti-Patterns

- Storing only current values without history (kills progress charts)
- Hardcoding exercise lists instead of using a catalog model
- Missing units on measurements (kg vs lbs ambiguity)
- No soft-delete on workout logs (users accidentally delete progress)
- Coupling nutrition data to a single food database vendor
