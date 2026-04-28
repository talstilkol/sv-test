// data/svcollege_traces_nestjs.js
// SVCollege Finish Line 1 - Nest.js Code Trace practice.

var SVCOLLEGE_NESTJS_TRACES = [
  {
    id: "trace_svnest_001",
    conceptKey: "lesson_nestjs::dependency injection",
    level: 6,
    title: "מעקב אחרי injection של service ל-controller",
    code:
      "@Controller('tasks')\nexport class TasksController {\n  constructor(private readonly tasksService: TasksService) {}\n\n  @Get()\n  findAll() {\n    return this.tasksService.findAll();\n  }\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה route prefix מקבל controller הזה?",
        answer: "tasks",
        acceptable: ["tasks", "/tasks"],
        hint: "קרא את הערך בתוך @Controller.",
      },
      {
        line: 3,
        prompt: "איך TasksService נכנס ל-controller?",
        answer: "דרך constructor injection",
        acceptable: ["constructor", "DI", "dependency injection", "הזרקה"],
        hint: "אין כאן new TasksService.",
      },
      {
        line: 7,
        prompt: "איזו שכבה מבצעת את הלוגיקה בפועל?",
        answer: "TasksService",
        acceptable: ["tasksService", "service", "TasksService"],
        hint: "ה-controller רק קורא ל-service.",
      },
    ],
    explanation:
      "ה-controller מגדיר route דק, מקבל service דרך DI, ומעביר אליו את העבודה.",
    requiredConcepts: ["lesson_nestjs::controller", "lesson_nestjs::dependency injection", "lesson_nestjs::service"],
    requiredTerms: ["@Controller", "constructor", "@Get"],
    sideExplanation:
      "זה ה-flow הבסיסי של Nest: HTTP נכנס ל-controller, אבל הלוגיקה נשארת ב-service.",
  },
  {
    id: "trace_svnest_002",
    conceptKey: "lesson_nestjs::validation pipe",
    level: 6,
    title: "מעקב אחרי request עם DTO ו-ValidationPipe",
    code:
      "app.useGlobalPipes(new ValidationPipe({ whitelist: true }));\n\n@Post()\ncreate(@Body() dto: CreateTaskDto) {\n  return this.tasksService.create(dto);\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה מנגנון בודק את הקלט לפני ה-controller?",
        answer: "ValidationPipe",
        acceptable: ["ValidationPipe", "pipe"],
        hint: "הוא מוגדר כ-global pipe.",
      },
      {
        line: 1,
        prompt: "מה whitelist עוזר לעשות?",
        answer: "להסיר fields שלא מוגדרים ב-DTO",
        acceptable: ["whitelist", "שדות לא מוגדרים", "fields"],
        hint: "זה מגן מפני body עם מידע עודף.",
      },
      {
        line: 4,
        prompt: "מה dto מייצג בשלב הזה?",
        answer: "קלט שעבר validation לפי CreateTaskDto",
        acceptable: ["DTO", "validated input", "קלט תקין"],
        hint: "הוא מגיע מ-@Body.",
      },
    ],
    explanation:
      "הקלט עובר דרך pipe, נבדק לפי DTO, ואז נכנס ל-service בצורה צפויה יותר.",
    requiredConcepts: ["lesson_nestjs::DTO", "lesson_nestjs::validation pipe", "lesson_18::validation"],
    requiredTerms: ["ValidationPipe", "whitelist", "@Body"],
    sideExplanation:
      "TypeScript עוזר למפתח, אבל ValidationPipe הוא השער שבודק request בזמן אמת.",
  },
  {
    id: "trace_svnest_003",
    conceptKey: "lesson_nestjs::guard",
    level: 6,
    title: "מעקב אחרי route שמוגן ב-guard",
    code:
      "@UseGuards(JwtAuthGuard)\n@Get('me')\nprofile(@Req() request) {\n  return this.usersService.findById(request.user.id);\n}",
    steps: [
      {
        line: 1,
        prompt: "מה רץ לפני profile?",
        answer: "JwtAuthGuard",
        acceptable: ["JwtAuthGuard", "guard", "UseGuards"],
        hint: "השורה הראשונה היא שער.",
      },
      {
        line: 2,
        prompt: "איזה endpoint מוגדר כאן?",
        answer: "GET /me",
        acceptable: ["/me", "GET me", "me"],
        hint: "קרא את @Get.",
      },
      {
        line: 4,
        prompt: "מאיפה נלקח user id?",
        answer: "request.user.id",
        acceptable: ["request.user.id", "user id מה-request", "request.user"],
        hint: "ה-guard מוסיף משתמש מאומת ל-request.",
      },
    ],
    explanation:
      "Guard מאמת לפני הכניסה ל-route, וה-controller משתמש בזהות המאומתת במקום לקבל userId מהלקוח.",
    requiredConcepts: ["lesson_nestjs::guard", "lesson_auth_security::JWT", "lesson_auth_security::authorization"],
    requiredTerms: ["@UseGuards", "JwtAuthGuard", "request.user"],
    sideExplanation:
      "בפעולות משתמש, השרת צריך להחליט מי המשתמש מתוך auth context, לא לפי טקסט שהלקוח שולח.",
  },
];

function appendNestjsTraceItemsOnce(target, items) {
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
  window.SVCOLLEGE_NESTJS_TRACES = SVCOLLEGE_NESTJS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendNestjsTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_NESTJS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NESTJS_TRACES: SVCOLLEGE_NESTJS_TRACES };
}
