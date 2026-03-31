---
id: SKL-0146
name: Double-Entry Accounting
category: skills
tags: [accounting, double-entry, journal-entries, chart-of-accounts, trial-balance, plain-text-accounting, debits-credits]
capabilities: [accounting-system-design, financial-record-keeping, balance-verification]
useWhen:
  - building a financial tracking or bookkeeping system
  - implementing transaction recording with debits and credits
  - designing a chart of accounts hierarchy
  - generating trial balances or financial statements
  - choosing between database-backed and plain-text accounting
estimatedTokens: 650
relatedFragments: [PAT-0071, PAT-0072, SKL-0147]
dependencies: []
synonyms: ["how do debits and credits work", "how to build a bookkeeping app", "what is double-entry accounting", "how to track income and expenses in code", "plain text accounting setup", "how to generate a trial balance"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/ledger/ledger"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Double-Entry Accounting

Every financial transaction affects at least two accounts. One side debits, the other credits. The books always balance.

## The Fundamental Equation

```
Assets = Liabilities + Equity
```

Every transaction preserves this equation. If you buy inventory with cash, assets shift between accounts but the total stays the same. If you take a loan, both assets and liabilities increase equally.

## Core Concepts

| Concept | Purpose | Example |
|---------|---------|---------|
| **Journal Entry** | Records a single transaction as debits and credits | "Sold product: debit Cash $100, credit Revenue $100" |
| **Chart of Accounts** | Hierarchical list of all accounts in the system | Assets > Current Assets > Cash, Liabilities > Accounts Payable |
| **General Ledger** | Collection of all accounts with running balances | The complete financial state of the entity |
| **Trial Balance** | Sum of all debits must equal sum of all credits | Verification report run before closing a period |

## Account Types and Normal Balances

| Account Type | Normal Balance | Increases With | Decreases With |
|-------------|---------------|----------------|----------------|
| Assets | Debit | Debit | Credit |
| Liabilities | Credit | Credit | Debit |
| Equity | Credit | Credit | Debit |
| Revenue | Credit | Credit | Debit |
| Expenses | Debit | Debit | Credit |

## Journal Entry Structure

```
Date: 2026-03-15
Description: Client payment received

  Debit:  Assets:Bank:Checking    $5,000.00
  Credit: Revenue:Consulting      $5,000.00
```

Every entry must have equal total debits and total credits. Multi-leg entries (more than two lines) are valid as long as the sides balance.

## Implementation Steps

1. **Design the chart of accounts.** Use a hierarchical naming scheme (e.g., `Assets:Current:Cash`). Keep it shallow enough to be useful but deep enough to be informative. Most small systems need 20-50 accounts.
2. **Store transactions as immutable journal entries.** Never edit a past entry. Post a correcting entry instead. This creates a complete audit trail.
3. **Derive balances from entries.** Account balances are computed by summing all debits and credits. Store snapshots for performance but always be able to recompute from the journal.
4. **Validate on write.** Reject any entry where debits do not equal credits. This is the single most important invariant in the system.
5. **Generate reports from the ledger.** Trial balance (all accounts with balances), income statement (revenue minus expenses for a period), balance sheet (assets, liabilities, equity at a point in time).

## Plain-Text Accounting

Tools like Ledger CLI store all data in human-readable text files. No database, no application state. The journal file is the single source of truth and reports are generated on demand. This approach works well for personal finance, small businesses, and developer-friendly workflows where version control of financial data is valuable.

## Anti-Patterns

- Allowing single-sided entries (breaks the fundamental equation)
- Mutating historical entries instead of posting corrections
- Mixing account types in the hierarchy (e.g., revenue under assets)
- Skipping trial balance verification before generating statements
- Storing only balances without the underlying journal entries
