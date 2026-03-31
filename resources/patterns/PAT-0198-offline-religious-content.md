---
id: PAT-0198
name: Offline Religious Content
category: patterns
tags: [offline-first, caching, service-worker, download, sync, pwa, local-storage, scripture-offline]
capabilities: [offline-first-architecture, content-caching, background-sync, download-management]
useWhen:
  - building an offline-first religious content app
  - caching scripture texts and audio for offline access
  - implementing background sync for user-generated content
  - designing download management for media content
  - creating a PWA for religious content that works without internet
estimatedTokens: 650
relatedFragments: [SKL-0384, SKL-0153, PAT-0197]
dependencies: []
synonyms: ["how to make a scripture app work offline", "how to cache religious content for offline use", "how to download audio for offline listening", "how to build an offline-first religious app", "how to sync offline changes when back online", "how to use service workers for scripture caching"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "religious"
---

# Offline Religious Content

Caching, download management, and offline-first architecture for religious applications.

## Why Offline Matters for Religious Apps

Religious content is used in places with limited connectivity: mosques, churches, temples, retreats, rural communities, and during travel. Users expect prayer times, scripture, and devotional content to work without internet. Offline-first is not a nice-to-have; it is a core requirement.

## Offline Architecture Layers

```
Layer 1: App Shell (HTML/CSS/JS) — Service Worker cache
Layer 2: Essential Content (scripture text, prayer times) — IndexedDB
Layer 3: Rich Media (audio, video) — Cache API + download manager
Layer 4: User Data (bookmarks, notes, progress) — IndexedDB + background sync
```

### Layer 1: App Shell Caching

Use a Service Worker to cache the application shell:

```javascript
// Cache app shell on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-shell-v1').then((cache) =>
      cache.addAll(['/index.html', '/app.js', '/styles.css', '/fonts/amiri.woff2'])
    )
  );
});
```

The app loads instantly from cache. Network requests fetch fresh content when available.

### Layer 2: Scripture Text Storage

Store scripture text in IndexedDB for fast, structured queries:

```
Store: "verses"
Key: [translationId, book, chapter, verse]
Value: { text, hasAudio, crossRefs }

Store: "translations"
Key: translationId
Value: { name, language, direction, downloadedAt, version }
```

IndexedDB supports compound keys and range queries, making it efficient to fetch an entire chapter (`getAll` where translation + book + chapter match). A full Bible translation is roughly 4-5 MB of text. The full Quran is about 1.5 MB. Both fit easily on any device.

### Layer 3: Media Download Manager

Audio and video require explicit user-initiated downloads:

```
DownloadManager {
  queue: [{ url, type, size, progress, status }],

  startDownload(url):
    - Fetch with streaming response
    - Store in Cache API with progress tracking
    - Update download status in IndexedDB

  pauseDownload(url):
    - Abort fetch, store partial data
    - Resume later with Range header

  getStorageUsage():
    - Sum all cached media sizes
    - Show per-category breakdown
}
```

Show download progress, total storage used, and per-item sizes. Let users delete individual downloads to free space. Support pause/resume for large files on unreliable connections.

### Layer 4: User Data Sync

Bookmarks, highlights, notes, and reading progress created offline must sync when connectivity returns:

```
1. User creates bookmark offline
2. Store in IndexedDB with pendingSync: true
3. Register background sync event
4. When online, Service Worker fires sync event
5. Push pending changes to server
6. Handle conflicts (server wins for same-timestamp, merge for different fields)
7. Mark as synced
```

Use the Background Sync API where available. Fall back to sync-on-next-app-open for browsers that do not support it.

## Storage Budget

| Content Type | Typical Size | Storage |
|-------------|-------------|---------|
| App shell | 2-5 MB | Service Worker cache |
| One Bible translation | 4-5 MB | IndexedDB |
| Full Quran (Arabic + English) | 3 MB | IndexedDB |
| One audio chapter (MP3) | 5-15 MB | Cache API |
| Full audio Bible | 2-4 GB | Cache API |

Show users their storage usage and let them manage what is downloaded. Respect device storage limits.

## Key Takeaways

- Religious apps must work offline since they are used in mosques, churches, retreats, and rural areas
- Layer the offline strategy: app shell in Service Worker, text in IndexedDB, media in Cache API
- Scripture text is small enough (1.5-5 MB) to download entire translations without user concern
- Audio/video downloads need explicit user control with pause/resume and storage management
- Background Sync API handles pushing offline user data (bookmarks, notes) when connectivity returns
