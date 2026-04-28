// data/svcollege_builds_nestjs.js
// SVCollege Finish Line 1 - Nest.js Mini Build practice.

var SVCOLLEGE_NESTJS_BUILDS = [
  {
    id: "build_svnest_001",
    conceptKey: "lesson_nestjs::module",
    level: 5,
    title: "TasksModule מינימלי",
    prompt:
      "כתוב TasksModule שמחבר TasksController ו-TasksService, ומייבא AuthModule כי ה-routes צריכים משתמש מאומת.",
    starter:
      "@Module({\n  imports: [],\n  controllers: [],\n  providers: [],\n})\nexport class TasksModule {}",
    tests: [
      { regex: "@Module\\s*\\(", description: "מגדיר Nest module", flags: "" },
      { regex: "imports\\s*:\\s*\\[\\s*AuthModule\\s*\\]", description: "מייבא AuthModule", flags: "" },
      { regex: "controllers\\s*:\\s*\\[\\s*TasksController\\s*\\]", description: "מחבר controller", flags: "" },
      { regex: "providers\\s*:\\s*\\[\\s*TasksService\\s*\\]", description: "מחבר service כ-provider", flags: "" },
      { regex: "export\\s+class\\s+TasksModule", description: "מייצא TasksModule", flags: "" },
    ],
    reference:
      "@Module({\n  imports: [AuthModule],\n  controllers: [TasksController],\n  providers: [TasksService],\n})\nexport class TasksModule {}",
    hint:
      "Module הוא manifest קטן: מה נכנס, מי ה-controller ומי ה-providers.",
    explanation:
      "ה-module מחבר את חלקי domain אחד ומייבא יכולות שחסרות לו.",
    requiredConcepts: ["lesson_nestjs::module", "lesson_nestjs::controller", "lesson_nestjs::provider"],
    requiredTerms: ["@Module", "imports", "controllers", "providers"],
    sideExplanation:
      "אם service לא רשום ב-providers, Nest לא יודע להזריק אותו.",
  },
  {
    id: "build_svnest_002",
    conceptKey: "lesson_nestjs::controller",
    level: 6,
    title: "Controller דק עם DTO ו-Guard",
    prompt:
      "כתוב TasksController עם constructor injection ל-TasksService, route POST שמוגן ב-JwtAuthGuard, מקבל CreateTaskDto דרך @Body ומחזיר this.tasksService.create(dto).",
    starter:
      "@Controller('tasks')\nexport class TasksController {\n  // inject service\n  // protect POST\n  // create task\n}",
    tests: [
      { regex: "@Controller\\s*\\(\\s*['\"]tasks['\"]\\s*\\)", description: "מגדיר prefix tasks", flags: "" },
      { regex: "constructor\\s*\\(\\s*private\\s+readonly\\s+tasksService\\s*:\\s*TasksService\\s*\\)", description: "מזריק service דרך constructor", flags: "" },
      { regex: "@UseGuards\\s*\\(\\s*JwtAuthGuard\\s*\\)", description: "מגן על route ב-guard", flags: "" },
      { regex: "@Post\\s*\\(", description: "מגדיר POST endpoint", flags: "" },
      { regex: "@Body\\s*\\(\\s*\\)\\s*dto\\s*:\\s*CreateTaskDto", description: "מקבל DTO מה-body", flags: "" },
      { regex: "this\\.tasksService\\.create\\s*\\(\\s*dto\\s*\\)", description: "מעביר לוגיקה ל-service", flags: "" },
    ],
    reference:
      "@Controller('tasks')\nexport class TasksController {\n  constructor(private readonly tasksService: TasksService) {}\n\n  @UseGuards(JwtAuthGuard)\n  @Post()\n  create(@Body() dto: CreateTaskDto) {\n    return this.tasksService.create(dto);\n  }\n}",
    hint:
      "ה-controller לא צריך לדעת איך שומרים. הוא צריך לקבל request נקי ולהעביר ל-service.",
    explanation:
      "ה-build מתרגל controller דק עם guard, DTO ו-DI.",
    requiredConcepts: ["lesson_nestjs::controller", "lesson_nestjs::guard", "lesson_nestjs::DTO", "lesson_nestjs::dependency injection"],
    requiredTerms: ["@Controller", "@UseGuards", "@Post", "@Body"],
    sideExplanation:
      "זה מבנה production יותר נכון מ-route שמכיל auth, validation ו-database באותו method.",
  },
  {
    id: "build_svnest_003",
    conceptKey: "lesson_nestjs::testing module",
    level: 6,
    title: "TestingModule עם repository מוחלף",
    prompt:
      "כתוב בדיקת Nest שמייצרת TestingModule עבור TasksService ומחליפה TasksRepository ב-fake provider עם findAll שמחזיר מערך ריק.",
    starter:
      "const moduleRef = await Test.createTestingModule({\n  providers: [],\n}).compile();",
    tests: [
      { regex: "Test\\.createTestingModule\\s*\\(", description: "יוצר testing module", flags: "" },
      { regex: "providers\\s*:\\s*\\[", description: "מגדיר providers", flags: "" },
      { regex: "TasksService", description: "כולל TasksService", flags: "" },
      { regex: "provide\\s*:\\s*TasksRepository", description: "מחליף TasksRepository", flags: "" },
      { regex: "useValue\\s*:", description: "משתמש ב-fake provider", flags: "" },
      { regex: "findAll\\s*:\\s*\\(\\s*\\)\\s*=>\\s*\\[\\s*\\]", description: "fake findAll מחזיר מערך ריק", flags: "" },
      { regex: "moduleRef\\.get\\s*\\(\\s*TasksService\\s*\\)", description: "שולף service מה-container", flags: "" },
    ],
    reference:
      "const moduleRef = await Test.createTestingModule({\n  providers: [\n    TasksService,\n    { provide: TasksRepository, useValue: { findAll: () => [] } },\n  ],\n}).compile();\n\nconst service = moduleRef.get(TasksService);",
    hint:
      "בדיקה טובה לא תלויה ב-database אמיתי כאשר היא בודקת service logic.",
    explanation:
      "TestingModule מאפשר לבנות container קטן ולהחליף תלות חיצונית ב-fake provider.",
    requiredConcepts: ["lesson_nestjs::testing module", "lesson_nestjs::repository pattern", "lesson_nestjs::provider"],
    requiredTerms: ["TestingModule", "provider", "useValue", "repository"],
    sideExplanation:
      "מחליפים IO כבד כדי שהבדיקה תהיה מהירה, צפויה וממוקדת בלוגיקה.",
  },
];

function appendNestjsBuildsOnce(target, items) {
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
  window.SVCOLLEGE_NESTJS_BUILDS = SVCOLLEGE_NESTJS_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendNestjsBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_NESTJS_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NESTJS_BUILDS: SVCOLLEGE_NESTJS_BUILDS };
}
