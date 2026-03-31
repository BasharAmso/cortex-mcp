---
id: PAT-0179
name: Infinite Scroll Pattern
category: patterns
tags: [infinite-scroll, pagination, intersection-observer, virtualization, scroll-restoration, lazy-loading]
capabilities: [infinite-scroll, virtual-scrolling, scroll-position-restore, intersection-observer]
useWhen:
  - implementing infinite scroll for feed or list content
  - choosing between pagination and infinite scroll
  - using Intersection Observer for lazy loading triggers
  - virtualizing long lists for performance
  - restoring scroll position after navigation
estimatedTokens: 650
relatedFragments: [SKL-0344, SKL-0075, PAT-0016, PAT-0178]
dependencies: []
synonyms: ["how to implement infinite scroll", "load more on scroll", "Intersection Observer scroll trigger", "virtual scroll long list", "restore scroll position on back", "infinite scroll vs pagination"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Infinite Scroll Pattern

Infinite scroll loads more content as the user scrolls, eliminating manual "next page" clicks. It works best for feeds and discovery content but poorly for goal-directed search. The implementation hinges on Intersection Observer, loading state management, and scroll position restoration.

## When to Use Infinite Scroll vs Pagination

| Use Infinite Scroll | Use Pagination |
|---------------------|----------------|
| Social feeds, timelines | Search results (users need to reach result #47) |
| Image galleries | Tables with specific row navigation |
| News/blog listings | Data requiring "page X of Y" reference |
| Discovery browsing | Content with a footer users need to reach |

## Intersection Observer Trigger

```jsx
function useInfiniteScroll(loadMore, hasMore) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: '200px' } // Trigger 200px before the sentinel is visible
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return sentinelRef;
}

// Usage
function Feed({ items, loadMore, hasMore, isLoading }) {
  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div>
      {items.map(item => <FeedItem key={item.id} item={item} />)}
      {isLoading && <FeedItemSkeleton count={3} />}
      {hasMore && <div ref={sentinelRef} aria-hidden="true" />}
      {!hasMore && <p className="text-center text-gray-400 py-8">You've reached the end</p>}
    </div>
  );
}
```

Key details:
- Place the sentinel element **before** the last few items using `rootMargin: '200px'` so loading starts before the user reaches the bottom
- Show skeleton placeholders (not a spinner) while loading more
- Display a clear "end of content" message

## Virtualization for Long Lists

When a list exceeds ~500 items, DOM nodes slow down the page. Virtualization renders only visible items:

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // Estimated row height in px
    overscan: 5, // Render 5 extra items above/below viewport
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
              width: '100%',
            }}
          >
            <ListItem item={items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Scroll Position Restoration

When users navigate away and come back, they expect to be where they left off:

```jsx
function useScrollRestore(key) {
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    // Restore position on mount
    const saved = sessionStorage.getItem(`scroll-${key}`);
    if (saved) window.scrollTo(0, parseInt(saved));

    // Save position on unmount
    return () => {
      sessionStorage.setItem(`scroll-${key}`, window.scrollY.toString());
    };
  }, [key]);
}
```

- Store scroll position in `sessionStorage` keyed by route
- Restore on mount (after content has rendered)
- Also preserve loaded item count so the content is tall enough to scroll to the saved position

## Cursor-Based Pagination (Backend)

```
GET /api/feed?cursor=abc123&limit=20

Response:
{
  "items": [...],
  "nextCursor": "def456",  // null when no more items
  "hasMore": true
}
```

- Use cursor-based pagination (not offset) to handle items being added/removed during scrolling
- Return `hasMore` so the client knows when to stop
- Keep page size at 20-30 items for balanced network vs render cost

## Anti-Patterns

- No end-of-content indicator (users scroll forever wondering if content is loading)
- Loading triggered on exact bottom (instead of with rootMargin buffer)
- Rendering 1000+ DOM nodes without virtualization
- Offset-based pagination with frequently changing data (causes duplicates/gaps)
- No scroll restoration (users lose their place on back navigation)

## Key Takeaways

- Use Intersection Observer with `rootMargin` to preload before the user hits the bottom
- Show skeleton rows while loading and a clear "end" message when done
- Virtualize lists over 500 items with `@tanstack/react-virtual`
- Restore scroll position on back navigation using `sessionStorage`
- Use cursor-based, not offset-based, pagination on the backend
