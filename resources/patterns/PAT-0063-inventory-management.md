---
id: PAT-0063
name: Inventory Management Patterns
category: patterns
tags: [inventory, stock-tracking, warehouse, variants, audit-trail, stock-movements, BOM, ecommerce]
capabilities: [stock-level-tracking, warehouse-management, stock-movement-logging, variant-inventory, audit-trail]
useWhen:
  - tracking stock levels across warehouses or locations
  - recording stock movements (receive, ship, transfer, adjust)
  - managing inventory for products with variants
  - building an audit trail for stock changes
  - implementing bill of materials or component tracking
estimatedTokens: 600
relatedFragments: [SKL-0141, PAT-0061, PAT-0062]
dependencies: []
synonyms: ["how to track inventory levels", "stock management for my store", "warehouse location tracking", "how to record stock movements", "inventory audit trail", "managing stock for product variants"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/inventree/InvenTree"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Inventory Management Patterns

Inventory management tracks what you have, where it is, and how it got there. Every stock change is a recorded movement with a reason, creating a complete audit trail.

## Core Data Model

```
Part / Product
├── variants[] (size, color, SKU)
│
StockItem
├── part_id / variant_id
├── location_id (warehouse, bin, shelf)
├── quantity
├── batch / serial number
├── status (available, reserved, damaged, returned)
│
StockMovement (immutable log)
├── stock_item_id
├── type (receive, ship, transfer, adjust, return)
├── quantity_delta (+10, -3)
├── from_location / to_location
├── reason / reference (PO-1234, ORDER-5678)
├── actor (who made the change)
└── timestamp
```

## Movement Types

| Type | Direction | Trigger |
|------|-----------|---------|
| **Receive** | +quantity | Purchase order arrival, manufacturing output |
| **Ship** | -quantity | Order fulfilled, sent to customer |
| **Transfer** | Move between locations | Warehouse rebalancing, bin reorganization |
| **Adjust** | +/- correction | Cycle count discrepancy, damage, spoilage |
| **Reserve** | Soft hold | Order placed but not yet shipped |
| **Return** | +quantity | Customer return, defective item received back |

## Stock Level Calculation

Never store a single "quantity" field and mutate it directly. Instead, derive current stock from the movement ledger:

```
Available Stock = Sum of all movements for (part, location)
                - Reserved quantity

// Or with a materialized balance:
current_quantity = last_snapshot + movements_since_snapshot
```

Use a **materialized balance** column for read performance, but reconcile it against the movement log periodically. The movement log is the source of truth.

## Warehouse & Location Hierarchy

```
Warehouse (e.g., "US East")
└── Zone (e.g., "Zone A - Small Items")
    └── Aisle (e.g., "Aisle 3")
        └── Shelf / Bin (e.g., "Shelf 3B, Bin 12")
```

Location granularity depends on operation scale. A small shop needs one location. A distribution center needs bin-level precision.

## Variant-Level Tracking

Inventory is always tracked at the **variant** level, not the product level. "Blue T-Shirt, Size M" is a different stock item than "Red T-Shirt, Size L" even though they share the same parent product.

Each variant has its own:
- SKU (stock keeping unit)
- Stock quantity per location
- Reorder point and safety stock threshold

## Bill of Materials (BOM)

For manufactured or assembled products, track components:

| Assembly | Component | Quantity per unit |
|----------|-----------|-------------------|
| Desktop PC | Motherboard | 1 |
| Desktop PC | RAM 16GB | 2 |
| Desktop PC | SSD 1TB | 1 |

When an assembly is built, decrement component stock and increment assembly stock. BOM tracking is essential for manufacturing and kit-based products.

## Audit Trail

Every stock change is immutable. The movement log answers:
- **What** changed (which part, which variant)
- **Where** (from/to location)
- **How much** (quantity delta)
- **Why** (linked to a PO, order, count, or manual reason)
- **Who** (user or system that triggered it)
- **When** (timestamp)

Never delete movement records. If a correction is needed, create a new adjustment movement.

## Anti-Patterns

- Directly updating a quantity column without recording why (no audit trail)
- Tracking stock at the product level instead of the variant level
- No concept of reserved stock (overselling risk)
- Allowing negative stock without explicit business rules
- Manual spreadsheet tracking alongside the system (divergence guaranteed)
