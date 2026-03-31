---
id: SKL-0072
name: Bundle Optimization
category: skills
tags: [bundle, webpack, vite, code-splitting, tree-shaking, lazy-loading, performance, build, chunks]
capabilities: [bundle-analysis, code-splitting, tree-shaking, chunk-strategy, build-optimization]
useWhen:
  - the JavaScript bundle is too large and slowing down page load
  - analyzing what is making the build output so big
  - setting up code splitting and lazy loading for routes
  - reducing initial load time for a React or Next.js app
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0071, SKL-0074, PAT-0020]
dependencies: []
synonyms: ["my app takes forever to load", "javascript bundle is too big", "how to make my build smaller", "webpack bundle is huge", "reduce my app size"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Bundle Optimization

Reduce JavaScript bundle size through code splitting, tree shaking, and smart chunking. Smaller bundles mean faster first paint and better Core Web Vitals.

## Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| Initial JS bundle | < 150 KB (gzipped) | First paint speed |
| Per-route chunk | < 50 KB (gzipped) | Navigation speed |
| Total JS (all routes) | < 500 KB (gzipped) | Overall budget |
| Time to Interactive | < 3.5s on 4G | User patience threshold |

## Step 1: Analyze What You Have

```bash
# For any webpack project
npx source-map-explorer build/static/js/*.js

# For Next.js
ANALYZE=true next build  # with @next/bundle-analyzer configured

# For Vite
npx vite-bundle-visualizer
```

Look for: duplicate dependencies, large libraries imported entirely, code that belongs in a different route.

## Step 2: Code Splitting by Route

Every route should be its own chunk. Users only download code for the page they visit.

```javascript
import { lazy } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
```

Next.js splits automatically per page. Use `dynamic()` for heavy within-page components:

```javascript
import dynamic from 'next/dynamic';
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

## Step 3: Tree Shaking

Tree shaking removes unused exports. It only works with ES modules (`import/export`), not CommonJS (`require`).

| Heavy Library | Size | Alternative | Size |
|--------------|------|-------------|------|
| moment.js | 72 KB | date-fns or dayjs | 2-7 KB |
| lodash (full) | 71 KB | lodash-es (tree-shakeable) | per-function |
| chart.js (full) | 60 KB | Register only needed charts | 15-25 KB |

```javascript
// Bad: imports everything (71 KB)
import _ from 'lodash';
// Good: imports one function (1.4 KB)
import groupBy from 'lodash/groupBy';
```

## Step 4: Vendor Chunk Strategy

Separate vendor code from app code. Vendor code changes less often and caches longer.

```javascript
// Vite config
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-popover'],
        },
      },
    },
  },
};
```

## Step 5: Dynamic Imports for Heavy Features

Features not needed on first render should load on demand:

```javascript
async function handleViewPdf() {
  const { renderPdf } = await import('./pdf-viewer');
  renderPdf(documentUrl);
}
```

## Quick Win Checklist

- [ ] Run bundle analyzer and identify the top 3 largest modules
- [ ] Replace full lodash/moment imports with tree-shakeable alternatives
- [ ] Lazy-load every route that is not the landing page
- [ ] Dynamic import any component over 20 KB that is not above the fold
- [ ] Set up vendor chunking to separate stable dependencies
- [ ] Enable gzip/brotli compression on the server
- [ ] Add a bundle size check to CI (e.g., `bundlesize` or `size-limit`)

## Key Constraints

- Code splitting adds network requests. Aim for 5-15 chunks, not 50.
- Tree shaking requires ES module syntax. Check that dependencies ship ESM builds.
- Dynamic imports need a loading state. Always pair with Suspense or a skeleton.
