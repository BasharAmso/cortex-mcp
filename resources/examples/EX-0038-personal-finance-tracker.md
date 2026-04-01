---
id: EX-0038
name: Personal Finance Tracker
category: examples
tags: [finance, budget, transactions, categorization, spending, savings, typescript]
capabilities: [transaction-categorization, budget-tracking, spending-insights]
useWhen:
  - building a personal finance tracker with auto-categorization
  - comparing actual spending against budget targets
  - generating spending insights and savings recommendations
estimatedTokens: 620
relatedFragments: [SKL-0366, PAT-0071, SKL-0146]
dependencies: []
synonyms: ["finance tracker example", "budget app", "expense categorizer", "spending tracker", "money management tool"]
sourceUrl: "https://github.com/actualbudget/actual"
lastUpdated: "2026-04-01"
difficulty: beginner
owner: builder
pillar: "finance"
---

# Personal Finance Tracker

Transaction categorization, budget tracking, and spending insights with auto-categorization rules.

## Implementation

```typescript
// --- Data Model ---
type Category = 'housing' | 'food' | 'transport' | 'utilities' | 'entertainment' | 'health' | 'shopping' | 'savings' | 'income' | 'other';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;        // positive = income, negative = expense
  category: Category;
  merchant?: string;
  isRecurring: boolean;
  tags: string[];
}

interface BudgetTarget {
  category: Category;
  monthlyLimit: number;  // positive value in dollars
}

interface MonthSummary {
  month: string;         // 'YYYY-MM'
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;   // 0-1
  byCategory: Record<Category, { spent: number; budget: number; pctUsed: number }>;
  overBudgetCategories: Category[];
}

// --- Auto-Categorization ---
const CATEGORY_RULES: Array<{ pattern: RegExp; category: Category }> = [
  { pattern: /rent|mortgage|hoa/i, category: 'housing' },
  { pattern: /grocery|restaurant|doordash|uber eats|starbucks|chipotle/i, category: 'food' },
  { pattern: /gas|uber|lyft|parking|transit|metro/i, category: 'transport' },
  { pattern: /electric|water|internet|phone|verizon|comcast/i, category: 'utilities' },
  { pattern: /netflix|spotify|hulu|cinema|game/i, category: 'entertainment' },
  { pattern: /pharmacy|doctor|dental|gym|health/i, category: 'health' },
  { pattern: /amazon|target|walmart|costco/i, category: 'shopping' },
  { pattern: /payroll|salary|direct deposit|freelance/i, category: 'income' },
];

function categorizeTransaction(description: string): Category {
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(description)) return rule.category;
  }
  return 'other';
}

// --- Budget Tracker ---
class FinanceTracker {
  private transactions: Transaction[] = [];
  private budgets: BudgetTarget[] = [];

  addTransaction(tx: Omit<Transaction, 'category'> & { category?: Category }): Transaction {
    const categorized: Transaction = {
      ...tx,
      category: tx.category ?? categorizeTransaction(tx.description),
    };
    this.transactions.push(categorized);
    return categorized;
  }

  setBudget(category: Category, monthlyLimit: number): void {
    const existing = this.budgets.find(b => b.category === category);
    if (existing) {
      existing.monthlyLimit = monthlyLimit;
    } else {
      this.budgets.push({ category, monthlyLimit });
    }
  }

  // --- Monthly Summary ---
  getMonthSummary(year: number, month: number): MonthSummary {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    const monthTxs = this.transactions.filter(tx => {
      const d = tx.date;
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    const totalIncome = monthTxs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalExpenses = Math.abs(monthTxs.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0));
    const netSavings = totalIncome - totalExpenses;

    const byCategory = {} as MonthSummary['byCategory'];
    const overBudget: Category[] = [];

    for (const budget of this.budgets) {
      const spent = Math.abs(
        monthTxs.filter(t => t.category === budget.category && t.amount < 0)
          .reduce((s, t) => s + t.amount, 0),
      );
      const pctUsed = budget.monthlyLimit > 0 ? spent / budget.monthlyLimit : 0;
      byCategory[budget.category] = { spent, budget: budget.monthlyLimit, pctUsed };
      if (pctUsed > 1) overBudget.push(budget.category);
    }

    return {
      month: monthStr,
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate: totalIncome > 0 ? netSavings / totalIncome : 0,
      byCategory,
      overBudgetCategories: overBudget,
    };
  }

  // --- Spending Insights ---
  getInsights(year: number, month: number): string[] {
    const summary = this.getMonthSummary(year, month);
    const insights: string[] = [];

    if (summary.savingsRate >= 0.2) {
      insights.push(`Great savings rate: ${(summary.savingsRate * 100).toFixed(0)}% of income saved`);
    } else if (summary.savingsRate > 0) {
      insights.push(`Savings rate is ${(summary.savingsRate * 100).toFixed(0)}%. Target 20% for healthy finances.`);
    } else {
      insights.push('Spending exceeded income this month. Review discretionary categories.');
    }

    for (const cat of summary.overBudgetCategories) {
      const { spent, budget } = summary.byCategory[cat];
      insights.push(`${cat} is over budget: $${spent.toFixed(0)} spent vs $${budget.toFixed(0)} limit`);
    }

    // Find largest expense category
    const sorted = Object.entries(summary.byCategory).sort((a, b) => b[1].spent - a[1].spent);
    if (sorted.length > 0) {
      const [topCat, topData] = sorted[0];
      insights.push(`Largest expense: ${topCat} at $${topData.spent.toFixed(0)}`);
    }

    return insights;
  }

  // --- Recurring Detection ---
  getRecurringExpenses(): Array<{ description: string; avgAmount: number; frequency: number }> {
    const groups = new Map<string, number[]>();
    for (const tx of this.transactions.filter(t => t.amount < 0)) {
      const key = tx.description.toLowerCase().trim();
      const arr = groups.get(key) ?? [];
      arr.push(Math.abs(tx.amount));
      groups.set(key, arr);
    }

    return [...groups.entries()]
      .filter(([, amounts]) => amounts.length >= 2)
      .map(([desc, amounts]) => ({
        description: desc,
        avgAmount: amounts.reduce((a, b) => a + b, 0) / amounts.length,
        frequency: amounts.length,
      }))
      .sort((a, b) => b.avgAmount - a.avgAmount);
  }
}

// --- Usage ---
const tracker = new FinanceTracker();
tracker.setBudget('food', 600);
tracker.setBudget('entertainment', 150);
tracker.setBudget('transport', 200);

tracker.addTransaction({ id: '1', date: new Date('2026-04-05'), description: 'Payroll Direct Deposit', amount: 5000, isRecurring: true, tags: ['salary'] });
tracker.addTransaction({ id: '2', date: new Date('2026-04-06'), description: 'Chipotle', amount: -14.50, isRecurring: false, tags: ['lunch'] });
tracker.addTransaction({ id: '3', date: new Date('2026-04-07'), description: 'Netflix', amount: -15.49, isRecurring: true, tags: ['streaming'] });

const insights = tracker.getInsights(2026, 4);
insights.forEach(i => console.log(`- ${i}`));
```

## Key Patterns

- **Regex auto-categorization**: pattern matching against merchant names eliminates manual categorization for common transactions
- **Budget vs actual**: per-category comparison with percentage tracking flags overspending in real time
- **Savings rate**: income-based savings percentage gives a single health indicator (target: 20%+)
- **Recurring detection**: groups identical descriptions to surface subscriptions and fixed costs automatically
