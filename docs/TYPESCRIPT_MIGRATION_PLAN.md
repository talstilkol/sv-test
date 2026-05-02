# TypeScript Migration Plan

> **Task**: AUDIT-FIX-29  
> **Current Status**: Core modules migrated (lib/srs.ts, lib/rng.ts, src/core/*)  
> **Pending**: View modules, app.js types, strict mode  
> **Est. Effort**: 30-50 hours developer work

## Current State

### ✅ Migrated
- `lib/srs.ts` — Spaced repetition system
- `lib/rng.ts` — Random number generation
- `src/core/scoring.js` — Scoring logic
- `src/core/progress-sync.js` — Sync logic

### ❌ Pending (14 items)
1. app.js → TypeScript + strict types
2. 14 view modules (after extraction from P3.10.3)
3. UI components
4. Data layer types
5. Test files

## Migration Strategy

### Phase 1: Type Definitions (5-8 hours)

Create central type definitions first:

```typescript
// src/types/index.ts

// Domain types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  concepts: Concept[];
}

export interface Concept {
  conceptName: string;
  conceptDefinition: string;
  codeExample?: string;
  codeExplanation?: string;
  illustration?: string;
  extendedTab?: ExtendedTab;
}

export interface ExtendedTab {
  codeBreakdowns?: CodeBreakdown[];
  commonErrors?: string[];
  relatedConcepts?: string[];
}

export interface CodeBreakdown {
  code: string;
  parts: CodePart[];
  summary?: string;
}

export interface CodePart {
  piece: string;
  role: string;
}

// Question types
export interface MCQuestion {
  id: string;
  type: 'mc';
  stem: string;
  options: { id: string; text: string }[];
  correct: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  conceptKey: string;
  optionFeedback?: Record<string, string>;
}

export interface FillQuestion {
  id: string;
  type: 'fill';
  stem: string;
  answer: string | string[];
  hint?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  conceptKey: string;
}

export type Question = MCQuestion | FillQuestion;

// Score/Progress types
export interface ConceptScore {
  level: number;
  attempts: number;
  correct: number;
  streak: number;
  weakReports?: number;
  lastAsked?: string;
  srsState?: SRSState;
}

export interface SRSState {
  interval: number;
  repetitions: number;
  easeFactor: number;
  dueDate: string;
}

export interface UserProgress {
  [conceptKey: string]: ConceptScore;
}

// View types
export interface ViewModule {
  open(options?: Record<string, unknown>): void;
  close(): void;
  render?(): void;
  setContextTree?(): void;
}

// Window extensions
declare global {
  interface Window {
    LESSONS_DATA?: Lesson[];
    QUESTIONS_BANK?: { questions: Question[] };
    QUICK_GUIDE?: QuickGuide;
    GRANDMA_KNOWLEDGE?: GrandmaKnowledge;
    CODE_BLOCKS?: CodeBlocks;
    COMPARISONS?: Comparisons;
    LUMEN_OPEN_VIEW?: (view: string) => void;
    LUMEN_OPEN_CONCEPT_SPRINT?: () => void;
    LUMEN_OPEN_MOCK_EXAM?: () => void;
  }
}
```

### Phase 2: Gradual Migration Strategy

Use "strictness levels" approach:

```
Level 1: Allow JS, check JS (tsconfig: allowJs, checkJs)
Level 2: TypeScript files, loose types (any allowed)
Level 3: TypeScript files, strict types
Level 4: Strict mode, no implicit any
```

### Phase 3: View Module Types (10-15 hours)

After P3.10.3 extracts views, add types:

```typescript
// src/views/trainer-view.ts
import { ViewModule, Question, UserProgress } from '../types';

export interface TrainerState {
  mode: 'adaptive' | 'weak';
  currentQuestion: Question | null;
  history: string[];
}

export const trainerView: ViewModule = {
  open(options?: { mode?: 'adaptive' | 'weak' }) {
    // implementation
  },
  
  close() {
    // implementation
  },
  
  render() {
    // implementation
  },
  
  setContextTree() {
    // implementation
  }
};
```

### Phase 4: App.js Migration (15-20 hours)

This is the most complex file. Strategy:

1. Rename to `app.ts`
2. Add type annotations to functions one by one
3. Replace `var` with `let/const`
4. Add null checks
5. Enable strict flags gradually

Example migration pattern:

```javascript
// Before
function renderConceptCard(concept, index) {
  var card = document.createElement('div');
  card.innerHTML = concept.codeExample;
  return card;
}

// After
function renderConceptCard(concept: Concept, index: number): HTMLElement {
  const card = document.createElement('div');
  card.innerHTML = concept.codeExample ?? '';
  return card;
}
```

## tsconfig.json Setup

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": false,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "allowJs": true,
    "checkJs": true,
    "outDir": "./dist",
    "rootDir": ".",
    "removeComments": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["src/types/*"],
      "@/core/*": ["src/core/*"],
      "@/views/*": ["src/views/*"],
      "@/ui/*": ["src/ui/*"]
    }
  },
  "include": ["src/**/*", "lib/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Gradual strictness increase**:

```json
// Phase 1: Baseline
"strict": false,
"noImplicitAny": false,

// Phase 2: Some checks
"strictNullChecks": true,
"noImplicitReturns": true,

// Phase 3: Strict
"strict": true,
"noImplicitAny": true
```

## Migration Schedule

| Week | Focus | Files | Hours |
|------|-------|-------|-------|
| 1 | Type definitions, tsconfig | types/*, core/* | 8h |
| 2 | Utility functions | utils/*, lib/* | 10h |
| 3 | View modules (simple) | welcome, comparator | 8h |
| 4 | View modules (complex) | trainer, flashcards | 12h |
| 5 | Main app.ts | app.js → app.ts | 15h |
| 6 | Strict mode, tests | Enable strict, fix errors | 10h |

**Total: 63 hours (phased over 6 weeks)**

## Common Migration Patterns

### Pattern 1: Optional Properties
```javascript
// Before
function getExplanation(concept) {
  return concept.explanation || 'No explanation';
}

// After
function getExplanation(concept: Concept): string {
  return concept.explanation ?? 'No explanation';
}
```

### Pattern 2: Type Guards
```typescript
function isMCQuestion(q: Question): q is MCQuestion {
  return q.type === 'mc';
}

function renderQuestion(q: Question) {
  if (isMCQuestion(q)) {
    // TypeScript knows q is MCQuestion here
    return renderMC(q);
  }
  // ...
}
```

### Pattern 3: Null Safety
```typescript
// Before
const score = getScore(lessonId, conceptName);
const level = score.level || 1;

// After
const score = getScore(lessonId, conceptName);
const level = score?.level ?? 1;  // Optional chaining
```

### Pattern 4: DOM Elements
```typescript
// Before
const btn = document.getElementById('submit');
btn.addEventListener('click', handler);

// After
const btn = document.getElementById('submit');
if (!btn) throw new Error('Submit button not found');
btn.addEventListener('click', handler);
```

## Testing After Migration

```bash
# Type checking
npm run typecheck

# Build
npm run build

# Run all tests
npm test

# Specific tests
npm run test:core
npm run test:views
```

## Rollback Plan

If migration causes issues:

1. Keep .js backups until stable
2. Use `// @ts-ignore` for temporary bypass
3. Disable strict flags that cause issues
4. Gradual re-enable after fixes

## Success Metrics

- [ ] Zero TypeScript errors (with current strictness)
- [ ] All tests pass
- [ ] Build successful
- [ ] No runtime regressions
- [ ] Developer experience improved (IDE autocomplete)

---

**This plan provides detailed guidance for implementing AUDIT-FIX-29 TypeScript migration.**
