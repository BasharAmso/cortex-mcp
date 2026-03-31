---
id: SKL-0119
name: Performance Optimization
category: skills
tags: [performance, optimization, speed, loading, bundle-size, lazy-loading, caching, profiling]
capabilities: [performance-audit, bundle-optimization, rendering-optimization, network-optimization]
useWhen:
  - app is loading slowly and needs diagnosis
  - optimizing JavaScript bundle size for faster initial load
  - reducing unnecessary re-renders in React
  - improving API response times and backend throughput
  - profiling to find performance bottlenecks
estimatedTokens: 700
relatedFragments: [SKL-0005, SKL-0006, SKL-0008, PAT-0009, PAT-0008]
dependencies: []
synonyms: ["my app is slow", "how to make my website faster", "reduce bundle size", "why is my page loading so slow", "optimize my React app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicklockwood/SwiftUI-BestPractices"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Performance Optimization

Performance is a feature. Every 100ms of load time costs measurable conversion. The web.dev Core Web Vitals framework provides the measurement targets; diagnose first, optimize second. Never guess at bottlenecks.

## Diagnostic Flowchart

```
Is the problem on initial load or during interaction?
+-- INITIAL LOAD
|   +-- Large bundle? -> Code splitting, tree shaking, lazy loading
|   +-- Slow server response? -> Check TTFB, optimize API, add caching
|   +-- Render blocking resources? -> Defer scripts, inline critical CSS
|   +-- Large images/assets? -> Compress, use modern formats, lazy load
+-- DURING INTERACTION
    +-- Janky scrolling? -> Virtualize long lists, reduce layout thrash
    +-- Slow UI updates? -> Profile re-renders, memoize, use selectors
    +-- Slow API calls? -> Optimistic updates, background refresh, cache
    +-- Memory growing? -> Check for leaks in event listeners, intervals
```

## Core Web Vitals Targets

Per web.dev performance standards:

| Metric | Target | Measures |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | Under 2.5s | Main content visibility |
| **INP** (Interaction to Next Paint) | Under 200ms | App responsiveness |
| **CLS** (Cumulative Layout Shift) | Under 0.1 | Visual stability |
| **TTFB** (Time to First Byte) | Under 800ms | Server response speed |

## Frontend Optimization

### Bundle Size
- **Code split by route.** Dynamic `import()` for each page. Users should not download admin code on the homepage.
- **Tree shake.** Import only what you use: `import { debounce } from 'lodash-es'` not `import _ from 'lodash'`.
- **Analyze the bundle.** Use `webpack-bundle-analyzer` or `source-map-explorer` to find the largest modules.
- **Replace heavy libraries.** date-fns instead of moment. Native `fetch` instead of axios for simple cases.

### Rendering
- **Memoize expensive components.** `React.memo` for stable-props components. `useMemo` for expensive computations.
- **Virtualize long lists.** Use `@tanstack/virtual` for lists over 100 items. Rendering 10,000 DOM nodes kills scroll performance.
- **Avoid layout thrash.** Never read layout properties (offsetHeight) then write styles in a loop.
- **Lazy load below-the-fold.** Images with `loading="lazy"`, components with `React.lazy`.

### Images and Assets
- **Modern formats.** WebP or AVIF over PNG/JPEG (30-50% smaller at equivalent quality).
- **Responsive images.** `srcset` and `sizes` attributes for viewport-appropriate images.
- **Preload critical assets.** `<link rel="preload">` for hero images and key fonts.

## Backend Optimization

### Database
- **Index your queries.** Run `EXPLAIN ANALYZE` on slow queries. Missing indexes are the most common backend bottleneck.
- **N+1 detection.** If you fetch a list then loop to fetch related records, use a JOIN or batch query.
- **Connection pooling.** Never open a new database connection per request.
- **Paginate everything.** Never return unbounded result sets.

### Caching
- **Static assets:** `Cache-Control: public, max-age=31536000, immutable` with content hashes in filenames.
- **API responses:** Cache expensive computations in Redis or memory. Invalidate on write.
- **CDN:** Put images, JS, CSS behind a CDN for global latency reduction.

### API Response Time
- **Return early, process later.** Queue non-critical work (analytics, emails) and respond immediately.
- **Compress responses.** Enable gzip/brotli (60-80% reduction for JSON/HTML).
- **Reduce payload size.** Return only needed fields. GraphQL or sparse fieldsets for REST.

## Measurement Tools

| Tool | Measures | When to Use |
|------|----------|-------------|
| Lighthouse | Overall web vitals | Baseline audit, CI checks |
| Chrome DevTools Performance | Runtime rendering | Diagnosing jank, re-renders |
| React DevTools Profiler | Component render times | Finding unnecessary re-renders |
| `webpack-bundle-analyzer` | Bundle composition | After build, before deploy |
| `EXPLAIN ANALYZE` (SQL) | Query execution plan | Slow API endpoints |
