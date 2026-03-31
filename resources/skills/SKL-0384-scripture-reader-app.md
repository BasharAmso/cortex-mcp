---
id: SKL-0384
name: Quran/Bible Reader App
category: skills
tags: [scripture, quran, bible, reader, bookmarks, audio-recitation, search, chapter-navigation, highlights]
capabilities: [scripture-navigation, bookmark-system, audio-sync, text-search, reading-progress]
useWhen:
  - building a scripture reading app for Quran or Bible
  - implementing chapter and verse navigation
  - adding bookmarks, highlights, and notes to text
  - integrating audio recitation with text synchronization
  - building full-text search across scripture
estimatedTokens: 650
relatedFragments: [SKL-0153, PAT-0196, PAT-0197]
dependencies: []
synonyms: ["how to build a Quran reader app", "how to build a Bible app", "how to add audio recitation to scripture", "how to implement verse bookmarks and highlights", "how to search through scripture text", "how to navigate chapters and verses"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "religious"
---

# Skill: Quran/Bible Reader App

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0384 |
| **Name** | Quran/Bible Reader App |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Scripture reader apps provide navigation, reading, and study features for sacred texts. The architecture centers on an addressable text model (book/chapter/verse), user annotations, and optional audio synchronization.

### Text Data Model

Structure scripture as a hierarchical, addressable system:

```
Scripture
  └── Book/Surah     (e.g., Genesis, Al-Fatiha)
       └── Chapter    (e.g., Chapter 1)
            └── Verse  (e.g., Verse 1)
                 └── Text content (per translation)
```

Store each verse as a row with a canonical reference: `{book, chapter, verse, translation, text}`. This enables per-verse bookmarks, highlights, cross-references, and search results that link directly to a specific location.

### Navigation Patterns

| Pattern | UX | Best For |
|---------|-----|---------|
| **Table of Contents** | Hierarchical book > chapter list | Finding a specific section |
| **Sequential Reading** | Swipe/tap for next page | Continuous reading sessions |
| **Jump to Reference** | Text input "Gen 1:1" or "2:255" | Study and cross-referencing |
| **Last Position** | Auto-resume where user left off | Daily reading habit |

Implement a reference parser that understands common abbreviations ("Gen", "Al-Baqarah", "Ps") and formats ("1:1", "1:1-5", "1:1,3,5").

### Bookmarks and Highlights

User annotations layer on top of the text without modifying it:

```
Annotation {
  userId, reference (book:chapter:verse),
  type: "bookmark" | "highlight" | "note",
  color: string (for highlights),
  content: string (for notes),
  createdAt
}
```

Render highlights as background color on the verse text. Show bookmark icons in the margin. Notes appear as expandable inline elements or a side panel. Sync annotations across devices via user account.

### Audio Recitation

Audio synchronization maps timestamp ranges to verses:

```
AudioTimestamp {
  surah/book, chapter, verse,
  startMs, endMs, reciterName
}
```

As audio plays, highlight the current verse and auto-scroll to keep it visible. Allow users to tap a verse to jump audio playback to that position. Support multiple reciters or audio Bible narrators with per-reciter timestamp mappings.

### Search

Full-text search across all verses with translation-aware results:

- Search within current translation or across all loaded translations
- Return results with verse reference, matching text with highlights, and surrounding context
- Support Arabic/Hebrew script search with diacritic-insensitive matching
- Rank results by relevance (exact match > partial match > related terms)

### Reading Progress

Track reading progress to support reading plans and daily habits:

- Record last-read position per user
- Track completion percentage per book/surah
- Support structured reading plans (read-through-in-a-year, Ramadan Quran completion)
- Show streak tracking for daily reading habits

## Key Takeaways

- Structure text as addressable verses (book:chapter:verse) to enable per-verse annotations and deep linking
- Bookmarks and highlights are user annotation layers that never modify the source text
- Audio sync requires per-verse timestamp mappings; let users tap verses to seek audio playback
- Support multiple translations as parallel text datasets keyed by the same verse reference
- Reading progress and streak tracking are critical for user retention in devotional apps
