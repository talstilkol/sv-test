# Code Runtime Audit

_Generated: 2026-05-04_

## Summary
- codeExamples total: 568
- Skipped (browser/Node-specific or non-JS): 370
- Actually executed: 198
- Runtime errors: **111**

## Runtime errors

- `ai_development::Cursor`: Invalid or unexpected token
  ```js
  # .cursorrules — הוראות לפרויקט שלך
# Cursor יקרא את הקובץ הזה לפני כל בקשה.

- 
  ```
- `ai_development::Windsurf`: Invalid left-hand side expression in prefix operation
  ```js
  // .windsurf/workflows/deploy.md — workflow מקצר
// Windsurf יוכל להריץ אותו כש-
  ```
- `ai_development::Prompt Engineering`: userCode is not defined
  ```js
  // דוגמה ל-bad vs. good prompt

// BAD: גנרי, ללא הקשר
const bad = 'תקן לי את הק
  ```
- `ai_development::AI Code Review`: Invalid or unexpected token
  ```js
  # .github/workflows/ai-review.yml
name: AI Code Review
on: { pull_request: { typ
  ```
- `lesson_15::Error`: Assignment to constant variable.
  ```js
  console.log('מתחילים');
const a = 10;
a = 20; // 💥 TypeError: Assignment to con
  ```
- `lesson_15::Scope`: secret is not defined
  ```js
  const globalVar = 'אני גלובלי, הכל רואים';

function showScope() {
  const secre
  ```
- `lesson_17::URL`: URL is not defined
  ```js
  // כתובת URL מלאה:
// https://api.weather.com/forecast?city=TelAviv&days=7

// ב
  ```
- `lesson_17::method`: app is not defined
  ```js
  // כל method מקבל handler משלו ב-Express:
app.get('/items', handler);    // קריא
  ```
- `lesson_17::1xx-2xx-3xx`: res is not defined
  ```js
  // 200 - OK (ברירת מחדל)
res.json(data);

// 201 - Created (אחרי POST)
res.statu
  ```
- `lesson_19::alert`: alert is not defined
  ```js
  alert('hello from browser');
  ```
- `lesson_19::if/else`: isConnected is not defined
  ```js
  if (isConnected) {
  start();
} else {
  stop();
}
  ```
- `lesson_19::switch`: status is not defined
  ```js
  switch (status) {
  case 200:
    console.log('ok');
    break;
  default:
    c
  ```
- `lesson_19::inheritance`: User is not defined
  ```js
  class Admin extends User { }
  ```
- `lesson_19::throw`: user is not defined
  ```js
  if (!user) { throw new Error('missing user'); }
  ```
- `lesson_20::Collection`: db is not defined
  ```js
  const users = db.collection('users');
  ```
- `lesson_20::Value`: doc is not defined
  ```js
  const value = doc.name;
  ```
- `lesson_20::insertOne`: User is not defined
  ```js
  User.create({ name: 'Dana' });
  ```
- `lesson_20::insertMany`: User is not defined
  ```js
  User.insertMany([{ name: 'A' }, { name: 'B' }]);
  ```
- `lesson_20::find`: User is not defined
  ```js
  User.find({});
  ```
- `lesson_20::findOne`: User is not defined
  ```js
  User.findOne({ name: 'Dana' });
  ```
- `lesson_20::findOneAndUpdate`: User is not defined
  ```js
  User.findOneAndUpdate({ name: 'Dana' }, { $set: { age: 31 } });
  ```
- `lesson_20::update`: User is not defined
  ```js
  User.updateOne({ name: 'Dana' }, { $set: { age: 31 } });
  ```
- `lesson_20::updateMany`: User is not defined
  ```js
  User.updateMany({}, { $set: { active: true } });
  ```
- `lesson_20::deleteOne`: User is not defined
  ```js
  User.deleteOne({ name: 'Dana' });
  ```
- `lesson_20::deleteMany`: User is not defined
  ```js
  User.deleteMany({ active: false });
  ```
- `lesson_21::Vite`: Unexpected token ':'
  ```js
  // package.json (נוצר אוטומטית)
{
  "scripts": {
    "dev": "vite",
    "build":
  ```
- `lesson_21::npm create vite@latest`: Unexpected identifier 'npm'
  ```js
  $ npm create vite@latest my-react-app
✔ Select a framework: › React
✔ Select a v
  ```
- `lesson_21::npm install`: Unexpected identifier 'npm'
  ```js
  // בתוך תיקיית הפרויקט:
$ npm install
// או להוסיף חבילה ספציפית:
$ npm install 
  ```
- `lesson_21::npm run dev`: Unexpected identifier 'npm'
  ```js
  $ npm run dev
VITE v5.0.0  ready in 312 ms
➜  Local:   http://localhost:5173/
//
  ```
- `lesson_21::App.css`: Unexpected token '.'
  ```js
  .app {
  font-family: sans-serif;
  padding: 1rem;
}

.btn-primary {
  backgroun
  ```
... and 81 more