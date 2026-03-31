---
id: SKL-0391
name: Device Provisioning
category: skills
tags: [device-provisioning, onboarding, pairing, firmware-update, device-identity, zero-touch]
capabilities: [device-onboarding, identity-management, firmware-delivery, provisioning-flow-design]
useWhen:
  - designing the first-time setup flow for a new IoT device
  - implementing device identity and certificate management
  - building firmware update delivery infrastructure
  - creating a pairing workflow between device and hub/cloud
  - planning zero-touch provisioning for fleet deployment
estimatedTokens: 650
relatedFragments: [SKL-0149, SKL-0395, PAT-0202, SKL-0150]
dependencies: []
synonyms: ["how to onboard a new device", "device setup flow", "pair a sensor to my hub", "firmware update system", "device identity management", "zero touch provisioning"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: "cortex"
pillar: "iot"
---

# Skill: Device Provisioning

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0391 |
| **Name** | Device Provisioning |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Device provisioning is the process of taking a new IoT device from factory state to fully operational within your system. It covers discovery, identity assignment, configuration, and ongoing lifecycle management.

### Provisioning Phases

| Phase | Purpose | Key Actions |
|-------|---------|-------------|
| **Discovery** | Find the device on the network | mDNS, SSDP, BLE advertisement scanning |
| **Authentication** | Verify device legitimacy | Certificate exchange, shared secret, QR code scan |
| **Configuration** | Set operational parameters | WiFi credentials, MQTT broker address, reporting interval |
| **Registration** | Add to device registry | Assign unique ID, create entity records, set metadata |
| **Verification** | Confirm working state | Health check, first telemetry receipt, status confirmation |

### Home Assistant's Config Flow

Home Assistant uses a "config flow" abstraction where each integration defines a multi-step setup wizard. The flow handles:
1. **User-initiated**: User clicks "Add Integration" and provides connection details
2. **Discovery-initiated**: System detects a device via mDNS/SSDP and prompts user to confirm
3. **Zero-conf**: Device is discovered and added automatically with no user interaction

Each step collects the minimum required information and validates before proceeding. If validation fails, the flow returns to that step with an error message rather than restarting.

### Device Identity

Every device needs a stable, unique identity that persists across reboots and network changes:
- **MAC address**: Simple but spoofable. Acceptable for local networks.
- **UUID**: Generated at first boot, stored in non-volatile memory. Most common approach.
- **X.509 certificate**: Strongest identity. Device holds a private key; platform verifies via certificate chain. Required for production fleet management.
- **Claim tokens**: Short-lived tokens used during initial pairing, exchanged for permanent credentials.

### Credential Delivery

Never hardcode credentials in firmware. Use one of these patterns:
1. **SoftAP mode**: Device creates a temporary WiFi access point. User connects and provides network credentials via a captive portal.
2. **BLE provisioning**: Device advertises via Bluetooth. Companion app sends WiFi credentials over encrypted BLE channel.
3. **QR code**: Device ships with a unique QR code containing a claim token. Scanning links the device to the user's account.

### Fleet Provisioning at Scale

For deploying hundreds or thousands of devices:
- Pre-load certificates during manufacturing
- Use device shadows/twins to push configuration after first connection
- Implement group-based policies (all temperature sensors get the same reporting interval)
- Track provisioning state per device: manufactured, shipped, claimed, active, decommissioned

## Key Takeaways

- Design provisioning as a multi-step flow that validates at each stage before proceeding
- Never hardcode credentials; use SoftAP, BLE, or QR code provisioning instead
- Assign stable device identity early using UUIDs or X.509 certificates
- Discovery-initiated flows reduce user friction compared to manual configuration
- For fleet deployment, pre-load certificates and use device shadows for post-connection configuration
