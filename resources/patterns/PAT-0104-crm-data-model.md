---
id: PAT-0104
name: CRM Data Model
category: patterns
tags: [crm, data-model, contacts, companies, deals, activities, schema-design]
capabilities: [crm-schema-design, relationship-modeling, activity-tracking, contact-data-architecture]
useWhen:
  - designing the database schema for a CRM system
  - modeling contacts, companies, and deals in a relational database
  - building an activity timeline for customer interactions
  - adding custom fields to a CRM data model
  - connecting CRM data to external systems
estimatedTokens: 650
relatedFragments: [SKL-0197, PAT-0105, PAT-0004]
dependencies: []
synonyms: ["how to design a CRM database", "CRM schema design", "how to model contacts and companies", "what tables does a CRM need", "how to track customer activities", "CRM entity relationship diagram"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/twentyhq/twenty"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# CRM Data Model

A CRM data model must balance structure with flexibility. Twenty's approach uses a metadata-driven architecture where core objects are predefined but users can create custom objects and fields, making the schema adaptable to any business domain.

## Core Entities

```
┌──────────┐     ┌───────────┐     ┌──────────────┐
│ Contact  │────>│  Company   │<────│ Opportunity  │
│ (Person) │     │ (Account)  │     │   (Deal)     │
└────┬─────┘     └─────┬──────┘     └──────┬───────┘
     │                 │                    │
     └────────┬────────┘                    │
              ▼                             ▼
        ┌───────────┐               ┌──────────────┐
        │ Activity  │               │  Pipeline    │
        │ (Timeline)│               │  Stage       │
        └───────────┘               └──────────────┘
```

## Entity Definitions

**Contact (Person)**
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| first_name, last_name | string | Identity |
| email, phone | string | Communication channels |
| company_id | FK -> Company | Organization relationship |
| owner_id | FK -> User | Assigned sales rep |
| created_at, updated_at | timestamp | Record lifecycle |

**Company (Account)**
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| name | string | Company name |
| domain | string | Website domain (deduplication key) |
| industry, size | string/enum | Firmographic data |
| annual_revenue | decimal | Qualification data |

**Opportunity (Deal)**
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| name | string | Deal name |
| amount | decimal | Expected revenue |
| stage_id | FK -> PipelineStage | Current position |
| close_date | date | Expected close |
| company_id | FK -> Company | Associated account |
| owner_id | FK -> User | Assigned rep |
| probability | integer | Win likelihood (0-100) |

**Activity (Timeline)**
| Field | Type | Purpose |
|-------|------|---------|
| id | UUID | Primary key |
| type | enum | email, call, meeting, note, task |
| subject | string | Activity summary |
| body | text | Full content |
| contact_id | FK -> Contact | Associated person |
| company_id | FK -> Company | Associated account |
| opportunity_id | FK -> Opportunity | Associated deal (optional) |
| occurred_at | timestamp | When it happened |

## Custom Fields Pattern

Rather than altering tables for every new field, use an EAV (Entity-Attribute-Value) approach or a JSONB column:

```sql
-- Option A: JSONB column (PostgreSQL)
ALTER TABLE contacts ADD COLUMN custom_fields JSONB DEFAULT '{}';

-- Option B: Metadata table
CREATE TABLE custom_field_definitions (
  id UUID PRIMARY KEY,
  object_type VARCHAR(50),  -- 'contact', 'company', 'opportunity'
  field_name VARCHAR(100),
  field_type VARCHAR(20),   -- 'text', 'number', 'date', 'select'
  options JSONB             -- for select fields
);

CREATE TABLE custom_field_values (
  id UUID PRIMARY KEY,
  definition_id UUID REFERENCES custom_field_definitions(id),
  record_id UUID,           -- polymorphic reference
  value_text TEXT,
  value_number DECIMAL,
  value_date TIMESTAMP
);
```

Twenty uses a metadata-driven approach where object definitions are stored in a metadata schema, allowing users to create entirely new objects (not just fields) at runtime.

## Indexing Strategy

- Index `company_id` on contacts and opportunities for fast lookups.
- Index `owner_id` on all objects for "My records" views.
- Index `stage_id` + `close_date` on opportunities for pipeline queries.
- Composite index on activities: `(contact_id, occurred_at DESC)` for timeline rendering.
- GIN index on JSONB custom_fields for filtered queries.

## Key Takeaways

- Build around four core entities: Contact, Company, Opportunity, and Activity.
- Use domain (website URL) as the natural deduplication key for companies.
- Support custom fields via JSONB or a metadata-driven EAV pattern for flexibility.
- Index for the most common access patterns: "my records," "pipeline by stage," and "activity timeline."
- Activities should be polymorphic, linkable to contacts, companies, and opportunities simultaneously.
