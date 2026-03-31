---
id: PAT-0101
name: Invoice Template Pattern
category: patterns
tags: [invoicing, billing, tax-calculation, recurring-invoices, payment-terms, accounts-receivable]
capabilities: [invoice-generation, tax-handling, recurring-billing, payment-tracking]
useWhen:
  - setting up professional invoicing for a small business
  - implementing tax calculation on invoices
  - automating recurring invoices for subscription or retainer clients
  - defining payment terms and late payment policies
  - choosing between manual and automated invoicing workflows
estimatedTokens: 650
relatedFragments: [PAT-0100, SKL-0192, PAT-0103]
dependencies: []
synonyms: ["how do I create professional invoices for my business", "what should an invoice include", "how to set up recurring invoices", "how do I handle tax calculation on invoices", "what payment terms should I use for small business invoicing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/invoiceninja/invoiceninja"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Pattern: Invoice Template Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0101 |
| **Name** | Invoice Template Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Invoicing is the revenue backbone of any service or product business. Invoice Ninja demonstrates the full invoicing lifecycle: create invoices from templates, calculate taxes, support recurring billing, track payments, and provide a client portal for self-service access. The system's architecture flows requests through validation, service logic, and transformers, ensuring every invoice is consistent and auditable.

### Invoice Structure

A professional invoice requires these elements:

- **Header**: Your business name, logo, address, and tax ID
- **Client details**: Client name, billing address, and contact information
- **Invoice metadata**: Unique invoice number (sequential), issue date, due date, and payment terms
- **Line items**: Description, quantity, unit price, and line total for each item or service
- **Subtotal**: Sum of all line items before tax
- **Tax**: Calculated tax amount with rate displayed
- **Total**: Final amount due
- **Payment instructions**: Accepted methods, bank details, or payment link
- **Notes/Terms**: Late payment policy, warranty information, or project references

Invoice Ninja supports customizable templates so these elements can be styled to match your brand while maintaining all required fields.

### Tax Calculation

Tax handling varies by jurisdiction but follows consistent patterns. Define tax rates as named entries (e.g., "State Sales Tax 8.25%", "VAT 20%") and apply them at the line-item or invoice level. Some items may be tax-exempt; the system should support per-line-item tax assignment. For businesses operating across jurisdictions, maintain a tax rate table and apply the correct rate based on the client's location. Invoice Ninja's service layer handles this calculation consistently so rounding errors and misapplied rates are avoided.

### Recurring Invoices

Recurring invoices automate billing for retainer clients, subscriptions, and maintenance contracts. The pattern:

1. **Create a recurring profile**: Define the client, line items, frequency (weekly, monthly, quarterly, annually), and start date
2. **Auto-generate**: The system creates a new invoice on each cycle date, incrementing the invoice number
3. **Auto-send**: The invoice is emailed to the client automatically
4. **Auto-charge** (optional): If the client has a payment method on file (via Stripe or similar gateway), charge automatically and mark as paid

The recurring profile should support an end date or maximum number of cycles for fixed-term contracts. Allow clients to view and pay through a self-service portal, as Invoice Ninja provides at its client login endpoint.

### Payment Terms

Standard payment terms for small businesses:

- **Due on receipt**: Common for retail and one-time services. Fastest cash flow.
- **Net 15**: Payment due within 15 days. Appropriate for trusted regular clients.
- **Net 30**: The default for most B2B relationships. Balances client convenience with cash flow.
- **Net 60**: Only for large clients or contractual requirements. Monitor these closely.

Include a late payment policy on every invoice. A typical policy: "Invoices overdue by more than 15 days incur a 1.5% monthly late fee." Whether you enforce it strictly is a business decision, but stating it sets expectations.

### Payment Tracking and Follow-Up

Track each invoice through its lifecycle: draft, sent, viewed, partial payment, paid, or overdue. Automate follow-up emails:

- **Day of due date**: Friendly reminder if unpaid
- **7 days overdue**: Second reminder with late fee notice
- **30 days overdue**: Escalation email indicating collection action

Invoice Ninja's payment integration with Stripe enables clients to pay directly from the invoice email, reducing friction between receiving the invoice and completing payment.

## Key Takeaways

- Include all required elements (header, client details, line items, tax, total, payment instructions) in every invoice
- Define named tax rates and apply them consistently at the line-item level
- Automate recurring invoices with auto-send and optional auto-charge for retainer clients
- Use Net 30 as the default payment term and include a stated late payment policy
- Track invoice lifecycle status and automate overdue follow-up at 0, 7, and 30 days
