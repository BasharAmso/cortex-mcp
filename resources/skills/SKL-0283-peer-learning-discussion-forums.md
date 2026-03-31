---
id: SKL-0283
name: Peer Learning & Discussion Forums
category: skills
tags: [discussion-forums, peer-learning, moderation, student-forums, q-and-a, community]
capabilities: [forum-design, moderation-system, trust-level-management, q-and-a-workflow]
useWhen:
  - building a student discussion forum for a course or school
  - designing peer review or Q&A features in an educational platform
  - implementing moderation and trust systems for student communities
  - adding threaded discussions to a learning management system
  - planning community engagement features for online courses
estimatedTokens: 650
relatedFragments: [SKL-0282, PAT-0147, PAT-0148]
dependencies: []
synonyms: ["how to build a student forum", "peer review system for students", "how to moderate a learning community", "Q&A feature for online courses", "discussion board for education", "student community platform design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/discourse/discourse"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Skill: Peer Learning & Discussion Forums

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0283 |
| **Name** | Peer Learning & Discussion Forums |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Peer learning through discussion forums accelerates understanding because students must articulate their thinking to explain concepts to others. Discourse's decade-tested architecture provides proven patterns for community moderation, trust, and engagement.

### Forum Structure for Education

Organize around courses and topics, not flat threads:

```
Category (Course) → Subcategory (Module/Week)
  → Topic (Discussion Prompt or Student Question)
    → Posts (Replies, threaded)
```

Pin instructor posts. Mark accepted answers in Q&A threads. Allow students to bookmark and reference posts in their own work.

### Trust Level System

Discourse's trust levels translate directly to educational contexts:

| Level | Name | Earned By | Capabilities |
|-------|------|-----------|-------------|
| 0 | New Student | Enrollment | Read, limited posting |
| 1 | Active Learner | Reading + first posts | Reply, flag, basic formatting |
| 2 | Contributor | Sustained participation | Edit wiki posts, invite peers |
| 3 | Mentor | High-quality contributions | Recategorize, close topics, edit others' posts |
| 4 | Teaching Assistant | Instructor-appointed | Full moderation, announcements |

This system rewards quality participation without requiring manual permission management. Students earn trust through demonstrated engagement.

### Q&A vs Discussion Mode

Support both modes per category:

- **Discussion mode**: Open-ended prompts, all replies equal. Good for reflection and debate.
- **Q&A mode**: One accepted answer floated to top. Good for technical questions and homework help.

Let instructors set the mode per category. Q&A threads should show vote counts to surface the best student answers.

### Moderation for Educational Safety

Educational forums need stricter moderation than general communities:

1. **Pre-moderation** for trust level 0 (new students). First posts enter a review queue.
2. **Flagging system**: Students flag inappropriate content. Three flags auto-hide a post pending review.
3. **Word filters**: Block profanity and personally identifiable information.
4. **Instructor alerts**: Auto-notify when a post mentions academic integrity keywords.
5. **Anonymous posting**: Optional for sensitive questions. Instructor can still see identity.

### Peer Review Workflow

```
Student submits work → System assigns 2-3 peer reviewers
  → Reviewers score using rubric + written feedback
  → Author sees aggregated feedback (anonymized)
  → Instructor spot-checks a sample of reviews for quality
```

Calibrate peer reviewers by having them first grade a pre-scored sample. Weight future reviews by calibration accuracy.

### Engagement Mechanics

- **Daily digest** emails summarizing new posts in enrolled courses.
- **@mention** notifications for direct replies.
- **Badges** for milestones (first answer marked as solution, 10 helpful votes).
- **Activity streaks** visible on profiles to encourage regular participation.

## Key Takeaways

- Structure forums by course and module, not flat categories.
- Trust levels automate permission management and reward quality participation.
- Support both Q&A (accepted answers) and discussion (open-ended) modes.
- Educational forums require stricter moderation: pre-moderation for new users, auto-hiding flagged content.
- Peer review needs calibration to ensure feedback quality.
