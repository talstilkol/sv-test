# HTML/CSS Foundations — יסודות HTML ו-CSS — דף סיכום למבחן

**מודול SVCollege:** —

**תיאור:** השכבה הראשונה של כל אתר: מבנה HTML סמנטי, טפסים, בחירת אלמנטים עם CSS, מודל הקופסה, והנגשה בסיסית לפני React או Tailwind.

**מספר מושגים:** 8

---

## מושגים בסיכום

### 1. HTML document

**רמת קושי:** 2/10

**דוגמה:**
```
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>Task App</title>
  </head>
  <body>
    <main>
      <h1>המשימות שלי</h1>
    </main>
  </body>
</html>
```

**הסבר:** doctype מפעיל מצב תקני. html מגדיר שפה וכיוון. head מגדיר metadata. body מכיל את התוכן האמיתי.

---

### 2. semantic HTML

**רמת קושי:** 3/10

**דוגמה:**
```
<header>
  <h1>Movie App</h1>
  <nav aria-label="ניווט ראשי">
    <a href="/">בית</a>
    <a href="/movies">סרטים</a>
  </nav>
</header>
<main>
  <section aria-labelledby="movies-title">
    <h2 id="movies-title">סרטים מומלצים</h2>
  </section>
</main>
```

**הסבר:** header/nav/main/section מתארים תפקיד. aria-labelledby מחבר section לכותרת שלה בלי להמציא תיאור כפול.

---

### 3. HTML form

**רמת קושי:** 4/10

**דוגמה:**
```
<form action="/login" method="post">
  <label for="email">אימייל</label>
  <input id="email" name="email" type="email" required />
  <label for="password">סיסמה</label>
  <input id="password" name="password" type="password" required />
  <button type="submit">כניסה</button>
</form>
```

**הסבר:** label מחובר ל-input דרך for/id. type=email נותן מקלדת/ולידציה מתאימה. name הוא המפתח שנשלח לשרת.

---

### 4. label

**רמת קושי:** 3/10

**דוגמה:**
```
<label for="task-title">שם משימה</label>
<input id="task-title" name="title" type="text" autocomplete="off" />
```

**הסבר:** for ו-id חייבים להתאים. name יכול להיות שונה, אבל לרוב נשאר ברור וקצר.

---

### 5. CSS selector

**רמת קושי:** 4/10

**דוגמה:**
```
.card {
  padding: 16px;
  border: 1px solid #ddd;
}
.card:hover {
  border-color: #2563eb;
}
input[required] {
  border-inline-start: 4px solid #f59e0b;
}
```

**הסבר:** .card בוחר class, :hover בוחר מצב, attribute selector בוחר input לפי תכונה.

---

### 6. cascade and specificity

**רמת קושי:** 6/10

**דוגמה:**
```
button { color: blue; }
.primary { color: red; }
#save-button { color: green; }

<button id="save-button" class="primary">שמור</button>
```

**הסבר:** שלושת החוקים מתאימים לאותו כפתור. id הוא הספציפי ביותר ולכן הצבע יהיה ירוק.

---

### 7. box model

**רמת קושי:** 4/10

**דוגמה:**
```
*, *::before, *::after {
  box-sizing: border-box;
}
.card {
  width: 300px;
  padding: 24px;
  border: 1px solid #ddd;
  margin-block: 16px;
}
```

**הסבר:** עם border-box, ה-300px כולל content+padding+border. margin עדיין מחוץ לקופסה.

---

### 8. accessibility basics

**רמת קושי:** 5/10

**דוגמה:**
```
<button type="button" aria-label="סגור חלון">
  <span aria-hidden="true">×</span>
</button>
<img src="chart.png" alt="גרף התקדמות שבועי" />
```

**הסבר:** כפתור אייקון צריך שם נגיש. span דקורטיבי מוסתר מקורא מסך. alt מתאר תמונה משמעותית.

---

## שאלות חזרה (סוף השיעור)

**שאלה 1:** למה עדיף להשתמש ב-<main> במקום div רגיל לתוכן המרכזי?

  1. כי main מהיר יותר
✓ 2. כי main נותן משמעות מבנית ונגישות טובה יותר
  3. כי div לא עובד בדפדפן
  4. כי main מחליף CSS

**הסבר:** main הוא landmark סמנטי. הוא עוזר לקורא מסך ולמנועי חיפוש להבין איפה התוכן המרכזי.

---

**שאלה 2:** מה חסר כאן?

<input id="email" type="email" />

✓ 1. label שמחובר ל-input
  2. חובה להשתמש ב-div
  3. אסור להשתמש ב-type=email
  4. צריך למחוק את id

**הסבר:** input צריך שם נגיש. label עם for='email' הוא הדרך הבסיסית והנכונה.

---

**שאלה 3:** איזה selector בוחר class בשם card?

  1. card
✓ 2. .card
  3. #card
  4. <card>

**הסבר:** נקודה לפני שם היא class selector. סולמית היא id selector.

---

**שאלה 4:** ב-CSS, מה בדרך כלל חזק יותר?

  1. tag selector
✓ 2. class selector
  3. comment
  4. margin

**הסבר:** class ספציפי יותר מ-tag. id חזק יותר משניהם.

---

**שאלה 5:** מה עושה box-sizing: border-box?

  1. מוחק padding
✓ 2. גורם לרוחב לכלול padding ו-border
  3. מוסיף margin אוטומטי
  4. מחליף flex

**הסבר:** border-box מקל על חישוב רוחב: width כולל את התוכן, ה-padding וה-border.

---

**שאלה 6:** מה בדיקת הנגישות הכי מהירה שאפשר לעשות ידנית?

  1. לשנות שם קובץ
✓ 2. לנווט באתר עם Tab ו-Enter בלבד
  3. להקטין את מסך הדפדפן
  4. למחוק את כל ה-CSS

**הסבר:** ניווט מקלדת חושף מהר בעיות focus, כפתורים לא סמנטיים, ותפריטים שאי אפשר לפתוח בלי עכבר.

---
