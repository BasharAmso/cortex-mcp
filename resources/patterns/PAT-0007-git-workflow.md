---
id: PAT-0007
name: Git Workflow
category: patterns
tags: [git, branching, conventional-commits, pull-request, code-review, version-control, semver, changelog, trunk-based]
capabilities: [branch-strategy, commit-conventions, pr-workflow]
useWhen:
  - setting up a branching strategy for a project
  - establishing commit message conventions
  - designing a pull request and review workflow
  - onboarding contributors to a git workflow
  - automating changelogs and version bumps
estimatedTokens: 650
relatedFragments: [PAT-0010, PAT-0006, SKL-0044]
dependencies: []
synonyms: ["how to use git branches", "what should my commit messages look like", "how to do pull requests", "best way to manage code with a team", "how to set up a git workflow"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/conventional-changelog/conventionalcommits.org"
difficulty: beginner
owner: builder
---

# Git Workflow

Branch strategy, Conventional Commits, and PR flow for teams of any size.

## Branch Strategy

### Trunk-Based Development (Recommended)

```
main (always deployable, protected by CI)
  +-- feature/add-auth    (1-2 days max, then merge)
  +-- fix/login-error      (same day, then merge)
```

- `main` is always deployable. Protect with required CI checks and PR reviews.
- Feature branches live 1-2 days maximum. Longer branches create merge pain.
- Delete branches immediately after merging.
- Rebase before opening a PR to keep history linear.

### GitHub Flow (Open Source)

Same as trunk-based, but with mandatory PR review from a maintainer before merge.

### Git Flow (Versioned Releases Only)

Use only for products with versioned releases (mobile apps, libraries, SDKs). Adds `develop`, `release/*`, and `hotfix/*` branches. Overkill for web apps with continuous deployment.

## Conventional Commits Specification

Structured commit messages that enable automated changelogs, semver bumps, and readable history. Format per conventionalcommits.org:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When | Semver Impact |
|------|------|---------------|
| `feat` | New user-facing feature | MINOR bump |
| `fix` | Bug fix | PATCH bump |
| `docs` | Documentation only | None |
| `refactor` | Code change that neither fixes a bug nor adds a feature | None |
| `test` | Adding or updating tests | None |
| `chore` | Build, CI, dependency updates | None |
| `perf` | Performance improvement | PATCH bump |
| `BREAKING CHANGE` | Footer or `!` after type | MAJOR bump |

### Examples

```
feat(auth): add OAuth2 login with Google
fix: prevent duplicate email signups on race condition
docs: update API authentication guide
refactor!: rename User.name to User.displayName

BREAKING CHANGE: User.name field removed. Use User.displayName instead.
```

### Rules

- **Imperative mood:** "add feature" not "added feature"
- **Under 72 characters** for the subject line
- **Body explains why**, not what (the diff shows what)
- **Footer for breaking changes** and issue references (`Closes #42`)

## Pull Request Flow

1. Branch from `main`, name with `feature/`, `fix/`, or `chore/` prefix
2. Make small, focused commits following Conventional Commits
3. Rebase on latest `main`, resolve conflicts locally
4. Push and open a PR with a clear description and linked issue
5. CI runs lint + test + build automatically
6. Reviewer approves or requests changes
7. Squash-merge into `main`, delete the branch

## Anti-Patterns

- Long-lived feature branches (merge conflicts accumulate)
- Committing directly to main without CI
- Giant PRs with 20+ changed files (break them up)
- Non-descriptive commit messages ("fix stuff", "WIP", "asdf")
- Force-pushing to shared branches without `--force-with-lease`
