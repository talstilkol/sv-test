# Finish Line 1 Pre-Release Report

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-30
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


Date: 2026-04-30
Version: finish-line-prerelease-v1

## Summary

- Executed: yes
- Ready: no
- Passed: 17/18
- Failed: 1
- Not run: 0

## Policy

- Learner-facing questions remain manual-only.
- This report does not create, seed or rewrite questions.
- Missing data remains `unknown/unavailable`; failures are reported as blockers.

## Checks

| Gate | Status | Command | Detail |
|---|---:|---|---|
| No native random API in active source | pass | `internal active-source scan` | No native random API token found. |
| No automatic question generation | pass | `npm run guard:no-auto-questions` | passed |
| Question bank strict validation | pass | `npm run validate:strict` | passed |
| Question QA strict | pass | `npm run qa:questions:strict` | passed |
| Question quality strict | pass | `npm run quality:questions:strict` | passed |
| Manual blocker map strict | pass | `npm run questions:blocker-map:strict` | passed |
| Manual question coverage target strict | fail | `npm run questions:coverage-targets:strict` |   "handCuratedMcPromotionBacklog": 471, /   "handCuratedFillPromotionBacklog": 466 / } |
| Question reuse audit strict | pass | `npm run questions:reuse-audit:strict` | passed |
| SVCollege release readiness | pass | `npm run svcollege:readiness:release` | passed |
| SVCollege tab matrix strict | pass | `npm run svcollege:tab-matrix:strict` | passed |
| SVCollege critical flows strict | pass | `npm run svcollege:critical-flows:strict` | passed |
| SVCollege command center strict | pass | `npm run svcollege:command-center:strict` | passed |
| SVCollege student export strict | pass | `npm run svcollege:student-export:strict` | passed |
| SVCollege mock variants strict | pass | `npm run exam:mock-variants:strict` | passed |
| SVCollege console gate strict | pass | `npm run svcollege:console-gate:strict` | passed |
| SVCollege PWA offline strict | pass | `npm run svcollege:pwa-offline:strict` | passed |
| Vitest full suite | pass | `npm test -- --run` | passed |
| Production build | pass | `npm run build` | passed |

## Blockers

- questions-coverage-targets-strict:   "handCuratedMcPromotionBacklog": 471, |   "handCuratedFillPromotionBacklog": 466 | }

