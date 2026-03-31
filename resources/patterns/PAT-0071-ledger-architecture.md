---
id: PAT-0071
name: Ledger Architecture
category: patterns
tags: [ledger, immutable-log, event-sourcing, multi-currency, audit-trail, balance-snapshots, financial-core]
capabilities: [ledger-system-design, immutable-transaction-logging, multi-currency-support]
useWhen:
  - designing a financial ledger or money-moving application
  - building an event-sourced transaction system
  - implementing multi-currency account balances
  - architecting an audit trail for financial data
  - choosing between balance-update and event-log approaches
estimatedTokens: 650
relatedFragments: [SKL-0146, PAT-0072, PAT-0004]
dependencies: []
synonyms: ["how to design a financial ledger", "immutable transaction log pattern", "how to handle multiple currencies", "event sourcing for money", "how to build an audit trail for payments", "ledger database design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formancehq/ledger"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Ledger Architecture

A programmable ledger is an append-only transaction log where balances are derived state. Never update a balance directly. Replay the log to reconstruct any account at any point in time.

## Core Principles

| Principle | Why It Matters |
|-----------|---------------|
| **Immutable transactions** | Once posted, a transaction cannot be changed. Corrections are new transactions. This guarantees audit integrity. |
| **Derived balances** | Balances are computed from the transaction log. Snapshots speed reads but the log is the source of truth. |
| **Multi-posting atomicity** | A single transaction can move value between many accounts. All postings commit or none do. |
| **Account-based modeling** | Every asset, liability, and flow gets an account. Accounts are the nouns; transactions are the verbs. |

## Transaction Structure

```
Transaction #TXN-4821
  Timestamp: 2026-03-15T14:30:00Z
  Reference: "invoice-pay-1234"
  Metadata: { invoiceId: "INV-1234", customerId: "C-567" }

  Postings:
    source: users:567:wallet     amount: -150.00  asset: USD/2
    dest:   platform:revenue     amount:  142.50  asset: USD/2
    dest:   platform:fees        amount:    7.50  asset: USD/2
```

The `USD/2` notation means US dollars with 2 decimal places. Use integer arithmetic internally (15000 cents, not 150.00 dollars) to avoid floating-point errors.

## Multi-Currency Handling

1. **Each posting has an explicit asset type.** Never assume a default currency. Store `USD/2`, `EUR/2`, `BTC/8` on every posting.
2. **Accounts can hold multiple assets.** Query balances per asset. A user wallet might hold both USD and EUR.
3. **Currency conversion is a transaction.** Debit one asset, credit another, record the exchange rate as metadata. Never silently convert.
4. **Use the smallest unit.** Store amounts as integers in the smallest denomination (cents, satoshis). Define the precision per asset type.

## Balance Snapshots

Computing a balance by replaying all transactions is correct but slow as the log grows. Use snapshots:

1. Periodically compute and store the balance for each account at a known transaction sequence number.
2. To get the current balance, start from the latest snapshot and replay only newer transactions.
3. Snapshots are cache, not source of truth. They can be rebuilt from the log at any time.

## Event-Sourced State

The transaction log is an event store. Each transaction is an event. This enables:

- **Point-in-time queries**: "What was this account's balance on March 1st?"
- **Replay and rebuild**: Reconstruct any derived view by replaying the log.
- **Audit trail**: Every state change has a timestamp, reference, and metadata.
- **Streaming to analytics**: Ship the log to data warehouses for OLAP queries without touching the live system.

## Anti-Patterns

- Updating balances in place without an underlying transaction log
- Allowing transaction mutations after commit (use reversals instead)
- Storing monetary amounts as floating-point numbers
- Missing asset type on postings (leads to currency confusion at scale)
- Coupling the ledger to business logic (keep the ledger generic; business rules sit above it)
