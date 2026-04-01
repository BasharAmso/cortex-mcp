---
id: EX-0048
name: Product Recommendation Engine
category: examples
tags: [ecommerce, recommendations, collaborative-filtering, machine-learning, similarity, typescript, personalization]
capabilities: [collaborative-filtering, co-purchase-matrix, similarity-scoring, recommendation-generation]
useWhen:
  - building "frequently bought together" product recommendations
  - implementing collaborative filtering for an e-commerce store
  - generating personalized product suggestions from purchase history
estimatedTokens: 620
relatedFragments: [PAT-0140, SKL-0257, EX-0019]
dependencies: []
synonyms: ["product suggestions", "frequently bought together", "recommendation system", "collaborative filter engine", "purchase-based recommendations"]
sourceUrl: "https://github.com/gorse-io/gorse"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "ecommerce"
---

# Product Recommendation Engine

Collaborative filtering with co-purchase matrix and similarity scoring for product recommendations.

## Implementation

```typescript
// --- Types ---
interface Purchase {
  userId: string;
  productId: string;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Recommendation {
  productId: string;
  score: number;
  reason: 'co-purchase' | 'similar-users' | 'trending';
}

// --- Co-Purchase Matrix ---
class CoPurchaseMatrix {
  private matrix = new Map<string, Map<string, number>>();

  build(purchases: Purchase[]): void {
    // Group purchases by user
    const userPurchases = new Map<string, string[]>();
    for (const p of purchases) {
      const list = userPurchases.get(p.userId) ?? [];
      list.push(p.productId);
      userPurchases.set(p.userId, list);
    }

    // Count co-occurrences within each user's purchases
    for (const products of userPurchases.values()) {
      for (let i = 0; i < products.length; i++) {
        for (let j = i + 1; j < products.length; j++) {
          this.increment(products[i], products[j]);
          this.increment(products[j], products[i]);
        }
      }
    }
  }

  private increment(a: string, b: string): void {
    if (!this.matrix.has(a)) this.matrix.set(a, new Map());
    const row = this.matrix.get(a)!;
    row.set(b, (row.get(b) ?? 0) + 1);
  }

  getRelated(productId: string, limit: number): Array<{ productId: string; count: number }> {
    const row = this.matrix.get(productId);
    if (!row) return [];
    return [...row.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId, count]) => ({ productId, count }));
  }
}

// --- Cosine Similarity Between Users ---
function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, magA = 0, magB = 0;

  for (const [key, valA] of a) {
    magA += valA * valA;
    const valB = b.get(key) ?? 0;
    dot += valA * valB;
  }
  for (const valB of b.values()) {
    magB += valB * valB;
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  return magnitude === 0 ? 0 : dot / magnitude;
}

// --- Recommendation Engine ---
class RecommendationEngine {
  private coPurchase = new CoPurchaseMatrix();
  private userVectors = new Map<string, Map<string, number>>();

  train(purchases: Purchase[]): void {
    this.coPurchase.build(purchases);

    // Build user purchase frequency vectors
    for (const p of purchases) {
      if (!this.userVectors.has(p.userId)) this.userVectors.set(p.userId, new Map());
      const vec = this.userVectors.get(p.userId)!;
      vec.set(p.productId, (vec.get(p.productId) ?? 0) + 1);
    }
  }

  recommend(userId: string, currentCart: string[], limit = 5): Recommendation[] {
    const recommendations = new Map<string, Recommendation>();
    const owned = new Set(this.userVectors.get(userId)?.keys() ?? []);

    // 1. Co-purchase recommendations from cart items
    for (const cartItem of currentCart) {
      for (const related of this.coPurchase.getRelated(cartItem, 10)) {
        if (owned.has(related.productId) || currentCart.includes(related.productId)) continue;
        const existing = recommendations.get(related.productId);
        const score = related.count * 10;
        if (!existing || existing.score < score) {
          recommendations.set(related.productId, { productId: related.productId, score, reason: 'co-purchase' });
        }
      }
    }

    // 2. Similar user recommendations
    const userVec = this.userVectors.get(userId);
    if (userVec) {
      const similarities: Array<{ userId: string; sim: number }> = [];
      for (const [otherId, otherVec] of this.userVectors) {
        if (otherId === userId) continue;
        similarities.push({ userId: otherId, sim: cosineSimilarity(userVec, otherVec) });
      }
      similarities.sort((a, b) => b.sim - a.sim);

      for (const { userId: simUser, sim } of similarities.slice(0, 5)) {
        for (const [productId] of this.userVectors.get(simUser)!) {
          if (owned.has(productId) || currentCart.includes(productId)) continue;
          const score = Math.round(sim * 100);
          if (!recommendations.has(productId) || recommendations.get(productId)!.score < score) {
            recommendations.set(productId, { productId, score, reason: 'similar-users' });
          }
        }
      }
    }

    return [...recommendations.values()].sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
```

## Key Patterns

- **Co-purchase matrix**: counts how often products are bought together across all users
- **Cosine similarity**: measures user overlap by treating purchase counts as vectors
- **Hybrid scoring**: combines co-purchase frequency and user similarity for better recommendations
- **Exclusion filtering**: removes items already owned or in cart from suggestions
