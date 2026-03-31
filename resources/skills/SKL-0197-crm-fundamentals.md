---
id: SKL-0197
name: CRM Fundamentals
category: skills
tags: [crm, customer-relationship-management, contact-management, sales-tools, customer-data, relationship-tracking]
capabilities: [crm-system-design, contact-organization, relationship-management, customer-data-modeling]
useWhen:
  - building a CRM system or contact management tool
  - choosing between CRM platforms for a project
  - designing customer relationship tracking features
  - organizing contacts, companies, and interactions in an application
  - adding CRM capabilities to an existing product
estimatedTokens: 650
relatedFragments: [PAT-0104, SKL-0199, SKL-0198]
dependencies: []
synonyms: ["how do I build a CRM", "what is a CRM system", "how to manage customer contacts", "best way to track customer relationships", "how to organize sales contacts", "building a contact database"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/twentyhq/twenty"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Skill: CRM Fundamentals

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0197 |
| **Name** | CRM Fundamentals |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A CRM (Customer Relationship Management) system is the central nervous system of any sales operation. It tracks every interaction between your team and your customers. Modern open-source CRMs like Twenty demonstrate that the core architecture revolves around four pillars: **People**, **Companies**, **Opportunities**, and **Activities**.

### Essential CRM Objects

Every CRM needs these foundational entities:

- **Contacts (People):** Individual humans you interact with. Store name, email, phone, role, and communication preferences.
- **Companies (Organizations):** The businesses contacts belong to. Track industry, size, revenue, and relationship status.
- **Opportunities (Deals):** Potential revenue attached to a company/contact. Each has a stage, value, close date, and owner.
- **Activities (Timeline):** Every email, call, meeting, and note logged against a contact or company. This is the relationship history.

### Customizable Data Model

Modern CRMs (Twenty's approach) let users create custom objects and fields rather than forcing a rigid schema. This means:

1. **Custom fields** on any object (text, number, date, relation, select).
2. **Custom objects** for domain-specific entities (e.g., Properties for real estate, Patients for healthcare).
3. **Relations** between any objects, not just the standard contact-company link.

### Views and Workflows

CRM data is only useful if teams can slice it effectively:

- **Table views** for bulk operations and data entry.
- **Kanban views** for pipeline-stage visualization (drag deals between columns).
- **Filter/sort/group** to create saved views like "My open deals this quarter" or "Leads added this week."
- **Workflow automation** to trigger actions on record changes (e.g., send email when deal moves to "Negotiation").

### Integration Points

A CRM must connect to communication channels to capture interactions automatically:

- **Email sync** (Gmail, Outlook) to log conversations without manual entry.
- **Calendar sync** to attach meetings to contact records.
- **API access** for connecting to marketing tools, support systems, and billing platforms.

## Key Takeaways

- Build around four core objects: Contacts, Companies, Opportunities, and Activities.
- Allow custom fields and objects so the CRM adapts to the business rather than the reverse.
- Automated activity capture (email/calendar sync) is what separates a useful CRM from a data-entry burden.
- Kanban and table views serve different workflow needs; support both.
- Open-source CRMs like Twenty prove you can deliver a modern UX without vendor lock-in.
