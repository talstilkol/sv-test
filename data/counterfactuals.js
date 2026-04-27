// data/counterfactuals.js — W11 Counterfactuals
// "מה היה קורה בלי זה?" — 30 concepts across lessons 11–26.
//
// Schema per entry:
//   without  : 1-2 Hebrew sentences — life without the concept
//   problem  : JS snippet showing the painful "before" approach
//   solution : JS snippet showing the concept solving it
//   why      : 1 Hebrew sentence — the key benefit

var CONCEPT_COUNTERFACTUALS = {

  // ── Lesson 11 ────────────────────────────────────────────────
  "lesson_11::Array": {
    without:
      "בלי מערכים, היית צריך משתנה נפרד לכל פריט ברשימה. " +
      "לעבוד עם 100 פריטים פירושו 100 שורות הגדרה ואין שום אפשרות ללולאה.",
    problem:
`let item0 = 'תפוח';
let item1 = 'בננה';
let item2 = 'תות';
// רוצה להוסיף? עוד משתנה. רוצה לולאה? בלתי אפשרי.`,
    solution:
`const fruits = ['תפוח', 'בננה', 'תות'];
fruits.push('מנגו');
for (const f of fruits) console.log(f);`,
    why: "מערך מאחד נתונים קשורים תחת שם אחד ומאפשר עיבוד בלולאה.",
  },

  "lesson_11::Function": {
    without:
      "בלי פונקציות, כל לוגיקה שחוזרת על עצמה היית מעתיק ידנית. " +
      "תיקון באג אחד דרש מצוא ולתקן עשרות מקומות זהים בקוד.",
    problem:
`// אימות אימייל — מוכפל בכל טופס
const ok1 = email1.includes('@') && email1.length > 5;
const ok2 = email2.includes('@') && email2.length > 5;
const ok3 = email3.includes('@') && email3.length > 5;`,
    solution:
`function isValidEmail(email) {
  return email.includes('@') && email.length > 5;
}
const ok1 = isValidEmail(email1);`,
    why: "פונקציה מכילה לוגיקה במקום אחד — תיקון פעם אחת מתקן בכל מקום.",
  },

  "lesson_11::Variable": {
    without:
      "בלי משתנים, כל ערך היה hardcoded ישירות בקוד. " +
      "שינוי מחיר, שם משתמש, או הגדרה אחת חייב לחפש ולהחליף בעשרות מקומות.",
    problem:
`// מחיר hardcoded בכל מקום
const total = 29.99 * 3;
console.log('סה"כ: ' + 29.99 * 3);
if (29.99 * 3 > 50) applyDiscount();`,
    solution:
`const PRICE = 29.99;
const qty   = 3;
const total = PRICE * qty;
if (total > 50) applyDiscount();`,
    why: "משתנה נותן שם לערך — שינויו פעם אחת משפיע בכל המקומות שמשתמשים בו.",
  },

  "lesson_11::Scope": {
    without:
      "בלי scope, כל משתנה היה גלובלי. " +
      "פונקציה אחת יכולה הייתה לדרוס בטעות משתנה של פונקציה אחרת ולגרום לבאגים בלתי ניתנים לאיתור.",
    problem:
`var count = 0;          // גלובלי
function a() { count = 5; }
function b() { count = 10; }
a(); b();
console.log(count); // 10 — b() דרסה את a() בלי כוונה`,
    solution:
`function a() { let count = 5;  return count; }
function b() { let count = 10; return count; }
// כל פונקציה בועה משלה — אין התנגשות`,
    why: "Scope מונע קוד אחד מלדרוס בטעות נתונים של קוד אחר.",
  },

  // ── Lesson 12 ────────────────────────────────────────────────
  "lesson_12::map": {
    without:
      "בלי map, כל טרנספורמציה של מערך דרשה יצירה ידנית של מערך חדש עם לולאת for. " +
      "הקוד ארוך יותר, מועד לשגיאות אינדקס, ולא מבטא את הכוונה בבירור.",
    problem:
`const prices = [10, 20, 30];
const doubled = [];
for (let i = 0; i < prices.length; i++) {
  doubled.push(prices[i] * 2);
}`,
    solution:
`const prices = [10, 20, 30];
const doubled = prices.map(p => p * 2);
// [20, 40, 60]`,
    why: "map מבטאת בצורה ישירה \"עבד על כל איבר והחזר מערך חדש\" — קצר, קריא, ללא תופעות לוואי.",
  },

  "lesson_12::filter": {
    without:
      "בלי filter, כדי לסנן מערך היית בונה מערך חדש בתוך לולאה עם if בתוכה. " +
      "הקריאות של הקוד נפגעת וקל לשכוח push או לטעות בתנאי.",
    problem:
`const nums = [1, 2, 3, 4, 5, 6];
const evens = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) evens.push(nums[i]);
}`,
    solution:
`const nums  = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
// [2, 4, 6]`,
    why: "filter מבטאת את תנאי הסינון בשורה אחת ושומרת על המערך המקורי ללא שינוי.",
  },

  "lesson_12::reduce": {
    without:
      "בלי reduce, כל אגרגציה (סכום, מכפלה, groupBy) דרשה משתנה מצב ולולאה ידנית. " +
      "קוד מקביל חוזר על עצמו בכל מקום שרוצים לצמצם מערך לערך יחיד.",
    problem:
`const orders = [120, 45, 89, 200];
let total = 0;
for (let i = 0; i < orders.length; i++) {
  total += orders[i];
}`,
    solution:
`const orders = [120, 45, 89, 200];
const total  = orders.reduce((acc, n) => acc + n, 0);
// 454`,
    why: "reduce מכליל כל צמצום מערך לערך יחיד בביטוי דקלרטיבי אחד.",
  },

  "lesson_12::forEach": {
    without:
      "בלי forEach, לרוץ על מערך כדי לבצע תופעות לוואי (console, DOM, DB) דרש לולאת for עם ניהול אינדקס ידני. " +
      "קל לטעות בתנאי הסיום ולגרום לבאג off-by-one.",
    problem:
`const users = ['אלי', 'דנה', 'יוסי'];
for (let i = 0; i <= users.length; i++) { // <= באג!
  console.log(users[i]);
}`,
    solution:
`const users = ['אלי', 'דנה', 'יוסי'];
users.forEach(u => console.log(u));`,
    why: "forEach מסירה ניהול אינדקס ומבהירה שהמטרה היא תופעות לוואי בלבד.",
  },

  // ── Lesson 13 ────────────────────────────────────────────────
  "lesson_13::Object": {
    without:
      "בלי אובייקטים, כל ישות (משתמש, מוצר, הזמנה) הייתה פרוסה כמשתנים נפרדים. " +
      "להעביר משתמש לפונקציה פירושו להעביר 10 ארגומנטים נפרדים.",
    problem:
`function greet(firstName, lastName, age, email, city) {
  return 'שלום ' + firstName + ' ' + lastName;
}
greet('אלי', 'כהן', 30, 'eli@x.com', 'תל אביב');`,
    solution:
`const user = { firstName: 'אלי', lastName: 'כהן',
               age: 30, email: 'eli@x.com', city: 'תל אביב' };
function greet(u) { return 'שלום ' + u.firstName + ' ' + u.lastName; }`,
    why: "אובייקט מקבץ שדות קשורים לישות אחת שניתן להעביר, לאחסן ולהרחיב בקלות.",
  },

  "lesson_13::Class": {
    without:
      "בלי Classes, יצירת אובייקטים רבים מאותו תבנית דרשה פונקציות constructor ידניות ושיבוט prototype ידני. " +
      "קשה לבצע ירושה ולשמור על עקביות בין מופעים שונים.",
    problem:
`function Animal(name) { this.name = name; }
Animal.prototype.speak = function() {
  return this.name + ' מוציא קול';
};
const a = new Animal('כלב');`,
    solution:
`class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + ' מוציא קול'; }
}
const a = new Animal('כלב');`,
    why: "Class נותנת תחביר ברור לתבנית אובייקטים, ירושה, ו-encapsulation.",
  },

  // ── Lesson 15 ────────────────────────────────────────────────
  "lesson_15::Closure": {
    without:
      "בלי closures, פונקציות לא יכלו לזכור נתונים פרטיים בין קריאות. " +
      "כל state היה חייב להיות גלובלי, מה שפגע באנקפסולציה.",
    problem:
`let count = 0; // גלובלי — כל קוד יכול לשנות
function increment() { count++; }
function reset() { count = 0; }`,
    solution:
`function makeCounter() {
  let count = 0; // פרטי
  return { increment: () => ++count, reset: () => { count = 0; } };
}
const c = makeCounter();`,
    why: "Closure מאפשרת לפונקציה לשמור state פרטי בלי ניהול גלובלי.",
  },

  "lesson_15::Promise": {
    without:
      "בלי Promises, קוד אסינכרוני התנהל דרך callback functions מקוננות — \"callback hell\". " +
      "ניהול שגיאות ורצף פעולות היו סיוט של קינון עמוק.",
    problem:
`fetchUser(id, function(user) {
  fetchPosts(user, function(posts) {
    fetchComments(posts[0], function(comments) {
      // pyramid of doom המשיך...
    });
  });
});`,
    solution:
`fetchUser(id)
  .then(user  => fetchPosts(user))
  .then(posts => fetchComments(posts[0]))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));`,
    why: "Promise הופכת רצף פעולות אסינכרוניות לשרשרת שטוחה וקריאה עם טיפול מרוכז בשגיאות.",
  },

  "lesson_15::async/await": {
    without:
      "בלי async/await, גם עם Promises, שרשרות then ארוכות הפכו לקשות לקריאה. " +
      "ניהול ערכי ביניים בין שלבים דרש קינון או משתנים חיצוניים מכוערים.",
    problem:
`let savedUser;
fetchUser(id)
  .then(u => { savedUser = u; return fetchPosts(u); })
  .then(posts => processWithUser(savedUser, posts))
  .catch(err => handleError(err));`,
    solution:
`async function loadData(id) {
  const user  = await fetchUser(id);
  const posts = await fetchPosts(user);
  return processWithUser(user, posts);
}`,
    why: "async/await הופכת קוד אסינכרוני לנראה ולהתנהג כמו קוד סינכרוני רגיל.",
  },

  "lesson_15::try/catch": {
    without:
      "בלי try/catch, שגיאות זמן ריצה הפילו את כל האפליקציה בלי אפשרות לטפל בהן. " +
      "בקוד אסינכרוני הן נעלמו בשקט — באגים בלי הודעת שגיאה.",
    problem:
`async function save(data) {
  const res = await fetch('/api/save', { method:'POST',
    body: JSON.stringify(data) });
  // אם fetch נכשל — האפליקציה קורסת / שגיאה בשקט
  return res.json();
}`,
    solution:
`async function save(data) {
  try {
    const res = await fetch('/api/save', { method:'POST',
      body: JSON.stringify(data) });
    return await res.json();
  } catch (err) {
    console.error('שמירה נכשלה:', err);
    throw err;
  }
}`,
    why: "try/catch מבטיח שכל כשל מטופל במקום ידוע ולא קורס את הזרימה כולה.",
  },

  // ── Lesson 16 ────────────────────────────────────────────────
  "lesson_16::Node.js": {
    without:
      "בלי Node.js, JavaScript רצה רק בדפדפן. " +
      "כדי להריץ server, לגשת לקבצים, או לבנות CLI היית חייב ללמוד שפה אחרת לחלוטין.",
    problem:
`// לפני Node — JS רק בדפדפן, server חייב Python/Java/PHP
// server.py (Python)
from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello(): return 'Hello'`,
    solution:
`// עם Node — אותה שפה בשני הצדדים
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Node!');
});
server.listen(3000);`,
    why: "Node.js מאפשר שימוש ב-JavaScript גם בצד השרת — stack אחיד לכל האפליקציה.",
  },

  "lesson_16::npm": {
    without:
      "בלי npm, כל ספריה חיצונית הייתה מורדת ידנית, מנוהלת בתיקיות ידנית, ובאגים בתלויות תלויות נפתרו ידנית. " +
      "שיתוף פרויקט עם עמית פירושו שליחת תיקיית ספריות ענקית.",
    problem:
`// בלי npm — הורדה ידנית
// 1. היכנס ל-lodash.com
// 2. הורד lodash.min.js
// 3. שמור בתיקיית /lib
// 4. עדכן <script src="lib/lodash.min.js">
// 5. חזור על זה לכל ספריה...`,
    solution:
`# npm מטפל בהכל
npm install lodash
# package.json נשמר אוטומטית
# עמית משכפל: npm install — הכל חוזר`,
    why: "npm אוטומציה ניהול תלויות, גרסאות, ושיתוף — אחד מהגורמים לעלייתה של JS בעולם.",
  },

  // ── Lesson 17 ────────────────────────────────────────────────
  "lesson_17::HTTP": {
    without:
      "בלי HTTP (פרוטוקול תקשורת), דפדפן לא ידע כיצד לבקש מידע מ-server ו-server לא ידע כיצד לענות. " +
      "כל זוג אפליקציות היה צריך לפתח פרוטוקול תקשורת משלו.",
    problem:
`// דמיינו עולם בלי HTTP — כל מערכת עם פרוטוקול משלה
// client1  → [פרוטוקול A] → server1
// client2  → [פרוטוקול B] → server2
// אין דרך לדפדפן לדבר עם server שנכתב ע"י מישהו אחר`,
    solution:
`// עם HTTP — כולם מדברים אותה שפה
GET /api/users HTTP/1.1
Host: api.example.com

// תגובה:
HTTP/1.1 200 OK
Content-Type: application/json`,
    why: "HTTP מספק שפה משותפת לכל client ו-server בעולם — הבסיס של ה-Web.",
  },

  "lesson_17::REST API": {
    without:
      "בלי עקרונות REST, כל API היה עם מוסכמות שונות לחלוטין — פעלים שונים, URLs לא עקביים. " +
      "מפתח שלמד API אחד לא ידע כלום על ה-API הבא.",
    problem:
`// ללא REST — כל מערכת המציאה את עצמה
GET  /getUser?id=1
GET  /fetchAllUsers
POST /doDeleteUser       // מחיקה ב-POST?
GET  /createNewProduct   // יצירה ב-GET?!`,
    solution:
`// עם REST — מוסכמות ברורות
GET    /users       // כל המשתמשים
GET    /users/1     // משתמש ספציפי
POST   /users       // יצירה
PUT    /users/1     // עדכון
DELETE /users/1     // מחיקה`,
    why: "REST מגדירה מוסכמות אחידות שמפתחים בכל העולם מכירים — API נוח לצריכה מהיום הראשון.",
  },

  // ── Lesson 20 ────────────────────────────────────────────────
  "lesson_20::MongoDB": {
    without:
      "בלי MongoDB (ו-NoSQL בכלל), כל נתון דינמי חייב ללכת ל-SQL עם schema נוקשה. " +
      "הוספת שדה אחד לטבלה דרשה migration, downtime, ואישורים.",
    problem:
`-- SQL: הוספת שדה חדש לטבלה
ALTER TABLE users ADD COLUMN preferences JSON;
-- ב-production זה עלול לנעול את הטבלה!
-- כל שורה קיימת מקבלת NULL בשדה החדש`,
    solution:
`// MongoDB — schema גמישה
await db.collection('users').insertOne({
  name: 'אלי', email: 'eli@x.com',
  preferences: { theme: 'dark', lang: 'he' } // שדה חדש — ללא migration
});`,
    why: "MongoDB מאפשרת שינוי מבנה נתונים ללא migration — אידיאלי לפיתוח מהיר ו-schema משתנה.",
  },

  // ── Lesson 21 ────────────────────────────────────────────────
  "lesson_21::Component": {
    without:
      "בלי קומפוננטות, כל ה-UI היה ב-HTML אחד ענק. " +
      "שינוי כפתור אחד שמופיע ב-50 מקומות דרש עדכון ידני של 50 שורות.",
    problem:
`<!-- HTML בלי קומפוננטות — כפילות בכל עמוד -->
<button class="btn-primary" onclick="submit()">שמור</button>
<button class="btn-primary" onclick="submit()">שמור</button>
<!-- × 50 מקומות... -->`,
    solution:
`function SaveButton({ onClick }) {
  return <button className="btn-primary" onClick={onClick}>שמור</button>;
}
// שימוש: <SaveButton onClick={handleSave} /> בכל מקום`,
    why: "קומפוננטה מגדירה UI פעם אחת ומשמשת בכל מקום — שינוי אחד משפיע בכל מופעי הקומפוננטה.",
  },

  "lesson_21::JSX": {
    without:
      "בלי JSX, כל אלמנט UI נוצר ב-React.createElement() המפורש. " +
      "קריאת עץ קומפוננטות מקוננות הפכה לסיוט של קריאות פונקציה מקוננות.",
    problem:
`// בלי JSX — createElement ידני
return React.createElement('div', { className: 'card' },
  React.createElement('h2', null, user.name),
  React.createElement('p',  null, user.email),
  React.createElement('button', { onClick: edit }, 'ערוך')
);`,
    solution:
`return (
  <div className="card">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
    <button onClick={edit}>ערוך</button>
  </div>
);`,
    why: "JSX מאפשר לכתוב מבנה UI כמו HTML בתוך JavaScript — ישיר לקריאה ולכתיבה.",
  },

  "lesson_21::Props": {
    without:
      "בלי props, קומפוננטות לא היו יכולות לקבל נתונים מהורה. " +
      "כל קומפוננטה הייתה hardcoded — לא ניתן לשימוש חוזר עם נתונים שונים.",
    problem:
`// קומפוננטה hardcoded — לא ניתנת לשימוש חוזר
function UserCard() {
  return <div>שם: אלי כהן | עיר: תל אביב</div>;
}
// כדי להציג דנה צריך קומפוננטה חדשה לגמרי!`,
    solution:
`function UserCard({ name, city }) {
  return <div>שם: {name} | עיר: {city}</div>;
}
<UserCard name="אלי כהן"  city="תל אביב" />
<UserCard name="דנה לוי"  city="חיפה"    />`,
    why: "Props הופכות קומפוננטה ל\"פונקציה של UI\" — אותו קוד, נתונים שונים, תוצאות שונות.",
  },

  // ── Lesson 22 ────────────────────────────────────────────────
  "lesson_22::useState": {
    without:
      "בלי useState, React לא היה מרנדר מחדש כשנתונים משתנים. " +
      "שינוי משתנה רגיל בתוך קומפוננטה לא היה משפיע על ה-UI.",
    problem:
`function Counter() {
  let count = 0; // משתנה רגיל — React לא עוקב
  return (
    <button onClick={() => { count++; console.log(count); }}>
      {count}  {/* תמיד מציג 0! */}
    </button>
  );
}`,
    solution:
`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  );
}`,
    why: "useState מגיד ל-React לעקוב אחרי הערך ולרנדר מחדש כשהוא משתנה.",
  },

  "lesson_22::Immutable State": {
    without:
      "בלי עיקרון immutability, עדכון state ישיר (mutation) לא מפעיל re-render ב-React. " +
      "באגים כאלה קשים במיוחד לאיתור כי הנתונים משתנים אבל ה-UI לא.",
    problem:
`const [items, setItems] = useState([1, 2, 3]);
function addItem() {
  items.push(4);       // mutation ישיר
  setItems(items);     // אותה reference — React לא מזהה שינוי!
  // ה-UI לא מתעדכן 😱
}`,
    solution:
`const [items, setItems] = useState([1, 2, 3]);
function addItem() {
  setItems(prev => [...prev, 4]); // עותק חדש
  // React מזהה reference חדשה → re-render ✅
}`,
    why: "Immutable state מבטיחה ש-React תמיד מזהה שינויים ומרנדר מחדש בזמן.",
  },

  // ── Lesson 24 ────────────────────────────────────────────────
  "lesson_24::useEffect": {
    without:
      "בלי useEffect, אי אפשר לבצע פעולות צד (fetch, event listeners, timers) בתגובה ל-lifecycle של קומפוננטה. " +
      "קוד כזה בגוף הקומפוננטה היה רץ בכל רינדור ויוצר לולאות אינסופיות.",
    problem:
`function UserProfile({ userId }) {
  // בלי useEffect — fetch רץ בכל רינדור!
  fetch('/api/user/' + userId).then(r => r.json())
    .then(data => setUser(data)); // גורם לרינדור → fetch שוב → לולאה אינסופית
  return <div>{user?.name}</div>;
}`,
    solution:
`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/user/' + userId).then(r => r.json()).then(setUser);
  }, [userId]); // רץ רק כש-userId משתנה
  return <div>{user?.name}</div>;
}`,
    why: "useEffect מפריד תופעות לוואי מהרינדור ומאפשר שליטה מדויקת מתי הן מתרחשות.",
  },

  "lesson_24::useMemo": {
    without:
      "בלי useMemo, חישובים כבדים (sort, filter על אלפי שורות) רצו מחדש בכל רינדור גם אם הנתונים לא השתנו. " +
      "רינדור של אנימציה או קלט פשוט יכול היה לגרום לקפיאות.",
    problem:
`function DataGrid({ rows, query }) {
  // רץ מחדש בכל רינדור — גם כשמקלידים בשדה ניתן-קשר
  const sorted = rows
    .filter(r => r.name.includes(query))
    .sort((a, b) => a.score - b.score);
  return <Table data={sorted} />;
}`,
    solution:
`function DataGrid({ rows, query }) {
  const sorted = useMemo(() =>
    rows.filter(r => r.name.includes(query))
        .sort((a, b) => a.score - b.score),
    [rows, query] // מחשב מחדש רק כשאחד מהם משתנה
  );
  return <Table data={sorted} />;
}`,
    why: "useMemo מונעת חישובים מיותרים ושומרת את ה-UI חלק גם עם נתונים כבדים.",
  },

  "lesson_24::useRef": {
    without:
      "בלי useRef, גישה ל-DOM element (focus, מדידות, animation) מחוץ ל-React דרשה querySelector ישיר. " +
      "בנוסף, שמירת ערך בין רינדורים ללא re-render חדש הייתה בלתי אפשרית.",
    problem:
`function SearchBox() {
  function focusInput() {
    // querySelector שובר את האנקפסולציה
    document.querySelector('#search-input').focus();
  }
  return <input id="search-input" />;
}`,
    solution:
`function SearchBox() {
  const inputRef = useRef(null);
  function focusInput() {
    inputRef.current.focus(); // ישיר, בטוח, ללא querySelector
  }
  return <input ref={inputRef} />;
}`,
    why: "useRef נותן גישה בטוחה ל-DOM ושומר ערכים בין רינדורים ללא גרימת רינדור חדש.",
  },

  // ── Lesson 23 ────────────────────────────────────────────────
  "lesson_23::React Router": {
    without:
      "בלי React Router, SPA לא יכלה לנהל ניווט בין עמודים. " +
      "כתובת ה-URL לא השתנתה, כפתור חזרה של הדפדפן שבר את האפליקציה, ולא ניתן היה לשתף לינקים לעמוד ספציפי.",
    problem:
`// בלי router — state מנהל "עמודים"
const [page, setPage] = useState('home');
// כתובת URL תמיד: http://app.com
// רענון עמוד → חזרה לדף הבית
// לינק ישיר לעמוד? בלתי אפשרי`,
    solution:
`<Routes>
  <Route path="/"         element={<Home />} />
  <Route path="/profile"  element={<Profile />} />
  <Route path="/product/:id" element={<Product />} />
</Routes>
// URL, כפתור חזרה, ו-deep link — הכל עובד`,
    why: "React Router מסנכרן את ה-URL עם ה-UI — הדפדפן מתנהג כמו שהמשתמש מצפה.",
  },

  "lesson_23::Context API": {
    without:
      "בלי Context, נתונים גלובליים (משתמש מחובר, תמה, שפה) חייבים להיות מועברים כ-props דרך כל שכבות העץ — \"prop drilling\". " +
      "קומפוננטה אמצעית מקבלת prop שהיא בכלל לא משתמשת בו, רק כדי להעביר הלאה.",
    problem:
`// prop drilling — theme עובר 4 רמות
<App theme={theme}>
  <Layout theme={theme}>
    <Sidebar theme={theme}>
      <MenuItem theme={theme} /> {/* הצרכן האמיתי */}
    </Sidebar>
  </Layout>
</App>`,
    solution:
`const ThemeContext = createContext('light');
// בראש העץ:
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
// בכל צאצא: const theme = useContext(ThemeContext);`,
    why: "Context מאפשרת העברת נתונים ישירות לכל צאצא ללא prop drilling דרך כל השכבות.",
  },

  // ── Lesson 26 ────────────────────────────────────────────────
  "lesson_26::TypeScript": {
    without:
      "בלי TypeScript, שגיאות טיפוסים מתגלות רק בזמן ריצה — לעיתים ב-production. " +
      "בפרויקטים גדולים אי אפשר לדעת אילו fields יש לאובייקט בלי לקרוא את כל הקוד.",
    problem:
`// JS טהור — שגיאה מתגלה ב-runtime
function getFullName(user) {
  return user.firstName + ' ' + user.lastName;
}
getFullName({ name: 'אלי' });
// TypeError: undefined + ' ' + undefined 💥`,
    solution:
`interface User { firstName: string; lastName: string; }
function getFullName(user: User): string {
  return user.firstName + ' ' + user.lastName;
}
// getFullName({ name: 'אלי' }); ← שגיאה ב-compile time ✅`,
    why: "TypeScript מגלה אי-התאמות טיפוסים לפני הריצה — פחות באגים ב-production ו-IDE חכם יותר.",
  },

};
