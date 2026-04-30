# Finish Line 1 — SVCollege Exam Portal

Updated: 2026-04-30

## Goal

Finish Line 1 is full SVCollege AI & Full Stack coverage across the portal before any expansion work.

The user needs a clean learning portal for exam preparation. Every menu, lesson, tab, quiz route, export and readiness gate must serve that goal.

## Current Truth

`FINISH_LINE_PRERELEASE_REPORT.md` reports `17/18` gates passing. The remaining blocker is full manual question coverage:

- `questions:coverage-targets:strict` is still red.
- Remaining strict manual authoring target: `1,572` MC questions and `1,007` Fill questions.
- The current batch plan is `MANUAL_QUESTION_AUTHORING_PLAN.md`.

## Must-Pass Gates

Run these before marking Finish Line work complete:

```bash
npm run validate:strict
npm run qa:questions:strict
npm run svcollege:readiness:release
npm run svcollege:tab-matrix:strict
npm run svcollege:command-center:strict
npm run svcollege:student-export:strict
npm run svcollege:pwa-offline:strict
npm test -- --run
npm run build
```

Also run the native-random scan:

```bash
rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'
```

Expected result: no matches.

## Active UI Follow-Up

The lesson chrome was compressed into compact one-line rows:

- Path row: home, lessons, lesson, current concept.
- Concept row: horizontally scrollable concepts.
- Tab row: lesson display tabs.
- Concept parts moved into the left view menu.

Still open:

- Desktop/mobile visual smoke for lesson 11 after the compact menu change.
- Keyboard-only tests for row toggles, concept navigation, question bank and focus return.

## Not Finish Line 1

Do not spend implementation time on these until the manual question blocker is closed:

- Museum expansion.
- Reward store expansion.
- Community, teacher, premium or post-exam product work.
- AI production backend unless it directly fixes an exam-critical flow.

