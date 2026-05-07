| סעיף | סולק | ניסוחי הדין המדויק הנפרץ | תיקון |
|-----|-----|------------------------|--------|
| 1 | כשלון חמור | **תלויות מותרות רק: express, cors, mongoose.** adding dotenv violates "Dependencies only: express, cors, mongoose". | הסר dotenv מ-`package.json`; אם נחוץ – לתחזק without external env loading (e.g., inline defaults or `process.env` only if provided by runtime). |
| 3 | כשלון חמור | **Endpoints מותרים רק: GET /api/books, GET /api/books/:id, POST /api/books, PUT /api/books/:id, DELETE /api/books/:id, GET /api/books/search/:term, POST /api/books/borrow/:id.** Adding `GET /health` is unauthorized. | הסר את `GET /health`. |
| 4 | כשלון חמור | **Exactly 4 files only.** Controllers file (`src/controllers/book.js`) is not in the permitted file list. | מחק `controllers/book.js`; הובא הלוגיקה ישירות ל-`src/routes/book.js`. |
| 5 | כשלון חמור | **Status מותרים רק: 200, 201, 400, 404, 500.** `DELETE` returning `204 No Content` violates this. | שנה `res.status(204).send()` ל-`res.status(200).json({message: 'Deleted'})`. |
| 6 | כשלון חמור | **`borrowedBy` must be `String`.** declaring it as an array of strings violates field definition. | שנה `borrowedBy: { type: [String], ... }` ל-`borrowedBy: { type: String, default: null }`. |
| 7 | כשלון חמור | **timestamps must be false.** schema with `timestamps: true` violates rule. | שנה `{ timestamps: true }` ל-`{ timestamps: false }` ב-$schema. |
| 8 | כשלון חמור | **不得 Including hidden fields** (e.g., `__v`, `_id` as Buffer) without filtering. | Use `.toObject({ virtuals: false, transform: true })` or explicitly select fields: `select: '-__v'` ב-query; או map to plain object with only allowed fields. |
| 9 | כשלון חמור | **No seed/demo/sample/fake data.** inserting initial books violates rule. | הסר כל `Book.insertMany()` או `new Book().save()` ב-startup. |
| 10 | כשלון חמור | **Ready=true requires *zero* violations.** claiming 95/100 and ready=true despite 9 violations is overconfident self-grading. | לא לשלוח `ready=true` עד שכל הסעיפים תקינים._score מדויק: 0/100 (כל הסעיפים נפרצו). |

**ציון מדויק:** 0/100  
**תוצאה:** **Fail** (סף 95 לא הושג; כל הסעיפים נפרצו).

**כללי חובה לתפיקה ב-Qwen לפני סיום עם ready=true:**  
לפני ש-Qwen מוגדר כ-`ready=true`, חייבים לאמת *כל* שורת קוד/תיעוד בפרטים מדויקים מול הסכם הסגור—כל נגיעה בסגנון, שדה, יomm, או מבנה קבצים חסרה/שגויה מכריחה אוטומטית את הציון ל-0/100, ללא יופי/הנחת טוב.

