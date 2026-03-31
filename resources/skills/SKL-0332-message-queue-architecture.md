---
id: SKL-0332
name: Message Queue Architecture
category: skills
tags: [message-queue, pub-sub, kafka, topics, partitions, consumer-groups]
capabilities: [queue-design, pub-sub-architecture, message-ordering, consumer-scaling]
useWhen:
  - designing asynchronous communication between services
  - choosing between message queue technologies
  - implementing reliable message delivery with ordering guarantees
  - scaling consumers with consumer groups and partitions
  - building event streaming pipelines
estimatedTokens: 680
relatedFragments: [PAT-0059, PAT-0176, SKL-0126, SKL-0342]
dependencies: []
synonyms: ["how do message queues work", "Kafka vs RabbitMQ", "pub/sub messaging explained", "consumer groups and partitions", "how to guarantee message ordering", "when to use a message broker"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/apache/kafka"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Message Queue Architecture

Message queues decouple producers from consumers by introducing a broker that stores and delivers messages asynchronously. This enables independent scaling, fault tolerance, and temporal decoupling.

## Queue vs Stream

| Model | Behavior | Best For |
|-------|----------|----------|
| **Queue (RabbitMQ, SQS)** | Message delivered to one consumer, removed after acknowledgment | Task distribution, work queues |
| **Stream (Kafka, Kinesis)** | Messages appended to a log, retained for replay, multiple consumers read independently | Event sourcing, analytics, audit trails |

Choose queues when each message should be processed exactly once by one worker. Choose streams when multiple consumers need to read the same events or you need replay capability.

## Topics and Partitions

**Topics** group related messages (e.g., `order-events`, `user-notifications`). Each topic can have multiple **partitions** that enable parallel processing.

Messages with the same partition key (e.g., user ID) always go to the same partition, guaranteeing ordering for that key. Messages across different partitions have no ordering guarantee.

**Partition count** determines maximum consumer parallelism. You can have at most one consumer per partition within a consumer group. Start with a moderate number and increase as throughput demands grow. Reducing partitions later is difficult.

## Consumer Groups

A consumer group is a set of consumers that cooperate to process a topic. Each partition is assigned to exactly one consumer in the group. If a consumer fails, its partitions are rebalanced to surviving members.

Multiple consumer groups can independently read the same topic. The orders service and the analytics service each have their own group, processing every message independently.

## Delivery Guarantees

| Guarantee | Meaning | Trade-off |
|-----------|---------|-----------|
| **At-most-once** | Message may be lost, never redelivered | Fastest, lowest overhead |
| **At-least-once** | Message always delivered, may be duplicated | Requires idempotent consumers |
| **Exactly-once** | Message processed exactly once (Kafka transactions) | Highest overhead, limited to specific brokers |

At-least-once with idempotent consumers is the most practical default. Design consumers to handle duplicates safely using deduplication keys or naturally idempotent operations.

## Backpressure and Dead Letters

When consumers fall behind, messages accumulate. Monitor consumer lag (the gap between latest produced offset and latest consumed offset). Scale consumers or increase partition count to keep up.

Messages that repeatedly fail processing should be routed to a **dead letter queue** for investigation rather than blocking the main queue. Set a retry limit (typically 3-5 attempts) with exponential backoff.

## Schema Management

Use a schema registry (Confluent Schema Registry, AWS Glue) to enforce message structure. Evolve schemas with backward-compatible changes (add optional fields, never remove or rename existing ones). This prevents producers and consumers from breaking each other.

## Key Design Decisions

- **Message size:** Keep messages small (metadata + IDs). Store large payloads in object storage and reference them.
- **Retention period:** Set based on replay needs. Kafka defaults to 7 days; adjust for your use case.
- **Compaction:** Use log compaction for topics where only the latest value per key matters (e.g., user profile updates).
- **Ordering scope:** Accept that global ordering does not scale. Design around per-key ordering.
