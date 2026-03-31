---
id: SKL-0308
name: Web Performance Optimization
category: skills
tags: [performance, core-web-vitals, bundle-splitting, lazy-loading, image-optimization, lighthouse]
capabilities: [performance-auditing, bundle-optimization, image-optimization, loading-strategy]
useWhen:
  - optimizing page load speed and Core Web Vitals scores
  - reducing JavaScript bundle size
  - implementing lazy loading for images or components
  - diagnosing slow rendering or layout shifts
  - preparing for a Lighthouse performance audit
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0319, PAT-0162]
dependencies: []
synonyms: ["how to speed up my website", "how to improve Core Web Vitals", "how to reduce bundle size", "why is my page loading slowly", "how to lazy load images", "how to optimize web performance"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Web Performance Optimization

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0308 |
| **Name** | Web Performance Optimization |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Web performance directly impacts user retention and SEO rankings. Google's Core Web Vitals define three measurable thresholds that determine whether a page feels fast.

### Core Web Vitals Targets

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|------------|------|
| **LCP** (Largest Contentful Paint) | Loading speed | < 2.5s | 2.5-4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | Responsiveness | < 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | < 0.1 | 0.1-0.25 | > 0.25 |

### Bundle Splitting Strategy

Split JavaScript into chunks so users download only what they need:

1. **Route-based splitting** — each page loads its own bundle. Use `React.lazy()` with `Suspense` or Next.js dynamic routes (automatic).
2. **Component-based splitting** — heavy components (charts, editors, maps) load on demand with `dynamic(() => import('./HeavyChart'))`.
3. **Vendor splitting** — separate third-party libraries into a shared chunk that caches independently from your application code.
4. **Analyze first** — run `npx webpack-bundle-analyzer` or `npx vite-bundle-visualizer` to identify the largest modules before splitting blindly.

### Image Optimization

Images are typically the heaviest assets on a page:

- **Use modern formats:** WebP is 25-35% smaller than JPEG at equivalent quality. AVIF saves even more but has narrower browser support.
- **Responsive images:** Use `srcset` and `sizes` attributes so the browser downloads the right resolution for the viewport.
- **Lazy load below-fold images:** Add `loading="lazy"` to any `<img>` not visible on initial load. For frameworks, use `next/image` or equivalent.
- **Set explicit dimensions:** Always provide `width` and `height` attributes to prevent layout shift (CLS).
- **Use a CDN with transforms:** Cloudinary, imgix, or Vercel Image Optimization resize and convert on the fly.

### Lazy Loading Patterns

```jsx
// Route-level splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Component-level splitting (Next.js)
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});
```

Always provide a skeleton or placeholder during lazy load to avoid CLS.

### Quick Wins Checklist

- Enable gzip/brotli compression on your server or CDN
- Preconnect to critical third-party origins (`<link rel="preconnect">`)
- Defer non-critical JavaScript with `async` or `defer` attributes
- Inline critical CSS for above-the-fold content
- Remove unused CSS with PurgeCSS or Tailwind's built-in purge
- Cache static assets with long `max-age` headers and content-hashed filenames

## Anti-Patterns

- Importing entire libraries when you need one function (`import _ from 'lodash'` vs `import debounce from 'lodash/debounce'`)
- Loading all images eagerly on a long scrolling page
- Missing width/height on images causing layout shift
- Render-blocking CSS or JS in the `<head>` without deferral
- Premature optimization before measuring with Lighthouse or WebPageTest

## Key Takeaways

- Measure before optimizing: run Lighthouse and identify the worst metric first
- Bundle splitting and image optimization deliver the biggest gains for least effort
- Always set explicit image dimensions to prevent layout shift
- Lazy load anything below the fold, including components and images
- Core Web Vitals are a ranking factor; performance is not optional for public-facing sites
