---
id: SKL-0189
name: Customer Intake Forms
category: skills
tags: [forms, intake, waivers, consent, data-collection, surveys]
capabilities: [form-design, conditional-logic, data-routing, template-management]
useWhen:
  - creating digital intake forms for a service business
  - building customer onboarding forms with conditional logic
  - replacing paper waivers and consent forms with digital versions
  - collecting structured customer data before appointments
  - automating form data routing to business tools
estimatedTokens: 650
relatedFragments: [SKL-0186, SKL-0188, PAT-0098]
dependencies: []
synonyms: ["how do I create intake forms for my business", "digital waiver for my customers", "how to collect customer information before appointments", "online consent forms for services", "replacing paper forms with digital ones"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Customer Intake Forms

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0189 |
| **Name** | Customer Intake Forms |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Customer intake forms replace paper clipboards with digital data collection that routes information directly into your business systems. Formbricks, an open-source survey and form platform, demonstrates how to build targeted forms that collect the right data at the right time without requiring code changes.

### Form Types for Service Businesses

Different businesses need different intake flows: **medical/wellness** (health history, allergies, medications, consent for treatment), **legal** (case summary, contact info, conflict check), **fitness** (goals, injuries, experience level, liability waiver), **salon/spa** (service preferences, skin sensitivities, style references), and **consulting** (business background, goals, budget, timeline). Each form type has a core set of fields that rarely changes, making templates valuable.

### Conditional Logic

Not every customer needs to answer every question. Formbricks supports targeting surveys to specific user groups without changing application code. Apply this to intake forms: if a customer selects "existing injury" show follow-up questions about the injury; if they select "new client" show the full intake; returning clients see only an update form. Conditional logic reduces form completion time by 40-60% and improves completion rates.

### Form Design Principles

Keep forms completable in under 3 minutes. Group related questions into sections with progress indicators. Use the right input type for each field: dropdowns for fixed options, date pickers for dates, signature pads for waivers, file upload for documents. Mark only truly required fields as required. Formbricks provides best-practice templates as starting points, which is the right approach: start from a proven template, then customize.

### Data Routing and Integration

The form is only useful if data reaches the right place. Formbricks integrates with Slack, Notion, Zapier, and n8n for automated data routing. For a small business, set up these automations: (1) new intake submission notifies the assigned staff member via Slack or email, (2) form data creates a customer record in your CRM or booking system, (3) signed waivers are stored as PDFs in cloud storage with the customer record linked. Never make staff manually re-enter form data.

### Consent and Compliance

Digital waivers and consent forms need specific elements to be legally valid: clear language describing what the customer is agreeing to, a date/time stamp, an electronic signature (typed name or drawn signature), and a copy sent to the customer. Store signed forms for your jurisdiction's retention period (typically 3-7 years). For health-related businesses in the US, ensure HIPAA compliance by self-hosting the form platform or using a BAA-covered provider. Formbricks' self-hosted option gives you full data control.

### Pre-Appointment Workflow

Send the intake form link 48 hours before the appointment via SMS or email. Include a clear deadline ("please complete before your visit"). Send a reminder 24 hours before if not completed. At check-in, staff can see whether the form is done. This workflow eliminates 10-15 minutes of in-office paperwork per appointment and lets practitioners review information before the session.

## Key Takeaways

- Use conditional logic to show only relevant questions, reducing form time by 40-60%
- Automate data routing so form submissions create CRM records and notify staff without manual entry
- Send intake forms 48 hours before appointments with a 24-hour reminder
- Include date/time stamps and electronic signatures for legally valid digital waivers
- Self-host form platforms when handling health or sensitive data for full compliance control
