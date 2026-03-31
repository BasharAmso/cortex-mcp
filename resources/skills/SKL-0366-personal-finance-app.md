---
id: SKL-0366
name: Personal Finance App
category: skills
tags: [personal-finance, budgeting, expense-tracking, savings-goals, money-management, spending, financial-planning]
capabilities: [budget-tracking-design, expense-categorization, savings-goal-features, spending-analysis]
useWhen:
  - building a personal finance or budgeting application
  - implementing expense tracking with categories
  - designing savings goal features with progress tracking
  - creating spending analysis and budget overview screens
  - helping users visualize where their money goes
estimatedTokens: 650
relatedFragments: [SKL-0367, SKL-0369, PAT-0188, PAT-0189]
dependencies: []
synonyms: ["how to build a budget tracker app", "personal finance app features", "expense tracking app design", "savings goal feature development", "money management app architecture", "spending category tracker"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "finance"
---

# Personal Finance App

A personal finance app helps users track income, categorize spending, set budgets, and work toward savings goals. The core challenge is making financial tracking effortless enough that users maintain it long-term.

## Data Model

```typescript
interface Account {
  id: string;
  userId: string;
  name: string;                    // 'Chase Checking'
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';
  balance: number;
  currency: string;
  institution?: string;
  isManual: boolean;               // True if not linked via Plaid/API
  lastSynced?: Date;
}

interface Transaction {
  id: string;
  accountId: string;
  amount: number;                  // Negative for expenses, positive for income
  description: string;             // 'AMAZON.COM*1234'
  merchantName?: string;           // 'Amazon' (cleaned)
  category: string;                // 'Shopping'
  subcategory?: string;            // 'Online Retail'
  date: Date;
  isRecurring: boolean;
  tags?: string[];
  notes?: string;
}

interface Budget {
  id: string;
  userId: string;
  category: string;
  monthlyLimit: number;
  period: 'monthly' | 'weekly';
  spent: number;                   // Calculated from transactions
  rollover: boolean;               // Unspent amount carries to next period
}

interface SavingsGoal {
  id: string;
  userId: string;
  name: string;                    // 'Emergency Fund'
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date;
  monthlyContribution?: number;    // Auto-calculated or user-set
  icon: string;
}
```

## Budget Overview Screen

```
┌─────────────────────────────────────────┐
│  March 2026          Income: $5,200     │
│  Spent: $3,847       Left: $1,353       │
├─────────────────────────────────────────┤
│  Housing        $1,500 / $1,500  [████] │
│  Groceries      $423   / $600    [███░] │
│  Transport      $287   / $350    [███░] │
│  Dining Out     $312   / $250    [████] ⚠│
│  Entertainment  $156   / $200    [██░░] │
│  Shopping       $389   / $300    [████] ⚠│
│  Subscriptions  $87    / $100    [███░] │
│  Other          $693   / $800    [███░] │
├─────────────────────────────────────────┤
│  ⚠ 2 categories over budget             │
│  💡 You spend 23% more dining out on    │
│     weekends. Consider a weekend budget. │
└─────────────────────────────────────────┘
```

## Envelope Budgeting Method

The most intuitive budgeting approach for users: allocate income into category "envelopes":

1. **Income arrives**: user allocates to category envelopes
2. **Spending happens**: deducted from the relevant envelope
3. **Envelope empty**: category is spent for the period
4. **Rollover option**: leftover amounts carry forward or reset

```typescript
function allocateIncome(income: number, budgets: Budget[]): AllocationResult {
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.monthlyLimit, 0);
  const unallocated = income - totalBudgeted;

  return {
    allocated: totalBudgeted,
    unallocated,
    suggestion: unallocated > 0
      ? `$${unallocated} unallocated. Add to savings?`
      : `Over-budgeted by $${Math.abs(unallocated)}. Adjust categories.`
  };
}
```

## Savings Goals

Make savings tangible with visual progress:

- Show progress as a filled container (jar, bar, ring) with percentage
- Calculate "on track" status: current savings vs. where they should be given the target date
- Suggest monthly contribution amount to reach the goal by the target date
- Celebrate milestones (25%, 50%, 75%, 100%) with visual feedback
- Allow "quick save" button to move money from unallocated funds to a goal

## Insights Engine

Automated insights make the data actionable:

- "Your grocery spending is up 18% from last month"
- "You have 12 active subscriptions totaling $187/month"
- "You could save $340/month by reducing dining out to your budget"
- "Your recurring expenses are 62% of income (healthy target: under 50%)"

Generate insights weekly by comparing current period vs. previous period and flagging meaningful deviations (threshold: 15%+ change).

## Key Takeaways

- Envelope budgeting is the most intuitive model; allocate income to categories, spend from envelopes
- Auto-categorize transactions but always allow manual override and category customization
- Savings goals need visual progress, on-track indicators, and milestone celebrations
- Automated spending insights surface patterns users would not notice from raw transaction lists
- Flag over-budget categories in real time rather than only at month-end
