---
id: PAT-0191
name: Multi-Currency Accounting
category: patterns
tags: [multi-currency, exchange-rates, forex, accounting, realized-gains, unrealized-gains, reporting-currency, international]
capabilities: [multi-currency-transactions, exchange-rate-management, gain-loss-calculation, currency-reporting]
useWhen:
  - building multi-currency support for a financial application
  - implementing exchange rate conversion for transactions
  - calculating realized and unrealized foreign exchange gains
  - designing reporting in a base currency with multi-currency input
  - handling international payments and invoicing
estimatedTokens: 650
relatedFragments: [SKL-0370, SKL-0372, SKL-0373, PAT-0190]
dependencies: []
synonyms: ["how to handle multiple currencies in an app", "exchange rate conversion for transactions", "realized unrealized forex gains calculation", "multi-currency invoicing", "reporting currency conversion", "international payment currency handling"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/frappe/erpnext"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Multi-Currency Accounting

Multi-currency accounting handles transactions in different currencies while reporting in a single base (functional) currency. ERPNext's multi-currency implementation demonstrates patterns for exchange rate management, gain/loss calculation, and financial reporting across currencies.

## Core Concepts

| Term | Definition |
|------|-----------|
| **Functional currency** | The primary currency of the business (used for reporting) |
| **Transaction currency** | The currency of a specific transaction |
| **Exchange rate** | Conversion factor from transaction currency to functional currency |
| **Realized gain/loss** | Forex gain/loss when payment is received/made at a different rate |
| **Unrealized gain/loss** | Forex gain/loss on outstanding balances at period-end revaluation |

## Data Model

```typescript
interface CurrencyTransaction {
  id: string;
  amount: number;                  // In transaction currency
  currency: string;                // 'EUR', 'GBP', 'JPY'
  exchangeRate: number;            // Rate at transaction time
  functionalAmount: number;        // amount * exchangeRate (in functional currency)
  functionalCurrency: string;      // 'USD' (company's reporting currency)
  date: Date;
}

interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  effectiveDate: Date;
  source: 'manual' | 'api' | 'central-bank';
}

interface InvoiceMultiCurrency {
  id: string;
  totalAmount: number;
  currency: string;
  exchangeRateAtInvoice: number;
  functionalAmountAtInvoice: number;
  payments: Payment[];
  unrealizedGainLoss: number;      // Recalculated at each period end
  realizedGainLoss: number;        // Calculated when fully paid
}
```

## Exchange Rate Management

```typescript
// Fetch daily rates from a reliable source
async function updateExchangeRates(): Promise<void> {
  // Free sources: ECB (EUR base), exchangerate.host, Open Exchange Rates
  // Paid sources: XE, OANDA (higher reliability, more currencies)
  const rates = await fetchRatesFromProvider();

  for (const [currency, rate] of Object.entries(rates)) {
    await upsertExchangeRate({
      fromCurrency: currency,
      toCurrency: functionalCurrency,
      rate,
      effectiveDate: new Date(),
      source: 'api'
    });
  }
}

// Get rate for a specific date (use closest available rate)
function getExchangeRate(currency: string, date: Date): number {
  // 1. Exact date match
  // 2. Most recent rate before the date
  // 3. Fallback: manual entry required
  const rate = findClosestRate(currency, date);
  if (!rate) throw new Error(`No exchange rate for ${currency} on ${date.toISOString()}`);
  return rate;
}
```

## Realized Gain/Loss Calculation

When an invoice is paid at a different exchange rate than when it was created:

```typescript
function calculateRealizedGainLoss(invoice: InvoiceMultiCurrency, payment: Payment): number {
  // Invoice: 1000 EUR at rate 1.10 = $1,100 functional
  // Payment: 1000 EUR at rate 1.08 = $1,080 functional
  // Realized gain: $1,100 - $1,080 = $20 (received less USD, but owed less too)

  const functionalAtInvoice = payment.foreignAmount * invoice.exchangeRateAtInvoice;
  const functionalAtPayment = payment.foreignAmount * payment.exchangeRate;

  // For receivables: gain if rate decreased (we recorded more, paid out less)
  // For payables: gain if rate decreased (we owe less in functional currency)
  return functionalAtInvoice - functionalAtPayment;
}
```

## Period-End Revaluation

At month/quarter/year end, revalue outstanding foreign currency balances:

```typescript
async function revalueOutstandingBalances(periodEndDate: Date): Promise<RevaluationResult[]> {
  const openInvoices = await getOpenForeignCurrencyInvoices();
  const results: RevaluationResult[] = [];

  for (const invoice of openInvoices) {
    const currentRate = getExchangeRate(invoice.currency, periodEndDate);
    const currentFunctionalValue = invoice.outstandingAmount * currentRate;
    const originalFunctionalValue = invoice.outstandingAmount * invoice.exchangeRateAtInvoice;
    const unrealizedGainLoss = currentFunctionalValue - originalFunctionalValue;

    results.push({
      invoiceId: invoice.id,
      currency: invoice.currency,
      outstandingAmount: invoice.outstandingAmount,
      originalRate: invoice.exchangeRateAtInvoice,
      currentRate,
      unrealizedGainLoss
    });

    // Book the adjustment as a journal entry
    await createRevaluationEntry(invoice.id, unrealizedGainLoss);
  }

  return results;
}
```

## Reporting

Financial reports in the functional currency with multi-currency detail:

- **Trial balance**: show functional currency amounts with foreign currency breakdown
- **Aged receivables**: show outstanding amounts in both original and functional currency
- **P&L**: include a "Foreign Exchange Gain/Loss" line under Other Income/Expense
- **Currency exposure report**: total outstanding by currency to assess risk

## Display Guidelines

- Always show both currencies: "$1,100.00 (EUR 1,000.00 @ 1.10)"
- Use ISO 4217 currency codes (USD, EUR, GBP) not symbols ($, which is ambiguous)
- Format numbers according to the currency's conventions (JPY has no decimals)
- Show the exchange rate used and its date for transparency

## Key Takeaways

- Store both the transaction currency amount and functional currency amount on every record
- Lock the exchange rate at transaction time; never retroactively change booked rates
- Calculate realized gain/loss at payment time by comparing invoice rate to payment rate
- Revalue outstanding foreign currency balances at each period end for accurate reporting
- Always display both currencies and the exchange rate used for full transparency
