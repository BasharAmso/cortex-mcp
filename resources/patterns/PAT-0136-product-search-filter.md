---
id: PAT-0136
name: Product Search & Filter
category: patterns
tags: [ecommerce, search, faceted-search, filtering, relevance, meilisearch]
capabilities: [faceted-search, typo-tolerance, relevance-tuning, filter-UX-design]
useWhen:
  - adding product search to an online store
  - implementing faceted navigation with filters
  - tuning search relevance for ecommerce queries
  - choosing and configuring a search engine for product catalogs
  - building filter UI with counts and instant results
estimatedTokens: 650
relatedFragments: [SKL-0257, SKL-0141, PAT-0061, SKL-0262]
dependencies: []
synonyms: ["how to add product search to my store", "faceted search for ecommerce", "search engine setup for products", "how to tune search relevance", "product filter UX pattern", "typo tolerant search implementation"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/meilisearch/meilisearch"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Product Search & Filter

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0136 |
| **Name** | Product Search & Filter |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Product search is the primary way customers find what they want. A database `LIKE` query is not search. Real ecommerce search needs typo tolerance, faceted filtering, relevance ranking, and sub-50ms response times. Offload this to a dedicated search engine.

### Search Architecture

```
Product Database (Postgres)
     ↓ sync (on create/update/delete)
Search Index (MeiliSearch / Algolia / Elasticsearch)
     ↑ query
Storefront Search UI
```

The database is the source of truth. The search index is a denormalized read replica optimized for fast retrieval. Sync products to the index on every create, update, or delete via webhooks, event subscribers, or a periodic batch job.

### What to Index

| Field | Searchable | Filterable | Sortable |
|-------|-----------|-----------|----------|
| Title | Yes | No | No |
| Description | Yes | No | No |
| Category | Yes | Yes | No |
| Brand | Yes | Yes | No |
| Tags | Yes | Yes | No |
| Price (lowest variant) | No | Yes (range) | Yes |
| Rating (average) | No | Yes (range) | Yes |
| In stock | No | Yes (boolean) | No |
| Created date | No | No | Yes |
| Variant colors | No | Yes | No |
| Variant sizes | No | Yes | No |

Denormalize variant data to the product level in the index. Include the lowest price, all available sizes, all available colors, and stock status so filters work without querying variants.

### Faceted Search

Faceted search shows filter options with counts based on current results:

```
Category: T-Shirts (42) | Hoodies (18) | Pants (31)
Size: S (22) | M (35) | L (28) | XL (15)
Color: Red (12) | Blue (19) | Black (31)
Price: $0-25 (24) | $25-50 (38) | $50+ (14)
Rating: 4+ stars (52) | 3+ stars (71)
```

**Disjunctive facets:** Within a facet group (e.g., Color), selections are OR-ed. Selecting "Red" and "Blue" shows products that are red OR blue. Between facet groups (e.g., Color + Size), selections are AND-ed. This is the expected behavior for ecommerce filtering.

### Typo Tolerance

MeiliSearch handles typos automatically using edit distance:

| Query | Matches | Tolerance |
|-------|---------|-----------|
| "tshirt" | "t-shirt" | Concatenation |
| "sneakrs" | "sneakers" | 1 edit distance |
| "hoddie" | "hoodie" | 1 edit distance |
| "blck jacket" | "black jacket" | 1 edit per word |

Configure typo tolerance per field. Disable it for SKU and exact-match fields where a typo should return no results, not wrong results.

### Relevance Ranking

MeiliSearch uses an ordered set of ranking rules evaluated sequentially:

1. **Words** — documents containing all query words rank higher
2. **Typo** — fewer typos rank higher
3. **Proximity** — query words closer together rank higher
4. **Attribute** — matches in title rank higher than matches in description
5. **Sort** — user-selected sort (price, rating, date)
6. **Exactness** — exact word matches rank higher than prefix matches

For ecommerce, insert a custom ranking rule for popularity or sales count between Attribute and Sort. This ensures best-sellers surface first when relevance is otherwise equal.

### Filter UX Patterns

| Pattern | Description |
|---------|-------------|
| **Instant results** | Update results as filters are toggled, no "Apply" button needed |
| **Active filter chips** | Show selected filters as removable chips above results |
| **Zero-result prevention** | Disable or gray out filter values that would produce zero results |
| **Price range slider** | Dual-handle slider with min/max inputs |
| **Search within filters** | For facets with many values (e.g., Brand), add a search box inside the filter panel |
| **Mobile drawer** | Collapse filters into a full-screen drawer on mobile |

### Performance

- MeiliSearch returns results in under 50ms, enabling search-as-you-type
- Index size for 100K products is typically under 500MB
- Use pagination or infinite scroll; never load all results at once
- Debounce search input (150-300ms) to avoid excessive API calls during typing

## Key Takeaways

- Offload product search to a dedicated engine (MeiliSearch, Algolia, Elasticsearch); database queries are not sufficient
- Denormalize variant data (lowest price, sizes, colors, stock) to the product level in the search index
- Use disjunctive facets (OR within a group, AND between groups) for intuitive filter behavior
- Insert a popularity or sales-count ranking rule so best-sellers surface first at equal relevance
- Debounce search input and update results instantly on filter changes for responsive UX
