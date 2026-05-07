# SVCollege Final Bug Audit (2026-05-05)

## Executive Summary

- Previous reported status: `~96%` (with structural debt).
- Current verified status: critical and strict gates are green, including DOM trust boundary.
- Core outcome: items previously reported as P1 functional blockers are resolved in the current codebase.

## Before/After on Reported Issues

| Issue | Previous Finding | Current Status |
|---|---|---|
| `setHomeContextTree` using old IDs | old keys (`grandma`, `knowledge-map`, `gap`) | **Resolved** — canonical keys used (`grandma-knowledge`, `km`, `gap-matrix`) |
| `Math.random()` in production | reported in `dashboard.html` | **Resolved** — no `Math.random()` matches in active source scan |
| duplicate IDs in `dashboard.html` | `dirSearch`, `dirGrid`, `editContent` duplicates | **Resolved** — DOM ID contract passes (`missingRequired=0`, `missingOptional=0`) |
| missing `settings` key in decision aids | fallback to home | **Resolved** — `settings` key exists and is used |
| onboarding dual legacy/new path | `.onboarding-tour` + `data-tour-action` drift | **Resolved** — active flow is unified via `#onboarding-overlay` and `data-onboarding` |
| references to missing DOM IDs | `stat-*`, `welcome-resume-*` | **Resolved** — no active references in current scan |
| DOM trust boundary debt | `requiresReview` > 0, critical exam sinks pending | **Resolved** — `requiresReview=0`, `criticalExamDomRequiresReview=0`, `ready=true` |

## Verified Gate Results

- `npm run svcollege:navigation-tree:strict` ✅
- `npm run svcollege:context-tree:strict` ✅
- `npm run svcollege:top-tabs:strict` ✅
- `npm run svcollege:accessibility:strict` ✅
- `npm run svcollege:full-portal-smoke:strict` ✅
- `npm run svcollege:console-gate:strict` ✅
- `npm run svcollege:pwa-offline:strict` ✅
- `npm test -- tests/homework-exam-mode.test.js tests/dom-id-contract.test.js --run` ✅
- `npm run build` ✅
- `node scripts/report_dom_storage_trust_boundary.js --summary` ✅ (`ready=true`)

## Current Trust Boundary Snapshot

- DOM sinks: `118` total
- Reviewed safe: `118`
- Requires review: `0`
- Critical exam DOM requires review: `0`
- Storage calls: `178` total (`localStorage 176`, `sessionStorage 2`)

## Notes

- Local progress/storage remains non-authoritative by design until backend-auth proof is used (expected policy note, not a blocker).
- This report reflects the current repository state at generation time and supersedes older findings that were based on previous revisions.

## Environment-Only Constraints (Non-Product)

- `npm run smoke:browser` may show `EPERM` on `127.0.0.1:8765` in restricted environments.
  - Current behavior is now explicit and deterministic:
  - returns a JSON status with `reason: "webserver-port-permission"` instead of ambiguous failure.
- `npm run test:ui` now reports a clear non-blocking status if `@vitest/ui` is missing.
- `npm run qwen:train:smoke` now labels unreachable Ollama as infrastructure:
  - `infrastructureUnavailable: true`
  - `reason: "ollama-unavailable-or-blocked"`

## Plan v1 Status Mapping (P0→P3)

### P0 — Green Recovery
- `npm test -- --run`: ✅ pass (`173/173`, `830/830`)
- `qwen:guard:strict`: ✅ ready
- `questions:feedback-batch:strict`: ✅ ready (0 pending treated as valid no-op)

### P0/P1 — Critical Exam DOM + Trust
- DOM trust strict: ✅ ready
- `criticalExamReady`: ✅ true
- `requiresReview`: ✅ `0`

### P1 — Save / Resume Clarity
- autosave baseline: ✅ stable (existing flow)
- environment fallbacks added for smoke/UI/Qwen infra issues: ✅ explicit status output

### P1 — Exam100 Closed Path
- core gates and strict checks: ✅ green
- canonical tab/aid mapping: ✅ unified (`km`, `grandma-knowledge`, `gap-matrix`, `settings`)

### P2 — Performance / Runtime
- performance strict budget: ✅ pass
- runtime audits non-blocking strict set: ✅ pass

### P2 — Question Quality
- strict blockers/warnings: ✅ 0
- remaining notes: ⚠️ 2599 (quality debt, not release blocker)

### P3 — Backlog / Long-tail
- prerequisite orphan (`lesson_11::undefined`): ✅ resolved (orphans 0)
- remaining deep-content debt exists in enrichment layers (not exam-core blocker): ⚠️ open
