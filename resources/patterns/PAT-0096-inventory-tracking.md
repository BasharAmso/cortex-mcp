---
id: PAT-0096
name: Inventory Tracking Pattern
category: patterns
tags: [inventory, stock-levels, reorder-points, audit-trails, barcode, small-business]
capabilities: [stock-management, reorder-automation, location-tracking, audit-logging]
useWhen:
  - tracking stock levels for a small business
  - implementing automatic reorder points and purchase suggestions
  - organizing inventory across multiple storage locations
  - maintaining audit trails for inventory movements
  - adding barcode scanning for faster inventory operations
estimatedTokens: 650
relatedFragments: [SKL-0179, PAT-0095, SKL-0178]
dependencies: []
synonyms: ["how do I track inventory for my small business", "how to set up automatic reorder alerts", "what is the best way to organize stock locations", "how do I keep an audit trail of inventory changes", "how to add barcode scanning to my inventory system", "how do I know when to reorder supplies"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/inventree/InvenTree"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Inventory Tracking

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0096 |
| **Name** | Inventory Tracking Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Inventory tracking answers two questions every business owner asks daily: "Do we have it?" and "Do we need to order more?" InvenTree's open-source inventory management system provides the reference architecture: hierarchical parts, location-aware stock, full audit trails, and reorder automation.

### Data Model

InvenTree's model centers on three entities:

- **Part**: What you track (name, description, category, unit of measure, image). Parts are organized in a hierarchical category tree (Beverages > Coffee > Espresso Beans).
- **Stock Item**: A specific quantity of a part at a specific location. One part can have multiple stock items across locations (20 bags in the storeroom, 3 bags at the front counter).
- **Stock Location**: Where items live. Hierarchical: Building > Room > Shelf > Bin. A coffee shop might use: Storage Room > Dry Goods Shelf, Storage Room > Refrigerator, Front Counter.

### Stock Movements and Audit Trail

Every change to stock is recorded as a **Stock Tracking Entry**: what changed, how much, who did it, when, and why. Movement types: **Receive** (new stock from supplier), **Consume/Use** (used in production or service), **Transfer** (moved between locations), **Adjust** (correction after physical count), **Return** (sent back to supplier). This ledger-style tracking means you can always answer "where did this stock go?"

InvenTree logs these automatically — no separate audit system needed. The trail is append-only; entries are never deleted or modified.

### Reorder Points

For each part, define a **minimum stock level** (reorder point) and a **reorder quantity** (how much to order). When current stock drops to or below the minimum, the system flags it for reorder. InvenTree surfaces these as a filtered view: "Parts below minimum stock."

The reorder point should account for **lead time** — if your coffee bean supplier takes 5 days to deliver and you use 2 bags per day, set the reorder point at 10+ bags, not 1.

### Physical Count Reconciliation

Periodically, count actual stock and compare to system records. Discrepancies become **adjustment** entries in the audit trail with a reason (shrinkage, damage, counting error). InvenTree supports this workflow: export current stock, perform physical count, import adjustments. Regular counts (weekly for high-value items, monthly for others) keep the system accurate.

### Barcode Integration

InvenTree supports barcode scanning for rapid operations: scan a part to view its stock, scan a location to see what's there, scan during receiving to log incoming stock. For small businesses, a smartphone camera with a barcode scanning app is sufficient — no dedicated hardware needed.

### Supplier Management

Link parts to suppliers with supplier-specific part numbers, pricing, and lead times. When reordering, the system knows which supplier to order from and at what price. Track multiple suppliers per part for backup options when the primary is out of stock.

## Key Takeaways

- Every stock change gets an audit trail entry — no exceptions
- Reorder points must account for supplier lead time, not just current usage
- Hierarchical locations (room > shelf > bin) make physical finding fast
- Regular physical counts keep system data honest
- Barcode scanning with a smartphone eliminates manual data entry errors
