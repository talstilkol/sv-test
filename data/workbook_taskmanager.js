// data/workbook_taskmanager.js — חוברת תרגול JavaScript: בניית Task Manager
// כל מושג כולל: difficulty (1–10), 6 רמות הסבר, illustration, codeExample, codeExplanation.
// מושגים קשים (difficulty >= 6) כוללים גם extras: דוגמאות נוספות, pitfalls, ושאלות תרגול.
// המודל לאיכות התוכן: data/lesson22.js

var WORKBOOK_TASKMANAGER = {
  id: "workbook_taskmanager",
  title: "חוברת תרגול JavaScript — Task Manager",
  description:
    "פרויקט מעשי שבו בונים אפליקציית Task Manager בסיסית מ-A' ועד ת'. כל מושג בחוברת מדגים שלב בבניית המערכת — מהצהרת משתנה ראשון ועד שמירת המשימות בשרת באמצעות fetch ו-async/await.",
  concepts: [],
  quiz: [],
};

// ─────────────────────────────── Concept builders (split for readability) ───────────────────────────────
WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "Task Manager",
  difficulty: 3,
  levels: {
    grandma:
      "Task Manager זו 'רשימת משימות חכמה': מקום אחד שאוסף את כל המשימות שלך, מסמן מה כבר עשית, ושומר את המצב גם אחרי שסגרת את הדפדפן. זה התרגיל המרכזי של החוברת.",
    child:
      "דמיין שיש לך לוח על המקרר עם פתקים: 'לקנות חלב', 'לעשות שיעורי בית'. ה-Task Manager הוא הלוח הזה בתוך הדפדפן — מוסיף, מוחק, ומסמן ✔.",
    soldier:
      "Task Manager הוא ה-Hello World של אפליקציות אינטראקטיביות: יש state (רשימת משימות), DOM rendering, event listeners, ו-localStorage לשמירה.",
    student:
      "Task Manager הוא פרויקט CRUD מינימלי בצד הלקוח: Create (הוספת task), Read (תצוגה), Update (toggle done), Delete (הסרה). בונה אותו עם vanilla JS לפני שעוברים ל-React.",
    junior:
      "כל ראיון juni-frontend יכול להגיע ל-'בנה לי Task Manager ב-15 דקות'. אם אתה שולט במבנה (state → render → event → state) — תבנה גם אפליקציה גדולה.",
    professor:
      "Task Manager exemplifies the unidirectional data-flow paradigm: a single source of truth (the tasks array) drives the rendered view; user interactions dispatch updates that mutate state and trigger a re-render.",
  },
  illustration:
    "📋 Task Manager — לולאת הנתונים:\n\n" +
    "  state (tasks[]) → render() → <ul> במסך\n" +
    "       ▲                              │\n" +
    "       └── user click → action ───────┘",
  codeExample:
    "let tasks = [];\nfunction render() {\n  const list = document.getElementById('task-list');\n  list.innerHTML = tasks.map(t => `<li>${t.done?'✅':'⬜'} ${t.title}</li>`).join('');\n}\nfunction addTask(title) {\n  tasks.push({ title, done: false });\n  render();\n}\naddTask('ללמוד JS');",
  codeExplanation:
    "המערכת בנויה משלושה חלקים: state (המערך tasks), render (פונקציה שמציירת את ה-state ב-DOM), ו-actions (פונקציות שמשנות את ה-state וקוראות ל-render). זוהי לולאת הנתונים שתחזור בכל אפליקציה.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "variables",
  difficulty: 2,
  levels: {
    grandma:
      "משתנה הוא 'תווית עם שם' שמצמידים לערך — כמו לכתוב על קופסה 'מתכונים' ולשים בה כרטיסיות. ב-Task Manager, המשתנה tasks הוא הקופסה שמכילה את כל המשימות.",
    child:
      "כמו בלון עם שם 'tasks' שמחזיק את כל הפתקים. בכל פעם שאתה מוסיף משימה, היא נכנסת לבלון. ב-JavaScript: let tasks = [].",
    soldier:
      "ב-Task Manager נשתמש ב-let עבור משתנים שמשתנים (tasks), וב-const עבור ערכים קבועים (השם של ה-localStorage key).",
    student:
      "JavaScript מאפשר שלוש הצהרות: var (function-scoped, ישן), let ו-const (block-scoped). בקוד מודרני נשתמש ב-const כברירת מחדל ונחליף ל-let רק כשנדרש שינוי.",
    junior:
      "כשבניתי Task Manager ראשון הצהרתי ב-var, הסתבכתי עם hoisting בלולאות. עברתי ל-const/let וכל הבעיות נעלמו. ההמלצה: const כברירת מחדל.",
    professor:
      "let/const introduce block-level Temporal Dead Zone (TDZ) bindings. const enforces binding-immutability (not value-immutability — you can still mutate the array contents).",
  },
  illustration:
    "📦 משתנים ב-Task Manager:\n\n" +
    "  const STORAGE_KEY = 'tasks';   ← קבוע\n" +
    "  let tasks = [];                 ← מתעדכן\n" +
    "  let nextId = 1;                 ← מונה",
  codeExample:
    "const STORAGE_KEY = 'taskmanager_v1';\nlet tasks = [];\nlet nextId = 1;\n\nfunction createTask(title) {\n  const newTask = { id: nextId, title, done: false };\n  tasks.push(newTask);\n  nextId += 1;\n  return newTask;\n}\nconsole.log(createTask('לקנות חלב'));",
  codeExplanation:
    "STORAGE_KEY הוא const כי לא נשנה את שם המפתח. tasks ו-nextId הם let כי הם מתעדכנים. newTask הוא const — ההפניה לאובייקט לא משתנה, רק התוכן שלו.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "conditions",
  difficulty: 3,
  levels: {
    grandma:
      "תנאים זה 'אם ככה אז ככה'. ב-Task Manager: אם המשימה מסומנת ✔ — הצג אותה אפורה; אחרת — שחורה. זה מה שגורם ל-UI להגיב נכון לכל מצב.",
    child:
      "כמו במשחק לוח: 'אם נפלת על משבצת אדומה — חזור 3 צעדים'. ב-Task Manager: 'אם הרשימה ריקה — הצג הודעה'.",
    soldier:
      "if/else, ternary (a ? b : c), ו-switch הם הכלים. ב-Task Manager התנאי הקריטי: if (!title.trim()) return; — לא להוסיף משימה ריקה.",
    student:
      "JavaScript מבדיל בין truthy ל-falsy: 0, '', null, undefined, NaN, false → falsy. כל השאר → truthy. ב-validation של טופס משימה זה חיוני.",
    junior:
      "באג נפוץ: if (priority == '1') כי המתחרה החזיר string. תמיד === (strict). וב-validation, חבר if (!title) עם trim() כדי לדחות גם ' ' (רווחים בלבד).",
    professor:
      "Boolean coercion follows ECMA-262 ToBoolean rules. Nullish coalescing (??) avoids the falsy-trap of || when 0 or '' are valid values.",
  },
  illustration:
    "🔀 conditions ב-Task Manager:\n\n" +
    "  if (!title.trim()) return;            ← validation\n" +
    "  task.done ? '✅' : '⬜'                 ← UI render\n" +
    "  if (tasks.length === 0) showEmpty()   ← empty state",
  codeExample:
    "function addTask(title) {\n  if (!title || !title.trim()) {\n    alert('יש להזין כותרת למשימה');\n    return;\n  }\n  if (tasks.length >= 100) {\n    alert('הרשימה מלאה');\n    return;\n  }\n  tasks.push({ id: Date.now(), title: title.trim(), done: false });\n  render();\n}",
  codeExplanation:
    "התנאי הראשון פוסל קלט ריק (כולל רווחים). השני מגביל את כמות המשימות. רק אם שני התנאים עוברים — המשימה מתווספת. הגנת קלט בסיסית בכל אפליקציה.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "arrays",
  difficulty: 4,
  levels: {
    grandma:
      "מערך זו 'רשימה ממוספרת' — כמו דפי פתקים שמסודרים אחד מתחת לשני. כל ה-Task Manager נשען על מערך אחד: tasks[].",
    child:
      "דמיין מגירה ארוכה עם תאים ממוספרים: תא 0, תא 1, תא 2... כל תא מחזיק משימה אחת.",
    soldier:
      "tasks הוא מערך. push מוסיף לסוף, splice(i,1) מסיר במקום, filter יוצר מערך חדש בלי ה-task הזה (immutability), map הופך כל task ל-HTML.",
    student:
      "ב-JavaScript מערכים הם אובייקטים מיוחדים עם indexed access ו-length. ב-Task Manager נשתמש בעיקר ב-push, filter, map, ו-find — ארבעת הסוסים העיקריים.",
    junior:
      "בעקבות באג מסורתי (שינוי tasks תוך כדי לולאה) למדתי לעבוד immutable: tasks = tasks.filter(...) במקום splice. עכשיו, מעבר ל-React — זה אינסטינקט.",
    professor:
      "JS arrays are objects with auto-managed length and integer-keyed properties. Methods divide into mutating (push, splice) vs non-mutating (filter, map). Modern code prefers the latter.",
  },
  illustration:
    "📚 מערך tasks ב-Task Manager:\n\n" +
    "  index:  0          1          2\n" +
    "  tasks: [{title:'A'}, {title:'B'}, {title:'C'}]\n" +
    "  tasks[1] = המשימה השנייה   tasks.length = 3",
  codeExample:
    "let tasks = [];\ntasks.push({ id: 1, title: 'ללמוד JS', done: false });\ntasks.push({ id: 2, title: 'לקנות חלב', done: true });\n\nconst pending = tasks.filter(t => !t.done);\nconst titles = tasks.map(t => t.title);\nconst t = tasks.find(t => t.id === 2);",
  codeExplanation:
    "push מוסיף לסוף (mutating). filter ו-map יוצרים מערכים חדשים (non-mutating) — שימושי ל-rendering ול-React. find מחזיר את הראשון שמתאים, או undefined.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "functions",
  difficulty: 5,
  levels: {
    grandma:
      "פונקציה זה 'מתכון': רשימת הוראות שאפשר להריץ שוב ושוב. ב-Task Manager: addTask זה מתכון להוספה, removeTask להסרה, render לציור הרשימה.",
    child:
      "כמו כפתור 'אוטומט' במכונה: שמים מטבע (פרמטר), המכונה עושה את הטריק (קוד), ויוצא מוצר (return). אותו מתכון, מטבעות שונים → מוצרים שונים.",
    soldier:
      "ב-Task Manager שלוש צורות: function declaration, arrow function (נפוצה ב-callbacks כמו ב-map), ו-method (פונקציה בתוך אובייקט).",
    student:
      "function declaration עוברת hoisting. arrow function לא — אבל היא משמרת את this של ההקשר. ב-React יותר נפוצה ה-arrow.",
    junior:
      "כשפיצלתי ל-Task Manager לפונקציות קטנות — קיבלתי קוד שאפשר לבדוק יחידה־יחידה ולעדכן אחת בלי לשבור אחרות. הצעד הכי חשוב מ'סקריפט' ל'מודול'.",
    professor:
      "JS functions are first-class objects. Arrow lexically binds this, while regular functions get their this from the call site. Closures capture lexical scope at definition.",
  },
  illustration:
    "🔧 פונקציות ב-Task Manager:\n\n" +
    "  addTask(title)     → מוסיף, קורא ל-render\n" +
    "  removeTask(id)     → מסיר, קורא ל-render\n" +
    "  toggleDone(id)     → מהפך מצב, קורא ל-render\n" +
    "  render()           → מצייר ב-DOM",
  codeExample:
    "function addTask(title) {\n  tasks.push({ id: Date.now(), title, done: false });\n  save(); render();\n}\n\nconst removeTask = (id) => {\n  tasks = tasks.filter(t => t.id !== id);\n  save(); render();\n};\n\nconst filterBy = (status) => (t) => t.done === status;\nconst completed = tasks.filter(filterBy(true));",
  codeExplanation:
    "שימו לב לדפוס: עדכן state → save → render. filterBy מדגים higher-order function — פונקציה שמחזירה פונקציה, מאוד שימושי ב-filter ו-sort.",
  extras: {
    moreExamples: [
      {
        code:
          "const obj = {\n  name: 'taskbox',\n  tasks: ['a','b'],\n  print: function() {\n    this.tasks.forEach(t => console.log(this.name + ': ' + t));\n  }\n};\nobj.print();",
        explanation:
          "ה-arrow בתוך forEach יורש את this מ-print. אילו השתמשנו ב-function רגילה — this בתוך ה-callback היה undefined.",
      },
      {
        code:
          "function createTask(title, priority = 'normal', done = false) {\n  return { id: Date.now(), title, priority, done };\n}\ncreateTask('להוציא כלב');\ncreateTask('דחוף!', 'high');",
        explanation:
          "default parameters מאפשרים לקרוא לפונקציה בלי להעביר את כל הארגומנטים. מנקה את הקוד ומונע 'undefined'.",
      },
    ],
    pitfalls: [
      {
        mistake: "פונקציה שמחזירה undefined בלי כוונה",
        why: "שכחת return, או arrow עם {} בלי return: `(t) => { t.done }` — מחזיר undefined.",
        fix: "implicit return ב-arrow: `(t) => t.done`, או return מפורש: `(t) => { return t.done; }`.",
      },
      {
        mistake: "shared state בין קריאות",
        why: "אם הפונקציה משתמשת במשתנה ברמת מודול (כמו tasks), שינוי בה משפיע על כולם.",
        fix: "אם רוצים pure — קבל את המידע כפרמטר והחזר ערך חדש: `addTask(tasks, title) → newTasks`.",
      },
    ],
    practiceQuestions: [
      {
        question: "מה ההבדל בין `function add() {}` ל-`const add = () => {}` חוץ מהתחביר?",
        answer:
          "function declaration עוברת hoisting (אפשר לקרוא לפני ההצהרה). arrow לא — והיא לא יוצרת this משלה (יורשת מההקשר).",
      },
      {
        question: "למה עדיף שכל פעולה ב-Task Manager תהיה בפונקציה נפרדת?",
        answer: "פונקציות קטנות אפשר לבדוק יחידה־יחידה, לקרוא להן ממקומות שונים, ולמצוא בהן באגים מהר. זוהי גם הדרך לעבור בקלות ל-React.",
      },
    ],
  },
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "DOM",
  difficulty: 5,
  levels: {
    grandma:
      "DOM זה 'הציור של הדף' שהדפדפן מבין. ב-Task Manager: כל פעם שמוסיפים משימה — צריך להגיד ל-DOM 'תוסיף את ה-<li> הזה'.",
    child:
      "כמו עץ של תיבות בתוך תיבות: <html> מכיל <body>, שמכיל <div>, שמכיל <ul>, שמכיל <li>. אנחנו מטפסים על העץ ומוסיפים/מסירים תיבות.",
    soldier:
      "ב-Task Manager: getElementById לאיתור הכפתורים, querySelector ל-list, innerHTML ליצירת ה-<li>, addEventListener להאזנה ללחיצות.",
    student:
      "Document Object Model — ייצוג עץ של ה-HTML. כל element הוא Node עם properties (id, className, textContent) ו-methods (appendChild, addEventListener).",
    junior:
      "ב-vanilla JS תמיד נתקלתי ב-bottleneck של 'innerHTML מוחק listeners'. שתי גישות: rebuild on every change (פשוט, איטי) או diff. React הוא ה-diff האוטומטי.",
    professor:
      "The DOM is a language-agnostic API exposing HTML/XML as a tree of nodes. Direct manipulation triggers reflow/repaint per change; modern frameworks build a Virtual DOM to batch updates.",
  },
  illustration:
    "🌳 DOM של Task Manager:\n\n" +
    "  <body>\n  └── <div id='app'>\n      ├── <input id='task-input'>\n      ├── <button id='add-btn'>הוסף</button>\n      └── <ul id='task-list'>\n          ├── <li>משימה 1</li>\n          └── <li>משימה 2</li>",
  codeExample:
    "function render() {\n  const list = document.getElementById('task-list');\n  list.innerHTML = '';\n  tasks.forEach(task => {\n    const li = document.createElement('li');\n    li.textContent = (task.done ? '✅ ' : '⬜ ') + task.title;\n    li.dataset.id = task.id;\n    list.appendChild(li);\n  });\n}\nrender();",
  codeExplanation:
    "מנקים את הרשימה (innerHTML=''), עוברים על המשימות, יוצרים <li> לכל אחת, ומוסיפים ל-DOM. שיטה 'מבזבזת' אבל פשוטה — ב-React זה קורה ביעילות אוטומטית.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "events",
  difficulty: 5,
  levels: {
    grandma:
      "events הם 'דברים שקורים בדף': לחיצה, הקלדה, גלילה. ב-Task Manager: כשהמשתמש לוחץ על 'הוסף' — קורה event 'click', יש לנו פונקציה שמחכה ומגיבה.",
    child:
      "כמו פעמון בכניסה: כשמישהו לוחץ — את שומעת ובאה לפתוח. ב-DOM: button.addEventListener('click', () => addTask()).",
    soldier:
      "addEventListener(type, handler). ב-Task Manager: 'click' לכפתור 'הוסף', 'keydown' (Enter) ל-input, ו-event delegation על ה-<ul> לתפיסת לחיצה על כל <li>.",
    student:
      "ה-event מתפשט ב-bubbling (מ-target למעלה ל-document). אפשר לעצור עם stopPropagation, prevent עם preventDefault. delegation = listener אחד על parent שמטפל בכל הילדים.",
    junior:
      "Event delegation שינתה לי את החיים: במקום listener לכל <li> חדש, חיברתי listener אחד ל-<ul> והוא מטפל בכולם. ביצועים מעולים, פחות bugs.",
    professor:
      "DOM events follow a three-phase propagation model: capture → target → bubble. Delegation exploits the bubble phase: a single ancestor listener identifies the target via event.target.",
  },
  illustration:
    "👆 event flow:\n\n  user click → button#add-btn fires 'click'\n                       │\n                       ▼\n               handler(e) → addTask(input.value) → render()",
  codeExample:
    "const input = document.getElementById('task-input');\nconst addBtn = document.getElementById('add-btn');\nconst list = document.getElementById('task-list');\n\naddBtn.addEventListener('click', () => {\n  addTask(input.value);\n  input.value = '';\n});\n\ninput.addEventListener('keydown', (e) => {\n  if (e.key === 'Enter') addBtn.click();\n});\n\nlist.addEventListener('click', (e) => {\n  if (e.target.tagName === 'LI') {\n    toggleDone(Number(e.target.dataset.id));\n  }\n});",
  codeExplanation:
    "שלושה event handlers: click על הכפתור, Enter על ה-input, ו-delegation על ה-<ul>. כך לא צריך listener לכל <li> בנפרד — ה-bubble phase דואג שכל לחיצה תגיע ל-handler המרכזי.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "localStorage",
  difficulty: 5,
  levels: {
    grandma:
      "localStorage זה 'מחברת קטנה בתוך הדפדפן' שלא נמחקת אחרי שסוגרים את הדף. הסוד שגורם למשימות שלך להישאר גם אחרי רענון.",
    child:
      "כמו תיבת אוצרות בחדר שלך — אתה יכול לסגור את החדר, לחזור אחרי שבוע, והאוצרות עדיין שם. localStorage שומר עד שמוחקים בכוונה.",
    soldier:
      "API קטן: setItem(key, value), getItem(key), removeItem(key), clear(). הערכים תמיד strings — נשתמש ב-JSON.stringify לשמירה ו-JSON.parse לקריאה.",
    student:
      "localStorage הוא Web Storage עם key-value, עד 5MB, נשמר עד שהמשתמש מנקה. סינכרוני — יכול לחסום UI אם כותבים הרבה.",
    junior:
      "בכל אפליקציה היה לי שכבת persistence עם load/save. שווה לעטוף ב-storage.load() / storage.save(tasks) — אז קל לעבור ל-IndexedDB או API חיצוני.",
    professor:
      "localStorage exposes synchronous getItem/setItem on a same-origin string-only KV store. Quota ~5–10MB; for large/async needs prefer IndexedDB.",
  },
  illustration:
    "💾 localStorage:\n\n  save:  tasks → JSON.stringify → setItem\n  load:  getItem → JSON.parse → tasks",
  codeExample:
    "const STORAGE_KEY = 'taskmanager_v1';\n\nfunction save() {\n  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));\n}\n\nfunction load() {\n  const raw = localStorage.getItem(STORAGE_KEY);\n  tasks = raw ? JSON.parse(raw) : [];\n}\n\nload();\nrender();",
  codeExplanation:
    "load() נקראת פעם אחת בעלייה. save() נקראת אחרי כל פעולה שמשנה את tasks. כך המשתמש יכול לסגור את הטאב, לחזור מחר, והמצב נשמר.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "objects",
  difficulty: 4,
  levels: {
    grandma:
      "אובייקט הוא 'תיק עם מגירות עם שמות'. במקום שתאי המערך יהיו ממוספרים — לכל מגירה יש שם. כל משימה ב-Task Manager היא אובייקט עם title, done, ו-id.",
    child:
      "דמיין כרטיס משחק: 'שם: דרקון, חיים: 100, התקפה: 50'. ב-JS: { name: 'דרקון', hp: 100, atk: 50 }.",
    soldier:
      "אובייקט = key-value pairs. גישה ב-task.title או task['title']. ב-Task Manager כל משימה: { id, title, done, createdAt }.",
    student:
      "Object literal { } זו ה-shape הבסיסית. property shorthand, spread syntax ({ ...task, done: true }), destructuring — שלושה כלים שתשתמש בהם בכל שורה.",
    junior:
      "בקוד מקצועי לעולם לא משנים אובייקט קיים — יוצרים חדש: { ...task, done: true }. מקל על debugging, חיוני ב-React, ומונע באגים מסתוריים של reference sharing.",
    professor:
      "JS objects are hash maps with prototype chains. The spread operator performs a shallow clone — nested references remain shared. For deep immutability use structuredClone() or Immer.",
  },
  illustration:
    "🎴 task object:\n\n  { id: 1, title: 'ללמוד JS', done: false, createdAt: 17e8 }\n  task.title  →  'ללמוד JS'\n  { ...task, done: true }  →  אובייקט חדש",
  codeExample:
    "function createTask(title) {\n  return {\n    id: Date.now(),\n    title: title.trim(),\n    done: false,\n    createdAt: new Date().toISOString(),\n  };\n}\n\nfunction toggleDone(taskId) {\n  tasks = tasks.map(t =>\n    t.id === taskId ? { ...t, done: !t.done } : t\n  );\n}",
  codeExplanation:
    "createTask מחזיר אובייקט חדש בכל קריאה. toggleDone משתמש ב-spread כדי ליצור אובייקט חדש עם done הפוך, ולהשאיר את שאר המשימות כפי שהן.",
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "try/catch",
  difficulty: 6,
  levels: {
    grandma:
      "try/catch זה 'רשת ביטחון': אומרים ל-JS 'תנסה לעשות את זה, ואם זה ייכשל — אל תפיל לי את הכל, ספר לי שזה נכשל'. ב-Task Manager: אם localStorage מקולקל — נחזיר רשימה ריקה.",
    child:
      "כמו לבדוק 'האם הדלת פתוחה?' לפני שמנסים להיכנס. אם נעולה — לא מתפוצצים, פשוט עוברים לדלת אחרת. ב-JS: try { משהו } catch { תכנית ב' }.",
    soldier:
      "כל פעולה שיכולה להיכשל (JSON.parse, fetch, localStorage) — עוטפים ב-try/catch. ב-Task Manager: load() חייב catch, אחרת JSON שבור = המסך הלבן.",
    student:
      "try { } catch (err) { } finally { } — finally רץ תמיד. throw new Error('msg') זורק שגיאה ידנית, נתפסת ב-catch הקרוב. שגיאות לא נתפסות עולות עד window.onerror.",
    junior:
      "האפליקציה הראשונה שלי קרסה כי localStorage היה מלא וזרק QuotaExceededError. למדתי שכל קוד שנוגע באחסון/רשת/parsing — חייב try/catch ואסטרטגיית fallback.",
    professor:
      "JavaScript exceptions are thrown synchronously and propagate up the call stack until caught. async/await transforms async errors into synchronous-looking try/catch flows. Always rethrow if you can't handle, never swallow silently.",
  },
  illustration:
    "🛡️ try/catch ב-Task Manager:\n\n" +
    "  try {\n    const raw = localStorage.getItem(KEY);\n    tasks = JSON.parse(raw) || [];   ← אולי יזרוק\n  } catch (err) {\n    console.warn(err);\n    tasks = [];                       ← fallback\n  }",
  codeExample:
    "function load() {\n  try {\n    const raw = localStorage.getItem(STORAGE_KEY);\n    if (!raw) { tasks = []; return; }\n    const parsed = JSON.parse(raw);\n    if (!Array.isArray(parsed)) throw new Error('Bad format');\n    tasks = parsed;\n  } catch (err) {\n    console.error('שגיאה בטעינת משימות:', err);\n    tasks = [];\n    showBanner('הנתונים נפגמו, התחלנו רשימה חדשה.');\n  }\n}",
  codeExplanation:
    "load מטפל בשלושה תרחישים: אין נתונים, JSON שבור, נתונים לא במבנה תקין. בכל אחד המשתמש מקבל חוויה תקינה ולא מסך לבן.",
  extras: {
    moreExamples: [
      {
        code:
          "class TaskValidationError extends Error {\n  constructor(field) {\n    super(`שדה לא חוקי: ${field}`);\n    this.name = 'TaskValidationError';\n    this.field = field;\n  }\n}\n\nfunction validateTask(t) {\n  if (!t.title) throw new TaskValidationError('title');\n}\n\ntry { validateTask({ title: '' }); }\ncatch (e) {\n  if (e instanceof TaskValidationError) console.warn('מילוי לא תקין:', e.field);\n  else throw e;\n}",
        explanation:
          "Custom Error class מאפשר להבדיל בין סוגי שגיאות שונים ב-catch. כך מטפלים רק בזה שאתה מצפה לו, ושאר השגיאות עולות הלאה.",
      },
      {
        code:
          "function withSpinner(fn) {\n  showSpinner();\n  try {\n    return fn();\n  } catch (e) {\n    showError(e.message);\n    throw e;\n  } finally {\n    hideSpinner();\n  }\n}",
        explanation:
          "finally מבטיח שה-spinner ייעלם בכל מקרה — גם אם הצליח, גם אם נכשל. שימושי גם לסגירת DB connections.",
      },
    ],
    pitfalls: [
      {
        mistake: "catch ריק שמחביא שגיאות",
        why: "`catch (e) {}` בולע את השגיאה — הקוד ממשיך כאילו הכל בסדר, ואתה מאבד את כל ה-debugging information.",
        fix: "תמיד לפחות log: `catch (e) { console.error(e); }` ועדיף — להחליט: לטפל מקומית או לזרוק הלאה.",
      },
      {
        mistake: "try/catch סביב async ללא await",
        why: "השגיאות של Promise לא נתפסות אם לא awaiting. הקוד ב-catch לא ירוץ.",
        fix: "תמיד await בתוך try, או .catch() על ה-Promise.",
      },
    ],
    practiceQuestions: [
      {
        question: "מה יקרה אם JSON.parse נכשל בתוך load() בלי try/catch?",
        answer:
          "תיזרק SyntaxError, הקוד יעצור, וכל ה-app לא יעלה. עם try/catch — נציג הודעה ונמשיך עם רשימה ריקה.",
      },
      {
        question: "האם finally רץ אם לא הייתה שגיאה?",
        answer: "כן — finally רץ תמיד: גם בהצלחה, גם בכישלון, גם אם try כלל return.",
      },
    ],
  },
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "fetch",
  difficulty: 7,
  levels: {
    grandma:
      "fetch זה 'בקשת שליח': מבקשים מהשרת 'תביא לי את רשימת המשימות' — והשליח (הדפדפן) הולך, מביא, וחוזר עם החבילה.",
    child:
      "כמו לשלוח יונת דואר עם פתק: 'תני לי משימות'. היונה טסה לשרת, חוזרת עם משימות. fetch('https://api...') זה הפעולה.",
    soldier:
      "fetch(url, options) מחזיר Promise שיופיע עם Response. ב-Task Manager: fetch('/api/tasks') לטעינה, fetch(..., { method: 'POST', body: ... }) להוספה.",
    student:
      "fetch מחזיר Promise<Response>. אם השרת מחזיר 4xx/5xx — fetch לא יזרוק! ה-promise resolves עם res.ok=false. צריך לבדוק res.ok ידנית. ה-body נקרא עם res.json() (גם הוא Promise).",
    junior:
      "באג שעשיתי: שכחתי res.ok ובניתי על fetch.then(r=>r.json()) — המשתמש קיבל 'undefined' כשהשרת החזיר 401. עכשיו, תמיד if (!res.ok) throw new Error(...). ובכל fetch — try/catch.",
    professor:
      "The fetch API exposes a Promise-based replacement for XMLHttpRequest. It is a low-level primitive: it doesn't reject on HTTP errors, doesn't send cookies by default cross-origin, and Response bodies are streams (read-once).",
  },
  illustration:
    "🌐 fetch ב-Task Manager:\n\n" +
    "  user adds task\n       │\n       ▼\n  fetch('/api/tasks', { method:'POST', body: ... })\n       │\n       ▼\n  Promise<Response> → res.json() → tasks.push → render",
  codeExample:
    "const API = 'https://api.example.com/tasks';\n\nfunction loadFromServer() {\n  return fetch(API)\n    .then(res => {\n      if (!res.ok) throw new Error('HTTP ' + res.status);\n      return res.json();\n    })\n    .then(data => {\n      tasks = data;\n      render();\n    })\n    .catch(err => {\n      console.error('שגיאת רשת:', err);\n      showBanner('לא הצלחנו לטעון מהשרת');\n    });\n}",
  codeExplanation:
    "fetch מחזיר Promise. בדיקת res.ok חובה. .json() עצמו Promise (כי הוא קורא את הגוף). .catch תופס הן שגיאות רשת והן את ה-throw שלנו.",
  extras: {
    moreExamples: [
      {
        code:
          "function addToServer(task) {\n  return fetch(API, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(task),\n  }).then(res => {\n    if (!res.ok) throw new Error('Server rejected: ' + res.status);\n    return res.json();\n  });\n}",
        explanation:
          "method: 'POST' + Content-Type + body סדרתי ב-JSON. השרת מחזיר את ה-task עם ID חדש שמיוצר במסד.",
      },
      {
        code:
          "const controller = new AbortController();\nfetch(API, { signal: controller.signal })\n  .catch(err => {\n    if (err.name === 'AbortError') return;\n    console.error(err);\n  });\n// controller.abort()  → מבטל את הבקשה",
        explanation:
          "AbortController חיוני למניעת race conditions: אם המשתמש מקליד מהר ב-search, מבטלים את הבקשה הקודמת לפני ששולחים חדשה.",
      },
    ],
    pitfalls: [
      {
        mistake: "להניח ש-fetch זורק על HTTP 404/500",
        why: "fetch מחשיב 4xx/5xx כתשובה תקינה. הוא יזרוק רק על network failure (אין חיבור).",
        fix: "תמיד `if (!res.ok) throw new Error(res.status)` לפני שקוראים את הגוף.",
      },
      {
        mistake: "לקרוא את הגוף פעמיים",
        why: "ה-body של Response הוא stream — אפשר לקרוא ממנו רק פעם אחת.",
        fix: "אם צריך גם json וגם text — `const text = await res.text(); const data = JSON.parse(text);`",
      },
      {
        mistake: "לשכוח Content-Type ב-POST עם JSON",
        why: "השרת לא ידע ש-body הוא JSON, ינסה לפרש כ-form-encoded ויחזיר 400.",
        fix: "תמיד `headers: { 'Content-Type': 'application/json' }` כשה-body הוא JSON.stringify.",
      },
    ],
    practiceQuestions: [
      {
        question: "fetch מחזיר 404. האם .then() ירוץ? האם .catch() ירוץ?",
        answer:
          "ה-.then() ירוץ עם res.ok=false. ה-.catch() לא ירוץ — אלא אם בדקנו ידנית ו-throw.",
      },
      {
        question: "למה res.json() עצמו מחזיר Promise ולא את האובייקט ישירות?",
        answer: "כי קריאת ה-body היא asynchronous — היא קוראת את ה-stream עד הסוף. רק אחר כך אפשר לפרסר.",
      },
    ],
  },
});

WORKBOOK_TASKMANAGER.concepts.push({
  conceptName: "async/await",
  difficulty: 7,
  levels: {
    grandma:
      "async/await זו 'דרך נחמדה לכתוב המתנה': במקום שורה ארוכה של 'תמשיך אחרי זה אחרי זה', כותבים שורה־שורה כאילו הכל מסונכרן.",
    child:
      "כמו ההוראה 'חכה לתנור עד שיתחמם, אז שים את העוגה'. עם async/await: 'await תנור; await עוגה; אכול'.",
    soldier:
      "async הופך את הפונקציה לפונקציה שמחזירה Promise. await בתוך async עוצר את הביצוע עד שה-Promise נפתר.",
    student:
      "async/await הוא syntactic sugar ל-Promise. await מבטל את ה-callback hell. שגיאות נתפסות עם try/catch רגיל. אסור להשתמש ב-await מחוץ ל-async (חוץ מ-top-level await ב-modules).",
    junior:
      "כתבתי קוד עם 4 fetches מקוננים ב-.then — היה גיהינום. הסבתי ל-async/await ב-15 דקות. הטעות היחידה: forEach + async — הוא לא מחכה. שימוש ב-for...of או Promise.all.",
    professor:
      "async/await is built on Promises. await suspends the function and yields to the event loop until the Promise settles. Errors propagate as rejections, caught by try/catch in the async caller.",
  },
  illustration:
    "⏳ async/await — Task Manager טוען מהשרת:\n\n" +
    "  async function loadFromServer() {\n    try {\n      const res  = await fetch(API);          ← מחכה לרשת\n      if (!res.ok) throw new Error(res.status);\n      const data = await res.json();          ← מחכה לפרסור\n      tasks = data;\n      render();\n    } catch (err) { showBanner('שגיאה'); }\n  }",
  codeExample:
    "async function loadFromServer() {\n  try {\n    const res = await fetch(API);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    tasks = await res.json();\n    render();\n  } catch (err) {\n    console.error(err);\n    showBanner('שגיאה בטעינה');\n  }\n}\n\nasync function addToServer(title) {\n  const task = { title, done: false };\n  const res = await fetch(API, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(task),\n  });\n  if (!res.ok) throw new Error('שמירה נכשלה');\n  const saved = await res.json();\n  tasks.push(saved);\n  render();\n}",
  codeExplanation:
    "אותה לוגיקה כמו fetch הקודם, רק קריאה ב-try/catch רגיל. הקוד נראה sequential אבל async — בזמן ה-await, ה-thread משוחרר לאירועים אחרים.",
  extras: {
    moreExamples: [
      {
        code:
          "async function loadAll() {\n  try {\n    const [tasksRes, userRes] = await Promise.all([\n      fetch('/api/tasks'),\n      fetch('/api/user'),\n    ]);\n    tasks = await tasksRes.json();\n    user  = await userRes.json();\n    render();\n  } catch (err) { showBanner(err.message); }\n}",
        explanation:
          "Promise.all מריץ את ה-fetches במקביל — הזמן הכולל = max(t1,t2) במקום t1+t2. אם אחד נכשל — כל ה-Promise.all נכשל.",
      },
      {
        code:
          "// ❌ באג: forEach + async לא מחכה!\ntasks.forEach(async (t) => { await save(t); });\nconsole.log('done');   // ירוץ לפני שכל ה-saves יסתיימו\n\n// ✅ נכון:\nfor (const t of tasks) { await save(t); }\n// או במקביל:\nawait Promise.all(tasks.map(save));",
        explanation:
          "forEach לא יודע לחכות ל-async. השתמש ב-for...of (סדרתי) או map+Promise.all (מקבילי).",
      },
    ],
    pitfalls: [
      {
        mistake: "להוסיף await בלי async סביב",
        why: "await מותר רק בתוך פונקציה async (או top-level ב-module). אחרת — SyntaxError.",
        fix: "סמן את הפונקציה כ-async, או עטוף ב-IIFE: `(async () => { await ... })()`.",
      },
      {
        mistake: "לשכוח await ולקבל Promise במקום ערך",
        why: "`const data = res.json()` (בלי await) מחזיר Promise. כל גישה ל-data.tasks תיתן undefined.",
        fix: "תמיד await על קריאה async, או .then.",
      },
      {
        mistake: "try/catch סביב await בלא צורך אם רוצים rethrow",
        why: "אם רק תופסים ו-throw מחדש — מיותר. הקוד עולה ב-stack ממילא.",
        fix: "תפוס רק כשאתה באמת מטפל בשגיאה (display, retry, fallback).",
      },
    ],
    practiceQuestions: [
      {
        question: "האם async function תמיד מחזירה Promise, גם אם רשמתי `return 5`?",
        answer:
          "כן — async עוטף את הערך ב-Promise.resolve. הקריאה תיתן Promise<5>, צריך await או .then כדי לקבל את 5.",
      },
      {
        question: "מה ההבדל בין `await Promise.all([a(), b()])` ל-`await a(); await b();`?",
        answer:
          "הראשון מקבילי (a ו-b רצים יחד, הזמן = max). השני סדרתי (b מחכה ל-a, הזמן = a+b). למשימות לא תלויות — תמיד Promise.all.",
      },
    ],
  },
});

// ─────────────────────────────── Quiz ───────────────────────────────
WORKBOOK_TASKMANAGER.quiz = [
  {
    question:
      "ב-Task Manager, מהי הסיבה העיקרית להעדיף `tasks = tasks.filter(t => t.id !== id)` על פני `tasks.splice(i, 1)` להסרת משימה?",
    options: [
      "filter יוצר מערך חדש (immutable) — קל לעקוב אחרי שינויים, מתאים למעבר עתידי ל-React.",
      "splice לא קיים בדפדפנים מודרניים.",
      "filter מהיר יותר באלפי מונים.",
      "splice לא מאפשר להסיר את הפריט הראשון.",
    ],
    correct: 0,
    explanation:
      "filter מחזיר מערך חדש בלי לשנות את המקור — דפוס immutability שעובר חלק ל-React, מקל על debugging, ומונע shared-mutation bugs.",
  },
  {
    question:
      "למה load() ב-Task Manager חייב להיות עטוף ב-try/catch?",
    options: [
      "כי JSON.parse יכול לזרוק SyntaxError אם ה-localStorage נפגם.",
      "כי localStorage תמיד זורק שגיאה בפעם הראשונה.",
      "כי React דורש שכל פונקציה תהיה ב-try/catch.",
      "כי בלי try/catch הקוד פשוט לא ירוץ.",
    ],
    correct: 0,
    explanation:
      "אם ב-localStorage יש מחרוזת לא תקינה (משתמש ערך ידני, גרסה ישנה, וכו') — JSON.parse יזרוק. בלי catch כל ה-app יקרוס.",
  },
  {
    question:
      "מה הסיבה ש-toggleDone משתמש ב-`tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)` במקום לעדכן ישירות `task.done = !task.done`?",
    options: [
      "כדי לשמור על immutability — יוצרים אובייקט חדש, לא מערבבים reference עם המקור.",
      "כי map יותר מהיר מ-forEach.",
      "כי `task.done = ...` לא חוקי ב-JavaScript.",
      "כדי להימנע משגיאות של React.",
    ],
    correct: 0,
    explanation:
      "spread יוצר אובייקט חדש עם done הפוך. כך שאר הקוד שמחזיק reference למקור לא מושפע — דפוס שחוסך באגים מסתוריים, חיוני בעבודה עם React.",
  },
  {
    question:
      "ב-Task Manager, מהי יתרון ה-event delegation על listener נפרד לכל <li>?",
    options: [
      "listener אחד על ה-<ul> מטפל בכל ה-<li>, גם ב-<li> חדשים שיתווספו בעתיד.",
      "delegation מבטל את הצורך ב-event bubbling.",
      "listener על parent רץ מהר יותר מ-listener על child.",
      "delegation עובד רק על כפתורים.",
    ],
    correct: 0,
    explanation:
      "כשהמערך מתעדכן (push/render חדש), ה-<li> נוצרים מחדש — listeners פרטניים יאבדו. listener על ה-<ul> מטפל בכל לחיצה ב-bubble, כולל אלמנטים חדשים.",
  },
  {
    question:
      "מה תחזיר הפונקציה הבאה?\n```\nasync function getCount() { return tasks.length; }\n```",
    options: [
      "Promise<number> — async תמיד עוטף את הערך ב-Promise.",
      "number — async לא משנה את ה-return כשאין await בפנים.",
      "undefined — async עם return ללא await מחזיר undefined.",
      "פונקציה — async מחזיר את ההגדרה עצמה.",
    ],
    correct: 0,
    explanation:
      "כל async function תמיד מחזירה Promise — ללא תלות בתוכן. const c = getCount() יחזיק Promise; כדי לקבל את המספר: const c = await getCount() או getCount().then(n => ...).",
  },
  {
    question:
      "באיזה מצב fetch יזרוק שגיאה (יפעיל .catch)?",
    options: [
      "כשאין חיבור לאינטרנט (network failure).",
      "כשהשרת מחזיר HTTP 404.",
      "כשהשרת מחזיר HTTP 500.",
      "כשהשרת מחזיר HTML במקום JSON.",
    ],
    correct: 0,
    explanation:
      "fetch מתייחס ל-4xx/5xx כתשובות תקינות (res.ok=false). הוא יזרוק רק כשהבקשה לא הצליחה כלל — אין רשת, DNS נכשל, וכו'. לכן חובה לבדוק res.ok ידנית.",
  },
];
