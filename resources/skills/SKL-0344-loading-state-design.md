---
id: SKL-0344
name: Loading State Design
category: skills
tags: [loading, skeleton, spinner, progress-bar, optimistic-ui, perceived-performance, ux, suspense]
capabilities: [loading-state-selection, progress-indication, optimistic-rendering, loading-choreography]
useWhen:
  - choosing between skeletons, spinners, and progress bars
  - implementing optimistic UI updates
  - choreographing loading sequences across multiple components
  - building progress indicators for multi-step operations
  - reducing perceived wait time during data fetches
estimatedTokens: 650
relatedFragments: [SKL-0075, SKL-0076, PAT-0178, PAT-0051]
dependencies: []
synonyms: ["how to show loading state", "what loading indicator should I use", "how to make my app feel faster", "optimistic UI updates", "progress bar vs spinner", "loading best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Loading State Design

Every interaction that takes more than 100ms needs feedback. The type of feedback depends on how long the wait is, what caused it, and whether the outcome is predictable.

## Loading Indicator Decision Matrix

| Wait Duration | User Action | Outcome Known? | Best Indicator |
|---------------|-------------|----------------|----------------|
| < 100ms | Any | Any | **Nothing** (instant feel) |
| 100-300ms | Button click | Yes | **Optimistic update** |
| 300ms-2s | Navigation | No | **Skeleton screen** |
| 300ms-2s | Form submit | No | **Inline spinner** on button |
| 2-10s | File upload | Yes | **Progress bar** with percentage |
| 10s+ | Background job | No | **Toast + poll** or websocket |

## Optimistic Updates

Show the expected result immediately, then reconcile with the server response:

```jsx
async function toggleLike(postId) {
  // Update UI immediately
  setLiked(prev => !prev);
  setCount(prev => liked ? prev - 1 : prev + 1);

  try {
    await api.toggleLike(postId);
  } catch {
    // Revert on failure
    setLiked(prev => !prev);
    setCount(prev => liked ? prev + 1 : prev - 1);
    toast.error('Action failed. Please try again.');
  }
}
```

Rules for optimistic updates:
- Only use when the success rate is > 99% (likes, toggles, deletes)
- Always handle rollback on failure
- Never use for payments, signups, or destructive actions

## Button Loading States

```jsx
function SubmitButton({ isLoading, children }) {
  return (
    <button disabled={isLoading} aria-busy={isLoading}>
      {isLoading ? (
        <>
          <Spinner size="sm" aria-hidden="true" />
          <span className="sr-only">Submitting...</span>
        </>
      ) : children}
    </button>
  );
}
```

- Disable the button while loading to prevent double-submit
- Keep button width stable (use `min-width` or keep text)
- Use `aria-busy` for screen readers

## Progress Bars for Multi-Step Operations

```jsx
function FileUpload({ file }) {
  const [progress, setProgress] = useState(0);

  return (
    <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">{progress}% uploaded</span>
    </div>
  );
}
```

- Show percentage for deterministic operations (file upload, data export)
- Use indeterminate progress for unknown duration (API calls)
- Animate smoothly; never jump backwards

## Loading Choreography

When a page has multiple loading sections, stagger them to avoid a jarring "everything appears at once" effect:

1. Show the page shell immediately (nav, sidebar, footer)
2. Load above-the-fold content first
3. Defer below-the-fold sections
4. Use `React.Suspense` boundaries per section, not one for the whole page

## Key Takeaways

- Match the indicator type to the wait duration and predictability
- Optimistic updates make common actions feel instant but require rollback handling
- Always provide accessible loading announcements (`aria-busy`, `aria-live`)
- Never show a loading state for less than 100ms; never leave one showing for more than 10s without explanation
- Choreograph multiple loading zones to reveal progressively, not all at once
