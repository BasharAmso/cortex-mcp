---
id: SKL-0153
name: Scripture App Architecture
category: skills
tags: [scripture, quran, bible, multi-translation, verse-navigation, bookmarks, highlights, audio-sync, reading-plans, offline-first, search]
capabilities: [scripture-app-design, multi-translation-support, verse-level-navigation, bookmark-highlight-system, audio-recitation-sync, reading-plan-engine, cross-translation-search]
useWhen:
  - designing a scripture or religious text reading app
  - building multi-translation support for sacred texts
  - implementing verse-level navigation with bookmarks and highlights
  - adding audio recitation sync to a text reader
  - creating reading plans or daily devotional features
estimatedTokens: 700
relatedFragments: [PAT-0080, PAT-0081, EX-0013]
dependencies: []
synonyms: ["build a quran app", "bible reader app architecture", "scripture reading app", "religious text app design", "how to build a verse reader", "multi-translation bible app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/quran/quran_android"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Scripture App Architecture

Design patterns for building scripture reading applications with multi-translation support, verse-level navigation, and rich study features. Drawn from the Quran for Android project (3.4k+ stars, GPL-3.0).

## Core Architecture Layers

```
┌─────────────────────────────────────┐
│          Presentation Layer         │
│  Page viewer, verse list, search UI │
├─────────────────────────────────────┤
│           Feature Layer             │
│  Bookmarks, highlights, audio,     │
│  reading plans, tafsir/commentary  │
├─────────────────────────────────────┤
│            Data Layer               │
│  Translation DB, page images,      │
│  audio files, user annotations     │
├─────────────────────────────────────┤
│          Sync & Storage Layer       │
│  Download manager, offline cache,  │
│  cloud backup, incremental sync    │
└─────────────────────────────────────┘
```

## Multi-Translation Data Model

```ts
interface Translation {
  id: string;              // e.g. "en_sahih", "ar_muyassar"
  language: string;        // ISO 639-1
  direction: "ltr" | "rtl";
  name: string;
  source: string;          // attribution (quranenc, tanzil, etc.)
  downloadUrl: string;
  localPath?: string;      // set once downloaded
  version: number;         // for incremental updates
}

interface Verse {
  surahOrBook: number;
  chapter: number;
  verse: number;
  text: string;
  translationId: string;
}

interface Annotation {
  id: string;
  verseRef: { book: number; chapter: number; verse: number };
  type: "bookmark" | "highlight" | "note";
  color?: string;
  content?: string;
  createdAt: number;
  syncedAt?: number;
}
```

## Verse-Level Navigation

Scripture apps need three navigation modes:
1. **Page mode** - renders full pages (image or typeset), maps tap coordinates to verses
2. **Verse list mode** - scrollable verse-by-verse rendering with translation toggle
3. **Jump-to mode** - book/chapter/verse picker with search-as-you-type

Key pattern: maintain a `currentPosition` object that all features (audio, bookmarks, reading plans) read from and write to.

## Audio Recitation Sync

```ts
interface AudioTimingEntry {
  surah: number;
  ayah: number;
  startMs: number;
  endMs: number;
}

// During playback, highlight the active verse
function syncAudioToVerse(
  timings: AudioTimingEntry[],
  currentTimeMs: number
): { surah: number; ayah: number } | null {
  return timings.find(
    t => currentTimeMs >= t.startMs && currentTimeMs < t.endMs
  ) ?? null;
}
```

Audio files are large. Download per-chapter (not full recitation) and cache with LRU eviction. See PAT-0081 for the offline caching strategy.

## Reading Plans

```ts
interface ReadingPlan {
  id: string;
  name: string;
  totalDays: number;
  entries: { day: number; startRef: VerseRef; endRef: VerseRef }[];
}

interface UserProgress {
  planId: string;
  currentDay: number;
  completedDays: Set<number>;
  startedAt: Date;
}
```

Common plans: sequential (cover-to-cover), thematic (grouped passages), calendar-based (Ramadan/Lent schedules).

## Search Across Translations

Full-text search must handle: diacritics normalization, transliteration matching, and cross-translation results grouping (same verse from different translations shown together). Use SQLite FTS5 for offline search with a custom tokenizer for Arabic/Hebrew.

## Key Design Decisions

- **Page images vs. typeset text**: images guarantee exact typography (critical for Arabic mushaf) but cost storage. Offer both modes.
- **Translation as downloadable packs**: keep APK small, let users choose languages. Each translation is a separate SQLite database file.
- **Annotations sync**: store locally first, sync to cloud optionally. Never lose user highlights due to network issues.
- **Attribution**: translation data typically requires visible credit to the source organization per their license.
