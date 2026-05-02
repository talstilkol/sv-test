# Question Writing Priority Queue

> **Source**: SVCollege Student Readiness Export weak counters  
> **Date**: 2026-05-01  
> **Purpose**: Prioritize manual question authoring based on learner impact

## Weak Counters Summary

| Counter | Count | Impact | Priority |
|---------|-------|--------|----------|
| Without questions | 129 | High — no assessment coverage | P0 |
| Without hard question | 168 | High — no mastery challenge | P0 |
| Code concepts without proof | 140 | High — no code activity | P1 |

## Priority Queue

### 🔴 P0 — Critical (No Assessment)
These concepts have zero questions and block learner progression tracking.

**Top 10 by Risk Score:**
1. `react_blueprint::Performance Optimization` — Risk: 172
2. `react_blueprint::State Management` — Risk: 170
3. `lesson_25::add/delete movie` — Risk: 169
4. `react_blueprint::Composition vs Inheritance` — Risk: 168
5. `react_blueprint::Code Splitting` — Risk: 168
6. `react_blueprint::Container vs Presentational` — Risk: 166
7. `react_blueprint::Data Flow` — Risk: 165
8. `react_blueprint::Error Boundaries` — Risk: 164
9. `react_blueprint::Lifting State Up` — Risk: 163
10. `react_blueprint::Testing Strategies` — Risk: 162

**Action**: Write 3 MC + 2 Fill per concept minimum.

### 🟡 P1 — High (No Hard Questions)
These concepts have basic coverage but lack level 6-7 (professor) questions.

**Criteria**: 
- Has at least 1 question (not empty)
- No question at level 6 or 7
- Has concept enrichment or code blocks

**Recommended approach**:
1. Identify concepts with `needsCodeProof: true`
2. Write hard MC with deep distractors
3. Write Fill with multi-step reasoning

### 🟢 P2 — Medium (No Code Proof)
Code concepts lacking Trace/Build/Bug activities.

**Categories**:
- **Trace**: Code execution flow questions
- **Build**: Implementation tasks
- **Bug**: Debugging scenarios

## Batch Assignment

### Immediate (Next 48 hours)
- **QMAN-PRIORITY-001**: react_blueprint concepts (10 concepts)
  - Target: 30 MC, 20 Fill
  - Owner: unknown/unavailable
  - Reviewer: unknown/unavailable
  
### Week 1
- **QMAN-PRIORITY-002**: lesson_25 Tailwind concepts (5 concepts)
- **QMAN-PRIORITY-003**: lesson_11-13 remaining gaps (20 concepts)

### Week 2
- **QMAN-PRIORITY-004**: Code proof activities (15 trace, 10 build, 10 bug)

## Integration with Existing Plan

This priority queue **feeds into** [MANUAL_QUESTION_AUTHORING_PLAN.md](../MANUAL_QUESTION_AUTHORING_PLAN.md):

- QMAN-001 series (HTML/CSS/Lesson 11-15) continues as planned
- Priority concepts from weak counters get **accelerated track**
- After SVCollege release, address remaining 222 non-priority gaps

## Verification Gates per Batch

Every batch must pass:
1. ✅ `validate:strict`
2. ✅ `qa:questions:strict`
3. ✅ `quality:questions:strict`
4. ✅ `questions:reuse-audit:strict`
5. ✅ Manual review against source lesson material
6. ✅ `optionFeedback` complete for all MC (if P0)

## Success Metrics

- Target: Reduce `withoutQuestions` from 129 → 0
- Target: Reduce `withoutHardQuestion` from 168 → <50
- Target: Reduce `codeConceptsWithoutProof` from 140 → <30
- Deadline: Pre-exam week (2 weeks before exam date)

## Commands

```bash
# Generate updated priority queue
npm run svcollege:student-export:strict

# Verify coverage after writing
npm run questions:coverage-targets:strict

# Check quality gates
npm run quality:questions:strict
```
