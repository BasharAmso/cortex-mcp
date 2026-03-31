---
id: SKL-0154
name: Property Management
category: skills
tags: [real-estate, property, tenant, landlord, lease, rent, maintenance, multi-property, payment-scheduling]
capabilities: [tenant-management, lease-lifecycle, rent-tracking, maintenance-workflow, multi-property-support]
useWhen:
  - building a property management application or SaaS
  - modeling tenant and landlord relationships
  - implementing lease management and rent tracking
  - adding maintenance request workflows
  - designing multi-property portfolio support
  - setting up automated payment scheduling and invoicing
estimatedTokens: 650
relatedFragments: [PAT-0082, SKL-0010, SKL-0006]
dependencies: []
synonyms: ["how to build a rental management app", "track tenants and rent payments", "lease management system", "landlord tenant software", "property manager tool", "manage multiple rental properties"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/open-condo-software/condo"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Property Management

Build software that manages the full lifecycle of rental properties: tenants, leases, rent collection, maintenance, and multi-property portfolios.

## Core Data Models

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| **Property** | address, type, units, status, owner | Has many Units, belongs to Portfolio |
| **Unit** | number, floor, bedrooms, bathrooms, rent amount | Belongs to Property, has one Lease |
| **Tenant** | name, contact, emergency contact, documents | Has many Leases |
| **Lease** | start date, end date, monthly rent, deposit, terms | Belongs to Unit and Tenant |
| **Payment** | amount, due date, paid date, method, status | Belongs to Lease |
| **Maintenance Request** | description, priority, status, assigned to | Belongs to Unit and Tenant |

## Lease Lifecycle

```
DRAFT -> ACTIVE -> EXPIRING (60-day notice) -> RENEWED | TERMINATED
```

Track lease state transitions with timestamps. Auto-generate renewal reminders. Store signed documents with version history.

## Rent Tracking

- Generate recurring invoices from lease terms (monthly, weekly, custom)
- Track payment status: pending, paid, partial, overdue, waived
- Calculate late fees automatically based on configurable grace periods
- Support multiple payment methods: bank transfer, card, check, cash
- Produce tenant statements and landlord income reports

## Maintenance Request Workflow

```
SUBMITTED -> TRIAGED -> ASSIGNED -> IN_PROGRESS -> COMPLETED -> CLOSED
```

Priority levels: emergency (24h SLA), urgent (48h), routine (7 days), cosmetic (30 days). Allow photo attachments. Track vendor assignments and costs.

## Multi-Property Support

- Portfolio-level dashboards: occupancy rate, revenue, expense ratio
- Role-based access: owner sees all, manager sees assigned properties, tenant sees own unit
- Per-property configuration: payment terms, maintenance vendors, lease templates
- Bulk operations: rent adjustments, notice distribution, report generation

## Notification System

| Event | Recipient | Timing |
|-------|-----------|--------|
| Rent due | Tenant | 5 days before, day of, 1 day after |
| Lease expiring | Tenant + Manager | 90, 60, 30 days before |
| Maintenance update | Tenant | On each status change |
| Payment received | Landlord | Immediate |
| Vacancy alert | Manager | On lease termination |

## Common Pitfalls

- **No audit trail** -- Every financial transaction and lease change needs immutable logging
- **Timezone bugs** -- Rent due dates must respect the property's local timezone
- **Missing escrow rules** -- Security deposits have legal requirements that vary by jurisdiction
- **No vacancy tracking** -- Track days vacant per unit to measure portfolio health
