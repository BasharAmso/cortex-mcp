---
id: PAT-0139
name: Inventory Reservation Pattern
category: patterns
tags: [inventory, reservation, overselling, ttl, back-in-stock, ecommerce]
capabilities: [cart-reservation-implementation, overselling-prevention, ttl-based-expiry, back-in-stock-notifications]
useWhen:
  - preventing overselling during high-traffic sales events
  - implementing cart-level inventory reservation with TTL
  - building a back-in-stock notification system
  - designing inventory management for multi-location warehouses
  - handling flash sales or limited-edition product drops
estimatedTokens: 650
relatedFragments: [SKL-0263, SKL-0266, PAT-0137]
dependencies: []
synonyms: ["how to prevent overselling in ecommerce", "cart inventory reservation system", "TTL-based stock reservation", "back in stock alert system", "inventory hold during checkout", "flash sale inventory management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Inventory Reservation Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0139 |
| **Name** | Inventory Reservation Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Medusa's Inventory Module supports reservation of quantities at specific locations for orders. The module resolves from the container via `container.resolve(Modules.INVENTORY)` and provides methods for creating inventory items, managing inventory levels across locations, and creating reservation items. Workflows in Medusa guarantee data consistency with automatic rollback, which is critical for inventory operations where a failed checkout must release reserved stock.

### The Overselling Problem

Without reservation, two customers can simultaneously add the last item to their carts and both complete checkout. The race condition:

```
Customer A checks stock → 1 available → adds to cart
Customer B checks stock → 1 available → adds to cart
Customer A completes purchase → stock = 0
Customer B completes purchase → stock = -1 (OVERSOLD)
```

### Reservation Strategy

Reserve inventory when the item enters the cart (or at checkout start), not at purchase completion:

| Strategy | Reserve At | Release At | Trade-off |
|----------|-----------|------------|-----------|
| **Cart reservation** | Add to cart | Cart expires or item removed | Most protective, may lock stock from other buyers |
| **Checkout reservation** | Checkout initiated | Checkout abandoned or timeout | Balanced — stock visible until serious intent |
| **Payment reservation** | Payment authorized | Payment fails or refund | Least protective, risk of overselling at checkout |

For most stores, **checkout reservation** is the right default. Cart reservation is appropriate for limited-edition drops or flash sales where demand far exceeds supply.

### TTL (Time-to-Live) Expiry

Reservations must expire or abandoned carts permanently lock inventory:

```
ReservationItem
├── id (uuid)
├── inventory_item_id (FK)
├── location_id (FK — which warehouse)
├── quantity (reserved amount)
├── line_item_id (FK — links to cart/order line)
├── expires_at (timestamp — TTL)
├── status (active | confirmed | expired | released)
├── created_at
└── updated_at
```

**TTL recommendations:**
- Cart reservation: 15-30 minutes
- Checkout reservation: 10-15 minutes
- Payment processing: 5 minutes (extend if using 3D Secure)
- Flash sale / limited drop: 5-10 minutes (shorter to keep stock flowing)

**Expiry process:** A scheduled job runs every 1-2 minutes, finds reservations past `expires_at` with status `active`, sets status to `expired`, and returns the quantity to available stock. Use a database transaction to ensure atomicity.

### Multi-Location Inventory

Medusa supports inventory levels per location. When reserving:

1. **Determine fulfillment location** — Based on customer shipping address, find the nearest warehouse with stock
2. **Reserve at specific location** — Decrement available quantity at that location, not globally
3. **Fallback chain** — If primary location is out of stock, try secondary locations before showing "out of stock"

```
Available quantity = stocked_quantity - reserved_quantity
```

Each location maintains its own `stocked_quantity` and `reserved_quantity`. The product appears available to the customer if ANY location has available quantity.

### Concurrency Control

Prevent race conditions at the database level:

- **Optimistic locking** — Add a `version` column. `UPDATE inventory_levels SET reserved_quantity = reserved_quantity + 1, version = version + 1 WHERE id = ? AND version = ? AND (stocked_quantity - reserved_quantity) >= 1`. If zero rows affected, stock was taken.
- **Database-level constraint** — `CHECK (reserved_quantity <= stocked_quantity)` prevents negative availability.
- **Atomic decrement** — Use `reserved_quantity = reserved_quantity + 1` in the UPDATE (not read-then-write) to eliminate the read-check-write race.

### Back-in-Stock Notifications

When a product is unavailable, capture demand:

1. Show a "Notify me when available" button instead of a disabled "Add to Cart"
2. Store: `customer_email`, `product_variant_id`, `requested_at`
3. When stock is replenished (reservation expired or new stock received), query pending notifications for that variant
4. Send notification with a direct add-to-cart link
5. Include a TTL on the notification offer ("Stock is limited, added to your cart for 15 minutes")
6. Delete the notification request after sending to avoid duplicates

### Flash Sale Pattern

For high-demand events, tighten the reservation parameters:

- Reduce TTL to 5 minutes
- Reserve at add-to-cart (not checkout)
- Show real-time stock counters ("3 left!")
- Queue customers if demand exceeds stock (virtual waiting room)
- Disable guest checkout to prevent bot abuse

## Key Takeaways

- Reserve inventory at checkout start with a TTL to prevent overselling without permanently locking stock
- Use atomic database operations (UPDATE with WHERE clause) to eliminate race conditions
- Run a scheduled job every 1-2 minutes to expire stale reservations and return stock
- Support multi-location inventory with fallback chains based on customer proximity
- Capture back-in-stock notification requests to convert unmet demand when inventory is replenished
