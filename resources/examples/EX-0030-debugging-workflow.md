---
id: EX-0030
name: Debugging Workflow
category: examples
tags: [debugging, bisect, logging, tracing, assertions, hypothesis-testing, typescript]
capabilities: [binary-search-debugging, trace-decoration, assertion-helpers]
useWhen:
  - systematically narrowing down a bug with binary search
  - adding structured trace logging to understand execution flow
  - building assertion helpers for runtime invariant checking
estimatedTokens: 640
relatedFragments: [SKL-0159, SKL-0157, PAT-0084]
dependencies: []
synonyms: ["debugging example", "bisect debugging", "trace logging", "bug hunting workflow", "systematic debugging"]
sourceUrl: "https://github.com/nicolo-ribaudo/tc39-proposal-decorators"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "coding-literacy"
---

# Debugging Workflow

Systematic debugging utilities: binary search bisect, trace decorator, and runtime assertion helpers.

## Implementation

```typescript
// --- Binary Search Bisect ---
interface BisectResult<T> {
  culprit: T;
  steps: number;
  testedItems: T[];
}

async function bisect<T>(
  items: T[],
  testFn: (subset: T[]) => Promise<boolean>,
): Promise<BisectResult<T>> {
  let lo = 0;
  let hi = items.length - 1;
  let steps = 0;
  const tested: T[] = [];

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const subset = items.slice(0, mid + 1);
    steps++;
    tested.push(items[mid]);

    const passesWith = await testFn(subset);
    if (passesWith) {
      lo = mid + 1; // bug is introduced after mid
    } else {
      hi = mid; // bug is in this half
    }
  }

  return { culprit: items[lo], steps, testedItems: tested };
}

// --- Trace Decorator ---
interface TraceEntry {
  method: string;
  args: unknown[];
  result?: unknown;
  error?: string;
  durationMs: number;
  timestamp: number;
}

const traceLog: TraceEntry[] = [];

function trace(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const start = performance.now();
    const entry: TraceEntry = {
      method: propertyKey,
      args,
      durationMs: 0,
      timestamp: Date.now(),
    };

    try {
      const result = original.apply(this, args);
      entry.result = result;
      return result;
    } catch (err) {
      entry.error = err instanceof Error ? err.message : String(err);
      throw err;
    } finally {
      entry.durationMs = performance.now() - start;
      traceLog.push(entry);
    }
  };
  return descriptor;
}

// --- Assertion Helpers ---
class AssertionError extends Error {
  constructor(message: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'AssertionError';
  }
}

function assert(condition: boolean, message: string, context?: Record<string, unknown>): asserts condition {
  if (!condition) {
    console.error('Assertion failed:', message, context);
    throw new AssertionError(message, context);
  }
}

function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
  assert(value != null, `Expected ${name} to be defined`, { actual: value });
}

function assertNever(value: never, message?: string): never {
  throw new AssertionError(message ?? `Unexpected value: ${value}`, { value });
}

// --- Snapshot Comparator (diff helper) ---
function diffObjects(expected: Record<string, unknown>, actual: Record<string, unknown>): string[] {
  const diffs: string[] = [];
  const allKeys = new Set([...Object.keys(expected), ...Object.keys(actual)]);

  for (const key of allKeys) {
    if (JSON.stringify(expected[key]) !== JSON.stringify(actual[key])) {
      diffs.push(`  ${key}: expected=${JSON.stringify(expected[key])}, actual=${JSON.stringify(actual[key])}`);
    }
  }
  return diffs;
}

// --- Usage ---
// Bisect: find which commit broke the build
const commits = ['a1b2', 'c3d4', 'e5f6', 'g7h8', 'i9j0'];
bisect(commits, async (subset) => {
  // return true if tests pass with this subset applied
  return subset.length <= 3; // simulated: breaks at commit 4
}).then(result => {
  console.log(`Bug introduced by: ${result.culprit} (found in ${result.steps} steps)`);
});

// Trace log inspection
console.log('Recent traces:', traceLog.slice(-5));
```

## Key Patterns

- **Binary search bisect**: O(log n) isolation of the breaking change, works with commits, config flags, or data items
- **Trace decorator**: non-invasive method logging with timing, captures args and return values for post-mortem analysis
- **Typed assertions**: `asserts condition` narrows TypeScript types while providing runtime safety
- **Object diffing**: quick structural comparison to spot unexpected state changes
