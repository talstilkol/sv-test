4. **מלכודת נפוצה**  
- לשכוח לאתחל את ה-router עם `express.Router()` – זה גורם לשגיאות ב-Express.
- לשכוח את `module.exports = router` – ה-router לא יזוהה מחוץ לקובץ.
- לשכוח את ה-`status(200)` –虽 ש-Express מחזיר 200 כברירת מחדל, אבל לפי חוזה הקוד חובה לציין את הסטטוס במפורש.
- לשכוח שה-route הוא `GET /` בתוך router שמשויך ל-`/all` – כלומר, אם ה-router מוטמע תחת `/all`, אז `router.get('/')` יתאים ל-`/all`, אבל אם שוכתב `router.get('/all')` – זה יוצר `/all/all`.

5. **בדיקת תקינות**  
- בדיקה ידנית: שליחת בקשת GET ל-`/all` (אם ה-router מוטמע תחת `/all`) תחזיר את המערך `items` כ-JSON.
- בדיקה ב-Postman או curl: