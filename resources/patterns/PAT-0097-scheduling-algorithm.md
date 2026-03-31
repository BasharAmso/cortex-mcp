---
id: PAT-0097
name: Scheduling Algorithm Pattern
category: patterns
tags: [scheduling, availability, calendar, timezone, round-robin, conflict-resolution]
capabilities: [availability-calculation, conflict-detection, round-robin-assignment, timezone-handling]
useWhen:
  - building a booking or appointment scheduling system
  - calculating available time slots from multiple calendars
  - implementing round-robin or load-balanced staff assignment
  - handling timezone conversions in scheduling
  - resolving conflicts between overlapping bookings
estimatedTokens: 650
relatedFragments: [PAT-0099, SKL-0184, SKL-0189]
dependencies: []
synonyms: ["how to build a scheduling system", "how to calculate available time slots", "round robin appointment assignment", "handling timezones in booking", "how to prevent double bookings"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: intermediate
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Scheduling Algorithm

Scheduling algorithms solve one core problem: given a set of constraints (provider availability, existing bookings, business rules), find the valid time slots a customer can book.

## Availability Calculation

The fundamental operation is set subtraction. Start with a provider's **working hours** (e.g., Mon-Fri 9am-5pm), subtract **existing bookings**, subtract **blocked time** (lunch, personal blocks), and subtract **buffer time** (before/after each appointment). What remains are available slots.

```
available = working_hours - booked - blocked - buffers
```

Cal.com, the open-source scheduling platform built with Next.js and Prisma, implements this as a pipeline: fetch working hours from the database, overlay connected calendar events (Google Calendar, Outlook), apply booking rules, and return valid slots. Store availability rules in the database (Prisma schema maps provider availability, booking durations, and buffer configurations as first-class entities).

## Slot Generation

Convert continuous available blocks into discrete bookable slots. If a provider is free from 9am-12pm and appointments are 30 minutes with 10-minute buffers, generate: 9:00, 9:40, 10:20, 11:00, 11:40. The step size is `duration + buffer`, not just `duration`. Always generate slots in UTC internally and convert to the customer's timezone for display.

## Conflict Resolution

Double-booking prevention requires atomic operations. When a customer selects a slot: (1) check availability again at booking time (not just at display time), (2) create the booking in a database transaction, (3) if a race condition creates a conflict, the second write fails and the customer is asked to pick a new slot. Cal.com uses Prisma transactions for this. For high-traffic systems, add optimistic locking with a version field on the availability record.

## Round-Robin Assignment

For businesses with multiple providers (stylists, consultants, mechanics): round-robin distributes bookings evenly. Track each provider's booking count for the period. When a customer requests "any available provider," sort providers by least-bookings-first, filter to those available at the requested time, and assign the first match. Cal.com supports round-robin as a first-class event type. Weighted round-robin lets senior staff take more or fewer bookings by adjusting their weight.

## Timezone Handling

Three rules prevent timezone bugs: (1) **Store everything in UTC** in the database. (2) **Convert to local time only at display.** (3) **Include the timezone identifier** (e.g., "America/New_York", not "EST") in all API responses. When a customer in PST books a slot that a provider in EST defined, the calculation must account for both timezones. Use libraries like `date-fns-tz` or `luxon` for conversions. Never use fixed UTC offsets (they break during daylight saving transitions).

## Business Rules

Layer additional constraints on top of base availability: **minimum notice** (no bookings less than 2 hours from now), **maximum advance** (no bookings more than 30 days out), **daily limits** (max 8 appointments per provider per day), and **slot-specific rules** (certain services only available on certain days). Each rule is a filter applied to the slot generation pipeline.

## Key Takeaways

- Model availability as set subtraction: working hours minus bookings, blocks, and buffers
- Generate slots in UTC, display in the customer's timezone using IANA timezone identifiers
- Prevent double-booking with database transactions and re-check at booking time
- Distribute load across providers with round-robin sorted by least-bookings-first
- Layer business rules (minimum notice, daily limits, service restrictions) as pipeline filters
