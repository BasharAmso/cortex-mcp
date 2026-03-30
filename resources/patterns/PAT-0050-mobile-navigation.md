---
id: PAT-0050
name: Mobile Navigation
category: patterns
tags: [mobile, navigation, tab-bar, bottom-sheet, hamburger-menu, gestures, safe-area, thumb-zone]
capabilities: [mobile-nav-design, tab-bar-layout, bottom-sheet-patterns, gesture-navigation, safe-area-handling]
useWhen:
  - designing navigation for a mobile app or responsive site
  - choosing between tab bars, hamburger menus, and bottom sheets
  - implementing gesture-based navigation
  - handling safe areas and notches on modern devices
  - optimizing tap targets for thumb reachability
estimatedTokens: 650
relatedFragments: [SKL-0007, SKL-0003, SKL-0005, PAT-0048]
dependencies: []
synonyms: ["how to navigate a mobile app", "tab bar vs hamburger menu", "bottom navigation design", "swipe gestures for navigation", "thumb-friendly mobile layout", "mobile menu patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/alexpate/awesome-design-systems"
difficulty: intermediate
owner: builder
---

# Mobile Navigation

Navigation determines whether a mobile app feels intuitive or frustrating. Design for the thumb zone first, keep primary actions within easy reach, and reserve hidden navigation for secondary paths.

## Navigation Pattern Decision Tree

| Scenario | Recommended Pattern |
|----------|-------------------|
| 2-5 top-level sections | Bottom tab bar |
| 6+ sections or deep hierarchy | Hamburger drawer + tabs for top 3-4 |
| Single content feed | Minimal (top bar + contextual actions) |
| Settings or secondary pages | Stack navigation with back arrow |
| Contextual actions on content | Bottom sheet |
| Media or immersive content | Gesture navigation (swipe) |

## Bottom Tab Bar

The most reliable mobile navigation pattern. Keeps primary destinations always visible.

Rules:
- Maximum 5 tabs (3-4 is ideal)
- Each tab has an icon AND a label (icon-only fails accessibility)
- Active tab uses filled icon + color; inactive uses outline + muted color
- Tab bar remains visible during scroll (fixed position)
- Minimum tap target: 48x48px per tab area
- Tapping an active tab scrolls to top or refreshes

```css
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--surface);
  border-top: 1px solid var(--border);
}
```

## Hamburger Menu

Use only when you have too many sections for a tab bar. Users engage less with hidden navigation. Mitigate by combining with a tab bar (top 3-4 items in tabs, rest in drawer) and showing a label next to the icon for new users.

## Bottom Sheets

Best for contextual actions, filters, and secondary content.

| Type | Behavior |
|------|----------|
| Modal | Covers screen, scrim behind, swipe down to dismiss |
| Persistent | Partial height, expandable, content scrolls behind |
| Peek | Shows header only, pull up to expand |

Rules:
- Include a visible drag handle at the top
- Swipe down always dismisses
- Maximum 7 items in an action sheet
- Snap to defined heights (peek, half, full) with no in-between states

## Gesture Navigation

| Gesture | Common Action |
|---------|--------------|
| Swipe left/right | Navigate between tabs or pages |
| Swipe down | Pull to refresh, dismiss modal |
| Long press | Context menu or selection mode |
| Pinch | Zoom (maps, images) |

Rules:
- Every gesture must have a visible button alternative (accessibility)
- Provide haptic feedback on gesture recognition
- Do not override system gestures (iOS swipe-from-edge = back)

## Thumb Zone Design

On modern phones (6"+), the natural thumb reach covers the bottom-center of the screen.

```
 Hard to reach    |  Hard to reach
 ─────────────────┼─────────────────
 OK               |  OK
 ─────────────────┼─────────────────
 Easy (thumb)     |  Easy (thumb)
```

- Primary actions: bottom third of screen
- Navigation: fixed bottom bar
- Destructive actions (delete): top or behind confirmation, never in thumb zone
- FABs (floating action buttons): bottom-right, 56px diameter

## Safe Areas

```css
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

- Always apply safe area insets on the outermost container
- Tab bar padding-bottom must include safe-area-inset-bottom
- Test on devices with notches, Dynamic Island, and rounded corners

## Anti-Patterns

- Icon-only tab bars with no labels
- Hamburger menu as the only navigation (low discoverability)
- Tap targets smaller than 44x44px (Apple) or 48x48px (Material)
- Navigation that changes position during scroll
- Gesture-only actions with no visible alternative
- Ignoring safe areas (content hidden behind notch or home indicator)
