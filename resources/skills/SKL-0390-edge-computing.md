---
id: SKL-0390
name: Edge Computing
category: skills
tags: [edge-computing, latency, offline-first, data-sync, fog-computing, embedded-processing]
capabilities: [edge-processing-design, offline-operation, edge-cloud-sync, latency-optimization]
useWhen:
  - processing sensor data locally instead of sending everything to the cloud
  - building IoT systems that must work during network outages
  - reducing latency for time-sensitive device actions
  - designing sync strategies between edge devices and cloud backends
  - optimizing bandwidth by pre-processing telemetry at the edge
estimatedTokens: 650
relatedFragments: [SKL-0149, PAT-0075, PAT-0076, PAT-0200]
dependencies: []
synonyms: ["how to process data on the device", "run logic without cloud", "offline IoT system", "edge vs cloud processing", "reduce IoT latency", "local computation for sensors"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: advanced
owner: "cortex"
pillar: "iot"
---

# Skill: Edge Computing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0390 |
| **Name** | Edge Computing |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Edge computing moves processing closer to data sources rather than routing everything through a central cloud. In IoT, this means running decision logic on gateways, hubs, or the devices themselves.

### Why Edge Matters for IoT

Cloud round-trips add 50-200ms latency minimum. For real-time control (turning off a valve when pressure spikes, triggering an alarm on motion), that delay is unacceptable. Edge processing delivers sub-10ms response times by keeping the decision loop local.

### Architecture Tiers

| Tier | Location | Role | Example |
|------|----------|------|---------|
| **Device** | Sensor/actuator | Raw data collection, simple thresholds | ESP32 with temperature cutoff |
| **Gateway/Hub** | Local network | Aggregation, rule execution, protocol translation | Home Assistant on Raspberry Pi |
| **Fog** | On-premise server | ML inference, complex event processing | Factory floor analytics server |
| **Cloud** | Remote datacenter | Long-term storage, training, fleet management | AWS IoT Core |

### Offline-First Design

Home Assistant demonstrates robust edge-first architecture. All automations run locally on the hub. Cloud connectivity is optional, used only for remote access and voice assistant integration. This means the system works during internet outages, which is critical for security and safety automations.

Design principles for offline-first IoT:
1. **Local state is authoritative.** The edge device holds the current truth. Cloud receives eventual updates.
2. **Queue outbound data.** Buffer telemetry and events locally when connectivity drops. Use a circular buffer with configurable retention to prevent storage overflow.
3. **Conflict resolution strategy.** When reconnecting, apply last-write-wins for simple state or use CRDTs for collaborative state. Define this upfront per data type.
4. **Graceful degradation.** Features requiring cloud (voice control, ML model updates) should fail silently while local automations continue uninterrupted.

### Edge-Cloud Sync Patterns

- **Store and forward**: Buffer locally, batch-upload when connected. Good for telemetry.
- **Delta sync**: Send only changed state. Reduces bandwidth by 80-90% for slowly-changing sensors.
- **Shadow/twin sync**: Maintain a device twin in the cloud. Edge pushes reported state; cloud pushes desired state. Reconciliation happens asynchronously.

### Resource Constraints

Edge devices have limited CPU, memory, and storage. Optimize by:
- Running lightweight runtimes (MicroPython, Rust, C) on constrained devices
- Using SQLite or LevelDB instead of full databases on gateways
- Applying downsampling at the edge (send 1-minute averages instead of per-second readings)
- Scheduling heavy computation during low-activity periods

## Key Takeaways

- Process data as close to the source as possible to minimize latency and bandwidth
- Design for offline-first: local automations must never depend on cloud availability
- Use tiered architecture (device, gateway, fog, cloud) matched to processing needs
- Buffer and sync strategies prevent data loss during connectivity gaps
- Resource constraints on edge devices require deliberate optimization of compute, memory, and storage
