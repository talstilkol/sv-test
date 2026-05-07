# Portal Full Audit Report

- ready: true
- score: 100/100
- passed: 31/31
- generatedAt: 2026-05-07T09:31:14.412Z

## Task Board
- required: 6485 minutes (108 שעות 5 דק׳)
- diagnostics: 7
- site/tree: 33
- exam sections: 73
- videos: 114
- presentation/images: 40
- optional backlog: 4

## Scores
| Domain | Score | Status | Gates | Failures |
| --- | ---: | --- | ---: | --- |
| Core gates | 100/100 | green | 6/6 | none |
| Exam materials | 100/100 | green | 8/8 | none |
| UI navigation | 100/100 | green | 10/10 | none |
| Task board and media | 100/100 | green | 1/1 | none |
| Content quality | 100/100 | green | 4/4 | none |
| Management | 100/100 | green | 1/1 | none |
| E2E | 100/100 | green-with-environment-warning | 1/1 | none |

## Commands
| Status | Domain | Gate | Command | Duration ms |
| --- | --- | --- | --- | ---: |
| PASS | Core gates | Vitest full | `npm test -- --run` | 6604 |
| PASS | Core gates | Finish line | `npm run finish-line:pre-release` | 13035 |
| PASS | Core gates | System health | `npm run system:health:strict` | 196 |
| PASS | Core gates | DOM trust | `node scripts/report_dom_storage_trust_boundary.js --strict` | 66 |
| PASS | Core gates | Performance budget | `node scripts/report_performance_budget.js --json` | 61 |
| PASS | Core gates | Forbidden random scan | `scan active code for Math.random` | 0 |
| PASS | Exam materials | Material gaps | `npm run exam:material-gaps:strict` | 264 |
| PASS | Exam materials | Curriculum coverage | `npm run questions:curriculum-coverage:strict` | 517 |
| PASS | Exam materials | Activity coverage | `npm run questions:activity-coverage:strict` | 268 |
| PASS | Exam materials | Task tree | `npm run exam:task-tree:strict` | 161 |
| PASS | Exam materials | Manual review lock | `npm run exam:manual-review:strict` | 172 |
| PASS | Exam materials | Solution guide | `npm run exam:solution-guide:coverage:strict` | 166 |
| PASS | Exam materials | Mock variants | `npm run exam:mock-variants:strict` | 583 |
| PASS | Exam materials | Exam flows | `npm run exam:flows:strict` | 206 |
| PASS | UI navigation | Full portal smoke | `npm run svcollege:full-portal-smoke:strict` | 317 |
| PASS | UI navigation | Visual overlap | `npm run svcollege:visual-overlap:strict` | 193 |
| PASS | UI navigation | Critical flows | `npm run svcollege:critical-flows:strict` | 247 |
| PASS | UI navigation | Top tabs | `npm run svcollege:top-tabs:strict` | 153 |
| PASS | UI navigation | Tab matrix | `npm run svcollege:tab-matrix:strict` | 228 |
| PASS | UI navigation | Context tree | `npm run svcollege:context-tree:strict` | 251 |
| PASS | UI navigation | Accessibility | `npm run svcollege:accessibility:strict` | 170 |
| PASS | UI navigation | Console gate | `npm run svcollege:console-gate:strict` | 249 |
| PASS | UI navigation | Site map | `npm run site-map:strict` | 157 |
| PASS | UI navigation | Navigation tree | `npm run svcollege:navigation-tree:strict` | 186 |
| PASS | Task board and media | Task board | `npm run exam:task-board:strict` | 168 |
| PASS | Content quality | Question quality | `npm run quality:questions:strict` | 340 |
| PASS | Content quality | Distractor exam gate | `npm run distractor:exam-gate:strict` | 442 |
| PASS | Content quality | Exam critical notes | `npm run questions:exam-critical-notes:strict` | 398 |
| PASS | Content quality | Quality remediation | `npm run quality:remediation:strict` | 340 |
| PASS | Management | Master plan backlog | `npm run master-plan:brutal-audit` | 280 |
| PASS | E2E | Playwright smoke | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 598 |

## Recommendations
- none

