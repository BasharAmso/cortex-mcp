---
id: SKL-0368
name: Investment Portfolio Tracker
category: skills
tags: [investments, portfolio, asset-allocation, performance, benchmarks, stocks, holdings, returns]
capabilities: [portfolio-tracking, performance-calculation, asset-allocation-display, benchmark-comparison]
useWhen:
  - building an investment portfolio tracking application
  - displaying holdings with current market values
  - calculating portfolio performance and returns
  - showing asset allocation and diversification analysis
  - comparing portfolio performance against benchmarks
estimatedTokens: 650
relatedFragments: [SKL-0367, SKL-0370, PAT-0188, PAT-0191]
dependencies: []
synonyms: ["how to build a portfolio tracker", "investment dashboard design", "stock portfolio performance calculation", "asset allocation visualization", "benchmark comparison for investments", "holdings tracker app development"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/maybe-finance/maybe"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Investment Portfolio Tracker

An investment portfolio tracker shows users their holdings, performance, and asset allocation across brokerage accounts. Maybe Finance's open-source approach demonstrates clean patterns for portfolio display and calculation.

## Data Model

```typescript
interface Holding {
  id: string;
  accountId: string;
  symbol: string;               // 'AAPL', 'VTSAX', 'BTC'
  name: string;                 // 'Apple Inc.'
  assetClass: 'stock' | 'etf' | 'mutual-fund' | 'bond' | 'crypto' | 'cash' | 'real-estate';
  quantity: number;
  costBasis: number;            // Total amount paid
  costBasisPerShare: number;
  currentPrice: number;
  currentValue: number;         // quantity * currentPrice
  gainLoss: number;             // currentValue - costBasis
  gainLossPercent: number;
  currency: string;
}

interface PortfolioSnapshot {
  date: Date;
  totalValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
  dayChange: number;
  dayChangePercent: number;
  holdings: Holding[];
  allocation: AllocationBreakdown;
}

interface AllocationBreakdown {
  byAssetClass: { class: string; percentage: number; value: number }[];
  bySector: { sector: string; percentage: number; value: number }[];
  byGeography: { region: string; percentage: number; value: number }[];
}
```

## Portfolio Overview Screen

```
┌─────────────────────────────────────────────┐
│  Total Portfolio        $127,432.18          │
│  Today: +$342.56 (+0.27%)     ↑             │
│  All Time: +$18,432.18 (+16.9%)             │
│                                             │
│  ╭──────────────────────────────╮           │
│  │  📈 6-month performance chart │           │
│  │  Portfolio vs S&P 500        │           │
│  ╰──────────────────────────────╯           │
├─────────────────────────────────────────────┤
│  Asset Allocation                           │
│  Stocks  [████████░░] 72%   $91,751        │
│  Bonds   [██░░░░░░░░] 15%   $19,115        │
│  Crypto  [█░░░░░░░░░]  8%   $10,195        │
│  Cash    [░░░░░░░░░░]  5%   $6,372         │
├─────────────────────────────────────────────┤
│  Top Holdings                               │
│  AAPL    234 shares   $42,123   +22.3%     │
│  VTSAX   89 shares    $31,456   +15.1%     │
│  BTC     0.45         $10,195   +34.7%     │
└─────────────────────────────────────────────┘
```

## Performance Calculation

Use Time-Weighted Return (TWR) for accurate performance that accounts for deposits and withdrawals:

```typescript
// Time-Weighted Return: isolates investment performance from cash flow timing
function calculateTWR(snapshots: DailySnapshot[]): number {
  let twr = 1;

  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];
    const cashFlow = curr.deposits - curr.withdrawals;

    // Daily return adjusted for cash flows
    const dailyReturn = (curr.endValue - cashFlow) / prev.endValue;
    twr *= dailyReturn;
  }

  return (twr - 1) * 100; // Return as percentage
}

// Money-Weighted Return (IRR): accounts for timing of investments
// Use this to show the user's actual experience including deposit timing
function calculateMWR(cashFlows: { date: Date; amount: number }[], finalValue: number): number {
  // Solve for r in: sum(cashFlow * (1+r)^t) = finalValue
  // Use Newton's method for IRR approximation
}
```

## Market Data Sources

| Source | Coverage | Cost | Update Frequency |
|--------|----------|------|-----------------|
| **Yahoo Finance API** | Stocks, ETFs, crypto | Free (unofficial) | 15-min delay |
| **Alpha Vantage** | Stocks, forex, crypto | Free tier available | 5-min delay |
| **Polygon.io** | US stocks, options, crypto | Paid ($29+/mo) | Real-time |
| **Plaid Investments** | Brokerage holdings | Per-connection pricing | Daily |
| **CoinGecko API** | Cryptocurrency | Free tier available | 1-min updates |

## Asset Allocation Analysis

Show users how diversified their portfolio is:

- **Pie chart** or **donut chart** for asset class breakdown
- **Target vs. actual** comparison (user sets target allocation, app shows drift)
- **Rebalancing suggestions**: "Sell $2,400 of stocks, buy $2,400 of bonds to match target"
- **Concentration risk**: warn if any single holding exceeds 20% of portfolio
- **Sector exposure**: break stock holdings down by sector (tech, healthcare, finance, etc.)

## Key Takeaways

- Use Time-Weighted Return for performance comparison, Money-Weighted Return for personal experience
- Show both daily change and all-time performance prominently on the overview screen
- Asset allocation visualization helps users understand diversification at a glance
- Alert on concentration risk when any single holding exceeds 20% of total portfolio
- Benchmark comparison (vs. S&P 500) provides context for whether active choices add value
