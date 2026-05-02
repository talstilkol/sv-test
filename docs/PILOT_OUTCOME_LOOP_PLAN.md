# Pilot Outcome Loop Plan — Real Learner Validation

> **Status**: Planned (Execute after Finish Line 1)  
> **Date**: 2026-05-01  
> **Trigger**: `finish-line:pre-release` shows 18/18 PASS  
> **Goal**: Validate learning outcomes with 10 real students

## Pilot Overview

| Parameter | Value |
|-----------|-------|
| **Cohort Size** | 10 real students |
| **Duration** | 7 days (D0 to D7) |
| **Prerequisites** | Finish Line 1 complete |
| **Success Criteria** | Measurable retention + mastery movement |

## Timeline

```
Day 0 (D0)          Day 1 (D1)          Day 7 (D7)
   │                   │                   │
   ▼                   ▼                   ▼
┌─────────┐       ┌─────────┐       ┌─────────┐
│ Baseline│       │Retention│       │  Final  │
│  Exam   │       │  Check  │       │  Exam   │
└─────────┘       └─────────┘       └─────────┘
      │                 │                 │
      └─────────────────┴─────────────────┘
                        │
            ┌───────────┴───────────┐
            │   Qualitative Review    │
            │  (Stuck events, feedback)
            └─────────────────────────┘
```

## Metrics to Collect

### Quantitative (Automatic)

| Metric | Definition | Collection | Target |
|--------|------------|------------|--------|
| **D1 Retention** | % who return within 24h | Login tracking | > 70% |
| **D7 Retention** | % who complete D7 exam | Exam completion | > 50% |
| **Module Mastery** | Avg level increase | Pre/post comparison | +1.5 levels |
| **Recovery Time** | Wrong→correct interval | Question timestamps | < 2 min |
| **Misconception Rate** | Repeated wrong answers | Error pattern analysis | < 20% |

### Qualitative (Manual)

| Signal | Method | Storage |
|--------|--------|---------|
| "Got Stuck" feedback | In-app button | Local only (no PII) |
| Free-form comments | Optional survey | Encrypted, anonymized |
| Usability issues | Observation notes | Researcher notes |

## Data Collection Schema

```typescript
interface PilotEvent {
  eventId: string;           // Anonymous UUID
  eventType: 'login' | 'exam_start' | 'exam_complete' | 
              'question_answer' | 'stuck_feedback' | 'module_complete';
  timestamp: ISO8601;
  studentId: string;         // Anonymized hash
  sessionId: string;         // Session UUID
  
  // Context (no PII)
  lessonId?: string;
  conceptName?: string;
  questionId?: string;
  isCorrect?: boolean;
  timeSpentSeconds?: number;
  
  // Stuck feedback (optional)
  stuckContext?: {
    reason: 'content_unclear' | 'question_hard' | 'ui_confusing' | 'other';
    freeText?: string;       // Only if explicitly provided
  };
}
```

## Success Criteria

### Primary (Must Achieve)

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| D1 Retention | ≥ 70% | 7 of 10 return |
| D7 Retention | ≥ 50% | 5 of 10 complete |
| Mastery Movement | ≥ +1 level | Pre/post comparison |

### Secondary (Nice to Have)

| Criterion | Threshold |
|-----------|-----------|
| Recovery Time | ≤ 2 minutes |
| Completion Rate | ≥ 60% finish at least one module |
| Satisfaction | ≥ 4/5 in exit survey |

## Data Handling Policy

### Privacy-First Approach

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Student Device        Local Storage       Export (Opt-in) │
│       │                     │                    │         │
│       ▼                     ▼                    ▼         │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐│
│  │ Anonymous   │      │ PilotEvents │      │ Researcher   ││
│  │ Events      │──────│ (local only)│──────│ Database     ││
│  │ (no PII)    │      │             │      │ (aggregated) ││
│  └─────────────┘      └─────────────┘      └─────────────┘│
│                                                             │
│  Principles:                                                │
│  • No names, emails, phone numbers                          │
│  • No learning answers stored externally                    │
│  • No precise location                                      │
│  • Aggregate only for analysis                              │
│  • Explicit opt-in for data export                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Missing Data Policy

Per **FWD-6.3**: כל נתון חסר נשאר `unknown/unavailable`

| Scenario | Handling |
|----------|----------|
| Student drops out | Retention = 0, other metrics = unknown |
| Technical error | Event = failed, retry = unknown |
| No feedback given | Qualitative = unavailable |
| Incomplete exam | Score = unavailable |

## Promotion Gate Update

Per **FWD-6.4**: עדכון שער קידום רק אחרי ראיות

```javascript
// Pseudocode for promotion decision
function canPromoteToPublic() {
  const evidence = {
    finishLineGates: checkGates(),        // Must be 18/18
    pilotCompletion: checkPilot(),          // Must be D7 complete
    d1Retention: getMetric('d1_retention'), // Must be ≥ 70%
    d7Retention: getMetric('d7_retention'), // Must be ≥ 50%
    masteryMovement: getMetric('mastery'),  // Must be ≥ +1
    qualitativeFeedback: getFeedback(),     // Reviewed
  };
  
  // No backfill for missing data
  for (const [key, value] of Object.entries(evidence)) {
    if (value === undefined || value === null) {
      return { canPromote: false, reason: `${key}: unknown/unavailable` };
    }
  }
  
  // All criteria must pass
  return {
    canPromote: evidence.d1Retention >= 0.70 && 
                evidence.d7Retention >= 0.50 && 
                evidence.masteryMovement >= 1.5,
    evidence
  };
}
```

## Research Ethics

### Informed Consent
- ✅ Clear explanation of data collection
- ✅ Voluntary participation
- ✅ Right to withdraw anytime
- ✅ Data deletion on request

### Risk Mitigation
- No academic penalties for participation
- No financial compensation (avoid coercion)
- Support contact provided
- Mental health resources if stress arises

## Verification Checklist

Before launching pilot:
- [ ] IRB/ethics approval (if required)
- [ ] Consent mechanism implemented
- [ ] Data anonymization tested
- [ ] Export pipeline secured
- [ ] Opt-out mechanism works
- [ ] Support contacts active

After pilot:
- [ ] All metrics calculated
- [ ] Missing data documented as `unknown`
- [ ] Qualitative feedback reviewed
- [ ] Promotion decision made
- [ ] Report written with caveats

## Dependencies

- ✅ Finish Line 1 complete (18/18 gates)
- ✅ Content stable (no changes during pilot)
- ✅ Tech infrastructure stable
- ⏸️ Ethics approval (if applicable)
- ⏸️ 10 volunteer students recruited

## Commands

```bash
# Generate pilot report
npm run pilot:report:write

# Export anonymized data
npm run pilot:export:anonymous

# Verify metrics calculation
npm run pilot:metrics:verify
```

## Report Template

```markdown
# Pilot Outcome Report — [Date]

## Executive Summary
- Cohort: 10 students
- Completion: X/10 (X%)
- D1 Retention: X% (target: 70%)
- D7 Retention: X% (target: 50%)

## Quantitative Results
| Metric | Result | Target | Status |
|--------|--------|--------|--------|
| D1 Retention | X% | ≥70% | ? |
| D7 Retention | X% | ≥50% | ? |
| Mastery | +X | ≥+1.5 | ? |
| Recovery | X min | ≤2 min | ? |

## Qualitative Insights
- Key themes from stuck feedback
- UI friction points
- Content gaps identified

## Missing Data
| Student | Missing | Reason |
|---------|---------|--------|
| S3 | D7 exam | Dropped out |
| S7 | Qualitative | No feedback given |

## Recommendation
- [ ] Proceed to public release
- [ ] Address issues and re-pilot
- [ ] Gather more data (extend pilot)

## Caveats
- Small sample size (n=10)
- Self-selected cohort
- Short duration (7 days)
```
