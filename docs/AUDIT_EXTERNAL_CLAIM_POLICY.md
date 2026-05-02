# AUDIT External Claim Policy

> **Status**: Active Policy  
> **Date**: 2026-05-01  
> **Purpose**: Prevent stale audit claims from entering active backlog.

## Policy Statement

**All external AUDIT/Kimi reports are input-only.**

No claim from an external audit enters the active backlog until:
1. Live gate verifies the claim is still valid
2. The issue reproduces in current codebase
3. Evidence exists (screenshot, log, or test)

## Process

```
External AUDIT Report
        ↓
   [Input Only]
        ↓
   Live Gate Check
   (run relevant :strict command)
        ↓
    ┌───────┴───────┐
    ↓               ↓
VERIFIED       NOT REPRODUCIBLE
    ↓               ↓
Add to          Mark as
EXECUTION_      STALE/
TASKS.md        SUPERCEDED
as [ ] or [~]   (don't add)
```

## Verification Commands by Category

| Claim Type | Verification Command |
|------------|---------------------|
| Questions coverage | `npm run questions:coverage-targets:strict` |
| Question quality | `npm run quality:questions:strict` |
| SVCollege readiness | `npm run svcollege:readiness:strict` |
| Feature coverage | `npm run coverage:features:strict` |
| Tests passing | `npm test -- --run` |
| Build status | `npm run build` |
| Security audit | `npm run security:audit:strict` |

## Stale Claim Markers

Reports older than source-of-truth refresh date must be marked:

```markdown
> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-28
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts.
```

## Examples

### ✅ Valid Claim (After Live Gate)

```markdown
AUDIT claim: "questions:coverage-targets shows 471 MC gaps"
↓
Run: npm run questions:coverage-targets:strict
↓
Result: "handCuratedMcPromotionBacklog: 471"
↓
Status: VERIFIED → Add to backlog as [!] blocked task
```

### ❌ Stale Claim (Not Reproducible)

```markdown
AUDIT claim: "683 remediation issues found"
↓
Run: npm run quality:remediation:strict
↓
Result: "0 issues found"
↓
Status: STALE → Mark report historical, don't add to backlog
```

## Agent Instructions

If continuing work as Kimi/AI agent:

1. **Never** assume AUDIT report reflects current state
2. **Always** run live gate before claiming issue exists
3. **Check** report date vs source-of-truth refresh date
4. **Verify** with `:strict` commands, not `:summary`
5. **Mark** historical reports as superseded when outdated

## Verification Log Template

```markdown
## AUDIT Claim Verification — 2026-05-01

| Claim | Source | Command | Result | Status |
|-------|--------|---------|--------|--------|
| 471 MC gaps | BRUTAL_AUDIT | questions:coverage-targets:strict | 471 gaps confirmed | ✅ Verified |
| 683 remediation | KIMI_AUDIT | quality:remediation:strict | 0 issues | ❌ Stale |
| No PWA offline | OLD_AUDIT | svcollege:pwa-offline:strict | Pass | ❌ Stale |
```

## Enforcement

This policy is enforced via:
- Pre-commit hooks check for unverified AUDIT references
- CI gates reject PRs with stale audit claims
- Code review requires verification log for AUDIT-based changes

## Rationale

External audits are valuable but become stale as codebase evolves:
- Code changes fix issues
- New features add complexity
- Old metrics become irrelevant
- Reports capture moment-in-time, not current state

**Live gates are the only source of truth.**
