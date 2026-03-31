---
id: SKL-0314
name: Internationalization (i18n)
category: skills
tags: [i18n, internationalization, localization, translation, rtl, pluralization]
capabilities: [translation-management, locale-switching, rtl-support, pluralization-handling]
useWhen:
  - adding multi-language support to a web application
  - implementing locale switching and language detection
  - handling right-to-left (RTL) layouts for Arabic or Hebrew
  - managing translation files and workflows
  - implementing pluralization and date/number formatting
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0310, PAT-0162]
dependencies: []
synonyms: ["how to add multiple languages to my app", "how to implement i18n in React", "how to handle RTL layouts", "how to manage translation files", "how to format dates for different locales", "how to add language switching"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/i18next/i18next"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Internationalization (i18n)

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0314 |
| **Name** | Internationalization (i18n) |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Internationalization (i18n) is the process of designing an application so it can be adapted to different languages and regions without code changes. Localization (l10n) is the act of translating content for a specific locale. Build i18n into the architecture early; retrofitting is painful.

### i18next: The Standard Library

i18next is the most widely used JavaScript i18n framework, with bindings for React, Vue, Next.js, and Node.js:

```typescript
// i18n.ts — initialization
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }, // React already escapes
});
```

```typescript
// Component usage
import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation();
  return <h1>{t('welcome.title')}</h1>;
}
```

### Translation File Structure

Organize translations by feature, not by page:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "loading": "Loading..."
  },
  "auth": {
    "login": "Sign in",
    "logout": "Sign out",
    "forgotPassword": "Forgot password?"
  },
  "dashboard": {
    "title": "Dashboard",
    "itemCount": "{{count}} item",
    "itemCount_plural": "{{count}} items"
  }
}
```

### Pluralization

Different languages have different plural rules. English has two forms (singular/plural). Arabic has six. i18next handles this automatically:

```json
{
  "itemCount_zero": "No items",
  "itemCount_one": "{{count}} item",
  "itemCount_other": "{{count}} items"
}
```

Use the ICU message format for complex pluralization if needed: `{count, plural, one {# item} other {# items}}`.

### Date, Number, and Currency Formatting

Use the browser's built-in `Intl` API, not string concatenation:

```typescript
// Date
new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(date);
// → "30. März 2026"

// Number
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.5);
// → "$1,234.50"

// Relative time
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-1, 'day');
// → "yesterday"
```

### RTL (Right-to-Left) Support

For languages like Arabic, Hebrew, and Farsi:

1. **Set `dir="rtl"` on `<html>`** when the locale changes.
2. **Use CSS logical properties** instead of physical ones: `margin-inline-start` instead of `margin-left`, `padding-inline-end` instead of `padding-right`.
3. **Mirror icons** that indicate direction (arrows, navigation) but not icons with inherent directionality (checkmarks, clocks).
4. **Test layout** — Flexbox and Grid handle RTL automatically if you use logical properties. Absolute positioning does not.

```css
/* Physical (breaks in RTL) */
.sidebar { margin-left: 1rem; }

/* Logical (works in both directions) */
.sidebar { margin-inline-start: 1rem; }
```

### Locale Detection Strategy

1. Check URL parameter or path prefix (`/en/about`, `/ar/about`)
2. Check stored user preference (localStorage or user profile)
3. Check `navigator.language` browser setting
4. Fall back to default locale

### Translation Workflow

| Phase | Who | What |
|-------|-----|------|
| **Extract** | Developer | Extract translation keys from code using i18next-parser or similar |
| **Translate** | Translator | Fill in translations in locale JSON files or a TMS (Crowdin, Lokalise) |
| **Review** | Native speaker | Verify translations in context |
| **Deploy** | Developer | Load translations at build time or fetch dynamically |

## Anti-Patterns

- Concatenating translated strings (`t('hello') + ' ' + name` breaks in languages with different word order)
- Hardcoding date formats (`MM/DD/YYYY` is US-only; use `Intl.DateTimeFormat`)
- Using physical CSS properties (`margin-left`) instead of logical properties
- Embedding text in images (untranslatable)
- Assuming all languages have the same text length (German is 30% longer than English)

## Key Takeaways

- Build i18n into the architecture from day one; retrofitting is expensive
- Use i18next with framework bindings for a battle-tested solution
- Use CSS logical properties for RTL support without separate stylesheets
- Format dates, numbers, and currencies with the `Intl` API, never manually
- Organize translations by feature and handle pluralization rules per language
