# Student Privacy and Data Retention Policy

Updated: 2026-04-29

## Scope

This policy covers local student progress, learning evidence, support reports, sync exports and pilot evidence for SVCollege AI & Full Stack preparation.

## Local-First Rule

- Progress is stored locally by default.
- Cloud sync is optional and credential-gated.
- Export requires an explicit user action.
- Support screenshots are attached only when the user selects a file.

## Data Kept Locally

| Data | Purpose | Retention |
|---|---|---|
| Scores and mastery | study progress and readiness | until user clears browser storage or imports a replacement export |
| Learning evidence events | D1/D7, mastery velocity, stuck feedback | capped by the local event limit in code |
| XP and coins | local learning rewards only | until user clears progress or imports replacement export |
| Support report payload | troubleshooting | generated on demand; not sent automatically |
| Pilot exports | teacher review | retained by the teacher outside the app according to school policy |

## Data Not Required

- Real name.
- Email.
- Password.
- Payment information.
- Free-form answer text inside learning evidence.

## Deletion and Export

- Student can export progress from the portal.
- Student can clear browser storage to delete local progress.
- Teacher pilot files must preserve `unknown/unavailable` for missing metrics; no backfill is allowed.

## Retention Review

Before expanding beyond the pilot:

1. Verify export/delete instructions with a teacher.
2. Re-run support payload tests.
3. Re-run sync privacy gates.
4. Confirm that screenshots are opt-in only.
