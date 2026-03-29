---
id: SKL-0022
name: User Acceptance Testing
category: skills
tags: [testing, uat, qa, acceptance, review]
capabilities: [acceptance-testing, health-scoring, regression-tracking, accessibility-checking]
useWhen:
  - verifying a feature works as specified before shipping
  - running QA on a staging or test environment
  - comparing current quality against a previous baseline
  - performing a quick smoke test before release
estimatedTokens: 800
relatedFragments: [SKL-0015, SKL-0017, SKL-0002]
dependencies: []
---

# User Acceptance Testing

Walk through the product as a real user would. Verify features match requirements, edge cases do not crash the app, and error messages make sense.

## QA Modes

| Mode | When | What |
|------|------|------|
| **Diff-aware** | Feature branch with changes | Analyze git diff, test affected pages/routes |
| **Full** | First QA run or explicit request | Systematic exploration of every reachable page |
| **Quick** | Smoke test | 30-second check: homepage + top 5 pages |
| **Regression** | Baseline exists | Full mode + compare against previous results |

## Procedure

### 1. Setup

- Read the PRD and project state to build a checklist of testable features
- Check known bugs and planned work
- Determine QA mode based on branch state and user request

### 2. Test Each Flow

Start from real entry points. For each flow test:

- **Happy path:** Does it work as described?
- **Edge cases:** Empty inputs, invalid data, back button, page refresh, boundary values, double-click submit
- **Error states:** Wrong credentials, disconnected network, exceeded limits

Document each issue immediately with: what happened, expected behavior, reproduction steps, severity, and category.

### 3. Accessibility and Usability

- Tab through all interactive elements. Visible focus?
- Text readable at normal zoom? Color contrast adequate?
- Error messages helpful and specific?
- Mobile layout works without horizontal scroll?
- Empty states provide guidance?

### 4. Compute Health Score

Rate each category (Console, Functional, UX, Visual, Accessibility, Performance, Content, Friction) from 0-100 with weighted averages. Final score determines the rating (Excellent/Good/Needs Work/Poor/Critical).

### 5. Issue Verdict

| Verdict | Requirements |
|---------|-------------|
| **GO** | All critical flows passing, zero critical/high issues, health score 75+ |
| **GO WITH CONDITIONS** | Critical flows passing with workarounds, all high issues have documented fixes |
| **NO-GO** | Any requirement above not met |

Default verdict is NO-GO. The product must earn a passing verdict.

### 6. Route Bugs

Log Critical and High issues to the task queue with reproduction steps for the fixer.
