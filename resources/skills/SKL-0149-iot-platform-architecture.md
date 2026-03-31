---
id: SKL-0149
name: IoT Platform Architecture
category: skills
tags: [iot, platform-architecture, device-management, integrations, entity-registry, state-management, home-automation]
capabilities: [iot-platform-design, device-discovery, integration-layer, entity-modeling, state-tracking]
useWhen:
  - designing an IoT platform that manages multiple device types
  - building a device discovery and integration layer
  - creating an entity registry for physical devices and sensors
  - architecting state management for real-time device data
  - planning a modular integration system for third-party devices
estimatedTokens: 700
relatedFragments: [PAT-0075, PAT-0076, SKL-0150]
dependencies: []
synonyms: ["how to build a smart home platform", "connect different IoT devices together", "manage all my sensors in one place", "build a device dashboard backend", "IoT hub architecture", "how does home assistant work"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: cortex
pillar: "iot"
---

# Skill: IoT Platform Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0149 |
| **Version** | 1.0 |
| **Owner** | Cortex |
| **Inputs** | Device types, integration requirements, platform constraints |
| **Outputs** | Architecture design, entity model, integration layer spec |
| **Triggers** | IoT platform design request |

---

## Purpose

Design a modular IoT platform that discovers devices, manages state, and orchestrates automations. Based on Home Assistant's proven architecture: a core event bus, an entity registry, and a pluggable integration layer that supports thousands of device types.

---

## Core Architecture Layers

### 1. Event Bus

The central nervous system. Every state change, service call, and automation trigger flows through a single event bus. Components subscribe to event types they care about. This decouples integrations from automations and UI.

**Key events:** `state_changed`, `service_called`, `automation_triggered`, `device_discovered`.

### 2. Entity Registry

Every controllable thing (light, sensor, switch, climate unit) is an **entity** with a unique ID, a state, and attributes. The registry tracks:

- **Entity ID** — human-readable (`light.living_room`)
- **Unique ID** — hardware-stable (MAC address or serial)
- **Device ID** — groups entities belonging to one physical device
- **Platform** — which integration owns it
- **State + Attributes** — current value and metadata (brightness, unit, battery level)

### 3. Integration Layer

Each integration is a self-contained module responsible for one protocol or vendor. Home Assistant supports 2,700+ integrations using this pattern:

| Component | Responsibility |
|-----------|---------------|
| **Config flow** | Guided setup wizard (discovery or manual) |
| **Platform** | Maps vendor-specific data to standard entity types |
| **Coordinator** | Polls or subscribes for updates, handles rate limiting |
| **Services** | Exposes vendor-specific actions (e.g., `set_color_temp`) |

### 4. Device Discovery

Automatic detection via mDNS/Zeroconf, SSDP, DHCP, or Bluetooth scanning. Discovery produces a config flow entry the user confirms. Prevents manual IP/port configuration for supported devices.

### 5. State Management

States are stored in memory for fast access with optional persistence to a recorder (SQLite, PostgreSQL). Every state change emits an event, enabling real-time dashboards and history queries. States are immutable snapshots; each change creates a new state object.

---

## Design Principles

1. **Local-first.** All core functionality works without cloud connectivity. Cloud integrations are optional add-ons.
2. **Privacy by default.** No telemetry unless explicitly opted in. Device data stays on the local network.
3. **Entity abstraction.** A "light" is a light regardless of vendor. Automations target entity types, not hardware models.
4. **Graceful degradation.** If one integration crashes, the rest continue. Isolate integration failures using separate async tasks.
5. **Configuration as data.** Platform config lives in YAML or a UI-driven flow, not in code. Users should never edit source to add a device.

---

## Implementation Checklist

- [ ] Define core entity types (light, switch, sensor, climate, cover, media_player)
- [ ] Implement event bus with typed event subscriptions
- [ ] Build entity registry with unique ID collision handling
- [ ] Create integration scaffold (config flow, platform, coordinator)
- [ ] Add device discovery for at least one protocol (mDNS recommended)
- [ ] Implement state persistence with configurable retention
- [ ] Add service registry for action dispatch
- [ ] Build health monitoring for integration uptime
