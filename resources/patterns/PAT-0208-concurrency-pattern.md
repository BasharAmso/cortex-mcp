---
id: PAT-0208
name: Concurrency Pattern
category: patterns
tags: [concurrency, async, threads, actors, channels, green-threads]
capabilities: [concurrency-model-selection, thread-management, actor-system-design, async-architecture]
useWhen:
  - choosing between threads, async/await, and actors
  - designing concurrent data processing systems
  - handling shared state across multiple execution contexts
  - building high-throughput systems with parallelism
  - understanding green threads vs OS threads
estimatedTokens: 650
relatedFragments: [SKL-0404, SKL-0407, PAT-0210, PAT-0211]
dependencies: []
synonyms: ["threads vs async await", "how to handle concurrency", "actor model explained", "channels for concurrency", "green threads vs OS threads", "which concurrency model should I use"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: advanced
owner: "cortex"
pillar: "language"
---

# Concurrency Pattern

Choosing and implementing the right concurrency model for your system's workload and language.

## Concurrency Models Compared

| Model | Mechanism | Shared State | Best For | Languages |
|-------|-----------|-------------|----------|-----------|
| **OS Threads** | Kernel-scheduled | Mutex/locks | CPU-bound parallelism | Java, C++, Rust |
| **Async/Await** | Event loop | Single-threaded | I/O-bound workloads | JS, Python, C#, Rust |
| **Actors** | Message passing | No shared state | Distributed systems | Erlang, Akka, Elixir |
| **Channels** | CSP (communicating sequential processes) | Channel-mediated | Pipeline processing | Go, Rust, Kotlin |
| **Green Threads** | Runtime-scheduled | Varies | High-concurrency servers | Go goroutines, Java virtual threads |

## Thread-Based Concurrency

OS threads provide true parallelism but are expensive (1MB+ stack each). Protect shared state with mutexes, read-write locks, or atomic operations. Deadlocks occur when two threads wait on each other's locks. Prevention: always acquire locks in a consistent order. Use thread pools (`ExecutorService` in Java, `ThreadPoolExecutor` in Python) to bound resource usage.

## Async/Await

Async/await multiplexes many tasks onto few threads using cooperative scheduling. A task yields control at `await` points, letting other tasks run. This is ideal for I/O-bound workloads (HTTP requests, database queries, file I/O). It is not suitable for CPU-bound work, which blocks the event loop. In Python, use `asyncio`; in JavaScript, `Promise` and `async/await`; in Rust, `tokio`.

## Actor Model

Actors are independent units that communicate only through messages. No shared state means no locks and no data races. Each actor processes one message at a time. This model scales naturally across machines. Erlang/OTP pioneered this for telecom systems with nine-nines reliability. Akka brings actors to the JVM.

## Channel-Based (CSP)

Go popularized channels: goroutines send and receive values through typed channels. Select statements multiplex across multiple channels. Buffered channels decouple producers from consumers. The mantra: "Don't communicate by sharing memory; share memory by communicating."

```go
results := make(chan Result, 10)
for _, url := range urls {
    go func(u string) {
        results <- fetch(u)
    }(url)
}
```

## Decision Guide

1. **I/O-bound, single language** → async/await
2. **CPU-bound, needs parallelism** → OS threads or green threads
3. **Distributed, fault-tolerant** → actors
4. **Pipeline processing** → channels
5. **Mixed workloads** → combine async for I/O with thread pool for CPU
