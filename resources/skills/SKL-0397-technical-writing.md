---
id: SKL-0397
name: Technical Writing
category: skills
tags: [technical-writing, documentation, tutorials, blog-posts, clarity, developer-docs]
capabilities: [documentation-writing, tutorial-creation, api-documentation, technical-blog-posts]
useWhen:
  - writing clear documentation for a technical project
  - creating tutorials or how-to guides for developers
  - writing technical blog posts to share knowledge
  - improving existing documentation for clarity and accuracy
  - documenting APIs, libraries, or developer tools
estimatedTokens: 650
relatedFragments: [SKL-0401, PAT-0206, SKL-0398, PAT-0205]
dependencies: []
synonyms: ["how to write good documentation", "technical blog post tips", "write a tutorial for developers", "improve my docs", "API documentation best practices", "write clearly about technical topics"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/google/styleguide"
difficulty: beginner
owner: "cortex"
pillar: "developer-growth"
---

# Skill: Technical Writing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0397 |
| **Name** | Technical Writing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Technical writing translates complex knowledge into clear, usable text. The measure of quality is not elegance but whether the reader can accomplish their goal after reading.

### Google's Technical Writing Principles

The Google developer documentation style guide establishes principles adopted across the industry:

1. **Use active voice.** "The server sends a response" not "A response is sent by the server." Active voice identifies who does what.
2. **Address the reader directly.** Use "you" not "the developer" or "one." Write instructions as direct commands: "Install the package" not "The package should be installed."
3. **One idea per sentence.** Long compound sentences with multiple clauses force readers to re-read. Split them.
4. **Define jargon on first use.** If you must use a technical term, define it inline or link to a glossary. Never assume the reader shares your vocabulary.
5. **Use consistent terminology.** Pick one term for each concept and use it everywhere. "Server," "backend," and "API host" referring to the same thing confuses readers.

### Document Types and Their Structure

| Type | Audience | Structure | Goal |
|------|----------|-----------|------|
| **Tutorial** | Beginner | Step-by-step with expected output | Reader builds something working |
| **How-to guide** | Intermediate | Problem statement → solution steps | Reader solves a specific problem |
| **Reference** | Any level | Alphabetical/categorical, complete | Reader looks up a specific detail |
| **Explanation** | Curious | Narrative, contextual, connecting ideas | Reader understands why and how |

These four types (from Diataxis framework) serve different needs. Most projects need all four, not just one.

### Writing Effective Tutorials

Tutorials are the hardest to write well because the reader has zero context:
1. **State prerequisites explicitly.** "This tutorial assumes Node.js 18+ installed" saves hours of debugging.
2. **Show every step.** Never write "set up your database" without showing the exact commands.
3. **Include expected output.** After each step, show what the reader should see. This confirms they are on track.
4. **Use copy-pasteable code blocks.** No screenshots of code. No line numbers in code blocks (they break copy-paste). No smart quotes.
5. **Test from scratch.** Follow your own tutorial on a clean machine. Every gap becomes obvious.

### API Documentation Essentials

Every API endpoint needs:
- **URL pattern and method**: `GET /api/users/:id`
- **Parameters**: Name, type, required/optional, description, example value
- **Request body**: Schema with example JSON
- **Response**: Status codes with example response bodies for success and error cases
- **Authentication**: What credentials are needed and how to provide them

### Editing Checklist

Before publishing any technical document:
- [ ] Can a reader complete the task using only this document?
- [ ] Are all code examples tested and working?
- [ ] Is every acronym expanded on first use?
- [ ] Are prerequisites stated upfront?
- [ ] Does each heading accurately describe its section content?

## Key Takeaways

- Write for the reader's goal, not your knowledge: the test is whether they can succeed after reading
- Use active voice, direct address, and one idea per sentence
- Match document type to reader need: tutorials for learning, how-tos for solving, reference for looking up
- Test tutorials from scratch on a clean environment before publishing
- Define jargon on first use and maintain consistent terminology throughout
