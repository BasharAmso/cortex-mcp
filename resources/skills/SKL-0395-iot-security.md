---
id: SKL-0395
name: IoT Security
category: skills
tags: [iot-security, device-authentication, encryption, firmware-signing, network-segmentation, vulnerability]
capabilities: [device-auth-design, encrypted-communication, firmware-integrity, network-hardening]
useWhen:
  - securing communication between IoT devices and backend systems
  - implementing device authentication and certificate management
  - designing firmware signing and verification workflows
  - segmenting IoT networks to limit blast radius of compromised devices
  - auditing an existing IoT deployment for security vulnerabilities
estimatedTokens: 650
relatedFragments: [SKL-0391, SKL-0149, PAT-0202, PAT-0075]
dependencies: []
synonyms: ["how to secure IoT devices", "IoT device authentication", "encrypt sensor data in transit", "firmware signing for devices", "IoT network security", "prevent IoT hacking"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: "cortex"
pillar: "iot"
---

# Skill: IoT Security

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0395 |
| **Name** | IoT Security |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

IoT devices are high-value attack targets because they operate unattended, run for years, and often sit on networks alongside sensitive systems. Security must be designed in from the start, not bolted on later.

### Threat Model for IoT

| Attack Surface | Threat | Mitigation |
|---------------|--------|------------|
| Network communication | Eavesdropping, man-in-the-middle | TLS/DTLS encryption, certificate pinning |
| Device identity | Spoofing, impersonation | X.509 certificates, mutual TLS |
| Firmware | Malicious updates, reverse engineering | Code signing, secure boot, encrypted storage |
| Physical access | Tampering, debug port exploitation | Disable JTAG/UART in production, tamper detection |
| Cloud API | Unauthorized access, data exfiltration | OAuth 2.0, API rate limiting, least-privilege scoping |
| Local network | Lateral movement from compromised device | VLAN segmentation, firewall rules, device isolation |

### Device Authentication

**Mutual TLS (mTLS)** is the gold standard for IoT device authentication. Both server and device present certificates during the TLS handshake:

1. Provision a unique X.509 certificate per device during manufacturing
2. Store the private key in a secure element (hardware) or encrypted partition
3. Server validates the device certificate against a trusted CA chain
4. Device validates the server certificate to prevent MITM attacks

For resource-constrained devices that cannot run full TLS, use **DTLS** (Datagram TLS) over UDP or pre-shared keys (PSK) as a lighter alternative.

### Encrypted Communication

- **MQTT over TLS** (port 8883): Standard for IoT messaging. Encrypts the entire MQTT session including topic names and payloads.
- **HTTPS**: For REST API calls from devices. Use certificate pinning to prevent CA compromise attacks.
- **Payload encryption**: For additional defense-in-depth, encrypt sensitive telemetry payloads before wrapping in TLS. This protects data if TLS terminates at a load balancer.

### Firmware Security

Firmware is the most persistent attack vector because compromised firmware survives reboots:

1. **Secure boot chain**: Bootloader verifies firmware signature before executing. Each stage verifies the next. Root of trust is burned into hardware.
2. **Code signing**: Sign firmware images with an offline private key. Devices verify the signature against an embedded public key before applying updates.
3. **Rollback protection**: Maintain a monotonic version counter in secure storage. Reject firmware with a version equal to or lower than the current counter.
4. **Encrypted storage**: Encrypt configuration and credential data at rest. Use hardware-backed key storage where available.

### Network Segmentation

Home Assistant recommends placing IoT devices on a separate VLAN from computers and phones:

- **IoT VLAN**: All sensors, actuators, and hubs. Can talk to each other and the hub. Cannot initiate connections to the main network.
- **Management VLAN**: Computers, phones, trusted devices. Can initiate connections to IoT VLAN for configuration.
- **Firewall rules**: Block IoT-to-internet except for specific NTP and update servers. This prevents compromised devices from phoning home.

### Security Update Lifecycle

Devices deployed for 5-10+ years need a long-term security update strategy:
- Maintain a CVE monitoring process for all dependencies
- Design OTA update capability from day one (not retrofittable)
- Set an end-of-life policy and communicate it to users
- Provide a decommissioning process that wipes credentials

## Key Takeaways

- Use mutual TLS with per-device certificates for strong device authentication
- Encrypt all communication: MQTT over TLS, HTTPS with certificate pinning
- Sign firmware and implement secure boot to prevent persistent compromise
- Segment IoT devices onto a separate VLAN with restricted internet access
- Plan for 5-10+ year security update lifecycles from the start
