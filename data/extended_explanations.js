// data/extended_explanations.js
//
// העשרה מורחבת למושגים בשיעורים 21–27.
// מתמזג ב-runtime לתוך כל מושג שמופיע במפתח התואם (ראו content-loader.js).
//
// מבנה כל ערך:
//   "lesson_X::ConceptName": {
//     extendedTab: {
//       simpleGrandma:     "דימוי פשוט לסבתא",
//       simpleExplanation: "הסבר פשוט וברור",
//       thinkingMethod:    [ "1. ...", "2. ...", ... ],
//       purpose:           "מה המטרה",
//       codeSnippets:      [ { title, code, explanation } ],
//       codeBreakdowns:    [ { code, parts: [{piece, role}], summary } ]
//     }
//   }
//
// אותו מבנה מפתח כמו ב-concept_enrichment.js: `${lesson.id}::${conceptName}`.

var EXTENDED_EXPLANATIONS = {

  // ============================================================================
  // Lesson 22 — useState, Immutable State (18 concepts)
  // ============================================================================

  "lesson_22::Hook": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Hook זה כמו תקע שמכניסים למקרר כדי שיקבל חשמל. הקומפוננטה מכניסה Hook ומקבלת ממנו יכולת — זיכרון, חיבור לרשת, או תזמון. בלי Hook, הקומפוננטה מבודדת.",
      simpleExplanation:
        "Hook הוא פונקציה מיוחדת ב-React שמתחילה תמיד במילה use (useState, useEffect, useRef). היא נותנת לקומפוננטה פונקציונלית יכולות שפעם היו זמינות רק ל-class components: זיכרון, תופעות לוואי, גישה ל-DOM. כל Hook חייב להיקרא בראש הקומפוננטה ובאותו סדר בכל רינדור.",
      thinkingMethod: [
        "1. איזה יכולת חסרה לי? (זיכרון, גישה ל-DOM, חיבור לקונטקסט?)",
        "2. איזה Hook נותן לי את היכולת הזאת?",
        "3. האם אני קורא לו ברמה העליונה של הקומפוננטה? (לא בתוך if/לולאה!)",
        "4. האם הסדר של ה-Hooks זהה בכל רינדור?",
        "5. אם זה Hook משלי — האם השם מתחיל ב-use?",
      ],
      purpose:
        "המטרה היא לאפשר לקומפוננטות פונקציונליות להחזיק מצב, לבצע פעולות לוואי, ולהשתמש ביכולות React מתקדמות — בלי class, בלי this, ובלי קוד מסובך.",
      codeSnippets: [
        {
          title: "שימוש בסיסי ב-Hooks",
          code: "function Counter() {\n  const [count, setCount] = useState(0);  // Hook #1\n  useEffect(() => { document.title = `${count} clicks`; }, [count]);  // Hook #2\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
          explanation:
            "שני Hooks נקראים בראש הקומפוננטה, באותו סדר בכל רינדור. React זוכר אותם לפי האינדקס שלהם.",
        },
        {
          title: "חוק שאסור לשבור — Hook בתוך תנאי",
          code: "// ❌ אסור!\nfunction Bad({ show }) {\n  if (show) {\n    const [x, setX] = useState(0); // Hook לא תמיד נקרא — שגיאה!\n  }\n  return null;\n}",
          explanation:
            "אם Hook נקרא בתנאי, הסדר משתנה בין רינדורים ו-React מאבד מעקב. תמיד בראש הפונקציה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const [count, setCount] = useState(0);",
          parts: [
            { piece: "useState", role: "ה-Hook עצמו — פונקציה של React שמספקת זיכרון לקומפוננטה." },
            { piece: "(0)", role: "הערך ההתחלתי שיוכנס ל-state בפעם הראשונה שהקומפוננטה נטענת." },
            { piece: "[count, setCount]", role: "פירוק (destructuring) של הזוג שמחזיר ה-Hook לשני משתנים נפרדים." },
            { piece: "const", role: "מצהיר על משתנה קבוע שלא ייעשה לו reassign." },
          ],
          summary: "זוהי קריאה ל-Hook שמחזירה זוג: ערך נוכחי + פונקציית עדכון.",
        },
      ],
    },
  },

  "lesson_22::useState": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useState זה כמו פתק על המקרר עם מספר. את כותבת מספר, מציצה מתי שצריך, ואם משהו השתנה — מוחקת ורושמת מחדש. הפתק זוכר עבורך גם אחרי שיצאת מהמטבח.",
      simpleExplanation:
        "useState הוא Hook של React. תפקידו לתת לקומפוננטה זיכרון פרטי שנשמר בין רינדורים. הוא מקבל ערך התחלתי, ומחזיר זוג: הערך הנוכחי + פונקציה לעדכון. כל קריאה לפונקציית העדכון גורמת ל-React לרנדר את הקומפוננטה מחדש עם הערך החדש.",
      thinkingMethod: [
        "1. מה הערך שאני רוצה לזכור? (מספר? טקסט? מערך? אובייקט?)",
        "2. מה הערך ההתחלתי? (מה יוצג ברינדור הראשון?)",
        "3. מתי הוא משתנה? (לחיצה? קלט? תשובת שרת?)",
        "4. איך אקרא לסטר? (setCount, setName, setUser)",
        "5. האם הוא בראש הקומפוננטה? (לא בתוך if/לולאה!)",
      ],
      purpose:
        "המטרה היא לאפשר לקומפוננטה פונקציונלית לשמור מצב בין רינדורים, ולגרום ל-UI להתעדכן אוטומטית כשהמצב משתנה — בלי class, בלי this, ובלי לעדכן ידנית את ה-DOM.",
      codeSnippets: [
        {
          title: "מונה בסיסי",
          code: "const [count, setCount] = useState(0);\nsetCount(count + 1);",
          explanation: "מצהירים state עם 0. כל setCount מקפיץ את המונה ב-1 וגורם לרינדור.",
        },
        {
          title: "עדכון אובייקט (חובה spread!)",
          code: "const [user, setUser] = useState({ name: '', age: 0 });\nsetUser({ ...user, name: 'דני' });",
          explanation:
            "ב-state אובייקט חייבים spread של השדות הקיימים, אחרת age ימחק.",
        },
        {
          title: "עדכון לפי ערך קודם",
          code: "setCount(prev => prev + 1);",
          explanation: "כשהעדכון תלוי בערך הקודם, עדיף להעביר פונקציה — תקבל את הערך הכי עדכני.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const [array, setArray] = useState([1, 2, 3]);",
          parts: [
            { piece: "const", role: "מילה שמורה — מצהירה על משתנה קבוע. ה-binding לשם array תמיד יצביע אל הערך העדכני שמנהל React." },
            { piece: "[array, setArray]", role: "Array Destructuring — פירוק המערך שמחזיר useState לשני משתנים. הראשון = ערך, השני = פונקציית עדכון." },
            { piece: "array", role: "ערך ה-state הנוכחי. מותר לקרוא, אסור לשנות ישירות (push/pop)." },
            { piece: "setArray", role: "פונקציית העדכון. כל קריאה גורמת ל-React לרנדר מחדש." },
            { piece: "useState", role: "ה-Hook עצמו — מספק זיכרון לקומפוננטה." },
            { piece: "[1, 2, 3]", role: "הערך ההתחלתי. נכנס ל-state רק ברינדור הראשון." },
          ],
          summary: "ההוק useState מחזיר את ערך ה-state הנוכחי (array) ופונקציה ייעודית לעדכון שלו (setArray).",
        },
      ],
    },
  },

  "lesson_22::state": {
    extendedTab: {
      simpleGrandma:
        "סבתא, state זה הזיכרון של הקומפוננטה. כמו שאת זוכרת מה את אוכלת, הקומפוננטה זוכרת בעזרת state כמה פעמים לחצו על כפתור או מה כתבו בטופס.",
      simpleExplanation:
        "state הוא מצב פנימי של קומפוננטה — נתונים שמשתנים לאורך הזמן, וכשהם משתנים, ה-UI מתעדכן אוטומטית. ב-React הוא נשמר באמצעות useState. בכל פעם ש-state משתנה, הקומפוננטה מרונדרת מחדש עם הערכים החדשים.",
      thinkingMethod: [
        "1. מה משתנה לאורך זמן בקומפוננטה? (זה ה-state)",
        "2. מה ערך ברירת המחדל?",
        "3. מי משנה אותו? (אירוע משתמש? תזמון? תשובה משרת?)",
        "4. האם הוא צריך להיות גלובלי (Context) או מקומי (useState)?",
        "5. האם אני משנה אותו immutable (יוצר חדש) או mutable (משנה קיים)?",
      ],
      purpose: "המטרה היא לתת לקומפוננטות זיכרון דינמי שמבטיח עדכון אוטומטי של ה-UI כשהנתונים משתנים.",
      codeSnippets: [
        {
          title: "state פשוט",
          code: "const [open, setOpen] = useState(false);",
          explanation: "state בוליאני — האם המודל פתוח או סגור.",
        },
        {
          title: "state מורכב",
          code: "const [form, setForm] = useState({ name: '', email: '', age: 0 });",
          explanation: "state אובייקט עם כמה שדות — מתאים לטפסים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const [open, setOpen] = useState(false);",
          parts: [
            { piece: "open", role: "ה-state עצמו — בוליאני (true/false)." },
            { piece: "setOpen", role: "הפונקציה שמשנה את ה-state." },
            { piece: "useState(false)", role: "מאתחל את ה-state לערך false." },
          ],
          summary: "state בוליאני בסיסי, נפוץ במודאלים, אקורדיונים, ותפריטים.",
        },
      ],
    },
  },

  "lesson_22::setState": {
    extendedTab: {
      simpleGrandma:
        "סבתא, setState זה כמו לקרוא לבן והוא מעדכן את הפתק על המקרר. זה לא עושה את השינוי לבד — זה מבקש מ-React לשנות, ו-React גם מודיע על השינוי לכל מי שצריך.",
      simpleExplanation:
        "setState (או הסטר שמחזיר useState) היא הדרך היחידה לעדכן state ב-React. אסור לשנות state ישירות. כל קריאה אומרת ל-React 'תחליף את הערך הזה בזה החדש' ובעקבות זאת React מרנדר את הקומפוננטה מחדש.",
      thinkingMethod: [
        "1. מהו הערך החדש שאני רוצה?",
        "2. האם הוא מבוסס על הערך הקודם? אם כן — השתמש ב-functional update: setX(prev => ...)",
        "3. אם זה אובייקט/מערך — האם אני יוצר עותק חדש (spread) ולא משנה את הקיים?",
        "4. האם הקריאה היא בתוך handler (לא במהלך הרינדור עצמו)?",
        "5. אם אני קורא כמה פעמים ברצף — האם יש לי בעיית סטייל באצ'ינג?",
      ],
      purpose:
        "המטרה היא לתאם בין שינוי הנתונים לבין רינדור מחדש. בלי setState, React לא ידע שהמצב השתנה ולא יעדכן את ה-UI.",
      codeSnippets: [
        {
          title: "עדכון פשוט",
          code: "setCount(5);",
          explanation: "מציב 5 בערך ה-state. בעקבות זאת רינדור מחדש.",
        },
        {
          title: "Functional update",
          code: "setCount(prev => prev + 1);\nsetCount(prev => prev + 1);  // שני העדכונים יתבצעו",
          explanation: "כששתי קריאות רצופות — חובה functional כדי שלא יבטלו זו את זו.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setUser({ ...user, name: 'דני' });",
          parts: [
            { piece: "setUser", role: "פונקציית העדכון של ה-state." },
            { piece: "{ ... }", role: "אובייקט חדש (יוצרים העתק, לא משנים את הקיים)." },
            { piece: "...user", role: "Spread Operator — מעתיק את כל השדות הקיימים." },
            { piece: "name: 'דני'", role: "דורס את השדה name (אחרי השדות שפוזרו, ולכן מנצח)." },
          ],
          summary: "יוצרים אובייקט חדש שדומה לישן, חוץ מהשדה שמתעדכן.",
        },
      ],
    },
  },

  "lesson_22::re-render": {
    extendedTab: {
      simpleGrandma:
        "סבתא, re-render זה כמו לצייר מחדש דף שלם אחרי שמשהו השתנה. כל פעם שהמספר על הפתק משתנה — מציירים מחדש את הדף עם המספר החדש.",
      simpleExplanation:
        "re-render הוא תהליך שבו React מריץ שוב את הפונקציה של הקומפוננטה כדי לבנות תיאור חדש של ה-UI. זה קורה כש-state משתנה, props משתנים, או שהאב מרונדר מחדש. אחרי הרנדור, React משווה (diff) ומחיל רק את השינויים האמיתיים על ה-DOM.",
      thinkingMethod: [
        "1. למה הקומפוננטה מרונדרת? (state? props? parent?)",
        "2. האם הרינדור מיותר? (אותם props ערכים, אך אובייקטים חדשים)",
        "3. האם אני יכול להימנע ממנו עם React.memo / useMemo / useCallback?",
        "4. האם המקור הוא setState בתוך useEffect? (סכנת לולאה אינסופית!)",
        "5. כמה רינדורים נדרשים בעצם? (אפשר לבדוק עם Profiler)",
      ],
      purpose:
        "המטרה היא להבטיח שה-UI תמיד משקף את הנתונים הנוכחיים, באופן הצהרתי וללא ניהול ידני של DOM.",
      codeSnippets: [
        {
          title: "רינדור מחדש בעקבות state",
          code: "const [count, setCount] = useState(0);\nsetCount(count + 1); // גורם ל-re-render",
          explanation: "כל setCount מפעיל re-render אם הערך החדש שונה מהקודם.",
        },
        {
          title: "מניעת re-render עם memo",
          code: "const Child = React.memo(({ name }) => <div>{name}</div>);",
          explanation: "Child לא יעשה re-render אם הפרופ name לא השתנה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
          parts: [
            { piece: "function Counter()", role: "הפונקציה הזאת תרוץ שוב בכל re-render." },
            { piece: "useState(0)", role: "בכל re-render React מחזיר את הערך העדכני, לא 0." },
            { piece: "onClick={...}", role: "כשנלחץ, setCount קורא ל-React לעשות re-render עם count+1." },
            { piece: "{count}", role: "בכל re-render הוא יציג את הערך העדכני של count." },
          ],
          summary: "כל לחיצה גורמת ל-re-render: הפונקציה רצה שוב, useState מחזיר את הערך החדש, ה-JSX נבנה מחדש.",
        },
      ],
    },
  },

  "lesson_22::mutable": {
    extendedTab: {
      simpleGrandma:
        "סבתא, mutable זה משהו שאפשר לשנות ישירות — כמו דף שאפשר למחוק ולכתוב עליו מחדש. ב-React הסכנה היא שאם משנים ככה את ה-state, React לא שם לב לשינוי.",
      simpleExplanation:
        "mutable = ניתן לשינוי ישירות. אובייקטים ומערכים ב-JavaScript הם mutable מטבעם — אפשר לעשות arr.push(x) או obj.name = 'X'. ב-React זאת בעיה: אם נשנה state ישירות, React לא ידע שהוא השתנה כי ההשוואה שלו (Object.is) רואה את אותה הפניה ולא יבצע re-render.",
      thinkingMethod: [
        "1. האם הקוד שלי משנה state ישירות?",
        "2. אם כן — האם React רואה את השינוי? (כנראה שלא!)",
        "3. האם אני יכול להחליף ב-spread/concat/filter שיוצרים עותק חדש?",
        "4. האם השתמשתי ב-immer או structuredClone כשהאובייקט מקונן?",
        "5. האם הצוות מכיר את החוק 'never mutate state'?",
      ],
      purpose:
        "מבחינים בין mutable ל-immutable כדי להבטיח ש-React יזהה שינויים ויבצע re-render רק כשצריך.",
      codeSnippets: [
        {
          title: "אסור — שינוי mutable",
          code: "// ❌\nconst [arr, setArr] = useState([1,2,3]);\narr.push(4);  // לא יגרום ל-re-render!\nsetArr(arr);",
          explanation: "push משנה את אותו מערך. React רואה אותו אובייקט ולא מרנדר.",
        },
        {
          title: "מותר — יצירת עותק חדש",
          code: "setArr([...arr, 4]);",
          explanation: "spread יוצר מערך חדש. React רואה אובייקט חדש ומבצע re-render.",
        },
      ],
      codeBreakdowns: [
        {
          code: "user.name = 'דני';  // ❌ mutation",
          parts: [
            { piece: "user", role: "אובייקט קיים — אם זה state, אסור לשנות אותו ישירות." },
            { piece: ".name", role: "גישה לשדה — בצד שמאל של =, זה השמה ישירה." },
            { piece: "= 'דני'", role: "מציב ערך חדש לשדה — זה שינוי mutable!" },
          ],
          summary: "השמה ישירה לשדה של אובייקט = mutation. ב-React משתמשים בעותק חדש במקום.",
        },
      ],
    },
  },

  "lesson_22::immutable": {
    extendedTab: {
      simpleGrandma:
        "סבתא, immutable זה כמו ספר שלא נוגעים בו. אם רוצים גרסה חדשה — מצלמים את הספר ומשנים את הצילום. הספר המקורי נשאר בדיוק כמו שהיה.",
      simpleExplanation:
        "immutable = לא ניתן לשינוי. הגישה הזאת אומרת שבמקום לשנות אובייקט קיים, יוצרים עותק חדש עם השינויים. ב-React חובה לעבוד ככה עם state כדי ש-React יזהה את השינוי וירנדר מחדש. כלים: spread (...), map, filter, structuredClone.",
      thinkingMethod: [
        "1. האם אני יוצר עותק חדש או משנה את הקיים?",
        "2. אם זה אובייקט שטוח — spread מספיק",
        "3. אם הוא מקונן — שים לב לעומק (יכול להיות צורך לפזר גם את התת-אובייקט)",
        "4. אם זה מערך — map/filter/concat יוצרים חדש; push/sort/reverse משנים קיים",
        "5. האם React רואה את האובייקט החדש (Object.is מחזיר false)?",
      ],
      purpose:
        "הגישה הזאת נותנת ביצועים, יציבות, ויכולת מעקב — React יכול להשוות עם === ולדעת מיד אם משהו השתנה.",
      codeSnippets: [
        {
          title: "עדכון אובייקט שטוח",
          code: "setUser({ ...user, name: 'חדש' });",
          explanation: "spread יוצר אובייקט חדש עם כל השדות + name החדש.",
        },
        {
          title: "עדכון אובייקט מקונן",
          code: "setForm({ ...form, address: { ...form.address, city: 'תל אביב' } });",
          explanation: "חייבים לפזר גם את הרמה הפנימית, אחרת address יישאר באותה הפניה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const newArr = [...oldArr, 4];",
          parts: [
            { piece: "[", role: "פותח literal של מערך חדש." },
            { piece: "...oldArr", role: "Spread — מעתיק את כל הערכים מהמערך הישן." },
            { piece: ", 4", role: "מוסיף את הערך החדש בסוף." },
            { piece: "]", role: "סוגר את המערך החדש." },
          ],
          summary: "מערך חדש לחלוטין, עם תוכן הישן + ערך נוסף. הישן נשאר ללא שינוי.",
        },
      ],
    },
  },

  "lesson_22::reference": {
    extendedTab: {
      simpleGrandma:
        "סבתא, reference זה כמו כתובת של בית. שני אנשים יכולים להחזיק פתק עם אותה כתובת — שניהם מצביעים על אותו בית. אם אחד יצבע אותו, גם השני 'יראה' צבע חדש כשיגיע.",
      simpleExplanation:
        "ב-JavaScript, אובייקטים ומערכים מועברים by reference — לא מעתיקים את התוכן, אלא רק 'מצביע' למקום בזיכרון. שני משתנים יכולים להצביע לאותו אובייקט; שינוי דרך אחד נראה גם דרך השני. זה נקרא aliasing.",
      thinkingMethod: [
        "1. כשאני עושה a = b — האם הם מצביעים על אותו אובייקט?",
        "2. האם שינוי דרך a ישפיע על b? (כן, אם אובייקט)",
        "3. האם אני רוצה עותק או הפניה?",
        "4. אם עותק — spread / structuredClone / Array.from",
        "5. האם React משווה לפי הפניה (כן, עם Object.is)?",
      ],
      purpose:
        "מבינים reference כדי להימנע מבאגים שבהם שינוי במקום אחד 'דולף' למקום אחר, ולהבטיח עדכון נכון של state ב-React.",
      codeSnippets: [
        {
          title: "אותה הפניה",
          code: "const a = { x: 1 };\nconst b = a;\nb.x = 2;\nconsole.log(a.x); // 2!",
          explanation: "a ו-b מצביעים על אותו אובייקט. שינוי דרך b משפיע גם על a.",
        },
        {
          title: "הפניה חדשה",
          code: "const c = { ...a };\nc.x = 99;\nconsole.log(a.x); // 1 (לא השתנה)",
          explanation: "spread יוצר אובייקט חדש; שינוי בו לא נוגע ב-a.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const b = a;",
          parts: [
            { piece: "const", role: "מצהיר על משתנה קבוע." },
            { piece: "b", role: "המשתנה החדש." },
            { piece: "= a", role: "מקבל את ה-reference של a — לא עותק. b ו-a מצביעים על אותו אובייקט." },
          ],
          summary: "השמה של אובייקט = העתקת הפניה, לא עותק עמוק.",
        },
      ],
    },
  },

  "lesson_22::array reference": {
    extendedTab: {
      simpleGrandma:
        "סבתא, array reference זה כמו לחלוק רשימת קניות עם השכנה — שתיכן כותבות באותה רשימה. אם רוצות שתהיה לכל אחת רשימה משלה — צריך לצלם את הרשימה.",
      simpleExplanation:
        "מערך ב-JavaScript הוא אובייקט, ומועבר by reference. אם נציב let b = a (כשa הוא מערך), שניהם יצביעו לאותו מערך. הפעולות push, pop, sort, reverse משנות את המערך עצמו (mutable). map, filter, concat, spread יוצרות מערך חדש.",
      thinkingMethod: [
        "1. האם הפעולה משנה את המערך הקיים או יוצרת חדש?",
        "2. אם state — חובה ליצור מערך חדש (spread/map/filter)",
        "3. push/pop/sort/reverse — מסוכנים ב-state!",
        "4. map/filter/concat/[...] — בטוחים",
        "5. האם React יזהה שזה מערך חדש?",
      ],
      purpose:
        "מבינים array reference כדי לשנות state נכון ב-React, ולהימנע משינויים לא רצויים על מערכים שמשתמשים בהם בכמה מקומות.",
      codeSnippets: [
        {
          title: "אסור — sort על state",
          code: "// ❌\nposts.sort((a,b) => a.id - b.id);\nsetPosts(posts);",
          explanation: "sort משנה את המערך עצמו. React רואה אותה הפניה ולא ירנדר.",
        },
        {
          title: "מותר — sort על עותק",
          code: "setPosts([...posts].sort((a,b) => a.id - b.id));",
          explanation: "spread יוצר מערך חדש, ואז sort עליו לא משפיע על המקור.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const newArr = arr.filter(x => x !== removed);",
          parts: [
            { piece: "arr.filter", role: "filter יוצרת מערך חדש (לא משנה את arr)." },
            { piece: "x => x !== removed", role: "תנאי — שומר רק איברים שאינם removed." },
            { piece: "newArr", role: "המערך החדש; arr נשאר כפי שהיה." },
          ],
          summary: "filter בטוח לשימוש ב-state כי הוא לא משנה את המקור.",
        },
      ],
    },
  },

  "lesson_22::object reference": {
    extendedTab: {
      simpleGrandma:
        "סבתא, object reference זה כמו למסור מפתח לדירה. כל מי שיש לו מפתח יכול להיכנס ולשנות. אם רוצים שלכל אחד תהיה דירה משלו — צריך לבנות לו דירה חדשה.",
      simpleExplanation:
        "אובייקט ב-JavaScript מועבר by reference. שני משתנים יכולים להצביע לאותו אובייקט. גם שינוי בתוך אובייקט מקונן (obj.address.city = 'X') לא משנה את ההפניה החיצונית. ב-React חובה ליצור אובייקט חדש בכל עדכון state, גם אם שדה אחד בלבד השתנה.",
      thinkingMethod: [
        "1. האם אני משנה את האובייקט הקיים? (אם כן — בעיה)",
        "2. האם השינוי בעומק? (אם כן — צריך לפזר גם את הרמה הפנימית)",
        "3. האם React יזהה אובייקט חדש?",
        "4. האם אני שומר היסטוריה? (immutability עוזר ל-undo)",
        "5. האם כדאי להשתמש ב-immer לפישוט?",
      ],
      purpose:
        "מבינים object reference כדי לעדכן state בצורה ש-React יזהה, ולהימנע מ'דליפות' של שינויים בין קומפוננטות.",
      codeSnippets: [
        {
          title: "אסור — שינוי שדה ב-state",
          code: "// ❌\nuser.name = 'דני';\nsetUser(user);  // אותה הפניה — אין re-render",
          explanation: "אותו אובייקט. React לא מבחין בשינוי.",
        },
        {
          title: "מותר — אובייקט חדש",
          code: "setUser({ ...user, name: 'דני' });",
          explanation: "אובייקט חדש עם name מעודכן.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setForm({ ...form, address: { ...form.address, city: 'TLV' } });",
          parts: [
            { piece: "{ ...form }", role: "אובייקט חיצוני חדש." },
            { piece: "address: ...", role: "דורס את שדה address (אחרי הפיזור)." },
            { piece: "{ ...form.address, city: 'TLV' }", role: "אובייקט פנימי חדש — חובה כדי שהשינוי ייקלט." },
          ],
          summary: "ב-state מקונן חייבים לפזר כל רמה שמשתנה, אחרת React רואה אותה הפניה.",
        },
      ],
    },
  },

  "lesson_22::onChange": {
    extendedTab: {
      simpleGrandma:
        "סבתא, onChange זה כמו פעמון שמצלצל בכל פעם שמישהו רושם משהו בטופס. בכל אות שכותבים — הפעמון מתקשר ואומרים לך 'זה מה שכתבו עד עכשיו'.",
      simpleExplanation:
        "onChange הוא event handler ב-React שמופעל בכל פעם שערך של קלט (input/textarea/select) משתנה. הוא מקבל אובייקט event, ולרוב משתמשים ב-event.target.value כדי לקרוא את הערך החדש ולעדכן state.",
      thinkingMethod: [
        "1. איזה קלט מאזין? (input, textarea, select)",
        "2. מה אני רוצה לעשות עם הערך החדש? (לעדכן state)",
        "3. איפה ה-state? (useState למעלה)",
        "4. האם הקלט controlled? (value + onChange)",
        "5. האם אני צריך לסנן/לאמת את הקלט?",
      ],
      purpose:
        "המטרה היא לחבר את הקלט של המשתמש ל-state של הקומפוננטה — בכל הקלדה, ה-state מתעדכן, ובכל עדכון state, ה-input מציג את הערך החדש.",
      codeSnippets: [
        {
          title: "input פשוט",
          code: "const [name, setName] = useState('');\n<input value={name} onChange={e => setName(e.target.value)} />",
          explanation: "value מסונכרן מ-state. כל הקלדה מעדכנת state, מה שמעדכן את ה-value.",
        },
        {
          title: "select",
          code: "<select value={color} onChange={e => setColor(e.target.value)}>\n  <option>אדום</option>\n  <option>כחול</option>\n</select>",
          explanation: "select עובד אותו דבר — value + onChange.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<input value={name} onChange={e => setName(e.target.value)} />",
          parts: [
            { piece: "value={name}", role: "ה-input מציג את הערך מ-state — הופך אותו ל-controlled." },
            { piece: "onChange=", role: "מאזין לאירוע change בכל הקלדה." },
            { piece: "e", role: "אובייקט event הסינתטי של React." },
            { piece: "e.target", role: "האלמנט שגרם לאירוע — ה-input עצמו." },
            { piece: "e.target.value", role: "הערך החדש שהמשתמש הקליד." },
            { piece: "setName(...)", role: "מעדכן את ה-state עם הערך החדש." },
          ],
          summary: "input controlled: value מ-state, ושינוי דרך onChange שמעדכן state.",
        },
      ],
    },
  },

  "lesson_22::controlled input": {
    extendedTab: {
      simpleGrandma:
        "סבתא, controlled input זה כמו שלט רחוק. הטקסט שמופיע במסך נשלט מהשלט (ה-state) — לא מקלדת ישירה. בכל לחיצה על מקש בשלט, הטקסט במסך מתעדכן.",
      simpleExplanation:
        "controlled input הוא שדה קלט שהערך שלו (value) מגיע ב-100% מ-React state, והעדכון נעשה דרך onChange שקורא ל-setState. אם לא תכתוב onChange, הקלט יראה 'תקוע' — כי React כל הזמן מחזיר אותו לערך מ-state.",
      thinkingMethod: [
        "1. האם יש לי useState ל-state של הקלט?",
        "2. האם value שלו מגיע מה-state?",
        "3. האם יש onChange שמעדכן את ה-state?",
        "4. האם אני יכול לתפעל את הערך לפני העדכון? (uppercase, סינון)",
        "5. האם אני צריך uncontrolled (defaultValue + ref) במקום? (כמעט אף פעם)",
      ],
      purpose:
        "המטרה היא ל-React להיות 'מקור האמת היחיד' של ערך הקלט — מה שמאפשר ולידציה, פורמט, ו-undo בקלות.",
      codeSnippets: [
        {
          title: "controlled עם ולידציה",
          code: "const [age, setAge] = useState('');\n<input value={age} onChange={e => {\n  const v = e.target.value;\n  if (/^\\d*$/.test(v)) setAge(v);  // רק ספרות\n}} />",
          explanation: "מסננים בכל הקלדה — רק ספרות נכנסות.",
        },
        {
          title: "uncontrolled (לא מומלץ ברוב המקרים)",
          code: "<input defaultValue='hello' ref={inputRef} />",
          explanation: "ה-DOM מנהל את הערך, לא React. שימוש: טפסים פשוטים מאוד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<input value={query} onChange={e => setQuery(e.target.value)} placeholder='חיפוש' />",
          parts: [
            { piece: "value={query}", role: "מקור האמת — תמיד שווה ל-state query." },
            { piece: "onChange=", role: "מעדכן state בכל הקלדה." },
            { piece: "placeholder", role: "טקסט שמופיע כשהשדה ריק (לא ערך)." },
          ],
          summary: "input controlled = state בלבד שולט בערך הקלט.",
        },
      ],
    },
  },

  "lesson_22::props": {
    extendedTab: {
      simpleGrandma:
        "סבתא, props זה כמו לתת לבן רשימת קניות. את לא קונה — את מבקשת ממנו. props זה הדרך לתת לקומפוננטה משימה, נתונים, או הודעה.",
      simpleExplanation:
        "props (קיצור של properties) הם הדרך להעביר נתונים מקומפוננטה אב לקומפוננטה בן. הם מגיעים כאובייקט בארגומנט הראשון של הקומפוננטה. props הם read-only — אסור לבן לשנות אותם.",
      thinkingMethod: [
        "1. איזה נתונים האב צריך לתת לבן?",
        "2. האם הם פשוטים (string/number) או מורכבים (אובייקט/פונקציה)?",
        "3. איך אני קורא להם בקומפוננטה? (destructuring בארגומנטים)",
        "4. האם הם חובה או אופציונליים? (defaultValue?)",
        "5. אם זאת פונקציה — מה השם שלה? (onSomething, handleSomething)",
      ],
      purpose:
        "המטרה היא ליצור הפרדה בין קומפוננטות וזרימת מידע ברורה: האב נותן, הבן מקבל ומציג. תזרים מידע חד-כיווני.",
      codeSnippets: [
        {
          title: "העברת props",
          code: "// אב\n<UserCard name='דני' age={30} />\n\n// בן\nfunction UserCard({ name, age }) {\n  return <div>{name}, {age}</div>;\n}",
          explanation: "האב שולח name ו-age. הבן מקבל אותם דרך destructuring.",
        },
        {
          title: "פונקציה כ-prop",
          code: "<Button onClick={() => alert('!')} label='לחץ' />",
          explanation: "מעבירים פונקציה כדי שהבן יקרא לה כשמשהו קורה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Card({ title, children }) {\n  return <div><h2>{title}</h2>{children}</div>;\n}",
          parts: [
            { piece: "{ title, children }", role: "Destructuring של ה-props — שולפים שני שדות." },
            { piece: "title", role: "prop רגיל שמועבר מהאב." },
            { piece: "children", role: "prop מיוחד — מה שיש בין הפתיחה לסגירה של הקומפוננטה." },
            { piece: "{title}", role: "JSX — מציג את הערך כטקסט." },
          ],
          summary: "Card מקבל title ו-children, ומציג אותם בתוך div עם כותרת.",
        },
      ],
    },
  },

  "lesson_22::parent component": {
    extendedTab: {
      simpleGrandma:
        "סבתא, parent component זה כמו אמא שיש לה ילדים — היא נותנת להם הוראות (props), והם מבצעים. אם הילדים רוצים משהו — הם מבקשים מאמא דרך פונקציה שהיא נתנה להם.",
      simpleExplanation:
        "parent component (קומפוננטת אב) היא קומפוננטה שמכילה קומפוננטות אחרות (ילדים). היא מעבירה להם נתונים דרך props ויכולה לשלוט בהם. ב-React הזרימה היא 'מלמעלה למטה' — מהאב לבן.",
      thinkingMethod: [
        "1. מה האב שולח לילדים? (data, פונקציות, רכיבי JSX)",
        "2. האם state שייך לאב או לבן? (לאב, אם כמה ילדים צריכים אותו)",
        "3. איך הילד מודיע לאב על שינוי? (פונקציה כ-prop)",
        "4. האם להרים state למעלה (lift state up)?",
        "5. האם זה הופך ל-prop drilling? (אם כן — Context)",
      ],
      purpose:
        "המטרה היא לארגן את האפליקציה כעץ של קומפוננטות עם זרימת נתונים ברורה ומכוונת.",
      codeSnippets: [
        {
          title: "אב עם state ובנים",
          code: "function App() {\n  const [tasks, setTasks] = useState([]);\n  return (\n    <>\n      <AddTask onAdd={t => setTasks([...tasks, t])} />\n      <TaskList items={tasks} />\n    </>\n  );\n}",
          explanation: "App הוא האב. AddTask ו-TaskList בנים. State ב-App.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<AddTask onAdd={t => setTasks([...tasks, t])} />",
          parts: [
            { piece: "<AddTask />", role: "קומפוננטת בן." },
            { piece: "onAdd=", role: "prop פונקציה — האב נותן לבן את היכולת לעדכן state של האב." },
            { piece: "t => setTasks(...)", role: "פונקציה שתרוץ כשהבן יקרא ל-onAdd עם משימה חדשה." },
          ],
          summary: "האב נותן לבן 'דרך לדבר חזרה' באמצעות פונקציה שמועברת כ-prop.",
        },
      ],
    },
  },

  "lesson_22::child component": {
    extendedTab: {
      simpleGrandma:
        "סבתא, child component זה כמו ילד שהאמא נתנה לו רשימת קניות. הוא הולך לסופר עם הרשימה (props), קונה (מציג), ומחזיר את הקניות (קורא לפונקציה של אמא).",
      simpleExplanation:
        "child component (קומפוננטת בן) היא קומפוננטה שמשובצת בתוך אחרת. היא מקבלת מהאב נתונים דרך props, מציגה אותם, ויכולה להפעיל פונקציות שהאב נתן לה כדי 'לדבר חזרה'.",
      thinkingMethod: [
        "1. איזה props אני מקבל מהאב?",
        "2. האם אני צריך state פנימי או רק להציג?",
        "3. אם צריך לעדכן את האב — האם יש לי פונקציית callback מהאב?",
        "4. האם הקומפוננטה reusable? (לא תלויה ביישום ספציפי)",
        "5. האם אני יכול להוסיף PropTypes/TypeScript?",
      ],
      purpose:
        "המטרה היא להפריד אחריות — הבן יודע רק להציג ולתקשר עם האב, ולא 'יודע' מאיפה הנתונים באים או לאן הם הולכים.",
      codeSnippets: [
        {
          title: "בן פשוט",
          code: "function TaskList({ items }) {\n  return <ul>{items.map(t => <li key={t.id}>{t.text}</li>)}</ul>;\n}",
          explanation: "מקבל items כ-prop, ממפה לרשימה. אין state פנימי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function TaskList({ items, onDelete }) { ... }",
          parts: [
            { piece: "{ items, onDelete }", role: "מקבל שני props מהאב — מערך משימות ופונקציה למחיקה." },
            { piece: "items", role: "data שמגיע מהאב — לקריאה בלבד." },
            { piece: "onDelete", role: "callback — הבן יקרא לזה כשרוצה למחוק (האב יחליט מה לעשות)." },
          ],
          summary: "הבן קולט נתונים ופונקציות מהאב, ולא מנהל state בעצמו.",
        },
      ],
    },
  },

  "lesson_22::passing function as prop": {
    extendedTab: {
      simpleGrandma:
        "סבתא, זה כמו לתת לבן את מספר הטלפון שלך כדי שיתקשר אלייך כשמשהו יקרה. הוא עושה את העבודה (לוחץ על כפתור), ואז מתקשר אלייך (קורא לפונקציה).",
      simpleExplanation:
        "ב-React, מעבירים פונקציות כ-props כדי לאפשר לקומפוננטת בן 'לדבר חזרה' לאב. הבן לא יודע מה הפונקציה עושה — הוא רק קורא לה כשצריך. זה הדפוס המרכזי לאינטראקטיביות בעץ קומפוננטות.",
      thinkingMethod: [
        "1. מה הבן צריך 'להודיע' לאב? (לחיצה, מחיקה, שינוי)",
        "2. אילו פרמטרים הפונקציה תקבל?",
        "3. איך אקרא ל-prop? (onSomething — convention)",
        "4. האם הפונקציה צריכה useCallback (אם הבן ב-React.memo)?",
        "5. האם זה עדיף על setState ישיר ב-context?",
      ],
      purpose:
        "המטרה היא ליצור תקשורת bottom-up — בן ↦ אב — בעולם שבו props זורמים top-down.",
      codeSnippets: [
        {
          title: "callback פשוט",
          code: "// אב\n<Button onClick={() => alert('clicked')} />\n\n// בן\nfunction Button({ onClick }) {\n  return <button onClick={onClick}>לחץ</button>;\n}",
          explanation: "האב נותן פונקציה. הבן קורא לה כשנלחץ הכפתור.",
        },
        {
          title: "callback עם פרמטר",
          code: "<TaskItem task={t} onDelete={(id) => removeTask(id)} />",
          explanation: "הבן יקרא ל-onDelete(t.id) כשהמשתמש לוחץ למחוק.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<TaskItem onDelete={() => deleteTask(task.id)} />",
          parts: [
            { piece: "onDelete=", role: "שם ה-prop. ה-on הוא convention לפונקציות." },
            { piece: "() =>", role: "Arrow function — הפונקציה שתועבר." },
            { piece: "deleteTask(task.id)", role: "מה הפונקציה תעשה כשהבן יקרא לה." },
          ],
          summary: "האב יוצר פונקציה שלוכדת את task.id, והבן קורא לה ללא ארגומנטים.",
        },
      ],
    },
  },

  "lesson_22::addPost": {
    extendedTab: {
      simpleGrandma:
        "סבתא, addPost זה פעולה של להוסיף הודעה חדשה ללוח המודעות. את כותבת, לוחצת 'הוסף', וההודעה מצטרפת לשאר.",
      simpleExplanation:
        "addPost היא פונקציה אופיינית באפליקציות בלוג/פוסטים — היא מקבלת תוכן (טקסט, תמונה) ומוסיפה אותו למערך הפוסטים ב-state. היא חייבת ליצור מערך חדש (immutable update) כדי ש-React יזהה את השינוי.",
      thinkingMethod: [
        "1. מאיפה הנתונים מגיעים? (טופס? API?)",
        "2. איזה id ייחודי ייצור הפוסט החדש? (Date.now / crypto.randomUUID)",
        "3. איפה ה-state? (ב-App, או ב-Context)",
        "4. האם להוסיף בהתחלה (unshift) או בסוף (push)?",
        "5. האם לאפס את הטופס אחרי הוספה?",
      ],
      purpose:
        "המטרה היא ליצור פעולה מובנית של 'הוספה' שתשמור על immutability ועל UX טוב (איפוס טופס, פוקוס מחדש).",
      codeSnippets: [
        {
          title: "addPost בסיסי",
          code: "function addPost(text) {\n  const newPost = { id: Date.now(), text };\n  setPosts([newPost, ...posts]);  // חדש בהתחלה\n}",
          explanation: "יוצר פוסט עם id ייחודי ומוסיף אותו בראש המערך.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setPosts([newPost, ...posts]);",
          parts: [
            { piece: "[", role: "מערך חדש (immutable)." },
            { piece: "newPost", role: "הפוסט החדש — מופיע ראשון." },
            { piece: "...posts", role: "כל הפוסטים הישנים, מועתקים אחרי החדש." },
            { piece: "]", role: "סוגר את המערך." },
          ],
          summary: "מערך חדש לחלוטין: הפוסט החדש בהתחלה, אחריו כל הישנים.",
        },
      ],
    },
  },

  "lesson_22::deletePost": {
    extendedTab: {
      simpleGrandma:
        "סבתא, deletePost זה כמו להסיר פתק מהלוח. בוחרים איזה פתק להסיר (לפי המספר עליו), ושאר הפתקים נשארים על הלוח.",
      simpleExplanation:
        "deletePost מסירה פוסט לפי id. הדרך הנכונה היא ליצור מערך חדש בלי הפוסט — באמצעות filter. אסור להשתמש ב-splice על ה-state עצמו (שזה mutation).",
      thinkingMethod: [
        "1. איך אני מזהה את הפוסט למחיקה? (id)",
        "2. האם אני יוצר מערך חדש? (filter כן, splice לא)",
        "3. האם צריך אישור מהמשתמש? (confirm)",
        "4. אם זה API — האם לקרוא לו לפני העדכון או אחריו (optimistic)?",
        "5. האם להציג undo?",
      ],
      purpose:
        "המטרה היא להסיר פריט בודד ממערך תוך שמירה על immutability ועל UX נעים.",
      codeSnippets: [
        {
          title: "deletePost עם filter",
          code: "function deletePost(id) {\n  setPosts(posts.filter(p => p.id !== id));\n}",
          explanation: "filter יוצר מערך חדש בלי הפוסט שה-id שלו תואם.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setPosts(posts.filter(p => p.id !== id));",
          parts: [
            { piece: "posts.filter", role: "filter יוצרת מערך חדש (לא משנה את posts)." },
            { piece: "p =>", role: "פונקציה שרצה לכל פוסט." },
            { piece: "p.id !== id", role: "תנאי — נשמר רק אם ה-id שונה (= לא הנמחק)." },
          ],
          summary: "מערך חדש שכולל את כל הפוסטים חוץ מזה שה-id שלו תואם.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 23 — Router & Context API (22 concepts)
  // ============================================================================

  "lesson_23::Router": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Router זה כמו פקיד הקבלה במלון: הוא רואה לאן את רוצה ללכת (החדר, הלובי, המסעדה), ושולח אותך לחדר הנכון. ב-React, Router שולח אותך לקומפוננטה הנכונה לפי הכתובת בדפדפן.",
      simpleExplanation:
        "Router הוא רכיב שמנהל ניווט בתוך אפליקציית SPA (Single Page Application). הוא מסתכל על ה-URL בדפדפן, ומחליט איזו קומפוננטה להציג, בלי לטעון מחדש את הדף. הספרייה הנפוצה ב-React היא react-router-dom.",
      thinkingMethod: [
        "1. אילו דפים יש באפליקציה?",
        "2. מה ה-path של כל דף? (/, /about, /users/:id)",
        "3. איזו קומפוננטה משויכת לכל path?",
        "4. האם יש דף 404 לכל path לא ידוע?",
        "5. איך עוברים בין דפים? (Link, useNavigate)",
      ],
      purpose:
        "המטרה היא לאפשר ניווט בין דפים ב-SPA בלי טעינות מחודשות, עם תמיכה בכפתורי back/forward של הדפדפן ו-URL ניתנים לשיתוף.",
      codeSnippets: [
        {
          title: "מבנה בסיסי",
          code: "<BrowserRouter>\n  <Routes>\n    <Route path='/' element={<Home />} />\n    <Route path='/about' element={<About />} />\n  </Routes>\n</BrowserRouter>",
          explanation: "BrowserRouter עוטף, Routes מכיל מסלולים, כל Route מקשר path לקומפוננטה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Route path='/about' element={<About />} />",
          parts: [
            { piece: "<Route />", role: "רכיב שמגדיר מסלול בודד." },
            { piece: "path='/about'", role: "ה-URL שיופעל את המסלול הזה." },
            { piece: "element={<About />}", role: "הקומפוננטה שתוצג כשהמסלול מתאים." },
          ],
          summary: "כשה-URL הוא /about, ה-Router מציג את הקומפוננטה About.",
        },
      ],
    },
  },

  "lesson_23::URL": {
    extendedTab: {
      simpleGrandma:
        "סבתא, URL זה הכתובת של דף באינטרנט, כמו כתובת של בית ברחוב. כל דף יש לו כתובת ייחודית, ואפשר לשלוח אותה לחבר כדי שיגיע לאותו מקום.",
      simpleExplanation:
        "URL (Uniform Resource Locator) הוא הכתובת של דף או משאב באינטרנט. הוא בנוי מפרוטוקול (https://), דומיין (example.com), נתיב (/users), פרמטרים (?id=5), ו-hash (#section). ב-React Router משתמשים בנתיב כדי להחליט איזה דף להציג.",
      thinkingMethod: [
        "1. איזה חלק מה-URL מעניין אותי? (path? query? hash?)",
        "2. האם ה-path קבוע או דינמי? (/users/123)",
        "3. איך אני קורא את הפרמטרים? (useParams, useSearchParams)",
        "4. האם ה-URL ניתן לשיתוף ולהעמקה?",
        "5. האם יש קידוד נכון של ערכים בעברית?",
      ],
      purpose:
        "המטרה היא לתת לכל מצב של האפליקציה כתובת ייחודית — שניתנת לשיתוף, ל-bookmarks, ולחזרה אחורה בדפדפן.",
      codeSnippets: [
        {
          title: "מבנה URL",
          code: "https://app.com/users/123?tab=settings#privacy\n//        ^domain  ^path    ^query     ^hash",
          explanation: "URL מורכב מכמה חלקים, כל אחד עם מטרה אחרת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "/users/123?tab=settings",
          parts: [
            { piece: "/users", role: "החלק הראשי — מציין את הדף." },
            { piece: "/123", role: "פרמטר דינמי — מזהה משתמש (יקרא דרך useParams)." },
            { piece: "?tab=settings", role: "Query string — נתונים נוספים, יקראו דרך useSearchParams." },
          ],
          summary: "נתיב דינמי עם פרמטר ב-URL ועוד פרמטר ב-query string.",
        },
      ],
    },
  },

  "lesson_23::Route": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Route זה חוק אחד של Router. הוא אומר: 'אם הכתובת היא X, תציג את הדף Y'. כמו כלל בקבלה: 'אם השם מתחיל ב-A, חדר 101'.",
      simpleExplanation:
        "Route הוא רכיב בודד של ניווט — הוא מקשר path מסוים לקומפוננטה. אוסף של Routes, עטוף ב-Routes, מגדיר את כל המסלולים האפשריים באפליקציה.",
      thinkingMethod: [
        "1. מה ה-path של המסלול?",
        "2. איזו קומפוננטה תוצג?",
        "3. האם יש פרמטרים דינמיים? (/:id)",
        "4. האם יש Routes מקוננים? (Outlet)",
        "5. האם זה route מוגן (דורש התחברות)?",
      ],
      purpose:
        "המטרה היא להגדיר באופן הצהרתי איזה תוכן יוצג עבור כל URL.",
      codeSnippets: [
        {
          title: "Route עם פרמטר",
          code: "<Route path='/users/:id' element={<UserProfile />} />",
          explanation: ":id הוא פרמטר דינמי — בכל URL כמו /users/5 הקומפוננטה תקבל id=5.",
        },
        {
          title: "Route 404",
          code: "<Route path='*' element={<NotFound />} />",
          explanation: "* תופס כל path שלא נתפס לפניו — דף 404.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Route path='/users/:id' element={<UserProfile />} />",
          parts: [
            { piece: "path='/users/:id'", role: "ה-:id הוא פרמטר דינמי שייקלט מה-URL." },
            { piece: "element={<UserProfile />}", role: "הקומפוננטה שתוצג; היא תקרא את ה-id דרך useParams." },
          ],
          summary: "Route דינמי שתופס כל URL בצורת /users/{משהו}.",
        },
      ],
    },
  },

  "lesson_23::Path": {
    extendedTab: {
      simpleGrandma:
        "סבתא, path זה החלק האמצעי של הכתובת — מה שאחרי הדומיין. כמו '/חדרי-שינה' באתר רהיטים. זה מסביר 'איפה' בתוך האתר את נמצאת.",
      simpleExplanation:
        "path הוא החלק של ה-URL שמסביר באיזה דף או חלק של האתר אנחנו. ב-Router, ה-path נמשך עם ה-Route — אם הוא תואם, הקומפוננטה מוצגת. ה-path יכול להיות סטטי (/about) או דינמי (/users/:id).",
      thinkingMethod: [
        "1. האם זה path סטטי או דינמי?",
        "2. אם דינמי — איזה פרמטרים?",
        "3. האם הוא מקונן בתוך path אחר?",
        "4. האם הוא מתחיל ב-/ (absolute) או יחסי (relative)?",
        "5. האם הוא מוצג ב-breadcrumb?",
      ],
      purpose:
        "המטרה היא לתאר את המבנה ההיררכי של האפליקציה דרך כתובות ניתנות לקריאה.",
      codeSnippets: [
        {
          title: "paths נפוצים",
          code: "'/'                  // דף בית\n'/about'             // דף אודות\n'/users/:id'         // משתמש ספציפי\n'/products/:cat/:id' // מוצר בקטגוריה\n'*'                  // 404",
          explanation: "מספר דוגמאות של paths אופיינית.",
        },
      ],
      codeBreakdowns: [
        {
          code: "'/products/:category/:id'",
          parts: [
            { piece: "/products", role: "חלק סטטי." },
            { piece: ":category", role: "פרמטר דינמי ראשון." },
            { piece: ":id", role: "פרמטר דינמי שני." },
          ],
          summary: "path עם שני פרמטרים — תופס למשל /products/shoes/123.",
        },
      ],
    },
  },

  "lesson_23::BrowserRouter": {
    extendedTab: {
      simpleGrandma:
        "סבתא, BrowserRouter זה הקופסה החיצונית של כל הניווט. זה כמו 'מסגרת' שמוודאת ש-React שומע לכל שינוי כתובת בדפדפן.",
      simpleExplanation:
        "BrowserRouter הוא הרכיב שעוטף את כל האפליקציה ומאפשר ל-Router לעבוד. הוא משתמש ב-HTML5 History API כדי לעדכן את ה-URL בלי לטעון את הדף. חייב להיות עליון (לרוב סביב כל ה-App).",
      thinkingMethod: [
        "1. איפה אני ממקם אותו? (סביב <App />)",
        "2. האם רק BrowserRouter אחד באפליקציה?",
        "3. האם ה-server מתאים? (כל URL חייב לחזור ל-index.html)",
        "4. האם להשתמש ב-HashRouter במקום? (אם אין שליטה על ה-server)",
        "5. האם יש basename (אפליקציה תחת תת-נתיב)?",
      ],
      purpose:
        "המטרה היא להפעיל את כל מערכת הניווט של React Router באפליקציית SPA.",
      codeSnippets: [
        {
          title: "ב-main.jsx",
          code: "<BrowserRouter>\n  <App />\n</BrowserRouter>",
          explanation: "עוטף את כל האפליקציה. כל Router/Routes יעבדו רק בתוך זה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<BrowserRouter><App /></BrowserRouter>",
          parts: [
            { piece: "<BrowserRouter>", role: "מאתחל context שמכיל את ה-URL הנוכחי." },
            { piece: "<App />", role: "האפליקציה שלך — יכולה להשתמש ב-Routes/Link/useNavigate." },
            { piece: "</BrowserRouter>", role: "סוגר את ה-context." },
          ],
          summary: "BrowserRouter מספק את התשתית — בלעדיו, Router לא יעבוד.",
        },
      ],
    },
  },

  "lesson_23::Routes": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Routes זה האוסף של כל החוקים. כמו ספר שמכיל את כל ההוראות של המלון. Router מסתכל בספר ומוצא את ההוראה המתאימה.",
      simpleExplanation:
        "Routes הוא רכיב שמכיל אוסף של Route. הוא בודק את ה-URL הנוכחי, מוצא את ה-Route המתאים ביותר (ה-best match), ומציג את הקומפוננטה שלו. רק Route אחד מוצג בכל רגע.",
      thinkingMethod: [
        "1. אילו דפים יש לי? (כל אחד = Route)",
        "2. האם הסדר משנה? (לרוב לא — Routes עושה best match)",
        "3. האם יש Route תפוס-הכל ('*')?",
        "4. האם יש Routes מקוננים?",
        "5. האם הם בתוך BrowserRouter?",
      ],
      purpose:
        "המטרה היא לאסוף את כל ההגדרות של מסלולי ניווט במקום אחד ולבחור את המתאים אוטומטית.",
      codeSnippets: [
        {
          title: "Routes טיפוסי",
          code: "<Routes>\n  <Route path='/' element={<Home />} />\n  <Route path='/about' element={<About />} />\n  <Route path='*' element={<NotFound />} />\n</Routes>",
          explanation: "שלושה מסלולים. רק הראשון שיתאים יוצג.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Routes>\n  <Route path='/' element={<Home />} />\n  <Route path='*' element={<NotFound />} />\n</Routes>",
          parts: [
            { piece: "<Routes>", role: "מכיל את אוסף ה-Route ובוחר את המתאים." },
            { piece: "<Route path='/' />", role: "מסלול לדף הבית." },
            { piece: "<Route path='*' />", role: "תופס-הכל — יוצג כשאף Route אחר לא מתאים." },
          ],
          summary: "Routes בוחר אוטומטית את ה-Route עם ה-best match לפי ה-URL.",
        },
      ],
    },
  },

  "lesson_23::element": {
    extendedTab: {
      simpleGrandma:
        "סבתא, element זה ה'תוכן' של החוק — מה להציג כשהכתובת מתאימה. אם הכתובת היא /about, ה-element הוא הדף 'אודות'.",
      simpleExplanation:
        "element הוא prop של Route שמציין איזו קומפוננטה להציג כש-path מתאים. הערך הוא JSX (לא רק שם הקומפוננטה) — לכן כותבים <About /> ולא About.",
      thinkingMethod: [
        "1. איזו קומפוננטה אני רוצה להציג?",
        "2. האם להעביר לה props? (אפשר ב-element)",
        "3. האם היא דורשת אימות? (Wrapper)",
        "4. האם להשתמש ב-Lazy Loading?",
        "5. האם זה רכיב שיחזור על עצמו? (Layout)",
      ],
      purpose:
        "המטרה היא להגדיר באופן הצהרתי מה יוצג בכל מסלול, עם גמישות מלאה (props, wrappers, etc.).",
      codeSnippets: [
        {
          title: "element עם props",
          code: "<Route path='/admin' element={<Dashboard role='admin' />} />",
          explanation: "מעבירים props לקומפוננטה ישירות ב-element.",
        },
        {
          title: "element עם הגנה",
          code: "<Route path='/profile' element={<Protected><Profile /></Protected>} />",
          explanation: "Wrapper שבודק התחברות לפני שמציג את Profile.",
        },
      ],
      codeBreakdowns: [
        {
          code: "element={<UserProfile id={5} />}",
          parts: [
            { piece: "element=", role: "ה-prop של Route שמציין מה להציג." },
            { piece: "{<UserProfile />}", role: "JSX — אלמנט React שיוצג." },
            { piece: "id={5}", role: "props שמועברות לקומפוננטה." },
          ],
          summary: "element מקבל JSX, לא רק שם של קומפוננטה — לכן אפשר להעביר props.",
        },
      ],
    },
  },

  "lesson_23::Link": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Link זה כמו שלט שמצביע לחדר אחר. כשאת לוחצת עליו, את מועברת לדף החדש בלי לטעון את כל המלון מחדש.",
      simpleExplanation:
        "Link הוא הרכיב הנכון לניווט בתוך אפליקציית React Router. בניגוד ל-<a> רגיל, Link לא מטעין את הדף מחדש — הוא רק מעדכן את ה-URL ו-Router מציג את הקומפוננטה החדשה.",
      thinkingMethod: [
        "1. לאן אני רוצה לנווט? (to=...)",
        "2. האם זה קישור פנימי? (Link) או חיצוני? (a)",
        "3. האם להעביר state ב-Link?",
        "4. האם יש סגנון מיוחד כשהוא active? (NavLink)",
        "5. האם להחליף path או להוסיף ל-history?",
      ],
      purpose:
        "המטרה היא לאפשר ניווט מהיר בין דפים בלי טעינה מחודשת, עם תמיכה ב-back/forward של הדפדפן.",
      codeSnippets: [
        {
          title: "Link בסיסי",
          code: "<Link to='/about'>אודות</Link>",
          explanation: "מצביע לדף /about. בלחיצה — Router מחליף קומפוננטה.",
        },
        {
          title: "Link עם state",
          code: "<Link to='/profile' state={{ from: 'home' }}>פרופיל</Link>",
          explanation: "מעביר state נסתר — הקומפוננטה היעד תקרא דרך useLocation().",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Link to='/about'>אודות</Link>",
          parts: [
            { piece: "<Link>", role: "רכיב של React Router לניווט פנימי." },
            { piece: "to='/about'", role: "ה-URL היעד." },
            { piece: "אודות", role: "הטקסט שיוצג למשתמש." },
          ],
          summary: "Link הופך ל-<a> ב-DOM, אך לוכד את הלחיצה ומונע טעינה מחודשת.",
        },
      ],
    },
  },

  "lesson_23::to": {
    extendedTab: {
      simpleGrandma:
        "סבתא, to זה ה'לאן' של הקישור. את אומרת ל-Link 'לך לכאן', והוא לוקח את המשתמש לשם.",
      simpleExplanation:
        "to הוא ה-prop של Link (ושל Navigate) שמציין את ה-URL היעד. אפשר להעביר אותו כמחרוזת ('/about') או כאובייקט ({pathname:'/users', search:'?id=5'}).",
      thinkingMethod: [
        "1. ה-URL היעד הוא קבוע או דינמי?",
        "2. האם צריך להוסיף query params?",
        "3. האם להוסיף hash?",
        "4. relative או absolute?",
        "5. האם זה ניווט יחסי לתוך nested route?",
      ],
      purpose:
        "המטרה היא לציין יעד ניווט בצורה ברורה, גמישה, ומובנת לדפדפן ול-Router.",
      codeSnippets: [
        {
          title: "to כמחרוזת",
          code: "<Link to='/users/5'>משתמש</Link>",
          explanation: "ניווט פשוט לכתובת מסוימת.",
        },
        {
          title: "to כאובייקט",
          code: "<Link to={{ pathname: '/search', search: '?q=react' }}>חיפוש</Link>",
          explanation: "שליטה מפורטת — pathname, search, hash, state.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Link to={`/users/${user.id}`}>",
          parts: [
            { piece: "to=", role: "ה-prop של היעד." },
            { piece: "{`...`}", role: "Template literal — מחרוזת דינמית עם משתנה." },
            { piece: "${user.id}", role: "ערך דינמי שמשולב לתוך ה-URL." },
          ],
          summary: "URL דינמי שנבנה לפי משתנה (user.id).",
        },
      ],
    },
  },

  "lesson_23::useNavigate": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useNavigate זה כמו טקסי. במקום ללחוץ על שלט (Link), את אומרת בקוד 'קח אותי לשם' — ויוצרת ניווט אוטומטי, למשל אחרי שהמשתמש שלח טופס.",
      simpleExplanation:
        "useNavigate הוא Hook שמחזיר פונקציית ניווט. במקום קישור Link שהמשתמש לוחץ עליו, useNavigate מאפשר לקוד לנווט באופן תוכניתי — למשל אחרי שמירה מוצלחת, או בעקבות שגיאה.",
      thinkingMethod: [
        "1. מתי צריך לנווט? (אחרי submit? אחרי שגיאה?)",
        "2. לאן? (path קבוע או דינמי?)",
        "3. האם להחליף את ההיסטוריה? ({replace: true})",
        "4. האם להעביר state?",
        "5. האם הקריאה צריכה להיות בתוך useEffect?",
      ],
      purpose:
        "המטרה היא לאפשר ניווט מתוך הקוד (לא רק מקליק על Link) — חיוני לטפסים, התחברות, ופעולות שצריכות להוביל לדף אחר.",
      codeSnippets: [
        {
          title: "ניווט אחרי שמירה",
          code: "const navigate = useNavigate();\nasync function save() {\n  await api.save();\n  navigate('/dashboard');\n}",
          explanation: "אחרי שמירה מוצלחת, מעבירים לדשבורד.",
        },
        {
          title: "ניווט עם החלפה",
          code: "navigate('/login', { replace: true });",
          explanation: "מחליף את הדף הנוכחי בהיסטוריה — back לא יחזיר לכאן.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const navigate = useNavigate();\nnavigate('/home', { replace: true });",
          parts: [
            { piece: "useNavigate()", role: "Hook שמחזיר פונקציית ניווט." },
            { piece: "navigate(...)", role: "מבצע את הניווט." },
            { piece: "'/home'", role: "ה-path היעד." },
            { piece: "{ replace: true }", role: "אופציה — מחליף בהיסטוריה במקום להוסיף." },
          ],
          summary: "useNavigate מספק שליטה תוכניתית בניווט, עם אפשרויות מתקדמות.",
        },
      ],
    },
  },

  "lesson_23::dynamic route": {
    extendedTab: {
      simpleGrandma:
        "סבתא, dynamic route זה חוק שאומר 'כל מספר חדר מתאים'. /users/1 או /users/999 — אותו חוק, אותו דף, אבל מספר אחר.",
      simpleExplanation:
        "dynamic route הוא Route עם פרמטר משתנה (לפני שמו נכתב :). כל ערך שיופיע במקום הזה ייקלט כפרמטר ויהיה זמין דרך useParams. כך מציגים פרופיל משתמש, פרטי מוצר, וכו'.",
      thinkingMethod: [
        "1. איזה ערך משתנה ב-URL? (id, slug)",
        "2. איך אקרא לו? (:id, :slug)",
        "3. איך אקבל אותו בקומפוננטה? (useParams)",
        "4. האם הערך תקין? (ולידציה)",
        "5. מה לעשות אם לא נמצא? (404)",
      ],
      purpose:
        "המטרה היא ליצור URL ניתן להזנה ולשיתוף עבור פריט ספציפי, בלי להגדיר Route נפרד לכל id.",
      codeSnippets: [
        {
          title: "Route דינמי",
          code: "<Route path='/users/:id' element={<UserProfile />} />",
          explanation: ":id יקלט מה-URL ויהיה זמין ב-useParams().",
        },
      ],
      codeBreakdowns: [
        {
          code: "/users/:id",
          parts: [
            { piece: "/users", role: "חלק סטטי של ה-path." },
            { piece: "/:id", role: "פרמטר דינמי — כל ערך יתאים." },
          ],
          summary: "Route דינמי שתופס כל URL בצורת /users/{value}.",
        },
      ],
    },
  },

  "lesson_23::useParams": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useParams זה כמו לקרוא את מספר הדירה מהדלת. ה-URL כולל את המספר, ו-useParams עוזרת לקומפוננטה לדעת באיזה מספר היא נמצאת.",
      simpleExplanation:
        "useParams הוא Hook של React Router שמחזיר את הפרמטרים הדינמיים מה-URL כאובייקט. אם ה-Route מוגדר כ-/users/:id וה-URL הוא /users/5, ה-Hook יחזיר { id: '5' }.",
      thinkingMethod: [
        "1. איזה פרמטרים מוגדרים ב-Route? (לפי : שמות)",
        "2. אילו ערכים אני מצפה לקבל?",
        "3. האם לעבד את הערך? (parseInt למספר)",
        "4. מה לעשות אם הערך חסר?",
        "5. האם הקומפוננטה צריכה לטעון נתונים לפי הפרמטר?",
      ],
      purpose:
        "המטרה היא לקלוט את הערכים הדינמיים מה-URL ולהשתמש בהם בקומפוננטה (לטעינת נתונים, להצגה, וכו').",
      codeSnippets: [
        {
          title: "קריאת id",
          code: "function UserProfile() {\n  const { id } = useParams();\n  useEffect(() => { loadUser(id); }, [id]);\n  return <h1>משתמש {id}</h1>;\n}",
          explanation: "שולפים id מה-URL, וטוענים את הנתונים בעקבותיו.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const { id } = useParams();",
          parts: [
            { piece: "useParams()", role: "Hook שמחזיר אובייקט עם הפרמטרים מה-Route." },
            { piece: "{ id }", role: "destructuring — שולף את שדה id מהאובייקט." },
            { piece: "const id", role: "המשתנה id שווה לערך מה-URL (כמחרוזת)." },
          ],
          summary: "useParams חוזר עם כל הפרמטרים הדינמיים של ה-Route הנוכחי.",
        },
      ],
    },
  },

  "lesson_23::Context API": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Context API זה כמו רדיו ציבורי בבית — את משדרת מהמרכז, וכל החדרים יכולים לשמוע. אין צורך לתת את המידע מיד ליד דרך כל החדרים.",
      simpleExplanation:
        "Context API הוא מנגנון של React לשיתוף נתונים בין קומפוננטות שלא קשורות ישירות, בלי 'prop drilling'. יוצרים Context (כמו ערוץ), עוטפים את האפליקציה ב-Provider עם ערך, וכל קומפוננטה בתוך יכולה לקרוא אותו דרך useContext.",
      thinkingMethod: [
        "1. איזה נתונים נחוצים בכמה קומפוננטות רחוקות? (theme, user, language)",
        "2. האם זה מצדיק Context? (אם רק 1-2 רמות — אולי לא)",
        "3. איך אבנה את ה-Provider? (state פנימי + value)",
        "4. אילו קומפוננטות יקראו (useContext)?",
        "5. האם החלפת ערך תגרום לכל הצרכנים לרינדור מחדש?",
      ],
      purpose:
        "המטרה היא לפתור prop drilling — להעביר נתונים גלובליים (auth, theme) בלי להעביר props דרך כל הרמות.",
      codeSnippets: [
        {
          title: "יצירה ושימוש",
          code: "const ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value='dark'>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>...</div>;\n}",
          explanation: "Context, Provider, useContext — שלושת השלבים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const ThemeContext = createContext('light');",
          parts: [
            { piece: "createContext", role: "פונקציה של React שיוצרת Context חדש." },
            { piece: "'light'", role: "ערך ברירת מחדל — אם אין Provider, יוחזר זה." },
            { piece: "ThemeContext", role: "האובייקט שייצא ויידע על ידי Provider/useContext." },
          ],
          summary: "Context הוא 'ערוץ' ששולחים בו נתון אחד מהאב לכל הצאצאים.",
        },
      ],
    },
  },

  "lesson_23::createContext": {
    extendedTab: {
      simpleGrandma:
        "סבתא, createContext זה ליצור ערוץ חדש ברדיו. אומרים 'הערוץ הזה ישדר אקלים' (theme) או 'הערוץ הזה ישדר משתמש' (user).",
      simpleExplanation:
        "createContext היא פונקציה של React שיוצרת אובייקט Context חדש. היא מקבלת ערך ברירת מחדל ומחזירה אובייקט עם Provider ו-Consumer (אבל בעיקר משתמשים ב-useContext).",
      thinkingMethod: [
        "1. מה הערך ברירת המחדל? (קריטי אם אין Provider)",
        "2. האם הערך מורכב? (אובייקט עם state + setters)",
        "3. איפה לאחסן את ה-Context? (קובץ נפרד)",
        "4. האם לייצא גם hook מותאם? (useTheme)",
        "5. האם זה תואם TypeScript? (טייפ generic)",
      ],
      purpose:
        "המטרה היא להגדיר ערוץ נתונים שניתן להזרים דרכו ערכים בין קומפוננטות רחוקות.",
      codeSnippets: [
        {
          title: "יצירה פשוטה",
          code: "export const UserContext = createContext(null);",
          explanation: "Context עם ברירת מחדל null. ייצא לשימוש בכל המקומות.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const UserContext = createContext(null);",
          parts: [
            { piece: "createContext", role: "פונקציית React ליצירת Context חדש." },
            { piece: "(null)", role: "ערך ברירת המחדל." },
            { piece: "UserContext", role: "האובייקט שייצא ויידע ל-Provider ול-useContext." },
          ],
          summary: "createContext מחזיר אובייקט עם .Provider שעוטף, ושאפשר להעביר ל-useContext.",
        },
      ],
    },
  },

  "lesson_23::Provider": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Provider זה התחנה ששולחת את הרדיו. אם אין תחנה — אין שידור. הוא קובע איזה ערך כל המאזינים יקבלו.",
      simpleExplanation:
        "Provider הוא רכיב שכל Context מספק (Context.Provider). הוא עוטף קומפוננטות אחרות ומקבל value — הערך שיהיה זמין לכל הצאצאים שיקראו useContext עם ה-Context הזה.",
      thinkingMethod: [
        "1. איזה Context אני מספק?",
        "2. מה הערך? (קבוע, state, אובייקט)",
        "3. עד איפה הוא משפיע? (איזה תת-עץ של קומפוננטות)",
        "4. האם הערך משתנה? (אם כן — שים לב לרינדור מחדש)",
        "5. האם להשתמש ב-useMemo כדי להימנע מ-value חדש בכל רינדור?",
      ],
      purpose:
        "המטרה היא לשתף ערך עם כל הצאצאים בתת-עץ של קומפוננטות, מבלי להעביר props דרך כל רמה.",
      codeSnippets: [
        {
          title: "Provider עם state",
          code: "function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}",
          explanation: "Provider משלו עם state פנימי. children = הילדים שעוטפים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<ThemeContext.Provider value={{ theme, setTheme }}>",
          parts: [
            { piece: "ThemeContext.Provider", role: "הרכיב Provider של ה-Context הספציפי." },
            { piece: "value=", role: "ה-prop שמכיל את הערך שיועבר לכל הצאצאים." },
            { piece: "{{ theme, setTheme }}", role: "אובייקט שכולל גם את ה-state וגם את הסטר." },
          ],
          summary: "Provider משדר value לכל הצאצאים שיקראו useContext עם ה-Context הזה.",
        },
      ],
    },
  },

  "lesson_23::value": {
    extendedTab: {
      simpleGrandma:
        "סבתא, value זה התוכן של השידור. ה-Provider משדר אותו, וכולם יכולים לקלוט.",
      simpleExplanation:
        "value הוא ה-prop של Provider שמכיל את הנתונים שיוזרמו דרך ה-Context. זה יכול להיות ערך פשוט (string, number) או אובייקט מורכב עם data + פונקציות.",
      thinkingMethod: [
        "1. אילו נתונים אני רוצה לשתף?",
        "2. האם הם נשארים זהים או משתנים?",
        "3. האם להעביר גם פונקציות? (כן — להעביר state ועדכון יחד)",
        "4. אם value אובייקט חדש בכל רינדור — האם להשתמש ב-useMemo?",
        "5. האם הצרכנים יודעים מה לצפות?",
      ],
      purpose:
        "המטרה היא להגדיר מה בדיוק יוזרם דרך ה-Context — מנתון פשוט עד מבנה מורכב.",
      codeSnippets: [
        {
          title: "value אובייקט",
          code: "<UserContext.Provider value={{ user, login, logout }}>",
          explanation: "אובייקט עם נתון ושתי פונקציות לעדכון.",
        },
      ],
      codeBreakdowns: [
        {
          code: "value={{ user, login, logout }}",
          parts: [
            { piece: "value=", role: "ה-prop של Provider." },
            { piece: "{{ ... }}", role: "אובייקט (סוגריים פנימיות), בתוך JSX expression (סוגריים חיצוניות)." },
            { piece: "user, login, logout", role: "Property shorthand — שווה ל-{ user: user, login: login, logout: logout }." },
          ],
          summary: "value מכיל את כל מה שצרכני ה-Context יקבלו.",
        },
      ],
    },
  },

  "lesson_23::useContext": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useContext זה כמו לקלוט את השידור. את אומרת לרדיו 'תן לי את ערוץ הסבתא', וקיבלת את הערך הנוכחי שלו.",
      simpleExplanation:
        "useContext הוא Hook שמקבל אובייקט Context ומחזיר את ה-value הנוכחי שלו (מה-Provider הקרוב ביותר למעלה בעץ). זה מחליף את הצורך ב-Consumer JSX.",
      thinkingMethod: [
        "1. איזה Context אני קורא?",
        "2. האם יש Provider מעליי בעץ? (אחרת אקבל ברירת מחדל)",
        "3. אילו שדות אני שולף? (destructuring)",
        "4. האם הקומפוננטה תרונדר מחדש בכל שינוי value?",
        "5. האם כדאי custom hook (useUser)?",
      ],
      purpose:
        "המטרה היא לקרוא בקלות את הערך של Context בלי boilerplate, מכל קומפוננטה בעץ.",
      codeSnippets: [
        {
          title: "שימוש בסיסי",
          code: "function Profile() {\n  const { user } = useContext(UserContext);\n  return <p>שלום, {user.name}</p>;\n}",
          explanation: "שולפים user מה-Context וגוזרים שדה name.",
        },
        {
          title: "Custom hook",
          code: "function useUser() { return useContext(UserContext); }\n\n// בקומפוננטה\nconst { user } = useUser();",
          explanation: "Hook מותאם — מסתיר את UserContext, נקי יותר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const { user, logout } = useContext(UserContext);",
          parts: [
            { piece: "useContext", role: "Hook של React." },
            { piece: "(UserContext)", role: "אובייקט ה-Context שיצרנו עם createContext." },
            { piece: "{ user, logout }", role: "destructuring של ה-value." },
          ],
          summary: "שולפים את ה-value מה-Provider הקרוב, וגוזרים את השדות הרצויים.",
        },
      ],
    },
  },

  "lesson_23::Prop Drilling": {
    extendedTab: {
      simpleGrandma:
        "סבתא, prop drilling זה כמו להעביר מתנה דרך 5 חברים — סבתא ↦ אמא ↦ בן ↦ נכד ↦ נין. כל אחד צריך להעביר הלאה. עייף, ולא תמיד נכון. עדיף להגיע ישר.",
      simpleExplanation:
        "prop drilling הוא מצב שבו מעבירים נתונים דרך כמה רמות של קומפוננטות, רק כדי להגיע לקומפוננטה רחוקה. הקומפוננטות באמצע לא משתמשות בהם — הן רק 'מעבירות'. זה יוצר קוד קשה לתחזוקה. הפתרון: Context API או state management (Redux, Zustand).",
      thinkingMethod: [
        "1. כמה רמות עובר ה-prop?",
        "2. האם הקומפוננטות באמצע באמת צריכות אותו?",
        "3. אם 3+ רמות והאמצעיות לא משתמשות — מועמד ל-Context",
        "4. האם זה state גלובלי? (auth, theme — Context)",
        "5. האם להעביר children במקום (composition)?",
      ],
      purpose:
        "מבחינים ב-prop drilling כדי לזהות מתי צריך לעבור ל-Context או למבנה הרכבה אחר.",
      codeSnippets: [
        {
          title: "Prop Drilling — אנטי-פטרן",
          code: "<App user={user}>\n  <Layout user={user}>\n    <Page user={user}>\n      <Header user={user} /> // רק כאן באמת בשימוש\n    </Page>\n  </Layout>\n</App>",
          explanation: "user מועבר דרך 4 רמות. רק Header באמת משתמש בו.",
        },
        {
          title: "פתרון עם Context",
          code: "<UserContext.Provider value={user}>\n  <Layout><Page><Header /></Page></Layout>\n</UserContext.Provider>",
          explanation: "Header יקרא user דרך useContext — אין יותר drilling.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<Page user={user}><Header user={user} /></Page>",
          parts: [
            { piece: "Page user={user}", role: "Page לא משתמש ב-user, אבל מקבל אותו." },
            { piece: "<Header user={user} />", role: "Header באמת צריך, אז Page חייב להעביר." },
          ],
          summary: "Page הוא 'pass-through' שאינו אמור להחזיק את user — סימן ל-prop drilling.",
        },
      ],
    },
  },

  "lesson_23::MainScreen": {
    extendedTab: {
      simpleGrandma:
        "סבתא, MainScreen זה הדף הראשי של האפליקציה. כמו הסלון בבית — הכניסה הראשית, מאיפה מגיעים לכל החדרים האחרים.",
      simpleExplanation:
        "MainScreen היא קומפוננטה שמייצגת את הדף הראשי באפליקציה. בדרך כלל היא מציגה את המסכים החשובים, מאפשרת ניווט, ומחזיקה state גלובלי או מתקשרת איתו דרך Context.",
      thinkingMethod: [
        "1. מה אמור להופיע בדף הראשי?",
        "2. אילו קומפוננטות-בנים נדרשות?",
        "3. האם המסך הזה מחזיק state? (לרוב כן)",
        "4. האם הוא חולק נתונים עם בנים דרך props/Context?",
        "5. האם יש ניווט מתוכו לעמודים נוספים?",
      ],
      purpose:
        "המטרה היא לרכז את הלוגיקה והממשק של הדף המרכזי באפליקציה.",
      codeSnippets: [
        {
          title: "MainScreen טיפוסי",
          code: "function MainScreen() {\n  const [posts, setPosts] = useState([]);\n  return (\n    <div>\n      <AddPost onAdd={p => setPosts([p, ...posts])} />\n      <PostList items={posts} />\n    </div>\n  );\n}",
          explanation: "מחזיק state של posts, ומחלק לבנים שמציגים ומוסיפים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function MainScreen() { ... }",
          parts: [
            { piece: "function MainScreen", role: "קומפוננטה — שמה תמיד מתחיל באות גדולה." },
            { piece: "()", role: "ללא props — קומפוננטה עליונה לרוב לא צריכה." },
            { piece: "{ ... }", role: "גוף הקומפוננטה — state, אירועים, JSX." },
          ],
          summary: "MainScreen היא קומפוננטה ללא props שמרכזת state ומחלקת לבנים.",
        },
      ],
    },
  },

  "lesson_23::AddPost": {
    extendedTab: {
      simpleGrandma:
        "סבתא, AddPost זה רכיב הוספה — הטופס לכתיבת פוסט חדש עם כפתור 'שלח'. הוא לא מציג פוסטים קיימים, רק יוצר חדשים.",
      simpleExplanation:
        "AddPost היא קומפוננטה ייעודית להוספת פוסט חדש: מציגה טופס, מנהלת state פנימי של הקלט, וכשהמשתמש שולח — קוראת לפונקציה onAdd שהאב נתן עם הנתונים.",
      thinkingMethod: [
        "1. אילו שדות יש בטופס?",
        "2. האם state פנימי לקלט? (כן)",
        "3. איך מודיעים לאב על פוסט חדש? (onAdd prop)",
        "4. ולידציה לפני הוספה?",
        "5. איפוס הטופס אחרי הוספה?",
      ],
      purpose:
        "המטרה היא להפריד את הלוגיקה של 'יצירה' מהלוגיקה של 'הצגה', וליצור רכיב יחיד בעל אחריות אחת.",
      codeSnippets: [
        {
          title: "AddPost בסיסי",
          code: "function AddPost({ onAdd }) {\n  const [text, setText] = useState('');\n  return (\n    <form onSubmit={e => { e.preventDefault(); onAdd({ id: Date.now(), text }); setText(''); }}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button>הוסף</button>\n    </form>\n  );\n}",
          explanation: "טופס controlled. בשליחה — קורא ל-onAdd עם פוסט חדש ומאפס.",
        },
      ],
      codeBreakdowns: [
        {
          code: "onSubmit={e => { e.preventDefault(); onAdd({...}); setText(''); }}",
          parts: [
            { piece: "onSubmit=", role: "מאזין לאירוע submit של הטופס." },
            { piece: "e.preventDefault()", role: "מונע מהדפדפן לטעון את הדף מחדש." },
            { piece: "onAdd({...})", role: "מעביר את הפוסט החדש לאב." },
            { piece: "setText('')", role: "מאפס את הטופס לקלט הבא." },
          ],
          summary: "טופס שמונע ברירת מחדל, מודיע לאב, ומאפס את עצמו.",
        },
      ],
    },
  },

  "lesson_23::PostList": {
    extendedTab: {
      simpleGrandma:
        "סבתא, PostList זה הרשימה — אוסף הפוסטים שנכתבו. הוא רק מציג, לא מוסיף או מוחק לבד.",
      simpleExplanation:
        "PostList היא קומפוננטה שמקבלת מערך פוסטים כ-prop וממפה אותו ל-JSX. היא יכולה גם לקבל פונקציות onDelete/onEdit ולהעבירן לכל פוסט בודד.",
      thinkingMethod: [
        "1. איזה props אני מקבל? (items, onDelete?)",
        "2. איך אני ממפה? (.map עם key=item.id)",
        "3. איזה רכיב מציג כל פוסט? (PostItem, או JSX inline)",
        "4. מה אם הרשימה ריקה? (empty state)",
        "5. האם להוסיף סינון/מיון?",
      ],
      purpose:
        "המטרה היא להציג רשימה דינמית של פריטים מאוסף נתונים, ולתת ל-bn אפשרות להגיב על כל פריט בנפרד.",
      codeSnippets: [
        {
          title: "PostList עם empty state",
          code: "function PostList({ items, onDelete }) {\n  if (!items.length) return <p>אין עדיין פוסטים</p>;\n  return (\n    <ul>\n      {items.map(p => (\n        <li key={p.id}>{p.text} <button onClick={() => onDelete(p.id)}>X</button></li>\n      ))}\n    </ul>\n  );\n}",
          explanation: "מטפל גם ב-empty state, גם בתצוגה, גם במחיקה דרך callback.",
        },
      ],
      codeBreakdowns: [
        {
          code: "items.map(p => <li key={p.id}>{p.text}</li>)",
          parts: [
            { piece: "items.map", role: "ממפה כל פריט לאלמנט JSX." },
            { piece: "p =>", role: "פונקציה שמקבלת פריט בודד." },
            { piece: "<li key={p.id}>", role: "key חיוני ל-React לזיהוי פריטים." },
            { piece: "{p.text}", role: "מציג את הטקסט של הפריט." },
          ],
          summary: "map הופך מערך נתונים למערך אלמנטים. key מבטיח אופטימיזציית רינדור.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 24 — useEffect, useMemo, useRef (16 concepts)
  // ============================================================================

  "lesson_24::useEffect": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useEffect זה כמו טיימר במטבח. את אומרת: 'אחרי שאני מסיימת לבשל, תכבי את האש'. React מסיים לרנדר, ואז מפעיל את ה-effect שלך.",
      simpleExplanation:
        "useEffect הוא Hook שמאפשר להריץ קוד אחרי שהקומפוננטה מרונדרת. משתמשים בו לתופעות לוואי (side effects) — קריאות לשרת, הוספת מאזיני אירועים, שינוי כותרת הדף, ועוד. הוא מקבל פונקציה ומערך תלויות שמחליט מתי להריץ אותה שוב.",
      thinkingMethod: [
        "1. איזו פעולת לוואי אני רוצה? (fetch, timer, listener)",
        "2. מתי היא צריכה לרוץ? (פעם אחת? בכל שינוי? תלוי בערכים?)",
        "3. מה לשים במערך התלויות?",
        "4. האם צריך cleanup? (return function)",
        "5. האם זה גורם ל-re-render שגורם להפעלה חוזרת? (סכנת לולאה)",
      ],
      purpose:
        "המטרה היא לתאם פעולות לוואי עם מחזור החיים של הקומפוננטה — להריץ אותן בזמן הנכון, ולנקות אחריהן בזמן הנכון.",
      codeSnippets: [
        {
          title: "fetch ראשוני",
          code: "useEffect(() => {\n  fetch('/api/users').then(r => r.json()).then(setUsers);\n}, []);",
          explanation: "מערך ריק → רץ פעם אחת בלבד, אחרי הרינדור הראשון.",
        },
        {
          title: "timer עם cleanup",
          code: "useEffect(() => {\n  const id = setInterval(() => setTime(Date.now()), 1000);\n  return () => clearInterval(id);\n}, []);",
          explanation: "מפעיל timer; ה-cleanup מנקה אותו לפני unmount.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useEffect(() => {\n  doSomething();\n  return () => cleanup();\n}, [dep1, dep2]);",
          parts: [
            { piece: "useEffect", role: "ה-Hook עצמו." },
            { piece: "() => { ... }", role: "הפונקציה שתרוץ אחרי הרינדור." },
            { piece: "return () => cleanup()", role: "פונקציית cleanup — תרוץ לפני ההפעלה הבאה ולפני unmount." },
            { piece: "[dep1, dep2]", role: "מערך תלויות — אם משתנה, ה-effect ירוץ שוב." },
          ],
          summary: "פעולת לוואי שרצה אחרי רינדור, מתעדכנת לפי תלויות, ומנקה אחריה.",
        },
      ],
    },
  },

  "lesson_24::side effect": {
    extendedTab: {
      simpleGrandma:
        "סבתא, side effect זה כמו לעשות קניות. את לא יוצאת מהבית רק כדי לחזור — את יוצאת כדי להביא משהו (חלב). זה ה'משהו הצדדי' שקורה בנוסף לפעולה הראשית של הקומפוננטה.",
      simpleExplanation:
        "side effect הוא כל פעולה של הקומפוננטה שיש לה השפעה מחוץ לעצמה: קריאה ל-API, שינוי localStorage, הוספת מאזיני events, עדכון document.title, סשן timer. ב-React הקומפוננטה אמורה להיות 'pure' (פונקציה טהורה) — כל side effect צריך לחיות בתוך useEffect.",
      thinkingMethod: [
        "1. האם הפעולה משפיעה מחוץ לקומפוננטה? (אם כן — side effect)",
        "2. האם היא חייבת להתבצע בכל רינדור?",
        "3. האם היא דורשת ניקוי? (timer, listener)",
        "4. האם היא יכולה לרוץ בזמן רינדור? (לרוב לא!)",
        "5. האם היא מסונכרנת או אסינכרונית?",
      ],
      purpose:
        "מבחינים ב-side effects כדי להריץ אותם במקום הנכון (בתוך useEffect), ולהבטיח שהקומפוננטה תישאר ניתנת לחיזוי.",
      codeSnippets: [
        {
          title: "Side effects אופייניים",
          code: "// fetch מהשרת\nfetch('/api');\n// כתיבה ל-localStorage\nlocalStorage.setItem('k', 'v');\n// שינוי כותרת\ndocument.title = 'New';",
          explanation: "כולם משפיעים מחוץ לקומפוננטה — ולכן side effects.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useEffect(() => { document.title = `${count}`; }, [count]);",
          parts: [
            { piece: "document.title =", role: "שינוי DOM גלובלי — side effect." },
            { piece: "[count]", role: "תלות — ירוץ שוב רק כש-count משתנה." },
          ],
          summary: "side effect שמסונכרן עם state — בכל שינוי count, הכותרת מתעדכנת.",
        },
      ],
    },
  },

  "lesson_24::dependency array": {
    extendedTab: {
      simpleGrandma:
        "סבתא, dependency array זה הרשימה ש-React מסתכל עליה כדי לדעת אם להריץ שוב את ה-effect. כמו רשימת מצרכים — אם משהו השתנה ברשימה, הולכים לקנות שוב.",
      simpleExplanation:
        "dependency array הוא הארגומנט השני של useEffect (וכמה Hooks אחרים). React משווה כל ערך בין רינדורים, ואם משהו השתנה — מריץ את ה-effect שוב. מערך ריק [] = פעם אחת בלבד. ללא מערך = בכל רינדור.",
      thinkingMethod: [
        "1. אילו ערכים מהקומפוננטה ה-effect משתמש בהם?",
        "2. כל אחד צריך להיות במערך (אחרת = stale closure)",
        "3. האם הערכים מסוג שמתאים להשוואה רדודה? (פרימיטיבים = טוב; אובייקטים יכולים להיות 'חדשים' בכל רינדור)",
        "4. האם יש exhaustive-deps lint שמזהיר?",
        "5. האם יש דרך להעביר את הערך ל-ref כדי לא לכלול אותו?",
      ],
      purpose:
        "המטרה היא לתת ל-React לדעת מתי להריץ את ה-effect שוב — לא יותר מדי (יקר), לא פחות מדי (באגים).",
      codeSnippets: [
        {
          title: "אפשרויות נפוצות",
          code: "useEffect(fn);          // בכל רינדור — נדיר\nuseEffect(fn, []);      // פעם אחת בלבד — אחרי mount\nuseEffect(fn, [a, b]);  // כל פעם ש-a או b משתנה",
          explanation: "שלוש אפשרויות שולטות בתדירות ההפעלה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useEffect(() => { ... }, [userId, page]);",
          parts: [
            { piece: "[userId, page]", role: "מערך התלויות — שני ערכים." },
            { piece: "userId", role: "אם הערך הזה משתנה, ה-effect ירוץ שוב." },
            { piece: "page", role: "כנ\"ל." },
          ],
          summary: "ה-effect ירוץ אחרי mount הראשון, ואז כל פעם ש-userId או page משתנה.",
        },
      ],
    },
  },

  "lesson_24::fetching data": {
    extendedTab: {
      simpleGrandma:
        "סבתא, fetching data זה לבקש מהבן שיביא חלב מהמכולת. את שולחת אותו, מחכה, ואחר כך מקבלת את החלב ושמה במקרר.",
      simpleExplanation:
        "fetching data הוא תהליך טעינת נתונים מהשרת. ב-React משתמשים ב-fetch (או axios) בתוך useEffect, ואז שמים את התוצאה ב-state. חשוב לטפל גם ב-loading, גם בשגיאות, וגם להימנע מ-race conditions.",
      thinkingMethod: [
        "1. מתי אני רוצה לטעון? (בעלייה? בלחיצה? כשמשתנה?)",
        "2. איפה לאחסן? (state)",
        "3. איך לטפל ב-loading state?",
        "4. איך לטפל בשגיאות?",
        "5. האם לבטל אם הקומפוננטה יורדת מהמסך? (AbortController)",
      ],
      purpose:
        "המטרה היא לשלב נתונים חיצוניים בקומפוננטה — נתונים מהשרת, מ-API, מ-database — ולהציגם בצורה reactive.",
      codeSnippets: [
        {
          title: "fetch + loading + error",
          code: "const [data, setData] = useState(null);\nconst [error, setError] = useState(null);\nuseEffect(() => {\n  fetch('/api/posts')\n    .then(r => r.json())\n    .then(setData)\n    .catch(setError);\n}, []);",
          explanation: "טוען פעם אחת, שומר ב-state, מטפל בשגיאות.",
        },
        {
          title: "ביטול עם AbortController",
          code: "useEffect(() => {\n  const ctrl = new AbortController();\n  fetch('/api', { signal: ctrl.signal }).then(...);\n  return () => ctrl.abort();\n}, []);",
          explanation: "מבטל את הבקשה אם הקומפוננטה יורדת — מונע update על קומפוננטה לא קיימת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "fetch('/api/users').then(r => r.json()).then(setUsers);",
          parts: [
            { piece: "fetch('/api/users')", role: "שולח בקשת HTTP, מחזיר Promise." },
            { piece: ".then(r => r.json())", role: "ממיר את התגובה ל-JSON (גם זה Promise)." },
            { piece: ".then(setUsers)", role: "כשהנתונים מוכנים — שומר אותם ב-state." },
          ],
          summary: "שרשרת Promises שמקבלת נתונים מ-API ושומרת ב-state.",
        },
      ],
    },
  },

  "lesson_24::fetch": {
    extendedTab: {
      simpleGrandma:
        "סבתא, fetch זה הפונקציה שאומרת לדפדפן 'לך תביא לי משהו מהאינטרנט'. כמו לבקש מבן ללכת למכולת.",
      simpleExplanation:
        "fetch היא פונקציה מובנית בדפדפן לשליחת בקשות HTTP. היא מחזירה Promise שנפתר עם Response. בדרך כלל ממירים ל-JSON ואז משתמשים בנתונים. תומכת ב-GET (ברירת מחדל), POST, PUT, DELETE.",
      thinkingMethod: [
        "1. איזו פעולה? (GET לקריאה, POST ליצירה, PUT לעדכון, DELETE)",
        "2. מה ה-URL?",
        "3. האם צריך body? (POST/PUT)",
        "4. אילו headers? (Content-Type, Authorization)",
        "5. איך להמיר את התשובה? (json/text/blob)",
      ],
      purpose:
        "המטרה היא לאפשר תקשורת בין הצד-לקוח לשרת — קריאה, שליחה, עדכון, מחיקה של נתונים.",
      codeSnippets: [
        {
          title: "GET",
          code: "fetch('/api/users').then(r => r.json()).then(console.log);",
          explanation: "בקשת GET פשוטה.",
        },
        {
          title: "POST עם JSON",
          code: "fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'דני' })\n});",
          explanation: "שליחת אובייקט כ-JSON ל-API.",
        },
      ],
      codeBreakdowns: [
        {
          code: "fetch('/api/x', { method: 'POST', body: JSON.stringify(data) })",
          parts: [
            { piece: "fetch", role: "פונקציה גלובלית של הדפדפן." },
            { piece: "'/api/x'", role: "ה-URL היעד." },
            { piece: "{ method: 'POST' }", role: "אופציות — סוג הבקשה." },
            { piece: "body: JSON.stringify(data)", role: "התוכן של הבקשה, כמחרוזת JSON." },
          ],
          summary: "fetch עם אופציות שולחת בקשת POST עם JSON ב-body.",
        },
      ],
    },
  },

  "lesson_24::state update": {
    extendedTab: {
      simpleGrandma:
        "סבתא, state update זה רגע של שינוי. את אומרת ל-React 'הערך החדש הוא X' והוא יעדכן את המסך.",
      simpleExplanation:
        "state update הוא הפעולה שבה state משתנה דרך setState. React לא מעדכן מיידית — הוא מאצ'ר עדכונים, ואז מבצע re-render אחד עם הערך הסופי. אם setState נקרא בתוך useEffect, יש סכנת לולאה אינסופית.",
      thinkingMethod: [
        "1. מה הערך החדש?",
        "2. תלוי בערך הקודם? (functional update)",
        "3. האם זה מאצ'ר עם updates אחרים?",
        "4. האם הוא בתוך useEffect? (שים לב לתלויות)",
        "5. האם הוא יגרום ל-re-render שיגרום לעדכון נוסף? (לולאה!)",
      ],
      purpose:
        "המטרה היא לשנות את ה-state ולגרום ל-React לרנדר את הקומפוננטה מחדש עם הערך החדש.",
      codeSnippets: [
        {
          title: "עדכון פשוט",
          code: "setCount(5);",
          explanation: "שינוי ישיר.",
        },
        {
          title: "עדכון על בסיס קודם",
          code: "setCount(prev => prev + 1);",
          explanation: "כשרוצים להבטיח שמתבסס על העדכני ביותר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setUser(prev => ({ ...prev, name: 'X' }));",
          parts: [
            { piece: "setUser", role: "פונקציית עדכון ה-state." },
            { piece: "prev =>", role: "פונקציה — מקבלת את הערך העדכני הקודם." },
            { piece: "({ ...prev, name: 'X' })", role: "אובייקט חדש — spread של הקודם + שינוי name." },
          ],
          summary: "functional update — בטוח כשהעדכון תלוי בערך הקודם.",
        },
      ],
    },
  },

  "lesson_24::infinite loop": {
    extendedTab: {
      simpleGrandma:
        "סבתא, infinite loop זה כמו דלת מסתובבת שלא נעצרת. בכל סיבוב, מישהו דוחף שוב. ב-React: state משתנה → רינדור → effect → state משתנה → רינדור → ... ואין סוף.",
      simpleExplanation:
        "infinite loop הוא תקלה נפוצה ב-useEffect: ה-effect מעדכן state, מה שגורם ל-re-render, מה שגורם להפעלת ה-effect שוב, וכך הלאה. הסיבה הנפוצה: setState בתוך useEffect ללא תלויות נכונות, או תלות שמשתנה בכל רינדור.",
      thinkingMethod: [
        "1. האם ה-effect מעדכן state?",
        "2. האם ה-state הזה במערך התלויות? (אם כן — לולאה!)",
        "3. האם יש תנאי שמונע עדכון מיותר? (if (newVal !== oldVal))",
        "4. האם תלות היא אובייקט/פונקציה שנוצר חדש בכל רינדור?",
        "5. האם להוציא לוגיקה ל-useMemo/useCallback?",
      ],
      purpose:
        "מזהים infinite loops כדי למנוע קריסת אפליקציה והוצאת cpu מיותרת.",
      codeSnippets: [
        {
          title: "❌ לולאה אינסופית",
          code: "useEffect(() => {\n  setCount(count + 1);  // משנה count\n}, [count]);  // count תלות → ירוץ שוב מיד",
          explanation: "כל הפעלה משנה את count, מה שמפעיל שוב.",
        },
        {
          title: "✅ פתרון — תנאי",
          code: "useEffect(() => {\n  if (count < 10) setCount(count + 1);\n}, [count]);",
          explanation: "התנאי עוצר את הלולאה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useEffect(() => { setX(x + 1); }, [x]);",
          parts: [
            { piece: "setX(x + 1)", role: "מעדכן את x — גורם ל-re-render." },
            { piece: "[x]", role: "x במערך תלויות → effect ירוץ שוב כש-x משתנה." },
          ],
          summary: "שילוב הרסני: משנה את התלות שלו עצמו.",
        },
      ],
    },
  },

  "lesson_24::useMemo": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useMemo זה לזכור תוצאה של חישוב יקר. במקום לחשב כל פעם מחדש את הסכום של רשימת מצרכים — שומרים את התוצאה. בודקים שוב רק אם הרשימה השתנתה.",
      simpleExplanation:
        "useMemo הוא Hook שמחזיר ערך 'שמור' מחישוב. הוא מקבל פונקציה ומערך תלויות. בכל רינדור — אם התלויות לא השתנו, מחזיר את הערך השמור. אם כן — מריץ את הפונקציה ושומר תוצאה חדשה. שימושי לחישובים יקרים או להבטחת referential equality.",
      thinkingMethod: [
        "1. האם החישוב באמת יקר? (Profiler אומר?)",
        "2. או — האם אני צריך אותו object reference יציב?",
        "3. אילו ערכים החישוב תלוי בהם?",
        "4. האם useMemo עצמו לא יקר יותר מהחישוב? (overhead)",
        "5. האם זה מטופל יותר טוב עם React.memo במקום?",
      ],
      purpose:
        "המטרה היא אופטימיזציה — לדלג על חישובים יקרים שלא השתנו, ולשמור על referential equality למניעת רינדורים מיותרים.",
      codeSnippets: [
        {
          title: "חישוב יקר",
          code: "const sorted = useMemo(() => bigList.sort((a,b) => a.id - b.id), [bigList]);",
          explanation: "מיון יקר רץ רק כשbigList משתנה.",
        },
        {
          title: "Referential equality",
          code: "const config = useMemo(() => ({ id, type }), [id, type]);",
          explanation: "אותה הפניה כל עוד id ו-type לא השתנו — קומפוננטה ב-memo לא תרונדר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const sorted = useMemo(() => sort(arr), [arr]);",
          parts: [
            { piece: "useMemo", role: "Hook שמחזיר ערך שמור." },
            { piece: "() => sort(arr)", role: "הפונקציה שמחשבת את הערך." },
            { piece: "[arr]", role: "מערך תלויות — אם משתנה, החישוב רץ שוב." },
            { piece: "const sorted", role: "הערך המוחזר — שווה לערך השמור עד שהתלויות משתנות." },
          ],
          summary: "useMemo שומר את תוצאת sort בין רינדורים, ומחשב מחדש רק כש-arr משתנה.",
        },
      ],
    },
  },

  "lesson_24::expensive calculation": {
    extendedTab: {
      simpleGrandma:
        "סבתא, expensive calculation זה חישוב כבד — כמו לספור את כל הספרים בספרייה. עדיף לעשות פעם אחת ולזכור את המספר, ולא לספור מחדש בכל פעם.",
      simpleExplanation:
        "expensive calculation הוא חישוב שלוקח זמן ניכר (מיון אלפי איברים, חישובים מתמטיים מורכבים, סינון ענק). ב-React כדאי לעטוף אותם ב-useMemo כדי שלא יחזרו על עצמם בכל רינדור.",
      thinkingMethod: [
        "1. כמה זמן זה לוקח? (Profile)",
        "2. כמה פעמים מתבצע? (בכל רינדור?)",
        "3. האם יש pattern של תלויות יציבות?",
        "4. האם useMemo משתלם? (overhead שלו עצמו)",
        "5. האם אפשר לחשב פעם אחת מחוץ לקומפוננטה?",
      ],
      purpose:
        "המטרה היא להימנע מ-CPU וזיכרון מיותרים, ולשמור על UI חלק.",
      codeSnippets: [
        {
          title: "סינון יקר",
          code: "const filtered = useMemo(\n  () => hugeList.filter(item => item.matches(query)),\n  [hugeList, query]\n);",
          explanation: "הסינון רץ שוב רק אם hugeList או query השתנו.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useMemo(() => heavyCalc(data), [data])",
          parts: [
            { piece: "() => heavyCalc(data)", role: "הפונקציה היקרה." },
            { piece: "[data]", role: "תלות יחידה — רק data חשוב לחישוב." },
          ],
          summary: "הוצאת חישוב כבד תחת useMemo כדי שלא יחזור על עצמו לחינם.",
        },
      ],
    },
  },

  "lesson_24::memoization": {
    extendedTab: {
      simpleGrandma:
        "סבתא, memoization זה לזכור תשובות שכבר חישבת. כמו לרשום את התוצאה של 7×8 ולא לחשב שוב כשמישהו שואל.",
      simpleExplanation:
        "memoization היא טכניקת אופטימיזציה: שמירת תוצאות של פונקציה לפי הקלט שלה. אם אותו קלט מגיע שוב — מחזירים את התוצאה השמורה במקום לחשב מחדש. ב-React: useMemo (ערכים), useCallback (פונקציות), React.memo (קומפוננטות).",
      thinkingMethod: [
        "1. האם הפונקציה pure? (אותו קלט = אותו פלט)",
        "2. האם הקלט יציב? (פרימיטיבים = כן; אובייקטים = לא בלי useMemo)",
        "3. האם זה משתלם? (memoization עצמו עולה)",
        "4. אילו טכניקות מתאימות? (useMemo / useCallback / React.memo)",
        "5. האם זה מסבך את הקוד יותר מדי?",
      ],
      purpose:
        "המטרה היא להאיץ ביצועים על ידי הימנעות מחישובים חוזרים, וליצור referential stability.",
      codeSnippets: [
        {
          title: "שלוש טכניקות",
          code: "const value = useMemo(() => calc(x), [x]);\nconst fn = useCallback(() => doIt(x), [x]);\nconst Card = React.memo(({ data }) => <div>{data}</div>);",
          explanation: "ערך, פונקציה, וקומפוננטה — שלושת ה-memoization של React.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const Memo = React.memo(MyComp);",
          parts: [
            { piece: "React.memo", role: "פונקציה שיוצרת גרסת memoized של קומפוננטה." },
            { piece: "MyComp", role: "הקומפוננטה המקורית." },
            { piece: "Memo", role: "הקומפוננטה החדשה — לא תרונדר אם props לא השתנו." },
          ],
          summary: "React.memo משווה props רדודות; אם זהות — מדלג על הרינדור.",
        },
      ],
    },
  },

  "lesson_24::useRef": {
    extendedTab: {
      simpleGrandma:
        "סבתא, useRef זה כמו פתק שאת מחזיקה בכיס. את יכולה לשנות אותו או להציץ בו, אבל אף אחד לא רואה. זה לא 'state' — זה זיכרון פרטי שלא גורם לעדכון מסך.",
      simpleExplanation:
        "useRef הוא Hook שמחזיר אובייקט עם שדה current. אפשר לכתוב/לקרוא ממנו בלי לגרום ל-re-render. שני שימושים נפוצים: גישה ל-DOM element, או שמירת ערכים בין רינדורים שלא דורשים עדכון UI.",
      thinkingMethod: [
        "1. האם הערך משפיע על UI? (אם כן — useState; אם לא — useRef)",
        "2. האם אני צריך גישה ל-DOM? (input.focus, scroll)",
        "3. האם אני צריך לזכור ערך בין רינדורים בלי לגרום לעדכון? (timer id, previous value)",
        "4. האם אני קורא/כותב במהלך רינדור? (אסור — רק ב-effects/handlers)",
        "5. האם יש דרך אחרת? (state, props)",
      ],
      purpose:
        "המטרה היא לתת 'זיכרון שקט' לקומפוננטה — בלי לעדכן UI, ולגשת ל-DOM כשבאמת צריך.",
      codeSnippets: [
        {
          title: "focus על input",
          code: "const inputRef = useRef(null);\nuseEffect(() => { inputRef.current?.focus(); }, []);\nreturn <input ref={inputRef} />;",
          explanation: "מקבלים גישה ל-input ומפעילים focus אחרי mount.",
        },
        {
          title: "שמירת timer id",
          code: "const timerRef = useRef(null);\nfunction start() { timerRef.current = setInterval(...); }\nfunction stop() { clearInterval(timerRef.current); }",
          explanation: "שומרים את ה-id מבלי לגרום לרינדור.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const inputRef = useRef(null);\n<input ref={inputRef} />",
          parts: [
            { piece: "useRef(null)", role: "יוצר ref עם current התחלתי null." },
            { piece: "inputRef", role: "המשתנה — אובייקט עם current בלבד." },
            { piece: "ref={inputRef}", role: "React ימלא את inputRef.current עם ה-DOM element." },
          ],
          summary: "ref נוצר ב-useRef, וכשמוצמד ל-element React מציב אותו ב-current.",
        },
      ],
    },
  },

  "lesson_24::ref": {
    extendedTab: {
      simpleGrandma:
        "סבתא, ref זה התווית עם השם של הילד בגן. כך הגננת יודעת איזה ילד זה — ויכולה לקרוא לו ישירות.",
      simpleExplanation:
        "ref ב-React הוא prop מיוחד שמאפשר 'לתפוס' DOM element או instance של קומפוננטה. הוא נוצר עם useRef ומוצמד ל-element עם ref={...}. אחרי mount, current יכיל את ה-element.",
      thinkingMethod: [
        "1. למה אני צריך גישה ישירה? (focus, scroll, video.play)",
        "2. האם React לבד יכול לעשות את זה? (לרוב כן — אז לא צריך ref)",
        "3. האם זה DOM element או קומפוננטה? (לקומפוננטה צריך forwardRef)",
        "4. מתי לגשת? (בתוך useEffect — אחרי שה-element קיים)",
        "5. האם להיזהר מ-null? (עד mount הראשון current=null)",
      ],
      purpose:
        "המטרה היא לאפשר אינטראקציה ישירה עם DOM כשReact לבד לא מספיק — focus, מדידות, שילוב ספריות חיצוניות.",
      codeSnippets: [
        {
          title: "ref ל-DOM",
          code: "const ref = useRef(null);\n<div ref={ref}>...</div>;\nconsole.log(ref.current); // <div>",
          explanation: "ref מוצמד ל-div, current מצביע על האלמנט.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<input ref={inputRef} />",
          parts: [
            { piece: "ref=", role: "prop מיוחד — לא prop רגיל." },
            { piece: "{inputRef}", role: "אובייקט הref שיצרנו." },
          ],
          summary: "React רואה את ref ומציב את ה-DOM element ב-inputRef.current.",
        },
      ],
    },
  },

  "lesson_24::ref.current": {
    extendedTab: {
      simpleGrandma:
        "סבתא, ref.current זה התוכן של הפתק. ה-ref עצמו הוא הקופסה — current זה מה שיש בתוכה. שינוי ל-current לא מתריע ל-React.",
      simpleExplanation:
        "current הוא השדה היחיד של אובייקט ה-ref. אחרי mount, current מכיל את ה-DOM element (אם הוצמד) או את הערך שהציבו בו ידנית. שינוי current לא גורם ל-re-render — לכן זה מקום מצוין למידע 'מקפיא' כמו timer id, previous value, וכו'.",
      thinkingMethod: [
        "1. מתי current מאוכלס? (אחרי mount, ב-useEffect)",
        "2. האם current יכול להיות null? (כן — לפני mount, אחרי unmount)",
        "3. האם אני קורא בזמן רינדור? (אסור — נתונים שיכולים להשתנות)",
        "4. האם אני משנה current ב-handler או ב-useEffect? (כן)",
        "5. האם אני מצפה ל-re-render? (לא יקרה — אם צריך, השתמש ב-state)",
      ],
      purpose:
        "המטרה היא לתת מקום אחסון יציב שלא משפיע על מחזור הרינדור.",
      codeSnippets: [
        {
          title: "previous value pattern",
          code: "const prevRef = useRef();\nuseEffect(() => { prevRef.current = value; });\nconst prev = prevRef.current;",
          explanation: "שמירת הערך הקודם של state — ללא רינדור מיותר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "ref.current = newValue;",
          parts: [
            { piece: "ref.current", role: "השדה היחיד של אובייקט ה-ref." },
            { piece: "= newValue", role: "השמה ישירה — לא גורמת ל-re-render." },
          ],
          summary: "current הוא משתנה רגיל בתוך אובייקט — שינוי שקט ל-React.",
        },
      ],
    },
  },

  "lesson_24::DOM element": {
    extendedTab: {
      simpleGrandma:
        "סבתא, DOM element זה אלמנט אמיתי בדף — כפתור, תיבת טקסט, תמונה. ב-React אנחנו עובדים עם 'תיאורים' של אלמנטים, אבל מתחת לזה יש את האלמנטים האמיתיים.",
      simpleExplanation:
        "DOM element הוא אובייקט בדפדפן שמייצג אלמנט HTML אמיתי בעמוד. ב-React, ה-JSX יוצר Virtual DOM שמתורגם ל-DOM אמיתי. ref מאפשר גישה ישירה ל-DOM element כדי לבצע פעולות שאי אפשר באופן הצהרתי (focus, מדידה, בחירת טקסט).",
      thinkingMethod: [
        "1. האם React יודע לעשות את זה לבד? (לרוב כן)",
        "2. אם לא — האם ref ל-DOM הוא הפתרון הנכון?",
        "3. מה לעשות עם ה-element? (focus, scroll, getBoundingClientRect)",
        "4. מתי? (אחרי mount — בתוך useEffect)",
        "5. האם זה דליפת state עיוורת ל-React?",
      ],
      purpose:
        "מבחינים בין הציורים של React (JSX/Virtual DOM) לבין האלמנטים האמיתיים בדפדפן.",
      codeSnippets: [
        {
          title: "מדידת אלמנט",
          code: "const ref = useRef(null);\nuseEffect(() => {\n  const rect = ref.current.getBoundingClientRect();\n  console.log(rect.width);\n}, []);\nreturn <div ref={ref}>...</div>;",
          explanation: "מקבלים את גודל ה-div האמיתי בפיקסלים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "ref.current.scrollIntoView({ behavior: 'smooth' });",
          parts: [
            { piece: "ref.current", role: "ה-DOM element עצמו." },
            { piece: ".scrollIntoView", role: "מתודה של DOM — לא של React." },
            { piece: "{ behavior: 'smooth' }", role: "אופציה ל-scrolling חלק." },
          ],
          summary: "קוראים ישירות למתודות DOM דרך ref.current.",
        },
      ],
    },
  },

  "lesson_24::focus": {
    extendedTab: {
      simpleGrandma:
        "סבתא, focus זה כמו לסמן עם זרקור על שדה — כשהמשתמש פותח את הטופס, הסמן ישר נמצא בשדה הנכון, ואת לא צריכה ללחוץ עליו.",
      simpleExplanation:
        "focus היא מתודה של DOM elements שגורמת לאלמנט לקבל את ה'מיקוד' (לרוב input). למשל, אחרי שמודל נפתח — אנחנו רוצים שהמשתמש יוכל מיד להקליד. ב-React משתמשים ב-ref + useEffect לזה.",
      thinkingMethod: [
        "1. מתי לעשות focus? (אחרי mount? אחרי שינוי?)",
        "2. על איזה element?",
        "3. האם להבחין במקלדת מול עכבר? (autoFocus יכול להפריע)",
        "4. נגישות — האם זה מתאים?",
        "5. האם להחזיר focus אחרי סגירה?",
      ],
      purpose:
        "המטרה היא לשפר UX — להפנות את המשתמש לשדה הנכון בלי שיצטרך ללחוץ.",
      codeSnippets: [
        {
          title: "focus אוטומטי",
          code: "const inputRef = useRef();\nuseEffect(() => { inputRef.current?.focus(); }, []);\n<input ref={inputRef} />",
          explanation: "אחרי mount, ה-input יקבל focus מיד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "inputRef.current?.focus();",
          parts: [
            { piece: "inputRef.current", role: "ה-input element." },
            { piece: "?.", role: "Optional chaining — לא יקרוס אם current=null." },
            { piece: ".focus()", role: "מתודה של DOM — מעבירה את הסמן ל-input." },
          ],
          summary: "קוראים ל-focus דרך ה-ref, עם הגנה מ-null.",
        },
      ],
    },
  },

  "lesson_24::cleanup": {
    extendedTab: {
      simpleGrandma:
        "סבתא, cleanup זה לסדר אחרי עצמך. אם הדלקת אש (timer), כיבית אותה. אם פתחת חלון (listener), סגרת אותו. בלי זה — דליפות זיכרון.",
      simpleExplanation:
        "cleanup ב-useEffect היא פונקציה שמוחזרת מתוך ה-effect, ו-React מריץ אותה לפני ההפעלה הבאה ולפני unmount. תפקידה: לבטל timers, להסיר event listeners, לסגור חיבורים — כדי לא להשאיר 'זנבות' אחרי הקומפוננטה.",
      thinkingMethod: [
        "1. האם ה-effect יוצר משהו 'חי'? (timer, listener, חיבור)",
        "2. אם כן — איך לבטל אותו?",
        "3. האם הביטול חייב להתבצע גם אם ה-effect ירוץ שוב?",
        "4. האם הביטול יכול לקרות פעמיים? (idempotent?)",
        "5. האם cleanup מתבצע בסדר הנכון? (LIFO לפני הפעלה הבאה)",
      ],
      purpose:
        "המטרה היא למנוע דליפות זיכרון, baga עם state stale, ולשמור על אפליקציה יציבה.",
      codeSnippets: [
        {
          title: "cleanup ל-timer",
          code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);",
          explanation: "ה-cleanup מנקה את ה-timer לפני unmount.",
        },
        {
          title: "cleanup ל-listener",
          code: "useEffect(() => {\n  const onResize = () => setSize(window.innerWidth);\n  window.addEventListener('resize', onResize);\n  return () => window.removeEventListener('resize', onResize);\n}, []);",
          explanation: "מסירים את המאזין לפני unmount כדי למנוע דליפה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useEffect(() => {\n  const id = setInterval(...);\n  return () => clearInterval(id);\n}, []);",
          parts: [
            { piece: "const id = setInterval(...)", role: "יוצר טיימר ושומר את ה-id." },
            { piece: "return () => ...", role: "פונקציית cleanup — תרוץ לפני unmount." },
            { piece: "clearInterval(id)", role: "מבטל את הטיימר." },
          ],
          summary: "ה-cleanup מבטל את הטיימר כדי שלא ימשיך לרוץ אחרי unmount.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 25 — Tailwind CSS (14 concepts)
  // ============================================================================

  "lesson_25::Tailwind CSS": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Tailwind זה כמו ארגז כלים מוכן עם כל הברגים בגדלים שונים. במקום לכתוב CSS מאפס, לוקחים את הכלי המתאים (class) ושמים על האלמנט. אדום? text-red-500. גדול? text-2xl.",
      simpleExplanation:
        "Tailwind CSS היא ספריית CSS מסוג utility-first — מציעה אלפי class קטנים, כל אחד עושה דבר אחד. במקום לכתוב CSS משלך, מצרפים classes על האלמנט. התוצאה: עיצוב מהיר, עקבי, ו-CSS קטן יותר אחרי build (מה שלא בשימוש — נמחק).",
      thinkingMethod: [
        "1. איזה אפקט אני רוצה? (color, spacing, layout, typography)",
        "2. איזה class מציע את זה? (אינטואיטיבי: bg-blue-500)",
        "3. האם להוסיף responsive? (md:, lg:)",
        "4. האם להוסיף מצב? (hover:, focus:)",
        "5. האם זה חוזר על עצמו ב-3+ מקומות? (extract לקומפוננטה)",
      ],
      purpose:
        "המטרה היא לעצב מהר וביעילות, ללא קבצי CSS נפרדים, עם design system מובנה.",
      codeSnippets: [
        {
          title: "כפתור עם Tailwind",
          code: "<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>\n  לחץ\n</button>",
          explanation: "כל אחד מה-classes הוא utility בודד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "className='bg-blue-500 text-white py-2 px-4 rounded'",
          parts: [
            { piece: "bg-blue-500", role: "צבע רקע — כחול בעוצמה 500." },
            { piece: "text-white", role: "צבע טקסט — לבן." },
            { piece: "py-2", role: "padding אנכי — 0.5rem למעלה ולמטה." },
            { piece: "px-4", role: "padding אופקי — 1rem ימין ושמאל." },
            { piece: "rounded", role: "פינות מעוגלות." },
          ],
          summary: "צירוף של 5 utilities יוצר כפתור מעוצב במלואו.",
        },
      ],
    },
  },

  "lesson_25::utility classes": {
    extendedTab: {
      simpleGrandma:
        "סבתא, utility classes זה class קטנטן שעושה רק דבר אחד. כמו מברג שיש לו רק תפקיד אחד — להבריג. שמים על אלמנט class אחד = אפקט אחד.",
      simpleExplanation:
        "utility classes הן הבסיס של Tailwind: כל class עושה דבר אחד מסוים (text-red-500 = טקסט אדום). מצרפים כמה classes כדי ליצור עיצוב מורכב. היתרון: קל ללמוד, קל לקרוא, ו-class אחד לעולם לא 'דורס' אחר.",
      thinkingMethod: [
        "1. איזה אפקט בודד אני רוצה?",
        "2. האם יש utility ישיר לזה? (לרוב כן)",
        "3. אם לא — האם להשתמש ב-arbitrary value? (mt-[7px])",
        "4. האם הסדר משנה? (לרוב לא — Tailwind מסדר את הספציפיות)",
        "5. האם לעטוף ב-component אם חוזר?",
      ],
      purpose:
        "המטרה היא להחליף סגנונות מורכבים ב-classes קטנים, ברורים וניתנים לקריאה.",
      codeSnippets: [
        {
          title: "סוגי utilities",
          code: "// Color\ntext-red-500\nbg-blue-300\n// Spacing\np-4 m-2\n// Layout\nflex grid hidden\n// Typography\ntext-xl font-bold uppercase",
          explanation: "כל קטגוריה עם עשרות utilities.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<div class='flex gap-4 p-6 bg-gray-100'>",
          parts: [
            { piece: "flex", role: "display: flex" },
            { piece: "gap-4", role: "מרווח 1rem בין ילדים" },
            { piece: "p-6", role: "padding 1.5rem בכל הצדדים" },
            { piece: "bg-gray-100", role: "רקע אפור בהיר" },
          ],
          summary: "ארבעה utilities יוצרים container פלקס מעוצב.",
        },
      ],
    },
  },

  "lesson_25::responsive design": {
    extendedTab: {
      simpleGrandma:
        "סבתא, responsive design זה כמו בגד שמתאים את עצמו לכל גוף. הדף נראה טוב גם במחשב גדול וגם בטלפון קטן.",
      simpleExplanation:
        "responsive design הוא עיצוב שמתאים את עצמו לגדלי מסך שונים. ב-Tailwind משתמשים בקידומות (sm:, md:, lg:, xl:, 2xl:) כדי להחיל classes רק מגודל מסוים ומעלה. המוטו: mobile-first — מתחילים מהקטן ומוסיפים ל-גדול.",
      thinkingMethod: [
        "1. איך זה נראה בטלפון? (נקודת ההתחלה)",
        "2. איך זה צריך להיראות ב-tablet? (md:)",
        "3. איך במחשב? (lg:)",
        "4. אילו utilities משתנות?",
        "5. האם בדקתי ב-DevTools במצב מובייל?",
      ],
      purpose:
        "המטרה היא לתת חוויה אופטימלית בכל מכשיר — מטלפון 320px ועד מסך 1920px.",
      codeSnippets: [
        {
          title: "Layout responsive",
          code: "<div class='flex flex-col md:flex-row gap-4'>\n  <aside class='w-full md:w-64'>...</aside>\n  <main class='flex-1'>...</main>\n</div>",
          explanation: "במובייל — אנכי. ב-md ומעלה — אופקי, sidebar בצד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='text-sm md:text-base lg:text-lg'",
          parts: [
            { piece: "text-sm", role: "טקסט קטן — ברירת מחדל (כל הגדלים)." },
            { piece: "md:text-base", role: "ב-md (768px+) — גודל בסיסי." },
            { piece: "lg:text-lg", role: "ב-lg (1024px+) — גודל גדול." },
          ],
          summary: "טקסט שגדל בהדרגה לפי גודל המסך.",
        },
      ],
    },
  },

  "lesson_25::flex": {
    extendedTab: {
      simpleGrandma:
        "סבתא, flex זה כמו לסדר מצרכים בשורה אחת. הוא גם מאפשר לשלוט: בצד שמאל? באמצע? במרחק שווה? הכל בקליק.",
      simpleExplanation:
        "flex (display: flex) הוא מודל פריסה שב-CSS שמסדר אלמנטים בשורה או בעמודה, עם שליטה במרווחים, ביישור ובסידור. ב-Tailwind: flex להפעלה, flex-row/flex-col לכיוון, justify-* ו-items-* לסידור.",
      thinkingMethod: [
        "1. שורה (row) או עמודה (col)?",
        "2. איך לסדר לאורך הציר? (justify-*)",
        "3. איך לסדר לרוחב הציר? (items-*)",
        "4. עטיפה? (flex-wrap)",
        "5. גודל ילדים? (flex-1, flex-auto)",
      ],
      purpose:
        "המטרה היא ליצור פריסה אנכית/אופקית גמישה ללא float או table-layout.",
      codeSnippets: [
        {
          title: "flex אופייני",
          code: "<div class='flex justify-between items-center gap-4'>\n  <span>שמאל</span>\n  <span>ימין</span>\n</div>",
          explanation: "שני אלמנטים, אחד בכל קצה, יישור אנכי במרכז.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='flex justify-center items-center gap-4'",
          parts: [
            { piece: "flex", role: "display: flex" },
            { piece: "justify-center", role: "מרכז את הילדים על הציר הראשי (אופקית)." },
            { piece: "items-center", role: "מרכז את הילדים על הציר המשני (אנכית)." },
            { piece: "gap-4", role: "מרווח 1rem בין ילדים." },
          ],
          summary: "מרכוז מושלם בשני הצירים, עם מרווח בין ילדים.",
        },
      ],
    },
  },

  "lesson_25::grid": {
    extendedTab: {
      simpleGrandma:
        "סבתא, grid זה כמו טבלה — שורות ועמודות. את אומרת 'אני רוצה 3 עמודות' והאלמנטים מסתדרים אוטומטית בטבלה.",
      simpleExplanation:
        "grid (display: grid) הוא מודל פריסה דו-ממדי — שורות ועמודות. שונה מ-flex שהוא חד-ממדי. ב-Tailwind: grid-cols-N למספר עמודות, gap-N למרווחים, col-span-N לאלמנט שתופס מספר עמודות.",
      thinkingMethod: [
        "1. כמה עמודות? (grid-cols-3)",
        "2. כמה שורות? (grid-rows-N — לרוב אוטומטי)",
        "3. מרווחים? (gap-N)",
        "4. responsive? (md:grid-cols-3 lg:grid-cols-4)",
        "5. אלמנטים שמשתרעים? (col-span-2)",
      ],
      purpose:
        "המטרה היא ליצור פריסות מורכבות (galleries, dashboards, cards) בקלות, עם שליטה בשני ממדים.",
      codeSnippets: [
        {
          title: "Grid responsive",
          code: "<div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>\n  {items.map(i => <Card key={i.id} {...i} />)}\n</div>",
          explanation: "במובייל עמודה אחת, ב-md שתיים, ב-lg שלוש.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='grid grid-cols-3 gap-4'",
          parts: [
            { piece: "grid", role: "display: grid" },
            { piece: "grid-cols-3", role: "3 עמודות שווות ברוחב." },
            { piece: "gap-4", role: "מרווח של 1rem בין כל cell." },
          ],
          summary: "פריסת grid של 3 עמודות עם מרווחים.",
        },
      ],
    },
  },

  "lesson_25::padding": {
    extendedTab: {
      simpleGrandma:
        "סבתא, padding זה הריווח שבתוך הקופסה — בין הגבול לתוכן. כמו השוליים מסביב לטקסט בעמוד.",
      simpleExplanation:
        "padding ב-CSS הוא רווח פנימי של אלמנט — בין הגבול שלו לתוכן. ב-Tailwind: p-N לכל הצדדים, px-N לאופקי בלבד, py-N לאנכי, pt/pb/pl/pr לצד ספציפי. כל יחידה = 0.25rem (=4px ברירת מחדל).",
      thinkingMethod: [
        "1. כמה רווח אני צריך?",
        "2. בכל הצדדים או רק בכמה?",
        "3. responsive? (p-2 md:p-4)",
        "4. האם קומפוננטה אחרת ספגה? (margin עליה)",
        "5. האם זה padding או margin שצריך? (פנימי vs חיצוני)",
      ],
      purpose:
        "המטרה היא ליצור 'נשימה' בין תוכן לגבול האלמנט, ולשפר קריאות.",
      codeSnippets: [
        {
          title: "padding utilities",
          code: "<div class='p-4'>...</div>      // 1rem בכל הצדדים\n<div class='px-6 py-2'>...</div>// 1.5rem אופקי, 0.5rem אנכי\n<div class='pt-8'>...</div>     // רק למעלה",
          explanation: "אפשרויות שונות לציון padding ספציפי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='px-6 py-3'",
          parts: [
            { piece: "px-6", role: "padding-left + padding-right = 1.5rem." },
            { piece: "py-3", role: "padding-top + padding-bottom = 0.75rem." },
          ],
          summary: "כפתור טיפוסי: רחב יותר מאשר גבוה.",
        },
      ],
    },
  },

  "lesson_25::bg color": {
    extendedTab: {
      simpleGrandma:
        "סבתא, bg color זה צבע הרקע. כמו לצבוע את הקיר של החדר — הרקע של האלמנט מקבל צבע.",
      simpleExplanation:
        "Tailwind מציע פלטה רחבה של צבעים בעוצמות שונות. הסינטקס: bg-{color}-{shade}. למשל bg-blue-500 = כחול בעוצמה בינונית. צבעים: gray, red, blue, green, yellow, purple, וכו'. עוצמות: 50, 100, 200, ..., 900.",
      thinkingMethod: [
        "1. איזה צבע מתאים ל-design?",
        "2. עוצמה? (50 = כמעט לבן, 900 = כמעט שחור)",
        "3. ניגוד עם הטקסט? (light bg → dark text, ולהיפך)",
        "4. dark mode? (dark:bg-gray-800)",
        "5. hover state? (hover:bg-blue-600)",
      ],
      purpose:
        "המטרה היא להחיל צבע רקע באמצעות class יחיד, עם פלטה עקבית בכל הפרויקט.",
      codeSnippets: [
        {
          title: "כפתור צבעוני",
          code: "<button class='bg-indigo-600 hover:bg-indigo-700 text-white'>\n  Click\n</button>",
          explanation: "צבע בסיסי + צבע hover.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='bg-red-500 hover:bg-red-700'",
          parts: [
            { piece: "bg-red-500", role: "אדום בינוני — ברירת מחדל." },
            { piece: "hover:bg-red-700", role: "אדום כהה כשעוברים עם העכבר." },
          ],
          summary: "שינוי צבע ב-hover — UX טוב.",
        },
      ],
    },
  },

  "lesson_25::rounded": {
    extendedTab: {
      simpleGrandma:
        "סבתא, rounded זה לעגל פינות. במקום קופסה עם פינות חדות, הקופסה נראית רכה ומודרנית.",
      simpleExplanation:
        "rounded ב-Tailwind מעגל את הפינות של אלמנט. אפשרויות: rounded (קל), rounded-md, rounded-lg, rounded-xl, rounded-full (עיגול מלא). אפשר גם פינות ספציפיות: rounded-t-lg (רק למעלה), rounded-r (רק ימין).",
      thinkingMethod: [
        "1. איזה רמה של עיגול? (קל → מלא)",
        "2. כל הפינות או רק חלק?",
        "3. עיגול מלא? (rounded-full לתמונות עגולות)",
        "4. עקבי בכל הפרויקט?",
        "5. responsive? (rounded-md md:rounded-xl)",
      ],
      purpose:
        "המטרה היא לרכך את ה-design ולהוסיף תחושת מודרניות לאלמנטים.",
      codeSnippets: [
        {
          title: "תמונה עגולה",
          code: "<img class='w-12 h-12 rounded-full' src='avatar.jpg' />",
          explanation: "rounded-full + רוחב=גובה = עיגול מושלם.",
        },
      ],
      codeBreakdowns: [
        {
          code: "class='rounded-lg shadow-md'",
          parts: [
            { piece: "rounded-lg", role: "פינות מעוגלות בינוני (0.5rem)." },
            { piece: "shadow-md", role: "צל בינוני — מוסיף עומק." },
          ],
          summary: "כרטיס עם פינות רכות וצל קל.",
        },
      ],
    },
  },

  "lesson_25::Tailwind installation": {
    extendedTab: {
      simpleGrandma:
        "סבתא, התקנת Tailwind זה כמו להכניס את ארגז הכלים לבית. אחרי זה את יכולה להשתמש בכל הכלים שיש בו.",
      simpleExplanation:
        "התקנת Tailwind ב-Vite: 1) npm install -D tailwindcss postcss autoprefixer, 2) npx tailwindcss init -p, 3) הגדרת content ב-tailwind.config.js, 4) הוספת @tailwind directives ב-CSS הראשי.",
      thinkingMethod: [
        "1. באיזה build tool אני משתמש? (Vite, Next, CRA)",
        "2. האם התקנתי את כל החבילות?",
        "3. האם content ב-config מצביע על קבצי source?",
        "4. האם הוספתי את ה-directives ב-CSS?",
        "5. האם הוספתי את ה-CSS ל-main.jsx?",
      ],
      purpose:
        "המטרה היא להפעיל את Tailwind בפרויקט ולהבטיח ש-classes לא בשימוש יוסרו ב-build.",
      codeSnippets: [
        {
          title: "tailwind.config.js",
          code: "module.exports = {\n  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],\n  theme: { extend: {} },\n  plugins: [],\n};",
          explanation: "content מציין איפה לחפש classes — חיוני ל-tree-shaking.",
        },
        {
          title: "index.css",
          code: "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
          explanation: "שלוש directives שמייבאות את כל ה-CSS של Tailwind.",
        },
      ],
      codeBreakdowns: [
        {
          code: "content: ['./src/**/*.{jsx,tsx}']",
          parts: [
            { piece: "content", role: "אילו קבצים לסרוק כדי לדעת אילו classes להשאיר ב-build." },
            { piece: "'./src/**/*.{jsx,tsx}'", role: "Glob — כל קבצי jsx/tsx ב-src." },
          ],
          summary: "Tailwind סורק את הקבצים האלה ומסיר את ה-CSS שלא בשימוש.",
        },
      ],
    },
  },

  "lesson_25::rating": {
    extendedTab: {
      simpleGrandma:
        "סבתא, rating זה דירוג בכוכבים — איך הסרט היה? 5 כוכבים מצוין, 1 כוכב גרוע. כמו בעיתון של בקרת מסעדות.",
      simpleExplanation:
        "rating בקומפוננטה ב-React: state של מספר כוכבים, לולאה שמציגה אותם כ-icons (מלאים/ריקים), ו-onClick לעדכון. שילוב פשוט של state + map + Tailwind מציג דירוג אינטראקטיבי.",
      thinkingMethod: [
        "1. כמה כוכבים מקסימום? (5)",
        "2. איזה ערך נוכחי? (state)",
        "3. מילוי או חצי כוכב?",
        "4. האם ניתן ללחוץ או רק להציג?",
        "5. עיצוב — צבע מלא vs ריק?",
      ],
      purpose:
        "המטרה היא לתת UX אינטואיטיבי לדירוג של פריט.",
      codeSnippets: [
        {
          title: "Rating בסיסי",
          code: "function Rating({ value, onChange }) {\n  return [1,2,3,4,5].map(n => (\n    <span key={n} onClick={() => onChange(n)}\n      className={n <= value ? 'text-yellow-400' : 'text-gray-300'}>★</span>\n  ));\n}",
          explanation: "כוכבים מלאים עד value, אחר כך אפורים. לחיצה מעדכנת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "className={n <= value ? 'text-yellow-400' : 'text-gray-300'}",
          parts: [
            { piece: "n <= value", role: "האם הכוכב הזה צריך להיות מלא?" },
            { piece: "? 'text-yellow-400'", role: "אם כן — צהוב." },
            { piece: ": 'text-gray-300'", role: "אחרת — אפור." },
          ],
          summary: "ternary שמשנה class לפי תנאי.",
        },
      ],
    },
  },

  "lesson_25::search": {
    extendedTab: {
      simpleGrandma:
        "סבתא, search זה לחפש בתוך רשימה. כמו לחפש שם בחוברת טלפונים — את כותבת אותיות, ורק השמות שמתחילים בהן מופיעים.",
      simpleExplanation:
        "search בקומפוננטה: state של query, input controlled, וסינון של מערך פריטים לפי includes/regex. אפשר לשפר עם debounce כדי לא לסנן בכל הקלדה. תצוגה בזמן אמת מספקת UX מצוין.",
      thinkingMethod: [
        "1. מה אני מחפש? (טקסט בשם? בכל השדות?)",
        "2. case-sensitive? (לרוב לא — toLowerCase)",
        "3. החלפה מהירה או debounce?",
        "4. אם אין תוצאות — מה להציג?",
        "5. הדגשת ההתאמה?",
      ],
      purpose:
        "המטרה היא לאפשר למשתמש למצוא פריט במהירות ברשימה גדולה.",
      codeSnippets: [
        {
          title: "סינון בזמן אמת",
          code: "const [q, setQ] = useState('');\nconst filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));",
          explanation: "הסינון רץ בכל רינדור — אם הרשימה ענקית, שווה useMemo + debounce.",
        },
      ],
      codeBreakdowns: [
        {
          code: "items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()))",
          parts: [
            { piece: "items.filter", role: "יוצרת מערך חדש." },
            { piece: "i.name.toLowerCase()", role: "השם באותיות קטנות — להשוואה case-insensitive." },
            { piece: ".includes(q.toLowerCase())", role: "האם השם כולל את ה-query?" },
          ],
          summary: "סינון case-insensitive לפי includes.",
        },
      ],
    },
  },

  "lesson_25::add/delete movie": {
    extendedTab: {
      simpleGrandma:
        "סבתא, add/delete movie זה ניהול רשימת סרטים — להוסיף סרט חדש לרשימה, ולמחוק סרט קיים. כמו רשימת DVD בבית.",
      simpleExplanation:
        "add/delete movie הם דפוסי CRUD בסיסיים: state של מערך סרטים, פונקציה add שמוסיפה סרט חדש (immutable update), ו-delete שמוציאה סרט לפי id (filter). שילוב של form, state ו-list.",
      thinkingMethod: [
        "1. מה הסכמה של סרט? (id, title, year, rating)",
        "2. איך מוסיפים? (form + state)",
        "3. איך מוחקים? (filter לפי id)",
        "4. ולידציה?",
        "5. localStorage לשמירה?",
      ],
      purpose:
        "המטרה היא לתרגל את כל מחזור החיים של פריט באפליקציה — יצירה, הצגה, מחיקה.",
      codeSnippets: [
        {
          title: "add + delete",
          code: "function add(movie) { setMovies([...movies, { id: Date.now(), ...movie }]); }\nfunction del(id) { setMovies(movies.filter(m => m.id !== id)); }",
          explanation: "שתי פונקציות מינימליות, immutable.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setMovies([...movies, { id: Date.now(), ...movie }])",
          parts: [
            { piece: "[...movies, ...]", role: "מערך חדש עם הקיימים + פריט נוסף." },
            { piece: "id: Date.now()", role: "id ייחודי — timestamp." },
            { piece: "...movie", role: "spread של שאר השדות מהאובייקט שנשלח." },
          ],
          summary: "מוסיף פריט חדש עם id אוטומטי, שומר על immutability.",
        },
      ],
    },
  },

  "lesson_25::validation": {
    extendedTab: {
      simpleGrandma:
        "סבתא, validation זה לבדוק שהמשתמש מילא נכון. אם השדה ריק או שהמייל לא חוקי — להגיד 'תקן את זה' לפני שתמשיך.",
      simpleExplanation:
        "validation היא בדיקת תקינות של קלט המשתמש. ב-React: בודקים את ה-state של השדה (ארוך מספיק? מכיל @? וכו'), שומרים שגיאות ב-state, ומציגים אותן ליד השדה. מונעים submit עד שהכל תקין.",
      thinkingMethod: [
        "1. אילו שדות חובה?",
        "2. איזה פורמט נכון? (email, מספר, אורך)",
        "3. מתי לבדוק? (בכל שינוי? בעזיבה? בשליחה?)",
        "4. איך להציג שגיאה? (טקסט אדום מתחת לשדה)",
        "5. האם להשתמש בספרייה? (Zod, Yup, react-hook-form)",
      ],
      purpose:
        "המטרה היא להבטיח שהנתונים תקינים לפני שליחה לשרת, ולתת למשתמש משוב מיידי.",
      codeSnippets: [
        {
          title: "validation בסיסי",
          code: "const error = email.includes('@') ? null : 'מייל לא חוקי';\n<input value={email} onChange={...} />\n{error && <p className='text-red-500'>{error}</p>}",
          explanation: "בדיקה פשוטה והצגת שגיאה אם קיימת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "{error && <p className='text-red-500'>{error}</p>}",
          parts: [
            { piece: "{error && ...}", role: "Conditional rendering — מציג רק אם error truthy." },
            { piece: "<p className='text-red-500'>", role: "פסקה אדומה." },
            { piece: "{error}", role: "טקסט השגיאה." },
          ],
          summary: "מציג שגיאה אדומה מתחת לשדה כשיש בעיה.",
        },
      ],
    },
  },

  "lesson_25::navbar": {
    extendedTab: {
      simpleGrandma:
        "סבתא, navbar זה התפריט בראש הדף. שם יש קישורים לדפים שונים — בית, אודות, צור קשר. הוא נשאר תמיד למעלה.",
      simpleExplanation:
        "navbar (navigation bar) היא קומפוננטה שמציגה תפריט ניווט — לרוב בראש הדף. כוללת לוגו, קישורים לדפים, וכפתורי auth. ב-React + Router: <nav> + <Link> לכל יעד. ב-Tailwind: flex, justify-between, ו-responsive עם תפריט המבורגר.",
      thinkingMethod: [
        "1. אילו קישורים יש?",
        "2. איך זה נראה במובייל? (המבורגר?)",
        "3. האם יש active state?",
        "4. sticky או רגיל?",
        "5. dark mode?",
      ],
      purpose:
        "המטרה היא לתת למשתמש דרך עקבית וזמינה לנווט בכל הדפים של האפליקציה.",
      codeSnippets: [
        {
          title: "navbar בסיסי עם Tailwind",
          code: "<nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>\n  <Link to='/' className='font-bold'>Logo</Link>\n  <div className='flex gap-4'>\n    <Link to='/about'>אודות</Link>\n    <Link to='/contact'>צור קשר</Link>\n  </div>\n</nav>",
          explanation: "navbar בסיסי — לוגו משמאל, קישורים מימין.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<nav className='flex justify-between items-center p-4'>",
          parts: [
            { piece: "<nav>", role: "אלמנט סמנטי לתפריט ניווט." },
            { piece: "flex", role: "פריסת flex." },
            { piece: "justify-between", role: "ילדים מתפזרים — אחד בכל קצה." },
            { piece: "items-center", role: "יישור אנכי במרכז." },
            { piece: "p-4", role: "padding 1rem בכל הצדדים." },
          ],
          summary: "navbar עם פריסת flex — לוגו בקצה אחד, תפריט בקצה השני.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 26 — TypeScript Basics (30 concepts)
  // ============================================================================

  "lesson_26::TypeScript": {
    extendedTab: {
      simpleGrandma:
        "סבתא, TypeScript זה כמו תוויות על קופסאות במזווה. במקום לפתוח כל קופסה כדי לראות מה בפנים, התווית אומרת לך 'אורז', 'סוכר', 'מלח'. כך פחות טעויות.",
      simpleExplanation:
        "TypeScript הוא 'הרחבה' של JavaScript עם מערכת טיפוסים. כותבים את הקוד כמו ב-JS, אבל מוסיפים תיוגי טיפוסים (string, number, etc.). המהדר (compiler) בודק אם הטיפוסים תואמים, מזהה שגיאות לפני הרצה, ומספק השלמה אוטומטית מצוינת.",
      thinkingMethod: [
        "1. איזה טיפוס יש למשתנה?",
        "2. איזה טיפוס מחזירה הפונקציה?",
        "3. אילו פרמטרים היא מקבלת?",
        "4. האם השדה אופציונלי? (?)",
        "5. האם השגיאה היא בזמן compile (טוב!) או runtime?",
      ],
      purpose:
        "המטרה היא לתפוס שגיאות מוקדם, לשפר תיעוד עצמי של הקוד, ולקבל IDE חכם יותר.",
      codeSnippets: [
        {
          title: "טיפוסים בסיסיים",
          code: "let name: string = 'דני';\nlet age: number = 30;\nlet active: boolean = true;",
          explanation: "כל משתנה מוצהר עם טיפוס מפורש.",
        },
        {
          title: "פונקציה עם טיפוסים",
          code: "function add(a: number, b: number): number {\n  return a + b;\n}",
          explanation: "פרמטרים וטיפוס החזרה — מפורשים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function add(a: number, b: number): number { return a + b; }",
          parts: [
            { piece: "(a: number, b: number)", role: "פרמטרים — שניהם חייבים להיות number." },
            { piece: ": number", role: "טיפוס ההחזרה — חייב להיות number." },
            { piece: "return a + b", role: "התוצאה — number." },
          ],
          summary: "פונקציה type-safe — TS יזהיר אם תקרא לה עם string או תחזיר ערך לא-number.",
        },
      ],
    },
  },

  "lesson_26::Strongly Typed": {
    extendedTab: {
      simpleGrandma:
        "סבתא, strongly typed זה כמו פעולות מתמטיות — אסור לחבר מספר עם תפוז. ב-TypeScript: לא חוברים string ל-number, לא קוראים למשתנה כפונקציה.",
      simpleExplanation:
        "שפה strongly typed היא שפה שאוכפת התאמה מדויקת בין טיפוסים — אי אפשר 'לערבב' string עם number בשתיקה. JavaScript הוא weakly typed (מנסה להמיר). TypeScript הופך את JavaScript ל-strongly typed בזמן compile.",
      thinkingMethod: [
        "1. האם הטיפוסים תואמים?",
        "2. אם לא — האם להמיר במפורש? (Number(x), String(x))",
        "3. או האם לעדכן את ההגדרות?",
        "4. האם כפיתי טיפוס בכוח? (as) — אזהרה!",
        "5. האם הטיפוסים מספיק ספציפיים?",
      ],
      purpose:
        "המטרה היא למנוע באגים שבהם ערך מטיפוס אחד מועבר במקום שמצפה לאחר.",
      codeSnippets: [
        {
          title: "JS — חלש",
          code: "5 + '5'  // '55' — לא מה שרצינו",
          explanation: "JS ממיר אוטומטית — לא תמיד בכיוון הצפוי.",
        },
        {
          title: "TS — חזק",
          code: "let x: number = 5;\nx = '5'; // ❌ Error: Type 'string' is not assignable to type 'number'",
          explanation: "TS מסרב להציב string במשתנה number.",
        },
      ],
      codeBreakdowns: [
        {
          code: "let count: number = 5;\ncount = 'hello'; // Error",
          parts: [
            { piece: "let count: number", role: "משתנה מוגדר כ-number." },
            { piece: "= 5", role: "הצבה תקינה — 5 הוא number." },
            { piece: "count = 'hello'", role: "ניסיון להציב string — TS יכשיל את ה-compile." },
          ],
          summary: "TS מבטיח שהטיפוס נשמר לאורך כל חיי המשתנה.",
        },
      ],
    },
  },

  "lesson_26::Compiler": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Compiler זה מתרגם. את כותבת בעברית, והוא מתרגם לאנגלית שהמחשב מבין. ב-TypeScript הוא מתרגם את ה-TS שלך ל-JS שדפדפן יכול להריץ.",
      simpleExplanation:
        "Compiler (מהדר) הוא תוכנה שלוקחת קוד מקור (TypeScript) וממירה אותו לקוד אחר (JavaScript). תוך כדי, הוא בודק שגיאות טיפוס. הקוד JS שיוצא הוא שמרץ בדפדפן/Node.",
      thinkingMethod: [
        "1. מה גרסת ה-TS שלי?",
        "2. ל-איזה גרסת JS אני מהדר? (target)",
        "3. אילו שגיאות הוא מצא?",
        "4. האם יש לי tsconfig שמנהל הכל?",
        "5. האם הוא רץ ב-watch mode?",
      ],
      purpose:
        "המטרה היא לתרגם TS ל-JS תוך אכיפת חוקי הטיפוסים — שגיאה בזמן compile עוצרת build.",
      codeSnippets: [
        {
          title: "הרצת ה-compiler",
          code: "tsc          // הידור פעם אחת\ntsc --watch  // הידור מתמיד",
          explanation: "הפקודה tsc מהדרת לפי tsconfig.json.",
        },
      ],
      codeBreakdowns: [
        {
          code: "tsc --watch",
          parts: [
            { piece: "tsc", role: "TypeScript Compiler — הפקודה." },
            { piece: "--watch", role: "מצב מעקב — מהדר מחדש כל שינוי בקובץ." },
          ],
          summary: "מצב פיתוח אופייני — שינוי בקוד = compile מיידי.",
        },
      ],
    },
  },

  "lesson_26::tsc": {
    extendedTab: {
      simpleGrandma:
        "סבתא, tsc זה השם של ה'מתרגם'. כותבים בטרמינל tsc — וכל קבצי ה-TS שלך מתורגמים ל-JS.",
      simpleExplanation:
        "tsc (TypeScript Compiler) הוא הפקודה של מהדר TypeScript. הוא קורא את tsconfig.json, מהדר את כל קבצי ה-.ts לקבצי .js. ניתן להריץ פעם אחת או במצב watch (ממשיך לעקוב אחרי שינויים).",
      thinkingMethod: [
        "1. האם tsc מותקן? (npm install -D typescript)",
        "2. האם יש tsconfig.json?",
        "3. האם יש שגיאות compile?",
        "4. לאן הקבצים מועברים? (outDir)",
        "5. האם להריץ ב-watch?",
      ],
      purpose:
        "המטרה היא להפעיל את המהדר ולקבל קבצי JS מוכנים להרצה.",
      codeSnippets: [
        {
          title: "הרצה",
          code: "npx tsc                    // הידור חד-פעמי\nnpx tsc --watch            // עוקב אחרי שינויים\nnpx tsc --noEmit           // רק בודק טיפוסים, בלי לכתוב JS",
          explanation: "אופציות שונות של tsc.",
        },
      ],
      codeBreakdowns: [
        {
          code: "npx tsc --noEmit",
          parts: [
            { piece: "npx", role: "מריץ פקודה מתוך node_modules." },
            { piece: "tsc", role: "TypeScript Compiler." },
            { piece: "--noEmit", role: "אל תכתוב קבצי JS — רק בדוק שגיאות." },
          ],
          summary: "שימושי ל-CI: בודק טיפוסים בלי לייצר פלט.",
        },
      ],
    },
  },

  "lesson_26::.ts": {
    extendedTab: {
      simpleGrandma:
        "סבתא, .ts זה הסיומת של קבצי TypeScript. כמו .js ל-JavaScript, .docx ל-Word — הסיומת אומרת איזה סוג קובץ זה.",
      simpleExplanation:
        ".ts היא סיומת קבצי TypeScript — קבצי קוד עם תמיכת טיפוסים. עבור React משתמשים ב-.tsx (כדי לאפשר JSX). המהדר ממיר אותם ל-.js.",
      thinkingMethod: [
        "1. האם הקובץ מכיל JSX? (אז .tsx)",
        "2. אם לא — .ts מספיק.",
        "3. האם הוא מיוצא? (export)",
        "4. האם הטיפוסים מוגדרים?",
        "5. האם הוא נכלל ב-tsconfig (include)?",
      ],
      purpose:
        "המטרה היא להבדיל בין קבצים שמכילים TypeScript לבין JavaScript טהור.",
      codeSnippets: [
        {
          title: "סיומות",
          code: "user.ts       // קוד TypeScript רגיל\nButton.tsx    // קומפוננטת React עם TypeScript\nutils.js      // JavaScript רגיל (אפשר לערב)",
          explanation: "ב-TS יכולים להתקיים גם קבצי JS — ניתן להמיר בהדרגה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "// user.ts\nexport interface User { name: string; }",
          parts: [
            { piece: "user.ts", role: "קובץ TypeScript בלי JSX." },
            { piece: "export interface", role: "מייצא טיפוס לשימוש בקבצים אחרים." },
          ],
          summary: ".ts מתאים לקובצי לוגיקה ולמודלים.",
        },
      ],
    },
  },

  "lesson_26::.js": {
    extendedTab: {
      simpleGrandma:
        "סבתא, .js זה הסיומת של JavaScript הרגיל. בלי טיפוסים, בלי בדיקות. כל דפדפן יכול להריץ.",
      simpleExplanation:
        ".js היא סיומת קבצי JavaScript הקלאסיים. ב-pure JS פרויקט אין בדיקות טיפוס. בפרויקט TS אפשר לערב קבצי .js — TS פשוט מטפל בהם בלי בדיקות (אלא אם מפעילים allowJs/checkJs).",
      thinkingMethod: [
        "1. למה הקובץ הזה .js ולא .ts?",
        "2. האם להמיר אותו? (mv x.js x.ts)",
        "3. אילו שגיאות יקפצו אחרי המרה?",
        "4. האם להוסיף any זמני?",
        "5. האם זה קוד צד-שלישי שלא משנה?",
      ],
      purpose:
        "מבחינים בין .js (ללא טיפוסים) ל-.ts (עם טיפוסים) — שני פורמטים שיכולים לחיות בפרויקט אחד.",
      codeSnippets: [
        {
          title: "המרה הדרגתית",
          code: "// step 1: קובץ .js עובד\n// step 2: שנה ל-.ts — קומפיילר יזהיר על any implicit\n// step 3: הוסף טיפוסים אחד-אחד",
          explanation: "אסטרטגיה נפוצה בפרויקטים גדולים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "// allowJs in tsconfig\n{ \"compilerOptions\": { \"allowJs\": true } }",
          parts: [
            { piece: "allowJs: true", role: "מאפשר ערוב של .js עם .ts." },
          ],
          summary: "אופציה שמאפשרת מעבר הדרגתי מ-JS ל-TS.",
        },
      ],
    },
  },

  "lesson_26::tsconfig.json": {
    extendedTab: {
      simpleGrandma:
        "סבתא, tsconfig.json זה ספר ההוראות של TypeScript בפרויקט שלך. הוא אומר 'אילו קבצים לבדוק', 'איזו רמת קפדנות', 'איזה גרסה של JS לייצר'.",
      simpleExplanation:
        "tsconfig.json הוא קובץ הגדרות של פרויקט TypeScript. הוא קובע: אילו קבצים לכלול (include/exclude), איזה רמת קפדנות (strict), לאן לכתוב (outDir), איזה JS target, מודולים, JSX, ועוד עשרות אפשרויות.",
      thinkingMethod: [
        "1. אילו קבצים נכללים? (include)",
        "2. איזה JS target? (es2020, es2022, esnext)",
        "3. strict mode? (כדאי כן)",
        "4. JSX? (react, react-jsx)",
        "5. paths/baseUrl? (לקיצורי import)",
      ],
      purpose:
        "המטרה היא להגדיר במקום אחד את כל ההתנהגות של ה-compiler והפרויקט.",
      codeSnippets: [
        {
          title: "tsconfig טיפוסי לReact",
          code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"jsx\": \"react-jsx\",\n    \"strict\": true,\n    \"esModuleInterop\": true\n  },\n  \"include\": [\"src\"]\n}",
          explanation: "מינימום נדרש לפרויקט React + TS.",
        },
      ],
      codeBreakdowns: [
        {
          code: "{ \"compilerOptions\": { \"strict\": true } }",
          parts: [
            { piece: "compilerOptions", role: "אובייקט הגדרות של ה-compiler." },
            { piece: "strict: true", role: "מפעיל את כל החוקים המחמירים — מומלץ." },
          ],
          summary: "strict מפעיל noImplicitAny, strictNullChecks, ועוד — איכות גבוהה.",
        },
      ],
    },
  },

  "lesson_26::type annotation": {
    extendedTab: {
      simpleGrandma:
        "סבתא, type annotation זה לכתוב ליד המשתנה איזה סוג ערך הוא מחזיק. כמו לכתוב על קופסה 'סוכר'. זה לא משנה את הקופסה — זה רק מתעד.",
      simpleExplanation:
        "type annotation היא הוספת הצהרת טיפוס למשתנה, פרמטר או החזרה. הסינטקס: name: type. למשל let x: number = 5. ב-TS לרוב אפשר להשמיט annotation ולתת ל-compiler להסיק (type inference), אבל בפרמטרים והחזרות מפורש = ברור יותר.",
      thinkingMethod: [
        "1. האם ה-compiler יכול להסיק לבד?",
        "2. האם הצהרה מפורשת תוסיף בהירות?",
        "3. בפרמטרים — חובה (אחרת implicit any)",
        "4. בהחזרה — לרוב מומלץ (קל לקרוא)",
        "5. במשתנה — אופציונלי, בעיקר כשהאתחול מורכב",
      ],
      purpose:
        "המטרה היא לתאר במפורש את הטיפוס, גם לבני-אדם וגם לקומפיילר.",
      codeSnippets: [
        {
          title: "annotations שונות",
          code: "let age: number = 30;\nfunction greet(name: string): string {\n  return `שלום ${name}`;\n}\nconst arr: number[] = [1, 2, 3];",
          explanation: "annotations על משתנה, פרמטר, החזרה ומערך.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function greet(name: string): string { return name; }",
          parts: [
            { piece: "name: string", role: "annotation על פרמטר — חייב להיות string." },
            { piece: "): string", role: "annotation על החזרה — חייב להחזיר string." },
          ],
          summary: "annotations מבטיחות שהפונקציה תקבל ותחזיר רק את הטיפוסים שצוינו.",
        },
      ],
    },
  },

  "lesson_26::string": {
    extendedTab: {
      simpleGrandma:
        "סבתא, string זה טקסט. כל מה שמוקף בגרשיים — שם, מילה, משפט, גם מספר אם הוא מוקף בגרשיים.",
      simpleExplanation:
        "string הוא טיפוס פרימיטיבי בJavaScript ו-TypeScript לטקסט. נכתב בגרשיים בודדים, כפולים, או backticks (template literals שמאפשרים שילוב משתנים).",
      thinkingMethod: [
        "1. האם הערך הוא טקסט?",
        "2. צריך לשלב משתנה? (template literal)",
        "3. צריך מספר? (parseInt/parseFloat)",
        "4. השוואה רגישה לאותיות? (toLowerCase לפני)",
        "5. ריקה? (length === 0 או !str.trim())",
      ],
      purpose:
        "המטרה היא לייצג טקסט באופן בטוח ומובחן ממספרים או טיפוסים אחרים.",
      codeSnippets: [
        {
          title: "string declarations",
          code: "let name: string = 'דני';\nlet greeting: string = `שלום ${name}!`;\nlet quote: string = \"אמר X\";",
          explanation: "שלוש דרכים לכתוב string — backtick מאפשר שילוב משתנים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "let msg: string = `שלום ${user.name}`;",
          parts: [
            { piece: ": string", role: "annotation — הערך חייב להיות string." },
            { piece: "`...`", role: "Template literal — תומך ב-interpolation." },
            { piece: "${user.name}", role: "משתנה משולב בתוך המחרוזת." },
          ],
          summary: "טקסט דינמי שכולל משתנה — צריך backticks.",
        },
      ],
    },
  },

  "lesson_26::number": {
    extendedTab: {
      simpleGrandma:
        "סבתא, number זה מספר — שלם, עשרוני, חיובי או שלילי. לא משנה אם זה 5, 3.14, או -100.",
      simpleExplanation:
        "number הוא טיפוס פרימיטיבי לכל סוגי המספרים — שלמים, עשרוניים, שליליים, וגם NaN ו-Infinity. אין הבדל בין int ל-float ב-JS/TS. אם צריך מספרים גדולים מאוד — bigint.",
      thinkingMethod: [
        "1. האם הערך מספר?",
        "2. שלם או עשרוני? (אותו טיפוס)",
        "3. גדול במיוחד? (bigint)",
        "4. השוואה: === לא ==",
        "5. NaN — בדוק עם Number.isNaN",
      ],
      purpose:
        "המטרה היא לבצע פעולות מתמטיות בצורה type-safe.",
      codeSnippets: [
        {
          title: "number declarations",
          code: "let age: number = 30;\nlet pi: number = 3.14;\nlet temp: number = -5.5;\nlet big: number = 1_000_000;  // numeric separator",
          explanation: "כל סוגי המספרים תחת number אחד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "let total: number = price * quantity;",
          parts: [
            { piece: ": number", role: "annotation — חייב להיות מספר." },
            { piece: "price * quantity", role: "ביטוי מתמטי שמחזיר מספר." },
          ],
          summary: "TS יבדוק שגם price וגם quantity הם number.",
        },
      ],
    },
  },

  "lesson_26::boolean": {
    extendedTab: {
      simpleGrandma:
        "סבתא, boolean זה כן/לא, אמת/שקר. רק שני ערכים: true או false.",
      simpleExplanation:
        "boolean הוא טיפוס לערכים בוליאניים — true או false בלבד. נפוץ לדגלים, תנאים, מצבי הצגה (open/closed). היזהר מ-truthy/falsy של JS — TS עוזר לזהות מקומות שהטיפוס לא מדויק.",
      thinkingMethod: [
        "1. האם זה בעצם 'כן/לא'?",
        "2. שם השדה ברור? (isOpen, hasError)",
        "3. ערך התחלתי? (false לרוב)",
        "4. בדיקה — === true או רק if?",
        "5. שלילה? (!val)",
      ],
      purpose:
        "המטרה היא לייצג מצבים בינאריים בצורה ברורה.",
      codeSnippets: [
        {
          title: "boolean usage",
          code: "let isLoggedIn: boolean = false;\nlet hasError: boolean = checkErrors().length > 0;",
          explanation: "ערך מפורש או תוצאה של ביטוי השוואה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const isAdmin: boolean = user.role === 'admin';",
          parts: [
            { piece: ": boolean", role: "annotation — true/false." },
            { piece: "user.role === 'admin'", role: "ביטוי השוואה — מחזיר boolean." },
          ],
          summary: "השוואה היא ביטוי בוליאני; התוצאה מותאמת ל-annotation.",
        },
      ],
    },
  },

  "lesson_26::array type": {
    extendedTab: {
      simpleGrandma:
        "סבתא, array type זה לומר 'מערך של מספרים' או 'מערך של שמות'. כמו ארגזים שכל אחד מסומן 'תפוחים בלבד'.",
      simpleExplanation:
        "ב-TS מציינים את הטיפוס של איברי המערך. שתי תחביר נפוצות: number[] (קצר) או Array<number> (generic). הקומפיילר יזהיר אם תכניס איבר מטיפוס שונה.",
      thinkingMethod: [
        "1. איזה טיפוס יש לאיברים?",
        "2. אחיד או מעורב? (union type אם מעורב)",
        "3. ריק? (אז צריך annotation)",
        "4. אובייקטים? (Movie[])",
        "5. מקונן? (number[][])",
      ],
      purpose:
        "המטרה היא להבטיח שהמערך מכיל רק את הטיפוס המוגדר.",
      codeSnippets: [
        {
          title: "array types",
          code: "const ages: number[] = [25, 30, 35];\nconst names: Array<string> = ['א', 'ב'];\nconst mixed: (string | number)[] = ['א', 1];",
          explanation: "שלושה סינטקסים — שווי ערך לפעמים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const users: User[] = [];",
          parts: [
            { piece: "User[]", role: "מערך של אובייקטים מטיפוס User." },
            { piece: "[]", role: "מערך ריק — annotation חיוני כי TS לא יודע מהמערך הריק לבד." },
          ],
          summary: "מערך ריק חייב annotation, אחרת TS יסיק never[].",
        },
      ],
    },
  },

  "lesson_26::tuple": {
    extendedTab: {
      simpleGrandma:
        "סבתא, tuple זה מערך עם מבנה קבוע. במקום 'אוסף של תפוחים', זה 'תפוח אחד אז כסא אז משקפיים'. כל מקום עם הטיפוס שלו.",
      simpleExplanation:
        "tuple הוא מערך עם מספר איברים קבוע, כשלכל מקום יש טיפוס משלו. למשל [string, number] = שם ואז גיל. נפוץ ב-useState ש-מחזיר [value, setter].",
      thinkingMethod: [
        "1. האם הסדר משנה?",
        "2. כמה איברים ומאיזה טיפוסים?",
        "3. האם זה מקובל יותר מאובייקט? (לרוב — לא, אובייקט ברור יותר)",
        "4. האם יש destructuring?",
        "5. תאריך הסיומת? (...string[] בסוף)",
      ],
      purpose:
        "המטרה היא לייצג קבוצה קטנה וסדורה של ערכים מטיפוסים שונים.",
      codeSnippets: [
        {
          title: "tuple",
          code: "const point: [number, number] = [10, 20];\nconst entry: [string, number] = ['גיל', 30];",
          explanation: "מבנה קבוע — כל מקום עם טיפוס משלו.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const [count, setCount]: [number, Function] = useState(0);",
          parts: [
            { piece: "[number, Function]", role: "tuple — מספר ואז פונקציה." },
            { piece: "[count, setCount]", role: "destructuring שמתאים ל-tuple." },
          ],
          summary: "useState מחזיר tuple — לכן ה-destructuring מקבל בדיוק שני איברים.",
        },
      ],
    },
  },

  "lesson_26::enum": {
    extendedTab: {
      simpleGrandma:
        "סבתא, enum זה רשימה של אפשרויות סגורה. כמו תפריט במסעדה — רק אלה האפשרויות, אי אפשר להזמין משהו אחר.",
      simpleExplanation:
        "enum הוא טיפוס שמגדיר אוסף של ערכים קבועים בעלי שמות. למשל: Status.Pending, Status.Done. שימושי למצבים סופיים. ב-TS יש מספריים (ברירת מחדל) ו-string enums. כיום נפוץ יותר להשתמש ב-union types או as const.",
      thinkingMethod: [
        "1. האם יש קבוצה סגורה של ערכים?",
        "2. הם ערכים מספריים או טקסטואליים?",
        "3. האם enum עדיף על union? (לעיתים פשוט יותר)",
        "4. האם יש משמעות לערך הספציפי?",
        "5. האם זה תואם נתונים מהשרת?",
      ],
      purpose:
        "המטרה היא להגדיר אוסף ערכים סגור, ברור, וטיפוסי.",
      codeSnippets: [
        {
          title: "string enum",
          code: "enum Status {\n  Pending = 'pending',\n  Active = 'active',\n  Done = 'done'\n}\n\nlet s: Status = Status.Active;",
          explanation: "Status.Active = 'active'. שימוש קריא ובטוח.",
        },
      ],
      codeBreakdowns: [
        {
          code: "enum Color { Red, Green, Blue }",
          parts: [
            { piece: "enum Color", role: "מצהיר על enum בשם Color." },
            { piece: "Red, Green, Blue", role: "שלושת הערכים — מקבלים אוטומטית 0, 1, 2." },
          ],
          summary: "enum מספרי — נוח, אבל הערכים נראים כמספרים בקוד.",
        },
      ],
    },
  },

  "lesson_26::void": {
    extendedTab: {
      simpleGrandma:
        "סבתא, void זה 'לא מחזיר כלום'. כמו לזרוק זבל — לא מצפים לקבל בחזרה תוצאה. הפעולה מתבצעת, וזהו.",
      simpleExplanation:
        "void הוא טיפוס מיוחד לפונקציות שלא מחזירות ערך. למשל function log(msg: string): void — היא מבצעת console.log אבל לא מחזירה כלום. שונה מ-undefined: void אומר 'לא נחוץ' ולא 'אין ערך'.",
      thinkingMethod: [
        "1. האם הפונקציה מחזירה ערך שמשמש משהו?",
        "2. אם לא — void.",
        "3. אם כן — הטיפוס המתאים.",
        "4. האם זה callback שלא צריך להחזיר? (void)",
        "5. איך להבחין בין void ל-undefined?",
      ],
      purpose:
        "המטרה היא לציין במפורש שפונקציה לא מחזירה ערך, ולמנוע ניסיונות 'לקלוט' תוצאה שלא קיימת.",
      codeSnippets: [
        {
          title: "פונקציית void",
          code: "function logMessage(msg: string): void {\n  console.log(msg);\n}",
          explanation: "מבצעת פעולה, לא מחזירה כלום.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function save(data: User): void { /* ... */ }",
          parts: [
            { piece: ": void", role: "מציין שאין ערך מוחזר." },
            { piece: "function save", role: "פונקציה שמבצעת פעולה." },
          ],
          summary: "void מבטיח שאין צורך לחפש return value.",
        },
      ],
    },
  },

  "lesson_26::readonly": {
    extendedTab: {
      simpleGrandma:
        "סבתא, readonly זה לקרוא בלבד — אסור לכתוב. כמו ספר במוזיאון: יכולים לקרוא, אבל לא להוסיף או לשנות.",
      simpleExplanation:
        "readonly הוא modifier ב-TS שמסמן שדה כקריאה בלבד אחרי האתחול. בכל מקום אחר — ניסיון לעדכן יזרוק שגיאת compile. שימושי לקבועים, ולשמירה על immutability.",
      thinkingMethod: [
        "1. האם השדה צריך להישאר קבוע?",
        "2. האם יש סכנה ששינויו ישבור משהו?",
        "3. האם זה תואם תנועה ל-immutable patterns?",
        "4. האם להשתמש ב-Readonly<T> לכל אובייקט?",
        "5. האם השפעה גם בזמן ריצה? (לא — רק compile)",
      ],
      purpose:
        "המטרה היא להבטיח שערך לא יישונה בטעות, ולסמן מטרה במפורש.",
      codeSnippets: [
        {
          title: "readonly field",
          code: "interface User {\n  readonly id: number;\n  name: string;\n}\nconst u: User = { id: 1, name: 'X' };\nu.name = 'Y'; // OK\nu.id = 2;     // ❌ Cannot assign to 'id'",
          explanation: "ה-id קבוע, ה-name משתנה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "readonly id: number;",
          parts: [
            { piece: "readonly", role: "modifier — מסמן את השדה כקריאה בלבד." },
            { piece: "id: number", role: "השדה עצמו." },
          ],
          summary: "השדה id ניתן לאתחול פעם אחת, אסור לעדכון.",
        },
      ],
    },
  },

  "lesson_26::optional field": {
    extendedTab: {
      simpleGrandma:
        "סבתא, optional זה שדה שאפשר לוותר עליו. כמו טופס: שם — חובה, כתובת — אם רוצים. הוספת ? אומרת 'לא חובה'.",
      simpleExplanation:
        "optional field הוא שדה ב-interface/type שאינו חובה. מסומן עם ? אחרי שם השדה. הערך יכול להיות הטיפוס המוצהר, undefined, או חסר לגמרי.",
      thinkingMethod: [
        "1. האם השדה חייב להיות קיים תמיד?",
        "2. אם לא — סמן ?",
        "3. בעבודה איתו — בדוק undefined? (?., ??)",
        "4. ערך ברירת מחדל?",
        "5. האם זה תואם נתונים אמיתיים?",
      ],
      purpose:
        "המטרה היא לתאר שדות לא-חובה ולהכריח את הקוד להתמודד עם היעדרם.",
      codeSnippets: [
        {
          title: "optional in interface",
          code: "interface User {\n  name: string;\n  age?: number;  // אופציונלי\n}\nconst u1: User = { name: 'א' };       // OK\nconst u2: User = { name: 'ב', age: 30 }; // OK",
          explanation: "age יכול להיות חסר לגמרי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "age?: number;",
          parts: [
            { piece: "age", role: "שם השדה." },
            { piece: "?", role: "מסמן אופציונלי." },
            { piece: ": number", role: "הטיפוס כשקיים." },
          ],
          summary: "שדה אופציונלי — או number או undefined או חסר.",
        },
      ],
    },
  },

  "lesson_26::type alias": {
    extendedTab: {
      simpleGrandma:
        "סבתא, type alias זה שם קצר לטיפוס מורכב. במקום לכתוב את כל ההגדרה כל פעם — נותנים שם, וקוראים בשם.",
      simpleExplanation:
        "type alias הוא הגדרת שם נוח לטיפוס. הסינטקס: type Name = ...;. שימושי לטיפוסים מורכבים, union types, או כשרוצים לחזור על אותו טיפוס. שונה מ-interface — alias יותר גמיש (תומך ב-union, primitives), interface יותר מסורתי לאובייקטים.",
      thinkingMethod: [
        "1. האם הטיפוס חוזר על עצמו?",
        "2. הוא מורכב? (union, intersection)",
        "3. type או interface? (interface לאובייקטים שיכולים להתרחב; type לכל השאר)",
        "4. האם השם תיאורי?",
        "5. exported?",
      ],
      purpose:
        "המטרה היא לתת שמות משמעותיים לטיפוסים, לקדם re-use וקריאות.",
      codeSnippets: [
        {
          title: "type alias",
          code: "type ID = number | string;\ntype User = { id: ID; name: string };\ntype Callback = (err: Error | null) => void;",
          explanation: "alias לטיפוס פרימיטיבי, אובייקט, ופונקציה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type Status = 'pending' | 'done' | 'error';",
          parts: [
            { piece: "type", role: "מצהיר על type alias." },
            { piece: "Status", role: "השם." },
            { piece: "'pending' | 'done' | 'error'", role: "Union של string literals — רק שלושת הערכים האלה תקפים." },
          ],
          summary: "alias שמגביל לשלוש מחרוזות בלבד — דומה ל-enum אבל יותר גמיש.",
        },
      ],
    },
  },

  "lesson_26::React + TypeScript": {
    extendedTab: {
      simpleGrandma:
        "סבתא, React + TypeScript זה לעבוד עם React אבל עם תוויות על כל דבר. props, state, חזרות — הכל מתויג. פחות באגים, IDE חכם יותר.",
      simpleExplanation:
        "React + TypeScript מוסיף type safety לקומפוננטות React. מגדירים טיפוסים ל-props, ל-state, ול-callbacks. הסיומת היא .tsx (TypeScript + JSX). הפלט: שגיאות compile-time במקום runtime.",
      thinkingMethod: [
        "1. הקובץ הוא .tsx?",
        "2. האם ה-props מוגדרים? (interface או type)",
        "3. האם useState מקבל generic? (לרוב מסיק לבד)",
        "4. האם event handlers מוטפסים?",
        "5. האם children מוגדר?",
      ],
      purpose:
        "המטרה היא לבנות אפליקציות React ב-type-safety מלא, עם DX משופר.",
      codeSnippets: [
        {
          title: "קומפוננטה ב-TS",
          code: "interface Props { name: string; age?: number; }\n\nfunction Greeting({ name, age }: Props) {\n  return <h1>שלום {name}, גיל {age ?? '?'}</h1>;\n}",
          explanation: "Props מוגדרים, אופציונלי מסומן, JSX רגיל.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Greeting({ name }: { name: string }) { ... }",
          parts: [
            { piece: "({ name }: { name: string })", role: "destructuring + type של ה-props." },
            { piece: "{ name: string }", role: "אובייקט props עם שדה name טיפוס string." },
          ],
          summary: "ניתן להגדיר ה-props inline, אך נהוג להוציא ל-interface.",
        },
      ],
    },
  },

  "lesson_26::Type Safety": {
    extendedTab: {
      simpleGrandma:
        "סבתא, type safety זה ביטחון שאת לא תכניסי תפוח לקופסת תפוזים. השפה מונעת ממך לשים ערך לא נכון במקום לא נכון.",
      simpleExplanation:
        "type safety היא תכונה של שפת תכנות שמונעת שימוש לא נכון בטיפוסים. ב-TS המהדר בודק כל הצבה, כל קריאה לפונקציה, וכל הקצאה. שגיאות נתפסות בזמן compile — לא ב-production.",
      thinkingMethod: [
        "1. האם strict mode פעיל? (חובה)",
        "2. האם יש any שמצריכים בכפיה?",
        "3. האם נתונים מ-API מוטפסים?",
        "4. האם משתמשים ב-Zod/io-ts לוולידציה בזמן ריצה?",
        "5. האם הצוות לא משתמש ב-as לעקיפה?",
      ],
      purpose:
        "המטרה היא לחסל קטגוריה שלמה של באגים ('cannot read property of undefined' וכו').",
      codeSnippets: [
        {
          title: "type safety בפעולה",
          code: "function getUser(id: number): User { ... }\ngetUser('5'); // ❌ Error: 'string' לא תואם ל-'number'",
          explanation: "TS עוצר את הקוד לפני הרצה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "user.name.toUpperCase()",
          parts: [
            { piece: "user.name", role: "TS בודק ש-name קיים על user." },
            { piece: ".toUpperCase()", role: "TS בודק ש-name הוא string." },
          ],
          summary: "כל גישה לשדה ולמתודה נבדקת — אם משהו לא נכון, שגיאה.",
        },
      ],
    },
  },

  "lesson_26::Typing Props": {
    extendedTab: {
      simpleGrandma:
        "סבתא, typing props זה לכתוב לקומפוננטה איזה מתנות (props) היא יכולה לקבל. שם? מספר? פונקציה? כל אחד עם תווית.",
      simpleExplanation:
        "Typing props ב-React + TS = הגדרת interface או type ל-props של קומפוננטה. הקומפיילר יבדוק שכל שימוש בקומפוננטה מעביר את ה-props הנכונים בטיפוס הנכון.",
      thinkingMethod: [
        "1. אילו props הקומפוננטה מקבלת?",
        "2. אילו חובה ואילו אופציונלי?",
        "3. אילו פונקציות (callbacks)?",
        "4. interface או type?",
        "5. האם להוציא לקובץ נפרד?",
      ],
      purpose:
        "המטרה היא להבטיח שימוש נכון בקומפוננטה ולקבל autocomplete של ה-props.",
      codeSnippets: [
        {
          title: "Typing props",
          code: "interface ButtonProps {\n  label: string;\n  onClick: () => void;\n  disabled?: boolean;\n}\n\nfunction Button({ label, onClick, disabled }: ButtonProps) { ... }",
          explanation: "interface ברור: label חובה, onClick חובה, disabled אופציונלי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface Props { name: string; onAdd: (text: string) => void; }",
          parts: [
            { piece: "interface Props", role: "מגדיר את שם ה-interface." },
            { piece: "name: string", role: "prop string חובה." },
            { piece: "onAdd: (text: string) => void", role: "callback שמקבל string ולא מחזיר." },
          ],
          summary: "interface מגדיר חוזה של ה-props — כל שימוש חייב לעמוד בו.",
        },
      ],
    },
  },

  "lesson_26::Typing State": {
    extendedTab: {
      simpleGrandma:
        "סבתא, typing state זה לומר ל-useState איזה סוג ערך הוא שומר. מספר? אובייקט? מערך?",
      simpleExplanation:
        "useState ב-TS לרוב מסיק את הטיפוס מהערך ההתחלתי. אם ההתחלה null או [], צריך לציין במפורש דרך generic: useState<User | null>(null).",
      thinkingMethod: [
        "1. האם הערך ההתחלתי מספיק כדי להסיק?",
        "2. אם null/undefined/empty array — צריך generic.",
        "3. האם זה אובייקט מורכב?",
        "4. האם הוא יכול להיות גם null?",
        "5. interface או type לערך?",
      ],
      purpose:
        "המטרה היא להבטיח של-state יש טיפוס מדויק שמונע באגים.",
      codeSnippets: [
        {
          title: "useState עם generic",
          code: "const [user, setUser] = useState<User | null>(null);\nconst [items, setItems] = useState<Item[]>([]);",
          explanation: "מציינים generic כשהערך ההתחלתי לא מספיק להסקה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "useState<string[]>([])",
          parts: [
            { piece: "useState", role: "ה-Hook." },
            { piece: "<string[]>", role: "Generic — הטיפוס של ה-state." },
            { piece: "([])", role: "ערך התחלתי — מערך ריק של string." },
          ],
          summary: "Generic הכרחי במערך ריק כדי לציין מה הטיפוס של האיברים.",
        },
      ],
    },
  },

  "lesson_26::Function Prop Type": {
    extendedTab: {
      simpleGrandma:
        "סבתא, function prop type זה תווית על callback. אומר ללא רק 'זאת פונקציה' — אלא גם 'מקבלת מה ומחזירה מה'.",
      simpleExplanation:
        "פונקציה כ-prop ב-TS: מציינים את החתימה — אילו פרמטרים ואיזה ערך מחזירה. הסינטקס: (params) => returnType. למשל: onAdd: (text: string) => void = פונקציה שמקבלת string ולא מחזירה.",
      thinkingMethod: [
        "1. אילו פרמטרים הפונקציה מקבלת?",
        "2. מה היא מחזירה? (לרוב void)",
        "3. אופציונלית?",
        "4. async? (Promise<...>)",
        "5. event handler? (React.MouseEvent וכו')",
      ],
      purpose:
        "המטרה היא להגדיר חוזה ברור ל-callbacks, כדי שהמתקשר ידע מה לשלוח ומה לצפות.",
      codeSnippets: [
        {
          title: "Function prop types",
          code: "interface FormProps {\n  onSubmit: (data: FormData) => void;\n  onCancel?: () => void;\n  validate: (input: string) => boolean;\n}",
          explanation: "שלושה callbacks: עם פרמטר, ללא פרמטר, ועם החזרה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "onClick: (event: React.MouseEvent) => void",
          parts: [
            { piece: "(event: React.MouseEvent)", role: "פרמטר event מטיפוס React.MouseEvent." },
            { piece: "=> void", role: "לא מחזירה ערך." },
          ],
          summary: "Event handler סטנדרטי ב-React + TS.",
        },
      ],
    },
  },

  "lesson_26::models folder": {
    extendedTab: {
      simpleGrandma:
        "סבתא, models folder זה תיקייה ייעודית להגדרות של 'מה' באפליקציה. מה זה משתמש? מה זה הזמנה? כל ה'מהות' (model) במקום אחד.",
      simpleExplanation:
        "models folder היא תיקייה במבנה הפרויקט שמכילה הגדרות טיפוסים/אינטרפייסים של הישויות העסקיות (User, Order, Product). זה ארגוני, לא טכני — אבל עוזר מאוד לתחזוקה.",
      thinkingMethod: [
        "1. אילו ישויות יש באפליקציה?",
        "2. כל אחת בקובץ נפרד?",
        "3. מה הקשר ביניהן? (extends, composition)",
        "4. האם הן תואמות API?",
        "5. exported correctly?",
      ],
      purpose:
        "המטרה היא לרכז את כל הטיפוסים העסקיים במקום אחד נגיש.",
      codeSnippets: [
        {
          title: "מבנה models",
          code: "src/\n  models/\n    User.ts\n    Order.ts\n    Product.ts\n  components/\n  ...",
          explanation: "תיקייה נפרדת ל-business types.",
        },
      ],
      codeBreakdowns: [
        {
          code: "// models/User.ts\nexport interface User { id: number; name: string; }",
          parts: [
            { piece: "// models/User.ts", role: "מיקום הקובץ — בתיקיית models." },
            { piece: "export interface User", role: "מיוצא לשימוש בכל הפרויקט." },
          ],
          summary: "קובץ מודל בודד — מיוצא ומוכן לשימוש.",
        },
      ],
    },
  },

  "lesson_26::Todo.ts": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Todo.ts זה קובץ שמגדיר 'מה זה משימה' באפליקציה. השדות שלה — מספר, תוכן, האם הושלמה.",
      simpleExplanation:
        "Todo.ts הוא קובץ אופייני בתיקיית models — מגדיר interface לישות 'משימה': id, text, completed וכו'. שאר הקוד מייבא ממנו וכל מקום שמטפל במשימות משתמש באותו טיפוס.",
      thinkingMethod: [
        "1. אילו שדות יש למשימה?",
        "2. id ייחודי? (number או string)",
        "3. completed boolean?",
        "4. תאריך? (Date או string)",
        "5. שדות אופציונליים?",
      ],
      purpose:
        "המטרה היא לרכז את ההגדרה של ישות Todo במקום אחד.",
      codeSnippets: [
        {
          title: "models/Todo.ts",
          code: "export interface Todo {\n  id: number;\n  text: string;\n  completed: boolean;\n  createdAt?: Date;\n}",
          explanation: "interface ברור עם שדות חובה ואופציונלי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "export interface Todo { id: number; text: string; completed: boolean; }",
          parts: [
            { piece: "export", role: "ניתן לייבוא מקבצים אחרים." },
            { piece: "interface Todo", role: "שם ה-interface." },
            { piece: "id, text, completed", role: "שלושת השדות החובה." },
          ],
          summary: "interface בסיסי לישות todo, מוכן לשימוש בכל האפליקציה.",
        },
      ],
    },
  },

  "lesson_26::interface": {
    extendedTab: {
      simpleGrandma:
        "סבתא, interface זה 'תיאור של אובייקט'. כמו רשימת השדות שטופס חייב למלא — שם, גיל, כתובת.",
      simpleExplanation:
        "interface ב-TS מגדיר מבנה של אובייקט — אילו שדות יש, באילו טיפוסים. דומה ל-type, אך מותאם יותר לתיאור אובייקטים. ניתן להרחבה עם extends, ניתן ל-merge בין הצהרות.",
      thinkingMethod: [
        "1. אילו שדות?",
        "2. באילו טיפוסים?",
        "3. אופציונליים? (?)",
        "4. readonly?",
        "5. extends interface אחר?",
      ],
      purpose:
        "המטרה היא לתאר חוזה של אובייקט — מה צפוי בו, ובאיזה טיפוס.",
      codeSnippets: [
        {
          title: "interface בסיסי",
          code: "interface User {\n  id: number;\n  name: string;\n  email?: string;\n  readonly createdAt: Date;\n}",
          explanation: "שדות עם הגדרות שונות — רגיל, אופציונלי, וקריאה בלבד.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface User { id: number; name: string; }",
          parts: [
            { piece: "interface", role: "מצהיר על interface." },
            { piece: "User", role: "השם." },
            { piece: "{ id: number; name: string; }", role: "השדות עם טיפוסים." },
          ],
          summary: "interface פשוט עם שני שדות חובה.",
        },
      ],
    },
  },

  "lesson_26::interface vs type": {
    extendedTab: {
      simpleGrandma:
        "סבתא, interface vs type זה שתי דרכים להגדיר טיפוס. במעט מקרים שונים, אבל לרוב — שווי ערך.",
      simpleExplanation:
        "interface ו-type alias משמשים לתאר טיפוסים. ההבדלים: interface יכול להתמזג (declaration merging), בעוד type לא. type תומך ב-union/intersection ישירות, ב-primitives, וב-mapped types. כלל אצבע: interface לאובייקטים שיכולים להתרחב, type לכל השאר.",
      thinkingMethod: [
        "1. אובייקט שיכול להתרחב? (interface)",
        "2. union / intersection? (type)",
        "3. נדרש merging? (interface)",
        "4. primitive alias? (type)",
        "5. הצוות מעדיף איזה?",
      ],
      purpose:
        "מבחינים בין השניים כדי לבחור את הכלי המתאים לפי המקרה.",
      codeSnippets: [
        {
          title: "השוואה",
          code: "// interface — אובייקט שיכול להתרחב\ninterface User { name: string; }\ninterface User { age: number; } // merge\n\n// type — גמישות מלאה\ntype ID = number | string;\ntype Status = 'a' | 'b';",
          explanation: "interface לאובייקטים, type לכל השאר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type Result = Success | Error;",
          parts: [
            { piece: "type Result", role: "מצהיר על type alias." },
            { piece: "Success | Error", role: "Union — או זה או זה." },
          ],
          summary: "Union types לרוב כותבים עם type, לא interface.",
        },
      ],
    },
  },

  "lesson_26::union": {
    extendedTab: {
      simpleGrandma:
        "סבתא, union זה 'או זה או זה'. כמו לבחור גלידה: 'או שוקולד או וניל'. הטיפוס יכול להיות אחד מכמה אפשרויות.",
      simpleExplanation:
        "union type ב-TS מציין שערך יכול להיות מאחד ממספר טיפוסים. הסינטקס: A | B. למשל string | number = או טקסט או מספר. שימושי מאוד עם literal types ('pending' | 'done') או null/undefined.",
      thinkingMethod: [
        "1. אילו טיפוסים אפשריים?",
        "2. צריך discriminator? (kind: 'a')",
        "3. איך לטפל בכל אחד? (type narrowing)",
        "4. האם זה טוב יותר מ-overloading?",
        "5. exhaustive check?",
      ],
      purpose:
        "המטרה היא לתאר ערכים שיכולים להיות מטיפוסים שונים בנקודות שונות בזמן.",
      codeSnippets: [
        {
          title: "union types",
          code: "type ID = number | string;\nlet x: ID = 5;     // OK\nx = 'abc';         // OK\nx = true;          // ❌",
          explanation: "ID יכול להיות מספר או מחרוזת — לא משהו אחר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type Status = 'pending' | 'done' | 'error';",
          parts: [
            { piece: "type Status", role: "alias לטיפוס Status." },
            { piece: "'pending' | 'done' | 'error'", role: "Union של string literals." },
          ],
          summary: "רק שלוש המחרוזות האלה תקפות — דומה ל-enum.",
        },
      ],
    },
  },

  "lesson_26::never": {
    extendedTab: {
      simpleGrandma:
        "סבתא, never זה 'לעולם לא יקרה'. כמו פונקציה שזורקת שגיאה ולא מחזירה כלום — היא לעולם לא תסיים בשלום.",
      simpleExplanation:
        "never הוא טיפוס מיוחד שמייצג ערך שלעולם לא יתקיים. שימושים: פונקציות שזורקות שגיאה תמיד, פונקציות שלא נגמרות (loop infinite), exhaustive checks ב-switch על union types.",
      thinkingMethod: [
        "1. האם הפונקציה לעולם לא מחזירה? (throws/loops)",
        "2. האם זה ענף בלתי-אפשרי ב-switch?",
        "3. exhaustive check על union?",
        "4. האם הקומפיילר מסיק never?",
        "5. האם זה אומר שיש באג?",
      ],
      purpose:
        "המטרה היא להגדיר 'בלתי-אפשרי' באופן מפורש ולתת ל-compiler לעזור לאתר baga.",
      codeSnippets: [
        {
          title: "exhaustive check",
          code: "function handle(s: 'a' | 'b') {\n  switch(s) {\n    case 'a': return 1;\n    case 'b': return 2;\n    default: const _exhaustive: never = s; return _exhaustive;\n  }\n}",
          explanation: "אם נוסיף 'c' לטיפוס, ה-default יקפיץ שגיאה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function fail(): never { throw new Error('oops'); }",
          parts: [
            { piece: ": never", role: "annotation — לעולם לא מחזירה." },
            { piece: "throw", role: "תמיד זורקת — לכן never מתאים." },
          ],
          summary: "פונקציה שזורקת תמיד = never.",
        },
      ],
    },
  },

  "lesson_26::any": {
    extendedTab: {
      simpleGrandma:
        "סבתא, any זה 'כל דבר'. במקום לציין טיפוס — מוותרים על הבדיקה. כמו לכתוב 'משהו' על קופסה. בלי בדיקה, קל לטעות.",
      simpleExplanation:
        "any הוא טיפוס שמכבה את בדיקות ה-TS — הערך יכול להיות כל דבר, וכל פעולה עליו מותרת. שימוש ב-any שווה ערך לכתיבה ב-JS רגיל. לרוב מומלץ להימנע — להשתמש ב-unknown במקום ולעשות type guards.",
      thinkingMethod: [
        "1. האם באמת אין אפשרות לדעת?",
        "2. אולי unknown עדיף? (יותר בטוח)",
        "3. האם זה זמני? (להחזיר אחרי refactor)",
        "4. האם יש @ts-expect-error מפורש?",
        "5. eslint-rule no-explicit-any?",
      ],
      purpose:
        "המטרה היא לאפשר 'בריחה' מהמערכת כשבאמת אין ברירה — אבל להשתמש בזהירות.",
      codeSnippets: [
        {
          title: "any vs unknown",
          code: "let a: any = 5;\na.foo.bar.baz(); // OK ב-compile, יקרוס ב-runtime\n\nlet u: unknown = 5;\nu.foo;           // ❌ Error — חייב type guard",
          explanation: "any מסוכן; unknown בטוח.",
        },
      ],
      codeBreakdowns: [
        {
          code: "let data: any = await fetch('/api').then(r => r.json());",
          parts: [
            { piece: ": any", role: "כיבוי בדיקות — מסוכן." },
            { piece: "await fetch", role: "תוצאה לא מוטפסת." },
          ],
          summary: "פתרון נפוץ אך לא בטוח — עדיף לטפס דרך Zod או interface.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 27 — TypeScript Advanced + Domain Models (20 concepts)
  // ============================================================================

  "lesson_27::type": {
    extendedTab: {
      simpleGrandma:
        "סבתא, type כאן זה הצהרת alias. את נותנת שם משלך לטיפוס מורכב, ובהמשך משתמשת בשם במקום לכתוב את כל ההגדרה כל פעם.",
      simpleExplanation:
        "type alias ב-TypeScript נותן שם לטיפוס מורכב. הסינטקס: type Name = ...;. בניגוד ל-interface, type יכול להגדיר union, intersection, primitives, ו-mapped types — לא רק אובייקטים.",
      thinkingMethod: [
        "1. האם זה טיפוס שחוזר ביותר ממקום אחד?",
        "2. אובייקט או union?",
        "3. עם generics?",
        "4. השם תיאורי?",
        "5. exported?",
      ],
      purpose:
        "המטרה היא ליצור שם משמעותי לטיפוסים מורכבים, להגדיל קריאות וקיצור.",
      codeSnippets: [
        {
          title: "type alias",
          code: "type Status = 'pending' | 'done';\ntype Coordinates = { lat: number; lng: number };\ntype Pair<T> = [T, T];",
          explanation: "alias לטיפוסים שונים — union, אובייקט, generic.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type Callback = (data: User) => void;",
          parts: [
            { piece: "type Callback", role: "alias בשם Callback." },
            { piece: "(data: User) => void", role: "הטיפוס: פונקציה שמקבלת User ולא מחזירה." },
          ],
          summary: "alias לפונקציה — נוח לשימוש חוזר.",
        },
      ],
    },
  },

  "lesson_27::enum": {
    extendedTab: {
      simpleGrandma:
        "סבתא, enum זה רשימה סגורה של אפשרויות בעלי שם. כמו ימי השבוע: ראשון, שני, שלישי. רק אלה הערכים החוקיים.",
      simpleExplanation:
        "enum ב-TypeScript מגדיר אוסף של ערכים בעלי שם. ב-numeric enum הערכים הם 0, 1, 2... אוטומטית. ב-string enum הערכים הם מחרוזות. שימושי לסטטוסים, סוגים, ימי שבוע, וכל קבוצה סגורה.",
      thinkingMethod: [
        "1. האם הערכים סגורים וקבועים?",
        "2. צריך משמעות מספרית או טקסטואלית?",
        "3. enum או union of literals? (לרוב union עדיף)",
        "4. const enum לאופטימיזציה?",
        "5. תואם נתונים מ-API?",
      ],
      purpose:
        "המטרה היא לקבץ קבוצה סגורה של ערכים בעלי שם, ולהבטיח שרק הם ישמשו.",
      codeSnippets: [
        {
          title: "string enum",
          code: "enum OrderStatus {\n  Pending = 'pending',\n  Shipped = 'shipped',\n  Delivered = 'delivered'\n}\nlet s: OrderStatus = OrderStatus.Pending;",
          explanation: "ערכים שם=מחרוזת. שימוש: OrderStatus.Pending.",
        },
      ],
      codeBreakdowns: [
        {
          code: "enum Day { Mon, Tue, Wed }",
          parts: [
            { piece: "enum Day", role: "מצהיר על enum." },
            { piece: "Mon, Tue, Wed", role: "שלושת הערכים — מקבלים 0, 1, 2 אוטומטית." },
          ],
          summary: "Day.Mon === 0 — נוח לקוד ולהשוואות.",
        },
      ],
    },
  },

  "lesson_27::interface": {
    extendedTab: {
      simpleGrandma:
        "סבתא, interface זה תיאור של מבנה אובייקט. מה שדות יש לו, ומאיזה סוג. כמו תיאור של דמות בסיפור — שם, גיל, צבע שיער.",
      simpleExplanation:
        "interface ב-TypeScript מגדיר חוזה לאובייקט: אילו שדות, באילו טיפוסים. כל מי שמשתמש באובייקט מוטפס interface חייב להתאים לחוזה. מאפשר extends ו-merging.",
      thinkingMethod: [
        "1. אילו שדות באובייקט?",
        "2. אילו חובה ואילו אופציונלי?",
        "3. extends?",
        "4. readonly?",
        "5. הרחבה במקום אחר? (declaration merging)",
      ],
      purpose:
        "המטרה היא להגדיר באופן ברור מבנה אובייקט שמשתמשים בו במקומות רבים.",
      codeSnippets: [
        {
          title: "interface בסיסי",
          code: "interface Movie {\n  id: number;\n  title: string;\n  year: number;\n  rating?: number;\n}",
          explanation: "interface לסרט — id, title, year חובה; rating אופציונלי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface Movie { id: number; title: string; }",
          parts: [
            { piece: "interface Movie", role: "השם של ה-interface." },
            { piece: "id: number", role: "שדה id — חייב מספר." },
            { piece: "title: string", role: "שדה title — חייב טקסט." },
          ],
          summary: "interface כחוזה לאובייקטים מטיפוס Movie.",
        },
      ],
    },
  },

  "lesson_27::extends interface": {
    extendedTab: {
      simpleGrandma:
        "סבתא, extends interface זה לקחת תיאור קיים ולהוסיף לו שדות. כמו 'דמות = מי שיש לה שם' ועכשיו 'מורה = דמות + מקצוע'.",
      simpleExplanation:
        "interface יכול להרחיב interface אחר עם extends. כל השדות של ה-interface האב נכללים, ואפשר להוסיף שדות חדשים. שימושי להיררכיות (BaseUser → AdminUser).",
      thinkingMethod: [
        "1. האם יש תכונות משותפות?",
        "2. האם זה הוא-קשר של 'IS-A'? (admin IS-A user)",
        "3. extends אחד או כמה?",
        "4. האם להעדיף composition?",
        "5. שדות שמוחלפים? (override)",
      ],
      purpose:
        "המטרה היא לעודד re-use של הגדרות ולמדל היררכיות.",
      codeSnippets: [
        {
          title: "extends",
          code: "interface Animal { name: string; }\ninterface Dog extends Animal { breed: string; }\n\nconst d: Dog = { name: 'רקסי', breed: 'לברדור' };",
          explanation: "Dog ירש את name, הוסיף breed.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface Admin extends User { permissions: string[]; }",
          parts: [
            { piece: "interface Admin", role: "השם של ה-interface החדש." },
            { piece: "extends User", role: "ירש את כל השדות של User." },
            { piece: "permissions: string[]", role: "שדה נוסף ל-Admin." },
          ],
          summary: "Admin יורש מ-User ומוסיף שדה permissions.",
        },
      ],
    },
  },

  "lesson_27::Union Type": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Union Type זה 'או זה או זה'. כמו לבחור: 'לקוח חבר' או 'לקוח אורח'. הטיפוס יכול להיות אחד מכמה.",
      simpleExplanation:
        "Union Type מציין שערך יכול להיות מאחד מכמה טיפוסים. הסינטקס: A | B. שימושי במצבים כמו GuestUser | RegisteredUser, או success | error. עובד יחד עם type narrowing כדי 'לזהות' איזה מהטיפוסים זה.",
      thinkingMethod: [
        "1. אילו טיפוסים אפשריים?",
        "2. איך מבחינים ביניהם? (discriminator)",
        "3. type narrowing נדרש?",
        "4. exhaustive switch?",
        "5. האם זה שווה לעשות interface אחד עם field optional?",
      ],
      purpose:
        "המטרה היא לבטא בצורה מדויקת מצבים שבהם ערך יכול להיות מטיפוסים שונים.",
      codeSnippets: [
        {
          title: "Union",
          code: "type Result = { ok: true; data: User } | { ok: false; error: string };\n\nfunction handle(r: Result) {\n  if (r.ok) console.log(r.data);\n  else console.log(r.error);\n}",
          explanation: "discriminated union — ok מבחין בין שתי האפשרויות.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type Pet = Dog | Cat | Fish;",
          parts: [
            { piece: "type Pet", role: "alias לטיפוס Pet." },
            { piece: "Dog | Cat | Fish", role: "Union — או אחד משלושת הסוגים." },
          ],
          summary: "Pet יכול להיות אחד משלושה טיפוסים שונים.",
        },
      ],
    },
  },

  "lesson_27::Type Narrowing": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Type Narrowing זה לצמצם את האפשרויות. אם ידעת ש-x זה 'או מספר או טקסט', ובדקת והוא מספר — מעכשיו אנחנו יודעים שהוא מספר ויכולים לחבר אותו.",
      simpleExplanation:
        "type narrowing הוא יכולת של TS לצמצם את הטיפוס של ערך לאחר בדיקה. עם typeof, instanceof, in, ערך השוואה — TS מבין שבתוך ענף מסוים הטיפוס כבר ידוע מדויק.",
      thinkingMethod: [
        "1. איזו union יש לי?",
        "2. איך אבחין בין הטיפוסים? (typeof, in, discriminator)",
        "3. האם TS באמת מצמצם בענף?",
        "4. האם יש exhaustive check?",
        "5. type guard custom נדרש?",
      ],
      purpose:
        "המטרה היא להפעיל לוגיקה מותנית על אובייקטים מטיפוסים שונים, בבטחה ובלי casts.",
      codeSnippets: [
        {
          title: "narrowing עם typeof",
          code: "function format(x: string | number): string {\n  if (typeof x === 'string') return x.toUpperCase();\n  return x.toFixed(2);\n}",
          explanation: "בענף הראשון x הוא string; בשני — number.",
        },
      ],
      codeBreakdowns: [
        {
          code: "if (typeof x === 'number') { return x.toFixed(2); }",
          parts: [
            { piece: "typeof x === 'number'", role: "type guard — בודק שהטיפוס number." },
            { piece: "x.toFixed(2)", role: "בענף הזה x מצומצם ל-number, אז toFixed זמין." },
          ],
          summary: "TS מצמצם את הטיפוס של x בתוך ה-if על בסיס typeof.",
        },
      ],
    },
  },

  "lesson_27::Book": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Book זה הגדרה של ספר באפליקציה — שם הספר, סופר, שנה, נושא. interface שמתאר 'מה זה ספר אצלנו'.",
      simpleExplanation:
        "Book הוא דוגמה ל-interface שמתאר ישות עסקית — ספר. שדות אופייניים: id, title, author, year, genre. נמצא לרוב בקובץ models/Book.ts ומשמש את כל הקוד שמטפל בספרים.",
      thinkingMethod: [
        "1. אילו שדות חיוניים לזיהוי הספר?",
        "2. אילו אופציונליים?",
        "3. genre — מחרוזת חופשית או enum?",
        "4. התאמה לנתוני API?",
        "5. תאריך פרסום — Date או string?",
      ],
      purpose:
        "המטרה היא להגדיר model אחיד לישות 'ספר' ברחבי האפליקציה.",
      codeSnippets: [
        {
          title: "Book interface",
          code: "interface Book {\n  id: number;\n  title: string;\n  author: string;\n  year: number;\n  genre: Genre;\n  pages?: number;\n}",
          explanation: "ישות ספר עם שדות חובה ושדה אופציונלי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "const b: Book = { id: 1, title: 'X', author: 'Y', year: 2024, genre: Genre.Fiction };",
          parts: [
            { piece: ": Book", role: "annotation שאוכף שכל השדות החובה קיימים." },
            { piece: "genre: Genre.Fiction", role: "השדה מטיפוס enum Genre — ערך חוקי." },
          ],
          summary: "אובייקט Book שעומד בחוזה ה-interface.",
        },
      ],
    },
  },

  "lesson_27::Genre": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Genre זה הסוגה של הספר — בלש, רומן, מדע, הומור. רשימה סגורה של אפשרויות.",
      simpleExplanation:
        "Genre לרוב מוגדר כ-enum או union of literals. שימושי כי יש מספר מוגבל של סוגות, וכל ספר משויך לאחת מהן. שימוש ב-enum מאפשר IDE-friendly autocomplete ועקביות.",
      thinkingMethod: [
        "1. אילו סוגות אפשריות?",
        "2. enum או union? (string enum נוח)",
        "3. מאיפה הערכים מגיעים? (סטטיים? מהשרת?)",
        "4. ערך ברירת מחדל?",
        "5. תרגום לעברית בUI?",
      ],
      purpose:
        "המטרה היא לסווג ספרים לסוגות בצורה אחידה ומבוקרת.",
      codeSnippets: [
        {
          title: "Genre enum",
          code: "enum Genre {\n  Fiction = 'fiction',\n  Mystery = 'mystery',\n  Science = 'science',\n  History = 'history'\n}",
          explanation: "ארבע סוגות אפשריות, בערכי מחרוזת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "genre: Genre",
          parts: [
            { piece: "genre", role: "שם השדה." },
            { piece: ": Genre", role: "טיפוס — enum Genre, רק ערכיו תקפים." },
          ],
          summary: "השדה genre חייב להיות אחד מערכי ה-enum.",
        },
      ],
    },
  },

  "lesson_27::BaseUser": {
    extendedTab: {
      simpleGrandma:
        "סבתא, BaseUser זה הבסיס של 'משתמש'. כל משתמש — אורח או רשום — מתחיל מהשדות הבסיסיים. interface 'שורש' להיררכיה.",
      simpleExplanation:
        "BaseUser הוא interface בסיסי שמכיל שדות משותפים לכל סוגי המשתמשים. אחר כך GuestUser ו-RegisteredUser מרחיבים אותו עם extends ומוסיפים שדות ייחודיים.",
      thinkingMethod: [
        "1. אילו שדות משותפים לכל המשתמשים?",
        "2. אילו ייחודיים לסוג מסוים? (להעביר לסאב-interface)",
        "3. extends או composition?",
        "4. האם הבסיס יכול להופיע לבד? (Abstract?)",
        "5. discriminator field? (kind: 'guest' | 'registered')",
      ],
      purpose:
        "המטרה היא להגדיר שכבת בסיס משותפת ל-typing משתמשים שונים, למניעת שכפול.",
      codeSnippets: [
        {
          title: "BaseUser",
          code: "interface BaseUser {\n  id: number;\n  createdAt: Date;\n  kind: 'guest' | 'registered';\n}",
          explanation: "שדות משותפים — id, תאריך יצירה, וסוג.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface BaseUser { id: number; kind: 'guest' | 'registered'; }",
          parts: [
            { piece: "id: number", role: "שדה משותף לכל משתמש." },
            { piece: "kind: 'guest' | 'registered'", role: "discriminator — מאפשר type narrowing." },
          ],
          summary: "Base + discriminator = pattern נפוץ לטיפול ב-union טיפוסים.",
        },
      ],
    },
  },

  "lesson_27::GuestUser": {
    extendedTab: {
      simpleGrandma:
        "סבתא, GuestUser זה משתמש שלא נרשם — אורח. יש לו פחות פרטים, פחות הרשאות. כמו מישהו שנכנס לחנות בלי לפתוח חשבון.",
      simpleExplanation:
        "GuestUser מרחיב את BaseUser ומציין שהוא 'אורח'. לרוב יש לו session id במקום פרטי משתמש קבועים. דרך לטפל במשתמשים שלא התחברו, אבל עדיין לאסוף נתוני שימוש (cart, היסטוריה זמנית).",
      thinkingMethod: [
        "1. אילו שדות חיוניים לאורח?",
        "2. כמה זמן הסשן? (sessionId)",
        "3. מה הוא יכול לעשות?",
        "4. איך עוברים ל-Registered?",
        "5. שמירה זמנית ב-localStorage?",
      ],
      purpose:
        "המטרה היא לאפשר שימוש באפליקציה בלי הרשמה מלאה, ועדיין לזהות את המשתמש בסשן.",
      codeSnippets: [
        {
          title: "GuestUser",
          code: "interface GuestUser extends BaseUser {\n  kind: 'guest';\n  sessionId: string;\n}",
          explanation: "מרחיב BaseUser, קובע kind=='guest', ומוסיף sessionId.",
        },
      ],
      codeBreakdowns: [
        {
          code: "interface GuestUser extends BaseUser { kind: 'guest'; sessionId: string; }",
          parts: [
            { piece: "extends BaseUser", role: "ירש id, createdAt, kind." },
            { piece: "kind: 'guest'", role: "מצמצם את ה-kind ל'guest' בלבד." },
            { piece: "sessionId: string", role: "שדה ייחודי לאורחים." },
          ],
          summary: "GuestUser הוא BaseUser עם kind שצומצם ושדה sessionId נוסף.",
        },
      ],
    },
  },

  "lesson_27::RegisteredUser": {
    extendedTab: {
      simpleGrandma:
        "סבתא, RegisteredUser זה משתמש שנרשם בחשבון — שם משתמש, מייל, סיסמה. יש לו הרשאות יותר ושמירה ארוכת טווח.",
      simpleExplanation:
        "RegisteredUser מרחיב את BaseUser ומכיל שדות של משתמש רשום: email, username, ולפעמים תפקיד (role). שונה מ-GuestUser ב-fields ובהרשאות.",
      thinkingMethod: [
        "1. אילו שדות חובה לרשום? (email, password)",
        "2. role? (admin/user)",
        "3. profile complete?",
        "4. authentication tokens?",
        "5. preferences?",
      ],
      purpose:
        "המטרה היא להבחין בקוד בין משתמש רשום לאורח, ולתת הרשאות בהתאם.",
      codeSnippets: [
        {
          title: "RegisteredUser",
          code: "interface RegisteredUser extends BaseUser {\n  kind: 'registered';\n  email: string;\n  username: string;\n  role: 'admin' | 'user';\n}",
          explanation: "מרחיב את BaseUser, קובע kind, ומוסיף email/username/role.",
        },
      ],
      codeBreakdowns: [
        {
          code: "kind: 'registered'; role: 'admin' | 'user';",
          parts: [
            { piece: "kind: 'registered'", role: "discriminator שמבחין מ-GuestUser." },
            { piece: "role: 'admin' | 'user'", role: "הרשאה — או admin או user." },
          ],
          summary: "discriminator + role יחד מאפשרים החלטות הרשאה ב-type-safe.",
        },
      ],
    },
  },

  "lesson_27::User": {
    extendedTab: {
      simpleGrandma:
        "סבתא, User זה הטיפוס המאוחד — או אורח או רשום. כשמדברים על 'משתמש' בכלל, מתכוונים לאחד מהשניים.",
      simpleExplanation:
        "User הוא לרוב union type: GuestUser | RegisteredUser. כל מי שמטפל ב-User צריך לבדוק kind כדי לדעת באיזה סוג מדובר. זה מאפשר type-safe handling של שני המקרים.",
      thinkingMethod: [
        "1. האם זה באמת union? (אורח OR רשום)",
        "2. discriminator field?",
        "3. exhaustive switch?",
        "4. מה אם יש סוג שלישי? (premium, banned)",
        "5. type guards?",
      ],
      purpose:
        "המטרה היא לתת שם אחיד לישות 'משתמש' שיכולה להיות מסוגים שונים.",
      codeSnippets: [
        {
          title: "User as union",
          code: "type User = GuestUser | RegisteredUser;\n\nfunction greet(u: User): string {\n  if (u.kind === 'guest') return `אורח ${u.sessionId}`;\n  return `שלום ${u.username}`;\n}",
          explanation: "narrowing לפי kind — בכל ענף הטיפוס מצומצם.",
        },
      ],
      codeBreakdowns: [
        {
          code: "type User = GuestUser | RegisteredUser;",
          parts: [
            { piece: "type User", role: "alias למשתמש." },
            { piece: "GuestUser | RegisteredUser", role: "Union — או אחד או השני." },
          ],
          summary: "User מאחד את שני הסוגים תחת שם אחד.",
        },
      ],
    },
  },

  "lesson_27::Transaction": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Transaction זה רישום של פעולה כספית — הכנסה או הוצאה. שמרו תאריך, סכום, קטגוריה. כמו רישום בפנקס.",
      simpleExplanation:
        "Transaction הוא interface שמייצג פעולה כספית באפליקציית budgeting. שדות אופייניים: id, amount, date, category, type (income/expense). השדות מאפשרים סינון, סיכום, ופילוח.",
      thinkingMethod: [
        "1. אילו פרטים נחוצים?",
        "2. amount תמיד חיובי + type, או חיובי/שלילי?",
        "3. category קבועה או מבין enum?",
        "4. date כ-Date או string?",
        "5. תיאור / note אופציונלי?",
      ],
      purpose:
        "המטרה היא לתעד פעולה כספית בודדת בצורה אחידה ומלאה.",
      codeSnippets: [
        {
          title: "Transaction",
          code: "interface Transaction {\n  id: string;\n  amount: number;\n  date: Date;\n  type: 'income' | 'expense';\n  category: Category;\n  note?: string;\n}",
          explanation: "כל מה שצריך לדעת על פעולה אחת.",
        },
      ],
      codeBreakdowns: [
        {
          code: "{ amount: 250, type: 'expense', category: 'food' }",
          parts: [
            { piece: "amount: 250", role: "סכום בשקלים." },
            { piece: "type: 'expense'", role: "הוצאה — להבדיל מהכנסה." },
            { piece: "category: 'food'", role: "פילוח לקטגוריה." },
          ],
          summary: "תיעוד הוצאה של 250 שקל לקטגוריית מזון.",
        },
      ],
    },
  },

  "lesson_27::Income": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Income זה הכנסה — כסף שנכנס. משכורת, מתנה, החזר מס. סכומים חיוביים שמגדילים את הקופה.",
      simpleExplanation:
        "Income הוא Transaction עם type='income'. בקוד אפשר להגדיר אותו כ-interface שמרחיב Transaction עם type='income' (literal narrowing), או לסנן ממערך Transactions.",
      thinkingMethod: [
        "1. אילו מקורות הכנסה? (salary, gift, refund)",
        "2. תדירות? (חד-פעמי, חודשי)",
        "3. האם להגדיר קטגוריות עצמאיות?",
        "4. סינון מתוך כל ה-Transactions?",
        "5. סיכום סכומי הכנסה?",
      ],
      purpose:
        "המטרה היא להבחין הכנסות מהוצאות לצורכי דיווח וניהול תקציב.",
      codeSnippets: [
        {
          title: "Income — narrowed type",
          code: "type Income = Transaction & { type: 'income' };\n\nconst incomes: Income[] = transactions.filter(t => t.type === 'income') as Income[];",
          explanation: "Intersection — Transaction שאוכף type='income'.",
        },
      ],
      codeBreakdowns: [
        {
          code: "transactions.filter(t => t.type === 'income')",
          parts: [
            { piece: "transactions.filter", role: "מחזיר תת-מערך לפי תנאי." },
            { piece: "t.type === 'income'", role: "תנאי — רק הכנסות." },
          ],
          summary: "סינון של כל ההכנסות מתוך כלל הפעולות.",
        },
      ],
    },
  },

  "lesson_27::Expense": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Expense זה הוצאה — כסף שיצא. קניות, תשלומים, חשבונות. סכומים שמורידים מהקופה.",
      simpleExplanation:
        "Expense הוא Transaction עם type='expense'. בנוי בדיוק כמו Income, רק ההפך. שילוב של Income + Expense = כל ה-Transactions.",
      thinkingMethod: [
        "1. אילו קטגוריות הוצאה? (food, rent, transport)",
        "2. הוצאות חוזרות (recurring)?",
        "3. סינון/קיבוץ לפי קטגוריה?",
        "4. תקציב לכל קטגוריה?",
        "5. התראות אם עוברים?",
      ],
      purpose:
        "המטרה היא לעקוב אחרי הוצאות לצורך ניהול תקציב ופילוח.",
      codeSnippets: [
        {
          title: "Expense — narrowed",
          code: "type Expense = Transaction & { type: 'expense' };\n\nconst totalExpense = transactions\n  .filter(t => t.type === 'expense')\n  .reduce((sum, t) => sum + t.amount, 0);",
          explanation: "סיכום כל ההוצאות באמצעות filter + reduce.",
        },
      ],
      codeBreakdowns: [
        {
          code: ".reduce((sum, t) => sum + t.amount, 0)",
          parts: [
            { piece: "reduce", role: "מצמצמת מערך לערך אחד." },
            { piece: "(sum, t)", role: "accumulator + פריט נוכחי." },
            { piece: "sum + t.amount", role: "מוסיף לסכום." },
            { piece: ", 0)", role: "ערך התחלתי 0." },
          ],
          summary: "צובר את כל הסכומים של ההוצאות לסך אחד.",
        },
      ],
    },
  },

  "lesson_27::Category": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Category זה הסוג של פעולה כספית — מזון, דיור, תחבורה. הקטגוריה עוזרת לראות לאן הכסף הולך.",
      simpleExplanation:
        "Category הוא לרוב enum או union type שמייצג סיווג של פעולה כספית. שימושי לפילוח (כמה הוצאתי על מזון החודש), לסינון, ולהצגה גרפית (pie chart).",
      thinkingMethod: [
        "1. אילו קטגוריות?",
        "2. enum או string?",
        "3. הוספה דינמית או רשימה סגורה?",
        "4. האם יש sub-categories?",
        "5. תרגום ל-UI?",
      ],
      purpose:
        "המטרה היא לסווג פעולות לקטגוריות לצורך ניתוח תקציב.",
      codeSnippets: [
        {
          title: "Category enum",
          code: "enum Category {\n  Food = 'food',\n  Rent = 'rent',\n  Transport = 'transport',\n  Entertainment = 'entertainment',\n  Salary = 'salary'\n}",
          explanation: "חמש קטגוריות סגורות.",
        },
      ],
      codeBreakdowns: [
        {
          code: "category: Category",
          parts: [
            { piece: "category", role: "שם השדה." },
            { piece: ": Category", role: "טיפוס — אחד מערכי ה-enum." },
          ],
          summary: "השדה category חייב להיות ערך תקין מ-enum Category.",
        },
      ],
    },
  },

  "lesson_27::Amount": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Amount זה הסכום — כמה כסף בפעולה. תמיד חיובי. הסימן (הכנסה/הוצאה) מגיע מ-type.",
      simpleExplanation:
        "Amount הוא שדה number בדרך כלל חיובי שמייצג סכום פעולה. האם זה הכנסה או הוצאה — נקבע לפי type. הפרדה בין amount ל-type מאפשרת חישובים נקיים: סכום מוחלט תמיד, סימן תלוי בקונטקסט.",
      thinkingMethod: [
        "1. תמיד חיובי? (כן, מומלץ)",
        "2. במטבע אחד או כמה?",
        "3. שלמים (אגורות) או עשרוניים (שקלים)?",
        "4. ולידציה לערך מינימלי?",
        "5. תצוגה — Intl.NumberFormat?",
      ],
      purpose:
        "המטרה היא לייצג סכום כספי בצורה אחידה וניתנת לחישוב.",
      codeSnippets: [
        {
          title: "Amount עם ולידציה",
          code: "if (amount <= 0) throw new Error('סכום חייב להיות חיובי');",
          explanation: "מבטיחים שהסכום תקין לפני שמירה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "amount: number",
          parts: [
            { piece: "amount", role: "השדה — תמיד חיובי." },
            { piece: ": number", role: "טיפוס — מספר." },
          ],
          summary: "Amount הוא מספר חיובי; הסימן מגיע מהקונטקסט.",
        },
      ],
    },
  },

  "lesson_27::CRUD": {
    extendedTab: {
      simpleGrandma:
        "סבתא, CRUD זה ארבעת הפעולות הבסיסיות על נתונים: ליצור, לקרוא, לעדכן, למחוק. כמו ניהול רשימת קניות — מוסיפים, רואים, משנים, מסירים.",
      simpleExplanation:
        "CRUD = Create, Read, Update, Delete — ארבעת הפעולות שמכסות את רוב האינטראקציה עם נתונים. כל אפליקציית ניהול נתונים מממשת את ארבעתן. ב-React מתאים ל-state operations, ב-API ל-HTTP methods (POST, GET, PUT, DELETE).",
      thinkingMethod: [
        "1. אילו פעולות נחוצות לישות?",
        "2. כל אחת — בקליק או באוטומציה?",
        "3. סינכרוני (state) או אסינכרוני (API)?",
        "4. אישור לפני delete?",
        "5. אופטימיזציה (optimistic update)?",
      ],
      purpose:
        "המטרה היא לכסות את כל מחזור החיים של נתונים — יצירה, הצגה, שינוי, ומחיקה.",
      codeSnippets: [
        {
          title: "CRUD ב-React state",
          code: "function add(t) { setItems([...items, t]); }\nfunction remove(id) { setItems(items.filter(x => x.id !== id)); }\nfunction update(id, patch) {\n  setItems(items.map(x => x.id === id ? { ...x, ...patch } : x));\n}\n// read = items עצמו",
          explanation: "ארבע הפעולות על מערך state.",
        },
      ],
      codeBreakdowns: [
        {
          code: "items.map(x => x.id === id ? { ...x, ...patch } : x)",
          parts: [
            { piece: "items.map", role: "יוצר מערך חדש." },
            { piece: "x.id === id", role: "מזהה את הפריט לעדכון." },
            { piece: "{ ...x, ...patch }", role: "אובייקט חדש עם שדות מעודכנים." },
            { piece: ": x", role: "פריטים אחרים נשארים כפי שהם." },
          ],
          summary: "Update immutable: יוצרים מערך חדש עם פריט אחד מעודכן.",
        },
      ],
    },
  },

  "lesson_27::Budget Summary": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Budget Summary זה סיכום התקציב — כמה הכנסת, כמה הוצאת, וכמה נשאר. כמו סוף חודש בפנקס.",
      simpleExplanation:
        "Budget Summary הוא חישוב סיכום של כל התנועות בתקופה: סך הכנסות, סך הוצאות, מאזן (income - expense). מציגים אותו כ-dashboard עם 3 כרטיסים. המקור: filter + reduce על מערך Transactions.",
      thinkingMethod: [
        "1. איזו תקופה? (חודש/שנה/הכל)",
        "2. אילו סיכומים? (income, expense, balance)",
        "3. גרף או מספרים?",
        "4. השוואה לתקופה קודמת?",
        "5. תקציב מתוכנן vs בפועל?",
      ],
      purpose:
        "המטרה היא לתת תמונה ברורה ומיידית של מצב התקציב.",
      codeSnippets: [
        {
          title: "Summary calc",
          code: "function summary(txs: Transaction[]) {\n  const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);\n  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);\n  return { income, expense, balance: income - expense };\n}",
          explanation: "שני filter+reduce, ואז הפרש = balance.",
        },
      ],
      codeBreakdowns: [
        {
          code: "return { income, expense, balance: income - expense };",
          parts: [
            { piece: "{ income, expense, balance }", role: "אובייקט תוצאה עם שלושה שדות." },
            { piece: "balance: income - expense", role: "המאזן — הפרש בין הכנסות להוצאות." },
          ],
          summary: "מחזיר אובייקט summary שמכיל את כל מה שצריך לדשבורד.",
        },
      ],
    },
  },

  "lesson_27::Category Breakdown": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Category Breakdown זה פילוח לפי קטגוריה — כמה הוצאתי על אוכל, כמה על שכירות, כמה על תחבורה. תמונה ברורה לאן הכסף הולך.",
      simpleExplanation:
        "Category Breakdown מפלח את ההוצאות לפי קטגוריה ומציג את הסיכומים. מומש לרוב עם reduce שצובר Map של category → sum, או עם groupBy. הצגה: רשימה עם אחוזים, או pie chart.",
      thinkingMethod: [
        "1. איזה תקופה לפלח?",
        "2. רק הוצאות, או גם הכנסות?",
        "3. סדר — יורד לפי סכום?",
        "4. אחוז מהסך?",
        "5. הצגה — טקסט או גרף?",
      ],
      purpose:
        "המטרה היא לתת תובנות על אופי הצריכה — איזו קטגוריה דומיננטית.",
      codeSnippets: [
        {
          title: "Breakdown",
          code: "function breakdown(txs: Transaction[]) {\n  return txs.reduce((acc, t) => {\n    acc[t.category] = (acc[t.category] || 0) + t.amount;\n    return acc;\n  }, {} as Record<string, number>);\n}",
          explanation: "צובר Map של category → sum באמצעות reduce.",
        },
      ],
      codeBreakdowns: [
        {
          code: "acc[t.category] = (acc[t.category] || 0) + t.amount;",
          parts: [
            { piece: "acc[t.category]", role: "ערך נוכחי בקטגוריה הזאת." },
            { piece: "(acc[t.category] || 0)", role: "אם אין — מתחילים מ-0." },
            { piece: "+ t.amount", role: "מוסיפים את סכום הפעולה." },
          ],
          summary: "צובר תוספת לקטגוריה — מאפס לאפס אם זאת הפעם הראשונה.",
        },
      ],
    },
  },

  // ============================================================================
  // Lesson 21 — React Basics, Vite, JSX, props (23 concepts)
  // ============================================================================

  "lesson_21::React": {
    extendedTab: {
      simpleGrandma:
        "סבתא, React זה כלי לבניית אתרים שמתעדכנים לבד. במקום לכתוב הכל מאפס, React מחלק את הדף לחתיכות קטנות (קומפוננטות) שאפשר להרכיב כמו לגו.",
      simpleExplanation:
        "React היא ספריית JavaScript של Meta לבניית UI. בנויה סביב קומפוננטות — פונקציות שמחזירות תיאור של מסך (JSX). כשהנתונים משתנים, React מעדכן רק את החלקים הרלוונטיים ב-DOM.",
      thinkingMethod: [
        "1. איזה חלק של ה-UI אני בונה?",
        "2. האם הוא קומפוננטה לבד או מורכב מכמה?",
        "3. איזה state יש לו?",
        "4. אילו props הוא מקבל?",
        "5. מה הוא מחזיר (JSX)?",
      ],
      purpose:
        "המטרה היא לבנות UI מורכב מחלקים קטנים, ניתנים לשימוש חוזר, ולאפשר עדכון אוטומטי בעקבות שינויים בנתונים.",
      codeSnippets: [
        {
          title: "קומפוננטה הכי בסיסית",
          code: "function Hello() {\n  return <h1>שלום!</h1>;\n}",
          explanation: "פונקציה שמחזירה JSX = קומפוננטה.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Hello() { return <h1>שלום</h1>; }",
          parts: [
            { piece: "function Hello", role: "הצהרה על קומפוננטה — שם באות גדולה." },
            { piece: "return", role: "מחזיר את ה-UI שתוצג." },
            { piece: "<h1>שלום</h1>", role: "JSX — נראה כמו HTML, באמת JS." },
          ],
          summary: "כל קומפוננטה היא פונקציה שמחזירה JSX.",
        },
      ],
    },
  },

  "lesson_21::Client Side": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Client Side זה הקוד שרץ במחשב שלך, בדפדפן. שונה מהשרת — שמרוחק. ב-Client Side את רואה הכל מיד, בלי לחכות לשרת.",
      simpleExplanation:
        "Client Side הוא קוד שרץ בדפדפן של המשתמש. React לרוב נחשבת ספריית Client Side: השרת שולח HTML ריק + JS, וה-JS בונה את ה-UI בדפדפן. זה מהיר לאינטראקציות, אבל איטי לטעינה ראשונה.",
      thinkingMethod: [
        "1. מה רץ בדפדפן? (UI, אירועים, state)",
        "2. מה רץ בשרת? (database, auth, business logic)",
        "3. CSR או SSR? (SPA או דף מסורתי)",
        "4. מה ה-trade-off? (initial speed vs interactivity)",
        "5. SEO?",
      ],
      purpose:
        "מבחינים בין Client Side ל-Server Side כדי להבין איפה לוגיקה רצה, ואיך הוא משפיע על הביצועים והאבטחה.",
      codeSnippets: [
        {
          title: "Client Side",
          code: "// כל הקוד הזה רץ בדפדפן\nconst [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>{count}</button>",
          explanation: "האירועים, ה-state, וה-render — הכל בדפדפן.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<script src='/bundle.js'></script>",
          parts: [
            { piece: "<script>", role: "טוען קוד JS." },
            { piece: "src='/bundle.js'", role: "ה-bundle של React שירוץ בדפדפן." },
          ],
          summary: "הדפדפן מקבל script ומריץ — הכל ב-Client Side.",
        },
      ],
    },
  },

  "lesson_21::React Native": {
    extendedTab: {
      simpleGrandma:
        "סבתא, React Native זה אחיו של React לאפליקציות בטלפון. אותו ידע, מסך אחר. במקום אתר — אפליקציה ב-iPhone וב-Android.",
      simpleExplanation:
        "React Native היא framework לבניית אפליקציות mobile native ב-JavaScript ו-React. במקום HTML — קומפוננטות native (View, Text). אותו אפליקציה רצה ב-iOS וב-Android.",
      thinkingMethod: [
        "1. צריך אפליקציה לטלפון? (Native app)",
        "2. שתי הפלטפורמות? (RN חוסך זמן)",
        "3. ביצועים קריטיים? (טהורה native אולי טובה יותר)",
        "4. צוות שיודע React?",
        "5. שימוש בספריות מיוחדות native?",
      ],
      purpose:
        "המטרה היא לבנות אפליקציות mobile עם code base אחד, מבלי לוותר על UX native.",
      codeSnippets: [
        {
          title: "RN component",
          code: "import { View, Text } from 'react-native';\nfunction Hello() {\n  return <View><Text>שלום!</Text></View>;\n}",
          explanation: "View במקום div, Text במקום p — קומפוננטות native.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<View style={{ padding: 16 }}>",
          parts: [
            { piece: "<View>", role: "קומפוננטה native — UIView ב-iOS / android.View." },
            { piece: "style={{ padding: 16 }}", role: "Style כאובייקט JS — לא CSS." },
          ],
          summary: "RN משתמש בקומפוננטות native ובסטיילים JS.",
        },
      ],
    },
  },

  "lesson_21::Vite": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Vite זה כלי שמתחיל פרויקט React חדש בלחיצת כפתור. הוא גם מציג שינויים בקוד בלי שתצטרכי לרענן את הדף.",
      simpleExplanation:
        "Vite (בצרפתית: 'מהר') הוא build tool מודרני לאפליקציות web. מספק dev server מהיר עם HMR (עדכון מיידי), ובניית production מאופטמת. החליף את Create React App ברוב הפרויקטים החדשים.",
      thinkingMethod: [
        "1. פרויקט חדש? (npm create vite@latest)",
        "2. איזה template? (react, react-ts, vue, svelte)",
        "3. הגדרות ב-vite.config.js?",
        "4. plugins נדרשים?",
        "5. dev או build?",
      ],
      purpose:
        "המטרה היא לתת חוויית פיתוח מהירה — start instant, HMR פחות משנייה, ו-build אופטימלי ל-production.",
      codeSnippets: [
        {
          title: "scripts אופייניים",
          code: "// package.json\n\"scripts\": {\n  \"dev\": \"vite\",\n  \"build\": \"vite build\",\n  \"preview\": \"vite preview\"\n}",
          explanation: "שלוש הפקודות העיקריות של Vite.",
        },
      ],
      codeBreakdowns: [
        {
          code: "import react from '@vitejs/plugin-react';\nexport default { plugins: [react()] };",
          parts: [
            { piece: "@vitejs/plugin-react", role: "Plugin רשמי שמוסיף תמיכה ב-React (JSX, Fast Refresh)." },
            { piece: "plugins: [react()]", role: "מפעיל את ה-plugin." },
          ],
          summary: "vite.config.js מינימלי לפרויקט React.",
        },
      ],
    },
  },

  "lesson_21::npm create vite@latest": {
    extendedTab: {
      simpleGrandma:
        "סבתא, זאת הפקודה שיוצרת פרויקט React חדש. מקלידים, עונים על כמה שאלות, וקיבלת תיקייה מוכנה לעבודה.",
      simpleExplanation:
        "npm create vite@latest מוריד ומפעיל את ה-installer של Vite. הוא שואל שם פרויקט וטמפלייט (React/Vue/Svelte), ויוצר תיקייה עם מבנה בסיסי. ה-@latest מבטיח את הגרסה הטרייה.",
      thinkingMethod: [
        "1. שם הפרויקט?",
        "2. איזה template? (react, react-ts לעבוד עם TS)",
        "3. אחרי יצירה — cd, npm install, npm run dev",
        "4. האם להוסיף ספריות נוספות (router, tailwind)?",
        "5. git init?",
      ],
      purpose:
        "המטרה היא ליצור פרויקט מוכן לעבודה תוך שניות, עם מבנה תיקיות מקובל.",
      codeSnippets: [
        {
          title: "interactive",
          code: "$ npm create vite@latest\n? Project name: my-app\n? Select a framework: React\n? Select a variant: JavaScript\n✔ Done!",
          explanation: "תהליך אינטראקטיבי — בוחרים שם ו-template.",
        },
        {
          title: "bypass questions",
          code: "npm create vite@latest my-app -- --template react-ts",
          explanation: "מציינים הכל מראש — מהיר יותר.",
        },
      ],
      codeBreakdowns: [
        {
          code: "npm create vite@latest my-app -- --template react",
          parts: [
            { piece: "npm create vite", role: "מריץ את היוצר של Vite." },
            { piece: "@latest", role: "הגרסה הטרייה ביותר." },
            { piece: "my-app", role: "שם תיקיית הפרויקט." },
            { piece: "-- --template react", role: "ארגומנטים ל-installer; --template בוחר את הסוג." },
          ],
          summary: "פקודה שיוצרת פרויקט React חדש בתיקייה my-app.",
        },
      ],
    },
  },

  "lesson_21::npm install": {
    extendedTab: {
      simpleGrandma:
        "סבתא, npm install זה לרוץ למכולת ולהביא את כל המצרכים שכתובים ברשימה. בלעדיהם — הפרויקט לא רץ.",
      simpleExplanation:
        "npm install קורא את package.json, מוריד את כל ה-dependencies לתוך node_modules, ויוצר/מעדכן package-lock.json עם הגרסאות המדויקות. צריך אחרי clone, אחרי שינוי package.json, ואחרי החלפת branch.",
      thinkingMethod: [
        "1. האם package.json קיים?",
        "2. האם דרושות גרסאות מסוימות?",
        "3. dev dependency או רגיל? (-D או רגיל)",
        "4. האם להפעיל --prefer-offline (cache)?",
        "5. lock file נכלל?",
      ],
      purpose:
        "המטרה היא להוריד את כל הספריות שהפרויקט משתמש בהן, כדי שניתן יהיה להריץ ולפתח.",
      codeSnippets: [
        {
          title: "פקודות נפוצות",
          code: "npm install                    # כל ה-deps מ-package.json\nnpm install react-router-dom    # הוסף חבילה\nnpm install -D vite            # הוסף devDependency",
          explanation: "התקנה מלאה או של חבילה ספציפית.",
        },
      ],
      codeBreakdowns: [
        {
          code: "npm install -D vite",
          parts: [
            { piece: "npm install", role: "פקודת ההתקנה." },
            { piece: "-D", role: "דגל ל-devDependency (כלי פיתוח, לא runtime)." },
            { piece: "vite", role: "שם החבילה." },
          ],
          summary: "מתקין את vite כ-devDependency — נכנס ל-package.json תחת devDependencies.",
        },
      ],
    },
  },

  "lesson_21::npm run dev": {
    extendedTab: {
      simpleGrandma:
        "סבתא, npm run dev זה מדליק את 'מנוע הפיתוח'. הדפדפן נפתח, את עורכת קוד, ורואה שינויים מיד — בלי לרענן.",
      simpleExplanation:
        "npm run dev מריץ את הסקריפט dev שמוגדר ב-package.json. ב-Vite זה מפעיל dev server (לרוב על http://localhost:5173) עם HMR — שינויים בקוד מתעדכנים מיד בדפדפן.",
      thinkingMethod: [
        "1. האם הסקריפט קיים ב-package.json?",
        "2. הפורט פנוי?",
        "3. רוצים גישה מהרשת? (--host)",
        "4. רוצים פתיחה אוטומטית? (--open)",
        "5. שגיאות בקונסול?",
      ],
      purpose:
        "המטרה היא לתת dev experience מהיר עם feedback מיידי על כל שינוי בקוד.",
      codeSnippets: [
        {
          title: "פלט אופייני",
          code: "$ npm run dev\n  VITE v5.0.0  ready in 320 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  press 'h' to show help",
          explanation: "הקישור ב-Local זה הכתובת לפתוח בדפדפן.",
        },
      ],
      codeBreakdowns: [
        {
          code: "npm run dev",
          parts: [
            { piece: "npm run", role: "מריץ סקריפט מ-package.json." },
            { piece: "dev", role: "שם הסקריפט (לפי convention — 'dev')." },
          ],
          summary: "הסקריפט dev (לרוב 'vite') מפעיל את ה-dev server.",
        },
      ],
    },
  },

  "lesson_21::index.html": {
    extendedTab: {
      simpleGrandma:
        "סבתא, index.html זה הדף הראשון שהדפדפן רואה. הוא ריק כמעט — אבל מצביע על קוד JS שיוצר את כל התוכן.",
      simpleExplanation:
        "index.html הוא קובץ ה-entry של אפליקציית Web. ב-React: מכיל <div id='root'></div> ריק לתוכו React מזריקה את ה-UI, ו-<script src='main.jsx'> שטוען את הקוד.",
      thinkingMethod: [
        "1. האם div#root קיים?",
        "2. האם <script type='module'> מצביע ל-main.jsx?",
        "3. meta tags? (title, charset, viewport)",
        "4. favicon?",
        "5. lang ו-dir (לעברית: dir='rtl')",
      ],
      purpose:
        "המטרה היא להוות את נקודת הכניסה של הדפדפן ולהזריק את ה-React mount point.",
      codeSnippets: [
        {
          title: "index.html טיפוסי",
          code: "<!doctype html>\n<html lang='he' dir='rtl'>\n  <head>\n    <meta charset='UTF-8' />\n    <title>האפליקציה שלי</title>\n  </head>\n  <body>\n    <div id='root'></div>\n    <script type='module' src='/src/main.jsx'></script>\n  </body>\n</html>",
          explanation: "מבנה מינימלי לאפליקציית React.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<div id='root'></div>",
          parts: [
            { piece: "<div>", role: "אלמנט ריק." },
            { piece: "id='root'", role: "ID שיצרך React כדי למצוא את הנקודה ולמלא בה את הקומפוננטות." },
          ],
          summary: "ה-mount point של React — לתוך זה הקוד מזריק את כל ה-UI.",
        },
      ],
    },
  },

  "lesson_21::main.jsx": {
    extendedTab: {
      simpleGrandma:
        "סבתא, main.jsx זה הקובץ שמתחיל את האפליקציה. הוא לוקח את App ומציב אותו בתוך index.html.",
      simpleExplanation:
        "main.jsx הוא ה-entry של ה-JavaScript. משתמש ב-ReactDOM.createRoot למקם את הקומפוננטה App בתוך div#root. גם מייבא CSS גלובלי ו-providers.",
      thinkingMethod: [
        "1. האם הוא מייבא את App?",
        "2. createRoot על #root?",
        "3. CSS גלובלי?",
        "4. StrictMode?",
        "5. Provider עוטף? (Router, Theme)",
      ],
      purpose:
        "המטרה היא להפעיל את React, להגדיר את ה-mount point, ולהזריק providers גלובליים.",
      codeSnippets: [
        {
          title: "main.jsx טיפוסי",
          code: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
          explanation: "מייבא, יוצר root, מציג את App.",
        },
      ],
      codeBreakdowns: [
        {
          code: "ReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          parts: [
            { piece: "createRoot", role: "API חדש (React 18+) — תומך ב-Concurrent." },
            { piece: "document.getElementById('root')", role: "ה-DOM element מ-index.html." },
            { piece: ".render(<App />)", role: "מציג את App בתוך ה-root." },
          ],
          summary: "שורה מרכזית: יוצרת root ומציגה את App.",
        },
      ],
    },
  },

  "lesson_21::App.jsx": {
    extendedTab: {
      simpleGrandma:
        "סבתא, App.jsx זה הקומפוננטה הראשית — כמו הסלון של הבית. כל החדרים האחרים נכנסים אליו.",
      simpleExplanation:
        "App.jsx הוא הקומפוננטה הראשית. מכיל את ה-layout הכללי, ה-router, ולעיתים גם state גלובלי. מיוצא דרך export default ומשולב ב-main.jsx.",
      thinkingMethod: [
        "1. מה ה-layout הראשי? (header, main, footer)",
        "2. router?",
        "3. context providers?",
        "4. global state?",
        "5. שמירת App דק — להעביר לוגיקה לקומפוננטות נפרדות.",
      ],
      purpose:
        "המטרה היא להגדיר את המבנה והניווט הכלליים של האפליקציה.",
      codeSnippets: [
        {
          title: "App.jsx פשוט",
          code: "import Header from './Header';\nimport Footer from './Footer';\n\nfunction App() {\n  return (\n    <>\n      <Header />\n      <main>תוכן ראשי</main>\n      <Footer />\n    </>\n  );\n}\n\nexport default App;",
          explanation: "App מארגן header, main, footer.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function App() { return <><Header /><main /><Footer /></>; }",
          parts: [
            { piece: "function App", role: "קומפוננטה ראשית — שם באות גדולה." },
            { piece: "<>", role: "Fragment — עוטף בלי להוסיף div." },
            { piece: "<Header />, <Footer />", role: "קומפוננטות-בנים." },
          ],
          summary: "App מורכב מ-3 קומפוננטות — מבנה layout בסיסי.",
        },
      ],
    },
  },

  "lesson_21::App.css": {
    extendedTab: {
      simpleGrandma:
        "סבתא, App.css זה קובץ העיצוב של האפליקציה — צבעים, גודלים, פונט. כל מה שעיצובי.",
      simpleExplanation:
        "App.css הוא קובץ CSS שמיובא ב-App.jsx (או main.jsx). מגדיר עיצוב — צבעים, layout, typography. ב-Vite ייבוא של CSS גורם להוספתו ל-bundle.",
      thinkingMethod: [
        "1. גלובלי או לקומפוננטה?",
        "2. CSS Modules? (App.module.css)",
        "3. Tailwind? (utility classes)",
        "4. responsive? (media queries)",
        "5. dark mode?",
      ],
      purpose:
        "המטרה היא לעצב את ה-UI ולשמור על מראה אחיד באפליקציה.",
      codeSnippets: [
        {
          title: "App.css דוגמה",
          code: ".app {\n  text-align: center;\n  padding: 2rem;\n  font-family: 'Heebo', sans-serif;\n}\n.app h1 {\n  color: #4c1d95;\n}",
          explanation: "מסגנן את ה-container והכותרות בתוכו.",
        },
      ],
      codeBreakdowns: [
        {
          code: "import './App.css';",
          parts: [
            { piece: "import", role: "ייבוא — בלי שם, side-effect." },
            { piece: "'./App.css'", role: "ה-CSS יוטמע ב-bundle ויחול על הדף." },
          ],
          summary: "ייבוא CSS — Vite מטפל בו אוטומטית.",
        },
      ],
    },
  },

  "lesson_21::Component": {
    extendedTab: {
      simpleGrandma:
        "סבתא, Component (קומפוננטה) זה חתיכה של דף — כפתור, כותרת, רשימה. כל אחת בקובץ משלה, וכולן מתחברות יחד.",
      simpleExplanation:
        "Component הוא יחידת בנייה ב-React: פונקציה שמחזירה JSX. שמה מתחיל באות גדולה, מקבלת props, ניתנת לשימוש חוזר. מחליפה את class components הוותיקות.",
      thinkingMethod: [
        "1. מה הקומפוננטה אמורה להציג?",
        "2. אילו props היא מקבלת?",
        "3. האם יש לה state פנימי?",
        "4. האם היא reusable?",
        "5. האם השם תיאורי? (Button, UserCard, MovieList)",
      ],
      purpose:
        "המטרה היא לחלק UI מורכב לחלקים קטנים, ניתנים לבדיקה ולשימוש חוזר.",
      codeSnippets: [
        {
          title: "Component עם props",
          code: "function Greeting({ name, age }) {\n  return <h2>שלום {name}, גיל {age}</h2>;\n}\n\n<Greeting name='דני' age={30} />",
          explanation: "קומפוננטה שמציגה ברכה לפי props.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Greeting({ name }) { return <h2>שלום {name}</h2>; }",
          parts: [
            { piece: "function Greeting", role: "קומפוננטה — שם באות גדולה." },
            { piece: "({ name })", role: "destructuring של props." },
            { piece: "return <h2>...</h2>", role: "JSX — מה שיוצג." },
            { piece: "{name}", role: "שילוב משתנה ב-JSX." },
          ],
          summary: "פונקציה שמקבלת props ומחזירה JSX = קומפוננטת React.",
        },
      ],
    },
  },

  "lesson_21::RFC": {
    extendedTab: {
      simpleGrandma:
        "סבתא, RFC זה ראשי תיבות של React Function Component — סוג של קומפוננטה. הסוג המודרני, פשוט יותר ממה שהיה בעבר.",
      simpleExplanation:
        "RFC = React Function Component. פונקציית JS שמחזירה JSX. החליפה את class components ברוב המקרים. תומכת ב-Hooks (useState, useEffect). ב-VS Code יש snippet 'rfc' שיוצר תבנית.",
      thinkingMethod: [
        "1. האם זאת קומפוננטה חדשה? (rfc snippet עוזר)",
        "2. האם לשם יש משמעות?",
        "3. props נדרשים?",
        "4. state פנימי?",
        "5. effects?",
      ],
      purpose:
        "המטרה היא להאיץ יצירת קומפוננטות עם תבנית מוכנה ועקבית.",
      codeSnippets: [
        {
          title: "rfc snippet",
          code: "// אחרי הקלדת 'rfc' + Tab\nimport React from 'react';\n\nfunction MyComp() {\n  return <div></div>;\n}\n\nexport default MyComp;",
          explanation: "מבנה קומפוננטה ריק, מוכן למילוי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function MyComp() { return <div></div>; }\nexport default MyComp;",
          parts: [
            { piece: "function MyComp", role: "הקומפוננטה." },
            { piece: "return <div></div>", role: "JSX ריק — להתחלה." },
            { piece: "export default", role: "מאפשר ייבוא בקבצים אחרים." },
          ],
          summary: "מבנה בסיסי שכל RFC מכיל.",
        },
      ],
    },
  },

  "lesson_21::JSX": {
    extendedTab: {
      simpleGrandma:
        "סבתא, JSX זה דרך לכתוב HTML בתוך JavaScript. במקום קבצים נפרדים, הצורה והלוגיקה במקום אחד.",
      simpleExplanation:
        "JSX (JavaScript XML) הוא syntax sugar שמאפשר לכתוב משהו שנראה כמו HTML בתוך JS. ה-build tool (Vite/Babel) ממיר אותו לקריאות React.createElement. תומך ב-expressions עם {}.",
      thinkingMethod: [
        "1. שם רכיב באות גדולה? (Component) או קטנה? (div)",
        "2. אטריבוטים ב-camelCase? (className, onClick)",
        "3. expressions ב-{}",
        "4. self-closing? (<br />)",
        "5. רכיב יחיד? (Fragment אם צריך כמה)",
      ],
      purpose:
        "המטרה היא לתת תחביר נוח וברור לתאר UI, שדומה ל-HTML אבל עם כוח של JS.",
      codeSnippets: [
        {
          title: "JSX עם expressions",
          code: "function Card({ title, count }) {\n  return (\n    <div className='card'>\n      <h2>{title}</h2>\n      <p>פריטים: {count}</p>\n      {count > 0 && <button>הצג</button>}\n    </div>\n  );\n}",
          explanation: "JSX משלב HTML, expressions, ו-conditional rendering.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<div className='card' onClick={handleClick}>{title}</div>",
          parts: [
            { piece: "<div>", role: "אלמנט HTML." },
            { piece: "className='card'", role: "אטריבוט — class ב-React." },
            { piece: "onClick={handleClick}", role: "event handler — ערך JS." },
            { piece: "{title}", role: "expression — משתנה משולב." },
          ],
          summary: "JSX = HTML + JS expressions, עם כללים קצת שונים מ-HTML.",
        },
      ],
    },
  },

  "lesson_21::className": {
    extendedTab: {
      simpleGrandma:
        "סבתא, className זה איך אומרים 'class' ב-React. הסיבה שונה לשם זה ש-class היא מילה שמורה ב-JS.",
      simpleExplanation:
        "className היא תכונת JSX שמקבילה ל-class ב-HTML. משתמשים בה לחיבור CSS classes. השם שונה כי 'class' היא מילה שמורה ב-JavaScript (כמו class declaration).",
      thinkingMethod: [
        "1. איזה class CSS צריך?",
        "2. אחד או כמה? (מופרדים ברווח)",
        "3. תנאי? (template literal או clsx)",
        "4. dark mode / responsive? (Tailwind)",
        "5. CSS Module? (className={styles.btn})",
      ],
      purpose:
        "המטרה היא לחבר אלמנט ל-CSS rules דרך class names.",
      codeSnippets: [
        {
          title: "className דינמי",
          code: "<button className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}>\n  לחץ\n</button>",
          explanation: "מצרף שני class לפי תנאי.",
        },
      ],
      codeBreakdowns: [
        {
          code: "className={`btn ${active ? 'active' : ''}`}",
          parts: [
            { piece: "className=", role: "ה-attribute." },
            { piece: "{`...`}", role: "Template literal בתוך JSX expression." },
            { piece: "${active ? 'active' : ''}", role: "תוסף 'active' רק אם המשתנה true." },
          ],
          summary: "Class דינמי שתלוי ב-state.",
        },
      ],
    },
  },

  "lesson_21::{}": {
    extendedTab: {
      simpleGrandma:
        "סבתא, הסוגריים המסולסלים {} ב-JSX זה איך מתחבר HTML עם JavaScript. בתוכם — כל קוד JS שיוצר ערך.",
      simpleExplanation:
        "{} ב-JSX מאפשרים embedding של JavaScript expressions. בתוכם — משתנה, קריאה לפונקציה, ternary, פעולה אריתמטית. אסור statements (if, for) — רק expressions.",
      thinkingMethod: [
        "1. מה אני רוצה להציג? (משתנה, חישוב, תנאי)",
        "2. expression או statement? (אם statement — להמיר ל-expression)",
        "3. תנאי — ternary",
        "4. רשימה — map",
        "5. תצוגה מותנית — &&",
      ],
      purpose:
        "המטרה היא לחבר בין JSX סטטי ל-JavaScript דינמי.",
      codeSnippets: [
        {
          title: "שימושים שונים",
          code: "<p>שלום {name}</p>           // משתנה\n<p>סכום: {a + b}</p>          // חישוב\n<p>{user ? 'מחובר' : 'לא'}</p>  // תנאי\n<button onClick={handle}>X</button>  // פונקציה",
          explanation: "ארבעה דפוסי שימוש ב-{}.",
        },
      ],
      codeBreakdowns: [
        {
          code: "{user.isAdmin && <AdminPanel />}",
          parts: [
            { piece: "{...}", role: "JSX expression." },
            { piece: "user.isAdmin", role: "תנאי." },
            { piece: "&& <AdminPanel />", role: "אם התנאי truthy — מציג את הקומפוננטה." },
          ],
          summary: "תצוגה מותנית — נפוץ ב-React.",
        },
      ],
    },
  },

  "lesson_21::props": {
    extendedTab: {
      simpleGrandma:
        "סבתא, props זה מה שאת נותנת לקומפוננטה — נתונים, פונקציה, או הגדרה. כך הקומפוננטה מתאימה את עצמה למה שצריך.",
      simpleExplanation:
        "props (properties) הם הדרך להעביר נתונים מקומפוננטה אב לבן. נכנסים כאובייקט בארגומנט הראשון, נשלפים עם destructuring. הם read-only — אסור לבן לשנות.",
      thinkingMethod: [
        "1. איזה נתונים האב צריך לתת לבן?",
        "2. אילו חובה ואילו אופציונלי?",
        "3. callback functions?",
        "4. children?",
        "5. PropTypes או TypeScript?",
      ],
      purpose:
        "המטרה היא ליצור זרימת נתונים חד-כיוונית מאב לבן, ולעצב קומפוננטות גמישות וניתנות לשימוש חוזר.",
      codeSnippets: [
        {
          title: "props טיפוסי",
          code: "function MovieCard({ title, year, rating }) {\n  return (\n    <div>\n      <h3>{title} ({year})</h3>\n      <p>דירוג: {rating}</p>\n    </div>\n  );\n}\n\n<MovieCard title='הסרט' year={2024} rating={8.5} />",
          explanation: "האב נותן 3 props. הבן שולף בעזרת destructuring.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Btn({ label, onClick }) { return <button onClick={onClick}>{label}</button>; }",
          parts: [
            { piece: "{ label, onClick }", role: "destructuring — שולף שני props." },
            { piece: "label", role: "string לטקסט הכפתור." },
            { piece: "onClick", role: "callback — נקרא בלחיצה." },
          ],
          summary: "Btn מקבל label ו-onClick — הופך לכפתור גמיש.",
        },
      ],
    },
  },

  "lesson_21::import": {
    extendedTab: {
      simpleGrandma:
        "סבתא, import זה לבקש משהו מקובץ אחר. כמו לבקש מהשכן שיביא חלב.",
      simpleExplanation:
        "import הוא ES Modules syntax לייבוא ערכים מקבצים אחרים. שני סוגים: named import { x } from 'path' (כשהמקור משתמש ב-export name) ו-default import x from 'path' (כשהמקור export default).",
      thinkingMethod: [
        "1. מה אני צריך לייבא? (קומפוננטה, hook, function, CSS)",
        "2. named או default?",
        "3. מאיפה? (relative path, alias, node_modules)",
        "4. שינוי שם? (import { x as y })",
        "5. lazy import?",
      ],
      purpose:
        "המטרה היא לפצל קוד למודולים, לאפשר re-use, ולשמור על קבצים קצרים וברורים.",
      codeSnippets: [
        {
          title: "סוגי imports",
          code: "import React from 'react';                 // default\nimport { useState } from 'react';           // named\nimport React, { useState } from 'react';    // שניהם\nimport Button from './Button';              // קומפוננטה\nimport './styles.css';                       // side effect",
          explanation: "חמישה דפוסי ייבוא נפוצים.",
        },
      ],
      codeBreakdowns: [
        {
          code: "import { useState, useEffect } from 'react';",
          parts: [
            { piece: "import", role: "מילת מפתח." },
            { piece: "{ useState, useEffect }", role: "named imports — שמות חייבים להיות מדויקים." },
            { piece: "from 'react'", role: "המקור — חבילה מ-node_modules." },
          ],
          summary: "שני named imports מ-react.",
        },
      ],
    },
  },

  "lesson_21::export default": {
    extendedTab: {
      simpleGrandma:
        "סבתא, export default זה איך 'משחררים' קומפוננטה לקבצים אחרים. בלעדיו — אף אחד לא יכול לייבא אותה.",
      simpleExplanation:
        "export default מציין את הייצוא הראשי של קובץ. ניתן לייבא אותו עם import X from 'path' (השם בייבוא יכול להיות שונה מהמקור). כל קובץ יכול להיות עם default אחד + named exports נוספים.",
      thinkingMethod: [
        "1. מה הערך הראשי של הקובץ? (לרוב הקומפוננטה הראשית)",
        "2. default או named?",
        "3. שם השדה זהה לשם הקובץ?",
        "4. גם named exports נוספים?",
        "5. re-export מקבצים אחרים?",
      ],
      purpose:
        "המטרה היא להגדיר את הייצוא העיקרי — את 'הדבר' הראשי של הקובץ.",
      codeSnippets: [
        {
          title: "default + named",
          code: "// utils.js\nexport function helper1() {}        // named\nexport function helper2() {}        // named\nexport default class MainUtil {}    // default\n\n// import\nimport MainUtil, { helper1 } from './utils';",
          explanation: "default + named יחד — אפשר לייבא את שניהם.",
        },
      ],
      codeBreakdowns: [
        {
          code: "function Btn() { return <button />; }\nexport default Btn;",
          parts: [
            { piece: "function Btn", role: "הקומפוננטה." },
            { piece: "export default", role: "מסמן את Btn כייצוא הראשי." },
            { piece: "Btn", role: "הערך שמיוצא." },
          ],
          summary: "ייצוא ה-default — מאפשר import Btn from './Btn'.",
        },
      ],
    },
  },

  "lesson_21::inline style": {
    extendedTab: {
      simpleGrandma:
        "סבתא, inline style זה לכתוב צבע וגודל ישירות על האלמנט, בלי קובץ CSS נפרד. נוח לשינויים קטנים ודינמיים.",
      simpleExplanation:
        "inline style ב-React הוא prop בשם style שמקבל אובייקט JS עם properties. שמות ב-camelCase: backgroundColor, fontSize. ערכי מספר מתפרשים כ-px ברירת מחדל. לרוב משתמשים רק לעיצוב דינמי תלוי-state.",
      thinkingMethod: [
        "1. האם הערך דינמי? (תלוי state)",
        "2. או סטטי? (עדיף class)",
        "3. שם property ב-camelCase?",
        "4. ערך כ-string או number?",
        "5. media queries / hover? (אז class)",
      ],
      purpose:
        "המטרה היא לאפשר עיצוב דינמי שלא ניתן לכתוב מראש ב-CSS.",
      codeSnippets: [
        {
          title: "inline style דינמי",
          code: "function Box({ color, width }) {\n  return (\n    <div style={{\n      backgroundColor: color,\n      width: width,\n      padding: 16,\n      borderRadius: 8\n    }}>\n      קופסה\n    </div>\n  );\n}",
          explanation: "אובייקט style עם 4 properties; padding=16 מתפרש כ-16px.",
        },
      ],
      codeBreakdowns: [
        {
          code: "<div style={{ color: 'red', fontSize: 20 }}>",
          parts: [
            { piece: "style=", role: "prop של style." },
            { piece: "{{...}}", role: "סוגריים חיצוניים = JSX expression; פנימיים = אובייקט JS." },
            { piece: "color: 'red'", role: "property של CSS — string." },
            { piece: "fontSize: 20", role: "מספר → 20px." },
          ],
          summary: "Style כאובייקט JS בתוך JSX expression.",
        },
      ],
    },
  },

  "lesson_21::CSS import": {
    extendedTab: {
      simpleGrandma:
        "סבתא, CSS import זה להגיד לקובץ JS 'תכניס לי את העיצוב מהקובץ הזה'. כך הצבעים והגדלים נטענים יחד עם הקוד.",
      simpleExplanation:
        "ב-Vite (ובוונדלרים אחרים) ייבוא של קובץ CSS גורם להחלתו על הדף. הוא מוזרק ל-<head>. אסטרטגיות: גלובלי (ב-main.jsx), פר-קומפוננטה (ליד הקומפוננטה), CSS Modules (App.module.css), או Tailwind.",
      thinkingMethod: [
        "1. CSS גלובלי או לקומפוננטה?",
        "2. CSS Modules?",
        "3. Tailwind?",
        "4. reset/normalize?",
        "5. media queries (responsive)?",
      ],
      purpose:
        "המטרה היא לאחד עיצוב עם קוד וליהנות מ-bundling אוטומטי.",
      codeSnippets: [
        {
          title: "אסטרטגיות ייבוא",
          code: "// main.jsx\nimport './index.css';   // גלובלי\n\n// Button.jsx\nimport './Button.css';  // לקומפוננטה ספציפית\n\n// CSS Modules\nimport styles from './Card.module.css';\n<div className={styles.card}>",
          explanation: "שלושה דפוסי ייבוא — גלובלי, לקומפוננטה, ו-Modules.",
        },
      ],
      codeBreakdowns: [
        {
          code: "import styles from './Card.module.css';\n<div className={styles.card}>",
          parts: [
            { piece: "styles", role: "אובייקט שמכיל את ה-class names הסקופיים." },
            { piece: ".module.css", role: "קונבנציית CSS Modules — class names ייחודיים אוטומטית." },
            { piece: "{styles.card}", role: "ה-class המקומי, סקופי לקומפוננטה הזאת." },
          ],
          summary: "CSS Modules נותן סקופ מקומי — אין collision עם קומפוננטות אחרות.",
        },
      ],
    },
  },

  "lesson_21::map": {
    extendedTab: {
      simpleGrandma:
        "סבתא, map ב-React זה איך מציגים רשימה. אם יש רשימת שמות — map עוברת על כל אחד ויוצרת ממנו אלמנט להציג.",
      simpleExplanation:
        "map היא מתודה של מערך שיוצרת מערך חדש על ידי הפעלת פונקציה על כל איבר. ב-React משתמשים בה כדי להמיר מערך נתונים למערך אלמנטים. כל אלמנט חייב prop key ייחודי.",
      thinkingMethod: [
        "1. איזה מערך אני מציג?",
        "2. איזה אלמנט לכל פריט? (li, div, Card)",
        "3. key — מאיפה? (item.id מומלץ)",
        "4. מה אם המערך ריק? (empty state)",
        "5. סינון/מיון לפני? (filter / sort על עותק)",
      ],
      purpose:
        "המטרה היא להציג רשימות דינמיות בצורה הצהרתית.",
      codeSnippets: [
        {
          title: "map בסיסי",
          code: "function MovieList({ movies }) {\n  return (\n    <ul>\n      {movies.map(m => (\n        <li key={m.id}>{m.title}</li>\n      ))}\n    </ul>\n  );\n}",
          explanation: "ממפים movies לרשימת <li> עם key ייחודי.",
        },
        {
          title: "עם קומפוננטה",
          code: "{movies.map(m => <MovieCard key={m.id} {...m} />)}",
          explanation: "כל פריט הופך לקומפוננטה, עם spread של כל השדות כ-props.",
        },
      ],
      codeBreakdowns: [
        {
          code: "{movies.map(m => <li key={m.id}>{m.title}</li>)}",
          parts: [
            { piece: "{...}", role: "JSX expression." },
            { piece: "movies.map", role: "ממפה כל סרט לאלמנט JSX." },
            { piece: "m =>", role: "פונקציה לכל פריט." },
            { piece: "key={m.id}", role: "חיוני! React משתמש ב-key לזיהוי פריטים בין רינדורים." },
            { piece: "{m.title}", role: "מציג את הכותרת של הסרט." },
          ],
          summary: "map הוא הדרך הסטנדרטית להציג רשימות ב-React. key חיוני!",
        },
      ],
    },
  },

  "lesson_21::rendering": {
    extendedTab: {
      simpleGrandma:
        "סבתא, rendering זה התהליך שבו React מצייר את הדף — לוקח את הקוד שלך והופך אותו לתמונה במסך.",
      simpleExplanation:
        "rendering ב-React הוא תהליך הרצת הקומפוננטה (פונקציה) כדי לקבל JSX. אחרי זה React מבצע diff עם הרינדור הקודם (Virtual DOM) ומחיל רק שינויים אמיתיים על ה-DOM.",
      thinkingMethod: [
        "1. למה הקומפוננטה מרונדרת? (state, props, parent)",
        "2. האם הרינדור מיותר?",
        "3. אופטימיזציה? (React.memo, useMemo)",
        "4. סדר הרינדור — top-down (אב לפני בנים)",
        "5. DevTools Profiler?",
      ],
      purpose:
        "המטרה היא להבטיח שה-UI תמיד משקף את ה-state הנוכחי, באופן הצהרתי.",
      codeSnippets: [
        {
          title: "rendering ב-action",
          code: "function Counter() {\n  const [count, setCount] = useState(0);\n  console.log('rendering, count =', count);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
          explanation: "כל לחיצה → setCount → re-render → console.log חדש.",
        },
      ],
      codeBreakdowns: [
        {
          code: "setCount(count + 1)",
          parts: [
            { piece: "setCount", role: "מציע ל-React שינוי state." },
            { piece: "count + 1", role: "הערך החדש." },
            { piece: "// (אחרי שיהיה רינדור — count יהיה הערך החדש)", role: "Trigger ל-re-render." },
          ],
          summary: "כל setState מפעיל rendering מחדש של הקומפוננטה (אם הערך שונה).",
        },
      ],
    },
  },

};
