---
id: EX-0031
name: Competitor Analysis Framework
category: examples
tags: [competitor, analysis, market-research, comparison, scoring, matrix, typescript]
capabilities: [competitor-scoring, comparison-matrix, gap-analysis]
useWhen:
  - collecting structured data about competitors
  - building a weighted scoring matrix across product dimensions
  - identifying competitive gaps and differentiation opportunities
estimatedTokens: 620
relatedFragments: [SKL-0217, SKL-0218, PAT-0115]
dependencies: []
synonyms: ["competitor analysis example", "competitive matrix", "market comparison tool", "competitive landscape", "product benchmarking"]
sourceUrl: "https://github.com/petergarnaes/competitive-analysis"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "market-research"
---

# Competitor Analysis Framework

Structured competitor data collection, weighted scoring, and comparison matrix generation.

## Implementation

```typescript
// --- Data Model ---
interface Competitor {
  id: string;
  name: string;
  website: string;
  pricing: PricingTier[];
  features: Record<string, boolean>;
  scores: DimensionScore[];
  strengths: string[];
  weaknesses: string[];
  lastUpdated: Date;
}

interface PricingTier {
  name: string;
  priceMonthly: number; // cents
  features: string[];
}

interface DimensionScore {
  dimension: string;
  score: number; // 1-10
  evidence: string;
}

interface ComparisonDimension {
  name: string;
  weight: number; // 0-1, all weights should sum to 1
  description: string;
}

// --- Scoring Engine ---
const DEFAULT_DIMENSIONS: ComparisonDimension[] = [
  { name: 'ux-quality', weight: 0.20, description: 'User experience and design polish' },
  { name: 'feature-depth', weight: 0.20, description: 'Breadth and depth of features' },
  { name: 'pricing-value', weight: 0.15, description: 'Price relative to value delivered' },
  { name: 'integration-ecosystem', weight: 0.15, description: 'Third-party integrations available' },
  { name: 'documentation', weight: 0.10, description: 'Quality of docs and onboarding' },
  { name: 'market-presence', weight: 0.10, description: 'Brand recognition and user base' },
  { name: 'support-quality', weight: 0.10, description: 'Customer support responsiveness' },
];

function computeWeightedScore(competitor: Competitor, dimensions: ComparisonDimension[]): number {
  let total = 0;
  for (const dim of dimensions) {
    const ds = competitor.scores.find(s => s.dimension === dim.name);
    total += (ds?.score ?? 0) * dim.weight;
  }
  return Math.round(total * 100) / 100;
}

// --- Comparison Matrix ---
interface MatrixRow {
  competitorName: string;
  dimensionScores: Record<string, number>;
  weightedTotal: number;
  rank: number;
}

function buildComparisonMatrix(
  competitors: Competitor[],
  dimensions: ComparisonDimension[] = DEFAULT_DIMENSIONS,
): MatrixRow[] {
  const rows: MatrixRow[] = competitors.map(c => {
    const dimensionScores: Record<string, number> = {};
    for (const dim of dimensions) {
      const ds = c.scores.find(s => s.dimension === dim.name);
      dimensionScores[dim.name] = ds?.score ?? 0;
    }

    return {
      competitorName: c.name,
      dimensionScores,
      weightedTotal: computeWeightedScore(c, dimensions),
      rank: 0,
    };
  });

  rows.sort((a, b) => b.weightedTotal - a.weightedTotal);
  rows.forEach((row, i) => (row.rank = i + 1));

  return rows;
}

// --- Gap Analysis ---
interface GapInsight {
  dimension: string;
  yourScore: number;
  bestScore: number;
  leader: string;
  gap: number;
  priority: 'high' | 'medium' | 'low';
}

function findGaps(
  yourProduct: Competitor,
  competitors: Competitor[],
  dimensions: ComparisonDimension[],
): GapInsight[] {
  return dimensions.map(dim => {
    const yourDs = yourProduct.scores.find(s => s.dimension === dim.name);
    const yourScore = yourDs?.score ?? 0;

    let bestScore = 0;
    let leader = '';
    for (const c of competitors) {
      const ds = c.scores.find(s => s.dimension === dim.name);
      if ((ds?.score ?? 0) > bestScore) {
        bestScore = ds?.score ?? 0;
        leader = c.name;
      }
    }

    const gap = bestScore - yourScore;
    const priority = gap >= 4 ? 'high' : gap >= 2 ? 'medium' : 'low';

    return { dimension: dim.name, yourScore, bestScore, leader, gap, priority };
  }).sort((a, b) => b.gap - a.gap);
}

// --- Usage ---
const matrix = buildComparisonMatrix(competitors);
matrix.forEach(row =>
  console.log(`#${row.rank} ${row.competitorName}: ${row.weightedTotal}/10`)
);
```

## Key Patterns

- **Weighted dimensions**: configurable weights let you emphasize what matters most to your market segment
- **Evidence-backed scores**: every dimension score requires an evidence string to prevent bias
- **Gap analysis**: automatically identifies where you trail the leader and flags high-priority gaps
- **Pricing tier comparison**: structured pricing data enables apples-to-apples price/value analysis
