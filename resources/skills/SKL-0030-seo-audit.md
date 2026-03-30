---
id: SKL-0030
name: SEO Audit
category: skills
tags: [seo, marketing, growth, web-optimization, meta-tags, structured-data, accessibility, performance]
capabilities: [meta-tag-validation, heading-hierarchy-check, structured-data-review, image-optimization-check, mobile-readiness-audit]
useWhen:
  - auditing web pages for search engine optimization
  - checking meta tags, headings, and Open Graph tags
  - validating that landing pages are properly optimized for ranking
  - reviewing image alt text and content quality for SEO
  - preparing pages for indexing before a launch
estimatedTokens: 600
relatedFragments: [SKL-0029, SKL-0031, SKL-0015]
dependencies: []
synonyms: ["why doesnt my site show up on Google", "check my SEO", "are my meta tags right", "optimize my page for search", "audit my site for SEO issues"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/nicklockwood/iVersion"
difficulty: intermediate
---

# SEO Audit

Audit web pages for SEO readiness. Validates that built pages are optimized for search engine discovery, social sharing, and user engagement. Covers technical SEO, content quality, and performance signals.

## Procedure

### 1. Identify Pages to Audit

Prioritize by marketing impact:
1. Landing page / homepage (highest traffic entry point)
2. Marketing pages (pricing, features, about)
3. Blog/content pages (organic search targets)
4. Key conversion pages (signup, checkout)

### 2. Technical SEO Check

| Check | Criteria | Severity |
|-------|----------|----------|
| `<title>` tag | Present, 50-60 chars, includes target keyword | HIGH |
| `<meta description>` | Present, 150-160 chars, compelling with CTA | HIGH |
| `<h1>` tag | Exactly one per page, contains primary keyword | HIGH |
| Heading hierarchy | H1 > H2 > H3, no skipped levels | MEDIUM |
| `<html lang="">` | Present and correct language code | MEDIUM |
| Canonical URL | `<link rel="canonical">` present and correct | MEDIUM |
| Open Graph tags | og:title, og:description, og:image (1200x630px) | MEDIUM |
| Twitter Card tags | twitter:card, twitter:title, twitter:description | LOW |
| Viewport meta | `<meta name="viewport">` present for mobile | HIGH |
| Robots meta | Not accidentally blocking indexing (`noindex`) | CRITICAL |
| sitemap.xml | Present and accessible at /sitemap.xml | MEDIUM |
| robots.txt | Present, allows critical paths | MEDIUM |

### 3. Content Quality Check

| Check | Criteria | Severity |
|-------|----------|----------|
| Word count | Landing: 300+ words, Blog: 800+ words | MEDIUM |
| Keyword presence | In title, H1, first 100 words, meta description | HIGH |
| Image alt text | All images have meaningful alt (not empty or "image") | MEDIUM |
| Internal links | At least 2-3 per content page | LOW |
| External links | Link to authoritative sources where relevant | LOW |
| Structured data | JSON-LD schema for Organization, Product, Article, FAQ | MEDIUM |
| URL structure | Readable, keyword-containing, no dynamic parameters | MEDIUM |

### 4. Performance Signals

Search engines factor page speed into rankings:

| Check | Criteria | Severity |
|-------|----------|----------|
| Image optimization | Modern formats (WebP, AVIF) or under 200KB each | MEDIUM |
| Lazy loading | Below-fold images use `loading="lazy"` | LOW |
| Mobile responsiveness | No horizontal scroll, tap targets 44px+ minimum | HIGH |
| Compression | Gzip or Brotli enabled | MEDIUM |
| Core Web Vitals | LCP under 2.5s, FID under 100ms, CLS under 0.1 | HIGH |

### 5. Version and Update Signals

Pages that appear fresh rank better:

- Publish date or `dateModified` in structured data
- Regular content updates for blog pages
- Clear versioning for documentation pages (helps users and crawlers)

### 6. Generate Report

Organize findings by severity (CRITICAL > HIGH > MEDIUM > LOW). For each issue: page URL, element, current state, recommended state, and specific fix with code snippet.

## Key Rules

- Audits source files, not runtime behavior (use Lighthouse for runtime)
- Does not modify code. Provides actionable recommendations with code snippets.
- SEO is a moving target. Findings are best-practice guidance, not guarantees.
- Never stuff keywords. Write for humans first, search engines second.
