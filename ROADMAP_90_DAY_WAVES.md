# 90-Day Roadmap Waves — 2026-04-29

- Target: Phase 5 90-day roadmap waves
- Policy: A roadmap wave is closed only when repository evidence exists. Missing learner/pilot outcomes remain unknown/unavailable and are not backfilled.
- Ready: Yes
- Waves: 3/3
- Checks: 12/12

## Quarterly Review Rule

Every quarter, each post-exam feature receives exactly one evidence-based decision:

- `freeze` when usage evidence, learner outcomes or support evidence are missing.
- `cut` when real usage shows the feature adds confusion, duplicated chrome or weak learning value.
- `promote` only when real usage, D1/D7 retention, mastery velocity, exam uplift or teacher feedback justify keeping it.

Missing evidence remains `unknown/unavailable`; no feature is promoted from roadmap enthusiasm alone.

## Wave 1 hardening: FSRS/Gap/Pathways metrics + retention baseline

- Closes: P5.5.1
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| FSRS/SRS core exists | pass | Spaced repetition must have deterministic core tests before roadmap scale. | `lib/srs.js`<br>`tests/srs.test.js` |
| Gap Matrix is learner-facing | pass | Gap dashboard must be reachable and computed from real learner scores. | `app.js` |
| Pathways coverage is complete | pass | 30/30 complete concepts | `data/pathways.js`<br>`FEATURE_COVERAGE_REPORT.json` |
| D1/D7 retention baseline exists without fabricated outcomes | pass | Retention and metrics dashboard use local learning evidence; missing pilot evidence stays unknown/unavailable. | `src/core/outcome-loop.js`<br>`METRICS_DASHBOARD_REPORT.json` |

## Wave 2 alpha: AI Tutor + Sync + Pair-Match hardening

- Closes: P5.5.2
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| AI Tutor Alpha gate is ready | pass | 7/7 AI Tutor Alpha checks passed. | `AI_TUTOR_ALPHA_REPORT.json`<br>`AI_TUTOR_ALPHA_POLICY.md`<br>`supabase/functions/ai-tutor/index.ts` |
| Sync Alpha gate is ready | pass | 6/6 Sync Alpha checks passed. | `SYNC_ALPHA_REPORT.json`<br>`SYNC_ALPHA_POLICY.md`<br>`src/core/progress-sync.js` |
| Pair-Match feature coverage is done | pass | 14/5 games; 110 pairs. | `data/pair_match.js`<br>`app.js`<br>`FEATURE_COVERAGE_REPORT.json` |
| Bug Quest hardening is tracked | pass | 25/25 bugs. | `data/bug_quests.js`<br>`FEATURE_COVERAGE_REPORT.json` |

## Wave 3 lite: Teacher Dashboard Lite + class progress heatmap

- Closes: P5.5.3
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Teacher Lite UI exposes one-class controls | pass | Teacher Lite must expose class, student table, heatmap and export controls. | `index.html`<br>`app.js`<br>`tests/teacher-lite-ui.test.js` |
| Teacher Lite core modules exist | pass | Teacher Lite needs real class/student/heatmap/risk modules, not local fake rosters. | `src/core/teacher-classes.js`<br>`src/core/teacher-students.js`<br>`src/core/teacher-heatmap.js`<br>`src/core/teacher-risk-alerts.js`<br>`src/core/teacher-assignments.js` |
| Teacher Supabase schema is present | pass | Teacher Lite scale path requires real tables and RLS migrations. | `supabase/migrations/002_classes.sql`<br>`supabase/migrations/003_class_students.sql`<br>`supabase/migrations/004_class_concept_mastery.sql`<br>`supabase/migrations/005_class_assignments.sql` |
| Teacher Lite tests cover class progress and heatmap | pass | Teacher Lite must be locked by module and UI tests. | `tests/teacher-classes.test.js`<br>`tests/teacher-students.test.js`<br>`tests/teacher-heatmap.test.js`<br>`tests/teacher-risk-alerts.test.js`<br>`tests/teacher-lite-ui.test.js` |
