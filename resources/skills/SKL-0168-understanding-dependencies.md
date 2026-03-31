---
id: SKL-0168
name: Understanding Dependencies
category: skills
tags: [dependencies, npm, package-json, node-modules, semver, package-managers]
capabilities: [dependency-reading, version-understanding, package-management, lockfile-comprehension]
useWhen:
  - opening a project and seeing package.json for the first time
  - trying to understand what node_modules contains
  - encountering version conflicts or dependency errors
  - deciding whether to add a new dependency
  - understanding what semantic versioning numbers mean
estimatedTokens: 650
relatedFragments: [SKL-0169, SKL-0166]
dependencies: []
synonyms: ["what is package.json", "what is node_modules", "what does npm install do", "how does semantic versioning work", "what is a dependency"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/npm/cli"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Dependencies

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0168 |
| **Name** | Understanding Dependencies |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Modern software is built on top of other people's code. Instead of writing everything from scratch, you install packages (libraries) that solve common problems. A dependency is a package your project needs to work. Understanding how dependencies are declared, installed, and versioned is fundamental to working with any JavaScript or TypeScript project.

### package.json — The Manifest

Every Node.js project has a `package.json` file at its root. It declares:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "prisma": "^5.10.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "typescript": "^5.3.0"
  }
}
```

- **dependencies** — packages needed to run the app in production
- **devDependencies** — packages needed only during development (testing tools, compilers)

### Semantic Versioning (SemVer)

Version numbers follow the format `MAJOR.MINOR.PATCH`:

| Part | When It Changes | Example |
|------|----------------|---------|
| **MAJOR** (4.x.x) | Breaking changes that may require you to update your code | `3.0.0` to `4.0.0` |
| **MINOR** (x.18.x) | New features added, backwards compatible | `4.17.0` to `4.18.0` |
| **PATCH** (x.x.2) | Bug fixes only, backwards compatible | `4.18.1` to `4.18.2` |

The `^` prefix in `"^4.18.2"` means "compatible with 4.18.2" and allows automatic updates to newer minor and patch versions, but not to version 5.

### node_modules — Where Packages Live

When you run `npm install`, npm reads `package.json`, downloads every declared package (and their dependencies), and puts them in the `node_modules/` folder. This folder is often large and should never be committed to git (it is listed in `.gitignore`).

### The Lock File

`package-lock.json` records the exact version of every package installed, including nested dependencies. This ensures everyone on the team gets identical versions. Always commit the lock file to git.

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `package.json` | Declares what you need | Yes |
| `package-lock.json` | Records exact versions installed | Yes |
| `node_modules/` | Contains the actual package code | No |

### Common Commands

```bash
npm install              # install all dependencies from package.json
npm install express      # add a new dependency
npm install -D jest      # add a dev dependency
npm update               # update packages within semver ranges
npm outdated             # check for newer versions available
npm audit                # check for known security vulnerabilities
```

### When to Add a Dependency

Before adding a package, ask: Is this solving a genuinely hard problem, or could I write this in 20 lines myself? Every dependency adds risk (security vulnerabilities, maintenance burden, supply chain trust). Prefer well-maintained packages with active communities.

## Key Takeaways

- `package.json` is the manifest declaring what your project needs
- Semantic versioning uses MAJOR.MINOR.PATCH to communicate the type of change
- `node_modules/` is auto-generated and should never be committed to git
- Always commit `package-lock.json` so the whole team gets identical versions
- Every dependency is a trust decision: evaluate maintenance, security, and necessity
