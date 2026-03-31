---
id: SKL-0076
name: Perceived Performance
category: skills
tags: [perceived-performance, optimistic-ui, prefetching, tti, streaming, instant, ux, cache-strategy, latency]
capabilities: [optimistic-updates, prefetching, streaming-html, progress-indicators, instant-navigation]
useWhen:
  - the app feels sluggish even though actual load times are reasonable
  - implementing optimistic UI for actions like saving, liking, or deleting
  - setting up prefetching so navigation feels instant
  - reducing time-to-interactive so the page feels responsive sooner
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0071, SKL-0075, SKL-0047, PAT-0020]
dependencies: []
synonyms: ["my app feels slow even though its not", "make the app feel snappy", "instant page transitions", "how to make saving feel instant", "the ui feels laggy when I click things"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: advanced
owner: builder
pillar: "app-polish"
---

# Perceived Performance

Real performance is how fast things are. Perceived performance is how fast things feel. When posting a tweet, the tweet appears instantly on your timeline even though delivery to all followers takes time. Apply this pattern everywhere.

## The Perception Gap

| Real Time | With No Feedback | With Optimistic UI | User Perception |
|-----------|-----------------|-------------------|-----------------|
| 0-100ms | Instant | Instant | No difference |
| 100-300ms | Slight delay | Still instant | Optimistic UI hides the wait |
| 300ms-1s | Noticeable wait | Feels instant + confirms | Massive improvement |
| 1-3s | Frustrating | Tolerable with progress | Worth implementing |
| 3s+ | Abandonment risk | Still frustrating | Fix the real problem too |

## Technique 1: Optimistic UI

Show the result immediately. Roll back if the server says no.

```jsx
async function handleLike() {
  const newLiked = !liked;
  setLiked(newLiked);                    // Update UI immediately
  setCount(c => c + (newLiked ? 1 : -1));

  try {
    await api.toggleLike(postId);
  } catch {
    setLiked(!newLiked);                 // Roll back on failure
    setCount(c => c + (newLiked ? -1 : 1));
    toast.error('Could not save. Please try again.');
  }
}
```

**Use for:** likes, saves, deletes, toggles, adding items to lists, marking as read.
**Never use for:** payments, sending emails, destructive actions that cannot be undone.

## Technique 2: Prefetching

Load the next page before the user clicks:

```jsx
<Link to="/dashboard" onMouseEnter={() => prefetchRoute('/dashboard')}>
  Dashboard
</Link>
```

**Strategy:** Prefetch the most likely next page on idle. Prefetch on hover (150ms before click). Use `dns-prefetch` for external API domains.

## Technique 3: Streaming HTML

Send the page shell immediately, stream dynamic content as it resolves:

```jsx
export default function DashboardPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsGrid />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

## Technique 4: Cache Strategies

Use the right caching layer to reduce latency:

| Strategy | How | Trade-off |
|----------|-----|-----------|
| Cache-aside | App checks cache, loads from DB on miss | 3-trip latency on miss |
| Write-through | Write to cache then DB synchronously | Slow writes, fast reads |
| Write-behind | Write to cache, async DB write | Risk of data loss |
| Refresh-ahead | Auto-refresh cache before expiration | Depends on prediction accuracy |

## Technique 5: Progress Indicators

| Duration | Indicator |
|----------|-----------|
| < 300ms | None needed |
| 300ms-1s | Subtle inline indicator (button text changes) |
| 1-3s | Progress bar or skeleton |
| 3-10s | Progress bar with percentage or steps |
| 10s+ | Progress with time estimate and background option |

## Quick Win Checklist

- [ ] Add optimistic UI to all toggle/save/delete actions
- [ ] Prefetch top 3 most-visited pages on idle
- [ ] Prefetch link targets on hover (150ms delay)
- [ ] Wrap each independent section in Suspense for streaming
- [ ] Replace spinners with inline state changes for buttons
- [ ] Defer all third-party scripts to after interactive
- [ ] Measure Time to Interactive and set a budget (< 3.5s on mobile 4G)

## Key Constraints

- Optimistic UI must always have a rollback path. Never leave the UI in a wrong state.
- Prefetching wastes bandwidth if overdone. Only prefetch high-probability next pages.
- Streaming requires server support (Node.js streaming, edge runtime). Verify your hosting supports it.
- Never block the main thread during page load.
