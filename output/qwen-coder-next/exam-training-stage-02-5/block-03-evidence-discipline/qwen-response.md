```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>תרגול אכיפת הוכחות - Stage 3</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      direction: rtl;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: right;
    }
    th {
      background-color: #34495e;
      color: white;
      position: sticky;
      top: 0;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .source-backed { background-color: #d4edda; color: #155724; }
    .inferred { background-color: #fff3cd; color: #856404; }
    .weak { background-color: #fce4ec; color: #721c24; }
    .false { background-color: #f8d7da; color: #721c24; }
    .unknown { background-color: #e2e3e5; color: #383d41; }
    .qwen-safe {
      font-style: italic;
      font-size: 0.9em;
      color: #555;
    }
    .policy-box {
      background-color: #e7f3fe;
      border-left: 5px solid #2196F3;
      padding: 15px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>תרגול אכיפת הוכחות: תיקון טענות מוטות סמוך</h1>
  <p>תרגול זה בודק יכולת זיהוי של טענות לא מושענות או חסרות הוכחה. כל טענה מוקלדת כ-<code>claim</code> ואחריה דירוג לפי הסדר: <strong>מושען ממקור</strong>, <strong>הסקה</strong>, <strong>הוכחה חלשה</strong>, <strong>שגוי</strong>, או <strong>לא ידוע/לא זמין</strong>.</p>
  
  <table>
    <thead>
      <tr>
        <th>מזהה</th>
        <th>claim</th>
        <th>דירוג הוכחות</th>
        <th>ניסוח בטוח ל-Qwen (עתיד)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><code>cors()</code> חייב להופיע לפני <code>express.json()</code> ב-Express</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" согласно התבנית הרשמית (Backend Template, lines 3-4), `cors()` חייב להיות *לפני* `express.json()`."</td>
      </tr>
      <tr>
        <td>2</td>
        <td><code>localStorage</code> מומלץ לשימור tokens ב-SPA</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - לא מוזכר בחומר המותר (Allowed Prep). אסורה כל אominion להצעה זו."</td>
      </tr>
      <tr>
        <td>3</td>
        <td><code>BrowserRouter</code> הוא ה-routing היחידי אפשרי ב-React Router</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - השם המדויק הוא `BrowserRouter` (אינו מוחלף). לא מומלץ על alternatives."</td>
      </tr>
      <tr>
        <td>4</td>
        <td><code>VITE_API_URL</code> הוא משתנה environment שחייב להיות מוגדר</td>
        <td class="inferred">הסקה</td>
        <td class="qwen-safe">"`import.meta.env.VITE_API_URL` מוזכר ב-frontend template. אם חסר - ניחא ב-[not found in source]."</td>
      </tr>
      <tr>
        <td>5</td>
        <td>ה-validation של confirm Password יכול להתבצע רק ב-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" согласно SV Appointments Checklist – 'Dual-side validation', Validation *חייב* להיות גם ב-backend."</td>
      </tr>
      <tr>
        <td>6</td>
        <td>ה-status code 404 מוצג כשאובדן אובייקט ב-MongoDB</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" согласno Master Source – Status Codes, `404` הוא ל-[not found], `400` ל-[validation]."</td>
      </tr>
      <tr>
        <td>7</td>
        <td>regex ל-username הוא /^[a-zA-Z]+$/
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מציין `/^[a-z]+$/` (אותיות קטנות *רק*). כל other regex שגוי."</td>
      </tr>
      <tr>
        <td>8</td>
        <td><code>type guard</code> ב-TypeScript חייב להשתמש ב-syntax <code>obj is T</code></td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" TypeScript Checklist – 'Type Guards for Filters' מחייב `obj is T` (אסור `obj: T`)."</td>
      </tr>
      <tr>
        <td>9</td>
        <td>ה-spinner (loading) הוא חובה לחוית משתמש</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">"*not found in source* - לא חובה (לפי RUBRIC, עדיפות ל-[functionality] על [UX])."</td>
      </tr>
      <tr>
        <td>10</td>
        <td>ה-cors middleware מוצב אחרי ה-routes</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template מראה את `app.use(cors())` *לפני* ה-[routes]."</td>
      </tr>
      <tr>
        <td>11</td>
        <td>ה-state mutation מותרת אם היא פנימית לקומפוננטה</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Cleanup Notes ממחיש: *אסור* mutation of state. תמיד `setItems([...items, item])`."</td>
      </tr>
      <tr>
        <td>12</td>
        <td><code>Array.isArray</code> היא דרך מומלצת לבדוק קלט ב-JS</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" JS Checklist – 'Validation Patterns' מחייב `Array.isArray`_before processing."</td>
      </tr>
      <tr>
        <td>13</td>
        <td>ה-email validation חייב regex מתקדם</td>
        <td class="unknown">לא ידוע/לא זמין</td>
        <td class="qwen-safe">"*not found in source* - email validation *אינה* regex. ב-backend: `includes('@')`."</td>
      </tr>
      <tr>
        <td>14</td>
        <td>ה-backend חייב לספק 201 ל-POST מוצלח</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" Master Source – Status Codes: `201` ל-[created], `200` ל-[success]."</td>
      </tr>
      <tr>
        <td>15</td>
        <td><code>Partial<Entity></code> הופך את כל השדות לאופציונליים</td>
        <td class="source-backed">מושען ממקור</td>
        <td class="qwen-safe">" Master Source – TypeScript, Section 7: `Partial<Entity>` → כל השדות become optional."</td>
      </tr>
      <tr>
        <td>16</td>
        <td>ה-regex ל-name הוא /^[a-z]+$/</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מציין `/^[a-zA-Z]+( [a-zA-Z]+)*$/` (uppercase * Allowed, space * between words)."</td>
      </tr>
      <tr>
        <td>17</td>
        <td>ה-enum validation יכול להתבצע רק ב-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Master Source + SV Appointments Checklist: enum validation *חייב* backend."</td>
      </tr>
      <tr>
        <td>18</td>
        <td><code>useParams</code> משמש לאחזור ערכים מה-query string</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source ממחיש `useParams` ל-[route params] (למשל /:id). ל-[query string] יש `URLSearchParams`."</td>
      </tr>
      <tr>
        <td>19</td>
        <td>ה-type guard ב-TypeScript יכול להיות פשוט <code>typeof</code></td>
        <td class="unknown">לא ידוע/לא זמין</td>
        <td class="qwen-safe">"*not found in source* - Type Guard (obj is T) ≠ Type Assertion (obj as T)."</td>
      </tr>
      <tr>
        <td>20</td>
        <td>ה-cors middleware מוצב אחרי express.static()</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template order: cors → express.json() → express.static() → routes."</td>
      </tr>
      <tr>
        <td>21</td>
        <td>ה-validation של username כולל בדיקת אורך מינימלי</td>
        <td class="inferred">הסקה</td>
        <td class="qwen-safe">" Source מציין `/^[a-z]+$/` (אורך 1+). אם דרישה מפרטת 3+ - זה *bonus*."</td>
      </tr>
      <tr>
        <td>22</td>
        <td>ה-error handling ב-backend חייב להחזיר 500 בכל מקרה</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source מחלק: `400` ל-[validation error], `500` ל-[server error]."</td>
      </tr>
      <tr>
        <td>23</td>
        <td>ה-regex ל-password הוא /^[a-zA-Z0-9!@#$%^&*]+$/
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Source לא מציין regex בודד. מפורט: `8-20 chars`, uppercase, digit, special char."</td>
      </tr>
      <tr>
        <td>24</td>
        <td>ה-backend יכול לסמוך על ה-validation של ה-frontend</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Dual-side validation *חייבת* – backend חייב לאמת *בכל* מקרה."</td>
      </tr>
      <tr>
        <td>25</td>
        <td>ה-routes ב-express doivent להיות מוצבים לפני express.json()</td>
        <td class="false">שגוי</td>
        <td class="qwen-safe">" Backend Template: middleware order is `cors` → `json` → `static` → `routes`."</td>
      </tr>
    </tbody>
  </table>

  <div class="policy-box">
    <h2>מדיניות מעבר - Stage 3 Backend CRUD</h2>
    <p><strong>Policy Qwen must enforce for all Stage 3 tasks:</strong></p>
    <ul>
      <li><strong>1. Source-backed only:</strong> כל claim חייב להופיע במصدر (Checklist, Template, Simulation). אם לא – `not found in source`.</li>
      <li><strong>2. Validation order:</strong> validation *תמיד* ב-backend. אסורה אמונה ב-frontend.</li>
      <li><strong>3. Regex:</strong> רק regex *מפורש* במصدر. אם לא מופיע – `not found in source`.</li>
      <li><strong>4. Type guards:</strong> syntax * חייב* להיות `obj is T`.</li>
      <li><strong>5. Status codes:</strong> `400` validation, `404` not found, `201` created. שגיאה.</li>
      <li><strong>6. Forbidden:</strong> לא מומלץ `localStorage`, `error boundaries`, `state mutation`.</li>
      <li><strong>7. No overconfidence:</strong> אם לא מודגם במבחנים – לא ניסוח.</li>
    </ul>
    <p><strong>Policy violation penalty:</strong> `0%` + הערה: *not found in source*.</p>
  </div>

  <p style="text-align: center; margin-top: 30px; color: #666;">
    Qwen3-Coder-Next – Evidence Discipline Drill complete. Stage 3 ready.
  </p>
</body>
</html>
```

