# LumenPortal — מיפוי חומר המבחן SVCollege FullStack & AI

> **המבחן הוא 70% מהציון הסופי. היעד: 100/100. כל נושא בקורס חייב לקבל 7-רמות הסבר + שאלות מספיקות.**

תאריך: 2026-04-27 · גרסה: 1.0
מקור: SVCollege FullStack & AI Course (32 שיעורים, 170 שעות אקדמיות + 300 שעות סטאז')

---

## 🎯 עקרון מנחה

**מה שלא נמצא ב-LumenPortal — לא יישאר בלי כיסוי. מה שכן נמצא — חייב 5+ MC, 3+ Fill, 2+ Trace, ולפחות 1 Bug Hunt + 1 Mini Build.**

---

## 📊 סטטוס מיפוי — נושא אחר נושא

### 🌐 1. יסודות האינטרנט / Web Foundations

| נושא | קיים ב-LumenPortal | פערים | פעולה |
|---|:-:|---|---|
| HTML בסיסי | ⏳ | אין שיעור ייעודי | **lesson_01.js חדש** — Tags, semantic, attributes, forms, tables |
| HTML + CSS intro | ⏳ | אין שיעור ייעודי | **lesson_02.js חדש** — selectors, box model, display, position |

### 🎨 2. עיצוב רספונסיבי ו-CSS מתקדם

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| CSS רספונסיבי | ⏳ | יש Tailwind בלבד (lesson_25) | **lesson_03.js חדש** — Media queries, mobile-first, fluid typography, vh/vw |
| CSS Grid & Flexbox | ⏳ | רק תוך Tailwind | **lesson_04.js חדש** — Grid systems, Flexbox alignment, gap, areas |

### ⚙️ 3. JavaScript בסיסי ודינמיקה בדפדפן

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| יסודות JavaScript | ✅ lesson_11, 12, 13, 19 | חזק | להוסיף 30 שאלות chunk |
| עבודה עם DOM ואירועים | חלקי lesson_13 | DOM API, addEventListener, delegation | **lesson_05.js חדש** — querySelector, addEventListener, bubble/capture, delegation |

### 🔧 4. JavaScript מודרני וכלי פיתוח

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| ES6 מתקדם | ✅ פזור ב-11, 15 | להאחד | **lesson_06.js חדש** — Spread, Rest, Optional Chaining, Nullish Coalescing, Modules |
| Git + ESLint + Prettier | ⏳ | לא קיים | **lesson_07.js חדש** — git basics, branches, PR flow, ESLint config, Prettier |

### 🖥 5. פיתוח צד-שרת בסיסי

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Node.js & npm | ✅ lesson_16 | טוב | להוסיף 15 שאלות |
| Express - REST + middleware | ✅ lesson_17, 18 | טוב | להוסיף Bug Hunt + Mini Build |

### 🗄 6. בסיסי נתונים ומידול מידע

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| MongoDB & Mongoose | ✅ lesson_20 | יש 34 boilerplate concepts לתקן | **D0.2** — להחליף תוכן boilerplate |
| PostgreSQL (Drizzle/Prisma) | ⏳ | לא קיים | **lesson_08.js חדש** — SQL basics, joins, schema, Drizzle ORM, Prisma |

### 🔐 7. אימות ואבטחה

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Auth בסיסי (JWT + Cookies) | ⏳ | רק אזכור ב-Express | **lesson_09.js חדש** — bcrypt, JWT, sessions, cookies, refresh tokens, OWASP top 10 |
| Auth providers (Supabase, Appwrite, Firebase) | ⏳ | לא קיים | **lesson_10.js חדש** — Supabase Auth flow, Magic link, Google OAuth, RLS basics |

### ⚛️ 8. React ופיתוח Frontend מתקדם

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| React Basics (Components, State) | ✅ lesson_21, 22 | חזק | תוספת trace + bug hunt |
| React Hooks & Context | ✅ lesson_24 (useEffect/useMemo/useRef) + lesson_23 (Context) | חזק | תוספת useReducer, useContext deep |
| React Router & Forms | ✅ lesson_23 (Router) | טפסים חסרים | **lesson_28.js חדש** — Forms with controlled inputs, react-hook-form, zod |

### 🦺 9. TypeScript ופטרנים מתקדמים ב-React

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| TypeScript בסיסי | ✅ lesson_26 | טוב | תוספת trace |
| TypeScript מתקדם + React | ✅ lesson_27 | טוב | להוסיף Generics ב-Hooks, Discriminated Unions |

### 🛠 10. תשתיות, DevOps ו-CI/CD

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Vercel + Docker | ⏳ | לא קיים | **lesson_29.js חדש** — Vercel deploy, env vars, Docker basics, Dockerfile, docker-compose |
| Clean Backend + Tests + Docker-Compose | ⏳ | לא קיים | **lesson_30.js חדש** — Layered architecture, Repository pattern, Jest/Vitest, supertest |

### 🔥 11. פיתוח Full-Stack עם Next.js

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Next.js (SSR) - מבוא | ⏳ | לא קיים | **lesson_31.js חדש** — App Router, file-based routing, layout, loading, error |
| Next.js מתקדם - API Routes, SEO | ⏳ | לא קיים | **lesson_32.js חדש** — Server Components, API Routes, metadata, sitemap, robots, OG |

### 🎨 12. מערכות עיצוב ו-UI מודרני

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Tailwind & shadcn/UI | ✅ Tailwind ב-lesson_25 | shadcn חסר | **lesson_33.js חדש** — shadcn/UI components, theming, customization, Radix primitives |

### ⚡ 13. Frameworks צד-שרת

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| Nest.js - Modules + DI | ⏳ | לא קיים | **lesson_34.js חדש** — Nest modules, providers, DI, controllers, decorators, guards |

### 🤖 14. AI למפתחים

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| יסודות AI למפתחים (Cursor, Windsurf) | ⏳ | רק אזכור ב-ai_development.js (boilerplate) | **lesson_35.js חדש** — Cursor agent mode, Windsurf cascade, prompt engineering, code review with AI |
| המשך AI (Bolt, תיעוד/טסטים) | ⏳ | לא קיים | **lesson_36.js חדש** — Bolt.new prototyping, AI for docs/comments, AI-generated tests, hallucination control |

### 🧠 15. הנדסת AI מעשית

| נושא | קיים | פערים | פעולה |
|---|:-:|---|---|
| מודלים, SDK (Vercel AI, OpenAI) | ⏳ | לא קיים | **lesson_37.js חדש** — Vercel AI SDK, OpenAI API, streaming, function calling, structured output |
| LangChain ו-RAG | ⏳ | לא קיים | **lesson_38.js חדש** — LangChain chains, RAG architecture, vector DBs, embeddings, Pinecone/Supabase pgvector |
| Agents ו-Fine-tuning | ⏳ | לא קיים | **lesson_39.js חדש** — Agent loops, ReAct pattern, tools, fine-tuning vs RAG, evaluation |

---

## 📈 סיכום פערי תוכן

| מצב | מספר נושאים | פעולה |
|---|:-:|---|
| ✅ קיים מלא | 11 | להגדיל מאגר שאלות (5 שאלות לשיעור) |
| 🟡 קיים חלקי | 4 | להעמיק/לתקן boilerplate |
| ⏳ חסר לגמרי | 16 | **16 שיעורים חדשים נדרשים** |

**סה"כ נושאים בקורס:** 31
**מכוסה היום:** 11 (35%) + 4 (חלקי) = ~15 (48%)
**יעד עד מבחן:** 31/31 (100%) עם 5+ שאלות לכל מושג

---

## 🚀 מסלול ביצוע מהיר ל-100% כיסוי מבחן

### שבוע 1-2 (Phase 0 + תחילת Curriculum):
- [x] D0.1 — difficulty ל-281 מושגים ✅
- [x] D0.3 — GitHub Actions ✅
- [ ] **NEW C0.1** — צור 5 שיעורים בסיסיים: lesson_01 (HTML), lesson_02 (CSS Intro), lesson_03 (Responsive), lesson_04 (Grid+Flexbox), lesson_05 (DOM)
- [ ] **NEW C0.2** — תקן 34 boilerplate ב-ai_development, react_blueprint, workbook (D0.2)

### שבוע 3-4:
- [ ] **NEW C0.3** — צור 5 שיעורי backend/auth: lesson_06 (ES6), lesson_07 (Git+Tools), lesson_08 (PostgreSQL), lesson_09 (Auth+JWT), lesson_10 (Auth Providers)
- [ ] להעמיק בכל המושגים שכבר קיימים — להוסיף "common mistakes" + "when not to use"

### שבוע 5-6:
- [ ] **NEW C0.4** — צור 5 שיעורי DevOps + Next.js: lesson_29 (Vercel/Docker), lesson_30 (Clean BE), lesson_31 (Next.js intro), lesson_32 (Next.js advanced), lesson_33 (shadcn)
- [ ] להוסיף Forms ב-lesson_28 + Nest.js ב-lesson_34

### שבוע 7-8:
- [ ] **NEW C0.5** — צור 5 שיעורי AI: lesson_35 (Cursor/Windsurf), lesson_36 (Bolt + AI helpers), lesson_37 (SDK), lesson_38 (LangChain/RAG), lesson_39 (Agents)
- [ ] **NEW C0.6** — Mock Exam מלא של הקורס (90 שאלות לפי המבנה הצפוי)

### שבוע 9-10:
- [ ] להוסיף 5 שאלות לכל מושג שעדיין מתחת לכמות
- [ ] להוסיף 100 trace + 50 bug hunt + 30 mini build (פנימי, מעל לתקנים שב-MASTER_PLAN_V4)

---

## 📝 פורמט שיעור חדש (Template)

כל שיעור חדש חייב לעמוד בכל הסעיפים הבאים:

```js
// data/lesson_XX.js
var LESSON_XX = {
  id: "lesson_XX",
  title: "שיעור XX — [נושא]",
  description: "[1-2 משפטים על מה התלמיד ילמד]",
  concepts: [
    {
      conceptName: "[שם המושג]",
      difficulty: 1-10,
      levels: {
        grandma: "[הסבר לסבתא]",
        child: "[הסבר לילד]",
        soldier: "[הסבר לחייל]",
        student: "[הסבר לסטודנט]",
        junior: "[הסבר ל-junior dev — סיפור אישי]",
        professor: "[הסבר אקדמי]"
      },
      illustration: "[ASCII art / diagram]",
      codeExample: "[קוד דוגמה רב-שורתי]",
      codeExplanation: "[מה הקוד עושה ב-2-3 משפטים]",
      // אופציונלי:
      commonMistakes: "[2-3 טעויות נפוצות]",
      whenNotToUse: "[מתי לא להשתמש]",
    },
    // ... כ-10-20 מושגים לשיעור
  ]
};
```

**Concept enrichment** (data/concept_enrichment.js) — חובה ל-מושגים בדרגת קושי 6+:
```js
"lesson_XX::ConceptName": {
  deepDive: "[800-1200 מילה]",
  analogies: ["[5 אנלוגיות מתחומים שונים]"],
  pitfalls: ["[3 פח-יקושים]"],
  realWorld: ["[3 דוגמאות אמיתיות מ-Wix/Monday/Apple]"],
}
```

**Questions per concept**:
- 5 MC ברמות 1-6
- 3 Fill ברמות 2-5
- 2 Trace
- 1 Bug Hunt (לרמות 4+)
- 1 Mini Build (לרמות 5+)

---

## 🎓 מה מבדיל את LumenPortal מספר לימוד רגיל

ספר/מצגת רגילים נותנים מידע ב-2 רמות (מתחיל / מתקדם).
**LumenPortal נותן 7 רמות + שאלות אדפטיביות + טרייסר + פירוק קוד + מבחן מדומה לכל מושג**.

**דוגמה — הנושא "JWT" במבחן:**
- ספר רגיל: "JWT הוא Token שמכיל header.payload.signature"
- LumenPortal:
  - **סבתא:** "כמו תעודת זהות שאי אפשר לזייף"
  - **חייל:** "מבנה JSON-encoded חתום"
  - **סטודנט:** "header.payload.signature, HS256/RS256, expiry"
  - **junior:** "פעם שמרתי JWT ב-localStorage, חטפתי XSS — עברתי ל-httpOnly cookie"
  - **פרופסור:** "Asymmetric vs symmetric, RFC 7519, claim types (aud, iss, exp)"
  - **Code Trace:** ראה כיצד זה נשבר עם token פג תוקף
  - **Bug Hunt:** מצא את ה-XSS בקוד
  - **Mini Build:** בנה login flow מלא

---

## ✅ הגדרת "מוכן למבחן"

תלמיד מוכן ל-100/100 כש:
1. **3 mock exams ברצף ≥ 95%** ב-LumenPortal Mock Exam Mode
2. **רמת מאסטר (7) על 80%+ מהמושגים** במפת הידע
3. **השלים 10 mini builds** מנושאים שונים
4. **Knowledge Map ירוק** ב-90%+

זהו ה-promise. זה מה שהמסמכים כאן מצהירים, ומה שה-MASTER_PLAN_V4 מתחייב לבנות.

---

## 📌 הערה: סטאז' (300 שעות)

ה-300 שעות סטאז' אינן בתחום LumenPortal — הם מקצועי-תעשייתי. אבל:
- LumenPortal יכול להציע **שיעור אופציונלי "החיבור החי"** (lesson_40) על:
  - איך לקבל סטאז' (קו"ח, LinkedIn)
  - מה לצפות ביום הראשון
  - איך לתקשר עם Senior dev
  - מבחני קוד נפוצים בראיון

הצעה: לבנות גם את זה אחרי השלמת 31 שיעורי הליבה.
