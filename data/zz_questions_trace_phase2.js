// data/questions_trace_phase2.js
//
// Phase 2 Trace activity coverage — closes 114 of 195 trace gaps to reach
// the 500-trace coverage target. Each trace is hand-authored against the
// concept name exactly as it appears in data/lesson*.js.

var QUESTIONS_TRACE_PHASE2 = [
  // ============================================================================
  // lesson_19 — JavaScript fundamentals (largest gap: 31 concepts)
  // ============================================================================
  {
    id: "trace_l19_let_001",
    conceptKey: "lesson_19::let",
    level: 2,
    title: "let עם re-assignment",
    code: "let count = 0;\ncount = count + 1;\ncount = count * 5;\nconsole.log(count);",
    steps: [
      { line: 1, prompt: "מה הערך של count?", answer: "0", hint: "מאותחל ל-0." },
      { line: 2, prompt: "אחרי השורה?", answer: "1", hint: "0 + 1." },
      { line: 3, prompt: "אחרי השורה?", answer: "5", hint: "1 * 5." },
      { line: 4, prompt: "מה יודפס?", answer: "5", hint: "הערך הסופי." },
    ],
    explanation: "let מאפשר re-assignment, בשונה מ-const.",
  },
  {
    id: "trace_l19_const_001",
    conceptKey: "lesson_19::const",
    level: 2,
    title: "const מונע re-assignment",
    code: "const PI = 3.14;\nconst arr = [1, 2];\narr.push(3);\nconsole.log(arr.length);",
    steps: [
      { line: 1, prompt: "מה הערך של PI?", answer: "3.14", hint: "אותחל." },
      { line: 3, prompt: "מה קורה ב-push?", answer: "מתווסף 3", acceptable: ["3 נוסף", "המערך משתנה"], hint: "const מונע re-assignment, לא מונע mutation." },
      { line: 4, prompt: "מה יודפס?", answer: "3", hint: "המערך עכשיו [1,2,3]." },
    ],
    explanation: "const חוסם re-assignment של המשתנה אבל אובייקטים/מערכים נשארים mutable.",
  },
  {
    id: "trace_l19_arrow_001",
    conceptKey: "lesson_19::arrow function",
    level: 3,
    title: "פונקציית חץ עם implicit return",
    code: "const add = (a, b) => a + b;\nconst double = n => n * 2;\nconsole.log(add(3, 4));\nconsole.log(double(5));",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "7", hint: "3+4." },
      { line: 4, prompt: "מה יודפס?", answer: "10", hint: "5*2." },
    ],
    explanation: "פונקציית חץ עם ביטוי יחיד מחזירה אותו אוטומטית. סוגריים סביב פרמטר יחיד אופציונליים.",
  },
  {
    id: "trace_l19_console_001",
    conceptKey: "lesson_19::console.log",
    level: 1,
    title: "console.log עם מספר ארגומנטים",
    code: "console.log('שם:', 'דני');\nconsole.log('גיל:', 25);\nconsole.log(1 + 1, 2 + 2);",
    steps: [
      { line: 1, prompt: "מה יודפס?", answer: "שם: דני", hint: "פסיק בין ארגומנטים = רווח." },
      { line: 2, prompt: "מה יודפס?", answer: "גיל: 25", hint: "מחרוזת ומספר." },
      { line: 3, prompt: "מה יודפס?", answer: "2 4", hint: "ביטויים מחושבים תחילה." },
    ],
    explanation: "console.log מקבל ארגומנטים מרובים ומדפיס אותם מופרדים ברווח.",
  },
  {
    id: "trace_l19_alert_001",
    conceptKey: "lesson_19::alert",
    level: 1,
    title: "alert עוצר את הריצה",
    code: "console.log('לפני');\nalert('שלום');\nconsole.log('אחרי');",
    steps: [
      { line: 1, prompt: "מה יודפס בקונסול?", answer: "לפני", hint: "ראשון." },
      { line: 2, prompt: "מה קורה?", answer: "חלון מודלי נפתח", acceptable: ["alert popup", "תיבת דיאלוג"], hint: "alert חוסם." },
      { line: 3, prompt: "מתי השורה רצה?", answer: "אחרי שהמשתמש לוחץ OK", acceptable: ["אחרי סגירת ה-alert"], hint: "alert blocking." },
    ],
    explanation: "alert מציג popup ועוצר את ה-thread עד שהמשתמש לוחץ OK.",
  },
  {
    id: "trace_l19_array_001",
    conceptKey: "lesson_19::array",
    level: 2,
    title: "מערך — אינדקסים ואורך",
    code: "const fruits = ['apple', 'banana', 'cherry'];\nconsole.log(fruits[0]);\nconsole.log(fruits[2]);\nconsole.log(fruits.length);",
    steps: [
      { line: 2, prompt: "מה יודפס?", answer: "apple", hint: "אינדקס 0." },
      { line: 3, prompt: "מה יודפס?", answer: "cherry", hint: "אינדקס 2." },
      { line: 4, prompt: "מה יודפס?", answer: "3", hint: "שלושה איברים." },
    ],
    explanation: "מערכים ב-JS מאוחסנים מאינדקס 0. length מחזיר את מספר האיברים.",
  },
  {
    id: "trace_l19_array_objects_001",
    conceptKey: "lesson_19::array of objects",
    level: 3,
    title: "מערך של אובייקטים — גישה מקוננת",
    code: "const users = [\n  { name: 'דני', age: 30 },\n  { name: 'רני', age: 25 }\n];\nconsole.log(users[0].name);\nconsole.log(users[1].age);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "דני", hint: "האובייקט הראשון, שדה name." },
      { line: 6, prompt: "מה יודפס?", answer: "25", hint: "האובייקט השני, שדה age." },
    ],
    explanation: "מערך של אובייקטים — גישה דרך אינדקס ואז .field.",
  },
  {
    id: "trace_l19_break_001",
    conceptKey: "lesson_19::break",
    level: 3,
    title: "break יוצא מהלולאה",
    code: "for (let i = 0; i < 10; i++) {\n  if (i === 3) break;\n  console.log(i);\n}",
    steps: [
      { line: 3, prompt: "אילו ערכים יודפסו?", answer: "0 1 2", acceptable: ["0,1,2", "0\n1\n2"], hint: "break ב-i===3 עוצר לפני ההדפסה." },
    ],
    explanation: "break עוצר את הלולאה מיד. כש-i=3 התנאי נכון, הלולאה מסתיימת בלי להדפיס.",
  },
  {
    id: "trace_l19_continue_001",
    conceptKey: "lesson_19::continue",
    level: 3,
    title: "continue מדלג על איטרציה",
    code: "for (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  console.log(i);\n}",
    steps: [
      { line: 3, prompt: "אילו ערכים יודפסו?", answer: "0 1 3 4", acceptable: ["0,1,3,4", "0\n1\n3\n4"], hint: "continue מדלג על i=2 בלבד." },
    ],
    explanation: "continue קופץ לאיטרציה הבאה בלי לבצע את שאר הקוד באותה איטרציה.",
  },
  {
    id: "trace_l19_switch_001",
    conceptKey: "lesson_19::switch",
    level: 3,
    title: "switch — case ו-default",
    code: "const day = 'Mon';\nlet label;\nswitch (day) {\n  case 'Mon': label = 'Start'; break;\n  case 'Fri': label = 'End'; break;\n  default: label = 'Mid';\n}\nconsole.log(label);",
    steps: [
      { line: 8, prompt: "מה יודפס?", answer: "Start", hint: "day === 'Mon' מתאים ל-case הראשון." },
    ],
    explanation: "switch משווה את המשתנה לכל case. break מונע נפילה ל-case הבא.",
  },
  {
    id: "trace_l19_while_001",
    conceptKey: "lesson_19::while",
    level: 2,
    title: "while עם מונה",
    code: "let n = 0;\nwhile (n < 3) {\n  console.log(n);\n  n++;\n}",
    steps: [
      { line: 3, prompt: "אילו ערכים יודפסו?", answer: "0 1 2", acceptable: ["0,1,2", "0\n1\n2"], hint: "התנאי הופך לשקר כש-n=3." },
    ],
    explanation: "while בודק את התנאי לפני כל איטרציה. בלי n++ הלולאה הייתה אינסופית.",
  },
  {
    id: "trace_l19_do_while_001",
    conceptKey: "lesson_19::do while",
    level: 3,
    title: "do…while רץ לפחות פעם אחת",
    code: "let n = 5;\ndo {\n  console.log(n);\n  n++;\n} while (n < 3);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "5", hint: "do…while מבצע פעם אחת לפני שהוא בודק תנאי." },
    ],
    explanation: "do…while תמיד רץ פעם אחת לפחות, גם אם התנאי שקרי מההתחלה.",
  },
  {
    id: "trace_l19_try_001",
    conceptKey: "lesson_19::try",
    level: 3,
    title: "try…catch לוכד שגיאה",
    code: "try {\n  JSON.parse('not-json');\n  console.log('הצליח');\n} catch (err) {\n  console.log('שגיאה');\n}\nconsole.log('סוף');",
    steps: [
      { line: 5, prompt: "מה יודפס ראשון?", answer: "שגיאה", hint: "JSON.parse על מחרוזת לא חוקית זורק SyntaxError." },
      { line: 7, prompt: "מה יודפס אחר כך?", answer: "סוף", hint: "אחרי catch הקוד ממשיך." },
    ],
    explanation: "try…catch לוכד שגיאות ומונע מהן לעצור את התוכנית.",
  },
  {
    id: "trace_l19_catch_001",
    conceptKey: "lesson_19::catch",
    level: 4,
    title: "catch מקבל את ה-Error",
    code: "try {\n  throw new Error('oops');\n} catch (e) {\n  console.log(e.message);\n}",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "oops", hint: "e.message הוא הטקסט שהועבר ל-Error." },
    ],
    explanation: "catch(e) מקבל את האובייקט שזרק. e.message מכיל את התיאור.",
  },
  {
    id: "trace_l19_return_001",
    conceptKey: "lesson_19::return",
    level: 2,
    title: "return יוצא מהפונקציה מיד",
    code: "function check(x) {\n  if (x > 0) return 'חיובי';\n  console.log('רץ');\n  return 'אחר';\n}\nconsole.log(check(5));",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "חיובי", hint: "return ב-line 2 יוצא לפני console.log." },
    ],
    explanation: "return מסיים את הפונקציה ומחזיר ערך. הקוד אחריו לא מתבצע.",
  },
  {
    id: "trace_l19_parameter_001",
    conceptKey: "lesson_19::parameter",
    level: 2,
    title: "פרמטרים עם default",
    code: "function greet(name = 'אורח', mark = '!') {\n  return `שלום ${name}${mark}`;\n}\nconsole.log(greet());\nconsole.log(greet('דני'));\nconsole.log(greet('רני', '?'));",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "שלום אורח!", hint: "שני defaults." },
      { line: 5, prompt: "מה יודפס?", answer: "שלום דני!", hint: "name מועבר, mark default." },
      { line: 6, prompt: "מה יודפס?", answer: "שלום רני?", hint: "שניהם מועברים." },
    ],
    explanation: "ערכי ברירת מחדל לפרמטרים מופעלים אם הקריאה לא מעבירה את הארגומנט.",
  },
  {
    id: "trace_l19_scope_001",
    conceptKey: "lesson_19::scope",
    level: 4,
    title: "Block scope עם let",
    code: "let x = 1;\nif (true) {\n  let x = 2;\n  console.log(x);\n}\nconsole.log(x);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "2", hint: "ה-let הפנימי בלוק חדש." },
      { line: 6, prompt: "מה יודפס?", answer: "1", hint: "ה-let החיצוני לא הושפע." },
    ],
    explanation: "let יוצר block scope — משתנה בלוק לא דולף החוצה ולא דורס את החיצוני.",
  },
  {
    id: "trace_l19_hoisting_001",
    conceptKey: "lesson_19::hoisting",
    level: 5,
    title: "Hoisting עם var ו-let",
    code: "console.log(typeof a);\nvar a = 1;\ntry {\n  console.log(typeof b);\n  let b = 2;\n} catch (e) {\n  console.log('TDZ');\n}",
    steps: [
      { line: 1, prompt: "מה יודפס?", answer: "undefined", hint: "var hoisted אבל לא initialized." },
      { line: 7, prompt: "מה יודפס?", answer: "TDZ", hint: "let ב-Temporal Dead Zone לפני השורה." },
    ],
    explanation: "var hoisted ל-undefined. let hoisted אבל ב-TDZ עד ההגדרה — גישה זורקת ReferenceError.",
  },
  {
    id: "trace_l19_data_types_001",
    conceptKey: "lesson_19::Data Types",
    level: 2,
    title: "typeof לסוגים שונים",
    code: "console.log(typeof 42);\nconsole.log(typeof 'hi');\nconsole.log(typeof true);\nconsole.log(typeof undefined);\nconsole.log(typeof null);",
    steps: [
      { line: 1, prompt: "מה יודפס?", answer: "number", hint: "מספר." },
      { line: 2, prompt: "מה יודפס?", answer: "string", hint: "מחרוזת." },
      { line: 3, prompt: "מה יודפס?", answer: "boolean", hint: "ערך אמת." },
      { line: 4, prompt: "מה יודפס?", answer: "undefined", hint: "כאשר אין ערך." },
      { line: 5, prompt: "מה יודפס?", answer: "object", hint: "באג היסטורי של JS." },
    ],
    explanation: "typeof null === 'object' הוא באג מ-1995 שלא תוקן לתאימות לאחור.",
  },
  {
    id: "trace_l19_method_001",
    conceptKey: "lesson_19::method",
    level: 3,
    title: "מתודה של אובייקט",
    code: "const car = {\n  speed: 0,\n  accelerate(by) { this.speed += by; }\n};\ncar.accelerate(10);\ncar.accelerate(5);\nconsole.log(car.speed);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "15", hint: "0 + 10 + 5." },
    ],
    explanation: "מתודה היא פונקציה ששייכת לאובייקט. this מצביע על האובייקט הקורא.",
  },
  {
    id: "trace_l19_inheritance_001",
    conceptKey: "lesson_19::inheritance",
    level: 5,
    title: "ירושה עם class",
    code: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} עושה רעש`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} נובח`; }\n}\nconst d = new Dog('רקסי');\nconsole.log(d.speak());",
    steps: [
      { line: 9, prompt: "מה יודפס?", answer: "רקסי נובח", hint: "Dog.speak מחליף את Animal.speak." },
    ],
    explanation: "extends יוצר class בן. שיטות במחלקה הבת דורסות את ההורה.",
  },
  {
    id: "trace_l19_camelcase_001",
    conceptKey: "lesson_19::camelCase",
    level: 1,
    title: "כינויי משתנים ב-camelCase",
    code: "const firstName = 'דני';\nconst lastName = 'כהן';\nconst fullName = `${firstName} ${lastName}`;\nconsole.log(fullName);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "דני כהן", hint: "template literal עם interpolation." },
    ],
    explanation: "ב-JS המוסכמה היא camelCase למשתנים: מילה ראשונה lower, אחרות מתחילות ב-Upper.",
  },
  {
    id: "trace_l19_dom_001",
    conceptKey: "lesson_19::DOM",
    level: 3,
    title: "querySelector ו-textContent",
    code: "// HTML: <h1 id='t'>שלום</h1>\nconst el = document.querySelector('#t');\nconsole.log(el.textContent);\nel.textContent = 'עולם';\nconsole.log(el.textContent);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "שלום", hint: "התוכן ההתחלתי." },
      { line: 5, prompt: "מה יודפס?", answer: "עולם", hint: "אחרי שינוי." },
    ],
    explanation: "querySelector מחזיר את האלמנט הראשון שמתאים ל-CSS selector. textContent קורא/כותב טקסט.",
  },
  {
    id: "trace_l19_event_object_001",
    conceptKey: "lesson_19::event object",
    level: 3,
    title: "אובייקט ה-event",
    code: "// btn.onclick = handle;\nfunction handle(event) {\n  console.log(event.type);\n  console.log(event.target.tagName);\n}",
    steps: [
      { line: 3, prompt: "מה יודפס בלחיצה על button?", answer: "click", hint: "סוג האירוע." },
      { line: 4, prompt: "מה יודפס בלחיצה על button?", answer: "BUTTON", hint: "tagName באותיות גדולות." },
    ],
    explanation: "כל handler מקבל event object עם type, target, ועוד מאפיינים.",
  },
  {
    id: "trace_l19_map_001",
    conceptKey: "lesson_19::map",
    level: 3,
    title: "Array.map יוצר מערך חדש",
    code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);\nconsole.log(nums);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "[2, 4, 6]", acceptable: ["[2,4,6]"], hint: "כל ערך כפול 2." },
      { line: 4, prompt: "מה יודפס?", answer: "[1, 2, 3]", acceptable: ["[1,2,3]"], hint: "המקור לא משתנה." },
    ],
    explanation: "map מחזיר מערך חדש באותו אורך, לא משנה את המקור.",
  },
  {
    id: "trace_l19_find_001",
    conceptKey: "lesson_19::find",
    level: 3,
    title: "Array.find מחזיר את הראשון",
    code: "const users = [\n  { id: 1, name: 'A' },\n  { id: 2, name: 'B' },\n  { id: 3, name: 'A' }\n];\nconst first = users.find(u => u.name === 'A');\nconsole.log(first.id);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "1", hint: "find מחזיר את ההתאמה הראשונה." },
    ],
    explanation: "find מחזיר את הערך הראשון שעבר את הבדיקה. אם אין — undefined.",
  },
  {
    id: "trace_l19_reduce_001",
    conceptKey: "lesson_19::reduce",
    level: 5,
    title: "Array.reduce — סיכום",
    code: "const nums = [1, 2, 3, 4];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "10", hint: "0+1+2+3+4." },
    ],
    explanation: "reduce עובר על כל איבר ומצרף לאקומולטור. הארגומנט השני הוא ערך התחלה.",
  },
  {
    id: "trace_l19_debugger_001",
    conceptKey: "lesson_19::debugger",
    level: 3,
    title: "debugger statement",
    code: "function calc(a, b) {\n  debugger;\n  return a + b;\n}\nconsole.log(calc(2, 3));",
    steps: [
      { line: 2, prompt: "מה קורה כש-DevTools פתוח?", answer: "הריצה נעצרת", acceptable: ["pause", "breakpoint"], hint: "debugger = breakpoint דינמי." },
      { line: 5, prompt: "מה יודפס בסוף?", answer: "5", hint: "אחרי שממשיכים." },
    ],
    explanation: "debugger statement עוצר את הריצה אם DevTools פתוח. אחרת הוא מתעלם.",
  },
  {
    id: "trace_l19_network_001",
    conceptKey: "lesson_19::network",
    level: 4,
    title: "fetch בקשת רשת",
    code: "async function load() {\n  const res = await fetch('/api/data');\n  if (!res.ok) throw new Error('fail');\n  return await res.json();\n}",
    steps: [
      { line: 2, prompt: "מה res מכיל אחרי await?", answer: "Response", acceptable: ["אובייקט Response", "תגובת HTTP"], hint: "fetch מחזיר Response." },
      { line: 3, prompt: "מתי ה-throw?", answer: "כש-status הוא 4xx או 5xx", acceptable: ["res.ok=false"], hint: "ok=true ל-2xx." },
    ],
    explanation: "fetch מחזיר Promise<Response>. res.ok=true עבור statuses 2xx. .json() מפענח גוף.",
  },
  {
    id: "trace_l19_cookies_001",
    conceptKey: "lesson_19::cookies",
    level: 4,
    title: "document.cookie",
    code: "document.cookie = 'theme=dark';\ndocument.cookie = 'lang=he';\nconsole.log(document.cookie);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "theme=dark; lang=he", hint: "כל ה-cookies מופרדים ב-`; `." },
    ],
    explanation: "מציבים cookie בודד בכל set, אבל קריאה מחזירה את הכולם. נשלחים אוטומטית עם בקשות ל-domain.",
  },
  {
    id: "trace_l19_session_001",
    conceptKey: "lesson_19::sessionStorage",
    level: 3,
    title: "sessionStorage נמחק בסגירת tab",
    code: "sessionStorage.setItem('user', 'דני');\nconsole.log(sessionStorage.getItem('user'));\nsessionStorage.removeItem('user');\nconsole.log(sessionStorage.getItem('user'));",
    steps: [
      { line: 2, prompt: "מה יודפס?", answer: "דני", hint: "אחרי setItem." },
      { line: 4, prompt: "מה יודפס?", answer: "null", hint: "אחרי removeItem." },
    ],
    explanation: "sessionStorage מאחסן רק ל-tab הנוכחי. נמחק כשסוגרים. localStorage נשאר.",
  },

  // ============================================================================
  // lesson_20 — MongoDB / Mongoose (26 concepts)
  // ============================================================================
  {
    id: "trace_l20_database_001",
    conceptKey: "lesson_20::Database",
    level: 2,
    title: "URI חיבור למסד",
    code: "const uri = 'mongodb://localhost:27017/blog';\n// uri = protocol://host:port/dbName\nconst db = uri.split('/').pop();\nconsole.log(db);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "blog", hint: "החלק האחרון אחרי /." },
    ],
    explanation: "ב-MongoDB URI שם המסד הוא החלק האחרון. אם לא קיים — נוצר במגע ראשון.",
  },
  {
    id: "trace_l20_collection_001",
    conceptKey: "lesson_20::Collection",
    level: 2,
    title: "Collection דומה לטבלה ב-SQL",
    code: "const Post = mongoose.model('Post', schema);\n// אוסף = posts (lowercase + plural)\nconsole.log(Post.collection.name);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "posts", hint: "Mongoose ממיר ל-lowercase plural." },
    ],
    explanation: "Mongoose ממיר את שם ה-Model לאוסף ב-lowercase plural ('User' → 'users').",
  },
  {
    id: "trace_l20_document_001",
    conceptKey: "lesson_20::Document",
    level: 2,
    title: "Document = שורה ב-collection",
    code: "const doc = await Post.create({ title: 'שלום', views: 0 });\nconsole.log(doc._id);\nconsole.log(typeof doc._id.toString());",
    steps: [
      { line: 2, prompt: "מה הסוג של _id?", answer: "ObjectId", acceptable: ["ObjectID", "אובייקט"], hint: "Mongo נותן _id אוטומטי." },
      { line: 3, prompt: "מה יודפס?", answer: "string", hint: ".toString על ObjectId מחזיר string." },
    ],
    explanation: "כל Document במונגו מקבל _id ייחודי (ObjectId). הוא יוצר אוטומטית אם לא ציינת.",
  },
  {
    id: "trace_l20_findone_001",
    conceptKey: "lesson_20::findOne",
    level: 3,
    title: "findOne מחזיר את הראשון או null",
    code: "const u = await User.findOne({ email: 'a@b.c' });\nif (u) console.log(u.name);\nelse console.log('לא נמצא');",
    steps: [
      { line: 3, prompt: "מה יודפס אם אין user?", answer: "לא נמצא", hint: "findOne מחזיר null אם אין." },
    ],
    explanation: "findOne מחזיר Document או null. find מחזיר מערך (אולי ריק).",
  },
  {
    id: "trace_l20_insertone_001",
    conceptKey: "lesson_20::insertOne",
    level: 3,
    title: "insertOne מחזיר את התוצאה",
    code: "const result = await Post.insertOne({ title: 'A' });\nconsole.log(result.acknowledged);\nconsole.log(typeof result.insertedId);",
    steps: [
      { line: 2, prompt: "מה יודפס?", answer: "true", hint: "אם הצליח." },
      { line: 3, prompt: "מה הסוג?", answer: "object", hint: "ObjectId הוא object." },
    ],
    explanation: "insertOne ב-driver הרשמי מחזיר { acknowledged, insertedId }.",
  },
  {
    id: "trace_l20_insertmany_001",
    conceptKey: "lesson_20::insertMany",
    level: 3,
    title: "insertMany — מערך של docs",
    code: "const r = await Post.insertMany([{ t: 'a' }, { t: 'b' }, { t: 'c' }]);\nconsole.log(r.length);",
    steps: [
      { line: 2, prompt: "מה יודפס (Mongoose)?", answer: "3", hint: "Mongoose מחזיר מערך של ה-docs." },
    ],
    explanation: "Mongoose insertMany מחזיר מערך docs. הdriver הרשמי מחזיר { insertedIds, insertedCount }.",
  },
  {
    id: "trace_l20_updatemany_001",
    conceptKey: "lesson_20::updateMany",
    level: 4,
    title: "updateMany עם filter",
    code: "const r = await Post.updateMany({ status: 'draft' }, { $set: { status: 'published' } });\nconsole.log(r.modifiedCount);",
    steps: [
      { line: 2, prompt: "אם 4 docs היו draft — מה יודפס?", answer: "4", hint: "כמה הושפעו בפועל." },
    ],
    explanation: "modifiedCount = ההכמה שהשתנו. matchedCount = כמה התאימו ל-filter (לפעמים גדול יותר).",
  },
  {
    id: "trace_l20_deleteone_001",
    conceptKey: "lesson_20::deleteOne",
    level: 3,
    title: "deleteOne מסיר את הראשון",
    code: "const r = await Post.deleteOne({ title: 'A' });\nconsole.log(r.deletedCount);",
    steps: [
      { line: 2, prompt: "אם נמצא ונמחק — מה יודפס?", answer: "1", hint: "תמיד 0 או 1." },
    ],
    explanation: "deleteOne מוחק רק את הראשון שמתאים, גם אם יש כמה. deletedCount: 0 או 1.",
  },
  {
    id: "trace_l20_deletemany_001",
    conceptKey: "lesson_20::deleteMany",
    level: 3,
    title: "deleteMany מוחק את כל ההתאמות",
    code: "const r = await Post.deleteMany({ archived: true });\nconsole.log(r.deletedCount);",
    steps: [
      { line: 2, prompt: "אם 7 docs היו archived — מה יודפס?", answer: "7", hint: "כל ההתאמות." },
    ],
    explanation: "deleteMany מוחק את כל ה-docs שמתאימים ל-filter.",
  },
  {
    id: "trace_l20_findoneandupdate_001",
    conceptKey: "lesson_20::findOneAndUpdate",
    level: 4,
    title: "findOneAndUpdate החזרת ערך חדש",
    code: "const updated = await Post.findOneAndUpdate(\n  { _id: id },\n  { $inc: { views: 1 } },\n  { new: true }\n);\nconsole.log(updated.views);",
    steps: [
      { line: 6, prompt: "אם views היה 5, מה יודפס?", answer: "6", hint: "{new:true} מחזיר אחרי העדכון." },
    ],
    explanation: "ברירת מחדל findOneAndUpdate מחזיר את ה-doc לפני העדכון. {new:true} מחזיר אחרי.",
  },
  {
    id: "trace_l20_eq_001",
    conceptKey: "lesson_20::$eq",
    level: 3,
    title: "$eq — שווה",
    code: "// equivalent: { age: 25 }\nconst q = { age: { $eq: 25 } };\nconst users = await User.find(q);",
    steps: [
      { line: 2, prompt: "אילו docs יוחזרו?", answer: "כל אלה ש-age בדיוק 25", acceptable: ["age=25", "age==25"], hint: "$eq שוויון." },
    ],
    explanation: "{ field: value } שקול ל- { field: { $eq: value } }.",
  },
  {
    id: "trace_l20_ne_001",
    conceptKey: "lesson_20::$ne",
    level: 3,
    title: "$ne — לא שווה",
    code: "const q = { status: { $ne: 'archived' } };\nconst posts = await Post.find(q);",
    steps: [
      { line: 1, prompt: "אילו posts יוחזרו?", answer: "כל אלה שלא archived", acceptable: ["status != archived"], hint: "$ne שולל." },
    ],
    explanation: "$ne מחזיר את כל המסמכים שהשדה שונה מהערך (כולל מסמכים שאין להם את השדה).",
  },
  {
    id: "trace_l20_gt_001",
    conceptKey: "lesson_20::$gt",
    level: 3,
    title: "$gt — גדול ממש",
    code: "const q = { price: { $gt: 100 } };\nconst items = await Item.find(q);",
    steps: [
      { line: 1, prompt: "אם יש פריט price=100, יחזור?", answer: "לא", hint: "$gt לא כולל את הערך עצמו." },
    ],
    explanation: "$gt = greater than (>). $gte = greater than or equal (>=).",
  },
  {
    id: "trace_l20_gte_001",
    conceptKey: "lesson_20::$gte",
    level: 3,
    title: "$gte — גדול או שווה",
    code: "const q = { age: { $gte: 18 } };\nconst adults = await User.find(q);",
    steps: [
      { line: 1, prompt: "אם user age=18, יחזור?", answer: "כן", hint: "$gte כולל את הערך עצמו." },
    ],
    explanation: "$gte כולל את הערך. age=18 בדיוק עובר את הסף.",
  },
  {
    id: "trace_l20_lt_001",
    conceptKey: "lesson_20::$lt",
    level: 3,
    title: "$lt — קטן ממש",
    code: "const q = { stock: { $lt: 5 } };\nconst lowStock = await Product.find(q);",
    steps: [
      { line: 1, prompt: "אם stock=5, יחזור?", answer: "לא", hint: "$lt לא כולל." },
    ],
    explanation: "$lt = less than (<). שימוש: התראות מלאי נמוך.",
  },
  {
    id: "trace_l20_lte_001",
    conceptKey: "lesson_20::$lte",
    level: 3,
    title: "$lte — קטן או שווה",
    code: "const q = { score: { $lte: 50 } };\nconst failing = await Test.find(q);",
    steps: [
      { line: 1, prompt: "אם score=50, יחזור?", answer: "כן", hint: "$lte כולל." },
    ],
    explanation: "$lte תופס בדיוק את הסף. שילוב $gte+$lte = טווח.",
  },
  {
    id: "trace_l20_model_001",
    conceptKey: "lesson_20::Model",
    level: 3,
    title: "mongoose.model יוצר Model",
    code: "const PostSchema = new mongoose.Schema({ title: String });\nconst Post = mongoose.model('Post', PostSchema);\nconst p = new Post({ title: 'A' });\nconsole.log(p.title);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "A", hint: "מאתחל מהארגומנט." },
    ],
    explanation: "Model מקשר schema לאוסף ומספק CRUD. ה-instance הוא Document.",
  },
  {
    id: "trace_l20_atlas_001",
    conceptKey: "lesson_20::MongoDB Atlas",
    level: 2,
    title: "URI ל-Atlas",
    code: "const atlas = 'mongodb+srv://user:pass@cluster0.abc.mongodb.net/blog';\nconst protocol = atlas.split('://')[0];\nconsole.log(protocol);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "mongodb+srv", hint: "Atlas משתמש ב-srv ל-DNS." },
    ],
    explanation: "mongodb+srv:// משתמש ב-DNS SRV records כדי למצוא replica set אוטומטית.",
  },
  {
    id: "trace_l20_cluster_001",
    conceptKey: "lesson_20::Cluster",
    level: 3,
    title: "Cluster = קבוצת nodes",
    code: "// 3-node replica set: primary + 2 secondaries\nconst replica = ['primary', 'secondary', 'secondary'];\nconst writeable = replica.filter(n => n === 'primary');\nconsole.log(writeable.length);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "1", hint: "רק primary מקבל writes." },
    ],
    explanation: "ב-replica set יש primary אחד שמקבל כתיבות. secondaries מסנכרנים ומשרתים reads.",
  },
  {
    id: "trace_l20_connection_001",
    conceptKey: "lesson_20::Connection String",
    level: 2,
    title: "פירוק connection string",
    code: "const cs = 'mongodb://localhost:27017/myapp';\nconst [proto, rest] = cs.split('://');\nconst host = rest.split('/')[0];\nconsole.log(host);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "localhost:27017", hint: "החלק לפני /." },
    ],
    explanation: "Connection string כולל protocol, אישורים, host:port, ושם DB.",
  },
  {
    id: "trace_l20_nosql_001",
    conceptKey: "lesson_20::NoSQL",
    level: 2,
    title: "NoSQL — schema גמיש",
    code: "// בלי schema קשיח, אפשר:\nawait Coll.insertOne({ name: 'A', age: 30 });\nawait Coll.insertOne({ name: 'B', email: 'b@c' });\n// שני docs באותה collection — שדות שונים",
    steps: [
      { line: 3, prompt: "מה ההבדל בין ה-docs?", answer: "שדות שונים", acceptable: ["סכמה לא אחידה", "אחד עם age, השני עם email"], hint: "NoSQL מאפשר schema flexibility." },
    ],
    explanation: "NoSQL כמו MongoDB מאפשר docs באותה collection עם schemas שונות. SQL דורש טבלה אחידה.",
  },
  {
    id: "trace_l20_sql_001",
    conceptKey: "lesson_20::SQL",
    level: 2,
    title: "השוואה SQL ↔ NoSQL",
    code: "// SQL:    SELECT * FROM users WHERE age > 18;\n// NoSQL:  db.users.find({ age: { $gt: 18 } });\nconst sql = 'SELECT';\nconst nosql = 'find';\nconsole.log(sql, nosql);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "SELECT find", hint: "SQL משפט הצהרתי, NoSQL קריאה למתודה." },
    ],
    explanation: "SQL = שפת שאילתה הצהרתית. NoSQL/Mongo = API על JSON-like docs.",
  },
  {
    id: "trace_l20_json_001",
    conceptKey: "lesson_20::JSON",
    level: 2,
    title: "JSON ↔ JavaScript object",
    code: "const obj = { name: 'A', age: 25 };\nconst str = JSON.stringify(obj);\nconst back = JSON.parse(str);\nconsole.log(typeof str);\nconsole.log(back.age);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "string", hint: "stringify מחזיר string." },
      { line: 5, prompt: "מה יודפס?", answer: "25", hint: "parse מחזיר אובייקט." },
    ],
    explanation: "JSON.stringify מסדרת אובייקט ל-string. JSON.parse הופך חזרה.",
  },
  {
    id: "trace_l20_value_001",
    conceptKey: "lesson_20::Value",
    level: 2,
    title: "ערך — primitive או reference",
    code: "const a = 5;\nconst obj = { x: 5 };\nconsole.log(a === 5);\nconsole.log(obj === { x: 5 });",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "true", hint: "primitives שווים בערך." },
      { line: 4, prompt: "מה יודפס?", answer: "false", hint: "objects שונים — reference שונה." },
    ],
    explanation: "primitives נשמרים בערך. objects/arrays נשמרים ב-reference — שני literals = שני אובייקטים.",
  },
  {
    id: "trace_l20_update_001",
    conceptKey: "lesson_20::update",
    level: 4,
    title: "$set מול replace",
    code: "// docs[0]: { name: 'A', age: 25 }\nawait Coll.updateOne({ name: 'A' }, { $set: { age: 26 } });\n// השדה name נשמר. age מתעדכן.",
    steps: [
      { line: 3, prompt: "אילו שדות נשארים?", answer: "name + age", acceptable: ["שניהם"], hint: "$set משנה רק את הספציפיים." },
    ],
    explanation: "$set משנה שדה ספציפי בלי לדרוס. בלי $set — Mongo מחליף את ה-doc כולו.",
  },
  {
    id: "trace_l20_props_001",
    conceptKey: "lesson_20::Props",
    level: 2,
    title: "props של schema",
    code: "const schema = new mongoose.Schema({\n  title: { type: String, required: true },\n  views: { type: Number, default: 0 }\n});\nconst Post = mongoose.model('Post', schema);\nconst p = new Post({ title: 'A' });\nconsole.log(p.views);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "0", hint: "default kicks in." },
    ],
    explanation: "במונגוס props של שדה: type, required, default, unique, validate, ועוד.",
  },

  // ============================================================================
  // lesson_26 — TypeScript (21 concepts)
  // ============================================================================
  {
    id: "trace_l26_string_001",
    conceptKey: "lesson_26::string",
    level: 1,
    title: "type string",
    code: "const name: string = 'דני';\nconst greeting = `שלום, ${name}`;\nconsole.log(greeting);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "שלום, דני", hint: "template literal." },
    ],
    explanation: "string ב-TS הוא טיפוס primitive. גם 'a', \"a\", `a` כולם string.",
  },
  {
    id: "trace_l26_number_001",
    conceptKey: "lesson_26::number",
    level: 1,
    title: "type number",
    code: "const age: number = 25;\nconst pi: number = 3.14;\nconsole.log(age + pi);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "28.14", hint: "מספר שלם + מספר עשרוני." },
    ],
    explanation: "ב-TS אין int/float נפרדים. הכל number.",
  },
  {
    id: "trace_l26_boolean_001",
    conceptKey: "lesson_26::boolean",
    level: 1,
    title: "type boolean",
    code: "const isAdmin: boolean = true;\nconst isGuest: boolean = !isAdmin;\nconsole.log(isGuest);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "false", hint: "negation של true." },
    ],
    explanation: "boolean = true | false. !x מחזיר את ההיפך.",
  },
  {
    id: "trace_l26_void_001",
    conceptKey: "lesson_26::void",
    level: 3,
    title: "void בפונקציה",
    code: "function log(msg: string): void {\n  console.log(msg);\n}\nconst result = log('hi');\nconsole.log(result);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "undefined", hint: "void = פונקציה לא מחזירה ערך." },
    ],
    explanation: "פונקציה void לא מחזירה ערך. ב-runtime זה undefined.",
  },
  {
    id: "trace_l26_never_001",
    conceptKey: "lesson_26::never",
    level: 5,
    title: "never — פונקציה שלא חוזרת",
    code: "function fail(msg: string): never {\n  throw new Error(msg);\n}\ntry {\n  fail('x');\n} catch (e: any) {\n  console.log(e.message);\n}",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "x", hint: "fail זורק לפני שיחזור." },
    ],
    explanation: "never = פונקציה שלעולם לא מחזירה ערך (זורקת או infinite loop).",
  },
  {
    id: "trace_l26_tuple_001",
    conceptKey: "lesson_26::tuple",
    level: 4,
    title: "tuple — מערך באורך וטיפוסים קבועים",
    code: "const point: [number, number] = [3, 4];\nconst [x, y] = point;\nconsole.log(x + y);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "7", hint: "3+4." },
    ],
    explanation: "tuple = מערך עם אורך וטיפוסים קבועים בכל מיקום.",
  },
  {
    id: "trace_l26_enum_001",
    conceptKey: "lesson_26::enum",
    level: 4,
    title: "enum — ערכים מנויים",
    code: "enum Status { Pending, Active, Done }\nconst s = Status.Active;\nconsole.log(s);\nconsole.log(Status[s]);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "1", hint: "ערכי enum מתחילים מ-0." },
      { line: 4, prompt: "מה יודפס?", answer: "Active", hint: "reverse mapping." },
    ],
    explanation: "enum numeric יוצר reverse mapping — אפשר לקבל שם מערך וערך משם.",
  },
  {
    id: "trace_l26_readonly_001",
    conceptKey: "lesson_26::readonly",
    level: 4,
    title: "readonly מונע שינוי",
    code: "interface Config {\n  readonly host: string;\n}\nconst c: Config = { host: 'localhost' };\n// c.host = 'x'; // TS error\nconsole.log(c.host);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "localhost", hint: "השדה לא משתנה." },
    ],
    explanation: "readonly אוסר assignment אחרי האתחול. TS שגיאה compile-time.",
  },
  {
    id: "trace_l26_type_alias_001",
    conceptKey: "lesson_26::type alias",
    level: 3,
    title: "type alias",
    code: "type ID = string | number;\nconst a: ID = 'abc';\nconst b: ID = 42;\nconsole.log(typeof a, typeof b);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "string number", hint: "כל אחד מהטיפוסים האפשריים." },
    ],
    explanation: "type alias = שם לטיפוס. שימושי ל-union types וטיפוסים מורכבים.",
  },
  {
    id: "trace_l26_interface_vs_type_001",
    conceptKey: "lesson_26::interface vs type",
    level: 4,
    title: "interface ניתן להרחיב",
    code: "interface Animal { name: string; }\ninterface Animal { age: number; } // declaration merging\nconst a: Animal = { name: 'A', age: 5 };\nconsole.log(a.name, a.age);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "A 5", hint: "ה-interface מתמזג." },
    ],
    explanation: "interface מאפשר declaration merging. type alias לא — ניסיון להגדיר שוב = שגיאה.",
  },
  {
    id: "trace_l26_compiler_001",
    conceptKey: "lesson_26::Compiler",
    level: 2,
    title: "tsc compiles to JS",
    code: "// app.ts:\n// const x: number = 5;\n// אחרי tsc:\n// app.js:\nconst x = 5;  // הטיפוס הוסר\nconsole.log(typeof x);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "number", hint: "TS מסיר טיפוסים, רק רץ JS." },
    ],
    explanation: "TS Compiler (tsc) מקמפל TS ל-JS. הטיפוסים נמחקים ב-runtime.",
  },
  {
    id: "trace_l26_tsc_001",
    conceptKey: "lesson_26::tsc",
    level: 2,
    title: "tsc CLI",
    code: "// $ tsc app.ts\n// יוצר app.js\n// $ tsc --noEmit\n// בודק טיפוסים בלי לפלוט קבצים\nconsole.log('ts compiled');",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "ts compiled", hint: "פשוט מחרוזת." },
    ],
    explanation: "tsc הוא ה-compiler. --noEmit = type-check בלבד.",
  },
  {
    id: "trace_l26_tsconfig_001",
    conceptKey: "lesson_26::tsconfig.json",
    level: 3,
    title: "tsconfig מגדיר אופציות compile",
    code: "// tsconfig.json:\n// { \"compilerOptions\": { \"strict\": true, \"target\": \"ES2020\" } }\nconst strict = true;\nconsole.log(strict);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "true", hint: "strict mode = type checks חמורים." },
    ],
    explanation: "tsconfig.json מקובץ עם compilerOptions: target, strict, module, paths, ועוד.",
  },
  {
    id: "trace_l26_ts_ext_001",
    conceptKey: "lesson_26::.ts",
    level: 1,
    title: "סיומת .ts vs .tsx",
    code: "// .ts  = TypeScript ללא JSX\n// .tsx = TypeScript עם JSX\nconst tsExt = '.ts';\nconst tsxExt = '.tsx';\nconsole.log(tsExt + ' ' + tsxExt);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: ".ts .tsx", hint: "מחרוזות." },
    ],
    explanation: ".ts לקבצים בלי JSX. .tsx (כמו .jsx) לקומפוננטות React עם markup.",
  },
  {
    id: "trace_l26_js_ext_001",
    conceptKey: "lesson_26::.js",
    level: 1,
    title: ".js פלט של tsc",
    code: "// app.ts יקומפל ל-app.js\n// אחרי הקומפילציה:\nconst output = 'app.js';\nconsole.log(output.endsWith('.js'));",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "true", hint: "endsWith." },
    ],
    explanation: "tsc יוצר .js (או .jsx) מ-.ts (.tsx). זה הפלט שרץ בדפדפן/Node.",
  },
  {
    id: "trace_l26_typesafety_001",
    conceptKey: "lesson_26::Type Safety",
    level: 3,
    title: "type checking תופס בעיות",
    code: "function add(a: number, b: number): number {\n  return a + b;\n}\nconst r = add(1, 2);\n// add(1, '2') -- TS error compile-time\nconsole.log(r);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "3", hint: "1+2." },
    ],
    explanation: "Type Safety = TS תופס שגיאות לפני runtime. add(1, '2') לא יקומפל.",
  },
  {
    id: "trace_l26_typingprops_001",
    conceptKey: "lesson_26::Typing Props",
    level: 3,
    title: "Props של React component עם type",
    code: "type GreetProps = { name: string; emoji?: string };\nfunction Greet({ name, emoji = '👋' }: GreetProps) {\n  return `${emoji} ${name}`;\n}\nconsole.log(Greet({ name: 'דני' }));",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "👋 דני", hint: "emoji default." },
    ],
    explanation: "props של React מקבלים type. ? אחרי השם = optional.",
  },
  {
    id: "trace_l26_funcprop_001",
    conceptKey: "lesson_26::Function Prop Type",
    level: 4,
    title: "type לפונקציה כ-prop",
    code: "type ButtonProps = { onClick: (e: MouseEvent) => void };\nconst props: ButtonProps = { onClick: (e) => console.log(e.type) };\nprops.onClick({ type: 'click' } as MouseEvent);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "click", hint: "e.type מהאירוע." },
    ],
    explanation: "type של פונקציה: (params) => returnType. ה-handler מקבל את הטיפוס המוצהר.",
  },
  {
    id: "trace_l26_models_001",
    conceptKey: "lesson_26::models folder",
    level: 2,
    title: "מבנה תיקיית models",
    code: "// /models\n//   /User.ts\n//   /Post.ts\n//   /index.ts\nconst exported = ['User', 'Post'];\nconsole.log(exported.length);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "2", hint: "שני מודלים." },
    ],
    explanation: "תיקיית models מאחסנת types/interfaces דומיין-ספציפיים. index.ts מרכזת re-exports.",
  },
  {
    id: "trace_l26_todo_ts_001",
    conceptKey: "lesson_26::Todo.ts",
    level: 3,
    title: "Todo.ts עם interface",
    code: "interface Todo {\n  id: number;\n  text: string;\n  done: boolean;\n}\nconst t: Todo = { id: 1, text: 'a', done: false };\nconsole.log(t.done);",
    steps: [
      { line: 7, prompt: "מה יודפס?", answer: "false", hint: "ערך התחלתי." },
    ],
    explanation: "Todo.ts מגדיר interface אחד או יותר. import { Todo } from './models/Todo'.",
  },
  {
    id: "trace_l26_react_ts_001",
    conceptKey: "lesson_26::React + TypeScript",
    level: 4,
    title: "useState עם generic type",
    code: "// React + TS:\nconst [count, setCount] = React.useState<number>(0);\nsetCount(5);\nconsole.log(count); // initial render — 0",
    steps: [
      { line: 4, prompt: "מה count אחרי render הראשון?", answer: "0", hint: "useState מתחיל מהארגומנט." },
    ],
    explanation: "useState<T>(initial) — generic type מאלץ ש-T יהיה ערך עקבי.",
  },

  // ============================================================================
  // lesson_21 — React basics (17 concepts)
  // ============================================================================
  {
    id: "trace_l21_react_001",
    conceptKey: "lesson_21::React",
    level: 1,
    title: "React מציג JSX",
    code: "function App() {\n  return <h1>Hello</h1>;\n}\n// React.createRoot mounts <App />",
    steps: [
      { line: 2, prompt: "מה React מציג?", answer: "<h1>Hello</h1>", acceptable: ["h1 עם Hello"], hint: "ה-JSX שמוחזר." },
    ],
    explanation: "React מקמפל JSX ל-createElement, ויוצר Virtual DOM שמסתנכרן ל-DOM אמיתי.",
  },
  {
    id: "trace_l21_appjsx_001",
    conceptKey: "lesson_21::App.jsx",
    level: 1,
    title: "App.jsx — root component",
    code: "// App.jsx\nfunction App() {\n  return <div>תוכן</div>;\n}\nexport default App;",
    steps: [
      { line: 3, prompt: "מה App מחזיר?", answer: "<div>תוכן</div>", hint: "JSX." },
    ],
    explanation: "App.jsx הוא root component. הוא מיוצא default ומטונן ע\"י main.jsx.",
  },
  {
    id: "trace_l21_mainjsx_001",
    conceptKey: "lesson_21::main.jsx",
    level: 2,
    title: "main.jsx — entry point",
    code: "import { createRoot } from 'react-dom/client';\nimport App from './App';\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);",
    steps: [
      { line: 4, prompt: "לאיזה אלמנט App מתווסף?", answer: "<div id='root'>", acceptable: ["#root", "div root"], hint: "createRoot על האלמנט הזה." },
    ],
    explanation: "main.jsx הוא ה-entry. createRoot יוצר root, render מצייר את הקומפוננטה.",
  },
  {
    id: "trace_l21_appcss_001",
    conceptKey: "lesson_21::App.css",
    level: 1,
    title: "App.css — CSS לקומפוננטה",
    code: "// App.jsx:\nimport './App.css';\nfunction App() {\n  return <div className='app'>...</div>;\n}",
    steps: [
      { line: 4, prompt: "איזה class מוחל?", answer: "app", hint: "className=\"app\"." },
    ],
    explanation: "App.css מיובא דרך import. Vite/webpack בונים את ה-CSS ומחילים אותו.",
  },
  {
    id: "trace_l21_indexhtml_001",
    conceptKey: "lesson_21::index.html",
    level: 1,
    title: "index.html — root container",
    code: "<!-- index.html -->\n<body>\n  <div id='root'></div>\n  <script src='/src/main.jsx'></script>\n</body>",
    steps: [
      { line: 3, prompt: "איפה React מציג?", answer: "<div id='root'>", acceptable: ["#root"], hint: "createRoot מחפש את זה." },
    ],
    explanation: "index.html הוא ה-shell. Vite מזריק את ה-script ו-React ממלא את #root.",
  },
  {
    id: "trace_l21_export_001",
    conceptKey: "lesson_21::export default",
    level: 2,
    title: "export default ↔ import בלי {}",
    code: "// Header.jsx\nexport default function Header() { return <h1>X</h1>; }\n// App.jsx\nimport Header from './Header';\n// אפשר גם:\nimport HeaderRenamed from './Header';",
    steps: [
      { line: 4, prompt: "מה אפשר לקרוא ל-import?", answer: "כל שם", acceptable: ["שם חופשי", "מה שרוצים"], hint: "default = שם חופשי באימפורט." },
    ],
    explanation: "export default מאפשר לתת שם חופשי באימפורט. אין סוגריים מסולסלים.",
  },
  {
    id: "trace_l21_import_001",
    conceptKey: "lesson_21::import",
    level: 2,
    title: "named import דורש שם מדויק",
    code: "// utils.js\nexport const add = (a, b) => a + b;\nexport const sub = (a, b) => a - b;\n// app.js\nimport { add, sub } from './utils';\nconsole.log(add(3, 4));",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "7", hint: "3+4." },
    ],
    explanation: "named imports דורשים את השם המדויק של ה-export. אפשר alias עם as.",
  },
  {
    id: "trace_l21_braces_001",
    conceptKey: "lesson_21::{}",
    level: 2,
    title: "{} ב-JSX מריץ JS",
    code: "function App() {\n  const name = 'דני';\n  const today = new Date().getDate();\n  return <p>שלום {name}, היום ה-{today}</p>;\n}",
    steps: [
      { line: 4, prompt: "מה {name} מציג?", answer: "דני", hint: "מהמשתנה." },
      { line: 4, prompt: "מה {today} מציג?", answer: "מספר היום", acceptable: ["יום החודש"], hint: "Date.getDate()." },
    ],
    explanation: "ב-JSX, {} עוטף ביטוי JavaScript שמוערך ומוכנס ל-DOM.",
  },
  {
    id: "trace_l21_inlinestyle_001",
    conceptKey: "lesson_21::inline style",
    level: 2,
    title: "style={{}} ב-JSX",
    code: "function App() {\n  return <p style={{ color: 'red', fontSize: 20 }}>טקסט</p>;\n}",
    steps: [
      { line: 2, prompt: "מה הצורה של style?", answer: "אובייקט JS", acceptable: ["object"], hint: "כפול {{}}: חיצוני JSX, פנימי object." },
      { line: 2, prompt: "איך כותבים font-size?", answer: "fontSize", hint: "camelCase במקום kebab-case." },
    ],
    explanation: "ב-React style מקבל אובייקט. שמות properties ב-camelCase.",
  },
  {
    id: "trace_l21_cssimport_001",
    conceptKey: "lesson_21::CSS import",
    level: 1,
    title: "import './style.css'",
    code: "import './styles.css';\n// אין שם משתנה — הקובץ פשוט נטען\nfunction App() { return <div className='wrap' />; }",
    steps: [
      { line: 1, prompt: "למה אין שם import?", answer: "כי זה side-effect import", acceptable: ["רק לטעון את הקובץ", "אין משתנה לייבא"], hint: "Vite/webpack מבינים את זה." },
    ],
    explanation: "import של CSS = side-effect — רק טוען את ה-rules. לא מחזיר ערך.",
  },
  {
    id: "trace_l21_clientside_001",
    conceptKey: "lesson_21::Client Side",
    level: 2,
    title: "Client Side rendering",
    code: "// השרת שולח HTML ריק + main.js\n// הדפדפן מריץ React שיוצר את ה-DOM\nconsole.log(typeof window);",
    steps: [
      { line: 3, prompt: "מה יודפס בדפדפן?", answer: "object", hint: "window קיים בדפדפן." },
      { line: 3, prompt: "מה יודפס ב-Node?", answer: "undefined", hint: "אין window בשרת." },
    ],
    explanation: "Client Side = הדפדפן בונה את ה-UI. window קיים רק שם, לא ב-Node SSR.",
  },
  {
    id: "trace_l21_vite_001",
    conceptKey: "lesson_21::Vite",
    level: 2,
    title: "Vite — dev server מהיר",
    code: "// $ npm run dev\n// > vite\n// Local: http://localhost:5173/\nconst port = 5173;\nconsole.log(port);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "5173", hint: "פורט ברירת מחדל של Vite." },
    ],
    explanation: "Vite משתמש ב-ES modules ובטרנספורמציה on-demand. dev server מהיר מאוד.",
  },
  {
    id: "trace_l21_npmcreate_001",
    conceptKey: "lesson_21::npm create vite@latest",
    level: 1,
    title: "scaffold Vite",
    code: "// $ npm create vite@latest my-app -- --template react\n// $ cd my-app\n// $ npm install\n// $ npm run dev\nconst step = 'scaffold + install + run';\nconsole.log(step);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "scaffold + install + run", hint: "סיכום הצעדים." },
    ],
    explanation: "npm create vite יוצר פרויקט עם template (React/Vue/etc).",
  },
  {
    id: "trace_l21_npminstall_001",
    conceptKey: "lesson_21::npm install",
    level: 1,
    title: "npm install — מקבץ deps",
    code: "// $ npm install\n// קורא package.json -> מתקין ל-node_modules\nconst pkg = { dependencies: { react: '^18.0.0' } };\nconsole.log(Object.keys(pkg.dependencies)[0]);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "react", hint: "ה-key הראשון." },
    ],
    explanation: "npm install קורא את package.json ומתקין הכל ל-node_modules. יוצר package-lock.",
  },
  {
    id: "trace_l21_npmdev_001",
    conceptKey: "lesson_21::npm run dev",
    level: 1,
    title: "npm run dev",
    code: "// package.json:\n// \"scripts\": { \"dev\": \"vite\" }\n// $ npm run dev\n// מריץ vite\nconst command = 'vite';\nconsole.log(command);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "vite", hint: "הפקודה שרצה." },
    ],
    explanation: "npm run X מריץ את scripts.X מ-package.json.",
  },
  {
    id: "trace_l21_rfc_001",
    conceptKey: "lesson_21::RFC",
    level: 2,
    title: "React Function Component",
    code: "// RFC = React Function Component\nfunction Hello() {\n  return <h1>שלום</h1>;\n}\n// snippet יוצר את הקוד הזה",
    steps: [
      { line: 3, prompt: "מה החזרת ערך?", answer: "JSX", acceptable: ["<h1>שלום</h1>", "h1"], hint: "כל RFC מחזיר JSX." },
    ],
    explanation: "RFC הוא snippet ב-VSCode (extension Simple React Snippets). מייצר תבנית בסיסית.",
  },
  {
    id: "trace_l21_reactnative_001",
    conceptKey: "lesson_21::React Native",
    level: 2,
    title: "React Native — JSX לאפליקציה ניידת",
    code: "// React Native:\n// import { View, Text } from 'react-native';\n// function App() { return <View><Text>שלום</Text></View>; }\nconst nativeTags = ['View', 'Text'];\nconsole.log(nativeTags[0]);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "View", hint: "<div> זה <View> ב-Native." },
    ],
    explanation: "React Native מקמפל JSX לאלמנטי iOS/Android native. אין div/span — יש View, Text.",
  },

  // ============================================================================
  // lesson_22 — Component composition (13 concepts)
  // ============================================================================
  {
    id: "trace_l22_state_001",
    conceptKey: "lesson_22::state",
    level: 3,
    title: "state עם useState",
    code: "function Counter() {\n  const [count, setCount] = useState(0);\n  setCount(count + 1);\n  return <p>{count}</p>;\n}",
    steps: [
      { line: 3, prompt: "האם הקוד הזה תקין?", answer: "לא, infinite loop", acceptable: ["לא", "infinite re-render"], hint: "setState ב-render גורמת ל-re-render." },
    ],
    explanation: "אסור לקרוא ל-setState ישירות בגוף הקומפוננטה — זה גורם ל-loop. רק ב-handlers/effects.",
  },
  {
    id: "trace_l22_props_001",
    conceptKey: "lesson_22::props",
    level: 2,
    title: "props מאב לבן",
    code: "function Greet({ name }) { return <p>שלום {name}</p>; }\nfunction App() { return <Greet name='דני' />; }",
    steps: [
      { line: 1, prompt: "מה name?", answer: "דני", hint: "מועבר מ-App." },
    ],
    explanation: "props נשלחים מהאב כאטריבוטים JSX, מתקבלים בבן כאובייקט.",
  },
  {
    id: "trace_l22_hook_001",
    conceptKey: "lesson_22::Hook",
    level: 3,
    title: "Hook חייב לקרוא בראש קומפוננטה",
    code: "function App({ flag }) {\n  if (flag) {\n    const [x] = useState(0); // ❌\n  }\n}",
    steps: [
      { line: 3, prompt: "למה זה לא תקין?", answer: "Hook חייב להיקרא בראש הקומפוננטה", acceptable: ["הסדר חייב להיות יציב", "בלי תנאים"], hint: "rules of hooks." },
    ],
    explanation: "Hooks חייבים להיקרא באותו סדר בכל render. לא בתוך if/loops/handlers.",
  },
  {
    id: "trace_l22_parent_001",
    conceptKey: "lesson_22::parent component",
    level: 2,
    title: "Parent מעביר props",
    code: "function Child({ value }) { return <span>{value}</span>; }\nfunction Parent() {\n  return <Child value='שלום' />;\n}",
    steps: [
      { line: 1, prompt: "מי שולח את value?", answer: "Parent", hint: "האב מעביר props." },
    ],
    explanation: "Parent מציין את ה-Child ומעביר props דרך JSX attributes.",
  },
  {
    id: "trace_l22_child_001",
    conceptKey: "lesson_22::child component",
    level: 2,
    title: "Child מקבל props",
    code: "function Avatar({ src, alt }) {\n  return <img src={src} alt={alt} />;\n}\nfunction App() { return <Avatar src='a.jpg' alt='פרופיל' />; }",
    steps: [
      { line: 1, prompt: "אילו props ל-Child?", answer: "src, alt", hint: "destructuring." },
    ],
    explanation: "Child component מקבל props דרך פרמטר אובייקט (לרוב מפורק עם destructuring).",
  },
  {
    id: "trace_l22_pass_func_001",
    conceptKey: "lesson_22::passing function as prop",
    level: 4,
    title: "פונקציה כ-prop",
    code: "function Btn({ onClick }) { return <button onClick={onClick}>לחץ</button>; }\nfunction App() {\n  const log = () => console.log('clicked');\n  return <Btn onClick={log} />;\n}",
    steps: [
      { line: 4, prompt: "מי קורא ל-log?", answer: "Btn (בלחיצה)", acceptable: ["onClick של Btn", "ה-button"], hint: "App מעביר פונקציה, Btn קורא לה." },
    ],
    explanation: "Parent יכול להעביר handler ל-Child. Child קורא לו כשמתאים.",
  },
  {
    id: "trace_l22_addpost_001",
    conceptKey: "lesson_22::addPost",
    level: 4,
    title: "addPost מעלה state",
    code: "function App() {\n  const [posts, setPosts] = useState([]);\n  const addPost = (p) => setPosts([...posts, p]);\n  // נכנס ל-PostForm\n}",
    steps: [
      { line: 3, prompt: "מה הכוונה ב-[...posts, p]?", answer: "spread + הוספה לסוף", acceptable: ["מערך חדש עם p נוסף"], hint: "אסור לדחוף ישירות ל-state." },
    ],
    explanation: "addPost יוצר מערך חדש (spread) במקום mutation. React רואה reference חדש ומבצע re-render.",
  },
  {
    id: "trace_l22_deletepost_001",
    conceptKey: "lesson_22::deletePost",
    level: 4,
    title: "deletePost עם filter",
    code: "function App() {\n  const [posts, setPosts] = useState([{id:1},{id:2}]);\n  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id));\n  deletePost(1);\n  // אחרי re-render: posts = [{id:2}]\n}",
    steps: [
      { line: 4, prompt: "אחרי deletePost(1), כמה posts נשארים?", answer: "1", hint: "filter מחזיר מערך חדש." },
    ],
    explanation: "filter מחזיר מערך חדש ללא הפריט. זו הדרך הקלאסית למחיקה ב-React.",
  },
  {
    id: "trace_l22_onchange_001",
    conceptKey: "lesson_22::onChange",
    level: 3,
    title: "onChange עם input",
    code: "function Form() {\n  const [v, setV] = useState('');\n  return <input value={v} onChange={e => setV(e.target.value)} />;\n}",
    steps: [
      { line: 3, prompt: "מה value אחרי הקלדת 'A'?", answer: "A", hint: "setV עם e.target.value." },
    ],
    explanation: "controlled input — value מ-state, onChange מעדכן את ה-state.",
  },
  {
    id: "trace_l22_reference_001",
    conceptKey: "lesson_22::reference",
    level: 5,
    title: "reference equality במערכים",
    code: "const arr = [1, 2];\nconst arr2 = arr;\narr2.push(3);\nconsole.log(arr === arr2);\nconsole.log(arr.length);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "true", hint: "אותו reference." },
      { line: 5, prompt: "מה יודפס?", answer: "3", hint: "mutated גם בארץ המקור." },
    ],
    explanation: "מערכים נשמרים ב-reference. הצבה לא משכפלת — שניהם מצביעים לאותו אובייקט.",
  },
  {
    id: "trace_l22_array_ref_001",
    conceptKey: "lesson_22::array reference",
    level: 5,
    title: "React לא מזהה mutation",
    code: "function App() {\n  const [items, setItems] = useState([1,2]);\n  const handle = () => {\n    items.push(3);\n    setItems(items); // אותו reference\n  };\n}",
    steps: [
      { line: 5, prompt: "האם React מבצע re-render?", answer: "לא תמיד", acceptable: ["לא", "אולי לא"], hint: "Object.is מחזיר true → bail out." },
    ],
    explanation: "React משתמש ב-Object.is להשוואה. אותו reference = bail out. תמיד צרו מערך חדש.",
  },
  {
    id: "trace_l22_obj_ref_001",
    conceptKey: "lesson_22::object reference",
    level: 5,
    title: "object spread יוצר reference חדש",
    code: "const a = { name: 'A' };\nconst b = a;\nconst c = { ...a };\nconsole.log(a === b);\nconsole.log(a === c);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "true", hint: "אותו reference." },
      { line: 5, prompt: "מה יודפס?", answer: "false", hint: "spread יוצר אובייקט חדש." },
    ],
    explanation: "{...a} יוצר shallow copy עם reference חדש. זה מה ש-React צריך לראות.",
  },
  {
    id: "trace_l22_mutable_001",
    conceptKey: "lesson_22::mutable",
    level: 4,
    title: "אובייקטים mutable, primitives לא",
    code: "let n = 5;\nn = 10;\nconst obj = { x: 5 };\nobj.x = 10;\nconsole.log(n, obj.x);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "10 10", hint: "n הוקצה מחדש; obj עוצב." },
    ],
    explanation: "primitives = re-assignment בלבד. objects = mutable דרך properties (גם עם const).",
  },

  // ============================================================================
  // lesson_23 — React Router & Context (14 concepts)
  // ============================================================================
  {
    id: "trace_l23_browserrouter_001",
    conceptKey: "lesson_23::BrowserRouter",
    level: 3,
    title: "BrowserRouter עוטף את האפליקציה",
    code: "import { BrowserRouter, Routes, Route } from 'react-router-dom';\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path='/' element={<Home />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}",
    steps: [
      { line: 4, prompt: "מה BrowserRouter עושה?", answer: "מאפשר routing על URLs", acceptable: ["history API", "ניווט"], hint: "סוג ה-router." },
    ],
    explanation: "BrowserRouter משתמש ב-History API. שימושי לאתרים רגילים. HashRouter ל-static hosting.",
  },
  {
    id: "trace_l23_routes_001",
    conceptKey: "lesson_23::Routes",
    level: 3,
    title: "Routes הוא container",
    code: "<Routes>\n  <Route path='/' element={<Home />} />\n  <Route path='/about' element={<About />} />\n</Routes>",
    steps: [
      { line: 1, prompt: "מה תפקיד Routes?", answer: "להחליט איזה Route להציג", acceptable: ["matches by URL"], hint: "match the URL." },
    ],
    explanation: "Routes (v6) בוחר את ה-Route המתאים ביותר ל-URL הנוכחי.",
  },
  {
    id: "trace_l23_route_001",
    conceptKey: "lesson_23::Route",
    level: 3,
    title: "Route מקשר path ל-element",
    code: "<Route path='/posts/:id' element={<PostPage />} />\n// /posts/42 → <PostPage /> with params.id = '42'",
    steps: [
      { line: 2, prompt: "מה params.id ב-URL /posts/42?", answer: "42", hint: ":id מתאים ל-/posts/." },
    ],
    explanation: "Route עם :param מחלץ ערך מה-URL. בקומפוננטה: useParams().",
  },
  {
    id: "trace_l23_path_001",
    conceptKey: "lesson_23::Path",
    level: 2,
    title: "Path מתאים ל-URL",
    code: "// path='/about'\n// URL='/about' ✅\n// URL='/about/team' ❌ (path מדויק, אם צריך wildcard צריך *)\nconst urls = ['/about', '/about/team'];\nconst matches = urls[0] === '/about';\nconsole.log(matches);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "true", hint: "התאמה מדויקת." },
    ],
    explanation: "ב-RR v6 path עושה התאמה מדויקת. /about/* תופס תת-נתיבים.",
  },
  {
    id: "trace_l23_link_001",
    conceptKey: "lesson_23::Link",
    level: 2,
    title: "Link מבטל reload",
    code: "import { Link } from 'react-router-dom';\nfunction Nav() {\n  return <Link to='/about'>אודות</Link>;\n}",
    steps: [
      { line: 3, prompt: "מה Link מציג?", answer: "<a> שלא טוען מחדש", acceptable: ["client-side navigation", "<a>"], hint: "כמו <a> אבל SPA." },
    ],
    explanation: "Link מציג <a> אבל מונע default ומשתמש ב-history. שומר על SPA.",
  },
  {
    id: "trace_l23_to_001",
    conceptKey: "lesson_23::to",
    level: 2,
    title: "prop to ב-Link",
    code: "<Link to='/posts'>פוסטים</Link>\n<Link to={`/posts/${id}`}>פוסט {id}</Link>",
    steps: [
      { line: 1, prompt: "מה to קובע?", answer: "URL היעד", hint: "כמו href." },
    ],
    explanation: "to = ה-URL שאליו Link ינווט. אפשר string או object {pathname, search}.",
  },
  {
    id: "trace_l23_url_001",
    conceptKey: "lesson_23::URL",
    level: 2,
    title: "URL בדפדפן",
    code: "// URL: http://example.com/posts/42?sort=asc#top\nconst u = new URL('http://example.com/posts/42?sort=asc');\nconsole.log(u.pathname);\nconsole.log(u.searchParams.get('sort'));",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "/posts/42", hint: "pathname." },
      { line: 4, prompt: "מה יודפס?", answer: "asc", hint: "query param." },
    ],
    explanation: "URL מחולק: protocol, host, pathname, search, hash. RR מסתכל בעיקר ב-pathname.",
  },
  {
    id: "trace_l23_dynamicroute_001",
    conceptKey: "lesson_23::dynamic route",
    level: 4,
    title: "dynamic route עם useParams",
    code: "<Route path='/users/:id' element={<UserPage />} />\nfunction UserPage() {\n  const { id } = useParams();\n  return <h1>User {id}</h1>;\n}",
    steps: [
      { line: 4, prompt: "ב-URL /users/7, מה יודפס?", answer: "User 7", hint: "useParams מחזיר {id: '7'}." },
    ],
    explanation: ":id ב-path = parameter. useParams מחזיר את הערכים.",
  },
  {
    id: "trace_l23_element_001",
    conceptKey: "lesson_23::element",
    level: 3,
    title: "prop element ב-Route",
    code: "<Route path='/' element={<Home />} />",
    steps: [
      { line: 1, prompt: "האם רושמים <Home /> או Home?", answer: "<Home /> (JSX element)", acceptable: ["JSX", "אלמנט"], hint: "ב-RR v6: element prop." },
    ],
    explanation: "ב-RR v6, element מקבל JSX (לא class). v5 השתמש ב-component={Home}.",
  },
  {
    id: "trace_l23_createcontext_001",
    conceptKey: "lesson_23::createContext",
    level: 4,
    title: "createContext + Provider",
    code: "const ThemeCtx = React.createContext('light');\nfunction App() {\n  return (\n    <ThemeCtx.Provider value='dark'>\n      <Page />\n    </ThemeCtx.Provider>\n  );\n}\nfunction Page() {\n  const t = useContext(ThemeCtx);\n  return <p>{t}</p>;\n}",
    steps: [
      { line: 10, prompt: "מה יודפס?", answer: "dark", hint: "Provider value מנצח default." },
    ],
    explanation: "createContext יוצר Context. Provider מספק ערך. useContext קורא אותו.",
  },
  {
    id: "trace_l23_value_001",
    conceptKey: "lesson_23::value",
    level: 3,
    title: "value prop של Provider",
    code: "<UserCtx.Provider value={{ name: 'דני' }}>\n  <Profile />\n</UserCtx.Provider>",
    steps: [
      { line: 1, prompt: "מה יקבלו consumers?", answer: "{ name: 'דני' }", acceptable: ["אובייקט עם name=דני"], hint: "value." },
    ],
    explanation: "value הוא הערך שכל consumer מקבל. שינוי value → re-render של כל consumers.",
  },
  {
    id: "trace_l23_mainscreen_001",
    conceptKey: "lesson_23::MainScreen",
    level: 2,
    title: "MainScreen — דף ראשי",
    code: "function MainScreen() {\n  return (\n    <>\n      <h1>הבלוג</h1>\n      <PostList />\n    </>\n  );\n}",
    steps: [
      { line: 5, prompt: "אילו רכיבים MainScreen מציג?", answer: "h1 ו-PostList", acceptable: ["כותרת ורשימה"], hint: "מה שב-JSX." },
    ],
    explanation: "MainScreen היא הקומפוננטה לדף הראשי. הצמדה ב-Route path='/'.",
  },
  {
    id: "trace_l23_postlist_001",
    conceptKey: "lesson_23::PostList",
    level: 3,
    title: "PostList עם map",
    code: "function PostList({ posts }) {\n  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;\n}\nPostList({ posts: [{id:1, title:'A'}, {id:2, title:'B'}] });",
    steps: [
      { line: 2, prompt: "מה יוצג?", answer: "<ul><li>A</li><li>B</li></ul>", acceptable: ["A ו-B"], hint: "map יוצר li לכל post." },
    ],
    explanation: "PostList מקבל מערך ומציג כ-list. key חייב להיות ייחודי.",
  },
  {
    id: "trace_l23_addpost_comp_001",
    conceptKey: "lesson_23::AddPost",
    level: 3,
    title: "AddPost — קומפוננטת טופס",
    code: "function AddPost({ onAdd }) {\n  const [t, setT] = useState('');\n  const submit = () => { onAdd({ title: t }); setT(''); };\n  return <input value={t} onChange={e => setT(e.target.value)} />;\n}",
    steps: [
      { line: 3, prompt: "מה submit עושה?", answer: "מעלה את הפוסט ומאפס", acceptable: ["onAdd ואחרי מאפס"], hint: "callback + reset." },
    ],
    explanation: "AddPost: form עם controlled input + callback מתוך הקומפוננטה לאב.",
  },

  // ============================================================================
  // lesson_24 — useEffect, useRef, useMemo (7 concepts)
  // ============================================================================
  {
    id: "trace_l24_ref_001",
    conceptKey: "lesson_24::ref",
    level: 4,
    title: "useRef שומר ערך בין renders",
    code: "function Comp() {\n  const ref = useRef(0);\n  ref.current += 1;\n  console.log('renders:', ref.current);\n  return null;\n}",
    steps: [
      { line: 4, prompt: "מה יודפס בכל render?", answer: "renders: 1, 2, 3...", acceptable: ["מספר עולה"], hint: "ref.current לא גורר re-render." },
    ],
    explanation: "useRef מחזיר אובייקט עם current שניתן לשנות בלי לטריגר render.",
  },
  {
    id: "trace_l24_refcurrent_001",
    conceptKey: "lesson_24::ref.current",
    level: 4,
    title: "ref.current עם DOM",
    code: "function Input() {\n  const inputRef = useRef(null);\n  useEffect(() => { inputRef.current.focus(); }, []);\n  return <input ref={inputRef} />;\n}",
    steps: [
      { line: 3, prompt: "מתי focus קורה?", answer: "אחרי mount", acceptable: ["mount", "ראשונה"], hint: "useEffect עם []." },
    ],
    explanation: "ref={inputRef} מחבר את ה-DOM ל-current. רק זמין אחרי mount.",
  },
  {
    id: "trace_l24_focus_001",
    conceptKey: "lesson_24::focus",
    level: 3,
    title: "focus() על input",
    code: "// אחרי mount:\ninputRef.current.focus();\n// המקלדת קופצת לתוך ה-input",
    steps: [
      { line: 2, prompt: "מה קורה?", answer: "ה-input מקבל focus", acceptable: ["מקלדת", "cursor נכנס"], hint: "DOM API." },
    ],
    explanation: "focus() הוא DOM API. ב-React מפעילים אותו דרך ref ו-useEffect.",
  },
  {
    id: "trace_l24_dom_element_001",
    conceptKey: "lesson_24::DOM element",
    level: 3,
    title: "ref מצביע ל-DOM element",
    code: "function App() {\n  const divRef = useRef(null);\n  useEffect(() => { console.log(divRef.current.tagName); }, []);\n  return <div ref={divRef}>...</div>;\n}",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "DIV", hint: "tagName באותיות גדולות." },
    ],
    explanation: "ref ל-element מחזיר את ה-HTMLElement. tagName uppercase תמיד.",
  },
  {
    id: "trace_l24_fetch_001",
    conceptKey: "lesson_24::fetch",
    level: 4,
    title: "fetch ב-useEffect",
    code: "function App() {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch('/api/users').then(r => r.json()).then(setData);\n  }, []);\n  return <p>{data ? data.length : 'טוען'}</p>;\n}",
    steps: [
      { line: 6, prompt: "מה יוצג בהתחלה?", answer: "טוען", hint: "data === null עד שה-fetch מסיים." },
      { line: 6, prompt: "מה יוצג אחרי fetch?", answer: "מספר ה-users", acceptable: ["data.length"], hint: "אחרי setData." },
    ],
    explanation: "fetch ב-useEffect עם [] = פעם אחת אחרי mount.",
  },
  {
    id: "trace_l24_memo_001",
    conceptKey: "lesson_24::memoization",
    level: 4,
    title: "useMemo ל-cache חישוב יקר",
    code: "function App({ items }) {\n  const sum = useMemo(() => items.reduce((a,b)=>a+b, 0), [items]);\n  return <p>{sum}</p>;\n}",
    steps: [
      { line: 2, prompt: "מתי החישוב רץ?", answer: "כש-items משתנה", acceptable: ["שינוי dep"], hint: "deps array." },
    ],
    explanation: "useMemo cached את התוצאה. רק כש-deps משתנים — נחשב מחדש.",
  },
  {
    id: "trace_l24_expensive_001",
    conceptKey: "lesson_24::expensive calculation",
    level: 4,
    title: "חישוב יקר ללא useMemo = איטי",
    code: "function App({ items }) {\n  const sorted = [...items].sort(); // רץ בכל render!\n  return <List data={sorted} />;\n}",
    steps: [
      { line: 2, prompt: "מתי הsort רץ?", answer: "בכל render", acceptable: ["כל פעם"], hint: "אין memoization." },
    ],
    explanation: "ללא useMemo, חישובים יקרים רצים בכל render. ב-1000 פריטים זה ניכר.",
  },

  // ============================================================================
  // lesson_closures (3 concepts)
  // ============================================================================
  {
    id: "trace_lcl_vars_001",
    conceptKey: "lesson_closures::closure variables",
    level: 5,
    title: "closure על משתנים",
    code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = makeCounter();\nconsole.log(c());\nconsole.log(c());\nconsole.log(c());",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "1", hint: "0 → ++ → 1." },
      { line: 7, prompt: "מה יודפס?", answer: "2", hint: "count נשמר." },
      { line: 8, prompt: "מה יודפס?", answer: "3", hint: "ה-closure שומר על count." },
    ],
    explanation: "ה-inner function תופסת את count. הוא חי כל עוד ה-closure חי.",
  },
  {
    id: "trace_lcl_useeffect_001",
    conceptKey: "lesson_closures::closure in useEffect",
    level: 6,
    title: "stale closure ב-useEffect",
    code: "function App() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const t = setInterval(() => console.log(count), 1000);\n    return () => clearInterval(t);\n  }, []);\n}",
    steps: [
      { line: 4, prompt: "מה יודפס תמיד?", answer: "0", hint: "deps=[] תופס את count מ-render הראשון." },
    ],
    explanation: "deps=[] = ה-closure תופס את count=0 ולא מתעדכן. הוסף [count] לתיקון.",
  },
  {
    id: "trace_lcl_handlers_001",
    conceptKey: "lesson_closures::closure in event handlers",
    level: 5,
    title: "closure ב-handler",
    code: "function App() {\n  const [n, setN] = useState(0);\n  const handle = () => {\n    setTimeout(() => console.log(n), 1000);\n    setN(n + 1);\n  };\n}",
    steps: [
      { line: 4, prompt: "אם n=5 ולחצנו, מה יודפס אחרי שניה?", answer: "5", hint: "ה-closure תופס את הערך בזמן הלחיצה." },
    ],
    explanation: "כל render יוצר handler חדש עם closure על הערך הנוכחי. setTimeout משתמש בערך הזה.",
  },

  // ============================================================================
  // lesson_18 — Express forms (8 concepts)
  // ============================================================================
  {
    id: "trace_l18_get_001",
    conceptKey: "lesson_18::GET",
    level: 2,
    title: "GET request",
    code: "// Browser:\n// fetch('/api/users')\n// Express:\napp.get('/api/users', (req, res) => res.json([{id:1}]));\n// Status: 200, Body: [{id:1}]",
    steps: [
      { line: 4, prompt: "איזה method?", answer: "GET", hint: "app.get." },
    ],
    explanation: "GET מבקש מידע. בלי body. שאילתה דרך URL ו-query params.",
  },
  {
    id: "trace_l18_node_001",
    conceptKey: "lesson_18::Node.js",
    level: 1,
    title: "Node.js מריץ JS בצד שרת",
    code: "// $ node server.js\nconsole.log('שרת מוכן');\nconsole.log(typeof window);\nconsole.log(typeof process);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "undefined", hint: "אין window בשרת." },
      { line: 4, prompt: "מה יודפס?", answer: "object", hint: "process קיים ב-Node." },
    ],
    explanation: "Node.js מריץ V8 בלי הדפדפן. אין window/document. יש process, fs, http.",
  },
  {
    id: "trace_l18_server_001",
    conceptKey: "lesson_18::server",
    level: 2,
    title: "Express server מאזין",
    code: "const app = express();\napp.listen(3000, () => console.log('listening on 3000'));",
    steps: [
      { line: 2, prompt: "מה יודפס בעת ההפעלה?", answer: "listening on 3000", hint: "callback של listen." },
    ],
    explanation: "listen פותח port. ה-callback רץ פעם אחת כשהשרת מוכן.",
  },
  {
    id: "trace_l18_validation_001",
    conceptKey: "lesson_18::validation",
    level: 4,
    title: "ולידציה ב-handler",
    code: "app.post('/users', (req, res) => {\n  if (!req.body.email) return res.status(400).json({ error: 'email required' });\n  res.status(201).json({ ok: true });\n});",
    steps: [
      { line: 2, prompt: "מה status אם אין email?", answer: "400", hint: "Bad Request." },
      { line: 3, prompt: "מה status אחרי הצלחה?", answer: "201", hint: "Created." },
    ],
    explanation: "validation בקריאה — ראשון קודם בודקים, אם לא חוקי, מחזירים 400 לפני שום פעולה.",
  },
  {
    id: "trace_l18_email_001",
    conceptKey: "lesson_18::email",
    level: 2,
    title: "email field",
    code: "const user = { email: 'a@b.com' };\nconst valid = user.email.includes('@');\nconsole.log(valid);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "true", hint: "includes('@')." },
    ],
    explanation: "ולידציה בסיסית של email = בדיקת '@'. מומלץ regex או library למקרה אמיתי.",
  },
  {
    id: "trace_l18_username_001",
    conceptKey: "lesson_18::username",
    level: 2,
    title: "username — אורך מינימלי",
    code: "function validUser(u) { return u && u.length >= 3; }\nconsole.log(validUser('ab'));\nconsole.log(validUser('alice'));",
    steps: [
      { line: 2, prompt: "מה יודפס?", answer: "false", hint: "אורך 2." },
      { line: 3, prompt: "מה יודפס?", answer: "true", hint: "אורך 5 ≥ 3." },
    ],
    explanation: "ולידציה: אורך מינימלי. בנוסף: תווים מותרים, ייחודיות במסד.",
  },
  {
    id: "trace_l18_password_001",
    conceptKey: "lesson_18::password",
    level: 3,
    title: "סיסמה — שמירה מעורבבת בלבד",
    code: "// אסור: db.users.insert({ password: req.body.password });\n// כן: const hash = await bcrypt.hash(req.body.password, 10);\n//     db.users.insert({ password: hash });\nconst hash = '$2b$10$...';\nconsole.log(hash.startsWith('$2'));",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "true", hint: "bcrypt prefix." },
    ],
    explanation: "אסור לשמור סיסמה ב-plain text. bcrypt עם salt + cost factor.",
  },
  {
    id: "trace_l18_serverside_001",
    conceptKey: "lesson_18::server-side storage",
    level: 3,
    title: "session על השרת",
    code: "// session middleware:\napp.use(session({ secret: 'x', resave: false }));\napp.post('/login', (req, res) => {\n  req.session.userId = 7;\n  res.send('logged in');\n});",
    steps: [
      { line: 4, prompt: "איפה userId מאוחסן?", answer: "בזיכרון/store של השרת", acceptable: ["server", "session store"], hint: "לא בלקוח." },
    ],
    explanation: "session = state בשרת. הלקוח שולח רק session ID ב-cookie. הנתונים בשרת.",
  },

  // ============================================================================
  // ai_development (11 concepts) — partial coverage
  // ============================================================================
  {
    id: "trace_aidev_chatgpt_001",
    conceptKey: "ai_development::ChatGPT",
    level: 2,
    title: "ChatGPT — chat-based assistant",
    code: "// prompt → תשובה\n// 'כתוב פונקציית sum' → 'function sum(a,b){return a+b}'\nconst tool = 'ChatGPT';\nconst type = 'chat';\nconsole.log(tool, '-', type);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "ChatGPT - chat", hint: "מחרוזות." },
    ],
    explanation: "ChatGPT הוא chat assistant של OpenAI — קלט/פלט טקסטואלי ב-conversation.",
  },
  {
    id: "trace_aidev_claude_001",
    conceptKey: "ai_development::Claude Code",
    level: 2,
    title: "Claude Code — agent עם tools",
    code: "// Claude Code יכול: לקרוא קבצים, לערוך, להריץ פקודות\nconst tools = ['Read', 'Edit', 'Bash'];\nconsole.log(tools.length);",
    steps: [
      { line: 3, prompt: "מה יודפס?", answer: "3", hint: "אורך המערך." },
    ],
    explanation: "Claude Code = ה-CLI של Anthropic. agent עם tool use — קורא, עורך, מריץ.",
  },
  {
    id: "trace_aidev_cursor_001",
    conceptKey: "ai_development::Cursor",
    level: 2,
    title: "Cursor — IDE עם AI",
    code: "// Cursor = VSCode fork + AI\n// Tab = autocomplete\n// Cmd+K = inline edit\n// Cmd+L = chat\nconst editor = 'Cursor';\nconsole.log(editor);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "Cursor", hint: "המחרוזת." },
    ],
    explanation: "Cursor הוא VSCode fork עם AI integration עמוק. autocomplete, edit, chat.",
  },
  {
    id: "trace_aidev_copilot_001",
    conceptKey: "ai_development::Copilot",
    level: 2,
    title: "GitHub Copilot — autocomplete",
    code: "// Copilot מציע השלמות בזמן הקלדה\n// כתוב '// function to sort array'\n// → Copilot יציע 'function sort(arr)...'\nconst feature = 'autocomplete';\nconsole.log(feature);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "autocomplete", hint: "המחרוזת." },
    ],
    explanation: "Copilot מ-GitHub. הצעות inline בזמן הקלדה. Tab לקבל.",
  },
  {
    id: "trace_aidev_windsurf_001",
    conceptKey: "ai_development::Windsurf",
    level: 2,
    title: "Windsurf — IDE עם agent",
    code: "// Windsurf = VSCode fork + Cascade agent\n// Cascade יכול לבצע multi-step tasks\nconst editor = 'Windsurf';\nconst agent = 'Cascade';\nconsole.log(`${editor}/${agent}`);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "Windsurf/Cascade", hint: "template literal." },
    ],
    explanation: "Windsurf הוא IDE עם Cascade agent. דומה ל-Cursor אבל אוטונומי יותר.",
  },
  {
    id: "trace_aidev_context_001",
    conceptKey: "ai_development::Context Window",
    level: 4,
    title: "Context window — מגבלת tokens",
    code: "// Claude Sonnet 4: 200K tokens\n// 1 token ≈ 4 chars באנגלית\nconst tokens = 200_000;\nconst chars = tokens * 4;\nconsole.log(chars);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "800000", hint: "200000 * 4." },
    ],
    explanation: "Context = מגבלת קלט+פלט בטוקנים. אם חורגים — תוכן מסולק/מסוכם.",
  },
  {
    id: "trace_aidev_hallucinations_001",
    conceptKey: "ai_development::Hallucinations",
    level: 4,
    title: "Hallucinations — תשובה שגויה בביטחון",
    code: "// AI: 'הפונקציה Array.prototype.shuffle ב-JS עושה...'\n// ⚠️ זה לא קיים! ה-AI 'המציא' API.\nconst real = ['map', 'filter', 'reduce'].includes('shuffle');\nconsole.log(real);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "false", hint: "אין shuffle ב-JS." },
    ],
    explanation: "Hallucination = AI מייצר תשובה שגויה אבל מציג אותה בביטחון. תמיד לאמת!",
  },
  {
    id: "trace_aidev_prompt_001",
    conceptKey: "ai_development::Prompt Engineering",
    level: 4,
    title: "Prompt engineering — פירוט = תוצאות טובות",
    code: "// 'תכתוב פונקציה' = פלט גנרי\n// 'תכתוב פונקציה JS שמקבלת מערך מספרים, מחזירה ממוצע, ומחזירה null אם ריק' = פלט מדויק\nconst short = 5;\nconst detailed = 25;\nconsole.log(detailed > short);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "true", hint: "השוואה." },
    ],
    explanation: "ככל שה-prompt מפורט יותר, התוצאה מדויקת. כלול: דרישות, edge cases, סגנון.",
  },
  {
    id: "trace_aidev_codereview_001",
    conceptKey: "ai_development::AI Code Review",
    level: 4,
    title: "AI code review — מציאת באגים",
    code: "// Diff:\n// - if (user.role = 'admin')\n// + if (user.role === 'admin')\nconst hasBug = '=' === '=';\nconsole.log(hasBug);",
    steps: [
      { line: 4, prompt: "מה יודפס?", answer: "true", hint: "המחרוזות זהות." },
    ],
    explanation: "AI מזהה באגים נפוצים (= במקום ===, missing await, off-by-one). לא מחליף review אנושי.",
  },
  {
    id: "trace_aidev_pair_001",
    conceptKey: "ai_development::AI Pair Programming",
    level: 3,
    title: "AI pair programming — דיון על קוד",
    code: "// You: 'איך להוסיף debounce?'\n// AI: מציע hook → אתה: 'מה אם רוצים cancel?' → AI: useEffect cleanup\n// מחזור איטרטיבי\nconst rounds = 3;\nconsole.log(rounds);",
    steps: [
      { line: 5, prompt: "מה יודפס?", answer: "3", hint: "מהמשתנה." },
    ],
    explanation: "Pair programming עם AI = שיחה איטרטיבית. אתה מובל, AI מציע, אתה משכלל.",
  },
  {
    id: "trace_aidev_limits_001",
    conceptKey: "ai_development::AI Limitations",
    level: 4,
    title: "AI limits — לא יודע הכל",
    code: "// AI לא יודע:\n// - הקוד הספציפי שלכם (אם לא נשלח כ-context)\n// - שינויים אחרי ה-training cutoff\n// - תוצאות runtime ספציפיות\nconst awareness = 'partial';\nconsole.log(awareness);",
    steps: [
      { line: 6, prompt: "מה יודפס?", answer: "partial", hint: "המחרוזת." },
    ],
    explanation: "AI עובד מ-training data ומ-context שמועבר אליו. אין לו גישה לקוד שלך אם לא תיתן.",
  },
];

if (typeof window !== "undefined") {
  window.QUESTIONS_TRACE_PHASE2 = QUESTIONS_TRACE_PHASE2;
  if (window.QUESTIONS_TRACE && Array.isArray(window.QUESTIONS_TRACE)) {
    window.QUESTIONS_TRACE.push(...QUESTIONS_TRACE_PHASE2);
  } else {
    window.QUESTIONS_TRACE = QUESTIONS_TRACE_PHASE2.slice();
  }
  if (window.QUESTIONS_BANK) {
    if (!window.QUESTIONS_BANK.trace) window.QUESTIONS_BANK.trace = [];
    window.QUESTIONS_BANK.trace.push(...QUESTIONS_TRACE_PHASE2);
  }
}
