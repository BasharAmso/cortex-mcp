---
id: SKL-0383
name: Religious Calendar System
category: skills
tags: [calendar, hijri, hebrew, liturgical, religious-events, moon-phases, holidays, date-conversion]
capabilities: [hijri-calendar, hebrew-calendar, liturgical-calendar, event-tracking, date-conversion]
useWhen:
  - building a religious calendar with Hijri, Hebrew, or liturgical dates
  - converting between Gregorian and religious calendar systems
  - tracking religious holidays and observances
  - implementing moon-phase calculations for Islamic calendar
  - displaying dual-calendar date formats
estimatedTokens: 650
relatedFragments: [SKL-0382, SKL-0386, PAT-0196]
dependencies: []
synonyms: ["how to implement a Hijri calendar", "how to convert Gregorian to Hebrew dates", "how to track religious holidays", "how to build an Islamic calendar app", "how to calculate moon phases for Ramadan", "how to display liturgical calendar dates"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Skill: Religious Calendar System

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0383 |
| **Name** | Religious Calendar System |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Religious calendars operate on different systems than the Gregorian calendar. Building apps for religious communities requires understanding these systems, converting between them, and tracking events that shift dates annually.

### Calendar Systems

| Calendar | Basis | Year Length | Used By |
|----------|-------|------------|---------|
| **Hijri (Islamic)** | Lunar | ~354 days | Muslim communities |
| **Hebrew** | Lunisolar | ~354 or ~384 days | Jewish communities |
| **Liturgical (Christian)** | Solar + Easter cycle | 365/366 days | Catholic, Orthodox, Protestant |
| **Coptic** | Solar | 365/366 days | Coptic Orthodox Church |

### Hijri Calendar

The Islamic calendar is purely lunar: 12 months of 29 or 30 days, totaling 354 or 355 days. Key implementation details:

- **Tabular calculation**: Algorithmic conversion using the 30-year cycle (11 leap years). Use for approximate dates.
- **Observational**: Based on actual moon sighting. Dates may differ by 1-2 days from tabular. Saudi Arabia uses Umm al-Qura calendar (pre-calculated astronomical tables).
- **Libraries**: `Intl.DateTimeFormat` with `calendar: 'islamic-umalqura'` handles conversion in modern browsers.

Key dates: Ramadan (9th month), Eid al-Fitr (1st Shawwal), Eid al-Adha (10th Dhul Hijjah), Islamic New Year (1st Muharram).

### Hebrew Calendar

The Hebrew calendar is lunisolar, adding a leap month (Adar II) 7 times in every 19-year cycle to stay aligned with seasons:

- Months alternate 29-30 days, with Cheshvan and Kislev varying
- Year types: deficient (353/383), regular (354/384), complete (355/385)
- Use `Intl.DateTimeFormat` with `calendar: 'hebrew'` or libraries like `hebcal`

Key dates: Rosh Hashanah, Yom Kippur, Sukkot, Hanukkah, Passover, Shavuot.

### Liturgical Calendar

The Christian liturgical calendar anchors on Easter (moveable) and Christmas (fixed):

```
Advent (4 Sundays before Christmas) -> Christmas -> Epiphany
  -> Lent (46 days before Easter) -> Easter -> Pentecost
  -> Ordinary Time
```

Easter calculation (Computus): Use the Anonymous Gregorian algorithm. Easter falls on the first Sunday after the first full moon on or after the vernal equinox (March 21).

### Dual-Date Display

Show both Gregorian and religious dates simultaneously:

```
Monday, March 30, 2026
2 Shawwal 1447 AH | 12 Nisan 5786
```

Store all dates internally as Gregorian (or Unix timestamps). Convert to religious calendars at the display layer. This avoids storing duplicate date representations.

### Event Engine

Religious events fall into categories:

| Type | Behavior | Example |
|------|----------|---------|
| **Fixed** | Same religious calendar date yearly | Eid al-Adha (10 Dhul Hijjah) |
| **Computed** | Calculated from algorithm | Easter, Passover start |
| **Observational** | Depends on moon sighting | Start of Ramadan (some communities) |

Pre-compute event dates for the next 2-3 years and cache them. For observational dates, allow manual override by community administrators.

## Key Takeaways

- Store dates as Gregorian/UTC internally; convert to religious calendars at the display layer
- The Hijri calendar drifts ~11 days per Gregorian year, so religious dates shift annually
- Use browser `Intl.DateTimeFormat` with calendar options for basic conversions before adding libraries
- Support both algorithmic and observational date determination for communities that differ
- Pre-compute event dates and allow community admin overrides for observational dates
