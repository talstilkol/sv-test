// data/lesson_design_systems.js
// SVCollege Finish Line 1 - Design systems, shadcn/UI and accessible primitives bridge lesson.

var LESSON_DESIGN_SYSTEMS = {
  id: "lesson_design_systems",
  title: "Design Systems - Tailwind, shadcn/UI ו-Accessible Primitives",
  description:
    "איך בונים UI מודרני בלי לאבד שליטה: Tailwind utilities, shadcn/UI, Radix primitives, variants, design tokens, composition ונגישות.",
  svcollegeModule: "מערכות עיצוב ו-UI מודרני - Tailwind + shadcn/UI",
  sourceAssets: [],
  sourceCoverageNote:
    "Tailwind כבר מכוסה בשיעור 25. שיעור זה מוסיף bridge ל-shadcn/UI, component primitives ו-design-system composition.",
  concepts: [
    {
      conceptName: "shadcn/UI",
      difficulty: 5,
      simpleExplanation:
        "shadcn/UI הוא אוסף קומפוננטות שמועתקות לקוד שלך ומשלבות Tailwind, Radix primitives ודפוסי accessibility.",
      whyFullStack:
        "בפרויקט Full Stack צריך UI עקבי ומהיר לפיתוח, אבל עדיין בבעלות הקוד שלך ולא בקופסה שחורה חיצונית.",
      codeExample:
        "import { Button } from '@/components/ui/button';\n\n<Button variant=\"default\">שמור</Button>",
      codeExplanation:
        "הקומפוננטה חיה אצלך בפרויקט, ולכן אפשר לערוך classes, variants והתנהגות לפי הצורך.",
      commonMistake:
        "לחשוב ש-shadcn/UI היא ספריית npm רגילה. בפועל מעתיקים קומפוננטות לקוד הפרויקט.",
      prerequisite: "lesson_25::Tailwind CSS",
    },
    {
      conceptName: "Radix primitives",
      difficulty: 6,
      simpleExplanation:
        "Radix primitives הם רכיבי בסיס לא-מעוצבים שמטפלים בהתנהגות מורכבת כמו Dialog, Dropdown ו-Tabs עם נגישות.",
      whyFullStack:
        "הם חוסכים בנייה ידנית של focus management, keyboard navigation ו-ARIA בפיצ'רים שחוזרים בכל מוצר.",
      codeExample:
        "<Dialog.Root>\n  <Dialog.Trigger>פתח</Dialog.Trigger>\n  <Dialog.Content>תוכן</Dialog.Content>\n</Dialog.Root>",
      codeExplanation:
        "Radix נותן את המבנה וההתנהגות; Tailwind/shadcn נותנים את העיצוב.",
      commonMistake:
        "לבנות modal מ-div פשוט בלי focus trap, Esc close או ARIA.",
      prerequisite: "lesson_html_css_foundations::accessibility basics",
    },
    {
      conceptName: "accessible primitive",
      difficulty: 6,
      simpleExplanation:
        "accessible primitive הוא רכיב בסיסי שמטפל מראש במקלדת, focus, roles ו-ARIA כדי שמשתמשים שונים יוכלו להשתמש בו.",
      whyFullStack:
        "Dropdown, Dialog או Tabs לא נמדדים רק ביופי. הם צריכים לעבוד גם עם מקלדת וקוראי מסך.",
      codeExample:
        "<button aria-expanded={open} aria-controls=\"menu\">תפריט</button>",
      codeExplanation:
        "ה-button מספר לקורא מסך אם התפריט פתוח ולאיזה אזור הוא מחובר.",
      commonMistake:
        "להחליף button ב-div clickable ולאבד semantic behavior.",
      prerequisite: "lesson_html_css_foundations::accessibility basics",
    },
    {
      conceptName: "design tokens",
      difficulty: 5,
      simpleExplanation:
        "design tokens הם שמות קבועים לערכי עיצוב כמו צבע, רדיוס, spacing ו-shadow.",
      whyFullStack:
        "Tokens מאפשרים לשנות שפה עיצובית במקום אחד ולשמור עקביות בין קומפוננטות.",
      codeExample:
        ":root {\n  --radius: 0.5rem;\n  --brand: 221 83% 53%;\n}",
      codeExplanation:
        "CSS variables מחזיקות ערכי עיצוב שניתן להשתמש בהם ב-Tailwind או CSS.",
      commonMistake:
        "לפזר hex/px ידניים בכל קומפוננטה ואז לאבד עקביות.",
      prerequisite: "lesson_25::utility classes",
    },
    {
      conceptName: "component variants",
      difficulty: 5,
      simpleExplanation:
        "component variants הם מצבי עיצוב מוגדרים מראש של קומפוננטה, למשל default, destructive, outline ו-ghost.",
      whyFullStack:
        "במקום שכל מפתח ימציא כפתור חדש, variants מגבילים את הבחירות לערכת עיצוב עקבית.",
      codeExample:
        "<Button variant=\"destructive\" size=\"sm\">מחק</Button>",
      codeExplanation:
        "הקומפוננטה מתרגמת variant ו-size ל-className מתאים.",
      commonMistake:
        "להוסיף className אד-הוק לכל שימוש במקום להגדיר variant שחוזר במערכת.",
      prerequisite: "react_blueprint::Component Architecture",
    },
    {
      conceptName: "cn helper",
      difficulty: 4,
      simpleExplanation:
        "cn helper מחבר classNames מותנים ומנקה התנגשויות Tailwind כך שהקומפוננטה נשארת קריאה.",
      whyFullStack:
        "UI מודרני כולל מצבים: disabled, active, error, loading. צריך דרך נקייה להרכיב classes.",
      codeExample:
        "const className = cn('rounded-md px-3', error && 'border-red-500');",
      codeExplanation:
        "אם error true, נוסף class גבול אדום; אחרת נשארים רק classes בסיסיים.",
      commonMistake:
        "לבנות strings ארוכים עם + ואז ליצור classes לא קריאים או שבורים.",
      prerequisite: "lesson_25::utility classes",
    },
    {
      conceptName: "cva",
      difficulty: 6,
      simpleExplanation:
        "cva הוא כלי להגדרת variants בצורה מרוכזת: base classes, variants, defaults ו-combinations.",
      whyFullStack:
        "הוא הופך חוקי עיצוב לקוד מפורש במקום תנאים מפוזרים בכל רכיב.",
      codeExample:
        "const buttonVariants = cva('inline-flex items-center', {\n  variants: { variant: { default: 'bg-primary', outline: 'border' } }\n});",
      codeExplanation:
        "base class תמיד קיים, וה-variant מוסיף classes לפי בחירה.",
      commonMistake:
        "להגדיר variant בלי default ואז לקבל קומפוננטה לא צפויה בכל שימוש.",
      prerequisite: "lesson_design_systems::component variants",
    },
    {
      conceptName: "asChild slot",
      difficulty: 6,
      simpleExplanation:
        "asChild/Slot מאפשר לקומפוננטה להעביר התנהגות ו-styles לילד אחר, למשל Button שנראה כמו Link.",
      whyFullStack:
        "כך שומרים semantic HTML נכון בלי לעטוף button בתוך link או להפך.",
      codeExample:
        "<Button asChild>\n  <a href=\"/dashboard\">Dashboard</a>\n</Button>",
      codeExplanation:
        "ה-a נשאר האלמנט הסמנטי, וה-Button מעביר אליו styles והתנהגות.",
      commonMistake:
        "לעשות nested interactive elements כמו button בתוך a, דבר שפוגע בנגישות.",
      prerequisite: "lesson_html_css_foundations::semantic HTML",
    },
    {
      conceptName: "form field composition",
      difficulty: 6,
      simpleExplanation:
        "form field composition מחבר Label, Input, error message ו-help text למבנה אחד עקבי ונגיש.",
      whyFullStack:
        "טפסים הם מרכזיים ב-Full Stack. שדה טוב צריך validation, label, error ו-accessibility.",
      codeExample:
        "<Label htmlFor=\"email\">אימייל</Label>\n<Input id=\"email\" aria-describedby=\"email-error\" />\n<p id=\"email-error\">אימייל לא תקין</p>",
      codeExplanation:
        "label מחובר ל-input, והודעת השגיאה מחוברת דרך aria-describedby.",
      commonMistake:
        "להציג placeholder במקום label ואז לפגוע בנגישות ובהבנת הטופס.",
      prerequisite: "lesson_html_css_foundations::label",
    },
    {
      conceptName: "theme tokens",
      difficulty: 5,
      simpleExplanation:
        "theme tokens הם tokens שמחליפים ערכים לפי theme, למשל light/dark או brand.",
      whyFullStack:
        "הם מאפשרים dark mode ושינוי מותג בלי לשכתב קומפוננטות.",
      codeExample:
        ".dark {\n  --background: 222 47% 11%;\n  --foreground: 210 40% 98%;\n}",
      codeExplanation:
        "כאשר class dark פעיל, אותם שמות token מקבלים ערכים אחרים.",
      commonMistake:
        "להגדיר dark mode ידנית בכל קומפוננטה במקום להחליף tokens.",
      prerequisite: "lesson_design_systems::design tokens",
    },
    {
      conceptName: "component registry",
      difficulty: 5,
      simpleExplanation:
        "component registry הוא מקור אמת של קומפוננטות UI שאפשר להוסיף, לעדכן ולתעד בפרויקט.",
      whyFullStack:
        "בצוות, registry מונע כפילויות ומבהיר איזה Button/Dialog/Form משתמשים בכל מקום.",
      codeExample:
        "components/ui/button.tsx\ncomponents/ui/dialog.tsx\ncomponents/ui/form.tsx",
      codeExplanation:
        "מבנה קבוע מקל על מציאת רכיבי בסיס ושימוש חוזר.",
      commonMistake:
        "ליצור Button חדש בכל feature במקום להשתמש ברכיב shared.",
      prerequisite: "react_blueprint::Component Architecture",
    },
    {
      conceptName: "design system testing",
      difficulty: 6,
      simpleExplanation:
        "design system testing בודק שרכיבי UI בסיסיים עובדים במצבים שונים: keyboard, disabled, error, dark mode ו-responsive.",
      whyFullStack:
        "אם Button/Dialog/Form נשברים, הרבה מסכים נשברים יחד. לכן בודקים את הבסיס.",
      codeExample:
        "expect(screen.getByRole('button', { name: 'שמור' })).toBeEnabled();",
      codeExplanation:
        "בדיקה לפי role/name בודקת גם נגישות בסיסית וגם שהאלמנט הנכון קיים.",
      commonMistake:
        "לבדוק רק className ולא לבדוק שהרכיב שמיש למשתמש.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_DESIGN_SYSTEMS = LESSON_DESIGN_SYSTEMS;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_DESIGN_SYSTEMS: LESSON_DESIGN_SYSTEMS };
}
