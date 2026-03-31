---
id: PAT-0140
name: Recommendation Engine Pattern
category: patterns
tags: [recommendations, collaborative-filtering, cross-sell, upsell, personalization, ecommerce]
capabilities: [product-recommendations, cross-sell-placement, collaborative-filtering, purchase-correlation]
useWhen:
  - adding "customers also bought" suggestions to product pages
  - building cross-sell and upsell placements in cart or checkout
  - implementing personalized product recommendations
  - designing a recommendation data pipeline for an ecommerce store
  - choosing between collaborative filtering and rule-based recommendations
estimatedTokens: 650
relatedFragments: [SKL-0269, PAT-0142, SKL-0271]
dependencies: []
synonyms: ["how to build product recommendations", "customers also bought feature", "cross-sell and upsell implementation", "personalized product suggestions", "recommendation algorithm for ecommerce", "how to increase average order value with recommendations"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Recommendation Engine Pattern

Product recommendations drive 10-30% of ecommerce revenue. Start with simple co-purchase rules before investing in ML models.

## Recommendation Strategies (Simplest to Most Complex)

| Strategy | Data Needed | Best Placement | Effort |
|----------|------------|----------------|--------|
| **Manual curation** | None (merchant picks) | Featured collections, homepage | Low |
| **Co-purchase rules** | Order history | Product page, cart | Low |
| **Collaborative filtering** | User-item interaction matrix | Product page, homepage | Medium |
| **Content-based** | Product attributes, embeddings | Search results, category pages | Medium |
| **Hybrid (CF + content)** | Both | Everywhere | High |

## Co-Purchase Implementation

The simplest effective recommendation: "Customers who bought X also bought Y." Build a co-purchase matrix from order history.

```sql
-- Find products frequently bought together
SELECT oi2.product_id AS recommended,
       COUNT(*) AS co_purchase_count
FROM order_items oi1
JOIN order_items oi2
  ON oi1.order_id = oi2.order_id
  AND oi1.product_id != oi2.product_id
WHERE oi1.product_id = :current_product
GROUP BY oi2.product_id
ORDER BY co_purchase_count DESC
LIMIT 8;
```

Recompute nightly. Cache results per product. This handles 80% of the value with minimal infrastructure.

## Placement Strategy

Where you show recommendations matters as much as what you recommend:

- **Product page**: "Customers also bought" (co-purchase), "Similar items" (content-based). Place below the fold or in a sidebar.
- **Cart/drawer**: "Complete your order" cross-sells. Show complementary items (case for a phone, batteries for a toy). Limit to 2-3 items to avoid decision fatigue.
- **Post-purchase**: "You might also like" in order confirmation email. Higher engagement than on-site because the buyer is in a purchasing mindset.
- **Homepage**: Personalized "Recommended for you" for returning visitors. Fall back to "Best sellers" for anonymous visitors.

## Filtering and Guardrails

- Never recommend items already in the cart
- Exclude out-of-stock products
- Exclude items the customer purchased in the last 30 days (unless consumable)
- Respect category boundaries for "similar items" (do not recommend electronics on a clothing page)
- Cap recommendation freshness: re-score when a product has not been purchased in 90 days

## Measuring Effectiveness

Track per placement: click-through rate (CTR), add-to-cart rate, and revenue attributed to recommendations. A/B test recommendation algorithms against "most popular" as the baseline. A good recommendation widget achieves 3-5% CTR and 1-2% add-to-cart rate.

## Key Takeaways

- Start with co-purchase rules computed from order history; they outperform random suggestions immediately
- Place recommendations at product page, cart, and post-purchase email for maximum impact
- Filter out in-cart, out-of-stock, and recently purchased items to maintain relevance
- Measure click-through and add-to-cart rates per placement, not just overall revenue lift
- Graduate to collaborative filtering only after you have sufficient order volume (1,000+ orders)
