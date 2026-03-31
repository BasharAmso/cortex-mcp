---
id: PAT-0134
name: Cart State Management
category: patterns
tags: [ecommerce, cart, state-management, session-handling, persistence, merge-strategy]
capabilities: [cart-persistence, session-cart-binding, cart-merge, cart-expiration]
useWhen:
  - deciding how to persist cart state across sessions and devices
  - implementing cart merge when a guest user logs in
  - setting cart expiration and cleanup policies
  - choosing between server-side and client-side cart storage
  - handling concurrent cart modifications from multiple tabs
estimatedTokens: 650
relatedFragments: [PAT-0061, SKL-0258, SKL-0141, PAT-0062]
dependencies: []
synonyms: ["how to persist shopping cart across sessions", "cart merge strategy on login", "server side vs client side cart", "cart expiration policy", "how to handle abandoned carts in database", "cart session management pattern"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Cart State Management

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0134 |
| **Name** | Cart State Management |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Cart state management determines how cart data is stored, retrieved, merged, and expired. The wrong approach leads to lost items, duplicate carts, and frustrated customers. The right approach makes the cart feel seamless across sessions, devices, and authentication states.

### Storage Strategies

| Strategy | Mechanism | Pros | Cons |
|----------|-----------|------|------|
| **Server-side** | Cart in database, ID in cookie | Cross-device, survives browser clear, server-authoritative pricing | Requires API call for every update |
| **Client-side** | Cart in localStorage or cookie | No backend needed, instant updates | Lost on clear, no cross-device, price manipulation risk |
| **Hybrid** | Client for UI speed, sync to server on key actions | Fast perceived updates, server-authoritative totals | Sync conflict handling needed |

**Recommended:** server-side carts for any store processing payments. The cart ID is stored in an HTTP-only cookie or returned via API after authentication. All pricing, tax, and discount calculations happen server-side.

### Session Binding

```
Anonymous visitor → Cookie with cart_id (HTTP-only, SameSite=Lax)
Authenticated user → cart.customer_id = user.id
```

| Scenario | Cart Identification |
|----------|-------------------|
| **First visit** | Create cart, set cart_id cookie |
| **Return visit (anonymous)** | Read cart_id from cookie, load cart |
| **Authenticated** | Load cart by customer_id |
| **Cookie expired** | Create new cart (old cart becomes orphaned) |

Set the cart cookie with a long expiry (30-90 days). This preserves the cart even if the customer does not return for weeks.

### Merge Strategy on Login

When a guest user logs in and both the guest cart and the customer's saved cart contain items:

```
Guest Cart: [Variant A x2, Variant B x1]
Saved Cart: [Variant A x1, Variant C x3]
                    ↓ Merge
Result:     [Variant A x2, Variant B x1, Variant C x3]
```

**Merge rules:**
1. If the same variant exists in both carts, keep the **higher quantity** (guest likely has more recent intent)
2. Items unique to either cart are added to the merged result
3. The merged cart uses the **saved cart's** ID (preserves customer history)
4. The guest cart is soft-deleted after merge
5. Recalculate totals, revalidate promotions, and recheck stock after merge

### Cart Expiration and Cleanup

| Policy | Value | Rationale |
|--------|-------|-----------|
| **Active cart TTL** | 30-90 days | Customers may return weeks later |
| **Abandoned cart flag** | 24-72 hours after last update | Trigger abandonment recovery emails |
| **Hard delete** | 6-12 months of inactivity | Database cleanup; products may be discontinued |
| **Cleanup job** | Daily batch | Soft-delete expired carts, archive for analytics |

Never hard-delete carts immediately. Soft-delete first (set a `deleted_at` timestamp). This preserves data for abandonment analytics and recovery campaigns.

### Concurrent Modification

When a customer has the store open in multiple tabs:

- **Optimistic UI:** Show changes immediately, sync to server, reconcile on next load
- **Last-write-wins:** Simplest approach; the most recent API call determines state
- **Version check:** Include a cart version/timestamp in each update; reject stale writes

For most stores, last-write-wins is sufficient. The cart is eventually consistent within seconds, and conflicts are rare because customers rarely modify the same item in two tabs simultaneously.

### Cart Validation on Checkout

Before entering checkout, revalidate the entire cart:

- Confirm all variants still exist and are published
- Check stock levels against requested quantities
- Recalculate prices (prices may have changed since items were added)
- Revalidate promotion eligibility
- Remove or flag items that fail validation

This prevents checkout failures from stale cart data.

## Key Takeaways

- Use server-side carts with an HTTP-only cookie for the cart ID; never trust client-side pricing
- Merge guest and saved carts on login using higher-quantity-wins for shared variants
- Set cart cookie expiry to 30-90 days to preserve carts for returning customers
- Soft-delete expired carts rather than hard-deleting to preserve abandonment analytics
- Revalidate the entire cart (stock, prices, promotions) before entering checkout
