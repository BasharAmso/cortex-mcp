---
id: SKL-0312
name: Progressive Web Apps
category: skills
tags: [pwa, service-worker, offline, web-manifest, install-prompt, caching]
capabilities: [service-worker-implementation, offline-strategy, app-manifest-configuration, install-prompt-handling]
useWhen:
  - making a web app work offline or with poor connectivity
  - adding install-to-homescreen functionality
  - implementing a caching strategy for assets and API responses
  - building an app-like experience without a native app
  - configuring a web app manifest
estimatedTokens: 650
relatedFragments: [SKL-0308, SKL-0315, PAT-0165]
dependencies: []
synonyms: ["how to make a website work offline", "how to add install to homescreen", "how to build a PWA", "how to use service workers", "how to cache API responses for offline", "what is a progressive web app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Progressive Web Apps

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0312 |
| **Name** | Progressive Web Apps |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A Progressive Web App (PWA) is a web application that uses modern browser APIs to deliver an app-like experience: offline support, home screen installation, push notifications, and background sync. PWAs are a web-first alternative to native apps for many use cases.

### PWA Requirements

Three things make a web app installable:

1. **HTTPS** — service workers only run on secure origins (localhost is exempted for development).
2. **Web App Manifest** — a JSON file describing the app's name, icons, colors, and display mode.
3. **Service Worker** — a JavaScript file that intercepts network requests and enables offline caching.

### Web App Manifest

```json
{
  "name": "My App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Link it in your HTML `<head>`: `<link rel="manifest" href="/manifest.json">`.

### Service Worker Caching Strategies

| Strategy | How It Works | Best For |
|----------|-------------|----------|
| **Cache First** | Serve from cache; fall back to network | Static assets (CSS, JS, images) |
| **Network First** | Try network; fall back to cache | API responses, dynamic content |
| **Stale While Revalidate** | Serve from cache immediately, update cache in background | Frequently updated content (news, feeds) |
| **Cache Only** | Serve only from cache | App shell, critical offline resources |
| **Network Only** | Always go to network | Analytics, non-cacheable requests |

### Service Worker Lifecycle

```
Install → Activate → Fetch (intercept requests)
```

1. **Install event** — pre-cache the app shell (HTML, CSS, JS, key images).
2. **Activate event** — clean up old caches from previous versions.
3. **Fetch event** — intercept network requests and apply your caching strategy.

```javascript
// sw.js — basic cache-first strategy
const CACHE_NAME = 'v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```

### Install Prompt Handling

Browsers show an install prompt when PWA criteria are met. Capture and defer it for a better UX:

```javascript
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton(); // show your custom UI
});

installButton.addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((result) => {
    if (result.outcome === 'accepted') console.log('Installed');
    deferredPrompt = null;
  });
});
```

### Tooling Shortcuts

- **Workbox** (by Google) — abstracts service worker caching strategies into a declarative config. Use it instead of writing raw service worker code for production apps.
- **Next.js** — use `next-pwa` or `@serwist/next` for zero-config PWA support.
- **Vite** — use `vite-plugin-pwa` for automatic manifest and service worker generation.

## Anti-Patterns

- Caching everything aggressively (stale data worse than no data for dynamic content)
- Not versioning caches (users stuck on old cached content forever)
- Ignoring the offline fallback page (blank screen offline is a terrible experience)
- Forcing the install prompt immediately on first visit (let users experience the app first)
- Skipping HTTPS in production

## Key Takeaways

- A PWA needs HTTPS, a manifest, and a service worker to be installable
- Choose caching strategies per resource type: cache-first for assets, network-first for API data
- Use Workbox or a framework plugin instead of writing raw service worker code
- Defer the install prompt until the user has experienced the app
- Always provide an offline fallback page for uncached routes
