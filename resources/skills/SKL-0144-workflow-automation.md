---
id: SKL-0144
name: Workflow Automation
category: skills
tags: [workflow, automation, triggers, nodes, credentials, error-handling, retries, n8n, no-code, visual-workflows]
capabilities: [workflow-design, trigger-configuration, node-based-execution, credential-management, error-recovery]
useWhen:
  - building automated workflows that connect multiple services
  - designing trigger-based execution pipelines
  - implementing retry logic and error handling in multi-step processes
  - managing credentials securely across workflow nodes
  - replacing manual repetitive tasks with automated sequences
estimatedTokens: 650
relatedFragments: [SKL-0145, PAT-0059, PAT-0067, PAT-0070, SKL-0010, EX-0044]
dependencies: []
synonyms: ["how to automate my workflow", "connect apps together automatically", "set up triggers between services", "build a no-code automation", "make things run automatically", "automate repetitive tasks"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# Skill: Workflow Automation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0144 |
| **Version** | 1.0 |
| **Owner** | cortex |
| **Inputs** | Process description, service list, trigger requirements, credential inventory |
| **Outputs** | Workflow definition, trigger configuration, error handling plan, credential map |
| **Triggers** | `WORKFLOW_AUTOMATION_REQUESTED` |

---

## Purpose

Design and implement automated workflows that connect services, react to events, and execute multi-step processes reliably. Every workflow has clear triggers, handles failures gracefully, and stores credentials securely.

---

## Workflow Architecture

A workflow automation system has four core layers:

1. **Triggers** start execution. They can be time-based (cron), event-based (webhook), or manual. Every trigger must be idempotent-safe: receiving the same event twice should not cause duplicate side effects.

2. **Nodes** are the individual steps. Each node does one thing: call an API, transform data, make a decision, or wait. Nodes receive input from the previous step and pass output forward. Keep nodes small and single-purpose.

3. **Credential management** keeps secrets out of workflow definitions. Store API keys, OAuth tokens, and passwords in a dedicated credential store, never inline. Rotate credentials on a schedule and audit access.

4. **Error handling** determines what happens when a node fails. The three strategies are: retry (with exponential backoff), skip (mark as warning and continue), or halt (stop the workflow and alert).

## Execution Patterns

| Pattern | When to Use | How It Works |
|---------|-------------|--------------|
| **Linear** | Simple A-then-B-then-C flows | Nodes execute sequentially, each depending on the previous |
| **Branching** | Conditional logic (if/else) | Route execution down different paths based on data |
| **Parallel** | Independent steps that can run simultaneously | Fan out to multiple nodes, fan in to collect results |
| **Loop** | Processing collections of items | Iterate over arrays, processing each item through sub-nodes |
| **Sub-workflow** | Reusable process fragments | Extract common sequences into callable sub-workflows |

## Error Handling Strategy

```
Node fails → Check retry policy
  ├── Retries remaining? → Wait (exponential backoff) → Retry node
  ├── No retries left + continueOnFail? → Log warning → Next node
  └── No retries left + halt? → Stop workflow → Send alert
```

**Retry defaults:** 3 attempts, exponential backoff starting at 1 second, max 30 seconds. Override per-node when the downstream service has specific rate limits.

## Credential Security Rules

- Never store credentials in workflow JSON or environment variables directly
- Use a credential store with encryption at rest (n8n uses AES-256-CBC)
- Scope credentials to specific workflows; avoid shared "admin" credentials
- Log credential usage (which workflow, which node, when) for audit trails
- Test workflows against sandbox/staging credentials before production

## Design Checklist

- [ ] Every trigger has a deduplication mechanism
- [ ] Every external call has a timeout and retry policy
- [ ] Credentials are in a secure store, not hardcoded
- [ ] Error notifications go to an alerting channel
- [ ] Workflow has a manual trigger for testing
- [ ] Data transformations are validated before passing downstream
- [ ] Workflow execution is logged for debugging
