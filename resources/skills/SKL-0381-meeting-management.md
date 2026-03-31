---
id: SKL-0381
name: Meeting Management
category: skills
tags: [meetings, scheduling, calendar, agenda, action-items, follow-ups, booking, availability]
capabilities: [meeting-scheduling, agenda-management, action-item-tracking, calendar-integration]
useWhen:
  - building a meeting scheduling and management system
  - implementing calendar integration with availability detection
  - designing agenda templates with action item tracking
  - creating booking pages for external scheduling
  - automating meeting follow-ups and action item reminders
estimatedTokens: 650
relatedFragments: [SKL-0375, PAT-0195, SKL-0380]
dependencies: []
synonyms: ["how to build a meeting scheduler", "how to integrate with Google Calendar", "how to track meeting action items", "how to build something like Calendly", "how to manage meeting agendas", "how to automate meeting follow-ups"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Skill: Meeting Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0381 |
| **Name** | Meeting Management |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Meeting management covers scheduling, agendas, notes, and follow-ups. Cal.com's architecture demonstrates how to build scheduling infrastructure with calendar integration, availability logic, and booking workflows using Next.js, tRPC, and Prisma.

### Event Type Model

An event type defines a bookable meeting template:

| Field | Purpose |
|-------|---------|
| **Title** | "30-min Discovery Call" |
| **Duration** | Length in minutes (15, 30, 60) |
| **Location** | Zoom, Google Meet, phone, in-person |
| **Availability** | Which hours/days are bookable |
| **Buffer** | Time before/after to prevent back-to-back |
| **Booking limits** | Max bookings per day/week |
| **Questions** | Custom intake form fields |

### Availability Engine

Cal.com calculates available slots by subtracting busy times from defined availability windows:

```
Available Slots = Availability Schedule
                - Connected Calendar Events
                - Existing Bookings
                - Buffer Times
                - Booking Limits
```

Connect multiple calendar sources (Google, Outlook, Apple) via CalDAV or provider APIs. Merge all busy times before calculating availability. Handle timezone conversion: store everything in UTC, display in the booker's local timezone.

### Booking Flow

```
1. Visitor selects event type from public booking page
2. Calendar widget shows available dates/times
3. Visitor picks slot and fills intake form
4. System double-checks availability (prevent race conditions)
5. Create calendar event on organizer's calendar
6. Send confirmation emails to both parties
7. Add to booking database for tracking
```

Use optimistic locking or a short reservation hold (5 minutes) to prevent double-booking when multiple visitors select the same slot simultaneously.

### Team Scheduling

For teams, Cal.com supports multiple scheduling strategies:

- **Round Robin**: Distribute bookings evenly across team members
- **Collective**: Find a time when all required members are available
- **Managed**: Admin configures event types for team members

Each strategy requires different availability calculations. Round Robin checks individual availability; Collective intersects all members' availability.

### Agenda and Action Items

Extend meeting management beyond scheduling with structured agendas:

1. **Pre-meeting**: Template-based agenda sent with calendar invite
2. **During meeting**: Collaborative notes with real-time editing
3. **Post-meeting**: Action items extracted with assignees and due dates
4. **Follow-up**: Automated reminder emails for pending action items

### Workflow Automations

Cal.com supports workflow triggers at booking lifecycle events: before event (reminders), after event (follow-up emails), on cancellation (feedback request), and on reschedule (updated notifications). Use these to eliminate manual follow-up overhead.

## Key Takeaways

- Calculate availability by subtracting all busy sources from the schedule window, always in UTC
- Use optimistic locking or short reservation holds to prevent double-booking race conditions
- Team scheduling requires different strategies (round robin, collective) with different availability math
- Extend meetings beyond scheduling with structured agendas, action items, and automated follow-ups
- Workflow automations at booking lifecycle events eliminate manual meeting coordination overhead
