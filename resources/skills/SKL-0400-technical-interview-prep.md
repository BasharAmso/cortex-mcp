---
id: SKL-0400
name: Technical Interview Prep
category: skills
tags: [interviews, system-design, coding-interviews, behavioral, negotiation, job-search]
capabilities: [interview-preparation, system-design-practice, coding-problem-strategy, offer-negotiation]
useWhen:
  - preparing for a technical interview at a tech company
  - practicing system design interview questions
  - improving coding interview problem-solving speed
  - preparing behavioral interview stories using STAR format
  - negotiating a job offer after receiving an interview result
estimatedTokens: 650
relatedFragments: [SKL-0399, PAT-0204, SKL-0402, SKL-0397]
dependencies: []
synonyms: ["how to prepare for coding interviews", "system design interview tips", "technical interview study plan", "behavioral interview preparation", "negotiate developer salary", "how to pass tech interviews"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/yangshun/tech-interview-handbook"
difficulty: intermediate
owner: "cortex"
pillar: "developer-growth"
---

# Skill: Technical Interview Prep

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0400 |
| **Name** | Technical Interview Prep |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Technical interviews test different skills than day-to-day engineering. Preparation is a learnable skill with predictable patterns. The Tech Interview Handbook breaks this into four pillars.

### The Four Interview Pillars

| Pillar | Weight | What They Assess | Preparation Time |
|--------|--------|-----------------|-----------------|
| **Coding** | 40% | Problem-solving, code fluency, edge cases | 4-8 weeks |
| **System Design** | 25% | Architecture thinking, trade-offs, scalability | 2-4 weeks |
| **Behavioral** | 25% | Communication, teamwork, conflict resolution | 1-2 weeks |
| **Negotiation** | 10% | Self-advocacy, market awareness | 1 week |

### Coding Interview Strategy

The biggest mistake is jumping into code. Follow this framework for every problem:

1. **Clarify** (2-3 min): Repeat the problem in your own words. Ask about input constraints, edge cases, expected output format. "Can the array be empty? Can values be negative?"
2. **Plan** (3-5 min): Talk through your approach. Start with brute force, then optimize. State time and space complexity before coding.
3. **Code** (15-20 min): Write clean code with descriptive variable names. Talk while coding. If you get stuck, explain what you are trying to do.
4. **Test** (3-5 min): Trace through your code with a small example. Test edge cases: empty input, single element, duplicates, maximum size.

Pattern recognition accelerates solving. The most common patterns:
- **Two pointers**: Sorted array problems, palindrome checks
- **Sliding window**: Subarray/substring problems with constraints
- **BFS/DFS**: Graph traversal, tree problems, connected components
- **Dynamic programming**: Optimization problems with overlapping subproblems
- **Hash map**: Frequency counting, two-sum variants, grouping

### System Design Interview Framework

For senior+ roles, system design is often the deciding factor:

1. **Requirements** (5 min): Clarify functional and non-functional requirements. "How many users? Read-heavy or write-heavy? Latency requirements?"
2. **High-level design** (10 min): Draw the main components: clients, load balancer, application servers, database, cache, message queue. Explain data flow.
3. **Deep dive** (15 min): The interviewer will pick 1-2 areas to explore. Be ready to discuss database schema, API design, caching strategy, or consistency trade-offs.
4. **Bottlenecks** (5 min): Identify scaling bottlenecks and propose solutions. This shows you think about real-world operation, not just happy paths.

### Behavioral Interview with STAR

Structure every behavioral answer using STAR:
- **Situation**: Brief context (1-2 sentences)
- **Task**: What you specifically needed to do
- **Action**: What you did and why (the bulk of your answer)
- **Result**: Quantifiable outcome if possible

Prepare 5-7 stories that cover: technical challenge, conflict with teammate, project failure, leadership moment, tight deadline. Each story can be reframed to answer multiple question types.

### Negotiation Principles

From the Tech Interview Handbook's negotiation guide:
1. **Never share your current salary.** It anchors the negotiation against you.
2. **Get multiple offers.** Competing offers are the strongest negotiation lever.
3. **Negotiate the total package.** Base salary, signing bonus, equity, remote work, PTO are all negotiable.
4. **Use specific numbers.** "I was hoping for $X" is stronger than "I want more."
5. **Be enthusiastic but firm.** Show genuine interest in the role while holding your number.

### Study Plan Template

| Week | Focus | Daily Time |
|------|-------|-----------|
| 1-2 | Easy coding problems (arrays, strings, hash maps) | 1-2 hours |
| 3-4 | Medium problems (trees, graphs, DP) | 1-2 hours |
| 5-6 | System design (1 design per day) + hard problems | 2 hours |
| 7-8 | Mock interviews + behavioral prep | 1-2 hours |

## Key Takeaways

- Follow a structured framework for each problem type: clarify, plan, code, test
- Pattern recognition (two pointers, sliding window, BFS/DFS, DP) accelerates coding interviews
- System design interviews test trade-off thinking: always discuss scalability and bottlenecks
- Prepare 5-7 STAR stories that cover common behavioral themes
- Never share current salary during negotiation; use competing offers as leverage
