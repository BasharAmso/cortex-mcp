---
id: SKL-0393
name: Smart Home Automation Rules
category: skills
tags: [automation, smart-home, triggers, conditions, actions, scenes, schedules]
capabilities: [automation-rule-design, trigger-condition-action, scene-creation, schedule-management]
useWhen:
  - creating automation rules for a smart home system
  - designing trigger-condition-action workflows for devices
  - building scene presets that control multiple devices at once
  - scheduling device actions based on time or events
  - debugging automations that fire unexpectedly or fail silently
estimatedTokens: 650
relatedFragments: [SKL-0150, SKL-0149, PAT-0075, SKL-0390]
dependencies: []
synonyms: ["how to automate my smart home", "turn on lights when I get home", "create a bedtime scene", "schedule thermostat changes", "automation rules for IoT", "if this then that for devices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/home-assistant/core"
difficulty: beginner
owner: "cortex"
pillar: "iot"
---

# Skill: Smart Home Automation Rules

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0393 |
| **Name** | Smart Home Automation Rules |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Smart home automation follows a universal pattern: when something happens (trigger), check if conditions are met (condition), then do something (action). Home Assistant calls this the TCA (Trigger-Condition-Action) model.

### Trigger-Condition-Action Model

| Component | Purpose | Examples |
|-----------|---------|----------|
| **Trigger** | What starts the automation | Motion detected, time reached, device state changed, sun sets |
| **Condition** | Optional filters that must be true | Only if home occupied, only on weekdays, only if alarm is armed |
| **Action** | What happens when triggered and conditions pass | Turn on light, send notification, lock door, adjust thermostat |

### Trigger Types

- **State triggers**: Fire when a device attribute changes (door opens, temperature crosses 75F)
- **Time triggers**: Fire at a specific time or interval (every day at 7am, every 15 minutes)
- **Event triggers**: Fire on system events (button pressed, webhook received, MQTT message)
- **Sun triggers**: Fire at sunrise/sunset with optional offset (30 minutes before sunset)
- **Zone triggers**: Fire when a person enters or leaves a geographic zone
- **Template triggers**: Fire when a custom expression evaluates to true (complex multi-sensor logic)

### Scenes vs. Automations

**Scenes** capture a snapshot of desired device states and apply them all at once. "Movie night" sets living room lights to 20%, TV on, blinds closed. Scenes are user-activated presets.

**Automations** run without user intervention based on triggers. "When the last person leaves home, activate Away scene" is an automation that triggers a scene.

Use scenes as building blocks inside automations. This keeps automations simple and scenes reusable.

### Common Automation Patterns

1. **Presence-based**: Lights on when arriving, security armed when leaving. Use zone triggers or door sensor + time-of-day condition.
2. **Time-based**: Morning routine at 6:30am weekdays. Use time trigger with day-of-week condition.
3. **Environmental**: Close blinds when sun angle heats the room. Use temperature trigger with sun position condition.
4. **Safety**: Alert when smoke detector triggers or water leak detected. Use state trigger with no conditions (always execute).
5. **Energy**: Turn off devices left on for more than 30 minutes with no motion. Use time pattern trigger with state condition.

### Debugging Automations

When automations misbehave:
1. **Check the trace.** Home Assistant logs every automation execution with trigger data, condition evaluations, and action results.
2. **Verify trigger specificity.** "State changed" fires on every attribute change, not just the one you expect. Use `to:` and `from:` filters.
3. **Test conditions independently.** Use the developer tools template editor to evaluate condition expressions with current state.
4. **Watch for race conditions.** Two automations triggered by the same event can conflict. Use `mode: single` to prevent overlapping execution.

## Key Takeaways

- All smart home automation follows the Trigger-Condition-Action pattern
- Use scenes as reusable presets and automations as the logic that activates them
- Be specific with triggers: filter by to/from state to avoid false activations
- Safety automations should have no conditions and always execute
- Use automation traces to debug unexpected behavior by inspecting each step
