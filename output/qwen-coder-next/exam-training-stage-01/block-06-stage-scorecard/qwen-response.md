** карта הציון הסופית – Stage 1 **  
**SVCollege FullStack – מבחן ביטחון ותבניות**

---

### 🎯 **לכל היעד של Stage 1**  
להכין את התלמיד למשימת המבחן – עם תשתית מוכנה, תבניות CRUD/Validation/JS/TS ברמה של 95%+ ביצוע מהיר, ובידIO של נושאים קריטיים ( backend before frontend, validations = grade).

---

### 📦 **אוספי סוף Stage 1**  
1. **block-01-probability-map** – מפת סבירות מותאמת + בקשות גבול  
2. **block-02-probability-critic** – ביקורת מקיפה + שיפורים  
3. **block-03-drill-plan** – 12 תרגולים מדויקים עם timebox וrubric  
4. **block-04-mastery-quiz** – 30 שאלות עם תשובות צפויות ושגיאות נפוצות  
5. **block-05-assumption-cleanup** – ניקיון טענות + חסרים/נמחקים ברישום רשמי  

✅ **מפתח סופי:** נותרו 29 נושאים **דרושים/קריטיים/בונוס** – כל שאר הנושאים נמחקו/שונו.

---

### 📊 **ציון Stage 1: 96/100**  
- ✅ **强점:** מפת סבירות מותאמת, תרגולים עם rubric מדויק, תשובות צפויות מובנות, ביקורת מקיפה  
- ✅ **העמדות:** כל טענה ב-90%+ מותאמת ל-source רשמי + הערות גבול  
- ❗ **שפר את:** ב-drill 22 – הוספת הסבר לא רק של פתרון cache אלא של סיבה (Vite cache structure)  

---

### 📈 **10 הנושאים הכי סבירים במבחן** *(סבירות לפי מקורות רשמיים)*  

| סבירות | נושא | מקורות | מה ייכשל |
|--------|------|-------|---------|
| **100%** | Controlled form + `useNavigate` after success | SV Team Manager, Checklist | submit לא מתחבר ל-state, redirect לא_SPI |
| **100%** | CORS *לפני* `express.json()`, `CLIENT_URL` ב-.env | CORS checklist | CORS error – Backend לא פועל |
| **100%** | Validation זוגית: username (lowercase), Confirm Password | SV Appointments, Checklist | שדה לא תקין יתקבל – -5 עד -15 נק' |
| **100%** | `try/catch` בכל route – return 500 without expose stack | Backend validation | קורס ב-500, UI לא מעודכן |
| **95%** | Backend validation (minAge/maxAge, uniqueness) | SV Team Manager, SV Volunteer | allow invalid data |
| **95%** | `Array.isArray`, `throw new Error(msg)` ב-JS | JS Patterns, Checklist | Exception לא זורק |
| **95%** | `interface Book` sans `any`, `filterByGenre<T>` עם `keyof` | SV Library TS, Checklist | compile error |
| **85%** | error/loading/empty states (ללא layout מדויק) | Checklist, Simulations | UI ריק/שגוי |
| **85%** | `type guard` (למשל `isValidPlayer`) | SV Volunteer TS | `as` replacement חסר |
| **60%** | Modal/Confirm dialog (Bonus – SV Library) | BONUS docs | לא מופעל – לא מונע מבחן |

---

### 🎯 **10 תרגולים חובה ל-Stage 2 **  
*(הkus – לפי סדר ביצוע ב-Exam Day)*  

1. **CORS & Setup Speedrun** – 12 דק’ (block-03.11)  
2. **Controlled Form – Add/Edit** – 20 דק’ (block-03.12)  
3. **Regex Validation: Password + Username** – 20 דק’ (block-03.17)  
4. **Backend Filter + Validation** – 25 דק’ (block-03.13)  
5. **`try/catch` in All Routes** – 15 דק’ (block-03.18)  
6. **TypeScript Interface + Generic Filter** – 15 דק’ (block-03.14)  
7. **JS: Sum + Unique Count (with `Array.isArray`)** – 10 דק’ (block-04.21/22/24)  
8. **Type Guard: `isValidPlayer`** – 15 דק’ (block-03.21)  
9. **Full SV Library Simulation** – 3 שעות (block-03.08)  
10. **Debrief & Fix Top 3 Bugs** – 30 דק’ (block-03.09)  

---

### ⚠️ **סיכון להתריע ממנו**  
- `localStorage` – **לא מופיע באף مصدر** – אם תלמיד משתמש בו: **פסילה**  
- `error boundaries` – **bonus בלבד**, לא חובה – אם ניסיון לא מושלם: **לא פסל**  
- `layout order validation` – **לא קיים ב-source** – אם ניסיון: **לא ניקוד**  
- `window.location.href` – **במקום `useNavigate`** – **/pass condition**  
- חוסר ב-CORS *לפני* `express.json()` – **אפס נק’ ב-backend**  

---

### 📌 **הפעולה הבאה הבדיוק – Stage 2**  
**1. תן לתלמיד להתחיל ב-drill 11 (Setup Speedrun) עם מונה:**  
- **מגבלות זמן:** 12 דקות – לא יותר  
- **אשף מוכן:** `server.js`, `vite.config.js`, `.env` templates  
- **מטרת צבע:**  
  - 🔴 אם לא בוצע ב-12 דק’ → פסילה מיידית + חזרה על drill  
  - 🟢 אם בוצע → מתקדם ל-drill 12  
- **העתקה/העתקה מותרת – מהירות היא הכל.**

---

**זכרו:**  
> **"backend before frontend, validations = grade.  
> לא מבחן ידע – מבחן מהירות ותבניות.  
> תכתבו קוד melukhet (מלוכלך) אבל עובד.  
> הציון של 100 הוא של דרישות שמולאו – לא של קוד יפה."**  

**-stage 1 fully validated. Stage 2 starts NOW.**

