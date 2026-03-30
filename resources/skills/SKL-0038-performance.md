---
id: SKL-0038
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
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
---

# Performance Optimization

Performance is a feature. Every 100ms of load time costs measurable conversion. Diagnose first, optimize second. Never guess at bottlenecks.

## Diagnostic Flowchart

```
Is the problem on initial load or during interaction?
├── INITIAL LOAD
│   ├── Large bundle? → Code splitting, tree shaking, lazy loading
│   ├── Slow server response? → Check TTFB, optimize API, add caching
│   ├── Render blocking resources? → Defer scripts, inline critical CSS
│   └── Large images/assets? → Compress, use modern formats, lazy load
└── DURING INTERACTION
    ├── Janky scrolling? → Virtualize long lists, reduce layout thrash
    ├── Slow UI updates? → Profile re-renders, memoize, use selectors
    ├── Slow API calls? → Optimistic updates, background refresh, cache
    └── Memory growing? → Check for leaks in event listeners, intervals
```

## Frontend Optimization Checklist

### Bundle Size
- **Code split by route.** Dynamic `import()` for each page. Users should not download admin code on the homepage.
- **Tree shake.** Import only what you use: `import { debounce } from 'lodash-es'` not `import _ from 'lodash'`.
- **Analyze the bundle.** Use `webpack-bundle-analyzer` or `source-map-explorer` to find the largest modules.
- **Replace heavy libraries.** date-fns instead of moment. Native `fetch` instead of axios for simple cases.

### Rendering
- **Memoize expensive components.** `React.memo` for components that receive the same props frequently. `useMemo` for expensive computations.
- **Virtualize long lists.** Use `react-window` or `@tanstack/virtual` for lists over 100 items. Rendering 10,000 DOM nodes kills scroll performance.
- **Avoid layout thrash.** Batch DOM reads and writes. Never read layout properties (offsetHeight) then immediately write styles in a loop.
- **Lazy load below-the-fold content.** Images with `loading="lazy"`, components with `React.lazy`.

### Images and Assets
- **Use modern formats.** WebP or AVIF over PNG/JPEG. 30-50% smaller at equivalent quality.
- **Responsive images.** `srcset` and `sizes` attributes. Do not serve 2000px images to mobile screens.
- **Preload critical assets.** `<link rel="preload">` for hero images and key fonts.

## Backend Optimization Checklist

### Database
- **Index your queries.** Run `EXPLAIN ANALYZE` on slow queries. Missing indexes are the most common backend bottleneck.
- **N+1 query detection.** If you fetch a list then loop to fetch related records, use a JOIN or batch query instead.
- **Connection pooling.** Never open a new database connection per request. Use a pool (PgBouncer, built-in pool).
- **Paginate everything.** Never return unbounded result sets.

### Caching
- **HTTP cache headers.** Static assets get `Cache-Control: public, max-age=31536000, immutable` with content hashes in filenames.
- **API response caching.** Cache expensive computations in Redis or memory. Invalidate on write.
- **CDN for static assets.** Put images, JS, CSS behind a CDN. Reduces latency globally.

### API Response Time
- **Return early, process later.** For non-critical work (analytics, emails), queue it and respond immediately.
- **Compress responses.** Enable gzip/brotli. Reduces transfer size 60-80% for JSON and HTML.
- **Reduce payload size.** Return only the fields the client needs. GraphQL or sparse fieldsets for REST.

## Measurement Tools

| Tool | Measures | When to Use |
|------|----------|-------------|
| Lighthouse | Overall web vitals | Baseline audit, CI checks |
| Chrome DevTools Performance | Runtime rendering | Diagnosing jank, re-renders |
| React DevTools Profiler | Component render times | Finding unnecessary re-renders |
| `webpack-bundle-analyzer` | Bundle composition | After build, before deploy |
| `EXPLAIN ANALYZE` (SQL) | Query execution plan | Slow API endpoints |
| Network tab (waterfall) | Request timing | Diagnosing slow loads |

## Key Metrics

- **LCP (Largest Contentful Paint):** Under 2.5s. The main content is visible.
- **INP (Interaction to Next Paint):** Under 200ms. The app feels responsive.
- **CLS (Cumulative Layout Shift):** Under 0.1. Nothing jumps around.
- **TTFB (Time to First Byte):** Under 800ms. The server responds quickly.
