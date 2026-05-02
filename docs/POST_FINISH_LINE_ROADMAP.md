# Post Finish Line 1 Roadmap

> **Status**: Planned (Execute only after 18/18 gates)  
> **Date**: 2026-05-01  
> **Trigger**: `finish-line:pre-release` shows 18/18 PASS  
> **Goal**: Technical debt reduction + feature expansion

## Execution Order

```
Finish Line 1 Complete (18/18)
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: STABILIZATION (Week 1-2)                          │
│  ├── Pilot with 10 students (FWD-6.x)                       │
│  ├── QA testing (FWD-5.x)                                   │
│  └── Bug fixes from pilot                                   │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: TECHNICAL DEBT (Week 3-6)                         │
│  ├── Modularization (FWD-8.1, FWD-8.6)                    │
│  ├── Payload optimization (SYS-AUDIT-019)                   │
│  ├── CSS splitting (FWD-8.2, FWD-8.7)                       │
│  └── TypeScript expansion (FWD-8.8)                         │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 3: EXPANSION (Week 7-12)                             │
│  ├── Supabase Sync (FWD-8.3)                                │
│  ├── Museum/Store/Community (FWD-8.4)                       │
│  ├── E2E testing (FWD-8.9)                                  │
│  └── Telemetry (FWD-8.10)                                   │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│  PHASE 4: PRODUCTIZATION (Week 13+)                         │
│  ├── Pricing validation (FWD-8.5)                             │
│  ├── Public launch                                          │
│  └── Continuous improvement                                 │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Stabilization

### Pilot Execution (FWD-6.x)

Already documented in `docs/PILOT_OUTCOME_LOOP_PLAN.md`.

**Entry Criteria**:
- 18/18 gates passing
- Content frozen (no changes during pilot)
- 10 volunteer students recruited

**Exit Criteria**:
- D1 retention ≥ 70%
- D7 retention ≥ 50%
- Mastery movement ≥ +1.5 levels
- Critical bugs fixed

### QA Testing (FWD-5.x)

Already documented in `docs/QA_TESTING_PLAN.md`.

**Test Coverage**:
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Android Chrome
- Keyboard-only navigation
- Screen reader compatibility (basic)

## Phase 2: Technical Debt

### 2.1 Modularization (FWD-8.1, FWD-8.6)

**Current State**: `app.js` = 35,611 lines
**Target**: Modular architecture with dynamic imports

#### Module Breakdown

```
src/
├── core/
│   ├── scoring.js ✅
│   ├── progress-sync.js ✅
│   ├── event-bus.js     (extract)
│   └── state-manager.js (extract)
├── views/
│   ├── context-tree.js ✅
│   ├── lesson-renderer.js (extract from app.js)
│   ├── chrome-menu.js     (extract from app.js)
│   ├── settings-panel.js  (extract from app.js)
│   ├── question-panel.js  (extract from app.js)
│   └── bug-log.js         (extract from app.js)
├── ui/
│   ├── modal.js           (extract)
│   ├── toast.js           (extract)
│   └── tooltip.js         (extract)
└── utils/
    ├── dom-ready.js ✅
    └── sanitizer.js       (extract)
```

#### Dynamic Import Strategy

```javascript
// Instead of loading everything upfront:
const lessonView = await import('./views/lesson-renderer.js');
lessonView.render(lessonId);
```

#### Bundle Size Monitoring (FWD-8.6)

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lesson')) return 'lesson';
          if (id.includes('quiz')) return 'quiz';
          if (id.includes('exam')) return 'exam';
        }
      }
    }
  }
}
```

### 2.2 Payload Optimization (SYS-AUDIT-019, FWD-8.2)

Already documented in `docs/PAYLOAD_OPTIMIZATION_PLAN.md`.

**Targets**:
- CSS: 465 KB → 200 KB
- HTML: 102 KB → 50 KB
- JS Core: 141 KB → 100 KB

### 2.3 CSS Feature Splitting (FWD-8.7)

```css
/* Instead of one global style.css */

/* core.css - Always loaded */
@import './variables.css';
@import './reset.css';
@import './utilities.css';

/* layout.css - Loaded with app shell */
@import './grid.css';
@import './chrome.css';

/* lesson.css - Lazy loaded with lesson view */
@import './lesson-cards.css';
@import './concept-tree.css';

/* quiz.css - Lazy loaded with quiz */
@import './question-types.css';
@import './feedback.css';
```

### 2.4 TypeScript Expansion (FWD-8.8)

**Priority Order**:
1. Interfaces for data types (Lesson, Concept, Question, Score)
2. Core modules (already in progress)
3. View components
4. Utility functions

```typescript
// types/lesson.ts
export interface Lesson {
  id: string;
  title: string;
  oneLiner: string;
  concepts: Concept[];
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Concept {
  key: string;
  name: string;
  enrichment: Enrichment;
  questions: Question[];
}
```

## Phase 3: Expansion

### 3.1 Supabase Sync (FWD-8.3)

**Current**: Local-only progress
**Target**: Cloud sync with conflict resolution

Already documented in core, needs production endpoint.

### 3.2 Museum / Store / Community (FWD-8.4)

**Condition**: Only after core learning is stable

| Feature | Priority | Dependency |
|---------|----------|------------|
| Museum | P2 | Content collection |
| Store | P3 | Economy design |
| Community | P4 | Moderation system |

### 3.3 E2E Testing (FWD-8.9)

**Tool**: Playwright
**Flows to Test**:
1. Open lesson → Navigate concepts → Answer questions
2. Switch modules → Resume progress
3. Exam mode → Submit → Review
4. Offline → Make progress → Online → Sync

```javascript
// tests/e2e/learning-flow.spec.js
test('complete learning session', async ({ page }) => {
  await page.goto('/');
  
  // Open lesson
  await page.click('[data-testid="lesson-11"]');
  await expect(page.locator('.lesson-title')).toContainText('HTML Basics');
  
  // Navigate concept
  await page.click('[data-testid="next-concept"]');
  
  // Answer question
  await page.click('[data-testid="option-B"]');
  await page.click('[data-testid="submit"]');
  
  // Verify progress saved
  await page.reload();
  await expect(page.locator('.progress-bar')).toHaveAttribute('value', '50');
});
```

### 3.4 Telemetry (FWD-8.10)

**Current**: Bug Agent (local only)
**Future**: Sentry/Plausible (with consent)

**Requirements** (from `docs/TELEMETRY_POLICY.md`):
- Dedicated account
- Privacy notice
- PII policy
- User consent mechanism

## Phase 4: Productization

### 4.1 Pricing Validation (FWD-8.5)

**Status**: `unknown/unavailable` until evidence exists

**Research Needed**:
- User willingness to pay
- Competitive pricing
- Feature tiers
- Payment methods

**Approach**:
1. Survey pilot participants
2. A/B test pricing pages
3. Interview potential customers
4. Analyze conversion funnels

## Verification at Each Phase

### Phase 1 Exit Gates

| Gate | Criteria |
|------|----------|
| Pilot complete | 10 students, 7 days |
| Retention met | D1 ≥ 70%, D7 ≥ 50% |
| No critical bugs | 0 P0 bugs |

### Phase 2 Exit Gates

| Gate | Criteria |
|------|----------|
| app.js < 10K lines | Modularization complete |
| Bundle < 350 KB | Optimization complete |
| All tests pass | No regressions |

### Phase 3 Exit Gates

| Gate | Criteria |
|------|----------|
| Sync working | Live Supabase integration |
| E2E tests pass | All flows covered |
| Museum functional | MVP complete |

## Commands

```bash
# Phase 1: Stabilization
npm run pilot:execute
npm run qa:full-suite

# Phase 2: Technical Debt
npm run refactor:modularize
npm run optimize:payload
npm run build -- --analyze

# Phase 3: Expansion
npm run sync:supabase:setup
npm run test:e2e

# Phase 4: Productization
npm run validate:pricing:readiness
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Pilot fails criteria | Iterate on UX, re-pilot |
| Modularization breaks | Feature flags, gradual rollout |
| Sync issues | Fallback to local-only |
| Scope creep | Strict Finish Line 1 requirement |

## Summary

This roadmap is **conditional on Finish Line 1 completion**. No Phase 2+ work begins until:
- ✅ 18/18 gates passing
- ✅ Pilot successful
- ✅ QA complete

All dates are relative to Finish Line 1 completion date.
