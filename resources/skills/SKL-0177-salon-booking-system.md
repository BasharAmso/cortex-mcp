---
id: SKL-0177
name: Salon Booking System
category: skills
tags: [booking, appointments, salon, spa, scheduling, small-business]
capabilities: [time-slot-management, service-menu-design, staff-calendar, online-booking]
useWhen:
  - building an online appointment booking system for a salon or spa
  - designing a service menu with durations and pricing
  - managing staff calendars and availability windows
  - adding customer self-service booking to a website
  - handling appointment confirmations and cancellations
estimatedTokens: 650
relatedFragments: [PAT-0094, SKL-0181, SKL-0182, EX-0026]
dependencies: []
synonyms: ["how do I let customers book appointments online", "how to build a salon scheduling app", "what is the best way to manage salon appointments", "how do I show available time slots on my website", "how to prevent double-booking at my salon", "how do I set up online booking for my spa"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Salon Booking System

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0177 |
| **Name** | Salon Booking System |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A salon booking system lets customers pick a service, choose a staff member, and reserve an available time slot — all without a phone call. The architecture draws from Cal.com's scheduling engine, adapted for service businesses.

### Data Model Essentials

The minimum viable schema needs four entities: **Services** (name, duration, price, category), **Staff** (name, services they can perform, working hours), **Availability** (per-staff weekly schedule plus overrides for holidays), and **Bookings** (customer, service, staff, start time, status).

### Time Slot Calculation

Generate available slots by scanning a staff member's working hours, subtracting existing bookings, and applying buffer times between appointments. Cal.com handles this with availability rules evaluated against a booking window. For a salon, a 15-minute buffer between a color treatment and the next client prevents rushed transitions.

### Service Menu Design

Group services into categories (Haircuts, Color, Nails, Facials). Each service defines a **duration** that drives slot sizing — a 30-minute haircut and a 90-minute color treatment produce different available windows. Allow combo services (cut + color) that sum durations automatically.

### Double-Booking Prevention

Use optimistic locking or a database-level unique constraint on (staff_id, time_slot) to prevent two customers from grabbing the same slot. Cal.com uses conflict detection at the API layer — check availability at booking time, not just at page load.

### Customer Self-Service

The booking flow should be three steps: (1) pick service, (2) pick staff or "any available," (3) pick date/time. After booking, send an immediate confirmation via email or SMS. Allow cancellation and rescheduling up to a configurable cutoff (e.g., 24 hours before).

### Timezone and Calendar Sync

For multi-location salons, store all times in UTC and display in the customer's local timezone. Sync staff schedules to Google Calendar or Outlook so appointments appear alongside personal events.

## Key Takeaways

- Model services with durations so slot calculation is automatic
- Prevent double-booking at the database level, not just the UI
- Buffer times between appointments protect service quality
- "Any available staff" option increases booking success rate
- Confirmation and reminder messages reduce no-shows by 30-50%
