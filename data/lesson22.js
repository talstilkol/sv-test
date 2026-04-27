// data/lesson22.js — שיעור 22: useState, Immutable State, Hooks
// כל מושג כולל: difficulty (1–10), 6 רמות הסבר, illustration, codeExample, codeExplanation.
// מושגים קשים (difficulty >= 6) כוללים גם extras: דוגמאות נוספות, pitfalls, ושאלות תרגול.

var LESSON_22 = {
  id: "lesson_22",
  title: "שיעור 22 — useState, Immutable State",
  description:
    "ניהול state ב-React באמצעות useState, ההבדל בין mutable ל-immutable, וכיצד עוברים נתונים מקומפוננטה לאב לבן באמצעות props.",
  concepts: [
    // ─────────────────────────────── 1. Hook (difficulty 6) ───────────────────────────────
    {
      conceptName: "Hook",
      difficulty: 6,
      levels: {
        grandma:
          "Hook הוא 'חיבור' — כמו שמחברים תקע למקרר כדי שיקבל חשמל. הקומפוננטה מחברת את עצמה ל-React דרך Hook ומקבלת ממנו יכולות (זיכרון, תופעות לוואי, ועוד).",
        child:
          "דמיינו שלכל כפתור משחק יש 'יכולת מיוחדת'. ב-React, כדי שהכפתור יזכור כמה פעמים לחצו עליו, הוא צריך לקרוא ל-Hook בשם useState — זה כמו לבחור 'יכולת זיכרון' בתחילת המשחק.",
        soldier:
          "Hook הוא פונקציה מיוחדת ב-React שמתחילה ב-use (כמו useState, useEffect). היא חייבת להיקרא בראש הקומפוננטה, באותו סדר בכל רינדור — בלי תנאים ובלי לולאות.",
        student:
          "Hooks הם API שהוצג ב-React 16.8 (2019) שמאפשר לקומפוננטות פונקציונליות להשתמש ב-state ו-lifecycle בלי class. כל Hook חייב להיקרא ברמה העליונה של הקומפוננטה כדי ש-React יוכל לעקוב אחרי הסדר.",
        junior:
          "כשהתחלתי לעבוד עם React קראתי ל-useState בתוך if — הקומפוננטה התרסקה. הבנתי שהסדר של ה-Hooks חייב להיות זהה בכל רינדור, אחרת React מאבד את המעקב אחרי איזה state שייך לאיזה Hook.",
        professor:
          "Hooks rely on a stable call order across renders because React tracks them by index, not by name. The Rules of Hooks (no conditional calls, only in function components or custom hooks) exist precisely to maintain that index integrity.",
      },
      illustration:
        "🪝 Hook — חיבור הקומפוננטה ל-React:\n\n" +
        "  function Counter() {\n" +
        "    const [count, setCount] = useState(0);  ← Hook #1\n" +
        "    useEffect(() => { ... }, []);            ← Hook #2\n" +
        "    return <button>{count}</button>;\n" +
        "  }\n\n" +
        "  React זוכר: Hook #1 = state(0), Hook #2 = effect()\n" +
        "  הסדר חייב להיות זהה בכל רינדור!",
      codeExample:
        "function Counter() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  return (\n" +
        "    <button onClick={() => setCount(count + 1)}>\n" +
        "      לחצת {count} פעמים\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "useState הוא Hook שמחזיר זוג: ערך נוכחי (count) ופונקציה לעדכון (setCount). הקומפוננטה מתחברת ל-React ומקבלת זיכרון מתמשך בין רינדורים.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ פגום — Hook בתוך תנאי\n" +
              "function Bad({ show }) {\n" +
              "  if (show) {\n" +
              "    const [x, setX] = useState(0);  // אסור!\n" +
              "  }\n" +
              "  return null;\n" +
              "}",
            explanation:
              "אסור לקרוא ל-Hook בתוך תנאי, לולאה, או פונקציה מקוננת — הסדר ישתבש בין רינדורים.",
          },
          {
            code:
              "// ✅ נכון — Hook ברמה העליונה\n" +
              "function Good({ show }) {\n" +
              "  const [x, setX] = useState(0);\n" +
              "  if (!show) return null;\n" +
              "  return <div>{x}</div>;\n" +
              "}",
            explanation:
              "ה-Hook נקרא תמיד, גם אם הקומפוננטה לא מציגה כלום. את התנאי שמים אחרי ה-Hooks.",
          },
        ],
        pitfalls: [
          {
            mistake: "קריאה ל-Hook בתוך if או לולאה",
            why: "React מזהה Hooks לפי סדר קריאה. תנאי משנה את הסדר → React מבלבל בין ה-Hooks.",
            fix: "תמיד קרא ל-Hooks ברמה העליונה של הקומפוננטה. את התנאים שים בתוך ה-state עצמו או אחרי הצהרת ה-Hooks.",
          },
          {
            mistake: "קריאה ל-Hook מתוך פונקציה רגילה (לא קומפוננטה)",
            why: "Hooks דורשים הקשר של קומפוננטה כדי שיוכלו להירשם אצל React.",
            fix: "השתמש ב-Hooks רק בקומפוננטות פונקציונליות או בפונקציות שמתחילות ב-use (custom hooks).",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה יקרה אם נקרא ל-useState בתוך if (someCondition)?",
            answer:
              "React יזרוק שגיאה: 'Rendered more hooks than during the previous render' — כי הסדר של ה-Hooks משתנה בין רינדור לרינדור.",
          },
          {
            question:
              "האם מותר לקרוא ל-useState בתוך useEffect?",
            answer:
              "לא! Hooks מותרים רק ברמה העליונה של הקומפוננטה. בתוך useEffect אפשר לקרוא ל-setCount (ה-setter), אבל לא להצהיר על useState חדש.",
          },
        ],
      },
    },

    // ─────────────────────────────── 2. useState (difficulty 5) ───────────────────────────────
    {
      conceptName: "useState",
      difficulty: 5,
      levels: {
        grandma:
          "useState זה כמו פתק על המקרר עם המספר שלך עליו. רושמים את המספר הראשון, ואחר כך אם רוצים לשנות אותו — מוחקים וכותבים מחדש. ה-useState נותן לך את הפתק וגם עט.",
        child:
          "כמו לוח מחיק במשחק חדר בריחה: יש מקום לכתוב את המספר העכשווי, ויש מחק קסם שכשמשתמשים בו — כל החדר מתעדכן אוטומטית בכל מקום שהמספר היה כתוב.",
        soldier:
          "useState(initial) מחזיר מערך של שני איברים: [valueNow, updaterFn]. valueNow זה מה שיש עכשיו, updaterFn זאת הפונקציה שמשנה את הערך וגורמת לקומפוננטה להירנדר מחדש.",
        student:
          "useState הוא Hook ל-state פנימי של קומפוננטה פונקציונלית. הוא מקבל ערך התחלתי (פעם אחת בלבד, בעת המאונט) ומחזיר את הערך הנוכחי + setter שמטריג re-render.",
        junior:
          "פעם ראשונה שעבדתי עם useState ניסיתי לכתוב `count = 5` כדי לעדכן — שום דבר לא קרה במסך. הבנתי שצריך setCount(5), כי React לא בודק את המשתנה — הוא ממתין שאני אקרא ל-setter כדי לדעת שהמצב השתנה.",
        professor:
          "useState reservation occurs during React's render phase; the setter is referentially stable across renders. Calling the setter schedules a re-render but doesn't mutate the local variable in the current render — the new value only appears in the next render's closure.",
      },
      illustration:
        "📊 useState — Hook לזיכרון פנימי:\n\n" +
        "  const [count, setCount] = useState(0)\n" +
        "         ↑         ↑              ↑\n" +
        "     ערך נוכחי  פונקציית עדכון   ערך התחלתי\n\n" +
        "  setCount(5)  →  React rerender  →  count = 5",
      codeExample:
        "function Counter() {\n" +
        '  const [count, setCount] = useState(0);\n' +
        "  return (\n" +
        '    <button onClick={() => setCount(count + 1)}>\n' +
        "      Clicked {count} times\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "useState(0) מאתחל את count ל-0 בפעם הראשונה שהקומפוננטה רצה. בכל לחיצה, setCount(count + 1) מעדכן את count וגורם ל-React להריץ את הקומפוננטה שוב עם הערך החדש.",
    },

    // ─────────────────────────────── 3. state (difficulty 4) ───────────────────────────────
    {
      conceptName: "state",
      difficulty: 4,
      levels: {
        grandma:
          "state זה 'המצב הנוכחי' של משהו. כמו שלשעון יש מצב של זמן עכשווי, ולמתג יש מצב 'דלוק' או 'כבוי'. בקומפוננטה state זה מה שמשתנה בין לחיצה ללחיצה.",
        child:
          "במשחק לוח, ה-state זה כל מה שצריך לזכור באמצע: הניקוד של כל שחקן, איפה כל חייל נמצא, של מי התור. כשהמצב משתנה — הלוח משתנה.",
        soldier:
          "state הוא נתונים פנימיים של קומפוננטה שיכולים להשתנות עם הזמן. כל שינוי ב-state גורם לקומפוננטה להירנדר מחדש ולהציג את התצוגה המעודכנת.",
        student:
          "state הוא הזיכרון של הקומפוננטה — נתונים שנשמרים בין רינדורים ויכולים להתעדכן. ההבדל מ-props: state שייך לקומפוננטה עצמה, props מגיעים מבחוץ.",
        junior:
          "כשהתחלתי, ניסיתי לשמור נתונים ב-`let count = 0` רגיל. כל לחיצה הצביעה שינוי בקונסול — אבל המסך לא התעדכן. הבנתי שב-React רק state גורם ל-re-render. משתנה רגיל מתאפס בכל רינדור.",
        professor:
          "State in React is component-local persistent data managed by React's fiber tree. Unlike module-level variables, state persists across renders and triggers reconciliation when updated via the setter, ensuring the UI stays in sync with data.",
      },
      illustration:
        "🧠 state — הזיכרון של הקומפוננטה:\n\n" +
        "  ┌─ Counter ─────────┐\n" +
        "  │  state: { count: 3 }    ← הזיכרון הפנימי\n" +
        "  │  render: <div>3</div>\n" +
        "  └───────────────────┘\n" +
        "  setCount(4) → state: { count: 4 } → re-render",
      codeExample:
        "function ToggleSwitch() {\n" +
        "  const [isOn, setIsOn] = useState(false);\n" +
        "  return (\n" +
        '    <button onClick={() => setIsOn(!isOn)}>\n' +
        "      {isOn ? '🟢 דלוק' : '🔴 כבוי'}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "isOn הוא ה-state — מצב המתג. כל לחיצה מחליפה את המצב (true/false), ו-React מציג את הטקסט המתאים. בלי state, הכפתור לא היה זוכר את המצב שלו.",
    },

    // ─────────────────────────────── 4. setState (difficulty 7) ───────────────────────────────
    {
      conceptName: "setState",
      difficulty: 7,
      levels: {
        grandma:
          "setState זה 'הודעה ל-React' — אומרים לו: 'תשנה את המספר ל-5'. הוא מעדכן את הזיכרון ומרענן את התצוגה. בלי הודעה זו — הוא לא יודע שהתבקש לשנות.",
        child:
          "כמו שולחים מסר ל-React: 'היי, count עכשיו 5!'. רק כשמקבלים את המסר, React מעדכן את כל המקומות שהמספר מופיע בהם.",
        soldier:
          "setState (כלומר ה-setter שחוזר מ-useState) מתזמן עדכון state ו-re-render. הוא לא משנה את המשתנה מיידית באותו פונקציה — השינוי נראה רק ברינדור הבא.",
        student:
          "ה-setter (לדוגמה setCount) מקבל את הערך החדש או פונקציה שמקבלת את הערך הקודם (functional update). שימוש ב-setCount(c => c + 1) חיוני כשמספר עדכונים מתבצעים ברצף.",
        junior:
          "כשבניתי כפתור 'הוסף 3' עם שלוש קריאות setCount(count + 1) ברצף — count התעדכן ב-1 בלבד. הבנתי שכל הקריאות התבססו על אותו snapshot. עברתי ל-setCount(c => c + 1) והבעיה נפתרה.",
        professor:
          "Setters are referentially stable; calling them schedules a re-render but the local variable in scope retains its closed-over value. The functional form (prev => next) accesses the latest queued state, enabling correct sequential updates within a single event handler.",
      },
      illustration:
        "🔧 setState — שתי צורות:\n\n" +
        "  setCount(5)              ← ערך ישיר\n" +
        "  setCount(c => c + 1)     ← functional (מקבל ערך קודם)\n\n" +
        "  ⚠️ בקריאות מרובות ברצף — חובה functional!\n" +
        "  setCount(c => c+1);  setCount(c => c+1);  ← +2 ✅\n" +
        "  setCount(count+1);   setCount(count+1);   ← +1 ❌",
      codeExample:
        "function Counter() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  const addThree = () => {\n" +
        "    setCount(c => c + 1);  // functional — בטוח\n" +
        "    setCount(c => c + 1);\n" +
        "    setCount(c => c + 1);\n" +
        "  };\n" +
        '  return <button onClick={addThree}>{count}</button>;\n' +
        "}",
      codeExplanation:
        "כשמבצעים מספר setCount ברצף, חובה להשתמש ב-functional update (c => c + 1). אחרת, כל הקריאות יתבססו על אותו ערך count מה-snapshot של הרינדור הנוכחי.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❌ באג — שלוש קריאות, רק +1\n" +
              "const addThree = () => {\n" +
              "  setCount(count + 1);\n" +
              "  setCount(count + 1);\n" +
              "  setCount(count + 1);\n" +
              "};\n" +
              "// אם count=0 → כל הקריאות מבקשות 'תקבע ל-1' → סוף: 1",
            explanation:
              "בכל שלוש הקריאות count הוא 0 (snapshot). React מקבל שלוש פעמים 'תקבע ל-1' ומתעדכן ל-1 בלבד.",
          },
          {
            code:
              "// ✅ נכון — שלוש קריאות, +3\n" +
              "const addThree = () => {\n" +
              "  setCount(c => c + 1);\n" +
              "  setCount(c => c + 1);\n" +
              "  setCount(c => c + 1);\n" +
              "};\n" +
              "// React מבצע: 0→1→2→3 ✅",
            explanation:
              "כל פונקציה מקבלת את הערך העדכני בתור — לכן הסכימה הסופית היא 0+1+1+1 = 3.",
          },
          {
            code:
              "// ❌ קריאה ל-setter והדפסה\n" +
              "const handler = () => {\n" +
              "  setCount(count + 1);\n" +
              "  console.log(count);  // עדיין הערך הישן!\n" +
              "};",
            explanation:
              "הסטטה לא משתנה מיד — הערך החדש מופיע רק ברינדור הבא. אם רוצים לראות אותו, יש להשתמש ב-useEffect.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה ש-count יתעדכן מיד אחרי setCount",
            why: "setCount מתזמן עדכון לרינדור הבא — באותה פונקציה count נשאר עם הערך הישן.",
            fix: "אם צריכים את הערך החדש מיד, השתמשו ב-functional update או ב-useEffect שמאזין ל-count.",
          },
          {
            mistake: "מספר setCount(count + N) ברצף",
            why: "כל הקריאות משתמשות באותו snapshot של count — רק האחרונה 'תקפה'.",
            fix: "השתמשו ב-setCount(c => c + N) בכל הקריאות.",
          },
          {
            mistake: "שינוי ה-state ישירות: count = 5",
            why: "React לא יודע שמשהו השתנה — אין re-render. ה-DOM נשאר כפי שהיה.",
            fix: "תמיד עברו דרך ה-setter: setCount(5).",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה יודפס?\n  setCount(5);\n  console.log(count);  // count התחיל מ-0",
            answer:
              "0 — הערך הישן. setCount מתזמן עדכון אבל count באותה פונקציה הוא snapshot של רינדור קודם.",
          },
          {
            question:
              "אילו setCount ב-handler אחד יביאו ל-+3?\n  (א) setCount(count+1) ×3\n  (ב) setCount(c=>c+1) ×3",
            answer:
              "(ב) — רק ה-functional update מתבסס על הערך העדכני בתור. (א) יוסיף 1 בלבד.",
          },
          {
            question:
              "אם count=2 ואני רץ: setCount(10); setCount(c => c + 5);\nמה count אחרי?",
            answer:
              "15 — אחרי setCount(10) התור מצביע על 10. ואז c=>c+5 מקבל 10 ומחזיר 15.",
          },
        ],
      },
    },

    // ─────────────────────────────── 5. re-render (difficulty 8) ───────────────────────────────
    {
      conceptName: "re-render",
      difficulty: 8,
      levels: {
        grandma:
          "re-render זה כמו שצובעים מחדש את החדר אחרי שזיזו רהיטים. React 'צובע מחדש' את הקומפוננטה כל פעם שהמצב שלה משתנה — כדי שהמשתמש יראה את התמונה המעודכנת.",
        child:
          "כמו במשחק שאם הניקוד עולה — המסך מתעדכן ומראה את הניקוד החדש. ה'ציור מחדש' של המסך זה בדיוק re-render.",
        soldier:
          "re-render הוא ההרצה מחדש של פונקציית הקומפוננטה. הוא קורה כש-state משתנה, props משתנים, או קומפוננטת אב מתרענננת. החישוב יוצר Virtual DOM חדש; React משווה ומעדכן רק מה שצריך.",
        student:
          "re-render מופעל כש: (1) ה-state עודכן באמצעות setter (גם אם הערך זהה — כן, אם הערך באמת זהה אצל primitive React מדלג ברוב המקרים); (2) הקומפוננטה האב התרעננה; (3) קונטקסט שהקומפוננטה צורכת השתנה. הוא לא מעדכן את ה-DOM ישירות — קודם משווה ל-VDOM הישן.",
        junior:
          "פעם הוספתי console.log בתחילת הקומפוננטה והופתעתי — הוא הופיע 50 פעם בדקה. הבנתי שהאב שלי מתרענן בלי שיהיה צורך, וצריך React.memo כדי למנוע re-render לבן.",
        professor:
          "Re-rendering involves invoking the component function to produce a new VDOM tree, then reconciling against the previous tree. React batches state updates within event handlers and uses Object.is for state equality. Re-renders propagate to children unless memoized via React.memo with stable prop references.",
      },
      illustration:
        "🔁 re-render — הזרימה:\n\n" +
        "  setCount(5)\n" +
        "       ↓\n" +
        "  React מסמן: 'Counter dirty'\n" +
        "       ↓\n" +
        "  הקומפוננטה רצה מחדש (ההפונקציה כולה!)\n" +
        "       ↓\n" +
        "  Virtual DOM חדש נוצר\n" +
        "       ↓\n" +
        "  React משווה ל-VDOM הקודם (diff)\n" +
        "       ↓\n" +
        "  עדכון מינימלי ב-DOM האמיתי",
      codeExample:
        "function Counter() {\n" +
        '  console.log("rendering!");  // יופיע בכל re-render\n' +
        "  const [count, setCount] = useState(0);\n" +
        "  return (\n" +
        '    <button onClick={() => setCount(count + 1)}>\n' +
        "      {count}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "כל פעם שלוחצים על הכפתור, setCount מטריג re-render — הקומפוננטה רצה כולה מחדש (כולל console.log). אם תוסיפו useState רגיל בלי קריאה — לא יהיה re-render.",
      extras: {
        moreExamples: [
          {
            code:
              "// re-render אוטומטי כשהאב מתרענן\n" +
              "function Parent() {\n" +
              "  const [, force] = useState(0);\n" +
              "  return (\n" +
              "    <>\n" +
              '      <button onClick={() => force(x=>x+1)}>force</button>\n' +
              "      <Child />  {/* יתרענן בכל לחיצה! */}\n" +
              "    </>\n" +
              "  );\n" +
              "}",
            explanation:
              "הילד מתרענן בכל פעם שהאב מתרענן — גם אם props שלו לא השתנו. כדי למנוע: React.memo(Child).",
          },
          {
            code:
              "// בלימת re-render עם React.memo\n" +
              "const Child = React.memo(function Child({ name }) {\n" +
              '  console.log("Child render");\n' +
              "  return <div>שלום {name}</div>;\n" +
              "});",
            explanation:
              "React.memo משווה props רדודות. אם name לא השתנה — Child לא מתרענן גם אם האב כן.",
          },
          {
            code:
              "// סטטה זהה — React מדלג על re-render\n" +
              "const [n, setN] = useState(5);\n" +
              "setN(5);  // אותו ערך → React לא מתרענן\n" +
              'setN(prev => prev);  // אותו ערך → דילוג\n' +
              "setN({ x: 5 });  // אובייקט חדש → כן מתרענן",
            explanation:
              "React משתמש ב-Object.is להשוואה. primitives זהים → דילוג. אובייקט חדש (גם אם תוכן זהה) → re-render.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה ש-re-render יקרה אחרי שינוי ישיר של state",
            why: "React לא מאזין לשינויים — הוא רק מגיב ל-setter.",
            fix: "תמיד עברו דרך ה-setter, גם אם השינוי קטן.",
          },
          {
            mistake: "ילדים מתרעננים גם כשלא צריך",
            why: "כל re-render של אב מטריג re-render של כל הילדים — כברירת מחדל.",
            fix: "השתמשו ב-React.memo + useCallback ל-props פונקציונליים, או הרימו state כך שהילד לא יראה אותו.",
          },
          {
            mistake: "console.log מציג ערך ישן",
            why: "הסטטה החדשה זמינה רק ברינדור הבא.",
            fix: "כדי לראות את הערך החדש בעקבות שינוי, השתמשו ב-useEffect שמאזין למשתנה.",
          },
          {
            mistake: "אובייקט חדש בכל רינדור גורם ל-re-render אינסופי",
            why: "אם props מקבלים אובייקט חדש בכל רינדור (לדוגמה {x: 1}) ויש useEffect שמאזין לו — נוצר loop.",
            fix: "השתמשו ב-useMemo ליציבות הפניה, או העבירו primitive במקום אובייקט.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "כמה פעמים יודפס 'render'?\n  function App(){\n    console.log('render');\n    const [n, setN] = useState(0);\n    useEffect(() => { setN(1); }, []);\n    return <div>{n}</div>;\n  }",
            answer:
              "פעמיים. ראשון: הרינדור הראשוני (n=0). אז useEffect רץ ומבצע setN(1) — מטריג re-render שני (n=1).",
          },
          {
            question:
              "האם setN(5) כש-n הוא כבר 5 מטריג re-render?",
            answer:
              "ברוב המקרים לא — React משווה עם Object.is, ועבור primitives זהים הוא מדלג. אבל הוא ירוץ פונקציה אחת לפני הדילוג, אז effects לא יופעלו.",
          },
          {
            question:
              "ילד שלא משתמש ב-state אבל מתרענן בכל פעם שהאב מתרענן — מה הפתרון?",
            answer:
              "React.memo(ChildComponent) — React ישווה props רדודות וידלג על re-render אם props לא השתנו.",
          },
        ],
      },
    },

    // ─────────────────────────────── 6. mutable (difficulty 5) ───────────────────────────────
    {
      conceptName: "mutable",
      difficulty: 5,
      levels: {
        grandma:
          "mutable זה 'ניתן לשינוי' — כמו לוח מחיק שאפשר לכתוב, למחוק, ולכתוב שוב על אותו לוח. ההפך מ-mutable זה immutable — כמו לוח אבן שחקוק לתמיד.",
        child:
          "במשחק לגו, אפשר להוסיף ולהסיר חלקים מהדגם — הוא mutable. אבל אם הדבקת אותו עם דבק חזק — הוא נהיה immutable, אי אפשר לשנות יותר.",
        soldier:
          "ב-JavaScript, אובייקטים ומערכים הם mutable כברירת מחדל. arr.push(5) משנה את arr עצמו. obj.x = 1 משנה את obj עצמו. primitives (string, number, boolean) הם immutable — אי אפשר לשנות אותם, רק להחליף.",
        student:
          "mutable = ניתן לשינוי במקום (in-place). פעולות כמו push, pop, splice, sort — משנות את המערך המקורי. הצבת ערך לתכונה (obj.key = val) משנה את האובייקט. ב-React, חובה להימנע משינויים mutable על state.",
        junior:
          "כשבניתי צ'אט, קראתי `messages.push(newMsg); setMessages(messages);` — לא ראיתי עדכון בכלל. התברר ש-React משווה הפניות (ולא תוכן), והוא ראה אותו מערך — דילג על re-render. עברתי ל-setMessages([...messages, newMsg]) ופתרתי.",
        professor:
          "JavaScript objects and arrays are reference types stored on the heap; mutation alters their contents in place without changing the reference. React's state diffing relies on reference inequality (Object.is) to detect changes — mutating without producing a new reference defeats the change detection.",
      },
      illustration:
        "🔄 mutable vs immutable:\n\n" +
        "  arr = [1, 2, 3]\n" +
        "  arr.push(4)        ← mutable: arr עצמו השתנה ל-[1,2,3,4]\n" +
        "  newArr = [...arr, 4]  ← immutable: arr נשאר, newArr חדש\n\n" +
        "  ב-React חובה immutable!",
      codeExample:
        "// ❌ mutation — לא יגרום ל-re-render\n" +
        "items.push(newItem);\n" +
        "setItems(items);\n\n" +
        "// ✅ immutable — מערך חדש\n" +
        "setItems([...items, newItem]);",
      codeExplanation:
        "push משנה את המערך המקורי (mutable). React משווה הפניות ורואה את אותו מערך — אין re-render. spread (...) יוצר מערך חדש עם הפניה חדשה — React מזהה שינוי ומתרענן.",
    },

    // ─────────────────────────────── 7. immutable (difficulty 6) ───────────────────────────────
    {
      conceptName: "immutable",
      difficulty: 6,
      levels: {
        grandma:
          "immutable זה 'בלתי ניתן לשינוי'. כמו לוח אבן חקוק — אם רוצים לשנות, חייבים ליצור לוח חדש. ב-React כך מטפלים ב-state: לא משנים את הקיים, יוצרים גרסה חדשה.",
        child:
          "במשחק קלפים: כל פעם שמשחקים, יוצרים חפיסה חדשה במקום לשנות את הישנה. זה מאפשר לחזור אחורה ולראות מה היה קודם — בלי שום שינוי בעבר.",
        soldier:
          "Immutable update = יצירת עותק חדש עם השינוי, במקום שינוי המקור. שיטות נפוצות: spread (...), map, filter, slice, concat, Object.assign({}). פעולות שמשנות במקום (push, splice, sort) — אסורות על state.",
        student:
          "Immutability ב-React מבטיח שהשוואת הפניות (Object.is) תזהה שינויים. בלי זה, מנגנון ה-diffing של React לא יודע שהמצב השתנה. גם useMemo, React.memo, ו-useEffect deps נשענים על זה.",
        junior:
          "בנוסף ל-React, גם בעבודה עם Redux ו-Zustand — חוקי האימוטביליות הם זהים. החלטתי להגדיר רק שיטות immutable בכל הפרויקט, אז אין מחשבות נוספות לזכור.",
        professor:
          "Immutable updates produce structurally shared copies — only changed paths get new references. This enables O(1) shallow equality checks for memoization and time-travel debugging via persistent data structures (e.g., Immer's structural sharing).",
      },
      illustration:
        "❄️ immutable update — יצירת עותק:\n\n" +
        "  שיטה              שינוי?  immutable?\n" +
        "  arr.push(x)       כן       ❌\n" +
        "  [...arr, x]       לא       ✅\n" +
        "  arr.filter(...)   לא       ✅\n" +
        "  arr.map(...)      לא       ✅\n" +
        "  arr.sort()        כן       ❌  (השתמש ב-[...arr].sort())\n" +
        "  arr.splice(...)   כן       ❌  (השתמש ב-filter/slice)",
      codeExample:
        "const [todos, setTodos] = useState([]);\n\n" +
        "// הוספה — immutable\n" +
        "setTodos([...todos, newTodo]);\n\n" +
        "// הסרה — immutable\n" +
        "setTodos(todos.filter(t => t.id !== idToDelete));\n\n" +
        "// עדכון — immutable\n" +
        "setTodos(todos.map(t =>\n" +
        "  t.id === idToToggle ? { ...t, done: !t.done } : t\n" +
        "));",
      codeExplanation:
        "כל פעולה יוצרת מערך חדש: spread להוספה, filter להסרה, map לעדכון. כל אובייקט פנימי שמשתנה — גם הוא נוצר חדש (...t) כדי לשמור על immutability עומק.",
      extras: {
        moreExamples: [
          {
            code:
              "// עדכון אובייקט מקונן\n" +
              "const [user, setUser] = useState({\n" +
              "  name: 'Tal',\n" +
              "  address: { city: 'Tel Aviv', zip: '61000' }\n" +
              "});\n" +
              "// ❌ mutation\n" +
              "user.address.city = 'Haifa';\n" +
              "setUser(user);  // אותו object — אין re-render\n\n" +
              "// ✅ immutable\n" +
              "setUser({\n" +
              "  ...user,\n" +
              "  address: { ...user.address, city: 'Haifa' }\n" +
              "});",
            explanation:
              "כדי לעדכן city — חייבים ליצור גם user חדש וגם address חדש. כל ענף ש'משתנה' חייב הפניה חדשה.",
          },
          {
            code:
              "// Immer מקצר משמעותית\n" +
              "import { produce } from 'immer';\n" +
              "setUser(produce(user, draft => {\n" +
              "  draft.address.city = 'Haifa';  // נראה mutation, אבל immutable\n" +
              "}));",
            explanation:
              "Immer מאפשר לכתוב סינתקסטית כמו mutation, אבל מאחורי הקלעים יוצר עותקים חדשים רק לענפים ששונו.",
          },
        ],
        pitfalls: [
          {
            mistake: "שכחת ה-... כשמעדכנים אובייקט מקונן",
            why: "setUser({ address: { city: 'X' } }) ימחק את שאר השדות של user.",
            fix: "תמיד spread ברמה החיצונית: setUser({ ...user, address: ... }).",
          },
          {
            mistake: "spread רדוד על אובייקט מקונן",
            why: "{ ...user } מעתיק רק רמה אחת. user.address עדיין אותה הפניה.",
            fix: "spread גם לאובייקטים פנימיים: { ...user, address: { ...user.address, city } }.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך להחליף את הפריט עם id=2 ל-{name: 'X'} במערך items בלי mutation?",
            answer:
              "items.map(item => item.id === 2 ? { ...item, name: 'X' } : item)",
          },
        ],
      },
    },

    // ─────────────────────────────── 8. reference (difficulty 7) ───────────────────────────────
    {
      conceptName: "reference",
      difficulty: 7,
      levels: {
        grandma:
          "reference זה 'הכתובת' של אובייקט בזיכרון. כמו שכתובת בית מצביעה על בית בעולם — ב-JS משתנה לאובייקט מצביע על האובייקט בזיכרון. שני משתנים יכולים להצביע על אותו בית.",
        child:
          "כמו ששני ילדים מסתכלים על אותה ציור על הלוח — אם אחד מהם מקלקל את הציור, גם השני יראה את הקלקול. זה כי שניהם מסתכלים על אותו דבר, לא העתק.",
        soldier:
          "primitive (number, string, boolean) — מועתק by value. אובייקט/מערך — מועתק by reference. const a = [1,2]; const b = a; b.push(3); → גם a הוא [1,2,3], כי שניהם מצביעים על אותו זיכרון.",
        student:
          "Reference equality (===) בודקת אם שני משתנים מצביעים על אותו אובייקט. {a:1} === {a:1} → false (שני אובייקטים נפרדים). React משתמש בהשוואת הפניות לזיהוי שינויים ב-state.",
        junior:
          "פעם בניתי טופס שהעתיק את state.formData ל-newData ועדכן אותו. שתי הקומפוננטות התחלקו באותו אובייקט וגרמו לבאגים מוזרים. הבנתי שב-`newData = state.formData` אין באמת העתקה.",
        professor:
          "JavaScript stores objects on the heap; variables hold references (pointers). Assignment copies the reference, not the object. Strict equality on objects compares pointer identity, not structural equality. Mutation via any reference is visible from all references.",
      },
      illustration:
        "🔗 reference — הפניה בזיכרון:\n\n" +
        "  const a = { x: 1 };\n" +
        "  const b = a;            ← b מצביע לאותו object\n" +
        "  b.x = 99;\n" +
        "  console.log(a.x);  →  99  ❗ a השתנה גם!\n\n" +
        "  const c = { ...a };     ← c זה object חדש\n" +
        "  c.x = 5;\n" +
        "  console.log(a.x);  →  99  (a לא נגוע)",
      codeExample:
        "const obj1 = { count: 5 };\n" +
        "const obj2 = obj1;           // אותו reference\n" +
        "const obj3 = { ...obj1 };    // reference חדש, תוכן זהה\n\n" +
        "obj1 === obj2;  // true  (אותה הפניה)\n" +
        "obj1 === obj3;  // false (הפניות שונות)\n" +
        "obj1.count === obj3.count;  // true (אותו ערך)",
      codeExplanation:
        "obj2 = obj1 לא יוצר עותק — שניהם מצביעים על אותו אובייקט בזיכרון. spread (...obj1) יוצר אובייקט חדש בזיכרון עם אותם ערכים. השוואת === בודקת הפניות, לא תוכן.",
      extras: {
        moreExamples: [
          {
            code:
              "// ❗ מערך כ-reference\n" +
              "const items = [1, 2, 3];\n" +
              "const copy = items;\n" +
              "copy.push(4);\n" +
              "console.log(items);  // [1, 2, 3, 4] — items הושפע!",
            explanation:
              "copy ו-items מצביעים על אותו מערך. push משנה אותו — שני המשתנים רואים את השינוי.",
          },
          {
            code:
              "// ✅ העתקה אמיתית\n" +
              "const items = [1, 2, 3];\n" +
              "const real = [...items];  // מערך חדש\n" +
              "real.push(4);\n" +
              "console.log(items);  // [1, 2, 3] — לא השתנה ✓\n" +
              "console.log(real);   // [1, 2, 3, 4]",
            explanation:
              "spread יוצר מערך חדש עם אותם ערכים. שינוי ב-real לא משפיע על items.",
          },
          {
            code:
              "// מקונן — עדיין משתף!\n" +
              "const a = { user: { name: 'Tal' } };\n" +
              "const b = { ...a };\n" +
              "b.user.name = 'Dan';\n" +
              "console.log(a.user.name);  // 'Dan' — הושפע!",
            explanation:
              "spread רדוד מעתיק רק רמה אחת. a.user ו-b.user עדיין מצביעים על אותו אובייקט פנימי.",
          },
        ],
        pitfalls: [
          {
            mistake: "ציפייה שב-`b = a` נוצר עותק",
            why: "ב-JS לאובייקטים ומערכים, ההצבה מעתיקה את ההפניה — לא את התוכן.",
            fix: "השתמש ב-{...a} או [...a] להעתקה רדודה, ב-structuredClone(a) להעתקה עומק.",
          },
          {
            mistake: "מערך כ-prop משתנה ב-mutation",
            why: "האב והילד חולקים את אותה הפניה. mutation אצל הילד רואה גם את האב.",
            fix: "תמיד עברו props דרך עותקים, או הימנעו מ-mutation בכלל.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה יודפס?\n  const a = [1,2];\n  const b = a;\n  b.push(3);\n  console.log(a.length);",
            answer:
              "3 — a ו-b מצביעים על אותו מערך. push משנה אותו ולשניהם length=3.",
          },
          {
            question:
              "מה התוצאה?\n  ({a:1} === {a:1})",
            answer:
              "false — שני אובייקטים שונים בזיכרון. גם אם תוכן זהה, ההפניות שונות.",
          },
        ],
      },
    },

    // ─────────────────────────────── 9. array reference (difficulty 9) ───────────────────────────────
    {
      conceptName: "array reference",
      difficulty: 9,
      levels: {
        grandma:
          "array reference זה הכתובת של מערך בזיכרון. ב-React, אם אתה משנה מערך 'במקום' (push למשל) — הכתובת לא משתנה, ו-React לא רואה שינוי. חייבים מערך חדש, כתובת חדשה.",
        child:
          "תארי לעצמך שהמערך זה תיק עם דברים. אם תוסיפי משהו לתיק (push) — זה אותו תיק. אם תיקני תיק חדש עם הדברים הישנים + החדש (spread) — זה תיק שונה. React מבחין רק בתיקים שונים.",
        soldier:
          "כש-state הוא מערך, חובה ליצור מערך חדש בכל עדכון. push, pop, shift, unshift, sort, splice — כולם מקבלים את אותו מערך. spread, concat, filter, map, slice — יוצרים חדש.",
        student:
          "React משווה state ישן וחדש באמצעות Object.is — שזו השוואת הפניות לאובייקטים. אם setItems(items) קיבל את אותה הפניה — React מדלג על re-render, גם אם התוכן שונה (כי Object.is עליו = true).",
        junior:
          "בניתי TodoList עם items.push(newTodo); setItems(items). שום פריט חדש לא הופיע. הבנתי שצריך setItems([...items, newTodo]) — ואז זה עבד. עכשיו אני אף פעם לא משתמש ב-push על state.",
        professor:
          "Array reference identity is the basis for React's bail-out optimization. Mutating an array preserves its reference, causing setState to short-circuit (no render). Producing a new array (e.g., via Array.prototype.concat or spread) yields a fresh reference, triggering reconciliation.",
      },
      illustration:
        "📚 array reference — מתי React רואה שינוי:\n\n" +
        "  פעולה               יוצר חדש?  setState עובד?\n" +
        "  arr.push(x)            ❌          ❌\n" +
        "  arr.pop()              ❌          ❌\n" +
        "  arr.shift()/unshift()  ❌          ❌\n" +
        "  arr.sort()             ❌          ❌\n" +
        "  arr.splice(...)        ❌          ❌\n" +
        "  ─────────────────────────────────────\n" +
        "  [...arr, x]            ✅          ✅\n" +
        "  arr.concat(x)          ✅          ✅\n" +
        "  arr.filter(...)        ✅          ✅\n" +
        "  arr.map(...)           ✅          ✅\n" +
        "  arr.slice(...)         ✅          ✅",
      codeExample:
        "// ❌ באג מוכר\n" +
        "const [items, setItems] = useState([]);\n" +
        "const addItem = (x) => {\n" +
        "  items.push(x);     // משנה במקום\n" +
        "  setItems(items);   // אותה הפניה → React לא מתרענן!\n" +
        "};\n\n" +
        "// ✅ נכון\n" +
        "const addItem = (x) => {\n" +
        "  setItems([...items, x]);  // מערך חדש → re-render\n" +
        "};",
      codeExplanation:
        "המקרה הראשון: push משנה את items, אבל ההפניה זהה. React מדלג על re-render. השני: spread יוצר מערך חדש עם הפניה חדשה — React מזהה שינוי ומתרענן.",
      extras: {
        moreExamples: [
          {
            code:
              "// הוספה לסוף\n" +
              "setItems([...items, newItem]);\n\n" +
              "// הוספה להתחלה\n" +
              "setItems([newItem, ...items]);\n\n" +
              "// הוספה באמצע (במקום i)\n" +
              "setItems([\n" +
              "  ...items.slice(0, i),\n" +
              "  newItem,\n" +
              "  ...items.slice(i)\n" +
              "]);",
            explanation:
              "כל הצורות יוצרות מערך חדש. slice לא משנה את המקור; spread מאחד אותם למערך חדש.",
          },
          {
            code:
              "// הסרה לפי id\n" +
              "setItems(items.filter(item => item.id !== idToRemove));\n\n" +
              "// הסרה לפי אינדקס\n" +
              "setItems(items.filter((_, i) => i !== indexToRemove));",
            explanation:
              "filter תמיד מחזיר מערך חדש. שימו לב: items.splice(i, 1) ימחק במקום ולא יעבוד.",
          },
          {
            code:
              "// עדכון פריט אחד\n" +
              "setItems(items.map(item =>\n" +
              "  item.id === idToUpdate\n" +
              "    ? { ...item, done: true }\n" +
              "    : item\n" +
              "));",
            explanation:
              "map יוצר מערך חדש. לפריט המתאים — אובייקט חדש (...item, done: true). שאר הפריטים נשארים אותו אובייקט (זה בסדר).",
          },
          {
            code:
              "// מיון בלי mutation\n" +
              "setItems([...items].sort((a, b) => a.value - b.value));\n\n" +
              "// ❌ items.sort(...) ישנה את items במקום!",
            explanation:
              "sort משנה את המערך — לכן יוצרים עותק קודם עם spread. ב-ES2023 קיים גם items.toSorted() שמחזיר חדש.",
          },
        ],
        pitfalls: [
          {
            mistake: "items.push(x); setItems(items)",
            why: "items הוא אותו מערך — React מדלג על re-render.",
            fix: "setItems([...items, x])",
          },
          {
            mistake: "items[0] = newValue; setItems(items)",
            why: "הצבה לאינדקס משנה במקום. אותה הפניה.",
            fix: "setItems(items.map((v, i) => i === 0 ? newValue : v))",
          },
          {
            mistake: "items.sort(...); setItems(items)",
            why: "sort משנה את items במקום ומחזיר אותו.",
            fix: "setItems([...items].sort(...))",
          },
          {
            mistake: "items.splice(i, 1); setItems(items)",
            why: "splice משנה את items.",
            fix: "setItems(items.filter((_, idx) => idx !== i))",
          },
          {
            mistake: "items.reverse(); setItems(items)",
            why: "reverse משנה את items.",
            fix: "setItems([...items].reverse()) או items.toReversed() ב-ES2023.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מוסיפים newItem לסוף המערך items, כך ש-React יראה את השינוי?",
            answer:
              "setItems([...items, newItem]) או setItems(items.concat(newItem))",
          },
          {
            question:
              "איך מסירים מהמערך items את כל הפריטים עם done=true?",
            answer:
              "setItems(items.filter(item => !item.done))",
          },
          {
            question:
              "מדוע items.push(x); setItems(items) לא עובד?",
            answer:
              "push משנה את items במקום. ההפניה זהה, ו-React מדלג על re-render כי Object.is(prev, next) = true.",
          },
          {
            question:
              "איך משנים את הפריט עם id=5 כך שיהיה name='X'?",
            answer:
              "setItems(items.map(it => it.id === 5 ? { ...it, name: 'X' } : it))",
          },
        ],
      },
    },

    // ─────────────────────────────── 10. object reference (difficulty 9) ───────────────────────────────
    {
      conceptName: "object reference",
      difficulty: 9,
      levels: {
        grandma:
          "object reference זה הכתובת של אובייקט. אם אתה משנה את התכונות של האובייקט (obj.x = 1) — הכתובת לא משתנה. ב-React לא יידע שמשהו השתנה.",
        child:
          "תארו לכם תיבה מלאה צעצועים. אם תחליפו צעצוע בתיבה — זאת עדיין אותה תיבה (אותה כתובת). React מסתכל על התיבה ומבחין: 'אותה תיבה'. צריך ליצור תיבה חדשה כדי שיבחין.",
        soldier:
          "obj.x = 1 משנה את האובייקט במקום. obj = { ...obj, x: 1 } יוצר אובייקט חדש. ב-React חובה לעבור על הצורה השנייה כשמעדכנים state.",
        student:
          "Object reference identity מבוססת על מיקום ב-heap. mutation על props של אובייקט (obj.field = val) שומר את אותה הפניה — React מדלג. Object spread, Object.assign({}, ...), structuredClone — יוצרים חדש.",
        junior:
          "בניתי טופס עם user object. ניסיתי `user.name = 'Tal'; setUser(user)` — שום עדכון. הבנתי שצריך `setUser({...user, name: 'Tal'})`. כל פעם שמשנים שדה ב-state-object, חייב spread.",
        professor:
          "Shallow object identity is the unit of change for React's reconciliation. Property mutation preserves the reference; spread, Object.assign, or destructure-and-rebuild produce a new reference. For nested updates, each modified branch needs a fresh reference.",
      },
      illustration:
        "🗃️ object reference — מתי React רואה שינוי:\n\n" +
        "  obj.x = 5         ← אותה הפניה ❌\n" +
        "  obj['x'] = 5      ← אותה הפניה ❌\n" +
        "  delete obj.x      ← אותה הפניה ❌\n" +
        "  Object.assign(obj, {x:5})  ← אותה הפניה ❌\n" +
        "  ─────────────────────────────\n" +
        "  { ...obj, x: 5 }              ← הפניה חדשה ✅\n" +
        "  Object.assign({}, obj, {x:5})  ← הפניה חדשה ✅",
      codeExample:
        "const [user, setUser] = useState({ name: 'Tal', age: 30 });\n\n" +
        "// ❌ פגום\n" +
        "user.age = 31;\n" +
        "setUser(user);   // אותו אובייקט → React לא מתרענן\n\n" +
        "// ✅ נכון\n" +
        "setUser({ ...user, age: 31 });",
      codeExplanation:
        "user.age = 31 משנה את user במקום — React רואה את אותה הפניה ומדלג על re-render. spread יוצר אובייקט חדש עם הפניה חדשה — React מזהה שינוי.",
      extras: {
        moreExamples: [
          {
            code:
              "// עדכון שדה אחד\n" +
              "setUser({ ...user, age: 31 });\n\n" +
              "// עדכון מספר שדות\n" +
              "setUser({ ...user, age: 31, city: 'Haifa' });\n\n" +
              "// מחיקת שדה\n" +
              "const { age, ...rest } = user;\n" +
              "setUser(rest);  // user בלי age",
            explanation:
              "spread מעתיק את כל השדות הקיימים, ואז מציבים מחדש את השדות החדשים. למחיקה — destructure ושמור את ה-rest.",
          },
          {
            code:
              "// אובייקט מקונן\n" +
              "const [state, setState] = useState({\n" +
              "  user: { name: 'Tal', address: { city: 'TLV' } }\n" +
              "});\n" +
              "// ❌ רק spread רדוד — לא יספיק\n" +
              "setState({ ...state, user: { ...state.user, address: { ...state.user.address, city: 'Haifa' } } });",
            explanation:
              "כל ענף שמשתנה חייב הפניה חדשה. צריך spread לכל רמה: state, user, address.",
          },
          {
            code:
              "// Immer מקצר משמעותית\n" +
              "import { produce } from 'immer';\n" +
              "setState(produce(state, draft => {\n" +
              "  draft.user.address.city = 'Haifa';\n" +
              "}));",
            explanation:
              "Immer מאפשר 'mutation סינטקסטית' — מאחורי הקלעים יוצר עותקים חדשים רק לענפים ששונו.",
          },
          {
            code:
              "// updater function ל-state אובייקט\n" +
              "setUser(prev => ({ ...prev, age: prev.age + 1 }));",
            explanation:
              "כשהעדכון תלוי ב-state הנוכחי, השתמשו ב-updater function כדי לקבל את הערך העדכני.",
          },
        ],
        pitfalls: [
          {
            mistake: "user.age = 31; setUser(user)",
            why: "user הוא אותו אובייקט — React מדלג על re-render.",
            fix: "setUser({ ...user, age: 31 })",
          },
          {
            mistake: "Object.assign(user, {age: 31})",
            why: "Object.assign(target, ...) משנה את target במקום. אותה הפניה.",
            fix: "Object.assign({}, user, {age: 31}) — מטרה {} חדשה.",
          },
          {
            mistake: "spread רדוד על מקונן",
            why: "{...user} מעתיק רק רמה אחת. user.address עדיין אותה הפניה.",
            fix: "spread לכל רמה שמשתנה: { ...user, address: { ...user.address, city } }",
          },
          {
            mistake: "setUser({age: 31}) במקום {...user, age: 31}",
            why: "מחליף את כל user באובייקט חדש שמכיל רק age. שאר השדות נמחקים.",
            fix: "תמיד spread קודם: setUser({ ...user, age: 31 })",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מעדכנים את user.age ל-31 בלי לאבד את שאר השדות?",
            answer:
              "setUser({ ...user, age: 31 })",
          },
          {
            question:
              "user = { profile: { name: 'A' } }. איך משנים את name ל-'B'?",
            answer:
              "setUser({ ...user, profile: { ...user.profile, name: 'B' } })",
          },
          {
            question:
              "מה הבעיה ב: const u = user; u.age = 31; setUser(u);?",
            answer:
              "u ו-user מצביעים על אותו אובייקט. mutation שלא יוצר הפניה חדשה — React לא מזהה שינוי, אין re-render.",
          },
        ],
      },
    },

    // ─────────────────────────────── 11. onChange (difficulty 4) ───────────────────────────────
    {
      conceptName: "onChange",
      difficulty: 4,
      levels: {
        grandma:
          "onChange זה כמו אוזן שמקשיבה לכל שינוי. כל פעם שאתה כותב משהו בשדה — האוזן שומעת ומגיבה. ב-React, היא מעדכנת את הזיכרון.",
        child:
          "במשחק 'איפה התחבאת?' — כל פעם שמישהו זז, החבר שלך שומע ומגיב. onChange זה אותו דבר: כל לחיצה על מקש מטריגה תגובה.",
        soldier:
          "onChange הוא event handler ב-React שמופעל בכל שינוי בשדה (input, textarea, select). הוא מקבל אובייקט event, וב-event.target.value יש את הערך החדש.",
        student:
          "onChange ב-React שונה מ-DOM הסטנדרטי — הוא מופעל בכל input event, לא רק בסיום. הוא מקבל SyntheticEvent של React. השדה הנפוץ: event.target.value.",
        junior:
          "פעם שכחתי e.target ובמקום זה רשמתי `onChange={setValue(e.value)}` — קיבלתי שגיאה. הבנתי שהאירוע הוא event שלם, וצריך להיכנס ל-target.value.",
        professor:
          "React's onChange wraps DOM input/change with a SyntheticEvent for cross-browser consistency. Unlike DOM's change event (fires on blur), React's onChange fires on every keystroke, mirroring the input event.",
      },
      illustration:
        "👂 onChange — מאזין לשינויים:\n\n" +
        "  <input onChange={e => setName(e.target.value)} />\n" +
        "                    ↑           ↑\n" +
        "                  event       הערך החדש\n\n" +
        "  כל מקש שלוחצים → onChange רץ → setName מעדכן",
      codeExample:
        "function NameForm() {\n" +
        "  const [name, setName] = useState('');\n" +
        "  return (\n" +
        "    <>\n" +
        '      <input value={name} onChange={e => setName(e.target.value)} />\n' +
        "      <p>שלום {name}!</p>\n" +
        "    </>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "onChange מקבל event ו-e.target.value הוא הערך הנוכחי של השדה. setName מעדכן את state, וזה גורם להצגת הערך מתחת באופן מיידי.",
    },

    // ─────────────────────────────── 12. controlled input (difficulty 7) ───────────────────────────────
    {
      conceptName: "controlled input",
      difficulty: 7,
      levels: {
        grandma:
          "controlled input זה שדה שאת לגמרי שולטת בו — את אומרת לו מה להציג, והוא מספר לך כשמישהו משנה. ההפך: שדה 'חופשי' שמנהל את עצמו.",
        child:
          "כמו לוח שכל מה שכתוב עליו מגיע ממך, ואת בודקת כל אות לפני שהיא נכתבת. את שולטת מה מופיע — לא הילד שמצייר.",
        soldier:
          "Controlled input = השדה מקבל value מ-state, וכל שינוי עובר דרך onChange שמעדכן את state. התצוגה תמיד 'נשלטת' על ידי React. הניגוד: uncontrolled (משתמשים ב-ref).",
        student:
          "ב-controlled, ערך השדה הוא יחידני — מ-state. בלי onChange שמעדכן state, השדה לא ישתנה (read-only de facto). זה הסטנדרט המומלץ ב-React, מאפשר ולידציה, transformation ושליטה מלאה.",
        junior:
          "פעם בניתי input עם value={state} בלי onChange — לא יכולתי להקליד. React הזהיר: 'You provided a value prop without onChange'. הוספתי onChange — והכל עבד. עכשיו אני זוכר: value+onChange תמיד באים ביחד.",
        professor:
          "Controlled inputs unify input state with React state, ensuring single source of truth. The DOM value is overwritten on every render with the state value. Validation, masking, and reactive transformations are trivial — you control the value before committing it.",
      },
      illustration:
        "🎛️ controlled input — שני המרכיבים:\n\n" +
        "  <input\n" +
        "    value={name}        ← מה להציג (מ-state)\n" +
        "    onChange={e =>      ← מה לעשות בשינוי\n" +
        "      setName(e.target.value)\n" +
        "    }\n" +
        "  />\n\n" +
        "  בלי שניהם — השדה 'מקפיא' או מתפרק.",
      codeExample:
        "function UpperCaseForm() {\n" +
        "  const [name, setName] = useState('');\n" +
        "  return (\n" +
        "    <input\n" +
        "      value={name}\n" +
        "      onChange={e => setName(e.target.value.toUpperCase())}\n" +
        "    />\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "השדה הוא controlled — value שלו מגיע מ-state. ב-onChange אנחנו ממירים ל-uppercase לפני שמירה — וכך שולטים בכל מה שמופיע. אי אפשר לעקוף.",
      extras: {
        moreExamples: [
          {
            code:
              "// ולידציה: רק ספרות\n" +
              "<input\n" +
              "  value={phone}\n" +
              "  onChange={e => {\n" +
              "    const v = e.target.value.replace(/\\D/g, '');\n" +
              "    setPhone(v);\n" +
              "  }}\n" +
              "/>",
            explanation:
              "כל מה שלא ספרה — מסונן. המשתמש לא יראה אותיות, גם אם ניסה.",
          },
          {
            code:
              "// uncontrolled עם ref (ניגוד)\n" +
              "function Form() {\n" +
              "  const inputRef = useRef();\n" +
              "  const submit = () => alert(inputRef.current.value);\n" +
              "  return (\n" +
              "    <>\n" +
              '      <input ref={inputRef} defaultValue="הקלד" />\n' +
              "      <button onClick={submit}>שלח</button>\n" +
              "    </>\n" +
              "  );\n" +
              "}",
            explanation:
              "ב-uncontrolled, ה-DOM מנהל את הערך. ref נותן גישה אליו רק כשצריך. שימוש לטופס פשוט שלא דורש ולידציה real-time.",
          },
          {
            code:
              "// התחלה במקרה שיש ערך מוקדם\n" +
              "function EditForm({ initialName }) {\n" +
              "  const [name, setName] = useState(initialName || '');\n" +
              "  return (\n" +
              "    <input\n" +
              "      value={name}\n" +
              "      onChange={e => setName(e.target.value)}\n" +
              "    />\n" +
              "  );\n" +
              "}",
            explanation:
              "ה-state מתחיל מהערך החיצוני. שינויים נשמרים ב-state בלבד עד שמשתמש לוחץ 'שמור'.",
          },
        ],
        pitfalls: [
          {
            mistake: "value בלי onChange",
            why: "השדה הופך de facto ל-read-only. React מתריע: 'You provided a value prop without onChange'.",
            fix: "תמיד תוסיפו onChange שמעדכן state, או החליפו ל-defaultValue (uncontrolled).",
          },
          {
            mistake: "value={null}",
            why: "React ייתן הזהרה. null מתפרש כ-undefined ויעבור לשדה uncontrolled.",
            fix: "תשתמשו ב-'' כברירת מחדל: useState('').",
          },
          {
            mistake: "onChange שלא מעדכן state",
            why: "השדה לא יקבל את ההקשה. הערך תמיד נשאר אותו.",
            fix: "ודאו ש-setState נקרא בתוך ה-onChange עם e.target.value.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "מה המינימום הדרוש כדי לעשות controlled input?",
            answer:
              "value={state} + onChange={e => setState(e.target.value)}. שניהם חובה.",
          },
          {
            question:
              "איך לבנות שדה שמקבל רק אותיות?",
            answer:
              "onChange={e => setVal(e.target.value.replace(/[^a-zA-Z]/g, ''))} — הסינון מתבצע לפני השמירה ל-state.",
          },
        ],
      },
    },

    // ─────────────────────────────── 13. props (difficulty 4) ───────────────────────────────
    {
      conceptName: "props",
      difficulty: 4,
      levels: {
        grandma:
          "props זה 'מתנות' שאמא נותנת לילד. הילד מקבל את המתנה — אבל לא יכול לשנות אותה. ב-React, אבא (קומפוננטה) שולח נתונים לבן (קומפוננטה אחרת) דרך props.",
        child:
          "כמו פתק מהמורה לתלמיד — התלמיד קורא ועושה מה שכתוב, אבל לא משנה את הפתק. ככה props עוברים מהאבא לבן.",
        soldier:
          "props (properties) הם נתונים שעוברים מהקומפוננטה האב לבן דרך attributes ב-JSX. הם read-only — הבן לא יכול לשנות אותם, רק להציג או להעביר הלאה.",
        student:
          "props הם הפרמטרים של הקומפוננטה. קומפוננטה היא בעצם פונקציה שמקבלת props ומחזירה JSX. הם זורמים בכיוון אחד (top-down) — מאב לבן.",
        junior:
          "פעם ניסיתי לשנות props.name = 'X' — קיבלתי שגיאה: 'props are read-only'. הבנתי שאם אני רוצה לשנות נתון מקומפוננטה ילדה, צריך לקבל פונקציית callback מהאב כ-prop.",
        professor:
          "Props are immutable inputs to a component, passed declaratively via JSX attributes. React's unidirectional data flow stipulates that props originate at the parent and are received by the child. Mutating props within a child violates the contract and breaks reasoning about reactivity.",
      },
      illustration:
        "📦 props — מתנות מאב לבן:\n\n" +
        "  // אבא\n" +
        '  <Greeting name="Tal" age={30} />\n' +
        "         ↓ ↓\n" +
        "  // בן מקבל\n" +
        "  function Greeting(props) {\n" +
        "    return <h1>שלום {props.name}!</h1>;\n" +
        "  }",
      codeExample:
        "function Greeting({ name, age }) {\n" +
        "  return <h1>שלום {name}, גילך {age}</h1>;\n" +
        "}\n\n" +
        "function App() {\n" +
        '  return <Greeting name="Tal" age={30} />;\n' +
        "}",
      codeExplanation:
        "App מעבירה ל-Greeting את name ו-age כ-props. Greeting מקבלת אותם בparameter (destructured) ומציגה. אם נשנה את הערכים ב-App — Greeting תקבל את החדשים.",
    },

    // ─────────────────────────────── 14. parent component (difficulty 3) ───────────────────────────────
    {
      conceptName: "parent component",
      difficulty: 3,
      levels: {
        grandma:
          "parent component זה האבא — הקומפוננטה שיוצרת קומפוננטות אחרות בתוכה. כמו אבא שמזמין את הילדים שלו לבית.",
        child:
          "במשפחה: ההורים יכולים לקרוא לילדים ולומר להם מה לעשות. ההורה הוא parent. הילד שמקבל הוראות הוא child.",
        soldier:
          "parent component הוא קומפוננטה ש-render-מציבה בתוכה קומפוננטות אחרות (ילדות), ומעבירה להן props.",
        student:
          "במבנה העץ של React, parent component יוצר ושולט בילדיה. שינוי props אצלה גורם ל-re-render של הילדים. שינוי state אצל הבן לא משפיע באוטומטיות על האב.",
        junior:
          "כשהתחלתי, חיפשתי איך לתת לבן 'לדבר' עם האב. הבנתי שהאב מעביר פונקציה כ-prop, והבן קורא לה. כך הנתונים זורמים: data למטה, callbacks למעלה.",
        professor:
          "The parent in React's component tree owns the lifecycle and prop derivation for its children. React's unidirectional flow means parents push props downward; children communicate upward only via callback props passed from the parent.",
      },
      illustration:
        "🌳 עץ הקומפוננטות:\n\n" +
        "  App (parent)\n" +
        "   ├─ Header (child)\n" +
        "   ├─ Posts (child + parent of Post)\n" +
        "   │   ├─ Post (grandchild)\n" +
        "   │   └─ Post (grandchild)\n" +
        "   └─ Footer (child)",
      codeExample:
        "function App() {  // parent\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  return (\n" +
        "    <Counter\n" +
        "      value={count}\n" +
        "      onIncrement={() => setCount(count + 1)}\n" +
        "    />\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "App הוא parent — הוא מחזיק את ה-state (count) ומעביר אותו + פונקציה לבן (Counter). הבן יקרא ל-onIncrement כדי שהאב יעדכן את ה-state.",
    },

    // ─────────────────────────────── 15. child component (difficulty 3) ───────────────────────────────
    {
      conceptName: "child component",
      difficulty: 3,
      levels: {
        grandma:
          "child component זה הילד — קומפוננטה שמוצבת בתוך קומפוננטה אחרת. הילד מקבל הוראות (props) מההורה ומבצע אותן.",
        child:
          "כמו ילד במשפחה: ההורה אומר 'לך לחדר!' (prop), והילד מציית. הילד יכול לבקש (callback), אבל לא לעשות מה שלא קיבל אישור.",
        soldier:
          "child component יוצא מתוך הקומפוננטה האב. הוא מקבל props ויכול להחזיר JSX. הוא בעצמו יכול להיות parent של קומפוננטות אחרות.",
        student:
          "בעץ React, ילד מקבל props מההורה, מציג, ויכול לקרוא לפונקציות שההורה שלח. שינוי state אצל הילד לא משפיע על האב — אלא דרך callback.",
        junior:
          "כשבניתי TodoItem (ילד) בתוך TodoList (אב) — הבנתי שאי אפשר למחוק todo רק מהילד. צריך לקבל פונקציה onDelete כ-prop, ולקרוא לה.",
        professor:
          "Child components receive data via props and trigger upward effects via callback props. They are pure (in the React sense) renders of their props plus internal state, with no direct access to the parent's state.",
      },
      illustration:
        "👶 child — מקבל ופועל:\n\n" +
        "  Parent\n" +
        "    ↓ props (data + callback)\n" +
        "  Child\n" +
        "    ↑ קורא ל-callback בתגובה לאירוע\n" +
        "  Parent מקבל הודעה ומעדכן את state",
      codeExample:
        "function Counter({ value, onIncrement }) {  // child\n" +
        "  return (\n" +
        "    <button onClick={onIncrement}>\n" +
        "      ערך: {value}\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "Counter הוא child — הוא מקבל את value (להציג) ואת onIncrement (פונקציה מהאב). בלחיצה הוא קורא ל-onIncrement, וההורה מעדכן את ה-state.",
    },

    // ─────────────────────────────── 16. passing function as prop (difficulty 8) ───────────────────────────────
    {
      conceptName: "passing function as prop",
      difficulty: 8,
      levels: {
        grandma:
          "כמו לתת לילד מספר טלפון של אמא: כשהילד צריך משהו — הוא מתקשר ואמא דואגת. ב-React, האב נותן לבן פונקציה כ-prop, והבן 'מתקשר' (קורא לה) כדי לבקש שינוי.",
        child:
          "כמו לחצן 'לקרוא לאמא' שאמא נתנה לך. אתה לוחץ — אמא מקבלת הודעה ומגיעה. הפונקציה כ-prop היא ה'לחצן' שהאב נותן לבן.",
        soldier:
          "מעבירים פונקציה כ-prop כדי לאפשר לבן 'לדבר' עם האב. הבן קורא לפונקציה (לדוגמה onDelete(id)), והאב — שיודע איך לטפל — מבצע את הפעולה.",
        student:
          "Function-as-prop הוא הדפוס לפיצול אחריות: הבן יודע 'מתי' לבצע פעולה (event), האב יודע 'איך' (לוגיקה). כך הבן נשאר reusable — לא יודע על ה-state.",
        junior:
          "פעם הוספתי console.log בפונקציה ושמתי לב שהיא נוצרת מחדש בכל רינדור — דבר שהפיל את React.memo של הילד. עברתי ל-useCallback וייצבתי את ההפניה.",
        professor:
          "Passing a function as a prop establishes upward communication in React's unidirectional flow. Each render produces a new function reference unless memoized; this can defeat React.memo or cause useEffect dep arrays to fire unnecessarily. useCallback stabilizes the reference.",
      },
      illustration:
        "📞 פונקציה כ-prop — תקשורת בן→אב:\n\n" +
        "  Parent מגדיר את הפונקציה ושומר state\n" +
        "    └─ <Child onDelete={handleDelete} />\n" +
        "                ↓ prop\n" +
        "  Child מקבל את הפונקציה\n" +
        "    └─ <button onClick={() => onDelete(id)}>\n" +
        "                  ↑\n" +
        "          קורא לאב עם נתונים",
      codeExample:
        "function TodoList() {  // parent\n" +
        "  const [todos, setTodos] = useState([{id:1, text:'A'}]);\n" +
        "  const handleDelete = (id) =>\n" +
        "    setTodos(todos.filter(t => t.id !== id));\n" +
        "  return todos.map(t =>\n" +
        "    <TodoItem key={t.id} todo={t} onDelete={handleDelete} />\n" +
        "  );\n" +
        "}\n\n" +
        "function TodoItem({ todo, onDelete }) {  // child\n" +
        "  return (\n" +
        "    <div>\n" +
        "      {todo.text}\n" +
        "      <button onClick={() => onDelete(todo.id)}>🗑️</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "TodoList מגדיר handleDelete (יודע איך למחוק כי יש לו את state). מעביר אותו ל-TodoItem. הבן קורא לפונקציה עם ה-id שלו — האב מטפל בלוגיקה.",
      extras: {
        moreExamples: [
          {
            code:
              "// useCallback ליציבות הפניה\n" +
              "import { useCallback } from 'react';\n\n" +
              "function TodoList() {\n" +
              "  const [todos, setTodos] = useState([]);\n" +
              "  const handleDelete = useCallback((id) =>\n" +
              "    setTodos(prev => prev.filter(t => t.id !== id))\n" +
              "  , []);\n" +
              "  // ...\n" +
              "}",
            explanation:
              "useCallback שומר את אותה הפניה בין רינדורים. זה חשוב כש-TodoItem עטוף ב-React.memo — אחרת הפונקציה נחשבת חדשה כל פעם.",
          },
          {
            code:
              "// inline function (יוצרת חדשה בכל render)\n" +
              "<button onClick={() => onDelete(todo.id)}>🗑️</button>\n\n" +
              "// vs פונקציה ישירה (אם חתימה זהה)\n" +
              "<button onClick={onDelete}>🗑️</button>\n" +
              "// כאן onDelete יקבל את ה-event במקום id",
            explanation:
              "inline arrow מאפשרת להעביר ארגומנטים בנוחות אבל יוצרת הפניה חדשה. עבור reusability עדיף לבחור מבנה מתאים.",
          },
          {
            code:
              "// העברה דרך מספר רמות — prop drilling\n" +
              "function App() {\n" +
              "  const onLogin = () => {/* ... */};\n" +
              "  return <Layout onLogin={onLogin} />;\n" +
              "}\n" +
              "function Layout({ onLogin }) {\n" +
              "  return <Header onLogin={onLogin} />;\n" +
              "}\n" +
              "function Header({ onLogin }) {\n" +
              "  return <button onClick={onLogin}>התחבר</button>;\n" +
              "}",
            explanation:
              "כשהפונקציה צריכה לעבור דרך כמה רמות — זה 'prop drilling'. אם הופך מסורבל, השתמשו ב-Context.",
          },
        ],
        pitfalls: [
          {
            mistake: "<button onClick={onDelete(id)} />",
            why: "זה קורא ל-onDelete מיד בעת הרינדור (וה-onClick יקבל את הערך המוחזר).",
            fix: "<button onClick={() => onDelete(id)} /> — arrow function שמתעכבת עד הלחיצה.",
          },
          {
            mistake: "פונקציה inline שגורמת ל-React.memo להיכשל",
            why: "כל רינדור יוצר הפניה חדשה — Memo רואה 'prop השתנה' ומריץ rebuild.",
            fix: "useCallback בהורה: useCallback(handler, [deps]).",
          },
          {
            mistake: "שינוי state ישירות בתוך onDelete הילד",
            why: "הילד לא רואה את state של האב.",
            fix: "ההורה מטפל בעדכון; הילד רק 'מודיע' באמצעות הפונקציה.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך הילד מודיע לאב שצריך למחוק פריט?",
            answer:
              "האב מעביר פונקציה כ-prop (onDelete). הילד קורא לה: onDelete(id). האב מטפל בלוגיקה.",
          },
          {
            question:
              "מה ההבדל בין onClick={handler} ל-onClick={() => handler()}?",
            answer:
              "onClick={handler} — מעביר את הפונקציה עצמה (תרוץ עם ה-event). onClick={() => handler()} — יוצר wrapper שקורא ל-handler בלי הארגומנט. שימושי כשרוצים לקרוא עם ערכים ספציפיים.",
          },
          {
            question:
              "למה useCallback חשוב כשמעבירים פונקציה לילד עם React.memo?",
            answer:
              "בלי useCallback, ההפניה משתנה בכל רינדור של ההורה. React.memo רואה 'prop חדש' ומריץ rebuild לילד. useCallback שומר אותה הפניה.",
          },
        ],
      },
    },

    // ─────────────────────────────── 17. addPost (difficulty 6) ───────────────────────────────
    {
      conceptName: "addPost",
      difficulty: 6,
      levels: {
        grandma:
          "addPost זו הפעולה של 'להוסיף פוסט חדש לרשימה' — ב-React אסור להוסיף לתוך הרשימה הקיימת, חייבים ליצור רשימה חדשה שכוללת את הישנה + החדש.",
        child:
          "כמו להוסיף ילד חדש לטור: לא דוחפים ביד אחורה — מסדרים מחדש את הטור עם הילד החדש בסוף. ככה הקוד יוצר רשימה חדשה.",
        soldier:
          "addPost = setPosts([...posts, newPost]). spread מעתיק את הקיים, ומוסיף בסוף. זה דפוס שחוזר: כל פעם שמוסיפים לרשימה ב-state.",
        student:
          "addPost הוא immutable update למערך state. הסינטקס המומלץ: setPosts(prev => [...prev, newPost]) — ה-functional update בטוח גם בעדכונים מרובים.",
        junior:
          "פעם בניתי בלוג והוספתי posts.push(newPost); setPosts(posts) — שום פוסט לא הופיע. הבנתי שצריך תמיד spread עם ה-setter, ושhrshema החדשה היא משמעותית עבור React.",
        professor:
          "addPost is a canonical immutable list-append: setPosts(prev => [...prev, newPost]). The functional setter ensures correctness under batched updates and concurrent rendering.",
      },
      illustration:
        "➕ addPost — הוספה immutable:\n\n" +
        "  posts = [a, b, c]\n" +
        "  newPost = d\n" +
        "  setPosts([...posts, newPost])  →  [a, b, c, d]\n" +
        "                ↑\n" +
        "        spread יוצר מערך חדש",
      codeExample:
        "function Blog() {\n" +
        "  const [posts, setPosts] = useState([]);\n" +
        "  const addPost = (text) => {\n" +
        "    const newPost = { id: Date.now(), text };\n" +
        "    setPosts(prev => [...prev, newPost]);\n" +
        "  };\n" +
        "  return (\n" +
        "    <button onClick={() => addPost('פוסט חדש')}>\n" +
        "      הוסף פוסט\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "addPost יוצר אובייקט חדש ומעדכן state עם מערך חדש שכולל את הקיים + החדש. השימוש ב-prev מבטיח שאם יש מספר addPost ברצף, כולם יחושבו נכון.",
      extras: {
        moreExamples: [
          {
            code:
              "// הוספה לראש (במקום לסוף)\n" +
              "const addPostToTop = (text) =>\n" +
              "  setPosts(prev => [{ id: Date.now(), text }, ...prev]);",
            explanation:
              "מהפכים את הסדר: הפריט החדש נכנס ראשון. שימושי לעדכוני 'הכי חדש קודם' כמו פיד חדשות.",
          },
          {
            code:
              "// הוספה בלי כפילויות\n" +
              "const addPostUnique = (text) =>\n" +
              "  setPosts(prev =>\n" +
              "    prev.some(p => p.text === text)\n" +
              "      ? prev\n" +
              "      : [...prev, { id: Date.now(), text }]\n" +
              "  );",
            explanation:
              "בודקים אם כבר קיים — אם כן, מחזירים את אותו prev (אין re-render). אחרת מוסיפים.",
          },
        ],
        pitfalls: [
          {
            mistake: "posts.push(newPost); setPosts(posts)",
            why: "אותה הפניה — אין re-render.",
            fix: "setPosts([...posts, newPost])",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מוסיפים פוסט חדש בראש הרשימה (לא בסוף)?",
            answer:
              "setPosts(prev => [newPost, ...prev])",
          },
        ],
      },
    },

    // ─────────────────────────────── 18. deletePost (difficulty 6) ───────────────────────────────
    {
      conceptName: "deletePost",
      difficulty: 6,
      levels: {
        grandma:
          "deletePost זה למחוק פוסט מהרשימה. ב-React לא משנים את הרשימה הקיימת — יוצרים רשימה חדשה בלי הפוסט הזה.",
        child:
          "במשחק 'הסר את הקלף': לא הופכים את הקלף; לוקחים את הקלפים האחרים ויוצרים ערימה חדשה. הקוד עושה אותו דבר.",
        soldier:
          "deletePost = setPosts(posts.filter(p => p.id !== idToRemove)). filter מחזיר מערך חדש בלי הפריט. זה דפוס סטנדרטי למחיקה.",
        student:
          "deletePost הוא immutable filter על מערך state. סינטקס מומלץ: setPosts(prev => prev.filter(p => p.id !== id)). ה-functional update בטוח עם עדכונים מרובים.",
        junior:
          "פעם השתמשתי ב-splice להסרה — וגיליתי שזה משנה את המערך במקום. עברתי ל-filter ולא חזרתי. גם הקוד נקרא יותר ברור.",
        professor:
          "deletePost via filter creates a new array sans the matching element. Filtering is preferable to splice (mutating) and to indexOf+slice (more verbose). Identifying by stable id avoids index-based bugs.",
      },
      illustration:
        "➖ deletePost — מחיקה immutable:\n\n" +
        "  posts = [a, b, c, d]\n" +
        "  remove id = b's id\n" +
        "  setPosts(posts.filter(p => p.id !== b.id))\n" +
        "                ↓\n" +
        "             [a, c, d]  ← מערך חדש",
      codeExample:
        "function Blog() {\n" +
        "  const [posts, setPosts] = useState([\n" +
        "    { id: 1, text: 'A' },\n" +
        "    { id: 2, text: 'B' },\n" +
        "  ]);\n" +
        "  const deletePost = (id) =>\n" +
        "    setPosts(prev => prev.filter(p => p.id !== id));\n" +
        "  return posts.map(p =>\n" +
        "    <div key={p.id}>\n" +
        "      {p.text}\n" +
        "      <button onClick={() => deletePost(p.id)}>🗑️</button>\n" +
        "    </div>\n" +
        "  );\n" +
        "}",
      codeExplanation:
        "deletePost מקבל id ומסנן את כל הפוסטים שלא תואמים. filter מחזיר מערך חדש — ה-state מתעדכן עם הפניה חדשה ו-React מתרענן.",
      extras: {
        moreExamples: [
          {
            code:
              "// מחיקה לפי אינדקס\n" +
              "const deleteByIndex = (idx) =>\n" +
              "  setPosts(prev => prev.filter((_, i) => i !== idx));",
            explanation:
              "כשאין id יציב, אפשר לסנן לפי אינדקס. אבל עדיף תמיד id יציב.",
          },
          {
            code:
              "// מחיקת כל הפוסטים שעומדים בתנאי\n" +
              "const deleteAllUnpublished = () =>\n" +
              "  setPosts(prev => prev.filter(p => p.published));",
            explanation:
              "filter מאפשר מחיקת מספר פריטים בו-זמנית. כל פריט שתנאי החזיר false — נמחק.",
          },
        ],
        pitfalls: [
          {
            mistake: "posts.splice(index, 1); setPosts(posts)",
            why: "splice משנה את posts במקום. אותה הפניה.",
            fix: "setPosts(posts.filter((_, i) => i !== index))",
          },
          {
            mistake: "מחיקה לפי אינדקס בעוד הרשימה משתנה",
            why: "אם יש מחיקות מרובות במהירות, האינדקסים זזים.",
            fix: "השתמשו ב-id יציב (לא אינדקס) למחיקה.",
          },
        ],
        practiceQuestions: [
          {
            question:
              "איך מוחקים פוסט לפי id במערך posts?",
            answer:
              "setPosts(prev => prev.filter(p => p.id !== idToDelete))",
          },
        ],
      },
    },
  ],

  // Lesson-level quiz (legacy field, kept for compatibility but rewritten with real content)
  quiz: [
    {
      question:
        "מה יודפס?\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const handleClick = () => {\n    setCount(count + 1);\n    setCount(count + 1);\n  };\n  return <button onClick={handleClick}>{count}</button>;\n}\n\n(לחיצה אחת)",
      options: ["0", "1", "2", "שגיאה"],
      correct: 1,
      explanation:
        "שתי הקריאות ל-setCount(count + 1) משתמשות באותו snapshot של count (0). שתיהן מבקשות 'תקבע ל-1' — וה-count הופך ל-1, לא 2. כדי לקבל 2: setCount(c => c + 1).",
    },
    {
      question:
        "איזה משפט נכון לגבי useState?",
      options: [
        "useState יכול להיקרא בתוך if או לולאה לפי הצורך",
        "useState חייב להיקרא ברמה העליונה של הקומפוננטה, באותו סדר בכל רינדור",
        "useState מעדכן את ה-state מיד באותה פונקציה",
        "useState עובד רק עם primitives (לא אובייקטים או מערכים)",
      ],
      correct: 1,
      explanation:
        "Hooks מזוהים לפי סדר הקריאה. תנאי או לולאה ישנו את הסדר ויקרסו את React. עדכון מתבצע ברינדור הבא, וניתן לאחסן כל ערך JS.",
    },
    {
      question:
        "מה הבעיה ב-: const addItem = () => { items.push(x); setItems(items); }?",
      options: [
        "items הוא const ולא ניתן לשנות",
        "push משנה את items במקום, ולכן ההפניה לא משתנה ו-React לא מתרענן",
        "setItems לא קיים",
        "אין בעיה",
      ],
      correct: 1,
      explanation:
        "push משנה את המערך במקום. setItems מקבל את אותה הפניה ו-Object.is מחזיר true → React מדלג על re-render. הפתרון: setItems([...items, x]).",
    },
    {
      question:
        "מה ההבדל בין controlled לבין uncontrolled input?",
      options: [
        "controlled מהיר יותר",
        "controlled = value מ-state + onChange מעדכן; uncontrolled = ה-DOM מנהל את הערך עם ref",
        "controlled עובד רק עם textarea",
        "uncontrolled לא קיים יותר ב-React",
      ],
      correct: 1,
      explanation:
        "Controlled: React שולט בערך דרך value+onChange. Uncontrolled: ה-DOM שומר ובמקרה הצורך גישה דרך ref. Controlled נחשב הסטנדרט המומלץ.",
    },
    {
      question:
        "איך מעדכנים את user.age ל-31 כש-user הוא {name:'Tal', age:30} ב-state?",
      options: [
        "user.age = 31; setUser(user)",
        "setUser({age: 31})",
        "setUser({...user, age: 31})",
        "setUser(user.age = 31)",
      ],
      correct: 2,
      explanation:
        "אופציה 1: mutation — אותה הפניה. אופציה 2: מוחק את name. אופציה 3 נכונה: spread מעתיק את כל השדות, ואז age מתעדכן. אופציה 4: שגיאת syntax.",
    },
    {
      question:
        "באיזה Hook משתמשים כדי שילד עטוף ב-React.memo לא יתרענן בכל פעם שהאב מתרענן?",
      options: [
        "useMemo על הילד",
        "useCallback על פונקציות שמעבירים כ-props",
        "useState על האב",
        "useRef על הילד",
      ],
      correct: 1,
      explanation:
        "React.memo משווה props רדודות. אם מעבירים פונקציה inline, היא יוצרת הפניה חדשה בכל רינדור. useCallback מייצב את ההפניה — Memo רואה 'אותה פונקציה' ולא מתרענן.",
    },
  ],
};
