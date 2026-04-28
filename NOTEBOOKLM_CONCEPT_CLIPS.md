# LumenPortal — משימות וסקריפטים לקליפי מושג ב-NotebookLM

עודכן: 2026-04-28  
מטרה: להכין קליפים קצרים לכל "קליפ מושג" שמופיע בכרטיסי המושגים, ובינתיים להציג קישורי וידאו חיצוניים מאומתים עד שיהיו קליפים מקוריים.

מקורות שימושיים:
- NotebookLM Video Overviews — עמוד עזרה רשמי: https://support.google.com/notebooklm/answer/16454555?hl=en
- עדכון Google על Video Overviews ו-Studio: https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/
- קובץ הנתונים באפליקציה: `data/concept_videos.js`

---

## 1. רשימת משימות הפקה

- [ ] לפתוח NotebookLM חדש בשם `LumenPortal Concept Clips`.
- [ ] להעלות לכל מושג מקור נקי: טקסט כרטיס המושג, קטעי הקוד, והסטוריבורד מתוך `data/concept_videos.js`.
- [ ] ליצור `Video Overview` אחד לכל מושג, לא וידאו אחד לכל הקורס.
- [ ] לבחור הגדרות אחידות לכל הקליפים:
  - שפה: עברית.
  - אורך/פורמט: `Brief` אם המטרה היא 60-90 שניות; אם התוצר דל מדי, להריץ שוב עם `Explainer`.
  - סגנון חזותי: `Whiteboard` או סגנון פשוט אחר שמופיע אצלך בממשק. אם אין אפשרות סגנון, להשאיר ברירת מחדל.
  - Steering / Custom instructions: להשתמש בסקריפט של המושג למטה.
  - Sources: להפעיל רק את המקורות של אותו מושג, כדי לא לערבב מושגים.
- [ ] לבדוק שכל קליפ עומד בדרישות:
  - 60-90 שניות.
  - עברית ברורה, בלי פתיח שיווקי.
  - הקוד תואם לקורס ולא מוסיף API שלא מופיע בחומר.
  - אין שימוש בנתונים מומצאים.
  - אין שימוש ב-API רנדומלי מובנה ליצירת דוגמאות.
  - הכתוביות קריאות במובייל.
  - יש משפט סיכום אחד בסוף: "מה לזכור למבחן".
- [ ] לייצא או לשמור קישור לכל וידאו בשם קובץ דטרמיניסטי:
  - `lesson_22__useState__notebooklm_v1.mp4`
  - `lesson_24__useEffect__notebooklm_v1.mp4`
  - `lesson_22__immutable__notebooklm_v1.mp4`
  - `lesson_21__JSX__notebooklm_v1.mp4`
  - `lesson_23__Router__notebooklm_v1.mp4`
  - `lesson_12__map__notebooklm_v1.mp4`
  - `lesson_15__Promise__notebooklm_v1.mp4`
  - `lesson_17__REST_API__notebooklm_v1.mp4`
  - `lesson_24__dependency_array__notebooklm_v1.mp4`
  - `lesson_22__controlled_input__notebooklm_v1.mp4`
- [ ] אחרי שהקליפים מוכנים: להחליף את קישורי ה-fallback ב-`data/concept_videos.js` בקישורי הקליפים המקוריים או להוסיף נגן MP4 מקומי בפאנל `renderConceptVideoPanel`.

---

## 2. Prompt בסיסי לכל קליפ

הדבק את זה ב-Steering / Custom instructions, ואז הוסף את הסקריפט הספציפי של המושג:

```text
צור Video Overview קצר בעברית עבור תלמיד Full-Stack בתחילת הדרך.
הסגנון צריך להיות לימודי, רגוע, מדויק, בלי בדיחות פנימיות ובלי פתיח שיווקי.
אורך יעד: 60-90 שניות.
מבנה חובה:
1. משפט פתיחה אחד שמגדיר את הבעיה.
2. 4 סצנות קצרות לפי הסקריפט.
3. בכל סצנה: דימוי חזותי פשוט, משפט הסבר, וקוד קצר אם יש.
4. לסיים במשפט "מה לזכור למבחן".
אל תוסיף API, ספריות, נתונים או עובדות שלא מופיעים במקור.
אל תמציא תאריכים, גרסאות או קישורים.
```

---

## 3. סקריפטים לפי מושג

### 3.1 `lesson_22::useState`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: Whiteboard / simple diagram.
- Sources: רק כרטיס `useState` וקוד הדוגמה שלו.

סקריפט:

```text
כותרת: useState — מהלחיצה ועד render חדש
מטרה: להראות ש-state הוא snapshot, וה-setter מבקש מ-React render חדש.

סצנה 1 — render ראשון:
חזותית: Component -> useState(0) -> count = 0.
קריינות: React מריץ את הקומפוננטה ופותח תא זיכרון פנימי לערך count.
קוד: const [count, setCount] = useState(0);

סצנה 2 — אירוע משתמש:
חזותית: click -> setCount -> update queued.
קריינות: הלחיצה לא משנה את המשתנה ביד; היא שולחת ל-React בקשת עדכון.
קוד: onClick={() => setCount(count + 1)}

סצנה 3 — React מרנדר שוב:
חזותית: queued value -> render #2 -> count = 1.
קריינות: React מריץ את הקומפוננטה מחדש ומחזיר את הערך המעודכן.

סצנה 4 — UI מתעדכן:
חזותית: virtual tree -> diff -> DOM patch.
קריינות: React משווה תוצאה חדשה לקודמת ומעדכן רק את מה שצריך.
מה לזכור למבחן: setter מפעיל render חדש; המשתנה בתוך render הנוכחי לא משתנה במקום.
```

Fallback זמני: https://www.youtube.com/watch?v=rsqSAoOFmMI

### 3.2 `lesson_24::useEffect`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: Whiteboard / flow diagram.
- Sources: כרטיס `useEffect`, דוגמאות fetch/listener/cleanup.

סקריפט:

```text
כותרת: useEffect — אחרי שהמסך מוכן
מטרה: להפריד בין render נקי לבין עבודה חיצונית.

סצנה 1 — קודם מציירים:
חזותית: render -> commit -> DOM ready.
קריינות: React קודם מסיים לחשב ולחבר את ה-UI, ורק אחר כך מריץ את האפקט.

סצנה 2 — עבודה חיצונית:
חזותית: DOM ready -> effect -> fetch/listener.
קריינות: אפקט מתאים לפעולות שמדברות עם העולם שמחוץ ל-React.
קוד: useEffect(() => { loadUser(userId); }, [userId]);

סצנה 3 — deps מחליטים מתי:
חזותית: [userId] -> compare -> run / skip.
קריינות: מערך התלויות אומר ל-React איזה שינוי מצדיק הרצה נוספת.

סצנה 4 — cleanup:
חזותית: old effect -> cleanup -> new effect.
קריינות: cleanup סוגר עבודה קודמת לפני אפקט חדש או unmount.
קוד: return () => controller.abort();
מה לזכור למבחן: useEffect קורה אחרי render ונועד לסנכרון עם העולם החיצוני.
```

Fallback זמני: https://www.youtube.com/watch?v=QQYeipc_cik

### 3.3 `lesson_22::immutable`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: two boxes / before-after references.
- Sources: כרטיס Immutable State ודוגמת arrays/objects ב-React.

סקריפט:

```text
כותרת: Immutable State — הפניה חדשה במקום שינוי במקום
מטרה: להבין למה React צריך אובייקט או מערך חדש כדי לזהות שינוי.

סצנה 1 — state ישן:
חזותית: todos ref A -> current state -> UI.
קריינות: ה-state הנוכחי הוא snapshot עם הפניה קיימת.

סצנה 2 — מוטציה מבלבלת:
חזותית: ref A -> push() -> same ref A.
קריינות: push משנה את אותו מערך, ולכן ההפניה נשארת זהה.
קוד: todos.push(newTodo); setTodos(todos);

סצנה 3 — עותק חדש:
חזותית: ref A -> spread -> ref B.
קריינות: spread יוצר מערך חדש שמכיל את הישן ואת הפריט החדש.
קוד: setTodos([...todos, newTodo]);

סצנה 4 — React מזהה:
חזותית: ref A -> compare -> ref B changed.
קריינות: הפניה חדשה מאפשרת ל-React לזהות שינוי ולצייר מחדש.
מה לזכור למבחן: לא משנים state במקום; יוצרים עותק חדש.
```

Fallback זמני: https://www.youtube.com/watch?v=uedgForV5GM

### 3.4 `lesson_21::JSX`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: code-to-tree.
- Sources: כרטיס JSX, דוגמת JSX, ודוגמת conditional rendering.

סקריפט:

```text
כותרת: JSX — תחביר שנראה כמו HTML אבל הוא JavaScript
מטרה: לעקוב אחרי המעבר מ-JSX לעץ React.

סצנה 1 — כותבים markup:
חזותית: <h1> -> {name} -> </h1>.
קריינות: JSX מאפשר לכתוב מבנה UI בצורה קריאה בתוך קובץ JavaScript.
קוד: <h1>Hello {name}</h1>

סצנה 2 — build מתרגם:
חזותית: JSX -> transform -> React element.
קריינות: כלי הבנייה מתרגם JSX לאובייקטי React element.

סצנה 3 — עץ UI:
חזותית: elements -> tree -> diff target.
קריינות: React מקבל עץ תיאורי של המסך ומחליט מה השתנה.

סצנה 4 — עדכון נקודתי:
חזותית: old tree -> diff -> DOM update.
קריינות: תנאים ורשימות ב-JSX הם ביטויי JavaScript רגילים.
מה לזכור למבחן: JSX מתאר UI; הוא לא HTML שהדפדפן מריץ ישירות.
```

Fallback זמני: https://www.youtube.com/watch?v=FO4couzuJIk

### 3.5 `lesson_23::Router`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: URL-to-screen flow.
- Sources: כרטיס React Router, דוגמת Routes, Link, useParams.

סקריפט:

```text
כותרת: React Router — URL שמחליף מסך בלי reload מלא
מטרה: להבין איך path נוכחי הופך לקומפוננטה מוצגת.

סצנה 1 — המשתמש בוחר קישור:
חזותית: Link -> history -> /posts.
קריינות: Link מעדכן את הכתובת בלי לטעון מחדש את כל הדף.
קוד: <Link to="/posts">Posts</Link>

סצנה 2 — Routes מחפש התאמה:
חזותית: /posts -> match -> Route.
קריינות: Routes בוחר את ה-Route שה-path שלו מתאים.
קוד: <Route path="/posts" element={<Posts />} />

סצנה 3 — קומפוננטה מתחלפת:
חזותית: old screen -> swap -> <Posts />.
קריינות: רק אזור התוכן הרלוונטי מתחלף; האפליקציה ממשיכה לרוץ.

סצנה 4 — ניווט פרמטרי:
חזותית: /posts/42 -> :id -> useParams.
קריינות: פרמטרים בכתובת מאפשרים מסך לפי מזהה.
מה לזכור למבחן: Router ממפה URL לקומפוננטה ושומר ניווט מהיר בתוך SPA.
```

Fallback זמני: https://www.youtube.com/watch?v=4NpGzBEySvI

### 3.6 `lesson_12::map`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: input array to output array.
- Sources: כרטיס `map`, דוגמאות מערכים, דוגמת list rendering ב-React.

סקריפט:

```text
כותרת: map — מערך נכנס, מערך חדש יוצא
מטרה: להבחין בין מעבר על פריטים לבין החזרת ערך חדש לכל פריט.

סצנה 1 — מערך מקור:
חזותית: [1, 2, 3] -> input -> same order.
קריינות: map מתחיל ממערך קיים ושומר על סדר הפריטים.

סצנה 2 — callback לכל פריט:
חזותית: item -> callback -> return value.
קריינות: הפונקציה מקבלת פריט ומחזירה גרסה חדשה שלו.
קוד: nums.map((n) => n * 2);

סצנה 3 — מערך חדש:
חזותית: [1,2,3] -> map -> [2,4,6].
קריינות: התוצאה היא מערך חדש באותו אורך.

סצנה 4 — React list:
חזותית: items -> map JSX -> <li key>.
קריינות: ב-React משתמשים ב-map כדי להפוך נתונים לרשימת אלמנטים.
מה לזכור למבחן: map מתאים להמרה; callback חייב להחזיר ערך.
```

Fallback זמני: https://www.youtube.com/watch?v=xNQH1NbZQ0E

### 3.7 `lesson_15::Promise`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: state machine.
- Sources: כרטיס Promise ודוגמאות then/catch/async-await.

סקריפט:

```text
כותרת: Promise — תוצאה עתידית עם שלושה מצבים
מטרה: לראות איך pending הופך להצלחה או כישלון וממשיך ל-handler מתאים.

סצנה 1 — עבודה התחילה:
חזותית: async task -> Promise -> pending.
קריינות: Promise מייצג עבודה שעוד לא הסתיימה.

סצנה 2 — הצלחה:
חזותית: pending -> resolve -> then.
קריינות: אם העבודה הצליחה, הערך מגיע ל-then.
קוד: request.then((res) => res.json());

סצנה 3 — כישלון:
חזותית: pending -> reject -> catch.
קריינות: אם העבודה נכשלה, המסלול עובר ל-catch.

סצנה 4 — async/await:
חזותית: Promise -> await -> value.
קריינות: await מחכה ל-Promise ומחזיר ערך או זורק שגיאה ל-try/catch.
מה לזכור למבחן: Promise הוא חוזה על תוצאה עתידית; צריך לטפל גם בהצלחה וגם בכישלון.
```

Fallback זמני: https://www.youtube.com/watch?v=Xs1EMmBLpn4

### 3.8 `lesson_17::REST API`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: client-server route flow.
- Sources: כרטיס REST API, דוגמת Express route, דוגמת JSON response.

סקריפט:

```text
כותרת: REST API — בקשה, route, תגובה
מטרה: לעבור על הדרך מלקוח שמבקש resource ועד JSON שחוזר עם status.

סצנה 1 — לקוח מבקש resource:
חזותית: client -> GET /tasks -> server.
קריינות: הלקוח שולח בקשת HTTP לכתובת שמייצגת resource.

סצנה 2 — שרת מוצא route:
חזותית: Express -> route match -> handler.
קריינות: השרת מחפש route מתאים ומפעיל handler.
קוד: app.get(routePath, handler);

סצנה 3 — handler עובד:
חזותית: handler -> read data -> result.
קריינות: ה-handler בודק קלט, ניגש למידע ומכין תגובה.

סצנה 4 — תגובה חוזרת:
חזותית: server -> status + JSON -> client.
קריינות: הלקוח מקבל status ו-body ומחליט איך לעדכן את ה-UI.
מה לזכור למבחן: method מתאר פעולה, URL מתאר resource, status מתאר תוצאה.
```

Fallback זמני: https://www.youtube.com/watch?v=lsMQRaeKNDk

### 3.9 `lesson_24::dependency array`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: dependency checklist.
- Sources: כרטיס dependency array, דוגמאות useEffect עם deps ו-cleanup.

סקריפט:

```text
כותרת: Dependency Array — רשימת הסיבות להריץ אפקט
מטרה: להבין איך React מחליט להריץ, לדלג או לנקות אפקט לפי תלות.

סצנה 1 — ערכים שנקראים באפקט:
חזותית: effect body -> reads -> userId.
קריינות: כל ערך חיצוני שהאפקט קורא עשוי להשפיע על התוצאה שלו.

סצנה 2 — השוואה בין renders:
חזותית: old deps -> compare -> new deps.
קריינות: React משווה את ערכי התלויות מהרינדור הקודם לרינדור הנוכחי.

סצנה 3 — דילוג כשאין שינוי:
חזותית: same deps -> skip -> effect idle.
קריינות: אם התלויות זהות, React מדלג על האפקט כדי לא לעשות עבודה מיותרת.

סצנה 4 — cleanup לפני חדש:
חזותית: changed deps -> cleanup -> rerun effect.
קריינות: כאשר תלות משתנה, cleanup של האפקט הישן רץ לפני האפקט החדש.
מה לזכור למבחן: deps הם חוזה הנכונות של האפקט; הם לא טריק לביצועים בלבד.
```

Fallback זמני: https://www.youtube.com/watch?v=QQYeipc_cik

### 3.10 `lesson_22::controlled input`

הגדרות NotebookLM:
- Language: Hebrew.
- Format: Brief.
- Visual style: loop diagram.
- Sources: כרטיס Controlled Input ודוגמת form state.

סקריפט:

```text
כותרת: Controlled Input — השדה מקבל ערך מ-state
מטרה: לראות איך הקלדה עוברת דרך onChange וחוזרת לשדה דרך value.

סצנה 1 — state מחזיק את הערך:
חזותית: state -> value -> <input>.
קריינות: השדה לא מחזיק מקור אמת עצמאי; הערך מגיע מה-state.

סצנה 2 — המשתמש מקליד:
חזותית: typing -> onChange -> event.target.value.
קריינות: כל הקלדה מפעילה onChange עם הערך החדש מהאירוע.
קוד: onChange={(e) => setName(e.target.value)}

סצנה 3 — state מתעדכן:
חזותית: setName -> render -> value updated.
קריינות: React מרנדר שוב, והערך המעודכן חוזר ל-input דרך prop value.

סצנה 4 — טופס נשלט:
חזותית: state object -> validate -> submit.
קריינות: כאשר הערכים ב-state, קל לבצע ולידציה, איפוס ושליחה.
מה לזכור למבחן: Controlled input הוא מעגל input -> state -> input.
```

Fallback זמני: https://www.youtube.com/watch?v=IkMND33x0qQ

---

## 4. קישורי וידאו זמניים שהוכנסו לאפליקציה

כל הקישורים נבדקו מול YouTube oEmbed בתאריך 2026-04-28.

| מושג | קישור זמני | מקור |
|---|---|---|
| useState | https://www.youtube.com/watch?v=rsqSAoOFmMI | YouTube — Web Dev Cody |
| useEffect | https://www.youtube.com/watch?v=QQYeipc_cik | YouTube — Lama Dev |
| Immutable State | https://www.youtube.com/watch?v=uedgForV5GM | YouTube — Web Dev Cody |
| JSX | https://www.youtube.com/watch?v=FO4couzuJIk | YouTube — Harry Wolff |
| React Router | https://www.youtube.com/watch?v=4NpGzBEySvI | YouTube — Leigh Halliday |
| map | https://www.youtube.com/watch?v=xNQH1NbZQ0E | YouTube — Bro Code |
| Promise | https://www.youtube.com/watch?v=Xs1EMmBLpn4 | YouTube — Lydia Hallie |
| REST API | https://www.youtube.com/watch?v=lsMQRaeKNDk | YouTube — IBM Technology |
| Dependency Array | https://www.youtube.com/watch?v=QQYeipc_cik | YouTube — Lama Dev |
| Controlled Input | https://www.youtube.com/watch?v=IkMND33x0qQ | YouTube — Net Ninja |

---

## 5. קריטריוני סיום

- [ ] לכל מושג יש קובץ/קישור קליפ מקורי.
- [ ] כל קליפ עבר צפייה מלאה במובייל ובדסקטופ.
- [ ] אין טקסט שנחתך בפריימים או בכתוביות.
- [ ] אין דוגמה שמוסיפה מושג חדש בלי להסביר אותו.
- [ ] הקליפ תואם לסקריפט, לא מחליף אותו בהסבר כללי.
- [ ] הקישור הסופי עודכן ב-`data/concept_videos.js`.
- [ ] Service Worker עודכן אם השתנה asset שנדרש לאופליין.
