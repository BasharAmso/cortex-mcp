---
id: EX-0011
name: App-Like UX Patterns
category: examples
tags: [mobile-ux, bottom-nav, pull-to-refresh, swipe, haptics, fullscreen, splash-screen, pwa]
capabilities: [mobile-navigation, gesture-handling, native-feel-ui]
useWhen:
  - building a PWA that feels like a native app
  - adding mobile navigation patterns to a web app
  - implementing touch gestures like pull-to-refresh or swipe
estimatedTokens: 750
relatedFragments: [SKL-0007, EX-0010, SKL-0005]
dependencies: []
synonyms: ["make web app feel native", "bottom tab bar", "pull to refresh web", "mobile gestures react", "app-like navigation"]
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
---

# App-Like UX Patterns

Touch-friendly patterns that make a PWA feel like a native app, using service worker integration and modern web APIs.

## Bottom Navigation Bar

```tsx
// components/bottom-nav.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/search", label: "Search", icon: "search" },
  { href: "/profile", label: "Profile", icon: "user" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 pb-safe"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex justify-around items-center h-14">
        {tabs.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs
                ${pathname === href ? "text-blue-600 font-semibold" : "text-gray-500"}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <svg className="w-6 h-6" aria-hidden="true">
                <use href={`/icons.svg#${icon}`} />
              </svg>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

```css
/* Safe area padding for notched devices (iPhone, Pixel) */
.pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
```

## Pull-to-Refresh

```tsx
// hooks/use-pull-to-refresh.ts
import { useRef, useCallback } from "react";

export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const startY = useRef(0);
  const pulling = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, []);

  const onTouchEnd = useCallback(async (e: React.TouchEvent) => {
    if (!pulling.current) return;
    const distance = e.changedTouches[0].clientY - startY.current;
    pulling.current = false;
    if (distance > 80) {
      triggerHaptic("light");
      await onRefresh();
    }
  }, [onRefresh]);

  return { onTouchStart, onTouchEnd };
}
```

## Haptic Feedback

```ts
// lib/haptics.ts
export function triggerHaptic(style: "light" | "medium" | "heavy" = "light") {
  if (!("vibrate" in navigator)) return;

  const patterns: Record<string, number[]> = {
    light: [10],
    medium: [20],
    heavy: [30, 10, 30],
  };

  navigator.vibrate(patterns[style]);
}
```

## Standalone Display CSS

```css
/* When launched from home screen (display: standalone in manifest.json) */
@media (display-mode: standalone) {
  /* Hide browser-only elements */
  .browser-only { display: none; }

  /* Adjust for status bar */
  body { padding-top: env(safe-area-inset-top); }
}

/* Splash screen: displays while JS loads, hidden by app mount */
#splash {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--theme-color, #0066ff);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  z-index: 9999;
  transition: opacity 0.3s ease-out;
}

#splash.hidden {
  opacity: 0;
  pointer-events: none;
}
```

## Key Points

- **`env(safe-area-inset-bottom)`** handles notched devices without hardcoded padding
- **Pull-to-refresh threshold** of 80px prevents accidental triggers
- **Haptic feedback** degrades gracefully when Vibration API is unavailable
- **`display: standalone`** in manifest.json removes browser chrome automatically
- **`@media (display-mode: standalone)`** applies styles only when launched as an app
- **Accessible:** nav uses `role`, `aria-label`, `aria-current`, and SVG icons with `aria-hidden`
