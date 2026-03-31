---
id: PAT-0091
name: Code Documentation
category: patterns
tags: [documentation, jsdoc, comments, readme, inline-docs, api-docs]
capabilities: [jsdoc-annotation, comment-writing, readme-creation, documentation-judgment]
useWhen:
  - deciding when and where to add comments in code
  - writing JSDoc annotations for functions and types
  - creating a README for a new project or library
  - evaluating whether existing documentation is sufficient
  - learning what good code documentation looks like
estimatedTokens: 650
relatedFragments: [SKL-0172, PAT-0093, SKL-0175]
dependencies: []
synonyms: ["when should I add comments to my code", "how to write JSDoc for my functions", "how to write a good README", "what makes good code documentation", "when do comments add value vs clutter"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/jsdoc/jsdoc"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Pattern: Code Documentation

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0091 |
| **Name** | Code Documentation |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Good documentation explains **why**, not **what**. The code itself shows what it does. Documentation should capture intent, constraints, and context that the code cannot express on its own. JSDoc, the standard JavaScript documentation tool, generates API documentation from annotated source comments, but the principles apply across all languages.

### When Comments Add Value

**Document the why, not the how**:
```javascript
// Bad: increments counter by one
counter++;

// Good: retry count tracks failed API attempts for circuit breaker logic
retryCount++;
```

**Document non-obvious decisions**:
```javascript
// We use a 30-second timeout here because the payment provider's
// SLA guarantees response within 25 seconds. The extra 5 seconds
// accounts for network variability.
const PAYMENT_TIMEOUT_MS = 30000;
```

**Document public API contracts**: Every exported function, class, or module that other developers will use should have documentation describing its purpose, parameters, return value, and any side effects.

### JSDoc Essentials

JSDoc uses specially formatted comments that tools can parse into documentation:

```javascript
/**
 * Calculate the total price including tax and discount.
 * @param {number} subtotal - Pre-tax amount in cents
 * @param {number} taxRate - Tax rate as a decimal (e.g., 0.08 for 8%)
 * @param {number} [discount=0] - Optional discount in cents
 * @returns {number} Final price in cents
 * @throws {RangeError} If subtotal is negative
 */
function calculateTotal(subtotal, taxRate, discount = 0) { ... }
```

The most important tags:
- `@param {type} name - description` for function parameters
- `@returns {type} description` for return values
- `@throws {ErrorType} description` for errors the function may throw
- `@example` for usage examples (often more useful than descriptions)
- `@typedef` for defining custom types

### Writing a Good README

A README is the front door to your project. Include these sections:

1. **What it does**: One to three sentences explaining the project's purpose
2. **Quick start**: The minimum steps to install and run
3. **Usage examples**: Show the most common use cases with code
4. **Configuration**: Document environment variables, config files, and options
5. **Contributing**: How to set up a development environment and submit changes

### When Documentation Hurts

Too much documentation is worse than too little. Comments that restate the obvious add noise, go stale, and train readers to ignore all comments. Remove any comment where the code is self-explanatory. If you find yourself writing a long comment to explain a function, consider whether renaming the function or simplifying the logic would eliminate the need for the comment entirely.

## Key Takeaways

- Document why decisions were made, not what the code does line by line
- Use JSDoc for all public API functions with `@param`, `@returns`, and `@example` tags
- A README should answer: what is this, how do I run it, and how do I use it
- Delete comments that restate the obvious; they add noise and go stale
- If code needs a long comment to explain, simplify the code instead
