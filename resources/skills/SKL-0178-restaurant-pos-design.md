---
id: SKL-0178
name: Restaurant POS Design
category: skills
tags: [pos, restaurant, orders, kitchen-display, payments, small-business]
capabilities: [order-management, table-tracking, kitchen-routing, payment-splitting]
useWhen:
  - building a point-of-sale system for a restaurant or cafe
  - designing order flow from table to kitchen to payment
  - implementing table management and floor plans
  - handling split bills and multiple payment methods
  - creating a kitchen display system for order preparation
estimatedTokens: 650
relatedFragments: [PAT-0095, SKL-0180, PAT-0096]
dependencies: []
synonyms: ["how do I build a POS system for my restaurant", "how to manage table orders digitally", "what is the best way to send orders to the kitchen", "how do I split bills between customers", "how to track orders from table to kitchen", "how do I set up a digital ordering system for my cafe"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/odoo/odoo"
difficulty: intermediate
owner: "cortex"
pillar: "business-automation"
---

# Skill: Restaurant POS Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0178 |
| **Name** | Restaurant POS Design |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A restaurant POS handles the lifecycle of an order from the moment a server takes it to the moment the customer pays. Odoo's POS module demonstrates a proven architecture: offline-capable frontend, session-based terminal management, and modular payment processing.

### Order Lifecycle

Every order moves through states: **Draft** (being entered), **Sent** (transmitted to kitchen), **Preparing** (kitchen acknowledged), **Ready** (food is up), **Served**, and **Paid**. Each state transition triggers an action — sending to kitchen display, notifying the server, or updating the bill.

### Table Management

Model the restaurant floor as a grid of tables with statuses: Available, Occupied, Reserved, Needs Cleaning. The POS frontend renders a floor plan where servers tap a table to open or continue its order. Odoo's `pos_restaurant` module separates table logic from checkout flow, keeping the core POS reusable for counter-service restaurants too.

### Kitchen Display System (KDS)

When an order is sent, route items to the correct preparation station. A burger goes to the grill screen, a salad to the cold station. The KDS shows items in FIFO order with elapsed time. Color-code by urgency: green (on time), yellow (approaching target), red (late). Kitchen staff tap to mark items complete.

### Split Bills and Payment

Support splitting by item ("I had the pasta"), by seat, by equal division, or by custom amount. The payment layer should accept multiple methods on a single bill — part cash, part card. Odoo achieves this with a plugin architecture for payment providers (Stripe, Adyen, cash drawer).

### Offline Capability

Restaurant internet goes down during dinner rush — the POS must keep working. Cache the product catalog and pricing locally. Queue orders in IndexedDB or local storage and sync to the server when connectivity returns. Odoo's POS operates fully offline and reconciles sessions on reconnect.

### Session Management

Each terminal opens a **session** at shift start with a starting cash amount. All transactions belong to that session. At shift end, the session closes with a cash count, producing a reconciliation report. This prevents cross-shift accounting confusion.

## Key Takeaways

- Offline-first architecture is non-negotiable for restaurant POS
- Separate table management from core POS for flexibility across service styles
- Route kitchen orders to stations, not just one screen
- Session-based terminal management simplifies shift accounting
- Support multiple payment methods on a single bill
