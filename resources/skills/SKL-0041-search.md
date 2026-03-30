---
id: SKL-0041
name: Search Implementation
category: skills
tags: [search, full-text-search, elasticsearch, algolia, fuzzy-search, autocomplete, indexing, relevance]
capabilities: [search-architecture, indexing-strategy, relevance-tuning, autocomplete-design]
useWhen:
  - adding search functionality to an application
  - choosing between search solutions for different scale requirements
  - implementing autocomplete or typeahead search
  - improving search relevance and result quality
  - indexing content for fast retrieval
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0008, SKL-0038, PAT-0004, PAT-0009]
dependencies: []
synonyms: ["add search to my app", "how does search work", "set up autocomplete", "search is returning bad results", "full text search setup"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: advanced
---

# Search Implementation

Search is deceptively complex. The gap between "LIKE %query%" and good search is enormous. Choose your approach based on dataset size, query complexity, and relevance requirements.

## Solution Comparison

| Approach | Dataset Size | Relevance Quality | Latency | Ops Complexity | Cost |
|----------|-------------|-------------------|---------|----------------|------|
| SQL `LIKE` / `ILIKE` | < 10K rows | Poor | Slow at scale | None | Free |
| PostgreSQL `pg_trgm` | < 100K rows | Decent (fuzzy) | Good with index | Low | Free |
| PostgreSQL FTS (`tsvector`) | < 1M rows | Good | Good | Low | Free |
| SQLite FTS5 | < 1M rows | Good | Very fast | None | Free |
| Meilisearch | < 10M docs | Very good | Very fast | Low (single binary) | Free (self-host) |
| Typesense | < 10M docs | Very good | Very fast | Low | Free (self-host) |
| Elasticsearch / OpenSearch | Unlimited | Excellent (tunable) | Fast | High (cluster mgmt) | High |
| Algolia | Unlimited | Excellent | Very fast | None (managed) | $$$ per search |

## Decision Framework

1. **Under 10K records, simple queries?** Use SQL `ILIKE` with an index. Ship today.
2. **Under 100K, need fuzzy matching?** Use `pg_trgm` extension in PostgreSQL. No extra infrastructure.
3. **Under 1M, need ranked results?** Use PostgreSQL full-text search or SQLite FTS5. Still no extra service.
4. **Need instant autocomplete, typo tolerance, faceted filtering?** Meilisearch or Typesense. One extra service, massive UX improvement.
5. **Massive scale, complex relevance, analytics?** Elasticsearch or Algolia.

## Indexing Strategy

### What to Index
- Title/name fields (highest weight)
- Description/body content (medium weight)
- Tags, categories, metadata (for filtering)
- Do NOT index: IDs, timestamps, binary data

### When to Update the Index
- **Synchronous:** Update index on every write. Simple but adds latency to writes.
- **Async (recommended):** Queue index updates via background job. Slight delay (seconds) but writes stay fast.
- **Batch rebuild:** Full re-index on schedule. Good for rarely-changing content.

## Autocomplete Pattern

1. User types at least 2-3 characters (debounce input by 200-300ms)
2. Send query to search endpoint
3. Return top 5-8 suggestions with highlighted matching text
4. Keyboard navigation: arrow keys to select, Enter to confirm, Escape to close
5. Show recent searches as initial suggestions before typing

## Relevance Tuning

Relevance is what separates useful search from frustrating search.

- **Field weighting:** Title matches rank higher than body matches
- **Recency boost:** Newer content ranks slightly higher (configurable)
- **Popularity signal:** Items with more views/interactions rank higher
- **Exact match boost:** Exact phrase matches rank above partial matches
- **Synonym expansion:** "JS" matches "JavaScript", "phone" matches "mobile"

## Common Mistakes

- **Not debouncing autocomplete.** Firing a search request on every keystroke overwhelms the server and creates flickering results.
- **Returning too many results.** Users scan the first 5-10 results. Paginate and show "no results" clearly.
- **No empty state.** When search returns nothing, suggest corrections, show popular items, or broaden the query.
- **Indexing everything.** Index only searchable fields. Filter fields need different index types than full-text fields.
- **Ignoring analytics.** Track what users search for, what they click, and what returns zero results. This data drives relevance improvements.
