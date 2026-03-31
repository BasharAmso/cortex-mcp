---
id: SKL-0358
name: Wearable Data Integration
category: skills
tags: [wearable, fitness-tracker, heart-rate, sleep-data, health-kit, google-fit, data-aggregation, iot]
capabilities: [wearable-data-ingestion, health-metric-aggregation, device-sync, activity-tracking]
useWhen:
  - integrating fitness tracker or smartwatch data into an app
  - aggregating health metrics from multiple wearable devices
  - building a health dashboard that pulls from Apple Health or Google Fit
  - designing real-time heart rate or activity monitoring features
  - syncing sleep, steps, or workout data from wearables
estimatedTokens: 650
relatedFragments: [SKL-0361, PAT-0184, PAT-0186, PAT-0187]
dependencies: []
synonyms: ["how to connect fitness tracker data", "Apple Health integration guide", "Google Fit API usage", "sync wearable data to app", "aggregate health metrics from devices", "heart rate sleep data integration"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Wearable Data Integration

Wearable devices generate continuous health data (heart rate, steps, sleep, SpO2) that apps can aggregate, analyze, and present to users. The challenge is normalizing data from diverse sources into a unified model.

## Data Source Landscape

| Platform | Access Method | Key Data Types |
|----------|--------------|----------------|
| **Apple HealthKit** | Native iOS SDK | Steps, heart rate, sleep, workouts, nutrition |
| **Google Health Connect** | Android SDK | Steps, heart rate, sleep, body measurements |
| **Fitbit Web API** | REST API + OAuth2 | Steps, heart rate, sleep stages, SpO2 |
| **Garmin Connect** | Push API (webhooks) | Activities, heart rate, body battery, stress |
| **Withings** | REST API + OAuth2 | Weight, blood pressure, sleep, SpO2 |

## Unified Data Model

Normalize all sources into a common schema:

```typescript
interface HealthMetric {
  id: string;
  userId: string;
  source: 'apple_health' | 'google_fit' | 'fitbit' | 'garmin' | 'withings';
  metricType: 'heart_rate' | 'steps' | 'sleep' | 'spo2' | 'weight' | 'blood_pressure';
  value: number;
  unit: string;            // 'bpm', 'count', 'minutes', '%', 'kg', 'mmHg'
  startTime: Date;
  endTime: Date;
  metadata?: Record<string, unknown>; // Source-specific fields
}

// Deduplication: same metric type + overlapping time window + same user = single record
function deduplicateMetrics(metrics: HealthMetric[]): HealthMetric[] {
  const grouped = groupBy(metrics, m => `${m.metricType}-${m.startTime.toISOString()}`);
  return Object.values(grouped).map(group => {
    // Prefer the source with highest granularity
    return group.sort((a, b) => sourcePriority(b.source) - sourcePriority(a.source))[0];
  });
}
```

## Apple HealthKit Integration

```swift
import HealthKit

let healthStore = HKHealthStore()
let typesToRead: Set<HKObjectType> = [
  HKQuantityType(.heartRate),
  HKQuantityType(.stepCount),
  HKCategoryType(.sleepAnalysis)
]

// Request authorization
healthStore.requestAuthorization(toShare: nil, read: typesToRead) { success, error in
  guard success else { return }
  // Set up background delivery for real-time updates
  healthStore.enableBackgroundDelivery(for: HKQuantityType(.heartRate), frequency: .hourly) { _, _ in }
}

// Query heart rate samples
let predicate = HKQuery.predicateForSamples(withStart: Date().addingTimeInterval(-86400), end: Date())
let query = HKSampleQuery(sampleType: HKQuantityType(.heartRate), predicate: predicate, limit: 0, sortDescriptors: nil) { _, samples, _ in
  let readings = samples?.compactMap { sample -> (Date, Double)? in
    guard let qty = sample as? HKQuantitySample else { return nil }
    return (qty.startDate, qty.quantity.doubleValue(for: .init(from: "count/min")))
  }
}
healthStore.execute(query)
```

## Sync Strategy

1. **Initial sync** pulls the last 30 days of historical data on first connect
2. **Incremental sync** uses last-sync timestamp to fetch only new records
3. **Background delivery** (HealthKit) or webhooks (Garmin, Withings) for near-real-time updates
4. **Conflict resolution** uses source priority and timestamp precision to pick the best record
5. **Rate limiting** respects each API's quotas (Fitbit: 150 requests/hour per user)

## Data Aggregation

Raw data is often per-second or per-minute. Aggregate for display:

- **Steps**: Daily total, hourly breakdown, 7-day rolling average
- **Heart rate**: Resting HR (lowest 10-minute window while sedentary), daily min/max/avg
- **Sleep**: Total duration, time in each stage (deep, light, REM, awake), sleep efficiency %
- **SpO2**: Nightly average, flag readings below 90% for user awareness

## Key Takeaways

- Normalize all wearable data into a unified schema with source tracking for deduplication
- Use platform-native SDKs (HealthKit, Health Connect) for mobile; REST APIs for server-side
- Background delivery and webhooks enable near-real-time data without polling
- Aggregate raw metrics into meaningful summaries (daily totals, rolling averages, trends)
- Always request minimal permissions and explain why each data type is needed
