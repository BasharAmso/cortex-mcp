---
id: SKL-0318
name: Data Fetching Patterns
category: skills
tags: [data-fetching, tanstack-query, swr, caching, pagination, optimistic-updates]
capabilities: [query-caching, pagination-implementation, optimistic-updates, prefetching, infinite-scroll]
useWhen:
  - fetching and caching API data in a React application
  - implementing pagination or infinite scrolling
  - building optimistic UI updates for mutations
  - choosing between TanStack Query, SWR, and manual fetching
  - prefetching data for faster navigation
estimatedTokens: 650
relatedFragments: [SKL-0309, SKL-0315, PAT-0164]
dependencies: []
synonyms: ["how to fetch data in React", "tanstack query vs swr", "how to cache API responses", "how to implement infinite scroll", "how to do optimistic updates", "how to prefetch data for faster page loads"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/TanStack/query"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Data Fetching Patterns

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0318 |
| **Name** | Data Fetching Patterns |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Data fetching in modern React apps is not about `useEffect` + `fetch`. Dedicated libraries handle caching, deduplication, background refetching, and error/loading states automatically. TanStack Query (formerly React Query) is the standard.

### Why Not useEffect + fetch?

Manual fetching requires you to handle every concern yourself:

- Loading states
- Error states
- Caching and cache invalidation
- Request deduplication (two components requesting the same data)
- Background refetching (stale data while user navigates)
- Race conditions (responses arriving out of order)

TanStack Query handles all of these with a single hook.

### TanStack Query Fundamentals

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes before refetch
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{data.name}</div>;
}
```

### Query Keys Are Cache Keys

The `queryKey` determines cache identity. Structure them hierarchically:

```typescript
['users']              // all users list
['users', userId]      // single user
['users', userId, 'posts'] // user's posts
['posts', { status: 'published', page: 2 }] // filtered, paginated
```

When a mutation invalidates data, invalidate by prefix:

```typescript
const queryClient = useQueryClient();
// Invalidates ALL queries starting with ['users']
queryClient.invalidateQueries({ queryKey: ['users'] });
```

### Mutations with Optimistic Updates

Update the UI before the server confirms, then reconcile:

```typescript
const mutation = useMutation({
  mutationFn: (newTodo) => fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
  }),
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old) => [...old, { ...newTodo, id: 'temp' }]);
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previous); // rollback
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] }); // refetch truth
  },
});
```

### Pagination Patterns

**Offset pagination** (page numbers):

```typescript
const { data } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPosts({ page, limit: 20 }),
  placeholderData: keepPreviousData, // show old data while loading next page
});
```

**Infinite scroll** (cursor-based):

```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed({ cursor: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: undefined,
});
```

### Prefetching for Fast Navigation

Prefetch data before the user navigates to reduce perceived load time:

```typescript
// On hover over a link
function UserLink({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  return (
    <Link
      to={`/users/${userId}`}
      onMouseEnter={() => {
        queryClient.prefetchQuery({
          queryKey: ['user', userId],
          queryFn: () => fetchUser(userId),
        });
      }}
    >
      View Profile
    </Link>
  );
}
```

### Stale Time vs Cache Time

| Setting | Default | Meaning |
|---------|---------|---------|
| `staleTime` | 0 | How long data is "fresh" before background refetch |
| `gcTime` | 5 min | How long unused cache entries are kept in memory |

Set `staleTime` based on how often data changes: 0 for real-time data, 5-30 minutes for profile data, Infinity for static reference data.

## Anti-Patterns

- Using `useEffect` + `useState` for data fetching in 2026 (use a library)
- Not setting `staleTime` (every component mount triggers a refetch)
- Using array indices as query keys (collisions between unrelated queries)
- Storing server data in a state management library (Zustand, Redux) instead of a cache
- Not handling loading and error states in every query consumer

## Key Takeaways

- TanStack Query is the standard for data fetching in React; stop writing manual useEffect fetches
- Query keys are cache keys; structure them hierarchically for easy invalidation
- Optimistic updates make mutations feel instant; always include rollback logic
- Prefetch on hover for faster navigation between pages
- Server data belongs in a query cache, not in your state management store
