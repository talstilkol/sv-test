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
      levels: {
        grandma:
          "shadcn/UI זה כמו תבניות עוגות שמעתיקים למטבח שלך — לא קונים מחנות ומקבלים. אחרי שיש לך — את יכולה לשנות, לקשט, להוסיף.",
        child:
          "כמו לקבל מתכון להעתיק למחברת — לא לשמור ב-Cloud אצל מישהו אחר. אחרי שהמתכון אצלך — אתה יכול לשנות אותו איך שרוצה.",
        soldier:
          "shadcn/UI: CLI installs components לcode (lib/components/ui/). built on Tailwind + Radix. components: Button, Dialog, Form, Sheet, etc. ownership: yours after copy. updates manual.",
        student:
          "Anti-library philosophy: components are code, not dependencies. Distribution via npx shadcn add button copies source files. Built on accessible primitives (Radix UI), styled with Tailwind, animated with Framer Motion. Theme via CSS variables. Customization unrestricted — you own the code.",
        junior:
          "Real benefits: 1) zero vendor lock-in. 2) Customize freely without fighting library API. 3) New version? cherry-pick changes you want. 4) Smaller bundle — only what you use. Trade-offs: 1) updates require manual diff. 2) Bug fixes don't auto-arrive. 3) Code growth — repo bigger. Strategy: shadcn for foundation, custom for app-specific. Not for non-React frameworks (originally).",
        professor:
          "shadcn/UI represents a paradigm shift from package-based to copy-based component distribution. The trade-off: dependency simplicity vs ownership control. Aligns with the broader 'sour grapes against npm bloat' movement (esbuild, Bun, Deno's std). Comparable conceptually to Bootstrap's Sass-based customization but at component-source level. The pattern enables organization-specific design systems built atop accessible foundations.",
      },
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
      levels: {
        grandma:
          "Radix primitives זה כמו שלד של רהיט — קופסה ריקה אבל חזקה ויציבה. אתה מוסיף את הכיסוי, הצבע, הריפוד — אבל המבנה כבר עובד.",
        child:
          "כמו לקבל בית מאדריכל בלי קישוטים — חדרים, חלונות, דלתות עובדים. אתה רק צובע ומסדר רהיטים. Radix נותן את ה'מבנה הפנימי' של הרכיב.",
        soldier:
          "Radix UI: unstyled, accessible component primitives. Components: Dialog, Popover, Tabs, Accordion, Tooltip, ScrollArea, Slider, etc. handles: focus management, keyboard nav, ARIA, portals, animations. compose with Tailwind/CSS for styling.",
        student:
          "Headless component pattern: separates behavior from appearance. Radix implements WAI-ARIA Authoring Practices for each component. Each primitive composed of sub-components: Root, Trigger, Content. Compound component pattern + Context. Portal rendering for overlays. Controlled and uncontrolled modes. Animation states via data attributes.",
        junior:
          "Production gold: 1) Use Radix Dialog instead of building modal — focus trap + Escape + scroll lock free. 2) Combobox + Command (cmdk) = great search UX. 3) ScrollArea for custom scrollbars. 4) RTL support: ב-Hebrew apps — verify all primitives respect dir. 5) HeadlessUI alternative (Tailwind Labs). 6) ariakit similar but more comprehensive.",
        professor:
          "Headless component libraries (Radix, HeadlessUI, Ariakit, React Aria) implement the Behavioral/Presentational separation. WAI-ARIA Authoring Practices Guide (APG) provides the canonical reference for accessible widget patterns. Implementation challenges: keyboard navigation state machines (combobox, tree), focus management across portals, screen reader announcements. The unstyled approach forces explicit design decisions vs opinionated libraries (MUI, Chakra).",
      },
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
      levels: {
        grandma:
          "accessible primitive זה כמו דלת עם ידית גם למבוגרים וגם לילדים, גם בעלי כסא גלגלים. רכיב נגיש = כל אחד יכול להשתמש.",
        child:
          "כמו דלת אוטומטית בסופר: גם אם הידיים שלך מלאות, גם אם אתה בעגלה — נפתחת. accessible component עובד עם מקלדת, עכבר, קוראי מסך — כולם.",
        soldier:
          "a11y: ARIA roles, aria-* attributes, keyboard support (Tab, Enter, Escape, Arrows), focus visible, screen reader announcements. tools: axe-core (testing), Lighthouse a11y, manual screen reader test (NVDA, VoiceOver, JAWS).",
        student:
          "WCAG (Web Content Accessibility Guidelines) 2.1 levels: A, AA, AAA. Four principles (POUR): Perceivable, Operable, Understandable, Robust. Common patterns: 1) skip links. 2) heading hierarchy. 3) form labels. 4) error announcements. 5) keyboard equivalents. 6) sufficient contrast (4.5:1 normal text). 7) respects prefers-reduced-motion.",
        junior:
          "Real practice: 1) Use semantic HTML first — button > div onClick. 2) Test with keyboard only. 3) Test with screen reader — at least once per release. 4) Color isn't only signal (not just red error — also icon + text). 5) Focus indicators visible — :focus-visible. 6) aria-live='polite' for status messages. 7) RTL: dir='rtl' on root, mirror logical CSS (margin-inline-start). 8) Lighthouse score = baseline, not enough alone.",
        professor:
          "Accessibility (a11y) is rooted in disability rights frameworks (ADA, EU EN 301 549) and W3C standards. The semantic web depends on accessible markup. Assistive technologies (screen readers, switch devices, voice control) interpret ARIA + DOM as accessibility tree. Testing: automated tools catch ~30% of issues; manual testing essential. The field intersects HCI, disability studies, and software engineering — universal design benefits all users.",
      },
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
      levels: {
        grandma:
          "design tokens זה כמו פלטת צבעים שכל הציירים בסטודיו משתמשים: צבע 'ים' זה תמיד אותו ים, 'שמיים' תמיד אותו שמיים. עקביות בכל הציורים.",
        child:
          "כמו ערכת לגו עם צבעים מסוימים: גם אם בונה משהו אחר — הצבעים זהים. design tokens = הצבעים, הגדלים, הקפלים שכולם משתמשים בהם.",
        soldier:
          "design tokens: CSS variables / Tailwind config. categories: color (primary, accent, destructive), spacing (4, 8, 16), radius (sm, md, lg), typography (font-size, line-height), shadow. tokenized values, semantic names (--background, NOT --gray-100).",
        student:
          "Token tiers: 1) Primitive (--blue-500) — raw values. 2) Semantic (--brand) — meaningful aliases. 3) Component (--button-bg) — context-specific. Token formats: W3C Design Tokens Community Group spec, Style Dictionary, Figma Tokens plugin. Cross-platform: same tokens → CSS, iOS, Android. Theming = swap tier 1 references.",
        junior:
          "Real implementation: 1) HSL > Hex for variables — easier opacity manipulation. 2) shadcn pattern: CSS variables in globals.css, Tailwind references via theme.extend. 3) Don't proliferate tokens — 8 colors > 50. 4) Document tokens in Storybook/zeroheight. 5) Sync with Figma — tokens are source of truth design+code. 6) Spacing scale: 4-based or T-shirt (xs/sm/md/lg/xl).",
        professor:
          "Design tokens (Adobe 2014) abstract design decisions as a single source of truth, separating design from implementation. The pattern enables systematic theming, dark mode, brand switching, and platform consistency. Token taxonomies (primitive → semantic → component) reflect dependency hierarchy. The W3C Design Tokens Format Module standardizes JSON-based exchange enabling tool interoperability (Figma → Style Dictionary → CSS/iOS/Android).",
      },
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
      levels: {
        grandma:
          "variants זה כמו תפריט מוגבל בקפה: יש קפוצ'ינו, אספרסו, אמריקנו. לא מזמינים 'משהו עם חלב, קצת עם פלפל'. בחירה מתוך אפשרויות מוגדרות.",
        child:
          "כמו צבעים בעט: יש כחול, אדום, ירוק. אסור לבקש 'אדום-כחול-משולב'. variants = הצורות המוכנות של הרכיב.",
        soldier:
          "variants: predefined visual states. typical Button: variant (default, destructive, outline, ghost, link), size (sm, default, lg, icon). usage: <Button variant='destructive' size='sm'>. all variants share base styles + variant-specific overrides.",
        student:
          "Variant patterns: Button (variant + size), Badge (variant + style), Alert (variant: info/warning/error/success). Implementation: cva (class-variance-authority), tv (tailwind-variants), or manual className mapping. Composability: compoundVariants for variant combinations. Defaults: defaultVariants ensures fallback behavior.",
        junior:
          "Real life: 1) Limit variants — too many = inconsistent. 5 button variants is a lot. 2) Naming = semantic, not visual: destructive (NOT red), success (NOT green) — for theming. 3) Document each variant with use case. 4) States separate from variants: hover, focus, disabled — CSS pseudo. 5) Loading state often forgotten — add to base. 6) Test all variants in dark mode + RTL.",
        professor:
          "Component variants encode design system rules in code, constraining UI to approved combinations. The pattern aligns with type theory: variants are sum types over visual states. Compound variants compose multiplicatively requiring careful design (combinatorial explosion). Variant API design influences DX significantly — overly granular variants slip toward arbitrary classNames; too coarse variants force escape hatches.",
      },
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
      levels: {
        grandma:
          "cn helper זה כמו עוזרת שמרכזת רשימת מצרכים: גם אם רשמת חלב פעמיים — היא תקנה רק פעם אחת. סופרת ומסדרת לפני קנייה.",
        child:
          "כמו לסדר את הבגדים בארון: לא 2 חולצות אדומות באותה תלייה. cn מסדר את ה-classes — מסיר כפילויות, ממזג עם תנאים.",
        soldier:
          "cn = clsx + tailwind-merge. clsx joins class strings conditionally. tailwind-merge resolves Tailwind conflicts ('p-2 p-4' → 'p-4'). usage: cn('base', condition && 'variant', { class: bool }, props.className).",
        student:
          "Implementation: import { clsx } + import { twMerge }. clsx supports strings, arrays, objects, booleans. tailwind-merge knows Tailwind class semantics (recognizes p-2 vs px-2 conflicts). Combined cn function = cleanest API. Alternative: classix, classnames (no merge), tailwind-variants includes both.",
        junior:
          "Real practice: 1) cn(props.className) at end allows consumer overrides. 2) Conditional: cn('base', isActive && 'bg-blue', error && 'border-red'). 3) Don't pass dynamic Tailwind classes (cn(`bg-${color}-500`)) — Tailwind JIT can't see. Use lookup. 4) Tests: render with different conditions, check className. 5) DX win: shadcn pattern uses cn(buttonVariants({variant, size}), className).",
        professor:
          "The cn helper composes the conditional class-name (clsx) and Tailwind-aware merging (tailwind-merge) primitives. Tailwind-merge resolves the last-wins semantics of CSS by understanding utility classes' specificity domains. The pattern emerged from Tailwind's atomic CSS philosophy: composability requires conflict resolution. Compared to traditional CSS-in-JS (styled-components, emotion), this approach maintains static class generation enabling tree-shaking.",
      },
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
      levels: {
        grandma:
          "cva זה כמו מפעל ארגז כלים: יש את הבסיס (פטיש), ויש variants (גודל, חומר). הכל מאורגן במקום אחד עם כללים ברורים.",
        child:
          "כמו תפריט במסעדת המבורגר: בסיס בסיסי + ביצה? + גבינה? + פטריות? כל variant מוגדר. cva זה התפריט המסודר.",
        soldier:
          "class-variance-authority: cva(base, { variants: { variant: { x: '...', y: '...' }, size: { ... } }, defaultVariants: { variant: 'default' }, compoundVariants: [...] }). returns function: variants({variant, size}) → string.",
        student:
          "cva structure: 1) base — always-applied classes. 2) variants — keyed objects per variant prop. 3) defaultVariants — fallback values. 4) compoundVariants — array of {variant combinations + class}. Type-safe: VariantProps<typeof variants> infers TS types. Used internally by shadcn/UI extensively.",
        junior:
          "Real benefit: 1) Type safety — variants becomes typed prop. 2) Auto-completion in IDE. 3) compoundVariants for niche cases: variant=ghost + size=icon = special bg. 4) Don't over-engineer — 3 variants might not need cva. 5) Alternative: tailwind-variants (TV) — newer, similar API + slot support. 6) keep variants in same file as component.",
        professor:
          "cva (class-variance-authority) formalizes variant definition with TypeScript inference. The API decouples variant configuration from template, supporting compound conditions and defaults. It implements the Strategy pattern for styling decisions. tailwind-variants extends with slot support (multiple parts of a component). The pattern parallels Stitches/Vanilla Extract for design-system-as-code, but compatible with Tailwind's utility-first approach.",
      },
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
      levels: {
        grandma:
          "asChild זה כמו לתת בגד של אמא לילדה: היא לובשת את שלך ונראית כמוך, אבל היא עדיין הילדה. ה-link לובש את ה-Button styling אבל נשאר link.",
        child:
          "כמו תחפושת: אתה לובש בגדי של מלך, אבל אתה עדיין אתה. asChild = רכיב מתחפש לרכיב אחר אבל שומר את הזהות שלו (link, NOT button).",
        soldier:
          "Radix Slot: <Button asChild><a>...</a></Button>. ה-Button מעביר ref + props ל-child. ה-child remains semantic element. usage: navigation buttons that are actually links.",
        student:
          "Slot pattern: child as render-target instead of wrapping. Implementation: React.cloneElement merges props/ref/className. Polymorphic components: pass as prop ('as=\"a\"'). asChild composition cleaner — no string-based as prop. Benefits: correct semantic HTML, accessibility (links navigate, buttons trigger), single styling source.",
        junior:
          "Practice: 1) Button → Link via asChild = correct pattern. 2) NEVER nest button inside anchor — invalid HTML. 3) asChild expects single child element. 4) className merging: Slot uses Radix mergeProps logic. 5) ref forwarding free with Slot. 6) onClick conflicts: child handler + Button handler — Slot calls both. 7) TypeScript: asChild ? AnchorProps : ButtonProps — discriminated union.",
        professor:
          "The asChild/Slot pattern (Radix UI) implements a polymorphic component without runtime type switching, leveraging React.Children + cloneElement. It addresses the limitation of HTML's nested-interactive-element prohibition while maintaining semantic correctness. Compared to the 'as' prop pattern (styled-components, Mantine), Slot avoids prop name collisions and TypeScript complexity. The pattern parallels Vue's slot system at the React composition level.",
      },
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
      levels: {
        grandma:
          "form field זה כמו טופס בבנק: שם השדה (label), קו ריק למילוי (input), הסבר קטן ('עד 8 ספרות'), והודעה אדומה אם טעית. הכל מחובר.",
        child:
          "כמו דף הרשמה לחוג: יש שדה 'שם', שדה 'גיל', והערה: 'אם טעית — תיקון'. כל שדה מסודר עם label, מקום למילוי, ועזרה.",
        soldier:
          "form field structure: <Label htmlFor='id'> + <Input id='id' aria-describedby='help error' aria-invalid={!!error}> + help text + error message. accessibility: label connection, error announcement (role='alert' or aria-live='polite').",
        student:
          "Form composition libraries: react-hook-form (most popular), Formik (older), TanStack Form (typed). validation: zod / yup schemas. shadcn Form component wraps react-hook-form + Radix Form primitives. Components: FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage. Each handles aria-* automatically.",
        junior:
          "Real production: 1) react-hook-form + zodResolver = best-in-class. 2) ALWAYS aria-describedby pointing to error + help. 3) aria-invalid={fieldState.invalid} for screen reader. 4) Required: visible *, aria-required, native required (defense in depth). 5) Error timing: onSubmit (not onChange) for first interaction; onChange after first error. 6) Server errors: setError API in RHF. 7) Hebrew: dir='auto' or 'rtl', validate placeholders carefully.",
        professor:
          "Accessible form composition aligns ARIA's name/role/value model with form semantics. The label-control association via 'for'/'id' or implicit nesting is foundational. WAI-ARIA describes additional patterns: aria-invalid, aria-describedby, aria-required, aria-errormessage. Modern form libraries (react-hook-form, TanStack Form) abstract validation, state, and accessibility while preserving uncontrolled performance. The shift from controlled to uncontrolled (RHF) eliminates re-render performance concerns.",
      },
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
      levels: {
        grandma:
          "theme tokens זה כמו תאורה במלון: אותו חדר נראה אחר ביום ובלילה, אבל הרהיטים אותם רהיטים. רק האור משתנה. tokens משנים צבע — לא מבנה.",
        child:
          "כמו פילטר באינסטגרם: אותה תמונה — שני מצבי רוח. dark/light = שתי 'תחפושות' לאותם רכיבים. אסור לבנות שני אתרים — רק token חדש.",
        soldier:
          "theme tokens: same name, different value per theme. CSS: :root { --bg: white; } .dark { --bg: black; }. components reference --bg always; theme switching changes CSS var. Tailwind: dark: prefix + class strategy or media-query strategy.",
        student:
          "Theme implementation: 1) ThemeProvider sets 'theme' attribute or class on html. 2) CSS variables override per theme. 3) Tailwind dark: prefix maps to .dark class. 4) System preference: prefers-color-scheme. 5) Persistence: localStorage + initial script (avoid FOUC). next-themes library handles this. 6) Multiple themes: brand-blue, brand-green, etc.",
        junior:
          "Real implementation: 1) next-themes for Next.js — proven. 2) FOUC prevention: blocking script before render or theme-aware SSR. 3) Color contrast different per theme — verify both pass WCAG. 4) Images: provide light + dark variants or use opacity overlay. 5) Charts: theme-aware color palette. 6) Print styles: force light. 7) System theme detection + manual override + 'system' option = standard UX.",
        professor:
          "Theme systems leverage CSS Custom Properties (CSS Variables) for runtime theming without re-parsing stylesheets. The cascade: :root tokens, theme-class overrides, component-level overrides. Architectural pattern: tokens → themes → components, dependency flowing inward. Color theory considerations: maintain contrast ratios across themes; semantic naming (primary vs blue) enables theme variation. Modern alternatives: CSS Color Functions (color-mix, light-dark) reduce JS dependency.",
      },
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
      levels: {
        grandma:
          "component registry זה כמו ספריית מתכונים בארגון: כל מי שמבשל יודע מאיפה לקחת. אסור לכתוב מתכון חדש לכל ארוחה — לוקחים מהספרייה.",
        child:
          "כמו מחסן צעצועים בכיתה: כל הילדים יודעים שהמשחקים שם. registry = המחסן של רכיבי UI שכולם משתמשים בהם.",
        soldier:
          "registry structure: components/ui/ (primitives), components/forms/ (composed), components/layout/. naming: kebab-case files, PascalCase exports. index.ts re-exports. Storybook לdoc + visual.",
        student:
          "Registry organization: 1) Tier 1 — primitives (Button, Input, Dialog). 2) Tier 2 — composed (Form, DataTable, Card). 3) Tier 3 — feature-specific (UserAvatar, ProductCard). Tools: Storybook (visual catalog), Ladle (faster alternative), Zeroheight (designer-developer doc), Docusaurus. shadcn registry distributes via JSON-as-CLI.",
        junior:
          "Real practice: 1) Storybook for ALL primitives — visual + interactive testing. 2) Document props + usage in Storybook docs. 3) Visual regression: Chromatic, Percy. 4) Migration path when API changes — document. 5) Component status: experimental/stable/deprecated. 6) Audit unused components quarterly. 7) Ban ad-hoc components — code review enforces.",
        professor:
          "Component registries materialize the design system as a discoverable, governed catalog. The pattern parallels package registries (npm) but at organizational scope. Storybook (Almeida 2016) introduced component-driven development workflows. Trade-offs: governance overhead vs proliferation. Modern variants: Backstage (Spotify) + plugin systems for cataloging beyond UI. The registry is sociotechnical — adoption depends on culture as much as tooling.",
      },
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
      levels: {
        grandma:
          "design system testing זה כמו לבדוק שכל מצרך במכולת באיכות גבוהה לפני שמוכרים — אם הביצים שבורות, כל המתכונים יסבלו.",
        child:
          "כמו לבדוק שהמספריים חדים, שהדבק עובד, שהעטים כותבים — לפני שמתחילים פרויקט. אם רכיב בסיסי שבור, כל מסך יישבר.",
        soldier:
          "tests for components: 1) renders. 2) all variants. 3) keyboard navigation. 4) accessibility (axe). 5) dark mode. 6) responsive. tools: Vitest + Testing Library, Playwright, Storybook + interactions, axe-core. snapshot for visual.",
        student:
          "Testing pyramid for design system: 1) Unit (props → render). 2) Interaction (Testing Library user events). 3) Accessibility (jest-axe, axe-playwright). 4) Visual regression (Chromatic, Percy, Playwright screenshots). 5) Cross-browser (Playwright multi-browser). 6) Manual screen reader (NVDA/VoiceOver). Storybook stories double as tests via play function.",
        junior:
          "Real production: 1) ALL primitives = a11y tested with axe. 2) Visual regression on every PR. 3) Test all variants explicitly. 4) Test keyboard explicitly: tab order, Escape, Enter. 5) Test disabled state actually prevents action. 6) RTL tests — at least one. 7) Reduced-motion tests. 8) Loading states. 9) Error states. 10) Empty states. 11) Long content (truncation, wrapping).",
        professor:
          "Design system testing applies multi-layered verification: structural (DOM), behavioral (interactions), accessibility (assistive technology), and visual (rendering fidelity). Component-driven development (Almeida) shifts testing left — components tested in isolation before integration. Visual regression detects unintended visual changes via image-diff algorithms. Modern challenges: testing dynamic theming, responsive behavior, animation states — addressed via parameterized stories and time-controlled tests.",
      },
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
