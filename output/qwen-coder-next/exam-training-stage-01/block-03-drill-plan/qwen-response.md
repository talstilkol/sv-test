### תרגולים 11–22 – תרגול תבניות ובדיקת ביצוע  
*(לפי מפת הסבירות המותאמת + דיווח הביקורת)*  

---

**11. Title:** CORS & Setup Speedrun  
**Probability Band:** 100%  
**Exact Task:** בנה קבצי `server.js` (Express) + `vite.config.js` (React) מ-0. הפעל `GET /test` (backend), הפעל frontend עם `fetch('/api/test')`.  
**Timebox:** 12 דקות  
**Expected Files:** `server.js`, `src/lib/api.js`, `.env` (עם `VITE_API_URL` + `CLIENT_URL`)  
**Scoring Rubric:**  
- 2 נק': `cors({origin: process.env.CLIENT_URL})` לפני `express.json()`  
- 2 נק': `res.json({ok: true})` ב-`GET /test`  
- 2 נק': `fetch()` עם `VITE_API_URL` (לא hardcode)  
- 2 נק': `.env` כשמופיע  
- 2 נק': No `console.log()` ב-cors  
**Pass Condition:** Frontend מקבל `{ok: true}` without CORS error  
**Likely Failure:** `CLIENT_URL` לא מוגדר ב-CORS → error 403  
---

**12. Title:** Controlled Form – Add/Edit Shared Component  
**Probability Band:** 100%  
**Exact Task:** כתוב קומפוננטה `PlayerForm` עם שדות: `name`, `age`, `goals`. התאם `useEffect` לעריכה. שים לב: submit מושך `formData` מ-state (לא DOM).  
**Timebox:** 20 דקות  
**Expected Answer Shape:**  
```tsx
const [formData, setFormData] = useState({name: '', age: '', goals: ''});
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
```
**Scoring Rubric:**  
- 3 נק': `value={formData.name}` + `onChange`  
- 3 נק': `setFormData(prev => ({...prev, [e.target.name]: e.target.value}))`  
- 2 נק': `useEffect` עם `params.id` (לא חובה ל-CRUD – רק לאפס)  
- 2 נק': submit בודק `age >= 18 && age <= 60` (frontend)  
**Pass Condition:** Submit משלב את ה-data ל-backend (לא שורת ריקה)  
**Likely Failure:** submit uses `e.target.value` ישירות (בלי state)  
---

**13. Title:** Backend Filter + Validation  
**Probability Band:** 95%  
**Exact Task:** בנה endpoint `POST /filter` – מקבל `{minAge, maxAge, teamName}`. בדוק:  
- `minAge >= 0`, `maxAge <= 100`, `minAge <= maxAge`  
- בדוק `teamName` ריק (backend validation)  
**Timebox:** 25 דקות  
**Expected Files:** `/routes/players.js`, `/models/Player.js`  
**Scoring Rubric:**  
- 3 נק': try/catch מסביב ל-query  
- 2 נק': validation עם throw new Error(msg)  
- 2 נק': `Player.find({...filter})` (לא `findOne`)  
- 2 נק': status codes: 400/200  
**Pass Condition:** `POST /filter` עם `minAge=70, maxAge=10` מозвращает 400  
**Likely Failure:** Validation חסרה → שחקנים מחוץ לגילאים יוחזרו  
---

**14. Title:** TypeScript Interface + Generic Filter  
**Probability Band:** 95%  
**Exact Task:** הכן `interface Book {title: string; year: number; genre: 'SciFi'|'Drama'; isAvailable: boolean}`. כתוב `filterByGenre<T>(items: T[], field: keyof T, value: any): T[]`.  
**Timebox:** 15 דקות  
**Expected Answer Shape:**  
```ts
const filterByGenre = <T>(items: T[], field: keyof T, value: any): T[] => {
  if (!Array.isArray(items)) throw new Error("Must be array");
  return items.filter(item => item[field] === value);
};
```
**Scoring Rubric:**  
- 3 נק': interface מוגדרת (אין `any` בשדות)  
- 3 נק': `keyof T` בשאילתה  
- 2 נק': `Array.isArray(items)` + throw new Error  
- 2 נק': `filter` עם `field` (לא string literal)  
**Pass Condition:** `filterByGenre(books, 'genre', 'SciFi')` עובד  
**Likely Failure:** `item[field]` بدون casting – שגיאת compile  
---

**15. Title:** JS: Sum Sequence + Unique Count  
**Probability Band:** 90%  
**Exact Task:** כתוב פונקציה `analyzeSequence(arr: number[])` שמחזירה `{sum, countUniqueEven, countUniqueOdd}`.  
**Timebox:** 10 דקות  
**Expected Answer Shape:**  
```js
const analyzeSequence = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Must be array");
  const evens = new Set(arr.filter(n => n % 2 === 0));
  const odds = new Set(arr.filter(n => n % 2 !== 0));
  return { sum: arr.reduce((a,b)=>a+b,0), countUniqueEven: evens.size, countUniqueOdd: odds.size };
};
```
**Scoring Rubric:**  
- 2 נק': `Array.isArray` + throw new Error(msg)  
- 2 נק': `Set` ל-unique counting  
- 2 נק': `reduce` לא לחישוב סכום  
- 2 נק': return object עם שלוש השדות  
- 2 נק': edge case – ריק → `{sum:0, countUniqueEven:0, ...}`  
**Pass Condition:** `analyzeSequence([])` מחזיר `{sum:0, countUniqueEven:0, countUniqueOdd:0}`  
**Likely Failure:** חיסור של 1 ב-loop boundary (למשל: `i <= arr.length`)  
---

**16. Title:** React Navigation After Success  
**Probability Band:** 100%  
**Exact Task:** ב-`Login` page, אחרי `POST /api/auth/login` מוצלח – העבר ל-`/team/:teamName` (ה-`teamName` הוא מה-response).  
**Timebox:** 12 דקות  
**Expected Files:** `Login.tsx`  
**Scoring Rubric:**  
- 3 נק': `useNavigate` מ-`react-router-dom`  
- 3 נק': `navigate('/team/' + response.data.teamName)`  
- 3 נק': ניקיון after success (למשל: `resetForm()`)  
- 1 נק': לא שומעים ל-state after `navigate` (למשל: لا מעודכן)  
**Pass Condition:** בדיקה ידנית – after login, URL מסתבה ב-`/team/`  
**Likely Failure:** `window.location.href = ...` (מונע SPA)  
---

**17. Title:** Regex Validation – Password + Username  
**Probability Band:** 95%  
**Exact Task:** תcribe regex ל-username (3-15, lowercase English only) וסיסמה (8+, אحرف + דigits + special char). בדוק frontend + backend.  
**Timebox:** 20 דקות  
**Expected Files:** `validation.ts`, `/routes/auth.js`  
**Scoring Rubric:**  
- 3 נק': regex ב-FE: `/^[a-z]{3,15}$/`  
- 3 נק': regex ב-FE: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/`  
- 2 נק': `throw new Error("username must be lowercase, 3-15 chars")`  
- 2 נק': validation ב-backend עם אותו regex  
**Pass Condition:** `"Maccabi"` מתקבל ל-username? לא – מודפסת שגיאה.  
**Likely Failure:** regex חסר `^/$` – `"abc123!"` יתקבל despite length.  
---

**18. Title:** `try/catch` Inside All Routes  
**Probability Band:** 100%  
**Exact Task:** הוסף `try/catch` ל-all CRUD routes. אם שגיאה – return status 500.  
**Timebox:** 15 דקות  
**Expected Files:** `server.js` – כל route function  
**Scoring Rubric:**  
- 2 נק': try/catch מסביב ל-`await` (למשל: `Player.find`)  
- 2 נק': `res.status(500).json({error: "Internal error"})`  
- 2 נק': לא משאיר שגיאת server גלויה ל-client (למשל: `err.stack`)  
- 2 נק': error ב-catch *לא* מושפע מ-layout (למשל: `res` לא מתאפס)  
**Pass Condition:** `POST /players` עם schema שגוי → 500  
**Likely Failure:** `catch (e) => next(e)` – לא הוגדר `next`, קורס.  
---

**19. Title:** Empty/Loading/Error States in List  
**Probability Band:** 85%  
**Exact Task:** כתוב `PlayerList` שמציג: `Loading...`, `No players found`, list.  
**Timebox:** 15 דקות  
**Expected Files:** `PlayerList.tsx`  
**Scoring Rubric:**  
- 2 נק': `if (loading) return <div>Loading...</div>`  
- 2 נק': `if (!loading && players.length === 0) return <div>No players</div>`  
- 2 נק': error state: `if (error) return <div>Error: {error.message}</div>`  
- 2 נק': `useEffect` מעדכן `loading/error` (לא state חיצוני)  
**Pass Condition:** after `fetch` של שגיאה – מודפס "Error: ..."  
**Likely Failure:** `return []` ב-`players.map` – שגיאת TypeError ב-UI  
---

**20. Title:** Backend `POST` with Uniqueness Check  
**Probability Band:** 100%  
**Exact Task:** ב-`POST /players`, בדוק אם שחקן כבר קיים ב-`teamName` + `name`. אם כן – status 400.  
**Timebox:** 18 דקות  
**Expected Files:** `/routes/players.js`  
**Scoring Rubric:**  
- 3 נק': `Player.findOne({ teamName, name })`  
- 3 נק': `if (found) throw new Error("Player already exists")`  
- 2 נק': status 400 ב-catch  
- 2 נק': לא בודק `email` (איננו חלק מה-model)  
**Pass Condition:** שליחה פעמיים של אותו שחקן → 400  
**Likely Failure:** `Player.create` לפני בדיקה → duplicate in DB  
---

**21. Title:** TypeScript Type Guard for Player  
**Probability Band:** 85%  
**Exact Task:** הכן `isValidPlayer(obj: any): obj is Player` שבודק:  
- `obj.name` is string  
- `obj.age` is number  
- `obj.teamName` is string  
- `obj.goals` and `obj.assists` are numbers or undefined  
**Timebox:** 15 דקות  
**Expected Answer Shape:**  
```ts
const isValidPlayer = (obj: any): obj is Player => {
  return typeof obj.name === 'string' &&
         typeof obj.age === 'number' &&
         typeof obj.teamName === 'string' &&
         (obj.goals === undefined || typeof obj.goals === 'number') &&
         (obj.assists === undefined || typeof obj.assists === 'number');
};
```
**Scoring Rubric:**  
- 2 נק': `obj is Player` type predicate  
- 2 נק': `typeof` לכל שדה חובה  
- 2 נק': `undefined` allowed for `goals/assists`  
- 2 נק': לא משתמש ב-`as`  
**Pass Condition:** `isValidPlayer({name: 123})` → false  
**Likely Failure:** חסר בדיקה ל-`age` (שדה חובה)  
---

**22. Title:** Tailwind Cache Fix (If Needed)  
**Probability Band:** 50%  
**Exact Task:** אם `bg-red-500` לא מופיע – ציין פתרון ב-30 שניות.  
**Timebox:** 10 דקות (המחשה, לא כתיבה)  
**Expected Files:** `vite.config.js` – לא מתעדכן  
**Scoring Rubric:**  
- 2 נק': `Ctrl+Shift+R` (hard reload)  
- 2 נק': `rm -rf node_modules/.vite` (clear cache)  
- 2 נק': `npm run dev` מחדש  
- 2 נק': לא מטפל ב-caching של CSS  
- 2 נק': לא מנסה למחוק node_modules (רק cache)  
**Pass Condition:** After `Ctrl+Shift+R`, `bg-red-500` מופיע  
**Likely Failure:** `npm install tailwindcss` – זה לא פותר את הבעיה של cache ב-cdn  
---  

**הערה כללית:** כל Drill must finish within timebox – otherwise: `fail`.  
**הערות:**  
- לא לתרגל state mutation validation – לא מופיע ב-source.  
- לא לתרגל layout order validation – לא קשור ל-validate.  
- `localStorage` – *never* required.  
- **לזכור: backend before frontend, validations = grade.**

