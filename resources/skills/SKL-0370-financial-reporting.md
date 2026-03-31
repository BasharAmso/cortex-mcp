---
id: SKL-0370
name: Financial Reporting
category: skills
tags: [financial-reporting, profit-loss, balance-sheet, cash-flow, accounting, statements, reporting, gaap]
capabilities: [financial-statement-generation, pnl-reporting, balance-sheet-design, cash-flow-analysis]
useWhen:
  - building financial reporting features for a business application
  - generating profit and loss statements programmatically
  - designing balance sheet and cash flow report views
  - automating monthly or quarterly financial statement generation
  - creating financial dashboards for business owners
estimatedTokens: 650
relatedFragments: [SKL-0369, SKL-0372, PAT-0190, PAT-0191]
dependencies: []
synonyms: ["how to generate P&L reports", "balance sheet report design", "cash flow statement implementation", "automated financial statements", "business financial dashboard", "accounting report generation"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Financial Reporting

Financial reporting transforms transaction data into standardized statements that business owners, accountants, and regulators can understand. ERPNext's Chart of Accounts and reporting patterns show how to structure this cleanly.

## Three Core Statements

| Statement | Shows | Time Frame |
|-----------|-------|-----------|
| **Profit & Loss (Income Statement)** | Revenue minus expenses = net income | Period (month, quarter, year) |
| **Balance Sheet** | Assets = Liabilities + Equity at a point in time | Snapshot (specific date) |
| **Cash Flow Statement** | Cash in minus cash out by activity type | Period (month, quarter, year) |

## Chart of Accounts

The chart of accounts organizes all financial transactions into a hierarchy:

```typescript
interface Account {
  code: string;                   // '4100'
  name: string;                   // 'Product Revenue'
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentCode?: string;            // '4000' (Revenue)
  isGroup: boolean;               // True for parent accounts
  balance: number;
  normalBalance: 'debit' | 'credit';
}

// Standard top-level structure:
// 1000 - Assets (Cash, Receivables, Inventory, Equipment)
// 2000 - Liabilities (Payables, Loans, Deferred Revenue)
// 3000 - Equity (Owner's Equity, Retained Earnings)
// 4000 - Revenue (Product Revenue, Service Revenue, Other Income)
// 5000 - Cost of Goods Sold
// 6000 - Operating Expenses (Salaries, Rent, Marketing, Software)
// 7000 - Other Expenses (Interest, Depreciation, Tax)
```

## Profit & Loss Generation

```typescript
interface PnLReport {
  period: { start: Date; end: Date };
  revenue: LineItem[];
  costOfGoodsSold: LineItem[];
  grossProfit: number;
  operatingExpenses: LineItem[];
  operatingIncome: number;
  otherIncome: LineItem[];
  otherExpenses: LineItem[];
  netIncome: number;
  previousPeriod?: PnLReport;     // For comparison
}

interface LineItem {
  accountCode: string;
  accountName: string;
  amount: number;
  previousAmount?: number;        // For period comparison
  percentChange?: number;
}

async function generatePnL(startDate: Date, endDate: Date): Promise<PnLReport> {
  const transactions = await getTransactions(startDate, endDate);

  const revenue = aggregateByAccount(transactions, 'revenue');
  const cogs = aggregateByAccount(transactions, 'cogs');
  const opex = aggregateByAccount(transactions, 'expense');

  const grossProfit = sum(revenue) - sum(cogs);
  const operatingIncome = grossProfit - sum(opex);

  return {
    period: { start: startDate, end: endDate },
    revenue, costOfGoodsSold: cogs,
    grossProfit,
    operatingExpenses: opex,
    operatingIncome,
    otherIncome: [], otherExpenses: [],
    netIncome: operatingIncome
  };
}
```

## Report Display Patterns

Financial statements follow strict formatting conventions:

- **Indentation** shows hierarchy (parent accounts flush left, sub-accounts indented)
- **Totals and subtotals** are bold with a line above
- **Negative numbers** shown in parentheses: $(1,234) not -$1,234
- **Comparison columns** show current period, previous period, and percentage change
- **Percentages** show each line as a percentage of revenue (common-size analysis)

```
Revenue
  Product Revenue              $45,000    $38,000    +18.4%
  Service Revenue              $12,000    $15,000    -20.0%
  ─────────────────────────────────────────────────────────
  Total Revenue                $57,000    $53,000    +7.5%

Cost of Goods Sold
  Materials                    $15,000    $13,000    +15.4%
  Labor                         $8,000     $7,500    +6.7%
  ─────────────────────────────────────────────────────────
  Total COGS                   $23,000    $20,500    +12.2%

Gross Profit                   $34,000    $32,500    +4.6%
  Gross Margin                   59.6%      61.3%
```

## Automation

- **Monthly close**: auto-generate statements on the 1st of each month for the prior month
- **Accrual adjustments**: recognize revenue when earned, expenses when incurred (not when cash moves)
- **Recurring entries**: auto-post depreciation, amortization, and prepaid expense allocations monthly
- **Export formats**: PDF for stakeholders, CSV for accountants, XBRL for regulatory filing

## Key Takeaways

- Structure accounts in a standard chart of accounts hierarchy for consistent reporting
- Always show comparison periods (current vs. previous) with percentage change
- Use accounting conventions: parentheses for negatives, indentation for hierarchy, bold for totals
- Automate monthly close with recurring journal entries and accrual adjustments
- Export in multiple formats since different stakeholders need PDF, CSV, or XBRL
