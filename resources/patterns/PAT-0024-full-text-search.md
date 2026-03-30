---
id: PAT-0024
name: Full-Text Search with PostgreSQL
category: patterns
tags: [full-text-search, postgresql, tsvector, tsquery, search, ranking, GIN-index]
capabilities: [search-implementation, search-ranking, search-suggestions, search-scaling-decisions]
useWhen:
  - adding search functionality to an application
  - existing LIKE/ILIKE queries are too slow or imprecise
  - deciding whether PostgreSQL search is enough or you need Elasticsearch
  - implementing search suggestions or autocomplete
estimatedTokens: 650
relatedFragments: [PAT-0004, PAT-0022, SKL-0008, SKL-0006]
dependencies: []
synonyms: ["how to add search to my app", "postgres full text search how to set up", "tsvector tsquery what do they mean", "should i use elasticsearch or postgres search", "how to make search results show relevant stuff first"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Full-Text Search with PostgreSQL

Built-in search that handles most use cases without adding another service.

## Core Concepts

- **tsvector**: A processed document. Strips stop words, applies stemming. `'The quick brown foxes'::tsvector` becomes `'brown' 'fox' 'quick'`.
- **tsquery**: A search query with operators. `'quick & fox'::tsquery` matches documents containing both words.
- **GIN index**: The index type that makes full-text search fast.

## Basic Setup

```sql
-- 1. Add a search column
ALTER TABLE articles ADD COLUMN search_vector tsvector;

-- 2. Populate it (weighted: title matters more than body)
UPDATE articles SET search_vector =
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(body, '')), 'B');

-- 3. Create a GIN index
CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);

-- 4. Keep it updated with a trigger
CREATE FUNCTION articles_search_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.body, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_search
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION articles_search_update();
```

## Querying and Ranking

```sql
-- Basic search with ranking
SELECT title,
       ts_rank(search_vector, query) AS rank
FROM articles, plainto_tsquery('english', 'database optimization') AS query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 20;

-- Search with highlighted snippets
SELECT title,
       ts_headline('english', body, plainto_tsquery('database optimization'),
                   'StartSel=<mark>, StopSel=</mark>, MaxWords=35') AS snippet
FROM articles
WHERE search_vector @@ plainto_tsquery('english', 'database optimization');
```

## Search Query Types

| Function | Use For | Example |
|----------|---------|---------|
| `plainto_tsquery` | Simple user input | `'database optimization'` -> `'databas' & 'optim'` |
| `phraseto_tsquery` | Exact phrase matching | `'connection pool'` -> `'connect' <-> 'pool'` |
| `websearch_to_tsquery` | Google-like syntax | `'"exact phrase" -exclude OR alternative` |

## Search Suggestions (Prefix Matching)

```sql
-- Autocomplete: match word prefixes
SELECT DISTINCT title
FROM articles
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
| Team does not want infra overhead | Dedicated search team and budget |

**Rule of thumb:** Start with PostgreSQL. It handles 90% of search needs. Migrate to dedicated search only when you measure a specific limitation.

## Anti-Patterns

- Using `LIKE '%term%'` for search (no index, no stemming, no ranking)
- Rebuilding the tsvector on every query instead of storing it
- Forgetting to create the GIN index (full-text search without it is a sequential scan)
- Not weighting fields (title matches should rank higher than body matches)
