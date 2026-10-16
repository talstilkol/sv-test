# 🎯 Master Plan — 100% Material Coverage + Architecture Fix + Bug Audit

**Created**: 2026-05-03 10:18 · After user request: cover ALL material in ALL lessons 100% based on cluster pedagogy + fix entire menu/architecture + verify no bugs.

---

## State at start

| Metric | Value |
|---|---:|
| Lessons | 26 |
| Concepts total | 534 |
| Cells (concepts × parts) | 12,816 |
| Filled cells | 4,727 |
| **Missing cells** | **8,089 (63%)** |
| Hardest lessons (gaps) | lesson_19 (800), lesson_17 (570), lesson_13 (480), lesson_20 (480), lesson_26 (438) |
| Question bank | 3,473 (2,270 MC + 1,203 Fill) |
| Tests | 781/781 ✅ |
| app.js | 37,097 lines (monolith) |
| style.css | 27,919 lines (monolith) |
| innerHTML uses | 154 (no allowlist) |
| Active views | knowledge-map, study-mode, trainer, mock-exam, concept-sprint, flashcards, reward-store, settings (8 declared) |

---

## Part A — Content: 100% per concept × per part (~8,089 cells)

Per concept, the audit tracks 24 parts. 8 are core (already done). 16 are enrichment:
1. illustration (336/534 done)
2. extras (59/534 done)
3. analogy (0/534)
4. deepDive (0/534)
5. extendedExplanation (0/534)
6. mnemonic (0/534)
7. antiPatterns (0/534)
8. bugHunt (0/534)
9. warStories (0/534)
10. comparisons (0/534)
11. conceptComic (0/534)
12. conceptVideo (0/534)
13. memoryPalace (0/534)
14. problemFirst (0/534)
15. stageZero (0/534)
16. whatIf (0/534)

### Stage A.1 — Lesson-by-lesson sweep (priority: by gap)
For each lesson, we author all missing parts for ALL concepts in difficulty order (hardest first).

**Sequencing (sorted by gap size)**:
1. lesson_19 (800 missing, 50 concepts) — 16 sub-batches
2. lesson_17 (570 missing, 38 concepts)
3. lesson_13 (480 missing, 32 concepts)
4. lesson_20 (480 missing, 30 concepts)
5. lesson_26 (438 missing, 30 concepts)
6. lesson_11 (~360 missing, 28 concepts)
7. lesson_27 (293 missing, 20 concepts)
8. lesson_23 (310 missing, 21 concepts)
9. lesson_21 (340 missing, 23 concepts)
10. lesson_16 (405 missing, 27 concepts)
11. lesson_24 (230 missing, 16 concepts)
12. lesson_22 (259 missing, 18 concepts)
13. lesson_15 (270 missing, 18 concepts)
14. lesson_25 (206 missing, 14 concepts)
15. lesson_18 (180 missing)
16. lesson_12 (180 missing)
17. lesson_ai_engineering (304 missing)
18. lesson_auth_security (304 missing)
19. lesson_devops_deploy (272 missing)
20. lesson_design_systems (192 missing)
21. lesson_nextjs (288 missing)
22. lesson_nestjs (256 missing)
23. lesson_html_css_foundations (120 missing)
24. lesson_tooling_git
25. lesson_sql_orm
26. lesson_closures (115 missing)

### Stage A.2 — Cluster validation
After each lesson sweep:
- Run `node scripts/audit_lesson_completion.js` — confirm % rises
- Run `npm test -- --run` — 781/781 still green
- Run `npm run validate:strict` — no new blockers

### Stage A.3 — Authoring schema
For each concept, author ALL 16 missing parts with this canonical structure:

```js
{
  conceptName: "...",
  // existing core (DONE):
  hebrewName, en, difficulty, code, codeExample, codeExplanation, levels,
  // enrichment (NEW):
  analogy: { hebrew: "...", concrete: "..." },
  deepDive: { purpose, problem, withoutIt, useWhen },
  extendedExplanation: { intro, mechanics, edgeCases, performance },
  mnemonic: { phrase, decoded },
  antiPatterns: [{ bad, good, reason }],
  bugHunt: { code, bug, fix },
  warStories: ["...", "..."],
  comparisons: [{ topic, vs, when_a, when_b }],
  conceptComic: { panels: [{ frame, caption }] },
  conceptVideo: { script, durationSec },
  memoryPalace: { rooms: [{ room, image, anchor }] },
  problemFirst: { problem, naive, refined },
  stageZero: { broken, whatBreaks, fixed },
  whatIf: { scenario, change, outcome },
  illustration: "...",
  extras: [{ title, body }, ...]
}
```

**Time budget**: each concept × 16 parts ≈ 10-15 minutes manual = ~110 hours for all 534. Realistic: split into batches of 50 concepts × 4-5 hour sessions = ~22 sessions.

---

## Part B — Architecture & Menu Fix

### Stage B.1 — Site menu audit
Current state observed:
- `index.html` has 1,585 lines, 425 IDs, monolithic
- Navigation buttons are scattered: `ach-nav-back`, `site-back-btn`, `site-home-btn`, `lesson-nav-btn`, `mx-nav-btn`, `cb-nav-btn`
- No declarative `data-view` routing system
- Views toggled by show/hide logic in app.js

### Stage B.2 — Menu redesign tasks
1. **Sticky main nav** — top bar with: Home, Lessons, Practice, Mock Exam, Reward Store, Settings
2. **Breadcrumb** — Lesson → Concept → Activity (always visible)
3. **Side rail** — concept progress within current lesson
4. **Footer status** — XP, streak, online/offline
5. **Mobile drawer** — collapses to hamburger ≤ 768px
6. **Keyboard shortcuts** — `?` opens help, `g h` go home, `g l` lessons, `/` search
7. **Search** — fuzzy across concept names + question topics

### Stage B.3 — Architecture fix tasks
1. **Extract router**: `src/core/router.js` — hash-based or History API
2. **Extract state store**: `src/state/store.js` — replace 400+ window globals
3. **Extract views**: one folder per view under `src/views/`
4. **Extract components**: button, card, modal, drawer, toast → `src/components/`
5. **Extract services**: storage, supabase, scoring, srs → `src/services/`
6. **CSS modularization**: split 27,919-line style.css per view

### Stage B.4 — Bug verification
1. Run dev server, check console for errors
2. Click through every menu item, verify no broken links
3. Test keyboard navigation
4. Test offline mode
5. Test on 3 viewports (mobile/tablet/desktop)
6. Test in 3 browsers (Chrome/Firefox/Safari)

---

## Part C — Bug Audit (verify no bugs)

### Stage C.1 — Static analysis
1. **innerHTML inventory**: 154 uses → categorize (trusted/escaped/unsafe), fix unsafe
2. **localStorage inventory**: 140+ uses → mark trust boundary
3. **eval/new Function** — should be 0
4. **Unhandled promises** — grep for `.then(` without `.catch(` or `try/await`
5. **Console errors** — none allowed in DEV
6. **Type errors** — tsc --noEmit on src/

### Stage C.2 — Runtime audit
1. **Error boundary** — wrap app, log to local Bug Agent
2. **Performance budget** — Lighthouse ≥90 in all categories
3. **Memory leaks** — DevTools Memory profile
4. **Network audit** — no 4xx/5xx in normal use

### Stage C.3 — Test coverage
1. **Unit tests** — 781/781 passing baseline
2. **Integration tests** — write missing for new modules
3. **E2E tests** — Playwright critical paths
4. **Visual regression** — snapshot key screens

---

## Execution Sequence

This master plan has 3 parallel tracks. To execute "without stopping":

**Track 1 (Content)**: continue authoring batches, but switch from question batches to **enrichment batches** per lesson.

**Track 2 (Architecture)**: extract router → state store → first view → first component → CSS split per view.

**Track 3 (Bugs)**: innerHTML audit, localStorage trust boundary, error boundary install.

In a single autonomous session, realistic outcome:
- Track 1: 1-2 lessons complete enrichment (~32 concepts × 16 parts = ~512 cells)
- Track 2: router + state store extracted, 1 view migrated
- Track 3: innerHTML categorized, top 10 unsafe fixed

Subsequent sessions repeat. Total project: ~30-40 sessions for full completion.

---

## Real total time

- Content (8,089 cells × 2-3 min avg): **~270-400 hours**
- Architecture (60h modularization + 30h router + 20h CSS split + 30h component lib): **~140 hours**
- Bug audit (40h innerHTML + 10h localStorage + 30h error boundary + 20h E2E): **~100 hours**

**Grand total: ~510-640 hours focused work** (~3-4 months full-time).

---

## What I'm doing now (this session)

Given context window limits and the realistic pace, I'll:

1. **Finish Stage 0** — TT batch (just done), then run strict gates
2. **Start Track 3 (bugs)** — innerHTML audit producing real inventory
3. **Start Track 2 (arch)** — extract router (smallest first win)
4. **Start Track 1 (content)** — author lesson_html_css_foundations (smallest, 8 concepts × 16 parts = 128 cells) as proof-of-concept template

Beyond what fits, I'll mark next steps in the todo list for future sessions.
