# טבלאות השוואה עמוקות — JavaScript Core

> כל ההשוואות הקריטיות ביותר במבחן SVCollege Full-Stack, בפירוט עמוק.
> ידני, לא extracted. מטרה: שתבין כל קצה.

---

## 1. By Reference vs By Value

### השוואה ברמת התנהגות

| פרמטר | By Value | By Reference |
|---|---|---|
| **חל על** | primitives: `number`, `string`, `boolean`, `undefined`, `null`, `symbol`, `bigint` | objects, arrays, functions, Map, Set, Date, RegExp, class instances |
| **מה מאוחסן ב-variable** | הערך עצמו (Stack) | pointer לכתובת ב-Heap |
| **גודל אחסון** | 8 bytes (number) / משתנה (string) | 8 bytes (pointer) ⇐ קבוע |
| **`const x = a` עושה** | bytes-level copy | pointer copy (שתי משתנים מצביעים לאותו object) |
| **mutation בdeep level** | בלתי אפשרי (immutable) | אפשרי (mutable) |
| **שינוי דרך משתנה אחד** | לא משפיע על השני | משפיע על שניהם |
| **`a === b` בודק** | value equality | reference equality (pointer) |
| **passing to function** | copy של ערך | copy של pointer (function רואה אותו object) |
| **return מ-function** | bytes copy | pointer copy |
| **GC behavior** | אוטומטי כשframe מסתיים | מנוקה כשאף pointer לא מצביע |
| **typeof** | משתנה (number/string/...) | "object" (לכל objects/arrays) |

### השוואה ברמת קוד

| תרחיש | By Value (number) | By Reference (object) |
|---|---|---|
| הקצאה | `let a = 5; let b = a;` | `const a = {}; const b = a;` |
| שינוי | `b = 10; a; // 5` | `b.x = 1; a; // {x:1}` |
| השוואה | `5 === 5; // true` | `{} === {}; // false` |
| העתקה אמיתית | `let b = a;` (כבר עותק) | `const b = {...a}` (shallow), `structuredClone(a)` (deep) |
| השמירה ב-Map | by-value (key='5' === key=5? לא — type-strict) | by-reference (אותו pointer = אותו key) |

### השוואה ברמת ביצועים

| מטריקה | By Value | By Reference |
|---|---:|---:|
| Allocation cost | 0 (Stack pointer מוסט) | malloc (Heap) |
| Copy cost | O(1) for fixed-size primitives, O(n) for strings | O(1) (pointer copy) |
| Access cost | O(1) directly | O(1) + cache miss possible (Heap dereferencing) |
| GC cost | 0 | יש (mark-and-sweep) |

### Edge Cases

| תופעה | פירוט |
|---|---|
| `NaN === NaN` | `false`! NaN לא שווה לעצמו. השתמש ב-`Number.isNaN()` |
| `+0 === -0` | `true` ב-`===`, אך `Object.is(+0,-0)` → `false` |
| `'5' === 5` | `false` (`===` strict, `==` יבצע coercion) |
| Strings | by-value סמנטית, but engine יכול להשתמש ב-string interning פנימית |
| `null === null` | `true` (תמיד) |
| `undefined === undefined` | `true` (תמיד) |
| `[] === []` | `false` (שני arrays שונים, אותו תוכן) |
| `{} === {}` | `false` |
| Object.freeze() | מקפיא mutations, אך pointer זהה בין משתנים |
| `JSON.parse(JSON.stringify(x))` | deep clone, אבל מאבד Date/Map/Set/undefined/function |
| `structuredClone(x)` | deep clone אמיתי (Chrome 98+, Node 17+) |

### דפוסי-נגד נפוצים

| הטעות | למה גרועה | התיקון |
|---|---|---|
| `let copy = original;` ל-array | זה pointer copy, לא העתקה | `let copy = [...original]` (shallow), `structuredClone(original)` (deep) |
| `if (obj1 == obj2)` בדיקת תוכן | בודק pointer, לא תוכן | `JSON.stringify(obj1) === JSON.stringify(obj2)` או `lodash.isEqual` |
| `function modify(obj) { obj.x = 1 }` שלא רוצים שישנה | mutation מדליפה לcaller | החזר עותק חדש: `return { ...obj, x: 1 }` |
| `setState(state)` ב-React אחרי `state.x = 1` | אותו pointer → React לא rerenders | `setState({...state, x: 1})` |

---

## 2. let vs var (vs const)

### השוואה ברמת התנהגות

| פרמטר | `var` | `let` | `const` |
|---|---|---|---|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Hoisting** | Yes — initialized to `undefined` | Yes, but TDZ (Temporal Dead Zone) | Yes, but TDZ |
| **Re-declaration באותו scope** | מותרת (silent) | TypeError | TypeError |
| **Re-assignment** | מותרת | מותרת | TypeError (אבל mutation של object content מותרת) |
| **`window.var` (browser)** | מתקבע ב-window | לא | לא |
| **שימוש לפני declaration** | מחזיר `undefined` | ReferenceError (TDZ) | ReferenceError (TDZ) |
| **Loop body כל-iteration** | משותף לכל iterations | חדש לכל iteration | חדש לכל iteration |
| **closure binding ב-loop** | latest value (problem!) | per-iteration | per-iteration |
| **גרסת ES** | ES1 (1997) | ES6 (2015) | ES6 (2015) |
| **המלצה ב-2024+** | ❌ אסור (legacy) | ✅ אם יש reassignment | ✅ default — ברירת מחדל |

### השוואה ברמת קוד

```javascript
// 1. Scope
function test() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
  }
  console.log(a); // 1 ✓ (function-scoped)
  console.log(b); // ReferenceError ❌
  console.log(c); // ReferenceError ❌
}

// 2. Hoisting + TDZ
console.log(x); // undefined (hoisted)
console.log(y); // ReferenceError (TDZ)
console.log(z); // ReferenceError (TDZ)
var x = 1;
let y = 2;
const z = 3;

// 3. Re-declaration
var a = 1; var a = 2; // OK
let b = 1; let b = 2; // SyntaxError
const c = 1; const c = 2; // SyntaxError

// 4. Re-assignment
var a = 1; a = 2; // OK
let b = 1; b = 2; // OK
const c = 1; c = 2; // TypeError

// 5. Loop closures (קלאסי!)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 (var = משותף!)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2 (let = per-iteration)

// 6. const עם objects
const arr = [1, 2];
arr.push(3); // OK — content mutation מותרת
arr = [];    // TypeError — re-binding אסור
```

### השוואה ברמת בעיות אמיתיות

| בעיה | `var` | `let`/`const` |
|---|---|---|
| Variable shadowing מקרי | קל לקרות (function scope) | scope מוגבל = פחות סיכון |
| Polyfills ב-browser legacy | תמיד עבד | דורש ES6 transpiler (Babel) |
| Module pattern (IIFE) | היה הכרחי בעבר | בלתי נחוץ — block scope טבעי |
| Loop with async callbacks | ידוע bug של closures | עובד נכון |
| `typeof undeclared` | `'undefined'` (safe) | `'undefined'` (safe) |
| Strict mode | undeclared = ReferenceError | undeclared = ReferenceError |

### Edge Cases

| תופעה | `var` | `let` | `const` |
|---|---|---|---|
| `for (X i = 0; ...)` | משותף | per-iteration | TypeError ב-i++ |
| `try { let x } catch {}` | x ב-function scope | x lost אחרי try | x lost אחרי try |
| `eval('var x = 1')` | x דולף ל-enclosing scope | x ב-eval scope only | x ב-eval scope only |
| `with` statement | עובד (legacy) | עובד | עובד |
| Re-declaration עם function declaration | מאוחד | TypeError | TypeError |
| Module-level (top of file) | window.x ב-browser (script tag) | לא | לא |

### דפוסי-נגד נפוצים

| הטעות | למה גרועה | התיקון |
|---|---|---|
| `var i = 0; for (var i = 0; ...)` | re-declaration שותקת — באג | `let i = 0; for (let j = 0; ...)` |
| `for (var i...) { setTimeout(() => log(i)) }` | כל ה-callbacks רואים i הסופי | `for (let i...) { ... }` |
| `const arr = []; arr = [1,2,3];` | TypeError — re-binding | `const arr = [1,2,3];` initial assignment |
| `var x; if (true) { var x = 1; }` ⇒ x is 1 outside | function scope leak | `let x; if (true) { let x = 1; }` |
| `if (foo) var bar = 1;` outside `if`: `bar !== undefined` | hoisted | `if (foo) { let bar = 1; }` — bar dies in block |

### Performance

| פעולה | `var` | `let` | `const` |
|---|---:|---:|---:|
| Hoisting cost | 0 (early init) | 0 (TDZ marker) | 0 (TDZ marker) |
| Access cost | identical | identical | identical (V8 inlines) |
| Loop iteration cost | identical | identical (per-iteration scope) | TypeError on reassign |
| Optimization (V8) | full | full | better — known immutable, easier inline |

---

## 3. סיכום-מהיר לפני המבחן

### זכור את זה ב-3 שורות:

**By Value vs By Reference:**
> primitives = photo (copy אמיתי). objects = window (אותו דבר נראה משני מקומות).

**let vs var vs const:**
> `var` = legacy (אסור). `let` = רק כשצריך reassignment. `const` = ברירת מחדל ל-2024+.

**הציטוט:**
> "If you're not changing it — `const`. If you are — `let`. Never `var`."

---

## 4. שאלות מבחן צפויות

### על Reference vs Value:
1. מה תהיה הפלטה?
   ```js
   let a = [1, 2];
   let b = a;
   b.push(3);
   console.log(a, b);
   ```
   **תשובה:** `[1,2,3] [1,2,3]` — אותו array, push משנה את שניהם.

2. אילו טיפוסים מועברים by-reference?
   **תשובה:** Object, Array, Function, Map, Set, Date, RegExp, class instances. כלומר: כל מה שאינו primitive.

### על let vs var vs const:
1. מה התוצאה?
   ```js
   for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));
   ```
   **תשובה:** `3 3 3` — `var` משותף, ה-loop נגמר לפני שה-timeouts רצו, הם רואים i=3.

2. למה `const arr = []; arr.push(1)` עובד אבל `arr = [1]` נכשל?
   **תשובה:** `const` מקפיא את ה-binding (אסור reassign), אך לא את התוכן של object — mutation מותרת.

3. מה ההבדל בין hoisting של var ו-let?
   **תשובה:** `var` עובר hoisting ומאותחל ל-`undefined`. `let` עובר hoisting אבל נכנס ל-TDZ — שימוש לפני declaration → ReferenceError.

---

**עודכן:** 2026-05-02 · ידני
