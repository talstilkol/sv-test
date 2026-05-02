# LumenPortal Project Handbook
## Complete Guide for New Team Members

> **Version**: 1.0  
> **Date**: May 2, 2026  
> **Status**: Documentation Complete, Ready for Implementation

---

## Quick Start

### For Question Authors
**Start here →** [`QUESTION_AUTHORING_PROCESS.md`](QUESTION_AUTHORING_PROCESS.md)

1. Read the process document (15 min)
2. Review [`QUESTION_TEMPLATES_FOR_AUTHORS.md`](QUESTION_TEMPLATES_FOR_AUTHORS.md) (10 min)
3. Check your assignment in [`MANUAL_WRITING_BREAKDOWN_BY_MODULE.md`](MANUAL_WRITING_BREAKDOWN_BY_MODULE.md)
4. Start with **QMAN-003A** (HTML/CSS Foundation)

**Questions?** See FAQ section at bottom of this handbook.

### For Developers
**Start here →** [`VIEW_EXTRACTION_PLAN.md`](VIEW_EXTRACTION_PLAN.md)

Priority order:
1. **P3.10.3** — View extraction (start with welcome-screen)
2. **AUDIT-FIX-29** — TypeScript migration
3. **AUDIT-FIX-27** — Supabase integration
4. **P1.2.2** — Keyboard navigation

### For Project Managers
**Start here →** [`PROJECT_RESOURCE_PLAN.md`](PROJECT_RESOURCE_PLAN.md)

Key documents:
1. **Budget**: $28K Phase 1, $158K Phase 2
2. **Timeline**: 6-8 weeks Finish Line 1
3. **Team**: 4 authors + 1 reviewer + 1 developer
4. **Tracking**: [`PARTIAL_TASKS_REGISTRY.md`](PARTIAL_TASKS_REGISTRY.md)

---

## Project Status Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  LUMENPORTAL STATUS — May 2026                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ DOCUMENTATION COMPLETE                                   │
│     • 25 comprehensive guides created                        │
│     • 768/914 tasks documented (84%)                         │
│     • All processes defined                                 │
│                                                              │
│  🔧 READY FOR IMPLEMENTATION                                 │
│     • 140 tasks require human work                          │
│     • 1 critical blocker (question writing)                 │
│     • Clear plans for all remaining work                   │
│                                                              │
│  📊 FINISH LINE 1 — 17/18 GATES                            │
│     ✅ All technical gates passing                          │
│     ❌ Blocked: questions:coverage-targets:strict           │
│        Need: 1,260 MC + 848 Fill questions                  │
│        Time: ~1,000 hours of manual work                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Document Library (25 Files)

### 🎯 Start Here (3 Essential)

| Document | Who Needs It | Purpose |
|----------|--------------|---------|
| **THIS HANDBOOK** | Everyone | Entry point, navigation |
| [`QUESTION_AUTHORING_PROCESS.md`](QUESTION_AUTHORING_PROCESS.md) | Authors | How to write questions |
| [`VIEW_EXTRACTION_PLAN.md`](VIEW_EXTRACTION_PLAN.md) | Developers | How to refactor app.js |

### 📝 For Question Authors (6 Documents)

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [`QUESTION_AUTHORING_PROCESS.md`](QUESTION_AUTHORING_PROCESS.md) | 6-phase pipeline, gates, submission | 15 min |
| [`QUESTION_TEMPLATES_FOR_AUTHORS.md`](QUESTION_TEMPLATES_FOR_AUTHORS.md) | MC/Fill templates, examples, tips | 20 min |
| [`MANUAL_WRITING_BREAKDOWN_BY_MODULE.md`](MANUAL_WRITING_BREAKDOWN_BY_MODULE.md) | Your assignments by module | 10 min |
| [`QUESTION_WRITING_PRIORITY_QUEUE.md`](QUESTION_WRITING_PRIORITY_QUEUE.md) | What's P0 vs P1 vs P2 | 5 min |
| [`REMAINING_GAPS_ANALYSIS.md`](REMAINING_GAPS_ANALYSIS.md) | Overall gap analysis | 10 min |
| [`ACTIVITY_TRACE_BUILD_BUG_GUIDE.md`](ACTIVITY_TRACE_BUILD_BUG_GUIDE.md) | Trace/Build/Bug activities | 15 min |

### 💻 For Developers (6 Documents)

| Document | Purpose | Est. Hours |
|----------|---------|------------|
| [`VIEW_EXTRACTION_PLAN.md`](VIEW_EXTRACTION_PLAN.md) | Extract 14 views from app.js | 40-60h |
| [`KEYBOARD_NAVIGATION_AUDIT_PLAN.md`](KEYBOARD_NAVIGATION_AUDIT_PLAN.md) | Complete P1.2.2 accessibility | 8-12h |
| [`SUPABASE_INTEGRATION_PLAN.md`](SUPABASE_INTEGRATION_PLAN.md) | AUDIT-FIX-27 cloud sync | 15-25h |
| [`TYPESCRIPT_MIGRATION_PLAN.md`](TYPESCRIPT_MIGRATION_PLAN.md) | AUDIT-FIX-29 type safety | 30-50h |
| [`INNERHTML_ALLOWLIST.md`](INNERHTML_ALLOWLIST.md) | Security audit reference | Review |
| [`LOCALSTORAGE_TRUST_BOUNDARY.md`](LOCALSTORAGE_TRUST_BOUNDARY.md) | Privacy/security model | Review |

### 📊 For Management (8 Documents)

| Document | Purpose |
|----------|---------|
| [`PROJECT_RESOURCE_PLAN.md`](PROJECT_RESOURCE_PLAN.md) | Staffing, budget $223K, timeline |
| [`POST_FINISH_LINE_ROADMAP.md`](POST_FINISH_LINE_ROADMAP.md) | 4-phase roadmap post-launch |
| [`QA_TESTING_PLAN.md`](QA_TESTING_PLAN.md) | Testing strategy |
| [`PILOT_OUTCOME_LOOP_PLAN.md`](PILOT_OUTCOME_LOOP_PLAN.md) | 10-student pilot plan |
| [`RELEASE_GUARDRAILS_PLAN.md`](RELEASE_GUARDRAILS_PLAN.md) | 7 release gates |
| [`MUSEUM_EXPANSION_ROADMAP.md`](MUSEUM_EXPANSION_ROADMAP.md) | 14 wings, 60+ exhibits |
| [`PARTIAL_TASKS_REGISTRY.md`](PARTIAL_TASKS_REGISTRY.md) | Track 13 partial tasks |
| [`GATE_BASED_SUMMARY.md`](GATE_BASED_SUMMARY.md) | 17/18 gates status |

### 🔒 Policies & Governance (4 Documents)

| Document | Purpose |
|----------|---------|
| [`TELEMETRY_POLICY.md`](TELEMETRY_POLICY.md) | Privacy-first telemetry |
| [`AUDIT_EXTERNAL_CLAIM_POLICY.md`](AUDIT_EXTERNAL_CLAIM_POLICY.md) | Claims verification process |
| [`SEO_BACKLOG.md`](SEO_BACKLOG.md) | SEO phases |
| [`PAYLOAD_OPTIMIZATION_PLAN.md`](PAYLOAD_OPTIMIZATION_PLAN.md) | Performance optimization |

---

## By Role: What You Need to Know

### 👤 Question Author

**Your Goal**: Write high-quality MC and Fill questions manually

**Required Reading**:
1. [`QUESTION_AUTHORING_PROCESS.md`](QUESTION_AUTHORING_PROCESS.md) — Process overview
2. [`QUESTION_TEMPLATES_FOR_AUTHORS.md`](QUESTION_TEMPLATES_FOR_AUTHORS.md) — Templates
3. Your assigned module in [`MANUAL_WRITING_BREAKDOWN_BY_MODULE.md`](MANUAL_WRITING_BREAKDOWN_BY_MODULE.md)

**Your First Week**:
- Day 1: Read process docs, join Slack/Discord
- Day 2: Review templates, ask questions
- Day 3: Start QMAN-003A (12 MC + 10 Fill)
- Day 4-5: Continue writing
- End of week: Submit for review

**Weekly Commitment**: 10 hours
**Duration**: 6-8 weeks
**Compensation**: Per deliverable or hourly

**Success Metrics**:
- All questions pass `validate:strict`
- All questions pass `qa:questions:strict`
- Coverage targets reduced

---

### 👤 Frontend Developer

**Your Goal**: Extract views from app.js, complete technical debt

**Required Reading**:
1. [`VIEW_EXTRACTION_PLAN.md`](VIEW_EXTRACTION_PLAN.md) — Priority 1
2. [`KEYBOARD_NAVIGATION_AUDIT_PLAN.md`](KEYBOARD_NAVIGATION_AUDIT_PLAN.md) — Priority 2
3. [`TYPESCRIPT_MIGRATION_PLAN.md`](TYPESCRIPT_MIGRATION_PLAN.md) — Priority 3

**Your First Month**:
- Week 1: Extract welcome-screen view (easiest)
- Week 2: Extract comparator view
- Week 3: Keyboard navigation fixes
- Week 4: Review and polish

**Tech Stack**:
- JavaScript/TypeScript
- Vite build system
- WCAG accessibility
- Supabase (for sync feature)

---

### 👤 Project Manager

**Your Goal**: Coordinate team, track progress, ensure quality

**Required Reading**:
1. [`PROJECT_RESOURCE_PLAN.md`](PROJECT_RESOURCE_PLAN.md) — Budget & timeline
2. [`PARTIAL_TASKS_REGISTRY.md`](PARTIAL_TASKS_REGISTRY.md) — Track partial work
3. [`GATE_BASED_SUMMARY.md`](GATE_BASED_SUMMARY.md) — Monitor gates

**Weekly Tasks**:
- Monday: Check author progress
- Wednesday: Review quality gates
- Friday: Team sync meeting

**Key Metrics**:
- Questions written per week (target: 250)
- Gates passing (target: 18/18)
- Budget burn rate

---

### 👤 Reviewer

**Your Goal**: Ensure question quality before marking DONE

**Required Reading**:
1. [`QUESTION_AUTHORING_PROCESS.md`](QUESTION_AUTHORING_PROCESS.md) — Quality gates
2. [`QUESTION_TEMPLATES_FOR_AUTHORS.md`](QUESTION_TEMPLATES_FOR_AUTHORS.md) — Quality standards

**Review Checklist**:
- [ ] Stem is clear and unambiguous
- [ ] Exactly 1 correct answer
- [ ] All distractors plausible
- [ ] optionFeedback exists for all options
- [ ] Source lesson referenced
- [ ] Level appropriate
- [ ] No duplicates

**Weekly Commitment**: 5 hours

---

## Weekly Team Cadence

### Monday (30 min)
- **Status updates** in Slack
- **Blockers** identification
- **Week goals** confirmation

### Wednesday (1 hour)
- **Quality gate review** — run `npm run qa:questions:strict`
- **Coverage check** — run `npm run questions:coverage-targets:strict`
- **Remediation** if needed

### Friday (1 hour)
- **Team sync meeting** (Zoom/Meet)
- **Progress demo**
- **Week retrospective**
- **Next week planning**

---

## FAQ

### For Question Authors

**Q: What if I don't understand a concept?**
A: Ask in the team channel. Reference the source lesson in `LESSONS_DATA`. If still unclear, escalate to reviewer.

**Q: How long should one question take?**
A: MC questions: 15-30 minutes. Fill questions: 10-20 minutes. Complex ones may take longer.

**Q: Can I use external sources?**
A: Yes, but verify against source lessons. Document sources in `explanation` field.

**Q: What if I find errors in existing questions?**
A: Report immediately in Slack. Don't fix yourself — coordinate with team.

**Q: How do I know if my questions are good?**
A: Run validation: `npm run validate:strict` and `npm run qa:questions:strict`

### For Developers

**Q: Should I extract views in order?**
A: Yes! Follow priority in [`VIEW_EXTRACTION_PLAN.md`](VIEW_EXTRACTION_PLAN.md): welcome-screen → comparator → concept-sprint → etc.

**Q: What if extraction breaks something?**
A: Tests should catch it. Run `npm test` after each extraction. Rollback if needed.

**Q: Can I refactor while extracting?**
A: Minimal changes only. Focus on extraction first, optimization later.

### For Everyone

**Q: Where is the source of truth?**
A: `EXECUTION_TASKS.md` is the master task list. Documentation is in `docs/`.

**Q: How do I update documentation?**
A: Documentation is now frozen except for critical corrections. Future updates go through PR process.

**Q: What if something isn't documented?**
A: Ask in team channel. If it's a gap, we'll add it.

---

## Critical Path to Finish Line 1

```
WEEK 1-2: Setup
├── Recruit 4 authors + 1 reviewer
├── Onboard team with this handbook
└── Assign first batches

WEEK 3-6: Intensive Writing
├── Authors: 250 questions/week
├── Reviewer: Review batches
└── Developer: Fix technical debt

WEEK 7-8: Completion
├── Final questions
├── Full QA run
└── 18/18 gates passing

FINISH LINE 1: COMPLETE 🎉
```

---

## Emergency Contacts / Escalation

| Issue | Who to Contact | How |
|-------|----------------|-----|
| Process questions | Reviewer | Slack DM |
| Technical issues | Lead Developer | Slack #dev |
| Quality gates failing | Project Manager | Slack #urgent |
| Documentation errors | Documentation Lead | GitHub issue |
| Scope creep | Project Manager | Weekly meeting |

---

## Glossary

| Term | Definition |
|------|------------|
| **MC** | Multiple Choice question |
| **Fill** | Fill-in-the-blank question |
| **P0/P1/P2** | Priority levels (Critical/High/Medium) |
| **Gate** | Quality checkpoint that must pass |
| **QMAN** | Question MANual authoring batch |
| **View** | UI component (like a page/screen) |
| **AUDIT** | Security/quality review |
| **FWD** | Forward execution task |

---

## Appendix: Quick Commands

```bash
# Validate questions
npm run validate:strict

# QA check
npm run qa:questions:strict

# Check coverage
npm run questions:coverage-targets:strict

# All gates
npm run finish-line:pre-release

# Build
npm run build

# Test
npm test
```

---

**Welcome to the team! This handbook is your starting point. Read your role section, then dive into the linked documents.**

**Questions? Ask in the team channel. We're all here to help.** 🚀
