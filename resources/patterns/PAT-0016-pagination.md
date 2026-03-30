---
id: PAT-0016
name: Pagination & Infinite Scroll
category: patterns
tags: [pagination, infinite-scroll, cursor, offset, keyset, load-more, virtual-scroll, api-design, performance]
capabilities: [pagination-design, cursor-pagination, virtual-scrolling]
useWhen:
  - implementing pagination for list endpoints
  - choosing between offset and cursor pagination for an API
  - building infinite scroll in a frontend application
  - handling large datasets in UI without crushing the browser
  - designing API pagination for public consumption
estimatedTokens: 550
relatedFragments: [PAT-0002, PAT-0004, SKL-0006, SKL-0005]
dependencies: []
synonyms: ["add pagination to my list", "infinite scroll setup", "cursor vs offset pagination", "load more button implementation", "my list has thousands of items"]
lastUpdated: "2026-03-29"
difficulty: beginner
sourceUrl: "https://github.com/elsewhencode/project-guidelines"
---

# Pagination & Infinite Scroll

Display large datasets without crushing your database, API, or user's browser.

## Strategy Comparison

| Strategy | How | Pros | Cons |
|----------|-----|------|------|
| **Offset** | `LIMIT 20 OFFSET 40` | Simple, jump to any page | Slow on large tables, inconsistent with inserts |
| **Cursor (keyset)** | `WHERE id > :lastId LIMIT 20` | Fast at any depth, consistent | No page jumping, needs a unique sortable column |
| **Page token** | Opaque cursor encoding offset + filters | Hides implementation, versionable | Slightly more complex |

## When to Use What

- **Offset:** Admin panels, small datasets (<10K rows), page-number navigation needed
- **Cursor:** User-facing feeds, large datasets, infinite scroll, real-time lists
- **Page token:** Public APIs where you may change implementation later

## Cursor Pagination (API)

```typescript
// Request
GET /api/posts?limit=20&after=post_abc123

// Response
{
  "data": [...],
  "pagination": {
    "hasMore": true,
    "endCursor": "post_xyz789"
  }
}

// SQL -- the "+1 trick"
SELECT * FROM posts
WHERE id > $afterCursor
ORDER BY id ASC
LIMIT $limit + 1;  // fetch one extra to determine hasMore
```

Fetch `limit + 1` rows. If you get the extra row, `hasMore = true`. Return only `limit` rows to the client.

## Frontend: Infinite Scroll with Intersection Observer

```typescript
const observerRef = useRef<IntersectionObserver>();
const lastItemRef = useCallback((node: HTMLElement | null) => {
  if (isLoading) return;
  if (observerRef.current) observerRef.current.disconnect();
  observerRef.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      fetchNextPage();
    }
  });
  if (node) observerRef.current.observe(node);
}, [isLoading, hasMore]);
```

## Virtual Scrolling

For lists with 10K+ items, render only visible rows. Use `@tanstack/react-virtual` or `react-window`. The DOM stays small regardless of list size.

## Anti-Patterns

- Using offset pagination for infinite scroll (gets slower as user scrolls)
- No `hasMore` indicator (client doesn't know when to stop fetching)
- Fetching all rows and paginating in JavaScript
- No loading state or skeleton UI during page fetches
- Forgetting to handle empty states and end-of-list
