# Tooling & Git — כלי פיתוח, Git וזרימת עבודה — דף סיכום למבחן

**מודול SVCollege:** —

**תיאור:** איך שינוי קוד עובר ממחשב אישי לעבודה צוותית: repository, commit, branch, pull request, npm scripts, ESLint, Prettier ו-format-on-save.

**מספר מושגים:** 11

---

## מושגים בסיכום

### 1. Git

**רמת קושי:** 3/10

**דוגמה:**
```
git status
git add src/App.jsx
git commit -m "add login form"
git log --oneline
```

**הסבר:** status מראה מצב, add מכניס לשלב הכנה, commit יוצר snapshot, log מציג היסטוריה.

---

### 2. repository

**רמת קושי:** 2/10

**דוגמה:**
```
git clone https://github.com/team/app.git
cd app
git remote -v
```

**הסבר:** clone יוצר repository מקומי מתוך GitHub. remote -v מראה לאן push/pull מחוברים.

---

### 3. working tree

**רמת קושי:** 3/10

**דוגמה:**
```
git status --short
# M src/App.jsx
# ?? notes.md
```

**הסבר:** M אומר קובץ קיים השתנה. ?? אומר קובץ חדש ש-Git עדיין לא עוקב אחריו.

---

### 4. staging area

**רמת קושי:** 4/10

**דוגמה:**
```
git add src/App.jsx
git diff --staged
git commit -m "wire login form"
```

**הסבר:** diff --staged מראה בדיוק מה ייכנס ל-commit הבא.

---

### 5. commit

**רמת קושי:** 3/10

**דוגמה:**
```
git add .
git commit -m "fix empty task validation"
```

**הסבר:** ה-message צריך להסביר את השינוי העסקי/טכני, לא רק 'update'.

---

### 6. branch

**רמת קושי:** 4/10

**דוגמה:**
```
git switch -c feature/login-form
git branch --show-current
```

**הסבר:** switch -c יוצר ענף חדש ועובר אליו. show-current מאשר שאתה לא על main.

---

### 7. pull request

**רמת קושי:** 4/10

**דוגמה:**
```
git push -u origin feature/login-form
# פותחים PR ב-GitHub ומחכים ל-review + CI
```

**הסבר:** push מעלה את הענף. GitHub מציג כפתור לפתיחת PR מהענף הזה ל-main.

---

### 8. GitHub workflow

**רמת קושי:** 5/10

**דוגמה:**
```
git pull --ff-only
git switch -c feature/search
npm test
git push -u origin feature/search
```

**הסבר:** pull --ff-only מביא עדכונים בלי merge מפתיע. בדיקות לפני push מצמצמות רעש ב-CI.

---

### 9. npm scripts

**רמת קושי:** 4/10

**דוגמה:**
```
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "lint": "eslint ."
  }
}
```

**הסבר:** כל מפתח יכול להריץ npm run lint בלי לדעת איפה eslint מותקן או מה כל הדגלים.

---

### 10. ESLint

**רמת קושי:** 5/10

**דוגמה:**
```
npm run lint
# no-unused-vars: 'count' is assigned but never used
```

**הסבר:** ה-linter עוזר לשמור main נקי ומצמצם באגים שחוזרים שוב ושוב.

---

### 11. Prettier

**רמת קושי:** 3/10

**דוגמה:**
```
npm run format
# או format-on-save דרך VS Code
```

**הסבר:** Prettier פותר סגנון. ESLint פותר בעיות חוקיות/איכות. הם משלימים זה את זה.

---

## שאלות חזרה (סוף השיעור)

**שאלה 1:** מה commit אמור לייצג?

✓ 1. צילום קטן וברור של שינוי
  2. מחיקה של כל ההיסטוריה
  3. הורדה של ספרייה חדשה בלבד
  4. פתיחת אתר בדפדפן

**הסבר:** commit טוב הוא snapshot ממוקד עם הודעה שמסבירה את הכוונה.

---

**שאלה 2:** למה לא לעבוד ישירות על main?

  1. כי main לא יכול להכיל JavaScript
✓ 2. כי branch מאפשר שינוי מבודד ו-review לפני merge
  3. כי GitHub לא תומך ב-main
  4. כי npm scripts יפסיקו לעבוד

**הסבר:** feature branch שומר את main יציב ומאפשר PR, CI ו-review לפני חיבור.

---

**שאלה 3:** מה התפקיד של Pull Request?

  1. להריץ שרת Express
✓ 2. להציג diff, לקבל review ולבדוק CI לפני merge
  3. למחוק node_modules
  4. להחליף את package.json

**הסבר:** PR הוא שער איכות: diff גלוי, דיון, בדיקות ואישור לפני merge.

---

**שאלה 4:** איפה מגדירים npm scripts כמו dev/build/test?

  1. README.md
✓ 2. package.json
  3. index.html
  4. .gitignore

**הסבר:** scripts מוגדרים ב-package.json ומופעלים עם npm run <name>.

---

**שאלה 5:** מה ESLint עושה בעיקר?

✓ 1. בודק חוקים סטטיים ומזהה בעיות בקוד
  2. מעצב צבעים ב-CSS
  3. מעלה קבצים ל-GitHub
  4. מחליף את React

**הסבר:** ESLint מנתח את הקוד לפי rules ומזהיר על בעיות עוד לפני runtime.

---

**שאלה 6:** מה Prettier עושה?

  1. מריץ API
✓ 2. מעצב formatting בצורה עקבית
  3. יוצר branch חדש
  4. מוחק שגיאות לוגיקה

**הסבר:** Prettier אחראי לעיצוב הקוד. הוא לא אמור לשנות לוגיקה.

---
