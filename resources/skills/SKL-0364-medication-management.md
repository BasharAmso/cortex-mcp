---
id: SKL-0364
name: Medication Management
category: skills
tags: [medication, reminders, drug-interactions, refill-tracking, pill-identification, pharmacy, adherence]
capabilities: [medication-reminder-design, interaction-checking, refill-tracking, pill-identification]
useWhen:
  - building a medication reminder or adherence application
  - implementing drug interaction checking features
  - designing refill tracking and pharmacy integration
  - creating pill identification features with camera
  - helping users manage complex medication schedules
estimatedTokens: 650
relatedFragments: [SKL-0362, SKL-0363, SKL-0359, PAT-0184]
dependencies: []
synonyms: ["how to build a pill reminder app", "medication adherence tracker design", "drug interaction checker integration", "prescription refill reminder system", "pharmacy app development", "medication schedule management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "health"
---

# Medication Management

Medication management apps help patients take the right medications at the right time. Poor adherence is responsible for up to 50% of treatment failures, making this a high-impact health feature.

## Data Model

```typescript
interface Medication {
  id: string;
  userId: string;
  name: string;                    // 'Metformin'
  genericName: string;             // 'Metformin Hydrochloride'
  dosage: string;                  // '500mg'
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'patch' | 'inhaler';
  color?: string;                  // For pill identification
  shape?: string;                  // 'round', 'oval', 'capsule'
  imprint?: string;                // Text stamped on the pill
  prescribedBy?: string;
  pharmacy?: string;
  rxNumber?: string;
  refillsRemaining?: number;
  supply: number;                  // Days of supply remaining
}

interface MedicationSchedule {
  medicationId: string;
  frequency: 'daily' | 'twice-daily' | 'weekly' | 'as-needed' | 'custom';
  times: string[];                 // ['08:00', '20:00']
  daysOfWeek?: number[];           // [1, 3, 5] for Mon/Wed/Fri
  withFood: boolean;
  instructions?: string;           // 'Take with a full glass of water'
  startDate: Date;
  endDate?: Date;
}

interface MedicationLog {
  scheduleId: string;
  scheduledTime: Date;
  status: 'taken' | 'skipped' | 'late' | 'pending';
  actualTime?: Date;
  note?: string;
}
```

## Reminder System

Reminders are the core feature. Design for reliability:

- **Push notifications** at scheduled times with medication name and dosage
- **Escalating reminders**: first notification at scheduled time, follow-up 15 minutes later if not acknowledged
- **Snooze option** (15 min, 30 min, 1 hour) for legitimate delays
- **Confirmation required**: user must tap "Taken" or "Skipped" (with optional reason)
- **Caregiver alerts**: notify a designated person if the patient misses doses consistently

```typescript
// Notification content should be clear and actionable
const notification = {
  title: 'Time for Metformin',
  body: '500mg - Take with food',
  actions: [
    { id: 'taken', title: 'Taken ✓' },
    { id: 'snooze', title: 'Remind in 15min' },
    { id: 'skip', title: 'Skip' }
  ]
};
```

## Drug Interaction Checking

Use the NIH RxNorm API and NLM Interaction API to check for dangerous combinations:

- Check interactions whenever a new medication is added
- Severity levels: major (contraindicated), moderate (use with caution), minor (monitor)
- Show clear explanations: "Metformin + Alcohol may increase risk of lactic acidosis"
- Include a disclaimer: interaction data is informational; consult your pharmacist or doctor
- Store the drug's RxCUI (RxNorm concept identifier) for reliable API lookups

## Refill Tracking

- Calculate supply remaining based on doses taken and initial supply count
- Alert when supply drops below 7 days
- Show pharmacy phone number and refill number for easy one-tap refill calls
- Track refills remaining on the prescription
- Integration with pharmacy APIs (where available) for automatic refill status

## Adherence Dashboard

Show patients their medication adherence to motivate consistency:

- **Weekly adherence rate**: percentage of scheduled doses taken on time
- **Streak counter**: consecutive days with all medications taken
- **Calendar heatmap**: green (all taken), yellow (partial), red (missed) per day
- **Monthly report**: downloadable PDF to share with their doctor

## Key Takeaways

- Escalating reminders with snooze options balance persistence with user respect
- Drug interaction checking is a safety-critical feature; use established APIs like RxNorm
- Track supply remaining to alert users before they run out of medication
- Adherence visualization motivates consistency without being punitive about missed doses
- Always include disclaimers that the app supplements but does not replace professional guidance
