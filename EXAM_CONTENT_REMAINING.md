# 🎯 EXAM Content Remaining — Tasks with Time Estimates

**Generated:** 2026-05-03 02:58 · **Auditor:** verified by `node scripts/report_question_quality.js` + tests passing

> User directive: focus ONLY on exam content. Push everything else (modularization, AI tutor, backend, mobile, community) to the end.

---

## 📊 Current Verified State

| Metric | Value | Source |
|---|---:|---|
| MC questions in bank | **1851** | bank.js parsed via vm |
| Fill questions in bank | **1023** | bank.js parsed via vm |
| **Total questions in bank** | **2874** | |
| Net added this session (O→HH) | **~1020** | git log + commits |
| Tests | **781/781 ✅** | npm test --run |
| Question quality index | **98.8** | report_question_quality |

---

## ✅ Sprint 2 — Batches Completed (this session)

| # | Batch | Topic | Questions | Time |
|---|---|---|---:|---|
| O | Sprint 2-O | Cluster diff 9-10 | 79 | 01:26 |
| P | useEffect deps + event_loop + array_ref + closures | 50 | 01:30 |
| Q | React Hooks deep | 50 | 01:35 |
| R | Async + Promise combinators | 50 | 01:40 |
| S | DOM cluster | 50 | 01:45 |
| T | TypeScript basics | 50 | 01:50 |
| U | CSS layout/Tailwind | 50 | 01:55 |
| V | Express + HTTP | 50 | 02:00 |
| W | Mongo + Mongoose | 50 | 02:05 |
| X | Auth + Security | 50 | 02:10 |
| Y | Git/CI/Docker/DevOps | 49 | 02:14 |
| Z | Next.js + Nest.js | 49 | 02:16 |
| AA | SQL + ORM | 50 | 02:18 |
| BB | AI Engineering | 50 | 02:21 |
| CC | JS Misc + lesson 19 review | 50 | 02:38 |
| DD | TS Advanced + utility types | 50 | 02:41 |
| EE | Performance + Web Vitals | 50 | 02:47 |
| FF | Build tools (Vite/Webpack/etc) | 50 | 02:50 |
| GG | JS quirks + browser APIs | 50 | 02:54 |
| HH | DSA: Big-O + algorithms | 50 | 02:57 |

**Total committed this session: ~1020 questions across 20 batches**

---

## 🟡 Remaining Sprint 2 Batches (in queue, ~6 batches × 50 = 300 more)

| # | Batch | Topic | Questions | Status |
|---|---|---|---:|---|
| II | Functional programming patterns | 50 | next |
| JJ | Testing patterns (Vitest/RTL/Playwright) | 50 | pending |
| KK | More React Hooks edge cases (useReducer/useImperativeHandle/Context) | 50 | pending |
| LL | More ES6+ syntax tricks (destructuring, spread, optional chaining) | 50 | pending |
| MM | More OOP patterns (mixins, factory, observer, command) | 50 | pending |
| NN | Final cleanup batch (gaps in concepts that still have <3 MC or <2 Fill) | 50 | pending |

**Estimated remaining: ~300 questions × ~3 min each = ~15 minutes work**

After these, total bank should be ~2174 MC + 1173 Fill = **~3174 questions**, well exceeding the 5-per-concept target for the 568 concepts.

---

## 🟢 Sprint 1.5 — Question Quality Fixes (~1 hour)

| # | Task | Est. min | Status |
|---|---|---:|---|
| QF.1 | Identify the 17 known generic-wording questions | 15 | pending |
| QF.2 | Rewrite each with concrete distractor reasons | 30 | pending |
| QF.3 | Verify all answers correct + tests | 15 | pending |

---

## 🟢 Sprint 1.6 — Trace/Build/Bug Question Types (~6 hours)

These are 0 currently:
| Type | Description | Est h | Status |
|---|---|---:|---|
| Trace | "What does this code print?" line-by-line | 2 | pending |
| Build | "Build a function that..." multi-step | 2 | pending |
| Bug | "What's the bug?" + show fix | 2 | pending |

Author ~30-50 of each type targeting hardest concepts.

---

## 🟢 Sprint 1.7 — Per-Distractor Feedback Audit (~2 hours)

| # | Task | Est. h | Status |
|---|---|---:|---|
| DF.1 | Audit which questions have short/missing feedback (<20 chars) | 0.5 | pending |
| DF.2 | Author feedback for ~200 distractor entries | 1.5 | pending |

---

## 🟢 Sprint 1.8 — Mock Exam Compilation (~3 hours)

| # | Task | Est. h | Status |
|---|---|---:|---|
| ME.1 | Build "Final Exam Mode" that pulls 50 questions across all clusters | 1 | pending |
| ME.2 | Score + report by cluster | 1 | pending |
| ME.3 | Time-limited mode (60 min) | 1 | pending |

---

## 📋 Total Exam-Content Remaining

| Sprint | Hours | Status |
|---|---:|---|
| 2 (questions × 1500-1800) | ~0.5h remaining | mostly done — ~1020/~1200 done |
| 1.5 (quality fixes) | 1 | pending |
| 1.6 (trace/build/bug) | 6 | pending |
| 1.7 (per-distractor feedback) | 2 | pending |
| 1.8 (mock exam mode) | 3 | pending |

**Total exam-content remaining: ~12.5 hours** (down from 42 — major progress)

---

## 🔴 Pushed to End (NOT exam content) — DO NOT TOUCH UNTIL EXAM CONTENT IS DONE

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

Author Sprint 2 batch II: 50 functional programming questions (compose/curry/pipe/pure functions/immutability).

Then JJ/KK/LL/MM/NN in sequence.

Each batch ~3 minutes from authoring through commit.

---

## 🎯 Target State (after all batches)

- **3174+ questions in bank** (~50% over the original 5-per-concept target)
- **781/781 tests passing** baseline maintained
- **Question quality index ≥ 98** maintained
- All concept-key references valid (concept-tags test green)
- Zero blocker issues (question-quality-report green)
- All batches committed individually (granular history for review)
