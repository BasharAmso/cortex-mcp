---
id: EX-0050
name: Multi-Service Booking System
category: examples
tags: [booking, scheduling, calendar, timezone, resource-allocation, conflict-resolution, typescript, business]
capabilities: [resource-booking, timezone-handling, conflict-detection, availability-engine]
useWhen:
  - building a booking system that supports multiple service types
  - implementing resource allocation with conflict detection
  - handling timezone-aware scheduling for appointments
  - designing an availability engine with buffer times
estimatedTokens: 650
relatedFragments: [PAT-0094, SKL-0181, EX-0026, PAT-0097]
dependencies: []
synonyms: ["appointment scheduler", "reservation system", "calendar booking engine", "resource scheduling", "service booking platform"]
sourceUrl: "https://github.com/calcom/cal.com"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "business-automation"
---

# Multi-Service Booking System

Generic booking engine supporting multiple service types, resources, and time zones with conflict resolution.

## Implementation

```typescript
// --- Types ---
interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  bufferMinutes: number;
  requiredResources: string[];
  price: number;
}

interface Resource {
  id: string;
  name: string;
  type: string; // 'room', 'staff', 'equipment'
  timezone: string;
  availability: WeeklySchedule;
}

interface WeeklySchedule {
  [dayOfWeek: number]: Array<{ start: string; end: string }>; // 0=Sun, "09:00" format
}

interface Booking {
  id: string;
  serviceId: string;
  resourceIds: string[];
  customerEmail: string;
  startUtc: Date;
  endUtc: Date;
  status: 'confirmed' | 'cancelled' | 'completed';
}

interface TimeSlot {
  startUtc: Date;
  endUtc: Date;
  available: boolean;
}

// --- Timezone Helpers ---
function toLocalHour(utcDate: Date, timezone: string): number {
  const local = new Date(utcDate.toLocaleString('en-US', { timeZone: timezone }));
  return local.getHours() + local.getMinutes() / 60;
}

function getDayOfWeek(utcDate: Date, timezone: string): number {
  const local = new Date(utcDate.toLocaleString('en-US', { timeZone: timezone }));
  return local.getDay();
}

// --- Conflict Detection ---
function hasConflict(existing: Booking[], start: Date, end: Date, resourceIds: string[]): boolean {
  return existing.some(booking => {
    if (booking.status === 'cancelled') return false;
    const resourceOverlap = booking.resourceIds.some(id => resourceIds.includes(id));
    const timeOverlap = start < booking.endUtc && end > booking.startUtc;
    return resourceOverlap && timeOverlap;
  });
}

// --- Availability Engine ---
function isWithinSchedule(resource: Resource, startUtc: Date, endUtc: Date): boolean {
  const day = getDayOfWeek(startUtc, resource.timezone);
  const windows = resource.availability[day];
  if (!windows || windows.length === 0) return false;

  const startHour = toLocalHour(startUtc, resource.timezone);
  const endHour = toLocalHour(endUtc, resource.timezone);

  return windows.some(w => {
    const [wStartH, wStartM] = w.start.split(':').map(Number);
    const [wEndH, wEndM] = w.end.split(':').map(Number);
    const wStart = wStartH + wStartM / 60;
    const wEnd = wEndH + wEndM / 60;
    return startHour >= wStart && endHour <= wEnd;
  });
}

function getAvailableSlots(
  service: Service,
  resources: Resource[],
  existingBookings: Booking[],
  date: Date,
  slotIntervalMinutes = 30
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayStart = new Date(date);
  dayStart.setUTCHours(0, 0, 0, 0);

  for (let m = 0; m < 24 * 60; m += slotIntervalMinutes) {
    const start = new Date(dayStart.getTime() + m * 60000);
    const end = new Date(start.getTime() + service.durationMinutes * 60000);
    const bufferedEnd = new Date(end.getTime() + service.bufferMinutes * 60000);

    // All required resources must be available and within schedule
    const allAvailable = resources
      .filter(r => service.requiredResources.includes(r.id))
      .every(r => isWithinSchedule(r, start, end));

    const noConflict = !hasConflict(
      existingBookings, start, bufferedEnd, service.requiredResources
    );

    slots.push({ startUtc: start, endUtc: end, available: allAvailable && noConflict });
  }

  return slots.filter(s => s.available);
}

// --- Booking Engine ---
function createBooking(
  service: Service,
  resources: Resource[],
  existingBookings: Booking[],
  startUtc: Date,
  customerEmail: string
): Booking | { error: string } {
  const endUtc = new Date(startUtc.getTime() + service.durationMinutes * 60000);
  const bufferedEnd = new Date(endUtc.getTime() + service.bufferMinutes * 60000);
  const resourceIds = service.requiredResources;

  // Validate all resources are within schedule
  const unavailable = resources
    .filter(r => resourceIds.includes(r.id))
    .find(r => !isWithinSchedule(r, startUtc, endUtc));

  if (unavailable) return { error: `Resource "${unavailable.name}" is not available at this time` };

  // Check conflicts (including buffer time)
  if (hasConflict(existingBookings, startUtc, bufferedEnd, resourceIds)) {
    return { error: 'Time slot conflicts with an existing booking' };
  }

  return {
    id: crypto.randomUUID(),
    serviceId: service.id,
    resourceIds,
    customerEmail,
    startUtc,
    endUtc,
    status: 'confirmed',
  };
}
```

## Key Patterns

- **Resource-based scheduling**: each service declares required resources; all must be free
- **Buffer time**: prevents back-to-back bookings by extending conflict window past the service end
- **Timezone-aware availability**: resource schedules are defined in local time, queries use UTC
- **Conflict detection**: checks both resource overlap and time overlap before confirming
