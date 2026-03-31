---
id: SKL-0365
name: Symptom Checker Design
category: skills
tags: [symptom-checker, triage, decision-tree, medical, diagnosis, red-flags, clinical-logic, health]
capabilities: [symptom-triage-logic, decision-tree-design, red-flag-detection, medical-disclaimer-handling]
useWhen:
  - building a symptom checker or health triage feature
  - implementing medical decision tree logic
  - designing red flag detection for urgent symptoms
  - creating pre-visit intake questionnaires
  - adding self-assessment tools to a health application
estimatedTokens: 650
relatedFragments: [SKL-0357, SKL-0362, SKL-0364, PAT-0184]
dependencies: []
synonyms: ["how to build a symptom checker", "medical triage app design", "health self-assessment tool", "decision tree for symptoms", "when to see a doctor feature", "pre-visit symptom questionnaire"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Symptom Checker Design

A symptom checker helps users evaluate their symptoms and determine the appropriate level of care. It is not a diagnostic tool; it is a triage tool that suggests urgency levels: emergency, urgent care, schedule appointment, or self-care.

## Triage Output Levels

| Level | Description | Action | Color |
|-------|-------------|--------|-------|
| **Emergency** | Life-threatening symptoms | Call 911 or go to ER immediately | Red |
| **Urgent** | Needs medical attention within 24h | Visit urgent care or call doctor | Orange |
| **Appointment** | Should see a doctor but not urgently | Schedule an appointment this week | Yellow |
| **Self-Care** | Manageable at home | Provide home care guidance | Green |

## Decision Tree Architecture

```typescript
interface SymptomNode {
  id: string;
  question: string;               // 'Are you experiencing chest pain?'
  type: 'yes-no' | 'single-select' | 'multi-select' | 'numeric';
  options?: { label: string; value: string; nextNodeId: string }[];
  redFlags?: string[];            // Values that immediately escalate to Emergency
  nextNodeId?: string;            // Default next question
}

interface TriageResult {
  level: 'emergency' | 'urgent' | 'appointment' | 'self-care';
  possibleConditions: string[];   // Informational only, never diagnostic
  recommendations: string[];     // 'Apply ice for 20 minutes every 2 hours'
  disclaimer: string;
  shouldSeeDoctor: boolean;
  timeframe?: string;             // 'within 24 hours'
}

// Red flag detection runs at every step, not just at the end
function checkRedFlags(answers: Map<string, string>): boolean {
  const redFlagPatterns = [
    { symptom: 'chest-pain', with: 'shortness-of-breath' },
    { symptom: 'headache', qualifier: 'worst-ever' },
    { symptom: 'fever', qualifier: 'above-103' },
    { symptom: 'bleeding', qualifier: 'uncontrolled' },
  ];
  // If any red flag pattern matches, immediately return Emergency triage level
  return redFlagPatterns.some(flag => matchesPattern(answers, flag));
}
```

## Question Flow Design

Structure the flow from general to specific:

```
1. Chief complaint: "What's bothering you most?"
   → Select from common categories (head, chest, abdomen, skin, etc.)

2. Duration: "How long have you had this symptom?"
   → Hours / Days / Weeks / Months

3. Severity: "How would you rate the severity?"
   → 1-10 scale with descriptive anchors

4. Associated symptoms: "Are you also experiencing any of these?"
   → Multi-select checklist relevant to the chief complaint

5. Red flag screening: Specific questions that detect emergencies
   → "Is the pain the worst you've ever experienced?"
   → "Are you having difficulty breathing?"

6. Context: Age, relevant medical history, current medications
   → Pre-filled from user profile if available
```

## Disclaimers (Non-Negotiable)

Every symptom checker must include prominent disclaimers:

```typescript
const REQUIRED_DISCLAIMERS = {
  beforeStart: 'This tool provides general health information only. It does not diagnose conditions or replace professional medical advice.',
  withResults: 'These suggestions are based on the information you provided. Only a healthcare professional can provide a diagnosis.',
  emergency: 'If you are experiencing a medical emergency, call 911 (US) or your local emergency number immediately. Do not wait for this tool.',
  footer: 'This symptom checker is for informational purposes only and is not a qualified medical opinion.'
};
```

## Building the Knowledge Base

Do not attempt to build medical logic from scratch. Use established clinical resources:

- **NHS 111 pathways** (publicly documented triage logic)
- **Schmitt-Thompson triage protocols** (used by nurse call centers)
- **ICD-10 symptom codes** for standardized symptom categorization
- Partner with licensed clinical advisors for review of all triage logic

## UX Considerations

- Limit the flow to 8-12 questions maximum; users abandon long questionnaires
- Show a progress indicator so users know how many questions remain
- Allow going back to change previous answers
- Present results with clear next-step actions (not just information)
- Never show a list of "possible conditions" without context since users will assume the worst

## Key Takeaways

- A symptom checker triages urgency, it does not diagnose; make this distinction extremely clear
- Red flag detection must run at every step and immediately escalate to emergency guidance
- Use established clinical triage protocols rather than building medical logic from scratch
- Limit questionnaires to 8-12 questions with a progress indicator to prevent abandonment
- Prominent disclaimers before, during, and after the assessment are legally and ethically required
