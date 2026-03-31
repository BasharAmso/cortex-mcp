---
id: PAT-0201
name: Telemetry Ingestion Pattern
category: patterns
tags: [telemetry, ingestion, time-series, buffering, downsampling, data-retention, iot]
capabilities: [high-frequency-ingestion, data-buffering, downsampling-strategy, retention-policy-design]
useWhen:
  - ingesting high-frequency sensor data from many devices
  - designing a data pipeline that handles bursty IoT telemetry
  - implementing downsampling to reduce storage costs for historical data
  - setting retention policies for time-series telemetry data
  - buffering telemetry during backend maintenance or outages
estimatedTokens: 650
relatedFragments: [PAT-0076, PAT-0200, SKL-0149, SKL-0390]
dependencies: []
synonyms: ["how to handle lots of sensor data", "IoT data pipeline design", "store time-series from devices", "downsample sensor readings", "telemetry data retention", "high-throughput IoT ingestion"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/thingsboard/thingsboard"
difficulty: intermediate
owner: "cortex"
pillar: "iot"
---

# Telemetry Ingestion Pattern

High-frequency device telemetry requires a pipeline designed for continuous write-heavy workloads with bursty peaks, not a traditional request-response API.

## Pipeline Architecture

```
Devices → Transport → Message Queue → Rule Engine → Time-Series DB → Query API
```

| Stage | Purpose | Technology Examples |
|-------|---------|-------------------|
| **Transport** | Accept device connections | MQTT broker, CoAP server, HTTP endpoint |
| **Message Queue** | Buffer and decouple ingestion from processing | Kafka, RabbitMQ, Redis Streams |
| **Rule Engine** | Validate, transform, route, trigger alerts | ThingsBoard Rule Engine, Node-RED, custom |
| **Time-Series DB** | Store and query temporal data efficiently | TimescaleDB, InfluxDB, Cassandra |
| **Query API** | Serve dashboards and analytics | REST/GraphQL with time-range queries |

## Buffering Strategy

The message queue is critical for absorbing bursts. Without it, a spike from thousands of devices waking simultaneously overwhelms the database.

Design parameters:
- **Queue depth**: Size for 10-30 minutes of peak throughput. If devices send 1 msg/sec and you have 10,000 devices, buffer for 6-18 million messages.
- **Backpressure**: When the queue fills, signal devices to reduce reporting frequency rather than dropping messages.
- **Partitioning**: Partition by device ID or device group so processing scales horizontally. Each partition is consumed by one worker.

## Downsampling Strategy

Raw telemetry at 1-second intervals generates ~31 million rows per device per year. Downsampling reduces storage while preserving analytical value.

| Time Window | Resolution | Use Case |
|-------------|-----------|----------|
| Last 24 hours | Raw (1s-10s) | Real-time monitoring, debugging |
| Last 7 days | 1-minute averages | Recent trend analysis |
| Last 90 days | 5-minute averages | Monthly reports, pattern detection |
| Beyond 90 days | 1-hour averages | Long-term capacity planning |

Implement downsampling as a background job that runs periodically:
1. Read raw data older than the retention threshold
2. Compute aggregates (min, max, avg, count) per time bucket
3. Write aggregates to a rollup table
4. Delete raw data that has been aggregated

ThingsBoard handles this through configurable data retention policies per device type.

## Data Validation at Ingestion

Validate incoming telemetry before it enters the pipeline:
- **Range checks**: Temperature reading of 500C from a room sensor is clearly an error. Reject or flag.
- **Rate checks**: If a device normally sends every 30 seconds and suddenly sends 100 msgs/sec, it may be malfunctioning. Throttle.
- **Schema validation**: Ensure required fields (device_id, timestamp, value) are present and correctly typed.
- **Deduplication**: Devices may retry failed publishes. Use message ID or timestamp to deduplicate within a window.

## Retention Policy Design

Define retention tiers based on data value and compliance requirements:

| Tier | Data | Retention | Storage |
|------|------|-----------|---------|
| **Hot** | Raw telemetry, active alerts | 1-7 days | Fast SSD, in-memory cache |
| **Warm** | Minute-level aggregates | 30-90 days | Standard SSD |
| **Cold** | Hour-level aggregates | 1-5 years | Object storage (S3) |
| **Archive** | Compliance records | Per regulation | Glacier, tape |

## Key Takeaways

- Always place a message queue between device transport and database to absorb burst traffic
- Partition by device ID for horizontal scaling of telemetry processing
- Implement tiered downsampling: keep raw data short-term, aggregates long-term
- Validate telemetry at ingestion (range, rate, schema, dedup) to prevent garbage data from polluting storage
- Define retention policies per data tier to balance query performance with storage costs
