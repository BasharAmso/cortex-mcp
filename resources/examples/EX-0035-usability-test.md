---
id: EX-0035
name: Usability Test Runner
category: examples
tags: [usability, testing, ux, sus, task-analysis, user-research, metrics, typescript]
capabilities: [task-based-testing, sus-scoring, usability-metrics]
useWhen:
  - running task-based usability tests with timing and success tracking
  - computing System Usability Scale (SUS) scores from questionnaire responses
  - analyzing usability test results across multiple participants
estimatedTokens: 640
relatedFragments: [SKL-0055, PAT-0043, PAT-0166]
dependencies: []
synonyms: ["usability test example", "sus calculator", "user testing framework", "task completion analysis", "ux testing tool"]
sourceUrl: "https://github.com/nicholasgasior/sus-calculator"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "ux-design"
---

# Usability Test Runner

Task-based usability testing with timing, success tracking, and SUS (System Usability Scale) scoring.

## Implementation

```typescript
// --- Data Model ---
interface UsabilityTask {
  id: string;
  description: string;
  successCriteria: string;
  maxTimeSeconds: number;
}

interface TaskResult {
  taskId: string;
  participantId: string;
  completed: boolean;
  timeSeconds: number;
  errors: number;
  assistanceRequests: number;
  notes: string;
}

interface SUSResponse {
  participantId: string;
  // 10 SUS questions, each scored 1-5 (strongly disagree to strongly agree)
  q1: number; q2: number; q3: number; q4: number; q5: number;
  q6: number; q7: number; q8: number; q9: number; q10: number;
}

interface ParticipantReport {
  participantId: string;
  taskCompletionRate: number;
  avgTimeSeconds: number;
  totalErrors: number;
  susScore: number;
}

// --- Task Runner ---
class UsabilityTestRunner {
  private tasks: UsabilityTask[] = [];
  private results: TaskResult[] = [];
  private susResponses: SUSResponse[] = [];

  addTask(task: UsabilityTask): void {
    this.tasks.push(task);
  }

  recordResult(result: TaskResult): void {
    this.results.push(result);
  }

  recordSUS(response: SUSResponse): void {
    this.susResponses.push(response);
  }

  // --- SUS Calculation ---
  // Odd questions (1,3,5,7,9): contribution = score - 1
  // Even questions (2,4,6,8,10): contribution = 5 - score
  // SUS = sum of contributions * 2.5 (scale 0-100)
  calculateSUS(response: SUSResponse): number {
    const scores = [
      response.q1, response.q2, response.q3, response.q4, response.q5,
      response.q6, response.q7, response.q8, response.q9, response.q10,
    ];

    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
      sum += i % 2 === 0 ? scores[i] - 1 : 5 - scores[i];
    }
    return sum * 2.5;
  }

  getSUSGrade(score: number): { grade: string; adjective: string } {
    if (score >= 84.1) return { grade: 'A+', adjective: 'Best imaginable' };
    if (score >= 80.8) return { grade: 'A', adjective: 'Excellent' };
    if (score >= 71.4) return { grade: 'B', adjective: 'Good' };
    if (score >= 50.9) return { grade: 'C', adjective: 'OK' };
    if (score >= 35.7) return { grade: 'D', adjective: 'Poor' };
    return { grade: 'F', adjective: 'Worst imaginable' };
  }

  // --- Per-Task Metrics ---
  getTaskMetrics(taskId: string): { completionRate: number; avgTime: number; avgErrors: number } {
    const taskResults = this.results.filter(r => r.taskId === taskId);
    if (taskResults.length === 0) return { completionRate: 0, avgTime: 0, avgErrors: 0 };

    const completed = taskResults.filter(r => r.completed).length;
    const avgTime = taskResults.reduce((s, r) => s + r.timeSeconds, 0) / taskResults.length;
    const avgErrors = taskResults.reduce((s, r) => s + r.errors, 0) / taskResults.length;

    return {
      completionRate: completed / taskResults.length,
      avgTime: Math.round(avgTime),
      avgErrors: Math.round(avgErrors * 10) / 10,
    };
  }

  // --- Participant Report ---
  getParticipantReport(participantId: string): ParticipantReport {
    const pResults = this.results.filter(r => r.participantId === participantId);
    const susResp = this.susResponses.find(s => s.participantId === participantId);

    const completed = pResults.filter(r => r.completed).length;
    const avgTime = pResults.reduce((s, r) => s + r.timeSeconds, 0) / (pResults.length || 1);
    const totalErrors = pResults.reduce((s, r) => s + r.errors, 0);

    return {
      participantId,
      taskCompletionRate: pResults.length > 0 ? completed / pResults.length : 0,
      avgTimeSeconds: Math.round(avgTime),
      totalErrors,
      susScore: susResp ? this.calculateSUS(susResp) : 0,
    };
  }

  // --- Aggregate Summary ---
  getSummary(): { avgSUS: number; grade: string; avgCompletion: number; problematicTasks: string[] } {
    const allSUS = this.susResponses.map(r => this.calculateSUS(r));
    const avgSUS = allSUS.length > 0 ? allSUS.reduce((a, b) => a + b, 0) / allSUS.length : 0;
    const { grade } = this.getSUSGrade(avgSUS);

    const participants = [...new Set(this.results.map(r => r.participantId))];
    const completionRates = participants.map(p => {
      const pr = this.results.filter(r => r.participantId === p);
      return pr.filter(r => r.completed).length / pr.length;
    });
    const avgCompletion = completionRates.reduce((a, b) => a + b, 0) / (completionRates.length || 1);

    const problematicTasks = this.tasks
      .filter(t => this.getTaskMetrics(t.id).completionRate < 0.7)
      .map(t => t.id);

    return { avgSUS: Math.round(avgSUS * 10) / 10, grade, avgCompletion, problematicTasks };
  }
}

// --- Usage ---
const runner = new UsabilityTestRunner();
runner.addTask({ id: 'T1', description: 'Create a new project', successCriteria: 'Project appears in list', maxTimeSeconds: 60 });
runner.addTask({ id: 'T2', description: 'Invite a team member', successCriteria: 'Invitation email sent', maxTimeSeconds: 45 });

runner.recordResult({ taskId: 'T1', participantId: 'P1', completed: true, timeSeconds: 32, errors: 0, assistanceRequests: 0, notes: '' });
runner.recordSUS({ participantId: 'P1', q1: 4, q2: 2, q3: 5, q4: 1, q5: 4, q6: 2, q7: 5, q8: 1, q9: 4, q10: 2 });

const summary = runner.getSummary();
console.log(`SUS: ${summary.avgSUS} (${summary.grade}), Completion: ${(summary.avgCompletion * 100).toFixed(0)}%`);
```

## Key Patterns

- **SUS scoring algorithm**: alternating odd/even formula converts 1-5 Likert responses to a 0-100 scale
- **Grade mapping**: converts raw SUS score to letter grades using Sauro-Lewis curved grading scale
- **Problematic task detection**: flags tasks with < 70% completion rate for UX redesign priority
- **Assistance tracking**: counts help requests per task to distinguish "hard but learnable" from "confusing"
