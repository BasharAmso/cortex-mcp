---
id: SKL-0184
name: Online Ordering System
category: skills
tags: [ecommerce, online-ordering, cart, checkout, menu-display, delivery-tracking]
capabilities: [product-catalog-setup, cart-checkout-flow, order-management, delivery-integration]
useWhen:
  - building an online ordering system for a restaurant or retail store
  - adding a product catalog with cart and checkout to a website
  - setting up delivery tracking for customer orders
  - managing order fulfillment across multiple channels
  - creating a menu or product display with pricing and variants
estimatedTokens: 650
relatedFragments: [SKL-0185, SKL-0190, PAT-0099]
dependencies: []
synonyms: ["how do I set up online ordering for my restaurant", "I need a shopping cart for my website", "how to add checkout to my store", "building an order management system", "how do I track deliveries for customers", "food delivery app backend", "restaurant online ordering"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Online Ordering System

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0184 |
| **Name** | Online Ordering System |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Online ordering for small businesses breaks into four composable modules: catalog, cart, checkout, and fulfillment. Medusa's open-source commerce platform demonstrates this modular approach, letting you adopt only the pieces you need rather than buying a monolithic system.

### Product Catalog

Structure your catalog around three entities: **products** (a sandwich, a t-shirt), **variants** (size, color, toppings), and **prices** (per-variant, per-currency). For restaurants, variants map to portion sizes or customizations. For retail, they map to SKU-level differences. Store images, descriptions, and metadata alongside each product. Use categories and collections to organize items into browsable groups (lunch menu, seasonal items).

### Cart and Checkout

A cart is a temporary order draft. Each line item references a variant and quantity. The checkout flow collects: (1) customer contact info, (2) delivery or pickup address, (3) shipping/delivery method selection, and (4) payment. Keep these as discrete steps so you can customize per business type. Restaurant checkout might skip shipping and offer "pickup in 15 minutes" vs "delivery." Retail checkout calculates shipping rates from carrier APIs.

### Order Management

Once payment succeeds, the cart converts to an order. Orders move through states: **confirmed**, **processing**, **shipped/out-for-delivery**, **delivered**, and **completed**. For restaurants, "processing" means the kitchen is preparing the order. Expose order status to customers via a tracking page or SMS/email updates. Support partial fulfillment when items ship separately.

### Fulfillment and Delivery

Abstract delivery behind a fulfillment provider interface. This lets you swap between in-house delivery drivers, third-party services (DoorDash Drive, Uber Direct), or customer pickup without changing your order logic. Track delivery status through webhooks from the provider. For retail, integrate with shipping carriers (USPS, UPS, FedEx) for label generation and tracking numbers.

### Architecture Tip

Medusa uses a headless approach: the backend exposes APIs, and you build any frontend (web, mobile, kiosk). This means your online ordering system and your in-store POS can share the same product catalog and order pipeline. TypeScript backend with REST or GraphQL APIs keeps integration straightforward.

## Key Takeaways

- Structure your catalog as products with variants and per-variant pricing
- Keep checkout steps modular so restaurant and retail flows can diverge
- Use order state machines (confirmed, processing, shipped, delivered) for clear status tracking
- Abstract delivery behind a provider interface to swap between in-house, third-party, or pickup
- A headless backend lets you serve web, mobile, and POS from one system
