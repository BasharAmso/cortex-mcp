---
id: PAT-0090
name: Logging for Debugging
category: patterns
tags: [logging, debugging, observability, log-levels, structured-logging, console]
capabilities: [strategic-logging, log-level-selection, structured-output, debugging-workflow]
useWhen:
  - adding logging to an application for debugging purposes
  - choosing what information to log and at what level
  - replacing scattered console.log statements with structured logging
  - troubleshooting production issues using log output
  - setting up logging infrastructure for a new project
estimatedTokens: 650
relatedFragments: [SKL-0172, PAT-0092, SKL-0175]
dependencies: []
synonyms: ["how to use console.log effectively for debugging", "what are log levels and when to use each one", "how to add structured logging to my app", "what should I log in my application", "how to debug with log statements"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Logging for Debugging

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0090 |
| **Name** | Logging for Debugging |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Logging is your primary tool for understanding what your application is doing at runtime. The Node.js Best Practices guide emphasizes using mature logging libraries over raw `console.log` and writing logs to stdout so infrastructure handles routing. Strategic logging turns debugging from guesswork into investigation.

### Log Levels

Log levels categorize messages by severity. Use them consistently:

| Level | When to Use | Example |
|-------|-------------|---------|
| **error** | Something failed and needs attention | Database connection lost, payment processing failed |
| **warn** | Something unexpected but not broken | Deprecated API called, rate limit approaching |
| **info** | Normal operations worth recording | User signed up, order placed, server started |
| **debug** | Detailed information for troubleshooting | Request payload, query parameters, cache hit/miss |

In production, set the log level to `info` or `warn`. In development, set it to `debug`. This prevents debug noise from overwhelming production logs.

### What to Log

**Do log:**
- Incoming requests (method, path, status code, duration)
- Business events (user created, payment processed, email sent)
- Errors with full context (error message, stack trace, relevant IDs)
- Integration points (external API calls, database queries, cache operations)

**Do not log:**
- Passwords, tokens, or API keys
- Full credit card numbers or sensitive personal data
- Every loop iteration or variable assignment
- Anything at a high frequency that would flood logs (per-pixel rendering, per-keystroke events)

### Structured Logging

Instead of string messages, log structured objects:

```javascript
// Avoid
console.log('User 123 placed order 456 for $99.00');

// Prefer
logger.info({ userId: 123, orderId: 456, amount: 99.00 }, 'Order placed');
```

Structured logs are searchable, filterable, and parseable by log management tools. When debugging a production issue, you can filter by `userId` or `orderId` instead of searching through string messages.

### Transaction IDs

Assign a unique ID to each incoming request and include it in every log entry for that request. This lets you trace a single user action through multiple services and function calls. Most web frameworks support middleware that generates and attaches a request ID automatically.

### From console.log to a Logger

For learning and small projects, `console.log` is fine. When you move to production:

1. **Pick a logging library**: Pino (fast, structured) or Winston (flexible, widely used) for Node.js. Python has the built-in `logging` module. Most languages have a standard option.
2. **Log to stdout**: Let your deployment platform (Docker, cloud provider) handle where logs go. Do not write to files from your application.
3. **Set log levels per environment**: Debug in development, info or warn in production.

## Key Takeaways

- Use log levels consistently: error for failures, info for business events, debug for troubleshooting detail
- Log structured objects instead of string messages so logs are searchable and filterable
- Assign a transaction ID to each request to trace actions across your entire system
- Never log passwords, tokens, or sensitive personal data
- Log to stdout and let infrastructure handle routing and storage
