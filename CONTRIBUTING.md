# Contributing to Cortex MCP

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/BasharAmso/cortex-mcp.git
cd cortex-mcp
npm install
npm run build
npm run build-index
npm test
```

## Making Changes

1. Fork the repo and create a branch from `master`
2. Make your changes
3. Run `npm run typecheck && npm test && npm run build` to verify
4. Push and open a pull request

## Submitting Fragments

Cortex MCP's value comes from its knowledge library. New fragment contributions are welcome.

**Quality bar for fragments:**

- 5+ tags (for search matching)
- 3+ synonyms (for natural language discovery)
- 1+ useWhen scenario
- `sourceUrl` pointing to the research source (internal only, not exposed to users)
- `estimatedTokens` set accurately

See [docs/FRAGMENT-AUTHORING-GUIDE.md](docs/FRAGMENT-AUTHORING-GUIDE.md) for the full authoring guide with before/after examples.

### Fragment ID Ranges

| Category | Prefix | Example |
|----------|--------|---------|
| Agents | AGT- | AGT-0001 |
| Skills | SKL- | SKL-0001 |
| Patterns | PAT- | PAT-0001 |
| Examples | EX- | EX-0001 |

Use the next available ID in the appropriate range. Check existing files to avoid collisions.

## Code Style

- TypeScript with strict mode
- No runtime dependencies beyond `@modelcontextprotocol/sdk`, `yaml`, and `fuse.js`
- Tests with Vitest

## Reporting Issues

Open an issue on GitHub. Include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your Node.js version and MCP client (Claude Code, Cursor, etc.)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
