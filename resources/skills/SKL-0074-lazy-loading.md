---
id: SKL-0074
name: Lazy Loading
category: skills
tags: [lazy-loading, code-splitting, react-lazy, intersection-observer, deferred, performance, suspense, loadable-components]
capabilities: [component-lazy-loading, route-splitting, deferred-data, intersection-observer, priority-loading]
useWhen:
  - the initial page load downloads too much JavaScript or data
  - implementing lazy routes or lazy components in React
  - deferring offscreen content until the user scrolls to it
  - deciding what to load immediately vs what can wait
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0072, SKL-0075, SKL-0076, PAT-0020]
dependencies: []
synonyms: ["my page loads too much stuff upfront", "how to only load what the user needs", "defer loading things below the fold", "react lazy loading setup", "load components on scroll"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
---

# Lazy Loading

Load only what the user needs right now. Defer everything else until they scroll to it, click on it, or navigate to it. Use `React.lazy` for built-in splitting or `loadable-components` for advanced SSR-compatible code splitting.

## The Priority Framework

| Priority | When to Load | Examples |
|----------|-------------|----------|
| **Critical** | Immediately, blocks render | Navigation, hero section, above-the-fold content |
| **High** | After first paint, before interaction | Auth state, critical data, first-screen images |
| **Medium** | On scroll or on idle | Below-fold sections, secondary data |
| **Low** | On user action (click, hover) | Modals, dropdowns, settings panels, PDF viewers |

## Lazy Routes (React)

Every route that is not the landing page should be lazy loaded:

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

## Lazy Components

For heavy components within a page:

```jsx
const AnalyticsChart = lazy(() => import('./AnalyticsChart'));

function Dashboard({ showChart }) {
  return (
    <div>
      <DashboardHeader />
      <MetricsGrid />
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsChart />
        </Suspense>
      )}
    </div>
  );
}
```

## Intersection Observer (Load on Scroll)

Load content when it enters the viewport:

```jsx
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
```

## Deferred Data Loading

Fetch critical data first, fill in details later:

```jsx
// React Router / Remix - deferred data
export async function loader() {
  const criticalData = await getUser();
  const deferredData = getNotifications(); // NOT awaited

  return defer({ user: criticalData, notifications: deferredData });
}
```

Use `tanstack-query` or `swr` for client-side data fetching with built-in caching, deduplication, and background refetching.

## Quick Win Checklist

- [ ] Lazy load every route except the landing/entry page
- [ ] Wrap lazy components in Suspense with skeleton fallbacks (not spinners)
- [ ] Use Intersection Observer for below-fold sections (200px rootMargin)
- [ ] Defer non-critical data fetches (notifications, analytics, recommendations)
- [ ] Add `loading="lazy"` to all images below the fold
- [ ] Prefetch on hover for links the user is likely to click next

## Key Constraints

- Never lazy load above-the-fold content. It must render on first paint.
- Always provide a meaningful fallback (skeleton, not blank space).
- Set `rootMargin` on Intersection Observer so loading starts before the user reaches the content.
- Test lazy loading on slow connections to make sure fallbacks feel natural.
