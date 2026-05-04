# Master Plan to 100% — Complete Coverage

_Created: 2026-05-04 · Last updated: live_

This is the source-of-truth plan to bring LumenPortal from ~92% (current honest state) to **100% complete**. Every item has: priority, estimated time, what "done" looks like, and current status.

Tracking column legend: ⬜ not started · ⏳ in progress · ✅ done · 🚫 won't fix

---

## 🔴 P0 — Doable autonomously in this session (~4h total)

| # | Task | Done = | Est | Status |
|---|------|--------|----:|---|
| P0.1 | Migrate 5 remaining native `confirm()` to `lumenConfirm` | grep `confirm\(` returns 0 user-facing | 30m | ⏳ |
| P0.2 | Investigate "5 בית" badge in tab strip | Either explained in code+docs OR removed | 15m | ⬜ |
| P0.3 | Real mock-exam E2E — answer 15 questions, verify scoring | Score panel shows real `>=0%` value, history record saved | 30m | ⬜ |
| P0.4 | Smart fill-ambiguity heuristic v2 (147 → <50) | `validate:strict` + breakdown counter | 45m | ⬜ |
| P0.5 | Phase 1.A spot-read — 5 lessons + 30 sample questions content review | Each lesson read; 30 questions verified for accuracy | 90m | ⬜ |
| P0.6 | Run all 11 gates + tests + commit + push | All green | 10m | ⬜ |

## 🟡 P1 — Needs longer focus (~15-20h, multi-session)

| # | Task | Done = | Est | Status |
|---|------|--------|----:|---|
| P1.1 | **Phase 1.A complete** — read 29 `data/lesson*.js` end-to-end | Notes on each lesson's structure, gaps, inconsistencies | 8h | ⬜ |
| P1.2 | **Phase 1.C** — audit 600+ authored questions vs lesson source | Spot-check 200/4762; flag divergent | 6h | ⬜ |
| P1.3 | **Real Lighthouse run** (Chrome DevTools or `lighthouse` CLI) | FCP/LCP/CLS/TTI/SI/TBT scores with breakdown | 30m + tooling | ⬜ |
| P1.4 | **Manual screen-reader walkthrough** (VoiceOver / NVDA) | 5 critical flows (consent → onboard → trainer → exam → result) verified | 1h | ⬜ |
| P1.5 | **Real Playwright smoke** in CI (not jsdom) | Headless Chromium clicks 23 tabs in CI | 4h | ⬜ |
| P1.6 | Refactor inline `style="..."` attrs to classes (drop `style-src 'unsafe-inline'`) | CSP `style-src 'self'` only | 6h | ⬜ |
| P1.7 | Fix 147 fill-ambiguity warnings individually (vs heuristic) | 0 warnings + remove de-escalation logic | 8h | ⬜ |

## 🟢 P2 — Long-running (3+ weeks each)

| # | Task | Done = | Est | Status |
|---|------|--------|----:|---|
| P2.1 | **Split app.js into modules** | <10k lines per file, per-tab modules, no IIFE | 3 weeks | ⬜ |
| P2.2 | Onboarding walkthrough v2 (interactive tour) | First-time user sees guided 5-step tour of trainer | 1 week | ⬜ |
| P2.3 | Teacher dashboard polish | Analytics + bulk import + heatmap | 1 week | ⬜ |
| P2.4 | GDPR consent v2 — granular preferences | User can opt out of specific categories | 1 day | ⬜ |
| P2.5 | Accessibility statement page | Separate page (not in PRIVACY.md) | 2h | ⬜ |

## 🟣 P3 — World-class differentiators (2-3 months)

| # | Task | Est |
|---|------|----:|
| P3.1 | AI tutor mode (LLM integration, "explain this") | 2 weeks |
| P3.2 | Live code execution sandbox (StackBlitz iframe) | 3 weeks |
| P3.3 | English UI mirror (RTL ↔ LTR toggle) | 6 weeks |
| P3.4 | LMS integrations (SCORM, LTI, Google Classroom, Moodle) | 2 weeks |
| P3.5 | React Native mobile shell | 4 weeks |
| P3.6 | Adaptive engine v2 (RL-based recommendations) | 4 weeks |
| P3.7 | Curriculum versioning (cohort-locked content) | 1 week |
| P3.8 | Content marketplace (3rd-party teacher publishing) | 3 weeks |

---

## How this session will execute

Starting **immediately** with P0 in order:
1. P0.1 → migrate 5 confirms
2. P0.2 → investigate "5 בית"
3. P0.3 → real mock-exam E2E
4. P0.4 → fill-ambiguity heuristic v2
5. P0.5 → 5-lesson + 30-question content review
6. P0.6 → final gates + commit + push

Total estimated time: ~4 hours of focused work.

After P0 complete, the next session can pick up from P1.1 with the lesson-source audit.

## Audit anchors (so future sessions don't drift)

- `npm test -- --run` must show **782/782**.
- All 11 release gates must pass: validate:strict / coverage-targets:strict / svcollege:readiness:release / svcollege:tab-matrix:strict / quality:questions:strict / quality:remediation:strict / build / sw:sync / thresholds:check:strict / contrast:check:strict / test.
- `568/568` activity-ready concepts (`questions:coverage-targets:strict`).
- `0` GDPR consent regressions (banner shows on fresh visit).
- `0` console errors when clicking each of the 23 top tabs sequentially.

If any of these break, that's a regression — fix before adding new features.
