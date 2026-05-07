### מבחן mastery – נושאיםHIGH-PROBABILITY  
**(30 שאלות, סטנדרט מבחן סופי – SVCollege FullStack)**  

---

#### **React (6 שאלות)**  
1. **שאלה:** ב-`PlayerForm`, איך מבטיחים שה-data שנשלחת ל-backend נובעת מה-state ולא מ-DOM?  
   **תשובה צפויה:** `setFormData(prev => ({...prev, [e.target.name]: e.target.value}))`+ submit קורא `formData` (לא `e.target.value` ישירות).  
   **נקודות:** 4  
   **שגיאה נפוצה:** submit uses `e.target.value` ישירות או שומך `value` על state אבל לא מעדכן ב-`onChange`.  

2. **שאלה:** מה ה-urlที่ ייפתח עם `useNavigate()` אחרי login מוצלח, אם ה-response מחזיר `{teamName: "Hapoel"}`?  
   **תשובה צפויה:** `navigate('/team/Hapoel')` או `navigate(`/team/${response.teamName}`)`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `window.location.href = ...` (שבור SPA) או `navigate('/team/:teamName')` (הסטיק).  

3. **שאלה:** באיזה סדר.must appear in `PlayerList` ל-display empty/error/loading?  
   **תשובה צפויה:** `if (loading) → if (error) → if (players.length === 0) → map`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `return []` ב-`map` במקום conditional rendering, או `error` אחרי `map`.  

4. **שאלה:** איך מבטיחים של-`PlayerForm` יש `name` ש-controlled?  
   **תשובה צפויה:** `value={formData.name}` + `onChange={handleChange}`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `defaultValue` או חוסר `onChange`.  

5. **שאלה:** למה `useEffect` מופעל פעם אחת רק ב-`PlayerForm` עם `params.id`?  
   **asse expected:** לא לאפס את ה-state (לא לשכפל CRUD), אלא *למלא* את ה-state אם יש `params.id`.  
   **נקודות:** 2  
   **שגיאה נפוצה:** `useEffect(() => {}, [])` (לא משתמש ב-`params.id`) או `useEffect(() => {}, [formData])` (loop).  

6. **שאלה:** איך מוגדר `PlayerForm` כקומפוננטה משותפת ל-Add/Edit?  
   **תשובה צפויה:** `props: {initialData?: Player}` → `useState` עם `initialData || defaultForm`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** חוסר ב-prop `initialData`, או חוסר ב-Controlled Form pattern.  

---

#### **Express + MongoDB (6 שאלות)**  
7. **שאלה:** למה `cors({origin: process.env.CLIENT_URL})` חייב להופיע *לפני* `express.json()`?  
   **תשובה צפויה:** CORS middleware must run *before* request parsing – אחרת `req.body` ריק ב-cors error.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `cors` אחרי `app.use(express.json())`, או חוסר ב-CORS כלל.  

8. **שאלה:** איך מבטיחים של-`POST /players` אין כפילות `teamName + name`?  
   **תשובה צפויה:** `Player.findOne({teamName, name})` + `if (found) throw new Error(...)` + status 400.  
   **נקודות:** 4  
   **שגיאה נפוצה:** `Player.create` לפני בדיקה, או בדיקה על `email` (אינו ב-model).  

9. **שאלה:** איך מחזירים 400 אם `minAge > maxAge` ב-`POST /filter`?  
   **תשובה צפויה:** `if (minAge > maxAge) throw new Error('minAge > maxAge')` ב-inner `try`.  
   **נקודות:** 4  
   **שגיאה נפוצה:** בדיקה אחרי ה-query (לא מונע запрос לא רלוונטי).  

10. **שאלה:** למה `try/catch` *בכל* route?  
    **תשובה צפויה:** כדי לשלוח status 500 *בלי* expose stack trace (למשל `res.status(500).json({error: "Internal error"})`).  
    **נקודות:** 4  
    **שגיאה נפוצה:** `catch (e) => next(e)` בלי `next` מוגדר, או `console.log(e)` ב-client.  

11. **שאלה:** איך מוגדר `mongoose.connect` ב-`server.js`?  
    **תשובה צפויה:** `await mongoose.connect(process.env.MONGO_URI)` + error handling (try/catch או `.catch`).  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `await`, או חוסר ב-env (hardcoded URI).  

12. **שאלה:** מה ה-status code when `POST /players` מנסה להוסיף שחקן עם `age = 15` (אלא אם backend מозвיל)?  
    **תשובה צפויה:** 400 (frontend validation), או 200+backend validation (throw 400).  
    **נקודות:** 4  
    **שגיאה נפוצה:** 201 עם שחקן לא רלוונטי, או חוסר ב-backend validation.  

---

#### **Validations (8 שאלות)**  
13. **שאלה:** איך מבטיחים frontend+backend ש-`username` הוא lowercase 3-15 תווים?  
    **תשובה צפויה:** regex `/^[a-z]{3,15}$/` frontend + backend.  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `^/$`, או `/[a-z]{3,15}/` (מאפשר `"abc123"` כ-valid).  

14. **שאלה:** איך בודקים `confirm password` (frontend+backend)?  
    **תשובה צפויה:** `password === confirmPassword` + throw error עם message מדויק.  
    **נקודות:** 4  
    **שגיאה נפוצה:** בדיקה רק ב-client (למשל לא ב-backend), או חוסר message מדויק.  

15. **שאלה:** מה ה-status code when `POST /filter` מקבל `minAge=70, maxAge=10`?  
    **תשובה צפויה:** 400 ( backend validation).  
    **נקודות:** 2  
    **שגיאה נפוצה:** 200 עם filtered list ריק, או 500.  

16. **שאלה:** איך בודקים `teamName` ריק backend?  
    **תשובה צפויה:** `if (!teamName) throw new Error("teamName is required")`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** בדיקה רק frontend, או חוסר message מדויק.  

17. **שאלה:** איך בודקים ש-`password` includes uppercase, lowercase, digit, special char?  
    **תשובה צפויה:** regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** regex חסר `(?=...)` או `<8` ב-length.  

18. **שאלה:** למה `required` validation必须 be frontend+backend?  
    **תשובה צפויה:** frontend for UX, backend for security (no bypassing).  
    **נקודות:** 2  
    **שגיאה נפוצה:** רק ב-backend (bad UX), או רק ב-client (בypass 가능).  

19. **שאלה:** איך בודקים `minAge >= 0`?  
    **תשובה צפויה:** `if (minAge < 0) throw new Error("minAge must be >= 0")`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** בדיקה רק backend *אחרי* query (לא מונע request).  

20. **שאלה:** איך מונעים `age=120` ב-backend?  
    **תשובה צפויה:** `if (maxAge > 100) throw new Error("maxAge must be <= 100")`.  
    **נקודות:** 2  
    **שגיאה נפuada:** חוסר validation, או בדיקה frontend בלבד.  

---

#### **JavaScript (5 שאלות)**  
21. **שאלה:** איך כותבים `analyzeSequence([])` כדי לחזור `{sum:0, countUniqueEven:0, countUniqueOdd:0}`?  
    **תשובה צפויה:** `Set()` ריק + `reduce` עם אסילו 0.  
    **נקודות:** 4  
    **שגיאה נפוצה:** חוסר `Array.isArray`, או `filter` עם boundary error (`i <= arr.length`).  

22. **שאלה:** איך כותבים `throw new Error("Must be array")` ב-function שמקבל `arr: any`?  
    **תשובה צפויה:** `if (!Array.isArray(arr)) throw new Error("Must be array")`.  
    **נקודות:** 4  
    **שגיאה נפוצה:** `throw Error(...)` (לא new), או חוסר ב-message מדויק.  

23. **שאלה:** איך בודקים `typeof num === "number"`?  
    **תשובה צפויה:** `typeof n === "number" && !isNaN(n)`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** חוסר ב-`isNaN`, או `Number.isInteger` ללא בדיקה של NaN.  

24. **שאלה:** איך מחזירים `sum` של array?  
    **תשובה צפויה:** `arr.reduce((a,b) => a+b, 0)`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** loop עם `i <= arr.length`, או חוסר seed 0.  

25. **שאלה:** איך בודקים `unique count` של zugi/짝?  
    **תשובה צפויה:** `new Set(arr.filter(n => n%2===0)).size`.  
    **נקודות:** 2  
    **שגיאה נפוצה:** loop עם `if (visited.includes(...))`, או חוסר ב-Set.  

---

#### **TypeScript (3 שאלות)**  
26. **שאלה:** איך כותבים `interface Book` בלי `any`?  
    **תשובה צפויה:** `genre: 'SciFi'|'Drama'` (not string).  
    **נקודות:** 4  
    **שגיאה נפוצה:** `genre: string`, או `isAvailable: any`.  

27. **שאלה:** איך כותבים `filterByGenre<T>` עם `keyof T`?  
    **תשובה צפויה:** `items.filter(item => item[field] === value)`.  
    **نقודות:** 4  
    **שגיאה נפוצה:** `item[field as keyof T]` (בלי casting), או string literal.  

28. **שאלה:** איך מגדירים `type guard` `isValidPlayer`?  
    **תשובה צפויה:** `obj is Player` + typeof לכל שדה + undefined allowed for optional.  
    **נקודות:** 4  
    **שגיאה נפuada:** `obj as Player`, או חוסר ב-`undefined` check.  

---

#### **Debug & Setup (2 שאלות)**  
29. **שאלה:** איך מטפלים ב-CORS error אם `CLIENT_URL` לא מוגדר ב-backend?  
    **תשובה צפויה:** `cors({origin: process.env.CLIENT_URL})` – צריך להגדיר `CLIENT_URL=http://localhost:5173` ב-.env.  
    **נקודות:** 4  
    **שגיאה נפuada:** חוסר ב-env, או `origin: '*'` (安全? לא ב-checklist).  

30. **שאלה:** איך מטפלים ב-CSS that Tailwind `bg-red-500` לא מופיע?  
    **תשובה צפויה:** `Ctrl+Shift+R` + `rm -rf node_modules/.vite` + `npm run dev`.  
    **נקודות:** 4  
    **שגיאה נפuada:** `npm install tailwindcss` (לא פותר cache), או חוסר ב-cache busting.  

---

### ✅ מסקנות:  
- **שיטות ניקוד:** כל שאלות ה-pointing מותאמות לרובריקה המפורטת (2–4 נק' לפי מפת הסבירות המותאמת).  
- **שגיאות נפוצות:** נבחרו לפי דיווח הביקורת (למשל: `window.location.href`, `e.target.value` ישירות, חוסר ב-`new Error`, `origin: '*'`).  
- **הערות:**  
  - כל תשובה должна להתחיל ב-`expected answer` – לא בהגדרות.  
  - כל שאלה должна להימתך ב-timebox המפורט.  
  - **למשל:** אם student משתמש ב-`console.log()` ב-CORS – פסילה ל-0 נק'.  

**בהצלחה – תזכרו: backend before frontend, validations = grade.**

