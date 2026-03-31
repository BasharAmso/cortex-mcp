---
id: SKL-0289
name: Educational Content Marketplace
category: skills
tags: [marketplace, course-selling, licensing, instructor-tools, payments, content-preview, digital-commerce]
capabilities: [marketplace-architecture, course-commerce, instructor-onboarding, content-licensing-models]
useWhen:
  - building a platform where instructors sell courses
  - designing content licensing and revenue sharing models
  - implementing course preview and trial access
  - creating instructor dashboards with earnings and analytics
  - adding payment processing for digital educational content
estimatedTokens: 650
relatedFragments: [SKL-0147, SKL-0290, PAT-0149, PAT-0150]
dependencies: []
synonyms: ["how to build a course marketplace", "selling online courses on my platform", "instructor revenue sharing model", "how to let teachers sell content", "course licensing and pricing", "Udemy-like marketplace architecture"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/sharetribe/sharetribe"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Skill: Educational Content Marketplace

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0289 |
| **Name** | Educational Content Marketplace |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

An educational content marketplace connects instructors who create courses with learners who buy them. The platform's role is discovery, transactions, and trust — not content creation itself. Architecture draws from general marketplace patterns (listing, search, transaction, review) adapted for digital educational goods.

### Three-Sided Model

The marketplace serves three roles:

| Role | Needs | Platform Provides |
|------|-------|-------------------|
| **Instructor** | Audience, payments, tools | Publishing pipeline, analytics, payouts |
| **Learner** | Quality content, fair pricing | Search, reviews, previews, refund policy |
| **Platform** | Sustainable revenue | Commission on transactions, featured placement fees |

### Listing and Discovery

Each course listing needs structured metadata for search and filtering:
- Title, description, learning objectives, prerequisites
- Category and subcategory taxonomy (e.g., Programming > Python > Data Science)
- Difficulty level, estimated duration, language
- Instructor profile with bio, credentials, and rating
- Price, discount eligibility, bundle membership

Search should combine full-text search on title/description with faceted filtering on category, price range, difficulty, rating, and language. Sort options: relevance, popularity (enrollments), rating, newest, price.

### Pricing and Licensing Models

Support multiple pricing strategies per listing:

1. **One-time purchase** — Learner pays once for lifetime access
2. **Subscription** — Monthly/annual access to the full catalog or a subset (platform-level subscription, not per-course)
3. **Tiered pricing** — Base content free, premium modules paid (works well with content dripping)
4. **Bundle pricing** — Discounted access to a curated set of courses
5. **Institutional licensing** — Bulk seat purchases for schools or companies with admin assignment

Revenue split: Industry standard ranges from 50/50 to 70/30 (instructor/platform). Use Stripe Connect for split payments — the platform charges, takes its commission, and transfers the remainder to the instructor's connected account.

### Course Preview and Trust

Previews drive conversion. Implement:
- **Free preview lessons** — Instructor marks 1-3 lessons as free. These are fully functional (video plays, quiz works) but clearly labeled as preview.
- **Table of contents** — Full module/lesson outline visible before purchase
- **Ratings and reviews** — Only verified purchasers can review. Display average rating, count, and distribution histogram.
- **Refund policy** — Time-based (e.g., 30-day) or progress-based (e.g., before completing 20% of content). Automate approval within policy; flag edge cases for manual review.

### Instructor Dashboard

Instructors need visibility into their business:
- **Earnings** — Total revenue, commission breakdown, pending payouts, payout history
- **Enrollment analytics** — New enrollments over time, completion rates, drop-off points
- **Review management** — View and respond to reviews
- **Content management** — Draft, published, and archived courses with inline editing
- **Promotion tools** — Create discount coupons, schedule sales, share referral links

### Content Protection

Digital content needs basic protection:
- Serve video through signed URLs with short expiration (15 minutes)
- Disable right-click download on video players (deterrent, not bulletproof)
- Watermark PDF downloads with the purchaser's email
- Rate-limit content API endpoints per user session

## Key Takeaways

- Use Stripe Connect for split payments — it handles instructor payouts, tax reporting, and platform commission in one integration
- Free preview lessons are the highest-converting trust signal; make them fully functional, not teaser clips
- Ratings from verified purchasers only; fake reviews destroy marketplace trust
- Institutional licensing (bulk seats) is often higher revenue than individual sales
- Content protection is deterrent-based — prioritize convenience over DRM arms races
