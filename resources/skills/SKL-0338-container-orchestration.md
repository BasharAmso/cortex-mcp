---
id: SKL-0338
name: Container Orchestration
category: skills
tags: [kubernetes, containers, pods, deployments, services, scaling]
capabilities: [container-deployment, service-networking, horizontal-scaling, workload-management]
useWhen:
  - deploying containerized applications to production
  - designing service networking and discovery in Kubernetes
  - configuring horizontal pod autoscaling
  - choosing between Kubernetes, ECS, and other orchestrators
  - managing rolling deployments and rollbacks
estimatedTokens: 680
relatedFragments: [SKL-0337, SKL-0333, PAT-0175, SKL-0336]
dependencies: []
synonyms: ["how does Kubernetes work", "Kubernetes for beginners", "pods vs containers vs services", "how to deploy to Kubernetes", "Kubernetes scaling explained", "container orchestration basics"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/kubernetes/kubernetes"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Container Orchestration

Container orchestration automates deploying, scaling, networking, and managing containerized applications across a cluster of machines. Kubernetes is the dominant platform, but the concepts apply to any orchestrator.

## Core Abstractions

| Resource | Purpose |
|----------|---------|
| **Pod** | Smallest deployable unit. One or more containers sharing network and storage. Usually one application container per pod. |
| **Deployment** | Manages a set of identical pods. Handles rolling updates and rollbacks. |
| **Service** | Stable network endpoint that routes traffic to a set of pods. Pods come and go; the Service address stays constant. |
| **Ingress** | Routes external HTTP/HTTPS traffic to internal Services based on hostname or path rules. |
| **ConfigMap / Secret** | Externalize configuration and sensitive data from container images. |
| **Namespace** | Logical isolation boundary within a cluster for teams or environments. |

## Deployment Strategies

**Rolling Update (default):** Gradually replaces old pods with new ones. At any point, both versions are running. Set `maxUnavailable` and `maxSurge` to control the pace.

**Blue-Green:** Run two full environments. Switch traffic from old (blue) to new (green) at once. Fast rollback by switching back. Requires double the resources during deployment.

**Canary:** Route a small percentage of traffic to the new version. Monitor error rates and latency. Gradually increase traffic if healthy. Requires a service mesh or ingress controller that supports traffic splitting.

## Scaling

**Horizontal Pod Autoscaler (HPA):** Automatically adjusts the number of pod replicas based on CPU usage, memory, or custom metrics. Set target utilization (e.g., 70% CPU) and let Kubernetes add or remove pods.

**Vertical Pod Autoscaler (VPA):** Adjusts CPU and memory requests per pod based on observed usage. Useful for workloads that cannot scale horizontally.

**Cluster Autoscaler:** Adds or removes nodes from the cluster when pods cannot be scheduled (too few nodes) or nodes are underutilized (too many nodes).

Start with HPA for stateless services. Add Cluster Autoscaler so the cluster grows with your pods.

## Networking

Every pod gets its own IP address. Pods can communicate with any other pod in the cluster without NAT. Services provide stable IPs and DNS names.

**ClusterIP** (default): Accessible only within the cluster. Use for internal service-to-service communication.

**NodePort:** Exposes the service on a static port on every node. Use for development or when you have your own load balancer.

**LoadBalancer:** Provisions a cloud load balancer that routes external traffic to the service. Use for production external access.

## Resource Management

Always set resource requests (guaranteed minimum) and limits (maximum allowed) for CPU and memory. Without them, a single pod can consume all node resources and destabilize other workloads.

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

## Health Checks

**Liveness probe:** Restarts the pod if it fails. Catches deadlocks and unrecoverable states. Use an HTTP endpoint or TCP check.

**Readiness probe:** Removes the pod from service traffic if it fails. Use during startup (loading data, warming caches) and transient issues.

**Startup probe:** Gives slow-starting containers time to initialize before liveness checks begin. Prevents premature restarts.

## Key Practices

- Keep container images small and use multi-stage builds. Smaller images pull faster and have fewer vulnerabilities.
- Use namespaces and RBAC to isolate teams. Never give cluster-admin to application service accounts.
- Store configuration in ConfigMaps, secrets in Secrets (or an external vault). Never bake configuration into images.
- Run at least 3 replicas for production services. Single-replica deployments have zero fault tolerance.
