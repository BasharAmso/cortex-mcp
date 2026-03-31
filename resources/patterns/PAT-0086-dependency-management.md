---
id: PAT-0086
name: Dependency Management
category: patterns
tags: [dependencies, packages, npm, versioning, lock-files, supply-chain]
capabilities: [dependency-evaluation, version-management, lock-file-understanding, package-auditing]
useWhen:
  - adding a new library or package to a project
  - understanding what a lock file does and why it matters
  - troubleshooting version conflicts between packages
  - evaluating whether a dependency is safe and maintained
  - understanding semantic versioning and what version numbers mean
estimatedTokens: 660
relatedFragments: [SKL-0161, PAT-0085, SKL-0162]
dependencies: []
synonyms: ["what is a package manager", "how do npm dependencies work", "what is a lock file", "how to manage project dependencies", "what does semver mean", "how to evaluate if a library is safe to use"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/npm/cli"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Dependency Management

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0086 |
| **Name** | Dependency Management |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

npm is the default package manager for Node.js, serving as the gateway to over two million packages on the public registry. Understanding how dependencies work is essential for reading, building, and maintaining any modern project.

### package.json: The Manifest

Every Node.js project has a `package.json` that declares:

- **dependencies** - Packages needed to run the application in production
- **devDependencies** - Packages needed only during development (testing, linting, building)
- **scripts** - Named commands you can run with `npm run <name>`
- **engines** - Which Node.js versions the project supports

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

### Semantic Versioning (semver)

Version numbers follow the format `MAJOR.MINOR.PATCH`:

| Change | Meaning | Example |
|--------|---------|---------|
| MAJOR | Breaking changes, incompatible API | 3.0.0 to 4.0.0 |
| MINOR | New features, backward compatible | 4.1.0 to 4.2.0 |
| PATCH | Bug fixes, no new features | 4.2.1 to 4.2.2 |

The `^` prefix (e.g., `^4.18.2`) means "compatible with": it allows MINOR and PATCH updates but not MAJOR. The `~` prefix allows only PATCH updates.

### Lock Files: Why They Matter

`package-lock.json` (npm) or `yarn.lock` (Yarn) records the exact version of every package installed, including nested dependencies. Without a lock file:

- Two developers running `npm install` might get different versions
- A passing build today could fail tomorrow because a dependency updated

**Always commit lock files to version control.** They ensure everyone gets identical dependencies.

### The Dependency Tree

Dependencies have their own dependencies. A project with 10 direct dependencies might have 500+ total packages in `node_modules/`. This is normal but requires awareness:

- Run `npm ls` to see the full dependency tree
- Run `npm ls --depth=0` to see only your direct dependencies
- Run `npm audit` to check for known security vulnerabilities

### Evaluating a New Dependency

Before adding a package, check:

1. **Maintenance** - When was the last commit? Are issues being addressed?
2. **Downloads** - Weekly download count indicates community adoption
3. **Size** - Run `npx bundlephobia <package>` to check bundle size impact
4. **Dependencies** - Does it pull in many transitive dependencies?
5. **License** - Is the license compatible with your project?
6. **Alternatives** - Could you write this yourself in under 50 lines?

### Common Commands

```bash
npm install <package>        # Add to dependencies
npm install -D <package>     # Add to devDependencies
npm update                   # Update within semver ranges
npm audit                    # Check for vulnerabilities
npm audit fix                # Auto-fix known vulnerabilities
npm outdated                 # Show packages with newer versions
```

## Key Takeaways

- `package.json` declares what you need; the lock file records exact versions installed
- Always commit lock files so every developer and CI gets identical dependencies
- Semver uses MAJOR.MINOR.PATCH; the `^` prefix allows non-breaking updates
- Run `npm audit` regularly to catch known vulnerabilities
- Evaluate maintenance, size, and alternatives before adding any new dependency
