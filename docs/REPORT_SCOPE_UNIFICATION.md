# Report Scope Unification Plan

> **Status**: Planning  
> **Date**: 2026-05-01  
> **Problem**: Multiple reports with overlapping/scattered scope  
> **Goal**: Single source of truth per concern

## Current Report Landscape

| Report | Scope | Status | Stale Risk |
|--------|-------|--------|------------|
| `QUESTION_COVERAGE_TARGETS` | Manual bank coverage | Active | Medium |
| `QUESTION_ACTIVITY_COVERAGE` | Trace/Build/Bug coverage | Active | Medium |
| `QUESTION_QUALITY_REPORT` | Quality metrics | Active | Low |
| `QUESTION_REMEDIATION_QUEUE` | Issues to fix | Active | Low |
| `MANUAL_QUESTION_BLOCKER_MAP` | Module conflicts | Active | Low |
| `CONTENT_FACTORY_PIPELINE` | Generation pipeline | **Deprecated** | High |
| `FEATURE_COVERAGE_REPORT` | Feature completeness | Active | Medium |
| `SVCOLLEGE_READINESS_REPORT` | Release readiness | Active | Low |
| `FINISH_LINE_PRERELEASE_REPORT` | Pre-release gates | Active | Low |
| `BRUTAL_MASTER_PLAN_AUDIT` | Full plan audit | Active | Medium |

## Unified Scope Model

```
┌─────────────────────────────────────────────────────────────┐
│                    UNIFIED REPORT STRUCTURE                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐│
│  │   QUESTION BANK     │    │   SVCOLLEGE PORTAL        ││
│  │   (Learning Core)   │    │   (Product Release)       ││
│  ├─────────────────────┤    ├─────────────────────────────┤│
│  │ • Coverage targets  │    │ • Readiness gates           ││
│  │ • Quality metrics   │    │ • Tab matrix                ││
│  │ • Activity gaps     │    │ • Critical flows            ││
│  │ • Remediation queue │    │ • Browser smoke             ││
│  │ • Reuse audit       │    │ • Exam variants             ││
│  └─────────────────────┘    └─────────────────────────────┘│
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐│
│  │   PROJECT HEALTH    │    │   STRATEGIC PLANNING        ││
│  │   (Process/Quality) │    │   (Future/Backlog)          ││
│  ├─────────────────────┤    ├─────────────────────────────┤│
│  │ • Brutal audit      │    │ • Master plan               ││
│  │ • Partial registry  │    │ • 90-day roadmap            ││
│  │ • Gate summary      │    │ • Post-exam split           ││
│  │ • Security audit    │    │ • Pricing/packaging         ││
│  └─────────────────────┘    └─────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Consolidation Actions

### 1. Deprecate/Archive Old Reports

| Report | Action | Reason |
|--------|--------|--------|
| `CONTENT_FACTORY_PIPELINE` | Archive | No auto-generation |
| `MOCK_EXAM_VARIANTS_REPORT` | Merge into SVCollege | Overlap |
| `EXAM_WEEK_WEAKEST_CONCEPTS` | Merge into coverage | Overlap |

### 2. Create Master Index

```markdown
# Reports Master Index

## Active (Source of Truth)

### Question Coverage
- **Command**: `npm run questions:coverage-targets:strict`
- **Output**: `QUESTION_COVERAGE_TARGETS.md`
- **Scope**: Manual question bank gaps
- **Refresh**: After each batch

### SVCollege Readiness
- **Command**: `npm run svcollege:readiness:release`
- **Output**: `SVCOLLEGE_READINESS_REPORT.md`
- **Scope**: Release gates
- **Refresh**: Weekly

### Quality Status
- **Command**: `npm run quality:questions:strict`
- **Output**: `QUESTION_QUALITY_REPORT.md`
- **Scope**: Question quality
- **Refresh**: After authoring

### Project Health
- **Command**: `npm run master-plan:brutal-audit:strict`
- **Output**: `BRUTAL_MASTER_PLAN_AUDIT.md`
- **Scope**: Full plan audit
- **Refresh**: After major changes

## Historical/Archive

| Report | Last Valid Date | Superseded By |
|--------|-----------------|---------------|
| CONTENT_FACTORY_PIPELINE | 2026-04-30 | MANUAL_QUESTION_AUTHORING_PLAN |
```

### 3. Add Stale Detection Gate

```javascript
// scripts/check_report_freshness.js
const REPORTS = [
  { name: 'QUESTION_COVERAGE_TARGETS', maxAge: '1d' },
  { name: 'SVCOLLEGE_READINESS_REPORT', maxAge: '7d' },
  { name: 'QUESTION_QUALITY_REPORT', maxAge: '1d' },
];

function checkFreshness() {
  for (const report of REPORTS) {
    const mtime = fs.statSync(`${report.name}.md`).mtime;
    const age = Date.now() - mtime;
    const maxAge = parseDuration(report.maxAge);
    
    if (age > maxAge) {
      console.warn(`⚠️ ${report.name} is stale (${formatAge(age)} old)`);
      console.warn(`   Run: npm run report:source-of-truth:write`);
    }
  }
}
```

## Report Dependencies

```
FINISH_LINE_PRERELEASE
    ├── questions:coverage-targets
    ├── quality:questions
    ├── svcollege:readiness
    └── master-plan:brutal-audit

QUESTION_COVERAGE_TARGETS
    ├── Manual bank (data/questions_bank.js)
    ├── Seeded archive (excluded)
    └── Concept definitions

SVCOLLEGE_READINESS
    ├── Tab matrix
    ├── Critical flows
    └── Mock exam variants
```

## Gate: Detect Stale Reports

Add to CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Check Report Freshness
  run: |
    npm run check:report-freshness
    
- name: Regenerate if Stale
  if: failure()
  run: |
    npm run report:source-of-truth:write
    git diff --exit-code || echo "Reports updated"
```

## Implementation Checklist

- [ ] Create `docs/REPORTS_MASTER_INDEX.md`
- [ ] Mark deprecated reports as `historical/superseded`
- [ ] Add `check:report-freshness` command
- [ ] Add CI gate for stale detection
- [ ] Update `npm run report:source-of-truth:write` to update index
- [ ] Document report dependencies

## Verification

```bash
# Check all reports are fresh
npm run check:report-freshness:strict

# Regenerate all
npm run report:source-of-truth:write

# Verify no duplicates
npm run audit:report-duplicates
```
