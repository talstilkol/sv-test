# Manual Question Writing Breakdown by Module

> **Date**: 2026-05-01  
> **Status**: Planning Aid for Manual Authors  
> **Purpose**: Organize remaining gaps by SVCollege module for batch planning

## Overview

| Metric | Value |
|--------|-------|
| Total MC Gaps | 420 |
| Total Fill Gaps | 424 |
| Total Questions Needed | ~2,000 (1,202 MC + 784 Fill) |
| Modules with Gaps | 15 |

## Module Breakdown

### 🔴 Priority 1: Core JavaScript (Lessons 11-15)

These modules have the highest learner impact and should be completed first.

#### Module: HTML/CSS Foundation (Lesson 11)
- **MC Gaps**: ~35
- **Fill Gaps**: ~38
- **Priority**: P0 — Foundation concepts
- **Complexity**: Low-Medium
- **Batch Suggestion**: QMAN-003A through QMAN-003D

#### Module: JavaScript Basics (Lesson 12)
- **MC Gaps**: ~42
- **Fill Gaps**: ~45
- **Priority**: P0 — Core language
- **Complexity**: Medium
- **Batch Suggestion**: QMAN-004A through QMAN-004E

#### Module: Modern JavaScript (Lesson 13) — IN PROGRESS
- **MC Gaps**: ~30 (out of original ~70)
- **Fill Gaps**: ~28 (out of original ~68)
- **Priority**: P0 — ES6+ features
- **Complexity**: Medium-High
- **Status**: Several batches completed (QMAN-001D through QMAN-001R)
- **Remaining**: DOM manipulation, async concepts

#### Module: Advanced JavaScript (Lesson 14)
- **MC Gaps**: ~48
- **Fill Gaps**: ~52
- **Priority**: P0 — Closures, prototypes, async
- **Complexity**: High
- **Batch Suggestion**: QMAN-005A through QMAN-005F

#### Module: Error Handling & Async (Lesson 15) — IN PROGRESS
- **MC Gaps**: ~15 (out of original ~40)
- **Fill Gaps**: ~12 (out of original ~35)
- **Priority**: P0 — Critical for exam
- **Complexity**: High
- **Status**: QMAN-001 batches cover many concepts
- **Remaining**: Advanced Promise patterns, error types

### 🟡 Priority 2: React & Framework (Lessons 25-27)

#### Module: React Basics (Lesson 25)
- **MC Gaps**: ~55
- **Fill Gaps**: ~58
- **Priority**: P1 — Framework foundation
- **Complexity**: Medium-High
- **Batch Suggestion**: QMAN-006A through QMAN-006H

#### Module: React Advanced (Lesson 26)
- **MC Gaps**: ~62
- **Fill Gaps**: ~65
- **Priority**: P1 — Hooks, patterns
- **Complexity**: High
- **Batch Suggestion**: QMAN-007A through QMAN-007J

#### Module: React Patterns (Lesson 27)
- **MC Gaps**: ~48
- **Fill Gaps**: ~50
- **Priority**: P1 — Design patterns
- **Complexity**: High
- **Batch Suggestion**: QMAN-008A through QMAN-008F

### 🟢 Priority 3: Tooling & Advanced Topics

#### Module: AI Development
- **MC Gaps**: ~35
- **Fill Gaps**: ~30
- **Priority**: P2 — Emerging topic
- **Complexity**: Medium
- **Batch Suggestion**: QMAN-009A through QMAN-009D

#### Module: Node.js & Backend
- **MC Gaps**: ~28
- **Fill Gaps**: ~25
- **Priority**: P2 — Full-stack context
- **Complexity**: Medium-High

#### Module: Testing
- **MC Gaps**: ~22
- **Fill Gaps**: ~20
- **Priority**: P2 — Quality assurance
- **Complexity**: Medium

#### Module: Performance
- **MC Gaps**: ~18
- **Fill Gaps**: ~16
- **Priority**: P2 — Optimization
- **Complexity**: Medium-High

#### Module: Security
- **MC Gaps**: ~15
- **Fill Gaps**: ~12
- **Priority**: P2 — Best practices
- **Complexity**: Medium

#### Module: Design Patterns
- **MC Gaps**: ~20
- **Fill Gaps**: ~18
- **Priority**: P2 — Architecture
- **Complexity**: High

#### Module: System Design
- **MC Gaps**: ~12
- **Fill Gaps**: ~10
- **Priority**: P2 — Advanced concepts
- **Complexity**: High

## Batch Planning Template

### Example: QMAN-003A (HTML/CSS Foundation - Part A)

```markdown
## QMAN-003A — HTML/CSS Foundation

### Scope
- Concepts: semantic HTML, block vs inline, forms
- MC Target: 12 questions
- Fill Target: 10 questions

### Assignment
- **Owner**: [To be assigned]
- **Reviewer**: [To be assigned]
- **Due Date**: [To be set]

### Source Materials
- Lesson 11, sections 1-3
- HTML specification (MDN)
- CSS specification (MDN)

### Quality Gates
- [ ] validate:strict — PASS
- [ ] qa:questions:strict — PASS
- [ ] quality:questions:strict — PASS
- [ ] questions:reuse-audit:strict — PASS
- [ ] Coverage reduced by expected amount

### Questions Written
| # | Concept | Type | Status |
|---|---------|------|--------|
| 1 | semantic HTML | MC | [ ] Draft |
| 2 | semantic HTML | Fill | [ ] Draft |
| ... | ... | ... | ... |
```

## Author Assignment Strategy

### Phase 1: Foundation (Weeks 1-2)
| Batch | Module | Owner | Reviewer | Est. Hours |
|-------|--------|-------|----------|-----------|
| QMAN-003A | HTML/CSS | TBD | TBD | 8 |
| QMAN-003B | HTML/CSS | TBD | TBD | 8 |
| QMAN-004A | JS Basics | TBD | TBD | 10 |
| QMAN-004B | JS Basics | TBD | TBD | 10 |

### Phase 2: Core JS (Weeks 3-6)
| Batch | Module | Owner | Reviewer | Est. Hours |
|-------|--------|-------|----------|-----------|
| QMAN-005A | Advanced JS | TBD | TBD | 12 |
| QMAN-005B | Advanced JS | TBD | TBD | 12 |
| QMAN-005C | Advanced JS | TBD | TBD | 12 |
| QMAN-001S | Modern JS (cont.) | TBD | TBD | 10 |

### Phase 3: React (Weeks 7-12)
| Batch | Module | Owner | Reviewer | Est. Hours |
|-------|--------|-------|----------|-----------|
| QMAN-006A | React Basics | TBD | TBD | 12 |
| QMAN-006B | React Basics | TBD | TBD | 12 |
| QMAN-007A | React Advanced | TBD | TBD | 14 |
| QMAN-007B | React Advanced | TBD | TBD | 14 |

### Phase 4: Advanced Topics (Weeks 13-16)
| Batch | Module | Owner | Reviewer | Est. Hours |
|-------|--------|-------|----------|-----------|
| QMAN-009A | AI Development | TBD | TBD | 10 |
| QMAN-010A | Testing | TBD | TBD | 8 |
| ... | ... | ... | ... | ... |

## Progress Tracking

### Weekly Targets
| Week | MC Target | Fill Target | Cumulative MC | Cumulative Fill |
|------|-----------|-------------|---------------|-----------------|
| 1 | 50 | 40 | 50 | 40 |
| 2 | 60 | 50 | 110 | 90 |
| 3 | 70 | 60 | 180 | 150 |
| 4 | 70 | 60 | 250 | 210 |
| 5 | 80 | 70 | 330 | 280 |
| 6 | 80 | 70 | 410 | 350 |
| 7 | 80 | 70 | 490 | 420 |
| 8 | 80 | 70 | 570 | 490 |
| 9+ | Continue | Continue | → 1202 | → 784 |

### Success Criteria
- Week 4: HTML/CSS + JS Basics complete
- Week 8: Advanced JS + Lesson 15 complete
- Week 12: React complete
- Week 16: All remaining modules complete

## Resource Requirements

### Authors Needed
- **Minimum**: 2 full-time authors (10h/week each)
- **Optimal**: 4 authors (5h/week each)
- **Reviewers**: 2 reviewers (5h/week each)

### Skills Required
- Strong JavaScript knowledge (ES6+)
- React experience
- HTML/CSS fundamentals
- Understanding of assessment design
- Attention to detail for distractor quality

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Authors unavailable | Maintain waiting list, cross-train |
| Quality issues | Mandatory review process, sample checks |
| Scope creep | Strict batch boundaries, no additions |
| Burnout | Reasonable weekly targets, rotate topics |
| Exam deadline | Prioritize P0 modules, defer P2 if needed |

## Next Steps

1. **Recruit authors** for QMAN-003A through QMAN-005C
2. **Assign reviewers** with subject matter expertise
3. **Schedule kickoff** meeting for process alignment
4. **Create batch tracking** spreadsheet
5. **Begin Week 1** on agreed start date

---

**Total Estimated Effort**: ~400-500 hours of authoring + ~100 hours of review
