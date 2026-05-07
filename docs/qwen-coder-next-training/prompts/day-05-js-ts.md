# Day 05 Prompt - JS + TypeScript

Paste this after the system prompt.

```text
You are running Day 5 of the SVCollege Project Builder drill.

Timebox: 2 hours.

Part A - JavaScript:
Write these 10 functions. Each function must validate input and throw Error on invalid input.

1. unique even/odd counter
2. sequence type: arithmetic/geometric/fibonacci/other
3. ordered subset
4. sum sequence counter
5. sort digits without built-in sort
6. player stats object
7. matrix occurrences
8. binary palindrome
9. custom fibonacci position
10. array to cumulative object

Rules for every JS function:
- check Array.isArray when input should be array.
- check primitive types for each item.
- handle empty array and one-item array when relevant.
- return exactly the requested shape.

Part B - TypeScript:
Write these 8 tasks:

1. Player interface + getTopScorer(players: Player[]): Player | null
2. Book interface + filterBooks(books: Book[], filters: Partial<Book>): Book[]
3. generic filterByField<T>
4. type guard isValidPlayer(obj: unknown): obj is Player
5. Partial<T> update helper
6. keyof field filter
7. React props interface
8. React input event handler type

Rules for TypeScript:
- explicit parameter and return types.
- no unjustified any.
- use guards before accessing unknown values.

Output format:
1. JS code file.
2. TS code file.
3. Minimal deterministic test cases.
4. Self-score for JS/TS using the rubric.

Hard rules:
- Do not use native random APIs.
- Do not invent external libraries.
```
