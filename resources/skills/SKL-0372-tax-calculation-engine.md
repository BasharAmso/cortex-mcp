---
id: SKL-0372
name: Tax Calculation Engine
category: skills
tags: [tax, calculation, jurisdiction, withholding, sales-tax, vat, tax-rules, compliance]
capabilities: [tax-rule-engine, jurisdiction-handling, withholding-calculation, tax-reporting]
useWhen:
  - building tax calculation features for a financial application
  - implementing sales tax or VAT calculation by jurisdiction
  - designing tax withholding and payroll tax features
  - creating year-end tax reporting and document generation
  - handling multi-jurisdiction tax rules in an e-commerce platform
estimatedTokens: 650
relatedFragments: [SKL-0370, SKL-0369, PAT-0191, PAT-0190]
dependencies: []
synonyms: ["how to calculate sales tax in an app", "tax engine design for e-commerce", "VAT calculation by country", "tax jurisdiction lookup implementation", "payroll withholding calculator", "year-end tax report generation"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Tax Calculation Engine

Tax calculation is one of the most complex features in financial software because rules vary by jurisdiction, product type, and customer status. ERPNext demonstrates patterns for rule-based tax calculation that adapts to multiple countries and tax regimes.

## Tax Calculation Architecture

```
Transaction → Tax Rules Engine → Jurisdiction Lookup → Rate Determination → Tax Lines
                                       ↓
                                 Product Taxability
                                 Customer Exemptions
                                 Threshold Rules
```

## Data Model

```typescript
interface TaxRule {
  id: string;
  jurisdiction: string;           // 'US-CA', 'US-NY', 'GB', 'DE'
  taxType: 'sales' | 'vat' | 'gst' | 'income' | 'payroll';
  rate: number;                   // 0.0825 for 8.25%
  name: string;                   // 'California State Sales Tax'
  applicableTo: string[];         // Product categories or 'all'
  exemptions: TaxExemption[];
  effectiveFrom: Date;
  effectiveTo?: Date;
  thresholdAmount?: number;       // Minimum amount before tax applies
  compounding: boolean;           // Whether this tax compounds on other taxes
}

interface TaxExemption {
  type: 'product' | 'customer' | 'use';
  identifier: string;             // Product category or exemption certificate ID
  certificateNumber?: string;
  expiresAt?: Date;
}

interface TaxLine {
  ruleId: string;
  name: string;
  jurisdiction: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

interface TaxCalculation {
  subtotal: number;
  taxLines: TaxLine[];
  totalTax: number;
  total: number;
}
```

## Sales Tax Calculation (US)

US sales tax is destination-based (buyer's location) and stacked across jurisdictions:

```typescript
function calculateUSSalesTax(params: {
  amount: number;
  shipToAddress: Address;
  productCategory: string;
  customerExemptions: TaxExemption[];
}): TaxCalculation {
  const { state, county, city } = resolveJurisdiction(params.shipToAddress);

  const applicableRules = taxRules.filter(rule =>
    rule.jurisdiction.startsWith(`US-${state}`) &&
    isApplicable(rule, params.productCategory) &&
    !isExempt(rule, params.customerExemptions) &&
    isEffective(rule, new Date())
  );

  // US sales tax: state + county + city + special district (stacked, not compounded)
  const taxLines = applicableRules.map(rule => ({
    ruleId: rule.id,
    name: rule.name,
    jurisdiction: rule.jurisdiction,
    rate: rule.rate,
    taxableAmount: params.amount,
    taxAmount: roundTax(params.amount * rule.rate)
  }));

  const totalTax = taxLines.reduce((sum, line) => sum + line.taxAmount, 0);
  return { subtotal: params.amount, taxLines, totalTax, total: params.amount + totalTax };
}

// Tax rounding: always round to 2 decimal places, typically using banker's rounding
function roundTax(amount: number): number {
  return Math.round(amount * 100) / 100;
}
```

## VAT Calculation (EU/UK)

VAT differs from sales tax: it is included in the displayed price (for B2C) and applied at a single rate:

| Country | Standard Rate | Reduced Rate | Zero Rate Examples |
|---------|-------------|-------------|-------------------|
| UK | 20% | 5% | Food, children's clothing, books |
| Germany | 19% | 7% | Food, books, public transport |
| France | 20% | 5.5% | Food, books, cultural events |

```typescript
// VAT reverse calculation (extract VAT from VAT-inclusive price)
function extractVAT(inclusivePrice: number, vatRate: number): { net: number; vat: number } {
  const net = inclusivePrice / (1 + vatRate);
  const vat = inclusivePrice - net;
  return { net: roundTax(net), vat: roundTax(vat) };
}
```

## Tax Provider Integration

For production systems, consider tax-as-a-service providers:

| Provider | Jurisdictions | Features |
|----------|--------------|----------|
| **Avalara** | 12,000+ US jurisdictions, 190+ countries | Address validation, exemption management |
| **TaxJar** | All US states | Auto-filing, nexus tracking |
| **Stripe Tax** | US, EU, and growing | Built into Stripe billing |

These APIs handle jurisdiction lookup, rate determination, and compliance updates automatically.

## Key Takeaways

- US sales tax stacks across state, county, city, and district; always resolve by destination address
- EU VAT is typically included in the displayed price; reverse-calculate to extract the tax component
- Product exemptions and customer exemption certificates must be checked before applying tax
- Tax rules change frequently; use effective dates and keep a versioned rule database
- For production, consider tax-as-a-service providers that maintain jurisdiction databases
