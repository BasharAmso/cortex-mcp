---
id: SKL-0360
name: Nutrition & Diet Tracking
category: skills
tags: [nutrition, diet, food-logging, macros, meal-planning, barcode-scanning, calories, health]
capabilities: [food-logging-design, macro-calculation, meal-planning, barcode-integration]
useWhen:
  - building a food logging or calorie tracking application
  - implementing macro nutrient tracking features
  - adding barcode scanning for packaged food lookup
  - designing meal planning and recipe management
  - creating dietary goal tracking with progress visualization
estimatedTokens: 650
relatedFragments: [SKL-0361, SKL-0359, PAT-0184, PAT-0187]
dependencies: []
synonyms: ["how to build a calorie tracker", "food diary app development", "macro tracking app design", "barcode food scanner integration", "meal planner app features", "nutrition database integration"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Nutrition & Diet Tracking

Nutrition tracking apps help users log food intake, monitor macronutrients, and plan meals. The key challenge is making food logging fast enough that users actually do it consistently.

## Data Model

```typescript
interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  barcode?: string;
  servingSize: number;
  servingUnit: string;          // 'g', 'ml', 'cup', 'piece'
  calories: number;             // per serving
  protein: number;              // grams per serving
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

interface FoodLogEntry {
  id: string;
  userId: string;
  foodItemId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;             // 1.5 = one and a half servings
  timestamp: Date;
  isQuickAdd: boolean;          // Manual calorie entry without food item
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
```

## Food Database Strategy

No app can maintain its own complete food database. Use a layered approach:

1. **Open Food Facts** (open-source, community-maintained, barcode-searchable) as the primary free database
2. **USDA FoodData Central API** for generic/unbranded foods (chicken breast, rice, apple)
3. **User-submitted entries** for local or homemade foods
4. **Recently logged** and **favorites** for fast repeat logging (80% of meals are repeats)

```typescript
async function searchFood(query: string): Promise<FoodItem[]> {
  // Search in priority order: user favorites, recent, local DB, then external APIs
  const [favorites, recent] = await Promise.all([
    searchFavorites(query),
    searchRecent(query)
  ]);
  if (favorites.length + recent.length >= 5) return [...favorites, ...recent];

  const external = await Promise.all([
    searchOpenFoodFacts(query),
    searchUSDA(query)
  ]);
  return [...favorites, ...recent, ...external.flat()].slice(0, 20);
}
```

## Barcode Scanning

Barcode scanning is the fastest logging method for packaged foods:

- Use the device camera with a barcode scanning library (e.g., `vision-camera-code-scanner` for React Native)
- Look up the UPC/EAN code against Open Food Facts API
- If found, pre-fill all nutrition data and let the user confirm serving size
- If not found, let the user manually enter nutrition info and contribute it back to the database

## Meal Planning

Meal planning helps users hit their nutrition targets proactively instead of reactively:

- **Recipe builder**: combine food items into recipes with automatic nutrition calculation
- **Meal templates**: save common meals ("My usual breakfast") for one-tap logging
- **Weekly planner**: drag-and-drop meals onto a weekly calendar
- **Shopping list**: auto-generate from the meal plan, grouped by store section

## Display and Visualization

- **Daily summary ring**: show calories consumed vs. goal as a circular progress bar
- **Macro breakdown**: horizontal stacked bar for protein/carbs/fat percentages
- **Weekly trends**: line chart showing daily calorie intake over the past 7 days
- **Remaining budget**: "You have 450 calories and 30g protein left today"

## Key Takeaways

- Prioritize logging speed: favorites, recents, and barcode scanning handle 90% of entries
- Layer multiple food databases (user data, Open Food Facts, USDA) for comprehensive coverage
- Show remaining daily budget prominently to guide eating decisions throughout the day
- Meal templates and recipes reduce friction for repeat meals
- Never shame users for exceeding goals; frame everything as information, not judgment
