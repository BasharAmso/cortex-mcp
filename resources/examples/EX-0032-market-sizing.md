---
id: EX-0032
name: Market Sizing Calculator
category: examples
tags: [market-sizing, tam, sam, som, top-down, bottom-up, finance, typescript]
capabilities: [tam-sam-som-calculation, top-down-sizing, bottom-up-sizing]
useWhen:
  - estimating total addressable market for a product idea
  - building a bottom-up market size model from unit economics
  - comparing top-down vs bottom-up market estimates
estimatedTokens: 600
relatedFragments: [SKL-0218, SKL-0219, PAT-0114]
dependencies: []
synonyms: ["market sizing example", "tam sam som calculator", "addressable market estimate", "market opportunity model", "market size analysis"]
sourceUrl: "https://github.com/bridgewater-associates/research-models"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "market-research"
---

# Market Sizing Calculator

TAM/SAM/SOM calculation with both top-down and bottom-up approaches, plus confidence scoring.

## Implementation

```typescript
// --- Data Model ---
interface MarketSizeEstimate {
  tam: number; // Total Addressable Market (USD)
  sam: number; // Serviceable Addressable Market (USD)
  som: number; // Serviceable Obtainable Market (USD)
  method: 'top-down' | 'bottom-up';
  assumptions: Assumption[];
  confidence: number; // 0-1
}

interface Assumption {
  label: string;
  value: number;
  unit: string;
  source: string;
  confidence: 'high' | 'medium' | 'low';
}

interface TopDownInputs {
  totalMarketValue: number;
  geographicFilterPct: number;   // 0-1
  segmentFilterPct: number;      // 0-1
  reachableSharePct: number;     // 0-1 (realistic capture rate)
}

interface BottomUpInputs {
  totalTargetCustomers: number;
  purchaseProbability: number;   // 0-1
  avgRevenuePerCustomer: number; // USD per year
  geographicReachPct: number;    // 0-1
  marketSharePct: number;        // 0-1
}

// --- Top-Down Calculation ---
function calculateTopDown(inputs: TopDownInputs, assumptions: Assumption[]): MarketSizeEstimate {
  const tam = inputs.totalMarketValue;
  const sam = tam * inputs.geographicFilterPct * inputs.segmentFilterPct;
  const som = sam * inputs.reachableSharePct;

  const confidence = computeConfidence(assumptions);

  return { tam, sam, som, method: 'top-down', assumptions, confidence };
}

// --- Bottom-Up Calculation ---
function calculateBottomUp(inputs: BottomUpInputs, assumptions: Assumption[]): MarketSizeEstimate {
  const potentialCustomers = inputs.totalTargetCustomers * inputs.purchaseProbability;
  const tam = inputs.totalTargetCustomers * inputs.avgRevenuePerCustomer;
  const sam = tam * inputs.geographicReachPct;
  const som = potentialCustomers * inputs.avgRevenuePerCustomer * inputs.marketSharePct;

  const confidence = computeConfidence(assumptions);

  return { tam, sam, som, method: 'bottom-up', assumptions, confidence };
}

// --- Confidence Scoring ---
function computeConfidence(assumptions: Assumption[]): number {
  if (assumptions.length === 0) return 0;

  const weights = { high: 1.0, medium: 0.6, low: 0.3 };
  const total = assumptions.reduce((sum, a) => sum + weights[a.confidence], 0);
  return Math.round((total / assumptions.length) * 100) / 100;
}

// --- Reconciliation ---
interface ReconciliationResult {
  topDown: MarketSizeEstimate;
  bottomUp: MarketSizeEstimate;
  divergencePct: number;
  recommendation: string;
}

function reconcile(topDown: MarketSizeEstimate, bottomUp: MarketSizeEstimate): ReconciliationResult {
  const avgSom = (topDown.som + bottomUp.som) / 2;
  const divergence = Math.abs(topDown.som - bottomUp.som) / avgSom;

  let recommendation: string;
  if (divergence < 0.2) {
    recommendation = 'Estimates converge well. Use the average SOM for planning.';
  } else if (divergence < 0.5) {
    recommendation = 'Moderate divergence. Review assumptions with the widest confidence gaps.';
  } else {
    recommendation = 'High divergence. Revisit core assumptions before using these numbers.';
  }

  return {
    topDown,
    bottomUp,
    divergencePct: Math.round(divergence * 100),
    recommendation,
  };
}

// --- Formatting ---
function formatUSD(cents: number): string {
  if (cents >= 1_000_000_000) return `$${(cents / 1_000_000_000).toFixed(1)}B`;
  if (cents >= 1_000_000) return `$${(cents / 1_000_000).toFixed(1)}M`;
  if (cents >= 1_000) return `$${(cents / 1_000).toFixed(0)}K`;
  return `$${cents}`;
}

// --- Usage ---
const topDown = calculateTopDown(
  { totalMarketValue: 50_000_000_000, geographicFilterPct: 0.35, segmentFilterPct: 0.20, reachableSharePct: 0.02 },
  [{ label: 'Global SaaS market', value: 50e9, unit: 'USD', source: 'Gartner 2025', confidence: 'high' }],
);

const bottomUp = calculateBottomUp(
  { totalTargetCustomers: 500_000, purchaseProbability: 0.15, avgRevenuePerCustomer: 1_200, geographicReachPct: 0.35, marketSharePct: 0.03 },
  [{ label: 'SMB count in segment', value: 500_000, unit: 'businesses', source: 'Census Bureau', confidence: 'medium' }],
);

const result = reconcile(topDown, bottomUp);
console.log(`Top-down SOM: ${formatUSD(topDown.som)}, Bottom-up SOM: ${formatUSD(bottomUp.som)}`);
console.log(`Divergence: ${result.divergencePct}% - ${result.recommendation}`);
```

## Key Patterns

- **Dual approach**: top-down (industry reports) and bottom-up (unit economics) provide independent validation
- **Assumption tracking**: every number has a source and confidence level for investor-ready rigor
- **Reconciliation**: divergence percentage flags when your two estimates disagree, guiding further research
- **Confidence scoring**: weighted average of assumption confidence gives an overall reliability signal
