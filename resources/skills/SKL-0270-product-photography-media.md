---
id: SKL-0270
name: Product Photography & Media
category: skills
tags: [image-optimization, cdn, product-images, webp, avif, ecommerce]
capabilities: [image-pipeline-design, media-optimization, cdn-architecture, responsive-images]
useWhen:
  - setting up image processing for a product catalog
  - optimizing product images for page speed
  - implementing zoom, 360-degree views, or video on product pages
  - choosing between image formats like WebP, AVIF, and JPEG
  - designing a CDN-backed media pipeline for ecommerce
estimatedTokens: 650
relatedFragments: [SKL-0271, SKL-0269]
dependencies: []
synonyms: ["how to optimize product images", "what image format should I use for ecommerce", "how to add image zoom to product pages", "CDN for product photos", "image processing pipeline", "how to serve responsive product images"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/imgproxy/imgproxy"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Product Photography & Media

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0270 |
| **Name** | Product Photography & Media |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Product images are the single biggest driver of conversion on ecommerce sites. Unoptimized images are also the single biggest source of slow page loads. The solution is an on-demand image processing pipeline that resizes, compresses, and converts images at request time rather than pre-generating every variant.

### On-Demand Image Processing

Tools like imgproxy act as HTTP microservices that sit between your image storage (S3, GCS) and your CDN. When a browser requests a product image, imgproxy resizes, crops, and converts it on the fly based on URL parameters. The CDN caches the result so subsequent requests are instant. This eliminates the need to pre-generate dozens of size variants per product.

### Format Selection

| Format | Use Case | Browser Support | Size vs JPEG |
|--------|----------|-----------------|-------------|
| **WebP** | Default for most browsers | 97%+ | 25-35% smaller |
| **AVIF** | Best compression, modern browsers | 90%+ | 40-50% smaller |
| **JPEG** | Fallback for legacy browsers | 100% | Baseline |
| **PNG** | Transparent backgrounds only | 100% | Larger |

Use content negotiation (the `Accept` header) to serve the best format each browser supports. imgproxy and similar tools handle this automatically.

### Responsive Image Sizes

Generate 3-4 breakpoints rather than arbitrary sizes:

- **Thumbnail**: 300px (category grids, search results)
- **Medium**: 600px (product cards, mobile product page)
- **Large**: 1200px (desktop product page hero)
- **Zoom**: 2400px (loaded on hover/tap only)

Use `srcset` and `sizes` attributes so the browser picks the right variant. Lazy-load everything below the fold with `loading="lazy"`.

### Security and Performance

Sign image URLs to prevent abuse (imgproxy uses HMAC signatures). Validate image dimensions before decoding to block "image bomb" attacks. Strip metadata (EXIF, color profiles) to reduce file size without visual impact. Set CDN cache headers to 30+ days for immutable product images.

### Video and 360-Degree Views

For products where static images are insufficient (furniture, apparel), add short looping videos (under 15 seconds, autoplay muted) or 360-degree spin views built from 24-36 sequential photographs. Host video on a dedicated CDN or use adaptive bitrate streaming.

## Key Takeaways

- Use on-demand processing (imgproxy or equivalent) instead of pre-generating image variants
- Serve WebP by default, AVIF where supported, JPEG as fallback via content negotiation
- Define 3-4 standard breakpoints and use `srcset` for responsive delivery
- Sign image URLs and strip metadata for security and smaller file sizes
- Lazy-load below-the-fold images and defer zoom-resolution images until interaction
