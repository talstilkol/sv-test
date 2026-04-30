# Post-Exam Product Split Report — 2026-04-30

- Target: Phase 10 W49 Post-Exam Product Split
- Policy: Post-exam expansion is gated by repository evidence. Missing pricing, usage, learner or review evidence remains unknown/unavailable.
- Ready: Yes
- Tracks: 9/9
- Checks: 20/20

## Split non-SVCollege course mappings into future portal specs

- Closes: P10.5.1
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Portal boundary gate is ready | pass | 6/6 portal boundary checks passed. | `PORTAL_BOUNDARY_POLICY.md`<br>`PORTAL_BOUNDARY_REPORT.json` |
| Future mappings are separate specs | pass | Non-SVCollege providers must not become active navigation inside Exam Edition. | `PORTAL_BOUNDARY_POLICY.md` |

## Create a reusable portal template contract

- Closes: P10.5.2
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Template documents blueprint, tags, questions, proof gates, tabs and smoke tests | pass | POST_EXAM_PORTAL_TEMPLATE.md must describe every required portal surface. | `POST_EXAM_PORTAL_TEMPLATE.md` |
| Content schema contract is ready | pass | 9/9 schema checks passed. | `CONTENT_SCHEMA_CONTRACT.md`<br>`CONTENT_SCHEMA_CONTRACT_REPORT.json` |

## Define Teacher Lite v2 from actual exam data

- Closes: P10.5.3
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Teacher Lite exposes progress table, heatmap and export | pass | Teacher Lite v2 must use real class/student/heatmap modules, not invented rosters. | `app.js`<br>`src/core/teacher-heatmap.js`<br>`tests/teacher-lite-ui.test.js` |
| Teacher/mentor export uses exam evidence | pass | Teacher Lite v2 must summarize proof blockers from exam evidence. | `app.js`<br>`tests/content-studio.test.js` |
| Teacher kit documents weak-topic and D1/D7 review | pass | Teacher docs must keep missing student data explicit. | `TEACHER_ONBOARDING_KIT.md` |

## Define Sync v2 privacy model

- Closes: P10.5.4
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Sync Alpha gate is ready | pass | 6/6 Sync checks passed. | `SYNC_ALPHA_REPORT.json`<br>`SYNC_ALPHA_POLICY.md`<br>`src/core/progress-sync.js` |
| Sync policy is local-first, cloud optional and deterministic | pass | Sync v2 must stay opt-in and conflict-safe. | `SYNC_ALPHA_POLICY.md` |

## Define AI Tutor v2 eval set and guardrails

- Closes: P10.5.5
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| AI Tutor Alpha gate is ready | pass | 7/7 AI Tutor checks passed. | `AI_TUTOR_ALPHA_REPORT.json`<br>`AI_TUTOR_ALPHA_POLICY.md`<br>`supabase/functions/ai-tutor/index.ts` |
| AI policy covers Socratic hints, answer leak prevention and misconception repair | pass | AI Tutor v2 must be evaluated for hinting and repair, not answer leakage. | `AI_TUTOR_ALPHA_POLICY.md` |

## Define premium experience rules

- Closes: P10.5.6
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Pricing packaging gate is ready | pass | 5/5 pricing checks passed. | `PRICING_PACKAGING_PLAN.md`<br>`PRICING_PACKAGING_PLAN_REPORT.json` |
| Premium cannot lock exam-critical knowledge | pass | Premium can add service and enrichment only. | `PRICING_PACKAGING_PLAN.md` |

## Add business KPIs

- Closes: P10.5.7
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Metrics dashboard gate is ready | pass | 6/6 metrics checks passed. | `METRICS_DASHBOARD_REPORT.json`<br>`src/core/outcome-loop.js` |
| KPIs include D1/D7, mastery velocity, exam uplift and question quality index | pass | Business KPIs must come from local evidence and QA reports. | `METRICS_DASHBOARD_REPORT.md` |

## Add quarterly roadmap review

- Closes: P10.5.8
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Roadmap waves gate is ready | pass | 3/3 roadmap waves ready. | `ROADMAP_90_DAY_WAVES.md`<br>`ROADMAP_90_DAY_WAVES.json` |
| Roadmap review uses freeze, cut or promote decisions from evidence | pass | Quarterly review must not promote features without usage evidence. | `ROADMAP_90_DAY_WAVES.md` |

## Promote legacy generated questions only after manual review

- Closes: P10.5.9
- Ready: Yes

| Check | Status | Detail | Evidence |
|---|---|---|---|
| Question reuse audit is ready | pass | 863 questions audited; 0 duplicate identities. | `QUESTION_REUSE_AUDIT_REPORT.json` |
| Legacy promotion requires explicit human review evidence | pass | Legacy generated questions cannot become hand-curated by coverage pressure alone. | `SEEDED_QUESTION_PROMOTION_POLICY.md` |

