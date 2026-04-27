# 🗺️ LumenPortal — מפת אתר מסודרת

> **מטרה:** שדרוג ניווט מהיר. כל אגף, כל מסך, כל קובץ — מקושר.
> מתעדכן בכל commit שמוסיף מסך/feature.

---

## 1. 🧭 טאבים עליונים (top-tabs-bar)

| Tab | אייקון | מטרה | קוד |
|---|:-:|---|---|
| 🏠 שיעורים | בית | רשימת כל 20 השיעורים | [app.js:openLesson](app.js) |
| 📖 מדריך מקוצר | book | 22 נושאים מרכזיים + שאלון משולב | `openGuide()` |
| 💻 בלוקי קוד | laptop | קוד אמיתי + הסבר עברי לכל שורה + MC | `renderCodeBlocks()` |
| 🔬 Code Trace | microscope | חיזוי פלט קוד צעד-צעד (35 שאלות) | `renderTracePage()` |
| 🧠 מאמן ידע + דוח | brain | 1,894 שאלות אדפטיביות + דוח חי | `openTrainer()` |
| 🎯 לימוד מותאם | target | תור חולשות אוטומטי | `openStudyMode()` |
| 🗺️ מפת ידע | map | מצב שליטה לפי **נושא** או שיעור | `renderKnowledgeMap()` |
| 📐 פירוק קוד | ruler | פירוק קטעי קוד (עם filters) | `renderCodeAnatomyPage()` |

---

## 2. 🎛️ תפריטי שירות (גלובליים)

| Element | אייקון | מיקום | תפקיד |
|---|:-:|---|---|
| Theme Toggle | 🌗 | למעלה-שמאל | Light / Dark / Auto |
| Print to PDF | 📄 | למעלה-שמאל | שמירת מסך כ-PDF |
| **View Mode** | 👁️ | למעלה-שמאל | **טוגלים להסתרת חלקים + concept jumper + presets** |
| Sidebar Toggle | ☰ | מובייל | פתיחת sidebar |

---

## 3. 📚 שיעורים (LESSONS)

| ID | כותרת | נושא | קובץ | מושגים |
|---|---|---|---|---:|
| `lesson_11` | Arrays, Functions, Scope | 🟦 JS Foundations | [data/lesson11.js](data/lesson11.js) | ~28 |
| `lesson_12` | תרגול מתודות מערך | 🟦 JS Foundations | [data/lesson12.js](data/lesson12.js) | ~18 |
| `lesson_13` | Objects, DOM, Classes | 🟪 JS + DOM | [data/lesson13.js](data/lesson13.js) | ~32 |
| `lesson_15` | Errors, Closure, Async | 🧠 JS Advanced | [data/lesson15.js](data/lesson15.js) | ~24 |
| `lesson_16` | Node.js, npm, Modules | 🟫 Backend | [data/lesson16.js](data/lesson16.js) | ~27 |
| `lesson_17` | HTTP, Express, REST API | 🟫 Backend | [data/lesson17.js](data/lesson17.js) | ~32 |
| `lesson_18` | Express homework | 🟫 Backend | [data/lesson18.js](data/lesson18.js) | ~18 |
| `lesson_19` | חזרה וסיכום JS | 🟦 JS Foundations | [data/lesson19.js](data/lesson19.js) | ~42 |
| `lesson_20` | Database + MongoDB | 🟧 Database | [data/lesson20.js](data/lesson20.js) | ~30 |
| `lesson_21` | React Basics | ⚛️ React | [data/lesson21.js](data/lesson21.js) | ~28 |
| `lesson_22` | useState, Immutable State | ⚛️ React | [data/lesson22.js](data/lesson22.js) | ~26 |
| `lesson_23` | Router, Context | ⚛️ React | [data/lesson23.js](data/lesson23.js) | ~22 |
| `lesson_24` | useEffect, useMemo, useRef | 🪝 React Hooks | [data/lesson24.js](data/lesson24.js) | ~24 |
| `lesson_25` | Tailwind CSS + Project | 🎨 React Styling | [data/lesson25.js](data/lesson25.js) | ~28 |
| `lesson_26` | TypeScript Basics | 🔷 TypeScript | [data/lesson26.js](data/lesson26.js) | ~30 |
| `lesson_27` | Advanced TS Types | 🔷 TypeScript | [data/lesson27.js](data/lesson27.js) | ~24 |
| `lesson_closures` | Closures (deep) | 🧠 JS Advanced | [data/lesson_closures.js](data/lesson_closures.js) | ~12 |
| `workbook_taskmanager` | חוברת תרגול JS | 📝 JS Practice | [data/workbook_taskmanager.js](data/workbook_taskmanager.js) | ~12 |
| `ai_development` | AI Development | 🤖 AI | [data/ai_development.js](data/ai_development.js) | ~12 |
| `react_blueprint` | React Architecture | ⚛️ React Architecture | [data/react_blueprint.js](data/react_blueprint.js) | ~10 |

**סה"כ:** 20 modules · ~431 concepts

---

## 4. 🧱 ארכיטקטורת מושג (Concept Card)

כל מושג מציג (מלמעלה למטה):

1. **Header** — שם, רמה (1-7), badges, action buttons
2. **Explanation** — הסבר ברמה האדפטיבית
3. **Code Example** — קוד + 🚀 הרץ + 💬 הערות עברית
4. **Code Explanation** — הסבר תפקיד הקוד
5. **Deep Dive** — עומק טכני
6. **Extended Panel** — הסבר מורחב (עברית)
7. **Extras** — אנלוגיות (סבתא→פרופ׳)
8. **🧠 Mnemonic** — זכר-משנה (רק 9 concepts)
9. **🔁 Anti-Patterns** — דפוסי-נגד (8 concepts × multi)
10. **🐛 Bug Hunt** — באגים אינטראקטיביים (13 concepts)
11. **📚 War Stories** — סיפורי שטח (8 concepts)
12. **⚖️ Comparisons** — השוואות זוגות (6)
13. **🔊 Audio Mode** — TTS עברי
14. **Action Buttons** — ✓ V (ידוע), 🤔 לא ברור, 🚩 חלש, 🖼️ תרשים

---

## 5. 📦 קבצי תוכן (data/)

| קובץ | תכלית | משולב ב |
|---|---|---|
| `lesson*.js` (20) | מודולי שיעורים | core |
| `concept_enrichment.js` | deepDive + analogies (71 concepts) | concept card |
| `extended_explanations.js` | תוסף הסבר עברי | concept card |
| `code_blocks.js` | קוד interactive + שאלות MC | tab "💻 בלוקי קוד" |
| `quick_guide.js` | 22 נושאים + שאלון | tab "📖 מדריך מקוצר" |
| `glossary.js` | מילון מונחים | future popovers |
| `questions_bank.js` | 76 MC + 41 Fill (curated) | trainer |
| `questions_bank_seeded.js` | 1,264 MC + 513 Fill (lazy) | trainer (lazy) |
| `questions_trace.js` | 35 Code Trace | tab "🔬 Code Trace" |
| `questions_bug.js` | **14 Bug Hunts** | concept card "🐛" |
| `anti_patterns.js` | 22 anti-patterns × 8 concepts | concept card "🔁" |
| `mnemonics.js` | 9 מנמוניקה עברית | concept card "🧠" |
| `war_stories.js` | סיפורי שטח (8 concepts) | concept card "📚" |
| `comparisons.js` | השוואות (6 pairs) | concept card "⚖️" |

---

## 6. 🧰 ספריות (lib/)

| קובץ | תכלית |
|---|---|
| `lib/rng.js` | Mulberry32 PRNG (seeded, deterministic) |
| `lib/srs.js` | SM-2 Spaced Repetition (createState, update, isDue) |
| `lib/code-runner.js` | iframe sandbox JS executor (5s timeout) |

---

## 7. 🛠️ Scripts (scripts/)

| קובץ | פקודה | תכלית |
|---|---|---|
| `validate_bank.js` | `node scripts/validate_bank.js --strict` | ולידציית כל ה-data files |
| `seed_questions.js` | `node scripts/seed_questions.js` | יצירת questions_bank_seeded.js |

---

## 8. ✅ Tests (tests/)

| קובץ | מספר tests | מטרה |
|---|---:|---|
| `tests/rng.test.js` | 13 | RNG determinism |
| `tests/srs.test.js` | 8 | SRS algorithm |
| `tests/scoring.test.js` | 17 | adaptive scoring rules |

**סה"כ:** 38/38 ✅

---

## 9. 📋 קבצי ניהול שורש

| קובץ | תכלית |
|---|---|
| [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md) | איפיון V5.1 (2,580 שורות) — 12 שיטות יצירה |
| [EXECUTION_TASKS.md](EXECUTION_TASKS.md) | 209+ משימות עם V/[ ] |
| [PROMPTS_PHASE2.md](PROMPTS_PHASE2.md) | פרומפטים ל-Track E/F/G/H |
| [SITE_MAP.md](SITE_MAP.md) | מסמך זה |

---

## 10. 🔀 Branches (Git)

| Branch | תכלית |
|---|---|
| `main` | יציב — לא דוחפים ישירות |
| `integration/a-b-c-merge` | אינטגרציית tracks A+B+C ועדכונים שוטפים |
| `feature/creative-explanations` | סשן הראשי הנוכחי |
| `feature/track-e-mock-exam` | Track E parallel session |
| `feature/track-f-traces` | Track F parallel session (50 traces) |
| `feature/track-g-sprint2` | Track G parallel session |
| `feature/track-h-sprint3` | Track H parallel session |

---

## 11. 🔑 Storage Keys (localStorage)

| Key | תוכן |
|---|---|
| `lumenportal:scores:v1` | ציוני concepts (level 1-7) |
| `lumenportal:masteryStates:v1` | new/learning/review/mastered/at-risk |
| `lumenportal:srs:v1` | SRS state {ease, interval, due, reps} |
| `lumenportal:weakness:v1` | רשימת חולשות |
| `lumenportal:viewMode:v1` | מצב toggles של View Mode |
| `lumenportal:kmGroupBy:v1` | "topic" \| "lesson" |
| `lumenportal:theme:v1` | "auto" \| "light" \| "dark" |
| `lumenportal:codeblock_state:v1` | מצב בלוקי קוד |
| `lumenportal:examHistory:v1` | היסטוריית Mock Exam (עתידי) |

---

## 12. 🎯 מסלולים מומלצים לפי כוונה

### "אני רוצה ללמוד שיעור 12 בלי הפרעות"
1. 👁️ View Mode → preset "📚 רק מושגים"
2. סיידבר → שיעור 12

### "אני רוצה לתרגל לפני בחינה"
1. 🧠 מאמן ידע (חימום 30 דק')
2. 🎯 לימוד מותאם (סגירת חולשות)
3. 🔬 Code Trace (lessons 21-27 = 35 שאלות)
4. 🐛 ציד באגים (14 React bugs)

### "אני רוצה לראות איפה אני חזק/חלש"
1. 🗺️ מפת ידע → קבץ לפי נושא
2. ראה ציון A-F לכל נושא
3. הנושאים החלשים מופיעים ראשונים

### "אני רוצה לראות רק קוד של מושג ספציפי"
1. 📐 פירוק קוד
2. סנן לפי שיעור / נושא / מושג

---

**עדכון אחרון:** 2026-04-28
