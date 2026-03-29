---
id: SKL-0019
name: Documentation
category: skills
tags: [documentation, readme, api-docs, changelog, onboarding]
capabilities: [readme-creation, api-documentation, changelog-writing, setup-guides]
useWhen:
  - writing or updating a project README
  - documenting APIs with request/response examples
  - creating setup guides or onboarding documentation
  - updating changelogs after shipping a feature
estimatedTokens: 600
relatedFragments: [SKL-0001, SKL-0015]
dependencies: []
---

# Documentation

Make the project understandable to any developer who picks it up cold. Documentation is a first-class deliverable.

## Procedure

### 1. Identify What Needs Documenting

Check recently completed tasks and architectural decisions. Determine the type: new README, feature update, API reference, setup guide, or changelog.

### 2. Identify the Audience

| Audience | Style |
|----------|-------|
| Solo developer | Terse, focus on "why" not "what" |
| External developer / open source | Zero context assumed, cover prerequisites, setup, examples, common errors |
| Non-technical stakeholder | Plain language, no code blocks, focus on what it does |
| AI coding assistant | Structured, precise, explicit file paths, exact commands |

### 3. README Structure

When creating from scratch:

1. Project name + one-sentence description
2. What it does (2-4 sentences, no jargon)
3. Quick start (minimum steps, every command tested)
4. Configuration table (variable, required, description, example)
5. Project structure (directory tree with descriptions)
6. API reference (link or inline)
7. Contributing guide
8. License

### 4. API Documentation Format

For every public endpoint or function:

- Method + path
- One-sentence description
- Auth required (yes/no)
- Request body with types
- Success response with example
- Error responses table
- curl example

### 5. Quality Checks

- Every setup command is exact and tested
- No placeholder text left unfilled
- All code examples are syntactically correct
- File paths match actual project structure
- Quick start gets user to working state in under 5 minutes

## Key Rules

- Never document features that do not exist yet
- Never leave placeholder text in delivered documentation
- Always write setup instructions as if the reader has never seen the project
