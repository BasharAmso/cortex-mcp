---
id: SKL-0150
name: Home Automation
category: skills
tags: [home-automation, automations, triggers, scenes, scripts, energy-monitoring, voice-assistant, smart-home]
capabilities: [automation-design, trigger-condition-action, scene-creation, energy-tracking, voice-integration, device-grouping]
useWhen:
  - designing automation rules for a smart home system
  - creating scenes that control multiple devices at once
  - building trigger-condition-action workflows for IoT devices
  - adding energy monitoring and cost tracking
  - integrating voice assistants with a home automation platform
  - organizing devices into logical groups and areas
estimatedTokens: 700
relatedFragments: [SKL-0149, PAT-0075, PAT-0076]
dependencies: []
synonyms: ["how to automate my smart home", "set up home assistant automations", "turn on lights automatically", "create smart home scenes", "track home energy usage", "connect alexa to my smart home"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: intermediate
owner: cortex
pillar: "iot"
---

# Skill: Home Automation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0150 |
| **Version** | 1.0 |
| **Owner** | Cortex |
| **Inputs** | Device inventory, user routines, automation requirements |
| **Outputs** | Automation rules, scenes, scripts, device groups, monitoring config |
| **Triggers** | Home automation design request |

---

## Purpose

Design and implement home automation logic: the rules that make a smart home actually smart. Covers the trigger-condition-action pattern, scenes, scripts, device organization, energy monitoring, and voice assistant integration. Based on Home Assistant's automation engine, the most widely deployed open-source home automation platform.

---

## Trigger-Condition-Action Pattern

Every automation follows three parts:

### Trigger (When)

The event that starts evaluation. Multiple triggers can be OR'd together.

| Trigger Type | Example |
|-------------|---------|
| **State change** | Light turned off, door opened |
| **Time** | Every day at sunset, every 30 minutes |
| **Numeric threshold** | Temperature above 25C, humidity below 30% |
| **Zone** | Person arrives home, leaves work |
| **Device event** | Button pressed, motion detected |
| **Webhook** | External service calls an endpoint |
| **Sun** | Sunrise/sunset with optional offset |

### Condition (Only if)

Optional gates that must all be true for the action to execute. Conditions do NOT trigger automations; they filter.

| Condition Type | Example |
|---------------|---------|
| **State** | Only if alarm is armed |
| **Time window** | Only between 10pm and 6am |
| **Zone** | Only if nobody is home |
| **Numeric** | Only if battery below 20% |
| **Template** | Custom logic expression |

### Action (Do)

What happens when triggers fire and conditions pass. Actions execute sequentially by default.

| Action Type | Example |
|------------|---------|
| **Service call** | Turn on light, lock door, set thermostat |
| **Delay** | Wait 5 minutes before next action |
| **Choose/If** | Branch logic based on runtime state |
| **Repeat** | Loop until a condition is met |
| **Notify** | Send push notification or TTS announcement |
| **Script** | Call a reusable script (see below) |

---

## Scenes

A scene captures a snapshot of desired states for multiple entities. Activating a scene sets all entities simultaneously.

**Examples:**
- **Movie night** — Living room lights 10%, TV on, blinds closed
- **Good morning** — Bedroom lights 80% warm white, coffee maker on, thermostat 21C
- **Away** — All lights off, thermostat 17C, cameras armed

**Design tip:** Create scenes for activities, not rooms. Users think "I'm watching a movie" not "set living room to configuration 3."

---

## Scripts

Reusable action sequences callable from automations, other scripts, or the UI. Extract into scripts when multiple automations share the same steps (e.g., flash a light 3 times for visual alert, announce on all speakers).

---

## Device Groups and Areas

- **Areas** — Physical locations (kitchen, garage). Each entity belongs to one area.
- **Groups** — Logical sets spanning areas (all exterior lights). Exposes on/off for the entire set.
- **Labels** — Freeform tags for filtering (battery-powered, guest-accessible).

Assign every entity to an area during setup. Unassigned entities create blind spots in area-based automations.

---

## Energy Monitoring

Track power consumption and cost across the home:

1. **Metering entities.** Smart plugs, circuit monitors, or whole-home meters that report kWh.
2. **Energy dashboard.** Aggregate consumption by device, area, and time period. Show cost using utility rate configuration.
3. **Solar/battery.** Track generation, grid export, battery charge/discharge for net-zero goals.
4. **Alerts.** Notify when a device exceeds expected consumption (appliance left on) or when daily usage crosses a budget threshold.

---

## Voice Assistant Integration

Three approaches: **cloud-based** (Alexa, Google) for widest support but requires internet; **local** (Whisper + Piper) for full privacy; **hybrid** for complex NLU via cloud, simple commands locally. Expose only entities that make sense by voice. A humidity sensor is useful on a dashboard but confusing to ask Alexa about.

---

## Automation Design Checklist

- [ ] Map household routines to trigger-condition-action rules
- [ ] Create scenes for recurring activities (morning, evening, away, guests)
- [ ] Extract shared action sequences into reusable scripts
- [ ] Assign all entities to areas; create groups for cross-area control
- [ ] Set up energy monitoring for high-consumption devices
- [ ] Configure presence detection for zone-based automations
- [ ] Add failure notifications for unavailable devices
