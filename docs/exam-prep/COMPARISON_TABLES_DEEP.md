# טבלאות השוואה עמוקות — JavaScript Core

> כל ההשוואות הקריטיות ביותר במבחן SVCollege Full-Stack, בפירוט עמוק.
> ידני, לא extracted. מטרה: שתבין כל קצה.

---

## 📐 כלל פדגוגי חדש (2026-05-02)

**במקום ללמד מושג אחד בכל פעם — מלמדים את המושגים שבטבלת השוואה ביחד, כיחידה אחת.**

הסיבה: מושגי ליבה ב-JavaScript אף פעם לא עומדים לבד — הם תמיד מוגדרים בניגוד למושג אחר. אי אפשר להבין `let` בלי `var`. אי אפשר להבין `By Reference` בלי `By Value`. אי אפשר להבין `pointer` בלי הזיכרון שמאחוריו. ברגע שלומדים אותם בנפרד — נוצרים פערים שמתגלים רק במבחן.

**איך זה משפיע על תוכנית הלימוד:**
- כל קלסטר השוואה (טבלה כאן) הוא **בלוק שיעור אחד** — לא 2 או 3 שיעורים נפרדים.
- שיעור-בלוק = הסבר מקדים אחיד → טבלת השוואה → דוגמאות קוד נגד-נגד → anti-patterns → תרגול משולב.
- הציון של התלמיד נמדד על הקלסטר כיחידה: עליו לדעת לזהות איזה מבין השניים מתאים לכל שאלה.
- בPortal: הכפתור הירוק (V) על מושג קל ייפתח **את כל הקלסטר שלו** במאמן, לא רק את המושג הבודד.

**רשימת הקלסטרים הקיימים:**
1. **קלסטר #1 (להלן):** `let` ↔ `var` ↔ `const` + `By Reference` ↔ `By Value` + `Pointer` ← זיכרון ומשתנים
2. **קלסטר #2 (§5):** `Object` ↔ `Array` ↔ `Function` ← מבני-נתונים-לפי-Reference
3. **קלסטר #3 (§6):** `Arrow Function` ↔ `Regular Function` ← בעיית `this`
4. **קלסטר #4 (§7):** `Pointer` (deep) ← V8 internals

---

## 🎯 בלוק לימוד מאוחד #1: זיכרון, משתנים ומצביעים

> זה השיעור היחיד שמסביר מאיפה מגיעים `let` / `var` / `const` / `By Value` / `By Reference` / `Pointer` — **כי הם בעצם מספרים סיפור אחד על איך JavaScript מנהל זיכרון.**

### הסיפור בקיצור (45 שניות)

ב-JS יש שני אזורי זיכרון: **Stack** (קטן, מסודר, מהיר — לערכים פשוטים) ו-**Heap** (גדול, אקראי, אטי — ל-objects). כל משתנה גר ב-Stack. השאלה היחידה היא: **מה גר בתוכו?**
- אם המשתנה מחזיק מספר/מחרוזת/בוליאני → הערך עצמו ב-Stack. זהו **By Value**.
- אם המשתנה מחזיק object/array/function → ב-Stack יש **רק כתובת** (pointer) שמצביעה ל-Heap. זהו **By Reference**.

עכשיו ההכרזות:
- **`var`** — מקבל hoisting ל-function scope. נולד מ-1995 ועדיין נושם בקוד legacy.
- **`let`** — block scope, נחסם בTDZ. הסטנדרט המודרני למשתנה ש**ישתנה**.
- **`const`** — block scope, אסור rebinding. הסטנדרט המודרני למשתנה ש**לא ישתנה**.

הקטץ׳: `const` שומר על ה-pointer, **לא** על מה שהוא מצביע אליו. לכן `const arr = []; arr.push(5)` חוקי — שינית את ה-Heap, לא את ה-Stack.

### טבלת זיכרון משולבת — 11 הצירים

| ציר | `var` value | `var` reference | `let` value | `let` reference | `const` value | `const` reference |
|---|---|---|---|---|---|---|
| **Hoisted?** | ✓ (`undefined`) | ✓ (`undefined`) | ✓ (TDZ) | ✓ (TDZ) | ✓ (TDZ) | ✓ (TDZ) |
| **Scope** | function | function | block | block | block | block |
| **Re-declare?** | ✓ | ✓ | ✗ SyntaxError | ✗ | ✗ | ✗ |
| **Re-assign?** | ✓ | ✓ | ✓ | ✓ | ✗ TypeError | ✗ TypeError |
| **Mutate inner?** | n/a (primitive) | ✓ | n/a | ✓ | n/a | ✓ ⚠️ |
| **= מעתיק** | bytes | pointer | bytes | pointer | bytes | pointer |
| **`a === b`** | values | pointers | values | pointers | values | pointers |
| **GC trigger** | scope end | last pointer dropped | scope end | last pointer dropped | scope end | last pointer dropped |
| **typeof** | "number"/"string"/... | "object"/"function" | (אותו) | (אותו) | (אותו) | (אותו) |
| **window props (browser)** | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **המלצת 2026** | אסור | אסור | למשתנים שמשתנים | אסור (העדף `const`) | למשתנים שלא משתנים | ברירת מחדל ל-objects |

### סיפור-קוד מאוחד (פעם אחת על שלושת המושגים)

```js
// ============================================================
// פרק א׳: var נשבר על scope
// ============================================================
function legacy() {
  if (true) {
    var x = 10;       // var "בורח" מ-block ל-function
  }
  console.log(x);     // 10 — var ראה את ה-block כשקוף
}
legacy();

// ============================================================
// פרק ב׳: let מתקן את scope, ומחשף את ההבדל value/reference
// ============================================================
function modern() {
  let primitive = 5;            // ב-Stack: 8 bytes (5)
  let reference = { count: 5 }; // ב-Stack: pointer 0xABC123 → ב-Heap: { count: 5 }

  let primitiveCopy = primitive;       // bytes copy: שני slots עצמאיים
  let referenceCopy = reference;       // pointer copy: שני slots → אותו object ב-Heap

  primitiveCopy = 99;                  // משנה את ה-bytes של primitiveCopy בלבד
  referenceCopy.count = 99;            // משנה את ה-Heap → שניהם רואים 99

  console.log(primitive, primitiveCopy);            // 5, 99   ✅ נפרדים
  console.log(reference.count, referenceCopy.count); // 99, 99 ⚠️ אותו object
}
modern();

// ============================================================
// פרק ג׳: const שומר רק על ה-pointer, לא על מה שמאחורי
// ============================================================
const stack    = 10;     // 8 bytes ב-Stack — נעולים
const heapPtr  = [1, 2]; // pointer ב-Stack נעול. ה-Heap פתוח לעריכה!

// stack = 11;           // ❌ TypeError: Assignment to constant variable
heapPtr.push(3);          // ✅ legal — שינית את ה-Heap, לא את ה-pointer
// heapPtr = [1, 2, 3];  // ❌ TypeError — ניסית להחליף את ה-pointer

console.log(heapPtr); // [1, 2, 3]
```

### ה-anti-patterns ה-3 השכיחים

| # | המלכודת | הקוד הבעייתי | למה זה קורה | התיקון |
|---|---|---|---|---|
| 1 | "shallow copy חשבתי שזה deep" | `const b = {...a}; b.nested.x = 1;` משנה גם את `a.nested` | spread מעתיק רק את הרמה הראשונה — `a.nested` עדיין pointer משותף | `structuredClone(a)` או lodash deepClone |
| 2 | "const = immutable" | `const arr = [1,2]; arr.push(3);` עובד למרות `const` | `const` נועל את ה-pointer, לא את ה-Heap | `Object.freeze(arr)` או הימנע מ-mutation |
| 3 | "var ב-loop נתפס" | `for (var i=0;i<3;i++) setTimeout(()=>console.log(i), 0)` מדפיס `3,3,3` | `var` משותף לכל ה-callbacks (function scope) | החלף ל-`let` — block scope לכל iteration |

### "מה אם...?" - 4 מקרי קצה למבחן

1. **מה אם `const obj = {}; obj.__proto__ = null`?** ✅ חוקי. ה-pointer נשאר, רק שינית את ה-prototype chain ב-Heap.
2. **מה אם `let a = "hello"; a += " world"`?** ✅ נוצרת string חדשה ב-pool, ה-pointer ב-Stack מוחלף. strings ב-JS immutable — כל שינוי הוא יצירה חדשה.
3. **מה אם `var x; var x = 5;`?** ✅ חוקי, אין שגיאה. עם `let` היה SyntaxError.
4. **מה אם `const f = () => {}; f.name = "hi"`?** functions הם objects → `f.name` ניתן לשינוי. אבל אם הproperty ב-strict mode + `Object.defineProperty(f, 'name', { writable: false })` → TypeError.

### Mnemonic לזכירה במבחן

> **"Stack שומר ערכים, Heap שומר אובייקטים, const שומר רק את ה-pointer."**
>
> - Stack = שולחן הפתקיות שלך (קטן, מסודר, מהיר).
> - Heap = המחסן שלך (ענק, מבולגן, מסודר רק בעזרת addresses).
> - `var` = גוסט מ-1995 שלא יודע מה זה block.
> - `let` = משתנה צעיר שיודע גבולות.
> - `const` = שומר על המפתח, לא על מה שיש בתוך הכספת.

### חמש שאלות בחינה צפויות (על כל הקלסטר ביחד)

1. מה יודפס? `var x = 1; { var x = 2; } console.log(x);` (תשובה: `2` — `var` לא תואם block)
2. מה יודפס? `let x = 1; { let x = 2; } console.log(x);` (תשובה: `1` — `let` תואם block)
3. למה `const arr = [1,2]; arr.push(3);` לא זורק שגיאה? (תשובה: `const` נועל את ה-pointer ב-Stack, לא את ה-Heap)
4. מה יקרה? `function f(o) { o.x = 99; o = null; } const obj = {x:1}; f(obj); console.log(obj);` (תשובה: `{x:99}` — שינית את ה-Heap דרך ה-pointer, אבל הצבת `o = null` רק שינתה את העתק המקומי של ה-pointer)
5. למה `let a = {}; let b = {}; a === b` הוא `false`? (תשובה: שני objects שונים ב-Heap → שני pointers שונים → equality על pointer-level נכשל)

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

---

## 5. Object vs Array vs Function

### השוואה ברמת מהות

| פרמטר | Object | Array | Function |
|---|---|---|---|
| **typeof** | `"object"` | `"object"` | `"function"` |
| **Array.isArray()** | `false` | `true` | `false` |
| **constructor** | `Object` | `Array` | `Function` |
| **Object.prototype.toString.call(x)** | `"[object Object]"` | `"[object Array]"` | `"[object Function]"` |
| **גישה לתוכן** | `obj.key` / `obj['key']` | `arr[index]` (numeric) | `fn()` (call) / `fn.prop` |
| **iteration** | `for...in` (keys), `Object.entries()` | `for...of`, `forEach`, `map` | callable, לא iterable |
| **length property** | אין auto | יש (auto-tracked) | `fn.length` = arity (params count) |
| **Heap allocation** | yes | yes (sub-class של Object) | yes + closure scope |
| **mutation** | mutable | mutable | mutable (props) + invocable |
| **JSON.stringify** | `{...}` | `[...]` | `undefined` (functions לא serializable) |
| **===** | reference | reference | reference |
| **שימוש מרכזי** | מבני נתונים מורכבים | רשימות סדורות | התנהגות (logic, callbacks) |

### דוגמאות שהיררכית

```javascript
// Array IS Object — ירושה
const arr = [1, 2, 3];
arr.foo = 'bar';      // legal! arr הוא object
console.log(arr.foo); // 'bar'
arr[10] = 'x';        // sparse array
arr.length;           // 11 (length גדל אוטו)

// Function IS Object — ירושה
function greet() { return 'hi'; }
greet.author = 'Tal';     // legal! function הוא object
greet.length;             // 0 (אין params)
greet.name;               // 'greet'
typeof greet === 'function'; // true (special)

// כולם === בודקים pointer
const a = {}; const b = {}; a === b; // false
const c = []; const d = []; c === d; // false
function f(){} function g(){} f === g; // false
```

### השוואה ברמת זיכרון

| פרמטר | Object | Array | Function |
|---|---|---|---|
| **Heap footprint** | small (hidden class + props) | small + indexed storage | small + scope chain |
| **closure** | אין | אין | יש — שומר את ה-scope של ה-creation |
| **GC overhead** | רגיל | רגיל | יותר (closure scope גם נשמר) |
| **iteration speed** | for...in איטי (כולל inherited) | for-loop מהיר ביותר | לא relevant |

### Edge Cases ב-V8

| תופעה | פירוט |
|---|---|
| Sparse Array | `arr[1000] = 1` יוצר holes; V8 מחליף ל-dictionary mode → איטי |
| Hidden Classes | objects עם אותו shape משתפים hidden class → V8 inline-caches |
| Array.from(iterable) | יוצר array מכל iterable (Set, Map, generator) |
| Function.bind() | יוצר function חדש (עם this קבוע); fn.bind(ctx) !== fn |
| Object.fromEntries(arr) | array של pairs → object: `[['a',1],['b',2]]` → `{a:1,b:2}` |

### מתי להשתמש בכל אחד

| תרחיש | בחירה |
|---|---|
| כתובת לקוח (name, age, address) | Object |
| רשימת מוצרים בעגלה | Array (סדר חשוב) |
| רשימת tags ייחודיים | Set (אבל הם objects) |
| מילון תרגום מ-עברית ל-English | Object או Map |
| operation שניתן להריץ | Function |
| factory pattern | Function שמחזירה Object |

---

## 6. Arrow Function vs Regular Function

### השוואה ברמת התנהגות

| פרמטר | Regular Function | Arrow Function |
|---|---|---|
| **תחביר** | `function name(...) { ... }` | `(...) => { ... }` או `(...) => expr` |
| **`this` binding** | dynamic — נקבע באופן הקריאה | lexical — מהמיקום שבו הוגדרה |
| **`arguments` object** | יש (special) | אין — השתמש ב-rest `(...args)` |
| **`new` constructor** | ניתן (עם prototype) | TypeError — לא יכול |
| **`prototype` property** | יש | אין |
| **method shorthand בobject** | `{ method() {} }` (יש this) | `{ method: () => {} }` (this מ-outer!) |
| **hoisting** | function declarations: yes | const arr = () => : no (TDZ) |
| **return implicit** | תמיד צריך `return` | בלי `{}`: implicit (one-liner) |
| **קוד קצר** | יותר ארוך | יותר קצר |
| **שימוש פנימי** | events, methods, constructors | callbacks, transforms, filters |

### דוגמאות חשובות

```javascript
// 1. this binding — ההבדל הקריטי
const obj = {
  name: 'Tal',
  greetRegular: function() { return this.name; },     // this = obj
  greetArrow: () => this.name,                         // this = outer (window/undefined)
};
obj.greetRegular(); // 'Tal'
obj.greetArrow();   // undefined (או window.name ב-browser)

// 2. בתוך setTimeout — arrow מנצח
class Timer {
  constructor() {
    this.seconds = 0;
    setInterval(() => { this.seconds++; }, 1000);     // arrow: this = Timer instance
    // setInterval(function() { this.seconds++; }, 1000); // regular: this = global, BUG
  }
}

// 3. arguments
function regular() { return arguments.length; }
const arrow = (...args) => args.length;
regular(1, 2, 3); // 3 (arguments works)
arrow(1, 2, 3);   // 3 (rest works)

// 4. constructor
function PersonR(name) { this.name = name; }
const PersonA = (name) => { this.name = name; };
new PersonR('Tal'); // OK
new PersonA('Tal'); // TypeError: PersonA is not a constructor

// 5. implicit return
const sumR = function(a, b) { return a + b; };
const sumA = (a, b) => a + b;       // implicit
const sumA2 = (a, b) => { return a + b; }; // explicit
const sumA3 = (a, b) => ({ result: a + b }); // ()  — return object literal
```

### מתי לבחור Arrow

| תרחיש | בחירה |
|---|---|
| Callback ל-array methods (map/filter/reduce) | Arrow ✅ — קצר וקריא |
| Event handler ב-class | Arrow ✅ — לexcellent this binding |
| Method ב-class definition | Regular ✅ (או class method shorthand) — this dynamic |
| Constructor | Regular ✅ או class — Arrow אסור |
| Object method עם this | Regular ✅ — Arrow תופס this חיצוני |
| Function expression שצריך לקרוא לעצמה (recursion) | Named function expression — קריאה דרך השם |
| Promise chain (.then) | Arrow ✅ — flow קריא |

### Edge Cases

| תופעה | Regular | Arrow |
|---|---|---|
| `function*` (generator) | יש (yield) | אסור — Arrow לא יכול להיות generator |
| `async function` | `async function f() {...}` | `async () => {...}` |
| nested function שצריך לראות this חיצוני | אסטרטגיה: `const self = this; function inner() { self.x }` | פשוט: `() => this.x` |
| `super` בתוך method | יש | אין (Arrow לא יכול להשתמש ב-super) |
| `new.target` | יש | אין |
| `yield` | יש (in generators) | אסור |
| binding override (call/apply/bind) | משנה this | **לא משנה!** Arrow לא ניתן לbind מחדש |

### דפוסי-נגד נפוצים

| הטעות | למה גרועה | התיקון |
|---|---|---|
| `class C { greet = () => this.x; }` ב-method ש-React מצפה לdynamic this | קושר this קבוע — לא תמיד רצוי | `class C { greet() { return this.x; } }` |
| `obj.method = () => this.x` בobject literal | this הוא חיצוני, לא obj | `obj.method = function() { return this.x }` או class |
| `setTimeout(function() { this.x }, 1000)` ב-class | this = global (או undefined ב-strict) | `setTimeout(() => this.x, 1000)` |
| `() => { return val; }` במקום `() => val` | מיותר (verbose) | `() => val` |
| `fn.bind(ctx)` על arrow | בחיבור לא נחשב — Arrow אינה bindable | אם צריך binding: regular function |

### Performance

| מטריקה | Regular | Arrow |
|---|---:|---:|
| Function creation cost | זהה | זהה |
| Call overhead | זהה (V8 inline) | זהה |
| Memory (per instance) | זהה | זהה (לא יותר חסכוני) |
| Creation in loops | OK | OK |
| Hot path optimization | זהה | זהה |

### בקיצור — מה אני בוחר?

> **Default: Arrow.** קצר, lexical this. **Switch to Regular כש:** צריך `arguments`, `this` dynamic, `new`, או generator.

---

## 7. Pointer — מבט נוסף (Reference deeper)

(הטבלה ב-§1 כיסתה את ההתנהגות הסמנטית. כאן — הטכנית.)

### Pointer Internals ב-V8

| תופעה | פירוט |
|---|---|
| Tagged Pointers | V8 משתמש ב-3 bits של pointer לסימון type (smi vs object). חוסך bytes. |
| Pointer Compression | במערכות 64bit, V8 דוחס pointers ל-32bit (חיסכון ~40% RAM). |
| Hidden Classes | objects עם אותו shape משתפים hidden class (C1). שינוי shape = transition לC2. |
| Inline Caches | property lookup מטמין hidden class+offset → גישה מהירה ל-property. |
| Generational GC | objects צעירים ב-Young Generation (Scavenger). שורדים → Old Generation (Mark-Sweep). |

### השוואה: Pointer ב-JS vs C++ vs Rust

| מאפיין | JS | C++ | Rust |
|---|---|---|---|
| חשיפה ישירה | לא | כן (`*`, `&`) | מוגבלת (`&`, `&mut`, `Box`) |
| Null pointer | יש (null/undefined) | יש (NULL) | אין (`Option<T>`) |
| Dangling pointer | בלתי אפשרי (GC) | אפשרי (use-after-free) | בלתי אפשרי (borrow checker) |
| Pointer arithmetic | אין | יש | מוגבל (unsafe) |
| GC | אוטומטי | אין (manual delete) | אין (RAII + ownership) |
| Memory safety | בטוח | מסוכן | בטוח (compile-time) |

---

## 8. Event Loop — Microtask vs Macrotask (קושי 9)

### הסיפור (חובה לדעת למבחן)

ב-JS יש מנוע single-thread שמריץ קוד אחד. כש-`await`/`Promise.then`/`setTimeout` נכנסים — הם **לא** רצים מיד. הם מתורים. השאלה: באיזה תור?
- **Microtask queue** — `Promise.then`, `queueMicrotask`, `MutationObserver`. **הכי מהיר**: ה-engine רוקן את כל ה-microtasks בין כל שני macrotasks.
- **Macrotask queue** — `setTimeout`, `setInterval`, `setImmediate`, I/O, UI rendering. **אטי יותר**: רק 1 macrotask בכל סבב event loop.

### טבלה

| ציר | Microtask | Macrotask |
|---|---|---|
| מקורות | `Promise.then`, `await`, `queueMicrotask`, `MutationObserver` | `setTimeout`, `setInterval`, I/O, click events |
| מתי רץ | מיד אחרי הקוד הסינכרוני הנוכחי, לפני הסבב הבא | בסבב הבא של ה-event loop |
| כמה רצים בסבב | **כל** התור (יכול לחנוק את העמוד) | **אחד בלבד** |
| starvation? | כן (microtasks אינסופיים מקפיאים את ה-UI) | לא (UI מקבל זמן) |
| דוגמה לתור | `Promise.resolve().then(fn)` | `setTimeout(fn, 0)` |

### קוד מוכיח-סדר (המבחן ישאל את זה)

```js
console.log("1");
setTimeout(() => console.log("2"), 0);          // macrotask
Promise.resolve().then(() => console.log("3")); // microtask
console.log("4");
// סדר הדפסה: 1, 4, 3, 2
// כי microtask (3) רץ לפני macrotask (2), והסינכרוני (1, 4) לפני שניהם.
```

### Anti-pattern: microtask infinite loop

```js
function bad() { Promise.resolve().then(bad); } bad();
// העמוד קופא — UI לעולם לא מקבל זמן, כי microtask queue אף פעם לא מתרוקן.
```

### תיקון
החלף ל-`setTimeout(bad, 0)` — אז כל איטרציה היא macrotask, ובין סבב לסבב ה-UI מקבל לרנדר.

---

## 9. Promise Combinators — all / race / allSettled / any (קושי 8)

### טבלה

| Combinator | מחזיר כש... | נדחה כש... | התוצאה | שימוש טיפוסי |
|---|---|---|---|---|
| `Promise.all` | **כל** ה-promises הושלמו | **אחד** נכשל (fail-fast) | מערך תוצאות | קריאות API מקבילות שצריכות הכל |
| `Promise.race` | **הראשון** שמסיים (success או fail) | הראשון שנכשל | תוצאה יחידה | timeout, "first response wins" |
| `Promise.allSettled` | **כולם** סיימו (success או fail) | אף פעם לא נדחה | מערך `{status, value/reason}` | סטטיסטיקה — רוצים תוצאות גם אם חלק נכשל |
| `Promise.any` | **הראשון** שהצליח | **כולם** נכשלו (`AggregateError`) | תוצאה יחידה | "מספיק שאחד מהשרתים יענה" |

### דוגמת קוד אחת לכולם

```js
const p1 = fetch("/api/a"), p2 = fetch("/api/b"), p3 = fetch("/api/c");

await Promise.all([p1, p2, p3]);          // נופל אם אחד נכשל
await Promise.race([p1, p2, p3]);         // הראשון מנצח
await Promise.allSettled([p1, p2, p3]);   // תמיד מצליח, יש סטטוס לכל אחד
await Promise.any([p1, p2, p3]);          // הצלחה אחת מספיקה
```

### Mnemonic

> **all = AND** (כולם או כלום) · **race = first** · **allSettled = sum** (תמיד אוסף) · **any = OR** (מספיק אחד)

---

## 10. Callback ↔ Promise.then ↔ async/await — 3 דורות אסינכרוניים (קושי 8)

### טבלה

| ציר | Callback (1995) | Promise.then (2015) | async/await (2017) |
|---|---|---|---|
| תחביר | `fn(args, cb)` | `.then(...).catch(...)` | `await` בתוך `async function` |
| Pyramid of doom | כן (callback hell) | מתפזר ל-chain | נראה כמו קוד סינכרוני |
| טיפול בשגיאות | פרמטר ראשון `err` (Node convention) | `.catch(err)` | `try/catch` |
| Composition | קשה | `.then` chain | קל |
| Debug stack trace | רעוע | טוב | מצוין |
| Top-level await? | n/a | n/a | כן (מ-2022) |
| מתי בכל זאת בחר callback | API ישנים, event listeners | streams, generators | ברירת מחדל מ-2017 |

### אותו קוד ב-3 דורות

```js
// 1. Callback
fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// 2. Promise.then
fs.promises.readFile("a.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// 3. async/await
try {
  const data = await fs.promises.readFile("a.txt", "utf8");
  console.log(data);
} catch (err) { console.error(err); }
```

### Anti-pattern: לעטוף Promise בcallback

```js
// ❌ רע
function getUser(id, cb) { fetch(`/api/${id}`).then((r) => cb(null, r)).catch(cb); }
// ✅ טוב
async function getUser(id) { return fetch(`/api/${id}`); }
```

---

## 11. useEffect Dependency Array (קושי 9 — הבאג ה-1 ב-React)

### 4 ההתנהגויות הבסיסיות

| תחביר | מתי רץ | כשלא להשתמש |
|---|---|---|
| `useEffect(fn)` (ללא array) | **כל** רינדור | תמיד — גורם infinite loops |
| `useEffect(fn, [])` | **פעם אחת** ב-mount | תמיד — אפילו ערכים מההexternal scope קפואים |
| `useEffect(fn, [x])` | בכל פעם ש-`x` משתנה | תלוי במקרה |
| `useEffect(fn, [x, y, z])` | בכל פעם שאחד מהם משתנה | תלוי במקרה |

### החוק הקריטי: stale closure

```js
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ בעיה: setCount רואה תמיד count=0 (stale closure)
  useEffect(() => {
    setInterval(() => setCount(count + 1), 1000);
  }, []);

  // ✅ פתרון 1: dep על count
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, [count]);

  // ✅ פתרון 2: functional update — לא צריך count ב-deps
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
}
```

### סוגי בעיות

| בעיה | סיבה | תיקון |
|---|---|---|
| Effect לא רץ כשציפיתי | חסר משתנה ב-deps | הוסף או השתמש ב-functional update |
| Effect רץ יותר מדי | object/function ב-deps נוצר מחדש בכל render | `useMemo` / `useCallback` או הוצא חוץ |
| Stale closure | `[]` או `deps` חסרים | תוסיף את כל המשתנים שמופיעים בתוך |
| Infinite loop | משנה state ש-ב-deps | תנאי `if`, או הוצא state-update לאירוע |

### eslint-plugin-react-hooks/exhaustive-deps

ה-rule הזה תופס 90% מהבאגים אוטומטית. הפעל אותו תמיד.

---

## 12. useMemo ↔ useCallback ↔ React.memo — 3 כלי אופטימיזציה שונים (קושי 8)

### טבלה

| כלי | מקבל | מחזיר | מטרה | מתי לא להשתמש |
|---|---|---|---|---|
| `useMemo(fn, deps)` | פונקציה + deps | **התוצאה** של הפונקציה (cached) | למנוע חישוב יקר | כשהחישוב זול |
| `useCallback(fn, deps)` | **פונקציה** + deps | **הפונקציה עצמה** (cached) | למנוע re-render של ילד שמקבל פונקציה כ-prop | כשהילד לא ב-`React.memo` |
| `React.memo(Component)` | קומפוננטה | קומפוננטה ש-rerender רק כש-props מתחלפים | למנוע re-render של ילד שלא משתנה | כשה-component תמיד מקבל props חדשים |

### אותו קוד מוצג בכולם

```jsx
// 1. useMemo — ערך חישוב יקר
const sorted = useMemo(() => bigList.sort(), [bigList]);

// 2. useCallback — פונקציה יציבה ל-prop
const handleClick = useCallback(() => doX(id), [id]);
return <Child onClick={handleClick} />;

// 3. React.memo — ילד שלא ירנדר אם props לא השתנו
const Child = React.memo(({ onClick }) => <button onClick={onClick}>Hi</button>);
```

### חוק זהב

> **3 ה-`memo` עובדים יחד**: אם הילד הוא `React.memo`, החביל את ה-prop שהוא פונקציה ב-`useCallback`. אם הוא פונקציה שמחזירה JSX, חביל את התוצאה ב-`useMemo`. בודד — אף אחד מהם לא עוזר.

### Anti-pattern: memo על הכל

`React.memo` מוסיף השוואת shallow על כל render — אם props תמיד שונים, זה רק מאט.

---

## 13. Set ↔ Map ↔ Object — מבני נתונים אסוציאטיביים (קושי 7)

### טבלה

| ציר | Object | Map | Set |
|---|---|---|---|
| מטרה | key→value (string keys) | key→value (any keys) | unique values only |
| Key types | string / Symbol | **כל סוג** (object, function, primitive) | n/a (values only) |
| Key order | insertion-ordered (since ES2015) | insertion-ordered | insertion-ordered |
| Size | `Object.keys(o).length` (O(n)) | `m.size` (O(1)) | `s.size` (O(1)) |
| Iteration | `for...in` / `Object.keys` | `for...of` direct | `for...of` direct |
| Has key | `key in obj` (slow) | `m.has(key)` (fast) | `s.has(value)` |
| Default values | `prototype` chain | empty | n/a |
| JSON serialize | ✅ | ❌ (need conversion) | ❌ |
| Performance | ✓ | ✓✓ (better for frequent add/delete) | ✓✓ |

### דוגמת קוד

```js
// Object — keys תמיד strings
const obj = { 1: "a" }; obj["1"] === obj[1]; // true (key מומר ל-"1")

// Map — keys באמת כל דבר
const m = new Map(); const fn = () => {};
m.set(fn, "callback"); m.get(fn); // "callback"

// Set — ערכים ייחודיים
const s = new Set([1, 2, 2, 3]); // Set(3) {1, 2, 3}
s.size; // 3
```

### מתי לבחור מה

| תרחיש | בחירה |
|---|---|
| תצורה קבועה (config) | `Object` |
| Cache עם keys שאינם strings | `Map` |
| Frequent add/delete | `Map` (אופטימלי יותר) |
| הסרת כפילויות ממערך | `[...new Set(arr)]` |
| בדיקת חברות מהירה | `Set.has` (O(1)) |
| Serialization ל-JSON | `Object` |

---

## 14. Spread (...) ↔ Rest (...) — אותו תחביר, תפקידים הפוכים (קושי 6)

### טבלה

| ציר | Spread | Rest |
|---|---|---|
| איפה משתמשים | בקריאה / יצירה | בהגדרת פונקציה / destructuring |
| כיוון | **פותח** מערך/object לאיברים | **אוסף** איברים למערך |
| דוגמה ב-array | `[...arr1, ...arr2]` | `function f(...args)` |
| דוגמה ב-object | `{...obj, x: 1}` | `const {a, ...rest} = obj` |
| מה הופך למה | מערך → אינדיקטורים נפרדים | אינדיקטורים נפרדים → מערך |

### דוגמה אחת לכל מקרה

```js
// SPREAD — פותח
const merged = [...[1,2], ...[3,4]];           // [1,2,3,4]
const cloned = { ...{ a: 1 }, b: 2 };          // { a: 1, b: 2 }
Math.max(...[3, 1, 5]);                        // 5

// REST — אוסף
function sum(...nums) { return nums.reduce((a,b)=>a+b); }   // function rest
const [first, ...others] = [1, 2, 3];                       // others = [2, 3]
const { name, ...rest } = { name: "A", age: 5, city: "X" }; // rest = { age, city }
```

### החוק לזכירה

> **Spread פותח. Rest אוסף.** המיקום קובע: בצד השמאלי של `=` או בפרמטרים → Rest. בצד הימני / קריאה → Spread.

---

## 15. Function Definition Kinds — declaration / expression / arrow / IIFE (קושי 7)

### טבלה

| ציר | Declaration | Expression | Arrow | IIFE |
|---|---|---|---|---|
| תחביר | `function f() {}` | `const f = function() {}` | `const f = () => {}` | `(function() {})()` |
| Hoisted? | ✓ | ✗ (TDZ) | ✗ (TDZ) | n/a (קוראים מיד) |
| Has `this` | ✓ (caller-bound) | ✓ (caller-bound) | ✗ (lexical, מהאב) | ✓ |
| Has `arguments` | ✓ | ✓ | ✗ | ✓ |
| Constructor (`new`) | ✓ | ✓ | ✗ | n/a |
| `name` property | מהשם | מהמשתנה | מהמשתנה | "anonymous" |
| מתי השתמש | פונקציות מודולריות | callbacks היסטוריות | callbacks מודרניות | פעם אחת + scope סגור |

### דוגמת קוד

```js
// Declaration
sayHi();                                    // ✅ עובד (hoisted)
function sayHi() { console.log("hi"); }

// Expression
sayBye();                                   // ❌ ReferenceError (TDZ)
const sayBye = function() { console.log("bye"); };

// Arrow
const add = (a, b) => a + b;
[1,2,3].map((n) => n * 2);

// IIFE — לפני ES6 לבידוד scope
(function() { var x = "private"; console.log(x); })();
```

### Anti-pattern

```js
// ❌ Arrow כ-method של object
const obj = { name: "X", greet: () => console.log(this.name) }; // this = window/undefined
obj.greet(); // undefined

// ✅ Method shorthand
const obj2 = { name: "X", greet() { console.log(this.name); } };
obj2.greet(); // "X"
```

---

## 16. Type Check — typeof / instanceof / Array.isArray (קושי 6)

### טבלה

| בודק | תחביר | מחזיר | עובד על |
|---|---|---|---|
| `typeof` | `typeof x` | string ("number"/"string"/...) | primitives + יוצא דופן `"object"` ל-objects/null |
| `instanceof` | `x instanceof C` | boolean | בדיקת prototype chain |
| `Array.isArray` | `Array.isArray(x)` | boolean | רק מערכים — הדרך הנכונה |

### דוגמת קוד

```js
typeof 5;              // "number"
typeof "hi";           // "string"
typeof null;           // "object"  ⚠️ באג היסטורי
typeof [];             // "object"
typeof undefined;      // "undefined"
typeof function(){};   // "function"

[] instanceof Array;             // true
[] instanceof Object;            // true (כל array הוא Object)
new Date() instanceof Date;      // true

Array.isArray([]);                            // true ✅
Array.isArray("not array");                   // false
[].constructor === Array;                     // true (פחות בטוח — ניתן לעקוף)
```

### חוק עבודה

> **Primitives → `typeof`. Class instances → `instanceof`. Arrays → `Array.isArray`.**
> אל תסתמך על `typeof` ל-arrays/null. אל תסתמך על `instanceof` בין iframes שונים.

---

## 17. Equality — `==` ↔ `===` ↔ `Object.is` (קושי 5)

### טבלה

| מבחן | סוג | המרה | NaN === NaN? | -0 === +0? | null == undefined? |
|---|---|---|---|---|---|
| `==` | loose | כן (type coercion) | false | true | **true** |
| `===` | strict | לא | false | true | false |
| `Object.is` | strictest | לא | **true** | **false** | false |

### דוגמאות שאוהבות לבלבל

```js
0 == "0";          // true  (== ממיר string→number)
0 == false;        // true
"" == 0;           // true
null == undefined; // true
NaN === NaN;       // false (NaN לא שווה לעצמו)
Object.is(NaN, NaN); // true  ✅

[] == false;       // true (!) — [] → "" → 0 → false
[] === false;      // false
```

### חוק קצר

> **תמיד `===`** חוץ מ-`null == undefined` כשאתה רוצה לטפל בשניהם יחד.

---

## 18. Null ↔ Undefined ↔ NaN — ערכי-לא-קיים (קושי 5)

### טבלה

| ערך | מתי מופיע | typeof | == | === |
|---|---|---|---|---|
| `undefined` | משתנה לא הוגדר / argument חסר / `return;` ריק | "undefined" | `null == undefined` true | קפדני |
| `null` | הקצאה מפורשת של "אין ערך" | "object" ⚠️ | `null == undefined` true | קפדני |
| `NaN` | תוצאה מתמטית לא חוקית | "number" | `NaN == NaN` false | `NaN === NaN` false |

### דוגמאות

```js
let a;              // undefined (לא הוגדר)
let b = null;       // null (מפורש: כוונת מתכנת ל-"אין")
let c = "x" * 2;    // NaN (חישוב לא חוקי)

isNaN(c);           // true
Number.isNaN(c);    // true (יותר קפדני — לא ממיר)
a ?? "default";     // "default" (??  בודק רק null/undefined)
a || "default";     // "default" (|| בודק falsy — כולל 0, "")
```

### החוק

> **undefined = "מערכת אומרת אין". null = "מתכנת אומר אין". NaN = "מתמטיקה אומרת ?".**
> השווה תמיד עם `===` או עם `Number.isNaN()`.

---

## 19. Destructuring — Array vs Object (קושי 6)

### טבלה

| ציר | Array | Object |
|---|---|---|
| תחביר | `const [a, b] = [1, 2]` | `const {a, b} = {a:1, b:2}` |
| בסיס שיוך | מיקום (0, 1, 2...) | שם מפתח |
| Rename? | n/a | `const {a: x} = {a:1}` → x=1 |
| Default | `const [a = 5] = []` | `const {a = 5} = {}` |
| Rest | `const [a, ...r] = [1,2,3]` | `const {a, ...r} = {a:1,b:2}` |
| דילוג | `const [, , c] = [1,2,3]` | n/a (אין דילוג) |

### דוגמה משולבת

```js
function getUser() {
  return { name: "A", age: 5, hobbies: ["x", "y"] };
}
const { name, age = 0, hobbies: [first, ...rest] } = getUser();
// name="A", age=5, first="x", rest=["y"]
```

### Anti-pattern: destructure בתוך פרמטר ללא default

```js
function f({ a }) { return a; }   // ❌ TypeError if called with f()
function f({ a } = {}) { return a; }  // ✅ default empty obj
```

---

## 20. innerHTML ↔ innerText ↔ textContent — DOM Text APIs (קושי 6)

### טבלה

| API | קורא | כותב | מסנן script? | רואה hidden? | מהיר? |
|---|---|---|---|---|---|
| `innerHTML` | HTML עם תגיות | מפענח HTML | **לא** ⚠️ XSS | כן | אטי |
| `innerText` | רק טקסט נראה (כפי שהמשתמש רואה) | מחליף בטקסט | כן | **לא** | אטי (מחשב CSS) |
| `textContent` | **כל** הטקסט (גם hidden) | מחליף בטקסט | כן | כן | מהיר ✅ |

### דוגמה מובהקת

```html
<div id="d">Hello <span style="display:none">SECRET</span> World <script>x</script></div>
```

```js
d.innerHTML;     // "Hello <span style=\"display:none\">SECRET</span> World <script>x</script>"
d.innerText;     // "Hello World" (לא רואה SECRET כי hidden)
d.textContent;   // "Hello SECRET World x"
```

### חוק זהב

> **קריאה: textContent. כתיבת טקסט: textContent. רינדור HTML מאומת: innerHTML עם DOMPurify.**
> innerHTML עם user input = פרצת XSS.

---

## 21. event.target ↔ event.currentTarget ↔ this — איפה הקליק קרה (קושי 7)

### טבלה

| Property | מצביע ל... | משתנה במהלך bubble? |
|---|---|---|
| `event.target` | האלמנט ש**עליו לחצו** | לא — קבוע |
| `event.currentTarget` | האלמנט ש**הוסף לו ה-listener** | משתנה ככל שהאירוע עולה |
| `this` (Regular function) | זהה ל-`event.currentTarget` | משתנה |
| `this` (Arrow function) | מהlexical scope (לא מהאירוע) | קבוע |

### דוגמה

```html
<div id="parent" onclick="handler(event)">
  <button id="child">Click</button>
</div>
```

```js
function handler(e) {
  e.target;        // <button id="child"> (איפה לחצו)
  e.currentTarget; // <div id="parent">   (איפה ה-listener)
  this;            // <div id="parent">   (כמו currentTarget)
}
```

### Event Delegation Pattern

```js
// במקום listener על כל li, listener אחד על ה-ul:
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.matches("li")) console.log("li clicked:", e.target.textContent);
  // e.target = ה-li המסוים. e.currentTarget = ה-ul.
});
```

---

## 22. preventDefault ↔ stopPropagation ↔ return false (קושי 6)

### טבלה

| פעולה | מבטל ברירת-מחדל? (טופס שנשלח, לינק שנפתח) | עוצר bubbling להורה? | עוצר listeners נוספים על אותו אלמנט? |
|---|---|---|---|
| `e.preventDefault()` | ✅ | ❌ | ❌ |
| `e.stopPropagation()` | ❌ | ✅ | ❌ |
| `e.stopImmediatePropagation()` | ❌ | ✅ | ✅ |
| `return false` (jQuery only) | ✅ | ✅ | ❌ |

### תרחישים

```js
// טופס שלא ישלח את עצמו (אבל הbubble כן יעבור):
form.addEventListener("submit", (e) => { e.preventDefault(); /* הוצא AJAX */ });

// כפתור שלא מעלה את האירוע ל-modal-backdrop:
button.addEventListener("click", (e) => { e.stopPropagation(); });

// שניהם יחד:
link.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); });
```

---

## 23. CSS Position — static / relative / absolute / fixed / sticky (קושי 7)

### טבלה

| ערך | מוציא מ-flow? | מתייחס ל... | מגיב ל-top/left? | scroll עם הדף? |
|---|---|---|---|---|
| `static` (ברירת-מחדל) | ❌ | n/a | ❌ | כן |
| `relative` | ❌ (תופס מקום) | המיקום הטבעי שלו | ✅ | כן |
| `absolute` | ✅ (יוצא) | אב הקרוב עם `position: relative/absolute/fixed` | ✅ | כן (עם האב) |
| `fixed` | ✅ | viewport (חלון הדפדפן) | ✅ | **לא** — קפוא במקום |
| `sticky` | ❌ עד סף, אז ✅ | viewport (כש-scroll עובר את ה-top) | ✅ | היברידי |

### דוגמה ויזואלית

```css
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; }  /* כיסוי מסך */
.tooltip { position: absolute; top: 100%; left: 0; }                /* מתחת לאב יחסי */
.header { position: sticky; top: 0; }                                /* נדבק כשגוללים מתחתיו */
.bumped { position: relative; top: -2px; }                           /* shift קל */
```

---

## 24. CSS Display — block / inline / inline-block / flex / grid (קושי 6)

### טבלה

| Display | תופס שורה שלמה? | מקבל width/height? | פדים אנכיים | משפיע על ילדים? |
|---|---|---|---|---|
| `block` | ✅ | ✅ | ✅ | ❌ (ילדים לפי display שלהם) |
| `inline` | ❌ | ❌ | רק padding-x | ❌ |
| `inline-block` | ❌ | ✅ | ✅ | ❌ |
| `flex` | ✅ | ✅ | ✅ | ✅ (ילדים = flex items) |
| `grid` | ✅ | ✅ | ✅ | ✅ (ילדים = grid items) |
| `none` | n/a (נסתר לחלוטין) | n/a | n/a | n/a |

### Quick reference

```css
/* span ש-בור-padding */
span.btn { display: inline-block; padding: 8px 16px; }

/* container אופקי מרוכז */
.row { display: flex; justify-content: center; gap: 1rem; }

/* רשת 12 עמודות */
.layout { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
```

---

## 25. SSR ↔ SSG ↔ CSR ↔ ISR — אסטרטגיות רינדור (קושי 7)

### טבלה

| Strategy | מתי HTML נוצר | First-paint | SEO | תוכן דינמי? | יתרון | חיסרון |
|---|---|---|---|---|---|---|
| **CSR** (Client-Side) | בדפדפן אחרי JS bundle | אטי | רע | מצוין | UI עשיר, פשוט | empty HTML עד JS |
| **SSR** (Server-Side) | בכל בקשה (server-side) | מהיר | מצוין | טוב | תוכן טרי לכל user | server load |
| **SSG** (Static Generation) | פעם אחת ב-build | מהיר ביותר | מצוין | ❌ עד re-build | CDN cache, חינם | תוכן מתיישן |
| **ISR** (Incremental SR) | ב-build + revalidate (Next.js) | מהיר | מצוין | חצי-טוב (revalidate interval) | היברידי SSG+SSR | סיבוכיות |

### Next.js syntax (App Router)

```js
// SSG — ברירת מחדל
export default async function Page() { return <h1>Hi</h1>; }

// SSR — opt-in via dynamic
export const dynamic = "force-dynamic";

// ISR — opt-in via revalidate
export const revalidate = 60; // re-build every 60s
```

---

## 26. type ↔ interface — TypeScript (קושי 6)

### טבלה

| ציר | `type` | `interface` |
|---|---|---|
| תחביר | `type T = { x: string }` | `interface T { x: string }` |
| Union types | ✅ `type X = A \| B` | ❌ |
| Tuple types | ✅ `type T = [string, number]` | ❌ |
| Computed types | ✅ `type Pick<...>` | ❌ |
| Declaration merging | ❌ | ✅ (אותו interface פעמיים = איחוד) |
| Implements (class) | ✅ | ✅ |
| Extends | `type B = A & {...}` | `interface B extends A {...}` |
| Performance (large) | אטי יותר | מהיר יותר ב-tsc |

### חוק זהב

> **אובייקטים פשוטים → interface. Union/Tuple/Computed → type.** במקרה ספק — type.

```ts
// Object shape — שניהם עובדים
interface User { name: string; age: number; }
type User = { name: string; age: number; };

// Union — חובה type
type Status = "loading" | "success" | "error";

// Tuple — חובה type
type Coord = [number, number];

// Merge — חובה interface
interface Window { myCustom: string; } // מתווסף ל-Window הקיים
```

---

## 27. unknown ↔ any ↔ never (קושי 7)

### טבלה

| Type | מקבל? | יכול להציב למשתנה אחר? | משמעות |
|---|---|---|---|
| `any` | כל ערך | ✅ ללא בדיקה | "אני לא יודע, אל תבדוק" — מעקף את TS |
| `unknown` | כל ערך | ❌ — חייב type narrowing | "אני לא יודע, **בדוק** לפני שתשתמש" |
| `never` | אף ערך | n/a (לעולם לא קיים) | "פונקציה לא חוזרת" / branch לא אפשרי |

### דוגמת קוד

```ts
// any — בורח מ-TS (ברוב המקרים סימן רע)
let a: any = "hi";
a.foo.bar.baz();   // אין שגיאה (אבל crash בזמן ריצה)

// unknown — חייב narrow
let u: unknown = "hi";
// u.length;       // ❌ Object is of type 'unknown'
if (typeof u === "string") u.length;  // ✅ אחרי narrow

// never — לא יחזור
function fail(msg: string): never { throw new Error(msg); }
function infinite(): never { while (true) {} }

// בstmts — never מציין מצב בלתי אפשרי
type Shape = "circle" | "square";
function area(s: Shape) {
  if (s === "circle") return 1;
  if (s === "square") return 2;
  const _exhaustive: never = s;  // תופס בזמן compile אם הוספת shape ולא טיפלת
}
```

### חוק

> **`any` הוא escape hatch — תיקון זמני. `unknown` הוא הברירה הבטוחה. `never` הוא מסר לקומפיילר ש-branch לא אמור לקרות.**

---

## 28. HTTP Status Codes — 2xx / 3xx / 4xx / 5xx (קושי 5)

### טבלה

| קטגוריה | משמעות | דוגמאות עיקריות |
|---|---|---|
| **2xx Success** | הבקשה הצליחה | `200 OK`, `201 Created`, `204 No Content` |
| **3xx Redirect** | יש לך לחפש במקום אחר | `301 Permanent`, `302 Found`, `304 Not Modified` |
| **4xx Client Error** | אתה (client) שגית | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable`, `429 Too Many Requests` |
| **5xx Server Error** | אנחנו (server) שגינו | `500 Internal`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Timeout` |

### בלבול נפוץ

| מצב | קוד נכון |
|---|---|
| משתמש לא מחובר | `401 Unauthorized` |
| משתמש מחובר אבל אין הרשאה | `403 Forbidden` |
| לא נמצא פריט בDB | `404 Not Found` |
| ולידציה נכשלה (form invalid) | `400 Bad Request` או `422 Unprocessable` |
| יצירה הצליחה | `201 Created` (לא 200) |
| מחיקה הצליחה | `204 No Content` (לא 200) |
| Rate limit חרג | `429 Too Many Requests` |

### החוק

> **2xx = סבבה. 3xx = תפנה. 4xx = בעיה אצלך. 5xx = בעיה אצלי.**

---

## 29. req.params ↔ req.query ↔ req.body ↔ req.headers (Express) (קושי 5)

### טבלה

| איפה | תחביר ב-URL/payload | קריאה | טיפוס מקבל |
|---|---|---|---|
| `req.params` | `/user/:id` → `/user/42` | `req.params.id` → "42" | string |
| `req.query` | `/search?q=foo&limit=10` | `req.query.q` → "foo" | string |
| `req.body` | POST/PUT body (JSON או form) | `req.body.email` | מה ש-`body-parser` או `express.json()` החליטו |
| `req.headers` | HTTP headers | `req.headers["content-type"]` | string |
| `req.cookies` | cookie header (עם `cookie-parser`) | `req.cookies.session` | string |

### דוגמה מלאה

```js
app.post("/users/:id", (req, res) => {
  const id     = req.params.id;            // path param
  const limit  = req.query.limit;          // ?limit=10
  const data   = req.body;                 // JSON body
  const auth   = req.headers.authorization; // Bearer ...
  // ...
});
```

### חוק

> **Path params זה לאיזו ישות (id). Query string זה איך לסנן/למיין. Body זה מה לשמור. Headers זה meta (auth, content-type).**

---

## 30b. Loops — for / while / for...of / for...in / forEach (קושי 5)

### טבלה

| Loop | מה הוא עובר | יכול break/continue? | יש index? | טוב ל... |
|---|---|---|---|---|
| `for (let i; cond; i++)` | טווח מספרי | ✅ | ✅ (`i`) | אופטימיזציה, צעד מותאם |
| `while (cond)` | תנאי | ✅ | ❌ | תנאי לא-מספרי, לולאה לא-ידועה-מראש |
| `do { } while (cond)` | תנאי (לפחות פעם 1) | ✅ | ❌ | תנאי שצריך לרוץ פעם 1 לפחות |
| `for (const v of arr)` | iterable (Array, String, Set, Map, NodeList) | ✅ | ❌ (אבל `entries()` נותן) | מערך/iterable — הברירה המודרנית |
| `for (const k in obj)` | **keys** של object (כולל prototype!) | ✅ | n/a | objects (אבל ב-90% מהזמן `Object.keys` עדיף) |
| `arr.forEach(cb)` | מערך | **❌ break לא עובד** | ✅ (`(v, i) => ...`) | קוד פונקציונלי, ללא צורך ב-break |

### דוגמת קוד אחת לכולם

```js
const arr = ["a", "b", "c"];
const obj = { x: 1, y: 2 };

for (let i = 0; i < arr.length; i++) console.log(i, arr[i]);   // 0 a, 1 b, 2 c
for (const v of arr) console.log(v);                            // a, b, c
for (const k in obj) console.log(k, obj[k]);                    // x 1, y 2
arr.forEach((v, i) => console.log(i, v));                       // 0 a, 1 b, 2 c
let i = 0; while (i < arr.length) { console.log(arr[i]); i++; } // a, b, c
```

### Anti-patterns

| בעיה | למה | תיקון |
|---|---|---|
| `for...in` על מערך | עובר גם על props מורשים | `for...of` או `forEach` |
| `forEach` כשצריך לעצור | לא תומך ב-break | `for...of` או `some()` |
| `forEach(async fn)` | מחזיר Promise אבל לא מחכה | `for (const x of arr) await fn(x)` |
| `for (i in obj)` בלי `hasOwnProperty` | תופס props מ-prototype | `for (const k of Object.keys(obj))` |

### חוק זהב

> **מערך → `for...of` או `forEach`. Object → `Object.keys/values/entries`. תנאי מספרי מורכב → `for`. תנאי לא-ידוע-מראש → `while`. צריך break ב-forEach? עבור ל-`for...of`.**

---

## 31. CSS — דף סיכום אחד (קושי 6)

> כל ה-CSS שצריך לדעת למבחן — Box Model, Display, Position, Units, Flexbox, Grid, ב-page אחד.

### Box Model (margin / padding / border)

```
┌─── margin (חיצוני, לא רואים) ───┐
│ ┌─── border (קו חזותי) ───────┐ │
│ │ ┌─── padding (פנימי) ────┐  │ │
│ │ │      content           │  │ │
│ │ └────────────────────────┘  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

| Property | מה זה | יוצא מ-flow? | משפיע על box-sizing? |
|---|---|---|---|
| `margin` | מרווח חיצוני | תופס מקום אבל שקוף | לא נכלל ב-width |
| `padding` | מרווח פנימי | תופס מקום | תלוי ב-`box-sizing` |
| `border` | קו | תופס מקום | תלוי ב-`box-sizing` |
| `box-sizing: content-box` (default) | width = content בלבד | n/a | width לא כולל padding/border |
| `box-sizing: border-box` (מומלץ) | width = content + padding + border | n/a | width כולל הכל ✅ |

> **הוראה ראשונה תמיד:** `* { box-sizing: border-box; }` — מונע 90% מבעיות layout.

### Display

| ערך | תופס שורה? | width/height עובד? | פדים אנכיים | הילדים = item? |
|---|---|---|---|---|
| `block` | ✅ | ✅ | ✅ | ❌ |
| `inline` | ❌ | ❌ | רק padding-x | ❌ |
| `inline-block` | ❌ | ✅ | ✅ | ❌ |
| `flex` | ✅ | ✅ | ✅ | ✅ flex item |
| `grid` | ✅ | ✅ | ✅ | ✅ grid item |
| `none` | (נסתר) | n/a | n/a | n/a |

### Position

| ערך | מתייחס ל... | יוצא מ-flow? | scroll-able? | תרחיש |
|---|---|---|---|---|
| `static` | n/a | ❌ | כן | ברירת-מחדל |
| `relative` | המקום הטבעי | ❌ | כן | shift קל + עוגן ל-absolute |
| `absolute` | אב הקרוב עם position relative+ | ✅ | כן | tooltips, dropdowns |
| `fixed` | viewport | ✅ | **לא** (קפוא) | modal, header צף |
| `sticky` | viewport (אחרי גלילה) | היברידי | היברידי | section header דביק |

### Units — em / rem / px / % / vh / vw

| יחידה | יחסי ל... | מתי משתמשים |
|---|---|---|
| `px` | פיקסל מוחלט | borders, shadows, fine details |
| `rem` | font-size של `<html>` | typography, spacing — **המומלץ ב-2026** |
| `em` | font-size של ההורה | יחסי-לקונטקסט, מסוכן (מצטבר) |
| `%` | אב | width בlayouts |
| `vh` / `vw` | viewport height/width | hero sections, full-screen modals |

### Flexbox — props חיוניים

```css
.container {
  display: flex;
  flex-direction: row | column;          /* כיוון */
  justify-content: flex-start | center | space-between | space-around | space-evenly;  /* ציר ראשי */
  align-items: stretch | flex-start | center | flex-end | baseline;                     /* ציר משני */
  flex-wrap: nowrap | wrap;              /* ירידת שורה? */
  gap: 1rem;                             /* רווח בין items */
}
.item {
  flex: 0 1 auto;                        /* grow shrink basis */
  flex: 1;                               /* shorthand: 1 1 0 — ממלא שטח */
}
```

### Grid — props חיוניים

```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);     /* 12 עמודות שוות */
  grid-template-rows: 80px 1fr 60px;           /* header / content / footer */
  gap: 16px;
}
.item {
  grid-column: 2 / 5;                          /* מ-2 עד 5 (3 עמודות) */
  grid-area: header;                           /* או שם */
}
```

### Specificity (סדר הניצחון בין selectors)

```
inline style       1,0,0,0
#id                  1,0,0
.class / [attr]        1,0
tag                      1
```

### Anti-patterns

| בעיה | פתרון |
|---|---|
| `!important` בכל מקום | תקן את ה-specificity במקום |
| `position: absolute` בלי אב יחסי | תוסיף `position: relative` להורה |
| `flex: 1` ללא `min-width: 0` בילדים שמכילים טקסט ארוך | overflow horizontal — `min-width: 0` |
| `width: 100%` עם padding (content-box) | החלף ל-`box-sizing: border-box` |

---

### טבלה

| ישות | מה זה | תפקיד |
|---|---|---|
| `Schema` | תבנית נתונים | מגדיר fields, types, validators |
| `Model` | "class" שמייצר פעולות | `find/create/update/delete` |
| `Document` | instance של model | רשומה אחת בDB |
| `populate` | join "אוטומטי" | מחליף ObjectId בdocument המלא |

### דוגמה מלאה

```js
// 1. Schema — מגדיר מבנה
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  posts: [{ type: ObjectId, ref: "Post" }],
});

// 2. Model — יוצר את ה-class
const User = mongoose.model("User", userSchema);

// 3. Document — instance ספציפי
const u = new User({ name: "Alice" });
await u.save(); // u.id, u.posts קיימים

// 4. populate — מרחיב refs
const fullUser = await User.findById(u.id).populate("posts");
// fullUser.posts הוא עכשיו array של Post documents, לא רק ObjectIds
```

### חוק

> **Schema = תבנית. Model = כלי. Document = מופע. Populate = JOIN.**

---

## 🎓 תרגום ל-6 רמות — קלסטרים מרכזיים

> כל קלסטר מקבל 6 הסברים שמסבירים את **ההבדל בין החברים**, מסבתא ועד פרופ׳.

---

### 🎯 קלסטר #1 — זיכרון, משתנים ומצביעים (let / var / const / By Value / By Reference / Pointer)

**סבתא** 🧓 — חיותלך הוא כתב יד שלך עצמך. שכן רואה את הכתב יד דרך החלון שלך — אם תקרעי לו, הוא יקרע גם אצלו. זה ההבדל בין דף נפרד (ערך) לדף משותף (מצביע). `var` זו דרך ישנה שאיש לא משתמש בה היום.

**ילד כיתה א׳** 👶 — דמיין שיש לך תיק עם פתקים. בפתק יש או מספר (זה "ערך") או חץ שמראה איפה הצעצוע באמת נמצא (זה "מצביע"). כשאתה אומר `let` אתה יכול לשנות את הפתק. כשאתה אומר `const` הפתק קבוע — אבל אם הפתק הוא חץ לארון, מותר לסדר את הארון מבפנים. `var` זה הסבא של `let` ומבולבל קצת.

**חייל** 💂 — `var` מ-1995 דולף לכל ה-function (function scope). `let` מ-2015 מתנהג יפה ב-block scope ונחסם בTDZ עד הצהרה. `const` כמו `let` אבל אסור rebinding. ערכים פרימיטיביים יושבים ב-Stack — העתקה היא byte-by-byte. אובייקטים יושבים ב-Heap — המשתנה מחזיק רק כתובת (pointer). שני משתנים על אותו object רואים את אותו mutation.

**סטודנט** 🎓 — `var`: function-scoped, hoisted with `undefined`, allows redeclaration. `let`/`const`: block-scoped, hoisted to TDZ, prohibit redeclaration. Primitives (number/string/boolean/null/undefined/symbol/bigint) → by-value: copying duplicates the bytes. Objects/arrays/functions → by-reference: copying duplicates only the pointer. `const obj = []; obj.push(1)` is legal because `const` freezes the binding (the pointer slot in Stack), not the heap content. `===` on objects compares pointers, not contents.

**ג'וניור** 👨‍💻 — מה שמורידים אותי במהלך code review הוא לא lint warnings על `var`, אלא mutation בטעות של object שעובר ב-prop. אני זוכר שלקח לי שעתיים לדבג בעיה שב-`map` הtemp item שונה בעקבות `state.items[i].x = 1` במקום `setState(...)`. מאז: `const` כברירת מחדל, deep clone לפני mutation אם זה state, structuredClone במקום JSON parse-stringify למקרים עם Date/Map.

**פרופ׳** 🎩 — JS engine (V8) places primitives directly in the stack frame slot of the calling function; objects are heap-allocated and a tagged pointer (with type bits) is placed in the slot. `const` enforces immutability at the binding-site level only. Hidden classes accelerate property access; mutating via `delete` or polymorphic shapes degrades performance. GC is generational (Scavenge → Major Mark-Sweep), so short-lived references get optimized. Knowing these helps when profiling memory leaks via Chrome DevTools heap snapshots.

---

### Object ↔ Array ↔ Function (§5)

**סבתא** 🧓 — Object זה כספת עם שמות-תאים (`name`, `age`). Array זה תור של אנשים לפי מקום (0, 1, 2). Function זה מתכון שמייצר משהו כשמפעילים אותו.

**ילד כיתה א׳** 👶 — אובייקט: קופסה עם תאים שיש להם שמות. מערך: קופסה עם תאים לפי מספר. פונקציה: מכונה — שמים פנימה משהו וזה יוצא משהו אחר.

**חייל** 💂 — שלושתם objects (`typeof === "object"` או `"function"` עבור פונקציה). כולם heap-allocated, כולם passed by-reference. ההבדל: Object גישה לפי key string. Array גישה לפי numeric index + `.length` אוטומטי. Function callable + `.prototype` למיועדים-כ-constructor.

**סטודנט** 🎓 — Object: associative collection (string keys). Array: indexed (numeric keys + length tracking). Function: callable object with `[[Call]]` slot. כולם פאסים by-reference. כולם mutable. `Array.isArray()` מבחין arrays. `typeof fn === "function"` מבחין פונקציה.

**ג'וניור** 👨‍💻 — בקוד-ייצור התבלבלתי לא פעם בין `obj.constructor === Array` לבין `Array.isArray()` — השני יותר אמין כי עובר iframes. ושיעור הכאב: מערכים *הם* objects, לכן `arr.foo = 5` לא יזרוק שגיאה אבל `JSON.stringify` יתעלם מ-`foo`.

**פרופ׳** 🎩 — V8 internally tracks Element Kinds for arrays (PACKED_SMI, PACKED_DOUBLE, HOLEY_*) which dramatically affect performance — sparse arrays (`arr[1000] = x`) downgrade to dictionary mode. Functions carry hidden `[[FunctionKind]]` slots for arrow/normal/generator/async. Objects use Hidden Classes (Maps in V8 lingo) cached in inline caches.

---

### Arrow Function ↔ Regular Function (§6)

**סבתא** 🧓 — פונקציה רגילה היא כמו עובד שמסתכל על מי שקרא לו. פונקציית חץ היא עובד-זוטר שמסתכל תמיד על המנהל הקבוע שלו (איפה שהוא נולד), לא על מי שלוחץ עליו.

**ילד כיתה א׳** 👶 — פונקציה רגילה משנה את המילה `this` לפי מי קורא לה. פונקציית חץ זוכרת את `this` של המורה שלה — לא מתבלבלת אם מישהו אחר יקרא לה.

**חייל** 💂 — Regular function: dynamic `this` (תלוי בקריאה). Arrow function: lexical `this` (מהsurrounding scope). Arrow אין `arguments`, אין `prototype`, אסור `new`. Arrow קצרה: implicit return במשפט יחיד. Regular יכולה להיות constructor.

**סטודנט** 🎓 — `this` ב-regular: `obj.method()` → this=obj, `method()` → this=undefined (strict)/window. `this` ב-arrow: lexically captured at definition. `arguments`: רק ב-regular. `new fn()`: רק ב-regular. שימושים: regular ל-methods, arrow ל-callbacks (event handlers, array methods).

**ג'וניור** 👨‍💻 — תופס אותי קבוע ב-class methods: כותב `onClick={this.handleClick}` ושוכח לעטוף ב-arrow או ב-bind. הפתרון המודרני: arrow function כ-class field (`handleClick = () => {...}`). ב-React hooks אין את הצרה הזו כי functions פונקציונליות.

**פרופ׳** 🎩 — Spec: arrows have no `[[Construct]]` internal slot, no own `arguments`/`super`/`new.target`. Their `this` is captured from the lexically enclosing executing context's `[[ThisBindingStatus]]`. V8 optimizes arrow functions slightly differently — they avoid the prototype object allocation. In bytecode: regular fns get `LdaImmutableContextSlot` for `this`, arrows reach into outer context via `LdaContextSlot`.

---

### Equality: `==` ↔ `===` ↔ `Object.is` (§17)

**סבתא** 🧓 — `==` שואל "אולי דומה?" וממיר טיפוסים. `===` שואל "באמת זהה?" בלי המרה. `Object.is` שואל "זהה לחלוטין כולל NaN ו--0?".

**ילד כיתה א׳** 👶 — `==` עיוור: יחשוב ש-`5` ו-`"5"` שווים. `===` חכם: רק אם זה גם אותו מספר וגם אותו סוג. `Object.is` הכי קפדן: גם NaN שווה ל-NaN וגם -0 לא שווה ל-+0.

**חייל** 💂 — `==` מפעיל ToNumber/ToString לפי טבלה מסובכת. `===` מבצע SameValueNonNumber. `Object.is` מבצע SameValue (NaN === NaN true, -0 ≠ +0).

**סטודנט** 🎓 — Use `===` 99% of the time. Exception: `x == null` matches both null and undefined (concise null-check). `Object.is` only when comparing NaN equality or distinguishing +0/-0. Never use `==` with primitives that come from user input.

**ג'וניור** 👨‍💻 — קונטרובציה: ESLint eqeqeq rule כברירת מחדל. הפוך אותו ל-warning עם exception ל-`== null`. שגיאה שתפסתי: `if (response.id == userId)` עם userId מ-URL (string) ו-id מ-DB (number) — עבד ב-dev בעיוורון, נכשל ב-tests עם strict comparison.

**פרופ׳** 🎩 — Abstract Equality (==) follows a 14-rule algorithm in §7.2.13. Strict Equality (===) follows §7.2.14, calling SameValueNonNumber for objects. SameValue (Object.is) treats NaN reflexively — useful for memo cache keys. SameValueZero (Map/Set keys) treats NaN equal but +0/-0 equal too — different from Object.is.

---

### Null ↔ Undefined ↔ NaN (§18)

**סבתא** 🧓 — undefined זה "המערכת לא יודעת". null זה "אני המתכנת אומר במפורש: אין". NaN זה "המתמטיקה השתבשה".

**ילד כיתה א׳** 👶 — תפתח קופסה ריקה — `undefined` (לא הכנת כלום). תכניס פתק "ריק" — `null` (התכוונת לריק). תכפיל אבטיח בעולם — `NaN` (אי אפשר).

**חייל** 💂 — `let x;` → undefined. `let y = null;` → null. `0/0` או `"a"*1` → NaN. `typeof null === "object"` (באג היסטורי). `null == undefined` true (loose). `NaN === NaN` false. השתמש ב-`Number.isNaN` לבדיקה אמינה.

**סטודנט** 🎓 — undefined: implicit absence (uninitialized var, missing arg, void return). null: explicit absence (programmer-set). NaN: invalid number arithmetic. Use `??` (nullish coalescing) for null/undefined fallback. Use `Number.isNaN` (not the global `isNaN` which converts).

**ג'וניור** 👨‍💻 — שיגעון של API אחד שראיתי: `data.user || {}` כי לפעמים user מגיע null ולפעמים undefined. אחרי 2 production crashes, החלפנו ל-`data.user ?? {}` שזה יותר מדויק (ולא תופס falsy אחרים כמו 0).

**פרופ׳** 🎩 — null is a primitive but `typeof null` returns `"object"` due to legacy V8/JIT representation. NaN is unique among numbers: it's the only value where `x !== x` is true, used as a sentinel. IEEE 754 actually has multiple NaN bit patterns (signaling/quiet); JS exposes a single canonical one. `Object.is(NaN, NaN)` distinguishes properly.

---

### Promise Combinators: all / race / allSettled / any (§9)

**סבתא** 🧓 — `all`: אני מחכה שכולם יסיימו, אם אחד נופל אני מתעצבנת. `race`: הראשון שמסיים קובע. `allSettled`: כולם חייבים לדבר, מקשיבה גם למי שכשל. `any`: מספיק שאחד יצליח.

**ילד כיתה א׳** 👶 — תארו לכם 4 חברים בתחרות. `all`: אם אחד נופל — כולם נופלים. `race`: הראשון שעובר את הקו מנצח. `allSettled`: כולם רצים עד הסוף, סופרים לכל אחד. `any`: מספיק שאחד יצליח, אפילו אם השאר נופלים.

**חייל** 💂 — `Promise.all`: מערך תוצאות, fail-fast. `Promise.race`: ראשון שsettled (resolve OR reject). `Promise.allSettled`: מערך `{status, value/reason}`, אף פעם לא נדחה. `Promise.any`: ראשון שresolved, נדחה רק אם כולם נדחו (AggregateError).

**סטודנט** 🎓 — `all` נכון לכשיש חובה לכל הקריאות. `allSettled` כשרוצים reporting. `race` כש-timeout: `Promise.race([fetch, sleep(5000).then(()=>{throw "timeout"})])`. `any` כש-fallback servers: עיכוב סביר אם הראשון אטי, מנצח על-יד הראשון שעונה.

**ג'וניור** 👨‍💻 — תרחיש ייצור: dashboard עם 8 widgets, כל widget הוא קריאת API. אם משתמש ב-`Promise.all` ואחד נכשל — כל הdashboard ריק. החלפתי ל-`Promise.allSettled` + per-widget error UI. UX השתפר דרמטית.

**פרופ׳** 🎩 — Internally these are sugar over PerformPromiseAll/Race/AllSettled/Any abstract operations. They use a counter-tracker (RemainingElements in spec). `Promise.any`'s AggregateError carries `errors` array. Microtask queue ordering matters: `Promise.race([Promise.resolve(1), Promise.resolve(2)])` resolves to 1 because of microtask FIFO.

---

### Callback ↔ Promise.then ↔ async/await (§10)

**סבתא** 🧓 — קולבק: "תקרא לי כשתסיים". פרומיס: "תחזיר לי שובר ואני אבחן אותו". async/await: "כתוב לי כאילו זה קורה מיד, ואני אדאג לחכות".

**ילד כיתה א׳** 👶 — קולבק: כל פעם שתסיים, תרים יד. פרומיס: יש לך קופון שיהפוך לטיפול. async: כתוב מספרים בשורה אחת והמורה תוודא שהסדר נשמר.

**חייל** 💂 — Callback: pyramid of doom, error handling קשה. Promise: chains via `.then()`, central `.catch()`. async/await: סינטקטי-שכר-של-Promise, `try/catch` רגיל, top-level await ב-modules.

**סטודנט** 🎓 — Callback: function passed to be called later, often with `(err, data)` Node convention. Promise: object with `then/catch/finally`, allows chaining. async/await: makes async code look synchronous, error-handling via try/catch. Each function is auto-wrapped in Promise.

**ג'וניור** 👨‍💻 — שיעור: `forEach(async fn)` לא מחכה — זאת תוצאת מודולוס שמתפתחת ל-promise-leak. החלף ל-`for (const x of arr) await fn(x)` (סדרתי) או `await Promise.all(arr.map(fn))` (מקבילי). דיברתי 3 פעמים על זה ב-code-review בקוורטל האחרון.

**פרופ׳** 🎩 — `async function` מחזירה Promise אוטומטית. `await` עוצר את ה-execution context, שומר על מקומו, ומכניס resumption ב-microtask queue. Stack trace של async/await נשמר על-ידי "zero-cost async stack traces" של V8 (Chromium DevTools). Native promise rejection logging דורש `unhandledrejection` event listener.

---

### useEffect Dependency Array (§11)

**סבתא** 🧓 — מערך תלויות זה רשימה של דברים שאם משתנים — תפעילי שוב את החוק. רשימה ריקה = פעם אחת בלבד. בלי רשימה = בכל רינדור.

**ילד כיתה א׳** 👶 — תוכל להגיד למורה: "תקראי לי שוב רק אם הציון משתנה" (`[score]`). או "תקראי פעם אחת" (`[]`). או "תקראי כל פעם" (ללא array).

**חייל** 💂 — `useEffect(fn)` רץ אחרי כל commit. `useEffect(fn, [])` רץ אחרי mount בלבד. `useEffect(fn, [x])` רץ כש-`x` שונה (Object.is). חוק: כל משתנה ש-fn משתמש בו חייב להיות בdeps, אחרת stale closure.

**סטודנט** 🎓 — Each render creates a new closure. The effect captures the variables at render-time. If a variable in dep array changes (referentially), effect re-runs. `[]` is dangerous for any externally-visible state. Functional updates (`setX(prev => prev+1)`) avoid needing the value in deps.

**ג'וניור** 👨‍💻 — eslint-plugin-react-hooks/exhaustive-deps תופס 90% מהבאגים. פעם אחת ניסיתי לעקוף עם `// eslint-disable` והבאג נפל ב-prod כשמרוצי setInterval התחילו להראות נתונים ישנים. התיקון: extract custom hook, או `useRef` לערכים שלא צריכים לעורר re-render.

**פרופ׳** 🎩 — React reconciler stores dep arrays in fiber's `memoizedState`. Comparison uses Object.is. Effects fire after commit phase, in order. Cleanup function from prev effect runs before new one — this is the source of double-fire in StrictMode (intentional). useEffect vs useLayoutEffect: timing relative to paint.

---

### Loops (§30b)

**סבתא** 🧓 — for=מספר חזרות ידוע. while=עד שתגמרי. for-of=על קלפים אחד אחד. forEach=לעשות פעולה לכל קלף בלי להפסיק.

**ילד כיתה א׳** 👶 — for: סופרים מ-1 ל-10. while: עד שאני רואה אדום. for...of: על כל ילד בכיתה. forEach: כל ילד מקבל סוכריה, אי אפשר לעצור באמצע.

**חייל** 💂 — `for(i;cond;i++)`: מספרי, גמיש, יש index. `while`: תנאי גרידא. `for...of`: על iterable, יכול break. `for...in`: על keys (כולל מורשים — מסוכן ב-arrays). `forEach`: callback על מערך, אין break (חייב throw).

**סטודנט** 🎓 — Hot path בקוד? `for` היה היסטורית מהיר יותר אבל V8 מודרני סוגר את הפער. Iterables (Set/Map/NodeList) דורשים `for...of` או `Array.from`. Async-loop: `for await...of` למקור async. `forEach` לא מקבל break — אם צריך, החלף ל-`for...of` או `some()`.

**ג'וניור** 👨‍💻 — תקלה קלאסית: `for...in` על מערך תפס key מ-prototype אחרי polyfill. עוד תקלה: `arr.forEach(async ...)` שלא חיכה. ה-rule שלי: arrays → `for...of`. Objects → `Object.entries`. Conditions → `while`. Numeric → `for`.

**פרופ׳** 🎩 — Iterators implement `[Symbol.iterator]()` returning `{next: () => {value, done}}`. for...of desugars to manual `next()` loop. for...in iterates enumerable string-keyed properties including inherited (filter via `hasOwnProperty` or `Object.keys`). V8 has a fast-path for indexed `for` on dense arrays — sparse arrays fall to slower path.

---

### Event Loop — Microtask ↔ Macrotask (§8)

**סבתא** 🧓 — תור ראשי = macrotasks (אנשים בקופה). תור-מוקדם = microtasks (אנשים מורשים לקפוץ קדימה). אחרי כל לקוח אחד מהקופה, כל המורשים הראשונים מקבלים תור.

**ילד כיתה א׳** 👶 — היו שתי מסעדות: macrotask זה הסטנדרטית. microtask זה לפני הקופה — היא קופצת ראשונה. כל פעם שיוצא לקוח מהקופה, אם יש "מורשי קפיצה" — כולם עוברים לפניו.

**חייל** 💂 — Macrotask: setTimeout, setInterval, I/O, UI events. Microtask: Promise callbacks, queueMicrotask, MutationObserver. בכל סבב event loop: 1 macrotask, אז כל ה-microtask queue, אז render. Microtask infinite loop = UI freeze.

**סטודנט** 🎓 — Engine pulls one task from macrotask queue, executes it to completion. Then drains the entire microtask queue. Then repeats. `setTimeout(fn, 0)` doesn't fire "immediately" — it must wait for current sync code + all pending microtasks.

**ג'וניור** 👨‍💻 — דבג של חיים: `console.log` ב-`Promise.then` הופיע *לפני* `console.log` ב-`setTimeout(fn,0)`. עד שלא הבנתי microtask vs macrotask, בנייתי polling פגום שראה stale state.

**פרופ׳** 🎩 — HTML spec defines Task and Microtask queues per agent. PerformMicrotaskCheckpoint runs after every Task. Some platform APIs (queueMicrotask, MutationObserver) explicitly schedule to microtask queue. requestAnimationFrame is special — it's neither, scheduled before next paint.

---

### useMemo ↔ useCallback ↔ React.memo (§12)

**סבתא** 🧓 — useMemo שומר *תוצאה*. useCallback שומר *פונקציה*. React.memo עוטף קומפוננטה שלא תרנדר אם props לא משתנים.

**ילד כיתה א׳** 👶 — דמיין מטבח. useMemo: חישוב יקר שעשית ושמרת בקופסה. useCallback: מתכון שאתה מוסר לעוזר תמיד באותו עותק. React.memo: עוזר שלא קם אם לא קורה כלום בעולמו.

**חייל** 💂 — שלושתם memoization tools, אבל לפי ציר אחר: useMemo cache לערכים יקרים, useCallback cache לפונקציות (שלא יתחלפו ב-render), React.memo cache ל-render של ילד שלם.

**סטודנט** 🎓 — useMemo(fn, deps) → memoized return value. useCallback(fn, deps) ≡ useMemo(()=>fn, deps). React.memo(Component) → only re-render if shallow-equal props change. שלושתם עובדים יחד: ילד ב-React.memo + prop פונקציה ב-useCallback + ערך יקר ב-useMemo.

**ג'וניור** 👨‍💻 — בקוד פרודקשן: `useCallback` בלי React.memo בילד = רק עלות אפס תועלת. הפכתי את ההחלטה לשני "האם הילד ב-memo?" אם לא — אל תחביל את הפונקציה. זה הקטין מורכבות בקוד ב-30%.

**פרופ׳** 🎩 — Hook implementations store deps + result in fiber's memoizedState slot. Comparison via Object.is. React.memo wraps in HOC that uses shallowEqual on props. Over-memoization adds shallow-compare overhead per render — measure with React DevTools Profiler before optimizing.

---

### Set ↔ Map ↔ Object (§13)

**סבתא** 🧓 — Object זה קופסה עם תאים שיש להם שמות. Map זה קופסה שיכולה להיות עם מפתחות מכל סוג. Set זה קופסה של פריטים יחידים בלי כפילויות.

**ילד כיתה א׳** 👶 — אובייקט: ארון בגדים עם שמות-מגירה. Map: ארון שאפשר להשתמש בכל דבר כתווית. Set: סוג אוסף שלא מאפשר לי לשים את אותה מדבקה פעמיים.

**חייל** 💂 — Object: keys=string/Symbol, יש prototype chain. Map: keys=any (object/function/primitive), insertion-ordered, .size מהיר, .has/get מהיר. Set: רק values, .has O(1).

**סטודנט** 🎓 — Use Object for fixed-shape configs, JSON-friendly. Use Map for dynamic key/value with frequent add/delete or non-string keys (e.g., Map of DOM nodes → metadata). Use Set for uniqueness ([...new Set(arr)]) or fast membership test.

**ג'וניור** 👨‍💻 — מפתח שעבר אחרי שלושה חודשים: Object נתן performance issue ב-cache עם הרבה add/delete (V8 transitions to dictionary mode). החלפתי ל-Map והפעולה התקצרה מ-200ms ל-15ms.

**פרופ׳** 🎩 — Internally: Object uses Hidden Classes optimized for static shapes. Adding/removing keys triggers shape transitions — expensive. Map uses a hash table, optimized for runtime growth. WeakMap/WeakSet permit GC of keys, useful for metadata without leak.

---

### Spread ↔ Rest (§14)

**סבתא** 🧓 — אותם 3 נקודות, תפקיד הפוך: spread פותח את הסל לקפצים נפרדים, rest אוסף קפצים נפרדים לסל אחד.

**ילד כיתה א׳** 👶 — דמיין שקית סוכריות. spread: שופך מהשקית לכל ילד. rest: אוסף סוכריות שנשארו ושם בשקית חדשה.

**חייל** 💂 — Spread: בקריאה (function call, array literal, object literal) → מפזר. Rest: בהגדרה (function param, destructuring) → אוסף. אותו תחביר `...`, מיקום שונה קובע תפקיד.

**סטודנט** 🎓 — Spread: `[...arr1, ...arr2]`, `{...obj}`, `Math.max(...nums)`. Rest: `function f(...args)`, `const [a, ...rest] = arr`, `const {a, ...rest} = obj`. Important: spread creates shallow copies — nested objects still shared.

**ג'וניור** 👨‍💻 — שגיאת state של React 19: spread על state עם nested object עדיין משתף את ה-nested. הפתרון: structuredClone או spread כל רמה במפורש. בנוסף, `{...obj, x:1}` יוצר אובייקט חדש — חשוב כש-prop משווה shallow.

**פרופ׳** 🎩 — Spread invokes `Symbol.iterator` for arrays / `OwnPropertyKeys` for objects. V8 has fast paths for `[...arr]` of dense arrays. Object spread is shallow — preserves enumerable own keys, calls `[[Get]]` per property. Rest in destructuring uses CopyDataProperties internally.

---

### Function definition kinds (§15)

**סבתא** 🧓 — declaration זה כתב מלא. expression זה לא חתום. arrow זה תקציר. IIFE זה הצגה חד-פעמית.

**ילד כיתה א׳** 👶 — declaration (`function f()`): מוכן מההתחלה. expression (`const f = function...`): מוכן רק אחרי הצהרה. arrow (`() =>`): קצר ובלי `this` שלו. IIFE: פותח וסוגר מיד.

**חייל** 💂 — Declaration: hoisted (callable before line). Expression/arrow: TDZ until line. Arrow: lexical this/arguments, no constructor. IIFE: pre-ES6 scope-isolation hack.

**סטודנט** 🎓 — Declaration for stable named functions; expression for dynamic assignment; arrow for callbacks/methods needing lexical this; IIFE for legacy modules pre-ES2015. Method shorthand (`{ greet() {} }`) preferred over both for object methods.

**ג'וניור** 👨‍💻 — בקוד legacy שראיתי IIFE מסביב לכל קובץ — היום ESModules עושים את זה אוטומטית. Arrow כ-class field היא best practice ב-class components לcallbacks. Function declarations לפונקציות util מודולריות.

**פרופ׳** 🎩 — Declaration creates binding at parse time (hoisting). Expression evaluates at runtime. Arrow has no own [[ThisValue]], [[NewTarget]], or [[FunctionKind=Normal]] slot — uses NewArrowEnvironment. IIFE: parens force ParenthesizedExpression parse, allowing the trailing `()` invocation.

---

### Type check (§16)

**סבתא** 🧓 — typeof שואל "מה זה?". instanceof שואל "מאיזו משפחה זה בא?". Array.isArray שואל "האם זה מערך?".

**ילד כיתה א׳** 👶 — אם תרצה לדעת אם משהו זה מספר — typeof. אם משהו זה כלב או חתול — instanceof. אם משהו זה שורה (מערך) — Array.isArray.

**חייל** 💂 — typeof: 7 תוצאות (undefined/boolean/number/bigint/string/symbol/object/function). באג: `typeof null === "object"`. instanceof: בודק prototype chain. Array.isArray: דרך אמינה למערך (עובדת בין iframes).

**סטודנט** 🎓 — typeof: primitives. instanceof: class instances (lib classes, custom classes). Array.isArray: arrays specifically. Avoid relying on `instanceof` between realms (iframe), and never use `typeof` for null/array.

**ג'וניור** 👨‍💻 — שימוש שלמדתי מ-bug-fix: `arr.constructor === Array` נכשל בזמן שsubclassed. החלפתי ל-`Array.isArray` שעובד גם על Proxy של Array. ואל תיתן ל-typeof לרמות אותך עם null!

**פרופ׳** 🎩 — `typeof` is a syntactic operator returning a string per spec table. `instanceof` invokes `Symbol.hasInstance` if defined. `Array.isArray` checks the `[[Class]]` (TypedArray returns false). Realm boundaries (iframes) cause new Array prototype — instanceof fails, isArray succeeds via internal slot.

---

### Destructuring — array vs object (§19)

**סבתא** 🧓 — destructuring זה לפתוח שקית ולחלק לפי שמות (object) או לפי תור (array).

**ילד כיתה א׳** 👶 — תפתח שקית עם 3 חברים. array: הראשון ל-A, השני ל-B, השלישי ל-C. object: כל אחד תופס את שלו לפי השם בעטיפה.

**חייל** 💂 — Array destructuring: by position. Object destructuring: by key name. Both support defaults, rest, rename. Skip elements only in array (`const [, , c] = arr`).

**סטודנט** 🎓 — Use array destructuring for tuple-like returns. Use object destructuring for named props/options. Rename via `{a: x}`. Default with `=`. Rest collects remaining via `...rest`. Always default the destructure source with `= {}` to avoid TypeError.

**ג'וניור** 👨‍💻 — מטרה ב-React: destructure props ב-signature כדי לקבל שמות מפורשים. אבל `function Comp({title, items = [], ...rest})` יכול להפוך לקריאה אם יש > 5 props. החזרתי לחוק: 4+ props → typed object.

**פרופ׳** 🎩 — Destructuring is syntactic sugar for assignments using GetV/CopyDataProperties. Spread in destructuring (`...rest`) uses CopyDataProperties (excludes already-listed keys). Defaults invoke only when value is `undefined` (not null!).

---

### innerHTML ↔ innerText ↔ textContent (§20)

**סבתא** 🧓 — innerHTML רואה הכל כולל תגיות (וגם XSS). innerText רואה רק מה שעיני המשתמש רואות. textContent רואה את כל הטקסט גם הסמוי.

**ילד כיתה א׳** 👶 — innerHTML: כתב הכל. innerText: כתב רק מה שאתה רואה על הדף. textContent: כתב את כל המילים, גם אלה שמסתתרות.

**חייל** 💂 — innerHTML: HTML חי (XSS-prone). innerText: respects CSS hidden, computed style aware (slow). textContent: all text including hidden (fast, safe).

**סטודנט** 🎓 — innerHTML when intentionally rendering trusted HTML. textContent for inserting/reading user input safely. innerText for what user visually sees. Performance: textContent fastest (no parse), innerText slowest (forces layout).

**ג'וניור** 👨‍💻 — בעבודה ב-fintech: innerHTML עם user input = audit failure. נכפה DOMPurify על כל innerHTML usage. textContent הפך לdefault. רק תבניות-trusted-server-rendered שורדות innerHTML.

**פרופ׳** 🎩 — innerHTML triggers HTML parser — relatively expensive. innerText forces synchronous reflow because it depends on rendered geometry. textContent walks the DOM tree concatenating Text node values. Risk model: innerHTML executes inline `<script>`-like vectors via `<img onerror=...>`.

---

### event.target ↔ event.currentTarget ↔ this (§21)

**סבתא** 🧓 — target זה איפה שלחצו. currentTarget זה איפה ה-listener. this זה תלוי בסוג הפונקציה.

**ילד כיתה א׳** 👶 — תארו לכם רעם — target זה הענן ששומעים, currentTarget זה החדר שמהדהד.

**חייל** 💂 — target: stays the same throughout bubble (where click happened). currentTarget: changes as event bubbles up (current handler element). this in regular fn: equals currentTarget. this in arrow: lexical (might not match).

**סטודנט** 🎓 — Event delegation pattern: attach listener to parent, use event.target.matches(selector) to identify child. Important for dynamic lists. event.currentTarget is what you bound listener to. Use `this` only with regular functions in handlers.

**ג'וניור** 👨‍💻 — באג שהציל לי שעות: `<ul onClick>` עם innerHTML של LI. אם משתמש לוחץ על SPAN בתוך LI — event.target הוא SPAN! צריך `event.target.closest("li")`. הופעל לכל מקרה של event delegation.

**פרופ׳** 🎩 — DOM Event spec: target is set during event dispatch from target node, currentTarget is updated as we walk capture/target/bubble phases. target is read-only after dispatch starts. composedPath() returns full path including shadow boundaries.

---

### preventDefault ↔ stopPropagation ↔ return false (§22)

**סבתא** 🧓 — preventDefault עוצר את ברירת המחדל. stopPropagation עוצר את ההורים מלשמוע. return false בjQuery עושה את שניהם.

**ילד כיתה א׳** 👶 — לחצן Submit בטופס: preventDefault אומר "אל תשלח". stopPropagation אומר "אל תספר להורה". return false אומר "אל תעשה שום דבר".

**חייל** 💂 — preventDefault: cancels browser default (form submit, link follow, scroll). stopPropagation: cancels bubble to parents. stopImmediatePropagation: also blocks other handlers on same element. return false: jQuery legacy = both.

**סטודנט** 🎓 — Use preventDefault when intercepting AJAX form submits. Use stopPropagation when child action shouldn't trigger parent (modal-overlay clicks). stopImmediatePropagation rarely — usually code smell. Avoid `return false` outside jQuery.

**ג'וניור** 👨‍💻 — בעיה ב-React-portal modal: click ב-modal עלה ל-overlay backdrop. הוספתי stopPropagation על onClick של modal-content. רגרסיה: form submit ב-modal לא עבד. החלפה: להשתמש ב-`mousedown` במקום `click` ל-backdrop.

**פרופ׳** 🎩 — preventDefault sets defaultPrevented=true. Some events are non-cancelable (`event.cancelable === false`). stopPropagation sets internal flag during dispatch — capture/bubble walks check it. Passive listeners (`{passive: true}`) cannot preventDefault — applies to scroll/touch.

---

### CSS Position (§23)

**סבתא** 🧓 — static זה במקום הטבעי. relative זה במקום הטבעי + שיפט קל. absolute יוצא מהזרם ומתחבר לאב יחסי. fixed קפוא במסך. sticky היברידי — נדבק כשגוללים.

**ילד כיתה א׳** 👶 — דמיין שעון: static זה הקיר. relative זה השעון על הקיר. absolute זה שעון תלוי על מסמר חופשי. fixed זה שעון בחלון התבקש. sticky זה שעון שמתחיל בקיר אבל "נדבק" כשגוללים.

**חייל** 💂 — static: ברירת מחדל, בלי top/left. relative: שיפט מהמיקום הטבעי, **תופס מקום**. absolute: יוצא מ-flow, מתחבר לאב הקרוב עם position!=static. fixed: viewport. sticky: relative עד threshold, אז fixed.

**סטודנט** 🎓 — relative as anchor for absolute child: classic dropdown/tooltip pattern. fixed for modals, sticky-headers. sticky for sidebar nav that tracks scroll. Beware: transform on parent breaks fixed positioning.

**ג'וניור** 👨‍💻 — תמלאי: fixed עם transform ב-html/body — fixed הופך לצמוד-להורה. תמלא 2: z-index לא עובד ב-static, חייב position!=static. תמלאי 3: sticky לא עובד אם overflow על אב.

**פרופ׳** 🎩 — Position creates new stacking contexts (when z-index is set). Containing block rules differ per type. Sticky uses scroll-port as containing block. Absolute creates a new "BFC-like" context. Modern alternative: container queries / anchor positioning (CSS Anchor Positioning API 2024+).

---

### CSS Display (§24)

**סבתא** 🧓 — block זה שורה שלמה. inline זה רק במקום שצריך. flex זה שורה גמישה. grid זה לוח שחמט. none זה נסתר.

**ילד כיתה א׳** 👶 — block (כמו פסקה): תופס שורה שלמה. inline (כמו מילה): רק את גודלו. flex: ילדים מתחלקים בשורה. grid: ילדים בלוח רחב.

**חייל** 💂 — block: full-width, takes height/width, breaks line. inline: in-line, ignores width/height. inline-block: in-line but accepts dimensions. flex: 1D layout (row or column). grid: 2D layout (rows + cols).

**סטודנט** 🎓 — flex for navbar/toolbar/cards. grid for page layout / dashboards / responsive grids. inline-block legacy for spans-with-padding. Modern: `display: flex` with `gap` replaces 90% of float-based layouts.

**ג'וניור** 👨‍💻 — חוק שלי: שאלה ראשונה לעיצוב — "1D או 2D?" → flex או grid. ניסיתי פעם להשיג hero layout עם float — לקח לי יום. עם grid: 5 שורות CSS. שאלה שנייה: "האם נדרשת responsive?" → grid template areas + media queries.

**פרופ׳** 🎩 — display creates formatting contexts (BFC, IFC, FFC, GFC). flex auto-prevents margin collapse (caveat for grid too). subgrid (2023+) allows child grids inheriting parent tracks. The `display: contents` removes element from flow but keeps children — useful for accessibility.

---

### SSR ↔ SSG ↔ CSR ↔ ISR (§25)

**סבתא** 🧓 — CSR: דף ריק מגיע, JS בונה. SSR: דף מלא מגיע מהשרת לכל בקשה. SSG: דף מוכן מראש בbuild, מהיר אבל ישן. ISR: היברידי, בנוי + מתעדכן.

**ילד כיתה א׳** 👶 — CSR: ילד מקבל ערכת חימום, מבשל לעצמו. SSR: ילד מקבל ארוחה חמה ומוכנה לכל ביקור. SSG: ארוחה הוכנה אתמול ומוקפאת. ISR: ארוחה הוכנה אתמול אבל מתחממת מחדש מדי-יום.

**חייל** 💂 — CSR: empty HTML + JS bundle, SEO רע, אטי לpaint ראשון. SSR: HTML מלא לכל בקשה, מצוין SEO, server load. SSG: HTML built once, מהיר ביותר, content stale. ISR (Next): SSG + revalidate interval.

**סטודנט** 🎓 — SPA dashboard → CSR. Marketing/blog with frequent updates → SSR. Static docs/landing → SSG. E-commerce listing pages → ISR (refresh every N seconds). React Server Components extend SSR boundary.

**ג'וניור** 👨‍💻 — באמת הדבר הכי חשוב: SSR מעלה server cost. ראיתי startup שעבר ל-Vercel SSR ו-bill קפץ פי 10. החזרנו ל-SSG עם ISR=60. ל-90% מהדפים זה היה מספיק.

**פרופ׳** 🎩 — Next.js 15 routes either to "static" or "dynamic" rendering at build. RSC streams HTML chunks via Suspense. Edge runtime cuts cold-start to ~50ms. ISR uses on-demand revalidation via `revalidatePath()`. Cache layers: CDN, Edge, Origin.

---

### type ↔ interface (§26)

**סבתא** 🧓 — type זה שם לצורה. interface זה חוזה שאפשר להרחיב.

**ילד כיתה א׳** 👶 — type: כינוי לחפץ ("הטבעת היא דבר זהב"). interface: רשימת תכונות ("ספר חייב להכיל פרק וכותרת").

**חייל** 💂 — type: alias for any type (union, tuple, computed). interface: object shape with declaration-merging. Both extend, both implement-able.

**סטודנט** 🎓 — Object shape with extensibility expectation → interface. Union/Tuple/Computed → type. Interface declaration-merging useful for augmenting libs (e.g., Express Request).

**ג'וניור** 👨‍💻 — בצוות שלי החוק: interface ל-DTOs/API shapes (קונבנציה רשמית), type לכל השאר. type Status = 'pending' | 'done' — חובה type. interface User { ... } — חובה interface (אפשר merge).

**פרופ׳** 🎩 — Internally: TS compiler tracks symbols differently. Interface declarations create a symbol that can merge across files. Type aliases create a single immutable symbol. Performance: interface checks are slightly faster on large unions because of structural equality optimization.

---

### unknown ↔ any ↔ never (§27)

**סבתא** 🧓 — any זה "אל תבדוק". unknown זה "תבדוק לפני שתשתמש". never זה "זה לא יקרה".

**ילד כיתה א׳** 👶 — any: שקית עם הכל, אין לי מושג מה. unknown: שקית עם הכל, אבל לפני שאוכל אבדוק מה זה. never: שקית שלעולם לא תהיה — ריקה תמיד.

**חייל** 💂 — any: bypass checker, accepts/exports anything. unknown: top type, requires narrowing. never: bottom type, signals impossibility (throw, infinite, exhaustive).

**סטודנט** 🎓 — any → escape hatch (avoid). unknown → safe alternative for "any value, narrow first". never → exhaustive match assertions, return type for throwers. `as never` to satisfy compiler in unreachable branches.

**ג'וניור** 👨‍💻 — מסקנה אחרי 3 שנים TS: any פעם בשבוע (בעיקר במיגרציה). unknown פעם ביום. never נדיר אבל קריטי באקסקלוסיב unions.

**פרופ׳** 🎩 — any disables checking bidirectionally. unknown is contravariant top type — assignable from anything, assignable to nothing without narrow. never is covariant bottom type — assignable to everything, accepts no values. Distributive conditional types use never to filter union members.

---

### HTTP Status — 2xx/3xx/4xx/5xx (§28)

**סבתא** 🧓 — 2xx זה הצליח. 3xx זה הלך למקום אחר. 4xx זה אתה טעית. 5xx זה אנחנו טעינו.

**ילד כיתה א׳** 👶 — סבתא מבשלת — 200 = "מוכן!". 301 = "עברתי דירה לכאן". 404 = "סבתא? אין כזו!". 500 = "סבתא נשרפה".

**חייל** 💂 — 200/201/204: success variants. 301 permanent / 302 temp / 304 cached. 400 bad input / 401 needs auth / 403 forbidden / 404 not found / 409 conflict / 422 invalid / 429 rate-limit. 500 server / 502 gateway / 503 unavailable / 504 timeout.

**סטודנט** 🎓 — Distinguish 401 (not logged in) from 403 (logged in, denied). Return 201 for resource creation with Location header. Use 422 for semantic validation errors (over 400). 409 for race conditions (e.g., duplicate insert).

**ג'וניור** 👨‍💻 — frontend בלבל פעם 401 עם 403, redirect ל-login גם כשמשתמש מחובר אבל ללא הרשאה. אחרי הbug, האפליקציה הבחינה: 401 → redirect, 403 → "no access" toast.

**פרופ׳** 🎩 — RFC 9110 defines HTTP semantics. 304 Not Modified relies on ETag/If-None-Match — saves bandwidth. 429 carries Retry-After header. 511 Network Authentication Required for captive portals. Browsers cache 301 aggressively (be careful — wrong 301 sticks).

---

### req.params / query / body / headers (§29)

**סבתא** 🧓 — params זה מה שבאוגדן (`/user/5`). query זה מה שאחרי `?`. body זה מה שאריזת המכתב. headers זה הכתובת המעטפה.

**ילד כיתה א׳** 👶 — params: מספר הבית (`/user/5`). query: שאלות שהוסיף הדוור (`?fast=true`). body: המכתב פנימה. headers: עוטפת המכתב (מי שלח, איזה סוג).

**חייל** 💂 — req.params: path variables `/user/:id`. req.query: querystring `?q=foo`. req.body: POST/PUT payload (needs body-parser). req.headers: HTTP headers (auth, content-type).

**סטודנט** 🎓 — params for resource identification. query for filtering/sorting/pagination. body for payload. headers for auth/content-negotiation. Validate each independently — never trust user input.

**ג'וניור** 👨‍💻 — בקוד באג: השתמשו ב-req.body לwrites, ב-req.query לreads. שחקן קיבל gist גם בלי auth. הפתרון: middleware שמוודא שלכל route יש validation schema (Zod/Joi).

**פרופ׳** 🎩 — Express parses based on Content-Type header. JSON body needs `express.json()`. Multipart needs `multer`. Headers are normalized to lowercase. Be aware of header injection (CRLF in user input).

---

### Mongoose: Schema / Model / Document / populate (§30)

**סבתא** 🧓 — Schema זו תבנית. Model זו ערכת הכלים. Document זה הפרי. populate זה לקרב לי גם את החפצים שאליהם רומזים.

**ילד כיתה א׳** 👶 — Schema: דפוס לעוגה. Model: התנור והתבנית. Document: עוגה אחת. populate: גם להביא לי את התוספות שהזכרת.

**חייל** 💂 — Schema: defines fields/types/validators. Model: ORM-class with CRUD. Document: instance. populate: replaces ObjectId references with full referenced documents.

**סטודנט** 🎓 — Define Schema once. Compile to Model with mongoose.model(). Each query returns Document(s). Use populate('field') for joins. Beware: populate is sequential queries by default — N+1 risk.

**ג'וניור** 👨‍💻 — populate על list של 1000 items עם 5 ref fields = 5000 queries. החלפה ל-aggregation pipeline ($lookup) הקטינה ל-1 query, 2x faster.

**פרופ׳** 🎩 — populate uses .find($in) under the hood. lean() returns POJOs (faster, no Mongoose overhead). Schema methods bind to instances; statics to Model. Mongoose virtuals provide computed properties without storing.

---

### CSS Summary (§31)

**סבתא** 🧓 — box model זה שכבות סביב התוכן. display קובע איך התוכן מתפרס. position קובע איפה הוא נחת. units קובעים יחידות מידה. flex/grid הם כלים לסידור.

**ילד כיתה א׳** 👶 — תארו לכם בית: padding זה גינה פנימית, border זה הקיר, margin זה רחוב חיצוני. display: בית פרטי או דירה. position: ביוון או על גבעה. flex: שורת בתים. grid: רובע מסודר.

**חייל** 💂 — Box: content + padding + border + margin. Display determines flow. Position determines coordinate origin. Units relative or absolute. Flex 1D, Grid 2D. Specificity: inline > id > class > tag.

**סטודנט** 🎓 — Use border-box globally. Use flexbox for component layouts, grid for page layouts. Use rem for typography, px for borders/shadows. Avoid !important. Custom properties (var(--x)) for theming.

**ג'וניור** 👨‍💻 — שיעור: !important = bug magnet. החלף את כל ה-!important בdesign system tokens (CSS vars). flex אכלסי 90% מ-layout, grid 8%, float 2% (מסך הופעת text).

**פרופ׳** 🎩 — Cascade phases: importance → specificity → source order. Custom properties cascade dynamically. CSS containment (`contain: layout`) limits browser reflow scope. Modern: container queries, :has(), subgrid, color-mix() — all 2023+ baseline.

---

## 32. useState — כל המופעים והווריאציות (קושי 8)

> **מטרה:** במקום ללמד `useState` כמושג בודד, מאחדים אותו עם 6 הווריאציות שלו: direct set, functional update, lazy initialization, useReducer, useRef (כשלא רוצים rerender), state lifting, אחסון object/array vs primitives.

### טבלת השוואה

| ציר | useState (direct) | useState (functional) | useState (lazy init) | useReducer | useRef (אם state אינו UI) | Class.setState (legacy) |
|---|---|---|---|---|---|---|
| תחביר | `setX(value)` | `setX(prev => prev+1)` | `useState(() => heavy())` | `dispatch({type:'X'})` | `ref.current = x` | `this.setState({x})` |
| מפעיל re-render? | ✅ | ✅ | ✅ (פעם 1 init) | ✅ | **❌** | ✅ |
| Stale closure בטוח? | ❌ סכנה | ✅ תמיד עדכני | ✅ | ✅ (state בdispatch) | ✅ (mutable) | ✅ ב-callback |
| מתי כדאי | state פשוט שלא תלוי בקודם | counter, toggle, accumulator | initial value יקר לחישוב | state מורכב + actions | timestamp/timer/scroll | רק בקוד legacy |
| Batching | אוטומטי (React 18+) | אוטומטי | אוטומטי | אוטומטי | n/a | function (legacy) |
| Type של initial | value | value | function שמחזירה value | (state, action) => state | value | obj |

### 6 דוגמאות-קוד (אחת לכל ציר)

```jsx
// 1. direct set
const [n, setN] = useState(0);
setN(n + 1);  // ⚠️ stale ב-async chain

// 2. functional — תמיד מקבל את הערך הטרי
setN(prev => prev + 1);  // ✅ בטוח לreentrancy

// 3. lazy init — מחושב פעם אחת
const [items, setItems] = useState(() => parseLargeJSON(localStorage.getItem("data")));
// (ללא lazy: parseLargeJSON רץ בכל render!)

// 4. useReducer — לstate מורכב
const [state, dispatch] = useReducer(reducer, { count: 0, items: [] });
dispatch({ type: "ADD", payload: { id: 1 } });

// 5. useRef — לערך שלא משפיע על UI
const renderCount = useRef(0);
renderCount.current++;  // לא גורם ל-re-render

// 6. Class setState (legacy)
this.setState((prev) => ({ count: prev.count + 1 }));  // 90%+ codebases מהגרים מזה
```

### 4 ה-anti-patterns הנפוצים

| בעיה | קוד רע | תיקון |
|---|---|---|
| Stale closure ב-setInterval | `setInterval(()=>setN(n+1), 1000)` עם `[]` deps | `setN(prev => prev+1)` או הוסף `n` ל-deps |
| State תלוי בstate | `setX(x+y); setY(...)` | `useReducer` או `setX(prev => f(prev, y))` |
| Mutating state | `arr.push(x); setArr(arr)` | `setArr([...arr, x])` |
| useState עם init יקר | `useState(parseJSON(big))` | `useState(() => parseJSON(big))` |

### 6 רמות

**סבתא** 🧓 — useState זה זיכרון של הקומפוננטה. setX(value) שם ערך חדש. setX(prev=>...) שם ערך-תלוי-בקודם. lazy זה לחשב פעם 1 בלידה. useReducer זה כשיש הרבה דברים לזכור יחד. useRef זה זיכרון שלא משפיע על המסך.

**ילד כיתה א׳** 👶 — תיק עם פתק. `setX(5)` שם 5 בפתק. `setX(prev=>prev+1)` בודק כמה היה ומוסיף. lazy זה לחשב פעם 1 כשנולד התיק. useReducer זה מקרים שצריך הרבה פתקים יחד עם כללים. useRef זה סוד שלא רוצים לשתף.

**חייל** 💂 — `useState(initial)` → `[value, setter]`. setter triggers re-render. Functional update receives previous state. Lazy initializer (function) runs once on mount. useReducer for complex state machines + actions. useRef for mutable values that shouldn't trigger re-render.

**סטודנט** 🎓 — Choose useState for primitives + simple objects. useReducer for ≥3 related state vars or complex transitions. Functional update mandatory in async/event handlers. Lazy init prevents heavy computation on every render. useRef for DOM access OR persistence-without-re-render.

**ג'וניור** 👨‍💻 — תקן שאני מקפיד עליו: כל setState ב-event handler חייב להיות functional update. הציל מ-3 production bugs בקוורטל הקודם (race conditions). useReducer הופך לחובה כש-2+ state vars תלויים אחד בשני.

**פרופ׳** 🎩 — useState fiber stores `[value, dispatch]`. Setter compares via Object.is — same value skips re-render. Concurrent rendering may abort and replay updates — therefore functional updates are required for correctness. useReducer dispatch is stable (referential identity preserved across renders), useState setter too.

---

## 33. Array Reference — כל המושגים סביב הפניית מערכים (קושי 9)

> **מטרה:** המושג "array reference" הוא ה-1 בסיבת באגים ב-React state ו-mutation בפרון-אנד. במקום ללמד אותו לבד, מאחדים עם כל מה שכבר נוגע בו: object reference, mutation מקומי, יצירת array חדש, shallow vs deep copy, splice vs slice.

### טבלת השוואה — 7 הצירים

| ציר | Array reference | Array value-copy (spread) | Array deep-copy (structuredClone) | Mutation in-place (push/splice) | New array (map/filter/concat) | slice() | splice() |
|---|---|---|---|---|---|---|---|
| מה קורה ל-original | מצביעים לאותו array | original נשמר, copy חדש | original נשמר, copy עצמאי | original משתנה | original נשמר | original נשמר | original משתנה |
| Nested objects | משותפים | משותפים (shallow) | עצמאיים (deep) | משותפים | משותפים | משותפים | משותפים |
| מתאים ל-React state? | ❌ אסור | ✅ ל-flat | ✅ ל-nested | ❌ אסור | ✅ | ✅ | ❌ |
| מהירות | O(1) | O(n) | O(n × depth) | O(1) ל-end, O(n) ל-mid | O(n) | O(n) | O(n) |
| Use-case | passing | clone flat array | clone with nested | אופטימיזציה ב-vanilla | functional update | extract slice | remove/insert |

### דוגמת קוד אחת לכל ציר

```js
const arr = [{ id: 1, items: [10, 20] }];

// 1. Reference — אותו array
const ref = arr;
ref[0].items.push(30);   // ⚠️ arr עכשיו [{id:1, items:[10,20,30]}] — שיתוף!

// 2. Spread shallow copy
const shallow = [...arr];
shallow[0].items.push(40);  // ⚠️ עדיין משפיע על arr! nested אובייקט משותף

// 3. Deep copy
const deep = structuredClone(arr);
deep[0].items.push(50);     // ✅ arr לא מושפע
// (חלופה: JSON.parse(JSON.stringify(arr)) — חוטא לDate/Map)

// 4. Mutation in-place (vanilla מהיר אבל מסוכן ב-React)
arr.push({ id: 2 });

// 5. New array (חוקי ב-React)
const next = arr.concat([{ id: 2 }]);    // או [...arr, {id:2}]
const filtered = arr.filter(x => x.id !== 1);
const mapped = arr.map(x => ({ ...x, doubled: x.id * 2 }));

// 6. slice — לא משנה
const sliced = arr.slice(0, 1);  // [{id:1,...}]

// 7. splice — משנה במקום
arr.splice(0, 1);  // arr עכשיו ריק
```

### 4 הbugים הנפוצים ב-React state

| הבאג | מה רואים | התיקון |
|---|---|---|
| `setItems(items.push(x))` | TypeError (push מחזיר length) | `setItems([...items, x])` |
| `items[0].name = "new"; setItems(items)` | UI לא מתעדכן (ref same) | `setItems(items.map(it=>it.id===0?{...it,name:"new"}:it))` |
| `setItems(items.sort())` | mutation in-place + ref same | `setItems([...items].sort())` |
| Nested array shared | UI שונה אבל באגים מוזרים | `structuredClone(items)` או immer |

### Mnemonic לזכירה

> **R-V-D-M-N-S-S** = Reference / Value-shallow / Deep / Mutation / New / Slice / Splice
>
> - **R**eference משותף
> - **V**alue-shallow מעתיק רק רמה 1
> - **D**eep מעתיק הכל
> - **M**utation שובר את הreference
> - **N**ew array בטוח ל-React
> - **S**lice קורא, לא נוגע
> - **S**plice חותך, נוגע

### 6 רמות

**סבתא** 🧓 — מערכים בJS הם תמיד "מצביעים לאותו ארון". אם נותנים את הרשימה לחבר והוא מוסיף — אצלך גם נוסף. אם רוצים להעתיק — `[...arr]` יוצר ארון חדש (אבל החפצים שבתוכו עדיין משותפים). structuredClone זה העתקה מלאה. push משנה במקום, map/filter יוצרים חדש.

**ילד כיתה א׳** 👶 — דמיין צעצוע — אם נתת לחבר את הצעצוע (`ref`), הוא משחק באותו צעצוע שלך! אם נתת לחבר העתק (`[...arr]`) — לחבר יש צעצוע שלו, אבל אם בתוך הצעצוע יש בובות — שניכם משחקים באותן בובות. structuredClone זה כמו פוטוקופי מלא — גם הבובות חדשות.

**חייל** 💂 — Reference: אותו pointer. Spread: shallow copy — pointer חדש למערך, אבל nested objects משותפים. structuredClone: deep copy עם handling ל-Date/Map/Set. push/splice: mutate in-place — שומר על reference. map/filter/concat: יוצרים array חדש (pointer חדש). slice: קורא non-destructively. splice: עורך במקום.

**סטודנט** 🎓 — Always use new-array methods (map/filter/concat/spread) for React state — never mutate. Shallow copy is enough for flat data. Deep copy needed when nested. Beware: `arr.sort()` mutates! wrap with `[...arr].sort()`. immer library lets you "mutate" with auto-immutable copy underneath.

**ג'וניור** 👨‍💻 — מקרה אמת: state.users[0].address.city = newCity ושcomputed didn't update. סיבה: React shallow-equal על users — אותו array ref. תיקון: `setUsers(users.map(u => u.id===target ? {...u, address: {...u.address, city: newCity}} : u))`. אחרי 5 פעמים בקוורטל החלפנו ל-immer — קוד דרמטית קצר יותר.

**פרופ׳** 🎩 — Arrays in V8 are objects with `[[Class]]: "Array"` and a length-tracker. `[...arr]` invokes Symbol.iterator and collects values. structuredClone uses the structured clone algorithm (HTML spec) — handles cycles, Date, Map, Set, RegExp, but NOT functions/symbols/getters. Mutating arrays may transition between Element Kinds (PACKED→HOLEY) — degrading performance. immer uses Proxy + structural sharing for O(1) writes appearing immutable.

---

## 🔬 ניתוח מושגים בנפרד בתוך כל קלסטר (לכל חבר, לכל 6 רמות)

> פורמט קומפקטי. כל שורה ממוקדת בהבדל הספציפי של החבר הזה משאר חברי הקלסטר.

---

### 🎯 קלסטר #1 — זיכרון, משתנים ומצביעים

**`let`**
- 🧓 סבתא: פתק שמותר לי למחוק ולהחליף, אבל רק בחדר שבו אני נמצאת.
- 👶 ילד: שינוי לערך בתיק שלי — תקין רק בכיתה שלי, לא במסדרון.
- 💂 חייל: block-scoped, hoisted ל-TDZ, מותר reassign, אסור redeclare.
- 🎓 סטודנט: ברירת-מחדל למשתנה שמשתנה. block scope. TDZ עד הצהרה.
- 👨‍💻 ג'וניור: שכפול של `var` שמתקן 90% מבעיות scope. ברירת-מחדל בקוד מודרני.
- 🎩 פרופ׳: LexicalEnvironment, immutable binding flag false, TDZ enforced.

**`var`**
- 🧓 סבתא: פתק ישן שכל הבית רואה — גם ילדים בחצר. לא משתמשים יותר.
- 👶 ילד: פתק שכל הספר רואה, גם אם הוכנס באמצע פרק.
- 💂 חייל: function-scoped, hoisted עם undefined, מותר redeclare.
- 🎓 סטודנט: legacy מ-1995. function scope (לא block!). hoisting אקטיבי.
- 👨‍💻 ג'וניור: אסור בכלל לעבודה. eslint-rule no-var. רק ב-script tags ישנים.
- 🎩 פרופ׳: VariableEnvironment, מתווסף ל-window/global. baseline ES1.

**`const`**
- 🧓 סבתא: כספת — המנעול קבוע, אבל אם בכספת יש קופסה — אפשר לסדר אותה מבפנים.
- 👶 ילד: שלט עם השם שלך מודבק לדלת — השלט קבוע, החדר משתנה.
- 💂 חייל: block-scoped, immutable binding, אבל ה-Heap (אם object) פתוח.
- 🎓 סטודנט: לא מאפשר rebinding. לא נועל את התוכן הheap. ברירת-מחדל לאובייקטים.
- 👨‍💻 ג'וניור: 95% מהמשתנים שלי const. let רק כשבאמת חייב reassign.
- 🎩 פרופ׳: LexicalEnvironment immutable binding, אבל לא Object.freeze על ה-content.

**`By Value`**
- 🧓 סבתא: מתכון שכתבת לחברה — אם היא משנה אצלה, אצלך נשאר.
- 👶 ילד: צילום של ציור — חבר יקרע את הצילום, אבל הציור שלך יישאר.
- 💂 חייל: primitives (number/string/boolean/...) → bytes copy. שני slots עצמאיים.
- 🎓 סטודנט: 7 הסוגים הפרימיטיביים מועתקים byte-for-byte ב-Stack.
- 👨‍💻 ג'וניור: לכן `let a=5; let b=a; b=10;` משאיר את a=5. לא צריך לדאוג ל-mutation.
- 🎩 פרופ׳: SmallInteger (SMI) ב-stack frame slot. לא יוצר Heap allocation.

**`By Reference`**
- 🧓 סבתא: שני מפתחות לאותו ארון — מי שמסדר רואה אצל השני.
- 👶 ילד: שני חברים עם אותה מפת אוצר — מי שזז על המפה, השני רואה.
- 💂 חייל: objects/arrays/functions → pointer copy. שני slots לאותו object ב-Heap.
- 🎓 סטודנט: כל מבנה מורכב הוא reference. = מעתיק רק את הpointer. mutation דרך אחד נראה אצל כולם.
- 👨‍💻 ג'וניור: אם ראית באג שבו `nextItems[0].x = ...` שינה גם את `prevItems[0].x` — זה כי שניהם reference.
- 🎩 פרופ׳: Tagged pointer (low bit = 1) → Heap address. GC ינקה רק כשאין pointer חי.

**`Pointer`**
- 🧓 סבתא: כתובת ב-GPS — זוכרת איפה האוצר חבוי.
- 👶 ילד: חץ שמראה איפה הצעצוע — לא הצעצוע עצמו.
- 💂 חייל: 8 bytes ב-Stack שמצביעים לכתובת ב-Heap. סמוי ב-JS, מפורש ב-C++.
- 🎓 סטודנט: ב-JS אין דרך לקרוא לpointer ישירות, אבל === של objects בודק אותו.
- 👨‍💻 ג'וניור: כשאני רואה `===` בין שני אובייקטים — אני מבין שזו השוואת pointer, לא תוכן.
- 🎩 פרופ׳: V8 משתמש ב-Pointer Compression (32-bit על מערכות 64-bit). Tagged Values: SMI vs HeapObject.

---

### Object / Array / Function (§5)

**`Object`**
- 🧓 סבתא: ארון עם תאים מוסמנים בשמות — `name`, `age`.
- 👶 ילד: קופסה עם תאים — כל תא יש לו שם.
- 💂 חייל: associative collection. keys = string/Symbol. heap-allocated.
- 🎓 סטודנט: גישה דרך `obj.key` או `obj["key"]`. JSON-friendly. prototype chain.
- 👨‍💻 ג'וניור: לconfigurations קבועות. אם הshape משתנה הרבה — Map עדיף.
- 🎩 פרופ׳: V8 Hidden Class. property access עובר Inline Cache.

**`Array`**
- 🧓 סבתא: שורת אנשים בקופה — מספר 0, 1, 2...
- 👶 ילד: רכבת עם קרונות ממוספרים.
- 💂 חייל: indexed object עם length-tracker. Array.isArray מבחין.
- 🎓 סטודנט: object מיוחד עם numeric keys + length. תורם מ-Array.prototype.
- 👨‍💻 ג'וניור: גם Array הוא object — אפשר להוסיף `arr.foo`, אבל JSON.stringify ידלג.
- 🎩 פרופ׳: Element Kinds (PACKED_SMI/HOLEY_*) — sparse arrays נופלים ל-dictionary mode.

**`Function`**
- 🧓 סבתא: מתכון שמייצר משהו כשמפעילים אותו.
- 👶 ילד: מכונה — מקבלת חומר, מוציאה משהו.
- 💂 חייל: callable object עם `[[Call]]` slot. typeof === "function".
- 🎓 סטודנט: גם object — יש .name, .length, .prototype. callable + first-class.
- 👨‍💻 ג'וניור: לכן `f.cache = new Map()` חוקי. memoization-by-attached-prop.
- 🎩 פרופ׳: V8 Function Code Object + Closure Slots + ScriptOrigin metadata.

---

### Arrow ↔ Regular Function (§6)

**`Arrow Function`**
- 🧓 סבתא: עובד-זוטר שמסתכל תמיד על המנהל הקבוע שלו (איפה שנולד).
- 👶 ילד: מורה שמתעקש לזכור את הכיתה שלו, גם אם קוראים לו לכיתה אחרת.
- 💂 חייל: lexical this, אין arguments, אסור new, אין prototype.
- 🎓 סטודנט: this מהcontext שבו הוגדרה. קצרה: implicit return במשפט יחיד.
- 👨‍💻 ג'וניור: ברירת-מחדל ל-callbacks. מסוכן כ-method של object (this = window).
- 🎩 פרופ׳: אין [[Construct]] internal slot. NewArrowEnvironment במקום NewFunctionEnvironment.

**`Regular Function`**
- 🧓 סבתא: עובד שמסתכל על מי שקרא לו.
- 👶 ילד: מורה שמשנה כיתה לפי איפה שלוקחים אותו.
- 💂 חייל: dynamic this, יש arguments, אפשר new, יש prototype.
- 🎓 סטודנט: this נקבע בקריאה (call-site). יכולה להיות constructor.
- 👨‍💻 ג'וניור: למתודות של object/class — חובה. ל-callbacks הימנע (this יקרוס).
- 🎩 פרופ׳: יש [[FunctionKind=Normal]], [[ConstructorKind]], own arguments object.

---

### Equality — `==` / `===` / `Object.is` (§17)

**`==`**
- 🧓 סבתא: שואלת "אולי דומים?" — וממירה טיפוסים בלי לשאול.
- 👶 ילד: עצלן — חושב ש-`5` ו-`"5"` שווים.
- 💂 חייל: Loose equality. ToNumber/ToString conversion. 14 כללים.
- 🎓 סטודנט: השווה רק לnull/undefined יחד (`x == null`). אחרת `===`.
- 👨‍💻 ג'וניור: eqeqeq rule הופך לאזהרה אצלי, חוץ מ-`!= null` במכוון.
- 🎩 פרופ׳: §7.2.13 Abstract Equality. type-coercion algorithm.

**`===`**
- 🧓 סבתא: שואלת "באמת זהה?" — בלי המרה. NaN לא שווה לעצמו.
- 👶 ילד: חכם — `5` שונה מ-`"5"`.
- 💂 חייל: Strict equality. אותו type + אותו value. NaN === NaN false.
- 🎓 סטודנט: ברירת-מחדל. השווה primitives by value, objects by reference.
- 👨‍💻 ג'וניור: 99% מהזמן זה מה שאני משתמש. NaN-edge-case אני בודק עם Number.isNaN.
- 🎩 פרופ׳: §7.2.14 Strict Equality. SameValueNonNumber.

**`Object.is`**
- 🧓 סבתא: הכי קפדנית — NaN שווה ל-NaN, -0 שונה מ-+0.
- 👶 ילד: כמו `===` רק שמודרני יותר עם NaN.
- 💂 חייל: SameValue. Distinguishes +0 from -0. Treats NaN as equal.
- 🎓 סטודנט: לcache keys, comparator במצבים שצריך NaN-safe.
- 👨‍💻 ג'וניור: React משתמש ב-Object.is ל-shallow comparison של state.
- 🎩 פרופ׳: §7.2.10 SameValue. ב-V8 — built-in fast path.

---

### Null / Undefined / NaN (§18)

**`undefined`**
- 🧓 סבתא: משתנה לא הוכן עדיין — המערכת אומרת "אין".
- 👶 ילד: קופסה ריקה שעדיין לא הכנת בה כלום.
- 💂 חייל: implicit absence. uninitialized var, missing arg, void return.
- 🎓 סטודנט: typeof === "undefined". פולט אוטומטית כשאין ערך.
- 👨‍💻 ג'וניור: אם אני רואה undefined בייצור — סימן שאני שכחתי לבדוק `?.` או `??`.
- 🎩 פרופ׳: primitive value. global property `undefined` (read-only מ-ES5).

**`null`**
- 🧓 סבתא: המתכנת אומר במפורש "אין כאן ערך".
- 👶 ילד: פתק עם המילה "ריק" — בכוונה ריק.
- 💂 חייל: explicit absence. typeof === "object" (באג היסטורי).
- 🎓 סטודנט: signaling intentional absence. JSON.stringify שומר אותו.
- 👨‍💻 ג'וניור: אני משתמש ב-null כשערך חסר *במכוון* (DB column NULL). undefined כשלא הוגדר.
- 🎩 פרופ׳: primitive. internal type tag is "object" — fixed in TC39 lore but kept for compat.

**`NaN`**
- 🧓 סבתא: המתמטיקה השתבשה — `0/0`, `"א"*2`.
- 👶 ילד: כשניסית להכפיל אבטיח ב-2.
- 💂 חייל: typeof === "number". NaN !== NaN. Number.isNaN לבדיקה.
- 🎓 סטודנט: תוצאה לא חוקית. global isNaN ממיר לפני בדיקה — אסור להשתמש.
- 👨‍💻 ג'וניור: אם קלט מהuser או API → המר עם Number(), בדוק עם Number.isNaN.
- 🎩 פרופ׳: IEEE 754 — multiple bit patterns, JS exposes canonical. unique self-inequality.

---

### Promise Combinators — all/race/allSettled/any (§9)

**`Promise.all`**
- 🧓 סבתא: מחכה שכולם יסיימו, אם אחד נופל — מתעצבנת.
- 👶 ילד: כל החברים חייבים לעבור — אם אחד נופל, כולם נופלים.
- 💂 חייל: array of results, fail-fast on first reject.
- 🎓 סטודנט: לקריאות מקבילות חובה. נכשל ברגע שאחד נדחה.
- 👨‍💻 ג'וניור: לdashboard עם 8 widgets — לא, כי widget אחד שכשל = הכל ריק.
- 🎩 פרופ׳: PerformPromiseAll. iterates, increments RemainingElements, resolves on 0.

**`Promise.race`**
- 🧓 סבתא: הראשון שעונה — מנצח. גם אם הוא נופל.
- 👶 ילד: התחרות הראשונה — מי שראשון לקו (גם אם נופל).
- 💂 חייל: settles on first settle (resolve OR reject).
- 🎓 סטודנט: ל-timeout-against-fetch. ל-fastest server.
- 👨‍💻 ג'וניור: pattern: `Promise.race([fetch(), sleep(5000).then(()=>throw "timeout")])`.
- 🎩 פרופ׳: race uses NewPromiseCapability. first to fulfill/reject wins.

**`Promise.allSettled`**
- 🧓 סבתא: ממתין לכולם — לא משנה אם נכשלו, סופר את הכל.
- 👶 ילד: כולם רצים עד הסוף, גם אם נפלו.
- 💂 חייל: never rejects. returns `[{status, value/reason}]`.
- 🎓 סטודנט: לdashboards/reports — רוצים להציג גם את הכישלונות.
- 👨‍💻 ג'וניור: זה החליף את כל ה-Promise.all שלי ב-3 פרויקטים אחרונים.
- 🎩 פרופ׳: ES2020. internally each promise resolves to status object.

**`Promise.any`**
- 🧓 סבתא: מספיק שאחד יצליח — שאר נכשלים זה בסדר.
- 👶 ילד: רק חבר אחד צריך להצליח.
- 💂 חייל: first fulfilled wins. AggregateError if all reject.
- 🎓 סטודנט: לfallback servers, multi-source caching.
- 👨‍💻 ג'וניור: pattern: try CDN1 → CDN2 → CDN3, מספיק שאחד יחזיר.
- 🎩 פרופ׳: ES2021. AggregateError carries `errors` array.

---

### Loops (§30b)

**`for`**
- 🧓 סבתא: סופרת מ-1 ל-10 — יודעת בדיוק כמה פעמים.
- 👶 ילד: 5 מטאפלים בארטיק — סופר אחד-אחד.
- 💂 חייל: numeric counter. break/continue. יכול לדלג בצעדים.
- 🎓 סטודנט: לhot path / step-mismatched / dual indexing.
- 👨‍💻 ג'וניור: 95% מהפעמים שאני משתמש בfor זה כי צריך index גם כן.
- 🎩 פרופ׳: V8 fast path על dense arrays. אופטימיזציה דרך bound checks.

**`while`**
- 🧓 סבתא: עד שהמרק רותח — לא יודעת כמה זמן.
- 👶 ילד: עד שתצא הסוכריה — לא יודע מתי.
- 💂 חייל: condition-only. תנאי לא-ידוע-מראש.
- 🎓 סטודנט: לpolling, retries, queue-draining.
- 👨‍💻 ג'וניור: זהירות מinfinite loops. תמיד תוודא break-condition.
- 🎩 פרופ׳: בלי תחזיות-iteration-count, JIT לא יכול לoptimize אגרסיבית.

**`for...of`**
- 🧓 סבתא: לכל ילד בכיתה — לפי הסדר.
- 👶 ילד: לכל גלידה בארגז — לפי איך שמסדרת.
- 💂 חייל: iterable protocol. Array/Set/Map/String/NodeList. תומך break/await.
- 🎓 סטודנט: ברירת-מחדל ל-arrays/iterables. תומך `for await...of` ל-async.
- 👨‍💻 ג'וניור: החליף את 80% מה-`forEach` שלי, כי break ו-await עובדים.
- 🎩 פרופ׳: invokes Symbol.iterator. desugars to manual next() loop.

**`for...in`**
- 🧓 סבתא: לכל מפתח בארון — אבל גם אלה שירשתי מסבא.
- 👶 ילד: על כל המגירות + מגירות שירשת מהורים.
- 💂 חייל: enumerable string-keyed properties INCLUDING inherited — מסוכן.
- 🎓 סטודנט: רק ל-objects (לא arrays). filter עם hasOwnProperty.
- 👨‍💻 ג'וניור: כמעט אף פעם. החלפתי ל-`Object.keys/entries`.
- 🎩 פרופ׳: walks prototype chain. polyfills מ-libs ישנות יכולים להזליג.

**`forEach`**
- 🧓 סבתא: לכל ילד בכיתה — בלי לעצור באמצע.
- 👶 ילד: כל ילד מקבל סוכריה. אי אפשר להפסיק.
- 💂 חייל: callback per element. אין break (חייב throw).
- 🎓 סטודנט: לקוד פונקציונלי שלא צריך לעצור. async-לא-תומך מובנה.
- 👨‍💻 ג'וניור: pattern שגיאתי: `arr.forEach(async ...)` שלא ממתין. החלפתי ל-`for...of` await.
- 🎩 פרופ׳: Array.prototype.forEach. invokes callback synchronously per element. אין fast-path אופטימלי כמו for.

---

### useState Cluster — כל הוריאציות (§32)

**`useState (direct set)`**
- 🧓 סבתא: שם ערך חדש בפתק.
- 👶 ילד: `setX(5)` — שינית ל-5.
- 💂 חייל: setter receives new value directly.
- 🎓 סטודנט: לprimitives ובמקרים שלא תלוי בערך הקודם.
- 👨‍💻 ג'וניור: סכנה של stale closure ב-async chains.
- 🎩 פרופ׳: dispatch action בfiber. Object.is מסנן re-render אם זהה.

**`useState (functional update)`**
- 🧓 סבתא: בודקת מה היה ומשנה לפי זה.
- 👶 ילד: `setX(prev => prev + 1)` — תמיד מקבל את הערך הטרי.
- 💂 חייל: setter receives function (prev) => next.
- 🎓 סטודנט: חובה ב-async/event handlers. בטוח לreentrancy.
- 👨‍💻 ג'וניור: תמיד functional update בsetInterval/timeout/promise.then.
- 🎩 פרופ׳: queue of update functions. resolved during reconciliation.

**`useState (lazy init)`**
- 🧓 סבתא: מחשבת פעם אחת — לא בכל רינדור.
- 👶 ילד: בנייתי מגדל פעם אחת בלידה, לא כל בוקר.
- 💂 חייל: pass function to useState — runs once on mount.
- 🎓 סטודנט: לinitializers יקרים (parseJSON, localStorage scan).
- 👨‍💻 ג'וניור: שיפור performance ב-modal שעלה 200ms ל-render בלעדיו.
- 🎩 פרופ׳: useState invokes the initializer only when memoizedState is null.

**`useReducer`**
- 🧓 סבתא: מנהלת הרבה דברים יחד עם כללים.
- 👶 ילד: כסף-נשי-בנקנוט — כל פעולה מוגדרת מראש.
- 💂 חייל: `(state, action) => state`. dispatch לסכמה ידועה.
- 🎓 סטודנט: לstate מורכב, ≥3 vars תלויים, או state machine.
- 👨‍💻 ג'וניור: הופך לחובה כש-2+ state vars משתנים יחד מתוך אותו event.
- 🎩 פרופ׳: dispatch identity stable across renders (משופר vs setter).

**`useRef`**
- 🧓 סבתא: זיכרון פנימי שלא משפיע על המסך.
- 👶 ילד: יומן סודי — לא מציגה לכיתה.
- 💂 חייל: mutable object `{current}`. setting it לא triggers re-render.
- 🎓 סטודנט: ל-DOM access OR persistence-without-rerender (timer ID, scroll position).
- 👨‍💻 ג'וניור: שגיאה: לא לקרוא ref.current ב-render — תקין רק ב-effect/handler.
- 🎩 פרופ׳: stable identity object. useImperativeHandle לחשוף מתודות לparent.

**`Class.setState`**
- 🧓 סבתא: דרך ישנה לעדכן זיכרון של קומפוננטה.
- 👶 ילד: מהדור הקודם של React.
- 💂 חייל: this.setState({key:val}) או ((prev) => ({...})).
- 🎓 סטודנט: legacy. shallow merge default. functional עם prev.
- 👨‍💻 ג'וניור: מיגרציות codebase ל-hooks — אני ממיר 1-1 ל-useState/useReducer.
- 🎩 פרופ׳: enqueueSetState pushes to update queue. shallow-merge מובנה (vs replace ב-hooks).

---

### Array Reference Cluster (§33)

**`array reference`**
- 🧓 סבתא: 2 שמות לאותו ארון — שינוי באחד נראה אצל השני.
- 👶 ילד: 2 שמות לאותה קופסה — שינוי בקופסה אחד = השני רואה.
- 💂 חייל: identical pointer. `arr1 === arr2` true.
- 🎓 סטודנט: כל הקצאה (`b = a`) משכפלת רק את הpointer.
- 👨‍💻 ג'וניור: זה הSource of 90% מהbugים ב-React state.
- 🎩 פרופ׳: pointer to single Heap object. equality via pointer comparison.

**`shallow copy (spread)`**
- 🧓 סבתא: קופסה חדשה — אבל החפצים שבתוכה הם אלה הישנים.
- 👶 ילד: קופסה ריקה ושמת בה את אותם צעצועים.
- 💂 חייל: `[...arr]` או `Object.assign({}, obj)`. רמה 1 חדשה, nested משותפים.
- 🎓 סטודנט: מספיק לflat data. לא למאגר עם objects פנימיים.
- 👨‍💻 ג'וניור: pattern: `setItems([...items, newItem])` ב-React.
- 🎩 פרופ׳: invokes Symbol.iterator + collects. CopyDataProperties for objects.

**`structuredClone (deep)`**
- 🧓 סבתא: צילום מלא של הכל — כולל קופסה וכל מה שבתוכה.
- 👶 ילד: דה-תבנית מקסום — כל פנים-לוקח חדש.
- 💂 חייל: deep clone with cycle detection. supports Date/Map/Set/RegExp.
- 🎓 סטודנט: built-in (browsers + Node 17+). ל-state עם nested.
- 👨‍💻 ג'וניור: החליף אצלי את `JSON.parse(JSON.stringify())` — שומר Date.
- 🎩 פרופ׳: HTML structured clone algorithm. NOT functions/symbols/getters.

**`mutation in-place (push/splice)`**
- 🧓 סבתא: שינוי בארון הקיים — אם יש מי שרואה, גם הוא רואה את השינוי.
- 👶 ילד: שמת עוד צעצוע ב-קופסה הישנה — חבר רואה אותו צעצוע.
- 💂 חייל: changes the array, keeps the pointer. fast O(1) end / O(n) middle.
- 🎓 סטודנט: vanilla מהיר אבל אסור ב-React state.
- 👨‍💻 ג'וניור: רק כאשר אני בטוח שאני מחזיק את היחיד שמצביע על המערך.
- 🎩 פרופ׳: in-place mutate may trigger Element Kind transition (PACKED → HOLEY).

**`new array (map/filter/concat)`**
- 🧓 סבתא: יוצרת קופסה חדשה לחלוטין מתוך הישנה — בלי לפגוע בישנה.
- 👶 ילד: בנית קופסה חדשה — הישנה נשארת.
- 💂 חייל: returns fresh array. functional, immutable-friendly.
- 🎓 סטודנט: ברירת-מחדל ב-React. מאפשר shallow comparison.
- 👨‍💻 ג'וניור: `setItems(items.map(...))` תמיד ייצור re-render.
- 🎩 פרופ׳: allocates new heap object. composable with .reduce / chains.

**`slice()`**
- 🧓 סבתא: מעתיקה חתיכה מהארון — בלי לזעזע אותו.
- 👶 ילד: בוחרת 3 צעצועים — הישנים נשארים.
- 💂 חייל: returns shallow copy of part. doesn't mutate.
- 🎓 סטודנט: arr.slice(start, end) — non-destructive.
- 👨‍💻 ג'וניור: pattern: `[...items].sort()` או `items.slice().sort()` להימנע מ-mutation.
- 🎩 פרופ׳: Array.prototype.slice. internally uses [[Get]] + new array.

**`splice()`**
- 🧓 סבתא: חותכת מהארון — הוא משתנה!
- 👶 ילד: הוצאת 2 צעצועים — נשארים פחות.
- 💂 חייל: mutates! removes/inserts at index. returns removed elements.
- 🎓 סטודנט: arr.splice(start, deleteCount, ...items). אסור ב-React state.
- 👨‍💻 ג'וניור: דמיון השמות slice/splice = bug magnet. אני קורא splice ב-rubber-duck.
- 🎩 פרופ׳: in-place mutation, may shift Element Kind. equivalent to manual rewrite.

---

## 📦 בלוקי קוד ל-6 רמות (PHASE A)

> **מטרה:** לכל קלסטר, בלוק קוד מתאים לרמת הלומד — מסבתא שצריכה להבין מהו ההבדל הקריטי, ועד פרופ׳ ש-V8 internals.

---

### 🎯 קלסטר #1 — let / var / const / By Value / By Reference / Pointer

```js
// 🧓 סבתא — פתק נפרד vs מצביע משותף
let myList = ["חלב"];        // הפתק שלי
let yourList = myList;        // אותו פתק (מצביע!)
yourList.push("ביצים");
console.log(myList);          // ["חלב", "ביצים"]   ← גם אצלי!
```
```js
// 👶 ילד כיתה א׳ — const שומר על המנעול
const tools = ["פטיש"];
tools.push("מברג");           // ✓ מותר — שינוי הקופסה
// tools = ["...", ...];      // ✗ אסור — החלפת המנעול
```
```js
// 💂 חייל — var דולף מ-block
function f() {
  if (true) { var x = 5; }
  return x;                   // 5 ← var ראה את ה-if כשקוף
}
function g() {
  if (true) { let y = 5; }
  return y;                   // ReferenceError ← let block-scoped
}
```
```js
// 🎓 סטודנט — by-value vs by-reference
let a = 5; let b = a; b = 10;          // a=5  (bytes copied)
let o = {n:5}; let p = o; p.n = 10;    // o.n=10 (pointer shared)
```
```js
// 👨‍💻 ג׳וניור — תיקון state mutation
// ✗ באג בייצור:
state.items[0].name = "new";
setState(state);              // React לא מזהה — אותו pointer

// ✓ תיקון:
setState({...state, items: state.items.map((it,i) =>
  i === 0 ? {...it, name: "new"} : it
)});
```
```js
// 🎩 פרופ׳ — V8 SMI vs HeapObject
let smi = 5;                  // Stack: [tag=0|value=10] (SMI tagged)
let obj = {};                 // Stack: [tag=1|ptr=0xABC] → Heap{HiddenClass→...}
// === על obj בודק את ה-pointer (32-bit compressed b-V8)
```

---

### Object / Array / Function (§5)

```js
// 🧓 סבתא
const ארון  = { שם: "טל", גיל: 30 };           // תאים-עם-שמות
const שורה  = ["טל", "יעל", "דני"];           // ממוספרים
const מתכון = function() { return "עוגה"; };  // מכונה
```
```js
// 👶 ילד
typeof {};       // "object"
typeof [];       // "object" (גם זה!)
typeof () => {}; // "function"
```
```js
// 💂 חייל
Array.isArray([1,2]);      // true ✅ הדרך האמינה
Array.isArray({0:1, length:1}); // false (זה object שמתחזה)
typeof function(){};       // "function" ← היחיד שלא "object"
```
```js
// 🎓 סטודנט
const arr = [1,2,3];
arr.foo = "פנימי";         // legal — array IS object
JSON.stringify(arr);       // "[1,2,3]" ← foo לא נכלל
Object.keys(arr);          // ["0","1","2","foo"] ← רואים את foo
```
```js
// 👨‍💻 ג׳וניור — function as object
const memoize = (fn) => {
  fn.cache = new Map();    // function הוא object — אפשר לתת לו props
  return (x) => fn.cache.has(x) ? fn.cache.get(x) : fn.cache.set(x, fn(x)).get(x);
};
```
```js
// 🎩 פרופ׳ — V8 Element Kinds
const dense = [1,2,3];      // PACKED_SMI_ELEMENTS (fast)
dense[100] = 4;             // → HOLEY_SMI_ELEMENTS (slower, dictionary mode)
```

---

### Arrow ↔ Regular Function (§6)

```js
// 🧓 סבתא — arrow זוכר את הבית שלו
const me = { name: "Tal", greet: () => `Hi ${this.name}` };
me.greet();                 // "Hi undefined" ← arrow לא רואה me
```
```js
// 👶 ילד — regular this תלוי בקריאה
const me = { name: "Tal", greet() { return `Hi ${this.name}`; } };
me.greet();                 // "Hi Tal" ✅
```
```js
// 💂 חייל
function reg() { return arguments.length; }
const arr = (...args) => args.length;
reg(1,2,3);                 // 3 ← regular has arguments
arr(1,2,3);                 // 3 ← arrow uses rest
```
```js
// 🎓 סטודנט
const Cat = (n) => ({ name: n });    // ❌ arrow אסור כ-constructor
new Cat("Tom");                       // TypeError: Cat is not a constructor
function Dog(n) { this.name = n; }
new Dog("Rex");                       // ✅ Dog { name: "Rex" }
```
```js
// 👨‍💻 ג׳וניור — class field as arrow
class Btn extends Component {
  // arrow כ-class field — this תמיד מקושר נכון:
  handleClick = () => this.setState({clicked: true});
  render() { return <button onClick={this.handleClick} />; }
}
```
```js
// 🎩 פרופ׳ — bytecode emits differently
// regular: %CreateFunction → has [[Construct]] slot
// arrow:   %CreateClosure  → no [[Construct]], lexical this slot
```

---

### Equality — `==` / `===` / `Object.is` (§17)

```js
// 🧓 סבתא — == עיוורת, === קפדנית
0 == "0";        // true (== ממיר לפני)
0 === "0";       // false (=== לא ממיר)
```
```js
// 👶 ילד
"" == false;     // true   ⚠️ מבלבל
[] == false;     // true   ⚠️ עוד יותר מבלבל
[] === false;    // false  ✅ ברור
```
```js
// 💂 חייל — null/undefined exception
null == undefined;   // true  (== חריג מועיל)
null === undefined;  // false (=== מבחין)
```
```js
// 🎓 סטודנט — NaN edge
NaN === NaN;             // false ⚠️
Object.is(NaN, NaN);     // true  ✅
Number.isNaN(NaN);       // true  ✅
```
```js
// 👨‍💻 ג׳וניור — bug שלי תפס בייצור
if (id == userId) {...}  // id מ-DB number, userId מ-URL string → עובד בטעות!
if (id === Number(userId)) {...}  // ✅ explicit
```
```js
// 🎩 פרופ׳ — three algorithms
// SameValueNonNumber (===): ===
// SameValue (Object.is):    NaN-equal, +0/-0 distinct
// SameValueZero (Map/Set):  NaN-equal, +0/-0 equal
```

---

### Null / Undefined / NaN (§18)

```js
// 🧓 סבתא
let a;              // undefined ← לא הוגדר
let b = null;       // null ← הוגדר במפורש כ-"אין"
let c = "x" * 2;    // NaN ← מתמטיקה לא חוקית
```
```js
// 👶 ילד — typeof משעשע
typeof undefined;   // "undefined"
typeof null;        // "object" ⚠️ באג היסטורי!
typeof NaN;         // "number" ⚠️ NaN זה מספר!
```
```js
// 💂 חייל — ?? vs ||
0 || "default";     // "default" ⚠️ 0 הוא falsy
0 ?? "default";     // 0 ✅ ?? בודק רק null/undefined
```
```js
// 🎓 סטודנט
Number.isNaN(NaN);  // true ✅
isNaN("hello");     // true ⚠️ ממיר לNumber → NaN, אז true
Number.isNaN("hello"); // false ✅ קפדן יותר
```
```js
// 👨‍💻 ג׳וניור
const value = data.user?.name ?? "Anonymous";  // optional chain + nullish
// תופס null AND undefined, לא תופס 0/"" שאולי משמעותיים
```
```js
// 🎩 פרופ׳
NaN !== NaN;        // true — היחיד שלא שווה לעצמו
1/0;                // Infinity
0/0;                // NaN
typeof null;        // "object" — kept for compat (Brendan Eich, 1995)
```

---

### Promise Combinators (§9)

```js
// 🧓 סבתא — all = הכל או כלום
await Promise.all([fetch("/a"), fetch("/b")]);
// אם /a נכשל → גם /b נזרק
```
```js
// 👶 ילד — race = הראשון מנצח
await Promise.race([fetch("/fast"), fetch("/slow")]);
// תוצאת fast חוזרת, slow נשכח
```
```js
// 💂 חייל — allSettled לא נופל
const r = await Promise.allSettled([fetch("/ok"), fetch("/fail")]);
// r = [{status:"fulfilled",value:...}, {status:"rejected",reason:...}]
```
```js
// 🎓 סטודנט — any = מספיק 1 success
await Promise.any([fetch("/cdn1"), fetch("/cdn2"), fetch("/cdn3")]);
// הראשון שמצליח. אם כולם נופלים → AggregateError
```
```js
// 👨‍💻 ג׳וניור — timeout pattern
const withTimeout = (p, ms) => Promise.race([
  p,
  new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))
]);
await withTimeout(fetch("/slow"), 5000);
```
```js
// 🎩 פרופ׳ — internal state machine
// PerformPromiseAll/Race tracks RemainingElements counter
// allSettled wraps each in {status, value/reason} per spec
```

---

### Callback ↔ Promise.then ↔ async/await (§10)

```js
// 🧓 סבתא — קולבק ישן
fs.readFile("a.txt", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});
```
```js
// 👶 ילד — Promise.then
fs.promises.readFile("a.txt")
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
```js
// 💂 חייל — async/await
async function read() {
  try {
    const data = await fs.promises.readFile("a.txt");
    console.log(data);
  } catch (err) { console.error(err); }
}
```
```js
// 🎓 סטודנט — סדרתי vs מקבילי
// סדרתי (slow):
for (const url of urls) await fetch(url);
// מקבילי (fast):
await Promise.all(urls.map(u => fetch(u)));
```
```js
// 👨‍💻 ג׳וניור — forEach trap
arr.forEach(async (x) => await save(x));   // ❌ לא ממתין
for (const x of arr) await save(x);        // ✅ סדרתי
await Promise.all(arr.map(save));          // ✅ מקבילי
```
```js
// 🎩 פרופ׳ — top-level await (ES2022 modules)
// my-module.mjs:
const data = await fetch("/api").then(r => r.json());
export default data;  // module loading עוצר עד resolve
```

---

### useEffect Dependency Array (§11)

```js
// 🧓 סבתא
useEffect(() => { ... });        // כל רינדור (סכנה!)
useEffect(() => { ... }, []);    // פעם אחת בלידה
useEffect(() => { ... }, [x]);   // כש-x משתנה
```
```js
// 👶 ילד — stale closure
function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setInterval(() => setN(n + 1), 1000);  // ❌ n קפוא ב-0
  }, []);
}
```
```js
// 💂 חייל — תיקון functional
useEffect(() => {
  const id = setInterval(() => setN(prev => prev + 1), 1000);
  return () => clearInterval(id);          // ✅ cleanup חובה
}, []);
```
```js
// 🎓 סטודנט — exhaustive-deps
useEffect(() => {
  doSomething(x, y);
}, [x]);  // ❌ ESLint warning: missing y
useEffect(() => {
  doSomething(x, y);
}, [x, y]);  // ✅
```
```js
// 👨‍💻 ג׳וניור — object reference trap
const config = { url: "/api" };  // ❌ נוצר חדש בכל render
useEffect(() => fetch(config.url), [config]);  // יורה כל render!
// תיקון: useMemo או הוצא את config חוץ
```
```js
// 🎩 פרופ׳ — fiber memoizedState
// Each useEffect entry has [deps, cleanup, callback]
// Object.is per dep — triggers re-run if any changes
// Cleanup runs before next effect (and on unmount)
```

---

### useMemo / useCallback / React.memo (§12)

```js
// 🧓 סבתא
useMemo(() => big(), [x]);     // שומר ערך
useCallback(() => fn(), [x]);  // שומר פונקציה
React.memo(Comp);               // שומר רינדור
```
```js
// 👶 ילד
const total = useMemo(() => items.reduce((s,i)=>s+i.price, 0), [items]);
// total לא מחושב מחדש אם items לא השתנה
```
```js
// 💂 חייל
const handleClick = useCallback(() => doX(id), [id]);
return <Child onClick={handleClick} />;  // handleClick יציב
```
```js
// 🎓 סטודנט
const Child = React.memo(({ user }) => <p>{user.name}</p>);
// Child לא ירנדר אם user (shallow) לא השתנה
```
```js
// 👨‍💻 ג׳וניור — שלושתם ביחד
const Memo = React.memo(({ onClick, items }) => ...);
const Parent = () => {
  const cb = useCallback(() => save(), []);                 // יציב
  const sorted = useMemo(() => items.sort(), [items]);      // יציב
  return <Memo onClick={cb} items={sorted} />;              // לא ירנדר אם props לא שינו
};
```
```js
// 🎩 פרופ׳ — React DevTools Profiler
// shallow-compare cost: ~0.01ms per prop
// over-memo can be NEGATIVE — measure first!
```

---

### Set / Map / Object (§13)

```js
// 🧓 סבתא
const obj = { a: 1, b: 2 };           // תאים-עם-שמות
const map = new Map([["a", 1]]);       // הכל יכול להיות key
const set = new Set([1, 2, 2, 3]);     // {1,2,3} ← בלי כפילויות
```
```js
// 👶 ילד
set.has(2);          // true (O(1))
map.get("a");        // 1   (O(1))
"a" in obj;          // true (O(1)-ish)
```
```js
// 💂 חייל — keys מכל סוג
const cache = new Map();
const fn = () => {};
cache.set(fn, "callback");           // ✅ Map יכולה
const o = {};
o[fn] = "x";                          // ⚠️ key מומר ל-string
```
```js
// 🎓 סטודנט — uniqueness
const unique = [...new Set([1,1,2,2,3])];   // [1,2,3]
const dedupedObjs = [...new Map(arr.map(i => [i.id, i])).values()];
```
```js
// 👨‍💻 ג׳וניור — performance
// Object עם הרבה add/delete → V8 transitions to dictionary mode (slow)
// Map → optimized hash table (fast)
const cache = new Map();   // ב-cache עם churn — Map פי 5+ מהיר
```
```js
// 🎩 פרופ׳ — WeakMap
const meta = new WeakMap();  // keys = objects, GC-able
meta.set(domNode, { lastRender: Date.now() });
// כשdomNode נעלם — meta entry GC'd אוטומטית
```

---

### Spread / Rest (§14)

```js
// 🧓 סבתא — אותו תחביר, תפקידים הפוכים
const more = [...arr, 4];           // SPREAD: פותח
function f(...items) { ... }       // REST: אוסף
```
```js
// 👶 ילד
Math.max(...[3, 1, 5]);             // SPREAD ל-args → 5
function sum(...nums) { ... }       // REST → nums = [1,2,3]
```
```js
// 💂 חייל — object
const merged = { ...a, ...b };               // SPREAD merge
const { name, ...rest } = user;             // REST נשאר
```
```js
// 🎓 סטודנט — shallow trap
const copy = [...arr];               // ✅ array חדש
copy[0].nested = "x";                // ⚠️ nested משותף!
const deep = structuredClone(arr);   // ✅ deep
```
```js
// 👨‍💻 ג׳וניור — React state
// ✗ mutation:
state.list.push(item);
setState(state);

// ✓ spread:
setState({ ...state, list: [...state.list, item] });
```
```js
// 🎩 פרופ׳
// Spread invokes Symbol.iterator (arrays) / OwnPropertyKeys (objects)
// Object spread = CopyDataProperties — only own enumerable, ignores prototype
```

---

### Function Definition Kinds (§15)

```js
// 🧓 סבתא
function decl() {}            // Declaration — מוכן מראש
const expr = function() {};   // Expression — מוכן רק אחרי שורה זו
const arrow = () => {};       // Arrow — קצר, lexical this
(function() { ... })();        // IIFE — פעם 1
```
```js
// 👶 ילד — hoisting
sayHi();                       // ✅ עובד
function sayHi() { ... }
sayBye();                      // ❌ ReferenceError
const sayBye = function() {};
```
```js
// 💂 חייל — arrow vs regular
const obj = {
  name: "Tal",
  greet: () => this.name,           // ❌ undefined (lexical this)
  greet2() { return this.name; },   // ✅ "Tal" (method shorthand)
};
```
```js
// 🎓 סטודנט — IIFE legacy
(function() {
  var private = "hidden";    // pre-ES6 module hack
  window.api = { read: () => private };
})();
```
```js
// 👨‍💻 ג׳וניור — class field arrow
class Form {
  state = { v: 0 };
  onChange = (e) => this.setState({v: e.target.value});  // arrow + class field
  // לא צריך bind ב-constructor
}
```
```js
// 🎩 פרופ׳ — internal slots
// declaration: hoisted at parse, has [[Construct]]
// arrow: no [[Construct]], no own arguments, lexical [[ThisBindingStatus]]
```

---

### Type check (§16)

```js
// 🧓 סבתא
typeof 5;            // "number"
typeof "hi";         // "string"
typeof null;         // "object" ⚠️ באג היסטורי
typeof [];           // "object" ⚠️
```
```js
// 👶 ילד — לכל סוג כלי משלו
typeof 5;                // primitives
[] instanceof Array;     // class instances
Array.isArray([]);       // arrays specifically ✅
```
```js
// 💂 חייל
function check(x) {
  if (Array.isArray(x))           return "array";
  if (x === null)                  return "null";
  if (typeof x === "object")       return "object";
  if (typeof x === "function")     return "function";
  return typeof x;
}
```
```js
// 🎓 סטודנט — instanceof iframe trap
// ב-iframe אחר: const arr = window.frames[0].Array(1,2,3);
arr instanceof Array;      // false ⚠️ Array שונה ב-realm
Array.isArray(arr);        // true  ✅ עובד תמיד
```
```js
// 👨‍💻 ג׳וניור — runtime guard for TS
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x;
}
```
```js
// 🎩 פרופ׳
// typeof: syntactic operator, doesn't throw on undeclared
// instanceof: invokes Symbol.hasInstance if defined
// Array.isArray: checks [[Class]] internal slot — TypedArray returns false
```

---

### Destructuring (§19)

```js
// 🧓 סבתא — array vs object
const [a, b] = [1, 2];                   // לפי תור
const {x, y} = {x: 1, y: 2};             // לפי שם
```
```js
// 👶 ילד — defaults
const [a = 5] = [];                       // a=5 (אם undefined)
const {n = 0} = {};                       // n=0
```
```js
// 💂 חייל — rename
const {name: userName} = {name: "Tal"};   // userName = "Tal"
```
```js
// 🎓 סטודנט — nested + rest
const {a, b: {c}, ...rest} = obj;
const [first, , third, ...others] = arr;  // skip 2nd
```
```js
// 👨‍💻 ג׳וניור — function params with default
function f({title = "Untitled", items = []} = {}) { ... }
f();             // ✅ עובד
f({title: "X"}); // items = []
```
```js
// 🎩 פרופ׳
// Destructuring uses GetV/CopyDataProperties internally
// defaults trigger only on undefined (not null!)
const {a = 5} = {a: null};  // a = null (not 5!)
```

---

### innerHTML / innerText / textContent (§20)

```js
// 🧓 סבתא — XSS סכנה
el.innerHTML = userInput;         // ❌ סכנה!
el.textContent = userInput;       // ✅ בטוח
```
```html
<!-- 👶 ילד — HTML structure -->
<div id="d">Hello <span style="display:none">SECRET</span> World</div>
```
```js
// 💂 חייל — 3 ערכים שונים
d.innerHTML;    // "Hello <span...>SECRET</span> World" (HTML מלא)
d.innerText;    // "Hello World" (לא רואה hidden!)
d.textContent;  // "Hello SECRET World" (כל הטקסט)
```
```js
// 🎓 סטודנט — performance
el.innerHTML = "<p>" + items.join("</p><p>") + "</p>";  // 1 reflow
items.forEach(i => el.innerHTML += "<p>"+i+"</p>");      // ❌ N reflows
```
```js
// 👨‍💻 ג׳וניור — sanitize
import DOMPurify from "dompurify";
el.innerHTML = DOMPurify.sanitize(userMarkdown);  // ✅
```
```js
// 🎩 פרופ׳
// innerHTML: triggers HTML parser
// innerText: forces synchronous reflow (reads computed style)
// textContent: walks Text nodes, fastest, safest
```

---

### event.target / currentTarget / this (§21)

```html
<!-- 🧓 סבתא -->
<ul onClick="handler(event)">
  <li><span>טקסט</span></li>
</ul>
```
```js
// 👶 ילד — איפה קליק vs איפה listener
function handler(e) {
  e.target;        // <span> (איפה לחצו)
  e.currentTarget; // <ul> (איפה ה-listener)
}
```
```js
// 💂 חייל — event delegation
ul.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("li clicked:", e.target.textContent);
  }
});
```
```js
// 🎓 סטודנט — closest + delegation
ul.addEventListener("click", (e) => {
  const li = e.target.closest("li");      // עולה למעלה לקרוב ביותר
  if (li) selectItem(li.dataset.id);
});
```
```js
// 👨‍💻 ג׳וניור — this in arrow vs regular
btn.addEventListener("click", function() { console.log(this); });  // btn
btn.addEventListener("click", () => console.log(this));            // outer this!
```
```js
// 🎩 פרופ׳
// composedPath() — מחזיר full path כולל shadow boundaries
e.composedPath();   // [span, li, ul, body, html, document, window]
```

---

### preventDefault / stopPropagation (§22)

```js
// 🧓 סבתא — לבטל ברירת-מחדל
form.addEventListener("submit", e => {
  e.preventDefault();   // טופס לא נשלח
  // ... AJAX submit
});
```
```js
// 👶 ילד — לעצור עליה להורה
modal.addEventListener("click", e => {
  e.stopPropagation();   // הclick לא יגיע ל-overlay
});
```
```js
// 💂 חייל — שניהם
link.addEventListener("click", e => {
  e.preventDefault();      // הלינק לא ינווט
  e.stopPropagation();     // ההורה לא ישמע
});
```
```js
// 🎓 סטודנט — passive listeners
window.addEventListener("scroll", handler, { passive: true });
// ב-passive: preventDefault מתעלמים ממנו (לא יכול לעצור scroll)
```
```js
// 👨‍💻 ג׳וניור — modal pattern
const Modal = ({onClose, children}) => (
  <div onClick={onClose}>                       {/* backdrop */}
    <div onClick={e => e.stopPropagation()}>    {/* content */}
      {children}
    </div>
  </div>
);
```
```js
// 🎩 פרופ׳
// Some events are non-cancelable: e.cancelable === false
// stopImmediatePropagation: also stops handlers על אותו element
// captures phase: preventDefault עובד גם פה
```

---

### CSS Position (§23)

```css
/* 🧓 סבתא — static = ברירת מחדל */
div { position: static; }   /* במקום הטבעי */
```
```css
/* 👶 ילד — relative = שיפט קל */
.bumped {
  position: relative;
  top: -2px;  /* זז 2px למעלה מהמקום הטבעי */
}
```
```css
/* 💂 חייל — absolute = יוצא מהזרם */
.parent { position: relative; }       /* עוגן */
.tooltip { position: absolute; top: 100%; left: 0; }
```
```css
/* 🎓 סטודנט — fixed = קפוא במסך */
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
}
```
```css
/* 👨‍💻 ג׳וניור — sticky = היברידי */
.section-header {
  position: sticky;
  top: 0;          /* נדבק כשגוללים מתחת */
  background: white;
}
```
```css
/* 🎩 פרופ׳ — transform breaks fixed */
.parent { transform: translateZ(0); } /* יוצר containing block חדש! */
.child  { position: fixed; top: 0; }  /* fixed לparent, לא ל-viewport! */
```

---

### CSS Display (§24)

```css
/* 🧓 סבתא */
div    { display: block; }       /* שורה שלמה */
span   { display: inline; }      /* בתוך שורה */
.hidden { display: none; }       /* נסתר לחלוטין */
```
```css
/* 👶 ילד — inline-block */
.btn {
  display: inline-block;
  padding: 8px 16px;       /* inline + מקבל padding! */
}
```
```css
/* 💂 חייל — flex 1D */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```
```css
/* 🎓 סטודנט — grid 2D */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas: "side header" "side main" "side footer";
}
```
```css
/* 👨‍💻 ג׳וניור — flex bug fix */
.flex-item-with-text {
  flex: 1;
  min-width: 0;     /* ✅ חיוני לטקסט ארוך — מונע overflow */
  overflow: hidden;
  text-overflow: ellipsis;
}
```
```css
/* 🎩 פרופ׳ — display: contents */
.virtual-wrapper {
  display: contents;   /* האב נעלם מ-flow, ילדים נשארים */
}
```

---

### SSR / SSG / CSR / ISR (§25)

```js
// 🧓 סבתא — CSR (React SPA)
// dist/index.html: <div id="root"></div>
// JS bundle בונה את כל ה-DOM בדפדפן
ReactDOM.render(<App />, document.getElementById("root"));
```
```js
// 👶 ילד — SSR (Next.js dynamic)
export const dynamic = "force-dynamic";  // רץ בכל בקשה
export default async function Page() {
  const data = await db.query();
  return <div>{data.title}</div>;
}
```
```js
// 💂 חייל — SSG (Next default)
export default async function Page() {
  const data = await fs.readFile("blog.md");
  return <article>{data}</article>;
}
// build-time: HTML נוצר פעם 1, מועלה ל-CDN
```
```js
// 🎓 סטודנט — ISR (Next revalidate)
export const revalidate = 60;       // re-build כל 60 שניות
// CDN מחזיר את הישן עד שהבא מוכן
```
```js
// 👨‍💻 ג׳וניור — Server Component (Next 13+)
// app/page.tsx (Server Component by default)
export default async function Page() {
  const user = await getUser();           // רץ על השרת בלבד
  return <UserCard user={user} />;        // Stream HTML chunks
}
```
```js
// 🎩 פרופ׳ — selective hydration
// Suspense boundary streams HTML
// React re-hydrates components on demand (selective)
// Edge runtime: cold start ~50ms vs Node ~500ms
```

---

### type ↔ interface (§26)

```ts
// 🧓 סבתא
type Point = { x: number; y: number };          // alias
interface Point { x: number; y: number; }       // shape
```
```ts
// 👶 ילד — interface merges
interface Window { myCustom: string; }
interface Window { myOther: number; }
// אפשר להוסיף שדות לעצם הקיים — useful לlibs augmentation
```
```ts
// 💂 חייל — type unions (interface אסור)
type Status = "loading" | "success" | "error";
type Result = Success | Failure;
```
```ts
// 🎓 סטודנט — extension
interface Animal { name: string }
interface Dog extends Animal { breed: string }

type AnimalT = { name: string }
type DogT = AnimalT & { breed: string }   // intersection
```
```ts
// 👨‍💻 ג׳וניור — convention
interface User { ... }      // public API shape
type UserDTO = Pick<User, "id" | "name">;  // computed
```
```ts
// 🎩 פרופ׳ — performance
// Large unions check faster as interface (structural eq cache)
// type aliases compute lazily — slow for deeply computed
```

---

### unknown / any / never (§27)

```ts
// 🧓 סבתא
let any_:     any = "hi";       // אל תבדוק
let unknown_: unknown = "hi";   // בדוק לפני שתשתמש
let never_:   never;             // לא קיים אף פעם
```
```ts
// 👶 ילד
let a: any = "hi";
a.foo.bar();                    // ✅ אין שגיאה (אבל crash!)

let u: unknown = "hi";
u.length;                       // ❌ Object is of type 'unknown'
if (typeof u === "string") u.length;  // ✅
```
```ts
// 💂 חייל
function fail(msg: string): never { throw new Error(msg); }
function loop(): never { while (true) {} }
```
```ts
// 🎓 סטודנט — exhaustive check
type Shape = "circle" | "square";
function area(s: Shape): number {
  if (s === "circle") return 1;
  if (s === "square") return 2;
  const _: never = s;   // ❌ Type 'string' is not assignable to 'never'
  return 0;
}
```
```ts
// 👨‍💻 ג׳וניור — JSON.parse type safety
JSON.parse(input);              // returns any (סכנה)
const safe: unknown = JSON.parse(input);  // ✅ חייב narrow
if (isUser(safe)) { /* now safe is User */ }
```
```ts
// 🎩 פרופ׳ — distributive conditional
type NonNullable<T> = T extends null | undefined ? never : T;
// distributes over unions, filters null/undefined
type R = NonNullable<string | null>;  // string
```

---

### HTTP Status Codes (§28)

```js
// 🧓 סבתא — 2xx = הצלחה
res.status(200).json(user);     // OK
res.status(201).json(newUser);  // Created
res.status(204).end();          // No Content (אחרי DELETE)
```
```js
// 👶 ילד — 3xx = הפנייה
res.redirect(301, "/new-url");  // Permanent
res.redirect(302, "/temp");     // Temporary
res.status(304).end();          // Not Modified (cache hit)
```
```js
// 💂 חייל — 4xx = שגיאת לקוח
res.status(400).json({ error: "bad input" });
res.status(401).json({ error: "login required" });
res.status(403).json({ error: "no permission" });
res.status(404).json({ error: "not found" });
```
```js
// 🎓 סטודנט — 5xx = שגיאת שרת
try {
  await db.query();
} catch (err) {
  res.status(500).json({ error: "server error", id: traceId });
}
res.status(503).json({ error: "maintenance" });  // Service Unavailable
```
```js
// 👨‍💻 ג׳וניור — 401 vs 403 בייצור
if (!req.user) return res.status(401).json({ msg: "Login first" });
if (!canEdit(req.user, post)) return res.status(403).json({ msg: "No access" });
// frontend: 401 → redirect, 403 → toast
```
```js
// 🎩 פרופ׳
// 304 + ETag: bandwidth saving
// 429 + Retry-After header: rate limiting
// 511: Network Authentication Required (captive portal)
```

---

### req.params / query / body / headers (§29)

```js
// 🧓 סבתא — path param
app.get("/user/:id", (req, res) => {
  req.params.id;          // "42" (string)
});
```
```js
// 👶 ילד — query string
app.get("/search", (req, res) => {
  req.query.q;            // "?q=foo"
  req.query.limit;        // "?limit=10"
});
```
```js
// 💂 חייל — body
app.use(express.json());
app.post("/users", (req, res) => {
  req.body.email;         // מ-JSON payload
});
```
```js
// 🎓 סטודנט — headers
app.use((req, res, next) => {
  const auth = req.headers.authorization;  // "Bearer ..."
  const ct = req.headers["content-type"];
  next();
});
```
```js
// 👨‍💻 ג׳וניור — validation middleware
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);
  req.body = result.data;
  next();
};
app.post("/u", validate(userSchema), handler);
```
```js
// 🎩 פרופ׳
// Headers normalized to lowercase
// Beware CRLF injection in header values from user input
// req.app.get("trust proxy") affects req.ip parsing behind LB
```

---

### Mongoose: Schema/Model/Document/populate (§30)

```js
// 🧓 סבתא — Schema = תבנית
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
});
```
```js
// 👶 ילד — Model = הclass
const User = mongoose.model("User", userSchema);
```
```js
// 💂 חייל — Document = instance
const u = new User({ name: "Alice" });
await u.save();           // u.id קיים עכשיו
```
```js
// 🎓 סטודנט — references + populate
const postSchema = new Schema({
  title: String,
  author: { type: ObjectId, ref: "User" },
});
const post = await Post.findById(id).populate("author");
post.author.name;         // populate הביא את ה-User המלא
```
```js
// 👨‍💻 ג׳וניור — N+1 trap
const posts = await Post.find().populate("author");      // 1 query
const comments = await Promise.all(
  posts.map(p => Comment.find({ post: p.id }))           // ❌ N queries!
);
// תיקון: aggregation pipeline
const result = await Post.aggregate([
  { $lookup: { from: "comments", localField: "_id", foreignField: "post", as: "comments" } }
]);
```
```js
// 🎩 פרופ׳ — lean for performance
const docs = await User.find().lean();  // POJOs, no Mongoose overhead
// ~3x faster, no .save()/virtuals/methods
```

---

### Loops (§30b)

```js
// 🧓 סבתא — for עם מספר
for (let i = 0; i < 5; i++) console.log(i);   // 0,1,2,3,4
```
```js
// 👶 ילד — while עד תנאי
let n = 5;
while (n > 0) {
  console.log(n);
  n--;
}
```
```js
// 💂 חייל — for...of למערך
for (const item of [10, 20, 30]) console.log(item);   // 10, 20, 30
```
```js
// 🎓 סטודנט — for...in למפתחות object
for (const key of Object.keys(obj)) console.log(key, obj[key]);
// ⚠️ for...in ייתן גם prototype keys — Object.keys בטוח יותר
```
```js
// 👨‍💻 ג׳וניור — forEach trap
arr.forEach(async fn);              // ❌ לא ממתין
for (const x of arr) await fn(x);   // ✅ סדרתי
await Promise.all(arr.map(fn));     // ✅ מקבילי
```
```js
// 🎩 פרופ׳ — V8 optimization
// for על dense PACKED array: bytecode fast path
// forEach: callback overhead ~20% slower in tight loops
// for...of: iterator protocol — ~50% slower than direct for על arrays
```

---

### CSS Summary (§31)

```css
/* 🧓 סבתא — בסיס */
* { box-sizing: border-box; }     /* קריטי! */
body { margin: 0; }
```
```css
/* 👶 ילד — Box Model */
.card {
  margin: 16px;       /* מרווח חיצוני */
  border: 1px solid; /* קו */
  padding: 12px;     /* מרווח פנימי */
}
```
```css
/* 💂 חייל — Flexbox */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
```
```css
/* 🎓 סטודנט — Grid + responsive */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```
```css
/* 👨‍💻 ג׳וניור — design tokens */
:root {
  --color-primary: #007bff;
  --space-md: 1rem;
}
.btn {
  background: var(--color-primary);
  padding: var(--space-md);
}
```
```css
/* 🎩 פרופ׳ — modern CSS 2024+ */
.parent:has(> .error) { border-color: red; }   /* parent selector */
.container { container-type: inline-size; }     /* container queries */
@container (min-width: 400px) { ... }
```

---

### useState Cluster (§32)

```jsx
// 🧓 סבתא — direct set
const [n, setN] = useState(0);
setN(5);                          // n = 5
```
```jsx
// 👶 ילד — functional update
setN(prev => prev + 1);           // תמיד מקבל את הערך הטרי
```
```jsx
// 💂 חייל — lazy init
const [items, setItems] = useState(() => {
  return JSON.parse(localStorage.getItem("data")) ?? [];   // פעם 1
});
```
```jsx
// 🎓 סטודנט — useReducer
const [state, dispatch] = useReducer((s, a) => {
  switch (a.type) {
    case "INC": return { ...s, count: s.count + 1 };
    default: return s;
  }
}, { count: 0 });
dispatch({ type: "INC" });
```
```jsx
// 👨‍💻 ג׳וניור — useRef ללא re-render
const renderCount = useRef(0);
useEffect(() => { renderCount.current++; });   // לא triggers re-render
```
```jsx
// 🎩 פרופ׳ — class legacy
class Counter extends Component {
  state = { count: 0 };
  increment = () => this.setState((prev) => ({ count: prev.count + 1 }));
}
```

---

### Array Reference Cluster (§33)

```js
// 🧓 סבתא — אותו pointer
const a = [1, 2];
const b = a;             // pointer copy
b.push(3);
a;                       // [1, 2, 3] ← גם a השתנה!
```
```js
// 👶 ילד — spread shallow
const c = [...a];        // array חדש
c[0] = 99;               // c = [99, 2, 3], a = [1, 2, 3]
```
```js
// 💂 חייל — nested trap
const arr = [{ x: 1 }];
const copy = [...arr];   // shallow!
copy[0].x = 99;          // arr[0].x === 99 (object שותף!)
```
```js
// 🎓 סטודנט — deep clone
const deep = structuredClone(arr);
deep[0].x = 99;          // arr[0].x === 1 ✅ עצמאיים
```
```js
// 👨‍💻 ג׳וניור — React state pattern
// ✗ mutation:
state.users[0].name = "new";
setState({ ...state });

// ✓ immutable:
setState({
  ...state,
  users: state.users.map((u, i) =>
    i === 0 ? { ...u, name: "new" } : u
  )
});
```
```js
// 🎩 פרופ׳ — slice vs splice
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3);          // [2, 3] — לא משנה
arr.splice(1, 2);         // [2, 3] — וגם arr הופך ל-[1, 4, 5]!
```

---

✅ **PHASE A הושלם** — 33 קלסטרים × 6 רמות = ~200 בלוקי קוד.

---

## 🔬 PHASE C — ניתוח מושגים בנפרד (לכל קלסטר נותר)

### Event Loop — Microtask vs Macrotask (§8)

**`Microtask`**
- 🧓 סבתא: התור-המוקדם — קופצים לפני macro.
- 👶 ילד: הילדים שמותר להם לעבור ראשונים.
- 💂 חייל: Promise.then, queueMicrotask, MutationObserver.
- 🎓 סטודנט: drained completely between every macro.
- 👨‍💻 ג'וניור: שימוש לא נכון = UI freeze (infinite microtask chain).
- 🎩 פרופ׳: PerformMicrotaskCheckpoint algorithm. higher priority than tasks.

**`Macrotask`**
- 🧓 סבתא: התור הראשי — אחד בכל סבב.
- 👶 ילד: כולם בקופה הראשית, לפי הסדר.
- 💂 חייל: setTimeout, setInterval, I/O, click events, render.
- 🎓 סטודנט: 1 task per loop iteration. UI render between.
- 👨‍💻 ג'וניור: setTimeout(fn, 0) לפיצול עבודה ארוכה.
- 🎩 פרופ׳: HTML Event Loop §8.1.4. requestAnimationFrame is special phase.

---

### Promise Combinators (§9) — already covered above

### Callback / Promise / async-await (§10)

**`callback`**
- 🧓 סבתא: "תקרא לי כשתסיים" — חזרה אחורה.
- 👶 ילד: השאר תור — אני אגיע.
- 💂 חייל: function passed, called later. (err, data) Node convention.
- 🎓 סטודנט: pyramid of doom, error scattered.
- 👨‍💻 ג'וניור: עדיין שימושי — DOM events, Node streams.
- 🎩 פרופ׳: pre-1995 control inversion. CPS (continuation-passing style).

**`Promise.then`**
- 🧓 סבתא: שובר שתחזור איתו לקופה.
- 👶 ילד: כרטיס שיהפוך לארוחה.
- 💂 חייל: chainable, central .catch.
- 🎓 סטודנט: state machine: pending → fulfilled/rejected.
- 👨‍💻 ג'וניור: chain ארוך = code smell — החלף ל-async/await.
- 🎩 פרופ׳: Promises/A+ spec. NewPromiseCapability. PromiseReaction queue.

**`async/await`**
- 🧓 סבתא: כתוב כאילו זה קורה מיד — אני אדאג לחכות.
- 👶 ילד: כתוב מספרים בשורה — המורה תעצור עד שתסיים.
- 💂 חייל: async wraps in Promise. await pauses execution.
- 🎓 סטודנט: try/catch באופן רגיל. top-level await ב-modules.
- 👨‍💻 ג'וניור: 99% מהזמן async/await. forEach + async = trap.
- 🎩 פרופ׳: ES2017. desugar ל-Promise.then chains. zero-cost stack traces ב-V8.

---

### useMemo / useCallback / React.memo (§12)

**`useMemo`**
- 🧓 סבתא: שומר תוצאה של חישוב יקר.
- 👶 ילד: שומר ציור מאוד מורכב כדי לא לצייר שוב.
- 💂 חייל: `useMemo(fn, deps)` → cached return value.
- 🎓 סטודנט: ל-expensive computation, shallow-comparable result.
- 👨‍💻 ג'וניור: רק כש-Profiler מראה bottleneck.
- 🎩 פרופ׳: Object.is per dep. memoizedState slot.

**`useCallback`**
- 🧓 סבתא: שומר את הפונקציה עצמה לא מתחלפת.
- 👶 ילד: אותו עוזר אצל כל ילד, לא חדש כל פעם.
- 💂 חייל: equiv to `useMemo(()=>fn, deps)`. cached function reference.
- 🎓 סטודנט: לprops של React.memo / dep של useEffect.
- 👨‍💻 ג'וניור: בלי React.memo = אפס תועלת.
- 🎩 פרופ׳: NewClosure per render bypassed when deps unchanged.

**`React.memo`**
- 🧓 סבתא: עוטף קומפוננטה — לא ירנדר אם props לא משתנים.
- 👶 ילד: עוזר שלא קם אם לא קורה כלום.
- 💂 חייל: HOC wraps Component. shallow-equal props comparison.
- 🎓 סטודנט: לleaf components שמקבלים אותם props.
- 👨‍💻 ג'וניור: מדידה לפני, לא תמיד שווה.
- 🎩 פרופ׳: shallowEqual algorithm. bypass reconciliation if props equal.

---

### Set / Map / Object (§13)

**`Object`**
- 🧓 סבתא: ארון עם תאי-שמות.
- 👶 ילד: קופסה עם תאים שיש להם שמות.
- 💂 חייל: keys=string/Symbol. JSON-friendly.
- 🎓 סטודנט: configs קבועים, JSON serializable.
- 👨‍💻 ג'וניור: ל-fixed shape. אם הshape משתנה הרבה → Map.
- 🎩 פרופ׳: V8 Hidden Class. inline cache hit/miss.

**`Map`**
- 🧓 סבתא: ארון שיכול להשתמש בכל דבר כתווית.
- 👶 ילד: ארון עם תוויות מיוחדות (פונקציות, אובייקטים).
- 💂 חייל: any key type. .size O(1). insertion-ordered.
- 🎓 סטודנט: dynamic keys, frequent add/delete, .has fast.
- 👨‍💻 ג'וניור: cache עם DOM nodes כ-keys. בעבודה: Map פי 5 מ-Object.
- 🎩 פרופ׳: hash table backed. WeakMap ל-GC-able keys.

**`Set`**
- 🧓 סבתא: אוסף בלי כפילויות.
- 👶 ילד: שקית שלא מאפשרת את אותה סוכריה פעמיים.
- 💂 חייל: unique values only. .has O(1).
- 🎓 סטודנט: dedupe arrays, fast membership.
- 👨‍💻 ג'וניור: `[...new Set(arr)]` ב-1 שורה דד-דופ.
- 🎩 פרופ׳: hash set. WeakSet ל-GC-able values.

---

### Spread / Rest (§14)

**`Spread`**
- 🧓 סבתא: פותח את הסל לקפצים נפרדים.
- 👶 ילד: שופך מהשקית לכל הילדים.
- 💂 חייל: בקריאה / יצירה. `[...arr]`, `{...obj}`, `f(...args)`.
- 🎓 סטודנט: shallow copy. Math.max(...arr). React state spread.
- 👨‍💻 ג'וניור: nested objects עדיין משותפים — שגיאה נפוצה.
- 🎩 פרופ׳: invokes Symbol.iterator / OwnPropertyKeys.

**`Rest`**
- 🧓 סבתא: אוסף קפצים נפרדים לסל אחד.
- 👶 ילד: אוסף סוכריות שנשארו ושם בשקית חדשה.
- 💂 חייל: בהגדרה / destructuring. `function(...args)`, `const [a, ...rest]`.
- 🎓 סטודנט: variadic functions. כשרוצים variable arity.
- 👨‍💻 ג'וניור: `function f({a, ...rest})` ל-passthrough props.
- 🎩 פרופ׳: CopyDataProperties (excludes pre-listed keys).

---

### Function Definition Kinds (§15)

**`function declaration`**
- 🧓 סבתא: כתב מלא, מוכן מההתחלה.
- 👶 ילד: ספר כתוב ועומד על המדף — אפשר לקרוא תמיד.
- 💂 חייל: hoisted. callable before line.
- 🎓 סטודנט: top-level utilities.
- 👨‍💻 ג'וניור: לcomponent functions ב-React (debug-friendly).
- 🎩 פרופ׳: hoisted at parse time. own [[Construct]].

**`function expression`**
- 🧓 סבתא: לא חתום, בלי שם בכרטיס.
- 👶 ילד: ספר ללא כריכה — תקרא רק אחרי שהוא יגיע אליך.
- 💂 חייל: not hoisted. TDZ.
- 🎓 סטודנט: callbacks היסטוריים.
- 👨‍💻 ג'וניור: רוב הזמן — arrow עדיף.
- 🎩 פרופ׳: evaluated at runtime. assigned binding.

**`arrow function`**
- 🧓 סבתא: תקציר.
- 👶 ילד: ספר קצר.
- 💂 חייל: lexical this. אין arguments. אסור new.
- 🎓 סטודנט: callbacks, array methods, class fields.
- 👨‍💻 ג'וניור: ברירת-מחדל ל-callbacks. אסור כ-method.
- 🎩 פרופ׳: NewArrowEnvironment. no [[Construct]].

**`IIFE`**
- 🧓 סבתא: הצגה חד-פעמית.
- 👶 ילד: סיפור שמספרים פעם אחת ושוכחים.
- 💂 חייל: pre-ES6 scope hack. `(function(){...})()`.
- 🎓 סטודנט: legacy. ES Modules החליפו.
- 👨‍💻 ג'וניור: לא נוגע, רק ב-codebase legacy.
- 🎩 פרופ׳: ParenthesizedExpression force. immediate invocation.

---

### Type Check (§16)

**`typeof`**
- 🧓 סבתא: שואלת "מה זה?" ומקבלת מילה.
- 👶 ילד: בדיקה מהירה — מספר/טקסט/אובייקט.
- 💂 חייל: 7 תוצאות. typeof null === "object" באג.
- 🎓 סטודנט: לprimitives. אסור ל-arrays/null.
- 👨‍💻 ג'וניור: בדיקה ראשונית, אז narrow.
- 🎩 פרופ׳: syntactic operator. doesn't throw on undeclared.

**`instanceof`**
- 🧓 סבתא: שואלת "מאיזו משפחה?".
- 👶 ילד: בודק אם זה כלב או חתול.
- 💂 חייל: בודק prototype chain.
- 🎓 סטודנט: ל-class instances. iframe-trap.
- 👨‍💻 ג'וניור: זהירות בין realms.
- 🎩 פרופ׳: invokes Symbol.hasInstance if defined.

**`Array.isArray`**
- 🧓 סבתא: שואלת "האם זה מערך?".
- 👶 ילד: בדיקה מיוחדת רק למערכים.
- 💂 חייל: realm-safe. הדרך האמינה.
- 🎓 סטודנט: עדיף על instanceof Array.
- 👨‍💻 ג'וניור: תמיד זה מה שאני משתמש למערכים.
- 🎩 פרופ׳: checks [[Class]] internal slot. TypedArray returns false.

---

### Destructuring (§19)

**`array destructuring`**
- 🧓 סבתא: לפי תור ב-קופסה.
- 👶 ילד: ראשון לA, שני לB.
- 💂 חייל: by position. `const [a, b] = arr`.
- 🎓 סטודנט: tuple-like returns. skip with `,`.
- 👨‍💻 ג'וניור: useState pattern: `const [val, setVal] = useState()`.
- 🎩 פרופ׳: invokes [Symbol.iterator]. lazy evaluation.

**`object destructuring`**
- 🧓 סבתא: לפי שם של תווית.
- 👶 ילד: לפי השם בעטיפה.
- 💂 חייל: by key name. `const {a, b} = obj`.
- 🎓 סטודנט: rename `{a: x}`. defaults `{a = 5}`. rest `{a, ...rest}`.
- 👨‍💻 ג'וניור: ב-function signature: `({title, items = []})`.
- 🎩 פרופ׳: GetV per key. defaults trigger only on undefined (not null!).

---

### innerHTML / innerText / textContent (§20)

**`innerHTML`**
- 🧓 סבתא: רואה הכל כולל תגיות HTML.
- 👶 ילד: כתב הכל כולל תגיות.
- 💂 חייל: HTML parser. XSS risk.
- 🎓 סטודנט: רק עם DOMPurify על user input.
- 👨‍💻 ג'וניור: באב-טיפוס בלבד. בייצור — DOMPurify או textContent.
- 🎩 פרופ׳: triggers HTML parser. inline `<img onerror>` vector.

**`innerText`**
- 🧓 סבתא: רק מה שעיני המשתמש רואות.
- 👶 ילד: רק מה שאתה רואה על הדף.
- 💂 חייל: respects display:none. forces reflow.
- 🎓 סטודנט: למה שצריך להיות "what user sees".
- 👨‍💻 ג'וניור: אטי — נמנע עם 1000+ items.
- 🎩 פרופ׳: synchronous reflow. reads computed style.

**`textContent`**
- 🧓 סבתא: כל הטקסט גם הסמוי.
- 👶 ילד: כל המילים, גם מסתתרות.
- 💂 חייל: all text. fast. safe.
- 🎓 סטודנט: ברירת-מחדל לקריאה+כתיבה.
- 👨‍💻 ג'וניור: 90% מהזמן זה textContent.
- 🎩 פרופ׳: walks Text nodes. fastest. no parser.

---

### event.target / currentTarget / this (§21)

**`event.target`**
- 🧓 סבתא: איפה לחצו בפועל.
- 👶 ילד: הענן ששומעים.
- 💂 חייל: where event originated. immutable after dispatch.
- 🎓 סטודנט: לevent delegation matching.
- 👨‍💻 ג'וניור: בdelegation תמיד `event.target.closest(selector)`.
- 🎩 פרופ׳: set during dispatch from target node.

**`event.currentTarget`**
- 🧓 סבתא: איפה ה-listener.
- 👶 ילד: החדר שמהדהד.
- 💂 חייל: where listener was attached. changes during bubble.
- 🎓 סטודנט: לאלמנט שעליו הוספת listener.
- 👨‍💻 ג'וניור: שווה ל-this ב-regular handler.
- 🎩 פרופ׳: updated as event traverses capture/target/bubble.

**`this` (in event handler)`**
- 🧓 סבתא: תלוי בסוג הפונקציה.
- 👶 ילד: regular function = currentTarget. arrow = outer.
- 💂 חייל: regular fn → currentTarget. arrow fn → lexical.
- 🎓 סטודנט: bind explicit when needed.
- 👨‍💻 ג'וניור: ב-React class — bind או arrow class field.
- 🎩 פרופ׳: TypeError in strict mode if undefined.

---

### preventDefault / stopPropagation (§22)

**`preventDefault`**
- 🧓 סבתא: עוצר את ברירת המחדל (טופס שנשלח, לינק שנפתח).
- 👶 ילד: "אל תעשה את הדבר הרגיל".
- 💂 חייל: cancels browser default action.
- 🎓 סטודנט: form submit, link follow, scroll, contextmenu.
- 👨‍💻 ג'וניור: ב-passive listeners — מתעלמים.
- 🎩 פרופ׳: sets defaultPrevented=true. some events non-cancelable.

**`stopPropagation`**
- 🧓 סבתא: עוצר את ההורים מלשמוע.
- 👶 ילד: "אל תספר להורה".
- 💂 חייל: stops bubble to ancestors.
- 🎓 סטודנט: ל-modal-overlay, dropdown-outside-click pattern.
- 👨‍💻 ג'וניור: מסוכן — בלוק event delegation של הורים אחרים.
- 🎩 פרופ׳: sets internal flag. capture/bubble walks check.

**`stopImmediatePropagation`**
- 🧓 סבתא: עוצר גם listeners נוספים על אותו אלמנט.
- 👶 ילד: גם לא לאף אחד אחר על אותו ילד.
- 💂 חייל: blocks remaining handlers on same element + ancestors.
- 🎓 סטודנט: code smell — usually bad sign.
- 👨‍💻 ג'וניור: כמעט אף פעם.
- 🎩 פרופ׳: flag in event listener invocation loop.

---

### CSS Position (§23)

**`static`**
- 🧓 סבתא: במקום הטבעי, בלי שום שינוי.
- 👶 ילד: על הקיר.
- 💂 חייל: default. ignores top/left.
- 🎓 סטודנט: אין שימוש מפורש.
- 👨‍💻 ג'וניור: לא מציין במפורש.
- 🎩 פרופ׳: doesn't create stacking context.

**`relative`**
- 🧓 סבתא: עם שיפט קל מהמקום הטבעי.
- 👶 ילד: על הקיר אבל זז 2 ס"מ.
- 💂 חייל: shift from natural position. תופס מקום.
- 🎓 סטודנט: עוגן ל-absolute children. fine adjustments.
- 👨‍💻 ג'וניור: pattern: relative parent + absolute tooltip.
- 🎩 פרופ׳: creates stacking context if z-index set.

**`absolute`**
- 🧓 סבתא: יוצא מהזרם, מתחבר לאב יחסי.
- 👶 ילד: שעון תלוי על מסמר חופשי.
- 💂 חייל: out of flow. positioned to nearest non-static ancestor.
- 🎓 סטודנט: tooltips, dropdowns.
- 👨‍💻 ג'וניור: שכחה של `position: relative` על האב = bug.
- 🎩 פרופ׳: containing block resolution traverses up.

**`fixed`**
- 🧓 סבתא: קפוא במסך, לא זז עם גלילה.
- 👶 ילד: שעון בחלון שתמיד שם.
- 💂 חייל: positioned to viewport. doesn't scroll.
- 🎓 סטודנט: modal, sticky header (legacy).
- 👨‍💻 ג'וניור: transform על אב שובר fixed.
- 🎩 פרופ׳: viewport as containing block. transform creates new CB.

**`sticky`**
- 🧓 סבתא: היברידי — נדבק כשגוללים.
- 👶 ילד: רגיל עד שמגיע לגג, אז נדבק.
- 💂 חייל: relative until threshold, then fixed within scroll-port.
- 🎓 סטודנט: section headers, sidebar nav.
- 👨‍💻 ג'וניור: לא עובד אם overflow על אב.
- 🎩 פרופ׳: scroll port as containing block. modern alternative to scroll-spy.

---

### CSS Display (§24)

**`block`**
- 🧓 סבתא: שורה שלמה.
- 👶 ילד: כמו פסקה — תופס שורה שלמה.
- 💂 חייל: full-width. accepts width/height. line break.
- 🎓 סטודנט: div, p, h1-h6, section.
- 👨‍💻 ג'וניור: דורש display: block-and-set explicit לכמה elements.
- 🎩 פרופ׳: BFC formatting context.

**`inline`**
- 🧓 סבתא: רק במקום שצריך, לא שורה שלמה.
- 👶 ילד: כמו מילה.
- 💂 חייל: in-line. ignores width/height. only padding-x.
- 🎓 סטודנט: span, a, em, strong.
- 👨‍💻 ג'וניור: לא מנסה לשנות width לinline element.
- 🎩 פרופ׳: IFC formatting context.

**`inline-block`**
- 🧓 סבתא: בתוך שורה אבל מקבל width/height.
- 👶 ילד: כמו מילה אבל גדולה ומותאמת.
- 💂 חייל: in-line + accepts dimensions.
- 🎓 סטודנט: legacy לbuttons עם padding.
- 👨‍💻 ג'וניור: היום flex עדיף.
- 🎩 פרופ׳: hybrid IFC/BFC. baseline alignment quirks.

**`flex`**
- 🧓 סבתא: שורה גמישה — ילדים מתחלקים.
- 👶 ילד: שורה של בתים שמתחלקים בשטח.
- 💂 חייל: 1D layout (row או column).
- 🎓 סטודנט: navbar, toolbar, cards.
- 👨‍💻 ג'וניור: 90% מ-component layouts.
- 🎩 פרופ׳: FFC. main vs cross axis.

**`grid`**
- 🧓 סבתא: לוח שחמט.
- 👶 ילד: רובע מסודר עם רחובות אופקיים ואנכיים.
- 💂 חייל: 2D layout (rows + cols).
- 🎓 סטודנט: page layout, dashboards.
- 👨‍💻 ג'וניור: subgrid (2023+) ל-nested.
- 🎩 פרופ׳: GFC. tracks definitions. auto-placement algorithm.

---

### SSR / SSG / CSR / ISR (§25)

**`CSR (Client-Side Rendering)`**
- 🧓 סבתא: דף ריק מגיע, JS בונה.
- 👶 ילד: ערכת חימום, מבשל לעצמו.
- 💂 חייל: empty HTML + JS bundle. SEO רע.
- 🎓 סטודנט: SPA dashboards.
- 👨‍💻 ג'וניור: לcomponent-heavy apps.
- 🎩 פרופ׳: TTFB מהיר, FCP אטי.

**`SSR (Server-Side Rendering)`**
- 🧓 סבתא: דף מלא מגיע מהשרת.
- 👶 ילד: ארוחה חמה ומוכנה.
- 💂 חייל: HTML generated per request.
- 🎓 סטודנט: blog, marketing.
- 👨‍💻 ג'וניור: server cost עולה.
- 🎩 פרופ׳: hydration mismatch is common pitfall.

**`SSG (Static Site Generation)`**
- 🧓 סבתא: דף מוכן מראש.
- 👶 ילד: ארוחה הוכנה אתמול ומוקפאת.
- 💂 חייל: HTML built once, CDN-cached.
- 🎓 סטודנט: docs, landing pages.
- 👨‍💻 ג'וניור: זול ביותר. content stale.
- 🎩 פרופ׳: build-time fetch. pre-rendered.

**`ISR (Incremental Static Regeneration)`**
- 🧓 סבתא: היברידי — בנוי + מתעדכן.
- 👶 ילד: ארוחה מוכנה מאתמול אבל מתחממת.
- 💂 חייל: SSG + revalidate interval.
- 🎓 סטודנט: e-commerce listings.
- 👨‍💻 ג'וניור: revalidate=60 חוסך 99% מ-server load.
- 🎩 פרופ׳: on-demand revalidation via revalidatePath().

---

### type / interface (§26)

**`type`**
- 🧓 סבתא: כינוי לחפץ.
- 👶 ילד: שם נוסף לאותו דבר.
- 💂 חייל: alias for any type.
- 🎓 סטודנט: union, tuple, computed types.
- 👨‍💻 ג'וניור: ל-state shapes, action types.
- 🎩 פרופ׳: lazy evaluation. structural equality slower at scale.

**`interface`**
- 🧓 סבתא: חוזה שאפשר להרחיב.
- 👶 ילד: רשימת תכונות שצריך לקיים.
- 💂 חייל: object shape with declaration-merging.
- 🎓 סטודנט: לAPIs, DTOs.
- 👨‍💻 ג'וניור: ל-public contracts.
- 🎩 פרופ׳: structural equality cache. faster checks.

---

### unknown / any / never (§27)

**`any`**
- 🧓 סבתא: "אל תבדוק".
- 👶 ילד: שקית עם כל מה שאפשר.
- 💂 חייל: bypass type-check. accept/output anything.
- 🎓 סטודנט: escape hatch. avoid in production.
- 👨‍💻 ג'וניור: רק במיגרציה. לdebt תיעוד.
- 🎩 פרופ׳: bypasses type-checking bidirectionally.

**`unknown`**
- 🧓 סבתא: "תבדוק לפני שתשתמש".
- 👶 ילד: שקית עם כל דבר, אבל לפני שאוכל אבדוק.
- 💂 חייל: top type. requires narrowing.
- 🎓 סטודנט: לJSON.parse, fetch responses.
- 👨‍💻 ג'וניור: ברירת-מחדל לערכים חיצוניים.
- 🎩 פרופ׳: contravariant top. assignable from anything.

**`never`**
- 🧓 סבתא: "זה לא יקרה".
- 👶 ילד: שקית שלעולם לא תהיה.
- 💂 חייל: bottom type. throw, infinite, exhaustive.
- 🎓 סטודנט: לexhaustive switch checks.
- 👨‍💻 ג'וניור: assertNever pattern.
- 🎩 פרופ׳: covariant bottom. distributive conditional filter.

---

### HTTP Status Codes (§28)

**`2xx Success`**
- 🧓 סבתא: הצליח.
- 👶 ילד: קיבלת.
- 💂 חייל: 200 OK, 201 Created, 204 No Content.
- 🎓 סטודנט: 201 with Location header. 204 after DELETE.
- 👨‍💻 ג'וניור: 200 default. 201 לcreate. 204 לdelete.
- 🎩 פרופ׳: 206 Partial Content (Range header).

**`3xx Redirect`**
- 🧓 סבתא: הלך למקום אחר.
- 👶 ילד: עברתי דירה.
- 💂 חייל: 301 permanent, 302 temp, 304 cached.
- 🎓 סטודנט: 304 + ETag = cache hit, no body.
- 👨‍💻 ג'וניור: 301 sticks (browser caches aggressively!).
- 🎩 פרופ׳: 303 See Other (POST→GET redirect).

**`4xx Client Error`**
- 🧓 סבתא: אתה (לקוח) טעית.
- 👶 ילד: בקשת בעיה.
- 💂 חייל: 400 bad input, 401 needs auth, 403 forbidden, 404 not found.
- 🎓 סטודנט: 401 vs 403 differ in auth state.
- 👨‍💻 ג'וניור: 401 → redirect login. 403 → toast "no access".
- 🎩 פרופ׳: 422 Unprocessable Entity. 429 Too Many Requests.

**`5xx Server Error`**
- 🧓 סבתא: אנחנו טעינו.
- 👶 ילד: השרת נשבר.
- 💂 חייל: 500 internal, 502 gateway, 503 unavailable.
- 🎓 סטודנט: 503 + Retry-After header.
- 👨‍💻 ג'וניור: log עם trace-id. אל תחשוף stack ל-user.
- 🎩 פרופ׳: 504 Gateway Timeout. 511 Captive Portal.

---

### req.params / query / body / headers (§29)

**`req.params`**
- 🧓 סבתא: מספר הבית מה-URL.
- 👶 ילד: `/user/5` → "5".
- 💂 חייל: path params. always string.
- 🎓 סטודנט: לresource identification.
- 👨‍💻 ג'וניור: convert to number with care.
- 🎩 פרופ׳: parsed by router (e.g., `/user/:id`).

**`req.query`**
- 🧓 סבתא: שאלות אחרי `?`.
- 👶 ילד: `?fast=true` → אופציות.
- 💂 חייל: query string. always string (or array if repeated).
- 🎓 סטודנט: לfilter/sort/pagination.
- 👨‍💻 ג'וניור: validate types — נכנסים strings, צריך coerce.
- 🎩 פרופ׳: parsed via qs library. nested objects with brackets.

**`req.body`**
- 🧓 סבתא: המכתב הפנימי.
- 👶 ילד: התוכן של POST.
- 💂 חייל: parsed body (needs middleware).
- 🎓 סטודנט: JSON body, form data, multipart.
- 👨‍💻 ג'וניור: validate with Zod/Joi לפני שmוטה.
- 🎩 פרופ׳: parsed based on Content-Type.

**`req.headers`**
- 🧓 סבתא: עוטפת המכתב.
- 👶 ילד: מי שלח, איזה סוג.
- 💂 חייל: HTTP headers (auth, content-type, ...).
- 🎓 סטודנט: lowercased automatically.
- 👨‍💻 ג'וניור: req.get("Authorization") consistent.
- 🎩 פרופ׳: CRLF injection risk in user-input headers.

---

### Mongoose: Schema/Model/Document/populate (§30)

**`Schema`**
- 🧓 סבתא: תבנית.
- 👶 ילד: דפוס לעוגה.
- 💂 חייל: defines fields/types/validators.
- 🎓 סטודנט: validation, indexes, hooks (pre/post).
- 👨‍💻 ג'וניור: שמור גרסאות סכימה ל-migrations.
- 🎩 פרופ׳: discriminators for inheritance.

**`Model`**
- 🧓 סבתא: ערכת הכלים.
- 👶 ילד: התנור והתבנית.
- 💂 חייל: ORM-class with CRUD methods.
- 🎓 סטודנט: find/create/update/delete/aggregate.
- 👨‍💻 ג'וניור: lean() ל-perf קריטי.
- 🎩 פרופ׳: compiled from Schema. caches connection.

**`Document`**
- 🧓 סבתא: הפרי.
- 👶 ילד: עוגה אחת.
- 💂 חייל: instance of model.
- 🎓 סטודנט: has .save(), .toJSON(), virtuals.
- 👨‍💻 ג'וניור: middleware (pre-save) ל-hooks.
- 🎩 פרופ׳: tracking dirty fields. atomic ops via $set.

**`populate`**
- 🧓 סבתא: לקרב חפצים שאליהם רומזים.
- 👶 ילד: גם להביא תוספות.
- 💂 חייל: replaces ObjectId refs with full docs.
- 🎓 סטודנט: virtual populate, deep populate.
- 👨‍💻 ג'וניור: N+1 trap — שקול aggregate.
- 🎩 פרופ׳: uses .find($in) under the hood. multiple queries.

---

### CSS Summary (§31) — already a summary; per-member breakdown below

**`box-sizing`**
- 🧓 סבתא: איך מחשבים גודל — עם הקיר או בלעדיו.
- 👶 ילד: width = content בלבד או content + padding + border.
- 💂 חייל: content-box (default) vs border-box.
- 🎓 סטודנט: border-box גלובלית — `* { box-sizing: border-box; }`.
- 👨‍💻 ג'וניור: שגיאה היסטורית של CSS — תיקון אוניברסלי.
- 🎩 פרופ׳: legacy compat with IE Quirks Mode.

**`margin`**
- 🧓 סבתא: רווח חיצוני מסביב.
- 👶 ילד: גינה חיצונית.
- 💂 חייל: external space. doesn't fill.
- 🎓 סטודנט: collapsible vertically (block-level).
- 👨‍💻 ג'וניור: margin-collapse — bug magnet בvertical layouts.
- 🎩 פרופ׳: collapsible only in BFC. flex/grid prevents.

**`padding`**
- 🧓 סבתא: רווח פנימי.
- 👶 ילד: ריפוד פנימי.
- 💂 חייל: internal space. fills with background.
- 🎓 סטודנט: כלול ב-border-box width.
- 👨‍💻 ג'וניור: לטבלאות tap-targets — min 44×44 ב-mobile.
- 🎩 פרופ׳: applies inside border, includes background-clip:padding-box.

**`border`**
- 🧓 סבתא: קו סביב.
- 👶 ילד: קיר.
- 💂 חייל: visible outline of element.
- 🎓 סטודנט: shorthand width-style-color.
- 👨‍💻 ג'וניור: border-radius creates stacking context.
- 🎩 פרופ׳: border-image, border-collapse בtables.

**`flexbox properties`**
- 🧓 סבתא: כיוון הכלים והסידור.
- 👶 ילד: שורה או טור.
- 💂 חייל: flex-direction, justify-content, align-items, gap.
- 🎓 סטודנט: main axis vs cross axis depending on direction.
- 👨‍💻 ג'וניור: gap > margin tricks. flex: 1 1 0.
- 🎩 פרופ׳: place-content shorthand. align-content vs align-items.

**`grid properties`**
- 🧓 סבתא: שורות, עמודות, רווחים.
- 👶 ילד: לוח שחמט עם תוויות.
- 💂 חייל: grid-template-columns/rows/areas, gap.
- 🎓 סטודנט: repeat(auto-fit, minmax(200px, 1fr)) responsive.
- 👨‍💻 ג'וניור: grid-template-areas הכי קריא לפריסה.
- 🎩 פרופ׳: subgrid (2023+). implicit grid via grid-auto-flow.

**`units`**
- 🧓 סבתא: יחידות מידה — px קבוע, % יחסי.
- 👶 ילד: פיקסלים, אחוזים, יחידות מסך.
- 💂 חייל: px absolute. rem/em relative. % parent. vh/vw viewport.
- 🎓 סטודנט: rem ל-typography, px ל-borders, % ל-widths.
- 👨‍💻 ג'וניור: vh on iOS — beware safe area.
- 🎩 פרופ׳: dvh (dynamic viewport, 2023+) handles iOS chrome.

---

✅ **PHASE C הושלם** — 22 קלסטרים נוספים פורקו לחבריהם, סה״כ 31 קלסטרים עם פירוק חבר-חבר.

---

## 34. Closures — סגירות והכל-לידן (קושי 8)

> חברי קלסטר: `closure` · `lexical scope` · `IIFE` · `stale closure` · `closure in setTimeout` · `closure in useEffect`

### טבלה

| תופעה | מה זה | למה זה קורה | תיקון |
|---|---|---|---|
| Closure | פונקציה זוכרת משתנים מהscope שבו נוצרה | function = code + environment | תכונה — לא בעיה |
| Lexical Scope | scope נקבע ב**מיקום ההגדרה**, לא בקריאה | בניגוד ל-`this` שדינמי | זוהי הסיבה לclosures |
| IIFE | פונקציה שמופעלת מיד | יוצר private scope לפני ES Modules | החלף ל-`{ ... }` block או module |
| Stale Closure | callback רואה ערך ישן | nested function תפסה ערך ב-render קודם | functional update / dep array שלם |
| Closure in setTimeout | setTimeout callback רואה ערך ישן | timer מחזיק את ה-closure | clearTimeout + functional |
| Closure in useEffect | effect רואה state ישן | `[]` deps לא כולל state | הוסף ל-deps או functional update |

### דוגמה אחת לכל

```js
// 1. Closure בסיסי
function counter() {
  let n = 0;
  return () => ++n;
}
const inc = counter();
inc(); inc(); inc();   // 3

// 2. Lexical scope
let x = "outer";
function f() { console.log(x); }       // "outer"
function g() { let x = "inner"; f(); } // עדיין "outer" — lexical, לא דינמי

// 3. IIFE
const total = (function() {
  const fee = 10;
  return 100 + fee;
})();   // 110

// 4. Stale closure ב-React
function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setInterval(() => setN(n + 1), 1000);  // ❌ n קפוא ב-0
  }, []);
}

// 5. Closure ב-setTimeout
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);   // 3, 3, 3 (var — function scope)
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);   // 0, 1, 2 (let — block scope per iter)
}

// 6. Closure ב-useEffect
useEffect(() => {
  const handler = () => console.log(value);  // value קפוא ב-render-time
  window.addEventListener("scroll", handler);
  return () => window.removeEventListener("scroll", handler);
}, [value]);  // ✅ deps כולל value
```

### 6 רמות

**סבתא** 🧓 — פונקציה זוכרת את החדר שבו היא נולדה, גם אחרי שהוא נסגר.
**ילד** 👶 — דמיין צוואת סבא — היא זוכרת על מי דיברה גם אחרי 100 שנה.
**חייל** 💂 — function + environment chain. lexical (מהיכן הוגדרה).
**סטודנט** 🎓 — מסיבת iterations: `var` משתפת, `let` מבדדת. functional update פותר stale.
**ג'וניור** 👨‍💻 — react-hooks/exhaustive-deps תופס 90% מהבאגים. או `useEffectEvent` חדש.
**פרופ׳** 🎩 — Function inherits LexicalEnvironment. Inner functions reference outer's EnvironmentRecord. GC keeps env alive while closure live.

### בלוקי קוד ל-6 רמות

```js
// 🧓 סבתא — פונקציה זוכרת את הבית שלה
function maker(name) { return () => `Hi ${name}`; }
const greet = maker("Tal");
greet();   // "Hi Tal" — זוכרת את "Tal"

// 👶 ילד
function bank(money) {
  return { deposit: (n) => money += n, balance: () => money };
}
const wallet = bank(100);
wallet.deposit(50); wallet.balance();   // 150 — money "חי" בthe closure

// 💂 חייל — let vs var ב-loop
for (var i=0; i<3; i++) setTimeout(()=>console.log(i), 0);  // 3 3 3
for (let j=0; j<3; j++) setTimeout(()=>console.log(j), 0);  // 0 1 2

// 🎓 סטודנט — stale closure pattern
const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);  // functional
  return () => clearInterval(id);
}, []);

// 👨‍💻 ג'וניור — useEffectEvent (React 19+)
const onTimer = useEffectEvent(() => log(value));  // tracks latest value
useEffect(() => { setInterval(onTimer, 1000); }, []);

// 🎩 פרופ׳ — bytecode
// CreateFunction emits closure with [[Environment]] slot
// Inner accesses via LdaContextSlot through chain
```

---

## 35. React State Flow — props / state / context / re-render (קושי 7)

> חברים: `props` · `state` · `context` · `useState` · `useContext` · `re-render` · `passing function as prop`

### טבלה

| ציר | props | state | context |
|---|---|---|---|
| מקור | אב → ילד | בתוך הקומפוננטה | global container |
| Mutation | אסור (immutable) | רק דרך setter | רק דרך Provider value |
| Re-render trigger | אב משתנה | setter נקרא | Provider value משתנה |
| Drilling? | כן (3+ רמות = problem) | לא | מחליף את ה-drilling |
| Performance cost | זול | זול | יקר אם value משתנה הרבה |

### דוגמה
```jsx
// props
function Greet({ name }) { return <h1>Hi {name}</h1>; }
<Greet name="Tal" />

// state
function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}

// context
const ThemeCtx = createContext("light");
function App() {
  return <ThemeCtx.Provider value="dark"><Toolbar/></ThemeCtx.Provider>;
}
function Toolbar() {
  const theme = useContext(ThemeCtx);
  return <div>{theme}</div>;
}
```

### 6 רמות
**סבתא** 🧓 — props = מתנה מאמא. state = יומן פנימי. context = רדיו ציבורי.
**ילד** 👶 — props מהורים, state פרטי, context לכל הכיתה.
**חייל** 💂 — props one-way down. state local. context cross-cutting.
**סטודנט** 🎓 — state lift to common parent. context for theme/auth/locale.
**ג'וניור** 👨‍💻 — context value ב-useMemo, אחרת re-render לכל consumer.
**פרופ׳** 🎩 — Reconciliation traverses fiber tree. Bailout if memoized + props ===.

```jsx
// 🧓 סבתא
<Card title="Hello" />   // title is a prop

// 👶 ילד
const [open, setOpen] = useState(false);  // state פרטי

// 💂 חייל — re-render trigger
function Parent() {
  const [n, setN] = useState(0);
  return <Child value={n} />;   // re-renders Child when n changes
}

// 🎓 סטודנט — context provider
const Auth = createContext(null);
<Auth.Provider value={user}>{children}</Auth.Provider>

// 👨‍💻 ג'וניור — memoized context
const ctxVal = useMemo(() => ({ user, setUser }), [user]);
<Auth.Provider value={ctxVal}>{children}</Auth.Provider>

// 🎩 פרופ׳ — fiber bailout
// React.memo + Object.is on props → bailout, no rerender
```

---

## 36. React Hooks Cluster — useState / useEffect / useMemo / useRef (קושי 7)

> חברים: `useState` · `useEffect` · `useMemo` · `useRef` · `useCallback` · `custom hook`

### טבלה

| Hook | מטרה | Triggers re-render? | Persists across renders? |
|---|---|---|---|
| `useState` | local state | ✅ | ✅ |
| `useEffect` | side effects (subscribe/fetch/log) | ❌ | ✅ |
| `useMemo` | cache expensive computation | ❌ | ✅ |
| `useCallback` | cache function reference | ❌ | ✅ |
| `useRef` | mutable storage / DOM ref | ❌ | ✅ |
| custom hook | reusable hook logic | depends | depends |

### 6 רמות
**סבתא** 🧓 — useState=זיכרון, useEffect=פעולות-צד, useMemo=שמור-תוצאה, useRef=סוד.
**ילד** 👶 — 4 כלים שונים בקופסה — כל אחד למשימה אחרת.
**חייל** 💂 — useState triggers render. useEffect runs after commit. useMemo caches values. useRef mutable container.
**סטודנט** 🎓 — Rules: 1) only at top level. 2) only in React functions. 3) name starts with "use".
**ג'וניור** 👨‍💻 — eslint-plugin-react-hooks חובה. extract custom hooks ל-state-machines.
**פרופ׳** 🎩 — fiber.memoizedState linked list. Order-dependent.

```jsx
// 🧓 סבתא
const [count, setCount] = useState(0);

// 👶 ילד
useEffect(() => { console.log("רנדור"); });

// 💂 חייל
const total = useMemo(() => items.reduce((s,i)=>s+i.price, 0), [items]);

// 🎓 סטודנט
const handleClick = useCallback(() => fn(id), [id]);

// 👨‍💻 ג'וניור — custom hook
function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

// 🎩 פרופ׳ — fiber slot order
// State stored in fiber.memoizedState as linked list.
// Hook order MUST be stable across renders.
```

---

## 37. TypeScript ב-React — Typing Props / Hooks / Events (קושי 7)

> חברים: `Typing Props` · `Function Prop Type` · `Type Narrowing` · `Union Type`

### טבלה

| תרחיש | תחביר | דוגמה |
|---|---|---|
| Component props | interface או type | `interface Props { name: string }` |
| Children | `ReactNode` | `children: ReactNode` |
| Function prop | `(args) => returnType` | `onClick: (e: MouseEvent) => void` |
| useState typed | `<T>` | `useState<User \| null>(null)` |
| Event handler | מתאים לאלמנט | `onChange: ChangeEventHandler<HTMLInputElement>` |
| Generic component | `<T,>` | `function List<T>({items}: {items: T[]})` |

### 6 רמות
**סבתא** 🧓 — TypeScript מחייב לתאר מה כל prop מקבל.
**ילד** 👶 — לפני שאני מקבל מתנה — אומרים לי איזה סוג.
**חייל** 💂 — Props interface + ReactNode + EventHandler types.
**סטודנט** 🎓 — Prefer interface for public API, type for unions.
**ג'וניור** 👨‍💻 — `as` casting = code smell. Prefer type guards.
**פרופ׳** 🎩 — Generics with `extends` for narrowed APIs. discriminated unions for state machines.

```tsx
// 🧓 סבתא
function Greet({ name }: { name: string }) { return <h1>Hi {name}</h1>; }

// 👶 ילד
interface CardProps { title: string; children: React.ReactNode; }

// 💂 חייל
function Btn(props: { onClick: () => void }) { return <button onClick={props.onClick}/>; }

// 🎓 סטודנט — useState generic
const [user, setUser] = useState<User | null>(null);

// 👨‍💻 ג'וניור — discriminated union
type State = { status: "loading" } | { status: "ok"; data: User } | { status: "err"; msg: string };
if (state.status === "ok") state.data.name; // narrowed!

// 🎩 פרופ׳ — generic component
function List<T,>({ items, render }: { items: T[]; render: (x: T) => ReactNode }) {
  return <ul>{items.map(render)}</ul>;
}
```

---

## 38. AI Engineering Patterns — RAG / Tool Calling / Agents / Fine-tuning (קושי 8)

> חברים: `RAG` · `tool calling` · `agent loop` · `fine-tuning boundary`

### טבלה

| Pattern | בעיה שפותר | עלות | מתי לבחור |
|---|---|---|---|
| RAG | מודל לא מכיר תוכן ספציפי שלי | embedding + vector search | knowledge base, docs Q&A |
| Tool calling | מודל צריך לבצע פעולה (לא רק לדבר) | API call per tool | API agents, calculator |
| Agent loop | מטרה רב-שלבית | tokens × iterations | research, multi-step planning |
| Fine-tuning | format-specific output | training cost + maintenance | strict format, classification |

### 6 רמות
**סבתא** 🧓 — RAG=נותן ספרים. Tool=נותן כלים. Agent=נותן רגליים. Fine-tune=מאמן מחדש.
**ילד** 👶 — RAG=ספרייה, Tool=ארגז כלים, Agent=שליח, Fine-tune=שיעורים פרטיים.
**חייל** 💂 — RAG retrieves context. Tool = function call. Agent = LLM in a loop. Fine-tune = retrain weights.
**סטודנט** 🎓 — Pick by need. RAG cheap. Tools moderate. Agents expensive. Fine-tune slow + brittle.
**ג'וניור** 👨‍💻 — Start with RAG. Add tools when actions needed. Agents only for genuinely multi-step.
**פרופ׳** 🎩 — Vector DB (pgvector / Pinecone). Tool schemas (JSON Schema). Agent frameworks (LangGraph). Fine-tune via PEFT/LoRA.

```js
// 🧓 סבתא — RAG
const docs = await vectorDB.search(userQuery);
const answer = await llm.complete(`Context: ${docs}\nQ: ${userQuery}`);

// 👶 ילד — Tool
const tools = [{ name: "get_weather", parameters: { city: "string" } }];
const response = await llm.complete(prompt, { tools });
if (response.tool_call) await callTool(response.tool_call);

// 💂 חייל — Agent loop
while (!done) {
  const r = await llm.complete(history);
  if (r.action) history.push(await execute(r.action));
  else done = true;
}

// 🎓 סטודנט — RAG + retrieval
const relevant = await embeddings.similar(query, k=5);
const answer = await llm.chat([
  { role: "system", content: `Use this context: ${relevant.join("\n")}` },
  { role: "user", content: query }
]);

// 👨‍💻 ג'וניור — multi-step agent
const agent = new AgentExecutor({ tools, llm, maxIters: 10 });
const result = await agent.run(complexGoal);

// 🎩 פרופ׳ — fine-tuning boundary
// Use fine-tune when: format strict, latency critical, frequency >1k/day
// Use prompting when: rapid iteration, varied tasks, low volume
```

---

✅ **5 קלסטרים נוספים נוספו** (Closures · React State · React Hooks · TS-React · AI Patterns)

---

## 39. Error Catching Strategies — Error Boundary / try/catch / Promise.catch (קושי 8)

### טבלה
| Strategy | תופס | לא תופס | מתי |
|---|---|---|---|
| Error Boundary (React class) | render errors בילדים | event handlers, async, server, errors בעצמו | UI fallback |
| try/catch | סינכרוני + await | callbacks-only, Promises ללא await | async/sync code |
| Promise.catch / .catch | rejected Promises | סינכרוני | promise chains |
| window.onerror | uncaught errors | handled errors | global logging |
| process.on('uncaughtException') | Node uncaught | handled errors | server crash protection |

### 6 רמות
**🧓 סבתא:** כל אחד תופס סוג שגיאה אחר. boundary לרינדור, try/catch לקוד רגיל, .catch לpromises.
**👶 ילד:** כמו רשתות בטיחות שונות לקרקסים שונים.
**💂 חייל:** Boundary→render-tree errors. try/catch→sync+await. .catch→async chains.
**🎓 סטודנט:** Combine all 3 in production app.
**👨‍💻 ג'וניור:** error-boundary-fallback-prop pattern. log to Sentry.
**🎩 פרופ׳:** Error Boundary uses componentDidCatch + getDerivedStateFromError.

```jsx
// 🧓 סבתא
class Boundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? <p>שגיאה</p> : this.props.children; }
}

// 👶 ילד
try { JSON.parse(input); } catch (e) { console.error(e); }

// 💂 חייל
fetch("/api").then(r => r.json()).catch(err => log(err));

// 🎓 סטודנט — async/await + try
async function fetchUser() {
  try { return await fetch("/u").then(r => r.json()); }
  catch (e) { return null; }
}

// 👨‍💻 ג'וניור — Sentry integration
window.addEventListener("error", (e) => Sentry.captureException(e.error));
window.addEventListener("unhandledrejection", (e) => Sentry.captureException(e.reason));

// 🎩 פרופ׳ — react-error-boundary lib
import { ErrorBoundary } from "react-error-boundary";
<ErrorBoundary FallbackComponent={Fallback} onError={logError}>
  <App />
</ErrorBoundary>
```

---

## 40. Auth Methods — Session / JWT / OAuth (קושי 8)

### טבלה
| Method | מה זה | אחסון | יתרון | חיסרון |
|---|---|---|---|---|
| Session | server-side state + cookie ID | DB + httpOnly cookie | פשוט, revoke מיידי | server stateful |
| JWT | signed token עם claims | localStorage / httpOnly | stateless, scalable | לא יכול לrevoke מיידי |
| OAuth | delegated auth דרך 3rd party | provider-managed | "Login with Google" | מורכבות protocol |

### 6 רמות
**🧓 סבתא:** Session=מפתח לחדר. JWT=דרכון חתום. OAuth=ערב מהשכן.
**👶 ילד:** Session=שמור אצלי. JWT=שלך לקחת. OAuth=מישהו אחר מאשר.
**💂 חייל:** Session: server-side store+cookie. JWT: signed claims base64. OAuth: redirect flow.
**🎓 סטודנט:** Session for traditional. JWT for SPAs+APIs. OAuth for "Login with X".
**👨‍💻 ג'וניור:** httpOnly cookie tops localStorage for JWT (XSS protection).
**🎩 פרופ׳:** OAuth2 = authorization. OIDC = authentication on top. PKCE for SPAs.

```js
// 🧓 סבתא — session
app.post("/login", async (req, res) => {
  const user = await db.users.find({ email });
  req.session.userId = user.id;   // server stores
  res.cookie("sid", req.sessionID, { httpOnly: true });
});

// 👶 ילד — JWT
const token = jwt.sign({ userId: u.id }, SECRET, { expiresIn: "1h" });
res.cookie("token", token, { httpOnly: true, secure: true });

// 💂 חייל — JWT verify middleware
function auth(req, res, next) {
  try {
    req.user = jwt.verify(req.cookies.token, SECRET);
    next();
  } catch { res.status(401).end(); }
}

// 🎓 סטודנט — OAuth2 redirect
const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ID}&redirect_uri=${URI}&scope=email&response_type=code`;
res.redirect(url);

// 👨‍💻 ג'וניור — refresh + access tokens
const access = jwt.sign({ uid }, SECRET, { expiresIn: "15m" });
const refresh = crypto.randomBytes(32).toString("hex");
await db.refreshTokens.insert({ token: refresh, uid, expires: ... });

// 🎩 פרופ׳ — PKCE for SPAs
const verifier = base64url(crypto.randomBytes(32));
const challenge = base64url(sha256(verifier));
// /authorize?code_challenge=<challenge>&code_challenge_method=S256
```

---

✅ Diff 8 נסגר (39+2=41/95)

## 41. Auth Security — authentication / authorization / session / cookie / JWT (קושי 7)

### טבלה
| מושג | מה זה | בודק |
|---|---|---|
| authentication | מי אתה? (login) | זהות |
| authorization | מה אתה רשאי? (RBAC) | הרשאות |
| session | state שרת לactive user | מזהה דרך cookie |
| cookie | מחרוזת ב-browser | נשלחת אוטומטית |
| access token | JWT קצר-טווח | API requests |

### 6 רמות
**🧓 סבתא:** auth=מי. authz=מה מותר. session=זמן ההתחברות. cookie=מפתח. token=דרכון.
**👶 ילד:** מי אתה (auth) → ומה מותר לך (authz)? cookie + session = זוכר אותך.
**💂 חייל:** Login validates → server creates session OR issues JWT → client sends cookie/token per request.
**🎓 סטודנט:** RBAC: roles + permissions. ABAC: attribute-based.
**👨‍💻 ג'וניור:** middleware chain: cookieParse → session → authn → authz.
**🎩 פרופ׳:** OWASP A01 broken access control. principle of least privilege.

```js
// 🧓 סבתא
app.post("/login", auth.validate);  // authentication
app.delete("/posts/:id", auth.canDelete);  // authorization

// 👶 ילד — cookies
res.cookie("sid", id, { httpOnly: true, secure: true, sameSite: "strict" });

// 💂 חייל — session middleware
app.use(session({ secret: SECRET, store: new RedisStore() }));

// 🎓 סטודנט — RBAC
const can = (action, resource) => (req, res, next) => {
  if (req.user.permissions.includes(`${resource}:${action}`)) next();
  else res.status(403).end();
};
app.delete("/posts/:id", can("delete", "post"), handler);

// 👨‍💻 ג'וניור — JWT verify with rotation
const decoded = jwt.verify(token, getSigningKey(decoded.kid));

// 🎩 פרופ׳ — defense in depth
// Layer 1: WAF blocks injection
// Layer 2: rate-limit per IP+user
// Layer 3: middleware authn+authz
// Layer 4: row-level security ב-DB
```

---

## 42. Error Handling JS — try/catch/finally/throw/Error (קושי 7)

### טבלה
| Construct | מה עושה | מתי |
|---|---|---|
| try | מקיף קוד שעלול לזרוק | תמיד יחד עם catch או finally |
| catch | תופס שגיאה | אחרי try |
| finally | רץ תמיד (גם אם זרוק) | cleanup |
| throw | יוצר שגיאה | validation, unrecoverable |
| Error | base class | extend לcustom errors |

### 6 רמות
**🧓 סבתא:** try=נסה. catch=תפוס. finally=נקה. throw=זרוק. Error=סוג שגיאה.
**👶 ילד:** try לעבודה, catch אם נשבר, finally לסדר, throw אם בעיה גדולה.
**💂 חייל:** try-catch-finally בלוקים. throw expression מעלה. Error class יורש Stack trace.
**🎓 סטודנט:** Custom errors: `class ValidationError extends Error`. Always preserve stack.
**👨‍💻 ג'וניור:** Don't swallow errors. Always re-throw or log. Use specific error types.
**🎩 פרופ׳:** Error.captureStackTrace ב-V8. .cause property (ES2022) for error chaining.

```js
// 🧓 סבתא
try { JSON.parse(s); } catch (e) { console.log("שגיאה"); }

// 👶 ילד
try {
  return await fetch(url);
} catch (err) {
  return null;
} finally {
  setLoading(false);
}

// 💂 חייל — custom Error
class ValidationError extends Error {
  constructor(msg, field) {
    super(msg);
    this.name = "ValidationError";
    this.field = field;
  }
}
throw new ValidationError("Email invalid", "email");

// 🎓 סטודנט — error chaining (ES2022)
try {
  await db.query();
} catch (cause) {
  throw new Error("Failed to load user", { cause });
}

// 👨‍💻 ג'וניור — exhaustive
function handleAPI(err) {
  if (err instanceof ValidationError) return showFieldError(err.field);
  if (err.code === "NETWORK") return retry();
  Sentry.captureException(err);
  throw err;  // re-throw unknown
}

// 🎩 פרופ׳ — V8 stack
Error.captureStackTrace(myErr, MyClass);  // strips internal frames
```

---

## 43. Deep Copy — Shallow vs Deep (קושי 7)

### טבלה
| Method | רמת עומק | עוקב cycle? | תומך Date/Map/Set | Performance |
|---|---|---|---|---|
| `=` | reference | n/a | n/a | O(1) |
| `[...]` / `{...}` | shallow (1 level) | n/a | n/a | O(n) |
| `Object.assign({}, x)` | shallow | n/a | n/a | O(n) |
| `JSON.parse(JSON.stringify(x))` | deep | ❌ throws | ❌ loses Date | O(n × depth) |
| `structuredClone(x)` | deep | ✅ | ✅ | O(n × depth) |
| `_.cloneDeep` (lodash) | deep | ✅ | ✅ | O(n × depth) |

### 6 רמות
**🧓 סבתא:** shallow=רמה אחת. deep=הכל פנימה.
**👶 ילד:** קופסה חדשה אבל אותם צעצועים (shallow) או צעצועים חדשים (deep).
**💂 חייל:** spread/Object.assign = level 1. structuredClone = full deep.
**🎓 סטודנט:** structuredClone modern, supports Date/Map/Set/RegExp/Blob.
**👨‍💻 ג'וניור:** JSON trick fails on Date, RegExp, undefined, functions, cycles. Use structuredClone.
**🎩 פרופ׳:** HTML structured clone algorithm. handles Transferable objects.

```js
// 🧓 סבתא
const a = { x: 1 };
const b = a;             // ❌ same reference
const c = { ...a };      // ✅ new object

// 👶 ילד — shallow trap
const orig = { items: [1,2,3] };
const shallow = { ...orig };
shallow.items.push(4);
orig.items;              // [1,2,3,4] ⚠️ shared!

// 💂 חייל — JSON trick
const deep = JSON.parse(JSON.stringify(orig));
deep.items.push(5);
orig.items;              // [1,2,3,4] ✅ unchanged

// 🎓 סטודנט — JSON loses
const obj = { date: new Date(), regex: /x/, fn: () => {} };
const ghost = JSON.parse(JSON.stringify(obj));
ghost.date;              // string!  fn missing
ghost.regex;             // {} empty!

// 👨‍💻 ג'וניור — structuredClone
const safe = structuredClone(obj);
safe.date instanceof Date;  // ✅ true
safe.regex instanceof RegExp; // ✅ true

// 🎩 פרופ׳ — circular references
const cyc = {}; cyc.self = cyc;
JSON.stringify(cyc);     // ❌ TypeError
structuredClone(cyc);    // ✅ works
```

---

## 44. Form Control — Controlled / Uncontrolled (קושי 7)

### טבלה
| Aspect | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM |
| `value` prop | set explicitly | not set (or `defaultValue`) |
| `onChange` | required | optional |
| Re-render on input | every keystroke | none |
| Reset programmatically | `setState("")` | `ref.current.value = ""` |
| Validation | on each change | on submit |

### 6 רמות
**🧓 סבתא:** controlled=React שולט. uncontrolled=DOM שולט.
**👶 ילד:** מי שומר את הערך — React (controlled) או הקופסה עצמה (uncontrolled).
**💂 חייל:** controlled needs value+onChange. uncontrolled uses ref.
**🎓 סטודנט:** Default to controlled. Uncontrolled for performance (huge forms) or DOM-only.
**👨‍💻 ג'וניור:** Controlled = "single source of truth". Pattern: form library (react-hook-form).
**🎩 פרופ׳:** React Synthetic Events. value coerced to string.

```jsx
// 🧓 סבתא — controlled
function Form() {
  const [name, setName] = useState("");
  return <input value={name} onChange={e => setName(e.target.value)} />;
}

// 👶 ילד — uncontrolled
function Form() {
  const ref = useRef();
  return <input ref={ref} defaultValue="initial" />;
}

// 💂 חייל — controlled with validation
function Form() {
  const [email, setEmail] = useState("");
  const valid = /^.+@.+\..+$/.test(email);
  return (
    <>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {!valid && <span>אימייל לא תקין</span>}
    </>
  );
}

// 🎓 סטודנט — uncontrolled submit
function Form() {
  const ref = useRef();
  return (
    <form onSubmit={e => { e.preventDefault(); save(ref.current.value); }}>
      <input ref={ref} />
    </form>
  );
}

// 👨‍💻 ג'וניור — react-hook-form (uncontrolled internally, easy DX)
const { register, handleSubmit, formState: { errors } } = useForm();
<input {...register("email", { required: true })} />

// 🎩 פרופ׳ — performance for huge forms
// Each controlled input → re-render of form. Use uncontrolled or split state.
```

---

## 45. Composition Patterns — children / render prop / slot (קושי 7)

### טבלה
| Pattern | תחביר | יתרון | חיסרון |
|---|---|---|---|
| children prop | `<X>{stuff}</X>` | פשוט | רק 1 slot |
| render prop | `<X render={() => ...} />` | מאפשר state passing | ferbose |
| slots (named) | `<X header={...} body={...} />` | מולטי-slot ברור | TypeScript boilerplate |
| compound components | `<Tabs><Tab/></Tabs>` | API טבעי | implicit context |

### 6 רמות
**🧓 סבתא:** children=ילדים פתוחים. render prop=פונקציה שמייצרת תוכן.
**👶 ילד:** איך מכניסים ילדים לקופסה.
**💂 חייל:** children=ReactNode. render prop= function returning JSX.
**🎓 סטודנט:** Use children for simple. Render prop for state-injecting wrappers (Mouse, Form).
**👨‍💻 ג'וניור:** Compound components > render props (better DX with React Context).
**🎩 פרופ׳:** React.cloneElement, useContext for compound state sharing.

```jsx
// 🧓 סבתא — children
<Card>
  <h1>טל</h1>
  <p>30</p>
</Card>

// 👶 ילד — named slots
<Layout
  header={<Logo />}
  sidebar={<Nav />}
  main={<Content />}
/>

// 💂 חייל — render prop
<Mouse render={({ x, y }) => <p>{x}, {y}</p>} />

// 🎓 סטודנט — compound components
<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanel>First</TabPanel>
  <TabPanel>Second</TabPanel>
</Tabs>

// 👨‍💻 ג'וניור — context-based compound
const TabsContext = createContext();
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return <TabsContext.Provider value={{active, setActive}}>{children}</TabsContext.Provider>;
}
function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext);
  return <button onClick={() => setActive(index)} aria-selected={active===index}>{children}</button>;
}

// 🎩 פרופ׳ — slots in TypeScript
type Slots = { header: ReactNode; main: ReactNode; footer?: ReactNode };
function Layout(props: Slots) { ... }
```

---

## 46. TS Utility Types — Partial/Required/Omit/Pick (קושי 7)

### טבלה
| Utility | מה עושה | דוגמה |
|---|---|---|
| `Partial<T>` | כל השדות אופציונליים | `Partial<User>` → `{name?, age?}` |
| `Required<T>` | כל השדות חובה | `Required<{a?:n}>` → `{a:n}` |
| `Pick<T,K>` | בוחר שדות | `Pick<User, "id"\|"name">` |
| `Omit<T,K>` | מסיר שדות | `Omit<User, "password">` |
| `Readonly<T>` | freeze | `Readonly<User>` |
| `Record<K,V>` | מחרוזת מפתחות | `Record<string, number>` |

### 6 רמות
**🧓 סבתא:** Partial=הכל אופציה. Pick=בחר. Omit=הסר. Readonly=נעול.
**👶 ילד:** כלים להפוך type אחד לאחר.
**💂 חייל:** generic utility types, TS built-in, compose-able.
**🎓 סטודנט:** Common: `Partial<User>` for PATCH update. `Omit<User, "password">` for public.
**👨‍💻 ג'וניור:** combine: `Pick<Required<Partial<User>>, "id">`. עדיף לפצל לnames נקיים.
**🎩 פרופ׳:** mapped types underlying these. `Partial<T> = { [P in keyof T]?: T[P] }`.

```ts
// 🧓 סבתא
interface User { id: number; name: string; email: string; }
type UpdateUser = Partial<User>;        // כל השדות ?

// 👶 ילד
type PublicUser = Omit<User, "email">;  // ללא email

// 💂 חייל
type UserSummary = Pick<User, "id" | "name">;

// 🎓 סטודנט
type RequiredUser = Required<UpdateUser>;  // הכל חובה שוב
type FrozenUser = Readonly<User>;          // לא מאפשר שינוי

// 👨‍💻 ג'וניור — Record
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
const perms: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// 🎩 פרופ׳ — mapped type internals
type MyPartial<T> = { [P in keyof T]?: T[P] };
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };
```

---

## 47. Cookie Flags — httpOnly / Secure / SameSite (קושי 7)

### טבלה
| Flag | מה עושה | חוסם |
|---|---|---|
| httpOnly | JS לא יכול לקרוא | XSS cookie theft |
| Secure | רק על HTTPS | sniff על HTTP |
| SameSite=Strict | רק אותו origin | CSRF (אגרסיבי) |
| SameSite=Lax | top-level cross-site GET | CSRF (סביר) |
| SameSite=None+Secure | cross-site מותר | nothing (open) |
| Path / Domain | מגביל scope | הצטמצמות |

### 6 רמות
**🧓 סבתא:** httpOnly=סוד מהjs. Secure=רק https. SameSite=מגביל cross-site.
**👶 ילד:** הגנות על cookies מפני גנבים.
**💂 חייל:** XSS protection (httpOnly), MITM (Secure), CSRF (SameSite).
**🎓 סטודנט:** Modern: httpOnly + Secure + SameSite=Lax (default 2020+).
**👨‍💻 ג'וניור:** Domain only-if-needed. __Host- prefix for strictest.
**🎩 פרופ׳:** Cookie prefixes (__Host-, __Secure-) bind to constraints. cookie partitioning.

```js
// 🧓 סבתא — חובה
res.cookie("sid", id, { httpOnly: true, secure: true });

// 👶 ילד — protection layers
res.cookie("sid", id, {
  httpOnly: true,    // XSS
  secure: true,      // HTTPS only
  sameSite: "lax"    // CSRF
});

// 💂 חייל — strict
res.cookie("admin_token", t, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/admin"
});

// 🎓 סטודנט — SameSite=None for cross-site
// (e.g., embedding payment widget)
res.cookie("session", id, {
  httpOnly: true,
  secure: true,
  sameSite: "none"   // ⚠️ requires Secure
});

// 👨‍💻 ג'וניור — __Host- prefix
res.cookie("__Host-sid", id, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
  // __Host- forces: Secure, Path=/, no Domain
});

// 🎩 פרופ׳ — CHIPS partitioning (2024+)
res.cookie("third_party", v, {
  partitioned: true   // partitioned per top-level site
});
```

---

## 48. Token Lifecycle — Refresh ↔ Access (קושי 7)

### טבלה
| Token | תוקף | אחסון | שימוש |
|---|---|---|---|
| Access | קצר (15min) | memory / httpOnly | API requests |
| Refresh | ארוך (7-30d) | httpOnly cookie | להחליף access expired |

### 6 רמות
**🧓 סבתא:** access=מפתח-מהיר. refresh=מפתח-להחליף.
**👶 ילד:** access נגמר מהר. refresh נשאר חודש כדי להוציא access חדש.
**💂 חייל:** access ב-Authorization header. refresh ב-httpOnly cookie. POST /refresh.
**🎓 סטודנט:** access expires → 401 → frontend POST /refresh → new access. seamless UX.
**👨‍💻 ג'וניור:** rotate refresh on use (defense). Revoke list ב-DB.
**🎩 פרופ׳:** sliding session. token reuse detection (compromise indicator).

```js
// 🧓 סבתא — login response
res.json({ access: jwt.sign({uid}, S, {expiresIn: "15m"}) });
res.cookie("refresh", randomToken, { httpOnly: true, maxAge: 7*24*60*60*1000 });

// 👶 ילד — frontend retry
async function api(path) {
  let r = await fetch(path, { headers: { Authorization: `Bearer ${access}` } });
  if (r.status === 401) {
    access = await refresh();
    r = await fetch(path, { headers: { Authorization: `Bearer ${access}` } });
  }
  return r.json();
}

// 💂 חייל — server refresh endpoint
app.post("/refresh", async (req, res) => {
  const t = req.cookies.refresh;
  const stored = await db.refreshTokens.find({ token: t, revoked: false });
  if (!stored) return res.status(401).end();
  const access = jwt.sign({ uid: stored.uid }, SECRET, { expiresIn: "15m" });
  res.json({ access });
});

// 🎓 סטודנט — rotate refresh
app.post("/refresh", async (req, res) => {
  const old = req.cookies.refresh;
  await db.refreshTokens.update({ token: old }, { revoked: true });
  const newToken = randomBytes(32);
  await db.refreshTokens.insert({ token: newToken, uid });
  res.cookie("refresh", newToken, { httpOnly: true });
  res.json({ access });
});

// 👨‍💻 ג'וניור — reuse detection
app.post("/refresh", async (req, res) => {
  const stored = await db.find({ token: req.cookies.refresh });
  if (stored.revoked) {
    // STOLEN! revoke all of user's tokens
    await db.updateMany({ uid: stored.uid }, { revoked: true });
    return res.status(401).end();
  }
  ...
});

// 🎩 פרופ׳ — RFC 6749 OAuth2 Token Endpoint
// grant_type=refresh_token, refresh_token=<value>
// 200 → new access + (optionally) new refresh
```

---

## 49. Git Merge ↔ Rebase (קושי 7)

### טבלה
| Operation | היסטוריה | conflicts | טוב ל... |
|---|---|---|---|
| merge | non-linear (merge commit) | 1 פעם | shared branches |
| rebase | linear (re-applied) | פר commit | feature branch לפני merge |
| squash merge | 1 commit על main | merge-time | PR cleanup |
| rebase -i | לערוך commits | פר commit | ניקוי לפני push |

### 6 רמות
**🧓 סבתא:** merge=מאחד עם תיעוד. rebase=מעביר את העבודה למיקום חדש.
**👶 ילד:** merge=שילוב עם אבן זיכרון. rebase=העתק-הדבק על קוד חדש.
**💂 חייל:** merge creates merge commit. rebase rewrites history (don't push to shared).
**🎓 סטודנט:** Pull request = merge. Local feature work = rebase before merge.
**👨‍💻 ג'וניור:** Never rebase shared history. Use --force-with-lease (not --force).
**🎩 פרופ׳:** rebase walks commits, applies cherry-pick-style. interactive: edit/squash/fixup.

```bash
# 🧓 סבתא — merge
git checkout main
git merge feature-branch    # יוצר merge commit

# 👶 ילד — rebase
git checkout feature
git rebase main             # מעביר commits לראש main

# 💂 חייל — squash on PR merge
git checkout main
git merge --squash feature
git commit -m "feat: add X"  # 1 commit נקי

# 🎓 סטודנט — interactive rebase
git rebase -i HEAD~3
# pick → squash/fixup/edit/drop

# 👨‍💻 ג'וניור — safe force push after rebase
git push --force-with-lease  # ✅ נכשל אם מישהו push בינתיים
# git push --force            # ❌ דורס בלי בדיקה

# 🎩 פרופ׳ — autosquash
git commit --fixup=<hash>
git rebase -i --autosquash HEAD~5  # מסדר fixup commits אוטומטית
```

---

## 50. Mutability Patterns — Mutable / Immutable (קושי 7)

### טבלה
| Pattern | מה עושה | יתרון | חיסרון |
|---|---|---|---|
| direct mutation | `arr.push(x)` | מהיר | breaks React shallow |
| spread + new | `[...arr, x]` | bezopásan | O(n) clone |
| immer | `produce(arr, draft => draft.push(x))` | mutate-DX with immutability | dependency |
| structural sharing | persistent data structures | מהיר + immutable | מורכבות |

### 6 רמות
**🧓 סבתא:** mutable=שינוי במקום. immutable=יוצר חדש.
**👶 ילד:** או שאתה משנה את המערך, או יוצר חדש שדומה.
**💂 חייל:** React/Redux דורש immutable. Map/filter/concat = immutable. push/splice/sort = mutable.
**🎓 סטודנט:** immer = מאפשר mutable-style code, מייצר immutable מתחת.
**👨‍💻 ג'וניור:** Object.freeze בdev for safety. structural sharing למבני-נתונים גדולים.
**🎩 פרופ׳:** persistent data structures (immutable.js). Hash Array Mapped Tries.

```js
// 🧓 סבתא
arr.push(x);                  // mutable
const next = [...arr, x];     // immutable

// 👶 ילד — React state
// ❌ mutation
setState(state => { state.arr.push(x); return state; });
// ✅ immutable
setState(state => ({ ...state, arr: [...state.arr, x] }));

// 💂 חייל — nested update
setState(state => ({
  ...state,
  user: { ...state.user, address: { ...state.user.address, city: "TLV" } }
}));

// 🎓 סטודנט — immer
import produce from "immer";
const next = produce(state, draft => {
  draft.user.address.city = "TLV";   // mutates draft, returns immutable
});

// 👨‍💻 ג'וניור — Object.freeze ב-dev
if (process.env.NODE_ENV === "development") {
  Object.freeze(state);   // throws if mutated
}

// 🎩 פרופ׳ — persistent data structures
import { Map } from "immutable";
const m1 = Map({ a: 1, b: 2 });
const m2 = m1.set("a", 99);   // m2 shares unchanged keys via tree
```

---

## 51. JSX & React Rendering (קושי 7)

### טבלה
| Concept | מה זה |
|---|---|
| JSX | תחביר של HTML-בJS, מתורגם ל-`React.createElement` |
| rendering | תהליך שבונה DOM מ-React tree |
| Virtual DOM | ייצוג in-memory של ה-DOM הצפוי |
| ReactDOM.render | API legacy (React <18) |
| createRoot | API חדש (React 18+) — concurrent |
| Reconciliation | אלגוריתם diff בין virtual trees |

### 6 רמות
**🧓 סבתא:** JSX=HTML בקוד. רינדור=הופך אותו לDOM אמיתי.
**👶 ילד:** JSX זה איך כותבים מה תראה הכיתה. React מצייר את זה.
**💂 חייל:** JSX → babel/swc → React.createElement(type, props, children).
**🎓 סטודנט:** Virtual DOM diff → minimal real DOM ops. Reconciliation O(n).
**👨‍💻 ג'וניור:** React 18 createRoot → concurrent rendering, automatic batching.
**🎩 פרופ׳:** Fiber architecture. work-loop slices. Suspense boundary streaming.

```jsx
// 🧓 סבתא — JSX
<div className="card">
  <h1>טל</h1>
</div>

// 👶 ילד — JSX → createElement (under the hood)
React.createElement("div", { className: "card" },
  React.createElement("h1", null, "טל")
);

// 💂 חייל — entry point (React 18+)
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("app"));
root.render(<App />);

// 🎓 סטודנט — hydration (SSR)
import { hydrateRoot } from "react-dom/client";
hydrateRoot(document.getElementById("app"), <App />);

// 👨‍💻 ג'וניור — concurrent features
import { startTransition } from "react";
startTransition(() => {
  setSearchResults(heavyFilter(query));   // marked low-priority
});

// 🎩 פרופ׳ — Suspense streaming
<Suspense fallback={<Spinner />}>
  <SlowDataComponent />
</Suspense>
// React streams HTML chunks as <SlowDataComponent> resolves
```

---

✅ Diff 7 הושלם (41+11=52/95)

## 52. Array Methods — map / filter / reduce / forEach / find / sort (קושי 6)

| Method | מחזיר | משנה original? | callback returns |
|---|---|---|---|
| `map` | array באותו אורך | ❌ | transformed value |
| `filter` | array אולי קצר | ❌ | boolean (keep?) |
| `reduce` | accumulator | ❌ | next acc |
| `forEach` | undefined | ❌ | (ignored) |
| `find` | first match או undefined | ❌ | boolean |
| `sort` | אותו array (mutated!) | ✅ | -1/0/+1 |

**🧓 סבתא:** map=הופך כל איבר. filter=שומר רק חלק. reduce=מסכם. forEach=פעולה. find=ראשון. sort=ממיין.
**👶 ילד:** מתודות שעושות פעולות על מערך — חלק יוצרים חדש, חלק משנים.
**💂 חייל:** map/filter/reduce שומרים על immutability. forEach לבעלי-side-effects. sort=mutates!
**🎓 סטודנט:** chain: `.filter().map().reduce()`. בreact חובה immutable.
**👨‍💻 ג'וניור:** `[...arr].sort()` תמיד — אחרת מוטציה. reduce כללי, map/filter פסבדו-קוד.
**🎩 פרופ׳:** V8 has fast-paths for map/filter/forEach on PACKED arrays.

```js
// 🧓 סבתא
[1,2,3].map(n => n*2);           // [2,4,6]
[1,2,3].filter(n => n>1);        // [2,3]
[1,2,3].reduce((s,n) => s+n, 0); // 6
[1,2,3].forEach(n => console.log(n));
[{id:1},{id:2}].find(x => x.id===2);  // {id:2}
[3,1,2].sort();                  // [1,2,3] — also mutates!
```

---

## 53. Databases — MongoDB / PostgreSQL / SQL / NoSQL (קושי 6)

| DB | סוג | סכמה | join | scaling |
|---|---|---|---|---|
| PostgreSQL | SQL | קשיחה | native | vertical |
| MongoDB | NoSQL document | גמישה | aggregate $lookup | horizontal sharding |
| MySQL | SQL | קשיחה | native | vertical |
| Redis | KV in-memory | ללא | ❌ | replication |
| DynamoDB | NoSQL KV/document | חלקית | ❌ | horizontal |

**🧓 סבתא:** SQL=טבלאות מסודרות. NoSQL=מסמכים גמישים.
**👶 ילד:** SQL כמו אקסל מקושר. NoSQL כמו תיקיות עם דוקומנטים.
**💂 חייל:** PG=relational, transactional. Mongo=document, scales horizontal.
**🎓 סטודנט:** PG for ACID-critical. Mongo for nested docs + rapid iteration.
**👨‍💻 ג'וניור:** PG default 95% מהמקרים. Mongo כשהschema באמת flexible.
**🎩 פרופ׳:** OLTP vs OLAP. CAP theorem. eventual consistency.

```js
// 🧓 סבתא — Mongo
await db.users.insertOne({ name: "Tal", tags: ["dev"] });

// 👶 ילד — PG
await db.query("INSERT INTO users (name) VALUES ($1)", ["Tal"]);

// 💂 חייל — Mongo nested
await db.users.findOne({ "address.city": "TLV" });

// 🎓 סטודנט — PG join
await db.query(`SELECT u.*, p.title FROM users u LEFT JOIN posts p ON p.user_id = u.id`);

// 👨‍💻 ג'וניור — Mongo aggregate
await db.posts.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } }
]);

// 🎩 פרופ׳ — JSONB ב-PG
await db.query(`SELECT * FROM events WHERE data->>'type' = 'click'`);
```

---

## 54. DOM Traversal — child / parent / sibling (קושי 6)

| Property | מה מחזיר |
|---|---|
| `children` | HTMLCollection of elements |
| `childNodes` | NodeList כולל text nodes |
| `firstChild` / `lastChild` | כולל text nodes |
| `firstElementChild` / `lastElementChild` | רק elements |
| `parentNode` / `parentElement` | אב |
| `nextSibling` / `previousSibling` | אח (כולל text) |
| `nextElementSibling` / `previousElementSibling` | אח element בלבד |

**🧓 סבתא:** דרכים לנווט בעץ DOM — למעלה, למטה, לצדדים.
**👶 ילד:** ילדים, הורים, אחים — כמו עץ משפחה.
**💂 חייל:** Element navigators (Element*) skip text nodes. Node navigators include them.
**🎓 סטודנט:** ב-React לעולם לא צריך — DOM הוא רק מהrender.
**👨‍💻 ג'וניור:** vanilla projects: prefer querySelector + closest over manual traversal.
**🎩 פרופ׳:** Live HTMLCollection vs static NodeList. recompute concerns.

```js
// 🧓 סבתא
elem.children;            // HTMLCollection (live!)
elem.firstChild;          // אולי TEXT!
elem.firstElementChild;   // תמיד element

// 👶 ילד
elem.parentElement;       // למעלה
elem.nextElementSibling;  // אח הבא

// 💂 חייל
elem.closest("li");       // מעלה עד li קרוב

// 🎓 סטודנט — React component children
function Card({ children }) { return <div>{children}</div>; }

// 👨‍💻 ג'וניור — DocumentFragment for batch
const frag = document.createDocumentFragment();
items.forEach(i => frag.appendChild(makeItem(i)));
list.appendChild(frag);   // 1 reflow

// 🎩 פרופ׳ — TreeWalker for traversal
const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
while (walker.nextNode()) { ... }
```

---

## 55. DOM Events Cluster (קושי 6)

| Phase | סדר | use |
|---|---|---|
| capture | top→target | rare |
| target | על האלמנט | most listeners |
| bubble | target→top | event delegation |

**🧓 סבתא:** אירוע יורד ועולה דרך העץ.
**👶 ילד:** click על כפתור עובר גם להורה ולסבא.
**💂 חייל:** addEventListener(type, fn, useCapture=false). 3 phases.
**🎓 סטודנט:** Delegation: 1 listener על parent + matches ב-target.
**👨‍💻 ג'וניור:** preventDefault עובד ב-passive false בלבד. once: true למניעה.
**🎩 פרופ׳:** Synthetic events ב-React (pre-18 pooled, 18+ no pooling).

```js
// 🧓 סבתא
btn.addEventListener("click", () => alert("hi"));

// 👶 ילד
btn.addEventListener("click", e => {
  e.stopPropagation();   // לא יעלה להורה
});

// 💂 חייל — delegation
list.addEventListener("click", e => {
  const li = e.target.closest("li");
  if (li) selectItem(li.dataset.id);
});

// 🎓 סטודנט — React onClick
<button onClick={(e) => { e.preventDefault(); save(); }}>שלח</button>

// 👨‍💻 ג'וניור — once + passive
btn.addEventListener("click", once, { once: true });
window.addEventListener("scroll", h, { passive: true });

// 🎩 פרופ׳ — AbortController
const ctrl = new AbortController();
btn.addEventListener("click", h, { signal: ctrl.signal });
ctrl.abort();   // removes listener
```

---

## 56. React Router — Link / NavLink / Route / useNavigate (קושי 6)

| API | תפקיד |
|---|---|
| `<BrowserRouter>` | wrapper על ה-app |
| `<Routes>` `<Route path>` | route definition |
| `<Link to>` | navigation מבלי reload |
| `<NavLink>` | Link + active class |
| `useNavigate()` | programmatic navigation |
| `useParams()` | קריאת `:id` |
| `useLocation()` | URL info |
| `<Outlet/>` | nested route placeholder |

**🧓 סבתא:** ניווט בלי לטעון מחדש. Link במקום `<a>`.
**👶 ילד:** /home, /about, /user/5 — דפים שונים בלי refresh.
**💂 חייל:** SPA routing. URL → component mapping.
**🎓 סטודנט:** nested routes + Outlet. layout patterns.
**👨‍💻 ג'וניור:** loader/action (v6.4+) for data. lazy import per route.
**🎩 פרופ׳:** History API pushState. Suspense boundaries per route.

```jsx
// 🧓 סבתא
<BrowserRouter>
  <Link to="/about">About</Link>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
  </Routes>
</BrowserRouter>

// 👶 ילד — useParams
<Route path="/user/:id" element={<User/>} />
function User() {
  const { id } = useParams();
  return <p>{id}</p>;
}

// 💂 חייל — useNavigate
const nav = useNavigate();
<button onClick={() => nav("/home")}>חזור</button>

// 🎓 סטודנט — nested + Outlet
<Route path="/dashboard" element={<DashboardLayout/>}>
  <Route index element={<Overview/>} />
  <Route path="settings" element={<Settings/>} />
</Route>

// 👨‍💻 ג'וניור — loader (v6.4+)
const router = createBrowserRouter([{
  path: "/users/:id",
  loader: ({ params }) => fetchUser(params.id),
  element: <User/>
}]);

// 🎩 פרופ׳ — lazy + Suspense
<Route path="/admin" element={
  <Suspense fallback={<Spinner/>}>
    {React.lazy(() => import("./Admin"))()}
  </Suspense>
}/>
```

---

## 57. Timers — setTimeout / setInterval / requestAnimationFrame (קושי 6)

| Timer | timing | use |
|---|---|---|
| setTimeout | once after N ms | delayed action |
| setInterval | every N ms | polling |
| requestAnimationFrame | before next paint | smooth animations |
| queueMicrotask | next microtask | high-priority |

**🧓 סבתא:** setTimeout=פעם 1. setInterval=שוב ושוב. rAF=לאנימציות.
**👶 ילד:** טיימר חד-פעמי, חוזר, או לאנימציה חלקה.
**💂 חייל:** clearTimeout/clearInterval mandatory. rAF gives ~60fps.
**🎓 סטודנט:** rAF runs before paint, optimal for animations.
**👨‍💻 ג'וניור:** setInterval drift over time — prefer setTimeout recursive.
**🎩 פרופ׳:** rAF skips when tab hidden. Performance budget per frame ~16ms.

```js
// 🧓 סבתא
setTimeout(() => alert("hi"), 1000);

// 👶 ילד
const id = setInterval(tick, 1000);
clearInterval(id);

// 💂 חייל — recursive better than setInterval
function poll() {
  doWork();
  setTimeout(poll, 1000);  // no drift
}

// 🎓 סטודנט — rAF animation
function animate() {
  if (running) {
    update();
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);

// 👨‍💻 ג'וניור — debounce with setTimeout
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// 🎩 פרופ׳ — high-priority via microtask
queueMicrotask(() => urgent());
// runs before next macrotask, after current sync
```

---

## 58. HTTP Clients — fetch / XHR / axios (קושי 6)

| Client | API | Promise | features |
|---|---|---|---|
| XMLHttpRequest | callback-based | ❌ | legacy, file upload progress |
| fetch | Promise | ✅ | modern, no abort built-in |
| axios | Promise | ✅ | interceptors, transformers |

**🧓 סבתא:** fetch=בסיס. axios=נוחות. XHR=ישן.
**👶 ילד:** דרכים לדבר עם השרת.
**💂 חייל:** fetch ES2015. axios npm. XHR pre-2010.
**🎓 סטודנט:** fetch לא תופס 4xx/5xx as error! check response.ok.
**👨‍💻 ג'וניור:** AbortController + fetch ל-cancel.
**🎩 פרופ׳:** fetch streams response. Service Worker intercepts.

```js
// 🧓 סבתא
fetch("/api").then(r => r.json()).then(data => ...);

// 👶 ילד — async/await
const r = await fetch("/api");
const data = await r.json();

// 💂 חייל — error handling
const r = await fetch("/api");
if (!r.ok) throw new Error(`${r.status}`);
const data = await r.json();

// 🎓 סטודנט — POST + cancel
const ctrl = new AbortController();
fetch("/api", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
  signal: ctrl.signal
});
ctrl.abort();   // cancels

// 👨‍💻 ג'וניור — axios with interceptors
axios.interceptors.request.use(c => {
  c.headers.Authorization = `Bearer ${token}`;
  return c;
});

// 🎩 פרופ׳ — streaming response
const r = await fetch("/large.json");
const reader = r.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  processChunk(value);
}
```

---

## 59. Express Routing & Handlers (קושי 6)

| API | מה |
|---|---|
| `app.use(mw)` | global middleware |
| `app.get(path, h)` | GET route |
| `app.post/put/delete/patch` | other methods |
| `app.route(path).get().post()` | chain on path |
| `next()` | pass to next middleware |
| `next(err)` | pass error |
| `app.use(errorHandler)` | error middleware (4 args) |

**🧓 סבתא:** middleware רץ לפני handler.
**👶 ילד:** שרשרת של פונקציות — כל אחת יכולה לעצור או להמשיך.
**💂 חייל:** order matters. global → route → error.
**🎓 סטודנט:** Router instance per resource. mount with app.use("/api", router).
**👨‍💻 ג'וניור:** async handlers + try/catch. error handler 4 args.
**🎩 פרופ׳:** middleware composition. async-error patterns. helmet/cors order.

```js
// 🧓 סבתא
app.get("/users", (req, res) => res.json(users));

// 👶 ילד — middleware
app.use((req, res, next) => { console.log(req.url); next(); });

// 💂 חייל — chain
app.use(express.json());
app.use(cors());
app.get("/users", auth, getUsers);

// 🎓 סטודנט — Router
const router = express.Router();
router.get("/", listUsers).post("/", createUser);
app.use("/api/users", router);

// 👨‍💻 ג'וניור — async wrapper
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get("/u", asyncHandler(async (req, res) => res.json(await db.users.find())));

// 🎩 פרופ׳ — error middleware (4 args!)
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) return res.status(400).json(err);
  Sentry.captureException(err);
  res.status(500).json({ error: "server" });
});
```

---

## 60. Mongo Find Queries (קושי 6)

| Method | מחזיר |
|---|---|
| `find(filter)` | cursor (multiple) |
| `findOne(filter)` | document או null |
| `findById(id)` | by `_id` |
| `findOneAndUpdate(filter, update, opts)` | atomic update + return |

**🧓 סבתא:** find=הרבה. findOne=אחד. findById=לפי id.
**👶 ילד:** דרכים לחפש במסד הנתונים.
**💂 חייל:** find לא executes עד `.toArray()` או iteration.
**🎓 סטודנט:** projection: `find({}, { name: 1, _id: 0 })`.
**👨‍💻 ג'וניור:** findOneAndUpdate atomic — race-condition safe.
**🎩 פרופ׳:** indexes critical for find perf. covered queries.

```js
// 🧓 סבתא
const users = await User.find({ active: true });

// 👶 ילד
const u = await User.findOne({ email });
const u2 = await User.findById(id);

// 💂 חייל — projection
const slim = await User.find({}, "name email");

// 🎓 סטודנט — atomic
const updated = await User.findOneAndUpdate(
  { email },
  { $inc: { loginCount: 1 } },
  { new: true }   // return updated doc
);

// 👨‍💻 ג'וניור — pagination
const page = await User.find().skip(20).limit(10).sort({ createdAt: -1 });

// 🎩 פרופ׳ — explain
const plan = await User.find({ email }).explain("executionStats");
// inspect indexUsed, totalDocsExamined
```

---

## 61. Mongo Operators — $set / $push / $pull / $inc (קושי 6)

| Operator | פעולה |
|---|---|
| `$set` | קבע ערך |
| `$unset` | מחק שדה |
| `$inc` | הוסף למספר |
| `$push` | הוסף למערך |
| `$addToSet` | $push בלי כפילויות |
| `$pull` | הסר ממערך |
| `$pop` | הסר מסוף |

**🧓 סבתא:** פעולות שינוי על שדות.
**👶 ילד:** דרכים לשנות ערכים בDB.
**💂 חייל:** atomic per-document. nested via dot notation.
**🎓 סטודנט:** `$inc: -1` לreduce. `$push` עם `$each` ל-bulk.
**👨‍💻 ג'וניור:** array filters: `{$set: {"items.$[i].x":1}}, {arrayFilters:[{"i.id":x}]}`.
**🎩 פרופ׳:** atomic update operators thread-safe under WiredTiger.

```js
// 🧓 סבתא
await User.updateOne({ email }, { $set: { active: true } });

// 👶 ילד
await User.updateOne({ _id }, { $inc: { points: 10 } });

// 💂 חייל
await Cart.updateOne({ uid }, { $push: { items: { id: 5 } } });

// 🎓 סטודנט
await Cart.updateOne({ uid }, { $pull: { items: { id: 5 } } });

// 👨‍💻 ג'וניור — addToSet (no dups)
await User.updateOne({ _id }, { $addToSet: { tags: "premium" } });

// 🎩 פרופ׳ — array filters
await Posts.updateOne(
  { _id },
  { $set: { "comments.$[c].flagged": true } },
  { arrayFilters: [{ "c.userId": badUserId }] }
);
```

---

## 62. Component Kinds — Function / Class / HOC (קושי 6)

| Kind | תחביר | hooks? | this? |
|---|---|---|---|
| Function | `function X() {return JSX}` | ✅ | ❌ |
| Class | `class X extends Component {render() {}}` | ❌ | ✅ |
| HOC | `withX(Component)` | depends | depends |

**🧓 סבתא:** function=מודרני. class=ישן. HOC=עוטף.
**👶 ילד:** דרכים שונות לכתוב קומפוננטה.
**💂 חייל:** Function + hooks = standard 2026. Class only in legacy.
**🎓 סטודנט:** HOC adds features. Render props more flexible.
**👨‍💻 ג'וניור:** Migrate Class → Function. extract HOC logic to hooks.
**🎩 פרופ׳:** Hooks rules of fiber. Class instances vs function-call closure.

```jsx
// 🧓 סבתא — function
function Card({ title }) { return <h1>{title}</h1>; }

// 👶 ילד — class (legacy)
class Card extends React.Component {
  render() { return <h1>{this.props.title}</h1>; }
}

// 💂 חייל — HOC
function withAuth(Comp) {
  return function(props) {
    const user = useAuth();
    return user ? <Comp {...props} user={user}/> : <Login/>;
  };
}
const Protected = withAuth(Dashboard);

// 🎓 סטודנט — class with state
class Counter extends Component {
  state = { n: 0 };
  inc = () => this.setState(p => ({ n: p.n+1 }));
  render() { return <button onClick={this.inc}>{this.state.n}</button>; }
}

// 👨‍💻 ג'וניור — convert HOC → custom hook
function useAuthGuard() {
  const user = useAuth();
  if (!user) throw new Error("Not authenticated");
  return user;
}

// 🎩 פרופ׳ — forwardRef + memo
const Btn = React.memo(React.forwardRef((props, ref) => (
  <button ref={ref} {...props}/>
)));
```

---

## 63. TS const / enum / literal (קושי 6)

| Tool | תוצר | use |
|---|---|---|
| `enum` | type + runtime object | named constants |
| `const enum` | inline (no runtime) | constants only |
| `as const` | literal type narrowing | tuple/object literals |
| literal union | `"a" \| "b"` type-only | finite values |

**🧓 סבתא:** enum=שמות לקבועים. as const=טיפוס מדויק.
**👶 ילד:** דרכים לתאר קבוצה סגורה של ערכים.
**💂 חייל:** enum runtime cost. const enum compile-only.
**🎓 סטודנט:** modern preference: literal unions + as const.
**👨‍💻 ג'וניור:** enum legacy. const assertion preferred 2024+.
**🎩 פרופ׳:** const enum performance. erasable types proposal.

```ts
// 🧓 סבתא — enum
enum Status { Active, Inactive }
const u = { status: Status.Active };

// 👶 ילד — string enum
enum Role { Admin = "admin", User = "user" }

// 💂 חייל — literal union
type Status = "active" | "inactive";

// 🎓 סטודנט — as const
const STATUSES = ["active", "inactive"] as const;
type Status = typeof STATUSES[number];   // "active" | "inactive"

// 👨‍💻 ג'וניור — const object
const ROUTES = {
  home: "/",
  about: "/about"
} as const;
type Route = typeof ROUTES[keyof typeof ROUTES];   // "/" | "/about"

// 🎩 פרופ׳ — const enum (compile-only)
const enum Color { Red = "#f00", Green = "#0f0" }
const c = Color.Red;   // compiles to: const c = "#f00"
```

---

## 64. Docker — container / image / volume / network (קושי 6)

| Concept | מה זה |
|---|---|
| image | snapshot של app + deps |
| container | running instance של image |
| volume | persistent storage |
| network | תקשורת בין containers |
| Dockerfile | מתכון לבנות image |

**🧓 סבתא:** image=תוכנית. container=ביצוע.
**👶 ילד:** image=DVD. container=ה-DVD רץ.
**💂 חייל:** image immutable. container ephemeral. volume persists.
**🎓 סטודנט:** docker-compose for multi-container. networks for isolation.
**👨‍💻 ג'וניור:** multi-stage builds for smaller images. .dockerignore mandatory.
**🎩 פרופ׳:** layer caching. BuildKit. distroless base.

```dockerfile
# 🧓 סבתא — Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```
```bash
# 👶 ילד
docker build -t myapp .
docker run -p 3000:3000 myapp

# 💂 חייל — volume
docker run -v $(pwd)/data:/app/data myapp

# 🎓 סטודנט — compose
# docker-compose.yml:
# services:
#   web: build: .
#   db: image: postgres
docker compose up

# 👨‍💻 ג'וניור — multi-stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]

# 🎩 פרופ׳ — distroless
FROM gcr.io/distroless/nodejs20
COPY --from=build /app /app
CMD ["/app/server.js"]
```

---

✅ Diff 6 הושלם (52+13=65/95)

## 65. Browser Storage — localStorage / sessionStorage / IndexedDB (קושי 5)

| Storage | persist | size | API | type |
|---|---|---|---|---|
| localStorage | until cleared | ~5-10MB | sync | string only |
| sessionStorage | until tab closed | ~5-10MB | sync | string only |
| IndexedDB | until cleared | hundreds MB | async | structured (objects) |
| Cookies | configurable | ~4KB | sync | string |

**🧓 סבתא:** local=נשאר. session=רק לטאב. IndexedDB=מסד גדול.
**👶 ילד:** מקומות שונים לשמור מידע בדפדפן.
**💂 חייל:** localStorage strings only — JSON.stringify objects.
**🎓 סטודנט:** IndexedDB for >5MB or queries. localStorage for small flags/prefs.
**👨‍💻 ג'וניור:** never store secrets (XSS exposure). use httpOnly cookie.
**🎩 פרופ׳:** sync APIs block main thread. IndexedDB worker-friendly.

```js
// 🧓 סבתא
localStorage.setItem("user", "Tal");
localStorage.getItem("user");   // "Tal"

// 👶 ילד — JSON dance
localStorage.setItem("data", JSON.stringify({ x: 1 }));
const data = JSON.parse(localStorage.getItem("data") || "{}");

// 💂 חייל — sessionStorage
sessionStorage.setItem("draft", text);
// disappears when tab closes

// 🎓 סטודנט — IndexedDB (idb wrapper)
import { openDB } from "idb";
const db = await openDB("myapp", 1, { upgrade(db) {
  db.createObjectStore("items", { keyPath: "id" });
}});
await db.put("items", { id: 1, name: "Tal" });

// 👨‍💻 ג'וניור — quota check
const { quota, usage } = await navigator.storage.estimate();

// 🎩 פרופ׳ — Cache API (Service Worker)
const cache = await caches.open("v1");
await cache.put(req, response.clone());
```

---

## 66. HTTP Methods — GET / POST / PUT / DELETE / PATCH (קושי 5)

| Method | semantic | idempotent? | safe? |
|---|---|---|---|
| GET | read | ✅ | ✅ |
| HEAD | metadata | ✅ | ✅ |
| POST | create / general | ❌ | ❌ |
| PUT | replace | ✅ | ❌ |
| PATCH | partial update | ❌ | ❌ |
| DELETE | remove | ✅ | ❌ |

**🧓 סבתא:** GET=קח. POST=צור. PUT=החלף. PATCH=עדכן חלק. DELETE=מחק.
**👶 ילד:** פעולות שונות שאפשר לעשות עם משאב.
**💂 חייל:** REST verbs. idempotent = same result on repeat.
**🎓 סטודנט:** PUT replaces, PATCH merges. DELETE 204 No Content.
**👨‍💻 ג'וניור:** GraphQL skips this entirely (POST always).
**🎩 פרופ׳:** RFC 9110. caching by method. CORS preflight on non-simple methods.

```js
// 🧓 סבתא
fetch("/users");                      // GET
fetch("/users", { method: "POST", body });
fetch("/users/5", { method: "DELETE" });

// 👶 ילד — REST
GET    /users        → list all
GET    /users/5      → one
POST   /users        → create
PUT    /users/5      → replace whole
PATCH  /users/5      → partial
DELETE /users/5      → remove

// 💂 חייל — Express
app.get("/users", listAll);
app.post("/users", create);
app.patch("/users/:id", partialUpdate);
app.delete("/users/:id", remove);

// 🎓 סטודנט — PATCH semantics
// JSON Patch (RFC 6902):
[{ "op": "replace", "path": "/name", "value": "New" }]
// Or merge patch (RFC 7396): just send fields to update.

// 👨‍💻 ג'וניור — fetch wrapper
const api = (path, opts={}) => fetch(path, {
  headers: { "Content-Type": "application/json" },
  ...opts,
  body: opts.body ? JSON.stringify(opts.body) : undefined
}).then(r => r.json());

// 🎩 פרופ׳ — CORS preflight (OPTIONS)
// non-simple method (DELETE/PUT/PATCH) → browser sends OPTIONS first
// server must respond Access-Control-Allow-Methods
```

---

## 67. Module System — import / export / require (קושי 5)

| System | import | export | when |
|---|---|---|---|
| ES Modules | `import x from "p"` | `export default x` | modern JS, browsers, Node 14+ |
| CommonJS | `const x = require("p")` | `module.exports = x` | legacy Node |
| AMD | `define(["p"], (p)=>...)` | n/a | RequireJS legacy |
| UMD | hybrid | hybrid | universal libs |

**🧓 סבתא:** ESM=מודרני. CJS=ישן.
**👶 ילד:** דרכים לחבר קבצים בקוד.
**💂 חייל:** ESM static (analyzable, tree-shake). CJS dynamic.
**🎓 סטודנט:** Top-level await ב-ESM. require() ב-CJS.
**👨‍💻 ג'וניור:** package.json "type": "module" enables ESM in .js.
**🎩 פרופ׳:** ESM live bindings vs CJS snapshot. circular dep behavior differs.

```js
// 🧓 סבתא — ESM
import React from "react";
export default function Card() {}
export { Card };

// 👶 ילד — CJS
const React = require("react");
module.exports = function Card() {};

// 💂 חייל — named + default
// utils.js
export const PI = 3.14;
export default function add(a,b) { return a+b; }
// app.js
import add, { PI } from "./utils.js";

// 🎓 סטודנט — dynamic import
const mod = await import("./heavy.js");
mod.default();   // lazy-loaded

// 👨‍💻 ג'וניור — re-export
export { Foo } from "./Foo.js";
export * from "./helpers.js";

// 🎩 פרופ׳ — top-level await (ESM only)
// data.mjs:
const data = await fetch("/api").then(r => r.json());
export default data;
```

---

## 68. TypeScript Basics — string/number/boolean/array/type/interface (קושי 5)

| Type | תחביר |
|---|---|
| primitives | `string`, `number`, `boolean`, `null`, `undefined` |
| array | `T[]` או `Array<T>` |
| tuple | `[string, number]` |
| object | `{ name: string }` |
| function | `(x: number) => string` |
| union | `A \| B` |
| intersection | `A & B` |

**🧓 סבתא:** TS מוסיף בדיקות סוג ל-JS.
**👶 ילד:** כותב מה הסוג ש-TypeScript מוודא.
**💂 חייל:** primitives + composites. type aliases for naming.
**🎓 סטודנט:** strict mode חובה. noImplicitAny.
**👨‍💻 ג'וניור:** prefer interface for shapes, type for unions.
**🎩 פרופ׳:** structural typing. nominal patterns via branded types.

```ts
// 🧓 סבתא
let name: string = "Tal";
let age: number = 30;
let tags: string[] = ["dev", "ai"];

// 👶 ילד
function greet(name: string): string {
  return `Hi ${name}`;
}

// 💂 חייל — interface
interface User {
  id: number;
  name: string;
  email?: string;   // optional
}

// 🎓 סטודנט — union + narrowing
function format(value: string | number): string {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}

// 👨‍💻 ג'וניור — generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 🎩 פרופ׳ — branded types
type UserId = string & { __brand: "UserId" };
function asUserId(s: string): UserId { return s as UserId; }
```

---

## 69. Array Mutation — push/pop/shift/unshift/splice (קושי 5)

| Method | פעולה | מחזיר |
|---|---|---|
| push | הוסף בסוף | new length |
| pop | הסר מסוף | the removed |
| shift | הסר מהתחלה | the removed |
| unshift | הוסף בהתחלה | new length |
| splice(start, count, ...items) | הסר/הוסף באמצע | removed items |

**🧓 סבתא:** push/pop בסוף. shift/unshift בהתחלה. splice באמצע.
**👶 ילד:** דרכים לשנות מערך במקום.
**💂 חייל:** all mutate! React state — immutable instead.
**🎓 סטודנט:** stack=push+pop. queue=push+shift.
**👨‍💻 ג'וניור:** never use these on React state. use [...] instead.
**🎩 פרופ׳:** shift/unshift O(n) — re-indexes whole array. push/pop O(1) amortized.

```js
// 🧓 סבתא
arr.push(4);       // [1,2,3,4]
arr.pop();         // [1,2,3]
arr.unshift(0);    // [0,1,2,3]
arr.shift();       // [1,2,3]

// 👶 ילד — splice
arr.splice(1, 1);              // [1,3] — removed index 1
arr.splice(1, 0, "X");         // [1,"X",3] — inserted at 1
arr.splice(0, 0, "A", "B");    // ["A","B",1,"X",3]

// 💂 חייל — stack vs queue
const stack = [];
stack.push(1); stack.push(2); stack.pop();  // 2 (LIFO)
const queue = [];
queue.push(1); queue.push(2); queue.shift(); // 1 (FIFO)

// 🎓 סטודנט — immutable equivalents
// push:  [...arr, x]
// pop:   arr.slice(0, -1)
// shift: arr.slice(1)
// unshift: [x, ...arr]
// splice (remove): arr.filter((_,i) => i !== idx)

// 👨‍💻 ג'וניור — performance
arr.unshift(x);   // O(n)
arr.push(x);      // O(1) amortized — prefer

// 🎩 פרופ׳ — SharedArrayBuffer + Atomics
// for cross-worker mutations: Atomics.add, Atomics.store
```

---

## 70. DOM Selectors — getElementBy* / querySelector (קושי 5)

| Method | מחזיר | live? |
|---|---|---|
| getElementById | Element או null | n/a |
| getElementsByClassName | HTMLCollection | ✅ live |
| getElementsByTagName | HTMLCollection | ✅ live |
| querySelector | Element או null | n/a |
| querySelectorAll | NodeList | ❌ static |

**🧓 סבתא:** querySelector=מודרני. getElementById=מהיר.
**👶 ילד:** דרכים למצוא אלמנטים בDOM.
**💂 חייל:** querySelector accepts CSS selectors. live vs static.
**🎓 סטודנט:** live HTMLCollection updates as DOM changes (caveat in loops).
**👨‍💻 ג'וניור:** querySelector ל-90%. getElementById ב-hot path.
**🎩 פרופ׳:** querySelector בO(n) של DOM. live HTMLCollection invalidates cache.

```js
// 🧓 סבתא
document.getElementById("submit");
document.querySelector("#submit");

// 👶 ילד
document.querySelectorAll(".btn");           // NodeList
document.getElementsByClassName("btn");      // HTMLCollection

// 💂 חייל — CSS selector power
document.querySelector("ul.todo > li:first-child");
document.querySelector("[data-id='5']");

// 🎓 סטודנט — live trap
const items = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
  items[i].classList.remove("item");   // length changes!
}

// 👨‍💻 ג'וניור — closest
button.closest("form");   // walks up to nearest form

// 🎩 פרופ׳ — :is, :where (CSS4)
document.querySelector(":is(a, button).primary");
```

---

## 71. JSON Methods — parse / stringify (קושי 5)

| Method | direction |
|---|---|
| JSON.stringify(obj) | object → string |
| JSON.parse(str) | string → object |
| JSON.stringify with replacer | filter keys |
| JSON.stringify with indent | pretty-print |

**🧓 סבתא:** stringify=הופך לטקסט. parse=הופך חזרה.
**👶 ילד:** מתרגם בין אובייקט לסרגל-תוויות.
**💂 חייל:** circular refs throw. Date→string. undefined dropped.
**🎓 סטודנט:** custom toJSON method. replacer/reviver functions.
**👨‍💻 ג'וניור:** structured-clone fixes Date/Map/Set issues.
**🎩 פרופ׳:** O(n) DFS. some engines support fast paths for plain objects.

```js
// 🧓 סבתא
const s = JSON.stringify({ name: "Tal" });   // '{"name":"Tal"}'
const o = JSON.parse(s);                       // { name: "Tal" }

// 👶 ילד — pretty
JSON.stringify(obj, null, 2);   // indented

// 💂 חייל — Date loses
JSON.stringify({ d: new Date() });   // '{"d":"2026-05-02T..."}' (string!)
JSON.parse('"2026..."') instanceof Date;   // false

// 🎓 סטודנט — replacer (filter)
const safe = JSON.stringify(user, (key, value) => {
  if (key === "password") return undefined;
  return value;
});

// 👨‍💻 ג'וניור — reviver (parse)
const obj = JSON.parse(s, (key, value) => {
  if (key === "createdAt") return new Date(value);
  return value;
});

// 🎩 פרופ׳ — toJSON method
class User {
  toJSON() { return { id: this.id }; }   // omit password
}
JSON.stringify(new User());   // '{"id":...}'
```

---

## 72. String Methods — split/slice/substring/replace/includes/indexOf (קושי 5)

| Method | פעולה | mutates? |
|---|---|---|
| split | string → array | ❌ |
| slice(start, end) | חתיכה | ❌ |
| substring(start, end) | דומה ל-slice | ❌ |
| replace(needle, repl) | החלפה ראשונה | ❌ |
| replaceAll | כל ההחלפות | ❌ |
| includes | true/false | ❌ |
| indexOf | מיקום או -1 | ❌ |
| trim | הסרת רווחים | ❌ |

**🧓 סבתא:** strings ב-JS immutable — תמיד מחזיר חדש.
**👶 ילד:** פעולות על טקסט.
**💂 חייל:** ES2021 replaceAll. trimStart/trimEnd modern.
**🎓 סטודנט:** regex in replace for power. capture groups with $1.
**👨‍💻 ג'וניור:** template literals for building strings.
**🎩 פרופ׳:** strings are V8 cons-strings (concatenation)—non-flat by default.

```js
// 🧓 סבתא
"a,b,c".split(",");           // ["a","b","c"]
"hello".slice(1, 3);          // "el"
"hello".replace("l", "L");    // "heLlo"

// 👶 ילד
"hello".includes("ll");       // true
"hello".indexOf("l");         // 2
"  spaces  ".trim();          // "spaces"

// 💂 חייל — replaceAll
"a-b-c".replaceAll("-", "_"); // "a_b_c"
// pre-2021: "a-b-c".replace(/-/g, "_")

// 🎓 סטודנט — regex + capture
"2026-05-02".replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
// "02/05/2026"

// 👨‍💻 ג'וניור — template
const name = "Tal";
`Hi ${name}, today is ${new Date().toLocaleDateString()}`;

// 🎩 פרופ׳ — String.raw
String.raw`Path: C:\Users\${name}`;   // backslashes preserved
```

---

## 73. Object Static Methods — keys/values/entries/assign (קושי 5)

| Method | פעולה |
|---|---|
| Object.keys(o) | array of keys |
| Object.values(o) | array of values |
| Object.entries(o) | [[k,v], ...] |
| Object.fromEntries | reverse of entries |
| Object.assign(target, ...src) | merge |
| Object.freeze(o) | shallow freeze |
| Object.create(proto) | new with prototype |

**🧓 סבתא:** דרכים לחקור אובייקט.
**👶 ילד:** keys=שמות. values=ערכים. entries=זוגות.
**💂 חייל:** entries enables map/filter on objects.
**🎓 סטודנט:** fromEntries inverse — useful for rebuilding.
**👨‍💻 ג'וניור:** Object.freeze ב-dev for catching mutation bugs.
**🎩 פרופ׳:** keys order: integer-keys numeric, then strings insertion-order.

```js
// 🧓 סבתא
Object.keys({a:1, b:2});      // ["a","b"]
Object.values({a:1, b:2});    // [1, 2]
Object.entries({a:1, b:2});   // [["a",1],["b",2]]

// 👶 ילד
Object.assign({}, a, b);   // merge a then b → new

// 💂 חייל — entries map
const doubled = Object.fromEntries(
  Object.entries({a:1, b:2}).map(([k,v]) => [k, v*2])
);
// { a: 2, b: 4 }

// 🎓 סטודנט — freeze
const config = Object.freeze({ apiUrl: "/api" });
config.apiUrl = "x";   // silent fail (or TypeError in strict)

// 👨‍💻 ג'וניור — pick/omit
function pick(obj, keys) {
  return Object.fromEntries(keys.map(k => [k, obj[k]]));
}
pick({a:1, b:2, c:3}, ["a", "c"]);   // {a:1, c:3}

// 🎩 פרופ׳ — Object.create with descriptors
const obj = Object.create(proto, {
  prop: { value: 5, writable: false, enumerable: true }
});
```

---

## 74. DOM Node Inserting — appendChild/insertBefore/replaceChild (קושי 5)

| Method | פעולה |
|---|---|
| appendChild(child) | מוסיף לסוף |
| append(...nodes) | מוסיף multiple, also strings! |
| prepend(...nodes) | להתחלה |
| insertBefore(new, ref) | לפני ref |
| replaceChild(new, old) | מחליף |
| remove() | מחיקה עצמית |

**🧓 סבתא:** דרכים להוסיף/להסיר אלמנטים בDOM.
**👶 ילד:** appendChild=הוסף ילד. remove=מחק.
**💂 חייל:** append/prepend modern, accept strings. appendChild legacy.
**🎓 סטודנט:** DocumentFragment for batch — single reflow.
**👨‍💻 ג'וניור:** moveBefore (2024+) for in-place reordering without reset.
**🎩 פרופ׳:** Range / DocumentFragment for surgical mutations.

```js
// 🧓 סבתא
parent.appendChild(child);
parent.removeChild(child);

// 👶 ילד — modern
parent.append(child1, child2, "טקסט");
parent.prepend(item);
child.remove();

// 💂 חייל — replace
parent.replaceChild(newEl, oldEl);
oldEl.replaceWith(newEl);   // modern alternative

// 🎓 סטודנט — DocumentFragment
const frag = document.createDocumentFragment();
items.forEach(i => frag.appendChild(makeItem(i)));
list.append(frag);   // single reflow!

// 👨‍💻 ג'וניור — insertAdjacentElement
container.insertAdjacentElement("beforebegin", el);
container.insertAdjacentElement("afterend", el);

// 🎩 פרופ׳ — Range surgery
const range = document.createRange();
range.selectNode(el);
const cloned = range.cloneContents();
```

---

## 75. DOM Node Creation — createElement/cloneNode (קושי 5)

| Method | פעולה |
|---|---|
| createElement(tag) | אלמנט חדש |
| createTextNode(text) | text node חדש |
| cloneNode(deep?) | shallow או deep clone |
| createDocumentFragment | container vir. |

**🧓 סבתא:** create=מייצר אלמנט. clone=משכפל.
**👶 ילד:** דרכים להכין אלמנטים חדשים.
**💂 חייל:** cloneNode(true) deep including children.
**🎓 סטודנט:** for templates: `<template>` + cloneNode.
**👨‍💻 ג'וניור:** prefer template literals + innerHTML in trusted contexts.
**🎩 פרופ׳:** custom elements + Shadow DOM for encapsulation.

```js
// 🧓 סבתא
const el = document.createElement("div");
el.textContent = "Hello";
document.body.append(el);

// 👶 ילד — multiple props
const btn = document.createElement("button");
btn.className = "primary";
btn.dataset.id = "5";
btn.addEventListener("click", handler);

// 💂 חייל — clone deep
const orig = document.querySelector(".card");
const copy = orig.cloneNode(true);   // includes children
parent.append(copy);

// 🎓 סטודנט — template element
// <template id="row-tpl"><tr><td></td></tr></template>
const tpl = document.getElementById("row-tpl");
const row = tpl.content.firstElementChild.cloneNode(true);

// 👨‍💻 ג'וניור — custom element
class MyButton extends HTMLElement {
  connectedCallback() { this.textContent = "Click"; }
}
customElements.define("my-button", MyButton);
// <my-button></my-button>

// 🎩 פרופ׳ — Shadow DOM
const shadow = el.attachShadow({ mode: "open" });
shadow.innerHTML = "<style>...</style><slot></slot>";
```

---

## 76. DOM Attributes — setAttribute/getAttribute/dataset (קושי 5)

| API | תפקיד |
|---|---|
| setAttribute(name, val) | קובע attr (string only) |
| getAttribute(name) | מחזיר string או null |
| removeAttribute(name) | מסיר |
| dataset.* | gets/sets data-* attrs |
| element[prop] | direct property |

**🧓 סבתא:** attribute=מאפיין HTML. property=שדה JS.
**👶 ילד:** דרכים לקרוא/לכתוב מאפיינים.
**💂 חייל:** input.value (property) ≠ input.getAttribute("value") (initial!).
**🎓 סטודנט:** dataset converts data-user-id ↔ dataset.userId.
**👨‍💻 ג'וניור:** prefer property direct (`el.id = "x"`) over setAttribute.
**🎩 פרופ׳:** custom attrs vs dataset vs WeakMap meta.

```js
// 🧓 סבתא
el.setAttribute("data-id", "5");
el.getAttribute("data-id");    // "5"

// 👶 ילד — dataset
el.dataset.userId = "5";       // ↔ data-user-id="5"
el.dataset.userId;             // "5"

// 💂 חייל — attribute vs property
input.setAttribute("value", "default");
input.value = "current";       // user typed
input.getAttribute("value");   // "default" (initial!)
input.value;                   // "current" (current)

// 🎓 סטודנט — boolean attrs
btn.disabled = true;            // property
btn.setAttribute("disabled", ""); // attribute (any value works)

// 👨‍💻 ג'וניור — aria
btn.setAttribute("aria-pressed", "true");
btn.ariaPressed = "true";       // newer property API

// 🎩 פרופ׳ — observe attribute changes
const obs = new MutationObserver(muts => {
  muts.forEach(m => console.log(m.attributeName, m.oldValue));
});
obs.observe(el, { attributes: true, attributeOldValue: true });
```

---

## 77. Mongo Create — create/insertOne/save (קושי 5)

| Method | מה |
|---|---|
| Model.create(data) | new + save |
| Model.insertOne(data) | direct insert |
| Model.insertMany([...]) | bulk |
| doc.save() | persist instance |
| Model.bulkWrite([...]) | mixed ops |

**🧓 סבתא:** create=יוצר ושומר. save=שומר instance.
**👶 ילד:** דרכים להכניס נתונים למסד.
**💂 חייל:** create runs middleware (pre-save hooks). insertOne doesn't.
**🎓 סטודנט:** insertMany faster but no validation per-item by default.
**👨‍💻 ג'וניור:** bulkWrite for mixed insert/update/delete in 1 round-trip.
**🎩 פרופ׳:** writeConcern + ordered:false for parallel inserts.

```js
// 🧓 סבתא
await User.create({ name: "Tal", email });

// 👶 ילד
const u = new User({ name: "Tal" });
await u.save();

// 💂 חייל — bulk
await User.insertMany([
  { name: "A" }, { name: "B" }, { name: "C" }
]);

// 🎓 סטודנט — bulkWrite
await User.bulkWrite([
  { insertOne: { document: { name: "A" } } },
  { updateOne: { filter: { name: "B" }, update: { $set: { active: true } } } },
  { deleteOne: { filter: { name: "C" } } }
]);

// 👨‍💻 ג'וניור — middleware respect
userSchema.pre("save", function() {
  this.password = bcrypt.hash(this.password);
});
// .create() and .save() trigger this; insertOne doesn't!

// 🎩 פרופ׳ — writeConcern
await User.create([{...}], { writeConcern: { w: "majority", j: true } });
```

---

## 78. TS Class Modifiers — public/private/protected/readonly (קושי 5)

| Modifier | scope |
|---|---|
| public (default) | everyone |
| private | אותה class |
| protected | class + subclasses |
| readonly | אסור reassign |
| #private (ES2022) | runtime private |

**🧓 סבתא:** דרכים להגביל גישה לשדות.
**👶 ילד:** מי יכול לראות/לשנות את השדה.
**💂 חייל:** TS modifiers compile-time only. # is runtime.
**🎓 סטודנט:** prefer # for true privacy. TS private just hides in autocomplete.
**👨‍💻 ג'וניור:** private constructor for singleton. readonly props for immutability.
**🎩 פרופ׳:** TS access modifiers in constructor params = parameter properties.

```ts
// 🧓 סבתא
class Box {
  private value: number;
  constructor(v: number) { this.value = v; }
}

// 👶 ילד — protected
class Animal {
  protected name: string;
  constructor(n: string) { this.name = n; }
}
class Dog extends Animal {
  bark() { return `${this.name} woof`; }   // ✅ protected accessible
}

// 💂 חייל — readonly
class Config {
  readonly version = "1.0.0";
}
const c = new Config();
// c.version = "2.0";   // ❌ TS error

// 🎓 סטודנט — # truly private (ES2022)
class Counter {
  #count = 0;
  inc() { this.#count++; }
  get value() { return this.#count; }
}
const c = new Counter();
// c.#count;   // ❌ SyntaxError — runtime!

// 👨‍💻 ג'וניור — parameter properties
class User {
  constructor(
    public id: number,
    private password: string,
    readonly email: string
  ) {}
  // implicit: this.id, this.password, this.email
}

// 🎩 פרופ׳ — singleton
class DB {
  private static instance: DB;
  private constructor() {}
  static get(): DB {
    return DB.instance ??= new DB();
  }
}
```

---

## 79. Git Core — add/commit/push/pull (קושי 5)

| Command | מה |
|---|---|
| git add <files> | stage changes |
| git commit -m | save snapshot |
| git push | upload to remote |
| git pull | fetch + merge |
| git status | see state |
| git diff | see changes |
| git log | history |

**🧓 סבתא:** add=להכניס לתיק. commit=לחתום. push=להעלות. pull=להוריד.
**👶 ילד:** מסלול שמירת קוד מעט-לרבים.
**💂 חייל:** working → staging → local → remote.
**🎓 סטודנט:** atomic commits, conventional messages.
**👨‍💻 ג'וניור:** never commit secrets. .gitignore + secret scanner.
**🎩 פרופ׳:** content-addressable storage. SHA-1 (transitioning SHA-256).

```bash
# 🧓 סבתא
git add file.txt
git commit -m "Update file"
git push

# 👶 ילד — full flow
git status                    # what's changed
git add .                     # stage all
git commit -m "feat: add login"
git push origin main

# 💂 חייל — partial staging
git add -p                    # interactive hunk selection

# 🎓 סטודנט — amend
git commit --amend -m "fix typo"   # edit last commit (local only!)

# 👨‍💻 ג'וניור — pull with rebase
git pull --rebase             # cleaner history vs merge
git config pull.rebase true   # default it

# 🎩 פרופ׳ — interactive history rewrite
git rebase -i HEAD~5
# pick a3f2 first commit
# squash f9d8 second commit
# fixup 7b1c third commit
```

---

## 80. Package Managers — npm / yarn / pnpm (קושי 5)

| Manager | install style | lockfile | speed |
|---|---|---|---|
| npm | flat node_modules | package-lock.json | medium |
| yarn (classic) | flat | yarn.lock | faster |
| yarn berry (PnP) | zero-installs | .yarn/cache | fastest |
| pnpm | hard-linked symlinks | pnpm-lock.yaml | fastest+disk-efficient |

**🧓 סבתא:** דרכים להתקין חבילות.
**👶 ילד:** npm=ברירת מחדל. אחרים=מהירים יותר.
**💂 חייל:** lockfile critical. respect across team.
**🎓 סטודנט:** pnpm best disk + speed. yarn berry zero-install gain.
**👨‍💻 ג'וניור:** corepack manages versions. CI cache /home/.npm.
**🎩 פרופ׳:** node_modules layout influences resolution. peerDeps strict.

```bash
# 🧓 סבתא — npm
npm install
npm install lodash
npm run build

# 👶 ילד — yarn
yarn
yarn add lodash
yarn build

# 💂 חייל — pnpm
pnpm install
pnpm add lodash
pnpm build

# 🎓 סטודנט — workspaces (pnpm)
# pnpm-workspace.yaml:
# packages:
#   - 'apps/*'
#   - 'packages/*'
pnpm --filter app1 add lodash

# 👨‍💻 ג'וניור — corepack
corepack enable
corepack prepare yarn@4.0.0 --activate
# uses yarn 4 even if system has 1.x

# 🎩 פרופ׳ — pnpm content-addressable
# ~/.pnpm-store/v3/files/<sha>
# project node_modules → symlinks to .pnpm/node_modules → hard-links to store
# disk usage shared across all projects!
```

---

## 81. Code Quality — ESLint / Prettier / TypeScript (קושי 5)

| Tool | תפקיד |
|---|---|
| ESLint | code quality (logic, bugs) |
| Prettier | code formatting (whitespace) |
| TypeScript | type checking |
| Stylelint | CSS quality |

**🧓 סבתא:** ESLint=שגיאות לוגיות. Prettier=סדר. TS=טיפוסים.
**👶 ילד:** 3 כלים שמשפרים קוד באופנים שונים.
**💂 חייל:** Prettier formatting only. ESLint logic. Don't overlap.
**🎓 סטודנט:** prettier-eslint-plugin to integrate. .editorconfig consistency.
**👨‍💻 ג'וניור:** husky + lint-staged for pre-commit. CI also runs.
**🎩 פרופ׳:** ESLint flat config (v9+). custom rules with AST.

```js
// 🧓 סבתא — eslint.config.js
export default [{
  rules: {
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}];
```
```json
// 👶 ילד — .prettierrc
{ "semi": true, "singleQuote": true, "tabWidth": 2 }
```
```json
// 💂 חייל — tsconfig.json strict
{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true } }
```
```json
// 🎓 סטודנט — package.json scripts
{ "scripts": {
  "lint": "eslint .",
  "format": "prettier --write .",
  "typecheck": "tsc --noEmit"
}}
```
```bash
# 👨‍💻 ג'וניור — husky pre-commit
# .husky/pre-commit:
npx lint-staged

# package.json:
# "lint-staged": { "*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
```
```js
// 🎩 פרופ׳ — custom ESLint rule
export default {
  rules: {
    "no-bad-pattern": {
      meta: { type: "problem" },
      create(ctx) {
        return {
          CallExpression(node) {
            if (node.callee.name === "evil") ctx.report({ node, message: "evil()" });
          }
        };
      }
    }
  }
};
```

---

## 82. Deploy Platforms — Vercel / Netlify / Cloudflare Pages (קושי 5)

| Platform | strength |
|---|---|
| Vercel | Next.js native, edge fn, ISR |
| Netlify | early SSG leader, forms |
| Cloudflare Pages | edge-first, free tier huge |
| Render | full-stack incl. DB |
| Railway | full-stack apps |

**🧓 סבתא:** מקומות להעלות אתר ל-internet.
**👶 ילד:** דרך אוטומטית מ-git push לאתר חי.
**💂 חייל:** preview deploys per PR. environment variables.
**🎓 סטודנט:** Vercel for Next.js. CF for static + edge. Railway for APIs+DB.
**👨‍💻 ג'וניור:** edge functions vs Lambdas. cold start vs warm.
**🎩 פרופ׳:** Workers (CF) vs Lambda@Edge. ISR vs on-demand revalidation.

```bash
# 🧓 סבתא — Vercel CLI
npm i -g vercel
vercel    # deploys to preview URL

# 👶 ילד — Netlify
netlify deploy --prod

# 💂 חייל — env vars (Vercel)
vercel env add DATABASE_URL production

# 🎓 סטודנט — vercel.json
# {
#   "buildCommand": "npm run build",
#   "framework": "nextjs",
#   "regions": ["iad1"]
# }

# 👨‍💻 ג'וניור — Cloudflare Pages config
# wrangler.toml:
# name = "my-app"
# pages_build_output_dir = "dist"
# [vars]
# API_URL = "https://api.example.com"

# 🎩 פרופ׳ — Vercel edge function
# api/edge.ts:
export const config = { runtime: "edge" };
export default async function (req: Request) {
  return new Response("Hello from edge");
}
```

---

## 83. CI / CD (קושי 5)

| Concept | מה |
|---|---|
| CI | Continuous Integration — run tests on every push |
| CD | Continuous Deployment — auto-deploy on merge |
| pipeline | sequence of jobs |
| stage | parallel jobs at same point |
| artifact | output passed between stages |

**🧓 סבתא:** CI=בדיקה אוטומטית. CD=פריסה אוטומטית.
**👶 ילד:** push → robot בודק → אם בסדר, מעלה לאתר.
**💂 חייל:** GH Actions yaml. matrix builds. caching.
**🎓 סטודנט:** parallelize tests. cache deps. concurrency limits.
**👨‍💻 ג'וניור:** secrets management. environment protection rules.
**🎩 פרופ׳:** OIDC for cloud auth (no static keys). reusable workflows.

```yaml
# 🧓 סבתא — GH Actions
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```
```yaml
# 👶 ילד — matrix
strategy:
  matrix:
    node: [18, 20, 22]
    os: [ubuntu-latest, macos-latest]
runs-on: ${{ matrix.os }}
steps:
  - uses: actions/setup-node@v4
    with: { node-version: ${{ matrix.node }} }
```
```yaml
# 💂 חייל — caching
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
```
```yaml
# 🎓 סטודנט — deploy on main
deploy:
  needs: [test, lint]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  environment: production
  steps:
    - run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```
```yaml
# 👨‍💻 ג'וניור — concurrency
concurrency:
  group: ${{ github.ref }}
  cancel-in-progress: true
```
```yaml
# 🎩 פרופ׳ — OIDC to AWS
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123:role/gh-deploy
    aws-region: us-east-1
# no AWS_ACCESS_KEY_ID anywhere!
```

---

✅ Diff 5 הושלם (65+19=84/95)

## 84. Primitive Types — string/number/boolean/undefined/null/symbol/bigint (קושי 4)

| Type | example | typeof |
|---|---|---|
| string | `"hi"` | "string" |
| number | `42` / `3.14` | "number" |
| boolean | `true` | "boolean" |
| undefined | `undefined` | "undefined" |
| null | `null` | "object" ⚠️ |
| symbol | `Symbol("x")` | "symbol" |
| bigint | `5n` | "bigint" |

**🧓 סבתא:** 7 סוגים בסיסיים בJS.
**👶 ילד:** מספרים, טקסט, true/false, ועוד.
**💂 חייל:** primitives by-value. immutable.
**🎓 סטודנט:** typeof null = "object" historical bug.
**👨‍💻 ג'וניור:** bigint לnumbers > 2^53. symbol for unique keys.
**🎩 פרופ׳:** SMI vs HeapNumber ב-V8. NaN unique self-inequality.

```js
// 🧓 סבתא
let n = 5;          // number
let s = "hi";       // string
let b = true;       // boolean

// 👶 ילד
typeof 5;           // "number"
typeof "hi";        // "string"
typeof null;        // "object" ⚠️ באג

// 💂 חייל — bigint
const big = 9007199254740993n;   // beyond Number.MAX_SAFE_INTEGER

// 🎓 סטודנט — symbol unique
const id = Symbol("user-id");
const obj = { [id]: 1 };

// 👨‍💻 ג'וניור — Symbol.iterator
class Range {
  constructor(start, end) { Object.assign(this, {start, end}); }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i;
  }
}
[...new Range(1, 3)];   // [1, 2, 3]

// 🎩 פרופ׳ — well-known symbols
class X {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 42 : "X";
  }
}
+(new X());   // 42
```

---

## 85. NPM Commands — install / run / scripts / init / publish (קושי 4)

| Command | מה |
|---|---|
| npm init | create package.json |
| npm install | install all deps |
| npm install <pkg> | add dep |
| npm install -D <pkg> | add devDep |
| npm run <script> | run script |
| npm publish | upload to registry |
| npm audit | security scan |

**🧓 סבתא:** init=התחל. install=הורד. run=הפעל. publish=העלה.
**👶 ילד:** פקודות לנהל חבילות.
**💂 חייל:** scripts ב-package.json. npm run = node_modules/.bin in PATH.
**🎓 סטודנט:** lock file critical. don't edit manually.
**👨‍💻 ג'וניור:** npm ci faster than install in CI (uses lock exactly).
**🎩 פרופ׳:** npm workspace, --workspaces flag. provenance attestations.

```bash
# 🧓 סבתא
npm init -y                    # quick init
npm install lodash             # add dep
npm run dev                    # run "dev" script

# 👶 ילד — package.json scripts
# {
#   "scripts": {
#     "dev": "vite",
#     "build": "vite build",
#     "test": "vitest"
#   }
# }
npm run build

# 💂 חייל — versioning
npm install lodash@^4.17.0    # caret = compatible
npm install lodash@~4.17.0    # tilde = patch only
npm install lodash@4.17.21    # exact

# 🎓 סטודנט — CI install
npm ci                         # respects lock exactly, fast

# 👨‍💻 ג'וניור — workspaces
# package.json:
# "workspaces": ["apps/*", "packages/*"]
npm install --workspace=app1

# 🎩 פרופ׳ — publish with provenance
npm publish --provenance --access public
# generates SLSA attestation
```

---

## 86. parseInt / parseFloat / Number() (קושי 4)

| Method | parses |
|---|---|
| parseInt | integer prefix |
| parseFloat | float prefix |
| Number() | strict full conversion |
| +x | strict (unary plus) |

**🧓 סבתא:** parseInt=שלם. parseFloat=עשרוני. Number()=מחמיר.
**👶 ילד:** דרכים להפוך טקסט למספר.
**💂 חייל:** parseInt(s, 10) — תמיד radix! parseFloat ignores leading.
**🎓 סטודנט:** Number("abc") → NaN. Number("") → 0. Surprises!
**👨‍💻 ג'וניור:** Number.parseInt = parseInt (alias). prefer for explicit.
**🎩 פרופ׳:** parseInt parses single chars, stops at non-digit. Number coerces fully.

```js
// 🧓 סבתא
parseInt("42px");      // 42
parseFloat("3.14ab");  // 3.14
Number("42");          // 42

// 👶 ילד — radix mandatory
parseInt("0x1F", 16);  // 31
parseInt("0x1F");      // 31 (auto-detected)
parseInt("08", 10);    // 8 (always specify!)

// 💂 חייל — Number strict
Number("42.5abc");     // NaN!
parseFloat("42.5abc"); // 42.5

// 🎓 סטודנט — empty/whitespace
Number("");            // 0 ⚠️
Number(" ");           // 0 ⚠️
parseInt("", 10);      // NaN
Number(null);          // 0 ⚠️
Number(undefined);     // NaN

// 👨‍💻 ג'וניור — unary plus
+"42";                 // 42 (Number() equivalent)
+"abc";                // NaN
+true;                 // 1

// 🎩 פרופ׳ — perf
// parseInt > Number for large strings (early termination)
// Number > parseInt for known clean numeric strings
```

---

## 87. Math Methods — floor/ceil/round/random/max/min (קושי 4)

| Method | פעולה |
|---|---|
| Math.floor(x) | round down |
| Math.ceil(x) | round up |
| Math.round(x) | banker's round |
| Math.trunc(x) | drop fractional |
| Math.random() | [0,1) random |
| Math.max(a,b,...) | largest |
| Math.min(a,b,...) | smallest |
| Math.abs(x) | absolute value |
| Math.pow(b,e) / b**e | exponent |
| Math.sqrt(x) | square root |

**🧓 סבתא:** Math = פעולות מתמטיות.
**👶 ילד:** עיגול, מקסימום, מינימום, רנדומלי.
**💂 חייל:** floor != trunc for negatives. round half-to-even.
**🎓 סטודנט:** Math.random not crypto-secure. crypto.getRandomValues for security.
**👨‍💻 ג'וניור:** ** operator > Math.pow.
**🎩 פרופ׳:** IEEE 754 quirks. Math.fround for f32.

```js
// 🧓 סבתא
Math.floor(3.9);       // 3
Math.ceil(3.1);        // 4
Math.round(3.5);       // 4

// 👶 ילד
Math.max(1, 5, 3);     // 5
Math.min(1, 5, 3);     // 1
Math.abs(-5);          // 5

// 💂 חייל — random integer 0..N
Math.floor(Math.random() * 10);   // 0..9

// 🎓 סטודנט — floor vs trunc on negatives
Math.floor(-3.5);      // -4 (toward -infinity)
Math.trunc(-3.5);      // -3 (toward zero)

// 👨‍💻 ג'וניור — secure random (cryptography)
const arr = new Uint32Array(1);
crypto.getRandomValues(arr);
arr[0];   // cryptographically secure random

// 🎩 פרופ׳ — IEEE 754 precision
0.1 + 0.2;             // 0.30000000000000004
Math.fround(0.1 + 0.2);// rounds to f32 precision
```

---

## 88. Template Literals vs Concatenation (קושי 4)

| Style | תחביר |
|---|---|
| template literal | `` `Hello ${name}` `` |
| concatenation | `"Hello " + name` |
| String() | `String(value)` |
| toString() | `value.toString()` |
| String.raw | `String.raw\`a\nb\`` (no escape) |

**🧓 סבתא:** backticks > רגיל.
**👶 ילד:** `${var}` בתוך backticks = קל.
**💂 חייל:** template = readable + multiline + interpolation.
**🎓 סטודנט:** tagged templates: `tag\`...\`` for HTML/SQL.
**👨‍💻 ג'וניור:** all modern code = template literals. concatenation legacy.
**🎩 פרופ׳:** TaggedTemplate gets raw + cooked strings.

```js
// 🧓 סבתא
const name = "Tal";
`Hi ${name}`;            // "Hi Tal"

// 👶 ילד — multiline
`line 1
line 2`;
// vs concatenation: "line 1\n" + "line 2"

// 💂 חייל — expressions
`Total: ${items.reduce((s, i) => s + i.price, 0)}`;

// 🎓 סטודנט — tagged template
function html(strings, ...values) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ? sanitize(values[i]) : ""), "");
}
const safe = html`<div>${userInput}</div>`;

// 👨‍💻 ג'וניור — styled-components
const Btn = styled.button`
  background: ${props => props.primary ? "blue" : "gray"};
`;

// 🎩 פרופ׳ — String.raw
String.raw`C:\path\file`;   // "C:\path\file" (backslashes literal)
```

---

## 89. Date APIs — Date.now / new Date / Date.parse (קושי 4)

| API | מחזיר |
|---|---|
| Date.now() | timestamp ms |
| new Date() | now Date object |
| new Date(ms) | from timestamp |
| new Date(str) | from string |
| Date.parse(str) | timestamp from str |
| date.toISOString() | "2026-05-02T..." |
| date.getTime() | ms since epoch |

**🧓 סבתא:** Date.now=מספר. new Date=אובייקט.
**👶 ילד:** דרכים להציג זמן.
**💂 חייל:** ms since 1970-01-01. ISO 8601 standard.
**🎓 סטודנט:** Temporal API replacing this (stage 3, 2024).
**👨‍💻 ג'וניור:** Date is mutable! prefer date-fns or Temporal.
**🎩 פרופ׳:** timezone gotchas. UTC vs local. parsing "2026-01-01" varies by browser.

```js
// 🧓 סבתא
const ts = Date.now();           // 1714665600000
const d = new Date();            // Date object

// 👶 ילד
new Date(2026, 0, 15);           // Jan 15 (month 0-indexed!)
new Date("2026-01-15");          // ISO string
d.getFullYear();                 // 2026
d.toISOString();                 // "2026-01-15T..."

// 💂 חייל — duration
const start = Date.now();
await work();
console.log(Date.now() - start, "ms");

// 🎓 סטודנט — relative time
const ago = Date.now() - timestamp;
const days = Math.floor(ago / 86400000);

// 👨‍💻 ג'וניור — date-fns
import { format, addDays, differenceInDays } from "date-fns";
format(new Date(), "yyyy-MM-dd");

// 🎩 פרופ׳ — Temporal (proposal)
Temporal.Now.plainDateISO();     // 2026-05-02
Temporal.Now.zonedDateTimeISO("Asia/Jerusalem");
```

---

## 90. classList API (קושי 4)

| Method | פעולה |
|---|---|
| classList.add(c1, c2) | adds |
| classList.remove(c) | removes |
| classList.toggle(c) | flips |
| classList.toggle(c, force) | conditional |
| classList.contains(c) | bool |
| classList.replace(old, new) | swap |

**🧓 סבתא:** classList=DOMTokenList של classes.
**👶 ילד:** דרכים לעבוד עם class בDOM.
**💂 חייל:** modern alternative to className manipulation.
**🎓 סטודנט:** toggle with second arg = conditional set.
**👨‍💻 ג'וניור:** prefer setting on render, not toggling, in modern apps.
**🎩 פרופ׳:** DOMTokenList is live, observable.

```js
// 🧓 סבתא
el.classList.add("active");
el.classList.remove("disabled");
el.classList.toggle("open");

// 👶 ילד
if (el.classList.contains("active")) { ... }

// 💂 חייל — multiple
el.classList.add("a", "b", "c");

// 🎓 סטודנט — conditional toggle
el.classList.toggle("active", isActive);

// 👨‍💻 ג'וניור — replace
el.classList.replace("old-class", "new-class");

// 🎩 פרופ׳ — observe changes
const obs = new MutationObserver(muts => {
  muts.forEach(m => {
    if (m.attributeName === "class") console.log("classes changed");
  });
});
obs.observe(el, { attributes: true, attributeFilter: ["class"] });
```

---

## 91. Express Response — send/json/render/redirect (קושי 4)

| Method | פעולה |
|---|---|
| res.send(body) | auto Content-Type |
| res.json(obj) | application/json |
| res.render("view") | template engine |
| res.redirect(url) | 302 default |
| res.status(N).x() | chain |
| res.cookie(name, val) | set cookie |
| res.end() | finish |

**🧓 סבתא:** דרכים שונות להחזיר תשובה.
**👶 ילד:** json לAPI. send לטקסט. redirect להפנות.
**💂 חייל:** chainable. res.status().json() pattern.
**🎓 סטודנט:** stream large via res.write + res.end.
**👨‍💻 ג'וניור:** prefer res.json() over res.send(JSON.stringify()).
**🎩 פרופ׳:** ETag, conditional response. compression middleware.

```js
// 🧓 סבתא
app.get("/", (req, res) => res.send("Hello"));
app.get("/api", (req, res) => res.json({ ok: true }));
app.get("/old", (req, res) => res.redirect("/new"));

// 👶 ילד — status chain
res.status(404).json({ error: "Not found" });
res.status(201).json(newUser);

// 💂 חייל — set headers
res.set("X-Custom", "value");
res.type("application/xml");

// 🎓 סטודנט — streaming
res.writeHead(200, { "Content-Type": "text/event-stream" });
res.write("data: hello\n\n");
// ... later
res.end();

// 👨‍💻 ג'וניור — file download
res.attachment("report.pdf");
res.sendFile(path);

// 🎩 פרופ׳ — conditional with ETag
const etag = hash(content);
if (req.headers["if-none-match"] === etag) {
  return res.status(304).end();   // not modified
}
res.set("ETag", etag).send(content);
```

---

## 92. React Grouping — Fragment / <></> / <div> (קושי 4)

| Wrapper | output |
|---|---|
| `<div>` | div in DOM |
| `<Fragment>` | nothing in DOM |
| `<></>` | nothing in DOM (shorthand) |
| `React.Fragment` | same as Fragment |

**🧓 סבתא:** Fragment=עוטף בלי לייצר DOM element.
**👶 ילד:** דרך לקבץ בלי `<div>` מיותר.
**💂 חייל:** `<>` no key support; `<Fragment key=...>` does.
**🎓 סטודנט:** prefer `<>` for cleanest output.
**👨‍💻 ג'וניור:** when iterating with key, must use Fragment full form.
**🎩 פרופ׳:** Fragment is React.Fragment internal symbol.

```jsx
// 🧓 סבתא
return (
  <>
    <h1>Title</h1>
    <p>Body</p>
  </>
);

// 👶 ילד — explicit
return (
  <Fragment>
    <h1>Title</h1>
    <p>Body</p>
  </Fragment>
);

// 💂 חייל — with key (needed in iterations)
items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.def}</dd>
  </Fragment>
));

// 🎓 סטודנט — vs <div>
// <div> creates extra wrapper element (sometimes breaks layouts)
// <> doesn't add anything

// 👨‍💻 ג'וניור — return multiple from component
function ListItems() {
  return (
    <>
      <li>A</li>
      <li>B</li>
    </>
  );
}

// 🎩 פרופ׳ — JSX desugar
// <></> → React.createElement(React.Fragment, null, ...)
```

---

## 93. Dependency Kinds — dependencies/devDependencies/peerDependencies (קושי 4)

| Kind | מתי |
|---|---|
| dependencies | runtime, ships to user |
| devDependencies | dev/build only |
| peerDependencies | "user must provide this" |
| optionalDependencies | failsafe |
| bundledDependencies | embedded |

**🧓 סבתא:** prod=runtime. dev=dev. peer=consumer's.
**👶 ילד:** סוגי תלויות שונים בpackage.json.
**💂 חייל:** prod ships. dev not. peer for plugins (libs).
**🎓 סטודנט:** peer with caret allows version range. npm 7+ auto-installs.
**👨‍💻 ג'וניור:** check unused with depcheck. trim before publish.
**🎩 פרופ׳:** peer warnings → resolutions field (yarn). overrides (npm).

```json
// 🧓 סבתא
{
  "dependencies": { "react": "^18.0.0" },
  "devDependencies": { "vitest": "^1.0.0" }
}
```
```json
// 👶 ילד
{
  "dependencies": {
    "lodash": "^4.17.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "vite": "^5.0.0"
  }
}
```
```json
// 💂 חייל — peer (for libs)
{
  "name": "my-react-lib",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}
```
```bash
# 🎓 סטודנט — installation
npm install --save lodash         # → dependencies
npm install --save-dev vitest     # → devDependencies
npm install --save-peer react     # → peerDependencies
```
```json
// 👨‍💻 ג'וניור — overrides
{
  "overrides": {
    "vulnerable-lib": "^2.0.0"   // force version
  }
}
```
```json
// 🎩 פרופ׳ — bundleDependencies
{
  "bundleDependencies": ["my-private-lib"],
  // shipped inside .tgz
}
```

---

## 94. Code Decisions — ternary / if-else / switch (קושי 4)

| Construct | when |
|---|---|
| ternary `c ? a : b` | simple binary, in expression |
| if/else | multi-line, side effects |
| switch | many cases on same value |
| object literal lookup | many cases, no branches |

**🧓 סבתא:** if=הסתעפות. ternary=קצרצר. switch=הרבה אופציות.
**👶 ילד:** בחירות בקוד.
**💂 חייל:** ternary nesting code-smell after 2 levels.
**🎓 סטודנט:** switch with fall-through dangerous; always break.
**👨‍💻 ג'וניור:** prefer object lookup over switch for >3 cases.
**🎩 פרופ׳:** pattern matching proposal (TC39 stage 1).

```js
// 🧓 סבתא
const msg = isLoggedIn ? "Welcome" : "Please login";

// 👶 ילד — if/else
if (age < 18) deny();
else if (age < 65) approve();
else senior();

// 💂 חייל — switch
switch (status) {
  case "loading": return <Spinner/>;
  case "ok":      return <Data/>;
  case "error":   return <Err/>;
  default:        return null;
}

// 🎓 סטודנט — object lookup (prefer over switch)
const handlers = {
  loading: () => <Spinner/>,
  ok: () => <Data/>,
  error: () => <Err/>
};
return (handlers[status] || (() => null))();

// 👨‍💻 ג'וניור — early return
function process(x) {
  if (!x) return null;          // guard
  if (x.invalid) throw new Error();
  return doSomething(x);        // main path
}

// 🎩 פרופ׳ — pattern matching (proposal)
match (point) {
  when { x: 0, y: 0 }: "origin",
  when { x, y } if (x === y): "diagonal",
  when [x, y]: "tuple",
  default: "?"
}
```

---

✅ **Diff 4 הושלם** (84+11=**95/95** קלסטרים מלאים 4/4!) 🎉

---

**עודכן:** 2026-05-02 · ידני · 6 רמות · 95 קלסטרים מלאים

---

## 95-A. PHASE J — בלוקי תוכן ל-30 קלסטרים חדשים (orphan absorbers)

> 30 הקלסטרים שנוספו עכשיו בעקבות 291 המושגים שלא היו בקלסטר. תוכן קומפקטי לכל אחד.

---

### §95. OOP & Classes Basics — class/extends/super/instance/new/method

| Concept | מה |
|---|---|
| class | תבנית של object |
| new | יוצר instance |
| constructor | פונקציה ראשונית |
| extends | יורש מclass אחר |
| super | קורא לconstructor של parent |
| instance | object שנוצר מclass |
| method | פונקציה בתוך class |
| Property | שדה בinstance |
| inheritance | יורש שדות+מתודות |

🧓 כתב class לדבר תבנית, new לייצר. extends יורש.
👶 class=דפוס. new=פעולת ייצור. extends=סוג מיוחד יותר.
💂 class הוא syntactic sugar על prototype chain. extends sets prototype.
🎓 super() needed in derived constructor. ES2022 # for private.
👨‍💻 prefer composition over inheritance. interfaces for contracts.
🎩 internal slots: [[Construct]], [[HomeObject]], super.method dispatch.

```js
class Animal {
  constructor(name) { this.name = name; }
  greet() { return `Hi ${this.name}`; }
}
class Dog extends Animal {
  constructor(name) { super(name); this.species = "dog"; }
  bark() { return "Woof"; }
}
const d = new Dog("Rex");
d instanceof Dog;     // true
d instanceof Animal;  // true (prototype chain)
```

---

### §96. DOM Basics — Document Object Model / style / attribute

| Concept | מה |
|---|---|
| DOM | tree representation of HTML |
| Document Object Model | full name |
| style | inline CSS via JS |
| attribute | HTML attribute (`id`, `class`, `data-*`) |
| Value | input.value (current state) |

🧓 DOM זה איך JavaScript רואה את ה-HTML.
👶 כל אלמנט בדף = node בעץ.
💂 DOM tree: document → html → body → ...
🎓 read with .textContent, .style, .getAttribute. write similar.
👨‍💻 prefer React/Vue over manual DOM. but know fundamentals.
🎩 mutationObserver for tracking changes.

```js
document.body.style.background = "blue";
document.querySelector("#app").setAttribute("data-id", "5");
const v = document.querySelector("input").value;
```

---

### §97. Browser Storage Full — localStorage / sessionStorage / cookies / setItem / getItem

| API | persist | size | sync? |
|---|---|---|---|
| localStorage | until cleared | 5MB | sync |
| sessionStorage | tab close | 5MB | sync |
| cookies | configurable | 4KB | sync |
| IndexedDB | until cleared | 100s MB | async |
| Cache API | service worker | huge | async |

🧓 localStorage נשאר. sessionStorage עד טאב נסגר. cookies קטנות.
👶 דרכים לשמור מידע בדפדפן.
💂 setItem/getItem/removeItem. JSON.stringify objects.
🎓 cookies sent automatically. localStorage not.
👨‍💻 never store secrets. use httpOnly cookie for tokens.
🎩 storage events fire across tabs.

```js
localStorage.setItem("user", JSON.stringify({ name: "Tal" }));
const u = JSON.parse(localStorage.getItem("user"));
sessionStorage.setItem("draft", text);
document.cookie = "lang=he; path=/";
window.addEventListener("storage", e => console.log(e.key, e.newValue));
```

---

### §98. Array Basics — Index / new array / iteration patterns

| Pattern | תחביר |
|---|---|
| Index access | `arr[0]` |
| Length | `arr.length` |
| Create new | `[]`, `Array.from()`, `new Array(N)` |
| Iterate | `for...of`, `forEach`, `map` |
| Filter | `arr.filter()` |

🧓 מערך = רשימה ממוספרת מ-0.
👶 arr[0]=ראשון, arr.length=כמה יש.
💂 zero-indexed. length is mutable property.
🎓 sparse arrays (with holes) - performance pitfall.
👨‍💻 Array.from for iterables. spread for copy.
🎩 V8 Element Kinds: PACKED_SMI vs HOLEY_DOUBLE.

```js
const arr = ["a", "b", "c"];
arr[0];                 // "a"
arr.length;             // 3
const copy = [...arr];
const evens = [1,2,3,4].filter(n => n % 2 === 0);
const range = Array.from({length: 5}, (_, i) => i);  // [0,1,2,3,4]
```

---

### §99. String Basics — toString and conversion

| Method | פעולה |
|---|---|
| toString() | convert any to string |
| String(x) | same, more strict on null/undefined |
| `${x}` | template implicit toString |
| .toFixed(n) | number→string with N decimals |

🧓 toString הופך משהו לטקסט.
👶 כל אובייקט בJS יודע להפוך לטקסט.
💂 (5).toString() → "5". null/undefined throw on toString.
🎓 customize via toString method on class.
👨‍💻 String() safer for null. Template literal common.
🎩 Symbol.toPrimitive for custom coercion.

```js
(42).toString();           // "42"
[1,2,3].toString();        // "1,2,3"
({a:1}).toString();        // "[object Object]"
const x = 3.14159;
x.toFixed(2);              // "3.14"
class Money { toString() { return `$${this.amount}`; } }
```

---

### §100. Node.js fs API

| Method | פעולה |
|---|---|
| fs.readFile | read file |
| fs.writeFile | write file (overwrites) |
| fs.appendFile | append to file |
| fs.unlink | delete file |
| fs.rename | rename/move |
| fs.open | low-level handle |
| fs.promises.* | Promise variants |

🧓 fs = file system. דרכים לקרוא/לכתוב קבצים.
👶 קריאה, כתיבה, מחיקה, שינוי שם.
💂 callback-style legacy. Promise via fs.promises.
🎓 readFile loads all into memory. createReadStream for large.
👨‍💻 prefer fs/promises modern. async/await.
🎩 zero-copy via sendfile() in some cases.

```js
import fs from "node:fs/promises";
await fs.writeFile("out.txt", "hello");
const data = await fs.readFile("out.txt", "utf8");
await fs.appendFile("log.txt", `${new Date()}\n`);
await fs.unlink("temp.txt");
await fs.rename("old.txt", "new.txt");
```

---

### §101. CLI Basics — dir / mkdir / CLI / Command Line

| Command | פעולה |
|---|---|
| dir / ls | list files |
| mkdir | create directory |
| cd | change directory |
| node file.js | run JS |
| npm start | run npm script |
| type nul / touch | create file |

🧓 שורת פקודה זה איך מדברים עם המחשב בלי עכבר.
👶 פקודות בטרמינל.
💂 Windows: dir/type nul. Unix: ls/touch.
🎓 PATH var, scripts in node_modules/.bin.
👨‍💻 npx for one-off. corepack for tool versions.
🎩 sh vs bash vs zsh. POSIX compatibility.

```bash
mkdir my-project
cd my-project
npm init -y
echo "console.log('hi');" > index.js
node index.js          # → "hi"
```

---

### §102. JS Runtimes — Node.js / V8 / Server / Express

| Term | מה |
|---|---|
| Node.js | JS runtime outside browser |
| V8 | Google's JS engine |
| module | code unit (CJS/ESM) |
| Express | minimal HTTP server framework |
| server | program that responds to requests |
| Client | browser/mobile making requests |
| Domain | example.com address |

🧓 Node.js מריץ JS בלי דפדפן.
👶 דרך להריץ JavaScript על שרת.
💂 V8 (Chrome) + libuv (event loop) + bindings = Node.
🎓 Bun, Deno alternative runtimes.
👨‍💻 ES Modules (.mjs) + top-level await.
🎩 worker_threads for CPU. cluster for multi-core.

```js
// server.js
import express from "express";
const app = express();
app.get("/", (req, res) => res.send("Hello"));
app.listen(3000);
// run: node server.js
```

---

### §103. HTTP Protocol Basics — REST / Request / Response / Status / port

| Term | מה |
|---|---|
| HTTP | protocol of web |
| Protocol | rules of communication |
| Server | receives requests |
| Client | sends requests |
| Request | message from client |
| Response | message from server |
| Status Codes | 200, 404, 500... |
| port | server listen address |
| headers | metadata fields |
| static files | unchanging assets |
| REST API | resource-based HTTP API |
| Query Parameters | `?key=value` |

🧓 HTTP זה איך דפדפן מבקש מידע משרת.
👶 שיחה: לקוח שואל, שרת עונה.
💂 method (GET/POST) + path + headers + body. Status: 2xx ok, 4xx client err, 5xx server err.
🎓 stateless. caching via headers. CORS for cross-origin.
👨‍💻 always validate input. rate-limit. HTTPS.
🎩 HTTP/2 multiplexing. HTTP/3 QUIC.

```js
// Client (browser):
const res = await fetch("https://api.example.com/users?limit=10", {
  method: "GET",
  headers: { "Authorization": "Bearer token" }
});
console.log(res.status);  // 200
const data = await res.json();

// Server (Express):
app.get("/users", (req, res) => {
  res.status(200).json({ users: [...] });
});
```

---

### §104. Form Basics — email / password / username / form / validation

| Field | type |
|---|---|
| email | input type="email" |
| password | input type="password" |
| username | input type="text" |
| validation | check format/length |
| server-side storage | DB persistence |

🧓 טפסים = איך אנשים שולחים מידע לשרת.
👶 שדות + כפתור שליחה.
💂 client validation UX, server validation security.
🎓 Zod/Joi schema. CSRF protection.
👨‍💻 react-hook-form + zod. password rules: 8+ chars, mixed.
🎩 TLS for transit. bcrypt+salt for storage.

```html
<form onsubmit="return validate()">
  <input name="email" type="email" required>
  <input name="password" type="password" minlength="8" required>
  <button type="submit">Login</button>
</form>
```
```js
// Server validation (Zod)
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
const result = schema.safeParse(req.body);
if (!result.success) return res.status(400).json(result.error);
```

---

### §105. Browser Dev Tools — alert / console.log / debugger / network

| Tool | פעולה |
|---|---|
| alert(x) | popup (legacy) |
| console.log | print to console |
| console.error | red print |
| console.table | tabular |
| debugger | breakpoint |
| network tab | inspect HTTP |
| script tab | breakpoints, step |

🧓 כלים לבדוק קוד בדפדפן.
👶 console.log שלי טוב יותר מalert.
💂 F12 / Cmd+Opt+I.
🎓 console.time/timeEnd, console.trace.
👨‍💻 console.assert. logpoints (no debugger needed).
🎩 Source maps. Performance tab. Memory snapshots.

```js
console.log("simple");
console.error("oops");
console.table([{a:1, b:2}, {a:3, b:4}]);
console.time("op");
heavyWork();
console.timeEnd("op");           // op: 234ms
debugger;                         // pauses if devtools open
```

---

### §106. Control Flow — break / continue / return

| Keyword | פעולה |
|---|---|
| break | exit loop/switch |
| continue | skip to next iteration |
| return | exit function with value |
| throw | exit with error |

🧓 דרכים לקפוץ או לצאת.
👶 break=עצור, continue=דלג, return=סיים.
💂 break exits innermost loop. labels for outer.
🎓 return prevents else needed (early return pattern).
👨‍💻 prefer functional (filter, find) over break.
🎩 continue label, break label rare but useful.

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;        // stops at 5
  if (i % 2 === 0) continue; // skips evens
  console.log(i);            // 1, 3
}
function find(arr, target) {
  for (const x of arr) if (x === target) return x;
  return null;
}
```

---

### §107. JS Fundamentals — camelCase / hoisting / parameter / Data Types

| Term | מה |
|---|---|
| camelCase | naming style |
| hoisting | declarations move to top |
| parameter | function input |
| Data Types | primitives + reference |

🧓 camelCase=myVariableName. hoisting=הצהרה כאילו בתחילת הקוד.
👶 שמות פונקציות ומשתנים, איך הם עובדים.
💂 var hoisted with undefined. let/const hoisted to TDZ.
🎓 function declarations fully hoisted. expressions not.
👨‍💻 always declare at top of scope for clarity.
🎩 Lexical Environment vs Variable Environment.

```js
console.log(x);  // undefined (hoisted)
var x = 5;

console.log(y);  // ReferenceError (TDZ)
let y = 5;

greet();         // works (declaration hoisted)
function greet() {}

bye();           // ReferenceError
const bye = () => {};

function f(a, b = 10) { return a + b; }   // default param
```

---

### §108. MongoDB Query Operators — $eq / $gt / $gte / $lt / $lte / $ne

| Op | meaning |
|---|---|
| $eq | equals |
| $ne | not equals |
| $gt | greater than |
| $gte | greater or equal |
| $lt | less than |
| $lte | less or equal |
| $in | in array |
| $nin | not in array |

🧓 השוואות במונגו לחיפוש.
👶 דרכים להשוות מספרים בquery.
💂 Mongo syntax: { field: { $op: value } }.
🎓 $in for OR multiple values. compound conditions via $and.
👨‍💻 indexes critical for $gt/$lt range queries.
🎩 Atlas search for full-text + range.

```js
// users older than 18
db.users.find({ age: { $gt: 18 } });
// price between 10 and 100
db.products.find({ price: { $gte: 10, $lte: 100 } });
// status not "deleted"
db.posts.find({ status: { $ne: "deleted" } });
// in list
db.users.find({ role: { $in: ["admin", "mod"] } });
```

---

### §109. MongoDB Basics — Cluster / Collection / Atlas / Connection String

| Term | מה |
|---|---|
| Cluster | grouped DB instances |
| Collection | bag of documents (like SQL table) |
| Document | one record (like SQL row) |
| Connection String | mongodb+srv://... |
| MongoDB Atlas | cloud-managed Mongo |

🧓 Mongo=מסד נתונים שמירת documents.
👶 collection=תיקייה. document=מסמך.
💂 schemaless (unlike SQL). JSON-like docs.
🎓 replica set for HA. sharding for scale.
👨‍💻 use Atlas free tier. always use schemas (Mongoose).
🎩 storage engine WiredTiger. journal for durability.

```js
import { MongoClient } from "mongodb";
const uri = "mongodb+srv://user:pass@cluster.mongodb.net/myapp";
const client = new MongoClient(uri);
await client.connect();
const db = client.db("myapp");
const users = db.collection("users");
await users.insertOne({ name: "Tal" });
```

---

### §110. MongoDB Modify — update / deleteOne / deleteMany / updateMany

| Op | מה |
|---|---|
| updateOne | first match |
| updateMany | all matches |
| deleteOne | first match |
| deleteMany | all matches |
| replaceOne | full replacement |

🧓 דרכים לעדכן ולמחוק.
👶 לעדכן אחד או הרבה. למחוק אחד או הרבה.
💂 atomic per-document. {} filter = all.
🎓 returns { matchedCount, modifiedCount }.
👨‍💻 always use specific filter. never empty {} delete.
🎩 writeConcern: majority + journal.

```js
await users.updateOne({ email }, { $set: { active: true } });
await users.updateMany({ role: "user" }, { $set: { tier: "free" } });
await users.deleteOne({ email });
await users.deleteMany({ active: false });
```

---

### §111. React Project Files — App.jsx / index.html / main.jsx

| File | תפקיד |
|---|---|
| index.html | root HTML, mount point |
| main.jsx | app bootstrap, ReactDOM.render |
| App.jsx | top-level component |
| App.css | top-level styles |
| {} | React JSX expression syntax |
| CSS import | `import "./style.css"` |

🧓 קבצי הבסיס של פרויקט React.
👶 איפה מתחיל הקוד שלך.
💂 Vite/CRA convention. main.jsx renders <App/> to #root.
🎓 strict mode wrapper. error boundaries at App level.
👨‍💻 keep main.jsx minimal. structure under src/.
🎩 hydration: hydrateRoot for SSR.

```html
<!-- index.html -->
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
```jsx
// main.jsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
createRoot(document.getElementById("root")).render(<App />);
```
```jsx
// App.jsx
function App() { return <h1>Hello {name}</h1>; }
export default App;
```

---

### §112. React Styling — className / inline style

| Method | תחביר |
|---|---|
| className | `className="card"` (string CSS class) |
| inline style | `style={{color: "red"}}` (object) |
| CSS Modules | `import s from "./x.module.css"` |
| styled-components | `styled.div\`...\`` |
| Tailwind | `className="bg-blue-500"` |

🧓 דרכים לעצב קומפוננטה.
👶 className לCSS חיצוני, style לpropsspecific.
💂 className uses kebab-case in CSS but camelCase NOT — string only.
🎓 inline style uses camelCase keys: backgroundColor, fontSize.
👨‍💻 prefer Tailwind or CSS Modules over inline.
🎩 styled-components: dynamic CSS, theme.

```jsx
// className
<div className="card primary"></div>

// inline style
<div style={{ color: "red", fontSize: "1.2rem" }}></div>

// CSS Modules
import s from "./Card.module.css";
<div className={s.card}></div>

// Tailwind
<div className="bg-blue-500 text-white p-4 rounded"></div>
```

---

### §113. React Ecosystem — React / React Native / Vite / Component / Client Side

| Term | מה |
|---|---|
| React | UI library |
| React Native | mobile via JS |
| Vite | build tool / dev server |
| Component | reusable UI piece |
| Client Side | browser execution |
| RFC | proposal in React community |

🧓 React ליצירת ממשקי משתמש בכמה פלטפורמות.
👶 ספריות וכלים לבניית האתר.
💂 React Web vs Native. Vite = fast dev server.
🎓 SPA via React → SSR via Next.js.
👨‍💻 keep dependencies lean. monitor bundle size.
🎩 React 18 concurrent. Server Components.

```bash
# Create Vite + React project
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev   # http://localhost:5173
```
```jsx
// Component
function Card({ title }) { return <div>{title}</div>; }
export default Card;
```

---

### §114. React Components & Handlers — addPost / deletePost / MainScreen / element

| Pattern | מה |
|---|---|
| handler | function for event |
| event | user action (click, change) |
| element | React element (JSX result) |
| component | function returning JSX |

🧓 קומפוננטות = חלקי דף. handlers = פעולות.
👶 כפתורים שעושים דברים.
💂 onClick={handler}. handler is function.
🎓 stable handlers via useCallback if passed deeply.
👨‍💻 name handlers `handleX` or `onX`. arrow class fields.
🎩 SyntheticEvent pooling pre-React 17.

```jsx
function PostList({ posts, onAdd, onDelete }) {
  return (
    <div>
      <button onClick={onAdd}>Add</button>
      {posts.map(p => (
        <div key={p.id}>
          {p.title}
          <button onClick={() => onDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

### §115. React Context Pattern — createContext / Provider / Prop Drilling

| Term | מה |
|---|---|
| createContext | declares context |
| Provider | wraps subtree, supplies value |
| useContext | reads value |
| Prop Drilling | passing props through many levels |

🧓 context = רדיו ציבורי לכל הילדים.
👶 דרך לשתף ערך בלי props.
💂 createContext returns Provider+Consumer. useContext for hooks.
🎓 split contexts: AuthCtx, ThemeCtx, etc. — avoid mega-context.
👨‍💻 memoize value to prevent re-renders.
🎩 useContextSelector (3rd party) for partial subscribe.

```jsx
const AuthCtx = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <AuthCtx.Provider value={value}><Toolbar/></AuthCtx.Provider>;
}

function Toolbar() {
  const { user } = useContext(AuthCtx);
  return <p>{user?.name ?? "Guest"}</p>;
}
```

---

### §116. useRef Patterns — ref / ref.current / focus / state update

| Pattern | מה |
|---|---|
| useRef | mutable container |
| ref attribute | DOM element reference |
| ref.current | the value |
| focus | input.focus() |
| forwardRef | pass ref through component |

🧓 ref = מצביע פנימי שלא משפיע על רינדור.
👶 דרך לגשת לDOM או לזכור משהו.
💂 setting ref.current doesn't trigger re-render.
🎓 useRef for: DOM, timers, prev values.
👨‍💻 don't read ref.current in render — only effects.
🎩 useImperativeHandle for exposing methods.

```jsx
function SearchBox() {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current.focus(); }, []);
  return <input ref={inputRef} />;
}

function Counter() {
  const renders = useRef(0);
  renders.current++;   // doesn't re-render
  return <p>Renders: {renders.current}</p>;
}
```

---

### §117. Tailwind Basics — utility classes / installation / responsive

| Concept | מה |
|---|---|
| utility classes | small CSS atoms |
| installation | npm + config |
| responsive | sm:/md:/lg: prefixes |
| dark mode | dark: prefix |
| variants | hover:/focus:/disabled: |

🧓 Tailwind = classes קטנות במקום CSS.
👶 כל property = class אחד.
💂 mobile-first. md: ל-768px+. lg: ל-1024px+.
🎓 @apply for component classes. config-driven.
👨‍💻 just-in-time scanning. no purge needed.
🎩 plugin system. arbitrary values [123px].

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded
               md:px-6 md:py-3 dark:bg-gray-800">
  Click
</button>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <Card/> <Card/> <Card/>
</div>
```

---

### §118. TypeScript Setup — tsconfig.json / Compiler / .ts / models folder

| File | תפקיד |
|---|---|
| tsconfig.json | compiler config |
| .ts | TS source file |
| .tsx | TS + JSX |
| .js | JS output (or source) |
| Compiler / tsc | TypeScript compiler |
| models folder | type definitions |

🧓 TypeScript מוסיף בדיקה מסוגי JavaScript.
👶 כותבים ב-.ts → מתרגם ל-.js.
💂 strict mode. noImplicitAny. exactOptionalPropertyTypes.
🎓 incremental builds. project references.
👨‍💻 tsc --noEmit for typecheck only. Vite handles bundle.
🎩 declaration files (.d.ts) for ambient types.

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  },
  "include": ["src/**/*"]
}
```
```ts
// src/models/User.ts
export interface User {
  id: number;
  name: string;
  email?: string;
}
```

---

### §119. Auth Providers — Supabase / Firebase / Kinde / Appwrite

| Provider | strength |
|---|---|
| Supabase | postgres + auth + realtime |
| Firebase | full backend, Google |
| Kinde | auth-focused |
| Appwrite | open-source BaaS |
| Clerk | premium auth UI |

🧓 שירותים שמטפלים באימות בלי שתכתוב הכל.
👶 חברות שעוזרות לעשות login.
💂 SDK + dashboard. OAuth, magic link, MFA.
🎓 free tier covers small apps. trade-off: vendor lock-in.
👨‍💻 keep abstraction layer for portability.
🎩 PKCE flow for SPAs. JWT signing.

```js
// Supabase
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(URL, KEY);
await supabase.auth.signInWithPassword({ email, password });
const { data } = await supabase.auth.getUser();

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
await signInWithEmailAndPassword(auth, email, password);
```

---

### §120. Design System — shadcn / cn / variants / tokens / Radix / cva

| Concept | מה |
|---|---|
| cn helper | clsx + tailwind-merge |
| component variants | size/intent classes |
| design tokens | CSS vars |
| theme tokens | semantic naming |
| Radix primitives | unstyled accessible components |
| cva | class-variance-authority |
| asChild slot | Radix slot pattern |

🧓 design system = ספריית רכיבים עם עיצוב אחיד.
👶 כפתורים וטפסים בסגנון אחיד.
💂 shadcn copies code into your repo. cva for variants.
🎓 tokens layer separate from components.
👨‍💻 use cn() everywhere for conditional classes.
🎩 a11y built-in via Radix.

```ts
// utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...args) => twMerge(clsx(args));

// Button.tsx
import { cva } from "class-variance-authority";
const button = cva("rounded font-medium", {
  variants: {
    intent: { primary: "bg-blue-500", danger: "bg-red-500" },
    size: { sm: "px-2 py-1 text-sm", md: "px-4 py-2" }
  }
});
<button className={cn(button({ intent: "primary", size: "md" }))}>Save</button>
```

---

### §121. DevOps — build / health check / smoke / preview / release / Docker

| Concept | מה |
|---|---|
| build command | compile/bundle |
| smoke test | basic post-deploy |
| preview deployment | per-PR URL |
| production readiness | checklist |
| health check | /health endpoint |
| environment variables | runtime config |
| Docker / Compose | containerization |
| service | running process |

🧓 כלי פריסה ובדיקה.
👶 איך משחררים גרסה לאוויר.
💂 build → test → deploy → smoke.
🎓 12-factor app principles. immutable infra.
👨‍💻 always rollback plan. canary releases.
🎩 Kubernetes for orchestration at scale.

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: ${DATABASE_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
```
```js
// /health endpoint
app.get("/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));
```

---

### §122. HTML/CSS Basics — HTML doc / form / selector / semantic / cascade

| Term | מה |
|---|---|
| HTML document | root structure |
| HTML form | input collection |
| CSS selector | rule target |
| semantic HTML | meaningful tags (header, main, article) |
| label | input description |
| cascade | priority rules |
| accessibility | a11y |

🧓 HTML מבנה הדף, CSS עיצוב.
👶 תגיות לסידור, classes לעיצוב.
💂 semantic = better SEO + a11y.
🎓 specificity: inline > id > class > tag.
👨‍💻 always use <label for=>. ARIA when semantic isn't enough.
🎩 cascade layers (CSS @layer).

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header><h1>Title</h1></header>
  <main>
    <form>
      <label for="email">Email</label>
      <input id="email" type="email" required>
    </form>
  </main>
</body>
</html>
```
```css
/* selector specificity */
#submit { color: red; }       /* specificity 1,0,0 */
.btn { color: blue; }          /* 0,1,0 */
button { color: green; }       /* 0,0,1 */
```

---

### §123. Nest.js — module / controller / service / DTO / pipe / guard

| Building block | role |
|---|---|
| module | feature container |
| controller | route handlers |
| service | business logic |
| provider | injectable |
| DTO | data transfer object |
| pipe | transform/validate |
| guard | auth/authz |
| interceptor | wrap handler |
| decorator | metadata |

🧓 Nest.js framework מבנה כמו Angular לbackend.
👶 חלוקה למודולים לפי features.
💂 dependency injection. opinionated structure.
🎓 testing easy via DI. interceptors for cross-cutting.
👨‍💻 prefer over plain Express in large teams.
🎩 microservices via Nest patterns.

```ts
@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

@Controller("users")
export class UserController {
  constructor(private svc: UserService) {}
  @Get() findAll() { return this.svc.findAll(); }
  @Post() @UseGuards(AuthGuard) create(@Body() dto: CreateUserDto) {
    return this.svc.create(dto);
  }
}
```

---

### §124. Next.js — App Router / SSR/SSG / API route / dynamic route

| Concept | מה |
|---|---|
| App Router | new routing (file-based, RSC) |
| dynamic route | `[id]` folder |
| layout | shared shell |
| API route | server endpoint |
| metadata API | <head> tags |
| SEO | search optimization |
| image optimization | next/image |
| client component | "use client" |
| server component | default in App Router |
| route handler | API endpoint |
| server action | form mutation |

🧓 Next.js = React + serverside features.
👶 routing אוטומטי לפי תיקיות.
💂 file-system routing. RSC streams.
🎓 server components default. client opt-in.
👨‍💻 minimize "use client" boundaries. cache strategically.
🎩 PPR (partial prerendering).

```tsx
// app/users/[id]/page.tsx
export default async function User({ params }) {
  const user = await getUser(params.id);
  return <h1>{user.name}</h1>;
}

// app/api/users/route.ts
export async function GET() { return Response.json({ users: [] }); }

// Client component
"use client";
import { useState } from "react";
export default function Counter() { ... }
```

---

### §125. SQL Concepts — table / row / column / JOIN / foreign key / migration

| Term | מה |
|---|---|
| table | grid of rows |
| row | record |
| column | field |
| primary key | unique row identifier |
| foreign key | reference to PK in another table |
| relation | logical link |
| JOIN | combine tables |
| migration | schema change script |
| ORM | code abstraction (Prisma, Drizzle) |
| transaction | atomic multi-op |
| CRUD | create/read/update/delete |

🧓 SQL = שפה לעבודה עם DB טבלאי.
👶 טבלה כמו אקסל מקושר.
💂 JOIN merges rows on key. transactions rollback on error.
🎓 indexes for perf. ACID guarantees.
👨‍💻 use ORM for type-safety. raw SQL for complex.
🎩 query plan analysis. denormalization when justified.

```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title TEXT
);

SELECT u.name, p.title
FROM users u
LEFT JOIN posts p ON p.user_id = u.id;

BEGIN;
  INSERT INTO users (name) VALUES ('Tal') RETURNING id;
  INSERT INTO posts (user_id, title) VALUES (1, 'Hello');
COMMIT;
```

---

### §126. Git Workflow — repository / branch / commit / pull request

| Term | מה |
|---|---|
| repository (repo) | versioned project folder |
| branch | parallel line of changes |
| commit | snapshot of changes |
| pull request (PR) | review + merge proposal |

🧓 Git = ניהול גרסאות לקוד.
👶 שמירת היסטוריה של שינויים.
💂 main branch + feature branches. squash merge to main.
🎓 conventional commits. semantic versioning.
👨‍💻 small frequent commits. PR < 400 lines.
🎩 git internals: object DB (blob, tree, commit, tag).

```bash
git init                      # new repo
git checkout -b feature/login # new branch
git add .                     # stage
git commit -m "feat: add login form"
git push origin feature/login

# Then on GitHub: open PR, review, merge.
```

---

### §127. Express Form Events — body-parser / event.preventDefault

| API | פעולה |
|---|---|
| body-parser | parse req.body (deprecated, built into Express 4.16+) |
| express.json() | JSON body parser |
| express.urlencoded() | form-encoded parser |
| event.preventDefault | stop default form submission |

🧓 כלים לעיבוד טפסים בExpress.
👶 פותחים את התוכן של POST.
💂 express.json() built-in now.
🎓 multipart needs multer.
👨‍💻 always validate parsed body.
🎩 streaming for large files.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/contact", (req, res) => {
  console.log(req.body);     // { name: "Tal" }
  res.json({ received: true });
});
```
```html
<form onsubmit="onSubmit(event)">
  <input name="email">
  <button>Send</button>
</form>
<script>
  function onSubmit(e) {
    e.preventDefault();      // stop browser submit
    fetch("/contact", { method: "POST", body: new FormData(e.target) });
  }
</script>
```

---

### §128. Scope Chain — scope / lexical / closure

| Term | מה |
|---|---|
| scope | accessibility region |
| scope chain | inner scope can access outer |
| lexical | by code position (not call) |
| closure | function + captured environment |

🧓 scope chain = פונקציה רואה משתנים מההורה שלה.
👶 הפונקציה זוכרת מה היה סביבה.
💂 nested function looks up via chain.
🎓 lexical = compile-time. dynamic = call-time (rare).
👨‍💻 module pattern uses closures for privacy.
🎩 [[Scopes]] internal slot. EnvironmentRecords.

```js
function outer() {
  const x = 10;
  function inner() {
    console.log(x);   // 10 — found via scope chain
  }
  inner();
}
outer();

// closure example
function make() {
  let count = 0;
  return () => ++count;
}
const fn = make();
fn();  // 1
fn();  // 2  — count persists in closure
```

---

✅ **30 קלסטרים חדשים נוספו עם תוכן מלא** (ידני, קומפקטי, אבל אמיתי).

---

## 95-B. PHASE J round 2 — 11 final clusters

> Last batch — covers the final orphans + workbook + AI dev tools.

---

### §129. DOM Node Removal — removeChild / remove

🧓 דרכים למחוק אלמנט מ-DOM.
👶 הסרת ילד או הסרה עצמית.
💂 removeChild(child) legacy. element.remove() modern.
🎓 returns removed node, can re-attach.
👨‍💻 always check parent exists before removeChild.
🎩 disconnectedCallback fires on custom elements.

```js
// 🧓 סבתא — legacy
parent.removeChild(child);

// 👶 ילד — modern
child.remove();

// 💂 חייל — multi-remove
document.querySelectorAll(".old").forEach(el => el.remove());

// 🎓 סטודנט — re-attach
const removed = parent.removeChild(child);
otherParent.appendChild(removed);

// 👨‍💻 ג'וניור — defensive
if (el && el.parentNode) el.parentNode.removeChild(el);

// 🎩 פרופ׳ — MutationObserver detects
const obs = new MutationObserver(muts => {
  muts.forEach(m => m.removedNodes.forEach(n => log("removed", n)));
});
```

---

### §130. Error Objects — Error / TypeError / Exception / event object

| Type | constructor / use |
|---|---|
| Error | base, generic |
| TypeError | wrong type |
| RangeError | out of range |
| SyntaxError | parse error |
| Exception | term for any thrown |
| event object | { type, target, ... } |

🧓 שגיאות הן אובייקטים. Exception=שם נוסף לזריקה.
👶 Error בסיסי. TypeError ספציפי.
💂 Error.message, Error.stack, Error.cause (ES2022).
🎓 instanceof for type-narrowing in catch.
👨‍💻 always extend Error for custom types.
🎩 V8 captures stack on `new Error()`.

```js
// 🧓 סבתא
try { JSON.parse("oops"); }
catch (e) { console.log(e.message); }   // "Unexpected token..."

// 👶 ילד — types
new Error("generic");
new TypeError("wrong type");
new RangeError("out of range");

// 💂 חייל — instanceof
try { ... }
catch (e) {
  if (e instanceof TypeError) handleTypeError(e);
  else if (e instanceof SyntaxError) handleSyntax(e);
  else throw e;
}

// 🎓 סטודנט — error chaining
try { await db.query(); }
catch (cause) { throw new Error("DB failed", { cause }); }

// 👨‍💻 ג'וניור — custom Error
class ValidationError extends Error {
  constructor(msg, field) {
    super(msg);
    this.name = "ValidationError";
    this.field = field;
  }
}

// 🎩 פרופ׳ — event object structure
btn.addEventListener("click", (e) => {
  e.type;        // "click"
  e.target;      // <button>
  e.timeStamp;   // ms since page load
  e.bubbles;     // boolean
});
```

---

### §131. Vite Project Creation — npm create vite@latest

🧓 פקודה ליצירת פרויקט Vite חדש.
👶 דרך מהירה לפתוח React app.
💂 npm create vite@latest my-app -- --template react.
🎓 templates: vanilla, react, react-ts, vue, svelte, etc.
👨‍💻 auto-installs dependencies, sets up dev server.
🎩 uses scaffolding from create-vite npm package.

```bash
# 🧓 סבתא
npm create vite@latest

# 👶 ילד — name + template
npm create vite@latest my-app -- --template react

# 💂 חייל — TypeScript template
npm create vite@latest my-app -- --template react-ts

# 🎓 סטודנט — full setup
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev   # → http://localhost:5173

# 👨‍💻 ג'וניור — pnpm/yarn alternatives
pnpm create vite my-app --template react
yarn create vite my-app --template react

# 🎩 פרופ׳ — community templates
npm create vite@latest -- --template community/...
```

---

### §132. React Hook fundamentals — Hook / mutable / immutable

| Term | meaning |
|---|---|
| Hook | special React function (use*) |
| mutable | can be changed in place |
| immutable | requires new copy on update |
| Rules of Hooks | only top-level, only in function components |

🧓 Hook=פונקציה עם use. immutable=חייב לייצר חדש.
👶 כללים מיוחדים לפונקציות hook.
💂 Hooks must be called same order every render.
🎓 React state must be updated immutably.
👨‍💻 eslint-plugin-react-hooks enforces rules.
🎩 Fiber stores hook state in linked list — order-dependent.

```jsx
// 🧓 סבתא
const [n, setN] = useState(0);   // Hook usage

// 👶 ילד — immutable update
// ❌ mutate
state.list.push(item);
// ✅ immutable
setState({ ...state, list: [...state.list, item] });

// 💂 חייל — Rules of Hooks
function Comp() {
  const [a, setA] = useState(0);
  if (cond) {
    // ❌ conditional Hook!
    const [b, setB] = useState(0);
  }
  return ...;
}

// 🎓 סטודנט — custom hooks
function useToggle(initial = false) {
  const [val, setVal] = useState(initial);
  const toggle = useCallback(() => setVal(v => !v), []);
  return [val, toggle];
}

// 👨‍💻 ג'וניור — immer for ergonomics
import produce from "immer";
setState(produce(draft => { draft.list.push(item); }));

// 🎩 פרופ׳ — fiber memoizedState
// Each Hook adds to fiber.memoizedState linked list
// Position-dependent — that's why no conditional Hooks
```

---

### §133. TS Advanced Types — tuple / void / Type Safety / Typing State

| Concept | meaning |
|---|---|
| tuple | fixed-length array of typed slots |
| void | function returns nothing |
| Type Safety | compile-time checking |
| TypeScript | language with static types |
| Typing State | typing useState etc |
| type annotation | `: Type` syntax |

🧓 TS adds explicit types to JS.
👶 צריך לכתוב מה כל משתנה.
💂 type vs interface, generics, narrowing.
🎓 strict mode catches more bugs.
👨‍💻 typed useState, typed reducers.
🎩 erasable types proposal — drop runtime cost.

```ts
// 🧓 סבתא
let count: number = 5;
let name: string = "Tal";

// 👶 ילד — function
function greet(name: string): void { console.log(name); }

// 💂 חייל — tuple
let coord: [number, number] = [10, 20];
let entry: [string, number, boolean] = ["age", 30, true];

// 🎓 סטודנט — typed useState
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);

// 👨‍💻 ג'וניור — typed reducer
type State = { count: number };
type Action = { type: "INC" } | { type: "SET"; value: number };
const reducer: React.Reducer<State, Action> = (s, a) => {
  switch (a.type) {
    case "INC": return { count: s.count + 1 };
    case "SET": return { count: a.value };
  }
};

// 🎩 פרופ׳ — readonly tuple
type Point = readonly [number, number];
const p: Point = [1, 2];
// p[0] = 5;  // ❌ readonly
```

---

### §134. TypeScript App Models — User/Book/Genre/Category/Expense/Income

🧓 דוגמה למבנה types של אפליקציה.
👶 טיפוסים שמתארים את המידע באפליקציה.
💂 interface User, type Book, etc.
🎓 inheritance via extends. composition via & or generics.
👨‍💻 keep models in src/models/.
🎩 branded types for ID safety.

```ts
// 🧓 סבתא — base
interface BaseUser { id: number; name: string; }

// 👶 ילד — specific users
interface RegisteredUser extends BaseUser { email: string; }
interface GuestUser extends BaseUser { sessionId: string; }
type User = RegisteredUser | GuestUser;

// 💂 חייל — domain models
interface Book { id: number; title: string; genre: Genre; }
type Genre = "fiction" | "non-fiction" | "tech";

// 🎓 סטודנט — Budget Manager domain
interface Expense {
  id: number;
  amount: Amount;
  category: Category;
  date: Date;
}
type Amount = number;
type Category = "food" | "rent" | "transport";

interface Income {
  id: number;
  amount: Amount;
  source: string;
}

// 👨‍💻 ג'וניור — computed types
type BudgetSummary = {
  totalIncome: Amount;
  totalExpense: Amount;
  byCategory: Record<Category, Amount>;
};

// 🎩 פרופ׳ — branded ID
type UserId = number & { __brand: "UserId" };
function getUser(id: UserId): User { /* ... */ }
const id = 5 as UserId;
getUser(id);
// getUser(5);  // ❌ Type 'number' is not assignable to UserId
```

---

### §135. AI Engineering Full — embeddings/chunking/evaluation/guardrails

| Concept | meaning |
|---|---|
| embeddings | numeric vector representation |
| chunking | split docs into ~500 token pieces |
| evaluation | measure LLM output quality |
| guardrails | safety+structure constraints |
| hallucination check | detect made-up facts |
| LangChain | popular AI framework |
| token budget | max tokens per call |
| vector store | DB of embeddings |
| streaming response | progressive output |
| Vercel AI SDK | TypeScript AI lib |

🧓 כלים ל-RAG ול-AI applications.
👶 פיצול, הטבעה, וידוא נכונות.
💂 OpenAI/Anthropic SDK + chunking + retrieval.
🎓 evaluation with LLM-as-judge or embeddings similarity.
👨‍💻 guardrails: zod schema validation on output.
🎩 vector DB: pgvector, Pinecone, Weaviate.

```ts
// 🧓 סבתא — basic call
import { generateText } from "ai";
const { text } = await generateText({ model: openai("gpt-4"), prompt: "Hi" });

// 👶 ילד — streaming
import { streamText } from "ai";
const { textStream } = await streamText({ model, prompt });
for await (const chunk of textStream) console.log(chunk);

// 💂 חייל — chunking + embeddings
const chunks = splitText(longDoc, { size: 500, overlap: 50 });
const embeddings = await Promise.all(chunks.map(c => embed(c)));
await vectorDB.insert(chunks.map((c, i) => ({ text: c, vector: embeddings[i] })));

// 🎓 סטודנט — RAG retrieval
const queryVec = await embed(userQuery);
const relevant = await vectorDB.search(queryVec, { k: 5 });
const answer = await generateText({
  model,
  messages: [
    { role: "system", content: `Use this context: ${relevant.join("\n")}` },
    { role: "user", content: userQuery }
  ]
});

// 👨‍💻 ג'וניור — structured output with zod
import { z } from "zod";
const schema = z.object({ summary: z.string(), tags: z.array(z.string()) });
const { object } = await generateObject({ model, schema, prompt });
// object is typed: { summary: string; tags: string[] }

// 🎩 פרופ׳ — eval pipeline
const cases = [{ input: "What is X?", expected: "Y" }];
for (const c of cases) {
  const out = await generateText({ model, prompt: c.input });
  const score = await llmJudge(out.text, c.expected);   // score 0-1
  log({ input: c.input, score });
}
```

---

### §136. if/else (sub-cluster of code_decisions)

🧓 הסתעפות על תנאי.
👶 if=אם, else=אחרת.
💂 prefer early-return over deep nesting.
🎓 chained if/else if/else for multi-branch.
👨‍💻 ternary for assignment, if/else for action.
🎩 V8 branch prediction matters in hot paths.

```js
// 🧓 סבתא
if (age >= 18) console.log("בוגר");
else console.log("קטין");

// 👶 ילד
if (n > 0) {
  console.log("חיובי");
} else if (n < 0) {
  console.log("שלילי");
} else {
  console.log("אפס");
}

// 💂 חייל — early return
function process(x) {
  if (!x) return null;          // guard 1
  if (x.invalid) return null;   // guard 2
  return doWork(x);              // main path
}

// 🎓 סטודנט — ternary
const status = age >= 18 ? "adult" : "minor";

// 👨‍💻 ג'וניור — boolean short-circuit
const config = userConfig || defaultConfig;
const value = obj?.x ?? "fallback";

// 🎩 פרופ׳ — pattern matching (proposal)
match (point) {
  when { x: 0, y: 0 }: "origin",
  when { x, y } if (x === y): "diagonal",
  default: "?"
}
```

---

### §137. Auth Attacks & Mitigations — bcrypt / CORS / CSRF

| Attack | Mitigation |
|---|---|
| password leak | bcrypt + salt |
| CSRF | SameSite cookie + token |
| CORS issues | proper Access-Control-* headers |
| XSS | DOMPurify + CSP |
| brute force | rate limit + captcha |

🧓 איך לאבטח אימות ולהגן מהתקפות.
👶 כלים להגנה על משתמשים.
💂 bcrypt for password hashing. CSRF tokens.
🎓 SameSite cookie. CORS setup. CSP headers.
👨‍💻 helmet middleware bundles many fixes.
🎩 OWASP Top 10. defense in depth.

```js
// 🧓 סבתא — bcrypt
import bcrypt from "bcryptjs";
const hash = await bcrypt.hash(password, 10);
const valid = await bcrypt.compare(input, hash);

// 👶 ילד — CORS
import cors from "cors";
app.use(cors({
  origin: "https://myapp.com",
  credentials: true
}));

// 💂 חייל — CSRF protection
import csurf from "csurf";
app.use(csurf({ cookie: true }));
app.post("/transfer", (req, res) => {
  // req.csrfToken() must match in form
});

// 🎓 סטודנט — helmet (bundle)
import helmet from "helmet";
app.use(helmet());   // sets many security headers

// 👨‍💻 ג'וניור — rate limit
import rateLimit from "express-rate-limit";
app.use("/login", rateLimit({ windowMs: 15*60*1000, max: 5 }));

// 🎩 פרופ׳ — Content Security Policy
res.setHeader("Content-Security-Policy",
  "default-src 'self'; script-src 'self' https://trusted.com");
```

---

### §138. Task Manager Workbook (lesson workbook_taskmanager)

🧓 פרויקט לימודי לתרגול JavaScript בסיסי.
👶 בניית todo list.
💂 variables, conditions, arrays, functions, events, objects.
🎓 try/catch + async/await for full coverage.
👨‍💻 enables hands-on building experience.
🎩 progressive enhancement: vanilla → React → TS migration.

```js
// 🧓 סבתא — variables
let tasks = [];
const MAX_TASKS = 10;

// 👶 ילד — conditions
if (tasks.length < MAX_TASKS) tasks.push(newTask);

// 💂 חייל — events + functions
function addTask() {
  const input = document.querySelector("#new-task").value;
  if (!input) return;
  tasks.push({ id: Date.now(), text: input, done: false });
  render();
}
document.querySelector("#add").addEventListener("click", addTask);

// 🎓 סטודנט — async fetch
async function loadTasks() {
  try {
    const res = await fetch("/api/tasks");
    tasks = await res.json();
    render();
  } catch (e) { console.error(e); }
}

// 👨‍💻 ג'וניור — full CRUD
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// 🎩 פרופ׳ — workbook progression
// Stage 1: vanilla JS (this lesson)
// Stage 2: React refactor
// Stage 3: TS types + Zustand state
// Stage 4: Backend API integration
```

---

### §139. AI Dev Tools — Cursor / Windsurf / Claude Code / ChatGPT / Copilot

| Tool | strength |
|---|---|
| Cursor | full IDE fork, multi-file edits |
| Windsurf | similar to Cursor, multi-tab |
| Claude Code | terminal-based, agentic |
| ChatGPT | chat for ideation |
| Copilot | inline autocomplete |
| Codex (OpenAI) | API for code |

🧓 כלים שעוזרים לכתוב קוד עם AI.
👶 כלי בינה מלאכותית למתכנתים.
💂 Cursor=IDE. Copilot=autocomplete. Claude=agentic.
🎓 each has different sweet spot. mix them.
👨‍💻 use for boilerplate, tests, refactor, docs.
🎩 prompt engineering matters. context window limits.

```bash
# 🧓 סבתא — Cursor
# Open file → Cmd+K → "make this async"

# 👶 ילד — Copilot
# Type comment + start line → ghost autocomplete suggests

# 💂 חייל — Claude Code (terminal)
claude
> /help
> Read app.js, find the handleClick function, add error handling

# 🎓 סטודנט — multi-tool workflow
# 1. ChatGPT: brainstorm architecture
# 2. Cursor: implement component
# 3. Copilot: fill in repetitive code
# 4. Claude Code: review + add tests

# 👨‍💻 ג'וניור — productivity tips
# - keep prompts specific
# - reference exact file paths
# - request tests with code

# 🎩 פרופ׳ — workflow integration
# Cursor for editor, Claude Code for batch tasks,
# Copilot ambient. Each adds different leverage.
```

---

✅ **11 קלסטרים נותרים נסגרו עם תוכן** — סה״כ 140 קלסטרים, 0 ללא תוכן.

---

**עודכן:** 2026-05-02 23:42 · ידני · §95-§139 (45 orphan-absorber clusters) · 6-level translations · trainer cluster-mode · 0 orphans
