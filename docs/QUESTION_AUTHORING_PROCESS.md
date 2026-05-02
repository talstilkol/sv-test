# Question Authoring Process — Manual Writing Guidelines

> **Status**: Active Process  
> **Date**: 2026-05-01  
> **Applies to**: All QMAN batches  
> **Goal**: Consistent, high-quality manual questions

## Process Overview

```
┌─────────────────────────────────────────────────────────────┐
│              MANUAL QUESTION AUTHORING PIPELINE            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. SOURCE REVIEW        2. QUESTION WRITING              │
│     ├── Check lesson        ├── Write 3-5 MC             │
│     ├── Review concept        ├── Write 2-3 Fill         │
│     └── Verify enrichment     └── Add optionFeedback      │
│                                                             │
│  3. SELF REVIEW          4. QUALITY GATES                  │
│     ├── Read aloud            ├── validate:strict        │
│     ├── Check ambiguity       ├── qa:questions:strict      │
│     └── Verify source         ├── quality:questions:strict│
│                               └── questions:reuse-audit:  │
│                                                             │
│  5. BATCH COMPLETION     6. REVIEWER ASSIGNMENT            │
│     ├── Mark [V] if all       ├── Assign owner/reviewer   │
│     │   gates pass            └── Update MANUAL_QUESTION_   │
│     └── Update gap counts       AUTHORING_PLAN.md          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Source Review (FWD-2.3)

### Checklist

- [ ] Reviewed source lesson material
- [ ] Identified key concepts
- [ ] Verified concept enrichment exists
- [ ] Checked for existing questions (avoid duplication)
- [ ] Understood prerequisite concepts

### Example

```markdown
## Source: lesson_14::DOM Manipulation

### Concepts to Cover:
- querySelector (3 MC, 2 Fill)
- querySelectorAll (3 MC, 2 Fill)
- createElement (3 MC, 2 Fill)
- appendChild (3 MC, 2 Fill)

### Enrichment Check:
- [✅] Code examples present
- [✅] Visual diagrams included
- [✅] One-liner definitions clear
```

## Phase 2: Question Writing

### MC Questions — Requirements (FWD-2.5)

| Requirement | Check |
|-------------|-------|
| 4 options (A/B/C/D) | [ ] |
| Exactly 1 correct | [ ] |
| Plausible distractors | [ ] |
| No "all of the above" | [ ] |
| No negative phrasing | [ ] |
| **optionFeedback for all options** | [ ] |

#### optionFeedback Template

```javascript
{
  questionId: "l14_dom_001",
  stem: "What does querySelector return?",
  options: [
    { id: "A", text: "An array of elements" },
    { id: "B", text: "The first matching element" },
    { id: "C", text: "A boolean" },
    { id: "D", text: "The last matching element" }
  ],
  correct: "B",
  // optionFeedback required for all MC
  optionFeedback: {
    "A": "querySelector returns a single element, not an array. querySelectorAll returns a NodeList.",
    "B": "✓ Correct! querySelector returns the first element matching the selector.",
    "C": "querySelector returns an element object, not a boolean. You might be thinking of methods like matches().",
    "D": "querySelector returns the first match, not the last. To get the last, you'd need different logic."
  }
}
```

### Fill Questions — Requirements (FWD-2.6)

| Requirement | Check |
|-------------|-------|
| Exactly 1 blank | [ ] |
| Blank is critical word | [ ] |
| No answer in question | [ ] |
| Hint doesn't reveal answer | [ ] |
| Multiple valid answers handled | [ ] |

#### Single Blank Rule

```javascript
// ✅ GOOD: Single blank, critical concept
{
  type: "fill",
  stem: "The method _______ returns the first element matching a CSS selector.",
  answer: ["querySelector", "document.querySelector"],
  hint: "This method takes a selector string as its parameter."
}

// ❌ BAD: Multiple blanks
{
  type: "fill",
  stem: "The _______ method with selector _______ returns the first element.",
  answer: ["querySelector", ".class"]
  // DON'T DO THIS - violates FWD-2.6
}
```

#### No Answer Leak Rule

```javascript
// ✅ GOOD: Answer not in question
{
  stem: "Which method creates a new DOM element?",
  answer: "createElement"
}

// ❌ BAD: Answer leaked
{
  stem: "The createElement method creates a new _______ element.",
  answer: "DOM"
  // DON'T DO THIS - "createElement" is in the stem!
}
```

## Phase 3: Self Review

### Read Aloud Test
1. Read question stem out loud
2. Does it make sense?
3. Is it unambiguous?
4. Can you answer without seeing options? (for MC)

### Source Verification
- [ ] Answer is in source material
- [ ] Concept is correctly represented
- [ ] Difficulty matches level (1-7)
- [ ] No cultural bias

## Phase 4: Quality Gates (FWD-2.4)

### Required Commands

Every batch **must** pass:

```bash
# 1. Validation
npm run validate:strict
# Check: syntax, structure, IDs unique

# 2. QA
npm run qa:questions:strict
# Check: answers correct, options valid

# 3. Quality
npm run quality:questions:strict
# Check: no ambiguity, no length cues

# 4. Reuse Audit
npm run questions:reuse-audit:strict
# Check: no duplication across bank

# 5. Coverage
npm run questions:coverage-targets:strict
# Check: gap counts reduced
```

### Gate Results Interpretation

| Result | Action |
|--------|--------|
| All green | Proceed to batch completion |
| Yellow (warnings) | Fix if possible, document if not |
| Red (blockers) | **Must fix before proceeding** |

## Phase 5: Batch Completion

### Status Update Template

```markdown
## QMAN-00X — [Concept Name]

- [V] Source reviewed
- [V] Questions written (X MC, Y Fill)
- [V] optionFeedback complete for all MC
- [V] validate:strict — PASS
- [V] qa:questions:strict — PASS
- [V] quality:questions:strict — PASS
- [V] questions:reuse-audit:strict — PASS
- [V] Coverage targets updated

**Owner**: [name]
**Reviewer**: [name or unknown/unavailable]
**Date**: 2026-XX-XX
```

## Phase 6: Reviewer Assignment (FWD-2.8)

### Criteria for Reviewer

1. **Subject matter expert** — knows the content
2. **Not the author** — fresh perspective
3. **Available** — can review within 48h
4. **Trained** — knows quality criteria

### Assignment Template

```markdown
| Batch | Owner | Reviewer | Status |
|-------|-------|----------|--------|
| QMAN-001A | Alice | Bob | Ready for review |
| QMAN-001B | Alice | unknown/unavailable | Needs reviewer |
```

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| "All of the above" option | Remove, use specific correct answer |
| Fill with multiple blanks | Split into separate questions |
| Answer leaked in stem | Rewrite stem to be more general |
| Generic optionFeedback | Add specific concept explanation |
| Copying from other sources | Write fresh based on lesson |
| Skipping gates | **Never skip — gates are mandatory** |

## Coverage Target

Final goal (FWD-2.7):

```
questions:coverage-targets:strict
┌────────────────────────────────────┐
│ mcGapCount: 0                      │
│ fillGapCount: 0                    │
│ ready: true                        │
└────────────────────────────────────┘
```

### Combined Curriculum Coverage (P6.3.1)

For the full phase-6 readiness gate (`P6.3.1`), also run:

```bash
npm run questions:curriculum-coverage
```

This report combines MC + Fill + Trace/Build/Bug readiness per concept and prints the next authoring batch with action recommendations.

### Practical batch generation for P6.3.1

When you need a larger deterministic batch:

```bash
npm run questions:curriculum-coverage:write
npm run questions:curriculum-coverage -- --batch-size=30
npm run questions:curriculum-coverage:strict -- --batch-size=30
```

Interpreting output:

- `mcGapCount`, `fillGapCount`, `activityGapCount` must all reach `0` for strict pass.
- `nextBatch` is ordered by lesson priority then gap priority (`MC` > `Fill` > `Activity`) and then concept name.
- For each row:
  - `requiredActions` tells which action is missing (`mc`, `fill`, or `activity`).
  - `nextActionNeeds` summarizes remaining gaps by action type across all concept gaps.

## Verification

```bash
# Full authoring pipeline check
npm run questions:curriculum-coverage:strict

# Check specific batch
npm run validate:strict -- --batch=QMAN-001A

# Quick quality check
npm run quality:questions:strict
```
