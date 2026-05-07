# Source Review - manual_review sections

מדיניות: המסמך הזה מתעד רק מידע שנמצא במקור traceable:
`svcollege_fullstack_exam_trainer_v5/outputs/eval/exam_sections_task_breakdown.jsonl`.
אם קובץ יעד, שם פונקציה או starter code אינם מופיעים במקור, הערך נשאר `unknown/unavailable`.

## section-04 - עותק של מבחן טיסות.docx / Q1/main

- source_ref: `exam_sections_task_breakdown.jsonl::idx:4`
- full_source_prompt: שאלה 1 - מערכת לניהול בקרות טיסה ב-React, בצד לקוח בלבד ללא שרת. יש עמוד כניסה תחת `/` עם סיסמה אחת בלבד `12345` והודעת שגיאה לכל קוד אחר. לאחר כניסה עוברים ל-`/controlpanel`. בעמוד הבקרה יש תפריט אפשרויות בצד שמאל, ובמובייל מתחת ל-500px הרשימה מוצגת בשורה בחלק העליון. ברירת מחדל כל הטיסות: הצגת כל הטיסות בריבועים עם מספר טיסה, חברת תעופה ומספר נוסעים. `/controlpanel/sort` כולל חיפוש לפי שם חברה לפי ערך חלקי ו-select למיון לפי מספר מושבים נמוך/גבוה. `/controlpanel/add` כולל שלושה inputs וכפתור: מספר טיסה מספרי עד 5 תווים וייחודי, חברת תעופה עם לפחות אות אחת, מספר נוסעים בין 1 ל-450. אם תקין מוסיפים למערך וחוזרים לכל הטיסות, אחרת מציגים alert. `/controlpanel/delete` כולל input מספר טיסה עד 5 תווים וכפתור מחק. אם הטיסה לא קיימת מציגים שגיאה; אם קיימת מוחקים ומציגים הודעה עם כמות כל הטיסות וכמות כל הנוסעים כרגע באוויר.
- target_surface: React client-only app; routes `/`, `/controlpanel`, `/controlpanel/sort`, `/controlpanel/add`, `/controlpanel/delete`. target file: `unknown/unavailable`.
- input_output_contract: login password input; flight number, airline company, passenger count; sort/search fields. Output is route navigation, rendered flight cards, alerts/errors, updated local array and deletion summary.
- validation_and_errors: password must equal `12345`; flight number numeric, unique, max 5 chars; airline company has at least one letter; passengers between 1 and 450; invalid add shows alert; delete missing flight shows error.
- scoring_rubric: official sub-point split is `unknown/unavailable`; source says Q1 is 50 points in the original tree but this full prompt maps to internal technical checklist only.
- acceptance_gate: routes exist; login blocks wrong password; mobile menu changes below 500px; all flights render with required fields; search is partial and non-mutating; sort handles low/high passengers; add validates all fields and updates immutably; delete handles missing/existing flight and shows total flights/passengers.

## section-33 - עותק של מבחן מחסן לוגיסטי.docx / Q2/main

- source_ref: `exam_sections_task_breakdown.jsonl::idx:33`
- full_source_prompt: שאלה 2 - JavaScript. כתוב פונקציה שמקבלת מערך של אחדות ואפסים המייצג מספר בינארי. הפונקציה תמיר את הערך למספר דצימלי רגיל, ולאחר מכן תחזיר אמת אם הערך הדצימלי הוא פלינדרום ושקר אם הוא לא. מספר בינארי מיוצג בספרות 0 או 1, וכל ספרה במקומה מציינת ערך כפול 2 בחזקת המיקום שלה. לדוגמה 101101 מייצג 45 כי המקומות עם 1 הם 1 + 4 + 8 + 32.
- target_surface: JavaScript function. function name/file: `unknown/unavailable`.
- input_output_contract: input is an array containing binary digits 0 and 1. Output is boolean: `true` if the decimal value is palindrome, otherwise `false`.
- validation_and_errors: source requires binary digits 0/1. Error behavior for invalid values is `unknown/unavailable`.
- scoring_rubric: official sub-point split is `unknown/unavailable`; source says Q2 is 25 points in the original tree but this full prompt maps to internal technical checklist only.
- acceptance_gate: converts binary digits to decimal using powers of 2; includes only positions with 1; converts decimal value to string; palindrome check is deterministic; example `101101` resolves to decimal `45`.

## section-50 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q1/main

- source_ref: `exam_sections_task_breakdown.jsonl::idx:50`
- full_source_prompt: שאלה 1 - WILLING APP. לבנות אתר React להתנדבויות. העמוד הראשי תחת `/` כולל שני כפתורים: הוספת התנדבות ומצא התנדבות. לחיצה על הוספת התנדבות מעבירה ל-`/add`. עמוד `/add` כולל כותרת להתנדבות עד 20 תווים, מיקום התנדבות שהוא שם עיר באנגלית בלבד ללא מספרים/רווחים/סימנים, תיאור עד 200 תווים, וכפתור יצירת התנדבות חדשה. יש לוודא תקינות שדות; אם הכל תקין מחזירים לעמוד הראשי, ואם ערך לא תקין מציגים alert עם התקלה. עמוד `/find` כולל תיבת טקסט לשם מתנדב באורך גדול מ-2, select של כל ערי ההתנדבויות ללא כפילויות, וכפתור חפש. אם השם לא תקין מציגים alert. אם תקין עוברים ל-`/all` ושם מציגים את כל ההתנדבויות בעיר שנבחרה, כל אחת לפי כותרת בלבד. לחיצה על התנדבות מסמנת רקע ירוק בהיר ומציגה תיאור; לחיצה נוספת מבטלת ומחזירה רקע לבן. כפתור אישור מוחק מהרשימה כל התנדבות שנבחרה ומחזיר לעמוד הראשי.
- target_surface: React client app; routes `/`, `/add`, `/find`, `/all`. target file: `unknown/unavailable`.
- input_output_contract: add form receives title/location/description; find receives volunteer name and selected city; output is route navigation, volunteer cards by city, selected/unselected UI state and updated volunteer list after confirmation.
- validation_and_errors: title up to 20 chars; city in English letters only without numbers/spaces/symbols; description up to 200 chars; invalid add shows alert; volunteer name length must be greater than 2; invalid find shows alert.
- scoring_rubric: official sub-point split is `unknown/unavailable`; source says Q1 is 40 points in the original tree but this full prompt maps to internal technical checklist only.
- acceptance_gate: main page has two navigation buttons; `/add` validates and returns home on success; `/find` builds unique city select; `/all` filters by selected city; item click toggles light-green background and description; approval deletes selected volunteering items and returns home.

## section-51 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q2/main

- source_ref: `exam_sections_task_breakdown.jsonl::idx:51`
- full_source_prompt: שאלה 2 - JavaScript. צרו פונקציה שמקבלת מערך של מספרים שלמים. הפונקציה בודקת אילו ערכים זוגיים ואי-זוגיים ואת כמות האיברים במערך. אם אחד האיברים אינו מספר יש לזרוק שגיאה. אם מספר קיים כמה פעמים במערך, בודקים אותו פעם אחת בלבד לצורך even/odd ומכניסים למאפיין המתאים באובייקט. הפונקציה מחזירה אובייקט עם even, odd, total. even הוא כמות המספרים הזוגיים הייחודיים שנמצאו, odd הוא כמות המספרים האי-זוגיים הייחודיים שנמצאו, total הוא כמות כלל האיברים במערך. לדוגמה עבור `[6,3,3,4,13,6,7,18,7,11]` הפונקציה מחזירה `{ even: 3, odd: 4, total: 10 }`.
- target_surface: JavaScript function. function name/file: `unknown/unavailable`.
- input_output_contract: input is an array of integers. Output object shape is `{ even, odd, total }`.
- validation_and_errors: every item must be a number; throw an error if an item is not a number.
- scoring_rubric: official sub-point split is `unknown/unavailable`; source says Q2 is 35 points in the original tree but this full prompt maps to internal technical checklist only.
- acceptance_gate: total equals original array length; even and odd count unique numeric values only; duplicates are not counted twice for even/odd; sample input returns `{ even: 3, odd: 4, total: 10 }`.
