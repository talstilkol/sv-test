# PARTIAL Tasks Registry

> **Status**: Active Registry  
> **Date**: 2026-05-01  
> **Purpose**: Track all `[~]` PARTIAL tasks with owners, evidence files, and closure criteria.

## Policy

כל משימת `[~]` PARTIAL חייבת להגדיר:
1. **Owner** — אחראי להשלמה (או `unknown/unavailable`)
2. **Evidence File** — קובץ ראיה למצב הנוכחי
3. **Closure Criteria** — תנאי סגירה מדיד

## Registry

### Phase 1 — תשתית קריטית

| Task | Owner | Evidence File | Closure Criteria |
|------|-------|---------------|------------------|
| P1.2.2 Keyboard navigation | unknown/unavailable | `app.js` lines 7388-7674 (Escape/Enter/Arrow handlers) | Focus trap ב-modals + visible focus indicators + keyboard-only smoke test עובר |
| P1.5.2 Per-Distractor Feedback | unknown/unavailable | `data/option_feedback.js` (~20 questions) | 50 MC עם optionFeedback מלא + backfill ל-bank |

### Phase 3 — אינטליגנציה + Sync

| Task | Owner | Evidence File | Closure Criteria |
|------|-------|---------------|------------------|
| P3.10.3 Modularization | unknown/unavailable | `src/core/scoring.js`, `src/views/context-tree.js` | 14 legacy views מופרקים ל-`src/views/`, `app.js` < 10K שורות |
| AUDIT-FIX-27 Cross-device Sync | unknown/unavailable | `src/core/progress-sync.js` | Supabase auth אמיתי + live sync עובד + conflict resolution tested |
| AUDIT-FIX-28 Vite migration | unknown/unavailable | `vite.config.js`, `src/main.js` | כל ה-views מופרקים מ-`app.js`, build ללא warnings |
| AUDIT-FIX-29 TypeScript migration | unknown/unavailable | `lib/srs.ts`, `lib/rng.ts` | כל ה-core ב-TS, views עם types, `app.js` migrated |

### AUDIT-FIX Tasks

| Task | Owner | Evidence File | Closure Criteria |
|------|-------|---------------|------------------|
| SYS-AUDIT-017 innerHTML Allowlist | unknown/unavailable | `docs/INNERHTML_ALLOWLIST.md` | smoke tests לקטגוריה B עוברים, review לקטגוריה C/D complete |
| SYS-AUDIT-018 localStorage Trust | unknown/unavailable | `docs/LOCALSTORAGE_TRUST_BOUNDARY.md` | HMAC signing מיושם ל-progress exports, tamper detection UI |
| SYS-AUDIT-022 Weak counters | unknown/unavailable | `docs/QUESTION_WRITING_PRIORITY_QUEUE.md` | owner/reviewer מוקצים ל-QMAN-PRIORITY-001/002 |
| KIMI-AUDIT-4 SEO backlog | unknown/unavailable | `docs/SEO_BACKLOG.md` | OG tags + JSON-LD מיושמים, social preview עובד |
| KIMI-AUDIT-5 Telemetry policy | unknown/unavailable | `docs/TELEMETRY_POLICY.md` | privacy notice ב-UI, consent mechanism עובד |

### Forward Execution Plan — P0/P1

| Task | Owner | Evidence File | Closure Criteria |
|------|-------|---------------|------------------|
| FWD-4.2 Brutal audit write | unknown/unavailable | `BRUTAL_MASTER_PLAN_AUDIT.md` | CI gate מריץ `:write` אוטומטית אחרי שינוי גדול |
| FWD-4.4 PARTIAL registry | unknown/unavailable | `docs/PARTIAL_TASKS_REGISTRY.md` | כל `[~]` task בעל owner + evidence + criteria מוגדרים |
| FWD-4.5 Summary by gates | unknown/unavailable | `EXECUTION_TASKS.md` summary table | סיכום נסמך אך ורק על תוצאות `:strict` gates |

## Status Summary

| Category | PARTIAL Tasks | With Owner | Without Owner |
|----------|---------------|------------|---------------|
| Phase 1 | 2 | 0 | 2 |
| Phase 3 | 4 | 0 | 4 |
| AUDIT-FIX | 4 | 0 | 4 |
| FWD Plan | 3 | 0 | 3 |
| **Total** | **13** | **0** | **13** |

## Action Items

1. **Immediate**: הקצות owners לפי תחומי אחריות
   - Frontend/UX → P1.2.2, KIMI-AUDIT-4
   - Content/Questions → P1.5.2, SYS-AUDIT-022
   - Architecture → P3.10.3, AUDIT-FIX-28/29
   - Backend/Sync → AUDIT-FIX-27
   - Security → SYS-AUDIT-017/018

2. **Next**: הגדרת evidence files קונקרטיים
3. **Final**: הגדרת closure criteria מדידים לכל task

## Template for Adding New PARTIAL Tasks

```markdown
| Task ID | Owner | Evidence File | Closure Criteria |
|---------|-------|---------------|------------------|
| XXX-NNN | name or unknown/unavailable | path/to/evidence | מדד מדיד לסגירה |
```

## Verification

```bash
# List all PARTIAL tasks without owner
npm run audit:partial:missing-owner

# List all PARTIAL tasks without evidence file
npm run audit:partial:missing-evidence

# List all PARTIAL tasks without closure criteria
npm run audit:partial:missing-criteria
```
