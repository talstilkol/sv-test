# View Extraction Plan — Modularization of app.js

> **Task**: P3.10.3 / AUDIT-FIX-28  
> **Status**: Planning Complete  
> **Date**: 2026-05-02  
> **Estimated Effort**: 40-60 hours of developer work

## Current State

### app.js Statistics
- **Total Lines**: ~36,175
- **Views Identified**: 14 legacy views + 3 completed extractions
- **Completed**: `scoring.js`, `context-tree.js` helpers
- **Pending**: 14 views need extraction

## 14 Views to Extract

### Priority 1: Core Learning Views (Extract First)

#### 1. welcome-screen
**Lines in app.js**: ~20-30 (DOM element setup)
**Functionality**: Initial landing view
**Dependencies**: None (pure UI)
**Complexity**: Low
**Est. Effort**: 2-3 hours

**Extraction Strategy**:
```javascript
// src/views/welcome-screen.js
export function initWelcomeScreen() {
  const welcomeScreen = document.getElementById("welcome-screen");
  return {
    show() { welcomeScreen.style.display = "block"; },
    hide() { welcomeScreen.style.display = "none"; },
    isVisible: () => welcomeScreen.style.display !== "none"
  };
}
```

#### 2. active-lesson (Lesson Player)
**Lines in app.js**: ~800-1,200
**Functions**: `openLesson()`, `renderLessonContent()`, lesson navigation
**Dependencies**: `LESSONS_DATA`, scoring, context-tree
**Complexity**: High
**Est. Effort**: 8-12 hours

**Key Functions to Extract**:
- `openLesson(lessonId)`
- `renderLessonContent(lesson)`
- `renderConceptCard(concept, index)`
- Lesson navigation (prev/next)
- XP award integration

#### 3. knowledge-map
**Lines in app.js**: ~600-800
**Functions**: `openKnowledgeMap()`, `renderKnowledgeMap()`, tree rendering
**Dependencies**: `LESSONS_DATA`, scores, filtering
**Complexity**: Medium-High
**Est. Effort**: 6-8 hours

**Key Functions**:
- `openKnowledgeMap()`
- `renderKnowledgeMap()`
- `setKnowledgeMapContextTree()`
- `renderKnowledgeMapFilters()`

### Priority 2: Training Views

#### 4. trainer-view
**Lines in app.js**: ~1,000-1,500
**Functions**: Trainer mode, adaptive questions, weak concepts
**Dependencies**: Question bank, scoring, SRS
**Complexity**: High
**Est. Effort**: 10-14 hours

#### 5. guide-view (Quick Guide)
**Lines in app.js**: ~500-700
**Functions**: `openGuide()`, `renderGuide()`, topic blocks
**Dependencies**: `QUICK_GUIDE` data
**Complexity**: Medium
**Est. Effort**: 5-7 hours

#### 6. grandma-knowledge-view
**Lines in app.js**: ~600-900
**Functions**: Atlas view, term navigation
**Dependencies**: `GRANDMA_KNOWLEDGE` data
**Complexity**: Medium
**Est. Effort**: 6-8 hours

### Priority 3: Practice Views

#### 7. flashcards-view
**Lines in app.js**: ~1,500-2,000
**Functions**: SRS flashcards, rating (Again/Hard/Good/Easy)
**Dependencies**: SRS, localStorage, question bank
**Complexity**: High
**Est. Effort**: 12-16 hours

**Key Functions**:
- `openFlashcards()`
- `renderFlashcards()`
- `buildFlashcardItems()`
- `rateFlashcard(rating)`
- `flashcardExplanationFor()`

#### 8. code-anatomy-view
**Lines in app.js**: ~600-800
**Functions**: Code breakdown, token explanations
**Dependencies**: `getAnatomyCatalog()`
**Complexity**: Medium
**Est. Effort**: 5-7 hours

#### 9. codeblocks-view
**Lines in app.js**: ~800-1,200
**Functions**: Interactive code with questions
**Dependencies**: `CODE_BLOCKS`, question bank
**Complexity**: Medium-High
**Est. Effort**: 8-10 hours

#### 10. trace-view
**Lines in app.js**: ~400-600
**Functions**: Code execution trace questions
**Dependencies**: Trace data
**Complexity**: Low-Medium
**Est. Effort**: 4-6 hours

### Priority 4: Exam & Utility Views

#### 11. mock-exam-view
**Lines in app.js**: ~2,000-3,000
**Functions**: Exam templates, timer, submission, scoring
**Dependencies**: All question types, history, XP
**Complexity**: Very High
**Est. Effort**: 15-20 hours

**Key Functions**:
- `openMockExam()`
- `renderExamSettings()`
- `startMockExamFromTemplate()`
- `renderMxQuestion()`
- `submitMockExam()`
- `renderExamResult()`

#### 12. comparator-view
**Lines in app.js**: ~300-500
**Functions**: Side-by-side comparisons
**Dependencies**: `COMPARISONS` data
**Complexity**: Low
**Est. Effort**: 3-4 hours

#### 13. gap-matrix-view
**Lines in app.js**: ~400-600
**Functions**: Weak concept analysis
**Dependencies**: Scores, lesson data
**Complexity**: Medium
**Est. Effort**: 4-6 hours

#### 14. concept-sprint-view
**Lines in app.js**: ~300-500
**Functions**: Rapid concept diagnosis
**Dependencies**: Question bank
**Complexity**: Low-Medium
**Est. Effort**: 4-5 hours

## Extraction Strategy

### Phase 1: Setup (2 hours)
1. Create view registry pattern
2. Setup view loader
3. Define view interface contract

```javascript
// src/views/view-registry.js
const views = {};

export function registerView(name, viewModule) {
  views[name] = viewModule;
}

export function openView(name, options = {}) {
  hideAllViews();
  const view = views[name];
  if (view) {
    view.open(options);
    setActiveNavButton(name);
  }
}
```

### Phase 2: Extract Views (Priority Order)

| Phase | Views | Est. Hours | Cumulative |
|-------|-------|-----------|-------------|
| 1 | welcome-screen, comparator, concept-sprint | 10h | 10h |
| 2 | guide, grandma-knowledge, trace | 15h | 25h |
| 3 | knowledge-map, code-anatomy, codeblocks | 20h | 45h |
| 4 | trainer, flashcards | 22h | 67h |
| 5 | mock-exam (complex) | 18h | 85h |
| 6 | active-lesson (complex) | 10h | 95h |

### Phase 3: Cleanup (5-10 hours)
- Remove extracted code from app.js
- Update all imports
- Verify no broken references
- Run full test suite

## View Interface Contract

Each view module must export:

```typescript
interface ViewModule {
  // Required
  open(options?: object): void;
  close(): void;
  
  // Optional
  render(): void;
  refresh(): void;
  setContextTree?(): void;
  
  // State (internal)
  isOpen: boolean;
}
```

## Dependencies Map

```
app.js (main shell)
├── src/views/welcome-screen.js (none)
├── src/views/active-lesson.js
│   ├── src/core/scoring.js
│   ├── src/views/context-tree.js
│   └── data/lessons.js
├── src/views/knowledge-map.js
│   ├── src/core/scoring.js
│   └── data/lessons.js
├── src/views/trainer-view.js
│   ├── src/core/scoring.js
│   ├── lib/rng.js
│   └── data/questions_bank.js
├── src/views/flashcards-view.js
│   ├── src/core/srs.js
│   ├── lib/rng.js
│   └── data/lessons.js
└── ... (other views)
```

## Migration Checklist per View

- [ ] Identify all functions belonging to view
- [ ] Identify all DOM element references
- [ ] Identify all state variables
- [ ] Identify all event listeners
- [ ] Identify all dependencies (imports needed)
- [ ] Create view file with proper exports
- [ ] Move functions to view module
- [ ] Update DOM references to use parameters/IDs
- [ ] Wire up event listeners in open()/close()
- [ ] Update app.js to use new view module
- [ ] Test view in isolation
- [ ] Verify no regressions in app.js
- [ ] Update unit tests if any

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Breaking existing functionality | Test each view after extraction |
| State management issues | Keep global state minimal, pass via options |
| Event listener leaks | Always cleanup in close() |
| Circular dependencies | Use dependency injection, not hard imports |
| Performance regression | Lazy load views, don't eager import all |

## Verification Commands

```bash
# After each view extraction
npm run build
npm run validate:strict
npm run qa:questions:strict

# Full verification after all extractions
npm run test:views
npm run build -- --analyze
npm run pilot:readiness:strict
```

## Success Criteria

- [ ] app.js < 10,000 lines (from 36,175)
- [ ] Each view < 3,000 lines
- [ ] No view-to-view direct imports (use registry)
- [ ] All existing tests pass
- [ ] No UI regressions
- [ ] Build size reduced

## Next Steps for Developer

1. **Start with welcome-screen** (easiest, ~2 hours)
2. **Then comparator** (simple data view, ~3 hours)
3. **Build confidence** with 2-3 easy views
4. **Tackle complex views** (mock-exam, active-lesson) last
5. **Test continuously** — don't batch all changes

---

**This plan provides detailed guidance for a developer to execute the extraction.**
