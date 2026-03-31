---
id: SKL-0271
name: SEO for Ecommerce
category: skills
tags: [seo, ecommerce-seo, schema-markup, product-pages, site-speed, structured-data]
capabilities: [product-page-seo, structured-data-implementation, category-page-optimization, technical-seo]
useWhen:
  - optimizing product pages for search engine visibility
  - adding schema markup to product and category pages
  - improving site speed for ecommerce SEO performance
  - structuring category and collection page hierarchies
  - fixing duplicate content issues across product variants
estimatedTokens: 650
relatedFragments: [SKL-0270, PAT-0141, SKL-0269]
dependencies: []
synonyms: ["how to do SEO for an online store", "product page schema markup", "ecommerce site speed optimization", "how to rank product pages on Google", "structured data for products", "category page SEO best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: SEO for Ecommerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0271 |
| **Name** | SEO for Ecommerce |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Ecommerce SEO differs from content SEO because product pages are transactional, catalog structures create massive duplicate content risk, and page speed directly impacts both ranking and conversion. Headless platforms like Saleor give you full control over rendered HTML and structured data, but that freedom means you must implement SEO deliberately.

### Product Page Optimization

Every product page needs: a unique title tag (`{Product Name} | {Brand}`), a meta description with price and key feature (under 155 characters), an H1 matching the product name, and at least 150 words of unique description. Avoid copying manufacturer descriptions verbatim as duplicate content.

### Schema Markup (JSON-LD)

Add `Product` structured data to every product page. Google uses this for rich results (price, availability, reviews in search).

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Headphones",
  "image": "https://example.com/headphones.jpg",
  "description": "Noise-cancelling over-ear headphones",
  "brand": { "@type": "Brand", "name": "AudioCo" },
  "offers": {
    "@type": "Offer",
    "price": "129.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}
```

Also implement `BreadcrumbList` schema on category and product pages for enhanced navigation display in search results.

### Category Page Strategy

Category pages often rank better than individual products for broad terms. Optimize them with: unique introductory copy (100+ words), faceted navigation that does not create indexable duplicate URLs (use `noindex` on filtered views or canonical tags), and internal links to top-selling products. Saleor's multi-channel architecture allows per-channel SEO control.

### Duplicate Content Control

Product variants (size, color) must use canonical tags pointing to the primary variant. Paginated category pages use `rel="next"` / `rel="prev"` or a "load more" pattern. Filter parameters should be blocked in robots.txt or handled via canonical URLs.

### Site Speed

Target Core Web Vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms. The biggest wins for ecommerce: optimize product images (see SKL-0270), lazy-load below-fold content, minimize third-party scripts (chat widgets, trackers), and use edge caching for API responses.

## Key Takeaways

- Implement `Product` and `BreadcrumbList` JSON-LD schema on every product and category page
- Use canonical tags to consolidate variant and filtered URLs into a single indexable page
- Write unique product descriptions; never copy manufacturer text verbatim
- Optimize category pages as landing pages for broad search terms
- Prioritize Core Web Vitals, especially LCP through image optimization and edge caching
