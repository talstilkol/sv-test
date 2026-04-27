// data/lesson33.js — שיעור 33: shadcn/UI
// Component library מודרני. מבחן: 4-6 שאלות צפויות.
var LESSON_33 = {
  id: "lesson_33",
  title: "שיעור 33 — shadcn/UI — Components You Own",
  description:
    "shadcn/UI: copy-paste components מבוסס Radix + Tailwind. אין npm install של library — הקומפוננטות שלך.",
  concepts: [
    {
      conceptName: "shadcn/UI",
      difficulty: 5,
      levels: {
        grandma: "אוסף קומפוננטות מוכנות (כפתורים, dialogs, dropdowns) שאתה מעתיק לפרויקט. שלך לחלוטין, אפשר לערוך.",
        child: "כמו לבן את הלגו לבד מההוראות — לא קונה ערכה סגורה.",
        soldier: "shadcn/UI = collection של קומפוננטות (Radix + Tailwind). CLI מעתיק קוד לפרויקט שלך. אין dep, אין lock-in.",
        student: "shadcn/UI by Shadcn. Built on Radix UI primitives + styled with Tailwind. CLI: `npx shadcn add button`. Components copy to your codebase. You own + customize.",
        junior: "פעם MUI/Chakra — wrapper סגור, קשה לעצב, גודל bundle גדול. עברתי ל-shadcn — הקומפוננטות שלי, מעצב כל שינוי, bundle minimal.",
        professor: "shadcn/UI is a pattern, not a library. Components based on Radix UI (a11y primitives) + Tailwind. Distribution via CLI: registry of TS+TSX files. No runtime dependency on shadcn itself.",
      },
      illustration:
        "📦 shadcn/UI flow:\n  npx shadcn add button\n   → copies button.tsx to /components/ui/\n   → uses Radix primitives + Tailwind classes\n   → you own the code, edit freely",
      codeExample:
        "# התקנה ראשונית\nnpx shadcn@latest init\n# שואל: TS? Tailwind? CSS variables? components dir?\n\n# הוספת קומפוננטות\nnpx shadcn@latest add button\nnpx shadcn@latest add dialog\nnpx shadcn@latest add form input\n\n# יוצר ב-/components/ui/:\n# button.tsx, dialog.tsx, form.tsx, input.tsx\n\n# שימוש\nimport { Button } from '@/components/ui/button';\nimport { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';\n\nfunction App() {\n  return (\n    <Dialog>\n      <DialogTrigger asChild>\n        <Button variant=\"outline\">Open</Button>\n      </DialogTrigger>\n      <DialogContent>\n        <h2>Hello</h2>\n      </DialogContent>\n    </Dialog>\n  );\n}",
      codeExplanation: "init מקים תצורה. add מעתיק קומפוננטות. אתה ערך כרצונך — אין lock-in. Variants דרך cva (class-variance-authority).",
    },
    {
      conceptName: "Radix UI",
      difficulty: 6,
      levels: {
        grandma: "ספריית בסיסי קומפוננטות עם accessibility מובנה — כל הניהול keyboard, focus, screen reader.",
        child: "כמו לקבל את השלד של רכב — אתה רק צובע.",
        soldier: "Radix UI = unstyled, accessible primitives. Provides behavior (keyboard nav, focus trap, ARIA). No CSS.",
        student: "Radix UI primitives (e.g., DropdownMenu, Dialog, Tabs): WAI-ARIA compliant, keyboard nav, focus management. Composable: <Dialog><Trigger><Content>. Headless = bring your own styling.",
        junior: "פעם עיצבתי dialog — שכחתי focus trap, Esc לסגירה, ARIA. screen reader broken. עם Radix — הכל עובד מהקופסה. אני רק styling.",
        professor: "Radix follows WAI-ARIA Authoring Practices (APG). Each primitive: complete keyboard interaction model, focus management, IDs and aria-* attributes auto-managed. Composability via context-based parts.",
      },
      illustration:
        "🦴 Radix Primitives:\n  Behavior + a11y (Radix)\n      ↓\n  Styling (Tailwind)\n      ↓\n  Your component\n  shadcn = Radix + Tailwind packaged",
      codeExample:
        "// Radix native (without shadcn)\nimport * as DropdownMenu from '@radix-ui/react-dropdown-menu';\n\n<DropdownMenu.Root>\n  <DropdownMenu.Trigger asChild>\n    <button>Options</button>\n  </DropdownMenu.Trigger>\n  <DropdownMenu.Portal>\n    <DropdownMenu.Content>\n      <DropdownMenu.Item>Edit</DropdownMenu.Item>\n      <DropdownMenu.Item>Delete</DropdownMenu.Item>\n    </DropdownMenu.Content>\n  </DropdownMenu.Portal>\n</DropdownMenu.Root>\n\n// shadcn (Radix already wrapped + styled)\nimport {\n  DropdownMenu,\n  DropdownMenuTrigger,\n  DropdownMenuContent,\n  DropdownMenuItem,\n} from '@/components/ui/dropdown-menu';\n\n<DropdownMenu>\n  <DropdownMenuTrigger>Options</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>",
      codeExplanation: "Radix native = primitives unstyled. shadcn = wrapper שנותן styling default. אותם props, אבל styled out-of-the-box.",
    },
    {
      conceptName: "cva (class-variance-authority)",
      difficulty: 7,
      levels: {
        grandma: "כלי שעוזר לעצב variants לקומפוננטה — primary, secondary, danger, וכו' — בלי הרבה כפילויות.",
        child: "כמו תפריט אופציות — בוחר 'גדול וכחול', מקבל את הציור הנכון.",
        soldier: "cva = utility לcomposing Tailwind classes per variants. אותו pattern של API: { variants, defaults, compoundVariants }.",
        student: "cva creates variant builders: button({ variant: 'primary', size: 'lg' }) → string of Tailwind classes. Type-safe via VariantProps. Used heavily in shadcn.",
        junior: "פעם variants כתבתי כ-conditional ternaries בJSX — נורא. עברתי ל-cva: הוגדר פעם אחת, type-safe, ערכים כל variant.",
        professor: "cva by Joe Bell. TS-first. Generates className based on variant input. Compound variants for combined logic (e.g., size=sm AND variant=primary). Slot pattern via cn (clsx + tailwind-merge).",
      },
      illustration:
        "🎨 cva variants:\n  buttonVariants({ variant: 'primary', size: 'lg' })\n   → 'bg-blue-500 text-white px-4 py-2 text-lg'",
      codeExample:
        "// components/ui/button.tsx\nimport { cva, type VariantProps } from 'class-variance-authority';\nimport { cn } from '@/lib/utils';\n\nconst buttonVariants = cva(\n  'inline-flex items-center justify-center rounded-md font-medium transition-colors',\n  {\n    variants: {\n      variant: {\n        default: 'bg-primary text-primary-foreground hover:bg-primary/90',\n        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',\n        outline: 'border border-input bg-background hover:bg-accent',\n        ghost: 'hover:bg-accent hover:text-accent-foreground',\n      },\n      size: {\n        default: 'h-10 px-4 py-2',\n        sm: 'h-9 px-3',\n        lg: 'h-11 px-8',\n      },\n    },\n    defaultVariants: { variant: 'default', size: 'default' },\n  }\n);\n\ninterface ButtonProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement>,\n    VariantProps<typeof buttonVariants> {}\n\nexport function Button({ className, variant, size, ...props }: ButtonProps) {\n  return (\n    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />\n  );\n}\n\n// שימוש\n<Button variant=\"outline\" size=\"lg\">Click</Button>",
      codeExplanation: "cva מקבל base + variants. defaultVariants לדפולט. VariantProps נותן TS types. cn() = clsx + tailwind-merge למיזוג classes.",
    },
    {
      conceptName: "design tokens",
      difficulty: 6,
      levels: {
        grandma: "צבעים, פונטים, רווחים מוגדרים פעם אחת — כל המסך עקבי, שינוי במקום אחד = שינוי בכל מקום.",
        child: "כמו 'הצבע של החברה שלנו' — תמיד אותו, בכל ציור.",
        soldier: "Design tokens = CSS variables לcolors, spacing, fonts. shadcn/Tailwind: --primary, --background, --radius. Theming via CSS vars.",
        student: "Design tokens stored as CSS variables in globals.css. Tailwind config maps tokens (e.g., bg-primary → var(--primary)). Dark mode via [data-theme] attribute.",
        junior: "פעם hardcoded צבעים בכל מקום (#3b82f6 בכל קובץ). שינוי לדארק = רע מאוד. עברתי ל-tokens — שינוי --primary = הכל מתעדכן.",
        professor: "Design tokens (W3C draft spec). Single source of design decisions. Categories: color, typography, spacing, sizing, shadows. Theming via cascade override in CSS.",
      },
      illustration:
        "🎨 Tokens:\n  globals.css:\n    --primary: 222 47% 11%\n    --radius: 0.5rem\n  → Tailwind: bg-primary, rounded-md\n  → consumed in cva variants",
      codeExample:
        "/* globals.css */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 222.2 47.4% 11.2%;\n    --primary: 222.2 47.4% 11.2%;\n    --primary-foreground: 210 40% 98%;\n    --radius: 0.5rem;\n  }\n\n  .dark {\n    --background: 222.2 84% 4.9%;\n    --foreground: 210 40% 98%;\n    --primary: 210 40% 98%;\n    --primary-foreground: 222.2 47.4% 11.2%;\n  }\n}\n\n/* tailwind.config.ts */\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        background: 'hsl(var(--background))',\n        foreground: 'hsl(var(--foreground))',\n        primary: {\n          DEFAULT: 'hsl(var(--primary))',\n          foreground: 'hsl(var(--primary-foreground))',\n        },\n      },\n      borderRadius: {\n        lg: 'var(--radius)',\n        md: 'calc(var(--radius) - 2px)',\n      },\n    },\n  },\n};",
      codeExplanation: "CSS variables ב-:root (light) ו-.dark (override). Tailwind config מצביע ל-vars. שינוי class על body = dark mode טבעי.",
    },
    {
      conceptName: "form integration",
      difficulty: 7,
      levels: {
        grandma: "shadcn מספק קומפוננטת form שמתחברת ישירות ל-react-hook-form + zod — accessibility מובנה.",
        child: "כל הכלים יחד — צבעים, מספריים, דבק — תופרים טופס מסודר.",
        soldier: "shadcn Form = wrapper על RHF + zod. Field, FormControl, FormMessage עם a11y.",
        student: "<Form>, <FormField>, <FormItem>, <FormLabel>, <FormControl>, <FormMessage> — full a11y stack. Auto-wires errors, label associations, screen reader announcements.",
        junior: "פעם עיצבתי טופס ידני — שכחתי לקשר label-input, error לא היה role='alert'. עם shadcn Form — הכל מובנה. accessibility ציון גבוה.",
        professor: "Composable form pattern: Form context provides RHF state. FormField uses Controller. FormMessage subscribes to field error. ARIA attributes (aria-describedby, aria-invalid) auto-set.",
      },
      illustration:
        "🧩 shadcn Form stack:\n  Form (RHF context)\n    FormField (Controller)\n      FormItem (wrapper)\n        FormLabel\n        FormControl (input)\n        FormMessage (error)",
      codeExample:
        "import { zodResolver } from '@hookform/resolvers/zod';\nimport { useForm } from 'react-hook-form';\nimport { z } from 'zod';\nimport {\n  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,\n} from '@/components/ui/form';\nimport { Input } from '@/components/ui/input';\nimport { Button } from '@/components/ui/button';\n\nconst schema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\nfunction LoginForm() {\n  const form = useForm({\n    resolver: zodResolver(schema),\n    defaultValues: { email: '', password: '' },\n  });\n\n  return (\n    <Form {...form}>\n      <form onSubmit={form.handleSubmit(onSubmit)}>\n        <FormField\n          control={form.control}\n          name=\"email\"\n          render={({ field }) => (\n            <FormItem>\n              <FormLabel>Email</FormLabel>\n              <FormControl>\n                <Input type=\"email\" {...field} />\n              </FormControl>\n              <FormMessage />  {/* auto-displays errors */}\n            </FormItem>\n          )}\n        />\n        <Button type=\"submit\">Login</Button>\n      </form>\n    </Form>\n  );\n}",
      codeExplanation: "Form provider RHF. FormField עם control + name. render prop מקבל field — מתחבר ל-Input. FormMessage = error display אוטומטי.",
    },
  ],
};
