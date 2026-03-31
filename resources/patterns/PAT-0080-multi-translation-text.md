---
id: PAT-0080
name: Multi-Translation Text Display
category: patterns
tags: [multi-translation, parallel-text, verse-alignment, rtl, diacritics, morphology, osis, usfm, cross-reference, scripture]
capabilities: [parallel-translation-display, verse-alignment, rtl-ltr-rendering, morphological-tagging, cross-reference-linking, text-format-parsing]
useWhen:
  - displaying multiple translations of the same text side by side
  - aligning verses across translations with different versification schemes
  - handling RTL and LTR scripts in the same view
  - working with morphologically tagged original language texts
  - parsing OSIS XML or USFM scripture formats
estimatedTokens: 650
relatedFragments: [SKL-0153, PAT-0081, EX-0013]
dependencies: []
synonyms: ["parallel bible view", "side by side translations", "how to display Hebrew text", "verse alignment across versions", "right to left text handling", "interlinear bible display"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/openscriptures/morphhb"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Multi-Translation Text Display

Patterns for rendering parallel translations, aligning verses across versification schemes, handling bidirectional scripts, and working with morphologically tagged source texts. Based on the Open Scriptures Hebrew Bible project (OSHB) and the awesome-bible-data ecosystem.

## Verse Alignment Across Translations

Different traditions number verses differently (e.g., Hebrew vs. English Bibles, Quran chapter/verse boundaries). A versification mapping layer is essential.

```ts
interface VerseRef {
  book: string;       // standardized book ID (e.g., "Gen", "Ps")
  chapter: number;
  verse: number;
  system: "hebrew" | "english" | "lxx" | "vulgate";
}

interface VersificationMap {
  from: VerseRef;
  to: VerseRef;
}

// Normalize any verse reference to a canonical system
function normalizeRef(
  ref: VerseRef,
  targetSystem: string,
  mappings: VersificationMap[]
): VerseRef {
  if (ref.system === targetSystem) return ref;
  const mapping = mappings.find(
    m => m.from.book === ref.book
      && m.from.chapter === ref.chapter
      && m.from.verse === ref.verse
      && m.from.system === ref.system
  );
  return mapping?.to ?? ref; // fallback to input if no mapping
}
```

Use established mapping datasets like STEPBible TVTMS or Copenhagen Alliance versification mappings rather than building your own.

## Parallel Display Layout

```
┌──────────────────┬──────────────────┬──────────────────┐
│   Hebrew (RTL)   │  English (LTR)   │  Arabic (RTL)    │
├──────────────────┼──────────────────┼──────────────────┤
│ בְּרֵאשִׁית בָּרָא │ In the beginning │ في البدء خلق الله│
│ אֱלֹהִים אֵת    │ God created the  │ السماوات والأرض  │
│ הַשָּׁמַיִם ...  │ heavens and ...  │                  │
└──────────────────┴──────────────────┴──────────────────┘
```

Key CSS considerations:
- Use `dir="rtl"` and `dir="ltr"` per column, not globally
- Set `unicode-bidi: isolate` on each translation block
- Use `font-feature-settings` for proper ligatures in Arabic/Hebrew
- Avoid NFC normalization for Hebrew (can corrupt pointing/cantillation marks, per OSHB guidance)

## Morphological Tagging Format

The OSHB tags each word with three attributes following a standardized scheme:

```xml
<!-- Example: Genesis 1:1 word -->
<w lemma="b/7225" morph="HR/Ncfsa" id="01001">בְּרֵאשִׁית</w>
```

- **lemma**: Strong's number with prefix markers (b/ = preposition beth, c/ = conjunction waw)
- **morph**: Robinson-style code (H = Hebrew, R = preposition, Nc = common noun, f = feminine, s = singular, a = absolute)
- **id**: unique immutable word ID (first two digits = book number)

```ts
interface TaggedWord {
  text: string;           // surface form with pointing
  lemma: string;          // e.g., "b/7225"
  morph: string;          // e.g., "HR/Ncfsa"
  id: string;             // unique word ID
  strongs?: string;       // mapped Strong's number
}

function parseLemma(lemma: string): { prefixes: string[]; root: string } {
  const parts = lemma.split("/");
  return {
    prefixes: parts.slice(0, -1),
    root: parts[parts.length - 1],
  };
}
```

## Standard Scripture Formats

| Format | Use Case | Structure |
|--------|----------|-----------|
| **OSIS XML** | Scholarly interchange, morphology | XML with verse/word elements, attributes for lemma/morph |
| **USFM** | Bible translation workflows | Backslash markers (`\v 1`, `\p`, `\f`) used by translators |
| **Zefania XML** | Multilingual corpus (140+ Bibles) | Simpler XML, some include Strong's tagging |
| **JSON (MorphHB)** | Programmatic access | `[wordString, lemma, morphology]` per word |

Choose OSIS for original language work requiring morphology. Choose USFM for translation workflows. Choose JSON for web/mobile apps.

## Cross-Reference Linking

```ts
interface CrossReference {
  from: VerseRef;
  to: VerseRef;
  type: "quotation" | "allusion" | "parallel" | "thematic";
  confidence?: number;   // for algorithmically detected refs
}
```

Established open datasets for cross-references exist (see awesome-bible-data). Display as inline links or a side panel, always bidirectional.

## RTL Rendering Checklist

1. Set `dir` attribute per text block, not per page
2. Mirror UI chrome (navigation arrows, margins) for RTL contexts
3. Use OpenType-aware fonts (SBL Hebrew, Amiri for Arabic)
4. Preserve Unicode normalization form (avoid NFC for Hebrew with cantillation)
5. Test with mixed-direction content (e.g., Hebrew text with English book names inline)
