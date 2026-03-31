---
id: PAT-0199
name: Community Directory Pattern
category: patterns
tags: [directory, member-profiles, families, groups, communication, privacy, church-management, community]
capabilities: [member-directory, family-grouping, group-management, communication-preferences]
useWhen:
  - building a member directory for a religious community
  - implementing family and household grouping
  - designing group management for ministries or committees
  - adding privacy controls for member information
  - creating communication channels for community subgroups
estimatedTokens: 650
relatedFragments: [PAT-0192, SKL-0386, PAT-0199]
dependencies: []
synonyms: ["how to build a church member directory", "how to manage family profiles in a community app", "how to create groups for ministries or committees", "how to handle member privacy in a directory", "how to build a community communication system", "how to design a mosque membership database"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "religious"
---

# Community Directory Pattern

Member profiles, family grouping, and privacy-controlled directories for religious communities.

## Member Profile Model

```
Member {
  id, firstName, lastName,
  email, phone,
  address: { street, city, state, zip },
  photo: URL | null,
  familyId: UUID,
  role: "member" | "leader" | "staff" | "visitor",
  joinDate: Date,
  birthday: { month, day } (no year for privacy),
  groups: [groupId],
  communicationPrefs: {
    email: boolean,
    sms: boolean,
    pushNotifications: boolean
  },
  visibility: {
    email: "everyone" | "leaders" | "nobody",
    phone: "everyone" | "leaders" | "nobody",
    address: "leaders" | "nobody",
    birthday: "everyone" | "leaders" | "nobody"
  },
  status: "active" | "inactive" | "visitor"
}
```

The `visibility` field gives each member granular control over who sees their personal information.

## Family/Household Grouping

Religious communities operate at the family level for many activities:

```
Family {
  id, familyName: "The Smith Family",
  members: [
    { memberId, relationship: "head" | "spouse" | "child" | "other" }
  ],
  address: { ... },  // shared family address
  photo: URL | null
}
```

Benefits of family grouping:
- **Single address** for mail and directory display
- **Family RSVP** for events (count household attendance)
- **Family giving** for combined donation statements
- **Parent-child linking** for children's ministry check-in

Display families as a unit in the directory with individual member details expandable.

## Group Management

Communities organize into functional groups:

| Group Type | Purpose | Examples |
|-----------|---------|---------|
| **Ministry** | Service-oriented teams | Worship team, youth ministry, outreach |
| **Small Group** | Fellowship and study | Bible study, Quran circle, prayer group |
| **Committee** | Administrative governance | Finance, building, events planning |
| **Class** | Education | Sunday school, new member class |
| **Demographic** | Age/life-stage based | Young adults, seniors, parents |

```
Group {
  id, name, type, description,
  leaders: [memberId],
  members: [memberId],
  meetingSchedule: RRULE | null,
  communicationChannel: "email_list" | "chat_group" | "both",
  visibility: "public" | "members_only"
}
```

## Privacy Controls

Religious community directories handle sensitive personal data. Privacy controls must be robust:

1. **Opt-in directory listing**: Members choose to appear in the directory
2. **Per-field visibility**: Each contact field has its own visibility level
3. **Role-based access**: Leaders see more than general members
4. **No public exposure**: Directory is never publicly accessible (authentication required)
5. **Photo consent**: Explicit opt-in for photo display
6. **Data export**: Members can download their own data
7. **Right to removal**: Members can request full data deletion

Never expose the full directory to unauthenticated users. Even within the community, respect individual visibility preferences.

## Communication Channels

Enable targeted communication through directory segments:

| Channel | Use Case | Delivery |
|---------|----------|----------|
| **All members** | Community-wide announcements | Email + push |
| **Group message** | Ministry or committee updates | Email or chat |
| **Family message** | Household-specific (event RSVP) | Email to family head |
| **Individual** | Personal pastoral communication | Preferred channel |

Respect communication preferences. Never send SMS to members who opted out of text. Provide one-click unsubscribe for email communications.

## Search and Browse

Directory search supports:
- **Name search**: First name, last name, family name
- **Group filter**: Show members of a specific ministry or committee
- **Role filter**: Leaders, staff, active members
- **Alphabetical browse**: Traditional directory listing A-Z

## Key Takeaways

- Family/household grouping is essential since religious communities operate at the family level
- Per-field visibility controls give members ownership over their personal data exposure
- Never expose the directory publicly; require authentication and respect individual privacy settings
- Group management with typed categories (ministry, small group, committee) maps to real community structure
- Communication must respect opt-in preferences across all channels with easy unsubscribe
