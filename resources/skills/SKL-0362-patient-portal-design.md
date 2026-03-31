---
id: SKL-0362
name: Patient Portal Design
category: skills
tags: [patient-portal, medical-records, fhir, appointment-booking, lab-results, healthcare, ehr, messaging]
capabilities: [patient-portal-architecture, medical-record-display, appointment-booking, secure-messaging]
useWhen:
  - building a patient-facing healthcare portal
  - displaying medical records and lab results to patients
  - implementing appointment booking for healthcare providers
  - designing secure messaging between patients and care teams
  - integrating with EHR systems via FHIR
estimatedTokens: 650
relatedFragments: [SKL-0357, SKL-0363, PAT-0185, PAT-0186]
dependencies: []
synonyms: ["how to build a patient portal", "medical records viewer for patients", "healthcare appointment booking system", "FHIR patient portal integration", "lab results display design", "doctor patient messaging app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hapifhir/hapi-fhir"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Patient Portal Design

A patient portal gives patients secure access to their medical records, appointment scheduling, lab results, and communication with their care team. FHIR (Fast Healthcare Interoperability Resources) is the standard protocol for accessing clinical data.

## Core Feature Set

| Feature | Description | Data Source |
|---------|-------------|-------------|
| **Medical Records** | Conditions, allergies, medications, immunizations | FHIR Patient, Condition, AllergyIntolerance, MedicationRequest |
| **Lab Results** | Test results with reference ranges and trends | FHIR Observation, DiagnosticReport |
| **Appointments** | View upcoming, book new, cancel/reschedule | FHIR Appointment, Schedule, Slot |
| **Messaging** | Secure async communication with care team | FHIR Communication |
| **Documents** | Visit summaries, discharge instructions, imaging reports | FHIR DocumentReference |

## FHIR Integration

FHIR R4 is the current standard. Access patient data through RESTful resources:

```typescript
// Fetch patient's active conditions
const conditions = await fhirClient.search({
  resourceType: 'Condition',
  searchParams: {
    patient: patientId,
    'clinical-status': 'active',
    _sort: '-recorded-date'
  }
});

// Fetch lab results with reference ranges
const labResults = await fhirClient.search({
  resourceType: 'Observation',
  searchParams: {
    patient: patientId,
    category: 'laboratory',
    _sort: '-date',
    _count: 50
  }
});

// Each Observation includes:
// - code (LOINC): what was measured
// - valueQuantity: the result value and unit
// - referenceRange: normal low/high bounds
// - interpretation: 'H' (high), 'L' (low), 'N' (normal)
```

## Lab Results Display

Lab results need careful presentation since patients may not understand medical values:

```
┌─────────────────────────────────────────┐
│  Hemoglobin A1c                         │
│  Result: 6.2%    Status: Slightly High  │
│  Reference Range: 4.0 - 5.6%           │
│                                         │
│  ├──────────[████████▓░░]──────────┤    │  ← Visual range bar
│  4.0%         5.6%    6.2%   8.0%       │
│                                         │
│  History: 6.8% → 6.5% → 6.2% ↓         │  ← Trending indicator
│  Last 3 readings show improvement       │
└─────────────────────────────────────────┘
```

- Color-code results: green (normal), yellow (borderline), red (out of range)
- Show historical trend with direction arrow
- Provide plain-language explanations (not just numbers)
- Link to educational content about what each test measures

## Appointment Booking Flow

1. **Select reason** for visit (annual physical, follow-up, new concern)
2. **Choose provider** (primary care, specialist) with filters for availability
3. **Pick time slot** from provider's open schedule (FHIR Schedule/Slot resources)
4. **Complete intake** form (symptoms, medication changes since last visit)
5. **Confirm** with calendar invite and reminder setup

## Secure Messaging Design

- Messages must be stored encrypted and accessed only by the patient and their care team
- Set expectations: "Responses within 2 business days. For urgent issues, call the office."
- Allow file attachments (photos of rashes, documents) with size limits
- Thread messages by topic to keep conversations organized
- Never use messaging for emergencies; show prominent emergency guidance

## Identity and Access

- **Identity proofing** during registration (verify identity before granting access to medical records)
- **MFA required** for all logins (health data is high-value)
- **Proxy access** for parents/guardians of minors and caregivers of elderly patients
- **Session timeout** after 15 minutes of inactivity with re-authentication required

## Key Takeaways

- Use FHIR R4 as the standard protocol for EHR integration; it is widely supported
- Present lab results with visual range bars, trend arrows, and plain-language explanations
- Secure messaging needs clear response time expectations and emergency redirection
- Proxy access for caregivers and guardians is essential for real-world use
- Identity proofing at registration prevents unauthorized access to medical records
