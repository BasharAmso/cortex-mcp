---
id: SKL-0043
name: Release Management
category: skills
tags: [release-management, semver, changelog, conventional-commits, versioning, git-tags, npm-publish, ci-cd, release-notes]
capabilities: [version-management, changelog-generation, release-automation]
useWhen:
  - preparing a new version release for a library or application
  - setting up automated changelog generation
  - choosing a versioning strategy for a project
  - automating the release process in CI/CD
  - writing release notes for stakeholders or users
estimatedTokens: 600
relatedFragments: [PAT-0007, PAT-0010, SKL-0042]
dependencies: []
synonyms: ["how to release a new version", "how to write a changelog", "semver versioning explained", "how to automate releases", "how to tag a release in git"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/conventional-changelog/conventionalcommits.org"
difficulty: intermediate
---

# Release Management

A structured process for versioning, changelog generation, and shipping releases. Built on the Conventional Commits specification for automated, predictable releases.

## Semantic Versioning (SemVer)

Every release gets a version number: `MAJOR.MINOR.PATCH`

| Bump | When | Example |
|------|------|---------|
| **MAJOR** (X.0.0) | Breaking changes that require consumer code changes | Renamed API, removed endpoint, changed data format |
| **MINOR** (0.X.0) | New features, backward-compatible | New endpoint, new optional parameter |
| **PATCH** (0.0.X) | Bug fixes, backward-compatible | Fixed calculation error, patched security issue |

**Pre-release:** `1.0.0-beta.1`, `2.0.0-rc.1`. Use for testing before stable release.

## Conventional Commits to SemVer Mapping

When using Conventional Commits (see PAT-0007), version bumps are deterministic:

| Commit Type | SemVer Bump |
|------------|-------------|
| `fix:` | PATCH |
| `feat:` | MINOR |
| `feat!:` or `BREAKING CHANGE:` footer | MAJOR |
| `docs:`, `chore:`, `refactor:`, `test:` | No bump (unless configured) |

This mapping enables fully automated releases.

## Release Process (Step by Step)

### Manual Release

1. **Ensure main is clean.** All tests pass, no pending PRs for this release.
2. **Determine version bump.** Review commits since last release. Use the highest applicable bump.
3. **Update CHANGELOG.md.** Group changes by type (Features, Fixes, Breaking Changes).
4. **Bump version** in `package.json` (or equivalent).
5. **Commit:** `chore(release): v1.2.0`
6. **Tag:** `git tag v1.2.0`
7. **Push:** `git push origin main --tags`
8. **Create GitHub Release** with changelog as the body.

### Automated Release (Recommended)

Use tools that automate steps 2-8 based on Conventional Commits:

| Tool | Approach |
|------|----------|
| **semantic-release** | Fully automated. Analyzes commits, bumps version, generates changelog, publishes to npm, creates GitHub release. |
| **changesets** | PR-based. Authors declare changesets per PR. Bot creates a "Version Packages" PR when ready. |
| **release-please** | Google's tool. Creates a release PR with changelog, you merge to publish. |
| **standard-version** | Local CLI tool. Bumps version and updates CHANGELOG. You push manually. |

## Changelog Format

```markdown
# Changelog

## [1.2.0] - 2026-03-29

### Features
- Add OAuth2 login with Google (#47)
- Support dark mode in settings page (#52)

### Fixes
- Prevent duplicate email signups on race condition (#49)
- Fix timezone display in activity feed (#51)

### Breaking Changes
- Rename `User.name` to `User.displayName` (#48)
```

## Release Checklist

- [ ] All tests pass on `main`
- [ ] CHANGELOG.md updated with all changes since last release
- [ ] Version bumped according to SemVer rules
- [ ] Git tag matches the version in package.json
- [ ] GitHub Release created with release notes
- [ ] npm/PyPI/registry publish succeeded (if applicable)
- [ ] Deployment triggered for the new version
- [ ] Stakeholders notified (Slack, email, release notes)

## Anti-Patterns

- Releasing without a tag (impossible to rollback to specific version)
- Manual changelog that drifts from actual commits
- Bumping MAJOR for non-breaking changes (version number inflation)
- Skipping pre-release for major versions (surprises consumers)
- Not automating the release process (humans forget steps)
