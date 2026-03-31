---
id: SKL-0342
name: Data Pipeline Architecture
category: skills
tags: [data-pipeline, etl, elt, batch-processing, stream-processing, data-quality]
capabilities: [pipeline-design, batch-stream-choice, data-orchestration, quality-validation]
useWhen:
  - designing data pipelines for analytics or reporting
  - choosing between ETL and ELT approaches
  - deciding between batch and stream processing
  - implementing data quality checks in a pipeline
  - orchestrating multi-step data transformations
estimatedTokens: 670
relatedFragments: [SKL-0332, SKL-0335, SKL-0336, PAT-0059]
dependencies: []
synonyms: ["how to build a data pipeline", "ETL vs ELT explained", "batch vs stream processing", "data pipeline orchestration", "Airflow for beginners", "data quality in pipelines"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apache/airflow"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Data Pipeline Architecture

A data pipeline moves data from sources to destinations through a series of transformation steps. Well-designed pipelines are reliable, observable, and easy to debug when something goes wrong.

## ETL vs ELT

**ETL (Extract, Transform, Load):** Data is transformed before loading into the destination. The pipeline does the heavy lifting. Traditional approach used when the destination has limited compute (data warehouses with expensive query engines).

**ELT (Extract, Load, Transform):** Raw data is loaded first, then transformed inside the destination using its compute power. Modern approach leveraging powerful cloud warehouses (BigQuery, Snowflake, Redshift) that can transform data efficiently.

ELT is now the default for analytics pipelines. Load raw data, transform with dbt or SQL, and let the warehouse handle compute. ETL remains relevant when data must be cleaned or filtered before landing (privacy, compliance, size constraints).

## Batch vs Stream

| Dimension | Batch | Stream |
|-----------|-------|--------|
| **Latency** | Minutes to hours | Seconds to milliseconds |
| **Complexity** | Lower — process complete datasets | Higher — handle ordering, late arrivals, windowing |
| **Cost** | Cheaper for large volumes | Higher per-record, but lower infrastructure idle time |
| **Use cases** | Daily reports, ML model training, data warehouse loads | Real-time dashboards, fraud detection, live recommendations |

**Start with batch.** Most analytics use cases do not need sub-second latency. A well-designed batch pipeline running hourly covers 90% of needs. Add streaming only when the business requires real-time.

## Orchestration

An orchestrator schedules, sequences, and monitors pipeline steps.

**Apache Airflow** defines pipelines as directed acyclic graphs (DAGs) in Python. Each node is a task; edges define dependencies. Airflow handles scheduling, retries, alerting, and logging.

**Key concepts:**
- **DAG:** The pipeline definition. Runs on a schedule or trigger.
- **Task:** A single unit of work (extract from API, transform with SQL, load to warehouse).
- **Operator:** A template for a task type (BashOperator, PythonOperator, BigQueryOperator).
- **Sensor:** A task that waits for a condition (file arrival, partition availability) before proceeding.

**Design rules:**
- Keep tasks atomic and idempotent. Reruns should produce the same result.
- Avoid passing large data between tasks. Write intermediate results to storage and pass references.
- Set timeouts on every task. A hung task should not block the entire pipeline.

## Data Quality

Bad data in means bad decisions out. Build quality checks into the pipeline, not after it.

**Schema validation:** Verify column names, types, and nullability match expectations before processing. Reject or quarantine non-conforming records.

**Volume checks:** Compare row counts against expected ranges. A table that usually has 10,000 rows arriving with 50 rows indicates a source problem.

**Freshness checks:** Verify timestamps are recent. Stale data suggests a failed upstream extraction.

**Value checks:** Validate business rules (prices are positive, emails contain @, percentages are 0-100). Flag anomalies for review.

Use a framework like Great Expectations or dbt tests to define and run quality checks declaratively.

## Idempotency

Pipelines fail and must be rerun. An idempotent pipeline produces the same result regardless of how many times it runs for the same input.

**Partition by date.** Process one day's data per run. Overwrite the partition on rerun rather than appending duplicates.

**Use merge/upsert.** When loading data, merge on a primary key instead of insert-only. This handles reruns and late-arriving data.

## Monitoring

Track these pipeline metrics: run duration, success/failure rate, data freshness (time since last successful load), row counts, and quality check pass rate. Alert on failures immediately and on quality degradation within a business-relevant threshold.
