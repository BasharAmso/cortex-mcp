---
id: EX-0039
name: Kanban Board
category: examples
tags: [kanban, task-management, board, wip-limits, swimlanes, drag-drop, collaboration, typescript]
capabilities: [column-operations, wip-limit-enforcement, swimlane-grouping]
useWhen:
  - building a kanban board with column-based task management
  - enforcing WIP limits to prevent work overload
  - implementing drag-and-drop card movement with position tracking
estimatedTokens: 640
relatedFragments: [PAT-0078, SKL-0375, SKL-0152]
dependencies: []
synonyms: ["kanban example", "task board implementation", "project board", "work in progress board", "card-based task manager"]
sourceUrl: "https://github.com/wekan/wekan"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "collaboration"
---

# Kanban Board

Task board with columns, WIP limit enforcement, swimlanes, and card movement operations.

## Implementation

```typescript
import { randomUUID } from 'crypto';

// --- Data Model ---
interface Card {
  id: string;
  title: string;
  description: string;
  assigneeId?: string;
  labels: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  columnId: string;
  swimlaneId: string;
  position: number;      // sort order within column
  createdAt: Date;
  updatedAt: Date;
}

interface Column {
  id: string;
  name: string;
  position: number;
  wipLimit: number;      // 0 = no limit
  isDoneColumn: boolean;
}

interface Swimlane {
  id: string;
  name: string;
  position: number;
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
  swimlanes: Swimlane[];
  cards: Card[];
}

// --- Board Operations ---
class KanbanBoard {
  private board: Board;

  constructor(name: string, columnNames: string[], wipLimits: number[] = []) {
    this.board = {
      id: randomUUID(),
      name,
      columns: columnNames.map((col, i) => ({
        id: `col-${i}`,
        name: col,
        position: i,
        wipLimit: wipLimits[i] ?? 0,
        isDoneColumn: i === columnNames.length - 1,
      })),
      swimlanes: [{ id: 'default', name: 'Default', position: 0 }],
      cards: [],
    };
  }

  // --- Card CRUD ---
  addCard(title: string, columnId: string, options?: Partial<Pick<Card, 'description' | 'assigneeId' | 'labels' | 'priority' | 'swimlaneId'>>): Card {
    const column = this.board.columns.find(c => c.id === columnId);
    if (!column) throw new Error(`Column ${columnId} not found`);

    this.checkWipLimit(column);

    const cardsInColumn = this.getColumnCards(columnId);
    const card: Card = {
      id: randomUUID(),
      title,
      description: options?.description ?? '',
      assigneeId: options?.assigneeId,
      labels: options?.labels ?? [],
      priority: options?.priority ?? 'medium',
      columnId,
      swimlaneId: options?.swimlaneId ?? 'default',
      position: cardsInColumn.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.board.cards.push(card);
    return card;
  }

  // --- Move Card ---
  moveCard(cardId: string, targetColumnId: string, targetPosition?: number): void {
    const card = this.board.cards.find(c => c.id === cardId);
    if (!card) throw new Error(`Card ${cardId} not found`);

    const targetColumn = this.board.columns.find(c => c.id === targetColumnId);
    if (!targetColumn) throw new Error(`Column ${targetColumnId} not found`);

    // Check WIP limit on target (only if moving to a different column)
    if (card.columnId !== targetColumnId) {
      this.checkWipLimit(targetColumn);
    }

    // Remove from old position
    const oldColumnCards = this.getColumnCards(card.columnId).filter(c => c.id !== cardId);
    oldColumnCards.forEach((c, i) => (c.position = i));

    // Insert at new position
    card.columnId = targetColumnId;
    const newColumnCards = this.getColumnCards(targetColumnId).filter(c => c.id !== cardId);
    const insertAt = targetPosition ?? newColumnCards.length;
    card.position = insertAt;

    // Shift cards below the insertion point
    for (const c of newColumnCards) {
      if (c.position >= insertAt) c.position++;
    }
    card.updatedAt = new Date();
  }

  // --- WIP Limit Enforcement ---
  private checkWipLimit(column: Column): void {
    if (column.wipLimit === 0) return; // no limit
    const count = this.getColumnCards(column.id).length;
    if (count >= column.wipLimit) {
      throw new Error(
        `WIP limit reached: "${column.name}" has ${count}/${column.wipLimit} cards. Complete or move existing work first.`,
      );
    }
  }

  // --- Swimlane Management ---
  addSwimlane(name: string): Swimlane {
    const swimlane: Swimlane = {
      id: randomUUID(),
      name,
      position: this.board.swimlanes.length,
    };
    this.board.swimlanes.push(swimlane);
    return swimlane;
  }

  // --- Queries ---
  getColumnCards(columnId: string): Card[] {
    return this.board.cards
      .filter(c => c.columnId === columnId)
      .sort((a, b) => a.position - b.position);
  }

  getCardsByAssignee(assigneeId: string): Card[] {
    return this.board.cards.filter(c => c.assigneeId === assigneeId);
  }

  // --- Board Metrics ---
  getMetrics(): { totalCards: number; byColumn: Record<string, number>; wipViolations: string[]; avgLeadTimeDays: number } {
    const byColumn: Record<string, number> = {};
    const violations: string[] = [];

    for (const col of this.board.columns) {
      const count = this.getColumnCards(col.id).length;
      byColumn[col.name] = count;
      if (col.wipLimit > 0 && count > col.wipLimit) {
        violations.push(`${col.name}: ${count}/${col.wipLimit}`);
      }
    }

    // Lead time: creation to done column
    const doneCol = this.board.columns.find(c => c.isDoneColumn);
    const doneCards = doneCol ? this.getColumnCards(doneCol.id) : [];
    const leadTimes = doneCards.map(c =>
      (c.updatedAt.getTime() - c.createdAt.getTime()) / 86_400_000,
    );
    const avgLeadTime = leadTimes.length > 0
      ? leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length
      : 0;

    return {
      totalCards: this.board.cards.length,
      byColumn,
      wipViolations: violations,
      avgLeadTimeDays: Math.round(avgLeadTime * 10) / 10,
    };
  }
}

// --- Usage ---
const board = new KanbanBoard(
  'Sprint Board',
  ['Backlog', 'In Progress', 'Review', 'Done'],
  [0, 3, 2, 0], // WIP limits: no limit on Backlog/Done, 3 for In Progress, 2 for Review
);

board.addCard('Design login page', 'col-0', { priority: 'high', labels: ['frontend'] });
board.addCard('Set up CI pipeline', 'col-0', { priority: 'medium', labels: ['devops'] });

board.moveCard(board.getColumnCards('col-0')[0].id, 'col-1');

const metrics = board.getMetrics();
console.log(`Total: ${metrics.totalCards}, In Progress: ${metrics.byColumn['In Progress']}`);
console.log(`WIP violations: ${metrics.wipViolations.length > 0 ? metrics.wipViolations.join(', ') : 'none'}`);
```

## Key Patterns

- **WIP limit enforcement**: throws on column overflow, forcing teams to finish work before starting new items
- **Position-based ordering**: integer positions enable drag-and-drop reordering without gaps
- **Swimlane grouping**: horizontal lanes separate work by team, epic, or priority class
- **Lead time tracking**: measures creation-to-done duration for continuous improvement metrics
- **Done column detection**: last column is automatically treated as the completion state for metrics
