---
id: PAT-0135
name: Tax Calculation Pattern
category: patterns
tags: [ecommerce, tax, VAT, sales-tax, tax-zones, compliance]
capabilities: [tax-zone-management, rate-lookup, inclusive-exclusive-tax, tax-provider-integration]
useWhen:
  - implementing tax calculation for an online store
  - handling inclusive (VAT) vs exclusive (sales tax) pricing
  - setting up tax zones and rate hierarchies
  - integrating with tax calculation services like TaxJar or Avalara
  - ensuring tax compliance across multiple jurisdictions
estimatedTokens: 650
relatedFragments: [SKL-0261, SKL-0141, SKL-0258, PAT-0062]
dependencies: []
synonyms: ["how to calculate sales tax for ecommerce", "VAT inclusive vs exclusive pricing", "tax zone and rate setup", "how to handle tax in multiple states", "ecommerce tax compliance pattern", "tax provider integration"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/saleor/saleor"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Pattern: Tax Calculation Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0135 |
| **Name** | Tax Calculation Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Tax calculation in ecommerce is jurisdiction-dependent, legally required, and error-prone. The system must determine the correct tax rate based on the customer's location, the product type, and the seller's tax obligations, then apply it correctly to line items and shipping.

### Tax Region Hierarchy

```
Tax Region: United States
├── Default rate: 0% (no federal sales tax)
└── Sub-regions (states)
    ├── California: 7.25% base
    │   └── Override: Los Angeles County: 9.5%
    ├── Oregon: 0% (no sales tax)
    ├── New York: 4% base
    │   └── Override: NYC: 8.875%
    └── Texas: 6.25% base

Tax Region: European Union
├── Germany: 19% VAT (7% reduced for food, books)
├── France: 20% VAT (5.5% reduced)
└── Netherlands: 21% VAT (9% reduced)
```

Tax regions are hierarchical. The system resolves the most specific rate: country > state/province > city/county. Override rates at any level take precedence over parent defaults.

### Inclusive vs Exclusive Tax

| Model | Where | How It Works |
|-------|-------|-------------|
| **Tax-exclusive** | US, Canada, Australia | Display price without tax. Calculate tax at checkout based on shipping address. Total = subtotal + tax. |
| **Tax-inclusive** | EU, UK, many countries | Display price includes tax. Tax is extracted from the total. Total = displayed price. |

**Exclusive calculation:** `tax = line_total * rate`
**Inclusive extraction:** `tax = line_total - (line_total / (1 + rate))`

Your system must know per-region whether prices are inclusive or exclusive. Mixing models in a single cart (e.g., US customer buying from EU store) requires clear rules about which model applies.

### Tax Lines on Cart Items

Tax is applied as separate line-level records, not baked into the price:

```
Line Item: "Classic T-Shirt" x 2 @ $25.00
├── Subtotal: $50.00
├── Tax Line: { rate: 0.0875, amount: $4.38, name: "NY Sales Tax" }
└── Total: $54.38

Shipping Method: "Standard" @ $5.99
├── Tax Line: { rate: 0.0875, amount: $0.52, name: "NY Sales Tax" }
└── Total: $6.51
```

Apply tax lines to both line items and shipping methods. Some jurisdictions tax shipping, others do not. Track this per tax region.

### Tax Exemptions

| Exemption Type | Example |
|---------------|---------|
| **Product-based** | Food, medicine, clothing (varies by state) |
| **Customer-based** | Non-profit organizations, resellers with tax certificates |
| **Threshold-based** | Small seller exemption below revenue threshold |

Assign tax classes to products (standard, reduced, exempt). Use customer tax exemption certificates to override rates at the customer level.

### Tax Provider Pattern

Build tax calculation as a pluggable provider interface:

```
interface TaxProvider {
  calculateTax(items, shippingAddress, customerInfo): TaxLine[]
  validateAddress(address): NormalizedAddress
}
```

| Provider | Best For |
|----------|----------|
| **Manual rates** | Simple stores in 1-2 jurisdictions |
| **TaxJar** | US-focused, automatic filing |
| **Avalara** | Enterprise, global, complex product tax codes |
| **Custom** | Specific jurisdictional rules |

Start with manual rates for a single-country store. Switch to an automated provider when you expand to multiple jurisdictions or when compliance burden grows.

### Compliance Essentials

- **Tax on invoices:** Every invoice must show tax amount, rate, and jurisdiction
- **Record retention:** Store tax calculation inputs and outputs for audit (typically 3-7 years)
- **Nexus tracking:** You owe sales tax in jurisdictions where you have economic nexus (typically $100K+ in sales)
- **Rate updates:** Tax rates change frequently; use a provider API or schedule quarterly rate reviews
- **Rounding:** Round tax per line item, not on the total. Different jurisdictions have different rounding rules.

## Key Takeaways

- Resolve tax rates using the most specific geographic match: country > state > city/county
- Track whether each region uses inclusive or exclusive pricing and never mix models in one cart
- Apply tax as separate line-level records on both items and shipping, not baked into prices
- Use a pluggable tax provider interface so you can start manual and upgrade to automated services
- Store all tax calculation inputs and outputs for audit compliance with 3-7 year retention
