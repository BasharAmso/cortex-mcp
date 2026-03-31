---
id: SKL-0232
name: Demand Forecasting
category: skills
tags: [demand-forecasting, time-series, seasonality, market-sizing, predictive-analytics, trend-analysis]
capabilities: [demand-prediction, seasonality-detection, forecast-evaluation, market-sizing]
useWhen:
  - estimating future demand for a product or feature before building
  - identifying seasonal patterns in user activity or revenue
  - building a business case with quantitative demand projections
  - evaluating whether a market is growing or contracting
  - planning capacity, inventory, or infrastructure scaling
estimatedTokens: 650
relatedFragments: [SKL-0231, SKL-0233, PAT-0120]
dependencies: []
synonyms: ["how do I forecast demand for my product", "how to predict market size", "what is the demand for this feature", "time series forecasting for business", "how to estimate future sales", "seasonal demand patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/unit8co/darts"
difficulty: advanced
owner: "cortex"
pillar: "market-research"
---

# Skill: Demand Forecasting

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0232 |
| **Name** | Demand Forecasting |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Demand forecasting uses historical data and external signals to predict future market demand. The goal is not perfect prediction but informed decision-making: should you build this, how much capacity do you need, and when will demand peak?

### Model Selection by Data Availability

Choose your approach based on what data you have:

| Data Available | Recommended Approach | Example Tools |
|----------------|---------------------|---------------|
| **No historical data** | Analogous market analysis, survey-based estimation | Comparable product benchmarks |
| **< 2 seasons of data** | Simple models: moving average, exponential smoothing | Darts ExponentialSmoothing |
| **2+ years of data** | Statistical models: ARIMA, Prophet, Theta | Darts ARIMA, Prophet |
| **Large-scale multi-series** | Deep learning: N-BEATS, Temporal Fusion Transformer | Darts TFT, N-HiTS |
| **Zero-shot (no training)** | Foundation models: Chronos, TimesFM | Darts Chronos2Model |

### Decomposing Demand Signals

Every demand signal has components. Separate them to understand what is driving the forecast:

1. **Trend:** The long-term direction. Is the market growing, flat, or declining? Use linear regression or Hodrick-Prescott filtering.
2. **Seasonality:** Recurring patterns at fixed intervals. Weekly cycles (B2B dips on weekends), monthly cycles (paycheck timing), annual cycles (holiday spending). Models like TBATS handle complex multi-seasonal patterns.
3. **Cyclical:** Longer economic cycles not tied to calendar (recession/expansion). Harder to model but critical for multi-year planning.
4. **Residual:** Random noise. If your residuals show patterns, your model is missing a signal.

### Backtesting Your Forecast

Never trust a forecast you have not backtested. The Darts library pioneered accessible backtesting with moving time windows:

1. **Split data** into training and holdout periods.
2. **Generate historical forecasts** using expanding or sliding windows.
3. **Measure accuracy** with appropriate metrics: MASE (Mean Absolute Scaled Error) for comparability across series, MAPE for percentage-based intuition, quantile losses for probabilistic forecasts.
4. **Compare baselines.** Every model must beat a naive baseline (last value repeated, or seasonal naive). If it does not, the added complexity is not justified.

### Probabilistic Forecasting

Point forecasts ("we will have 10,000 users") create false confidence. Probabilistic forecasts ("we expect 8,000-12,000 users with 80% confidence") enable better decisions. Modern approaches support confidence intervals through sampled predictions or distribution parameters, giving you a range that accounts for uncertainty.

### Common Pitfalls

- Overfitting to noise in small datasets (use simpler models when data is limited).
- Ignoring external covariates (marketing spend, competitor launches, economic shifts) that explain demand changes.
- Forecasting too far ahead without widening confidence intervals.

## Key Takeaways

- Match model complexity to data availability; simple models often outperform complex ones on small datasets
- Decompose demand into trend, seasonality, cyclical, and residual components before modeling
- Always backtest against a naive baseline; if your model cannot beat "repeat last year," it adds no value
- Use probabilistic forecasts with confidence intervals, not single-point predictions
- Incorporate external covariates (marketing, economic indicators, competitor activity) for richer forecasts
