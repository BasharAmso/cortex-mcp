---
id: SKL-0030
name: SEO Audit
category: skills
tags: [seo, marketing, growth, web-optimization]
capabilities: [meta-tag-validation, heading-hierarchy-check, structured-data-review, image-optimization-check]
useWhen:
  - auditing web pages for search engine optimization
  - checking meta tags, headings, and Open Graph tags
  - validating that landing pages are properly optimized for ranking
  - reviewing image alt text and content quality for SEO
estimatedTokens: 600
relatedFragments: [SKL-0029, SKL-0031, SKL-0015]
dependencies: []
synonyms: ["why doesnt my site show up on Google", "check my SEO", "are my meta tags right", "optimize my page for search", "audit my site for SEO issues"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# SEO Audit

Audit web pages for SEO readiness. Validates that built pages are actually optimized for search engines.

## Procedure

### 1. Identify Pages to Audit

Prioritize by marketing impact:
1. Landing page / homepage
2. Marketing pages (pricing, features, about)
3. Blog/content pages

### 2. Technical SEO Check

| Check | Criteria | Severity |
|-------|----------|----------|
| `<title>` tag | Present, 50-60 chars, includes target keyword | HIGH |
| `<meta description>` | Present, 150-160 chars, compelling | HIGH |
| `<h1>` tag | Exactly one per page, contains primary keyword | HIGH |
| Heading hierarchy | H1 to H2 to H3, no skipped levels | MEDIUM |
| `<html lang="">` | Present and correct | MEDIUM |
| Canonical URL | `<link rel="canonical">` present | MEDIUM |
| Open Graph tags | og:title, og:description, og:image | MEDIUM |
| Twitter Card tags | twitter:card, twitter:title, twitter:description | LOW |
| Viewport meta | Present for mobile | HIGH |
| Robots meta | Not accidentally blocking indexing | CRITICAL |

### 3. Content Quality Check

| Check | Criteria | Severity |
|-------|----------|----------|
| Word count | Landing: 300+ words, Blog: 800+ words | MEDIUM |
| Keyword presence | In title, H1, first 100 words, meta description | HIGH |
| Image alt text | All images have meaningful alt (not empty or "image") | MEDIUM |
| Internal links | At least 2 per content page | LOW |
| Structured data | JSON-LD schema where appropriate | MEDIUM |

### 4. Performance Signals

| Check | Criteria | Severity |
|-------|----------|----------|
| Image optimization | Modern formats (WebP, AVIF) or under 200KB | MEDIUM |
| Lazy loading | Below-fold images use `loading="lazy"` | LOW |
| Mobile responsiveness | No horizontal scroll, tap targets 44px+ | HIGH |

### 5. Generate Report

Organize findings by severity. For each issue: state the page and element, current state, recommended state, and specific fix.

## Key Rules

- Audits source files, not runtime behavior
- Does not modify code. Provides actionable recommendations.
- SEO is a moving target. Findings are best-practice guidance, not guarantees.
