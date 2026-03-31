---
id: PAT-0076
name: Sensor Data Pipeline
category: patterns
tags: [sensor-data, time-series, data-pipeline, ingestion, aggregation, anomaly-detection, iot, dashboards, retention]
capabilities: [sensor-ingestion, time-series-storage, data-aggregation, anomaly-detection, dashboard-design]
useWhen:
  - building a pipeline to collect and store sensor readings
  - choosing a time-series database for IoT data
  - designing aggregation and downsampling for long-term storage
  - adding anomaly detection to sensor streams
  - creating dashboards for real-time and historical sensor data
  - planning data retention policies for high-volume telemetry
estimatedTokens: 650
relatedFragments: [SKL-0149, PAT-0075, SKL-0150]
dependencies: []
synonyms: ["how to store sensor data", "time series database for iot", "build a sensor dashboard", "handle millions of sensor readings", "detect anomalies in sensor data", "how long should I keep iot data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: cortex
pillar: "iot"
---

# Sensor Data Pipeline

Sensor networks generate continuous streams of timestamped readings. A well-designed pipeline handles ingestion at scale, stores data efficiently, and surfaces insights through aggregation and visualization.

## Pipeline Stages

```
Device → Ingestion → Storage → Aggregation → Visualization
                                    ↓
                           Anomaly Detection
```

### 1. Ingestion

Collect readings from devices via MQTT, HTTP, or WebSocket. Key design decisions:

| Concern | Approach |
|---------|----------|
| **Protocol** | MQTT for constrained devices (low overhead); HTTP for batch uploads |
| **Batching** | Buffer readings client-side and send in batches (every 10s or 50 readings) to reduce connection overhead |
| **Schema** | Standardize payloads: `{ entity_id, value, unit, timestamp }`. Reject malformed data at the edge. |
| **Backpressure** | Use a message queue (MQTT broker, Redis Streams) between ingestion and storage to absorb spikes |

### 2. Time-Series Storage

Sensor data is append-heavy, read-by-time-range, and rarely updated. Use a purpose-built time-series database:

| Database | Strengths | Best For |
|----------|-----------|----------|
| **InfluxDB** | Native TSDB, built-in retention policies, Flux query language | General IoT, moderate scale |
| **TimescaleDB** | PostgreSQL extension, SQL compatibility, compression | Teams already on Postgres |
| **QuestDB** | Fastest ingestion, columnar storage | High-frequency industrial sensors |
| **SQLite + recorder** | Zero-config, single file | Home Assistant, small deployments |

**Schema tip:** Store one measurement per row with tags (device, location, type) and a single value field. Avoid wide tables with one column per sensor.

### 3. Aggregation and Downsampling

Raw readings at 1-second intervals produce 86,400 rows per sensor per day. Downsample older data to control storage costs:

| Age | Resolution | Method |
|-----|-----------|--------|
| 0-24 hours | Raw (every reading) | Keep as-is |
| 1-7 days | 1-minute averages | Continuous aggregate / materialized view |
| 7-30 days | 5-minute averages | Scheduled rollup job |
| 30+ days | Hourly averages | Compact and archive |

**Implementation:** Use the database's native continuous aggregation (TimescaleDB `continuous_aggregate`, InfluxDB `task`) rather than application-level cron jobs. This ensures consistency and handles backfill.

### 4. Anomaly Detection

Flag readings that deviate from expected patterns:

- **Threshold alerts.** Static bounds (temperature > 40C). Simple, reliable, start here.
- **Rate-of-change.** Sudden spikes or drops (temperature changed 10C in 5 minutes). Catches sensor failures and real events.
- **Statistical deviation.** Z-score against a rolling window. Catches drift without hardcoded thresholds.
- **Missing data.** No reading for 3x the expected interval triggers an availability alert.

Home Assistant implements this via `trend` and `statistics` sensor platforms that derive new entities from raw sensor data.

### 5. Visualization and Dashboards

| Component | Purpose |
|-----------|---------|
| **Real-time cards** | Current value, sparkline of last hour. WebSocket push updates. |
| **History graphs** | Zoomable time-range charts. Query aggregated data for ranges > 24h. |
| **Heatmaps** | Multi-sensor comparison (all room temperatures on one view). |
| **Alert log** | Chronological list of anomaly triggers with severity. |

**Performance rule:** Never query raw data for dashboard time ranges longer than 24 hours. Always hit the aggregated tables.

## Retention Policy Checklist

- [ ] Define retention tiers (raw, 1-min, 5-min, hourly)
- [ ] Configure automatic downsampling at each tier boundary
- [ ] Set hard deletion for raw data beyond retention window
- [ ] Exclude high-value entities from aggressive downsampling (energy meters, security sensors)
- [ ] Monitor storage growth weekly during first month
- [ ] Document retention policy for compliance (if applicable)
