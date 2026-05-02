# Question Templates for Manual Authors

> **Date**: 2026-05-01  
> **Purpose**: Templates and examples for consistent question writing  
> **Target Audience**: Manual question authors

## MC Question Template

### Structure

```javascript
{
  id: "[module]_[concept]_[number]",
  type: "mc",
  conceptKey: "[module]::[concept]",
  topicId: "[topic_id]",
  level: [1-7], // 1=beginner, 7=professor
  
  stem: "[Clear, unambiguous question text]",
  
  options: [
    { id: "A", text: "[Distractor - plausible but wrong]" },
    { id: "B", text: "[Correct answer]" },
    { id: "C", text: "[Distractor - common misconception]" },
    { id: "D", text: "[Distractor - related but incorrect]" }
  ],
  
  correct: "B",
  
  // REQUIRED: Per-distractor feedback
  optionFeedback: {
    "A": "[Why this is wrong - specific explanation]",
    "B": "✓ [Why this is correct]",
    "C": "[Common misconception addressed]",
    "D": "[Why this is wrong - educational note]"
  },
  
  explanation: "[General explanation of the concept]",
  source: "[lesson_X, section_Y]"
}
```

### Quality Criteria

- ✅ Stem is clear and unambiguous
- ✅ Exactly 4 options (A, B, C, D)
- ✅ Exactly 1 correct answer
- ✅ All distractors are plausible
- ✅ No "all of the above" or "none of the above"
- ✅ No negative phrasing ("Which is NOT...")
- ✅ optionFeedback for ALL options
- ✅ Source lesson referenced

## Fill Question Template

### Structure

```javascript
{
  id: "[module]_[concept]_[number]",
  type: "fill",
  conceptKey: "[module]::[concept]",
  topicId: "[topic_id]",
  level: [1-7],
  
  stem: "The [context] _______ [rest of sentence].",
  
  answer: ["[primary answer]", "[acceptable alternative]"],
  
  hint: "[Helpful clue that doesn't give away the answer]",
  
  explanation: "[Full explanation of why the answer is correct]",
  source: "[lesson_X, section_Y]"
}
```

### Single Blank Rule (CRITICAL)

```javascript
// ✅ GOOD: Single blank, critical concept
{
  stem: "The _______ method returns the first element matching a CSS selector.",
  answer: ["querySelector", "document.querySelector"]
}

// ❌ BAD: Multiple blanks - DON'T DO THIS
{
  stem: "The _______ method with selector _______ returns the first element.",
  answer: ["querySelector", ".class"]
  // This violates FWD-2.6
}
```

### No Answer Leak Rule (CRITICAL)

```javascript
// ✅ GOOD: Answer not in stem
{
  stem: "Which method creates a new DOM element from a tag name?",
  answer: "createElement"
}

// ❌ BAD: Answer leaked in stem
{
  stem: "The createElement method creates a new _______ element.",
  answer: "DOM"
  // DON'T DO THIS - answer is in stem!
}
```

## Example Questions by Concept

### Example 1: Arrow Functions (Level 4)

```javascript
{
  id: "lesson_15_arrow_function_001",
  type: "mc",
  conceptKey: "lesson_15::arrow function",
  topicId: "es6_features",
  level: 4,
  
  stem: "What is the key difference between arrow functions and regular function expressions regarding the 'this' keyword?",
  
  options: [
    { id: "A", text: "Arrow functions create their own 'this' binding" },
    { id: "B", text: "Arrow functions inherit 'this' from the enclosing scope" },
    { id: "C", text: "Arrow functions cannot use 'this' at all" },
    { id: "D", text: "There is no difference in 'this' behavior" }
  ],
  
  correct: "B",
  
  optionFeedback: {
    "A": "Actually, arrow functions do NOT create their own 'this' binding - that's what regular functions do. This is why arrow functions are useful in callbacks.",
    "B": "✓ Correct! Arrow functions lexically bind 'this', meaning they inherit it from the surrounding context where they were defined.",
    "C": "Arrow functions can definitely use 'this' - they just inherit it rather than creating their own binding.",
    "D": "There is a significant difference - this is one of the main reasons arrow functions were introduced in ES6."
  },
  
  explanation: "Arrow functions differ from regular functions in that they don't have their own 'this', arguments, super, or new.target bindings. They inherit these from the parent scope, making them ideal for callbacks and methods that need to preserve context.",
  source: "lesson_15, section_3"
}
```

### Example 2: Promise (Level 5)

```javascript
{
  id: "lesson_15_promise_001",
  type: "mc",
  conceptKey: "lesson_15::Promise",
  topicId: "async_js",
  level: 5,
  
  stem: "What happens if a Promise executor function throws an error synchronously?",
  
  options: [
    { id: "A", text: "The Promise remains pending forever" },
    { id: "B", text: "The Promise is rejected with the error" },
    { id: "C", text: "The error is silently ignored" },
    { id: "D", text: "JavaScript throws an uncaught exception" }
  ],
  
  correct: "B",
  
  optionFeedback: {
    "A": "The Promise doesn't remain pending - JavaScript automatically catches the error and transitions the Promise to rejected state.",
    "B": "✓ Correct! Any synchronous error thrown in the executor automatically rejects the Promise with that error as the rejection reason.",
    "C": "Errors in Promise executors are never silently ignored - this would make async error handling impossible.",
    "D": "While the error is thrown initially, the Promise mechanism catches it and converts it to a rejection rather than crashing."
  },
  
  explanation: "Promise executors are wrapped in a try-catch by the JavaScript engine. Any synchronous throw is caught and converted to a Promise rejection, ensuring async operations always produce predictable outcomes.",
  source: "lesson_15, section_7"
}
```

### Example 3: Closure (Fill, Level 6)

```javascript
{
  id: "lesson_14_closure_001",
  type: "fill",
  conceptKey: "lesson_14::Closure",
  topicId: "advanced_js",
  level: 6,
  
  stem: "A closure is created when a function retains access to its _______ scope even after the parent function has completed execution.",
  
  answer: ["lexical", "enclosing", "parent", "outer"],
  
  hint: "Think about the scope where the function was originally defined, not where it's called.",
  
  explanation: "A closure allows a function to remember and access variables from its lexical scope (the scope where it was defined) even when executed outside that scope. This happens because functions in JavaScript form closures over their entire surrounding scope chain.",
  source: "lesson_14, section_5"
}
```

## Distractor Writing Guide

### Types of Good Distractors

1. **Common Misconception**
   ```
   Question: What does 'use strict' do?
   Distractor: "Enables TypeScript type checking"
   Why: Many beginners confuse strict mode with TypeScript
   ```

2. **Opposite of Truth**
   ```
   Question: Which statement about const is true?
   Distractor: "const values can be reassigned"
   Why: Opposite of actual behavior, tests understanding
   ```

3. **Partially Correct but Wrong Context**
   ```
   Question: What is the output of [1, 2, 3].map(x => x * 2)?
   Distractor: "undefined"
   Why: Confuses map with forEach which returns undefined
   ```

4. **Plausible Technical Term**
   ```
   Question: Which method creates a shallow copy of an array?
   Distractor: "Array.copy()"
   Why: Sounds plausible but doesn't exist - real answer is slice() or spread
   ```

### Distractor Quality Checklist

- [ ] Each distractor has been wrong for at least one real learner
- [ ] Distractors are educational (learner gains insight from feedback)
- [ ] No obvious jokes or absurd options
- [ ] All distractors are grammatically consistent
- [ ] Distractors are similar length (avoid length cues)

## Level Guidelines

### Level 1-2: Beginner
- Basic syntax recognition
- Simple API recall
- Single concept

**Example**: "Which keyword declares a constant variable?"

### Level 3-4: Intermediate
- Concept application
- Simple code reading
- Common patterns

**Example**: "What will console.log([1,2,3].length) output?"

### Level 5-6: Advanced
- Multiple concept integration
- Code analysis
- Edge cases

**Example**: "What is the execution order of Promise.resolve().then() vs setTimeout()?"

### Level 7: Professor
- Deep language understanding
- Complex scenarios
- Design decisions

**Example**: "How does the event loop handle microtasks during a long-running synchronous operation?"

## optionFeedback Writing Tips

### Template Structure

```
"[distractor]" — [Why it's wrong] + [What the learner should know instead]
```

### Good Examples

```javascript
// Educational - teaches something
"Arrow functions cannot be used as constructors" — 
  "Actually, arrow functions can be used anywhere, but they cannot be used 
   with the 'new' keyword because they don't have their own 'this' binding."

// Points to correct concept
"const variables can be reassigned" — 
  "const prevents reassignment of the variable binding, though if the value 
   is an object, the object's properties can still be modified. Use let for 
   values that need to be reassigned."

// Addresses specific misconception
"[1, 2, 3]" — 
  "Array.map() always returns a new array with transformed elements. 
   The original array [1, 2, 3] remains unchanged. In this case, the 
   callback doubles each element, so the result is [2, 4, 6]."
```

## Quick Reference: Common Mistakes to Avoid

| Mistake | Why It's Bad | Example Fix |
|---------|-----------|-------------|
| "All of the above" | Tests recognition, not understanding | Replace with specific correct answer |
| "None of the above" | Negative framing confuses | Replace with positive correct answer |
| Double negatives | Cognitive load | "Which IS valid" not "Which is NOT invalid" |
| Multiple blanks | Harder to debug | Split into separate questions |
| Answer in stem | Trivial | Rewrite to be more general |
| No optionFeedback | Missed learning opportunity | Add specific feedback for each option |
| Too similar distractors | Random guessing | Make each wrong answer educational |

## Verification Checklist

Before marking a question complete:

- [ ] Read stem aloud - does it make sense?
- [ ] Can you answer without seeing options? (MC)
- [ ] Is there exactly one correct answer?
- [ ] Are all distractors plausible?
- [ ] Does optionFeedback exist for all options?
- [ ] Is the source lesson referenced?
- [ ] Is the level appropriate for the concept?
- [ ] No duplicate of existing question?

## Tools

```bash
# Validate a batch
npm run validate:strict

# Check for duplicates
npm run questions:reuse-audit:strict

# Quality check
npm run quality:questions:strict

# Full QA
npm run qa:questions:strict
```
