---
id: PAT-0075
name: MQTT Messaging Patterns
category: patterns
tags: [mqtt, messaging, pub-sub, iot, broker, topics, qos, telemetry, smart-home]
capabilities: [mqtt-topic-design, qos-selection, broker-setup, secure-messaging, device-communication]
useWhen:
  - designing topic hierarchies for IoT device communication
  - choosing between MQTT QoS levels for different message types
  - setting up an MQTT broker for a smart home or sensor network
  - securing MQTT connections with TLS and authentication
  - implementing last will and retained messages for device status
estimatedTokens: 650
relatedFragments: [SKL-0149, PAT-0076, SKL-0150]
dependencies: []
synonyms: ["how to use mqtt for iot", "mqtt topic structure best practices", "which mqtt qos should I use", "set up mosquitto broker", "mqtt vs http for devices", "how do smart home devices talk to each other"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hobbyquaker/awesome-mqtt"
difficulty: intermediate
owner: cortex
pillar: "iot"
---

# MQTT Messaging Patterns

MQTT is a lightweight publish/subscribe protocol optimized for constrained devices and unreliable networks. It is the dominant messaging layer for IoT, smart homes, and sensor networks.

## Topic Hierarchy Design

Topics are UTF-8 strings separated by `/`. Design them like a filesystem:

```
{domain}/{device_class}/{device_id}/{property}
```

**Examples:**
- `home/sensor/living-room-temp/state` — temperature reading
- `home/light/bedroom/set` — command to change light state
- `home/light/bedroom/state` — current light state (retained)
- `factory/line-3/motor-7/rpm` — industrial sensor

**Rules:**
1. Use lowercase with hyphens, never spaces.
2. Keep depth between 3-5 levels. Too shallow loses context; too deep wastes bytes.
3. Separate **command** (`/set`) from **state** (`/state`) topics. Devices publish state; controllers publish commands.
4. Use `+` (single-level) and `#` (multi-level) wildcards for subscriptions only, never for publishing.

## QoS Levels

| Level | Name | Guarantee | Use Case |
|-------|------|-----------|----------|
| **0** | At most once | Fire and forget | Frequent sensor readings (temperature every 5s) |
| **1** | At least once | Delivered, may duplicate | Commands (turn light on), alerts |
| **2** | Exactly once | No duplicates | Billing events, firmware triggers |

**Guidance:** Start with QoS 1 for most IoT. QoS 0 for high-frequency telemetry where a missed reading is acceptable. QoS 2 only when duplication causes real harm (it doubles round trips).

## Retained Messages

A retained message is stored by the broker and delivered immediately to new subscribers. Use for:

- **Device status** — `online`/`offline` on a status topic so new clients know current state.
- **Configuration** — publish config once; any new subscriber gets it immediately.

**Caution:** Retained messages persist until overwritten. Publish an empty payload to clear a retained topic.

## Last Will and Testament (LWT)

The broker publishes a pre-configured message if a client disconnects ungracefully (network drop, crash). Essential for presence detection:

```
Will Topic:  home/sensor/garage-door/availability
Will Payload: offline
Will QoS:    1
Will Retain:  true
```

On connect, the device publishes `online` to the same topic (retained). If it drops, the broker publishes `offline` automatically.

## Broker Selection

| Broker | Language | Best For |
|--------|----------|----------|
| **Mosquitto** | C | Single-node, low resource, most popular |
| **EMQX** | Erlang | Clustering, millions of connections |
| **NanoMQ** | C | Edge/embedded, ultra-lightweight |
| **HiveMQ** | Java | Enterprise, MQTT 5.0, commercial support |
| **Aedes** | Node.js | Embedding in JS applications |

## Security Checklist

1. **TLS encryption.** Always use port 8883 (MQTTS) in production. Never send credentials over unencrypted 1883.
2. **Username/password auth.** Minimum bar. Configure per-client credentials in the broker.
3. **Client certificates.** Mutual TLS for high-security environments (industrial, medical).
4. **ACLs (Access Control Lists).** Restrict which clients can publish/subscribe to which topics. A sensor should not be able to subscribe to command topics.
5. **Disable anonymous access.** Brokers often allow anonymous connections by default. Turn this off.
6. **Rate limiting.** Protect the broker from misbehaving clients flooding messages.
