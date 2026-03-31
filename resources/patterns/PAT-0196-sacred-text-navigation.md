---
id: PAT-0196
name: Sacred Text Navigation
category: patterns
tags: [scripture, navigation, chapter-verse, cross-references, parallel-texts, addressing, canonical-references]
capabilities: [verse-addressing, cross-reference-linking, parallel-text-display, reference-parsing]
useWhen:
  - implementing chapter and verse navigation for sacred texts
  - building cross-reference systems linking related passages
  - displaying parallel texts or translations side by side
  - parsing human-readable scripture references into structured data
  - designing URL schemes for deep-linking to specific verses
estimatedTokens: 650
relatedFragments: [SKL-0384, SKL-0153, PAT-0197]
dependencies: []
synonyms: ["how to navigate scripture by chapter and verse", "how to implement cross-references in a Bible app", "how to parse scripture references", "how to display parallel Bible translations", "how to deep link to a specific verse", "how to build chapter verse addressing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Sacred Text Navigation

Chapter/verse addressing, cross-references, and parallel text display for scripture apps.

## Canonical Reference System

Sacred texts use a hierarchical addressing scheme that must be parsed, stored, and rendered consistently:

| Scripture | Format | Example |
|-----------|--------|---------|
| **Bible** | Book Chapter:Verse | Genesis 1:1, John 3:16-18 |
| **Quran** | Surah:Ayah | 2:255, Al-Baqarah:255 |
| **Torah** | Book Chapter:Verse + Parsha | Bereishit 1:1 |
| **Psalms/Zabur** | Chapter:Verse | Psalm 23:1-6 |

### Reference Parser

Build a parser that handles common input variations:

```
Input: "Gen 1:1-3, 5; 2:1"
Parsed: [
  { book: "Genesis", chapter: 1, verseStart: 1, verseEnd: 3 },
  { book: "Genesis", chapter: 1, verseStart: 5, verseEnd: 5 },
  { book: "Genesis", chapter: 2, verseStart: 1, verseEnd: 1 }
]
```

Handle: abbreviations ("Gen", "Jn", "Ps"), ranges ("1:1-5"), verse lists ("1:1,3,5"), chapter ranges ("Gen 1-3"), and cross-chapter ranges ("Gen 1:28-2:3"). Maintain an abbreviation lookup table per language.

## Cross-Reference Model

Cross-references link related passages across books:

```
CrossReference {
  sourceRef: "John 3:16",
  targetRef: "Romans 5:8",
  type: "parallel" | "quotation" | "allusion" | "thematic",
  direction: "bidirectional" | "source_to_target"
}
```

| Type | Meaning | Example |
|------|---------|---------|
| **Parallel** | Same event, different account | Matthew 5:3 / Luke 6:20 |
| **Quotation** | Old Testament quoted in New | Matthew 1:23 quoting Isaiah 7:14 |
| **Allusion** | Indirect reference | Revelation imagery from Daniel |
| **Thematic** | Same topic or theme | Patience: James 1:3 / Romans 5:3 |

Display cross-references as clickable links in the margin or footer. Tapping navigates to the referenced passage with a back button to return.

## URL Scheme for Deep Linking

Design URL paths that map directly to references:

```
/bible/genesis/1/1          -> Genesis 1:1
/bible/genesis/1/1-5        -> Genesis 1:1-5
/quran/2/255                -> Al-Baqarah:255
/quran/al-baqarah/255       -> Al-Baqarah:255 (by name)
```

Support both numeric and named book/surah identifiers. Include translation as a query parameter: `/bible/genesis/1/1?translation=niv`.

## Parallel Text Layout

Display multiple translations side by side:

```
┌────────────────────┬────────────────────┐
│ KJV                │ NIV                │
├────────────────────┼────────────────────┤
│ In the beginning   │ In the beginning   │
│ God created the    │ God created the    │
│ heaven and earth.  │ heavens and earth. │
│           Gen 1:1  │           Gen 1:1  │
└────────────────────┴────────────────────┘
```

Align verses across translations (same verse number = same row). On mobile, use a tab switcher instead of side-by-side columns. Sync scroll position across panels so parallel texts stay aligned.

## Navigation Patterns

Provide multiple navigation paths:

1. **Table of Contents**: Book > Chapter > Verse tree
2. **Reference input**: Type or paste a reference string
3. **Sequential**: Next/previous chapter buttons with swipe gestures
4. **Search results**: Full-text search linking to exact verse
5. **Cross-reference**: Click a linked reference to navigate
6. **History**: Recently viewed passages for quick return

## Key Takeaways

- Build a robust reference parser handling abbreviations, ranges, verse lists, and cross-chapter spans
- Cross-references are typed (parallel, quotation, allusion, thematic) for meaningful linking
- URL schemes should support both numeric IDs and human-readable names for SEO and shareability
- Parallel text display requires verse-level alignment with synced scrolling across panels
- Multiple navigation paths (TOC, search, reference input, sequential, history) serve different reading modes
