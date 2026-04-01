---
id: EX-0040
name: Prayer Time Calculator
category: examples
tags: [islamic, prayer-times, geolocation, timezone, astronomy, typescript, religious, calculation-method]
capabilities: [prayer-time-calculation, sun-position-math, timezone-handling, multi-method-support]
useWhen:
  - calculating Islamic prayer times based on location and date
  - building a Muslim prayer app with multiple calculation methods
  - implementing sun position math for salah times
estimatedTokens: 650
relatedFragments: [SKL-0382, SKL-0153, PAT-0080]
dependencies: []
synonyms: ["salah time calculator", "adhan time engine", "islamic prayer schedule", "prayer time API", "muslim prayer times"]
sourceUrl: "https://github.com/batoulapps/adhan-js"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "religious"
---

# Prayer Time Calculator

Islamic prayer time calculation based on location, date, and calculation method using solar position math.

## Implementation

```typescript
// --- Types ---
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface CalculationMethod {
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  maghribAngle: number;
}

interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

// --- Calculation Methods ---
const METHODS: Record<string, CalculationMethod> = {
  MWL: { name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17, maghribAngle: 0 },
  ISNA: { name: 'Islamic Society of North America', fajrAngle: 15, ishaAngle: 15, maghribAngle: 0 },
  EGYPT: { name: 'Egyptian General Authority', fajrAngle: 19.5, ishaAngle: 17.5, maghribAngle: 0 },
  MAKKAH: { name: 'Umm al-Qura University', fajrAngle: 18.5, ishaAngle: 0, maghribAngle: 0 },
};

// --- Solar Math ---
function toRadians(deg: number): number { return deg * Math.PI / 180; }
function toDegrees(rad: number): number { return rad * 180 / Math.PI; }

function sunDeclination(dayOfYear: number): number {
  return -23.44 * Math.cos(toRadians((360 / 365) * (dayOfYear + 10)));
}

function equationOfTime(dayOfYear: number): number {
  const b = toRadians((360 / 365) * (dayOfYear - 81));
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

function solarNoon(longitude: number, timezone: number, eot: number): number {
  return 12 + (-longitude / 15) - (eot / 60) + timezone;
}

function hourAngle(latitude: number, declination: number, angle: number): number {
  const lat = toRadians(latitude);
  const dec = toRadians(declination);
  const cosH = (-Math.sin(toRadians(angle)) - Math.sin(lat) * Math.sin(dec))
    / (Math.cos(lat) * Math.cos(dec));
  return toDegrees(Math.acos(Math.max(-1, Math.min(1, cosH))));
}

function hoursToDate(date: Date, hours: number): Date {
  const result = new Date(date);
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  result.setHours(h, m, 0, 0);
  return result;
}

// --- Main Calculator ---
function calculatePrayerTimes(
  coords: Coordinates,
  date: Date,
  methodKey: string,
  timezone: number
): PrayerTimes {
  const method = METHODS[methodKey] ?? METHODS.MWL;
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);

  const declination = sunDeclination(dayOfYear);
  const eot = equationOfTime(dayOfYear);
  const noon = solarNoon(coords.longitude, timezone, eot);

  const fajrHA = hourAngle(coords.latitude, declination, method.fajrAngle) / 15;
  const sunriseHA = hourAngle(coords.latitude, declination, 0.833) / 15;
  const ishaHA = hourAngle(coords.latitude, declination, method.ishaAngle) / 15;

  // ASR: shadow length equals object height (Shafi'i)
  const asrFactor = 1;
  const asrDec = toRadians(declination);
  const asrAngle = toDegrees(Math.atan(1 / (asrFactor + Math.tan(toRadians(Math.abs(coords.latitude - toDegrees(asrDec)))))));
  const asrHA = hourAngle(coords.latitude, declination, -asrAngle) / 15;

  return {
    fajr: hoursToDate(date, noon - fajrHA),
    sunrise: hoursToDate(date, noon - sunriseHA),
    dhuhr: hoursToDate(date, noon),
    asr: hoursToDate(date, noon + asrHA),
    maghrib: hoursToDate(date, noon + sunriseHA),
    isha: hoursToDate(date, noon + ishaHA),
  };
}
```

## Key Patterns

- **Multiple calculation methods**: MWL, ISNA, Egyptian, Umm al-Qura each use different Fajr/Isha angles
- **Solar position math**: declination and equation-of-time drive hour angle calculations
- **Timezone-aware**: solar noon offset by longitude and UTC offset
- **Shafi'i Asr**: shadow equals object height; Hanafi uses double (change `asrFactor` to 2)
