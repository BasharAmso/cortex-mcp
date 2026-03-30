---
id: SKL-0022
name: User Acceptance Testing
category: skills
tags: [testing, uat, qa, acceptance, review, black-box, regression, accessibility]
capabilities: [acceptance-testing, health-scoring, regression-tracking, accessibility-checking, smoke-testing]
useWhen:
  - verifying a feature works as specified before shipping
  - running QA on a staging or test environment
  - comparing current quality against a previous baseline
  - performing a quick smoke test before release
  - validating edge cases and error handling from a user perspective
estimatedTokens: 800
relatedFragments: [SKL-0015, SKL-0017, SKL-0002]
dependencies: []
synonyms: ["test my app like a real user", "does this feature actually work", "run QA on my app", "smoke test before launch", "check if everything works end to end"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/javascript-testing-best-practices"
difficulty: intermediate
---

# User Acceptance Testing

Walk through the product as a real user would. Verify features match requirements, edge cases do not crash the app, and error messages make sense. Grounded in JavaScript testing best practices: design tests for lean comprehension, use realistic data, and test behavior not internals.

## QA Modes

| Mode | When | What |
|------|------|------|
| **Diff-aware** | Feature branch with changes | Analyze git diff, test affected pages/routes |
| **Full** | First QA run or explicit request | Systematic exploration of every reachable page |
| **Quick** | Smoke test | 30-second check: homepage + top 5 pages |
| **Regression** | Baseline exists | Full mode + compare against previous results |

## Test Design Principles

From the Golden Rule of testing: design tests to be short, dead-simple, and flat.

| Principle | Application to UAT |
|-----------|-------------------|
| AAA structure | For each test: Arrange (setup state), Act (perform action), Assert (verify outcome) |
| 3-part test names | What is tested + scenario + expected result |
| Black-box focus | Test public behavior and outcomes, not implementation details |
| Realistic data | Use real-world inputs, not "foo" and "test123". Edge-case data catches real bugs. |
| BDD-style expectations | Describe what should happen in product language |

## Procedure

### 1. Setup

- Read the PRD and project state to build a checklist of testable features
- Check known bugs and planned work
- Determine QA mode based on branch state and user request

### 2. Test Each Flow

Start from real entry points. For each flow test:

- **Happy path:** Does it work as described?
- **Edge cases:** Empty inputs, boundary values, special characters, double-click submit, back button, page refresh
- **Error states:** Wrong credentials, disconnected network, exceeded limits, expired sessions
- **Realistic data:** Use plausible names, emails, and values. Production bugs hide behind synthetic inputs.

Document each issue immediately with: what happened, expected behavior, reproduction steps, severity, and category.

### 3. Accessibility and Usability

- Tab through all interactive elements. Visible focus indicators?
- Text readable at normal zoom? Color contrast adequate (4.5:1 minimum)?
- Error messages helpful and specific (not just "Error occurred")?
- Mobile layout works without horizontal scroll?
- Empty states provide guidance on what to do?

### 4. Compute Health Score

Rate each category from 0-100:

| Category | Weight | What to Check |
|----------|--------|--------------|
| Functional | 25% | Features work as specified |
| UX | 20% | Flows are intuitive and complete |
| Accessibility | 15% | Keyboard nav, contrast, screen reader |
| Visual | 15% | Layout, alignment, responsive |
| Performance | 10% | Load times, responsiveness |
| Content | 10% | Spelling, clarity, accuracy |
| Console/Errors | 5% | No unhandled errors in console |

### 5. Issue Verdict

| Verdict | Requirements |
|---------|-------------|
| **GO** | All critical flows passing, zero critical/high issues, health score 75+ |
| **GO WITH CONDITIONS** | Critical flows passing with workarounds, all high issues have documented fixes |
| **NO-GO** | Any requirement above not met |

Default verdict is NO-GO. The product must earn a passing verdict.

### 6. Route Bugs

Log Critical and High issues to the task queue with reproduction steps for the fixer.

## Key Rules

- Test behavior, not implementation details
- Use realistic data in all test scenarios
- Default to NO-GO. Every GO must be earned.
