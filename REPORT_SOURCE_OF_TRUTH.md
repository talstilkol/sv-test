# Report Source of Truth

Date: 2026-05-02
Version: report-source-of-truth-v1

## Tracked Artifacts

| Artifact | State | Date | Version | Type | Markdown Date |
|---|---|---|---|---|---|
| AI_TUTOR_ALPHA_REPORT | historical | 2026-04-29 | ai-tutor-alpha-gate-v1 | markdown+json | 2026-04-29 |
| BRUTAL_MASTER_PLAN_AUDIT | historical | 2026-04-30 | brutal-master-plan-audit-v1 | markdown+json | 2026-04-30 |
| CONTENT_FACTORY_PIPELINE_REPORT | historical | 2026-04-30 | content-factory-pipeline-v1 | markdown+json | 2026-04-30 |
| CONTENT_SCHEMA_CONTRACT_REPORT | historical | 2026-04-29 | content-schema-contract-report-v1 | markdown+json | 2026-04-29 |
| EXAM_EDITION_RELEASE_FREEZE | historical | 2026-04-29 | exam-edition-release-freeze-v1 | markdown+json | 2026-04-29 |
| EXAM_FLOW_SIMULATION_REPORT | historical | 2026-04-29 | exam-flow-simulation-v1 | markdown+json | 2026-04-29 |
| EXAM_WEEK_WEAKEST_CONCEPTS | historical | 2026-04-29 | exam-week-weakest-v1 | markdown+json | md date missing |
| FEATURE_COVERAGE_REPORT | active | 2026-05-02 | feature-coverage-v2 | markdown+json | 2026-05-02 |
| FINISH_LINE_PRERELEASE_REPORT | historical | 2026-04-30 | finish-line-prerelease-v1 | markdown+json | 2026-04-30 |
| LEARNING_OS_OUTCOME_SCALE_REPORT | active | 2026-05-02 | learning-os-outcome-scale-v1 | markdown+json | 2026-05-02 |
| LESSON_QUIZ_KEYS_REPORT | historical | 2026-04-28 | lesson-quiz-keys-v1 | markdown+json | 2026-04-28 |
| LEVEL100_RELEASE_GATE | historical | 2026-04-29 | level-100-release-gate-v1 | markdown+json | 2026-04-29 |
| MANUAL_QUESTION_AUTHORING_PLAN | active | 2026-05-02 | manual-question-authoring-plan-v1 | markdown+json | 2026-05-02 |
| MANUAL_QUESTION_BLOCKER_MAP | historical | 2026-04-30 | manual-question-blocker-map-v1 | markdown+json | 2026-04-30 |
| METRICS_DASHBOARD_REPORT | historical | 2026-04-29 | metrics-dashboard-v1 | markdown+json | 2026-04-29 |
| MOCK_EXAM_VARIANTS_REPORT | historical | 2026-04-29 | mock-exam-variants-v1 | markdown+json | 2026-04-29 |
| MUSEUM_EVIDENCE_FIELDS_REPORT | historical | 2026-04-30 | museum-evidence-fields-v1 | markdown+json | 2026-04-30 |
| PHASE6_RELEASE_READINESS_REPORT | historical | 2026-04-29 | phase6-release-readiness-v1 | markdown+json | 2026-04-29 |
| PILOT_READINESS_REPORT | historical | 2026-04-29 | pilot-readiness-v1 | markdown+json | 2026-04-29 |
| PORTAL_BOUNDARY_REPORT | historical | 2026-04-29 | portal-boundary-v1 | markdown+json | 2026-04-29 |
| POST_EXAM_PRODUCT_SPLIT_REPORT | historical | 2026-04-30 | post-exam-product-split-v1 | markdown+json | 2026-04-30 |
| PRICING_PACKAGING_PLAN_REPORT | historical | 2026-04-29 | pricing-packaging-plan-v1 | markdown+json | 2026-04-29 |
| QUESTION_ACTIVITY_AUTHORING_PLAN | active | 2026-05-02 | question-activity-authoring-plan-v1 | markdown+json | 2026-05-02 |
| QUESTION_ACTIVITY_COVERAGE_REPORT | historical | 2026-04-30 | question-activity-coverage-v1 | markdown+json | 2026-04-30 |
| QUESTION_COVERAGE_TARGETS | historical | 2026-05-01 | question-coverage-targets-v1 | markdown+json | 2026-05-01 |
| QUESTION_CURRICULUM_COVERAGE_REPORT | active | 2026-05-02 | curriculum-coverage-v1 | markdown+json | 2026-05-02 |
| QUESTION_QA_CHECKLIST | historical | 2026-04-30 | question-qa-checklist-v2 | markdown+json | md date missing |
| QUESTION_QUALITY_REPORT | historical | 2026-04-30 | question-quality-v1 | markdown+json | 2026-04-30 |
| QUESTION_REMEDIATION_QUEUE | historical | 2026-04-28 | question-remediation-v1 | markdown+json | 2026-04-28 |
| QUESTION_REUSE_AUDIT_REPORT | historical | 2026-04-29 | question-reuse-audit-v1 | markdown+json | md date missing |
| REPORT_SOURCE_OF_TRUTH | active | 2026-05-02 | report-source-of-truth-v1 | markdown+json | 2026-05-02 |
| ROADMAP_90_DAY_WAVES | historical | 2026-04-29 | roadmap-90-day-waves-v1 | markdown+json | 2026-04-29 |
| SVCOLLEGE_COMMAND_CENTER | historical | 2026-04-28 | svcollege-command-center-v1 | markdown+json | md date missing |
| SVCOLLEGE_READINESS_REPORT | historical | 2026-04-28 | svcollege-readiness-v1 | markdown+json | md date missing |
| SVCOLLEGE_STUDENT_READINESS_EXPORT | historical | 2026-04-29 | svcollege-student-readiness-export-v1 | markdown+json | 2026-04-29 |
| SVCOLLEGE_TAB_MATRIX | historical | 2026-04-28 | svcollege-tab-matrix-v1 | markdown+json | md date missing |
| SYNC_ALPHA_REPORT | historical | 2026-04-29 | sync-alpha-gate-v1 | markdown+json | 2026-04-29 |
| VIDEO_ASSET_TRACKER_REPORT | historical | 2026-04-29 | video-asset-tracker-v1 | markdown+json | 2026-04-29 |

## Live Signals

- **FEATURE_COVERAGE**: green (strictFailures=0, evidenceGateFailures=0, version=feature-coverage-v2)
- **QUESTION_COVERAGE_TARGETS**: red (ready=false, mcGap=374, fillGap=384, version=question-coverage-targets-v1)
- **QUESTION_QUALITY**: yellow (questionQualityIndex=99.2%, total=1810)
- **FINISH_LINE_PRE_RELEASE**: red (ready=false, passed=1/18)

## Source-of-Truth Findings

- [P1] Feature coverage is clean while question coverage remains red. Do not claim both as current production truth. (recon-001)
- [P1] 32 tracked report snapshots are older than the source-of-truth date and should be regenerated or explicitly kept historical. (recon-003)

## Policy

- Active claims should come from reports where `state=active`.
- Historical artifacts must not be treated as live truth unless explicitly noted in a migration note.
- Re-run with `--write` after refreshing reports or running `npm run ...` commands.

