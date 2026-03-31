---
id: SKL-0337
name: Infrastructure as Code
category: skills
tags: [infrastructure-as-code, terraform, declarative, state-management, modules, providers]
capabilities: [iac-design, state-management, module-composition, provider-configuration]
useWhen:
  - provisioning cloud infrastructure reproducibly
  - managing infrastructure state across environments
  - creating reusable infrastructure modules
  - migrating from manual infrastructure to code-defined infrastructure
  - choosing between Terraform, Pulumi, and CloudFormation
estimatedTokens: 660
relatedFragments: [SKL-0338, SKL-0339, SKL-0336]
dependencies: []
synonyms: ["how to use Terraform", "infrastructure as code for beginners", "declarative vs imperative infrastructure", "Terraform state management", "how to structure Terraform modules", "IaC best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/hashicorp/terraform"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Infrastructure as Code

Infrastructure as Code (IaC) defines servers, networks, databases, and other infrastructure in version-controlled configuration files instead of manual console clicks. The infrastructure is reproducible, reviewable, and auditable.

## Declarative vs Imperative

**Declarative (Terraform, CloudFormation):** You describe the desired end state. The tool calculates the changes needed to reach it. Easier to reason about — you read the configuration and know what exists.

**Imperative (Pulumi, CDK, scripts):** You write step-by-step instructions to create resources. More flexible for complex logic but harder to understand the current state from the code alone.

Terraform is the most widely adopted tool for multi-cloud infrastructure. Its HCL syntax is purpose-built for infrastructure and reads clearly.

## State Management

Terraform tracks what infrastructure it manages in a **state file**. This file maps configuration to real-world resources.

**Remote state** stores the state file in a shared backend (S3, GCS, Terraform Cloud). This enables team collaboration and prevents conflicts from local state files.

**State locking** prevents two people from applying changes simultaneously. Use a backend that supports locking (S3 + DynamoDB, Terraform Cloud).

**Never edit state manually.** Use `terraform state` commands (mv, rm, import) to modify state safely. Corrupted state can cause Terraform to create duplicate resources or lose track of existing ones.

## Module Design

Modules are reusable packages of Terraform configuration.

**Root module:** The main configuration directory. Calls child modules and defines environment-specific values.

**Child modules:** Encapsulate a logical group of resources (e.g., a VPC module, an ECS cluster module, a database module).

Good module design:
- Accept inputs via variables, expose outputs for other modules to consume
- Keep modules focused on one concern (network, compute, database)
- Pin module versions to prevent unexpected changes
- Document required variables and their purpose

## Environment Management

Use the same modules across environments (dev, staging, production) with different variable values.

**Workspaces** provide environment isolation within one configuration. Simple for small teams but can cause confusion about which workspace is active.

**Directory-per-environment** uses separate directories (`environments/dev/`, `environments/prod/`) each calling the same modules with different variables. More explicit and safer for production.

## Plan Before Apply

Always run `terraform plan` before `terraform apply`. The plan shows exactly what will be created, modified, or destroyed. Review it carefully — a misconfigured change can delete a production database.

In CI/CD, run `plan` on pull requests and `apply` only after merge and approval. Store plan output as an artifact for audit trails.

## Key Practices

- **Version pin everything:** Provider versions, module versions, and Terraform itself. Unpinned versions cause non-deterministic builds.
- **Use data sources** to reference existing resources instead of hardcoding IDs.
- **Tag all resources** with environment, team, and project for cost tracking and ownership.
- **Import existing resources** into Terraform gradually rather than recreating them. Use `terraform import` to bring manually-created resources under management.
- **Keep blast radius small.** Split infrastructure into multiple state files (networking, compute, data) so a mistake in one area does not affect others.
