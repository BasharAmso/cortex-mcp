---
id: PAT-0094
name: Appointment Booking Pattern
category: patterns
tags: [booking, scheduling, time-slots, availability, cancellation, small-business]
capabilities: [slot-calculation, buffer-management, conflict-prevention, cancellation-handling]
useWhen:
  - calculating available time slots from staff schedules
  - implementing buffer times between appointments
  - designing cancellation and rescheduling policies
  - preventing double-booking across concurrent requests
  - building a booking widget for a website
estimatedTokens: 650
relatedFragments: [SKL-0177, SKL-0181, SKL-0182]
dependencies: []
synonyms: ["how do I calculate available time slots", "how to prevent double-booking appointments", "what is the best way to handle cancellations", "how do I add buffer time between appointments", "how to build a booking calendar widget", "how do I handle timezone differences in booking"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Appointment Booking

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0094 |
| **Name** | Appointment Booking Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

The appointment booking pattern solves a deceptively tricky problem: letting multiple people claim time from a shared, constrained resource (a person's calendar) without conflicts. Cal.com's scheduling engine handles this at scale with availability rules, conflict detection, and timezone normalization.

### Slot Calculation Algorithm

The core algorithm generates bookable slots from three inputs:

1. **Availability rules**: Weekly recurring windows (e.g., Mon-Fri 9am-5pm) with date-specific overrides (closed Dec 25, half-day Jan 2).
2. **Existing bookings**: Already-claimed time blocks.
3. **Service duration + buffer**: The appointment length plus padding before/after.

```
for each day in booking_window:
  working_hours = get_availability(staff, day)  // e.g., 9:00-17:00
  booked_slots = get_bookings(staff, day)       // e.g., [10:00-10:30, 14:00-15:00]
  for each candidate_slot in generate_intervals(working_hours, duration + buffer):
    if no_overlap(candidate_slot, booked_slots):
      available_slots.append(candidate_slot)
```

Cal.com generates intervals at configurable increments (15min, 30min, 60min) and checks each against existing bookings.

### Buffer Time Strategy

Buffers prevent back-to-back appointments from bleeding into each other. Three types: **before-buffer** (setup/prep time), **after-buffer** (cleanup, notes, transition), and **minimum notice** (don't allow booking less than 2 hours from now). A 60-minute massage with 15-minute buffers actually blocks 90 minutes on the calendar.

### Double-Booking Prevention

Two customers viewing the same available slot simultaneously creates a race condition. Solutions, in order of robustness:

1. **Database constraint**: Unique index on (staff_id, slot_start) — the database rejects the second insert.
2. **Optimistic locking**: Check availability at submit time, fail gracefully if the slot was taken between page load and submission.
3. **Temporary holds**: Reserve the slot for 5-10 minutes while the customer completes the booking form. Release if abandoned.

Cal.com uses API-layer conflict detection — checking at booking time, not just at render time.

### Cancellation and Rescheduling

Define a **cancellation window** (e.g., free cancellation up to 24 hours before, 50% fee within 24 hours, no refund for no-shows). When cancelled, immediately release the slot back to availability. For rescheduling, treat it as cancel + rebook in a single transaction to prevent losing the slot.

### Timezone Handling

Store all times in **UTC** in the database. Convert to the customer's timezone for display and to the staff member's timezone for their calendar. Cal.com resolves timezones at the API boundary — the frontend sends the customer's timezone, the backend calculates slots in UTC, and returns them converted. This prevents the classic "I booked 2pm but it was 2pm in a different timezone" problem.

## Key Takeaways

- Generate slots from availability minus existing bookings minus buffers
- Prevent double-booking at the database level, not just the UI
- Buffer times are invisible to customers but protect service quality
- Store UTC, display local — timezone bugs are the most common booking system defect
- Cancellation policies should be enforced automatically, not manually
