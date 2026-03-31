---
id: SKL-0396
name: Bluetooth & BLE Integration
category: skills
tags: [bluetooth, ble, gatt, scanning, pairing, low-energy, beacons]
capabilities: [ble-scanning, gatt-service-design, device-pairing, beacon-detection]
useWhen:
  - integrating Bluetooth Low Energy sensors into an IoT system
  - designing GATT services for a custom BLE peripheral
  - implementing BLE scanning and device discovery
  - building proximity detection with BLE beacons
  - troubleshooting BLE connection and pairing issues
estimatedTokens: 650
relatedFragments: [SKL-0391, SKL-0149, SKL-0150, SKL-0395]
dependencies: []
synonyms: ["how to connect BLE devices", "bluetooth low energy integration", "GATT service design", "BLE beacon scanning", "pair bluetooth sensor", "bluetooth IoT setup"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "iot"
---

# Skill: Bluetooth & BLE Integration

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0396 |
| **Name** | Bluetooth & BLE Integration |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Bluetooth Low Energy (BLE) is the dominant short-range wireless protocol for IoT sensors, wearables, and smart home accessories. It enables battery-powered devices to communicate for months or years on a coin cell.

### BLE vs Classic Bluetooth

| Feature | Classic Bluetooth | BLE |
|---------|------------------|-----|
| **Power** | High (continuous connection) | Ultra-low (sleep between events) |
| **Data rate** | 1-3 Mbps | 125 Kbps - 2 Mbps |
| **Range** | ~10m | ~10-100m (BLE 5.0+) |
| **Use case** | Audio streaming, file transfer | Sensors, beacons, health devices |
| **Connection** | Always paired | Can broadcast without pairing |

### GATT Architecture

BLE data exchange uses the Generic Attribute Profile (GATT), organized hierarchically:

```
Device
  └── Service (e.g., Heart Rate Service - UUID 0x180D)
        └── Characteristic (e.g., Heart Rate Measurement - UUID 0x2A37)
              └── Descriptor (e.g., Client Characteristic Configuration)
```

**Services** group related functionality. Use standard UUIDs from the Bluetooth SIG for interoperability (temperature: 0x1809, battery: 0x180F) or custom 128-bit UUIDs for proprietary data.

**Characteristics** are the actual data points. Each has properties defining allowed operations:
- **Read**: Client pulls value on demand
- **Write**: Client pushes value to device
- **Notify**: Device pushes updates to subscribed clients (no acknowledgment)
- **Indicate**: Like notify but with acknowledgment (slower, more reliable)

### BLE Scanning and Discovery

Two scanning modes:
1. **Passive scanning**: Listen for advertisements without sending any packets. Best for detecting beacons and estimating presence.
2. **Active scanning**: Send scan requests to get additional data from advertisers. Required to read scan response data like device names.

Home Assistant's BLE integration uses active scanning with configurable intervals. Key parameters:
- **Scan window**: How long the radio listens per scan interval (longer = more power, better detection)
- **Scan interval**: How often a scan window opens (shorter = faster discovery, more battery drain)
- **Filter by service UUID**: Only process advertisements containing specific service UUIDs to reduce noise

### Pairing and Bonding

- **Pairing**: Temporary security association for the current session. Establishes encryption keys.
- **Bonding**: Stores pairing keys persistently so reconnection is automatic. Essential for devices that reconnect frequently.

BLE 4.2+ supports **Secure Connections** with ECDH key exchange, providing protection against passive eavesdropping and MITM attacks. Always use this mode when available.

For devices without displays or keyboards, use **Out-of-Band (OOB)** pairing via NFC tap or QR code scan to bootstrap the secure channel.

### Common Integration Patterns

1. **Sensor polling**: Connect, read characteristic, disconnect. Minimizes connection time and power. Good for temperature, humidity, battery level.
2. **Notification streaming**: Connect, subscribe to notifications, keep connection open. Used for real-time data like heart rate or motion sensors.
3. **Beacon presence**: No connection needed. Parse advertisements for UUID, major, minor values. Use signal strength (RSSI) for rough distance estimation.
4. **Mesh networking**: BLE Mesh (Bluetooth 5.0+) enables many-to-many communication. Used for lighting systems where any node can relay messages.

### Troubleshooting BLE

- **Device not discovered**: Check advertisement interval (may be very long to save power). Increase scan window.
- **Connection drops**: BLE connections timeout after inactivity. Send periodic reads or enable notifications to keep alive.
- **Data garbled**: Verify byte order (BLE uses little-endian by default) and characteristic format descriptors.
- **Range issues**: BLE range is heavily affected by obstacles and interference. Use BLE 5.0 coded PHY for extended range at reduced data rate.

## Key Takeaways

- BLE is designed for low-power, intermittent communication, not continuous streaming
- GATT services and characteristics define the data model; use standard UUIDs for interoperability
- Choose scanning mode based on use case: passive for beacons, active for full device discovery
- Always bond (not just pair) devices that reconnect frequently to avoid re-pairing overhead
- Use BLE Mesh for many-to-many scenarios like lighting networks
