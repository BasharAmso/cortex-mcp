---
id: PAT-0061
name: Shopping Cart State Management
category: patterns
tags: [cart, ecommerce, state-management, sessions, promotions, cart-abandonment, guest-checkout]
capabilities: [cart-operations, cart-persistence, promotion-application, guest-cart-handling]
useWhen:
  - implementing add-to-cart, update quantity, or remove from cart
  - persisting cart state across sessions or devices
  - supporting guest checkout alongside authenticated carts
  - applying discount codes or promotional pricing
  - handling cart abandonment recovery
estimatedTokens: 600
relatedFragments: [SKL-0141, PAT-0062, PAT-0063]
dependencies: []
synonyms: ["how to build a shopping cart", "cart state management for ecommerce", "guest vs logged in cart", "how to handle discount codes", "cart abandonment recovery", "add to cart functionality"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Shopping Cart State Management

Reliable cart state is the backbone of any commerce experience. A cart must handle additions, removals, quantity changes, promotions, and persistence across sessions without losing items or corrupting totals.

## Cart Data Model

```
Cart
├── id (uuid)
├── customer_id (nullable — guest carts have no customer)
├── region / currency
├── items[]
│   ├── variant_id
│   ├── quantity
│   ├── unit_price (snapshot at add-time)
│   └── adjustments[] (discounts applied to this line)
├── discounts[] (cart-level promotions)
├── shipping_methods[]
├── payment_sessions[]
└── metadata (arbitrary key-value)
```

## Core Operations

| Operation | Logic |
|-----------|-------|
| **Add item** | Find existing line by variant_id. If found, increment quantity. Otherwise create new line. Snapshot unit price at add-time. |
| **Update quantity** | Set new quantity. If zero, remove the line. Recalculate totals. |
| **Remove item** | Delete line by line_id. Recalculate totals. |
| **Apply discount** | Validate code, check eligibility (min spend, date range, usage limit). Attach to cart. Recalculate. |
| **Recalculate** | Sum line totals, apply cart-level discounts, add shipping, compute tax. Always server-authoritative. |

Golden rule: **the server is the source of truth for prices and totals.** The frontend displays what the API returns. Never compute final prices client-side.

## Guest vs Authenticated Carts

| Scenario | Strategy |
|----------|----------|
| **Guest browsing** | Create cart with session token (stored in cookie). No customer_id. |
| **Guest → login** | Merge guest cart into customer cart. Prefer customer cart on conflicts. |
| **Authenticated** | Cart is linked to customer_id. Persists across devices. |
| **Logout** | Keep cart accessible if session token is still valid. |

Merge logic matters: if the customer already has items in a saved cart and the guest cart also has items, combine both. If the same variant appears in both, keep the higher quantity.

## Cart Persistence

- **Server-side carts** (recommended): Cart lives in the database. Frontend holds only a cart ID. Survives browser clears, works across devices.
- **Client-side carts** (simple apps): LocalStorage or cookie. Fast, no backend needed. Loses data on clear. No cross-device sync.
- **Hybrid**: Client-side for speed, sync to server on key actions (add, checkout).

## Promotions & Discounts

| Type | Example | Application |
|------|---------|-------------|
| **Percentage** | 20% off | Applied to eligible line totals |
| **Fixed amount** | $10 off | Subtracted from cart total |
| **Free shipping** | Free standard shipping | Zeroes shipping cost |
| **Buy X get Y** | Buy 2 get 1 free | Adds free line or adjusts price |

Always validate server-side: check expiration, usage limits, minimum order value, and eligible products before applying.

## Cart Abandonment

- Track carts not converted within a threshold (e.g., 24 hours).
- Send recovery emails with a link that restores the exact cart.
- Include the cart items and a time-limited discount as incentive.
- Respect opt-out preferences for marketing communications.

## Anti-Patterns

- Computing totals on the frontend (price manipulation risk)
- Losing guest carts on login (frustrates users)
- Allowing expired or invalid discounts to persist in the cart
- No server-side validation of quantities against stock levels
- Storing cart only in localStorage for a multi-device audience
