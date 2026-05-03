# DevOps Foundations - Vercel, Docker, CI/CD ו-Testing — דף סיכום למבחן

**מודול SVCollege:** תשתיות, DevOps ו-CI/CD - Vercel, Docker, Docker Compose, testing

**תיאור:** איך מעבירים אפליקציית Full Stack ממחשב אישי לסביבה שאפשר לבנות, לבדוק, לפרוס ולתחזק.

**מספר מושגים:** 17

---

## מושגים בסיכום

### 1. production readiness

**רמת קושי:** 5/10

**מה זה:** production readiness היא בדיקה שהאפליקציה לא רק רצה אצלך, אלא מוכנה למשתמשים אמיתיים: build, env, errors, logs, security ו-smoke.

**למה Full Stack:** Full Stack אמיתי לא נגמר ב-localhost. צריך לדעת שהלקוח, השרת והנתונים עובדים גם אחרי deploy.

**דוגמה:**
```
npm run build
npm test -- --run
npm run validate:strict
```

**הסבר:** לפני deploy מריצים build, tests ו-validation כדי לתפוס בעיות לפני שהן מגיעות למשתמשים.

⚠️ **טעות נפוצה:** לחשוב ש-dev server עובד שווה production עובד. production מפעיל build, env ו-cache בצורה אחרת.

**תלוי ב:** `lesson_tooling_git::npm scripts`

---

### 2. environment variables

**רמת קושי:** 5/10

**מה זה:** environment variables הם ערכי תצורה שמגיעים מהסביבה, למשל URL של database או מפתח API, ולא נכתבים בקוד.

**למה Full Stack:** אותו קוד צריך לעבוד ב-local, preview ו-production עם ערכים שונים ובלי לחשוף secrets.

**דוגמה:**
```
const databaseUrl = process.env.DATABASE_URL;
```

**הסבר:** הקוד קורא את הערך מהסביבה. הערך עצמו מוגדר בכל סביבת deploy.

⚠️ **טעות נפוצה:** לשמור secret בתוך קובץ JS או לדחוף .env פרטי ל-Git.

**תלוי ב:** `lesson_auth_security::secure cookie`

---

### 3. Vercel deploy

**רמת קושי:** 4/10

**מה זה:** Vercel deploy הוא פרסום אפליקציית frontend/Next דרך חיבור Git או CLI, עם build אוטומטי ו-preview לכל שינוי.

**למה Full Stack:** SVCollege דורש להבין איך קוד הופך לכתובת שעובדת מחוץ למחשב שלך.

**דוגמה:**
```
git push origin main
# Vercel מזהה שינוי, מריץ build ויוצר deployment
```

**הסבר:** ה-deploy מחובר ל-Git ולכן כל push יכול לפתוח build ו-preview.

⚠️ **טעות נפוצה:** להניח ש-env vars קיימים ב-Vercel כי הם קיימים אצלך ב-local.

**תלוי ב:** `lesson_tooling_git::GitHub workflow`

---

### 4. preview deployment

**רמת קושי:** 4/10

**מה זה:** preview deployment הוא deploy זמני ל-branch או PR, כדי לבדוק שינוי לפני production.

**למה Full Stack:** הוא מאפשר לראות UI, API ונתונים בסביבה דומה יותר למציאות לפני merge.

**דוגמה:**
```
branch -> pull request -> preview URL -> review -> merge
```

**הסבר:** במקום לבדוק רק מקומית, ה-PR מקבל כתובת בדיקה.

⚠️ **טעות נפוצה:** לדלג על preview ולמזג שינוי שלא נבדק בדפדפן אמיתי.

**תלוי ב:** `lesson_tooling_git::pull request`

---

### 5. build command

**רמת קושי:** 4/10

**מה זה:** build command היא הפקודה שמייצרת גרסת production מהקוד, בדרך כלל npm run build.

**למה Full Stack:** אם build נכשל, deploy אמור להיעצר. זה שער בסיסי לפני production.

**דוגמה:**
```
"scripts": { "build": "vite build", "test": "vitest run" }
```

**הסבר:** package.json מגדיר פקודות קבועות שכל מפתח ו-CI יכולים להריץ.

⚠️ **טעות נפוצה:** להסתפק ב-npm run dev, שלא בודק production bundle.

**תלוי ב:** `lesson_tooling_git::npm scripts`

---

### 6. Docker

**רמת קושי:** 6/10

**מה זה:** Docker אורז אפליקציה עם סביבת ההרצה שלה לתוך image שממנו מריצים container.

**למה Full Stack:** הוא מקטין פערים בין מחשבים וסביבות: אותה אפליקציה רצה באותה צורה יחסית.

**דוגמה:**
```
docker build -t lumen-api .
docker run -p 3000:3000 lumen-api
```

**הסבר:** build יוצר image, ו-run מפעיל ממנו container עם port חשוף.

⚠️ **טעות נפוצה:** לחשוב ש-Docker הוא virtual machine מלא. Container משתף kernel אבל מבודד process/files/network.

**תלוי ב:** `lesson_16::Node.js`

---

### 7. Dockerfile

**רמת קושי:** 6/10

**מה זה:** Dockerfile הוא מתכון שמגדיר איך לבנות image: base image, העתקת קבצים, התקנת dependencies ו-command.

**למה Full Stack:** הוא הופך סביבת הרצה להוראות מפורשות במקום 'אצלי זה עובד'.

**דוגמה:**
```
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
```

**הסבר:** השכבות בונות image עם Node, dependencies, קוד ופקודת הפעלה.

⚠️ **טעות נפוצה:** להעתיק את כל הפרויקט לפני npm ci ואז לשבור cache בכל שינוי קטן.

**תלוי ב:** `lesson_devops_deploy::Docker`

---

### 8. image

**רמת קושי:** 5/10

**מה זה:** image הוא snapshot בנוי של האפליקציה והסביבה, שממנו אפשר להריץ containers.

**למה Full Stack:** Image נותן artifact ברור: זה מה שבדקנו וזה מה שמריצים.

**דוגמה:**
```
docker images
lumen-api:latest
```

**הסבר:** ה-image נשמר בשם ו-tag כדי שאפשר יהיה להריץ או לפרסם אותו.

⚠️ **טעות נפוצה:** לבלבל בין image לבין container. image הוא התבנית; container הוא תהליך שרץ ממנה.

**תלוי ב:** `lesson_devops_deploy::Dockerfile`

---

### 9. container

**רמת קושי:** 5/10

**מה זה:** container הוא process שרץ מתוך image עם filesystem, network ו-env מבודדים יחסית.

**למה Full Stack:** כך אפשר להריץ backend, database או worker באותה צורה בסביבות שונות.

**דוגמה:**
```
docker ps
CONTAINER ID   IMAGE       PORTS
```

**הסבר:** docker ps מציג containers שרצים עכשיו.

⚠️ **טעות נפוצה:** לשמור מידע חשוב בתוך container בלי volume או database חיצוני.

**תלוי ב:** `lesson_devops_deploy::image`

---

### 10. Docker Compose

**רמת קושי:** 6/10

**מה זה:** Docker Compose מריץ כמה services יחד לפי קובץ compose, למשל app + database.

**למה Full Stack:** Full Stack כולל כמה תהליכים. Compose נותן דרך אחת להרים אותם יחד ל-dev או integration.

**דוגמה:**
```
services:
  api:
    build: .
  db:
    image: postgres:16
```

**הסבר:** compose מגדיר services, images/build, ports, env ו-volumes.

⚠️ **טעות נפוצה:** לחשוב ש-compose הוא production orchestrator מלא. הוא בעיקר נוח ל-dev וסביבות קטנות.

**תלוי ב:** `lesson_devops_deploy::container`

---

### 11. service

**רמת קושי:** 5/10

**מה זה:** ב-Compose, service הוא תהליך מוגדר כמו api, web או db עם image, ports, env ותלויות.

**למה Full Stack:** השם service מאפשר לתהליכים לדבר אחד עם השני לפי שם פנימי, לא לפי localhost של המחשב.

**דוגמה:**
```
services:
  api:
    depends_on: [db]
  db:
    image: postgres:16
```

**הסבר:** api ו-db הם services; api יכול לפנות ל-db בשם db ברשת של compose.

⚠️ **טעות נפוצה:** להשתמש ב-localhost מתוך container כדי להגיע ל-db שנמצא ב-container אחר.

**תלוי ב:** `lesson_devops_deploy::Docker Compose`

---

### 12. volume

**רמת קושי:** 5/10

**מה זה:** volume הוא אחסון שממשיך להתקיים מחוץ למחזור החיים של container.

**למה Full Stack:** Database או קבצים חשובים לא צריכים להימחק בכל הפעלה מחדש של container.

**דוגמה:**
```
volumes:
  db_data:

services:
  db:
    volumes: [db_data:/var/lib/postgresql/data]
```

**הסבר:** db_data מחזיק את נתוני Postgres מחוץ ל-container עצמו.

⚠️ **טעות נפוצה:** להריץ database בלי volume ואז לאבד נתונים כשה-container נמחק.

**תלוי ב:** `lesson_devops_deploy::service`

---

### 13. health check

**רמת קושי:** 5/10

**מה זה:** health check הוא endpoint או פקודה שמוודאים שה-service חי ומוכן לקבל עבודה.

**למה Full Stack:** שרת יכול להיות דלוק אבל לא מוכן. health check עוזר ל-CI, deploy ו-monitoring להבין מצב אמיתי.

**דוגמה:**
```
app.get('/health', (req, res) => res.json({ ok: true }));
```

**הסבר:** endpoint פשוט מחזיר שהשרת מגיב; בגרסה מתקדמת בודקים גם database ותלויות.

⚠️ **טעות נפוצה:** להחזיר ok תמיד גם כשה-database נפל, ואז להסתיר תקלה אמיתית.

**תלוי ב:** `lesson_17::Status Codes`

---

### 14. CI

**רמת קושי:** 5/10

**מה זה:** CI הוא תהליך אוטומטי שרץ על כל push/PR ומריץ install, lint, tests, build ו-validation.

**למה Full Stack:** CI מונע מצב שבו שינוי ששבר build או בדיקות נכנס ל-main.

**דוגמה:**
```
on: [push, pull_request]
jobs:
  validate:
    steps:
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
```

**הסבר:** GitHub Actions מריץ סדר פעולות קבוע כדי לאמת את הקוד.

⚠️ **טעות נפוצה:** להריץ CI רק אחרי merge במקום לפני merge.

**תלוי ב:** `lesson_tooling_git::GitHub workflow`

---

### 15. CD

**רמת קושי:** 5/10

**מה זה:** CD הוא תהליך שמפרסם גרסה אחרי שהבדיקות עוברות, בדרך כלל ל-preview או production לפי branch.

**למה Full Stack:** הוא מחבר quality gates ל-deploy כך שהמערכת לא תלויה בזיכרון ידני של מפתח.

**דוגמה:**
```
main branch -> CI green -> production deploy
```

**הסבר:** הכלל אומר שרק main שעבר בדיקות יכול להגיע ל-production.

⚠️ **טעות נפוצה:** לפרוס ידנית בלי קשר לתוצאות CI.

**תלוי ב:** `lesson_devops_deploy::CI`

---

### 16. smoke test

**רמת קושי:** 4/10

**מה זה:** smoke test הוא בדיקה קצרה שמוודאת שהמסכים/זרימות הקריטיות נפתחים בלי שגיאת runtime.

**למה Full Stack:** גם אם unit tests עוברים, משתמש עדיין יכול לפגוש מסך לבן. smoke test בודק את האפליקציה מבחוץ.

**דוגמה:**
```
open / -> assert title
open /login -> assert form
open /health -> assert ok
```

**הסבר:** בודקים מעט דברים קריטיים, מהר, אחרי build או deploy.

⚠️ **טעות נפוצה:** לקרוא ל-smoke test בדיקה מלאה. הוא שער מהיר, לא תחליף ל-E2E עמוק.

**תלוי ב:** `react_blueprint::Testing Strategies`

---

### 17. release checklist

**רמת קושי:** 4/10

**מה זה:** release checklist היא רשימת Go/No-Go לפני גרסה: tests, build, env, migrations, rollback ו-smoke.

**למה Full Stack:** Checklist מונע פרסום גרסה מתוך לחץ בלי לוודא את הדברים שידועים כשוברים production.

**דוגמה:**
```
Go only if: CI green, env configured, migrations reviewed, smoke passed, rollback known.
```

**הסבר:** ה-checklist מתרגם ניסיון תפעולי לשער קבוע לפני release.

⚠️ **טעות נפוצה:** לסמוך על זיכרון במקום checklist כתוב.

**תלוי ב:** `lesson_devops_deploy::production readiness`

---
