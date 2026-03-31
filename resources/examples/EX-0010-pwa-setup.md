---
id: EX-0010
name: PWA Setup Example
category: examples
tags: [pwa, service-worker, manifest, next-js, offline, install-prompt, mobile, progressive-web-app]
capabilities: [pwa-configuration, service-worker-registration, install-prompt-handling]
useWhen:
  - setting up a Progressive Web App from scratch
  - adding PWA support to a Next.js project
  - configuring manifest.json and service worker registration
estimatedTokens: 700
relatedFragments: [SKL-0007, EX-0011, EX-0013]
dependencies: []
synonyms: ["how to make a pwa", "progressive web app setup", "add pwa to next.js", "service worker setup", "make website installable"]
sourceUrl: "https://github.com/nicklockwood/iVersion"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
pillar: "platform"
---

# PWA Setup Example

Complete PWA setup: web app manifest, service worker with Workbox-style caching strategies, offline fallback, and install prompt handling.

## Web App Manifest

```json
// public/manifest.json
{
  "name": "My App",
  "short_name": "MyApp",
  "description": "A progressive web application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0066ff",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

## Head Metadata

```tsx
// app/layout.tsx -- add to <head>
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#0066ff" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

## Service Worker (Workbox-Style Strategies)

```js
// public/sw.js
const CACHE_NAME = "app-shell-v1";
const SHELL_URLS = ["/", "/offline"];

// Precaching: cache shell URLs during install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

// Clean up old caches on activate
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation, cache-first for static assets
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    // Network-first with offline fallback (Workbox NetworkFirst strategy)
    e.respondWith(
      fetch(e.request).catch(() => caches.match("/offline"))
    );
  } else if (e.request.destination === "image" || e.request.destination === "style") {
    // Cache-first for static assets (Workbox CacheFirst strategy)
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request))
    );
  }
});
```

## Install Prompt Hook

```tsx
// hooks/use-install-prompt.ts
import { useState, useEffect } from "react";

export function useInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") setInstalled(true);
    setPrompt(null);
  };

  return { canInstall: !!prompt && !installed, install, installed };
}
```

## Key Points

- **Three icons minimum:** 192px, 512px, and a maskable icon for Android adaptive icons
- **Network-first for pages, cache-first for assets** mirrors Workbox's recommended strategy split
- **`skipWaiting` + `clients.claim`** ensures immediate activation of new service workers
- **Install prompt** is captured and deferred so you control when to show it
- **Apple meta tags** are required since Safari ignores `manifest.json` for some properties
- **Offline fallback** serves `/offline` from cache when navigation requests fail
