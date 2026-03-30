---
id: SKL-0069
name: Search Implementation
category: skills
tags: [search, full-text-search, postgresql, meilisearch, algolia, typeahead, facets, gin-index, trigram]
capabilities: [postgres-fts-setup, search-as-you-type, faceted-search, search-service-integration]
useWhen:
  - adding search functionality to an application
  - choosing between database search and a dedicated search engine
  - implementing search-as-you-type or autocomplete
  - building filtered or faceted search for a catalog or directory
estimatedTokens: 650
relatedFragments: [SKL-0006, PAT-0004, PAT-0002]
dependencies: []
synonyms: ["how do I add search to my app", "my search results are terrible and slow", "when should I use algolia vs just postgres", "how to build autocomplete search", "I need to let users filter and search products"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Search Implementation

Build fast, relevant search that helps users find what they need. Start with your database and graduate to a dedicated engine only when you outgrow it.

## Strategy Decision Tree

| Situation | Approach |
|-----------|----------|
| <100K records, simple text search | PostgreSQL full-text search |
| Need typo tolerance, instant results | Meilisearch (self-hosted) or Algolia (managed) |
| Complex filtering + text search | Meilisearch or Elasticsearch |
| Autocomplete on a small dataset | Client-side filtering or PostgreSQL trigram |

**Recommendation:** Start with PostgreSQL full-text search. Move to Meilisearch when you need typo tolerance or sub-50ms search-as-you-type.

## PostgreSQL Full-Text Search

```sql
-- Add tsvector column with weighted fields
ALTER TABLE products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) STORED;

-- Create GIN index
CREATE INDEX idx_products_search ON products USING GIN (search_vector);

-- Query with ranking
SELECT id, name, ts_rank(search_vector, query) AS rank
FROM products, plainto_tsquery('english', $1) query
WHERE search_vector @@ query
ORDER BY rank DESC LIMIT 20;
```

**Weight strategy:** Titles/names get weight 'A' (highest), descriptions 'B', tags/metadata 'C'.

## Search-as-You-Type with Trigram

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

SELECT name, similarity(name, $1) AS sim
FROM products WHERE name % $1
ORDER BY sim DESC LIMIT 10;
```

Combine with debouncing on the client (300ms delay).

## Meilisearch for Advanced Search

```typescript
import { MeiliSearch } from 'meilisearch';
const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: process.env.MEILI_KEY });

await client.index('products').updateSettings({
  searchableAttributes: ['name', 'description', 'tags'],
  filterableAttributes: ['category', 'price', 'inStock'],
  sortableAttributes: ['price', 'createdAt'],
});

const results = await client.index('products').search('wireless keyboard', {
  filter: ['category = electronics', 'price < 100'],
  sort: ['price:asc'],
  limit: 20,
});
```

## Keep Search Index in Sync

| Strategy | How | Best For |
|----------|-----|----------|
| Sync on write | Update index in same transaction/handler | Low volume, strong consistency |
| Background job | Queue index update after write | High volume, eventual consistency OK |
| Change Data Capture | Stream DB changes to search | Large scale, decoupled systems |

For most apps, queue a background job after each write.

## Search UX Patterns

- Show results as the user types (debounce 200-300ms)
- Highlight matched terms in results
- Show "No results" with suggestions ("Did you mean..." or "Try broader terms")
- Display result count and active filters
- Allow clearing all filters with one click

## Key Constraints

- Never run unindexed text search queries in production
- Always debounce search-as-you-type to avoid flooding the server
- Keep search indexes in sync with the source of truth (database)
- Test search with real user queries, not just perfect keywords
- Set reasonable result limits (20-50 per page) to prevent memory issues
