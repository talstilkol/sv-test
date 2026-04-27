/**
 * Track D — D2: Glossary (Hebrew/English)
 * ----------------------------------------------------------------
 * Maps English programming terms (React / JS / TS / Web) to Hebrew
 * translations + a short Hebrew definition. Used by app.js to:
 *   - Wrap occurrences in concept/code explanations with a tooltip.
 *   - Open an extended modal on click.
 *
 * Format:
 *   GLOSSARY[term] = {
 *     he:        // Hebrew name (short)
 *     short:     // 1-line tooltip (≤ 80 chars)
 *     long:      // 2-4 lines extended explanation
 *     example?:  // optional code snippet
 *     category:  // 'react' | 'js' | 'ts' | 'web' | 'tooling'
 *   }
 *
 * Matching is case-sensitive and word-boundary-bound. Keep keys
 * exactly as they appear in the codebase (e.g. "useState", "JSX").
 */
window.GLOSSARY = {
  // ============== React Hooks ==============
  "useState": {
    he: "סטייט (מצב פנימי)",
    short: "Hook לאחסון מצב משתנה בקומפוננטה (ערך + setter).",
    long: "useState מאחסן ערך שמשנה את ה-UI כשמשנים אותו. מקבל ערך ראשוני ומחזיר זוג: [ערך, פונקציה לעדכן]. שינוי הערך גורם ל-re-render אוטומטי.",
    example: "const [count, setCount] = useState(0);",
    category: "react",
  },
  "useEffect": {
    he: "אפקט (תופעת לוואי)",
    short: "Hook להרצת קוד אחרי render — fetch, subscribe, timers.",
    long: "useEffect מריץ פונקציה אחרי שהקומפוננטה מתעדכנת. שימושי לבקשות רשת, האזנה לאירועים, או טיימרים. המערך השני קובע מתי האפקט ירוץ.",
    example: "useEffect(() => { fetch(url); }, [url]);",
    category: "react",
  },
  "useRef": {
    he: "התייחסות (ref)",
    short: "Hook לאחסון ערך שלא גורם ל-re-render כשמשתנה.",
    long: "useRef מחזיר אובייקט עם תכונה .current שאפשר לעדכן בלי לגרום ל-render. שימושי לאחיזה ב-DOM element או באחסון ערך 'מתחת לרדאר'.",
    example: "const inputRef = useRef(null);",
    category: "react",
  },
  "useMemo": {
    he: "זיכרון מחושב",
    short: "Hook ששומר תוצאת חישוב יקר עד שתלות משתנה.",
    long: "useMemo מבצע חישוב פעם אחת ומחזיר את אותה תוצאה ב-renders הבאים — אלא אם משהו במערך התלויות השתנה. שימוש בעיקר לאופטימיזציה.",
    example: "const sum = useMemo(() => heavy(a,b), [a,b]);",
    category: "react",
  },
  "useCallback": {
    he: "פונקציה זכורה",
    short: "Hook שמחזיר אותה פונקציה עד שתלות משתנה.",
    long: "useCallback דומה ל-useMemo אך עבור פונקציות. מונע יצירת פונקציה חדשה בכל render — שימושי כשמעבירים callback כ-prop לקומפוננטה ממוטבת.",
    example: "const onClick = useCallback(() => save(id), [id]);",
    category: "react",
  },
  "useContext": {
    he: "צריכת קונטקסט",
    short: "Hook לקריאת ערך מ-Context בלי להעביר props.",
    long: "useContext מאפשר לקומפוננטה לקרוא ערך שסופק על ידי Context.Provider באב. פותר 'prop drilling' כשצריך להעביר ערך עמוק בעץ.",
    example: "const theme = useContext(ThemeContext);",
    category: "react",
  },
  "useReducer": {
    he: "רידיוסר (state מורכב)",
    short: "Hook לניהול state מורכב באמצעות פונקציית reducer.",
    long: "useReducer דומה ל-useState אבל מתאים ל-state עם הרבה שינויים מורכבים. מקבל פונקציית reducer(state, action) ומחזיר [state, dispatch].",
    example: "const [s, dispatch] = useReducer(reducer, initial);",
    category: "react",
  },
  "Hook": {
    he: "הוק (חיבור React)",
    short: "פונקציה שמתחילה ב-use ומאפשרת state/effects בקומפוננטות פונקציה.",
    long: "Hooks הם הדרך המודרנית להוסיף state ו-side-effects לקומפוננטות פונקציה ב-React. כללים: לקרוא רק ברמה העליונה, רק מקומפוננטות / hooks אחרים.",
    category: "react",
  },
  "props": {
    he: "פרופס (פרמטרים)",
    short: "אובייקט הפרמטרים שקומפוננטה מקבלת מההורה.",
    long: "props (קיצור של properties) הם הפרמטרים שקומפוננטה מקבלת מהקומפוננטה ההורה — קריאה בלבד. דרך התקשורת מלמעלה למטה ב-React.",
    example: "function Btn({label, onClick}) { ... }",
    category: "react",
  },
  "state": {
    he: "סטייט (מצב)",
    short: "מצב פנימי של קומפוננטה ש-React עוקב אחריו.",
    long: "state הוא ערך שמשתנה בזמן ריצה וגורם ל-React לעדכן את ה-UI. בקומפוננטות פונקציה משתמשים ב-useState/useReducer.",
    category: "react",
  },
  "JSX": {
    he: "ג'יי-אס-איקס",
    short: "תחביר דמוי-HTML בתוך JavaScript לתיאור UI ב-React.",
    long: "JSX נראה כמו HTML אבל הוא בעצם סוכר תחבירי שמתורגם ל-React.createElement. מאפשר להטמיע משתנים בתוך {} ולכתוב קומפוננטות בקריאות גבוהה.",
    example: "<h1>Hello {name}</h1>",
    category: "react",
  },
  "Component": {
    he: "קומפוננטה (רכיב)",
    short: "פונקציה שמחזירה JSX — אבן הבניין הבסיסית של React.",
    long: "קומפוננטה היא יחידת UI עצמאית — פונקציה שמקבלת props ומחזירה JSX. שם הקומפוננטה חייב להתחיל באות גדולה.",
    category: "react",
  },
  "render": {
    he: "רינדור (ציור)",
    short: "התהליך שבו React הופך קומפוננטה ל-DOM אמיתי.",
    long: "render הוא קריאה לקומפוננטה כדי לחשב את ה-UI. React מבצע אותו פעם ראשונה בטעינה, ושוב בכל פעם ש-state או props משתנים.",
    category: "react",
  },
  "Virtual DOM": {
    he: "DOM וירטואלי",
    short: "ייצוג בזיכרון של עץ ה-UI שמאפשר ל-React להשוות ולעדכן.",
    long: "Virtual DOM הוא העתק קל-משקל של ה-DOM שנשמר בזיכרון. React משווה גרסה ישנה לחדשה (diff) ומעדכן רק את מה שהשתנה ב-DOM האמיתי.",
    category: "react",
  },
  "Context": {
    he: "קונטקסט",
    short: "מנגנון להעברת ערך עמוק בעץ הקומפוננטות בלי props.",
    long: "Context מאפשר לספק ערך (theme, user, locale) לכל הקומפוננטות בעץ בלי להעביר אותו ידנית בכל שלב. משתמשים ב-Provider + useContext.",
    category: "react",
  },
  "fragment": {
    he: "פרגמנט (עטיפה ריקה)",
    short: "<></> — מאפשר להחזיר כמה אלמנטים בלי wrapper מיותר.",
    long: "Fragment מאפשר לקומפוננטה להחזיר רשימה של אלמנטים בלי להוסיף div מיותר ל-DOM. תחביר קצר: <>...</> או <React.Fragment>.",
    category: "react",
  },
  "key": {
    he: "מפתח (ייחודי לפריט ברשימה)",
    short: "prop מיוחד שעוזר ל-React לזהות איזה פריט השתנה ברשימה.",
    long: "key חייב להיות ייחודי בין אחים — לא משתמשים באינדקס אם הסדר משתנה. בלי key React לא יכול לעדכן רשימה ביעילות.",
    example: "items.map(it => <li key={it.id}>{it.name}</li>)",
    category: "react",
  },
  "controlled component": {
    he: "קומפוננטה מבוקרת",
    short: "input ש-React שולט בערך שלו דרך value+onChange.",
    long: "ב-controlled component ה-state ב-React הוא 'מקור האמת' — value מגיע מ-state, ו-onChange מעדכן אותו. ההפך הוא uncontrolled (DOM שולט).",
    category: "react",
  },

  // ============== JavaScript Core ==============
  "let": {
    he: "let (משתנה משתנה)",
    short: "מצהיר משתנה ב-block scope שאפשר לשנות.",
    long: "let מצהיר משתנה שתקף בתוך הבלוק שבו הוצהר {…}. אפשר להקצות לו ערך חדש. החלף את var ברוב המקרים המודרניים.",
    example: "let count = 0; count = count + 1;",
    category: "js",
  },
  "const": {
    he: "const (קבוע)",
    short: "מצהיר קבוע ב-block scope — אי אפשר להקצות מחדש.",
    long: "const מצהיר משתנה שלא ניתן להקצות לו ערך חדש לאחר ההצהרה. אם הערך הוא אובייקט — תכונותיו עדיין יכולות להשתנות.",
    example: "const PI = 3.14;",
    category: "js",
  },
  "var": {
    he: "var (משתנה ישן)",
    short: "הצהרת משתנה ישנה ב-function scope. עדיף let/const.",
    long: "var הוא הדרך הישנה להצהיר משתנים — לפני ES6. תקפותו בכל הפונקציה (לא בלוק) ויש לו hoisting מלא. לרוב עדיף להשתמש ב-let או const.",
    category: "js",
  },
  "arrow function": {
    he: "פונקציית חץ",
    short: "()=>{} — תחביר קצר; this נשאר של ההקשר העוטף.",
    long: "פונקציית חץ היא תחביר קצר לפונקציה. ההבדל המרכזי: this בתוכה הוא של ההקשר החיצוני (ולא של הקריאה), מה שמאוד שימושי בקולבקים.",
    example: "const add = (a, b) => a + b;",
    category: "js",
  },
  "callback": {
    he: "קולבק (פונקציית התקשרות)",
    short: "פונקציה שמועברת לפונקציה אחרת ונקראת מאוחר יותר.",
    long: "callback היא פונקציה שמעבירים כפרמטר לפונקציה אחרת, כדי שזו תקרא לה כשתסיים את עבודתה (לדוגמה אחרי setTimeout או fetch).",
    example: "setTimeout(() => alert('done'), 1000);",
    category: "js",
  },
  "Promise": {
    he: "הבטחה (אסינכרונית)",
    short: "אובייקט שמייצג ערך שיהיה זמין בעתיד (success/fail).",
    long: "Promise מייצג פעולה אסינכרונית שתסתיים בעתיד. יש לה 3 מצבים: pending, fulfilled, rejected. משתמשים ב-.then/.catch או async/await.",
    example: "fetch(url).then(r => r.json());",
    category: "js",
  },
  "async": {
    he: "אסינכרוני",
    short: "מילת מפתח שמסמנת פונקציה שמחזירה Promise.",
    long: "async לפני פונקציה הופכת אותה לפונקציה אסינכרונית — תמיד מחזירה Promise. בתוכה אפשר להשתמש ב-await כדי 'לחכות' ל-Promises אחרים.",
    example: "async function loadUser() { ... }",
    category: "js",
  },
  "await": {
    he: "המתנה (await)",
    short: "ממתין שה-Promise יסתיים ומחזיר את הערך.",
    long: "await עוצר את הפונקציה האסינכרונית עד שה-Promise נפתר, ומחזיר את הערך. רק בתוך פונקציה async או ב-top-level של מודול.",
    example: "const user = await fetchUser();",
    category: "js",
  },
  "closure": {
    he: "סגירה (closure)",
    short: "פונקציה שזוכרת משתנים מההקשר שבו נוצרה.",
    long: "closure זה כשפונקציה פנימית שומרת גישה למשתנים של הפונקציה החיצונית גם אחרי שהחיצונית הסתיימה. בסיס לדפוסים רבים ב-JS.",
    example: "function counter(){let n=0;return()=>++n;}",
    category: "js",
  },
  "scope": {
    he: "סקופ (טווח תקפות)",
    short: "האזור בקוד שבו משתנה זמין.",
    long: "scope קובע איפה משתנה זמין — global, function, block. let/const הם block-scoped, var הוא function-scoped.",
    category: "js",
  },
  "hoisting": {
    he: "העלאה (hoisting)",
    short: "התנהגות JS שמרימה הצהרות לראש הסקופ.",
    long: "hoisting הוא התהליך שבו JS 'מרים' הצהרות פונקציה ו-var לראש הסקופ לפני הריצה. let/const מוצהרים אבל בלי ערך עד שורת ההצהרה (TDZ).",
    category: "js",
  },
  "spread": {
    he: "פיזור (...)",
    short: "...arr — פורש מערך/אובייקט לתוך אחר.",
    long: "אופרטור spread מעתיק את הפריטים של iterable (מערך) או תכונות של אובייקט לתוך מבנה חדש. שימושי לשכפול ולמיזוג.",
    example: "const copy = [...arr]; const merged = {...a, ...b};",
    category: "js",
  },
  "rest": {
    he: "ריכוז (...rest)",
    short: "...args — אוסף את שאר הפרמטרים למערך.",
    long: "אופרטור rest (אותו תחביר כמו spread אבל בהקשר הפוך) אוסף פרמטרים נותרים לתוך מערך, או תכונות נותרות לאובייקט.",
    example: "function sum(...nums) { return nums.reduce(...) }",
    category: "js",
  },
  "destructuring": {
    he: "פירוק (destructuring)",
    short: "תחביר לחילוץ ערכים ממערך/אובייקט למשתנים.",
    long: "destructuring מאפשר לחלץ ערכים בקלות: const {a, b} = obj. עובד גם על מערכים: const [x, y] = arr. תחביר חיוני ב-React (props).",
    example: "const {name, age} = user;",
    category: "js",
  },
  "template literal": {
    he: "מחרוזת תבנית",
    short: "`Hello ${name}` — מחרוזת עם ביטויים מוטמעים.",
    long: "template literals הם מחרוזות בין backticks (`) שמאפשרות הטמעת ביטויים בתוך ${} ושורות חדשות מבלי \\n.",
    example: "`Hello, ${user.name}!`",
    category: "js",
  },
  "map": {
    he: "מיפוי (map)",
    short: "מתודת מערך שיוצרת מערך חדש מתוצאת פונקציה לכל פריט.",
    long: ".map(fn) רץ על כל פריט במערך, מפעיל את הפונקציה ומחזיר מערך חדש בגודל זהה. לא משנה את המקור.",
    example: "[1,2,3].map(x => x*2) // [2,4,6]",
    category: "js",
  },
  "filter": {
    he: "סינון (filter)",
    short: "מתודת מערך שמחזירה רק פריטים שעוברים תנאי.",
    long: ".filter(fn) מחזיר מערך חדש שמכיל רק את הפריטים שעבורם הפונקציה החזירה true.",
    example: "[1,2,3,4].filter(n => n > 2) // [3,4]",
    category: "js",
  },
  "reduce": {
    he: "צמצום (reduce)",
    short: "מתודה שמכווצת מערך לערך אחד באמצעות אגרגציה.",
    long: ".reduce((acc, cur) => …, initial) רץ על המערך וצובר ערך אחד — סכום, אובייקט, מחרוזת, וכו'.",
    example: "[1,2,3].reduce((s,n) => s+n, 0) // 6",
    category: "js",
  },
  "forEach": {
    he: "ריצה לכל פריט",
    short: "מתודת מערך שרצה על כל פריט (ללא ערך מוחזר).",
    long: ".forEach(fn) פשוט קורא לפונקציה לכל פריט. בניגוד ל-map — לא מחזיר מערך חדש.",
    category: "js",
  },
  "JSON": {
    he: "ג'ייסון (פורמט נתונים)",
    short: "JavaScript Object Notation — פורמט טקסטואלי לנתונים.",
    long: "JSON הוא פורמט טקסטואלי קל-משקל שמתאר אובייקטים ומערכים. JSON.stringify ממיר לאובייקט למחרוזת, JSON.parse הופך מחרוזת בחזרה.",
    category: "js",
  },
  "fetch": {
    he: "בקשת רשת",
    short: "API מובנה לבקשות HTTP. מחזיר Promise.",
    long: "fetch(url) שולח בקשת HTTP ומחזיר Promise עם Response. לרוב משתמשים ב-await ו-.json() לקבלת התשובה.",
    example: "const r = await fetch('/api'); const data = await r.json();",
    category: "js",
  },
  "event loop": {
    he: "לולאת אירועים",
    short: "המנגנון שמתזמן ביצוע של callbacks אסינכרוניים ב-JS.",
    long: "JavaScript הוא single-threaded — event loop בודק תור משימות (microtasks/macrotasks) ומריץ אותן כשהקוד הסינכרוני מסתיים.",
    category: "js",
  },
  "this": {
    he: "this (הקשר הקריאה)",
    short: "הפניה לאובייקט שעליו קוראים את הפונקציה.",
    long: "this בפונקציה רגילה מצביע על האובייקט שמבצע את הקריאה. בפונקציית חץ — this הוא של ההקשר העוטף.",
    category: "js",
  },
  "prototype": {
    he: "פרוטוטיפ (תבנית-אב)",
    short: "אובייקט שאליו אובייקטים אחרים יורשים תכונות.",
    long: "כל אובייקט ב-JS מקושר ל-prototype — אובייקט ממנו הוא יורש מתודות. הבסיס לירושה ב-JS לפני class.",
    category: "js",
  },
  "class": {
    he: "מחלקה (class)",
    short: "תחביר ES6 ליצירת אובייקטים עם תבנית.",
    long: "class הוא סוכר תחבירי על prototype. מכיל constructor, methods, ויכול להאריך מחלקה אחרת עם extends.",
    example: "class Dog extends Animal { ... }",
    category: "js",
  },
  "module": {
    he: "מודול (קובץ עצמאי)",
    short: "קובץ JS שמייצא ויובא ערכים ב-import/export.",
    long: "מודול הוא קובץ עם scope משלו. export חושף ערכים החוצה, import מביא ערכים מקבצים אחרים. מאפשר ארגון קוד.",
    example: "export default function App() {}",
    category: "js",
  },
  "import": {
    he: "ייבוא",
    short: "מילת מפתח שטוענת ערכים ממודול אחר.",
    long: "import מאפשר לטעון ערכים שמיוצאים ממודול אחר. ניתן לייבא default או named exports.",
    example: "import { useState } from 'react';",
    category: "js",
  },
  "export": {
    he: "ייצוא",
    short: "מילת מפתח שחושפת ערך מהמודול לעולם החיצון.",
    long: "export חושף ערך (משתנה, פונקציה, class) שיהיה זמין למודולים אחרים דרך import.",
    example: "export const PI = 3.14;",
    category: "js",
  },
  "null": {
    he: "ערך ריק מכוון",
    short: "ערך מיוחד שמייצג 'אין ערך' באופן מכוון.",
    long: "null הוא ערך שמייצג 'בכוונה ריק'. שונה מ-undefined שאומר 'לא הוגדר'. typeof null === 'object' (באג היסטורי).",
    category: "js",
  },
  "undefined": {
    he: "לא הוגדר",
    short: "ערך ברירת מחדל למשתנה שלא קיבל ערך.",
    long: "undefined הוא הערך של משתנה שהוצהר אך לא קיבל ערך, או של תכונה שלא קיימת באובייקט. אל תקצה אותו ידנית — תשתמש ב-null.",
    category: "js",
  },
  "truthy": {
    he: "ערך אמיתי-נחשב",
    short: "ערך שמתפרש כ-true בהקשר בוליאני.",
    long: "ערך הוא truthy אם הוא לא falsy. הערכים ה-falsy הם: false, 0, '', null, undefined, NaN. כל היתר truthy.",
    category: "js",
  },
  "falsy": {
    he: "ערך שקרי-נחשב",
    short: "ערך שמתפרש כ-false: false, 0, '', null, undefined, NaN.",
    long: "ערכים falsy מתורגמים ל-false בהקשר בוליאני (if, &&, ||). שאר הערכים — כולל '0' כמחרוזת — הם truthy.",
    category: "js",
  },

  // ============== TypeScript ==============
  "TypeScript": {
    he: "טייפסקריפט",
    short: "JavaScript עם טיפוסים סטטיים — מקמפלים ל-JS.",
    long: "TypeScript הוא JS עם מערכת טיפוסים שנבדקת בזמן קומפילציה. עוזר לתפוס באגים מוקדם, נותן autocomplete מצוין, ולא רץ ב-runtime.",
    category: "ts",
  },
  "interface": {
    he: "ממשק (interface)",
    short: "תיאור מבנה אובייקט ב-TypeScript.",
    long: "interface מתאר את הצורה של אובייקט: אילו תכונות יש לו ומה הטיפוס שלהן. ניתן להרחיב interfaces עם extends.",
    example: "interface User { id: number; name: string; }",
    category: "ts",
  },
  "type": {
    he: "טיפוס (type alias)",
    short: "כינוי לטיפוס: type Id = string | number.",
    long: "type alias נותן שם לטיפוס. דומה ל-interface אבל יכול לתאר גם union, primitive, וטיפוסים מורכבים.",
    example: "type Status = 'idle' | 'loading' | 'done';",
    category: "ts",
  },
  "generic": {
    he: "גנרי (פרמטר טיפוס)",
    short: "<T> — טיפוס פרמטרי שמאפשר לשמור מידע על טיפוס.",
    long: "generics מאפשרים לכתוב פונקציות/קלאסים שעובדים עם טיפוסים שונים, תוך שמירת המידע על הטיפוס. לדוגמה: Array<string>.",
    example: "function first<T>(arr: T[]): T { return arr[0]; }",
    category: "ts",
  },
  "enum": {
    he: "אנום (קבוצת ערכים)",
    short: "סט סגור של ערכים בעלי שם — Status.Active, Status.Done.",
    long: "enum מגדיר אוסף של ערכים בעלי שם. שימושי כשיש סט סגור של אפשרויות. ב-TS מודרני יש מי שמעדיף union של מחרוזות.",
    category: "ts",
  },
  "any": {
    he: "any (כל טיפוס)",
    short: "טיפוס שמכבה את בדיקת הטיפוסים — להימנע ממנו.",
    long: "any הוא 'יציאת חירום' מבדיקת הטיפוסים — מבטל את ההגנה ש-TS נותן. עדיף להשתמש ב-unknown או טיפוסים ספציפיים.",
    category: "ts",
  },
  "unknown": {
    he: "unknown (לא ידוע)",
    short: "טיפוס בטוח יותר מ-any — דורש בדיקה לפני שימוש.",
    long: "unknown הוא 'any בטוח': אסור לעשות איתו כלום עד שמבצעים narrowing (typeof, instanceof, וכו').",
    category: "ts",
  },
  "never": {
    he: "never (אף פעם)",
    short: "טיפוס לערכים שלא יקרו — פונקציה שזורקת/לולאה אינסופית.",
    long: "never מתאר ערך שלא יכול להתקיים. שימושי בפונקציות שזורקות exception, או ב-exhaustiveness checks ב-switch.",
    category: "ts",
  },

  // ============== Web / Browser ==============
  "DOM": {
    he: "עץ המסמך (DOM)",
    short: "Document Object Model — ייצוג HTML של הדפדפן בזיכרון.",
    long: "DOM הוא ה-API של הדפדפן שמאפשר ל-JS לקרוא ולשנות את ה-HTML — אלמנטים, טקסט, attributes. document.querySelector, addEventListener.",
    category: "web",
  },
  "event": {
    he: "אירוע",
    short: "פעולה שהתרחשה בדפדפן — click, keydown, submit.",
    long: "event הוא אובייקט שמתאר משהו שקרה — לחיצת כפתור, הקלדה. רושמים לאירוע ב-addEventListener('click', handler).",
    category: "web",
  },
  "addEventListener": {
    he: "האזנה לאירוע",
    short: "מתודה שרושמת פונקציה שתופעל כשאירוע קורה.",
    long: "element.addEventListener('event', handler) רושם handler שיורץ כשהאירוע מתרחש. אפשר גם removeEventListener להסיר.",
    example: "btn.addEventListener('click', () => alert('hi'));",
    category: "web",
  },
  "localStorage": {
    he: "אחסון מקומי",
    short: "API שמאחסן מחרוזות בדפדפן בלי תפוגה.",
    long: "localStorage שומר זוגות key/value בדפדפן. הנתונים נשארים גם אחרי סגירת הטאב, עד שהמשתמש מנקה. גודל מקסימום ~5MB.",
    example: "localStorage.setItem('user', JSON.stringify(u));",
    category: "web",
  },
  "sessionStorage": {
    he: "אחסון לסשן",
    short: "כמו localStorage אבל נמחק כשהטאב נסגר.",
    long: "sessionStorage עובד כמו localStorage אבל הנתונים תקפים רק לטאב הנוכחי ונמחקים בסגירה.",
    category: "web",
  },
  "API": {
    he: "ממשק תכנותי (API)",
    short: "Application Programming Interface — חוזה בין מערכות.",
    long: "API הוא סט של פונקציות/endpoints שמערכת חושפת לאחרים. ב-Web מדובר בעיקר על HTTP endpoints (REST/GraphQL).",
    category: "web",
  },
  "REST": {
    he: "REST (סגנון API)",
    short: "סגנון API ש-HTTP — GET/POST/PUT/DELETE על משאבים.",
    long: "REST הוא סגנון תכנון API: כל URL מייצג משאב (resource), ופעולות נעשות עם פעלי HTTP — GET לקריאה, POST ליצירה וכו'.",
    category: "web",
  },
  "HTTP": {
    he: "HTTP (פרוטוקול אינטרנט)",
    short: "פרוטוקול תקשורת בין דפדפן לשרת.",
    long: "HTTP הוא הפרוטוקול שעליו רץ ה-Web. בקשה כוללת method (GET/POST), URL, headers, body. תשובה כוללת status code (200/404/500).",
    category: "web",
  },
  "CORS": {
    he: "CORS (אבטחת מקור)",
    short: "מנגנון שמתיר/אוסר על דפדפן לבקש משרת בדומיין אחר.",
    long: "CORS (Cross-Origin Resource Sharing) הוא מנגנון של הדפדפן שמונע מאתר א' לבקש משרת ב' בלי רשות. השרת חייב לשלוח header Access-Control-Allow-Origin.",
    category: "web",
  },
  "cookie": {
    he: "עוגייה",
    short: "מחרוזת קטנה שנשמרת בדפדפן ונשלחת אוטומטית בכל בקשה.",
    long: "cookie היא קטע מידע שהשרת מבקש מהדפדפן לשמור. הדפדפן מצרף אותה לכל בקשה לאותו דומיין. שימוש עיקרי: הזדהות (session).",
    category: "web",
  },

  // ============== Tooling / Build ==============
  "npm": {
    he: "npm (מנהל חבילות)",
    short: "Node Package Manager — מתקין ספריות JS.",
    long: "npm הוא מנהל החבילות הסטנדרטי של Node.js. מתקין ספריות מ-npmjs.com לתיקייה node_modules. פקודות: npm install, npm run.",
    category: "tooling",
  },
  "package.json": {
    he: "קובץ ההגדרות",
    short: "מתאר את הפרויקט: שם, גרסה, תלויות, scripts.",
    long: "package.json הוא הקובץ שמתאר פרויקט Node — שם, גרסה, רשימת dependencies/devDependencies ופקודות (scripts) שאפשר להריץ.",
    category: "tooling",
  },
  "Vite": {
    he: "Vite (כלי בנייה)",
    short: "Build tool מודרני ומהיר ל-React/Vue/JS.",
    long: "Vite הוא כלי בנייה מודרני — dev server מהיר עם HMR ו-build production עם Rollup. מחליף create-react-app ברוב הפרויקטים החדשים.",
    category: "tooling",
  },
  "Webpack": {
    he: "Webpack (חבילן)",
    short: "Bundler ותיק שאוגד קבצים לחבילות JS/CSS.",
    long: "Webpack הוא module bundler — לוקח את כל הקבצים שלך ואת התלויות ובונה bundle אחד או יותר ל-production. רב-תכליתי אבל איטי יחסית ל-Vite.",
    category: "tooling",
  },
  "Babel": {
    he: "באבל (ממיר JS)",
    short: "ממיר JS מודרני ל-JS ישן יותר לתאימות דפדפנים.",
    long: "Babel הוא transpiler שממיר JS חדש (ES6+, JSX, TS) ל-JS ישן שדפדפנים ישנים מבינים. לרוב מוטמע בתוך Vite/Webpack.",
    category: "tooling",
  },
  "ESLint": {
    he: "ESLint (בדיקת קוד)",
    short: "כלי שבודק שגיאות ועיצוב בקוד JS/TS.",
    long: "ESLint סורק את הקוד לפי כללים שמוגדרים מראש ומתריע על באגים פוטנציאליים, סגנון לא עקבי, ועוד. אפשר לחבר ל-IDE.",
    category: "tooling",
  },
  "Prettier": {
    he: "Prettier (פורמטר)",
    short: "כלי שמסדר את עיצוב הקוד אוטומטית.",
    long: "Prettier הוא code formatter שמסדר רווחים, שורות, ציטוטים ועוד — לפי פורמט אחיד. מסיר ויכוחי סגנון מהצוות.",
    category: "tooling",
  },
  "Git": {
    he: "Git (בקרת גרסאות)",
    short: "מערכת לשמירת היסטוריית שינויים בקוד.",
    long: "Git היא מערכת בקרת גרסאות מבוזרת — שומרת היסטוריה של שינויים, מאפשרת branches, merges ושיתוף עם GitHub/GitLab.",
    category: "tooling",
  },
  "Node": {
    he: "Node.js (סביבת ריצה)",
    short: "מריץ JS מחוץ לדפדפן — בשרתים ובכלים.",
    long: "Node.js היא סביבת ריצה של JS מבוססת V8 (מנוע ה-JS של Chrome). מאפשרת להריץ JS בשרתים, ב-CLI, ובכלי build.",
    category: "tooling",
  },
};

window.GLOSSARY_VERSION = "track-d-v1";
