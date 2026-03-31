---
id: SKL-0382
name: Prayer Time Calculator
category: skills
tags: [prayer-times, islamic, solar-calculation, timezone, adhan, fajr, isha, qibla, high-latitude]
capabilities: [prayer-time-calculation, solar-position-math, timezone-conversion, qibla-direction]
useWhen:
  - building an Islamic prayer time calculator
  - implementing solar position calculations for religious times
  - handling calculation method variations across regions
  - computing Qibla direction from any location
  - supporting high-latitude prayer time adjustments
estimatedTokens: 650
relatedFragments: [SKL-0383, SKL-0153, PAT-0198]
dependencies: []
synonyms: ["how to calculate prayer times", "how to build an adhan app", "how to compute fajr and isha times", "how to find Qibla direction programmatically", "how to handle prayer times in northern latitudes", "how to implement Islamic prayer time algorithms"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/batoulapps/adhan-js"
difficulty: intermediate
owner: "cortex"
pillar: "religious"
---

# Skill: Prayer Time Calculator

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0382 |
| **Name** | Prayer Time Calculator |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Prayer time calculation determines the five daily Islamic prayer times plus sunrise using solar position algorithms. Adhan-js implements high-precision equations from "Astronomical Algorithms" by Jean Meeus, validated against U.S. Naval Observatory and NOAA data.

### Input Parameters

Every calculation requires three inputs:

| Input | Type | Purpose |
|-------|------|---------|
| **Coordinates** | Latitude, longitude | Observer's geographic position |
| **Date** | Year, month, day | Gregorian date for calculation |
| **Parameters** | Calculation method | Fajr/Isha angle, madhab, adjustments |

### Calculation Methods

Different regional authorities define different solar angles for Fajr (dawn) and Isha (night):

| Method | Fajr Angle | Isha Angle | Region |
|--------|-----------|-----------|--------|
| **Muslim World League** | 18 deg | 17 deg | Global default |
| **ISNA** | 15 deg | 15 deg | North America |
| **Egyptian Authority** | 19.5 deg | 17.5 deg | Africa, Middle East |
| **Umm Al-Qura** | 18.5 deg | 90 min after Maghrib | Saudi Arabia |
| **Moonsighting Committee** | 18 deg | 18 deg | Calculated with seasonal adjustment |

Adhan-js provides these as presets and supports custom parameters for mosques with specific preferences.

### Solar Position Algorithm

The calculation chain:

```
1. Compute Julian Day from Gregorian date
2. Calculate solar mean anomaly and equation of center
3. Derive solar declination and right ascension
4. Compute equation of time
5. Calculate solar noon (Dhuhr) = 12:00 - equation of time - longitude/15
6. Compute hour angle for each prayer using solar altitude angle
7. Fajr = solar noon - hour angle(fajr_angle)
8. Sunrise = solar noon - hour angle(-0.833)
9. Asr = solar noon + hour angle(asr_shadow_length)
10. Maghrib = solar noon + hour angle(-0.833)
11. Isha = solar noon + hour angle(isha_angle)
```

Adhan-js returns UTC Date objects. Convert to local time using the user's timezone (use `Intl.DateTimeFormat` or a library like `luxon`).

### High-Latitude Adjustments

At latitudes above ~48 degrees, Fajr and Isha angles may never be reached during summer months (perpetual twilight). Strategies:

- **Middle of the Night**: Split night into portions for Fajr/Isha
- **Seventh of the Night**: Use 1/7 of the night duration
- **Twilight Angle**: Use a fixed angle that always resolves
- **Nearest Day**: Use times from the nearest date where normal calculation works

### Qibla Direction

Calculate compass bearing from observer's coordinates to the Kaaba (21.4225 N, 39.8262 E):

```
qibla = atan2(sin(Lk - Lo), cos(Fo) * tan(Fk) - sin(Fo) * cos(Lk - Lo))
```

Where Fk/Lk are Kaaba coordinates and Fo/Lo are observer coordinates.

### Convenience Utilities

Adhan-js provides helpers for common app features: `currentPrayer()` returns which prayer time is currently active, `nextPrayer()` returns the upcoming prayer. These enable countdown timers and notification scheduling.

## Key Takeaways

- Prayer time calculation is a solved astronomical problem; use proven libraries like adhan-js rather than rolling your own
- Always let users select their calculation method since regional preferences vary significantly
- High-latitude locations require special handling; implement at least one fallback strategy
- Return UTC times and convert to local timezone at the display layer
- Qibla direction is a great-circle bearing calculation, not a simple compass heading
