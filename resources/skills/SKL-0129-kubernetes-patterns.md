---
id: SKL-0129
name: Kubernetes Patterns
category: skills
tags: [kubernetes, k8s, containers, pods, deployments, services, configmaps, health-probes, resource-management]
capabilities: [kubernetes-deployment, container-orchestration, health-check-design, k8s-configuration]
useWhen:
  - deploying applications to Kubernetes for the first time
  - designing health checks and lifecycle hooks for containers
  - choosing between Deployment, StatefulSet, DaemonSet, and Job
  - configuring resource limits and autoscaling
  - structuring Kubernetes manifests for a production workload
estimatedTokens: 700
relatedFragments: [PAT-0058, SKL-0130, SKL-0018]
dependencies: []
synonyms: ["how to deploy to Kubernetes", "Kubernetes for beginners", "pods and deployments explained", "k8s health checks", "how to configure Kubernetes apps", "container orchestration patterns"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/k8spatterns/examples"
difficulty: intermediate
owner: "cortex"
---

# Kubernetes Patterns

Kubernetes patterns are reusable solutions for deploying, managing, and scaling containerized applications. They fall into four categories.

## Foundational Patterns

| Pattern | Purpose |
|---------|---------|
| **Predictable Demands** | Declare resource requirements (CPU, memory) and configuration dependencies so the scheduler places pods correctly |
| **Declarative Deployment** | Use Deployment manifests for rolling updates, rollbacks, and replica management |
| **Health Probe** | Liveness probes restart unhealthy containers; readiness probes control traffic admission; startup probes protect slow-starting apps |
| **Managed Lifecycle** | Use `postStart` and `preStop` hooks for initialization and graceful shutdown |
| **Automated Placement** | Node selectors, affinity rules, taints, and tolerations control where pods run |

## Behavioral Patterns

| Pattern | Purpose |
|---------|---------|
| **Batch Job** | Run-to-completion workloads using `Job` resources |
| **Periodic Job** | Schedule recurring work with `CronJob` |
| **Daemon Service** | Run one pod per node (log collectors, monitoring agents) via `DaemonSet` |
| **Singleton Service** | Ensure only one active instance using leader election or `StatefulSet` with one replica |
| **Stateful Service** | Manage stateful workloads with `StatefulSet` for stable network identity and persistent storage |
| **Service Discovery** | Expose services via ClusterIP, NodePort, LoadBalancer, or Ingress depending on access requirements |

## Structural Patterns

| Pattern | Purpose |
|---------|---------|
| **Init Container** | Run setup tasks (migrations, config fetching) before the main container starts |
| **Sidecar** | Attach a helper container (log shipper, proxy) alongside the main container in the same pod |
| **Adapter** | Transform output from the main container into a standard format (e.g., Prometheus metrics) |
| **Ambassador** | Proxy outbound traffic from the main container through a helper (e.g., connection pooling) |

## Configuration Patterns

| Pattern | Purpose |
|---------|---------|
| **EnvVar Configuration** | Inject settings via environment variables from ConfigMaps and Secrets |
| **Configuration Resource** | Mount ConfigMaps as files for applications that read config from disk |
| **Immutable Configuration** | Bake configuration into a separate container image; no runtime changes |
| **Configuration Template** | Process templates at startup, filling placeholders from ConfigMap values |

## Choosing the Right Workload Resource

- **Deployment**: Stateless services with rolling updates and scaling
- **StatefulSet**: Databases, caches, anything needing stable identity or persistent volumes
- **DaemonSet**: Node-level agents (monitoring, logging, networking)
- **Job / CronJob**: Batch processing, scheduled tasks, data pipelines

## Health Probe Design

Keep liveness probes simple (is the process alive?). Never check external dependencies in liveness probes as this causes cascading restarts. Readiness probes can check dependencies because they only stop traffic, not restart containers. Set appropriate `initialDelaySeconds` and `periodSeconds` to avoid false positives during startup.
