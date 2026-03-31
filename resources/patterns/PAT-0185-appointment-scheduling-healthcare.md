---
id: PAT-0185
name: Appointment Scheduling for Healthcare
category: patterns
tags: [appointment, scheduling, healthcare, provider-availability, insurance, intake-forms, booking, calendar]
capabilities: [provider-scheduling, insurance-verification, intake-form-design, appointment-booking]
useWhen:
  - building appointment booking for a healthcare application
  - designing provider availability and scheduling systems
  - implementing insurance verification before appointments
  - creating patient intake forms for pre-visit data collection
  - managing appointment reminders and cancellation policies
estimatedTokens: 650
relatedFragments: [SKL-0357, SKL-0362, PAT-0186, PAT-0184]
dependencies: []
synonyms: ["how to build doctor appointment booking", "healthcare scheduling system design", "patient intake form before appointment", "provider availability calendar", "medical appointment reminder system", "insurance check before booking"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Appointment Scheduling for Healthcare

Healthcare scheduling adds complexity beyond standard calendar booking: insurance verification, intake forms, provider specialties, and regulatory requirements. The Cal.com open-source scheduling platform demonstrates patterns that translate well to healthcare contexts.

## Booking Flow

```
Select Reason → Choose Provider → Pick Time → Insurance Info → Intake Form → Confirm
```

### Step 1: Reason for Visit

Categorize visit types to route to the right provider and allocate the right duration:

| Visit Type | Duration | Provider Type |
|------------|----------|---------------|
| Annual physical | 30 min | Primary care |
| Follow-up | 15 min | Assigned provider |
| New concern | 20 min | Primary care |
| Specialist referral | 45 min | Specialist |
| Urgent same-day | 15 min | First available |
| Telehealth check-in | 15 min | Assigned provider |

### Step 2: Provider Selection

```typescript
interface ProviderSlot {
  providerId: string;
  providerName: string;
  specialty: string;
  location: string;            // Office name or 'Telehealth'
  dateTime: Date;
  duration: number;            // minutes
  availabilityType: 'in-person' | 'telehealth' | 'both';
}

// Filter slots by: provider preference, insurance accepted, location, availability
async function getAvailableSlots(filters: {
  visitType: string;
  insurancePlan?: string;
  preferredProvider?: string;
  location?: string;
  dateRange: { start: Date; end: Date };
}): Promise<ProviderSlot[]> {
  // 1. Filter providers who handle this visit type
  // 2. Filter by insurance acceptance
  // 3. Query schedule for open slots in date range
  // 4. Exclude slots with buffer time conflicts
  // 5. Sort by: preferred provider first, then soonest available
}
```

Display available slots as a date picker with time slots, similar to Cal.com's approach:
- Show the next 2 weeks of availability by default
- Highlight "soonest available" prominently
- Show provider name and photo for each slot
- Indicate in-person vs. telehealth options

### Step 3: Insurance Verification

Before confirming, verify insurance eligibility:

- Collect insurance provider, plan name, member ID, and group number
- Run real-time eligibility check via clearinghouse API (e.g., Availity, Change Healthcare)
- Show coverage status: covered, partially covered, out-of-network, or unable to verify
- If unverified, allow booking but warn about potential out-of-pocket costs

### Step 4: Intake Form

Pre-visit intake collects information the provider needs:

```typescript
interface IntakeForm {
  chiefComplaint: string;        // "What brings you in today?"
  symptomDuration: string;
  currentMedications: string[];
  allergies: string[];
  recentChanges: string;         // "Any changes since your last visit?"
  familyHistory?: string[];
  socialHistory?: {
    smoking: boolean;
    alcohol: string;
    exercise: string;
  };
}
```

- Save partially completed forms (patients may not finish in one sitting)
- Pre-fill from previous visits where possible
- Required fields: chief complaint and current medications only
- Attach completed form to the appointment record for provider review

## Reminders and Cancellation

- **48 hours before**: Email reminder with appointment details and intake form link
- **24 hours before**: SMS reminder with a "Confirm or Reschedule" option
- **2 hours before**: Final reminder with directions or telehealth link
- **Cancellation policy**: Free cancellation up to 24 hours; late cancellation may incur fee
- **No-show tracking**: Flag patients with 3+ no-shows for staff awareness

## Key Takeaways

- Route patients to the right provider and duration based on visit reason, not manual selection
- Insurance verification before booking prevents surprise billing and cancellations
- Pre-visit intake forms save provider time and improve appointment quality
- Multi-stage reminders (48h, 24h, 2h) with confirm/reschedule reduce no-show rates
- Save partial intake form progress since patients often complete forms across multiple sessions
