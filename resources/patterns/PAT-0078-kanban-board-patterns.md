---
id: PAT-0078
name: Kanban Board Patterns
category: patterns
tags: [kanban, board, card, drag-drop, project-management, task-management, reordering, labels, swimlanes, activity-log]
capabilities: [board-modeling, drag-drop-reordering, position-management, task-organization, activity-tracking]
useWhen:
  - building a kanban or task board with drag-and-drop
  - designing the data model for boards, lists, and cards
  - implementing smooth card reordering with position numbering
  - adding labels, assignments, and due dates to cards
  - building activity logs or audit trails for card changes
estimatedTokens: 650
relatedFragments: [SKL-0152, PAT-0079, PAT-0004]
dependencies: []
synonyms: ["how to build a Trello clone", "how to make a drag and drop task board", "how to store card order in a database", "how to design a project board", "how to build a task management app", "how to implement drag and drop reordering"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/plankanban/planka"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Kanban Board Patterns

Data models, reordering strategies, and UI patterns for kanban-style project boards. Based on patterns from Planka, an open-source kanban board with real-time sync.

## Data Model

```
Project -> Board -> List -> Card -> (Comments, Attachments, Labels)
```

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **Project** | name, owner_id, members[] | Top-level grouping |
| **Board** | project_id, name, position | Visual board within a project |
| **List** | board_id, name, position | Column (e.g., To Do, In Progress, Done) |
| **Card** | list_id, name, description, position, due_date | Individual task or item |
| **Label** | board_id, name, color | Categorical tag for cards |
| **CardMember** | card_id, user_id | Assignment join table |
| **Comment** | card_id, user_id, text, created_at | Discussion on a card |
| **Attachment** | card_id, filename, url, size | Files attached to a card |
| **Activity** | card_id, user_id, action, data, created_at | Audit trail of changes |

## Position Numbering Strategy

Smooth drag-and-drop reordering requires a position system that avoids renumbering all items on every move.

**Fractional indexing** (recommended):
- Assign positions as decimal numbers (e.g., 1.0, 2.0, 3.0)
- When inserting between 2.0 and 3.0, assign 2.5
- When inserting between 2.0 and 2.5, assign 2.25
- Periodically rebalance positions when precision gets too deep (after ~20 moves between the same pair)

**Gap-based integers** (simpler alternative):
- Start positions at 1000, 2000, 3000
- Insert between by averaging: (1000 + 2000) / 2 = 1500
- Rebalance when gaps shrink below a threshold

## Drag-and-Drop Implementation

1. **Optimistic update:** Move the card in the UI immediately on drop. Send the position update to the server in the background.
2. **Cross-list moves:** When a card moves to a different list, update both `list_id` and `position` in a single transaction.
3. **Real-time broadcast:** Notify all connected clients of the move so their boards update instantly (WebSocket or SSE).
4. **Conflict handling:** If two users move the same card simultaneously, last-write-wins on position is acceptable since the user can re-drag.

## Labels and Filtering

- Labels are board-scoped (not global). Each board defines its own color-coded labels.
- Cards can have multiple labels (many-to-many).
- Support filtering by label, assignee, and due date. Filters are URL-persisted so users can share filtered views.

## Activity Logs

Record every meaningful card change as an activity entry:
- Card created, moved, renamed, archived
- Member added or removed
- Label applied or removed
- Comment added
- Attachment uploaded

Store the action type and a JSON `data` field with before/after values. Render as a human-readable timeline on the card detail view.

## Swimlanes

Swimlanes add horizontal grouping across lists. Common groupings:
- By assignee (each person gets a row)
- By priority (high, medium, low rows)
- By label or category

Implement as a visual grouping layer over the existing data model rather than a separate database entity.

## Anti-Patterns

- Using array index as position (every insert renumbers all items)
- Missing optimistic updates (UI feels laggy on every drag)
- No activity log (users cannot see who changed what)
- Storing card order only in the frontend (lost on page reload)
- Allowing unlimited cards per list without pagination or virtualization
