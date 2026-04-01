---
id: EX-0024
name: A/B Testing Implementation
category: examples
tags: [ab-testing, experiment, variant, split-test, analytics, product, typescript]
capabilities: [experiment-setup, variant-assignment, result-tracking]
useWhen:
  - running A/B tests on features or UI changes
  - implementing client-side experiment assignment
  - tracking conversion metrics for variants
estimatedTokens: 600
relatedFragments: [SKL-0427, SKL-0428, PAT-0218, EX-0023]
dependencies: []
synonyms: ["ab test example", "split testing implementation", "experiment framework", "feature experiment", "variant testing"]
sourceUrl: "https://github.com/growthbook/growthbook"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "product-business"
---

# A/B Testing Implementation

A lightweight experiment framework with deterministic assignment and event tracking.

## Implementation

```typescript
// --- Experiment Engine ---
interface Experiment {
  id: string;
  variants: string[];      // e.g., ['control', 'variant-a', 'variant-b']
  weights: number[];        // e.g., [0.5, 0.25, 0.25]
  active: boolean;
}

// Deterministic assignment: same user always gets same variant
function assignVariant(experiment: Experiment, userId: string): string {
  if (!experiment.active) return experiment.variants[0]; // default to control

  // Simple hash: consistent across sessions without server state
  const hash = hashString(`${experiment.id}:${userId}`);
  const normalized = (hash % 10000) / 10000; // 0.0000 - 0.9999

  let cumulative = 0;
  for (let i = 0; i < experiment.weights.length; i++) {
    cumulative += experiment.weights[i];
    if (normalized < cumulative) return experiment.variants[i];
  }
  return experiment.variants[experiment.variants.length - 1];
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

// --- Event Tracking ---
interface ExperimentEvent {
  experimentId: string;
  variant: string;
  userId: string;
  event: string;       // 'viewed' | 'clicked' | 'converted'
  timestamp: number;
  metadata?: Record<string, unknown>;
}

async function trackEvent(event: ExperimentEvent): Promise<void> {
  // Batch events to avoid per-event network calls
  eventQueue.push(event);
  if (eventQueue.length >= BATCH_SIZE) {
    await flushEvents();
  }
}

// --- React Hook ---
function useExperiment(experimentId: string): { variant: string; track: (event: string) => void } {
  const userId = useUserId(); // from auth context
  const experiment = useExperimentConfig(experimentId); // from config/API

  const variant = useMemo(
    () => assignVariant(experiment, userId),
    [experiment, userId]
  );

  // Track exposure on mount
  useEffect(() => {
    trackEvent({ experimentId, variant, userId, event: 'viewed', timestamp: Date.now() });
  }, [experimentId, variant, userId]);

  const track = useCallback(
    (event: string) => trackEvent({ experimentId, variant, userId, event, timestamp: Date.now() }),
    [experimentId, variant, userId]
  );

  return { variant, track };
}

// --- Usage in Component ---
function PricingPage() {
  const { variant, track } = useExperiment('pricing-page-v2');

  return variant === 'variant-a' ? (
    <AnnualPricingLayout onConvert={() => track('converted')} />
  ) : (
    <MonthlyPricingLayout onConvert={() => track('converted')} />
  );
}
```

## Key Patterns

- **Deterministic hashing**: user always sees the same variant without server-side storage
- **Weighted distribution**: unequal splits (e.g., 90/10) for risky experiments
- **Exposure tracking**: auto-track "viewed" on mount so you know denominator for conversion rate
- **Event batching**: reduces network calls for high-traffic pages
