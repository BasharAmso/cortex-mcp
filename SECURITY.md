# Security Policy

## Reporting a Vulnerability

**Do not open a public issue.** Use GitHub's private vulnerability reporting:

1. Go to the [Security tab](https://github.com/BasharAmso/cortex-mcp/security) of this repository
2. Click **"Report a vulnerability"**
3. Describe the issue with steps to reproduce

You'll get a private advisory thread where we can coordinate a fix before public disclosure.

## Response Timeline

- **Acknowledge:** Within 48 hours
- **Fix timeline:** Within 7 days of confirmation
- **Disclosure:** Coordinated — we'll agree on a public disclosure date together

## Security Model

Cortex MCP is a **read-only, local-only** knowledge server:

- Runs locally via stdio transport (no network listeners, no HTTP server)
- No authentication, no secrets, no API keys required or stored
- No telemetry, no analytics, no data leaves your machine
- Fragments are static markdown files, not executable code
- No write operations — the server cannot modify your files or system

## What's In Scope

- Code injection via malformed fragment frontmatter or content
- Path traversal in fragment loading or custom directory resolution
- Dependency vulnerabilities that affect runtime behavior
- Anything that could cause arbitrary code execution

## What's Out of Scope

- Fragment content being publicly readable (that's the intended behavior)
- Denial of service against a local CLI tool
- Issues requiring physical access to the machine running Cortex

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest release | Yes |
| Older releases | No |

Security patches are applied to the latest release only.
