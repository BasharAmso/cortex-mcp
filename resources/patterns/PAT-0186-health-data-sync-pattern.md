---
id: PAT-0186
name: Health Data Sync Pattern
category: patterns
tags: [fhir, health-data, sync, interoperability, patient-matching, ehr, hl7, data-exchange]
capabilities: [fhir-resource-sync, cross-system-interop, patient-matching, data-reconciliation]
useWhen:
  - syncing health data between systems using FHIR
  - implementing cross-system patient record matching
  - building interoperability between EHR systems
  - designing data reconciliation for health records from multiple sources
  - integrating with hospital or clinic APIs
estimatedTokens: 650
relatedFragments: [SKL-0362, SKL-0363, SKL-0358, PAT-0185]
dependencies: []
synonyms: ["how to sync health records between systems", "FHIR data exchange implementation", "patient matching across systems", "EHR interoperability guide", "health data reconciliation pattern", "cross-system medical record sync"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hapifhir/hapi-fhir"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Health Data Sync Pattern

Health data lives in multiple systems: EHRs, lab systems, pharmacies, wearables, and patient apps. FHIR (Fast Healthcare Interoperability Resources) provides the standard protocol for exchanging this data. The HAPI FHIR library is the most widely used open-source FHIR implementation.

## FHIR Resource Model

FHIR organizes health data into typed resources:

| Resource | Contains | Key Fields |
|----------|----------|------------|
| **Patient** | Demographics | name, birthDate, identifier, address |
| **Condition** | Diagnoses | code (ICD-10), clinicalStatus, onsetDateTime |
| **Observation** | Lab results, vitals | code (LOINC), value, referenceRange |
| **MedicationRequest** | Prescriptions | medication, dosageInstruction, status |
| **Appointment** | Scheduled visits | participant, start, end, status |
| **DocumentReference** | Clinical documents | type, content, date |

## Sync Architecture

```
Source System A ──→ FHIR API ──→ Sync Engine ──→ FHIR API ──→ Destination System B
                                     ↓
                              Patient Matching
                              Conflict Resolution
                              Audit Logging
```

### Pull-Based Sync

Query for resources modified since the last sync:

```typescript
// Fetch all observations updated since last sync
const lastSync = await getLastSyncTimestamp('observations');
const bundle = await fhirClient.search({
  resourceType: 'Observation',
  searchParams: {
    patient: patientId,
    _lastUpdated: `gt${lastSync}`,
    _sort: '_lastUpdated',
    _count: 100
  }
});

// Process each resource in the bundle
for (const entry of bundle.entry || []) {
  const observation = entry.resource as Observation;
  await reconcileResource(observation);
}

await updateLastSyncTimestamp('observations', new Date());
```

### Subscription-Based Sync (Preferred)

FHIR R5 Subscriptions push changes in real-time:

```typescript
// Create a subscription for new lab results
const subscription = {
  resourceType: 'Subscription',
  status: 'requested',
  topic: 'http://example.org/fhir/SubscriptionTopic/lab-results',
  filterBy: [{ filterParameter: 'patient', value: patientId }],
  channelType: { code: 'rest-hook' },
  endpoint: 'https://myapp.com/fhir-webhooks/lab-results',
  contentType: 'application/fhir+json'
};
```

## Patient Matching

The same patient may have different identifiers in different systems. Matching is critical:

```typescript
interface PatientMatchScore {
  patientIdA: string;
  patientIdB: string;
  score: number;                  // 0-100 confidence
  matchedOn: string[];            // ['name', 'dob', 'ssn-last4']
}

function calculateMatchScore(a: Patient, b: Patient): number {
  let score = 0;
  if (exactMatch(a.name, b.name)) score += 30;
  else if (fuzzyMatch(a.name, b.name) > 0.85) score += 20;
  if (a.birthDate === b.birthDate) score += 25;
  if (matchIdentifier(a, b, 'SSN')) score += 35;
  if (matchIdentifier(a, b, 'MRN')) score += 30;
  if (a.telecom?.phone === b.telecom?.phone) score += 10;
  if (a.address?.postalCode === b.address?.postalCode) score += 5;
  return Math.min(score, 100);
}

// Thresholds: >= 85 = auto-link, 60-84 = manual review, < 60 = no match
```

## Conflict Resolution

When the same resource exists in two systems with different values:

| Strategy | When to Use |
|----------|-------------|
| **Source of truth** | One system is authoritative (e.g., EHR for diagnoses) |
| **Most recent wins** | Use the record with the latest `lastUpdated` timestamp |
| **Manual review** | Flag for clinician review when values differ meaningfully |
| **Merge** | Combine non-conflicting fields from both records |

Always preserve the original records before merging. Create an audit trail showing what changed and why.

## Error Handling

- **Retry with exponential backoff** for transient failures (network, rate limits)
- **Dead letter queue** for resources that fail repeatedly
- **Partial sync recovery**: track sync progress per-resource-type so failures in one type do not block others
- **Idempotency**: use FHIR `If-None-Exist` headers to prevent duplicate creation

## Key Takeaways

- Use FHIR R4/R5 as the standard protocol; HAPI FHIR is the leading open-source implementation
- Subscription-based sync is preferred over polling for real-time data exchange
- Patient matching requires a scoring algorithm combining multiple demographics fields
- Conflict resolution needs clear rules per resource type with an audit trail
- Track sync progress per resource type so one failure does not stall the entire sync
