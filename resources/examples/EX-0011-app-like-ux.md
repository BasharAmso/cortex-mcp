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
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# App-Like UX Patterns

Touch-friendly patterns that make a PWA feel like a native app.

## Bottom Navigation Bar

```tsx
// components/bottom-nav.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/search", label: "Search", icon: "🔍" },
  { href: "/profile", label: "Profile", icon: "👤" },
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
              <span className="text-xl" aria-hidden="true">{icon}</span>
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
/* Safe area padding for notched devices */
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

## Fullscreen Mode Toggle

```ts
// lib/fullscreen.ts
export async function toggleFullscreen(el: HTMLElement = document.documentElement) {
  if (!document.fullscreenElement) {
    await el.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}
```

## Splash Screen (CSS)

```css
/* Displays while JS loads, hidden by app mount */
#splash {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0066ff;
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

```ts
// Call after app hydration
document.getElementById("splash")?.classList.add("hidden");
```

## Key Points

- **Bottom nav uses `pb-safe`** for notched devices (iPhone, Pixel)
- **Pull-to-refresh threshold** of 80px prevents accidental triggers
- **Haptic feedback** degrades gracefully when Vibration API is unavailable
- **`display: standalone`** in manifest.json removes browser chrome automatically
- **Splash screen** covers the white flash between HTML load and JS hydration
- **Accessible:** nav uses `role`, `aria-label`, and `aria-current`
