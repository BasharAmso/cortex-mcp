---
id: PAT-0048
name: Landing Page Patterns
category: patterns
tags: [landing-page, hero, cta, social-proof, pricing, conversion, above-the-fold, mobile-first]
capabilities: [landing-page-design, conversion-optimization, hero-section-building, pricing-table-layout]
useWhen:
  - building a product or SaaS landing page
  - designing hero sections and above-the-fold content
  - adding social proof, testimonials, or trust signals
  - creating pricing tables or feature comparison grids
  - optimizing a page for conversions
estimatedTokens: 750
relatedFragments: [SKL-0005, SKL-0013, SKL-0003, PAT-0050]
dependencies: []
synonyms: ["how to build a landing page", "make a homepage that converts", "hero section design", "pricing page layout", "what goes above the fold", "build a marketing page"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nordicgiant2/awesome-landing-page"
difficulty: intermediate
owner: builder
---

# Landing Page Patterns

A high-converting landing page follows a proven structure: hook attention above the fold, build trust in the middle, and drive action at the bottom. Every section earns the scroll to the next.

## Page Structure (Top to Bottom)

| Section | Purpose | Position |
|---------|---------|----------|
| Hero | Hook + primary CTA | Above the fold |
| Social proof bar | Logos, user count, press mentions | Immediately below hero |
| Problem/Solution | Articulate the pain, show the fix | First scroll |
| Feature grid | 3-4 key benefits with icons | Mid-page |
| Testimonials | Real quotes with names and photos | Mid-page |
| Pricing | Clear tiers, highlight recommended | Lower-mid |
| FAQ | Handle objections | Near bottom |
| Final CTA | Repeat the primary action | Bottom |

## Hero Section Pattern

```html
<section class="hero">
  <h1>One clear value proposition</h1>
  <p class="subhead">Supporting line that explains how</p>
  <div class="cta-group">
    <a href="/signup" class="btn-primary">Start Free Trial</a>
    <a href="/demo" class="btn-secondary">Watch Demo</a>
  </div>
  <img src="/hero-screenshot.webp" alt="Product dashboard showing key features" />
</section>
```

Hero rules:
- Headline: 6-12 words, benefit-driven (not feature-driven)
- One primary CTA, one optional secondary CTA
- Visual: product screenshot or short demo, not stock photos
- Load hero image as WebP with explicit width/height to prevent layout shift

## Social Proof Patterns

Ordered by persuasion strength:
1. Specific numbers ("12,000 teams use this")
2. Recognizable logos (client/press logos in a row)
3. Star ratings with review count
4. Individual testimonials with photo, name, and role
5. Case study links

## Feature Grid

```html
<div class="features" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div class="feature-card">
    <div class="icon" aria-hidden="true"><!-- SVG --></div>
    <h3>Feature Name</h3>
    <p>One sentence of benefit, not description.</p>
  </div>
  <!-- Repeat 3-4 times -->
</div>
```

- 3-4 features (not 8-12)
- Lead with the benefit, not the mechanism
- Icons should be consistent in style and size

## Pricing Table

- Maximum 3 tiers (Good / Better / Best)
- Visually highlight the recommended tier
- Show annual vs monthly toggle
- List 5-7 features per tier, checkmarks for included
- "Most Popular" badge on the middle tier
- CTA button on every tier, not just one

## Mobile-First Rules

- Hero text must be readable at 320px without horizontal scroll
- CTA buttons: minimum 48px tap target, full-width on mobile
- Feature grid collapses to single column below 640px
- Lazy-load images below the fold
- Test: the primary CTA must be visible without scrolling on mobile

## Performance Targets

| Metric | Target |
|--------|--------|
| Largest Contentful Paint | Under 2.5s |
| Cumulative Layout Shift | Under 0.1 |
| First Input Delay | Under 100ms |
| Hero image format | WebP with AVIF fallback |
| Total page weight | Under 500KB initial load |

## Anti-Patterns

- Generic stock photos instead of product visuals
- Multiple competing CTAs above the fold
- Feature lists without benefits ("We have SSO" vs "Your team logs in with one click")
- Missing mobile optimization
- No social proof before the first CTA
- Pricing hidden behind "Contact Sales" for self-serve products
