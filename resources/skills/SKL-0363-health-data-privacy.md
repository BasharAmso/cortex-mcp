---
id: SKL-0363
name: Health Data Privacy
category: skills
tags: [hipaa, gdpr, health-data, privacy, consent-management, encryption, phi, compliance]
capabilities: [hipaa-compliance-design, consent-management, health-data-encryption, audit-logging]
useWhen:
  - building any application that handles protected health information
  - implementing HIPAA compliance for a healthcare product
  - designing consent management for health data collection
  - encrypting health records at rest and in transit
  - creating audit logging for PHI access
estimatedTokens: 650
relatedFragments: [SKL-0357, SKL-0362, PAT-0186, PAT-0190]
dependencies: []
synonyms: ["how to make an app HIPAA compliant", "health data encryption requirements", "patient consent management system", "PHI handling best practices", "GDPR for health applications", "healthcare privacy compliance guide"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hapifhir/hapi-fhir"
difficulty: advanced
owner: "cortex"
pillar: "health"
---

# Health Data Privacy

Health data is among the most sensitive categories of personal information. In the US, HIPAA governs it. In the EU, GDPR applies with special protections for health data. Any app handling protected health information (PHI) must implement comprehensive technical and administrative safeguards.

## What Counts as PHI

Protected Health Information includes any health-related data combined with an identifier:

| PHI Element | Examples |
|-------------|---------|
| **Health conditions** | Diagnoses, symptoms, treatment plans |
| **Lab results** | Blood work, imaging, test outcomes |
| **Medications** | Prescriptions, dosages, pharmacy records |
| **Provider interactions** | Visit notes, appointment history, messages |
| **Payment info** | Insurance claims, billing records |
| **Identifiers** | Name, DOB, SSN, email, phone, address, medical record number |

If your app stores, transmits, or processes any combination of these, HIPAA applies.

## HIPAA Technical Safeguards

```typescript
// 1. Encryption at rest: AES-256 for all PHI storage
// Use database-level encryption (e.g., PostgreSQL pgcrypto) plus application-level
// for highly sensitive fields

// 2. Encryption in transit: TLS 1.2+ mandatory
// Enforce HTTPS, reject HTTP connections, use HSTS headers

// 3. Access controls: role-based with minimum necessary principle
interface AccessPolicy {
  role: 'patient' | 'provider' | 'nurse' | 'admin' | 'billing';
  canAccess: string[];    // resource types this role can read
  canModify: string[];    // resource types this role can write
  scopedTo: 'own' | 'assigned' | 'department' | 'all';
}

const providerPolicy: AccessPolicy = {
  role: 'provider',
  canAccess: ['conditions', 'medications', 'labs', 'notes', 'appointments'],
  canModify: ['notes', 'prescriptions', 'orders'],
  scopedTo: 'assigned'   // Only their assigned patients
};

// 4. Audit logging: every PHI access must be logged
interface AuditEntry {
  timestamp: Date;
  userId: string;
  userRole: string;
  action: 'read' | 'create' | 'update' | 'delete' | 'export';
  resourceType: string;
  resourceId: string;
  patientId: string;
  ipAddress: string;
  reason?: string;        // Required for break-the-glass access
}
```

## Consent Management

Patients must consent to data collection and sharing. Implement granular consent:

```typescript
interface ConsentRecord {
  patientId: string;
  consentType: 'data-collection' | 'data-sharing' | 'research' | 'marketing';
  scope: string;              // What data this consent covers
  grantedTo: string[];        // Organizations or providers
  status: 'active' | 'revoked';
  grantedAt: Date;
  expiresAt?: Date;
  revokedAt?: Date;
  method: 'digital-signature' | 'checkbox' | 'paper-scanned';
}
```

- Consent must be freely given, specific, informed, and revocable
- Provide a consent dashboard where patients can view and revoke permissions
- Revoking consent must stop future data sharing but does not require deleting past records (for legal/clinical reasons)
- Under GDPR Article 9, health data requires explicit consent or another lawful basis

## Business Associate Agreements

Any third-party vendor that handles PHI on your behalf must sign a BAA:

- Cloud hosting (AWS, GCP, Azure all offer BAA-eligible services)
- Email/messaging services (if used for patient communication)
- Analytics tools (most analytics tools are NOT BAA-eligible; use HIPAA-compliant alternatives)
- Payment processors handling insurance/billing data
- Backup and disaster recovery services

## Data Breach Response

HIPAA requires breach notification within 60 days:

1. **Discover** and contain the breach immediately
2. **Assess** scope: what PHI was exposed, how many patients affected
3. **Notify HHS** within 60 days (if 500+ patients: also notify media)
4. **Notify affected patients** in writing with details and remediation steps
5. **Document** the breach, investigation, and corrective actions taken

## Key Takeaways

- Encrypt all PHI with AES-256 at rest and TLS 1.2+ in transit without exceptions
- Log every access to patient data with who, what, when, and why
- Sign BAAs with every vendor that touches PHI; most standard SaaS tools are not eligible
- Implement granular consent management that patients can review and revoke
- Breach notification has a hard 60-day deadline under HIPAA; have a response plan ready
