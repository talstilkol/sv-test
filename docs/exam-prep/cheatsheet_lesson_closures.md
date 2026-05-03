# Closures — סגירות (הגורם השכיח לבאגים ב-React) — דף סיכום למבחן

**מודול SVCollege:** —

**תיאור:** Closures הם המנגנון החשוב ביותר ב-JavaScript ובו-זמנית הגורם השכיח לבאגים ב-React. השיעור עובר משרשרת ה-scope ועד stale closures ב-useEffect, ומראה איך לזהות, להבין, ולתקן.

**מספר מושגים:** 8

---

## מושגים בסיכום

### 1. scope chain

**רמת קושי:** 5/10

**דוגמה:**
```
const user = 'Tal';

function outer() {
  const x = 1;

  function inner() {
    const y = 2;
    console.log(y);    // נמצא בתוך inner
    console.log(x);    // נמצא ב-outer (scope אבא)
    console.log(user); // נמצא ב-global
    // console.log(z); // ReferenceError — לא קיים בשרשרת
  }

  inner();
}

outer();
```

**הסבר:** כש-inner מחפשת y — מוצאת בתוכה. כשמחפשת x — עולה ל-outer ומוצאת. כשמחפשת user — עולה עוד למעלה ל-global. שרשרת חיפוש דרך כל ה-scopes הסובבים.

---

### 2. lexical scope

**רמת קושי:** 6/10

**דוגמה:**
```
function makeCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// count לא זמין מבחוץ, אבל increment 'זוכרת' אותו
```

**הסבר:** increment הוצהרה בתוך makeCounter, ולכן רואה את count. גם אחרי ש-makeCounter הסתיימה — increment זוכרת את count כי lexical scope נקבע בכתיבה. זוהי closure.

---

### 3. closure

**רמת קושי:** 8/10

**דוגמה:**
```
function makeBank() {
  let balance = 0;

  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    check() { return balance; },
  };
}

const account = makeBank();
account.deposit(100);
account.deposit(50);
account.withdraw(30);
console.log(account.check()); // 120
console.log(account.balance); // undefined — פרטי!
```

**הסבר:** balance מוצהר בתוך makeBank ולא חשוף החוצה. שלוש המתודות (deposit/withdraw/check) הן closures שמשתפות גישה ל-balance. זהו דפוס ה-private state שהיה ה-module pattern של JS לפני ES6.

---

### 4. closure variables

**רמת קושי:** 7/10

**דוגמה:**
```
function makeId() {
  let counter = 0;
  return function next() {
    counter += 1;
    return counter;
  };
}

const id1 = makeId(); // closure A: counter=0
const id2 = makeId(); // closure B: counter=0 (נפרד!)

console.log(id1()); // 1
console.log(id1()); // 2
console.log(id2()); // 1 — נפרד מ-id1
console.log(id1()); // 3
```

**הסבר:** כל קריאה ל-makeId יוצרת closure חדשה עם counter משלה. id1 ו-id2 הם closures נפרדות — לא משתפות counter. דפוס יסוד ל-instance state.

---

### 5. stale closure

**רמת קושי:** 9/10

**דוגמה:**
```
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ count נתפס כ-0 — לא יתעדכן!
      // setCount(count + 1);

      // ✅ functional update — מקבל את הערך העדכני
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // dependencies ריקות בכוונה — interval רץ פעם אחת

  return <div>{count}</div>;
}
```

**הסבר:** השורה המבטלת מראה את הבאג: count נשאר 0 בכל איטרציה. ה-functional updater (c => c+1) מקבל מ-React את הערך העדכני, ולא מסתמך על closure ישנה.

---

### 6. closure in event handlers

**רמת קושי:** 7/10

**דוגמה:**
```
// כל כפתור עם closure משלו על label
function setupButton(btn, label) {
  btn.addEventListener('click', () => {
    alert('Clicked: ' + label);
  });
}

setupButton(document.querySelector('#save'), 'Save');
setupButton(document.querySelector('#cancel'), 'Cancel');
// כל לחיצה תפעיל את ה-closure המתאימה
```

**הסבר:** כל קריאה ל-setupButton יוצרת closure חדשה שתופסת את label המתאים. שני הכפתורים שונים — שני handlers נפרדים, כל אחד זוכר את ה-label שלו.

---

### 7. closure in useEffect

**רמת קושי:** 9/10

**דוגמה:**
```
function Counter() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  // ❌ stale: count תקוע ב-0
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, delay);
    return () => clearInterval(id);
  }, []);

  // ✅ נכון: functional updater
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);  // delay ב-deps — interval מתחדש כשmedusa משתנה

  return <button onClick={() => setDelay(500)}>{count}</button>;
}
```

**הסבר:** הראשון תקוע ב-stale closure (count תפוס כ-0). השני משתמש ב-functional update — לא צריך count ב-deps. delay כן ב-deps כי כשhe משתנה — צריך interval חדש.

---

### 8. closure in setTimeout

**רמת קושי:** 8/10

**דוגמה:**
```
// תרגיל: למה הראשון מדפיס 3,3,3 ?
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100);
}
// כל ה-callbacks חולקים את אותו i.
// כשהזמן עובר — הלולאה כבר הסתיימה ו-i הוא 3.

// פתרון 1: let — binding חדש לכל איטרציה
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log('let:', i), 100);
}

// פתרון 2: IIFE — מקפיאים ערך בפרמטר
for (var j = 0; j < 3; j++) {
  ((idx) => setTimeout(() => console.log('iife:', idx), 100))(j);
}
```

**הסבר:** var יוצר binding אחד לכל הלולאה — שלושת ה-callbacks חולקים אותו. let יוצר binding חדש בכל איטרציה — כל closure לוכדת את הערך של אותה סבב. IIFE זה הפתרון הישן (לפני let).

---

## שאלות חזרה (סוף השיעור)

**שאלה 1:** מה ההבדל המרכזי בין lexical scope ל-dynamic scope?

✓ 1. lexical נקבע במיקום שהפונקציה הוצהרה (איפה כתבנו אותה); dynamic — במיקום שהפונקציה נקראה.
  2. lexical הוא ל-block, dynamic הוא ל-function.
  3. lexical הוא ב-React; dynamic ב-vanilla JS.
  4. אין הבדל — שני המונחים תיאור של אותו דבר.

**הסבר:** JS משתמש ב-lexical scoping — ה-scope נקבע בכתיבה. דאינמיק (לא קיים ב-JS) היה קובע ב-runtime לפי ה-call site. ההבדל הזה הוא הבסיס ל-closures.

---

**שאלה 2:** מה תדפיס הקוד?
```
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

✓ 1. 3, 3, 3
  2. 0, 1, 2
  3. 0, 0, 0
  4. undefined, undefined, undefined

**הסבר:** var הוא function-scoped. כל ה-callbacks חולקים את אותו i; עד שmicrotask של ה-setTimeout רץ, הלולאה כבר הסתיימה ו-i=3. החלפה ל-let תדפיס 0,1,2.

---

**שאלה 3:** מה תפקיד ה-functional update setCount(c => c + 1)?

✓ 1. להימנע מ-stale closure — מקבל מ-React את הערך העדכני, לא מסתמך על closure שעלולה להיות ישנה.
  2. מחיש את ה-rendering של React.
  3. הופך את ה-setter ל-async.
  4. מאלץ את React לרנדר מיד.

**הסבר:** כשcallback ארוך-חיים (setInterval, useEffect deps=[]) משתמש ב-state — הוא תופס את הערך הישן. functional update מבקש מ-React את הערך הנכון בעת ה-update.

---

**שאלה 4:** useEffect(() => fetchUser(id), []) — id הוא prop. למה הקוד באג?

✓ 1. ה-effect רץ פעם אחת עם ה-id הראשוני; כשה-prop משתנה ה-fetch לא יתבצע מחדש.
  2. fetchUser לא קיים בלי dependencies.
  3. useEffect לא מקבל async functions.
  4. deps ריקות לא חוקיות בעבודה עם props.

**הסבר:** deps=[] = רץ פעם אחת. ה-closure תופסת את id הראשוני. אם id משתנה — fetchUser לא ייקרא. תיקון: deps=[id].

---

**שאלה 5:** מהו 'private state' עם closure?

✓ 1. משתנה בתוך פונקציה חיצונית, חשוף רק דרך הפונקציות הפנימיות שמוחזרות — אין גישה מבחוץ.
  2. משתנה שמוצהר עם const.
  3. פונקציה שמתחילה ב-#.
  4. TypeScript private modifier.

**הסבר:** באמצעות factory function שמחזירה אובייקט עם methods — המשתנה החיצוני 'מתחבא' ב-closure. זהו דפוס המודולים של JS לפני class private fields (#x).

---

**שאלה 6:** מה היתרון של useRef ב-stale closure?

✓ 1. useRef.current תמיד מתעדכן — closure שמחזיקה ref תקרא את הערך העדכני, גם בלי לרענן את ה-effect.
  2. useRef גורם לקומפוננטה לרנדר מחדש.
  3. useRef מהיר מ-useState.
  4. useRef משתמש ב-Web Storage.

**הסבר:** ref.current מתעדכן 'בצד' (לא יוצר render). closure שתופסת את ref מצביעה על האובייקט; קריאה ל-ref.current מחזירה את הערך העדכני, ללא תלות במה שהיה כשנוצרה ה-closure.

---

**שאלה 7:** באיזה מהבאים IIFE חיוני כפתרון ל-stale closure?

✓ 1. for עם var ו-setTimeout בקוד ישן (pre-let) — IIFE יוצרת scope פר איטרציה.
  2. כל קריאה ל-fetch ב-async function.
  3. useEffect ב-React.
  4. setInterval בתוך useState.

**הסבר:** ה-IIFE היה הפתרון הקלאסי לפני ES6 ל-var-in-loop: ((j) => setTimeout(() => log(j)))(i). בקוד מודרני — let עדיף.

---
