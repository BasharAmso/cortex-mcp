---
id: SKL-0180
name: Invoice Generation
category: skills
tags: [invoicing, payments, billing, recurring, templates, small-business]
capabilities: [invoice-creation, payment-tracking, recurring-billing, template-management]
useWhen:
  - building an invoicing system for a small business
  - automating recurring invoice generation
  - tracking payments and outstanding balances
  - designing invoice templates with branding
  - integrating payment gateways for online invoice payment
estimatedTokens: 650
relatedFragments: [SKL-0178, SKL-0179, SKL-0183]
dependencies: []
synonyms: ["how do I create and send invoices automatically", "how to track which invoices have been paid", "what is the best way to set up recurring billing", "how do I add online payment to my invoices", "how to build a simple invoicing system", "how do I send professional invoices to my clients", "create invoices automatically", "billing system for freelancers"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/invoiceninja/invoiceninja"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Invoice Generation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0180 |
| **Name** | Invoice Generation |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Invoice generation turns completed work into payment requests. Invoice Ninja's Laravel-based architecture demonstrates proven patterns: event-driven processing, template rendering, multi-gateway payments, and a client portal for self-service.

### Invoice Data Model

An invoice links a **Client** to a list of **Line Items** (description, quantity, unit price, tax rate). Key fields: invoice number (auto-incrementing with configurable prefix like INV-2026-001), issue date, due date, payment terms (Net 15, Net 30), subtotal, tax total, and grand total. Invoice Ninja uses a Repository pattern for persistence and a Factory pattern for creation — clean separation of concerns.

### Invoice Lifecycle

States: **Draft** (being composed), **Sent** (delivered to client), **Viewed** (client opened it), **Partial** (some payment received), **Paid** (fully settled), **Overdue** (past due date, unpaid). Each transition fires an event — Invoice Ninja uses `InvoiceWasCreated`, `InvoiceWasPaid` events to trigger side effects like email notifications and ledger updates.

### Recurring Billing

For subscription or retainer clients, define a recurring invoice template with a frequency (weekly, monthly, quarterly) and auto-send date. The system clones the template into a real invoice each cycle. Include a stop date or "until cancelled" option. This pattern eliminates monthly manual invoice creation.

### Payment Integration

Embed a "Pay Now" button in the invoice email that routes to a payment page. Support multiple gateways — Stripe for cards, PayPal for flexibility, bank transfer for large amounts. Invoice Ninja's plugin architecture lets you add gateways without modifying core code. Record partial payments and automatically update invoice status.

### Templates and Branding

Provide customizable templates with the business logo, colors, and footer (payment instructions, thank-you message). Render invoices as PDF for email attachment and as HTML for the client portal. Store templates separately from data so the same invoice can be re-rendered if branding changes.

### Tax Calculation

Support line-item tax rates (different services may have different tax treatment) and invoice-level tax. Handle tax-inclusive vs. tax-exclusive pricing. For multi-jurisdiction businesses, allow tax rate selection per line item.

## Key Takeaways

- Event-driven design (invoice created, sent, paid) keeps side effects manageable
- Recurring invoice templates eliminate repetitive monthly billing work
- "Pay Now" buttons with gateway integration dramatically speed up payment collection
- PDF generation with business branding makes invoices look professional
- Track invoice views to know when a client has seen but not paid
