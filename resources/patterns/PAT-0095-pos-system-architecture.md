---
id: PAT-0095
name: POS System Architecture
category: patterns
tags: [pos, offline-first, receipts, tax-calculation, inventory-sync, small-business]
capabilities: [offline-operation, receipt-generation, tax-handling, inventory-synchronization]
useWhen:
  - designing an offline-capable point-of-sale system
  - implementing receipt generation with tax calculation
  - syncing POS transactions with inventory and accounting
  - building a multi-terminal checkout system
  - choosing between cloud-only and hybrid POS architecture
estimatedTokens: 650
relatedFragments: [SKL-0178, PAT-0096, SKL-0180]
dependencies: []
synonyms: ["how do I build a POS that works offline", "how to generate receipts with tax calculation", "what is the best POS architecture for a small business", "how do I sync sales data with inventory", "how to handle multiple checkout terminals", "how do I design a point-of-sale system"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/odoo/odoo"
difficulty: intermediate
owner: "cortex"
pillar: "business-automation"
---

# Pattern: POS System Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0095 |
| **Name** | POS System Architecture |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

A POS system must work when the internet doesn't. Odoo's POS module demonstrates the reference architecture: a browser-based frontend that caches products and pricing locally, processes transactions offline, and syncs to the server when connectivity returns. This hybrid approach balances reliability with centralized data management.

### Offline-First Architecture

The POS frontend loads the full product catalog, pricing rules, and tax configuration on session start. Transactions are processed locally and queued in browser storage (IndexedDB). A sync engine runs in the background, pushing completed orders to the server when online. Conflict resolution follows a "last write wins" strategy for non-critical data and server-authoritative rules for pricing and inventory.

```
[POS Terminal (Browser)]
  ├── Local product cache
  ├── Transaction queue (IndexedDB)
  ├── Receipt renderer
  └── Sync engine ←→ [Server API]
                        ├── Product catalog
                        ├── Inventory
                        ├── Accounting ledger
                        └── Reporting
```

### Session Model

Odoo's POS uses a session-based architecture. A cashier **opens a session** with a starting cash float. All transactions belong to that session. At shift end, the session **closes** with a cash count, generating a reconciliation report (expected vs. actual cash). This isolates accountability per shift and simplifies end-of-day accounting.

### Receipt Generation

Receipts are rendered from a template with order data: line items, quantities, unit prices, subtotal, tax breakdown, total, payment method, and change given. Support thermal printer output (ESC/POS commands) for physical receipts and PDF/email for digital receipts. Odoo renders receipts in the browser and sends print commands to connected hardware.

### Tax Calculation

Tax complexity varies by jurisdiction. The pattern: attach a **tax rule** to each product or product category. At checkout, apply the rule to compute tax per line item. Support tax-inclusive pricing (price shown includes tax, common in retail) and tax-exclusive pricing (tax added at checkout, common in B2B). Display the tax breakdown on the receipt. For multi-jurisdiction businesses, select the tax profile based on the store location.

### Inventory Synchronization

Each completed sale decrements stock counts. In offline mode, decrements queue locally and apply on sync. The server reconciles: if stock went negative (two terminals sold the last item simultaneously), flag it for manual review rather than blocking the sale. Real-time stock checks at the terminal are a nice-to-have but should never block a transaction.

### Payment Processing

Support multiple payment methods per transaction: cash (with change calculation), card (via terminal integration or payment gateway), gift cards (balance lookup and deduction), and split payments. Odoo uses a plugin architecture for payment providers — each gateway is a module that implements a standard interface.

## Key Takeaways

- Offline-first is mandatory — never let internet outages stop sales
- Session-based terminals simplify shift accounting and cash reconciliation
- Tax rules attach to products, not transactions — keeps checkout logic clean
- Inventory sync should never block a sale — reconcile after the fact
- Receipt templates should support both thermal printers and digital delivery
