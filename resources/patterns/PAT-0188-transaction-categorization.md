---
id: PAT-0188
name: Transaction Categorization
category: patterns
tags: [transaction, categorization, merchant-mapping, ml-rules, auto-categorize, finance, classification, spending]
capabilities: [auto-categorization, merchant-mapping, rule-engine, manual-override]
useWhen:
  - auto-categorizing bank transactions in a finance app
  - building merchant name to category mapping logic
  - implementing ML-based transaction classification
  - designing manual override and learning from user corrections
  - categorizing recurring vs. one-time transactions
estimatedTokens: 650
relatedFragments: [SKL-0366, SKL-0367, SKL-0369, PAT-0189]
dependencies: []
synonyms: ["how to auto-categorize bank transactions", "merchant mapping for expense categories", "transaction classification ML", "spending category assignment", "bank transaction tagging automation", "categorize purchases automatically"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/maybe-finance/maybe"
difficulty: beginner
owner: "cortex"
pillar: "finance"
---

# Transaction Categorization

Automatically categorizing bank transactions is essential for budgeting and expense tracking. The goal is to assign every transaction to a spending category with high accuracy while letting users override and teach the system.

## Category Taxonomy

Start with a manageable set of categories (12-15) that cover most spending:

| Category | Examples | MCC Ranges |
|----------|---------|------------|
| Housing | Rent, mortgage, property tax | 6513, 6011 |
| Groceries | Supermarkets, food stores | 5411, 5422 |
| Dining Out | Restaurants, fast food, coffee shops | 5812, 5814 |
| Transportation | Gas, parking, tolls, public transit | 5541, 4111, 7523 |
| Shopping | Retail, online stores, clothing | 5311, 5411, 5651 |
| Entertainment | Streaming, movies, concerts, games | 7832, 7922, 5815 |
| Health | Pharmacy, doctor, dentist, gym | 5912, 8011, 7941 |
| Utilities | Electric, water, internet, phone | 4900, 4899, 4812 |
| Subscriptions | SaaS, memberships, recurring services | (detected by recurrence) |
| Travel | Hotels, flights, car rental | 7011, 3000-3299, 7512 |
| Education | Tuition, books, courses | 8211, 5942, 8299 |
| Personal | Haircuts, dry cleaning, gifts | 7230, 7211, 5947 |
| Income | Salary, transfers in, refunds | (positive amounts) |
| Transfer | Between own accounts | (matched account detection) |

## Categorization Strategy (Layered)

Apply rules in priority order, stopping at the first match:

```typescript
async function categorizeTransaction(tx: Transaction): Promise<string> {
  // Layer 1: User rules (highest priority)
  const userRule = await matchUserRule(tx);
  if (userRule) return userRule;

  // Layer 2: Merchant mapping (known merchants)
  const merchantCategory = await lookupMerchant(tx.merchantName || tx.description);
  if (merchantCategory) return merchantCategory;

  // Layer 3: MCC code mapping (from card processor)
  if (tx.mccCode) {
    const mccCategory = mccToCategory(tx.mccCode);
    if (mccCategory) return mccCategory;
  }

  // Layer 4: Keyword matching (fallback)
  const keywordMatch = matchKeywords(tx.description);
  if (keywordMatch) return keywordMatch;

  // Layer 5: Uncategorized (user needs to classify)
  return 'uncategorized';
}
```

## Merchant Name Cleaning

Raw transaction descriptions are messy. Clean them before matching:

```typescript
function cleanMerchantName(raw: string): string {
  let cleaned = raw;

  // Remove common suffixes: location codes, transaction IDs, dates
  cleaned = cleaned.replace(/\s+#\d+/g, '');           // Remove #12345
  cleaned = cleaned.replace(/\s+\d{2}\/\d{2}/g, '');   // Remove 03/15
  cleaned = cleaned.replace(/\s+[A-Z]{2}\s*$/g, '');    // Remove state codes
  cleaned = cleaned.replace(/\*\d+/g, '');               // Remove *1234

  // Normalize known merchants
  const merchantMap: Record<string, string> = {
    'AMZN': 'Amazon', 'AMAZON.COM': 'Amazon',
    'NETFLIX.COM': 'Netflix', 'NFLX': 'Netflix',
    'UBER   TRIP': 'Uber', 'UBER   EATS': 'Uber Eats',
    'SQ *': 'Square Merchant',
  };

  for (const [pattern, name] of Object.entries(merchantMap)) {
    if (cleaned.toUpperCase().includes(pattern)) return name;
  }

  return cleaned.trim();
}
```

## Learning from User Corrections

When a user recategorizes a transaction, learn from it:

```typescript
interface UserCategoryRule {
  merchantPattern: string;       // 'Amazon' or 'WHOLE FOODS'
  category: string;              // 'Groceries' (overriding default 'Shopping')
  userId: string;
  appliedCount: number;
  createdAt: Date;
}

async function handleRecategorization(tx: Transaction, newCategory: string, userId: string) {
  // 1. Update the transaction
  await updateCategory(tx.id, newCategory);

  // 2. Create or update user rule
  await upsertUserRule({
    merchantPattern: tx.cleanedMerchantName,
    category: newCategory,
    userId
  });

  // 3. Offer to apply retroactively
  const similar = await findSimilarTransactions(tx.cleanedMerchantName, userId);
  if (similar.length > 1) {
    // "Apply 'Groceries' to 12 other Amazon Fresh transactions?"
    return { suggestBulkUpdate: true, count: similar.length };
  }
}
```

## Recurring Transaction Detection

Identify subscriptions and recurring charges:

- Same merchant + similar amount (within 10%) + regular interval (weekly, monthly, annual)
- Track the pattern over 3+ occurrences before marking as recurring
- Show users a "Subscriptions" summary with monthly total
- Alert when a new recurring charge is detected

## Key Takeaways

- Layer categorization: user rules, merchant map, MCC codes, keywords, then uncategorized
- Clean raw merchant descriptions before matching since bank formats are inconsistent
- Learn from user corrections and offer to apply changes retroactively to similar transactions
- Detect recurring transactions by pattern-matching same merchant + similar amount + regular interval
- Keep the category taxonomy under 15 categories; too many makes manual categorization tedious
