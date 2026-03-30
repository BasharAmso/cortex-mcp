# Project Charter

## Project Name

Cortex MCP

## Vision

Framework-agnostic MCP server that serves structured knowledge on-demand to any MCP-compatible coding tool.

## Goals

1. Achieve 90%+ token reduction compared to loading all files into context
2. Work with any MCP-compatible client from day one
3. Work out of the box with Bashi
4. Accept any directory of structured markdown with zero configuration
5. Publish as open source on GitHub and npm

## Target Users

- Claude Code, Cursor, Windsurf, and VS Code users with markdown-based knowledge systems
- Bashi users
- Framework authors who want MCP-based knowledge delivery

## Constraints

- **Time:** Solo developer, no deadline — ship when ready
- **Budget:** Zero cost. All tools and hosting are free (Node.js, npm, GitHub)
- **Technical:** MCP server development is new territory. orchestr8 and MCP spec are primary references
- **Knowledge:** TypeScript/Node.js is comfortable. MCP protocol is the learning curve

## Success Criteria

- Token usage drops 90%+ compared to loading framework files from disk
- Query latency under 15ms for index lookups, under 20ms for fuzzy matching
- Works with Claude Code, Cursor, and Windsurf without tool-specific code
- Bashi agents and skills are queryable on first install
- Published on GitHub with MIT license
- Published on npm as installable package

## Non-Goals

- No cloud services, no paid dependencies
- No file modification — read-only server
- No task execution or event processing
- No coupling to a single tool or framework

## Risks

- MCP protocol may evolve and introduce breaking changes
- Matching quality depends on frontmatter quality in source markdown
- Solo developer bandwidth limits iteration speed
- Competing tools may emerge in this space
