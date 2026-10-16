# Brutally Honest Task List to "Finish Everything"

_Created: 2026-05-04_

This is the **honest** list — items I can do autonomously and items that **fundamentally require humans**.

## ✅ What's actually done (verifiable)

| Tier | Done | Where |
|---|---|---|
| Structural concept coverage | **568/568 (100%)** | `LESSON_CONCEPT_COVERAGE.md`, 6-check audit |
| MC ≥3 per concept | **100%** | validator |
| Fill ≥2 per code-bearing concept | **100%** | validator |
| Activity ≥1 per concept | **100%** | activity coverage |
| 6 levels of explanation | **100%** | data files |
| codeExample present | **100%** | data files |
| difficulty rating | **100%** | data files |
| ConceptKey integrity | **100%** | validator |
| Schema validity | **100%** | `validate:strict` |
| Build passes | **100%** | Vite |
| Tests pass | **782/782 vitest + 3/3 Playwright** | CI |
| Release gates | **12/12** | CI |

## 🤖 What I CAN finish autonomously (~12-16h)

### Tier A — Code syntax verification (~3h)
- [ ] **Run every codeExample through `node --check`** — all 568 concepts. Parses but doesn't execute. Catches syntax errors.
- [ ] **Run every fill question's reference (placeholder filled with answer) through node --check** — verifies the reconstructed code parses.
- [ ] **Run every Build's reference solution through node --check** — same deal.

### Tier B — Distractor quality heuristic (~3h)
- [ ] **Length-similarity check** on MC options (correct shouldn't be longest/shortest by 50%+)
- [ ] **Distinct keywords check** (each option has unique vocabulary)
- [ ] **Negation-flip check** (catch "always" vs "never" pairs that are too easy)
- [ ] **Generate report**: `DISTRACTOR_QUALITY_REPORT.md` with concrete flags.

### Tier C — Hebrew typo + RTL audit (~3h)
- [ ] **Hebrew typo check** — common misspellings of frequent terms (תמיד, אבל, מסוים, אופציונלי)
- [ ] **RTL bidi check** — flag mixed-direction text patterns that often render wrong
- [ ] **English-Hebrew word boundaries** — code identifiers properly LTR-isolated
- [ ] **Generate report**: `HEBREW_QUALITY_REPORT.md`

### Tier D — Cross-lesson prerequisite graph (~3h)
- [ ] **Build dependency graph** from `requiresConcepts` / `prerequisites` declarations
- [ ] **Verify no cycles** (we already know there are 0)
- [ ] **Verify reachability** — every concept reachable from a "level 0" entry
- [ ] **Flag orphans** — concepts with no prereqs declared
- [ ] **Generate report**: `PREREQ_GRAPH_AUDIT.md`

### Tier E — Code example runtime check (~2h)
- [ ] **Execute every codeExample in vm sandbox** with `node --experimental-vm-modules`
- [ ] **Catch runtime errors** (not just parse errors)
- [ ] **Skip browser-only examples** (those with DOM/window references)
- [ ] **Generate report**: `CODE_RUNTIME_REPORT.md`

### Tier F — answer correctness spot-check (~1h)
- [ ] **For 50 random Fill questions**: substitute answer into code, parse — verify result is syntactically clean.
- [ ] **For 50 random MC questions**: log the correctIndex option text. Sample to look for obvious wrong-answer-marked-correct.

## 🚫 What only HUMANS can do

### Tier H — Pedagogical SME review (~50-100h)
- [ ] Read **all 568 concept explanations** at all 6 levels each (= 3,408 explanations)
- [ ] Verify each level is age-appropriate (grandma should be metaphor-heavy; professor should be technically dense)
- [ ] Verify Hebrew is natural — not translated-feel
- [ ] Verify code examples teach the right lesson
- [ ] Verify difficulty ratings are calibrated against student outcomes (needs longitudinal data)

### Tier I — UX testing with real users (~10-20h human)
- [ ] **Screen-reader walkthrough** (NVDA + VoiceOver) on 5 critical flows
- [ ] **Mobile usability test** with real students at 320/375/414/768
- [ ] **5 student pilot users** — record their first 30-min session, collect friction points

### Tier J — Long-running engineering (~3+ months)
- [ ] **Split app.js** into per-tab modules (3 weeks)
- [ ] **Onboarding v2** interactive tour (1 week)
- [ ] **Lighthouse Chrome run** (needs Chrome environment, not headless shell)
- [ ] **AI tutor mode** (2 weeks)
- [ ] **Live code execution sandbox** (3 weeks)

## 🎯 Priority of execution (this session)

1. **Tier A** — Code syntax verification (highest ROI, catches real bugs)
2. **Tier B** — Distractor quality (real pedagogical signal)
3. **Tier C** — Hebrew typo audit
4. **Tier E** — Code runtime check
5. **Tier F** — Answer correctness sample
6. **Tier D** — Prereq graph audit (lower priority — cycles already confirmed 0)

After Tiers A-F: **content quality % goes from 5/10 (structural only) → ~7-8/10** (mechanically validated). The remaining gap (8 → 10) requires human SME review.

## True 100% definition

Will be reached only after:
- ✅ All structural checks (DONE)
- 🤖 All mechanical content checks (Tier A-F)
- 👤 Pedagogical SME review (Tier H)
- 👤 Real-user pilot (Tier I)
- 🛠 Architecture migration (Tier J)

That's **realistically 6-12 months** of mixed work. The launch-ready cutoff is much closer (~96-97%) and is essentially **today**.
