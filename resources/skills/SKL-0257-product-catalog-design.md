---
id: SKL-0257
name: Product Catalog Design
category: skills
tags: [ecommerce, product-catalog, variants, categories, attributes, filtering]
capabilities: [product-modeling, variant-management, category-hierarchy, attribute-design]
useWhen:
  - designing a product data model for an online store
  - modeling products with variants like size and color
  - building category trees and collection groupings
  - adding custom attributes to products for filtering
  - structuring a catalog that supports search and faceted navigation
estimatedTokens: 650
relatedFragments: [SKL-0141, PAT-0136, PAT-0063]
dependencies: []
synonyms: ["how to model products with variants", "product catalog data model", "how to organize product categories", "ecommerce product schema design", "how to add product attributes", "product variant architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Product Catalog Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0257 |
| **Name** | Product Catalog Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A product catalog is the foundation of any commerce system. The data model must handle simple single-SKU items and complex multi-variant products without special cases leaking into checkout or inventory logic.

### Product-Variant-Option Model

```
Product ("Classic T-Shirt")
├── Options: [Size, Color]
├── Variant: Size=S, Color=Red  → SKU: TSH-S-RED, Price: $25
├── Variant: Size=M, Color=Red  → SKU: TSH-M-RED, Price: $25
├── Variant: Size=L, Color=Blue → SKU: TSH-L-BLU, Price: $29
└── Images[], Description, Metadata
```

**Design rule:** a product is never purchased directly. Every cart line references a variant. This eliminates ambiguity at checkout and ties inventory to a specific buyable unit.

### Options and Attributes

| Concept | Purpose | Example |
|---------|---------|---------|
| **Option** | Defines an axis of variation that creates variants | Size, Color |
| **Attribute** | Descriptive metadata that does not create variants | Material, Weight, Brand |
| **Tag** | Flat label for cross-cutting concerns | "new-arrival", "sale" |

Options generate the variant matrix. Attributes enrich product pages and power filters without exploding the variant count. Keep these separate in your schema.

### Organizing Products

| Structure | Use Case |
|-----------|----------|
| **Categories** | Hierarchical taxonomy (Clothing > Tops > T-Shirts). Tree structure with parent references. |
| **Collections** | Curated merchandising groups (Summer Sale, Staff Picks). A product can belong to multiple collections. |
| **Product Types** | Schema templates that define which attributes a product has (Apparel has size chart; Electronics has wattage). |

### Search and Filter Readiness

Design your catalog with search in mind from day one:

- **Filterable fields:** Mark attributes as filterable at creation time. Common filters: price range, category, brand, rating, availability.
- **Searchable text:** Title, description, tags, and category names feed the search index.
- **Sort dimensions:** Price, date added, popularity, rating. Store these as indexed numeric fields.
- **Denormalization for search:** Copy key variant data (lowest price, available sizes) to the product level so search results do not require variant joins.

### Price Sets

Each variant links to a price set containing one or more prices:

```
PriceSet for TSH-S-RED
├── { amount: 2500, currency: "usd" }
├── { amount: 2200, currency: "eur" }
└── { amount: 2500, currency: "usd", min_quantity: 10 }  // bulk tier
```

This supports multi-currency and tiered pricing without duplicating products.

## Key Takeaways

- Products are never purchased directly; every line item references a variant
- Separate options (create variants) from attributes (descriptive metadata) to avoid variant explosion
- Use categories for taxonomy, collections for merchandising, and tags for flat cross-cutting labels
- Design filterable and searchable fields into the schema from the start
- Link variants to price sets for multi-currency and tiered pricing support
