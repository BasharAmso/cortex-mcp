---
id: PAT-0058
name: Kubernetes Production Checklist
category: patterns
tags: [kubernetes, production, resource-limits, health-probes, pod-disruption-budget, network-policies, rbac, secrets-management, security]
capabilities: [production-readiness-validation, k8s-security-hardening, resource-management, cluster-governance]
useWhen:
  - preparing a Kubernetes deployment for production
  - auditing an existing cluster for security and reliability
  - setting up resource limits, health checks, and pod disruption budgets
  - implementing RBAC and network policies
  - reviewing Kubernetes security posture
estimatedTokens: 750
relatedFragments: [SKL-0129, PAT-0010, SKL-0018, SKL-0004]
dependencies: []
synonyms: ["Kubernetes production checklist", "k8s security hardening", "how to make Kubernetes production ready", "Kubernetes best practices checklist", "k8s resource limits guide", "production Kubernetes setup"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/learnk8s/kubernetes-production-best-practices"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Kubernetes Production Checklist

A structured checklist for deploying secure, reliable, and scalable workloads on Kubernetes. Organized by concern area.

## Application Health

- [ ] **Readiness probes** configured to gate traffic admission. Pod receives traffic only when ready.
- [ ] **Liveness probes** configured to restart unhealthy containers. Use simple checks (TCP or HTTP 200).
- [ ] **Keep probes separate.** Different endpoints, different thresholds. A readiness failure stops traffic; a liveness failure restarts the container.
- [ ] **No external dependencies in liveness probes.** If the database is down, restarting your pod will not fix it. Cascading restarts make outages worse.
- [ ] **Graceful shutdown.** Handle SIGTERM, stop accepting new connections, drain in-flight requests, then exit.

## Resource Management

- [ ] **Memory requests and limits set** on every container. Without them, a single pod can OOM-kill the node.
- [ ] **CPU requests set.** Keep at or below 1 CPU unless the workload is compute-intensive.
- [ ] **Consider not setting CPU limits.** CPU throttling can cause latency spikes. Set requests for scheduling but let pods burst.
- [ ] **LimitRange** configured per namespace to enforce defaults and prevent unbounded resource consumption.
- [ ] **ResourceQuota** set to cap total namespace resource usage and object counts.

## Availability

- [ ] **Multiple replicas.** Run at least 2 replicas for any production workload.
- [ ] **Pod anti-affinity** rules spread replicas across nodes. A single node failure should not take down the service.
- [ ] **Pod Disruption Budget (PDB)** set to maintain minimum availability during voluntary disruptions (node drains, upgrades).
- [ ] **Horizontal Pod Autoscaler** configured for workloads with variable load.

## Security

- [ ] **No containers running as root.** Set `runAsNonRoot: true` in the security context.
- [ ] **Read-only filesystem.** Set `readOnlyRootFilesystem: true` and use `emptyDir` volumes for writable paths.
- [ ] **Drop all Linux capabilities** and add back only what is needed.
- [ ] **Disable privilege escalation.** Set `allowPrivilegeEscalation: false`.
- [ ] **Secrets mounted as volumes**, not environment variables. Environment variables appear in logs and process listings.
- [ ] **Default ServiceAccount token auto-mount disabled.** Grant only the permissions each workload needs.

## Network

- [ ] **Network policies** deployed in every namespace. Default-deny ingress/egress, then allow specific traffic.
- [ ] **Ingress hostnames validated** against an approved domain list.
- [ ] **Container images pulled only from approved registries.**

## RBAC

- [ ] **Distinct roles** defined: ReadOnly, PowerUser, Operator, Controller, Admin.
- [ ] **Minimum permissions** per role. No wildcard permissions on production resources.
- [ ] **OIDC authentication** for human users. ServiceAccount tokens for workloads only.

## Observability

- [ ] **Logs to stdout/stderr only.** No sidecar log transformers unless unavoidable.
- [ ] **Structured logging** with consistent fields (request ID, service name, severity).
- [ ] **30-45 day log retention** with archival strategy.
- [ ] **Metrics collected** from applications, nodes, and the control plane.

## Governance

- [ ] **Labels applied** to every resource: `app`, `version`, `owner`, `environment`, `part-of`.
- [ ] **No state stored on container filesystem.** Use persistent volumes or external storage.
- [ ] **All configuration externalized** via ConfigMaps and Secrets.
- [ ] **CIS Kubernetes Benchmark** passed (validate with kube-bench).
