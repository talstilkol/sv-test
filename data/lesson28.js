// data/lesson28.js — שיעור 28: Forms — react-hook-form + zod
// טפסים מודרניים. מבחן: 5-7 שאלות צפויות.
var LESSON_28 = {
  id: "lesson_28",
  title: "שיעור 28 — Forms — react-hook-form + zod",
  description:
    "טפסים מודרניים ב-React: react-hook-form לניהול state, zod לוולידציה, integration עם TS.",
  concepts: [
    {
      conceptName: "controlled input",
      difficulty: 4,
      levels: {
        grandma: "input שערכו בכל רגע ידוע ל-React — value נשלט מ-state.",
        child: "כמו לוח שאתה מנגב ומחדש כל פעם — הערך תמיד תחת שליטה.",
        soldier: "Controlled = value שלוקח מ-state, onChange מעדכן state. The single source of truth.",
        student: "Controlled inputs: <input value={x} onChange={e => setX(e.target.value)}>. Uncontrolled: useRef + defaultValue. Controlled = standard for React.",
        junior: "פעם השתמשתי ב-useState + onChange לכל field — 10 fields = 10 useState. עברתי ל-useReducer או react-hook-form. הקוד נקי 5x.",
        professor: "Controlled components: React owns state. Uncontrolled: DOM owns state. Controlled enables real-time validation, formatting, conditional UI. Performance cost negligible for small forms.",
      },
      illustration: "🎮 Controlled vs Uncontrolled:\n  Controlled:   value={state}, onChange={set}\n  Uncontrolled: defaultValue={x}, ref={ref}",
      codeExample:
        "// Controlled\nfunction LoginForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log({ email, password });\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type=\"email\"\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n        required\n      />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n        required\n      />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}",
      codeExplanation: "value בא מ-state. onChange קורא ל-setter. e.preventDefault() ב-submit. ההגיון: state = source of truth.",
    },
    {
      conceptName: "react-hook-form",
      difficulty: 6,
      levels: {
        grandma: "ספרייה שמטפלת בכל הבירוקרטיה של טופס ב-React — minimal re-renders, ולידציה, errors.",
        child: "כמו עוזרת מטבח שמכינה הכל מוכן — אתה רק מגיש.",
        soldier: "react-hook-form = uncontrolled-first form library. Performance: רינדורים מינימליים.",
        student: "RHF approach: refs over state, validation on demand. APIs: useForm, register, handleSubmit, formState. Fewer re-renders than controlled.",
        junior: "פעם 10 inputs = 10 useState + 10 onChange. עם RHF: register('email') מחבר input ל-form-state אוטומטית, useForm מנהל הכל.",
        professor: "RHF uses uncontrolled inputs + refs. Validates on blur/submit/change. Subscription model: only relevant fields re-render. Integrates with zod, yup, joi via resolvers.",
      },
      illustration:
        "📋 react-hook-form:\n  useForm() → { register, handleSubmit, formState }\n  <input {...register('name')} />\n  → אוטומטית מתחבר ל-form-state",
      codeExample:
        "import { useForm } from 'react-hook-form';\n\nfunction LoginForm() {\n  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();\n\n  const onSubmit = async (data) => {\n    console.log(data);  // { email, password }\n    await fetch('/api/login', { method: 'POST', body: JSON.stringify(data) });\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input\n        type=\"email\"\n        {...register('email', {\n          required: 'אימייל חובה',\n          pattern: { value: /^[^@]+@[^@]+/, message: 'אימייל לא תקין' }\n        })}\n      />\n      {errors.email && <span>{errors.email.message}</span>}\n\n      <input\n        type=\"password\"\n        {...register('password', {\n          required: 'סיסמה חובה',\n          minLength: { value: 8, message: 'מינימום 8 תווים' }\n        })}\n      />\n      {errors.password && <span>{errors.password.message}</span>}\n\n      <button type=\"submit\" disabled={isSubmitting}>Login</button>\n    </form>\n  );\n}",
      codeExplanation: "register('name') מחזיר {name, ref, onChange, onBlur} — מתחבר ב-spread. handleSubmit עוטף עם validation. formState.errors per field. isSubmitting ל-loading state.",
    },
    {
      conceptName: "zod",
      difficulty: 6,
      levels: {
        grandma: "ספרייה שבודקת את הנתונים שלך — אם משהו לא תקין, מודיעה לך עם הודעה ברורה.",
        child: "כמו שומר בכניסה למסיבה — בודק שיש לך הזמנה ושאתה בגיל הנכון.",
        soldier: "Zod = TypeScript-first schema validation. Define shape, parse data, get typed result + errors.",
        student: "Zod schemas: z.string(), z.number(), z.object({...}). Parse: schema.parse(data) → throws on fail. safeParse → { success, data, error }. Inferred types: type T = z.infer<typeof schema>.",
        junior: "פעם בדקתי data ידני בקוד: if (typeof email !== 'string') ... — נורא. עם zod: schema.parse(data) ו-זה עוצר אם לא תקין, גם נותן TS types בחינם.",
        professor: "Zod = runtime + compile-time type validation. Composable schemas (extend, merge, partial, omit, pick). Refinements (.refine for custom logic). Coercion (.coerce). Performance: lazy parsing for large schemas.",
      },
      illustration:
        "✅ zod schema:\n  const User = z.object({\n    email: z.string().email(),\n    age: z.number().min(18),\n  });\n  type User = z.infer<typeof User>;  // TS type בחינם",
      codeExample:
        "import { z } from 'zod';\n\n// הגדר schema\nconst LoginSchema = z.object({\n  email: z.string().email('אימייל לא תקין'),\n  password: z.string().min(8, 'מינימום 8 תווים'),\n  age: z.number().int().min(18, 'מעל 18'),\n  role: z.enum(['admin', 'user', 'guest']),\n  bio: z.string().optional(),  // אופציונלי\n});\n\n// TypeScript type בחינם!\ntype Login = z.infer<typeof LoginSchema>;\n// type Login = { email: string; password: string; age: number; role: 'admin' | 'user' | 'guest'; bio?: string }\n\n// Parse — throws if invalid\ntry {\n  const valid = LoginSchema.parse(formData);\n  // valid is fully typed\n} catch (err) {\n  if (err instanceof z.ZodError) {\n    console.log(err.errors);  // [{path, message}, ...]\n  }\n}\n\n// Safe parse — no throw\nconst result = LoginSchema.safeParse(formData);\nif (!result.success) {\n  console.log(result.error.errors);\n} else {\n  const data = result.data;  // typed\n}\n\n// Refinement — custom validation\nconst Schema = z.string().refine(\n  s => s.includes('@'),\n  { message: 'must include @' }\n);",
      codeExplanation: "z.object/string/number/enum. .min/.max/.email/.regex לconstraints. .optional() לnullable. .infer<> = TS types. parse throws, safeParse returns { success, data, error }.",
    },
    {
      conceptName: "RHF + zod",
      difficulty: 7,
      levels: {
        grandma: "השילוב הכי טוב: react-hook-form לטיפול בטופס + zod לוולידציה. הכל typed.",
        child: "צוות חלומי — אחד מנהל את הטופס, השני בודק שהכל תקין.",
        soldier: "RHF resolver: zodResolver(schema). Errors מתורגמים אוטומטית.",
        student: "@hookform/resolvers/zod. useForm({ resolver: zodResolver(schema) }). Validation runs on each event (mode option). errors ב-formState עם paths.",
        junior: "התחלתי עם RHF rules ידני (required, pattern). הסתבכתי. עברתי ל-zod schema — שני המקורות truth → אחד. ה-TS types גם נותנים autocomplete.",
        professor: "Schema-first form validation. Single source of truth: schema defines both type and validation. Server-side reuse: same schema in API route. End-to-end type safety.",
      },
      illustration:
        "🔧 RHF + zod stack:\n  zod schema → defines shape + validation\n   ↓\n  RHF resolver → integrates\n   ↓\n  TypeScript → types + autocomplete\n   ↓\n  Server: reuse schema for backend validation",
      codeExample:
        "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst LoginSchema = z.object({\n  email: z.string().email('אימייל לא תקין'),\n  password: z.string().min(8, 'מינימום 8 תווים'),\n});\n\ntype LoginForm = z.infer<typeof LoginSchema>;\n\nfunction LoginPage() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors, isSubmitting }\n  } = useForm<LoginForm>({\n    resolver: zodResolver(LoginSchema),\n    mode: 'onBlur',  // validate on blur (default 'onSubmit')\n  });\n\n  const onSubmit = async (data: LoginForm) => {\n    // data is fully typed!\n    await fetch('/api/login', {\n      method: 'POST',\n      body: JSON.stringify(data)\n    });\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register('email')} />\n      {errors.email && <span>{errors.email.message}</span>}\n\n      <input type=\"password\" {...register('password')} />\n      {errors.password && <span>{errors.password.message}</span>}\n\n      <button disabled={isSubmitting}>Login</button>\n    </form>\n  );\n}",
      codeExplanation: "zodResolver מחבר זוד ל-RHF. useForm<TypeFromSchema> = TS strict. errors.email.message — error מ-zod schema. data ב-onSubmit fully typed.",
    },
    {
      conceptName: "form state",
      difficulty: 5,
      levels: {
        grandma: "מצב הטופס — האם תקין? נשלח? יש שגיאות? RHF נותן את כולם.",
        child: "כמו לוח התקדמות במשחק — אחוז סיום, רמה, חיים.",
        soldier: "formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, isValid, touchedFields }.",
        student: "RHF formState properties: isDirty (any change), isValid (passes validation), isSubmitting, errors (per field), touchedFields (visited), defaultValues. Use to drive UI (disable button, show indicators).",
        junior: "פעם בניתי isLoading state ידני. עם RHF: isSubmitting אוטומטי. גם isValid לבטן submit אם invalid.",
        professor: "formState is reactive — only re-renders subscribed components. proxy-based: subscribing to errors doesn't trigger re-render on isDirty. Performance optimization out of the box.",
      },
      illustration:
        "📊 formState:\n  isDirty: false → true (after first edit)\n  touchedFields: {email: true} (after blur)\n  errors: {email: {message: '...'}}\n  isValid: false until all valid\n  isSubmitting: true during onSubmit",
      codeExample:
        "const {\n  register,\n  handleSubmit,\n  formState: {\n    errors,           // per-field errors\n    isDirty,          // user changed anything?\n    isValid,          // passes validation?\n    isSubmitting,     // currently submitting?\n    isSubmitSuccessful, // submitted successfully\n    touchedFields,    // user blurred (visited) fields\n    submitCount,      // number of submissions\n  },\n  reset,              // reset form\n  setValue,           // programmatically set\n  watch,              // subscribe to value changes\n} = useForm({ resolver: zodResolver(schema) });\n\n// Disable submit if invalid or submitting\n<button disabled={!isValid || isSubmitting}>Submit</button>\n\n// Show 'unsaved changes' warning\nif (isDirty) console.log('user has unsaved changes');\n\n// Watch a field reactively\nconst email = watch('email');\nuseEffect(() => {\n  console.log('email changed:', email);\n}, [email]);\n\n// Reset after success\nuseEffect(() => {\n  if (isSubmitSuccessful) reset();\n}, [isSubmitSuccessful]);",
      codeExplanation: "formState עשיר: errors, isDirty, isValid, isSubmitting. שימושים: disable button, unsaved warning, reset post-submit. watch ל-reactive value.",
    },
  ],
};
