---
id: SKL-0265
name: Headless Commerce
category: skills
tags: [headless-commerce, api-first, composable-commerce, frontend-flexibility, medusa, ecommerce]
capabilities: [api-first-store-design, composable-stack-selection, frontend-decoupling, commerce-module-integration]
useWhen:
  - choosing between headless and monolithic ecommerce platforms
  - building a custom storefront with a commerce API backend
  - designing a composable commerce stack with best-of-breed services
  - migrating from a monolithic platform to headless architecture
  - integrating commerce into a non-traditional frontend (mobile app, chatbot, kiosk)
estimatedTokens: 650
relatedFragments: [SKL-0263, SKL-0264, SKL-0266]
dependencies: []
synonyms: ["what is headless commerce", "how to build an API-first store", "composable commerce architecture", "headless vs monolithic ecommerce", "how to decouple frontend from ecommerce backend", "best headless commerce stack"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Headless Commerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0265 |
| **Name** | Headless Commerce |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Medusa is built as a headless commerce platform where all commerce modules are available as npm packages, resolved from a dependency container via `container.resolve(Modules.PRODUCT)`. This architecture separates the commerce engine (products, carts, orders, payments, inventory) from the presentation layer entirely. The frontend communicates exclusively through REST or GraphQL APIs, meaning any frontend framework, mobile app, or custom interface can power the storefront.

### Headless vs. Monolithic

| Aspect | Monolithic (Shopify, WooCommerce) | Headless (Medusa, commercetools) |
|--------|----------------------------------|----------------------------------|
| **Frontend** | Locked to platform templates/themes | Any framework (Next.js, Remix, mobile) |
| **Deployment** | Single unit | Independent frontend/backend deploys |
| **Customization** | Plugin/theme system constraints | Full code-level control |
| **Speed to market** | Faster for standard stores | Faster for custom experiences |
| **Maintenance** | Platform handles updates | You own the full stack |
| **Best for** | Standard retail, small catalogs | Custom experiences, multi-channel, B2B |

### Composable Commerce Stack

Headless enables a "composable" approach where you pick best-of-breed services for each capability:

| Capability | Options |
|-----------|---------|
| **Commerce engine** | Medusa, commercetools, Saleor |
| **Frontend** | Next.js, Remix, Astro, React Native |
| **Search** | Algolia, Meilisearch, Typesense |
| **Payments** | Stripe, Adyen, PayPal |
| **CMS** | Sanity, Contentful, Strapi |
| **Auth** | Clerk, Auth0, Supabase Auth |
| **Email** | SendGrid, Resend, Postmark |

The trade-off: flexibility increases integration complexity. Each service boundary is an API call, a potential failure point, and a contract to maintain.

### API Design Patterns for Commerce

Medusa's API follows patterns worth replicating in any headless setup:

1. **Resource-based REST** — `/store/products`, `/store/carts/:id`, `/store/orders` with clear separation between storefront APIs (`/store/*`) and admin APIs (`/admin/*`)
2. **Workflow-based mutations** — Complex operations (checkout, returns) use workflows composed of steps with automatic rollback on failure, not single endpoint calls
3. **Module resolution** — Each commerce domain (product, cart, inventory, payment) is an independent module with its own service interface, enabling replacement without affecting others
4. **Event-driven side effects** — Order creation emits events that subscribers handle (send confirmation email, update inventory, notify fulfillment). Core operations stay clean.

### When NOT to Go Headless

Headless adds complexity. Choose monolithic when:

- Standard retail store with no custom checkout or post-purchase flows
- Small team without dedicated frontend developers
- Time-to-market is the primary constraint (< 2 weeks to launch)
- Budget is under $5K for the initial build
- No multi-channel requirements (single web storefront only)

### Migration Strategy

Moving from monolithic to headless incrementally:

1. **API proxy** — Put an API layer in front of your existing platform, forward requests
2. **Strangler fig** — Replace one capability at a time (search first, then checkout, then catalog)
3. **Parallel run** — Run both systems simultaneously, route traffic gradually
4. **Data migration last** — Move product data only after the new system is proven

## Key Takeaways

- Headless separates the commerce engine from the frontend, enabling any presentation layer
- Use composable architecture to pick best-of-breed services, but accept the integration cost
- Separate storefront APIs from admin APIs with different authentication and rate limiting
- Use workflow-based mutations with rollback for complex operations like checkout
- Don't go headless unless you have custom experience needs and frontend development capacity
