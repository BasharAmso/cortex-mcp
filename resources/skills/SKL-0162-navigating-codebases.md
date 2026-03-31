---
id: SKL-0162
name: Navigating Codebases
category: skills
tags: [codebase-navigation, project-structure, search, exploration, orientation, tooling]
capabilities: [codebase-orientation, file-discovery, dependency-tracing, search-techniques]
useWhen:
  - joining a new project and need to find where things live
  - trying to find the code responsible for a specific feature
  - tracing how data flows through a large application
  - understanding a project's folder structure and conventions
  - finding all the places a function or variable is used
estimatedTokens: 640
relatedFragments: [SKL-0157, SKL-0160, PAT-0085]
dependencies: []
synonyms: ["how to find code in a large project", "how to explore a new codebase", "where to start in a big codebase", "how to trace code execution", "how to find where a function is defined", "how to understand project structure"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/kamranahmedse/developer-roadmap"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Navigating Codebases

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0162 |
| **Name** | Navigating Codebases |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Large codebases can have thousands of files. Navigating them is not about reading everything; it is about knowing how to find the right file quickly. The developer roadmap treats codebase navigation as a prerequisite skill across all engineering roles.

### Orientation: First Five Minutes

When you open a new project, check these files first:

1. **README.md** - Project purpose, setup instructions, architecture overview
2. **package.json / Cargo.toml / pyproject.toml** - Dependencies, scripts, entry points
3. **Folder structure** - Run `ls` or `tree` at the root level. Common patterns:
   - `src/` - Source code
   - `tests/` or `__tests__/` - Test files
   - `docs/` - Documentation
   - `config/` or root config files - Configuration
4. **Entry point** - Find `main.ts`, `index.js`, `app.py`, or whatever starts the application

### Search Techniques

- **Global text search** - Use `grep -r`, `rg` (ripgrep), or your IDE's search to find strings, function names, or error messages across the entire codebase.
- **Go to definition** - In any modern IDE, Ctrl+Click (or Cmd+Click) on a function or variable to jump to where it is defined.
- **Find all references** - Right-click a function and select "Find All References" to see every place it is called. This reveals how widely a change will ripple.
- **File name search** - Use Ctrl+P (VS Code) or equivalent to search by file name. Faster than browsing folders.
- **Git log for a file** - Run `git log --oneline path/to/file` to see the history of changes to a specific file.

### Tracing Execution Flow

When you need to understand how a feature works:

1. **Start from the user action.** If it is a button click, find the click handler. If it is an API call, find the route definition.
2. **Follow the function calls.** Use "Go to Definition" to trace each function call to its implementation.
3. **Note the data transformations.** Track what shape the data is in at each step. This is where most bugs hide.
4. **Watch for side effects.** Database writes, API calls, event emissions, and state mutations are where behavior diverges from what you expect.

### Useful Commands

```bash
# Find files by name pattern
find . -name "*.ts" | grep -i user

# Search for a string across the codebase
rg "handleSubmit" --type ts

# See recent changes to a file
git log --oneline -10 src/auth/login.ts

# See who last changed each line
git blame src/auth/login.ts
```

## Key Takeaways

- Check README, package manifest, folder structure, and entry point in your first five minutes
- Use global search and "Go to Definition" instead of manually browsing folders
- Trace execution from user action through function calls to data layer
- Use `git log` and `git blame` to understand the history and intent behind code
- "Find All References" reveals the blast radius of any change
