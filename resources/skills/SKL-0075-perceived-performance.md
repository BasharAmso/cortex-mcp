---
id: SKL-0075
name: Perceived Performance
category: skills
tags: [perceived-performance, optimistic-ui, prefetching, tti, streaming, instant, ux]
capabilities: [optimistic-updates, prefetching, streaming-html, progress-indicators, instant-navigation]
useWhen:
  - the app feels sluggish even though actual load times are reasonable
  - implementing optimistic UI for actions like saving, liking, or deleting
  - setting up prefetching so navigation feels instant
  - reducing time-to-interactive so the page feels responsive sooner
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0070, SKL-0074, SKL-0046, PAT-0020]
dependencies: []
synonyms: ["my app feels slow even though its not", "make the app feel snappy", "instant page transitions", "how to make saving feel instant", "the ui feels laggy when I click things"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Perceived Performance

Real performance is how fast things are. Perceived performance is how fast things feel. A 2-second action that shows instant feedback feels faster than a 500ms action with a spinner.

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
// Like button - show the like instantly, sync with server in background
function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function handleLike() {
    const newLiked = !liked;
    // Update UI immediately (optimistic)
    setLiked(newLiked);
    setCount(c => c + (newLiked ? 1 : -1));

    try {
      await api.toggleLike(postId);
    } catch {
      // Roll back on failure
      setLiked(!newLiked);
      setCount(c => c + (newLiked ? -1 : 1));
      toast.error('Could not save. Please try again.');
    }
  }

  return (
    <button onClick={handleLike}>
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
}
```

**Use optimistic UI for:** likes, saves, deletes, toggles, adding items to lists, marking as read.

**Do not use for:** payments, sending emails, destructive actions that cannot be undone.

## Technique 2: Prefetching

Load the next page before the user clicks.

```jsx
// Prefetch on hover (React Router)
<Link to="/dashboard" onMouseEnter={() => prefetchRoute('/dashboard')}>
  Dashboard
</Link>

// Next.js - automatic prefetching for <Link> in viewport
// For manual control:
import { useRouter } from 'next/navigation';
const router = useRouter();
router.prefetch('/dashboard');
```

```html
<!-- Prefetch critical resources -->
<link rel="prefetch" href="/api/dashboard-data" />
<link rel="preload" as="image" href="/hero.webp" />
<link rel="dns-prefetch" href="https://api.example.com" />
```

**Prefetch strategy:**
1. Prefetch the most likely next page (e.g., login prefetches dashboard)
2. Prefetch on hover for navigation links (150ms before click)
3. Prefetch visible links in viewport on idle

## Technique 3: Streaming HTML

Send the page shell immediately, then stream in dynamic content.

```jsx
// Next.js App Router - streaming with Suspense
export default function DashboardPage() {
  return (
    <div>
      <Header />                    {/* Sent immediately */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsGrid />             {/* Streamed when ready */}
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />          {/* Streamed when ready */}
      </Suspense>
    </div>
  );
}
```

The user sees the page shell instantly. Each section fills in as its data resolves.

## Technique 4: Progress Indicators

When you cannot be instant, show meaningful progress.

| Duration | Indicator |
|----------|-----------|
| < 300ms | None needed |
| 300ms-1s | Subtle inline indicator (button text changes, micro-animation) |
| 1-3s | Progress bar or skeleton |
| 3-10s | Progress bar with percentage or steps |
| 10s+ | Progress with time estimate and option to continue in background |

```jsx
// Button with inline loading state
function SaveButton({ onSave }) {
  const [state, setState] = useState('idle'); // idle | saving | saved

  async function handleClick() {
    setState('saving');
    await onSave();
    setState('saved');
    setTimeout(() => setState('idle'), 2000);
  }

  return (
    <button onClick={handleClick} disabled={state === 'saving'}>
      {state === 'idle' && 'Save'}
      {state === 'saving' && 'Saving...'}
      {state === 'saved' && 'Saved ✓'}
    </button>
  );
}
```

## Technique 5: Reduce Time-to-Interactive

The page looks loaded but nothing responds to clicks. This is worse than a loading screen.

- Defer non-critical JavaScript with `defer` or `type="module"`
- Remove or lazy-load third-party scripts (analytics, chat widgets, ads)
- Use `requestIdleCallback` for non-urgent initialization
- Avoid hydration of offscreen components (use progressive hydration or React Server Components)

```javascript
// Defer non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    initAnalytics();
    initChatWidget();
    prefetchCommonRoutes();
  });
}
```

## Quick Win Checklist

- [ ] Add optimistic UI to all toggle/save/delete actions
- [ ] Prefetch top 3 most-visited pages on idle
- [ ] Prefetch link targets on hover (150ms delay)
- [ ] Wrap each independent section in Suspense for streaming
- [ ] Replace spinners with inline state changes for buttons (Save -> Saving... -> Saved)
- [ ] Defer all third-party scripts (analytics, chat) to after interactive
- [ ] Measure Time to Interactive and set a budget (< 3.5s on mobile 4G)

## Key Constraints

- Optimistic UI must always have a rollback path. Never leave the UI in a wrong state.
- Prefetching wastes bandwidth if overdone. Only prefetch high-probability next pages.
- Streaming requires server support (Node.js streaming, edge runtime). Verify your hosting supports it.
- Never block the main thread during page load. Users will think the app is broken.
