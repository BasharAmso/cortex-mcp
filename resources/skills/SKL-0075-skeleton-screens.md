---
id: SKL-0075
name: Skeleton Screens
category: skills
tags: [skeleton, loading, placeholder, shimmer, ux, perceived-performance, layout-shift, suspense, accessibility]
capabilities: [skeleton-design, shimmer-animation, loading-states, layout-preservation, content-placeholder]
useWhen:
  - building loading states for pages or components
  - deciding between spinners and skeleton screens
  - preventing layout shift during content loading
  - improving perceived performance while data fetches
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0074, SKL-0076, SKL-0047, PAT-0020]
dependencies: []
synonyms: ["how to show loading state", "my page jumps around when data loads", "should I use a spinner or skeleton", "grey boxes while loading", "placeholder content while fetching"]
sourceUrl: "https://github.com/enaqx/awesome-react"
lastUpdated: "2026-03-29"
difficulty: beginner
owner: builder
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

## Building Content-Shaped Skeletons

The skeleton must mirror the real content layout exactly:

```jsx
function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="h-48 w-full rounded bg-gray-200 animate-pulse" />
      <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
```

## Shimmer Animation

A shimmer (moving gradient) feels more alive than a static pulse:

```css
.skeleton-shimmer {
  background: linear-gradient(90deg, hsl(0 0% 90%) 0%, hsl(0 0% 96%) 50%, hsl(0 0% 90%) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer { animation: none; background: hsl(0 0% 90%); }
}
```

## Reusable Skeleton Primitives

Build a small set and compose them:

```jsx
function SkeletonBox({ className }) {
  return <div className={`rounded bg-gray-200 skeleton-shimmer ${className}`} />;
}

function SkeletonText({ lines = 3, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox key={i} className={`h-3 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`} />
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

The skeleton must occupy the exact same space as the real content:

```jsx
// Bad: causes CLS
{isLoading ? <Spinner /> : <UserCard user={user} />}

// Good: zero shift
{isLoading ? <UserCardSkeleton /> : <UserCard user={user} />}
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
