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
  {
    id: "trace_svnest_004",
    conceptKey: "lesson_nestjs::decorator",
    level: 6,
    title: "מעקב אחרי decorators שמחברים HTTP ל-method",
    code:
      "@Controller('tasks')\nexport class TasksController {\n  @Post()\n  create(@Body() dto: CreateTaskDto) {\n    return this.tasksService.create(dto);\n  }\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה decorator קובע את ה-prefix של ה-controller?",
        answer: "@Controller('tasks')",
        acceptable: ["@Controller", "Controller", "tasks"],
        hint: "זה decorator ברמת class.",
      },
      {
        line: 3,
        prompt: "איזה decorator הופך method ל-POST endpoint?",
        answer: "@Post()",
        acceptable: ["@Post", "Post"],
        hint: "הוא נמצא מעל create.",
      },
      {
        line: 4,
        prompt: "איזה decorator אומר ל-Nest לקחת נתונים מה-request body?",
        answer: "@Body()",
        acceptable: ["@Body", "Body"],
        hint: "הוא נמצא ליד dto.",
      },
    ],
    explanation:
      "Decorators הם metadata: הם מספרים ל-Nest איך לחבר class ו-method ל-route ולקלט HTTP.",
    requiredConcepts: ["lesson_nestjs::decorator", "lesson_nestjs::controller", "lesson_nestjs::DTO"],
    requiredTerms: ["@Controller", "@Post", "@Body"],
    sideExplanation:
      "ב-Nest הרבה routing נראה קצר כי ה-framework קורא metadata מ-decorators בזמן runtime.",
  },
  {
    id: "trace_svnest_005",
    conceptKey: "lesson_nestjs::DTO",
    level: 6,
    title: "מעקב אחרי DTO כחוזה קלט",
    code:
      "export class CreateTaskDto {\n  title: string;\n  done?: boolean;\n}\n\ncreate(@Body() dto: CreateTaskDto) {\n  return this.tasksService.create(dto);\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה class מתאר את צורת הקלט?",
        answer: "CreateTaskDto",
        acceptable: ["CreateTaskDto", "DTO"],
        hint: "השם מסתיים ב-Dto.",
      },
      {
        line: 3,
        prompt: "איזה field הוא אופציונלי?",
        answer: "done",
        acceptable: ["done", "done?"],
        hint: "חפש סימן שאלה.",
      },
      {
        line: 6,
        prompt: "איפה ה-DTO נכנס ל-controller?",
        answer: "ב-@Body() dto",
        acceptable: ["@Body", "dto", "body"],
        hint: "ה-method מקבל dto מה-body.",
      },
    ],
    explanation:
      "DTO לא שומר נתונים בעצמו; הוא מגדיר חוזה קלט שה-controller וה-validation יכולים לעבוד לפיו.",
    requiredConcepts: ["lesson_nestjs::DTO", "lesson_nestjs::decorator", "lesson_18::validation"],
    requiredTerms: ["CreateTaskDto", "done?", "@Body"],
    sideExplanation:
      "בלי DTO ברור, השרת מקבל body פתוח מדי וקשה לדעת מה client רשאי לשלוח.",
  },
  {
    id: "trace_svnest_006",
    conceptKey: "lesson_nestjs::exception filter",
    level: 6,
    title: "מעקב אחרי exception filter ל-404",
    code:
      "@Catch(NotFoundException)\nexport class NotFoundFilter implements ExceptionFilter {\n  catch(error, host) {\n    const response = host.switchToHttp().getResponse();\n    response.status(404).json({ message: error.message });\n  }\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה סוג error ה-filter תופס?",
        answer: "NotFoundException",
        acceptable: ["NotFoundException", "not found", "404"],
        hint: "הוא מופיע בתוך @Catch.",
      },
      {
        line: 4,
        prompt: "איזה אובייקט נשלף מתוך HTTP context?",
        answer: "response",
        acceptable: ["response", "getResponse"],
        hint: "חפש getResponse.",
      },
      {
        line: 5,
        prompt: "איזה status חוזר ללקוח?",
        answer: "404",
        acceptable: ["404", "status 404"],
        hint: "קרא את response.status.",
      },
    ],
    explanation:
      "Exception filter תופס חריגה ידועה ומתרגם אותה לתשובת HTTP עקבית במקום לפזר טיפול ב-errors בכל route.",
    requiredConcepts: ["lesson_nestjs::exception filter", "lesson_15::Error", "lesson_17::Status Codes"],
    requiredTerms: ["@Catch", "NotFoundException", "ExceptionFilter"],
    sideExplanation:
      "כך backend שומר על שפה עקבית של שגיאות: status, message ו-shape קבועים.",
  },
  {
    id: "trace_svnest_007",
    conceptKey: "lesson_nestjs::interceptor",
    level: 6,
    title: "מעקב אחרי interceptor שמודד זמן תגובה",
    code:
      "@UseInterceptors(TimingInterceptor)\n@Get()\nfindAll() {\n  return this.tasksService.findAll();\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה interceptor עוטף את ה-route?",
        answer: "TimingInterceptor",
        acceptable: ["TimingInterceptor", "interceptor"],
        hint: "הוא מופיע בתוך @UseInterceptors.",
      },
      {
        line: 2,
        prompt: "איזה HTTP method מוגדר ל-handler?",
        answer: "GET",
        acceptable: ["GET", "@Get"],
        hint: "קרא את decorator מעל findAll.",
      },
      {
        line: 4,
        prompt: "מה עדיין נשאר באחריות service?",
        answer: "שליפת המשימות",
        acceptable: ["findAll", "tasksService", "business logic", "לוגיקה"],
        hint: "ה-interceptor לא מחליף את ה-service.",
      },
    ],
    explanation:
      "Interceptor רץ סביב handler פעיל: הוא מתאים למדידה, serialization או עיצוב response, לא להחלטת הרשאה.",
    requiredConcepts: ["lesson_nestjs::interceptor", "lesson_nestjs::controller", "lesson_nestjs::service"],
    requiredTerms: ["@UseInterceptors", "TimingInterceptor", "@Get"],
    sideExplanation:
      "הבדל חשוב למבחן: guard מחליט אם ממשיכים; interceptor עוטף פעולה שממשיכה.",
  },
  {
    id: "trace_svnest_008",
    conceptKey: "lesson_nestjs::middleware",
    level: 5,
    title: "מעקב אחרי middleware שמחובר לכל routes",
    code:
      "export class AppModule implements NestModule {\n  configure(consumer: MiddlewareConsumer) {\n    consumer.apply(RequestLoggerMiddleware).forRoutes('*');\n  }\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה interface מאפשר להגדיר middleware ב-module?",
        answer: "NestModule",
        acceptable: ["NestModule"],
        hint: "ה-class implements אותו.",
      },
      {
        line: 3,
        prompt: "איזה middleware מחובר כאן?",
        answer: "RequestLoggerMiddleware",
        acceptable: ["RequestLoggerMiddleware", "logger"],
        hint: "הוא נמצא בתוך apply.",
      },
      {
        line: 3,
        prompt: "לאילו routes הוא מחובר?",
        answer: "לכל routes",
        acceptable: ["*", "all routes", "כל routes", "כולם"],
        hint: "קרא את forRoutes.",
      },
    ],
    explanation:
      "Middleware מתאים לפעולות רוחביות לפני controller, כמו logging או correlation id.",
    requiredConcepts: ["lesson_nestjs::middleware", "lesson_17::middleware", "lesson_nestjs::module"],
    requiredTerms: ["NestModule", "MiddlewareConsumer", "forRoutes"],
    sideExplanation:
      "אם צריך החלטת הרשאה לפי user או role, guard עדיף; middleware מתאים לשכבה כללית יותר.",
  },
  {
    id: "trace_svnest_009",
    conceptKey: "lesson_nestjs::Nest.js",
    level: 5,
    title: "מעקב אחרי bootstrap של אפליקציית Nest",
    code:
      "async function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));\n  await app.listen(3000);\n}",
    steps: [
      {
        line: 2,
        prompt: "איזה module הוא נקודת הכניסה של האפליקציה?",
        answer: "AppModule",
        acceptable: ["AppModule"],
        hint: "הוא מועבר ל-NestFactory.create.",
      },
      {
        line: 3,
        prompt: "איזה מנגנון גלובלי מופעל לפני routes?",
        answer: "ValidationPipe",
        acceptable: ["ValidationPipe", "global pipe"],
        hint: "חפש useGlobalPipes.",
      },
      {
        line: 4,
        prompt: "על איזה port השרת מאזין?",
        answer: "3000",
        acceptable: ["3000", "port 3000"],
        hint: "קרא את listen.",
      },
    ],
    explanation:
      "Nest.js מתחיל מ-module שורש, בונה container של dependencies, ואז מאזין לבקשות HTTP.",
    requiredConcepts: ["lesson_nestjs::Nest.js", "lesson_nestjs::module", "lesson_nestjs::validation pipe"],
    requiredTerms: ["NestFactory", "AppModule", "listen"],
    sideExplanation:
      "ה-bootstrap הוא המקום שבו מחברים מדיניות אפליקטיבית כמו global pipes לפני שהשרת עולה.",
  },
  {
    id: "trace_svnest_010",
    conceptKey: "lesson_nestjs::pipe",
    level: 5,
    title: "מעקב אחרי ParseIntPipe ב-route parameter",
    code:
      "@Get(':id')\nfindOne(@Param('id', ParseIntPipe) id: number) {\n  return this.tasksService.findOne(id);\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה parameter מופיע ב-route?",
        answer: "id",
        acceptable: ["id", ":id"],
        hint: "הוא מופיע אחרי נקודתיים.",
      },
      {
        line: 2,
        prompt: "איזה pipe ממיר את id למספר?",
        answer: "ParseIntPipe",
        acceptable: ["ParseIntPipe", "pipe"],
        hint: "הוא מופיע בתוך @Param.",
      },
      {
        line: 3,
        prompt: "איזה ערך נשלח ל-service אחרי ההמרה?",
        answer: "id",
        acceptable: ["id"],
        hint: "ה-service מקבל את אותו שם משתנה.",
      },
    ],
    explanation:
      "Pipe מטפל בערך יחיד לפני ה-handler; כאן הוא מונע מצב שבו id נשאר string מה-URL.",
    requiredConcepts: ["lesson_nestjs::pipe", "lesson_17::Query Parameters", "lesson_nestjs::service"],
    requiredTerms: ["@Param", "ParseIntPipe", "@Get"],
    sideExplanation:
      "TypeScript annotation לבדה לא ממירה קלט בזמן runtime; pipe כן.",
  },
  {
    id: "trace_svnest_011",
    conceptKey: "lesson_nestjs::provider",
    level: 5,
    title: "מעקב אחרי provider שמנוהל על ידי Nest",
    code:
      "@Injectable()\nexport class TasksRepository {\n  findAll() {\n    return this.db.task.findMany();\n  }\n}\n\n@Module({ providers: [TasksRepository] })\nexport class TasksModule {}",
    steps: [
      {
        line: 1,
        prompt: "איזה decorator מסמן שה-class ניתן להזרקה?",
        answer: "@Injectable()",
        acceptable: ["@Injectable", "Injectable"],
        hint: "הוא מעל class.",
      },
      {
        line: 2,
        prompt: "איזה class הוא provider בדוגמה?",
        answer: "TasksRepository",
        acceptable: ["TasksRepository", "repository"],
        hint: "הוא מופיע גם במערך providers.",
      },
      {
        line: 8,
        prompt: "איפה ה-provider נרשם ל-module?",
        answer: "providers: [TasksRepository]",
        acceptable: ["providers", "TasksRepository"],
        hint: "חפש @Module.",
      },
    ],
    explanation:
      "Provider הוא class ש-Nest יוצר ומזריק. כדי להשתמש בו דרך DI צריך לסמן ולרשום אותו ב-module מתאים.",
    requiredConcepts: ["lesson_nestjs::provider", "lesson_nestjs::module", "lesson_nestjs::repository pattern"],
    requiredTerms: ["@Injectable", "providers", "TasksRepository"],
    sideExplanation:
      "יצירה ידנית עם new עוקפת את ה-container ומקשה על בדיקות והחלפת מימושים.",
  },
  {
    id: "trace_svnest_012",
    conceptKey: "lesson_nestjs::repository pattern",
    level: 6,
    title: "מעקב אחרי repository שמבודד ORM מה-service",
    code:
      "@Injectable()\nexport class TasksService {\n  constructor(private readonly repo: TasksRepository) {}\n\n  listOpen() {\n    return this.repo.findByStatus('open');\n  }\n}",
    steps: [
      {
        line: 3,
        prompt: "איזו תלות מוזרקת ל-service?",
        answer: "TasksRepository",
        acceptable: ["TasksRepository", "repo", "repository"],
        hint: "קרא את constructor.",
      },
      {
        line: 6,
        prompt: "איזה method ב-repository נקרא?",
        answer: "findByStatus",
        acceptable: ["findByStatus", "repo.findByStatus"],
        hint: "הוא מופיע אחרי repo.",
      },
      {
        line: 6,
        prompt: "איזה status נשלח ל-query?",
        answer: "open",
        acceptable: ["open", "'open'"],
        hint: "זה הערך בתוך הסוגריים.",
      },
    ],
    explanation:
      "Repository pattern משאיר את פרטי ה-DB או ORM מאחורי class ייעודי, וה-service מבטא business intent.",
    requiredConcepts: ["lesson_nestjs::repository pattern", "lesson_sql_orm::ORM", "lesson_nestjs::service"],
    requiredTerms: ["TasksRepository", "repo.findByStatus", "constructor"],
    sideExplanation:
      "במבחן חשוב לזהות שה-service לא אמור לפזר שאילתות DB ישירות בכל method.",
  },
  {
    id: "trace_svnest_013",
    conceptKey: "lesson_nestjs::service",
    level: 5,
    title: "מעקב אחרי service שמרכז business logic",
    code:
      "@Injectable()\nexport class TasksService {\n  create(dto: CreateTaskDto) {\n    const title = dto.title.trim();\n    return this.repo.create({ title, done: false });\n  }\n}",
    steps: [
      {
        line: 2,
        prompt: "איזה class מרכז את הלוגיקה?",
        answer: "TasksService",
        acceptable: ["TasksService", "service"],
        hint: "שם ה-class מסתיים ב-Service.",
      },
      {
        line: 4,
        prompt: "איזה field עובר ניקוי לפני שמירה?",
        answer: "title",
        acceptable: ["title", "dto.title"],
        hint: "חפש trim.",
      },
      {
        line: 5,
        prompt: "איזה ערך ברירת מחדל נשמר עבור done?",
        answer: "false",
        acceptable: ["false", "done false"],
        hint: "קרא את האובייקט שנשלח ל-repo.",
      },
    ],
    explanation:
      "Service הוא המקום לחוקי מערכת קטנים כמו normalization וברירות מחדל, בזמן שה-controller נשאר דק.",
    requiredConcepts: ["lesson_nestjs::service", "lesson_nestjs::DTO", "lesson_nestjs::repository pattern"],
    requiredTerms: ["@Injectable", "CreateTaskDto", "repo.create"],
    sideExplanation:
      "חלוקת אחריות כזו הופכת את הקוד לבדיקה ותחזוקה: HTTP ב-controller, rules ב-service, DB ב-repository.",
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
