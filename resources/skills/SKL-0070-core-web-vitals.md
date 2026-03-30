---
id: SKL-0070
name: Core Web Vitals
category: skills
tags: [performance, web-vitals, lighthouse, pagespeed, lcp, cls, inp, metrics, speed, ttfb, caching]
capabilities: [vitals-diagnosis, lighthouse-analysis, performance-scoring, metric-improvement]
useWhen:
  - diagnosing why a page feels slow or gets bad Google rankings
  - measuring and improving Lighthouse or PageSpeed Insights scores
  - fixing layout shift, slow page loads, or unresponsive interactions
  - preparing a site for production performance standards
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0071, SKL-0075, PAT-0020]
dependencies: []
synonyms: ["my website is slow", "how do I fix my lighthouse score", "google says my site has bad performance", "what are core web vitals", "my page speed score is terrible"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Core Web Vitals

Measure, understand, and fix the three metrics Google uses to evaluate real-world user experience. Latency matters at every layer: L1 cache reference is 0.5ns while an HDD seek is 10ms -- optimize the path from server to screen.

## The Three Metrics

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|------------|------|
| **LCP** (Largest Contentful Paint) | How fast the main content loads | < 2.5s | 2.5-4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | How fast the page responds to clicks/taps | < 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | How much the page jumps around while loading | < 0.1 | 0.1-0.25 | > 0.25 |

## How to Measure

1. **Lighthouse** (Chrome DevTools > Lighthouse tab) -- lab data, good for debugging
2. **PageSpeed Insights** (pagespeed.web.dev) -- real user data + lab data combined
3. **Web Vitals JS library** -- `npm install web-vitals` for production monitoring
4. **Chrome DevTools Performance tab** -- frame-by-frame breakdown

Always test on a throttled connection (Slow 3G or Fast 3G) to simulate real users.

## LCP Quick Wins

- **Unoptimized hero image** -- Use WebP/AVIF, add `fetchpriority="high"`, preload it
- **Render-blocking CSS/JS** -- Inline critical CSS, defer non-critical scripts
- **Slow server response (TTFB)** -- Add caching headers, use a CDN, optimize DB queries
- **Web fonts blocking render** -- Use `font-display: swap` and preload key fonts

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
<link rel="preload" as="font" href="/font.woff2" type="font/woff2" crossorigin>
```

## INP Quick Wins

- **Long JavaScript tasks** -- Break up work with `requestIdleCallback` or `scheduler.yield()`
- **Heavy event handlers** -- Debounce inputs, virtualize long lists
- **Main thread blocking** -- Move heavy computation to Web Workers

```javascript
async function processItems(items) {
  for (const item of items) {
    processItem(item);
    await scheduler.yield(); // Let the browser breathe
  }
}
```

## CLS Quick Wins

- **Images without dimensions** -- Always set `width` and `height` attributes
- **Ads or embeds loading late** -- Reserve space with `aspect-ratio` or `min-height`
- **Web fonts causing reflow** -- Use `font-display: swap` with size-matched fallback
- **Dynamic content injected above viewport** -- Insert below the fold or use `content-visibility`

```css
.hero-image { aspect-ratio: 16 / 9; width: 100%; }
.ad-container { min-height: 250px; }
```

## Diagnosis Checklist

1. Run PageSpeed Insights on the URL
2. Note which metric is failing (LCP, INP, or CLS)
3. Expand the "Diagnostics" section for specific recommendations
4. Fix the biggest offender first (largest impact, least effort)
5. Re-test after each fix to confirm improvement
6. Monitor with `web-vitals` in production for real-user scores

## Key Constraints

- Lab scores (Lighthouse) and field scores (CrUX) often differ. Field data is what Google ranks on.
- Always test on mobile. Google uses mobile-first indexing.
- A single bad resource (huge image, blocking script) can tank the entire score.
- Performance budgets: set them early, enforce them in CI.
