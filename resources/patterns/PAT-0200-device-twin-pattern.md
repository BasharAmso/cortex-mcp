---
id: PAT-0200
name: Device Twin Pattern
category: patterns
tags: [device-twin, digital-twin, desired-state, reported-state, sync, shadow, iot]
capabilities: [twin-state-management, desired-reported-reconciliation, offline-sync, fleet-configuration]
useWhen:
  - maintaining a cloud-side representation of physical device state
  - pushing configuration changes to devices that may be offline
  - reconciling desired vs reported state after reconnection
  - managing fleet-wide configuration across thousands of devices
  - building remote diagnostics and monitoring for deployed hardware
estimatedTokens: 650
relatedFragments: [SKL-0394, SKL-0149, PAT-0201, SKL-0390]
dependencies: []
synonyms: ["what is a device twin", "device shadow pattern", "desired vs reported state", "sync device state with cloud", "remote device configuration", "digital twin for IoT"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/thingsboard/thingsboard"
difficulty: advanced
owner: "cortex"
pillar: "iot"
---

# Device Twin Pattern

A device twin is a cloud-side JSON document that mirrors the state of a physical device. It enables bidirectional state management between cloud applications and devices that may be intermittently connected.

## Twin State Structure

The twin document is split into sections with different ownership:

| Section | Written By | Read By | Purpose |
|---------|-----------|---------|---------|
| **Desired** | Cloud/application | Device | Target configuration the device should apply |
| **Reported** | Device | Cloud/application | Actual current state the device reports |
| **Metadata** | Platform | Both | Timestamps, version numbers, connectivity status |

```json
{
  "desired": { "reportingInterval": 30, "firmwareVersion": "2.1.0" },
  "reported": { "reportingInterval": 60, "firmwareVersion": "2.0.3" },
  "metadata": { "lastDesiredUpdate": "2026-03-30T10:00:00Z", "lastReportedUpdate": "2026-03-30T09:45:00Z" }
}
```

## Reconciliation Flow

1. **Cloud sets desired state**: Application writes `desired.reportingInterval = 30` to the twin.
2. **Device receives delta**: Platform calculates the diff between desired and reported, pushes only changed fields to the device.
3. **Device applies change**: Device updates its configuration and writes `reported.reportingInterval = 30` back to the twin.
4. **Convergence**: When desired equals reported, the device is in sync. The delta is empty.

If the device is offline when desired state changes, the platform queues the delta. On reconnection, the device receives the accumulated changes and reconciles.

## ThingsBoard Implementation

ThingsBoard implements the twin pattern through three attribute scopes:

- **Server attributes**: Platform-managed metadata (location tags, customer assignment). Devices cannot modify these.
- **Shared attributes**: The "desired" state. Cloud writes, device reads. Changes trigger an attribute update callback on the device.
- **Client attributes**: The "reported" state. Device writes, cloud reads. Updated via MQTT publish or HTTP POST.

Telemetry (time-series data) is kept separate from attributes. Attributes represent current state; telemetry represents historical measurements.

## Conflict Resolution

When both sides update simultaneously:
- **Last-write-wins** with version counters: Each update increments a version. The platform rejects updates with stale version numbers.
- **Field-level merge**: Different fields updated by different sides merge cleanly. Conflicting updates to the same field use timestamp comparison.
- **Application-level logic**: For complex conflicts, the platform notifies the application and lets it decide.

## Fleet Management with Twins

For large deployments, twins enable fleet-wide operations:
- **Group updates**: Set desired firmware version for all devices in a device group. Each device reconciles individually.
- **Compliance monitoring**: Query all twins where `reported.firmwareVersion != desired.firmwareVersion` to find devices that have not updated.
- **Anomaly detection**: Compare reported state across peer devices. A device reporting significantly different values from its group may be malfunctioning.

## Key Takeaways

- Device twins decouple cloud intent (desired) from device reality (reported), enabling asynchronous management
- The delta between desired and reported drives device behavior on reconnection
- Keep attributes (current state) separate from telemetry (time-series history)
- Use version counters to prevent stale updates from overwriting newer state
- Twins enable fleet-wide configuration, compliance monitoring, and anomaly detection at scale
