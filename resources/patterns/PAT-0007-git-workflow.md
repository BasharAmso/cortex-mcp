---
id: PAT-0007
name: Git Workflow
category: patterns
tags: [git, branching, commits, pull-request, code-review, version-control]
capabilities: [branch-strategy, commit-conventions, pr-workflow]
useWhen:
  - setting up a branching strategy for a project
  - establishing commit message conventions
  - designing a pull request and review workflow
  - onboarding contributors to a git workflow
estimatedTokens: 600
relatedFragments: [PAT-0010, PAT-0006]
dependencies: []
synonyms: ["how to use git branches", "what should my commit messages look like", "how to do pull requests", "best way to manage code with a team", "how to set up a git workflow"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Git Workflow

Branch strategy, commit conventions, and PR flow.

## Branch Strategy

### Trunk-Based (Recommended for small teams)

```
main (always deployable)
  └── feature/add-auth (short-lived, merged in 1-2 days)
  └── fix/login-error (short-lived, merged same day)
```

- `main` is always deployable. Protect it with CI checks.
- Feature branches live 1-2 days max. Longer branches create merge pain.
- Delete branches after merging.

### GitHub Flow (Recommended for open source)

Same as trunk-based, but with mandatory PR reviews before merge.

### Git Flow (Only for versioned releases)

Use only if you ship versioned releases (mobile apps, libraries). Adds `develop`, `release/*`, and `hotfix/*` branches. Overkill for web apps with continuous deployment.

## Commit Conventions

Use Conventional Commits for readable history:

```
feat: add user registration endpoint
fix: prevent duplicate email signups
docs: update API authentication guide
refactor: extract validation into shared module
test: add unit tests for payment service
chore: upgrade dependencies to latest
```

Rules:
- **Imperative mood:** "add feature" not "added feature"
- **Under 72 characters** for the subject line
- **Body for why**, not what (the diff shows what)

## Pull Request Flow

1. Create a branch from `main`
2. Make small, focused commits
3. Push and open a PR with a clear description
4. CI runs tests automatically
5. Reviewer approves or requests changes
6. Squash-merge into `main` and delete the branch

## Anti-Patterns

- Long-lived feature branches (merge conflicts accumulate)
- Committing directly to main without CI
- Giant PRs with 20+ files (break them up)
- Merge commits that obscure history (prefer squash-merge)
- Force-pushing to shared branches
