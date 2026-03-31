---
id: SKL-0165
name: Understanding Git History
category: skills
tags: [git, version-control, git-log, git-blame, git-bisect, code-history]
capabilities: [history-navigation, change-tracking, authorship-identification, regression-finding]
useWhen:
  - trying to understand why a piece of code was written a certain way
  - finding out who changed a specific line and when
  - tracking down when a bug was introduced
  - reviewing what changed between two versions
  - understanding the evolution of a file or feature
estimatedTokens: 650
relatedFragments: [PAT-0088, SKL-0169]
dependencies: []
synonyms: ["how to see who changed this code", "how to find when a bug was introduced", "how to use git log", "what is git blame", "how to see file history in git"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/git/git"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Git History

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0165 |
| **Name** | Understanding Git History |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Git is described as "a fast, scalable, distributed revision control system with an unusually rich command set." For reading code, the most valuable part of Git is not making commits, it is reading history. Four commands give you investigative superpowers.

### git log — See What Happened

`git log` shows the timeline of changes. Start with these useful variations:

```bash
git log --oneline              # compact one-line-per-commit view
git log --oneline --graph      # visual branch structure
git log -5                     # last 5 commits only
git log -- path/to/file.js    # history for one specific file
git log --author="name"        # commits by a specific person
git log --since="2 weeks ago"  # recent changes only
```

Read commit messages to understand intent. Good messages explain *why* a change was made, not just *what* changed.

### git blame — See Who Wrote Each Line

`git blame path/to/file.js` shows who last modified each line, when, and in which commit. This is not about assigning fault. It answers: "What was the context when this line was written?"

```bash
git blame src/app.js           # annotate every line
git blame -L 10,20 src/app.js  # only lines 10-20
```

Use blame to find the commit, then use `git show <commit-hash>` to read the full change with its message.

### git diff — See What Changed

`git diff` compares versions of files. Lines prefixed with `+` were added; lines with `-` were removed.

```bash
git diff                       # unstaged changes vs last commit
git diff --staged              # staged changes about to be committed
git diff main..feature-branch  # differences between two branches
git diff HEAD~3..HEAD          # last 3 commits of changes
```

### git bisect — Find When a Bug Was Introduced

When something used to work and now doesn't, `git bisect` performs a binary search through history to find the exact commit that broke it:

1. `git bisect start`
2. `git bisect bad` (current version is broken)
3. `git bisect good <old-commit>` (this version worked)
4. Git checks out a middle commit. Test it, then mark `good` or `bad`.
5. Repeat until Git identifies the exact breaking commit.

This turns a haystack search into 7-8 steps even across thousands of commits.

## Key Takeaways

- `git log` with `--oneline` and `-- filename` are your most-used history commands
- `git blame` reveals the story behind each line of code
- `git diff` with `+` and `-` prefixes shows exactly what changed between any two points
- `git bisect` finds the exact commit that introduced a bug through binary search
- Reading history is often faster than reading documentation for understanding code decisions
