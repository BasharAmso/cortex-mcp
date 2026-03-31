---
id: SKL-0336
name: Observability Stack
category: skills
tags: [observability, metrics, logs, traces, dashboards, alerting]
capabilities: [metrics-design, log-aggregation, distributed-tracing, alert-configuration]
useWhen:
  - setting up monitoring for a production system
  - choosing between metrics, logs, and traces for a debugging scenario
  - designing dashboards that surface actionable information
  - configuring alerting that avoids noise and catches real incidents
  - implementing distributed tracing across microservices
estimatedTokens: 670
relatedFragments: [SKL-0126, SKL-0338, PAT-0172, SKL-0331]
dependencies: []
synonyms: ["how to set up monitoring", "metrics vs logs vs traces", "observability for beginners", "Grafana dashboard best practices", "how to configure alerts", "distributed tracing explained"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/grafana/grafana"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Observability Stack

Observability is the ability to understand what is happening inside a system by examining its outputs. The three pillars — metrics, logs, and traces — serve different purposes and complement each other.

## The Three Pillars

### Metrics

Numerical measurements collected at regular intervals. Lightweight, aggregatable, and ideal for dashboards and alerting.

- **Counters** increment monotonically (total requests, total errors)
- **Gauges** measure a current value (CPU usage, queue depth, active connections)
- **Histograms** track distributions (request latency p50, p95, p99)

Use Prometheus for collection, Grafana for visualization. Instrument the RED metrics for services (Rate, Errors, Duration) and USE metrics for resources (Utilization, Saturation, Errors).

### Logs

Structured records of discrete events. Rich in context but expensive to store and query at scale.

- **Always use structured logging** (JSON). Unstructured text logs are nearly impossible to query reliably.
- Include correlation IDs, timestamps, service name, and severity level in every log entry.
- Use log levels correctly: ERROR for failures needing action, WARN for degraded states, INFO for significant events, DEBUG for development only.

Aggregate logs with ELK (Elasticsearch, Logstash, Kibana) or Loki + Grafana. Ship logs asynchronously to avoid impacting application performance.

### Traces

Follow a single request as it flows through multiple services. Each service creates a span; spans are linked into a trace by a shared trace ID.

- Use OpenTelemetry for instrumentation — it is the industry standard and vendor-neutral
- Traces reveal which service is slow, where errors originate, and how services depend on each other
- Sample traces in production (e.g., 1-10% of requests) to manage storage costs. Always trace 100% of errors.

## Dashboard Design

Dashboards should answer questions, not just display numbers.

**Service dashboard:** Request rate, error rate, latency percentiles, saturation (CPU, memory, connections). One dashboard per service.

**Business dashboard:** Active users, transaction volume, conversion rates. Connects technical health to business impact.

**Design rules:**
- Put the most important metrics in the top-left (people scan left-to-right, top-to-bottom)
- Use consistent time ranges across panels
- Add threshold lines for SLOs so deviations are visually obvious
- Limit dashboards to 8-12 panels. More than that means you need two dashboards.

## Alerting

Good alerts are actionable, urgent, and real. Bad alerts train people to ignore them.

| Principle | Practice |
|-----------|----------|
| **Alert on symptoms, not causes** | Alert on high error rate, not on a specific pod restarting |
| **Set meaningful thresholds** | Base thresholds on SLOs, not arbitrary numbers |
| **Reduce noise** | Use alert grouping, inhibition, and silencing during maintenance |
| **Require runbooks** | Every alert should link to a runbook describing diagnosis and remediation steps |

Use a tiered severity model: Page (wake someone up) for customer-impacting issues. Ticket (address next business day) for degraded but functional states. Log (investigate when convenient) for anomalies.

## Getting Started

Start with metrics and alerting on the RED/USE framework. Add structured logging with correlation IDs. Introduce tracing when you have multiple services and need to debug cross-service latency. Build dashboards iteratively based on questions that arise during incidents.
