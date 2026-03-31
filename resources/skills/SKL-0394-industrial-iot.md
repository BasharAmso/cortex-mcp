---
id: SKL-0394
name: Industrial IoT (IIoT)
category: skills
tags: [iiot, industrial-iot, scada, opc-ua, predictive-maintenance, digital-twins, manufacturing]
capabilities: [iiot-architecture, scada-integration, predictive-maintenance-design, digital-twin-modeling]
useWhen:
  - designing IoT systems for manufacturing or industrial environments
  - integrating with SCADA systems or OPC-UA servers
  - building predictive maintenance pipelines from sensor data
  - creating digital twin representations of physical equipment
  - planning data collection for industrial process optimization
estimatedTokens: 700
relatedFragments: [SKL-0149, PAT-0200, PAT-0201, PAT-0076]
dependencies: []
synonyms: ["how to build industrial IoT", "connect factory sensors to cloud", "predictive maintenance with IoT", "what is OPC-UA", "digital twin for manufacturing", "SCADA modernization"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/thingsboard/thingsboard"
difficulty: advanced
owner: "cortex"
pillar: "iot"
---

# Skill: Industrial IoT (IIoT)

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0394 |
| **Name** | Industrial IoT (IIoT) |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Industrial IoT differs from consumer IoT in scale, reliability requirements, and regulatory constraints. Factory floors, energy grids, and supply chains demand deterministic timing, high availability, and audit trails that smart home systems do not.

### IIoT vs Consumer IoT

| Dimension | Consumer IoT | Industrial IoT |
|-----------|-------------|----------------|
| **Failure impact** | Inconvenience | Safety hazard, production loss |
| **Data volume** | KB/min per device | MB/sec per device |
| **Latency tolerance** | Seconds | Milliseconds |
| **Lifespan** | 2-5 years | 15-30 years |
| **Protocols** | WiFi, Zigbee, BLE | OPC-UA, Modbus, PROFINET |
| **Compliance** | Minimal | IEC 62443, ISA-95, FDA 21 CFR |

### Protocol Stack

**OPC-UA (Open Platform Communications Unified Architecture)** is the dominant IIoT protocol. It provides:
- Platform-independent, service-oriented architecture
- Built-in security with certificate-based authentication
- Information modeling with standardized data types
- Pub/sub mode for high-frequency telemetry (OPC-UA Part 14)

ThingsBoard and similar platforms provide OPC-UA gateways that translate industrial protocols to MQTT or HTTP for cloud-side processing.

**Modbus** remains common in legacy equipment. It is simple but lacks security and discovery. Use Modbus-to-OPC-UA gateways for brownfield integration.

### Predictive Maintenance Pipeline

The highest-ROI IIoT application is predicting equipment failure before it happens:

1. **Instrument**: Attach vibration, temperature, current, and acoustic sensors to critical equipment. Sample at rates appropriate to failure modes (vibration needs 10kHz+, temperature needs 1Hz).
2. **Baseline**: Collect 2-4 weeks of normal operation data to establish healthy equipment signatures.
3. **Feature extraction**: Compute statistical features (RMS, kurtosis, spectral peaks) at the edge to reduce data volume by 100x.
4. **Model training**: Train anomaly detection models (isolation forest, autoencoders) on baseline data. Start simple; complex models need more data.
5. **Alert**: When deviation exceeds learned thresholds, generate maintenance work orders with remaining useful life estimates.

### Digital Twins

A digital twin is a live software model of a physical asset that updates from real sensor data. ThingsBoard implements this as "device attributes" split into:
- **Server-side attributes**: Metadata managed by the platform (location, owner, maintenance schedule)
- **Shared attributes**: Configuration pushed to the device (reporting interval, threshold values)
- **Client attributes**: State reported by the device (firmware version, uptime, error codes)
- **Time-series data**: Historical telemetry stored for trend analysis

The twin enables simulation (what happens if we increase line speed 10%), remote diagnostics (compare current behavior to baseline), and fleet comparison (which machines deviate from peers).

### ISA-95 Architecture Layers

Industrial networks use a layered model for security and segmentation:
- **Level 0-1**: Sensors and PLCs (air-gapped or DMZ-protected)
- **Level 2**: SCADA and HMI (control network)
- **Level 3**: Manufacturing operations (MES, historian)
- **Level 4-5**: Enterprise IT and cloud (ERP, analytics)

Never connect Level 0-1 directly to Level 4-5. Use unidirectional gateways or DMZ brokers.

## Key Takeaways

- Industrial IoT demands millisecond latency, decades-long device lifespan, and strict compliance
- OPC-UA is the standard IIoT protocol; use gateways to bridge legacy Modbus equipment
- Predictive maintenance is the highest-ROI IIoT use case: instrument, baseline, extract features, model, alert
- Digital twins maintain live software representations of physical assets for simulation and diagnostics
- Follow ISA-95 layered architecture: never expose shop-floor devices directly to enterprise networks
