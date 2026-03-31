---
id: SKL-0249
name: Community Building
category: skills
tags: [community, discord, slack, moderation, engagement, online-community]
capabilities: [community-architecture, moderation-strategy, engagement-systems, platform-management]
useWhen:
  - starting an online community around your brand or topic
  - choosing between Discord, Slack, forums, or other community platforms
  - designing moderation policies and community guidelines
  - increasing engagement and reducing lurker-to-contributor ratio
  - scaling a community beyond the initial founding members
estimatedTokens: 650
relatedFragments: [SKL-0244, SKL-0248, PAT-0127]
dependencies: []
synonyms: ["how to build an online community", "how to manage a Discord server", "best practices for community moderation", "how to increase community engagement", "should I use Discord or Slack for my community", "how to grow a professional community"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/discourse/discourse"
difficulty: intermediate
owner: "cortex"
pillar: "personal-brand"
---

# Skill: Community Building

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0249 |
| **Name** | Community Building |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A community is not a group chat. It is a shared space where members create value for each other, not just consume content from a leader. The best communities are built around a shared identity and a common problem, not around a single personality. Discourse, the open-source forum platform used by communities like Mozilla, Rust, and Figma, has spent over a decade learning what makes communities work. Their design decisions encode hard-won lessons.

### Platform Selection

Choose your platform based on the type of conversation you want to foster:

- **Forum (Discourse, Circle)**: Best for long-form, searchable discussions. Conversations persist and build a knowledge base over time. Discourse's trust level system automatically rewards consistent contributors with more permissions.
- **Real-time chat (Discord, Slack)**: Best for quick interactions and a sense of "hanging out." Conversations are ephemeral and harder to search. Good for tight-knit groups under 500 members.
- **Hybrid**: Many communities run a forum for substantive discussion and a chat for casual interaction. Discourse integrates chat directly into its forum platform for this reason.

The key question: "Will this conversation be valuable to someone reading it six months from now?" If yes, use a forum. If no, chat is fine.

### The First 50 Members

Communities do not grow linearly. They follow a pattern: painful early growth, then a tipping point where members start creating value for each other. To reach that tipping point, focus on your first 50 members. Invite them personally. Seed discussions by posting thoughtful questions. Reply to every single post. Discourse's onboarding flow includes an interactive tutorial bot that teaches new members how to participate. Design your own version: a welcome message, clear guidelines, and a prompt to introduce themselves.

### Moderation as Architecture

Good moderation is invisible. It creates the conditions for healthy conversation rather than policing bad behavior after the fact. Discourse implements this through trust levels: new members start with limited permissions and earn more through participation. This prevents spam and bad-faith engagement without requiring active moderation. Establish three to five clear community guidelines focused on behavior (be respectful, stay on topic, no self-promotion without value) rather than restrictions. Pin them visibly and enforce consistently.

### Engagement Systems

The 90-9-1 rule applies to most communities: 90% lurk, 9% occasionally contribute, 1% create most content. Your job is to move people up the ladder. Discourse uses likes, badges, and trust levels to reward participation. Apply similar mechanics: spotlight great contributions, create recurring discussion prompts (weekly threads, AMAs, challenges), and tag members directly when a topic matches their expertise. The goal is reducing the friction between "reading" and "posting."

### Scaling Without Losing Culture

As communities grow past a few hundred members, culture dilutes unless you actively maintain it. Appoint community moderators from your most engaged members. Create sub-channels or categories so conversations stay focused. Discourse's category and tag system allows communities to scale to thousands of users while keeping discussions organized. Document your community's norms and values explicitly so new members absorb culture quickly.

## Key Takeaways

- Choose your platform based on conversation longevity: forums for persistent value, chat for casual interaction.
- Personally invest in your first 50 members. Reply to everything and seed discussions yourself.
- Design moderation as architecture (trust levels, guidelines) rather than reactive policing.
- Use engagement mechanics (spotlights, prompts, badges) to convert lurkers into contributors.
- As you scale, appoint moderators and document norms explicitly to preserve community culture.
