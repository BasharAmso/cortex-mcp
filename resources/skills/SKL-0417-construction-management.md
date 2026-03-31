---
id: SKL-0417
name: Construction Management
category: skills
tags: [construction, project-tracking, rfi, punch-list, scheduling, field-management]
capabilities: [construction-project-tracking, rfi-management, punch-list-workflow, schedule-coordination]
useWhen:
  - building a construction project management platform
  - tracking RFIs, submittals, and change orders
  - managing punch lists and field inspections
  - coordinating construction schedules across trades
  - handling project documentation and compliance
estimatedTokens: 650
relatedFragments: [PAT-0213, PAT-0214, PAT-0215, SKL-0420]
dependencies: []
synonyms: ["how to build construction management software", "RFI tracking system", "punch list app", "construction scheduling tool", "field management platform", "construction project tracker"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Skill: Construction Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0417 |
| **Name** | Construction Management |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Construction management software coordinates complex projects involving multiple trades, tight schedules, regulatory compliance, and field-to-office communication. The domain operates on drawings, specifications, and structured communication workflows.

### Project Structure

Construction projects have a hierarchy: project, phases, tasks, and daily logs. Key documents flow between stakeholders: owners, general contractors, subcontractors, architects, and engineers. Every document exchange needs tracking, timestamps, and accountability.

| Entity | Purpose |
|--------|---------|
| **Project** | Top-level container with budget, schedule, location |
| **RFI** | Request for Information: clarify design intent |
| **Submittal** | Product data sent for architect approval |
| **Change Order** | Scope/cost modification requiring approval |
| **Punch List** | Deficiency items to fix before completion |
| **Daily Log** | Weather, crew counts, work completed, issues |

### RFI Workflow

RFIs are the primary communication mechanism. A subcontractor identifies an ambiguity, submits an RFI to the GC, who routes it to the architect. Track: creation date, due date, ball-in-court (who must respond), and status (open, answered, closed). Overdue RFIs are a leading indicator of schedule delays. Average response time should be tracked as a project health metric.

### Scheduling

Construction schedules use Critical Path Method (CPM). Tasks have predecessors, durations, and resource assignments. The critical path identifies the longest sequence of dependent tasks. Delays on the critical path delay the project. Use Gantt charts for visualization. Track planned vs actual progress. Support schedule updates with baseline comparison.

### Punch Lists and Inspections

Near project completion, generate punch lists from field inspections. Each item has a location (floor, room, area), description, photo, responsible party, and status. Mobile capture is essential: field workers photograph issues and log them on-site. Items flow through a lifecycle: identified, assigned, in progress, completed, verified.

### Field-to-Office Communication

Construction demands offline-capable mobile tools. Field workers need access to current drawings, specs, and schedules in areas with limited connectivity. Sync when connected. Support photo markup on drawings. Daily logs capture weather, crew size, equipment, and work completed.

## Key Takeaways

- Track RFIs with ball-in-court status and response time metrics
- Use Critical Path Method for scheduling with baseline comparisons
- Punch list items need photo capture, location tagging, and mobile support
- Design for offline-first mobile access in the field
- Every document exchange requires timestamp and accountability tracking
