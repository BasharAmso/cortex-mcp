---
id: PAT-0206
name: Knowledge Sharing Pattern
category: patterns
tags: [knowledge-sharing, tech-talks, brown-bags, team-wiki, mentorship-programs, documentation-culture]
capabilities: [tech-talk-design, wiki-organization, knowledge-culture-building, mentorship-program-setup]
useWhen:
  - establishing a knowledge sharing culture on an engineering team
  - organizing tech talks or brown bag sessions
  - building and maintaining a team wiki or knowledge base
  - creating a mentorship program for a development team
  - reducing bus factor by spreading domain knowledge
estimatedTokens: 650
relatedFragments: [SKL-0403, SKL-0397, PAT-0204, SKL-0399]
dependencies: []
synonyms: ["how to share knowledge on a dev team", "run a tech talk program", "set up a team wiki", "reduce bus factor", "mentorship program for engineers", "brown bag lunch and learn"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: beginner
owner: "cortex"
pillar: "developer-growth"
---

# Knowledge Sharing Pattern

Knowledge trapped in one person's head is a liability. Knowledge shared across a team is an asset. This pattern covers the structures and habits that turn individual expertise into organizational capability.

## The Bus Factor Problem

"Bus factor" is the number of people who could be hit by a bus before a project stalls. If only one person understands the payment system, your bus factor for payments is 1. Knowledge sharing increases bus factor across all critical systems.

## Knowledge Sharing Formats

| Format | Audience | Effort | Knowledge Type |
|--------|----------|--------|---------------|
| **Tech talk** (30-45 min) | Team or org | High (prep + delivery) | Deep dives, new technology introductions |
| **Brown bag** (15-20 min) | Team | Medium | Quick demos, lessons learned, TILs |
| **Pair programming** | 1:1 | Low | Hands-on skills, codebase navigation |
| **Code review** | 1:many | Low | Standards, patterns, edge case awareness |
| **Wiki/docs** | Async, anyone | Medium | Reference material, how-tos, decisions |
| **ADRs** | Async, team | Low | Architectural decisions and rationale |
| **Onboarding guide** | New hires | High (creation), low (maintenance) | System overview, setup, team norms |

## Running a Tech Talk Program

### Logistics That Work

- **Cadence**: Biweekly or monthly. Weekly burns out speakers.
- **Length**: 20-30 minutes presentation + 10-15 minutes Q&A. Shorter is better.
- **Time slot**: Consistent (e.g., every other Thursday at noon). Predictability drives attendance.
- **Recording**: Always record and post to team wiki. Half the value is async consumption.
- **Speaker pipeline**: Maintain a sign-up sheet 2-3 months ahead. Invite, do not voluntell.

### Topics That Work Well

- "How I debugged X" (real production incident walkthroughs)
- "Tool I discovered" (new library, CLI tool, or technique demo)
- "Architecture of system Y" (how a key system works internally)
- "What I learned from project Z" (retrospective insights)
- "Technology comparison" (evaluated two options, here is what I found)

Topics that do not work: vendor sales pitches, theoretical deep-dives with no practical application, presentations read from slides.

## Team Wiki Organization

Outline and similar wiki tools work best with deliberate structure:

### Information Architecture

```
Engineering Wiki
├── Getting Started (onboarding, setup, access)
├── Architecture (system diagrams, ADRs, data flow)
├── How-To Guides (deploy, debug, monitor, on-call)
├── Team Practices (code review norms, PR template, release process)
├── Tech Talks (recordings + slides archive)
└── Glossary (team-specific terminology)
```

### Wiki Hygiene Rules

1. **Owner per page.** Every page has a named owner responsible for accuracy. Orphan pages rot.
2. **Review dates.** Mark each page with "Last reviewed: YYYY-MM-DD." Pages not reviewed in 6 months get flagged.
3. **Link, do not duplicate.** If information exists elsewhere (README, Confluence), link to it. Duplicates diverge immediately.
4. **Searchability over hierarchy.** People search, they do not browse. Use descriptive titles and tag pages with keywords.

## Mentorship Programs

### Structured vs Informal

| Approach | Pros | Cons |
|----------|------|------|
| **Formal program** | Consistent, measurable, inclusive | Overhead, can feel forced |
| **Organic pairing** | Natural, low overhead | Uneven access, favors extroverts |
| **Hybrid** | Formal matching + organic execution | Requires coordinator |

The hybrid approach works best: formally match mentors and mentees (ensuring everyone has access), but let pairs determine their own cadence and format.

### Program Structure

- **Matching**: Pair based on growth areas (mentee) and strengths (mentor), not just seniority
- **Kickoff**: Both parties agree on goals and meeting cadence (biweekly minimum)
- **Duration**: 3-6 month cycles. Long enough to build depth, short enough to rotate
- **Check-in**: Program coordinator checks in monthly to ensure pairs are meeting
- **Wrap-up**: End-of-cycle retrospective. Mentee documents what they learned.

## Measuring Knowledge Sharing Health

- **Bus factor audit**: For each critical system, count how many people can independently operate it. Target 3+.
- **Wiki freshness**: Percentage of pages reviewed in the last 6 months. Target 80%+.
- **Talk frequency**: Are talks happening on cadence? Is speaker diversity increasing?
- **Onboarding speed**: How long until a new hire ships their first PR? Trending down means knowledge sharing is working.

## Key Takeaways

- Knowledge sharing increases bus factor: aim for 3+ people who can operate each critical system
- Use multiple formats (talks, pairing, wiki, code review) to reach different learning styles
- Run tech talks biweekly with recordings posted to the wiki for async consumption
- Every wiki page needs an owner and a review date; orphan pages rot within months
- Formal mentorship matching ensures inclusive access while allowing organic execution
