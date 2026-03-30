---
id: SKL-0073
name: Lazy Loading
category: skills
tags: [lazy-loading, code-splitting, react-lazy, intersection-observer, deferred, performance]
capabilities: [component-lazy-loading, route-splitting, deferred-data, intersection-observer, priority-loading]
useWhen:
  - the initial page load downloads too much JavaScript or data
  - implementing lazy routes or lazy components in React
  - deferring offscreen content until the user scrolls to it
  - deciding what to load immediately vs what can wait
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0071, SKL-0074, SKL-0075, PAT-0020]
dependencies: []
synonyms: ["my page loads too much stuff upfront", "how to only load what the user needs", "defer loading things below the fold", "react lazy loading setup", "load components on scroll"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Lazy Loading

Load only what the user needs right now. Defer everything else until they scroll to it, click on it, or navigate to it.

## The Priority Framework

Decide when each piece of content should load:

| Priority | When to Load | Examples |
|----------|-------------|----------|
| **Critical** | Immediately, blocks render | Navigation, hero section, above-the-fold content |
| **High** | After first paint, before interaction | Auth state, critical data, first-screen images |
| **Medium** | On scroll or on idle | Below-fold sections, secondary data |
| **Low** | On user action (click, hover) | Modals, dropdowns, settings panels, PDF viewers |

## Lazy Routes (React)

Every route that is not the landing page should be lazy loaded.

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />           {/* Eager - landing page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Lazy */}
        <Route path="/settings" element={<Settings />} />   {/* Lazy */}
        <Route path="/profile" element={<Profile />} />     {/* Lazy */}
      </Routes>
    </Suspense>
  );
}
```

## Lazy Components

For heavy components within a page:

```jsx
import { lazy, Suspense } from 'react';

// Heavy chart library - only load when needed
const AnalyticsChart = lazy(() => import('./AnalyticsChart'));

function Dashboard({ showChart }) {
  return (
    <div>
      <DashboardHeader />    {/* Always loaded */}
      <MetricsGrid />        {/* Always loaded - above the fold */}

      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsChart />  {/* Loaded only when showChart is true */}
        </Suspense>
      )}
    </div>
  );
}
```

## Intersection Observer (Load on Scroll)

Load content when it enters the viewport.

```jsx
import { useEffect, useRef, useState } from 'react';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin: '200px', ...options } // Start loading 200px before visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// Usage
function TestimonialsSection() {
  const [ref, inView] = useInView();

  return (
    <div ref={ref}>
      {inView ? <Testimonials /> : <TestimonialsSkeleton />}
    </div>
  );
}
```

## Deferred Data Loading

Do not fetch all data on page load. Fetch critical data first, then fill in details.

```jsx
// React Router v7 / Remix - deferred data
export async function loader() {
  const criticalData = await getUser();           // Awaited - needed for first paint
  const deferredData = getNotifications();         // NOT awaited - loads in background

  return defer({
    user: criticalData,
    notifications: deferredData,
  });
}

function Page() {
  const { user, notifications } = useLoaderData();

  return (
    <div>
      <Header user={user} />           {/* Renders immediately */}
      <Suspense fallback={<NotificationsSkeleton />}>
        <Await resolve={notifications}>
          {(data) => <NotificationsList data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

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
