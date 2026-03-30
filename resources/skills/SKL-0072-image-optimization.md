---
id: SKL-0072
name: Image Optimization
category: skills
tags: [images, webp, avif, responsive, lazy-loading, cdn, compression, performance, blur-placeholder, sharp]
capabilities: [image-format-selection, responsive-images, lazy-loading, cdn-delivery, compression]
useWhen:
  - images are slowing down page load or hurting Lighthouse scores
  - choosing the right image format and compression settings
  - implementing responsive images that serve the right size per device
  - setting up a CDN or image optimization pipeline
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0070, SKL-0073, PAT-0020]
dependencies: []
synonyms: ["my images are too big", "how to make pictures load faster", "what image format should I use", "photos are slowing down my site", "how to do responsive images"]
sourceUrl: "https://github.com/donnemartin/system-design-primer"
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Image Optimization

Serve the right image, in the right format, at the right size, at the right time. Images are typically 50-70% of a page's total weight and the most common cause of slow LCP.

## Format Selection

| Format | Best For | Browser Support | Savings vs JPEG |
|--------|----------|----------------|-----------------|
| **WebP** | Photos, illustrations | 97%+ browsers | 25-35% smaller |
| **AVIF** | Photos (best compression) | 92%+ browsers | 40-50% smaller |
| **SVG** | Icons, logos, simple graphics | Universal | Vector, infinitely scalable |
| **PNG** | Screenshots needing transparency | Universal | Use WebP instead when possible |

**Rule of thumb:** Use AVIF with WebP fallback for photos. Use SVG for icons. Avoid PNG for photos.

## Next.js Image Component

```jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Product screenshot showing the dashboard"
  width={1200}
  height={630}
  priority              // Above the fold: load immediately
  placeholder="blur"
  blurDataURL={blurHash}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

Automatically serves WebP/AVIF, resizes, lazy loads below the fold, and prevents CLS.

## Responsive Images (Without Next.js)

```html
<picture>
  <source type="image/avif"
    srcset="/hero-400.avif 400w, /hero-800.avif 800w, /hero-1200.avif 1200w"
    sizes="(max-width: 768px) 100vw, 50vw" />
  <source type="image/webp"
    srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, 50vw" />
  <img src="/hero-800.jpg" alt="Product screenshot" width="1200" height="630"
    loading="lazy" decoding="async" />
</picture>
```

## Blur Placeholders

Show a low-quality preview while the full image loads:
- **BlurHash** -- tiny hash string, renders a gradient preview (best for dynamic images)
- **LQIP** -- 20px wide version of the image
- **CSS gradient** -- solid color matching dominant color
- **next/image `placeholder="blur"`** -- automatic with static imports

## Compression Targets

| Image Type | Quality Setting | Max File Size |
|-----------|----------------|---------------|
| Hero/banner | 80-85% | < 200 KB |
| Product photo | 75-80% | < 100 KB |
| Thumbnail | 70-75% | < 30 KB |
| Icon/logo (SVG) | N/A | < 5 KB |

Tools: `sharp` (Node.js), `squoosh` (web app), `imagemin` (build pipeline).

## Quick Win Checklist

- [ ] Convert all JPEG/PNG photos to WebP (with AVIF where supported)
- [ ] Add `width` and `height` to every `<img>` tag (prevents CLS)
- [ ] Add `loading="lazy"` to all images below the fold
- [ ] Add `fetchpriority="high"` to the hero/LCP image
- [ ] Use `sizes` attribute so browsers download the right size
- [ ] Serve images from a CDN (Cloudflare, Vercel, imgix)
- [ ] Compress: no image over 200 KB without a good reason

## Key Constraints

- Never lazy load the LCP image. It must load immediately.
- Always include `alt` text. Empty `alt=""` only for purely decorative images.
- Always set explicit `width` and `height` to prevent layout shift.
- Test on slow connections. A 2 MB hero image on 3G takes 8+ seconds.
