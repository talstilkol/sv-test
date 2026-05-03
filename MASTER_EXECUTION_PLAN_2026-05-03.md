# 🚀 Master Execution Plan — Path to World #1 Learning Portal

**Created**: 2026-05-03 09:58 · After brutal audit. Comprehensive, sequential, no shortcuts.

---

## STAGE 0 — Stabilize (Sprint 2 wrap-up + verify)

**Goal**: prove the bank is actually release-ready, not just large.

### 0.1 Continue extension batches (RR/SS/TT) — currently in-progress
- [ ] Batch RR: Output prediction MC (50 Q)
- [ ] Batch SS: Common interview questions (50 Q)
- [ ] Batch TT: Final final cleanup + edge cases (50 Q)

### 0.2 Verify all strict gates
- [ ] Run `npm run validate:strict` — must show 0 blockers
- [ ] Run `npm run questions:coverage-targets:strict` — must show 0 deficit per concept
- [ ] Run `npm run finish-line:pre-release` — must show 18/18 green
- [ ] Document any failure with specific concept gaps + author closing batch

### 0.3 Rewrite 17 generic-wording questions (Sprint 1.5)
- [ ] Identify the 17 from `quality:remediation` report
- [ ] Rewrite each with concrete distractor reasons
- [ ] Verify quality index ≥98 after

### 0.4 Per-distractor feedback audit (Sprint 1.7)
- [ ] Find all distractors with <20 char feedback (excluded blockers, all severities)
- [ ] Author proper Hebrew explanations for each (~200 entries estimated)
- [ ] Verify question-quality-report cleanQuestions ≥80%

---

## STAGE 1 — Trace/Build/Bug Question Types (Sprint 1.6)

**Goal**: introduce 3 new question types beyond MC/Fill.

### 1.1 Schema design
- [ ] Add `type` field to question shape: 'mc' | 'fill' | 'trace' | 'build' | 'bug'
- [ ] Define schemas for each new type (input, expected, hints, scoring)
- [ ] Update validators in `scripts/merge_question_shards.js`

### 1.2 UI rendering for new types
- [ ] Trace renderer: code block + line-by-line input form
- [ ] Build renderer: spec + multi-step input + hidden tests
- [ ] Bug renderer: buggy code + "what's wrong" + "fix" inputs

### 1.3 Author content
- [ ] 30 Trace questions covering hardest concepts (event_loop, closures, async)
- [ ] 30 Build questions (debounce, throttle, memoize, custom hooks)
- [ ] 30 Bug questions (real classroom bugs)

### 1.4 Tests
- [ ] Schema validation tests
- [ ] UI rendering tests (RTL)
- [ ] Submission scoring tests

---

## STAGE 2 — Mock Exam Mode (Sprint 1.8)

### 2.1 Compilation
- [ ] Build `final-exam` view that pulls 50 questions across all clusters by difficulty distribution
- [ ] Score per cluster + overall
- [ ] Time-limited mode (60 min countdown)
- [ ] Practice mode (no time limit, hints visible)

### 2.2 Reporting
- [ ] Per-cluster scorecard with strengths/weaknesses
- [ ] Recommended next actions (study plan)
- [ ] Export to PDF for teacher review

---

## STAGE 3 — Security Hardening (P1 blockers)

### 3.1 innerHTML audit
- [ ] Generate inventory of all 154 innerHTML uses with file:line + data origin
- [ ] Categorize: trusted-static, escaped-dynamic, sanitized-rich, unsafe
- [ ] Replace unsafe with textContent/createElement/DOMPurify
- [ ] Add static gate to `lint:strict` blocking new innerHTML without `// allowlist:` comment
- [ ] Document allowlist in `docs/security/innerHTML-allowlist.md`

### 3.2 localStorage trust boundary
- [ ] Audit all 140 localStorage refs by purpose (progress, preferences, cache, evidence)
- [ ] Mark XP/mastery/score data as "client-side hint only, server is truth"
- [ ] Document in `docs/security/storage-trust-boundary.md`
- [ ] Plan server-side validation flow (depends on Stage 4 backend)

### 3.3 CSP gradual rollout
- [ ] Phase 1: report-only meta tag, log violations
- [ ] Phase 2: stricten by category (scripts, styles, fonts, images)
- [ ] Phase 3: enforce, remove unsafe-inline if possible

### 3.4 Other security
- [ ] npm audit threshold high (CI fails on high+)
- [ ] Snyk/Socket scan on PR
- [ ] Secret scanning hook (gitleaks)

---

## STAGE 4 — Modularization (the big one)

### 4.1 State extraction (replace window globals)
- [ ] Audit all 400+ window globals in app.js
- [ ] Build `src/state/store.js` (Proxy-based, ~100 LOC)
- [ ] Migrate progressively: progress → settings → mastery → bug log → ...
- [ ] Each migration: tests, browser smoke, commit

### 4.2 Service extraction
- [ ] `src/services/storage.js` — wraps localStorage with trust-boundary
- [ ] `src/services/supabase.js` — auth + sync
- [ ] `src/services/scoring.js` — pure functions (already extracted partially)
- [ ] `src/services/srs.js` — spaced repetition

### 4.3 View extraction (one per major screen)
- [ ] knowledge-map view
- [ ] study-mode view
- [ ] trainer view
- [ ] mock-exam view
- [ ] concept-sprint view
- [ ] flashcards view
- [ ] reward-store view
- [ ] settings view
Each: own folder, own tests, own CSS.

### 4.4 Component extraction
- [ ] question-card
- [ ] concept-card
- [ ] progress-bar
- [ ] modal
- [ ] sidebar
- [ ] badge

### 4.5 CSS modularization
- [ ] Split style.css per view + shared
- [ ] CSS Custom Properties for theme tokens
- [ ] Document design system in Storybook

### 4.6 Coverage enforcement
- [ ] Add Vitest coverage gate (80% lib/, 60% views/)
- [ ] CI fail on regression

---

## STAGE 5 — E2E Testing (Playwright)

### 5.1 Setup
- [ ] Install Playwright
- [ ] Configure: 3 browsers, mobile viewports, CI integration

### 5.2 Critical path tests
- [ ] Login → home → enter lesson → answer question → see feedback → progress saves
- [ ] Mock exam: start → time runs → submit → see score
- [ ] Settings: change theme → reload → theme persists
- [ ] Offline: load → go offline → continue learning → reload → still works

### 5.3 Keyboard a11y tests
- [ ] Tab order through main views
- [ ] Escape closes modals
- [ ] Enter/Space submit answers
- [ ] Arrow keys navigate question lists

### 5.4 Visual regression
- [ ] Snapshot key screens at 3 viewports
- [ ] Threshold tuning to avoid flake

---

## STAGE 6 — Real Pilot (10 students)

### 6.1 Recruit + onboard
- [ ] Identify 10 SVCollege Full-Stack students
- [ ] Onboarding doc + Slack channel
- [ ] Consent form (data collection, screen recording)

### 6.2 Run pilot (2 weeks)
- [ ] Daily check-ins
- [ ] Bug reporting flow
- [ ] Track: D1, D7 retention, questions/day, mastery growth, stuck events

### 6.3 Analyze
- [ ] D7 retention target: ≥60%
- [ ] Average questions/day: target ≥20
- [ ] Mastery: ≥80% reach level 5
- [ ] NPS survey: target ≥50 baseline

### 6.4 Iterate
- [ ] Top 10 friction points → fix
- [ ] Repeat with same students or new cohort

---

## STAGE 7 — Backend & Auth (Supabase real)

### 7.1 Schema design
- [ ] users, progress, mastery, achievements, sessions tables
- [ ] RLS policies (per-user data isolation)
- [ ] Audit log table

### 7.2 Auth
- [ ] Email/password
- [ ] OAuth (Google + GitHub)
- [ ] Magic link
- [ ] Password reset flow
- [ ] Session management

### 7.3 Sync
- [ ] Conflict resolution (last-write-wins or 3-way merge)
- [ ] Offline queue
- [ ] Real-time subscriptions for progress updates

### 7.4 Server-side validation
- [ ] Score validation (cannot fake XP)
- [ ] Mastery promotion rules
- [ ] Anti-cheat heuristics

---

## STAGE 8 — TypeScript Migration

### 8.1 Core to TS
- [ ] All `src/core/*.js` → `*.ts`
- [ ] Strict mode enabled
- [ ] tsc --noEmit in CI

### 8.2 Views to TS
- [ ] One view at a time
- [ ] Type props/state explicitly
- [ ] Generate types from data schemas

### 8.3 Data schemas
- [ ] Question, Concept, Lesson, User as TS types
- [ ] Zod schemas for runtime validation
- [ ] Generate from JSON if needed

---

## STAGE 9 — Design System & UX

### 9.1 Tokens
- [ ] CSS Custom Properties: colors, spacing, typography, motion, shadows
- [ ] Light + dark theme
- [ ] High-contrast accessibility variant

### 9.2 Component library
- [ ] Button, Input, Card, Modal, Drawer, Toast, Spinner
- [ ] Web Components (Custom Elements) for reuse
- [ ] Storybook documentation

### 9.3 Mobile-first responsive
- [ ] Audit current breakpoints
- [ ] Redesign tight mobile views
- [ ] Test on real devices

### 9.4 Animations & micro-interactions
- [ ] Web Animations API for entrance/exit
- [ ] CSS transitions for hovers
- [ ] Reduced-motion respect

### 9.5 Accessibility WCAG 2.1 AA
- [ ] axe-core in CI
- [ ] Manual screen-reader test
- [ ] Color contrast all ≥4.5:1

---

## STAGE 10 — AI Tutor (Claude API)

### 10.1 Infrastructure
- [ ] Set up Anthropic SDK on serverless edge function
- [ ] Rate limiting per user
- [ ] Cost tracking + alerts
- [ ] Prompt caching (5min TTL)

### 10.2 Tutor features
- [ ] "Explain this concept" → personalized in user's level
- [ ] "Why is my answer wrong" → analyze attempt + clarify
- [ ] "Generate practice question" → for weak area
- [ ] Code review of student attempts

### 10.3 Adaptive learning
- [ ] Knowledge gap detection (analyze wrong answers)
- [ ] Question difficulty selection (Bayesian or contextual bandit)
- [ ] Daily study plan generation
- [ ] Predictive at-risk warning for teachers

### 10.4 Hebrew Q&A
- [ ] Natural language input → relevant content
- [ ] Multi-turn dialogue
- [ ] Source citation

---

## STAGE 11 — Teacher Dashboard v2

### 11.1 Class roster
- [ ] Add/remove students
- [ ] Group management
- [ ] Bulk actions

### 11.2 Analytics
- [ ] Per-student progress
- [ ] Per-concept mastery heatmap
- [ ] Stuck students surface
- [ ] Activity timeline

### 11.3 Curriculum builder
- [ ] Custom learning paths
- [ ] Question bank curation
- [ ] Lesson order override

### 11.4 Grading & feedback
- [ ] Auto-graded mock exams
- [ ] Free-text feedback to students
- [ ] Class-wide announcements

---

## STAGE 12 — Code Playground

### 12.1 Editor
- [ ] Monaco lazy-loaded
- [ ] Syntax highlighting (JS/TS/HTML/CSS)
- [ ] IntelliSense via TypeScript LSP

### 12.2 Execution
- [ ] Sandpack for client-side run
- [ ] Console output capture
- [ ] Test runner integrated

### 12.3 Save & share
- [ ] Save snippets per user
- [ ] Public gallery (if user opts-in)
- [ ] Embed in lessons

---

## STAGE 13 — Community

### 13.1 Forum
- [ ] Posts + comments
- [ ] Tags + search
- [ ] Reputation

### 13.2 Peer review
- [ ] Submit code → ask for review
- [ ] Comment threads
- [ ] Acceptance vote

### 13.3 Mentoring
- [ ] Mentor profiles
- [ ] Booking system
- [ ] Video integration

---

## STAGE 14 — Mobile Native

### 14.1 Capacitor wrap
- [ ] iOS shell
- [ ] Android shell
- [ ] Native plugins: notifications, biometric login, offline storage

### 14.2 OR React Native rewrite
- [ ] Shared core lib (TS)
- [ ] Native UI per platform

### 14.3 Store deployment
- [ ] App Store submission
- [ ] Google Play submission
- [ ] CI/CD for builds

---

## STAGE 15 — Internationalization

### 15.1 Infrastructure
- [ ] i18next or vanilla translation system
- [ ] Hebrew → English translation
- [ ] RTL/LTR auto-switch

### 15.2 Content
- [ ] Translate all 568 concepts
- [ ] Translate all questions
- [ ] Translate UI strings

### 15.3 Languages
- [ ] English
- [ ] Arabic
- [ ] Russian

---

## STAGE 16 — Excellence (world #1 differentiators)

### 16.1 Project-Based Learning
- [ ] 5 project tracks (todo app, blog, e-commerce, chat, dashboard)
- [ ] Step-by-step with acceptance tests
- [ ] Portfolio integration

### 16.2 Job-ready Portfolio
- [ ] Auto-generated from project completions
- [ ] Resume export
- [ ] Skill verification

### 16.3 Industry Certification
- [ ] Cert exam mode
- [ ] Verified credentials (blockchain or signed PDF)
- [ ] LinkedIn integration

### 16.4 Career Marketplace
- [ ] Employer accounts
- [ ] Job board
- [ ] Skill-based matching

---

## Execution Strategy

**Parallelization**: Stages 0-3 sequentially (need stable bank + clean code first). Then 4 (modularization) in parallel with 5 (E2E) and 8 (TS). Then 7 (backend) unlocks 10 (AI), 11 (teacher), 13 (community). Stages 9, 12, 14, 15, 16 can be slotted in based on user priority.

**Time estimate** (single developer, focused):
- Stage 0: 4 hours (almost done)
- Stage 1: 12 hours
- Stage 2: 6 hours
- Stage 3: 16 hours
- Stage 4: 60 hours (the big migration)
- Stage 5: 12 hours
- Stage 6: 14 days elapsed (real pilot needs time)
- Stage 7: 30 hours
- Stage 8: 25 hours
- Stage 9: 30 hours
- Stage 10: 40 hours
- Stage 11: 35 hours
- Stage 12: 30 hours
- Stage 13: 25 hours
- Stage 14: 50 hours (mobile is hard)
- Stage 15: 40 hours
- Stage 16: 60 hours

**Total**: ~485 hours focused work + 14 days pilot. ~3-4 months full-time.

---

## What I'm doing right now

User said "execute everything in sequence without stopping." I'll proceed:
1. Finish RR/SS/TT (Stage 0.1) — currently in progress
2. Run all strict gates (Stage 0.2)
3. Sprint 1.5 generic-wording fix (Stage 0.3)
4. Continue down stage list until context limits hit, then mark current state in todos.

Realistic outcome of one autonomous session: **Stages 0-1 fully closed, Stage 2 mock exam mode + Stage 3 innerHTML audit started.** Beyond that requires multiple sessions.
