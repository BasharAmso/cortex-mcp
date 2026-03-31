---
id: SKL-0262
name: Product Reviews & Ratings
category: skills
tags: [ecommerce, reviews, ratings, social-proof, moderation, user-generated-content]
capabilities: [review-collection, rating-aggregation, content-moderation, review-display]
useWhen:
  - adding product reviews and star ratings to a store
  - building a review moderation workflow
  - displaying social proof to improve conversion
  - collecting structured feedback from customers
  - implementing verified purchase badges for reviews
estimatedTokens: 650
relatedFragments: [SKL-0257, SKL-0141, PAT-0136, SKL-0258]
dependencies: []
synonyms: ["how to add product reviews to my store", "star rating system for ecommerce", "review moderation workflow", "how reviews impact conversion", "verified purchase review system", "user generated content for products"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Product Reviews & Ratings

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0262 |
| **Name** | Product Reviews & Ratings |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Product reviews are the most effective form of social proof in ecommerce. Products with reviews convert 3-4x better than those without. A review system must make it easy to collect feedback, moderate content, and display ratings in ways that build trust.

### Review Data Model

```
Review
├── id (uuid)
├── product_id
├── customer_id
├── order_id (links to verified purchase)
├── rating (1-5 integer)
├── title
├── body
├── status: "pending" | "approved" | "rejected"
├── verified_purchase (boolean)
├── helpful_count (upvotes from other customers)
├── images[] (optional customer photos)
├── created_at
└── admin_response (optional merchant reply)
```

### Collection Strategy

| Method | Timing | Expected Response Rate |
|--------|--------|----------------------|
| **Post-purchase email** | 7-14 days after delivery | 5-15% |
| **In-app prompt** | After product use period | 3-8% |
| **Order history page** | Passive, customer-initiated | 1-3% |
| **Incentivized** | Discount on next order for review | 15-25% |

Best practice: send a review request email 7-14 days after delivery confirmation. Include the product image, a direct link to the review form, and a one-click star rating that pre-fills the form.

### Moderation Workflow

```
Submitted → Auto-Filter → Pending Review → Approved / Rejected
                ↓
         Auto-reject if:
         - Contains profanity or spam patterns
         - Duplicate submission (same customer + product)
         - Rating without text (optional policy)
```

| Moderation Level | Approach | Trade-off |
|-----------------|----------|-----------|
| **Pre-moderation** | All reviews require approval | Safe but slow; delays social proof |
| **Post-moderation** | Publish immediately, review later | Fast display but risk of inappropriate content |
| **Auto + manual** | Auto-approve clean reviews, queue flagged ones | Best balance of speed and safety |

Recommended: auto-approve reviews that pass spam and profanity filters with a verified purchase. Queue unverified or flagged reviews for manual review.

### Display Best Practices

**Rating summary:** Show average rating, total count, and a distribution histogram (how many 5-star, 4-star, etc.). The histogram builds more trust than a single average number.

**Sort and filter options:**
- Most recent (default)
- Most helpful (by upvote count)
- Highest / lowest rating
- Filter by star rating
- Filter: verified purchases only

**Verified purchase badge:** Mark reviews from customers who actually bought the product. This is the single most trust-building element. Link reviews to order records server-side; never trust a client-submitted "verified" flag.

### Impact on Conversion

| Element | Conversion Impact |
|---------|------------------|
| Any reviews present | +190% compared to no reviews |
| 5+ reviews on a product | Trust threshold for most buyers |
| Star rating in search results | Higher click-through rate |
| Customer photos in reviews | +25% conversion lift |
| Merchant responses to negative reviews | Builds trust, shows care |

### Handling Negative Reviews

- Never delete negative reviews unless they violate content policy (profanity, spam, irrelevant)
- Respond publicly with empathy and a resolution
- Products with only 5-star reviews look suspicious; 4.2-4.7 is the trust sweet spot
- Use negative feedback to identify real product issues

### SEO Value

Reviews generate unique, keyword-rich content on product pages. Implement structured data markup (Schema.org `Review` and `AggregateRating`) so star ratings appear in search results. This increases organic click-through rates significantly.

## Key Takeaways

- Send review request emails 7-14 days after delivery for the highest response rates
- Auto-approve verified purchase reviews that pass spam filters; queue flagged ones for manual review
- Display rating histograms and verified purchase badges to build trust
- Products with 5+ reviews cross the trust threshold for most buyers
- Never delete negative reviews unless they violate policy; respond publicly instead
