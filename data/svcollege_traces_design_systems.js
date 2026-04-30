// data/svcollege_traces_design_systems.js
// SVCollege Finish Line 1 - Design systems Code Trace practice.

var SVCOLLEGE_DESIGN_SYSTEMS_TRACES = [
  {
    id: "trace_svds_001",
    conceptKey: "lesson_design_systems::component variants",
    level: 6,
    title: "מעקב אחרי Button variants",
    code:
      "const buttonClass = cn(\n  'inline-flex items-center rounded-md px-3 py-2',\n  variant === 'destructive' && 'bg-red-600 text-white',\n  disabled && 'opacity-50 pointer-events-none'\n);",
    steps: [
      {
        line: 2,
        prompt: "איזה classes תמיד קיימים?",
        answer: "inline-flex items-center rounded-md px-3 py-2",
        acceptable: ["inline-flex", "rounded", "px-3", "base"],
        hint: "חפש את ה-string שאינו תלוי בתנאי.",
      },
      {
        line: 3,
        prompt: "מתי נוסף עיצוב destructive?",
        answer: "כאשר variant שווה destructive",
        acceptable: ["variant", "destructive"],
        hint: "זה תנאי לפי variant.",
      },
      {
        line: 4,
        prompt: "מה disabled מוסיף?",
        answer: "opacity-50 ו-pointer-events-none",
        acceptable: ["opacity", "pointer-events", "disabled"],
        hint: "זה מצב UI שמונע אינטראקציה.",
      },
    ],
    explanation:
      "cn מחבר base classes עם classes מותנים לפי variant ו-state.",
    requiredConcepts: ["lesson_design_systems::component variants", "lesson_design_systems::cn helper"],
    requiredTerms: ["cn", "variant", "disabled"],
    sideExplanation:
      "מערכת עיצוב היא שילוב של base style קבוע ומצבים מוגדרים מראש.",
  },
  {
    id: "trace_svds_002",
    conceptKey: "lesson_design_systems::form field composition",
    level: 6,
    title: "מעקב אחרי שדה טופס נגיש",
    code:
      "<label htmlFor=\"email\">Email</label>\n<input id=\"email\" aria-describedby=\"email-error\" />\n<p id=\"email-error\">Email is required</p>",
    steps: [
      {
        line: 1,
        prompt: "איך ה-label מחובר ל-input?",
        answer: "htmlFor מצביע על id=email",
        acceptable: ["htmlFor", "id", "email"],
        hint: "חפש htmlFor ו-id תואמים.",
      },
      {
        line: 2,
        prompt: "מה aria-describedby מחבר?",
        answer: "את ה-input להודעת השגיאה",
        acceptable: ["error", "aria-describedby", "email-error"],
        hint: "הערך שלו הוא id של הפסקה.",
      },
      {
        line: 3,
        prompt: "למה הודעת השגיאה צריכה id?",
        answer: "כדי שאפשר יהיה להפנות אליה מה-input",
        acceptable: ["id", "input", "described"],
        hint: "בלי id אין יעד ל-aria-describedby.",
      },
    ],
    explanation:
      "שדה נגיש מחבר שם, input והודעת שגיאה בקשרים מפורשים.",
    requiredConcepts: ["lesson_design_systems::form field composition", "lesson_html_css_foundations::label"],
    requiredTerms: ["label", "htmlFor", "aria-describedby"],
    sideExplanation:
      "הקשר בין חלקי השדה צריך להיות ברור גם למי שלא רואה את המסך.",
  },
  {
    id: "trace_svds_003",
    conceptKey: "lesson_design_systems::shadcn/UI",
    level: 6,
    title: "מעקב אחרי שימוש ב-Button של shadcn/UI",
    code:
      "import { Button } from '@/components/ui/button';\n\nexport function SaveAction() {\n  return <Button variant=\"default\">שמור</Button>;\n}",
    steps: [
      {
        line: 1,
        prompt: "מאיפה מגיע רכיב Button?",
        answer: "מתיקיית components/ui בתוך הפרויקט",
        acceptable: ["components/ui", "button", "project"],
        hint: "שים לב לנתיב ה-import.",
      },
      {
        line: 4,
        prompt: "איזה variant נבחר כאן?",
        answer: "default",
        acceptable: ["default"],
        hint: "הערך מופיע בתוך prop בשם variant.",
      },
      {
        line: 4,
        prompt: "למה זה לא שימוש ב-npm component שחור?",
        answer: "כי הקומפוננטה מיובאת מקוד הפרויקט ואפשר לערוך אותה",
        acceptable: ["project", "edit", "components/ui", "code"],
        hint: "shadcn/UI מעתיק קוד לפרויקט.",
      },
    ],
    explanation:
      "shadcn/UI נותן קומפוננטות שמתגוררות בקוד שלך, ולכן אפשר לשנות variants, classes והתנהגות.",
    requiredConcepts: ["lesson_design_systems::shadcn/UI", "lesson_25::Tailwind CSS"],
    requiredTerms: ["import", "Button", "variant"],
    sideExplanation:
      "היתרון המרכזי הוא בעלות על הקוד: משתמשים בתבנית מוכנה אבל לא מאבדים יכולת שינוי.",
  },
  {
    id: "trace_svds_004",
    conceptKey: "lesson_design_systems::Radix primitives",
    level: 6,
    title: "מעקב אחרי Dialog primitive",
    code:
      "<Dialog.Root>\n  <Dialog.Trigger>פתח</Dialog.Trigger>\n  <Dialog.Content>תוכן</Dialog.Content>\n</Dialog.Root>",
    steps: [
      {
        line: 1,
        prompt: "איזה רכיב מחזיק את מצב ה-Dialog?",
        answer: "Dialog.Root",
        acceptable: ["Root", "Dialog.Root"],
        hint: "ה-wrapper החיצוני מנהל את ה-primitive.",
      },
      {
        line: 2,
        prompt: "איזה חלק פותח את החלון?",
        answer: "Dialog.Trigger",
        acceptable: ["Trigger"],
        hint: "Trigger הוא המפעיל.",
      },
      {
        line: 3,
        prompt: "איפה נמצא תוכן ה-modal?",
        answer: "Dialog.Content",
        acceptable: ["Content"],
        hint: "Content הוא גוף הדיאלוג.",
      },
    ],
    explanation:
      "Radix primitive מפריד בין התנהגות נגישה לבין העיצוב שמוסיפים מעליו.",
    requiredConcepts: ["lesson_design_systems::Radix primitives", "lesson_design_systems::accessible primitive"],
    requiredTerms: ["Dialog", "Trigger", "Content"],
    sideExplanation:
      "Primitive טוב חוסך בנייה ידנית של focus, מקלדת ו-ARIA לרכיבים מורכבים.",
  },
  {
    id: "trace_svds_005",
    conceptKey: "lesson_design_systems::design tokens",
    level: 5,
    title: "מעקב אחרי design tokens ב-CSS",
    code:
      ":root {\n  --radius: 0.5rem;\n  --brand: 221 83% 53%;\n}\n.card { border-radius: var(--radius); }",
    steps: [
      {
        line: 2,
        prompt: "איזה token מגדיר רדיוס אחיד?",
        answer: "--radius",
        acceptable: ["--radius", "radius"],
        hint: "חפש CSS variable של רדיוס.",
      },
      {
        line: 3,
        prompt: "איזה token מייצג צבע מותג?",
        answer: "--brand",
        acceptable: ["--brand", "brand"],
        hint: "הערך נראה כמו HSL.",
      },
      {
        line: 5,
        prompt: "מה יקרה אם נשנה את --radius?",
        answer: "כל מקום שמשתמש ב-var(--radius) יקבל את הרדיוס החדש",
        acceptable: ["var", "radius", "all", "places"],
        hint: "ה-card לא מחזיק מספר קשיח.",
      },
    ],
    explanation:
      "Design tokens מחליפים ערכים מפוזרים בשם יציב שאפשר לעדכן במקום אחד.",
    requiredConcepts: ["lesson_design_systems::design tokens", "lesson_25::utility classes"],
    requiredTerms: ["CSS variable", "token", "var"],
    sideExplanation:
      "Token הוא חוזה עיצובי: הקומפוננטה משתמשת בשם, וה-theme מספק את הערך.",
  },
  {
    id: "trace_svds_006",
    conceptKey: "lesson_design_systems::cn helper",
    level: 5,
    title: "מעקב אחרי cn helper עם מצבים",
    code:
      "const className = cn(\n  'rounded-md px-3',\n  isActive && 'bg-sky-500 text-white',\n  error && 'border border-red-500'\n);",
    steps: [
      {
        line: 2,
        prompt: "איזה classes תמיד יופיעו?",
        answer: "rounded-md px-3",
        acceptable: ["rounded-md", "px-3"],
        hint: "ה-string הזה לא תלוי בתנאי.",
      },
      {
        line: 3,
        prompt: "מתי נוסף style של active?",
        answer: "כאשר isActive אמת",
        acceptable: ["isActive", "active", "true"],
        hint: "זה תנאי עם &&.",
      },
      {
        line: 4,
        prompt: "מה error מוסיף?",
        answer: "border ו-border-red-500",
        acceptable: ["border", "red", "error"],
        hint: "זה מצב שגיאה ויזואלי.",
      },
    ],
    explanation:
      "cn שומר על className קריא גם כשיש base classes ומצבים מותנים.",
    requiredConcepts: ["lesson_design_systems::cn helper", "lesson_25::utility classes"],
    requiredTerms: ["cn", "className", "conditional class"],
    sideExplanation:
      "בקומפוננטה אמיתית יש הרבה מצבים; helper מונע חיבור strings שביר.",
  },
  {
    id: "trace_svds_007",
    conceptKey: "lesson_design_systems::cva",
    level: 6,
    title: "מעקב אחרי cva variants",
    code:
      "const buttonVariants = cva('inline-flex items-center', {\n  variants: { variant: { default: 'bg-primary', outline: 'border' } },\n  defaultVariants: { variant: 'default' }\n});",
    steps: [
      {
        line: 1,
        prompt: "איזה classes הם base קבוע?",
        answer: "inline-flex items-center",
        acceptable: ["inline-flex", "items-center", "base"],
        hint: "זה הארגומנט הראשון של cva.",
      },
      {
        line: 2,
        prompt: "איזה variant מוסיף border?",
        answer: "outline",
        acceptable: ["outline"],
        hint: "חפש את הערך שממופה ל-border.",
      },
      {
        line: 3,
        prompt: "מה קורה כשלא מעבירים variant?",
        answer: "משתמשים ב-default variant",
        acceptable: ["default", "defaultVariants"],
        hint: "defaultVariants מגדיר fallback.",
      },
    ],
    explanation:
      "cva מרכז את חוקי העיצוב: base, variants וברירות מחדל במקום אחד.",
    requiredConcepts: ["lesson_design_systems::cva", "lesson_design_systems::component variants"],
    requiredTerms: ["cva", "variants", "defaultVariants"],
    sideExplanation:
      "כאשר חוקי variants מרוכזים, קל יותר לבדוק ולשנות מערכת עיצוב בלי לשבור מסכים.",
  },
  {
    id: "trace_svds_008",
    conceptKey: "lesson_design_systems::asChild slot",
    level: 6,
    title: "מעקב אחרי asChild בלי nested interactive elements",
    code:
      "<Button asChild>\n  <a href=\"/dashboard\">Dashboard</a>\n</Button>",
    steps: [
      {
        line: 1,
        prompt: "איזה prop מאפשר להעביר style לילד?",
        answer: "asChild",
        acceptable: ["asChild"],
        hint: "זה מופיע על Button.",
      },
      {
        line: 2,
        prompt: "איזה אלמנט נשאר סמנטית הקישור?",
        answer: "a",
        acceptable: ["a", "anchor", "link"],
        hint: "הילד הוא תגית קישור.",
      },
      {
        line: 2,
        prompt: "איזה באג נגישות זה מונע?",
        answer: "button בתוך a או a בתוך button",
        acceptable: ["nested", "button", "a", "interactive"],
        hint: "אסור לקנן אלמנטים אינטראקטיביים.",
      },
    ],
    explanation:
      "asChild שומר על HTML סמנטי נכון בזמן שמקבלים את עיצוב הכפתור.",
    requiredConcepts: ["lesson_design_systems::asChild slot", "lesson_html_css_foundations::semantic HTML"],
    requiredTerms: ["asChild", "Slot", "anchor"],
    sideExplanation:
      "המשתמש רואה כפתור, אבל הדפדפן וקורא המסך מקבלים קישור אמיתי.",
  },
  {
    id: "trace_svds_009",
    conceptKey: "lesson_design_systems::theme tokens",
    level: 5,
    title: "מעקב אחרי theme tokens במצב כהה",
    code:
      ":root { --background: 0 0% 100%; --foreground: 222 47% 11%; }\n.dark { --background: 222 47% 11%; --foreground: 210 40% 98%; }\nbody { background: hsl(var(--background)); color: hsl(var(--foreground)); }",
    steps: [
      {
        line: 1,
        prompt: "איפה מוגדר ערך ברירת המחדל של הרקע?",
        answer: ":root",
        acceptable: [":root", "root"],
        hint: "זו ההגדרה הגלובלית.",
      },
      {
        line: 2,
        prompt: "מה מחליף את ערכי הרקע והטקסט במצב כהה?",
        answer: "class בשם dark",
        acceptable: ["dark", ".dark"],
        hint: "חפש selector שמתחיל בנקודה.",
      },
      {
        line: 3,
        prompt: "למה body לא צריך לדעת אם ה-theme כהה?",
        answer: "כי הוא משתמש ב-token var(--background) ו-var(--foreground)",
        acceptable: ["var", "token", "background", "foreground"],
        hint: "ה-body משתמש בשמות, לא בערכים קשיחים.",
      },
    ],
    explanation:
      "Theme tokens משנים ערכים לפי מצב בלי לשכתב כל קומפוננטה.",
    requiredConcepts: ["lesson_design_systems::theme tokens", "lesson_design_systems::design tokens"],
    requiredTerms: ["theme", "dark", "CSS variable"],
    sideExplanation:
      "Dark mode יציב נבנה מהחלפת tokens, לא מתנאים מפוזרים בכל רכיב.",
  },
  {
    id: "trace_svds_010",
    conceptKey: "lesson_design_systems::component registry",
    level: 5,
    title: "מעקב אחרי registry של רכיבי UI",
    code:
      "components/ui/button.tsx\ncomponents/ui/dialog.tsx\ncomponents/ui/form.tsx\n\nimport { Button } from '@/components/ui/button';",
    steps: [
      {
        line: 1,
        prompt: "איפה נמצא רכיב הכפתור המשותף?",
        answer: "components/ui/button.tsx",
        acceptable: ["components/ui/button", "button.tsx"],
        hint: "חפש את השורה שמכילה button.",
      },
      {
        line: 3,
        prompt: "איזה רכיב אחראי על טפסים shared?",
        answer: "components/ui/form.tsx",
        acceptable: ["form.tsx", "components/ui/form"],
        hint: "שם הקובץ מתאים לתפקיד.",
      },
      {
        line: 5,
        prompt: "למה import מאותו registry עדיף על יצירת Button חדש בכל feature?",
        answer: "כי הוא שומר על מקור אמת אחד ומונע כפילויות",
        acceptable: ["source", "truth", "duplicate", "shared"],
        hint: "Registry הוא רשימת רכיבים מוסכמת.",
      },
    ],
    explanation:
      "Component registry מגדיר איפה חיים רכיבי UI בסיסיים ומונע שכפול לא מבוקר.",
    requiredConcepts: ["lesson_design_systems::component registry", "react_blueprint::Component Architecture"],
    requiredTerms: ["registry", "shared component", "import"],
    sideExplanation:
      "בצוות, registry הוא הדרך לדעת איזה רכיב מותר להשתמש בו ואיפה מתקנים אותו.",
  },
  {
    id: "trace_svds_011",
    conceptKey: "lesson_design_systems::design system testing",
    level: 6,
    title: "מעקב אחרי בדיקת רכיב לפי role",
    code:
      "render(<Button disabled>שמור</Button>);\nconst button = screen.getByRole('button', { name: 'שמור' });\nexpect(button).toBeDisabled();",
    steps: [
      {
        line: 1,
        prompt: "איזה מצב של Button נבדק?",
        answer: "disabled",
        acceptable: ["disabled"],
        hint: "ה-prop מופיע על Button.",
      },
      {
        line: 2,
        prompt: "לפי מה מאתרים את הכפתור?",
        answer: "לפי role button והשם שמור",
        acceptable: ["role", "button", "name", "שמור"],
        hint: "זו בדיקה כמו שמשתמש וקורא מסך מזהים את הרכיב.",
      },
      {
        line: 3,
        prompt: "מה assertion הסופי מוכיח?",
        answer: "שהכפתור באמת disabled",
        acceptable: ["disabled", "toBeDisabled"],
        hint: "הציפייה בשורה 3 בודקת מצב שימושי, לא רק class.",
      },
    ],
    explanation:
      "בדיקת Design System טובה בודקת התנהגות נגישה לפי role/name ומצב שימושי.",
    requiredConcepts: ["lesson_design_systems::design system testing", "react_blueprint::Testing Strategies"],
    requiredTerms: ["render", "screen.getByRole", "toBeDisabled"],
    sideExplanation:
      "רכיב shared שנבדק לפי role מקטין סיכון לשבור הרבה מסכים בבת אחת.",
  },
];

function appendDesignSystemTraceItemsOnce(target, items) {
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (!existing[items[itemIndex].id]) {
      target.push(items[itemIndex]);
      existing[items[itemIndex].id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.SVCOLLEGE_DESIGN_SYSTEMS_TRACES = SVCOLLEGE_DESIGN_SYSTEMS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendDesignSystemTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_DESIGN_SYSTEMS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DESIGN_SYSTEMS_TRACES: SVCOLLEGE_DESIGN_SYSTEMS_TRACES };
}
