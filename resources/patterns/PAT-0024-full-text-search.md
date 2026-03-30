---
id: PAT-0024
name: Full-Text Search with PostgreSQL
category: patterns
tags: [full-text-search, postgresql, tsvector, tsquery, search, ranking, GIN-index, trigram, elasticsearch]
capabilities: [search-implementation, search-ranking, search-suggestions, search-scaling-decisions]
useWhen:
  - adding search functionality to an application
  - existing LIKE/ILIKE queries are too slow or imprecise
  - deciding whether PostgreSQL search is enough or you need Elasticsearch
  - implementing autocomplete or search suggestions
  - setting up weighted search across multiple fields
estimatedTokens: 700
relatedFragments: [PAT-0004, PAT-0022, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["how to add search to my app", "postgres full text search setup", "tsvector and tsquery explained", "should I use elasticsearch or postgres search", "how to make search results relevant"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/dhamaniasad/awesome-postgres"
---

# Full-Text Search with PostgreSQL

Built-in search that handles most use cases without adding another service. The PostgreSQL ecosystem includes extensions like pg_trgm for fuzzy matching and pg_search for Rails integration.

## Core Concepts

- **tsvector**: A processed document. Strips stop words, applies stemming. `'The quick brown foxes'::tsvector` becomes `'brown' 'fox' 'quick'`.
- **tsquery**: A search query with operators. `'quick & fox'::tsquery` matches documents containing both words.
- **GIN index**: The index type that makes full-text search fast.

## Setup Steps

1. **Add a search vector column** to your table for storing the processed document
2. **Populate with weighted fields** (title matters more than body)
3. **Create a GIN index** on the search vector column
4. **Add a trigger** to keep the vector updated on INSERT and UPDATE

```sql
ALTER TABLE articles ADD COLUMN search_vector tsvector;

UPDATE articles SET search_vector =
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(body, '')), 'B');

CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);

CREATE TRIGGER trg_articles_search
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', title, body);
```

## Querying and Ranking

```sql
SELECT title, ts_rank(search_vector, query) AS rank
FROM articles, plainto_tsquery('english', 'database optimization') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;
```

## Search Query Types

| Function | Use For | Example |
|----------|---------|---------|
| `plainto_tsquery` | Simple user input | `'database optimization'` |
| `phraseto_tsquery` | Exact phrase matching | `'connection pool'` |
| `websearch_to_tsquery` | Google-like syntax | `'"exact phrase" -exclude OR alternative` |

## Prefix Matching (Autocomplete)

```sql
SELECT DISTINCT title FROM articles
WHERE search_vector @@ to_tsquery('english', 'data:*')
LIMIT 5;
```

## When to Upgrade Beyond PostgreSQL

| PostgreSQL Search Is Enough | Consider Elasticsearch/Typesense |
|----------------------------|----------------------------------|
| < 10M searchable documents | 100M+ documents, sub-50ms required |
| Simple keyword search | Fuzzy matching, typo tolerance critical |
| Single language | Multi-language with language detection |
| One or two searchable models | Complex faceted search with aggregations |
| No dedicated search team | Dedicated search team and budget |

**Rule of thumb:** Start with PostgreSQL. It handles 90% of search needs. Migrate to dedicated search only when you measure a specific limitation.

## Anti-Patterns

- Using `LIKE '%term%'` for search (no index, no stemming, no ranking)
- Rebuilding the tsvector on every query instead of storing it
- Forgetting to create the GIN index (full-text search without it is a sequential scan)
- Not weighting fields (title matches should rank higher than body matches)
