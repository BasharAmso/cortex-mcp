# Fragment Authoring Guide

> How to write high-quality Cortex MCP fragments that users actually find.

---

## Fragment Anatomy

Every fragment is a markdown file with YAML frontmatter. Here's what each field means:

```yaml
---
id: SKL-0001                    # Unique ID. Format: PREFIX-NNNN (AGT, SKL, PAT, EX)
name: Code Review               # Human-readable name (2-4 words)
category: skills                 # One of: agents, skills, patterns, examples
tags: [code-review, pull-request, quality, review, feedback]
capabilities: [review-code, find-bugs, suggest-improvements]
useWhen:
  - reviewing a pull request
  - checking code quality before merging
  - looking for common bugs in code
synonyms:
  - "check my code"
  - "PR review"
  - "look over this pull request"
  - "code feedback"
  - "review my changes"
estimatedTokens: 500            # Approximate token cost (~4 chars per token)
lastUpdated: "2026-03-29"       # ISO date of last content update
sourceUrl: ""                   # URL of source material (if external)
difficulty: intermediate        # beginner | intermediate | advanced
relatedFragments: [PAT-0001]   # IDs of related fragments
dependencies: []                # IDs of fragments that should be loaded first
---

# Code Review

The actual teaching content goes here...
```

---

## Field Rules

### Tags (minimum 5)

Tags are the highest-weight signal for matching (+10 per hit). Include both:
- **Technical terms**: `jwt`, `oauth`, `session`, `bcrypt`
- **Plain English**: `login`, `authentication`, `password`, `security`
- **Framework names**: `react`, `nextjs`, `express`, `prisma`

Bad tags: `development`, `code`, `software` (too generic, match everything)

### Synonyms (3-5 phrases)

Synonyms catch the way real people actually ask for things. Write them as messy human phrases a beginner would type, not technical abbreviations.

- Think: "How would someone who doesn't know the technical term ask for this?"
- Include verb-phrase variations: "add login", "set up auth", "secure my API"
- Include tool-specific phrases: "Stripe checkout", "NextAuth setup"

Bad synonym: `authn`
Good synonym: `how do I add logins to my app`

### useWhen (minimum 3 scenarios)

Complete sentences from the user's perspective. These match at +5 per hit.

```yaml
useWhen:
  - adding authentication to a new application
  - choosing between JWT and session-based auth
  - implementing login and signup flows
  - securing API endpoints with middleware
```

### difficulty

- **beginner**: No prerequisites, explains concepts from scratch
- **intermediate**: Assumes basic knowledge, focuses on implementation
- **advanced**: Deep patterns, trade-offs, edge cases

### lastUpdated

Always set this to the date you last reviewed or modified the content. This lets maintainers identify stale fragments.

### sourceUrl

If the knowledge came from an external source (documentation, research paper, blog post), include the URL. Leave empty for original content.

---

## Content Standards

- **Length**: 400-800 tokens (roughly 200-400 words). Enough to be useful, short enough to fit in context.
- **Tone**: Prescriptive. Tell the reader what to do, not what they could do.
- **Format**: Tables over prose. Bullet lists over paragraphs. Code blocks for examples.
- **No jargon without explanation**: If you use a technical term, explain it in context or include it in tags so users who search the plain English version still find it.
- **Actionable**: Every fragment should answer "what do I do next?"

---

## Before/After Example

### BAD Fragment

```yaml
---
id: PAT-0099
name: Authentication
category: patterns
tags: [auth, security]
capabilities: [authentication]
useWhen:
  - doing authentication
estimatedTokens: 300
relatedFragments: []
dependencies: []
---

# Authentication

Authentication is important for web applications. There are several approaches
including JWT, sessions, and OAuth. Each has trade-offs...
```

Problems:
- Only 2 tags (both technical, no plain English)
- No synonyms (won't match "add login" or "secure my app")
- 1 vague useWhen ("doing authentication" matches nothing useful)
- Missing lastUpdated, difficulty, sourceUrl
- Content is descriptive, not prescriptive

### GOOD Fragment

```yaml
---
id: PAT-0003
name: Authentication Patterns
category: patterns
tags: [authentication, jwt, session, oauth, security, auth, login, signup, password, token]
capabilities: [auth-design, token-management, session-handling, oauth-integration]
useWhen:
  - adding authentication to a new application
  - choosing between JWT, session, or OAuth strategies
  - implementing login, signup, or password reset flows
  - securing API endpoints with auth middleware
synonyms:
  - "add login to my app"
  - "how do I set up user authentication"
  - "JWT vs sessions"
  - "secure my API endpoints"
  - "OAuth login with Google"
estimatedTokens: 650
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
relatedFragments: [PAT-0001, PAT-0002, EX-0004]
dependencies: []
---

# Authentication Patterns

How to choose and implement authentication for web applications.

## Strategy Comparison

| Strategy | Best For | Trade-offs |
|----------|----------|------------|
| **Session-based** | Server-rendered apps | Requires server storage; sticky sessions |
| **JWT** | SPAs, microservices | Stateless; harder to revoke |
| **OAuth 2.0** | Social login | Delegates auth; more complex flow |

## Guidelines

1. **Never store passwords in plain text.** Use bcrypt or argon2.
2. **JWTs should be short-lived** (15 min). Use refresh tokens.
3. **Store tokens securely.** HttpOnly cookies, never localStorage.
...
```

Improvements:
- 10 tags covering technical + plain English
- 5 synonyms written as real user phrases
- 4 specific useWhen scenarios
- All metadata fields populated
- Content is prescriptive with comparison table

---

## Matching Test

Before submitting a fragment, mentally test 3 different phrasings:

1. **Beginner phrasing**: "I need to add login to my app"
2. **Expert phrasing**: "JWT vs session-based auth trade-offs"
3. **Task phrasing**: "secure my API endpoints"

Would all three find your fragment? If not, add more synonyms or useWhen scenarios.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad |
|-------------|-------------|
| Vague tags (`development`, `code`) | Matches everything, helps nothing |
| Missing useWhen | Fragment only findable by exact keyword |
| Content is just a link list | No value without clicking through |
| Duplicating an existing fragment | Splits relevance, confuses ranking |
| No synonyms | Misses 80% of how people actually search |
| Technical-only tags | Beginners can't find it |
| Over 1000 tokens | Wastes context budget, dilutes signal |

---

## ID Conventions

| Category | Prefix | Example |
|----------|--------|---------|
| Agents | AGT | AGT-0001 |
| Skills | SKL | SKL-0001 |
| Patterns | PAT | PAT-0001 |
| Examples | EX | EX-0001 |

IDs are sequential within each category. Check existing fragments before assigning a new ID.
