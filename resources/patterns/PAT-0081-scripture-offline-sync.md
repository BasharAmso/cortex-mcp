---
id: PAT-0081
name: Scripture Offline Sync
category: patterns
tags: [scripture, offline-sync, translation-download, audio-cache, reading-progress, incremental-sync, storage-management, religious]
capabilities: [translation-pre-download, offline-search-index, incremental-sync, storage-management, audio-caching, reading-progress-sync]
useWhen:
  - pre-downloading scripture translations for offline use
  - building offline search indexes for large text corpora
  - managing storage for multiple translations and audio files
  - syncing reading progress and annotations across devices
  - caching audio recitations with size-aware eviction
estimatedTokens: 650
relatedFragments: [SKL-0153, PAT-0080, EX-0013]
dependencies: []
synonyms: ["download quran for offline", "offline bible translations", "cache scripture audio files", "sync reading progress", "how to store religious texts offline", "pre-download translations"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/quran/quran_android"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Scripture Offline Sync

Offline-first patterns specific to scripture applications: managing large text corpora across multiple translations, caching audio recitations, building local search indexes, and syncing reading progress. Complements the general offline-first pattern (EX-0013) with religion-specific challenges.

## Why Scripture Apps Need Special Offline Patterns

General offline-first (EX-0013) covers IndexedDB, sync queues, and conflict resolution. Scripture apps add unique constraints:
- **Corpus size**: a full Bible is ~4.5MB of text; the Quran ~1MB. With 10+ translations, text alone reaches 30-50MB.
- **Audio files**: a single reciter's full Quran audio is 1-3GB. Users may want multiple reciters.
- **Page images**: high-resolution mushaf pages (Quran for Android) can be 200-500MB per set.
- **Search complexity**: users expect diacritics-insensitive, cross-translation search across all downloaded content.

## Translation Download Manager

```ts
interface TranslationPack {
  id: string;
  name: string;
  language: string;
  sizeBytes: number;
  version: number;
  downloadUrl: string;
  localDbPath?: string;
  status: "available" | "downloading" | "installed" | "update-available";
}

class TranslationManager {
  // Each translation is a separate SQLite file for isolation
  async download(pack: TranslationPack, onProgress: (pct: number) => void) {
    // 1. Download to temp path with resume support
    // 2. Verify checksum
    // 3. Move to final location
    // 4. Build FTS index for this translation
    // 5. Update registry
  }

  async checkForUpdates(installed: TranslationPack[]): Promise<TranslationPack[]> {
    // Compare local version numbers against remote manifest
    // Return packs with status "update-available"
    // Incremental updates: download only changed verses (delta)
  }

  async remove(packId: string) {
    // Delete SQLite file + FTS index
    // Reclaim storage, update registry
  }

  getStorageUsage(): { translations: number; audio: number; images: number; total: number } {
    // Sum file sizes by category for the storage management UI
  }
}
```

Key pattern from Quran for Android: each translation is an independent SQLite database file. This keeps downloads isolated, makes deletion clean, and avoids migration complexity when a single translation updates.

## Offline Search Index

```ts
// Build per-translation FTS5 index at download time
const FTS_SCHEMA = `
  CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
    verse_text,
    book,
    chapter,
    verse,
    translation_id,
    tokenize='unicode61 remove_diacritics 2'
  );
`;

// Cross-translation search: query each installed translation's index,
// group results by verse reference, rank by relevance
async function searchAcrossTranslations(
  query: string,
  installedTranslations: string[]
): Promise<Map<string, SearchResult[]>> {
  const results = new Map<string, SearchResult[]>();
  for (const txId of installedTranslations) {
    const hits = await queryFts(txId, query);
    for (const hit of hits) {
      const key = `${hit.book}:${hit.chapter}:${hit.verse}`;
      if (!results.has(key)) results.set(key, []);
      results.get(key)!.push(hit);
    }
  }
  return results; // grouped: same verse across translations
}
```

Use `remove_diacritics 2` for Arabic/Hebrew to match searches regardless of vowel pointing.

## Audio Caching Strategy

```ts
interface AudioCacheConfig {
  maxCacheSizeBytes: number;    // user-configurable, e.g., 500MB
  downloadGranularity: "chapter" | "page";  // never full-recitation
  evictionPolicy: "lru" | "keep-recent-chapters";
}

class AudioCache {
  // Download audio per-chapter (not full recitation) to allow
  // partial downloads and granular eviction
  async ensureChapterCached(reciterId: string, chapter: number) {
    if (this.isCached(reciterId, chapter)) return;
    await this.evictIfNeeded();
    await this.downloadChapter(reciterId, chapter);
  }

  // Predictive pre-fetch: download the next 2 chapters
  // when user starts listening
  async prefetchAhead(reciterId: string, currentChapter: number) {
    const next = [currentChapter + 1, currentChapter + 2];
    for (const ch of next) {
      if (ch <= this.totalChapters) {
        this.ensureChapterCached(reciterId, ch); // fire-and-forget
      }
    }
  }

  private async evictIfNeeded() {
    while (this.currentSize > this.config.maxCacheSizeBytes) {
      // Remove least-recently-played chapter audio
      await this.removeLruEntry();
    }
  }
}
```

## Reading Progress Sync

```ts
interface ReadingProgress {
  userId: string;
  lastPosition: { book: number; chapter: number; verse: number };
  readingPlanProgress?: { planId: string; day: number; completedDays: number[] };
  annotations: Annotation[];  // bookmarks, highlights, notes
  lastSyncedAt: number;
}

// Sync strategy: local-first, cloud-optional
// 1. Always save to local storage immediately
// 2. Queue sync operations for when connectivity returns
// 3. Merge strategy: last-write-wins for position,
//    union-merge for annotations (never delete remotely)
// 4. Conflict on same annotation: keep both, flag for user review
```

## Storage Management UI

Users need visibility into what is consuming space:

```
┌─────────────────────────────────────┐
│ Storage Usage                       │
├─────────────────────────────────────┤
│ Translations    ████░░░░░  120 MB   │
│ Audio (cached)  ██████░░░  340 MB   │
│ Page images     ███░░░░░░   85 MB   │
│ Search indexes  █░░░░░░░░   15 MB   │
├─────────────────────────────────────┤
│ Total: 560 MB / 2 GB limit          │
│ [Manage Downloads]  [Clear Cache]   │
└─────────────────────────────────────┘
```

Let users set a storage budget. Auto-evict audio cache first (re-downloadable), never auto-delete translations or annotations.
