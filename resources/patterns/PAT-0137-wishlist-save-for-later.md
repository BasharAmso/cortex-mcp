---
id: PAT-0137
name: Wishlist & Save for Later
category: patterns
tags: [wishlist, save-for-later, price-alerts, sharing, ecommerce, customer-engagement]
capabilities: [wishlist-data-modeling, price-drop-alerts, wishlist-sharing, save-for-later-ux]
useWhen:
  - adding wishlist functionality to an online store
  - building a save-for-later feature for shopping carts
  - implementing price drop alerts for wishlisted products
  - enabling wishlist sharing for gift registries or social commerce
  - deciding between guest wishlists and authenticated wishlists
estimatedTokens: 650
relatedFragments: [SKL-0268, SKL-0267, PAT-0139]
dependencies: []
synonyms: ["how to build a wishlist feature", "save for later in shopping cart", "price drop alert system", "wishlist sharing for ecommerce", "guest wishlist vs account wishlist", "gift registry pattern"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Wishlist & Save for Later

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0137 |
| **Name** | Wishlist & Save for Later |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

In Medusa's modular architecture, wishlists are not a built-in module but follow the same entity pattern as other commerce objects: a customer-linked collection with product variant references and metadata. The pattern is straightforward, but the implementation details (guest vs. authenticated, merge behavior, notifications) determine whether it drives conversions or sits unused.

### Data Model

```
Wishlist
├── id (uuid)
├── customer_id (nullable — supports guest wishlists via session/cookie)
├── name (default: "My Wishlist", supports multiple lists)
├── is_public (boolean — enables sharing)
├── share_token (unique string for public URL)
├── created_at
└── updated_at

WishlistItem
├── id (uuid)
├── wishlist_id (FK)
├── product_variant_id (FK)
├── added_price (price at time of addition — for price drop detection)
├── note (optional customer note)
├── priority (optional — for gift registries)
├── created_at
└── updated_at
```

### Two Distinct Features

**Wishlist** and **Save for Later** serve different purposes and should be separate:

| Feature | Location | Purpose | Persistence |
|---------|----------|---------|-------------|
| **Wishlist** | Product pages, account | Long-term interest list | Permanent, survives cart changes |
| **Save for Later** | Cart page | Remove from cart without losing | Tied to cart session, promotes back to cart |

"Save for Later" moves an item from the cart to a temporary holding area. The item stays visible below the cart with a "Move to Cart" button. This reduces cart abandonment by giving customers a guilt-free way to reduce their order without losing items.

### Guest vs. Authenticated Wishlists

- **Guest** — Store wishlist in a browser cookie or localStorage. Limited to the device.
- **Authenticated** — Store server-side linked to customer_id. Accessible from any device.
- **Merge on login** — When a guest with a cookie wishlist logs in, merge items into their server-side wishlist. Deduplicate by product_variant_id, keeping the earliest `added_price` for price drop tracking.

### Price Drop Alerts

The `added_price` field enables price drop notifications:

1. When a product's price changes, query all wishlist items referencing that variant
2. Compare `current_price` to `added_price`
3. If `current_price < added_price`, trigger a notification (email or push)
4. Include the percentage savings and a direct add-to-cart link
5. Update `added_price` to the new price to avoid repeat alerts on the same drop

Schedule a daily job rather than real-time to batch notifications and avoid spamming on frequent price fluctuations.

### Wishlist Sharing

Public wishlists enable gift registries and social commerce:

- Generate a unique `share_token` when `is_public` is set to true
- Public URL format: `/wishlist/shared/{share_token}`
- Shared view shows items with "Add to Cart" buttons for the viewer (not the wishlist owner)
- For gift registries: add a `purchased` flag on WishlistItem so others can mark items as bought without revealing the surprise

### Conversion Optimization

Wishlists are a conversion tool, not just a feature:

- **Email trigger** — "Items in your wishlist are selling fast" (low stock alert)
- **Retargeting** — Use wishlisted product IDs for ad retargeting audiences
- **Analytics** — Track wishlist-to-purchase conversion rate as a product demand signal
- **Back in stock** — If a wishlisted variant was out of stock, notify when replenished

## Key Takeaways

- Separate wishlist (long-term interest) from save-for-later (cart holding area)
- Store `added_price` on wishlist items to enable price drop alerts
- Merge guest wishlists into authenticated accounts on login
- Use wishlist data as a demand signal for merchandising and retargeting
- Enable sharing with a public token for gift registries and social commerce
