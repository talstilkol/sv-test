# Memory

## Me
Tal — sole maintainer of LumenPortal, a Hebrew adaptive learning SPA for Full-Stack JS/React/TS. Working dir: `/Users/tal/Desktop/חומרים לשיעור`. Git user: Talstilkol. Repo: github.com/talstilkol/sv-test.

## Workspace
- **Locale:** Hebrew/RTL primary, English-only code/comments common in source
- **Stack:** Vanilla JS (no module system in app.js), Vite for build, vitest for tests, service-worker for PWA offline
- **Workflow:** Solo dev, frequent merges from claude/* branches, brutal-honest audit pattern preferred over premature "done"

## Projects
| Name | What |
|------|------|
| **LumenPortal** | Main product — adaptive learning portal, 568 concepts, 29 lessons, 4762 questions, 727 activities |
| **SVCollege** | Host/partner program — 15 modules with their own readiness gates, 225/225 tab cells, dedicated bridge files in `data/svcollege_*.js` |

## Terms / Codenames
| Term | Meaning |
|------|---------|
| **MC** | Multiple choice question |
| **Fill** | Code-completion (single ____ blank) |
| **Trace** | "Code Trace" — multi-step execution prediction |
| **Build** | "Mini Build" — write code to pass regex tests |
| **Bug** | "Bug Hunt" — find/fix broken code |
| **conceptKey** | `lesson_X::ConceptName` canonical identifier |
| **TDZ** | Temporal Dead Zone — tripped twice this branch |
| **strict mode** | Validators that escalate warnings to errors (e.g. `validate:strict`) |
| **release gate** | One of 8 strict commands that must pass for ship |
| **bridge file** | `data/svcollege_*.js` — content namespaced for SVCollege variants |
| **zz_** prefix | Newer phase2 data files, named to win sort-order ties |
| **funny-bhabha** | PR #25 branch — introduced the TDZ bug class |
| **beautiful-knuth** | The previous worktree branch this session continues from |

## Lesson IDs (subset that comes up often)
| ID | Subject |
|----|---------|
| lesson_11–13 | JS arrays/methods/objects/DOM/classes |
| lesson_14 | HTML/CSS foundations |
| lesson_15 | Errors, closures, async, promises, fetch |
| lesson_16 | Node.js, npm, modules, fs |
| lesson_17 | HTTP, Express, REST |
| lesson_18 | Express forms, validation, server-side storage |
| lesson_19 | JS fundamentals catch-all (largest gap until phase2) |
| lesson_20 | MongoDB, Mongoose, NoSQL |
| lesson_21 | React basics, JSX, Vite |
| lesson_22 | React composition (state/props/refs) |
| lesson_23 | React Router, Context |
| lesson_24 | useEffect, useRef, useMemo |
| lesson_25 | Tailwind CSS + movies project |
| lesson_26 | TypeScript basics |
| lesson_27 | TS domain models (Book/User/Expense) |
| lesson_closures | Deep dive: closures (separate from lesson_15) |
| lesson_nextjs / lesson_nestjs | Bridge lessons |
| lesson_design_systems | Tailwind + shadcn |
| lesson_devops_deploy / lesson_auth_security | Self-explanatory |
| lesson_ai_engineering | OpenAI/SDK/RAG |
| ai_development | AI dev tools (Cursor/Copilot/Claude Code/Windsurf) — separate from lesson_ai_engineering |
| react_blueprint | Architectural patterns (Lifting State, Error Boundaries…) |
| workbook_taskmanager | Hands-on Task Manager project |

## Preferences (learned this session)
- **Brutal honesty over premature DONE.** When asked "what's left?" — list what's actually incomplete, including process shortcuts (e.g. "I bumped the threshold instead of fixing the bug"). User specifically called out "test thresholds shifted in 3 places" as a sin.
- **Don't lower test thresholds to make red go green.** If a number drops, write a new commit with the honest data; if a number rises, that's a regression — fix it.
- **Run gates after every batch.** All 8 strict commands + tests + build, not just one.
- **`/loop` and "המשך ברצף" mean autonomous execution** — don't pause to re-confirm; execute until the queue is empty or there's a real blocker.
- **Hebrew + English mixed prose is fine.** Code identifiers stay English. Documentation can be Hebrew where it talks to students.
- **No Math.random anywhere** — there's a `no-native-random` guard. Use deterministic sources (`Date.now`, fixed seed, etc.).
- **No new files unless asked** — prefer Edit on existing files over creating new ones, unless the architecture requires it (e.g. `zz_questions_*_phase2.js`).
- **Don't auto-create docs** unless the user asks. They asked for `MASTER_PLAN_OUTSTANDING.md` updates → kept.

## Recent context
- 2026-05-04 session closed at ~92% readiness. Phase 2 batches landed (+151 trace, +30 build, +29 bug). 7/8 release gates green; the 8th (`validate:strict`) fails only on 384 pre-existing fill-ambiguity warnings.
- P0 renderGuide perf bug fixed (commit `3727bf4`). Lazy-render + RAF stagger.
- Tech-debt list captured in `TASKS.md`. Phase A (~7h) is the next active batch.

## Open questions (unanswered by user)
- Is "LumenPortal" the public-facing brand or an internal codename?
- Who else, if anyone, sees this code? (Today: solo.)
- Target student cohort / launch date?
