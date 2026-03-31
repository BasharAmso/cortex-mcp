---
id: SKL-0135
name: MLOps Fundamentals
category: skills
tags: [mlops, machine-learning, experiment-tracking, model-versioning, feature-store, model-serving, monitoring, drift-detection, ml-cicd, ab-testing]
capabilities: [ml-lifecycle-management, experiment-tracking, model-deployment, production-monitoring]
useWhen:
  - deploying a machine learning model to production
  - setting up experiment tracking and model versioning
  - choosing MLOps tooling for a new ML project
  - monitoring model performance and detecting data drift
  - building CI/CD pipelines for ML workflows
estimatedTokens: 700
relatedFragments: [SKL-0009, PAT-0010, PAT-0060]
dependencies: []
synonyms: ["how to deploy ML models", "machine learning in production", "mlops best practices", "model monitoring and drift", "ml experiment tracking", "how to version ML models"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/visenger/awesome-mlops"
difficulty: advanced
owner: cortex
pillar: "language"
---

# MLOps Fundamentals

Production machine learning lifecycle: from experiment to deployment to monitoring.

## The ML Lifecycle

```
Data → Features → Train → Evaluate → Deploy → Monitor → Retrain
                    ↑                              |
                    └──────────────────────────────┘
```

MLOps applies DevOps principles to this loop. The goal: reliable, reproducible, automated ML systems.

## Experiment Tracking

Track every training run with its parameters, metrics, and artifacts. Without tracking, you cannot reproduce results or compare approaches.

| What to Track | Why |
|---------------|-----|
| Hyperparameters | Reproduce the exact run |
| Metrics (loss, accuracy, F1) | Compare runs objectively |
| Data version | Know which data produced which model |
| Model artifacts | Deploy the exact binary that was evaluated |
| Code commit hash | Link model to source code |

**Tools:** MLflow, Weights & Biases, Neptune.ai, DVC. Choose based on team size and infrastructure preferences. All solve the same core problem.

## Feature Stores

A feature store is a shared registry of computed features that ensures training and serving use the same transformations.

**Why it matters:** Training-serving skew (different feature computation in training vs production) is a top source of silent ML failures.

**Tools:** Feast (open-source), Tecton, Hopsworks. Start without one for small teams; add when feature reuse across models becomes a bottleneck.

## Model Serving

| Pattern | Use When |
|---------|----------|
| **REST API** (FastAPI, Flask) | Low-throughput, simple models |
| **Dedicated serving** (TF Serving, TorchServe) | High-throughput, GPU inference |
| **Kubernetes-native** (KServe, Seldon) | Multi-model, auto-scaling needs |
| **Batch inference** (Spark, Airflow) | Offline scoring, not real-time |
| **Edge/embedded** (ONNX, TFLite) | Mobile or IoT deployment |

## Monitoring & Drift Detection

Production models degrade silently. Monitor these signals:

1. **Data drift** — input distribution shifts from training data
2. **Concept drift** — the relationship between inputs and outputs changes
3. **Prediction drift** — model output distribution shifts unexpectedly
4. **Performance degradation** — business metrics (conversion, accuracy) decline

Set alerts on drift metrics. Automate retraining triggers when drift exceeds thresholds.

**Tools:** Evidently AI, Arize, WhyLabs, Great Expectations (for data quality).

## CI/CD for ML

ML pipelines add steps beyond traditional CI/CD:

```
Code Change → Lint/Test → Train → Evaluate → Compare to Champion → Deploy
Data Change → Validate → Retrain → Evaluate → Compare to Champion → Deploy
```

**Key differences from software CI/CD:**
- Tests include data validation and model performance thresholds
- Builds produce model artifacts, not just binaries
- Deployment may use shadow mode or A/B testing before full rollout

## A/B Testing Models

Deploy challenger models alongside the champion. Route a percentage of traffic to each. Measure business metrics (not just ML metrics) to decide promotion. Use statistical significance testing before declaring a winner.
