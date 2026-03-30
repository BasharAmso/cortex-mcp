---
id: SKL-0074
name: Skeleton Screens
category: skills
tags: [skeleton, loading, placeholder, shimmer, ux, perceived-performance, layout-shift]
capabilities: [skeleton-design, shimmer-animation, loading-states, layout-preservation, content-placeholder]
useWhen:
  - building loading states for pages or components
  - deciding between spinners and skeleton screens
  - preventing layout shift during content loading
  - improving perceived performance while data fetches
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0073, SKL-0075, SKL-0046, PAT-0020]
dependencies: []
synonyms: ["how to show loading state", "my page jumps around when data loads", "should I use a spinner or skeleton", "grey boxes while loading", "placeholder content while fetching"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Skeleton Screens

Replace loading spinners with content-shaped placeholders that match the layout of the real content. Users perceive skeleton screens as 15-30% faster than spinners.

## When to Use Skeletons vs Spinners

| Situation | Use | Why |
|-----------|-----|-----|
| Page or section loading (> 300ms) | **Skeleton** | Preserves layout, feels faster |
| Quick action (< 300ms) | **Nothing** | Content appears fast enough |
| Form submission or file upload | **Progress bar / spinner** | User needs to know something is happening |
| Infinite scroll loading more items | **Skeleton rows** | Maintains scroll context |
| Full page loading (first visit) | **Skeleton** | Prevents blank screen |
| Error followed by retry | **Spinner** | User triggered the action, expects feedback |

**Rule of thumb:** If the content has a predictable shape, use a skeleton. If the wait is action-triggered and short, use a spinner.

## Building Content-Shaped Skeletons

The skeleton should mirror the real content layout exactly. Not a generic grey box, but shapes that match headings, text lines, avatars, and images.

```jsx
// Card skeleton that matches the real card layout
function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      {/* Image placeholder */}
      <div className="h-48 w-full rounded bg-gray-200 animate-pulse" />

      {/* Title placeholder */}
      <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />

      {/* Description placeholder - two lines */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Meta info placeholder */}
      <div className="flex gap-2">
        <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
```

## Shimmer Animation

A shimmer (moving gradient) feels more alive than a static pulse.

```css
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    hsl(0 0% 90%) 0%,
    hsl(0 0% 96%) 50%,
    hsl(0 0% 90%) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation: none;
    background: hsl(0 0% 90%);
  }
}
```

## Reusable Skeleton Primitives

Build a small set of primitives and compose them:

```jsx
function SkeletonBox({ className }) {
  return <div className={`rounded bg-gray-200 skeleton-shimmer ${className}`} />;
}

function SkeletonText({ lines = 3, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox
          key={i}
          className={`h-3 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({ size = 'md' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' };
  return <SkeletonBox className={`rounded-full ${sizes[size]}`} />;
}
```

## Preventing Layout Shift

The skeleton must occupy the exact same space as the real content. If it does not, the page jumps when content loads (bad CLS).

**Before (causes shift):**
```jsx
{isLoading ? <Spinner /> : <UserCard user={user} />}
```

**After (no shift):**
```jsx
{isLoading ? <UserCardSkeleton /> : <UserCard user={user} />}
```

The `UserCardSkeleton` must have the same height, width, and spacing as `UserCard`.

## Page-Level Skeleton Pattern

```jsx
function DashboardPage() {
  const { data, isLoading } = useQuery(['dashboard'], fetchDashboard);

  if (isLoading) return <DashboardSkeleton />;

  return <Dashboard data={data} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <SkeletonBox className="h-8 w-48" />
        <SkeletonBox className="h-10 w-32 rounded-md" />
      </div>
      {/* Metrics grid skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
      </div>
      {/* Table skeleton */}
      <SkeletonText lines={8} />
    </div>
  );
}
```

## Quick Win Checklist

- [ ] Replace all full-page spinners with content-shaped skeletons
- [ ] Use shimmer animation instead of static grey (with reduced-motion fallback)
- [ ] Match skeleton dimensions exactly to real content dimensions
- [ ] Build reusable skeleton primitives (SkeletonBox, SkeletonText, SkeletonAvatar)
- [ ] Test that switching from skeleton to content causes zero layout shift
- [ ] For lists, show 3-5 skeleton items (not 1, not 20)

## Key Constraints

- Never show a skeleton for longer than 3 seconds. If data takes that long, something else is wrong.
- Always respect `prefers-reduced-motion` for shimmer animations.
- Skeleton color should be subtle (gray-200 range), never bright or distracting.
- The last text line in a skeleton group should be shorter (w-4/5) to look natural.
