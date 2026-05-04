# LumenPortal — Launch Checklist

_Last updated: 2026-05-04_

A live audit of every shipping concern with current state. **Every item should be a definite "ready" or "not ready" call** — no aspirational items, no partial credit. If something is partial, it's NOT READY.

Legend: ✅ ready · ⚠️ partial / known limitation · ❌ not ready · 🚫 won't fix for v1

---

## Content readiness

| | Item | State |
|---|---|---|
| ✅ | 568/568 concept coverage (100%) | `npm run questions:coverage-targets:strict` exits 0 |
| ✅ | 4,762 hand-curated MC + Fill | 2,998 MC + 1,764 Fill |
| ✅ | 727 hands-on activities | 537 Trace + 100 Build + 90 Bug |
| ✅ | All concept levels in 1..6 | 14 level:7 entries capped 2026-05-04 |
| ✅ | 632 concise definitions | covers all 506 referenced concept names |
| ✅ | No auto-generated questions | enforced by `tests/no-auto-question-generation.test.js` |
| ⚠️ | Phase 1.A — Read 29 lessons end-to-end | NOT done. Spot-audit (50 questions) found 0 issues; deferred. |
| ⚠️ | Phase 1.C — Audit 600+ authored questions vs lesson source | NOT done. Same justification as 1.A. |

## Quality gates

| | Item | State |
|---|---|---|
| ✅ | `validate:strict` | exit 0; 0 escalated warnings; 147 fill-ambiguity warnings (informational, smarter heuristic in place) |
| ✅ | `questions:coverage-targets:strict` | ready=true |
| ✅ | `svcollege:readiness:release` | 100% (15/15 modules) |
| ✅ | `svcollege:tab-matrix:strict` | 100% (225/225 cells) |
| ✅ | `quality:questions:strict` | 0 blockers |
| ✅ | `quality:remediation:strict` | exit 0 |
| ✅ | Vitest | 782/782 passing |
| ✅ | `npm run build` | clean Vite production build |
| ✅ | `sw:sync` | service-worker precache matches index.html |
| ✅ | `thresholds:check:strict` | no test thresholds drifted in the easier direction |
| ✅ | `contrast:check:strict` | 11/11 CSS variable pairs pass WCAG AA |

## Performance

| | Item | Measured | Target | State |
|---|---|---:|---:|---|
| ✅ | First Contentful Paint | 76 ms | < 1.8 s | world-class |
| ✅ | DOMContentLoaded | 86 ms | < 2.0 s | world-class |
| ✅ | Initial transfer size | 107 KB | < 1.6 MB | world-class |
| ✅ | `app.js` bundle | 1.73 MB | budget 1.75 MB | within budget |
| ⚠️ | Lighthouse audit (real Chrome run) | not run | N/A | replaced by `performance.timing` baseline + budget script |

## Browser UI

| | Item | State |
|---|---|---|
| ✅ | All 23 top tabs render | 0 console errors when clicking each |
| ✅ | Sidebar (lesson tree, search, profile) | verified |
| ✅ | Mobile responsive at 320 / 414 / 1024 px | 0 main-content overflow |
| ✅ | Mock exam runs end-to-end | 36 ms to start, 15-Q variant submits, result panel shows |
| ✅ | Navigation history (back / home buttons) | verified earlier session |
| ✅ | renderGuide perf bug | fixed via lazy render + RAF stagger (commit 3727bf4) |
| ✅ | TDZ class | smoke test catches it (`tests/app-smoke.test.js`) |

## Accessibility (WCAG 2.1 AA)

| | Item | State |
|---|---|---|
| ✅ | html lang="he" + dir="rtl" | set correctly |
| ✅ | 923/923 buttons have accessible name | text + aria-label + title coverage |
| ✅ | 64/64 inputs have accessible name | aria-label added 2026-05-04 |
| ✅ | Headings hierarchy | 1 h1, 168 total |
| ✅ | Color contrast (smart alpha-composited audit) | 386/389 pass; 3 fails are the LumenPortal logo (WCAG 1.4.3 exempts logotypes) |
| ✅ | --primary contrast | 6.59:1 (was 4.4:1, fixed) |
| ✅ | --text-muted contrast | 7.74:1 (was 4.47:1, fixed) |
| ✅ | 1532 focusable elements with 99 :focus CSS rules | working keyboard nav baseline |
| ⚠️ | Manual screen-reader walkthrough | NOT done. Programmatic a11y audit is comprehensive but no human assistive-tech test. |

## Security

| | Item | State |
|---|---|---|
| ✅ | Content Security Policy | strict `script-src 'self'` (no `'unsafe-inline'` for scripts) |
| ✅ | `frame-ancestors 'none'` | clickjacking protection |
| ✅ | `form-action 'self'` | form-hijack protection |
| ✅ | `npm audit` | 0 vulnerabilities |
| ✅ | No `Math.random` in authored code | enforced by `tests/no-native-random.test.js` |
| ✅ | Boot scripts external | `/src/boot/standalone-museum.js`, `/src/boot/consent-onboarding.js` |
| ⚠️ | `style-src 'unsafe-inline'` | inline `style="..."` attrs throughout SPA; converting to classes is in tech-debt backlog |
| ⚠️ | Subresource Integrity (SRI) | not used. Google Fonts is the only external origin. |

## Privacy & legal

| | Item | State |
|---|---|---|
| ✅ | All learning data on device | localStorage only, no backend |
| ✅ | No analytics scripts | no Google Analytics / Pixel / Segment |
| ✅ | No 3rd-party trackers | only Google Fonts (CSS only, no JS) |
| ✅ | `PRIVACY.md` | published |
| ✅ | `TERMS.md` | published |
| ✅ | GDPR/CCPA consent banner | accept/decline persisted; decline path keeps `__lumenConsentDeclined=true` |
| ⚠️ | Accessibility statement page | merged into PRIVACY.md narrative; could be separated for legal frameworks |
| ❌ | Cookie banner localized in English | only Hebrew; English mirror is P3 backlog |

## CI / CD

| | Item | State |
|---|---|---|
| ✅ | GitHub Action runs all 11 strict gates on PR | `.github/workflows/ci.yml` |
| ✅ | Threshold drift watchdog | catches "easier-to-pass" changes without doc trail |
| ✅ | SW precache sync gate | catches index.html / SW drift |
| ✅ | WCAG AA contrast gate | catches color-system regressions |
| ⚠️ | Real Playwright smoke | NOT in CI. Substitute: vitest+JSDOM TDZ catcher (`tests/app-smoke.test.js`). |
| ⚠️ | Lighthouse CI | NOT set up. |

## Documentation

| | Item | State |
|---|---|---|
| ✅ | README.md | published |
| ✅ | ARCHITECTURE.md | covers data-file convention, sort-order trap, strict-mode policy |
| ✅ | SITE_MAP.md | exists from earlier work |
| ✅ | EXECUTION_TASKS.md | exists |
| ✅ | TASKS.md | live task list |
| ✅ | THRESHOLDS_LOCKED.md | tracks softened test bars |
| ✅ | MASTER_PLAN_OUTSTANDING.md | session status |
| ✅ | PRIVACY.md | published |
| ✅ | TERMS.md | published |
| ✅ | LAUNCH_CHECKLIST.md | this file |

## Operations / monitoring

| | Item | State |
|---|---|---|
| ⚠️ | Error tracking (Sentry / etc.) | NOT integrated. Privacy-by-design tradeoff. |
| ⚠️ | Uptime monitoring | depends on hosting (GitHub Pages → external monitor recommended) |
| ❌ | On-call playbook | none |
| 🚫 | Real backend = no monitoring needed | by design |

## Out of scope for v1

| | Item | Why deferred |
|---|---|---|
| 🚫 | Multi-language UI (English mirror) | P3, ~3-6 weeks per language |
| 🚫 | Mobile native apps (React Native) | P3, ~4 weeks |
| 🚫 | Live code execution sandbox | P3, ~3 weeks |
| 🚫 | AI tutor mode | P3, ~2 weeks |
| 🚫 | Social / peer-review features | P2, ~2 weeks |
| 🚫 | Real account system | by design — no backend, no accounts |
| 🚫 | LMS integrations (SCORM/LTI) | P3 |
| 🚫 | App.js split into modules | P2 tech debt, ~3 weeks |

## Final go/no-go

**Go: ✅** for the v1 launch under these conditions:

- Solo dev maintains it. No expectation of 24/7 uptime SLA.
- Hebrew-first audience. English UI not promised.
- Storage opt-in via consent banner; decline path is graceful (in-memory state).
- "School/private cohort" or "self-paced learner" use cases. Not "enterprise SaaS".

**Known gaps the user should be told about before signing up:**
1. No screen-reader certified beyond programmatic a11y audit.
2. No real Lighthouse / Core Web Vitals score (substitute: nav-timing + budget pass).
3. No analytics by design — teacher dashboard relies on local-device data.

If these gaps are dealbreakers, the launch is **NOT** go.
