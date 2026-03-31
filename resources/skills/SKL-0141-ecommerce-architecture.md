---
id: SKL-0141
name: Headless Commerce Architecture
category: skills
tags: [ecommerce, headless-commerce, storefront, plugin-system, product-modeling, multi-channel, modular-commerce, API-first]
capabilities: [storefront-decoupling, product-variant-modeling, plugin-architecture, multi-channel-selling, commerce-module-design]
useWhen:
  - designing a headless commerce platform or storefront
  - modeling products with variants, options, and pricing
  - building a plugin or extension system for commerce
  - supporting multiple sales channels from one backend
  - choosing between monolithic and composable commerce
estimatedTokens: 700
relatedFragments: [PAT-0061, PAT-0062, PAT-0063, SKL-0010]
dependencies: []
synonyms: ["how to build an online store backend", "headless ecommerce setup", "how to model products and variants", "how to decouple my storefront from the backend", "building a plugin system for my shop", "multi-channel selling architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Headless Commerce Architecture

## Purpose

Design a commerce backend where the storefront is fully decoupled from business logic. The API is the only interface. Any frontend (web, mobile, POS, marketplace) connects through the same commerce API.

## Core Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Web Store   │  │  Mobile App  │  │   POS / B2B  │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └────────┬────────┴────────┬────────┘
                │   Commerce API  │
       ┌────────┴─────────────────┴────────┐
       │  Products │ Cart │ Orders │ Auth   │
       │  Payments │ Fulfillment │ Plugins │
       └───────────────────────────────────┘
```

## Product & Variant Modeling

| Concept | Description |
|---------|-------------|
| **Product** | Top-level item (e.g., "Classic T-Shirt") |
| **Variant** | Specific buyable combination (size M, color blue, $29) |
| **Option** | Axis of variation (size, color, material) |
| **Price list** | Region or customer-group specific pricing |
| **Collection** | Curated grouping for merchandising |

Design rule: a product is never purchased directly. Every cart line references a **variant**. This eliminates ambiguity at checkout time.

## Plugin & Extension System

Medusa's approach to extensibility uses modular commerce building blocks:

1. **Commerce modules** are self-contained (products, cart, orders, payments) and published independently via npm.
2. **Plugins** extend behavior without forking core: custom payment providers, fulfillment strategies, notification channels.
3. **Subscribers** listen for domain events (order.placed, payment.captured) and trigger side effects.
4. **API routes** can be added or overridden per-plugin, keeping the core stable.

## Multi-Channel Strategy

| Channel | Consideration |
|---------|--------------|
| **Web storefront** | SSR or static, calls commerce API |
| **Mobile app** | Same API, auth token flow |
| **Marketplace** | Inventory sync, multi-vendor catalog |
| **POS** | Low-latency, offline-capable cart |
| **B2B portal** | Price lists, bulk ordering, approval flows |

One product catalog, one inventory source, multiple channels. Channel-specific logic (pricing, visibility) lives in the API layer, not in the frontend.

## Key Decisions

- **API style:** REST with resource expansion or GraphQL. Medusa uses REST; Saleor uses GraphQL-only. Choose based on team familiarity and frontend needs.
- **Database:** Postgres is the standard for transactional commerce data.
- **Search:** Offload product search to a dedicated engine (MeiliSearch, Algolia, Elasticsearch).
- **Payments:** Always server-side via payment provider plugins. Never handle card data directly.

## Anti-Patterns

- Coupling storefront rendering to backend templates (kills multi-channel)
- Skipping the variant layer (causes checkout bugs with options)
- Hardcoding payment or fulfillment logic instead of using plugins
- Storing prices only in one currency (breaks multi-region)
- Building a monolith when the roadmap includes multiple channels
