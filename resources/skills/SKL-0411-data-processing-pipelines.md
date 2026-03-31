---
id: SKL-0411
name: Data Processing Pipelines
category: skills
tags: [data-pipelines, etl, airflow, scheduling, monitoring, data-validation]
capabilities: [pipeline-design, data-transformation, scheduling-orchestration, pipeline-monitoring]
useWhen:
  - building ETL or ELT pipelines for data processing
  - orchestrating multi-step data workflows
  - scheduling recurring data jobs
  - validating and transforming data between systems
  - monitoring pipeline health and failures
estimatedTokens: 650
relatedFragments: [SKL-0413, SKL-0414, PAT-0212, PAT-0210]
dependencies: []
synonyms: ["how to build a data pipeline", "ETL pipeline tutorial", "Airflow DAG guide", "data transformation workflow", "how to schedule data jobs", "how to monitor data pipelines"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apache/airflow"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Skill: Data Processing Pipelines

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0411 |
| **Name** | Data Processing Pipelines |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Data pipelines move, transform, and validate data between systems. Whether it is ETL (Extract-Transform-Load) or ELT (Extract-Load-Transform), the goal is reliable, repeatable data flow with clear observability.

### Pipeline Architecture

A pipeline consists of stages connected in a DAG (Directed Acyclic Graph). Each stage performs one operation: extract from a source, validate, transform, enrich, or load into a destination. Stages should be idempotent so reruns produce the same result.

```
Source → Extract → Validate → Transform → Load → Destination
                      ↓
                  Dead Letter Queue (invalid records)
```

### Orchestration Tools

| Tool | Type | Best For |
|------|------|----------|
| **Apache Airflow** | DAG scheduler | Complex workflows, Python-native |
| **Prefect** | Modern orchestrator | Developer-friendly, dynamic flows |
| **dbt** | SQL transforms | Analytics, warehouse transformations |
| **n8n / Zapier** | Low-code | Simple integrations, non-engineers |
| **Cron + scripts** | Basic | Simple, single-step jobs |

Airflow defines workflows as Python DAGs. Each task is an operator (PythonOperator, BashOperator, SQL operators). Dependencies between tasks define execution order. Use `@task` decorator (TaskFlow API) for cleaner Python-native DAGs.

### Data Validation

Validate data at every boundary. Use schema validation (JSON Schema, Pydantic, Great Expectations) to catch structural issues. Validate business rules (date ranges, allowed values, referential integrity). Route invalid records to a dead letter queue for manual review rather than failing the entire pipeline.

### Monitoring and Alerting

Track pipeline metrics: records processed, duration, error rate, and data freshness. Alert on failures, SLA breaches, and unexpected data volume changes. Airflow provides built-in email alerts on task failure. For custom monitoring, emit metrics to Prometheus or Datadog.

### Scheduling Best Practices

Run pipelines on a schedule (cron-like) or trigger on events (new file arrival, webhook). Use backfill capabilities to reprocess historical data. Set execution timeouts to prevent runaway jobs. Use pools and concurrency limits to prevent resource exhaustion.

## Key Takeaways

- Design pipeline stages to be idempotent so reruns are safe
- Validate data at every stage boundary, not just at the end
- Route bad records to dead letter queues instead of failing the pipeline
- Monitor pipeline duration, volume, and error rate with alerting
- Use backfill capabilities for historical data reprocessing
