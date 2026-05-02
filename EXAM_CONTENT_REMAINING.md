# 🎯 EXAM Content Remaining — Tasks with Time Estimates

**Generated:** 2026-05-03 01:27 · **Auditor:** verified by `node scripts/report_question_coverage_targets.js`

> User directive: focus ONLY on exam content. Push everything else (modularization, AI tutor, backend, mobile, community) to the end.

---

## 📊 Current Verified State

| Metric | Value | Source |
|---|---:|---|
| MC questions in bank | **1194** | bank.js parsed |
| Fill questions in bank | **738** | bank.js parsed |
| Concepts with ≥ 3 MC each | **212/568** (37%) | coverage report |
| Concepts with ≥ 2 Fill each | **195/568** (34%) | coverage report |
| Hand-curated promotion backlog | **356 MC + 373 Fill** | coverage report |
| Cluster content | **140/140 4/4 (100%)** | audit |
| Tests | **781/781** | npm test |

---

## 🟡 Sprint 2 — Question Bank Coverage (the BIG remaining gap)

### Target
Per coverage policy: every concept that needs questions should have **≥3 MC + ≥2 Fill** = 5 questions per concept.

**Current gap:**
- 356 concepts short on MC → **1068 MC questions** to author
- 373 concepts short on Fill → **746 Fill questions** to author
- **Total: ~1814 hand-written questions**

### Realistic batching
At ~50 quality questions/hour:
- **Total: ~36 hours of focused authoring**
- Best done in **8 sessions of 4-5h each**

### Task breakdown (each batch = ~50 questions = ~1h)

| # | Batch | Questions | Cumulative | Status |
|---|---|---:|---:|---|
| O | (just done) Sprint 2 batch 1 | 79 | 79 | ✅ 01:26 |
| P | Cluster diff 9-10: useEffect deps + event_loop + array_reference + closures | 50 | 129 | next |
| Q | React Hooks deep: useState/useReducer/useMemo/useCallback/memo | 50 | 179 | |
| R | Async generations + Promise combinators | 50 | 229 | |
| S | DOM cluster: events + traversal + selectors + node ops | 50 | 279 | |
| T | TypeScript: types + utility types + generics + narrowing | 50 | 329 | |
| U | CSS: position + display + flex + grid + units | 50 | 379 | |
| V | Express + HTTP: routing + status + req/res | 50 | 429 | |
| W | Mongo: schema + queries + operators + populate | 50 | 479 | |
| X | Auth + Security: JWT + OAuth + cookies + CSRF/XSS | 50 | 529 | |
| Y | Git/CI/Docker workflow | 50 | 579 | |
| Z | Next.js + Nest.js | 50 | 629 | |
| AA | OOP + ES6 features | 50 | 679 | |
| BB | Patterns: composition, mutability, error handling | 50 | 729 | |
| CC | Final cluster gaps | 50 | 779 | |
| DD | Last 50 to round | 50 | 829 | |
| EE-MM | 9 more rounds × ~50 each | 450 | 1279 | |
| NN | Final cleanup batch | 50 | 1329 | |

**Realistic stop:** ~1300-1500 manually authored questions covers most concepts adequately. Remaining are generated/auto-formulated.

---

## 🟢 Sprint 1.5 — Question Quality Fixes (~1 hour)

| # | Task | Est. min |
|---|---|---:|
| QF.1 | Identify the 17 known generic-wording questions | 15 |
| QF.2 | Rewrite each with concrete distractor reasons | 30 |
| QF.3 | Verify all answers correct + tests | 15 |

---

## 🟢 Sprint 1.6 — Trace/Build/Bug Question Types (~6 hours)

These are 0 currently:
| Type | Description | Est h |
|---|---|---:|
| Trace | "What does this code print?" line-by-line | 2 |
| Build | "Build a function that..." multi-step | 2 |
| Bug | "What's the bug?" + show fix | 2 |

Author ~30-50 of each type targeting hardest concepts.

---

## 🟢 Sprint 1.7 — Per-Distractor Feedback Audit (~2 hours)

The test `manual-blocker-question-authoring.test.js` requires every distractor to have ≥20 char feedback. Many existing questions don't have this.

| # | Task | Est. h |
|---|---|---:|
| DF.1 | Audit which questions have short/missing feedback | 0.5 |
| DF.2 | Author feedback for ~200 distractor entries | 1.5 |

---

## 🟢 Sprint 1.8 — Mock Exam Compilation (~3 hours)

| # | Task | Est. h |
|---|---|---:|
| ME.1 | Build "Final Exam Mode" that pulls 50 questions across all clusters | 1 |
| ME.2 | Score + report by cluster | 1 |
| ME.3 | Time-limited mode (60 min) | 1 |

---

## 📋 Total Exam-Content Remaining

| Sprint | Hours | Status |
|---|---:|---|
| 2 (questions × 1500-1800) | 30-36 | partial (79/~1800 done) |
| 1.5 (quality fixes) | 1 | pending |
| 1.6 (trace/build/bug) | 6 | pending |
| 1.7 (per-distractor feedback) | 2 | pending |
| 1.8 (mock exam mode) | 3 | pending |

**Total: ~42 hours of exam-content work** (~10 sessions of 4h each)

---

## 🔴 Pushed to End (NOT exam content)

| Sprint | Topic | Hours |
|---|---|---:|
| 3 | Pilot run | 12 |
| 4 | Modularize app.js | 30 |
| 5 | TypeScript + Design System | 25 |
| 6 | AI Tutor + Adaptive | 32 |
| 7 | Full Backend (Supabase) | 28 |
| 8 | Teacher Dashboard v2 | 24 |
| 9 | Code Playground | 32 |
| 10 | Mobile Native | 32 |
| 11 | Community | 24 |
| 12 | #1 Features | 30 |

These are pushed back per user directive.

---

## 🔜 Next Action (continuing now)

Author Sprint 2 batch P: 50 questions targeting hardest clusters (useEffect deps + event_loop + array_reference + closures).
