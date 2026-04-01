---
id: EX-0028
name: IoT Dashboard with MQTT
category: examples
tags: [iot, mqtt, dashboard, sensor, telemetry, real-time, websocket, typescript]
capabilities: [mqtt-integration, sensor-data-display, real-time-dashboard]
useWhen:
  - building a real-time IoT dashboard with sensor data
  - connecting to MQTT brokers for device telemetry
  - displaying live sensor readings with charts and alerts
estimatedTokens: 650
relatedFragments: [SKL-0392, PAT-0075, PAT-0201, SKL-0149, SKL-0390]
dependencies: []
synonyms: ["iot dashboard example", "mqtt sensor dashboard", "real-time sensor display", "telemetry dashboard", "device monitoring ui"]
sourceUrl: "https://github.com/mqtt/mqtt.js"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "iot"
---

# IoT Dashboard with MQTT

A real-time IoT dashboard that subscribes to MQTT topics and displays sensor telemetry.

## Implementation

```typescript
import mqtt from 'mqtt';

// --- MQTT Client Setup ---
interface SensorReading {
  deviceId: string;
  type: 'temperature' | 'humidity' | 'pressure' | 'motion';
  value: number;
  unit: string;
  timestamp: number;
}

interface AlertRule {
  sensorType: string;
  condition: 'above' | 'below';
  threshold: number;
  message: string;
}

class IoTDashboard {
  private client: mqtt.MqttClient;
  private readings = new Map<string, SensorReading[]>(); // deviceId -> history
  private alerts: AlertRule[] = [];
  private maxHistory = 100; // readings per device

  constructor(brokerUrl: string, private topics: string[]) {
    this.client = mqtt.connect(brokerUrl, {
      clientId: `dashboard-${Date.now()}`,
      clean: true,
      reconnectPeriod: 5000,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      for (const topic of this.topics) {
        this.client.subscribe(topic, { qos: 1 });
      }
    });

    this.client.on('message', (_topic, payload) => {
      try {
        const reading: SensorReading = JSON.parse(payload.toString());
        this.processReading(reading);
      } catch (err) {
        console.error('Invalid sensor payload:', err);
      }
    });

    this.client.on('error', (err) => console.error('MQTT error:', err));
    this.client.on('reconnect', () => console.log('Reconnecting to broker...'));
  }

  private processReading(reading: SensorReading): void {
    // Store in rolling history
    const history = this.readings.get(reading.deviceId) ?? [];
    history.push(reading);
    if (history.length > this.maxHistory) history.shift();
    this.readings.set(reading.deviceId, history);

    // Check alert rules
    for (const rule of this.alerts) {
      if (reading.type !== rule.sensorType) continue;
      const triggered =
        (rule.condition === 'above' && reading.value > rule.threshold) ||
        (rule.condition === 'below' && reading.value < rule.threshold);
      if (triggered) {
        this.emitAlert(reading, rule);
      }
    }
  }

  private emitAlert(reading: SensorReading, rule: AlertRule): void {
    console.warn(`ALERT [${reading.deviceId}]: ${rule.message} (${reading.value}${reading.unit})`);
    // In production: push to WebSocket, send email/SMS, log to DB
  }

  addAlertRule(rule: AlertRule): void {
    this.alerts.push(rule);
  }

  getDeviceReadings(deviceId: string): SensorReading[] {
    return this.readings.get(deviceId) ?? [];
  }

  getLatestReading(deviceId: string): SensorReading | undefined {
    const history = this.readings.get(deviceId);
    return history?.[history.length - 1];
  }

  getActiveDevices(): string[] {
    const cutoff = Date.now() - 60_000; // active in last 60s
    return [...this.readings.entries()]
      .filter(([, readings]) => {
        const last = readings[readings.length - 1];
        return last && last.timestamp > cutoff;
      })
      .map(([id]) => id);
  }

  disconnect(): void {
    this.client.end();
  }
}

// --- Usage ---
const dashboard = new IoTDashboard('mqtt://broker.local:1883', [
  'sensors/+/temperature',
  'sensors/+/humidity',
  'sensors/+/motion',
]);

dashboard.addAlertRule({
  sensorType: 'temperature',
  condition: 'above',
  threshold: 35,
  message: 'High temperature detected',
});

dashboard.addAlertRule({
  sensorType: 'humidity',
  condition: 'below',
  threshold: 20,
  message: 'Low humidity warning',
});
```

## Key Patterns

- **MQTT QoS 1**: at-least-once delivery for sensor data (acceptable for dashboards)
- **Rolling history buffer**: fixed-size array prevents memory growth from high-frequency sensors
- **Wildcard topics**: `sensors/+/temperature` subscribes to all devices' temperature readings
- **Active device detection**: 60-second timeout distinguishes live vs offline devices
- **Alert rules**: threshold-based alerting with extensible condition types
