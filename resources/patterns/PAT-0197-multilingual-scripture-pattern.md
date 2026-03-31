---
id: PAT-0197
name: Multilingual Scripture Pattern
category: patterns
tags: [multilingual, translation, scripture, transliteration, rtl, arabic, hebrew, side-by-side, localization]
capabilities: [translation-switching, side-by-side-display, transliteration-support, rtl-layout]
useWhen:
  - supporting multiple scripture translations in an app
  - implementing translation switching with side-by-side display
  - adding transliteration for Arabic or Hebrew scripts
  - handling right-to-left text layout for scripture
  - designing a translation data model for sacred texts
estimatedTokens: 650
relatedFragments: [PAT-0196, SKL-0153, SKL-0384]
dependencies: []
synonyms: ["how to support multiple Bible translations", "how to display Arabic and English Quran side by side", "how to add transliteration to scripture", "how to handle RTL text in a scripture app", "how to switch between translations", "how to build a multilingual sacred text reader"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Multilingual Scripture Pattern

Translation switching, side-by-side display, and transliteration for sacred text applications.

## Translation Data Model

Store each translation as a complete, parallel dataset keyed by canonical verse reference:

```
Verse {
  book: string,       // canonical ID (not translation-specific)
  chapter: number,
  verse: number,
  translationId: string,  // "en-kjv", "en-niv", "ar-quran-uthmani"
  text: string,
  language: string,    // ISO 639 code
  direction: "ltr" | "rtl",
  hasAudio: boolean
}

Translation {
  id: "en-kjv",
  name: "King James Version",
  language: "en",
  direction: "ltr",
  copyright: "Public Domain",
  abbreviation: "KJV"
}
```

Using the same canonical reference across all translations enables instant switching and parallel display without complex mapping.

## Translation Switching

Implement as a user preference with session override:

```
1. User selects primary translation (stored in profile)
2. Optionally selects secondary translation for side-by-side
3. Navigation (chapter/verse) stays constant when switching
4. URL updates to reflect translation: /genesis/1?t=niv
5. Audio availability may differ per translation
```

Cache the current chapter in the selected translation. Pre-fetch adjacent chapters for smooth navigation. Store the user's preferred translation(s) in their profile.

## RTL Layout Handling

Arabic, Hebrew, and Urdu scripture requires right-to-left layout:

| Concern | Solution |
|---------|----------|
| **Text direction** | Set `dir="rtl"` on the text container, not globally |
| **Alignment** | Text right-aligned, verse numbers on the right |
| **Mixed content** | Use `unicode-bidi: isolate` for embedded LTR text |
| **Parallel display** | RTL text on the right panel, LTR on the left |
| **Font selection** | Use fonts designed for scripture: Amiri (Arabic), Frank Ruehl (Hebrew) |
| **Line height** | Arabic/Hebrew typically needs 1.8-2.0x line height for diacritics |

Test with actual scripture text, not lorem ipsum. Diacritical marks (tashkeel in Arabic, nikkud in Hebrew) significantly affect rendering.

## Transliteration

Transliteration renders non-Latin scripture in Latin characters for learners:

| Script | Arabic | Transliteration |
|--------|--------|----------------|
| Original | بِسْمِ اللَّهِ | Bismillahi |
| With vowels | بِسْمِ | Bismi |

Implementation approaches:

- **Pre-computed**: Store transliteration as a parallel text dataset (most reliable)
- **Rule-based**: Apply character mapping rules at render time (handles novel text)
- **Hybrid**: Pre-computed for scripture, rule-based for user-generated content

Display transliteration as a third layer: original script, transliteration, and translation. Users toggle each layer independently.

## Font and Typography

Sacred text typography requires special attention:

```css
.arabic-scripture {
  font-family: 'Amiri', 'Traditional Arabic', serif;
  font-size: 1.4rem;      /* larger than body text */
  line-height: 2.2;        /* space for diacritics */
  direction: rtl;
  text-align: right;
}

.verse-number {
  font-family: sans-serif;  /* always LTR numerals */
  unicode-bidi: isolate;
  direction: ltr;
}
```

Use web fonts with full diacritical mark support. Test with heavily vowelized text (Quran with tashkeel, Torah with nikkud).

## Offline Translation Packs

Bundle translations as downloadable packs:

- Each translation is a standalone SQLite database or JSON file
- Download manager shows available translations with size estimates
- Downloaded translations work fully offline
- Background sync checks for text corrections/updates

Keep the app functional with at least one pre-bundled translation.

## Key Takeaways

- Key all translations by the same canonical verse reference for instant switching and parallel display
- Set `dir="rtl"` per text container, not globally, and use `unicode-bidi: isolate` for mixed content
- Transliteration is best stored as a pre-computed parallel dataset alongside original and translation
- Arabic and Hebrew scripture fonts need generous line height (1.8-2.2x) for diacritical marks
- Offline translation packs as downloadable SQLite databases enable full functionality without connectivity
