---
id: PAT-0082
name: Booking & Availability
category: patterns
tags: [booking, availability, reservation, calendar, scheduling, pricing, cancellation, real-estate, hospitality]
capabilities: [availability-calendar, reservation-lifecycle, conflict-detection, seasonal-pricing, cancellation-policy]
useWhen:
  - building a property booking or rental platform
  - implementing availability calendars with date range selection
  - detecting scheduling conflicts for shared resources
  - designing check-in and check-out workflows
  - adding seasonal or dynamic pricing logic
  - implementing cancellation and refund policies
estimatedTokens: 600
relatedFragments: [SKL-0154, SKL-0010, PAT-0004]
dependencies: []
synonyms: ["how to build a booking system", "availability calendar for rentals", "prevent double bookings", "reservation management", "how to handle cancellations", "seasonal pricing for properties"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/aelassas/movinin"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Booking & Availability

Design reliable booking systems that handle availability, reservations, conflict prevention, pricing, and cancellations without double-booking or lost revenue.

## Availability Calendar

Store availability as date ranges per bookable resource. Two storage approaches:

| Approach | Pros | Cons |
|----------|------|------|
| **Blocked dates** (store unavailable dates) | Simple queries, easy visual display | Grows with bookings, needs cleanup |
| **Availability windows** (store open ranges) | Compact storage, clear capacity view | Complex split logic on partial booking |

For most rental platforms, blocked-date storage is simpler. Mark each date as: available, booked, blocked (owner hold), or maintenance.

## Reservation Lifecycle

```
PENDING -> CONFIRMED -> CHECKED_IN -> CHECKED_OUT -> COMPLETED
                |                                        |
                +-> CANCELLED                     REVIEWED
```

- **Pending**: Hold dates for a time window (15-30 minutes) while payment processes
- **Confirmed**: Payment received, dates locked
- **Checked-in**: Guest has arrived, start-of-stay inspection
- **Checked-out**: End-of-stay inspection, damage assessment
- **Completed**: Fully settled, dates released for review period

## Conflict Detection

Prevent double-booking with these guards:

1. **Optimistic locking**: Check availability at read time, verify again at write time with a version check
2. **Date range overlap query**: `WHERE start_date < :checkout AND end_date > :checkin`
3. **Hold mechanism**: Temporarily reserve dates during checkout flow, expire after timeout
4. **Database constraint**: Unique index on (resource_id, date) for the blocked-dates approach

Always check conflicts at the database level, not just application level. Race conditions are real.

## Seasonal Pricing

| Component | Description |
|-----------|-------------|
| **Base rate** | Default nightly/weekly price for the resource |
| **Season multiplier** | Peak (1.5x), shoulder (1.2x), off-peak (1.0x) |
| **Length discount** | Weekly (-10%), monthly (-20%) |
| **Special dates** | Holidays, events with fixed premium |
| **Cleaning fee** | Flat per-stay fee |
| **Minimum stay** | Enforce per-season minimum nights |

Calculate total at booking time and store the breakdown. Never recalculate historical bookings against current rates.

## Cancellation Policies

Define policies as tiered refund schedules:

| Window | Refund | Example |
|--------|--------|---------|
| 30+ days before check-in | 100% | Full flexibility |
| 14-29 days | 50% | Moderate policy |
| 0-13 days | 0% | Strict, no refund |

Store the policy snapshot with each booking. If the policy changes later, existing bookings keep their original terms.

## Common Pitfalls

- **No timezone handling** -- Store all dates in UTC, display in property timezone
- **No hold expiration** -- Pending reservations that never complete must auto-expire
- **Price recalculation** -- Never recalculate confirmed booking prices from current rates
- **Calendar sync** -- Multi-platform listings need iCal export/import for cross-platform availability
