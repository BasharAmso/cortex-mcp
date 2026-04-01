---
id: SKL-0181
name: Employee Scheduling
category: skills
tags: [scheduling, shifts, employees, availability, time-off, small-business]
capabilities: [shift-scheduling, availability-management, time-off-tracking, overtime-rules]
useWhen:
  - building a shift scheduling system for hourly employees
  - managing staff availability and time-off requests
  - preventing scheduling conflicts and overtime violations
  - allowing employees to swap or pick up shifts
  - generating weekly schedules for a small business team
estimatedTokens: 650
relatedFragments: [SKL-0177, PAT-0094, SKL-0182, EX-0050]
dependencies: []
synonyms: ["how do I schedule employee shifts automatically", "how to manage staff availability and time off", "what is the best way to handle shift swaps", "how do I prevent overtime when scheduling", "how to build a weekly schedule for my team", "how do I let employees set their availability", "staff shift planner", "who works when"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/calcom/cal.com"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Employee Scheduling

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0181 |
| **Name** | Employee Scheduling |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Employee scheduling for small businesses (restaurants, salons, retail, coffee shops) means filling shifts with the right people while respecting availability, overtime rules, and fairness. Cal.com's availability engine provides a foundation — defining when someone is available and computing open slots.

### Data Model

Core entities: **Employees** (name, role, skills/certifications, max weekly hours), **Availability** (recurring weekly windows per employee, e.g., "Mon-Wed 8am-4pm"), **Time-Off Requests** (date range, status: pending/approved/denied), **Shifts** (date, start time, end time, role needed, assigned employee), and **Schedule** (a collection of shifts for a given week).

### Availability-First Scheduling

Start by collecting each employee's availability windows — the days and hours they can work. Cal.com models this as recurring weekly rules with date-specific overrides. When building a schedule, only offer shifts to employees who are available during that window. This eliminates the back-and-forth of "can you work Tuesday?"

### Constraint Enforcement

Apply rules automatically: **maximum hours per week** (prevent overtime liability), **minimum rest between shifts** (no closing then opening — the "clopening" problem), **role requirements** (at least one certified barista per coffee shop shift), and **fairness distribution** (rotate weekend shifts evenly). Flag violations before the schedule is published, not after.

### Time-Off Management

Employees submit time-off requests through the system. Managers approve or deny with one tap. Approved time-off automatically blocks those dates from scheduling. Track accrued PTO balances if applicable. A calendar view showing all approved time-off helps managers see coverage gaps before building the schedule.

### Shift Swaps and Open Shifts

After a schedule is published, allow employees to request swaps (trade shifts with a coworker) or drop shifts (post to an open board for others to claim). Require manager approval for swaps to maintain coverage requirements. Push notifications alert eligible employees when an open shift is available.

### Schedule Publishing

Publish the weekly schedule at a consistent time (e.g., Thursday for the following week). Notify all employees via SMS or app push. Provide calendar export (iCal) so shifts appear alongside personal events. Cal.com's calendar sync patterns apply directly here — store in UTC, display in local time.

## Key Takeaways

- Collect availability first, then schedule — eliminates negotiation loops
- Enforce overtime and rest-period rules at schedule creation, not after violations
- Shift swap boards with manager approval give employees flexibility without chaos
- Publish schedules consistently and push to employee phones
- Calendar sync (iCal/Google) reduces "I didn't see the schedule" no-shows
