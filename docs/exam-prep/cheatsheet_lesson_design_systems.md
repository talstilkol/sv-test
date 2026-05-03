# Design Systems - Tailwind, shadcn/UI ו-Accessible Primitives — דף סיכום למבחן

**מודול SVCollege:** מערכות עיצוב ו-UI מודרני - Tailwind + shadcn/UI

**תיאור:** איך בונים UI מודרני בלי לאבד שליטה: Tailwind utilities, shadcn/UI, Radix primitives, variants, design tokens, composition ונגישות.

**מספר מושגים:** 12

---

## מושגים בסיכום

### 1. shadcn/UI

**רמת קושי:** 5/10

**מה זה:** shadcn/UI הוא אוסף קומפוננטות שמועתקות לקוד שלך ומשלבות Tailwind, Radix primitives ודפוסי accessibility.

**למה Full Stack:** בפרויקט Full Stack צריך UI עקבי ומהיר לפיתוח, אבל עדיין בבעלות הקוד שלך ולא בקופסה שחורה חיצונית.

**דוגמה:**
```
import { Button } from '@/components/ui/button';

<Button variant="default">שמור</Button>
```

**הסבר:** הקומפוננטה חיה אצלך בפרויקט, ולכן אפשר לערוך classes, variants והתנהגות לפי הצורך.

⚠️ **טעות נפוצה:** לחשוב ש-shadcn/UI היא ספריית npm רגילה. בפועל מעתיקים קומפוננטות לקוד הפרויקט.

**תלוי ב:** `lesson_25::Tailwind CSS`

---

### 2. Radix primitives

**רמת קושי:** 6/10

**מה זה:** Radix primitives הם רכיבי בסיס לא-מעוצבים שמטפלים בהתנהגות מורכבת כמו Dialog, Dropdown ו-Tabs עם נגישות.

**למה Full Stack:** הם חוסכים בנייה ידנית של focus management, keyboard navigation ו-ARIA בפיצ'רים שחוזרים בכל מוצר.

**דוגמה:**
```
<Dialog.Root>
  <Dialog.Trigger>פתח</Dialog.Trigger>
  <Dialog.Content>תוכן</Dialog.Content>
</Dialog.Root>
```

**הסבר:** Radix נותן את המבנה וההתנהגות; Tailwind/shadcn נותנים את העיצוב.

⚠️ **טעות נפוצה:** לבנות modal מ-div פשוט בלי focus trap, Esc close או ARIA.

**תלוי ב:** `lesson_html_css_foundations::accessibility basics`

---

### 3. accessible primitive

**רמת קושי:** 6/10

**מה זה:** accessible primitive הוא רכיב בסיסי שמטפל מראש במקלדת, focus, roles ו-ARIA כדי שמשתמשים שונים יוכלו להשתמש בו.

**למה Full Stack:** Dropdown, Dialog או Tabs לא נמדדים רק ביופי. הם צריכים לעבוד גם עם מקלדת וקוראי מסך.

**דוגמה:**
```
<button aria-expanded={open} aria-controls="menu">תפריט</button>
```

**הסבר:** ה-button מספר לקורא מסך אם התפריט פתוח ולאיזה אזור הוא מחובר.

⚠️ **טעות נפוצה:** להחליף button ב-div clickable ולאבד semantic behavior.

**תלוי ב:** `lesson_html_css_foundations::accessibility basics`

---

### 4. design tokens

**רמת קושי:** 5/10

**מה זה:** design tokens הם שמות קבועים לערכי עיצוב כמו צבע, רדיוס, spacing ו-shadow.

**למה Full Stack:** Tokens מאפשרים לשנות שפה עיצובית במקום אחד ולשמור עקביות בין קומפוננטות.

**דוגמה:**
```
:root {
  --radius: 0.5rem;
  --brand: 221 83% 53%;
}
```

**הסבר:** CSS variables מחזיקות ערכי עיצוב שניתן להשתמש בהם ב-Tailwind או CSS.

⚠️ **טעות נפוצה:** לפזר hex/px ידניים בכל קומפוננטה ואז לאבד עקביות.

**תלוי ב:** `lesson_25::utility classes`

---

### 5. component variants

**רמת קושי:** 5/10

**מה זה:** component variants הם מצבי עיצוב מוגדרים מראש של קומפוננטה, למשל default, destructive, outline ו-ghost.

**למה Full Stack:** במקום שכל מפתח ימציא כפתור חדש, variants מגבילים את הבחירות לערכת עיצוב עקבית.

**דוגמה:**
```
<Button variant="destructive" size="sm">מחק</Button>
```

**הסבר:** הקומפוננטה מתרגמת variant ו-size ל-className מתאים.

⚠️ **טעות נפוצה:** להוסיף className אד-הוק לכל שימוש במקום להגדיר variant שחוזר במערכת.

**תלוי ב:** `react_blueprint::Component Architecture`

---

### 6. cn helper

**רמת קושי:** 4/10

**מה זה:** cn helper מחבר classNames מותנים ומנקה התנגשויות Tailwind כך שהקומפוננטה נשארת קריאה.

**למה Full Stack:** UI מודרני כולל מצבים: disabled, active, error, loading. צריך דרך נקייה להרכיב classes.

**דוגמה:**
```
const className = cn('rounded-md px-3', error && 'border-red-500');
```

**הסבר:** אם error true, נוסף class גבול אדום; אחרת נשארים רק classes בסיסיים.

⚠️ **טעות נפוצה:** לבנות strings ארוכים עם + ואז ליצור classes לא קריאים או שבורים.

**תלוי ב:** `lesson_25::utility classes`

---

### 7. cva

**רמת קושי:** 6/10

**מה זה:** cva הוא כלי להגדרת variants בצורה מרוכזת: base classes, variants, defaults ו-combinations.

**למה Full Stack:** הוא הופך חוקי עיצוב לקוד מפורש במקום תנאים מפוזרים בכל רכיב.

**דוגמה:**
```
const buttonVariants = cva('inline-flex items-center', {
  variants: { variant: { default: 'bg-primary', outline: 'border' } }
});
```

**הסבר:** base class תמיד קיים, וה-variant מוסיף classes לפי בחירה.

⚠️ **טעות נפוצה:** להגדיר variant בלי default ואז לקבל קומפוננטה לא צפויה בכל שימוש.

**תלוי ב:** `lesson_design_systems::component variants`

---

### 8. asChild slot

**רמת קושי:** 6/10

**מה זה:** asChild/Slot מאפשר לקומפוננטה להעביר התנהגות ו-styles לילד אחר, למשל Button שנראה כמו Link.

**למה Full Stack:** כך שומרים semantic HTML נכון בלי לעטוף button בתוך link או להפך.

**דוגמה:**
```
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

**הסבר:** ה-a נשאר האלמנט הסמנטי, וה-Button מעביר אליו styles והתנהגות.

⚠️ **טעות נפוצה:** לעשות nested interactive elements כמו button בתוך a, דבר שפוגע בנגישות.

**תלוי ב:** `lesson_html_css_foundations::semantic HTML`

---

### 9. form field composition

**רמת קושי:** 6/10

**מה זה:** form field composition מחבר Label, Input, error message ו-help text למבנה אחד עקבי ונגיש.

**למה Full Stack:** טפסים הם מרכזיים ב-Full Stack. שדה טוב צריך validation, label, error ו-accessibility.

**דוגמה:**
```
<Label htmlFor="email">אימייל</Label>
<Input id="email" aria-describedby="email-error" />
<p id="email-error">אימייל לא תקין</p>
```

**הסבר:** label מחובר ל-input, והודעת השגיאה מחוברת דרך aria-describedby.

⚠️ **טעות נפוצה:** להציג placeholder במקום label ואז לפגוע בנגישות ובהבנת הטופס.

**תלוי ב:** `lesson_html_css_foundations::label`

---

### 10. theme tokens

**רמת קושי:** 5/10

**מה זה:** theme tokens הם tokens שמחליפים ערכים לפי theme, למשל light/dark או brand.

**למה Full Stack:** הם מאפשרים dark mode ושינוי מותג בלי לשכתב קומפוננטות.

**דוגמה:**
```
.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
}
```

**הסבר:** כאשר class dark פעיל, אותם שמות token מקבלים ערכים אחרים.

⚠️ **טעות נפוצה:** להגדיר dark mode ידנית בכל קומפוננטה במקום להחליף tokens.

**תלוי ב:** `lesson_design_systems::design tokens`

---

### 11. component registry

**רמת קושי:** 5/10

**מה זה:** component registry הוא מקור אמת של קומפוננטות UI שאפשר להוסיף, לעדכן ולתעד בפרויקט.

**למה Full Stack:** בצוות, registry מונע כפילויות ומבהיר איזה Button/Dialog/Form משתמשים בכל מקום.

**דוגמה:**
```
components/ui/button.tsx
components/ui/dialog.tsx
components/ui/form.tsx
```

**הסבר:** מבנה קבוע מקל על מציאת רכיבי בסיס ושימוש חוזר.

⚠️ **טעות נפוצה:** ליצור Button חדש בכל feature במקום להשתמש ברכיב shared.

**תלוי ב:** `react_blueprint::Component Architecture`

---

### 12. design system testing

**רמת קושי:** 6/10

**מה זה:** design system testing בודק שרכיבי UI בסיסיים עובדים במצבים שונים: keyboard, disabled, error, dark mode ו-responsive.

**למה Full Stack:** אם Button/Dialog/Form נשברים, הרבה מסכים נשברים יחד. לכן בודקים את הבסיס.

**דוגמה:**
```
expect(screen.getByRole('button', { name: 'שמור' })).toBeEnabled();
```

**הסבר:** בדיקה לפי role/name בודקת גם נגישות בסיסית וגם שהאלמנט הנכון קיים.

⚠️ **טעות נפוצה:** לבדוק רק className ולא לבדוק שהרכיב שמיש למשתמש.

**תלוי ב:** `react_blueprint::Testing Strategies`

---
