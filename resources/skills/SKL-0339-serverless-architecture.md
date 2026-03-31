---
id: SKL-0339
name: Serverless Architecture
category: skills
tags: [serverless, lambda, functions, cold-starts, event-triggers, cost-optimization]
capabilities: [serverless-design, function-composition, cold-start-mitigation, event-driven-compute]
useWhen:
  - building event-driven applications without managing servers
  - reducing infrastructure costs for variable or bursty workloads
  - choosing between serverless and container-based architectures
  - mitigating cold start latency for user-facing functions
  - designing function composition and orchestration
estimatedTokens: 660
relatedFragments: [SKL-0337, SKL-0331, PAT-0059, SKL-0342]
dependencies: []
synonyms: ["how does serverless work", "AWS Lambda architecture", "serverless vs containers", "cold start problem explained", "when to use serverless", "serverless cost optimization"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/serverless/serverless"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Serverless Architecture

Serverless architecture runs code in response to events without provisioning or managing servers. The cloud provider allocates compute on demand, scales automatically, and charges only for execution time.

## How It Works

1. An event occurs (HTTP request, message, file upload, schedule)
2. The platform spins up a function instance to handle the event
3. The function executes and returns a result
4. The platform may keep the instance warm for subsequent invocations or shut it down

You write functions. The platform handles provisioning, scaling, patching, and availability.

## Cold Starts

When no warm instance exists, the platform must initialize a new one. This **cold start** adds latency (100ms to several seconds depending on runtime and package size).

**Mitigation strategies:**
- **Provisioned concurrency:** Keep a minimum number of instances warm (costs money but eliminates cold starts)
- **Smaller packages:** Reduce deployment size. Fewer dependencies means faster initialization.
- **Faster runtimes:** Python and Node.js cold-start faster than Java or .NET
- **Warm-up pings:** Schedule a recurring invocation to keep instances warm (fragile, not recommended for production)

For user-facing APIs where latency matters, provisioned concurrency or a container-based approach may be more appropriate than pure serverless.

## Event Triggers

| Trigger | Example Use Case |
|---------|-----------------|
| **HTTP (API Gateway)** | REST APIs, webhooks |
| **Message Queue (SQS, Kafka)** | Background processing, order fulfillment |
| **Storage (S3, GCS)** | Image processing on upload, file validation |
| **Schedule (cron)** | Nightly reports, cleanup jobs, data sync |
| **Database (DynamoDB Streams)** | React to data changes, maintain projections |
| **IoT / Streaming** | Real-time sensor data processing |

## Function Design

**Single responsibility:** Each function does one thing. A function that processes payments should not also send emails. Use events to chain functions.

**Stateless:** Functions can be created and destroyed at any time. Store state in databases, caches, or queues. Never rely on local filesystem or in-memory state persisting between invocations.

**Idempotent:** The same event may trigger a function more than once. Design for at-least-once delivery. Use deduplication keys or naturally idempotent operations.

**Short-lived:** Functions have execution time limits (15 minutes on AWS Lambda). Long-running processes should use Step Functions, containers, or break the work into smaller chunks.

## Composition Patterns

**Event chaining:** Function A writes to a queue, Function B reads from it. Loose coupling but harder to trace end-to-end.

**Step Functions / Workflows:** Orchestrate multiple functions with branching, retries, and error handling defined in a state machine. Better visibility and control than event chaining.

**API composition:** An API Gateway routes different endpoints to different functions. Each function owns one route or resource.

## Cost Model

Serverless pricing is per-invocation and per-millisecond of execution. This is cheaper than always-on servers for sporadic workloads but can become expensive at high sustained volume.

**When serverless saves money:** Variable traffic, bursty workloads, background jobs, early-stage products with unpredictable usage.

**When containers are cheaper:** High sustained throughput, predictable load, long-running processes, workloads that benefit from reserved capacity.

## Trade-Offs

| Benefit | Cost |
|---------|------|
| Zero server management | Vendor lock-in to platform-specific services |
| Automatic scaling to zero | Cold start latency for infrequent functions |
| Pay-per-use pricing | Expensive at consistently high volume |
| Fast time to deploy | Limited execution time and memory |
| Built-in high availability | Harder to test locally and debug in production |
