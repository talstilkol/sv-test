const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadBlueprints() {
  const context = {};
  context.window = context;
  context.global = context;
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, "data/course_blueprints.js"), "utf8"),
    context,
    { filename: "data/course_blueprints.js" },
  );
  return context.COURSE_BLUEPRINTS || context.window.COURSE_BLUEPRINTS || [];
}

describe("SVCollege primary readiness map", () => {
  const blueprints = loadBlueprints();
  const sv = blueprints.find((blueprint) => blueprint.id === "svcollege_fullstack_ai");

  it("marks SVCollege as the primary curriculum target", () => {
    expect(sv).toBeTruthy();
    expect(sv.priority).toBe("primary");
    expect(sv.successTarget).toContain("100%");
    expect(sv.sources.some((source) => source.url === "https://svcollege.co.il/courses/web-development/")).toBe(true);
  });

  it("tracks the public SVCollege curriculum modules explicitly", () => {
    const requiredTitles = [
      "יסודות האינטרנט — HTML בסיסי + HTML/CSS",
      "עיצוב רספונסיבי ו-CSS מתקדם",
      "JavaScript בסיסי ודינמיקה בדפדפן",
      "JavaScript מודרני וכלי פיתוח — ES6, Git, ESLint, Prettier",
      "פיתוח צד-שרת בסיסי — Node.js, npm, Express, REST, middleware",
      "בסיסי נתונים ומידול מידע — MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle",
      "אימות ואבטחה — JWT, Cookies, Supabase/Appwrite/Firebase/Kinde",
      "React ופיתוח Frontend מתקדם",
      "TypeScript ופטרנים מתקדמים ב-React",
      "מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI",
      "פיתוח Full-Stack עם Next.js — SSR, API Routes, SEO",
      "תשתיות, DevOps ו-CI/CD — Vercel, Docker, Docker Compose, testing",
      "Frameworks צד-שרת — Nest.js modules + dependency injection",
      "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI",
      "הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning",
    ];

    const actualTitles = new Set(sv.modules.map((module) => module.title));
    expect(requiredTitles.filter((title) => !actualTitles.has(title))).toEqual([]);
  });

  it("keeps every SVCollege partial/gap module actionable as priority-one work", () => {
    const blocked = sv.modules.filter(
      (module) => ["partial", "gap"].includes(module.status) && !module.primaryGap,
    );
    expect(blocked).toEqual([]);
    expect(sv.recommendedNext.join(" ")).toContain("עדיפות 1");
    expect(sv.recommendedNext.join(" ")).toContain("עדיפות 2");
  });
});
