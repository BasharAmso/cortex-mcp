---
id: SKL-0386
name: Community Event Management
category: skills
tags: [events, rsvp, volunteer-scheduling, room-booking, service-times, religious-community, calendar]
capabilities: [event-scheduling, rsvp-management, volunteer-coordination, room-booking]
useWhen:
  - building event management for a religious community
  - implementing RSVP and attendance tracking for services
  - designing volunteer scheduling and coordination
  - adding room and resource booking for a community center
  - managing recurring service times with special event overrides
estimatedTokens: 650
relatedFragments: [SKL-0381, SKL-0383, PAT-0199]
dependencies: []
synonyms: ["how to manage church events", "how to build an RSVP system for a mosque", "how to schedule volunteers for community service", "how to book rooms for religious events", "how to track attendance at services", "how to manage recurring service times"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "religious"
---

# Skill: Community Event Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0386 |
| **Name** | Community Event Management |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Religious communities manage recurring services, special events, volunteer schedules, and facility bookings. The architecture adapts scheduling patterns from Cal.com to the unique needs of religious organizations with recurring worship services, seasonal events, and community coordination.

### Event Types

| Type | Recurrence | Examples |
|------|-----------|---------|
| **Regular Service** | Weekly, fixed day/time | Friday Jummah, Sunday Service, Shabbat |
| **Seasonal** | Annual, date varies | Ramadan, Easter, High Holidays |
| **Special Event** | One-time | Guest speaker, community dinner, fundraiser |
| **Class/Study** | Weekly series with end date | Quran study, Bible study, youth group |
| **Meeting** | As needed | Board meeting, committee review |

### Recurring Service Model

```
RecurringService {
  id, name, description,
  recurrenceRule: "RRULE:FREQ=WEEKLY;BYDAY=FR" (iCal format),
  startTime, endTime, timezone,
  location: room or address,
  capacity: number | null,
  overrides: [{ date, cancelled, newTime, newLocation, note }]
}
```

Use iCal RRULE format for recurrence rules. This standard handles weekly, bi-weekly, monthly, and complex patterns. Store overrides for cancellations (holiday closures) and time changes (Ramadan adjusted schedules).

### RSVP and Attendance

For capacity-managed events:

1. Display available spots (capacity minus confirmed RSVPs)
2. Allow RSVP with household size (families attending together)
3. Waitlist when capacity reached, auto-promote on cancellation
4. Check-in at the door (QR code, name lookup, or manual)
5. Post-event attendance report for community records

Attendance tracking over time helps with capacity planning and community engagement metrics.

### Volunteer Scheduling

Volunteers fill roles across services and events:

```
VolunteerSlot {
  eventId, role: "greeter" | "usher" | "audio" | "childcare" | "parking",
  requiredCount: number,
  assignedVolunteers: UserId[],
  reminderSent: boolean
}
```

Allow volunteers to self-schedule from available slots. Send reminders 24 hours before. Track volunteer hours for recognition. Support swap requests between volunteers for the same role.

### Room and Resource Booking

Community facilities need booking management:

- **Rooms**: Sanctuary, fellowship hall, classrooms, kitchen
- **Resources**: Projector, sound system, tables, chairs
- **Conflict detection**: Prevent double-booking of rooms and resources
- **Approval workflow**: Some rooms require admin approval before confirmation
- **Setup/teardown time**: Add buffer between bookings for transitions

### Notification Pipeline

| Event | Notification | Channel |
|-------|-------------|---------|
| New event published | Announcement to community | Email + push |
| RSVP confirmation | Confirmation to attendee | Email |
| 24h before event | Reminder to RSVPs | Push |
| Volunteer assigned | Schedule confirmation | Email + SMS |
| Event cancelled | Cancellation notice | Email + push + SMS |

## Key Takeaways

- Use iCal RRULE for recurrence rules with date-specific overrides for cancellations and schedule changes
- RSVP systems need household size support since families attend religious events together
- Volunteer self-scheduling with automated reminders reduces coordination overhead for community leaders
- Room booking requires buffer time between events and an approval workflow for restricted spaces
- Attendance tracking over time provides valuable data for capacity planning and engagement measurement
