---
id: PAT-0178
name: Skeleton Screen Pattern
category: patterns
tags: [skeleton, loading, placeholder, shimmer, progressive-loading, layout-shift, perceived-performance]
capabilities: [skeleton-layout-matching, shimmer-animation, progressive-reveal, loading-placeholders]
useWhen:
  - replacing spinners with content-shaped placeholders
  - preventing layout shift during data loading
  - implementing shimmer animations for loading states
  - progressively revealing content as data arrives
  - building reusable skeleton primitives for a design system
estimatedTokens: 600
relatedFragments: [SKL-0075, SKL-0344, SKL-0076, PAT-0051]
dependencies: []
synonyms: ["skeleton loading screen", "shimmer placeholder pattern", "content placeholder while loading", "how to prevent layout shift", "progressive loading UI", "grey box loading state"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Skeleton Screen Pattern

Skeleton screens replace empty space or spinners with content-shaped placeholders that match the layout of the real content. Research shows users perceive skeleton screens as 15-30% faster than equivalent spinners because the layout feels "already loaded."

## Pattern Structure

```
┌─────────────────────────────┐
│ ████  ██████████████        │  ← Header skeleton (avatar + title)
│                             │
│ █████████████████████████   │  ← Text line (full width)
│ ████████████████████        │  ← Text line (80% width)
│ ██████████████              │  ← Text line (60% width, last line shorter)
│                             │
│ ┌──────┐ ┌──────┐ ┌──────┐ │  ← Card grid skeleton
│ │      │ │      │ │      │ │
│ └──────┘ └──────┘ └──────┘ │
└─────────────────────────────┘
```

## Implementation Rules

### 1. Match the Layout Exactly

The skeleton must occupy the same dimensions as the real content. This is the single most important rule because it prevents Cumulative Layout Shift (CLS).

```jsx
// Real component
function UserCard({ user }) {
  return (
    <div className="flex gap-3 p-4">
      <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
      <div>
        <p className="h-5 font-medium">{user.name}</p>
        <p className="h-4 text-sm text-gray-500">{user.role}</p>
      </div>
    </div>
  );
}

// Skeleton version — same dimensions
function UserCardSkeleton() {
  return (
    <div className="flex gap-3 p-4">
      <div className="h-10 w-10 rounded-full bg-gray-200 skeleton-shimmer" />
      <div className="space-y-2 flex-1">
        <div className="h-5 w-32 rounded bg-gray-200 skeleton-shimmer" />
        <div className="h-4 w-24 rounded bg-gray-200 skeleton-shimmer" />
      </div>
    </div>
  );
}
```

### 2. Shimmer Over Pulse

A shimmer (moving gradient) communicates activity better than a static pulse:

```css
.skeleton-shimmer {
  background: linear-gradient(90deg, hsl(0 0% 90%) 25%, hsl(0 0% 96%) 50%, hsl(0 0% 90%) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer { animation: none; }
}
```

### 3. Progressive Reveal

Load sections independently so content appears progressively:

```jsx
<Suspense fallback={<HeaderSkeleton />}>
  <Header />
</Suspense>
<Suspense fallback={<ContentSkeleton />}>
  <MainContent />
</Suspense>
<Suspense fallback={<SidebarSkeleton />}>
  <Sidebar />
</Suspense>
```

### 4. List Skeleton Counts

- Show 3-5 skeleton items for lists (not 1, not 20)
- Match the expected number of items if known (e.g., pagination size)
- Vary skeleton widths slightly to look natural (100%, 85%, 70%)

## When NOT to Use Skeletons

| Situation | Use Instead |
|-----------|-------------|
| User-triggered action (form submit) | Button spinner or progress bar |
| Error retry | Inline spinner with "Retrying..." text |
| Less than 200ms load time | Nothing; content will appear fast enough |
| File upload or export | Progress bar with percentage |

## Anti-Patterns

- Skeleton with wrong dimensions (causes layout shift on content load)
- Showing a skeleton for more than 3 seconds without explanation
- Using bright or branded colors for skeleton shapes
- Skeleton that doesn't match dark mode (should use dark-appropriate greys)

## Key Takeaways

- Skeleton dimensions must exactly match real content dimensions to prevent layout shift
- Use shimmer animation with a reduced-motion fallback
- Show 3-5 skeleton items for lists; the last text line should be shorter for natural appearance
- Wrap each section in its own Suspense boundary for progressive reveal
- Never show a skeleton longer than 3 seconds; if data takes that long, something else is wrong
