---
id: PAT-0215
name: Compliance Tracking Pattern
category: patterns
tags: [compliance, audit-logs, certification-tracking, renewal-alerts, regulatory, governance]
capabilities: [audit-log-design, certification-management, renewal-automation, compliance-reporting]
useWhen:
  - building audit logging for regulatory compliance
  - tracking certifications and their expiration dates
  - implementing automated renewal alerts
  - designing compliance dashboards and reports
  - meeting regulatory requirements for data traceability
estimatedTokens: 650
relatedFragments: [SKL-0416, SKL-0419, SKL-0420, PAT-0213]
dependencies: []
synonyms: ["how to build an audit log", "certification tracking system", "compliance dashboard design", "renewal alert automation", "regulatory compliance software", "how to track expiring certifications"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Compliance Tracking Pattern

Patterns for audit logging, certification management, renewal tracking, and regulatory compliance in domain applications.

## Audit Log Design

Every compliance-sensitive system needs immutable audit logs. Record who did what, when, to which entity, and from where.

| Field | Purpose |
|-------|---------|
| **timestamp** | When the action occurred (UTC, millisecond precision) |
| **actor** | User ID or system identity that performed the action |
| **action** | What happened (create, update, delete, view, export) |
| **entity_type** | Type of resource affected (user, document, payment) |
| **entity_id** | Specific resource identifier |
| **changes** | Before/after values for updates (JSON diff) |
| **ip_address** | Source of the request |
| **session_id** | Links related actions within a session |

```javascript
const auditEntry = {
  timestamp: new Date().toISOString(),
  actor: req.user.id,
  action: 'update',
  entity_type: 'patient_record',
  entity_id: 'PAT-12345',
  changes: { status: { from: 'active', to: 'discharged' } },
  ip_address: req.ip,
};
```

**Critical rules:** Audit logs are append-only. Never update or delete entries. Store in a separate table or database. Apply retention policies per regulation (HIPAA: 6 years, SOX: 7 years, GDPR: as long as needed for the purpose).

## Certification Tracking

Track certifications, licenses, and credentials with their validity periods. Model: holder (person or entity), certification type, issue date, expiration date, issuing authority, and document reference.

| Status | Condition |
|--------|-----------|
| **Valid** | Current date is between issue and expiration |
| **Expiring Soon** | Within 30/60/90 day warning window |
| **Expired** | Past expiration date |
| **Revoked** | Manually invalidated before expiration |

## Renewal Alert Pipeline

Automate reminders at configurable intervals before expiration:

```
90 days before → Initial notice (email)
60 days before → Reminder (email + in-app)
30 days before → Urgent reminder (email + in-app + manager notification)
Expiration day → Status changed to expired, access restricted
7 days after → Escalation to compliance officer
```

Store alert preferences per certification type. Support snooze and acknowledgment. Track whether the holder has started the renewal process.

## Compliance Dashboard

Display a real-time compliance posture across the organization:
- Total certifications by status (valid, expiring, expired)
- Heatmap of upcoming expirations by month
- Non-compliant entities requiring immediate action
- Audit log activity summary (actions per day, unusual patterns)
- Regulatory deadline calendar

## Reporting

Generate compliance reports for auditors: complete audit trails for a date range, certification status snapshots at any point in time, and evidence of control effectiveness. Export in PDF and CSV. Support point-in-time queries ("show me all valid certifications as of January 1st").

## Anti-Patterns

- Mutable audit logs (defeats the purpose of auditing)
- Alert fatigue from too many low-priority notifications
- Storing audit data in the same database as application data (should be isolated)
- Missing "before" values in change records (cannot reconstruct history)
- No retention policy (unbounded storage growth)
