// data/lesson_closures.js — שיעור Closures (סגירות) — נושא קריטי שחסר ב-LumenPortal
// closures הוא הגורם השכיח ביותר לבאגים ב-React (stale closures ב-useEffect, useCallback, וכו').
// 8 מושגים, difficulty 5–9, עם extras למושגים הקשים.

var LESSON_CLOSURES = {
  id: "lesson_closures",
  title: "Closures — סגירות (הגורם השכיח לבאגים ב-React)",
  description:
    "Closures הם המנגנון החשוב ביותר ב-JavaScript ובו-זמנית הגורם השכיח לבאגים ב-React. השיעור עובר משרשרת ה-scope ועד stale closures ב-useEffect, ומראה איך לזהות, להבין, ולתקן.",
  concepts: [],
  quiz: [],
};

// ─────────────────────────────── 1. scope chain (5) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "scope chain",
  difficulty: 5,
  levels: {
    grandma:
      "scope chain זה 'שרשרת חיפוש משתנים': כשהקוד מחפש משתנה — הוא מתחיל מהפנים החוצה, כמו שמחפשים מפתחות קודם בכיס, אחר כך בתיק, אחר כך בבית, ואם אין — בכלל.",
    child:
      "כמו שתשאל את אמא 'איפה החטיף?'. אם אין לה — היא תשאל את אבא. אם גם לו אין — סבא. ה-JavaScript עושה אותו דבר עם משתנים: שואל החוצה, שכבה אחר שכבה.",
    soldier:
      "scope chain = רשימה של scopes מקוננים. כל פונקציה יוצרת scope משלה. JS מחפש משתנה לפי הסדר: scope פנימי → scope של הפונקציה החיצונית → ... → global.",
    student:
      "Lexical scoping: ה-scope chain נקבע במיקום בקוד (איפה הפונקציה הוצהרה), לא במיקום הקריאה. ה-JS engine שומר reference ל-scope chain ב-[[Environment]] של הפונקציה.",
    junior:
      "באג שראיתי הרבה: const x = 5 בתוך פונקציה, ואותה פונקציה מנסה לשנות אותו ב-arrow פנימית. הבנתי שכל בלוק יוצר scope, וצריך לחשוב 'איפה המשתנה הוצהר' לפני ניסיון גישה.",
    professor:
      "ECMAScript LexicalEnvironment forms a linked list of EnvironmentRecords. Variable resolution traverses this chain via GetBindingValue; an unresolvable reference throws ReferenceError. The chain is fixed at function definition (lexical), not invocation.",
  },
  illustration:
    "🔗 scope chain:\n\n" +
    "  global { user: 'Tal' }\n" +
    "       │\n" +
    "       ▼\n" +
    "  function outer() { x: 1 }\n" +
    "       │\n" +
    "       ▼\n" +
    "  function inner() { y: 2 }     ← מחפש משתנה כאן ראשון\n" +
    "       │\n" +
    "       └─ אם לא — outer (x), אם לא — global (user)",
  codeExample:
    "const user = 'Tal';\n\nfunction outer() {\n  const x = 1;\n\n  function inner() {\n    const y = 2;\n    console.log(y);    // נמצא בתוך inner\n    console.log(x);    // נמצא ב-outer (scope אבא)\n    console.log(user); // נמצא ב-global\n    // console.log(z); // ReferenceError — לא קיים בשרשרת\n  }\n\n  inner();\n}\n\nouter();",
  codeExplanation:
    "כש-inner מחפשת y — מוצאת בתוכה. כשמחפשת x — עולה ל-outer ומוצאת. כשמחפשת user — עולה עוד למעלה ל-global. שרשרת חיפוש דרך כל ה-scopes הסובבים.",
});

// ─────────────────────────────── 2. lexical scope (6) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "lexical scope",
  difficulty: 6,
  levels: {
    grandma:
      "lexical scope = 'מי הם השכנים שלי בקוד'. הפונקציה זוכרת את המשתנים שהיו 'מסביבה' ברגע שהיא נכתבה — לא ברגע שהיא רצה.",
    child:
      "כמו תמונת מחזור: הילד יודע מי היו חבריו בכיתה ביום שצולמה התמונה. גם אם 5 שנים אחר כך כולם זזו — התמונה נשארת אותה תמונה.",
    soldier:
      "Lexical = 'נקבע בכתיבה'. הפונקציה רואה את ה-scope של המקום שבו הוצהרה, לא של המקום שממנו קוראים לה. זה ההבדל מ-dynamic scope (שלא קיים ב-JS).",
    student:
      "JS משתמש ב-lexical (static) scoping. בזמן הקומפילציה ה-engine קושר כל פונקציה ל-LexicalEnvironment שלה. גם אם תעבור את הפונקציה כפרמטר — היא תמשיך לראות את אותו scope.",
    junior:
      "טעות נפוצה: לחשוב שאם תקרא לפונקציה ממקום אחר — היא תיראה משתנים מהמקום ההוא. לא! היא רואה רק מה שהיה סביבה כשהוצהרה. זה הבסיס לכל ה-closures.",
    professor:
      "Lexical scoping creates a fixed binding between functions and their enclosing environment at parse time. This determinism is the prerequisite for closures, currying, and module patterns; dynamic scoping (e.g., bash, classic Lisp) sacrifices it for late binding.",
  },
  illustration:
    "📸 lexical scope:\n\n" +
    "  function makeGreeter(name) {\n" +
    "    return function greet() {\n" +
    "      console.log('שלום ' + name);    ← זוכר את name\n" +
    "    };\n" +
    "  }\n" +
    "  const g = makeGreeter('Tal');\n" +
    "  g();   // 'שלום Tal' — גם אחרי שmakeGreeter הסתיימה",
  codeExample:
    "function makeCounter() {\n  let count = 0;\n  return function increment() {\n    count += 1;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3\n// count לא זמין מבחוץ, אבל increment 'זוכרת' אותו",
  codeExplanation:
    "increment הוצהרה בתוך makeCounter, ולכן רואה את count. גם אחרי ש-makeCounter הסתיימה — increment זוכרת את count כי lexical scope נקבע בכתיבה. זוהי closure.",
});

// ─────────────────────────────── 3. closure (8) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "closure",
  difficulty: 8,
  levels: {
    grandma:
      "closure = 'פונקציה עם תיק זיכרון'. הפונקציה לוקחת איתה את כל המשתנים שהיו סביבה כשהיא נולדה, גם אם המקום שבו היא נולדה כבר נסגר.",
    child:
      "כמו תרמיל גב שלקחת מהבית: גם כשאתה בבית-ספר — בתוך התרמיל יש את הסנדוויץ' שאמא הכינה. הפונקציה לוקחת איתה את 'הסנדוויץ'' (המשתנים) כשעוזבת.",
    soldier:
      "closure נוצרת כשפונקציה משתמשת במשתנה מ-scope חיצוני. ה-engine שומר את אותו משתנה בחיים כל עוד יש פונקציה שמתייחסת אליו — גם אחרי שהפונקציה החיצונית הסתיימה.",
    student:
      "Closure = פונקציה + lexical environment שלה. הוא מאפשר private state, currying, partial application, ו-module pattern. ב-JS כל פונקציה היא closure (גם אם לא משתמשת במשתנים חיצוניים).",
    junior:
      "כשהבנתי closures לעומק, פתאום ראיתי אותם בכל מקום: hooks ב-React הם closures, callbacks ב-event handlers הם closures, IIFEs היו ה-closures המקוריים שמייצרים private modules. הבנת closure = הבנת JS.",
    professor:
      "A closure binds a function to its [[Environment]] internal slot at creation, preserving access to free variables beyond the lifetime of the enclosing scope. The implementation requires escape analysis: variables captured by closures are heap-allocated rather than stack-allocated.",
  },
  illustration:
    "🎒 closure — פונקציה + 'תיק' של משתנים:\n\n" +
    "  function makeBank() {\n" +
    "    let balance = 0;          ← נשמר ב-heap, לא ב-stack\n" +
    "    return {\n" +
    "      deposit:  amt => balance += amt,\n" +
    "      withdraw: amt => balance -= amt,\n" +
    "      check:    () => balance,\n" +
    "    };\n" +
    "  }\n" +
    "  const acc = makeBank();\n" +
    "  acc.deposit(100); acc.check(); // 100\n" +
    "  // balance פרטי — אי אפשר לגשת מבחוץ!",
  codeExample:
    "function makeBank() {\n  let balance = 0;\n\n  return {\n    deposit(amount) { balance += amount; },\n    withdraw(amount) { balance -= amount; },\n    check() { return balance; },\n  };\n}\n\nconst account = makeBank();\naccount.deposit(100);\naccount.deposit(50);\naccount.withdraw(30);\nconsole.log(account.check()); // 120\nconsole.log(account.balance); // undefined — פרטי!",
  codeExplanation:
    "balance מוצהר בתוך makeBank ולא חשוף החוצה. שלוש המתודות (deposit/withdraw/check) הן closures שמשתפות גישה ל-balance. זהו דפוס ה-private state שהיה ה-module pattern של JS לפני ES6.",
  extras: {
    moreExamples: [
      {
        code:
          "// closure ל-currying\nfunction multiply(a) {\n  return function (b) {\n    return a * b;\n  };\n}\nconst double = multiply(2);\nconst triple = multiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15",
        explanation:
          "multiply(2) מחזיר פונקציה שזוכרת a=2. multiply(3) מחזיר פונקציה אחרת שזוכרת a=3. שתי closures נפרדות עם 'תיקים' שונים.",
      },
      {
        code:
          "// closure ל-memoization\nfunction memoize(fn) {\n  const cache = {};\n  return function (arg) {\n    if (cache[arg] === undefined) {\n      cache[arg] = fn(arg);\n    }\n    return cache[arg];\n  };\n}\nconst slowSquare = (n) => { /* ... */ return n * n; };\nconst fastSquare = memoize(slowSquare);\nfastSquare(5); // computes\nfastSquare(5); // cached",
        explanation:
          "ה-closure 'תופס' את cache. כל קריאה משתמשת באותו cache — כי אותה פונקציה פנימית רצה. memoize הוא דפוס בסיסי ב-React (useMemo, useCallback בנויים על הרעיון).",
      },
      {
        code:
          "// closure ב-event handler — דפוס קלאסי\nfunction setupCounterButton(btn) {\n  let clicks = 0;\n  btn.addEventListener('click', () => {\n    clicks += 1;\n    console.log(`לחצת ${clicks} פעמים`);\n  });\n}\nsetupCounterButton(document.getElementById('btn'));",
        explanation:
          "ה-handler זוכר את clicks גם אחרי ש-setupCounterButton הסתיימה. בכל לחיצה — נכנסים לאותה closure ומעדכנים את אותו משתנה.",
      },
    ],
    pitfalls: [
      {
        mistake: "להניח שהמשתנה 'מתאפס' בכל קריאה",
        why: "closure שומרת את המשתנה. כל הקריאות לאותה פונקציה רואות את אותו ערך מעודכן.",
        fix: "אם רוצים מצב התחלתי טרי בכל קריאה — יוצרים את ה-closure מחדש (קוראים לפונקציה החיצונית).",
      },
      {
        mistake: "memory leaks דרך closures",
        why: "אם closure מתייחסת לאובייקט גדול, האובייקט לא יסולק מהזיכרון כל עוד ה-closure בחיים (event listener, setInterval, וכו').",
        fix: "להסיר event listeners כשמסיימים, לקרוא ל-clearInterval, ולהיזהר מ-closures שמחזיקות DOM nodes.",
      },
      {
        mistake: "לולאות עם var ו-closures (הבעיה הקלאסית)",
        why: "for (var i = 0; ...) + setTimeout בתוך הלולאה — כל ה-callbacks חולקים את אותו i (ויקבלו את הערך הסופי).",
        fix: "להחליף ל-let — כל איטרציה יוצרת binding חדש, או להשתמש ב-IIFE עם פרמטר.",
      },
    ],
    practiceQuestions: [
      {
        question:
          "מה יודפס?\n```\nfunction make() {\n  let x = 1;\n  return () => x;\n}\nconst f = make();\nlet y = 99;\nconsole.log(f());\n```",
        answer: "1 — ה-closure תופסת את ה-x מ-make, לא את ה-y מהחוץ.",
      },
      {
        question: "האם closure זה מנגנון ייחודי ל-JavaScript?",
        answer:
          "לא — closures קיימות ב-Python, Swift, Rust, Lisp, ועוד. ב-JS הן בולטות במיוחד כי כל פונקציה היא closure וכל קוד event-driven מתבסס עליהן.",
      },
      {
        question:
          "מה ההבדל בין `function f() { let x; return f2; }` ל-`function f() { let x; return f2.bind(this, x); }` מבחינת closure?",
        answer:
          "הראשון יוצר closure שתופסת את x ('חיה'). השני קופא את הערך של x ברגע ה-bind (snapshot). אם x ישתנה אחר כך — רק בראשון הפונקציה הפנימית תראה את הערך החדש.",
      },
    ],
  },
});

// ─────────────────────────────── 4. closure variables (7) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "closure variables",
  difficulty: 7,
  levels: {
    grandma:
      "המשתנים בתוך ה-closure הם 'משתנים פרטיים' — אף אחד מבחוץ לא יכול להגיע אליהם, ורק הפונקציה שזוכרת אותם יכולה לשנות אותם.",
    child:
      "כמו יומן סודי בתוך הקלמר שלך — רק אתה יכול לפתוח ולכתוב. חברים בכיתה לא יכולים לגעת. ה-closure שומרת את המשתנים שלה כמו יומן.",
    soldier:
      "המשתנים שה-closure 'תופסת' חיים בזיכרון כל עוד ה-closure חיה. הם לא חשופים מבחוץ — רק קריאה דרך הפונקציה. זהו דפוס ה-encapsulation של JS לפני class.",
    student:
      "Closure-captured variables עוברים escape analysis — המנוע שומר אותם ב-heap במקום ב-stack כדי שיישארו זמינים. זה גם מסביר למה closures יכולים לגרום ל-memory leaks.",
    junior:
      "כשהבנתי שכל variable שlinked ל-closure לא ייאסף ע\"י ה-GC — שמתי לב להרבה memory leaks: setInterval שלא מנקים, listeners שמחזיקים components ישנים, וכו'.",
    professor:
      "Free variables in a closure are bound by reference, not value (except when transitively captured by a primitive copy). Each closure shares its enclosing scope's binding, enabling interaction but also race conditions if mutated concurrently.",
  },
  illustration:
    "🔒 closure variables:\n\n" +
    "  function makeId() {\n" +
    "    let counter = 0;        ← פרטי, חי כל עוד next קיימת\n" +
    "    return function next() {\n" +
    "      counter += 1;\n" +
    "      return counter;\n" +
    "    };\n" +
    "  }\n" +
    "  const id = makeId();\n" +
    "  id(); // 1\n" +
    "  id(); // 2\n" +
    "  // אי אפשר לגשת ל-counter ישירות!",
  codeExample:
    "function makeId() {\n  let counter = 0;\n  return function next() {\n    counter += 1;\n    return counter;\n  };\n}\n\nconst id1 = makeId(); // closure A: counter=0\nconst id2 = makeId(); // closure B: counter=0 (נפרד!)\n\nconsole.log(id1()); // 1\nconsole.log(id1()); // 2\nconsole.log(id2()); // 1 — נפרד מ-id1\nconsole.log(id1()); // 3",
  codeExplanation:
    "כל קריאה ל-makeId יוצרת closure חדשה עם counter משלה. id1 ו-id2 הם closures נפרדות — לא משתפות counter. דפוס יסוד ל-instance state.",
  extras: {
    moreExamples: [
      {
        code:
          "// closure משתפים את אותו משתנה (לא העתק)\nfunction makePair() {\n  let value = 0;\n  return {\n    set(v) { value = v; },\n    get() { return value; },\n  };\n}\nconst p = makePair();\np.set(42);\nconsole.log(p.get()); // 42",
        explanation:
          "set ו-get הם closures על אותו value — משנים ורואים את אותו metadata. לכן p.set(42) משפיע על p.get(). זוהי בסיס למודלים של encapsulation.",
      },
      {
        code:
          "// בעיה קלאסית: var + לולאה\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// הדפסה: 3, 3, 3 (ולא 0, 1, 2)\n\n// תיקון 1: let\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// הדפסה: 0, 1, 2",
        explanation:
          "var יוצר binding אחד לכל הלולאה — כל ה-callbacks חולקים אותו. let יוצר binding חדש בכל איטרציה — כל closure תופסת ערך נפרד.",
      },
    ],
    pitfalls: [
      {
        mistake: "לחשוב שכל קריאה ל-id() מאפסת counter",
        why: "counter נשמר בין קריאות — זוהי המהות של closure. בכל קריאה הוא ממשיך מאיפה שהיה.",
        fix: "אם רוצים reset — קוראים ל-makeId() שוב, או חושפים פונקציה reset() כחלק מה-closure.",
      },
      {
        mistake: "לצפות שmodifications באובייקטים יוצרים העתק",
        why: "closure מחזיק reference, לא copy. שינוי באובייקט נראה לכל ה-closures שמתייחסות אליו.",
        fix: "עם primitives — אין בעיה. עם objects/arrays — לטפל ב-immutability ידנית או להעתיק לפני storing.",
      },
    ],
    practiceQuestions: [
      {
        question: "מה יקרה אם נכתוב const id3 = id1; id3();?",
        answer:
          "זו לא closure חדשה — id3 ו-id1 מצביעים לאותה closure. id3() ימשיך לעדכן את אותו counter של id1.",
      },
      {
        question: "האם closure 'לוכדת' רק את המשתנים שהיא משתמשת בהם, או את כל ה-scope?",
        answer:
          "ב-JS המנוע מבצע escape analysis ו-V8 שומר רק את המשתנים שבאמת בשימוש. בעבר היה שומר את כל ה-scope וזה גרם ל-memory leaks.",
      },
    ],
  },
});

// ─────────────────────────────── 5. stale closure (9) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "stale closure",
  difficulty: 9,
  levels: {
    grandma:
      "stale closure = 'closure עם מידע מיושן'. הפונקציה זוכרת ערך ישן של משתנה גם אחרי שהוא השתנה — כי היא לכדה את 'הסנדוויץ' של אתמול ולא יודעת שאמא הכינה חדש היום.",
    child:
      "כמו צילום של החדר שלך מלפני שנה — בצילום יש את הצעצועים הישנים, גם אם עכשיו יש לך חדשים. ה-closure 'מצלמת' את המשתנים ברגע שהיא נוצרת.",
    soldier:
      "stale closure = closure שתופסת ערך של משתנה ב-snapshot של רינדור ישן, ולא רואה עדכונים. הבעיה הכי שכיחה ב-React useEffect/useCallback בלי dependencies מדויקים.",
    student:
      "ב-React כל רינדור יוצר closures חדשות. אם useEffect נרשם פעם אחת בלי dependency — הוא נשאר עם ה-closure הראשונה ('הסנאפשוט הראשון'). ה-state שהוא רואה הוא ה-state ההתחלתי, לעולם לא המעודכן.",
    junior:
      "באג שריגש אותי לראשונה: כפתור 'הוסף 1' שלא עשה כלום אחרי לחיצה ראשונה. הסיבה: useEffect(() => setInterval(() => setCount(count + 1), 1000), []) — count תפוס כ-0 לעד. תיקון: setCount(c => c+1).",
    professor:
      "Stale closures arise when a long-lived callback captures a variable at definition-time, while the underlying state evolves through subsequent re-renders. The remedy is either capturing via functional state update (prev => next), using refs (useRef) to hold mutable current values, or refreshing the closure each render via correct dependency arrays.",
  },
  illustration:
    "⏳ stale closure ב-React:\n\n" +
    "  function Counter() {\n" +
    "    const [count, setCount] = useState(0);\n" +
    "    useEffect(() => {\n" +
    "      const id = setInterval(() => {\n" +
    "        setCount(count + 1);     ❌ count תמיד 0!\n" +
    "      }, 1000);\n" +
    "      return () => clearInterval(id);\n" +
    "    }, []);                       ← deps ריק = closure לא מתחדשת\n" +
    "  }\n" +
    "  // תיקון: setCount(c => c + 1)  ✅ מקבלת prev מעודכן",
  codeExample:
    "function Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      // ❌ count נתפס כ-0 — לא יתעדכן!\n      // setCount(count + 1);\n\n      // ✅ functional update — מקבל את הערך העדכני\n      setCount(c => c + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, []); // dependencies ריקות בכוונה — interval רץ פעם אחת\n\n  return <div>{count}</div>;\n}",
  codeExplanation:
    "השורה המבטלת מראה את הבאג: count נשאר 0 בכל איטרציה. ה-functional updater (c => c+1) מקבל מ-React את הערך העדכני, ולא מסתמך על closure ישנה.",
  extras: {
    moreExamples: [
      {
        code:
          "// stale closure ב-event handler\nfunction Form() {\n  const [name, setName] = useState('');\n\n  useEffect(() => {\n    const handler = () => {\n      console.log('שם:', name);  // תמיד יראה את ה-name של הרינדור הראשון\n    };\n    window.addEventListener('keydown', handler);\n    return () => window.removeEventListener('keydown', handler);\n  }, []); // ❌ deps ריקות — handler נתפס עם name=''\n\n  return <input value={name} onChange={e => setName(e.target.value)} />;\n}\n\n// ✅ תיקון: הוסף את name ל-deps\nuseEffect(() => {\n  const handler = () => console.log('שם:', name);\n  window.addEventListener('keydown', handler);\n  return () => window.removeEventListener('keydown', handler);\n}, [name]); // עכשיו handler מתחדש בכל שינוי name",
        explanation:
          "ה-handler שנרשם ב-useEffect לוכד את name של הרינדור שבו הוא נרשם. אם deps ריקות — נשאר עם הערך הראשון. בעיה בכל מערכת event-driven ב-React.",
      },
      {
        code:
          "// פתרון עם useRef — מצב 'חי' שתמיד עדכני\nfunction Logger() {\n  const [count, setCount] = useState(0);\n  const countRef = useRef(count);\n  countRef.current = count; // מתעדכן בכל רינדור\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      console.log('עכשיו:', countRef.current); // תמיד עדכני!\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  // ...\n}",
        explanation:
          "useRef נותן 'תיבה' שאינה תפוסה ב-closure — countRef.current תמיד מצביע על הערך העדכני. שימושי כשרוצים read-only access לערך עדכני בלי לרענן את ה-effect.",
      },
    ],
    pitfalls: [
      {
        mistake: "useEffect/useCallback עם deps ריקות [] שמשתמש ב-state",
        why: "ה-callback נרשם פעם אחת ושומר על ה-state של הרינדור הראשון. כל מה שיקרא ל-state יראה את הערך הישן.",
        fix: "או הוסף את ה-state ל-deps, או השתמש ב-functional updater (prev => next), או ב-useRef.",
      },
      {
        mistake: "לחשוב שeslint-plugin-react-hooks מגזים",
        why: "כשהתוסף מתלונן 'missing dependency: count' — זה כי באמת יש סיכוי ל-stale closure. התעלמות = באג עתידי.",
        fix: "תקן את ה-deps לפי ההמלצה, או reorganize את הקוד (functional update / useRef).",
      },
      {
        mistake: "לקבל closures ישנות של event handlers ב-DOM פנימי",
        why: "אם handler נרשם ב-document/window עם deps ריקות — הוא לא יתעדכן עם ה-state העדכני.",
        fix: "תמיד addEventListener בתוך useEffect עם deps נכונים, ו-cleanup function שמסיר.",
      },
    ],
    practiceQuestions: [
      {
        question:
          "ב-Counter עם useEffect שיש בו setInterval וקריאה ל-setCount(count + 1) — למה count נשאר 1?",
        answer:
          "כי ה-callback של setInterval נתפס ב-closure של הרינדור הראשון, שבו count=0. בכל tick הוא קורא setCount(0+1)=1 — לא יודע שכבר עודכן.",
      },
      {
        question: "מתי עדיף useRef על setCount(prev => prev+1)?",
        answer:
          "useRef מתאים כשרוצים לקרוא את הערך עדכני בלי לעדכן state (למשל ב-logging). functional update מתאים כשרוצים לעדכן את ה-state בהתבסס על הקודם.",
      },
      {
        question: "מה יקרה אם נשנה את deps ל-[count]?",
        answer:
          "ה-effect ירוץ מחדש בכל שינוי count — ה-interval ייווצר מחדש. הקוד יעבוד אבל יוצר/סוגר interval בכל לחיצה. לרוב לא הפתרון האידיאלי — עדיף functional update.",
      },
    ],
  },
});

// ─────────────────────────────── 6. closure in event handlers (7) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "closure in event handlers",
  difficulty: 7,
  levels: {
    grandma:
      "כל פעם שמחברים פונקציה לכפתור — היא לוקחת איתה 'תרמיל' של המשתנים שהיו סביבה. בכל לחיצה היא קוראת את התרמיל הזה.",
    child:
      "כמו שילד מקבל הוראה: 'אם יצלצל הטלפון, תגיד את השם של אבא'. גם אחרי 5 שעות, כשהטלפון יצלצל — הוא יזכור מה אמא ביקשה.",
    soldier:
      "כל event handler הוא closure על ה-scope שבו הוצהר. אם הוצהר בתוך פונקציה — רואה את המשתנים שלה. ב-React: handler חדש בכל רינדור, עם closure על ה-state והprops של אותו רינדור.",
    student:
      "ב-vanilla JS: handler נרשם פעם אחת, רואה את ה-scope של רגע ההרשמה. ב-React: handler נוצר מחדש בכל רינדור — לכן רואה את ה-state העדכני (אלא אם useCallback עם deps לא נכונים).",
    junior:
      "באג נפוץ: רישום listener ב-vanilla JS עם let count, ומצפים שיתעדכן. הוא לא — כי closure תפסה את count. תיקון: או removeEventListener+addEventListener בכל שינוי, או להחזיק state במקום אחר ולקרוא משם.",
    professor:
      "Event handlers form closures over their declaration environment. In React, the reconciler creates fresh handlers per render, ensuring access to the latest props/state — except when wrapped in useCallback with stale dependencies, which freezes the closure.",
  },
  illustration:
    "🖱️ closure ב-event handler:\n\n" +
    "  function setupButton(btn, label) {\n" +
    "    btn.addEventListener('click', () => {\n" +
    "      alert('הוקלצת על ' + label);   ← זוכר את label\n" +
    "    });\n" +
    "  }\n" +
    "  setupButton(b1, 'Save');\n" +
    "  setupButton(b2, 'Cancel');\n" +
    "  // לחיצה על b1 → 'Save', על b2 → 'Cancel'",
  codeExample:
    "// כל כפתור עם closure משלו על label\nfunction setupButton(btn, label) {\n  btn.addEventListener('click', () => {\n    alert('Clicked: ' + label);\n  });\n}\n\nsetupButton(document.querySelector('#save'), 'Save');\nsetupButton(document.querySelector('#cancel'), 'Cancel');\n// כל לחיצה תפעיל את ה-closure המתאימה",
  codeExplanation:
    "כל קריאה ל-setupButton יוצרת closure חדשה שתופסת את label המתאים. שני הכפתורים שונים — שני handlers נפרדים, כל אחד זוכר את ה-label שלו.",
});

// ─────────────────────────────── 7. closure in useEffect (9) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "closure in useEffect",
  difficulty: 9,
  levels: {
    grandma:
      "useEffect לוקח 'תרמיל' של המשתנים שהיו סביבו ברגע שהוא רץ. אם לא אומרים לו לרענן את התרמיל (deps) — הוא ממשיך עם הישן, גם אחרי שהמשתנים מחוץ השתנו.",
    child:
      "כמו שאומרים לחבר 'תזכור את המספר 5'. כשתחזור אחרי שעה ותשאל 'מה המספר?' — הוא יגיד 5, גם אם בינתיים שינית את הלוח.",
    soldier:
      "useEffect(fn, deps) — fn הוא closure על ה-state/props של הרינדור שבו הוא רץ. deps מגדירים מתי לקרוא לו מחדש (=ליצור closure חדשה). deps ריק → closure פעם אחת → stale.",
    student:
      "כל רינדור ב-React יוצר closures חדשות לכל ה-callbacks (כולל ה-effect). React משווה deps; אם זהים — לא קורא ל-effect מחדש (closure נשארת). השיטה הזו דורשת תפיסה מדויקת של מה ה-effect 'תופס'.",
    junior:
      "כללי אצבע אישיים: 1) תמיד רשום את כל המשתנים שה-effect משתמש בהם ב-deps. 2) אם deps ריקות — וודא שהקוד לא משתמש ב-state. 3) חשוד מיד ב-stale closure ברגע ש-eslint מציע 'missing dependency'.",
    professor:
      "useEffect captures a closure over the render's lexical environment. The deps array tells React when to re-execute (re-create) the effect's closure. Empty deps freeze the effect to the initial render — appropriate for true 'mount only' work, dangerous when accessing dynamic state.",
  },
  illustration:
    "🧩 useEffect closure:\n\n" +
    "  function App() {\n" +
    "    const [n, setN] = useState(0);\n" +
    "    useEffect(() => {\n" +
    "      console.log('n הוא:', n);     ← תופס את n של הרינדור הזה\n" +
    "    }, [n]);                          ← deps נכון — closure חדש כל פעם\n" +
    "  }",
  codeExample:
    "function Counter() {\n  const [count, setCount] = useState(0);\n  const [delay, setDelay] = useState(1000);\n\n  // ❌ stale: count תקוע ב-0\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(count + 1);\n    }, delay);\n    return () => clearInterval(id);\n  }, []);\n\n  // ✅ נכון: functional updater\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(c => c + 1);\n    }, delay);\n    return () => clearInterval(id);\n  }, [delay]);  // delay ב-deps — interval מתחדש כשmedusa משתנה\n\n  return <button onClick={() => setDelay(500)}>{count}</button>;\n}",
  codeExplanation:
    "הראשון תקוע ב-stale closure (count תפוס כ-0). השני משתמש ב-functional update — לא צריך count ב-deps. delay כן ב-deps כי כשhe משתנה — צריך interval חדש.",
  extras: {
    moreExamples: [
      {
        code:
          "// stale closure בקריאה לפונקציה חיצונית\nfunction Profile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  // ❌ fetchUser לוכד userId הראשוני\n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, []);  // צריך [userId]\n\n  // ✅ נכון\n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]);\n}",
        explanation:
          "useEffect ראשון יבצע fetch רק עם ה-userId הראשוני. אם props.userId משתנה — לא יקרה כלום. eslint-plugin-react-hooks היה מזהיר על זה.",
      },
      {
        code:
          "// pattern: refs לעמוד עם closures טריות בלי לרענן effect\nfunction useEventCallback(fn) {\n  const ref = useRef(fn);\n  useLayoutEffect(() => { ref.current = fn; });\n  return useCallback((...args) => ref.current(...args), []);\n}\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const onClick = useEventCallback(() => {\n    console.log('count:', count);  // תמיד עדכני!\n  });\n  // onClick יציב (ref הזהה), אבל קורא לפונקציה עם count עדכני\n}",
        explanation:
          "טכניקה מתקדמת: ref נשמר עדכני, ה-callback היציב משתמש בו. שילוב של reference stability + freshness — בלי stale closure.",
      },
    ],
    pitfalls: [
      {
        mistake: "תפיסה מתמטית של 'deps לא משתנה' = בטוח לדלג",
        why: "הקוד עדיין רץ עם closure ישנה. אם הקוד אינו pure (עושה fetch, מודיע ל-server) — הסטטוס הזה מסוכן.",
        fix: "אם באמת רוצים לא לרענן — תמיד תעבור על הקוד ואתר שאלות 'מה המשתנה הזה ייצב'?",
      },
      {
        mistake: "להוסיף הכל ל-deps ולקבל infinite loop",
        why: "כשמוסיפים אובייקט/פונקציה ל-deps שמתחדשת בכל רינדור — useEffect ירוץ בלי סוף.",
        fix: "useMemo/useCallback סביב הערך הבעייתי, או לוודא שמייצרים אותו פעם אחת.",
      },
    ],
    practiceQuestions: [
      {
        question: "למה useEffect שלי לא מתעדכן כשprops משתנים?",
        answer:
          "כנראה ה-deps לא כוללים את ה-prop הזה, או ש-deps ריק. הוסף את ה-prop ל-deps או השתמש ב-functional update.",
      },
      {
        question:
          "ב-useEffect(() => fetchData(query), []) — מה הבעיה אם query משתנה?",
        answer:
          "ה-fetch ירוץ רק פעם אחת עם query הראשוני. שינויים ב-query לא יגרמו ל-fetch חדש. תיקון: deps=[query].",
      },
      {
        question: "האם react-hooks/exhaustive-deps רק warning, אפשר להתעלם?",
        answer:
          "אסור! גם אם הקוד עובד, אתה תוקע closure שעלולה להיתקע על מצב ישן. תקן או השתמש ב-functional update / ref.",
      },
    ],
  },
});

// ─────────────────────────────── 8. closure in setTimeout (8) ───────────────────────────────
LESSON_CLOSURES.concepts.push({
  conceptName: "closure in setTimeout",
  difficulty: 8,
  levels: {
    grandma:
      "setTimeout 'מקפיא צילום' של המשתנים ברגע שקראתם לו. כשהזמן עובר והוא רץ — הוא מסתכל על הצילום הישן, לא על המצב הנוכחי.",
    child:
      "כמו לכתוב מכתב לעצמך לעוד שבוע: 'תזכיר לי שיש לי 50 שקל בארנק'. אם בינתיים הוצאת — המכתב עדיין יגיד 50.",
    soldier:
      "setTimeout(cb, ms) לוקח את cb עם ה-closure שלו. ה-closure לוכד משתנים ברגע ההגדרה. אם המשתנים משתנים אחר כך — cb עדיין יראה את הערכים המקוריים.",
    student:
      "ה-closure של ה-callback של setTimeout נוצרת ברגע שהקוד מגיע ל-setTimeout. כשhe יורה — JS משתמש בה. זה הבסיס לבעיית var-in-loop הקלאסית.",
    junior:
      "באג שתפס אותי הרבה: setTimeout בתוך for עם var i — כל ה-callbacks מדפיסים את אותו i. עברתי ל-let וזה נפתר. או IIFE: ((j) => setTimeout(() => console.log(j))).bind(null, i).",
    professor:
      "setTimeout's callback closure captures variables by reference. With var (function-scoped), all loop iterations share one binding; with let (block-scoped), each iteration creates a new binding. Understanding this distinguishes a working timer from a confusing bug.",
  },
  illustration:
    "⏲️ setTimeout closure — בעיית var-in-loop:\n\n" +
    "  // ❌ var\n" +
    "  for (var i = 0; i < 3; i++) {\n" +
    "    setTimeout(() => console.log(i), 100);\n" +
    "  }\n" +
    "  // הדפסה: 3, 3, 3 (ולא 0, 1, 2)\n" +
    "\n" +
    "  // ✅ let\n" +
    "  for (let i = 0; i < 3; i++) {\n" +
    "    setTimeout(() => console.log(i), 100);\n" +
    "  }\n" +
    "  // הדפסה: 0, 1, 2",
  codeExample:
    "// תרגיל: למה הראשון מדפיס 3,3,3 ?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log('var:', i), 100);\n}\n// כל ה-callbacks חולקים את אותו i.\n// כשהזמן עובר — הלולאה כבר הסתיימה ו-i הוא 3.\n\n// פתרון 1: let — binding חדש לכל איטרציה\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log('let:', i), 100);\n}\n\n// פתרון 2: IIFE — מקפיאים ערך בפרמטר\nfor (var j = 0; j < 3; j++) {\n  ((idx) => setTimeout(() => console.log('iife:', idx), 100))(j);\n}",
  codeExplanation:
    "var יוצר binding אחד לכל הלולאה — שלושת ה-callbacks חולקים אותו. let יוצר binding חדש בכל איטרציה — כל closure לוכדת את הערך של אותה סבב. IIFE זה הפתרון הישן (לפני let).",
  extras: {
    moreExamples: [
      {
        code:
          "// פתרון עם forEach (תמיד נכון)\n[0,1,2].forEach(i => {\n  setTimeout(() => console.log(i), 100);\n});\n// הדפסה: 0, 1, 2\n// כל איטרציה היא קריאה לפונקציה — closure נפרדת",
        explanation:
          "forEach מקבלת callback לכל איבר; כל קריאה היא scope משלה. זוהי דרך אלגנטית להימנע מבעיות סינכרון של var ב-for.",
      },
      {
        code:
          "// stale closure ב-setTimeout ב-React\nfunction Greeter({ name }) {\n  useEffect(() => {\n    setTimeout(() => alert('Hi ' + name), 5000);\n  }, []); // ❌ name נתפס פעם אחת\n  // אם הprops.name משתנה תוך 5 שניות — יתקבל ה-name הישן.\n  // תיקון: deps=[name], ובhandle של cleanup לבטל timeout ישן.\n}",
        explanation:
          "אותה הבעיה כמו useEffect. ה-callback של setTimeout נתפס ב-closure הראשונה. תיקון: deps נכונים + cleanup שמבטל timeout ישן.",
      },
    ],
    pitfalls: [
      {
        mistake: "var ב-for עם setTimeout/setInterval — הבעיה ההיסטורית",
        why: "כל ה-callbacks חולקים את אותו var, שערכו הסופי בסוף הלולאה.",
        fix: "let במקום var, או forEach, או IIFE עם פרמטר. let הכי קריא וגם הכי מודרני.",
      },
      {
        mistake: "לשכוח clearTimeout בעת unmount של קומפוננטה",
        why: "הtimeout עדיין יורה אחרי שהקומפוננטה הוסרה — שגיאה 'set state on unmounted component', או הפעלת קוד עם closure על props ישנים.",
        fix: "תמיד `return () => clearTimeout(id)` ב-useEffect שמשתמש ב-setTimeout/setInterval.",
      },
    ],
    practiceQuestions: [
      {
        question: "מה יודפס?\n```\nlet x = 1;\nsetTimeout(() => console.log(x), 100);\nx = 2;\n```",
        answer:
          "2 — ה-closure לוכדת reference למשתנה x, לא את הערך. כש-callback רץ — הוא קורא את x העדכני שהוא 2. (זה שונה מהבעיה של var-in-loop כי כאן יש משתנה אחד שהשתנה).",
      },
      {
        question: "למה IIFE עם פרמטר 'מתקנת' את בעיית var-in-loop?",
        answer:
          "ה-IIFE יוצרת scope חדש בכל איטרציה. הפרמטר idx הוא משתנה חדש בכל קריאה — כל setTimeout לוכד idx משלו, לא את ה-i המשותף.",
      },
    ],
  },
});

// ─────────────────────────────── Quiz ───────────────────────────────
LESSON_CLOSURES.quiz = [
  {
    question:
      "מה ההבדל המרכזי בין lexical scope ל-dynamic scope?",
    options: [
      "lexical נקבע במיקום שהפונקציה הוצהרה (איפה כתבנו אותה); dynamic — במיקום שהפונקציה נקראה.",
      "lexical הוא ל-block, dynamic הוא ל-function.",
      "lexical הוא ב-React; dynamic ב-vanilla JS.",
      "אין הבדל — שני המונחים תיאור של אותו דבר.",
    ],
    correct: 0,
    explanation:
      "JS משתמש ב-lexical scoping — ה-scope נקבע בכתיבה. דאינמיק (לא קיים ב-JS) היה קובע ב-runtime לפי ה-call site. ההבדל הזה הוא הבסיס ל-closures.",
  },
  {
    question:
      "מה תדפיס הקוד?\n```\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```",
    options: [
      "3, 3, 3",
      "0, 1, 2",
      "0, 0, 0",
      "undefined, undefined, undefined",
    ],
    correct: 0,
    explanation:
      "var הוא function-scoped. כל ה-callbacks חולקים את אותו i; עד שmicrotask של ה-setTimeout רץ, הלולאה כבר הסתיימה ו-i=3. החלפה ל-let תדפיס 0,1,2.",
  },
  {
    question: "מה תפקיד ה-functional update setCount(c => c + 1)?",
    options: [
      "להימנע מ-stale closure — מקבל מ-React את הערך העדכני, לא מסתמך על closure שעלולה להיות ישנה.",
      "מחיש את ה-rendering של React.",
      "הופך את ה-setter ל-async.",
      "מאלץ את React לרנדר מיד.",
    ],
    correct: 0,
    explanation:
      "כשcallback ארוך-חיים (setInterval, useEffect deps=[]) משתמש ב-state — הוא תופס את הערך הישן. functional update מבקש מ-React את הערך הנכון בעת ה-update.",
  },
  {
    question:
      "useEffect(() => fetchUser(id), []) — id הוא prop. למה הקוד באג?",
    options: [
      "ה-effect רץ פעם אחת עם ה-id הראשוני; כשה-prop משתנה ה-fetch לא יתבצע מחדש.",
      "fetchUser לא קיים בלי dependencies.",
      "useEffect לא מקבל async functions.",
      "deps ריקות לא חוקיות בעבודה עם props.",
    ],
    correct: 0,
    explanation:
      "deps=[] = רץ פעם אחת. ה-closure תופסת את id הראשוני. אם id משתנה — fetchUser לא ייקרא. תיקון: deps=[id].",
  },
  {
    question:
      "מהו 'private state' עם closure?",
    options: [
      "משתנה בתוך פונקציה חיצונית, חשוף רק דרך הפונקציות הפנימיות שמוחזרות — אין גישה מבחוץ.",
      "משתנה שמוצהר עם const.",
      "פונקציה שמתחילה ב-#.",
      "TypeScript private modifier.",
    ],
    correct: 0,
    explanation:
      "באמצעות factory function שמחזירה אובייקט עם methods — המשתנה החיצוני 'מתחבא' ב-closure. זהו דפוס המודולים של JS לפני class private fields (#x).",
  },
  {
    question:
      "מה היתרון של useRef ב-stale closure?",
    options: [
      "useRef.current תמיד מתעדכן — closure שמחזיקה ref תקרא את הערך העדכני, גם בלי לרענן את ה-effect.",
      "useRef גורם לקומפוננטה לרנדר מחדש.",
      "useRef מהיר מ-useState.",
      "useRef משתמש ב-Web Storage.",
    ],
    correct: 0,
    explanation:
      "ref.current מתעדכן 'בצד' (לא יוצר render). closure שתופסת את ref מצביעה על האובייקט; קריאה ל-ref.current מחזירה את הערך העדכני, ללא תלות במה שהיה כשנוצרה ה-closure.",
  },
  {
    question:
      "באיזה מהבאים IIFE חיוני כפתרון ל-stale closure?",
    options: [
      "for עם var ו-setTimeout בקוד ישן (pre-let) — IIFE יוצרת scope פר איטרציה.",
      "כל קריאה ל-fetch ב-async function.",
      "useEffect ב-React.",
      "setInterval בתוך useState.",
    ],
    correct: 0,
    explanation:
      "ה-IIFE היה הפתרון הקלאסי לפני ES6 ל-var-in-loop: ((j) => setTimeout(() => log(j)))(i). בקוד מודרני — let עדיף.",
  },
];

// Export for browser
if (typeof window !== "undefined") {
  window.LESSON_CLOSURES = LESSON_CLOSURES;
}
