# Activity Guide: Trace / Build / Bug

> **Status**: Active Guide  
> **Date**: 2026-05-01  
> **Goal**: Create authentic code activities for every relevant concept

## Activity Types

```
┌─────────────────────────────────────────────────────────────┐
│                    ACTIVITY TYPES                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TRACE — Follow execution          BUILD — Create code      │
│  ├── Code flow analysis              ├── Implementation    │
│  ├── Variable tracing                ├── Feature creation   │
│  └── Output prediction               └── Project building   │
│                                                             │
│  BUG — Fix broken code                                        │
│  ├── Syntax errors                                          │
│  ├── Logic errors                                           │
│  └── Debugging practice                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## When to Create Activities

### Concepts That Need Activities

| Concept Type | Trace | Build | Bug |
|-------------|-------|-------|-----|
| **Functions** | ✅ | ✅ | ✅ |
| **Conditionals** | ✅ | ✅ | ✅ |
| **Loops** | ✅ | ✅ | ✅ |
| **DOM manipulation** | ✅ | ✅ | ✅ |
| **Event handling** | ✅ | ✅ | ✅ |
| **Async/Promises** | ✅ | ✅ | ✅ |
| **Data structures** | ✅ | ✅ | ✅ |
| **React components** | ✅ | ✅ | ✅ |
| **CSS selectors** | ✅ | ✅ | ❌ |
| **HTML structure** | ❌ | ✅ | ❌ |

### Priority Matrix

| Priority | Concepts | Action |
|----------|----------|--------|
| **P0** | SVCollege core (Lessons 11-25) | Create all 3 types |
| **P1** | Remaining 222 gaps | Create at least 1 type |
| **P2** | Post-SVCollege | Assign to future portals |

## Trace Activity Format

### Template

```javascript
{
  type: "activity",
  activityType: "trace",
  concept: "lesson_12::map",
  title: "Trace: map transformation",
  
  // Code to trace
  code: `
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
console.log(doubled);
  `,
  
  // Questions about execution
  questions: [
    {
      type: "MC",
      stem: "What is the value of doubled after execution?",
      options: ["[1, 2, 3, 4]", "[2, 4, 6, 8]", "[1, 4, 9, 16]", "undefined"],
      correct: "B",
      explanation: "map creates a new array with each element transformed by the callback."
    },
    {
      type: "fill",
      stem: "How many times does the callback function execute?",
      answer: "4",
      explanation: "The callback executes once for each element in the array."
    }
  ],
  
  // Difficulty
  level: 4,
  
  // Source verification
  sourceLesson: "lesson_12",
  sourceConcept: "map"
}
```

### Trace Activity Variations

1. **Variable tracing** — Follow value changes
2. **Output prediction** — What will log?
3. **Execution order** — What runs first?
4. **Scope analysis** — What's accessible where?

## Build Activity Format

### Template

```javascript
{
  type: "activity",
  activityType: "build",
  concept: "lesson_13::createElement",
  title: "Build: Create a todo item",
  
  // Instructions
  instructions: "Create a function that builds a todo item DOM element with checkbox and text.",
  
  // Starter code (optional)
  starterCode: `
function createTodoItem(text) {
  // Your code here
}
  `,
  
  // Validation tests (hidden from student)
  tests: [
    {
      name: "Returns element",
      test: "typeof createTodoItem('test') === 'object'",
      message: "Function should return a DOM element"
    },
    {
      name: "Has checkbox",
      test: "createTodoItem('test').querySelector('input[type=\"checkbox\"]') !== null",
      message: "Should include a checkbox input"
    },
    {
      name: "Displays text",
      test: "createTodoItem('Buy milk').textContent.includes('Buy milk')",
      message: "Should display the provided text"
    }
  ],
  
  // Difficulty
  level: 5,
  
  // Hints (progressive)
  hints: [
    "Use document.createElement()",
    "Create a container div, checkbox, and span",
    "Use textContent or innerText for the text"
  ]
}
```

### Build Activity Variations

1. **Implement function** — Write code from spec
2. **Complete snippet** — Fill in blanks
3. **Create feature** — Build complete component
4. **Refactor** — Improve existing code

## Bug Activity Format

### Template

```javascript
{
  type: "activity",
  activityType: "bug",
  concept: "lesson_12::forEach",
  title: "Bug: Fix the loop",
  
  // Broken code
  buggyCode: `
const numbers = [1, 2, 3, 4];
let sum = 0;

numbers.forEach(num => {
  sum + num;
});

console.log(sum); // Expected: 10, Actual: 0
  `,
  
  // Bug description
  bugDescription: "The sum is not being calculated correctly. Find and fix the bug.",
  
  // Expected fix
  solution: `
numbers.forEach(num => {
  sum += num;  // or: sum = sum + num;
});
  `,
  
  // Multiple choice options for what's wrong
  diagnosisOptions: [
    "The forEach callback should return a value",
    "sum + num doesn't update sum; should be sum += num",
    "forEach can't be used for summing; use reduce instead",
    "The array should be sorted first"
  ],
  correctDiagnosis: "B",
  
  // Difficulty
  level: 3,
  
  // Explanation
  explanation: "sum + num calculates the sum but doesn't store it. sum += num is shorthand for sum = sum + num, which properly updates the variable."
}
```

### Bug Activity Variations

1. **Syntax errors** — Won't run
2. **Logic errors** — Runs but wrong output
3. **Runtime errors** — Crashes on certain inputs
4. **Performance bugs** — Works but slow
5. **Security bugs** — XSS, injection, etc.

## Activity Coverage Target

Per **FWD-3.2**, **FWD-3.3**, **FWD-3.4**:

### Requirements

| Requirement | Check |
|-------------|-------|
| Based on existing concept | [ ] |
| Not placeholder/generic | [ ] |
| Has test data/shape | [ ] |
| Has browser smoke test | [ ] |

### Current Gaps (222)

From `QUESTION_ACTIVITY_COVERAGE_REPORT`:

| Category | Count | Priority |
|----------|-------|----------|
| SVCollege Priority | 0 | ✅ Done |
| HTML/CSS Foundation | ~45 | P1 |
| JS Advanced | ~67 | P1 |
| React Specific | ~58 | P1 |
| Tooling/DevOps | ~52 | P2 |

### Post-SVCollege Plan (FWD-3.5)

After SVCollege release:
1. Map remaining 222 gaps to future portals
2. Create activities for portal-appropriate concepts
3. Archive concepts not fitting any portal

## Browser Smoke Test

Per **FWD-3.4**:

```javascript
// tests/activity-smoke.spec.js
test('Trace activity renders and executes', async ({ page }) => {
  await page.goto('/?activity=trace_map_001');
  
  // Activity loads
  await expect(page.locator('.activity-container')).toBeVisible();
  
  // Code is displayed
  await expect(page.locator('.code-block')).toContainText('map');
  
  // Questions are interactive
  await page.click('.option-A');
  await expect(page.locator('.option-A')).toHaveClass('selected');
});
```

## Verification Commands

```bash
# Check activity coverage
npm run questions:activity-coverage:strict

# Verify specific activity
npm run test:activity -- --id=trace_map_001

# Full activity audit
npm run audit:activities:strict
```

## Integration with Question Bank

Activities complement MC/Fill questions:

```
Concept Coverage
├── Questions (MC + Fill) — Conceptual understanding
└── Activities (Trace/Build/Bug) — Practical application
    ├── Trace — Understanding existing code
    ├── Build — Creating new code
    └── Bug — Fixing broken code
```

## Success Criteria

Per concept:
- ✅ ≥3 MC questions
- ✅ ≥2 Fill questions
- ✅ ≥1 Activity (Trace/Build/Bug) — **where relevant**

All activities must:
- Be based on real lesson content
- Have automated tests
- Pass browser smoke
- Include hints/explanations
