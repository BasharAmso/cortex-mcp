---
id: SKL-0169
name: Understanding CI/CD
category: skills
tags: [ci-cd, github-actions, continuous-integration, continuous-deployment, pipelines, automation]
capabilities: [workflow-reading, pipeline-comprehension, ci-debugging, action-configuration]
useWhen:
  - seeing a GitHub Actions workflow file for the first time
  - trying to understand why a build failed in CI
  - setting up automated testing for a project
  - reading YAML workflow files in .github/workflows/
  - understanding the difference between CI and CD
estimatedTokens: 650
relatedFragments: [SKL-0167, SKL-0165]
dependencies: []
synonyms: ["what is CI/CD", "how do GitHub Actions work", "why did my build fail", "what is a pipeline", "how to set up automated testing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/actions/starter-workflows"
difficulty: intermediate
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding CI/CD

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0169 |
| **Name** | Understanding CI/CD |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

CI/CD stands for Continuous Integration and Continuous Deployment. CI automatically runs tests and checks every time you push code. CD automatically deploys code that passes those checks. Together, they catch bugs early and ship code reliably without manual steps.

### The Two Parts

| Concept | What It Does | When It Runs |
|---------|-------------|--------------|
| **CI (Continuous Integration)** | Builds code, runs tests, checks formatting | On every push or pull request |
| **CD (Continuous Deployment)** | Deploys to staging or production | When code merges to main branch |

### GitHub Actions Workflow Structure

GitHub Actions is the most common CI/CD system for GitHub repositories. Workflows live in `.github/workflows/` as YAML files. The starter-workflows repository organizes templates into categories: **ci** (testing), **deployments**, **automation**, **code-scanning**, and **pages**.

A workflow has four levels of nesting:

```yaml
name: CI                          # Workflow name

on:                               # TRIGGER — when does this run?
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:                             # JOBS — what groups of work to do
  test:
    runs-on: ubuntu-latest        # which machine to use
    steps:                        # STEPS — individual commands in order
      - uses: actions/checkout@v4       # step 1: get the code
      - uses: actions/setup-node@v4     # step 2: install Node.js
        with:
          node-version: 20
      - run: npm install                # step 3: install dependencies
      - run: npm test                   # step 4: run tests
```

### Reading the Hierarchy

| Level | Purpose | Key Question |
|-------|---------|-------------|
| **Workflow** | The entire automation file | What is this automation for? |
| **Trigger (`on`)** | When the workflow runs | What event starts it? |
| **Job** | A group of steps that run on one machine | What is this job responsible for? |
| **Step** | A single command or action | What does this step do? |

Jobs run in parallel by default. Steps within a job run sequentially.

### Understanding Failures

When CI fails, look at:

1. **Which job failed** — the job name tells you the category (test, build, lint)
2. **Which step failed** — expand the failed step to see the error output
3. **The error message** — read it using the same skills from SKL-0164
4. **Whether it is your code or infrastructure** — network timeouts and rate limits are not your bug

### Common Workflow Categories

From the starter-workflows project, the standard categories map to development needs:

- **continuous-integration** — run tests and linters
- **deployment** — ship to hosting platforms
- **code-quality** — formatting, type checking
- **dependency-management** — automated dependency updates
- **monitoring** — health checks and alerts

## Key Takeaways

- CI runs tests automatically on every push; CD deploys code that passes
- Workflow files live in `.github/workflows/` and use YAML format
- The hierarchy is: workflow > trigger > job > step
- When CI fails, check which step failed and read the error output
- Start with a simple test workflow before adding deployment automation
