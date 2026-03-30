---
id: SKL-0019
name: Documentation
category: skills
tags: [documentation, readme, api-docs, changelog, onboarding, developer-experience, open-source]
capabilities: [readme-creation, api-documentation, changelog-writing, setup-guides, contributor-docs]
useWhen:
  - writing or updating a project README
  - documenting APIs with request/response examples
  - creating setup guides or onboarding documentation
  - updating changelogs after shipping a feature
  - writing contributor guides for open-source projects
estimatedTokens: 600
relatedFragments: [SKL-0001, SKL-0015]
dependencies: []
synonyms: ["write a README", "document my API", "create setup instructions", "how do I explain this project", "update the changelog"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/matiassingers/awesome-readme"
difficulty: beginner
---

# Documentation

Make the project understandable to any developer who picks it up cold. Documentation is a first-class deliverable. Grounded in patterns from the best open-source READMEs.

## Elements of an Excellent README

Studied from top-rated open-source projects, the best READMEs share these elements:

| Element | Purpose | Priority |
|---------|---------|----------|
| Project logo/banner | Instant visual identity | Optional but impactful |
| One-line description | What it does in plain language | Required |
| Badges | Build status, version, license at a glance | Recommended |
| Screenshot or GIF | Show, don't tell | Highly recommended |
| Quick start | Minimum steps to working state | Required |
| Table of contents | Navigation for longer docs | Required if 4+ sections |
| Configuration table | Variables, defaults, descriptions | Required if configurable |
| API reference | Endpoints, methods, examples | Required for libraries/APIs |
| Contributing guide | How to contribute, code style, PR process | Required for open source |
| License | Legal clarity | Required |

## Procedure

### 1. Identify Audience

| Audience | Style |
|----------|-------|
| Solo developer | Terse, focus on "why" not "what" |
| External developer / open source | Zero context assumed, prerequisites, setup, examples, common errors |
| Non-technical stakeholder | Plain language, no code blocks, focus on outcomes |
| AI coding assistant | Structured, precise, explicit file paths, exact commands |

### 2. README Structure (New Projects)

1. Project name + one-sentence description
2. Screenshot or demo GIF (show the product working)
3. What it does (2-4 sentences, no jargon)
4. Quick start (minimum steps, every command copy-pasteable and tested)
5. Configuration table (variable, required, default, description)
6. Project structure (directory tree with one-line descriptions)
7. API reference (link or inline with curl examples)
8. Contributing guide
9. License

### 3. API Documentation Format

For every public endpoint or function:

- Method + path (e.g., `POST /api/users`)
- One-sentence description
- Auth required (yes/no)
- Request body with types
- Success response with example JSON
- Error responses table (status code, condition, response body)
- Copy-pasteable curl example

### 4. Quality Checks

- Every setup command is exact, copy-pasteable, and tested
- No placeholder text left unfilled
- All code examples are syntactically correct and runnable
- File paths match actual project structure
- Quick start gets user to working state in under 5 minutes
- Screenshots reflect current UI, not outdated versions

## Key Rules

- Never document features that do not exist yet
- Never leave placeholder text in delivered documentation
- Always write setup instructions as if the reader has never seen the project
- Show, don't tell: screenshots and examples beat paragraphs of explanation
- TOC is mandatory for any document exceeding 4 sections
