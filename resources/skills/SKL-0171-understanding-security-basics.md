---
id: SKL-0171
name: Understanding Security Basics
category: skills
tags: [security, vulnerabilities, xss, sql-injection, csrf, owasp]
capabilities: [vulnerability-identification, secure-coding-awareness, threat-recognition, security-review-basics]
useWhen:
  - reviewing code for common security vulnerabilities
  - learning what XSS, SQL injection, and CSRF mean
  - understanding why user input must be validated
  - preparing to work with authentication or form handling
  - reading security audit results and understanding findings
estimatedTokens: 650
relatedFragments: [PAT-0092, SKL-0172, PAT-0093]
dependencies: []
synonyms: ["what are common security vulnerabilities", "how do I prevent XSS attacks", "what is SQL injection and how to avoid it", "how do I make my code more secure", "what security issues should I look for in code"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Understanding Security Basics

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0171 |
| **Name** | Understanding Security Basics |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Security vulnerabilities are flaws that allow attackers to misuse your application. The OWASP Cheat Sheet Series documents the most common ones. You do not need to be a security expert to recognize the patterns that cause them.

### The Big Three Vulnerabilities

**Cross-Site Scripting (XSS)** happens when user-supplied data is rendered as HTML or JavaScript without escaping. If a comment field accepts `<script>alert('hacked')</script>` and the page renders it raw, every visitor executes that script. The fix: always escape or sanitize output. Modern frameworks (React, Angular, Vue) escape by default, but using `dangerouslySetInnerHTML` or `v-html` bypasses that protection.

**SQL Injection** occurs when user input is concatenated directly into a database query. A login form that builds `SELECT * FROM users WHERE name = '${input}'` lets an attacker type `' OR 1=1 --` and bypass authentication. The fix: use parameterized queries or an ORM. Never build SQL strings from raw input.

**Cross-Site Request Forgery (CSRF)** tricks a logged-in user's browser into making requests they did not intend. An attacker's page can include a hidden form that posts to your banking endpoint. The fix: use CSRF tokens that the server validates on every state-changing request.

### How to Spot Vulnerabilities in Code

Look for these patterns during code review:

- **String concatenation in queries** (SQL, NoSQL, LDAP): always a red flag
- **Unescaped user input in templates**: check for raw HTML rendering
- **Missing authentication checks on endpoints**: every route that changes data needs auth
- **Secrets in source code**: API keys, passwords, or tokens hardcoded in files
- **Overly permissive CORS**: allowing `*` origins on authenticated endpoints

### The OWASP Top 10

The OWASP Top 10 is the industry-standard list of the most critical web application security risks. It covers injection, broken authentication, sensitive data exposure, XML external entities, broken access control, security misconfiguration, XSS, insecure deserialization, using components with known vulnerabilities, and insufficient logging. Familiarize yourself with the categories even if you do not memorize every detail.

### Practical Security Habits

1. **Validate input on the server**, not just the client. Client-side validation is for UX; server-side validation is for security.
2. **Use HTTPS everywhere**. HTTP transmits data in plaintext.
3. **Keep dependencies updated**. Known vulnerabilities in outdated packages are the easiest attack vector.
4. **Apply the principle of least privilege**. Give users, services, and API keys only the permissions they need.

## Key Takeaways

- XSS, SQL injection, and CSRF are the most common web vulnerabilities and all stem from trusting user input
- Parameterized queries, output escaping, and CSRF tokens prevent the majority of basic attacks
- Security is not a feature you add at the end; it is a habit you practice during every code review
- The OWASP Top 10 is the standard reference for understanding web application risks
