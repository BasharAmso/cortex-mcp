---
id: PAT-0088
name: Version Control Workflow
category: patterns
tags: [git, version-control, branching, commit-messages, pull-requests, conventional-commits]
capabilities: [branch-strategy, commit-conventions, pr-workflow, collaboration-patterns]
useWhen:
  - setting up a git workflow for a new project
  - writing commit messages that follow a convention
  - deciding on a branching strategy for a team
  - creating or reviewing pull requests
  - understanding how commits map to releases and changelogs
estimatedTokens: 650
relatedFragments: [SKL-0165, SKL-0169]
dependencies: []
synonyms: ["how to write good commit messages", "what is a branching strategy", "how to use pull requests", "what are conventional commits", "how to organize git branches"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/conventional-changelog/conventionalcommits.org"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Version Control Workflow

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0088 |
| **Name** | Version Control Workflow |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

A version control workflow defines how a team uses git to collaborate without stepping on each other's changes. Three practices make this work: a branching strategy, commit message conventions, and a pull request process.

### Conventional Commits

The Conventional Commits specification provides a structured format for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Required types:**

| Type | When to Use | SemVer Impact |
|------|------------|---------------|
| `feat` | Adding new functionality | MINOR bump |
| `fix` | Fixing a bug | PATCH bump |

**Common optional types:** `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `build`

**Examples:**

```
feat(auth): add password reset flow

fix: prevent crash when user profile is null

docs: update API endpoint documentation

feat(api)!: change response format for /users endpoint

BREAKING CHANGE: response now returns array instead of object
```

The `!` after the type (or a `BREAKING CHANGE` footer) signals a breaking change that maps to a MAJOR version bump.

### Branching Strategy

For most projects, a simple branching model works:

```
main (production-ready code)
  └── feature/add-login       (your work in progress)
  └── feature/update-dashboard (teammate's work)
  └── fix/null-pointer-crash   (bug fix branch)
```

**Rules:**
1. `main` always contains working, deployable code
2. Create a new branch for each feature or fix
3. Name branches descriptively: `feature/`, `fix/`, `docs/`, `chore/`
4. Merge back to main only through pull requests
5. Delete branches after merging

### Pull Request Workflow

A pull request (PR) is a proposal to merge your branch into main. It enables review before changes reach production.

**Creating a good PR:**

1. **Title** — short, descriptive, follows conventional commit style
2. **Description** — what changed and why (not how, the diff shows that)
3. **Size** — keep PRs small (under 400 lines changed). Large PRs get rubber-stamped.
4. **Tests** — CI should pass before requesting review

**Reviewing a PR:**

1. Read the description to understand intent
2. Check the diff for correctness, not style preferences
3. Look for missing error handling and edge cases
4. Comment with suggestions, not demands
5. Approve or request changes with specific reasoning

### Mapping Commits to Releases

Conventional commits enable automated tooling:

- **Changelogs** — `feat` commits become "Features" sections, `fix` becomes "Bug Fixes"
- **Version bumps** — tools like semantic-release calculate the next version from commit types
- **Breaking changes** — `BREAKING CHANGE` footers trigger major version bumps

This creates a direct line from individual commits to published releases.

## Key Takeaways

- Use conventional commit format: `type(scope): description`
- `feat` = new feature (minor bump), `fix` = bug fix (patch bump), `!` = breaking change (major bump)
- Branch per feature, merge via pull request, delete after merge
- Keep PRs small and descriptive for meaningful code review
- Structured commits enable automated changelogs and versioning
