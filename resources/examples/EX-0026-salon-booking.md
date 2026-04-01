---
id: EX-0026
name: Salon Booking System
category: examples
tags: [booking, salon, appointment, scheduling, availability, calendar, typescript]
capabilities: [appointment-booking, availability-checking, schedule-management]
useWhen:
  - building an appointment booking system for a service business
  - implementing time slot availability with conflict detection
  - creating a salon or spa scheduling feature
estimatedTokens: 650
relatedFragments: [SKL-0177, PAT-0094, PAT-0097, SKL-0195, SKL-0181]
dependencies: []
synonyms: ["appointment booking example", "salon scheduler", "booking system implementation", "time slot booking", "service booking app"]
sourceUrl: "https://github.com/calcom/cal.com"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "business-automation"
---

# Salon Booking System

Appointment booking with stylist availability, service duration, and conflict detection.

## Implementation

```typescript
// --- Types ---
interface Service {
  id: string;
  name: string;          // "Women's Haircut", "Color Treatment"
  durationMinutes: number;
  price: number;         // cents
  category: string;
}

interface Stylist {
  id: string;
  name: string;
  services: string[];    // service IDs this stylist can perform
  workingHours: { dayOfWeek: number; start: string; end: string }[]; // 0=Sun
}

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  stylistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  notes?: string;
}

// --- Availability Engine ---
function getAvailableSlots(
  stylist: Stylist,
  service: Service,
  date: Date,
  existingAppointments: Appointment[],
): Date[] {
  const dayOfWeek = date.getDay();
  const hours = stylist.workingHours.find(h => h.dayOfWeek === dayOfWeek);
  if (!hours) return []; // stylist doesn't work this day

  // Generate all possible slots (15-min increments)
  const slots: Date[] = [];
  const [startH, startM] = hours.start.split(':').map(Number);
  const [endH, endM] = hours.end.split(':').map(Number);

  const dayStart = new Date(date);
  dayStart.setHours(startH, startM, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(endH, endM, 0, 0);

  const slotDuration = service.durationMinutes;
  const current = new Date(dayStart);

  while (current.getTime() + slotDuration * 60000 <= dayEnd.getTime()) {
    const slotEnd = new Date(current.getTime() + slotDuration * 60000);

    // Check for conflicts with existing appointments
    const hasConflict = existingAppointments.some(appt => {
      if (appt.stylistId !== stylist.id) return false;
      if (appt.status === 'cancelled') return false;
      return appt.startTime < slotEnd && appt.endTime > current;
    });

    // Don't show past slots for today
    if (!hasConflict && current > new Date()) {
      slots.push(new Date(current));
    }

    current.setMinutes(current.getMinutes() + 15);
  }

  return slots;
}

// --- Booking ---
async function bookAppointment(
  input: { stylistId: string; serviceId: string; startTime: Date; client: { name: string; email: string; phone: string } },
): Promise<Appointment> {
  const service = await db.service.findUniqueOrThrow({ where: { id: input.serviceId } });
  const endTime = new Date(input.startTime.getTime() + service.durationMinutes * 60000);

  // Double-check availability (race condition guard)
  const conflict = await db.appointment.findFirst({
    where: {
      stylistId: input.stylistId,
      status: { not: 'cancelled' },
      startTime: { lt: endTime },
      endTime: { gt: input.startTime },
    },
  });

  if (conflict) throw new Error('Time slot is no longer available');

  const appointment = await db.appointment.create({
    data: {
      stylistId: input.stylistId,
      serviceId: input.serviceId,
      startTime: input.startTime,
      endTime,
      clientName: input.client.name,
      clientEmail: input.client.email,
      clientPhone: input.client.phone,
      status: 'confirmed',
    },
  });

  // Send confirmation (async)
  sendBookingConfirmation(appointment).catch(console.error);
  scheduleReminder(appointment, 24 * 60).catch(console.error); // 24h before

  return appointment;
}
```

## Key Patterns

- **15-minute slot increments**: standard for salons, avoids awkward gaps
- **Overlap detection**: `startTime < slotEnd && endTime > slotStart` catches all conflict cases
- **Race condition guard**: server re-checks availability at booking time, not just display time
- **Async notifications**: confirmation and reminder don't block the booking response
