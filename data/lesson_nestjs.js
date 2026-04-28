// data/lesson_nestjs.js
// SVCollege Finish Line 1 - Nest.js server framework bridge lesson.

var LESSON_NESTJS = {
  id: "lesson_nestjs",
  title: "Nest.js Bridge - Modules, Controllers, Providers ו-DI",
  description:
    "איך Nest.js בונה שרת Node מסודר מעל Express/Fastify: modules, controllers, services, dependency injection ו-validation.",
  svcollegeModule: "Frameworks צד-שרת - Nest.js modules + dependency injection",
  sourceAssets: [],
  sourceCoverageNote:
    "מודול SVCollege דורש הכרות עם framework צד-שרת מתקדם אחרי Express. מקור שיעור Nest מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה את פער הקוריקולום.",
  concepts: [
    {
      conceptName: "Nest.js",
      difficulty: 5,
      simpleExplanation:
        "Nest.js הוא framework ל-Node.js שמארגן backend גדול בעזרת classes, decorators, modules ו-dependency injection.",
      whyFullStack:
        "אחרי Express בסיסי, Nest נותן מבנה קבוע לפרויקטים גדולים: איפה routes, איפה business logic ואיפה חיבורי data.",
      codeExample:
        "@Module({ controllers: [TasksController], providers: [TasksService] })\nexport class TasksModule {}",
      codeExplanation:
        "ה-module מחבר controller שמקבל HTTP requests עם service שמכיל את הלוגיקה.",
      commonMistake:
        "לחשוב ש-Nest מחליף Node. הוא רץ על Node ומוסיף שכבת ארגון מעל HTTP framework.",
      prerequisite: "lesson_17::Express",
    },
    {
      conceptName: "module",
      difficulty: 5,
      simpleExplanation:
        "module הוא קופסה שמאגדת חלק של המערכת: controllers, providers ו-imports שקשורים לאותו תחום.",
      whyFullStack:
        "מודולים מונעים app.js ענקי ומאפשרים לפצל backend לפי תחומים כמו auth, tasks, users ו-billing.",
      codeExample:
        "@Module({ imports: [AuthModule], controllers: [TasksController], providers: [TasksService] })\nexport class TasksModule {}",
      codeExplanation:
        "TasksModule משתמש ב-AuthModule ומצהיר אילו controllers ו-services שייכים אליו.",
      commonMistake:
        "לזרוק את כל ה-providers ב-AppModule במקום לבנות modules לפי domain.",
      prerequisite: "lesson_nestjs::Nest.js",
    },
    {
      conceptName: "controller",
      difficulty: 4,
      simpleExplanation:
        "controller הוא class שמגדיר endpoints ומתרגם HTTP request לקריאה לפונקציית service.",
      whyFullStack:
        "הוא שומר על גבול נקי: controller מטפל ב-HTTP, service מטפל בלוגיקה.",
      codeExample:
        "@Controller('tasks')\nexport class TasksController {\n  @Get()\n  findAll() { return this.tasksService.findAll(); }\n}",
      codeExplanation:
        "@Controller מגדיר prefix ל-route, ו-@Get מגדיר endpoint מסוג GET.",
      commonMistake:
        "לכתוב business logic כבדה בתוך controller במקום להעביר אותה ל-service.",
      prerequisite: "lesson_17::Route",
    },
    {
      conceptName: "provider",
      difficulty: 5,
      simpleExplanation:
        "provider הוא class שניתן להזרקה לתוך classes אחרים, בדרך כלל service, repository או adapter.",
      whyFullStack:
        "Providers מאפשרים להחליף מימושים, לבדוק קוד בקלות ולשמור על תלות מפורשת במקום imports מפוזרים.",
      codeExample:
        "@Injectable()\nexport class TasksService {\n  findAll() { return this.repo.findAll(); }\n}",
      codeExplanation:
        "@Injectable מסמן ל-Nest שה-class יכול להיות מנוהל על ידי container ולהיכנס דרך constructor.",
      commonMistake:
        "ליצור provider ידנית עם new במקום לתת ל-Nest להזריק אותו.",
      prerequisite: "lesson_nestjs::dependency injection",
    },
    {
      conceptName: "service",
      difficulty: 4,
      simpleExplanation:
        "service הוא provider שמרכז business logic: חוקים, חישובים, בדיקות והרכבת פעולות.",
      whyFullStack:
        "כש-controller נשאר דק ו-service מחזיק את הלוגיקה, קל יותר לבדוק ולתחזק backend.",
      codeExample:
        "@Injectable()\nexport class TasksService {\n  create(dto) { return this.repo.create(dto); }\n}",
      codeExplanation:
        "ה-service מקבל DTO אחרי validation ומבצע פעולה דרך repository.",
      commonMistake:
        "לשים validation, הרשאות ושמירה ישירות ב-controller במקום לחלק אחריות.",
      prerequisite: "lesson_nestjs::provider",
    },
    {
      conceptName: "dependency injection",
      difficulty: 6,
      simpleExplanation:
        "dependency injection הוא מנגנון שבו Nest מספק ל-class את התלויות שלו דרך constructor במקום שה-class ייצור אותן בעצמו.",
      whyFullStack:
        "DI מקטין coupling ומאפשר להחליף database, mock בבדיקה או provider בלי לשנות את כל הקוד.",
      codeExample:
        "constructor(private readonly tasksService: TasksService) {}",
      codeExplanation:
        "ה-controller מצהיר שהוא צריך TasksService, ו-Nest injects אותו בזמן יצירת ה-controller.",
      commonMistake:
        "להסתיר תלות בתוך קובץ בעזרת import ו-new, ואז לגלות שקשה לבדוק או להחליף אותה.",
      prerequisite: "lesson_13::class",
    },
    {
      conceptName: "decorator",
      difficulty: 5,
      simpleExplanation:
        "decorator הוא סימון מעל class, method או parameter שמוסיף metadata ש-Nest קורא בזמן runtime.",
      whyFullStack:
        "Decorators נותנים syntax קצר ל-routes, guards, validation ו-injection בלי לרשום routing table ידנית.",
      codeExample:
        "@Post()\ncreate(@Body() dto: CreateTaskDto) { return this.tasksService.create(dto); }",
      codeExplanation:
        "@Post מגדיר method כ-endpoint, ו-@Body אומר מאיפה לקחת את הנתונים.",
      commonMistake:
        "לזכור decorators כמו קסם במקום להבין שהם metadata שמחבר HTTP לקוד.",
      prerequisite: "lesson_26::TypeScript",
    },
    {
      conceptName: "DTO",
      difficulty: 5,
      simpleExplanation:
        "DTO הוא אובייקט שמתאר את צורת הנתונים שנכנסים או יוצאים מה-API.",
      whyFullStack:
        "DTO נותן חוזה ברור בין client ל-server ומאפשר validation לפני שהמידע נכנס ללוגיקה.",
      codeExample:
        "export class CreateTaskDto {\n  title: string;\n  done?: boolean;\n}",
      codeExplanation:
        "ה-DTO מתאר אילו fields מותר לקבל כשנוצרת משימה.",
      commonMistake:
        "לקבל כל body מהלקוח בלי להגביל fields ובלי חוזה קלט ברור.",
      prerequisite: "lesson_26::interface",
    },
    {
      conceptName: "validation pipe",
      difficulty: 6,
      simpleExplanation:
        "validation pipe בודק וממיר קלט לפני שהוא מגיע ל-controller או service.",
      whyFullStack:
        "קלט מהדפדפן אינו אמין. validation pipe מונע שמירה של נתונים חסרים, לא צפויים או מסוכנים.",
      codeExample:
        "app.useGlobalPipes(new ValidationPipe({ whitelist: true }));",
      codeExplanation:
        "ה-pipe הגלובלי בודק DTOs ומסיר fields שאינם מוגדרים כאשר whitelist פעיל.",
      commonMistake:
        "להגדיר DTO בלי להפעיל ValidationPipe, ואז לצפות שהבדיקות יקרו לבד.",
      prerequisite: "lesson_18::validation",
    },
    {
      conceptName: "guard",
      difficulty: 6,
      simpleExplanation:
        "guard מחליט אם request מורשה להמשיך ל-route מסוים.",
      whyFullStack:
        "guards מתאימים ל-auth, roles והרשאות לפני שה-controller מפעיל business logic.",
      codeExample:
        "@UseGuards(JwtAuthGuard)\n@Get('me')\nprofile() { return this.usersService.current(); }",
      codeExplanation:
        "לפני שה-route רץ, JwtAuthGuard בודק אם הבקשה מאומתת.",
      commonMistake:
        "לבדוק הרשאות ידנית בכל method במקום ליצור guard עקבי.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "pipe",
      difficulty: 5,
      simpleExplanation:
        "pipe הוא שלב ביניים שמקבל value, יכול לבדוק או להמיר אותו, ואז להעביר אותו הלאה.",
      whyFullStack:
        "Pipes טובים ל-parse של params, validation של DTOs והפיכת קלט גולמי לערך מובן.",
      codeExample:
        "@Get(':id')\nfindOne(@Param('id', ParseIntPipe) id: number) { return this.tasksService.findOne(id); }",
      codeExplanation:
        "ParseIntPipe ממיר id מה-URL ממחרוזת למספר לפני הקריאה ל-service.",
      commonMistake:
        "להניח ש-id מה-URL הוא מספר רק כי כתבת TypeScript annotation.",
      prerequisite: "lesson_17::Query Parameters",
    },
    {
      conceptName: "middleware",
      difficulty: 5,
      simpleExplanation:
        "middleware רץ לפני route ומטפל בבקשה ברמה כללית, למשל logging, correlation id או parsing.",
      whyFullStack:
        "Middleware מתאים לפעולות רוחביות שלא שייכות ל-controller מסוים.",
      codeExample:
        "consumer.apply(RequestLoggerMiddleware).forRoutes('*');",
      codeExplanation:
        "ה-consumer מחבר middleware לכל routes או לקבוצה מסוימת.",
      commonMistake:
        "להשתמש ב-middleware כדי לקבל החלטות הרשאה מורכבות; לזה guard מתאים יותר.",
      prerequisite: "lesson_17::middleware",
    },
    {
      conceptName: "interceptor",
      difficulty: 6,
      simpleExplanation:
        "interceptor עוטף קריאה ל-route ויכול לשנות response, למדוד זמן או להוסיף behavior סביב הפעולה.",
      whyFullStack:
        "Interceptors שימושיים ללוגים, serialization, caching ותבניות response עקביות.",
      codeExample:
        "@UseInterceptors(ClassSerializerInterceptor)\n@Get()\nfindAll() { return this.tasksService.findAll(); }",
      codeExplanation:
        "ה-interceptor רץ סביב ה-handler ויכול להשפיע על מה שחוזר ללקוח.",
      commonMistake:
        "לערבב interceptor עם guard. guard מחליט אם להמשיך; interceptor עוטף פעולה שממשיכה.",
      prerequisite: "lesson_nestjs::controller",
    },
    {
      conceptName: "exception filter",
      difficulty: 6,
      simpleExplanation:
        "exception filter תופס errors והופך אותם ל-HTTP response עקבי.",
      whyFullStack:
        "ב-backend אמיתי חשוב שמשתמש יקבל status ותיאור ברור, ולא stack trace גולמי.",
      codeExample:
        "@Catch(NotFoundException)\nexport class NotFoundFilter implements ExceptionFilter {}",
      codeExplanation:
        "@Catch מגדיר איזה סוג חריגה ה-filter מטפל בו.",
      commonMistake:
        "להחזיר errors ידנית בכל route במקום להשתמש במנגנון exceptions עקבי.",
      prerequisite: "lesson_15::Error",
    },
    {
      conceptName: "repository pattern",
      difficulty: 6,
      simpleExplanation:
        "repository pattern מבודד את גישת הנתונים מאחורי class או interface, במקום לפזר SQL/ORM בכל service.",
      whyFullStack:
        "כך אפשר להחליף Prisma, Drizzle או מקור נתונים אחר בלי לשכתב controllers.",
      codeExample:
        "@Injectable()\nexport class TasksRepository {\n  findAll() { return this.db.task.findMany(); }\n}",
      codeExplanation:
        "ה-service קורא ל-repository, וה-repository מכיר את ה-database/ORM.",
      commonMistake:
        "לתת לכל service לדבר ישירות עם כל טבלת DB ואז ליצור coupling גבוה.",
      prerequisite: "lesson_sql_orm::ORM",
    },
    {
      conceptName: "testing module",
      difficulty: 6,
      simpleExplanation:
        "testing module הוא סביבת בדיקה שבה Nest יוצר module קטן עם providers אמיתיים או מוחלפים.",
      whyFullStack:
        "כך בודקים controller או service בלי להרים את כל השרת ובלי לגעת ב-database אמיתי.",
      codeExample:
        "const moduleRef = await Test.createTestingModule({ providers: [TasksService, fakeRepo] }).compile();",
      codeExplanation:
        "Test.createTestingModule בונה container קטן לבדיקות ומאפשר להחליף תלויות.",
      commonMistake:
        "לבדוק Nest רק דרך server מלא, ואז לקבל בדיקות איטיות ושבירות.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_NESTJS = LESSON_NESTJS;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_NESTJS: LESSON_NESTJS };
}
