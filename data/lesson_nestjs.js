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
      levels: {
        grandma:
          "Nest.js זה כמו ארגון של עסק גדול: יש מנהל, מחלקות, עובדים — כל אחד יודע את התפקיד שלו, אף אחד לא דורך על הרגליים של השני.",
        child:
          "כמו לגו — חתיכות שמתחברות בצורה מסודרת. במקום לערבב הכל, יש קופסאות מסודרות: מי מטפל בפניות, מי שומר את המידע, מי בודק הרשאה.",
        soldier:
          "Nest.js = framework Node.js עם TypeScript-first, decorators, DI container. רץ מעל Express (ברירת מחדל) או Fastify. CLI: nest new, nest g module/controller/service. אדריכלות מודולרית.",
        student:
          "Nest מושפע מ-Angular: modules, decorators, DI. שכבות: Module → Controller (HTTP) → Service (logic) → Repository (data). HTTP-agnostic core: GraphQL, WebSockets, microservices באותו דפוס. Built-in: validation, guards, interceptors, exception filters.",
        junior:
          "מתי Nest שווה: צוות 3+, אפליקציה רחבת היקף, תכנון לטווח ארוך. מתי overkill: API קטן עם 5 routes — Express/Fastify בסיסיים. Nest enforces opinions; אם לא מתאים, fight constant. Bonus: ecosystem מובנה (TypeORM, Mongoose, Passport adapters).",
        professor:
          "Nest.js implements IoC (Inversion of Control) via a hierarchical DI container. Provider scopes: DEFAULT (singleton), REQUEST (per-request), TRANSIENT (per-injection). The compilation phase resolves the dependency graph; circular dependencies require forwardRef. Cross-cutting concerns (auth, logging, validation) are layered as guards/interceptors/pipes/filters following the Chain of Responsibility pattern.",
      },
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
      levels: {
        grandma:
          "module זה כמו מחלקה בבית-חולים: יש מחלקת ילדים, נשים, לב. כל אחת עם הרופאים, הציוד והחדרים שלה — לא מתערבבים.",
        child:
          "כמו תיקיות במחשב: 'תמונות חופש 2024' מכילה רק את הקבצים של החופש. module = תיקייה לוגית: TasksModule רק על משימות, AuthModule רק על authentication.",
        soldier:
          "@Module decorator: imports (modules אחרים), controllers, providers, exports. AppModule = root. Feature modules: TasksModule, UsersModule. Shared modules: re-exportable. Dynamic modules: forRoot/forFeature pattern.",
        student:
          "Module = unit of encapsulation. providers זמינים רק בתוך המודול שמצהיר עליהם, אלא אם exported. imports = consume אחרים. Global modules (@Global): זמינים בכל מקום בלי import (use sparingly). Module structure mirrors domain: bounded contexts ב-DDD.",
        junior:
          "Practical: 1) feature module per domain (Tasks, Users, Auth). 2) AppModule דק — רק imports. 3) ConfigModule, TypeOrmModule.forRoot — global. 4) Avoid circular module imports — refactor או forwardRef. 5) Lazy modules — Nest 9+ supports dynamic loading. 6) Test isolation — TestingModule reuse module structure.",
        professor:
          "Modules implement the bounded-context pattern from Domain-Driven Design. The container resolves provider scopes per module's instance graph. Module composition follows lexical scoping: providers shadow inherited ones. Dynamic modules (forRoot/register) implement the factory pattern, deferring configuration to import time. The module graph is a DAG; cycles are detected at compile.",
      },
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
      levels: {
        grandma:
          "controller זה הקבלן בכניסה: מקבל את הפנייה, שואל מה הצרכן רוצה, ושולח ל-departments הנכונים. הוא לא מייצר את האוכל — הוא מתאם.",
        child:
          "כמו פקיד דואר: מקבל את החבילה, מסתכל על הכתובת, ומוסר למחלק הנכון. controller לוקח HTTP request ומפעיל את הפונקציה הנכונה.",
        soldier:
          "@Controller('tasks') = prefix /tasks. methods: @Get(), @Post(), @Put(), @Patch(), @Delete(). params: @Body, @Param, @Query, @Req, @Res. החזרה: object → JSON automatic.",
        student:
          "Controllers responsible for HTTP layer only: parse request, call service, format response. Decorators: @HttpCode(204), @Header(), @Redirect(). Status codes default per method (POST=201, others=200). Error handling דרך throwing — exception filters תופסים. Versioning via @Version().",
        junior:
          "Best practices: 1) keep thin — delegate ל-service. 2) DTO + ValidationPipe לכל body input. 3) tests עם supertest על controller layer. 4) avoid coupling ל-Express Request — Nest מספק abstraction. 5) Custom decorators (@CurrentUser) לקוד נקי. 6) Swagger decorators (@ApiTags, @ApiOperation) ליצירת OpenAPI docs.",
        professor:
          "Controllers in Nest implement the Front Controller pattern, dispatching HTTP requests to handlers based on routing metadata. Decorators populate route definitions consumed by the framework's HTTP adapter (Express/Fastify). The handler signature is purely declarative: parameter decorators describe data extraction; the framework wires them at runtime via reflect-metadata.",
      },
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
      levels: {
        grandma:
          "provider זה כמו ספק קבוע — הירקן שמביא ירקות, החשמלאי שבא לתקן. את לא קונה הכל בעצמך; את משתמשת בשירות שמישהו אחר מספק.",
        child:
          "כמו חברים: יש חבר טוב במתמטיקה — אתה שואל אותו עזרה. provider הוא 'חבר' בקוד שיודע משהו ספציפי, ואחרים יכולים 'לשאול' אותו.",
        soldier:
          "@Injectable() class = provider. Nest מנהל instance, יוצר פעם אחת (singleton default), מעביר ל-constructors שמבקשים. Types: class providers, value providers (useValue), factory providers (useFactory).",
        student:
          "Provider mechanics: registered ב-providers array → token (default = class) → resolution. Custom tokens: @Inject('TOKEN'). Async providers: useFactory async. Scopes: DEFAULT, REQUEST, TRANSIENT. אחזקת state בtransient = bug-prone — בדרך כלל singleton.",
        junior:
          "Real life: 1) services, repositories, adapters = providers. 2) Configuration via ConfigService — global provider. 3) External SDKs (Stripe, AWS S3) wrapped בprovider. 4) Mocking בtests via overrideProvider. 5) Avoid 'God service' — split by responsibility. 6) Factory providers לdynamic config (region, env-based).",
        professor:
          "Providers implement the Service Locator + Dependency Injection patterns. The container's resolution algorithm builds a dependency graph at module compilation; lazy instantiation per scope. Provider tokens (string, symbol, class) form the registry. Circular dependencies between providers require forwardRef + setter injection — a code smell suggesting refactoring.",
      },
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
      levels: {
        grandma:
          "service זה הטבח במסעדה: הוא יודע את המתכונים, את הסדר של הצעדים, מה לא לערבב, מתי להוסיף מלח. הקבלן מקבל הזמנה — והוא מבשל.",
        child:
          "כמו מורה פרטית: יודעת איך להסביר מתמטיקה. אתה מתקשר לאמא, ואמא קוראת למורה. controller מקבל קריאה, service עושה את העבודה.",
        soldier:
          "service = @Injectable class עם business logic. injected ל-controller. CRUD methods: create, findAll, findOne, update, remove. תקשורת עם DB דרך repository או ORM ישירות.",
        student:
          "Service = application service (DDD term). אחראי על: orchestration של domain logic, transactions, calling external services. אסור: HTTP knowledge (request/response specific). Single Responsibility — UserService לא צריך לטפל ב-billing. Cross-service calls via injected services.",
        junior:
          "Practical: 1) Service-per-domain. 2) Methods עם clear contract: createUser(dto: CreateUserDto): Promise<User>. 3) Domain validation בservice (after schema validation בpipe). 4) Transactions wrapped at service level. 5) avoid Service-to-controller dependency — inverted! 6) Pure business logic functions אפילו יותר טובים — unit testable בלי DI.",
        professor:
          "Services in Nest correspond to the Application Service tier in layered architecture (Fowler's PoEAA). They orchestrate domain logic and transaction boundaries. The Single Responsibility Principle dictates one reason to change per service. In hexagonal architecture services are use-case interactors invoking domain entities and ports (repositories, adapters).",
      },
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
      levels: {
        grandma:
          "DI זה כמו לפתוח מקרר ולמצוא שכל המוצרים כבר שם — הילדים לא צריכים להזמין במכולת. אמא דאגה מראש שיש מה צריך.",
        child:
          "כמו שאמא ארזה לך תיק לבית-ספר עם כל הספרים — אתה לא קונה אותם בדרך. ה-class לא 'מחפש' תלויות; הן ניתנות לו מוכנות.",
        soldier:
          "DI = constructor takes interfaces; container provides implementations. במקום new TasksService() — constructor(private tasksService: TasksService). Nest container רואה את ה-type ו-injects.",
        student:
          "DI principles: dependency inversion (high-level לא תלוי ב-low-level), inversion of control (framework calls you). Benefits: testability (mock injection), flexibility (swap impl), composability. Nest implementation: TypeScript metadata via reflect-metadata, decorators מצביעים על types.",
        junior:
          "אמת בעבודה: 1) constructor(@Inject('TOKEN') private dep: Type) לnon-class providers. 2) circular DI = bad design — refactor לwhole new module. 3) tests: Test.createTestingModule().overrideProvider(...).useValue(mock). 4) Don't inject everything — tight coupling במהפך. 5) Property injection (@Inject() prop:) — שמרני, רק לcase מסוים.",
        professor:
          "Dependency Injection (Fowler 2004) is a form of Inversion of Control where dependencies are provided externally rather than internally constructed. Nest implements constructor-based DI via TypeScript's emitDecoratorMetadata and reflect-metadata library. The container resolves the dependency graph topologically; circular dependencies break this requiring forwardRef as escape hatch. Compared to Spring (Java), Nest's runtime overhead is negligible.",
      },
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
      levels: {
        grandma:
          "decorator זה כמו תווית על מעטפה: 'דחוף', 'אישי', 'בחו\"ל'. המעטפה לא משתנה — אבל יש מידע שאומר איך לטפל בה.",
        child:
          "כמו סטיקרים על מחברת: 'מתמטיקה', 'אסור לקרוא'. הסטיקר אומר משהו על המחברת בלי לשנות מה כתוב בפנים. decorator זה סטיקר על קוד.",
        soldier:
          "decorator = @ syntax מעל class/method/param. דוגמאות: @Controller, @Get, @Body, @Injectable, @UseGuards. Nest קורא ב-startup ובונה route table + DI graph.",
        student:
          "TypeScript decorators (stage-2 proposal). 4 types: class, method, accessor, parameter. Nest decorators wrap reflect-metadata. Custom decorators: SetMetadata + factory. Composability: applyDecorators(deco1, deco2). Param decorators מוציאים value מ-execution context.",
        junior:
          "Custom decorators שווים: 1) @CurrentUser() — extract user מ-request. 2) @Roles('admin') + RolesGuard. 3) @Public() לoverride global auth guard. 4) @Transactional() עם interceptor. אזהרה: TypeScript 5+ updated decorator semantics — לא תמיד backward-compat. Nest CLI מטפל; manual setup חייב emitDecoratorMetadata: true.",
        professor:
          "Decorators are higher-order functions that augment class/method/property/parameter declarations. The TC39 proposal evolved through stages; Nest uses experimental (stage-2) syntax compatible with TypeScript's emitDecoratorMetadata. Reflection metadata associates types with declarations enabling runtime introspection — the foundation of Nest's DI and routing. Stage-3 decorators (TS 5.0+) differ; Nest provides legacy mode.",
      },
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
      levels: {
        grandma:
          "DTO זה כמו טופס מסודר: 'שם', 'גיל', 'טלפון' — שדות מוגדרים. במקום שכל לקוח יכתוב מה שירצה, יש טופס אחיד עם שדות מובהקים.",
        child:
          "כמו טופס הרשמה לחוג: יש שורות לשם, כיתה, טלפון. אסור לכתוב גוף שלם — רק את מה שמבקשים. DTO זה הטופס של ה-API.",
        soldier:
          "DTO = Data Transfer Object. class או interface שמתאר shape של data לAPI. עם class-validator: decorators לvalidation (@IsString, @IsEmail, @MinLength). class-transformer: convert plain → instance.",
        student:
          "DTO patterns: input DTOs (CreateXDto, UpdateXDto) + output DTOs (XResponseDto). Separation מ-domain entities — שדות sensitive (password) לא יוצאים. Mapping: manual או class-transformer plainToInstance. Generic DTOs לpagination, filtering. אסור: DTO עם behavior — pure data.",
        junior:
          "Practical wins: 1) PartialType(CreateXDto) — Nest mapped types: כל השדות אופציונליים. 2) PickType, OmitType — composition. 3) Nested DTOs: @ValidateNested() + @Type(() => Sub). 4) whitelist + forbidNonWhitelisted ב-ValidationPipe — מסיר/דוחה fields לא ידועים. 5) Swagger decorators ב-DTO (@ApiProperty) → OpenAPI auto.",
        professor:
          "DTOs implement the Data Transfer Object pattern (Fowler PoEAA), separating wire format from domain model. They prevent over-fetching/under-fetching at the API boundary and enable schema evolution. Validation occurs at the boundary (boundary validation principle); domain entities trust their inputs. Generation via OpenAPI specs (forward) or codegen (backward) automates client/server contracts.",
      },
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
      levels: {
        grandma:
          "validation pipe זה כמו שומר בכניסה — בודק את הנייר לפני שמכניס. אם משהו חסר או לא תקין, מחזיר עם הסבר. לא מאפשר ללא תעודה.",
        child:
          "כמו אמא שבודקת את שיעורי הבית לפני שאתה הולך לבית-ספר: חסר עט? חסרה משימה? היא לא נותנת לצאת עד שהכל בסדר. validation pipe בודק לפני שהקלט נכנס.",
        soldier:
          "ValidationPipe + class-validator: @IsEmail, @IsInt, @MinLength על DTO fields. app.useGlobalPipes(new ValidationPipe()) או @UsePipes(). transform: true — converts to class instance. whitelist: true — strip extra fields.",
        student:
          "ValidationPipe options: { whitelist (strip), forbidNonWhitelisted (reject), transform (instance), forbidUnknownValues, exceptionFactory (custom error). Built on class-validator + class-transformer. Async validators supported (@Validator decorator). Custom validators: @ValidatorConstraint class.",
        junior:
          "Production: 1) ALWAYS global ValidationPipe. 2) whitelist + forbidNonWhitelisted לחומרה. 3) custom exception factory לformat consistent errors (validation errors → user-friendly Hebrew). 4) @Type(() => Number) ל-query params (always strings). 5) Recursive validation עם @ValidateNested + @Type. 6) Don't trust DB types alone — DB constraints + DTO validation = defense in depth.",
        professor:
          "Validation pipes implement the Pipe and Filter architectural pattern, processing input through composable transformations. Nest's ValidationPipe combines class-validator (decorator-based constraints) and class-transformer (plainToClass conversion). Validation errors map to BadRequestException; the boundary validation principle (Date parsing, string-to-number) belongs here, not in domain logic.",
      },
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
      levels: {
        grandma:
          "guard זה כמו השומר בכניסה למועדון — בודק תעודה, גיל, רשימה. אם לא עומד בתנאים — לא נכנס. אם בסדר — ברוך הבא.",
        child:
          "כמו המורה ליד הדלת לפני המבחן: 'יש לך עפרון?', 'הסתרת חומר?'. אם הכל בסדר — נכנס. guard בודק אם מותר להפעיל route.",
        soldier:
          "@Injectable class implementing CanActivate. canActivate(context): boolean | Promise<boolean>. true = אפשר; false = ForbiddenException. usage: @UseGuards(JwtAuthGuard) על controller/method, או globally.",
        student:
          "Guards run after middleware, before interceptor/pipe. Execution order: middleware → guards → interceptor (before) → pipe → handler → interceptor (after). Common guards: AuthGuard (Passport strategies), RolesGuard, ThrottlerGuard. ExecutionContext: get class, handler, request — context-aware decisions.",
        junior:
          "Patterns: 1) JwtAuthGuard → extract user → request.user. 2) RolesGuard reading @Roles() metadata + Reflector. 3) Composability: @UseGuards(JwtAuthGuard, RolesGuard). 4) GraphQL/WS: GqlExecutionContext.create(context). 5) avoid logic ב-guard — only auth decisions. 6) Public endpoints: @Public() + global JWT guard skipping.",
        professor:
          "Guards implement the Authorization stage in the request pipeline, distinct from Authentication (typically via Passport strategies in middleware). The CanActivate interface returns a boolean decision; failure raises ForbiddenException (403). The execution context unifies HTTP, WebSocket, and GraphQL contexts. Combined with custom decorators and Reflector, guards enable declarative RBAC, ABAC, or policy-based access control.",
      },
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
      levels: {
        grandma:
          "pipe זה כמו מסננת בקפה: המים עוברים דרכה, הקפה נשאר. הקלט עובר transformation/בדיקה לפני שמשתמשים בו.",
        child:
          "כמו לתרגם טקסט מאנגלית לעברית לפני שמסבירים לכיתה. pipe מקבל data בצורה אחת — מחזיר אותו טוב יותר.",
        soldier:
          "Pipe = @Injectable עם transform(value, metadata): any. Built-in: ValidationPipe, ParseIntPipe, ParseUUIDPipe, ParseBoolPipe, ParseArrayPipe, ParseFilePipe, DefaultValuePipe. Usage: @Param('id', ParseIntPipe).",
        student:
          "Pipes execute לפני handler, אחרי guards. שני תפקידים: 1) Transformation (string → number, JSON → DTO). 2) Validation (throw if invalid). ParamMetadata: type, metatype, data. Custom pipe: implement PipeTransform<T>. Async OK. Errors → BadRequestException (default).",
        junior:
          "מהשטח: 1) ParseIntPipe לכל :id ב-URL. 2) DefaultValuePipe לquery params: @Query('page', new DefaultValuePipe(1), ParseIntPipe). 3) ParseFilePipe עם FileTypeValidator לupload. 4) Custom: TrimPipe לstrip whitespace. 5) שילוב עם DTOs דרך ValidationPipe globally. 6) order חשוב: DefaultValuePipe לפני ParseIntPipe.",
        professor:
          "Pipes implement the Pipe and Filter pattern at the parameter level, separating concerns of transformation and validation from business logic. Composition is left-to-right; output of one pipe feeds the next. The PipeTransform interface is type-parametric; metatype enables generic pipes (ValidationPipe inspects DTO classes). Pipes are stateless by convention enabling singleton scope.",
      },
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
      levels: {
        grandma:
          "middleware זה כמו כל הפועלים שעובדים על מכתב לפני שהוא מגיע אליך: דוור, ממיין, סורק. כל אחד עושה צעד — ואחר כך המכתב בידיים שלך.",
        child:
          "כמו תחנות בפס ייצור: רכב מגיע — צובעים, מנקים, בודקים. כל תחנה = middleware. רק בסוף הוא 'מוכן' לlcontroller.",
        soldier:
          "middleware = function (req, res, next) — Express-style. ב-Nest: implement NestMiddleware עם use(req, res, next). configure ב-module: consumer.apply(MyMiddleware).forRoutes('*' או specific path).",
        student:
          "Middleware תואם Express; רץ לפני guards. שימושים: logging, CORS, body parsing (body-parser default), helmet, compression, session. Class-based (DI) או functional. forRoutes(path), forRoutes({ path, method }), exclude(). Limitation: לא יודע על Nest's execution context — לרוב משימות, interceptor עדיף.",
        junior:
          "Practical: 1) helmet, compression, cors כ-functional middleware ב-bootstrap (app.use). 2) Class middleware עם DI לlogging service. 3) Cookie parsing → req.cookies. 4) Avoid logic ב-middleware — guards/interceptors יותר Nest-native. 5) Don't await heavy ops ב-middleware — blocks request. 6) Sentry/APM — global middleware בrootmodule.",
        professor:
          "Middleware in Nest preserves Express compatibility — the request pipeline executes middleware chain before Nest's framework-specific stages. This dual nature creates flexibility but conceptual overhead: middleware operates on raw req/res, lacking ExecutionContext. The choice middleware-vs-interceptor reflects scope: framework-agnostic concerns vs framework-aware (auth, transactions, logging with handler context).",
      },
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
      levels: {
        grandma:
          "interceptor זה כמו צלם בחתונה: עוקב אחרי האירוע, מצלם לפני, אחרי, מתעד הכל. הוא לא משנה את החתונה — אבל מוסיף תיעוד סביב.",
        child:
          "כמו מורה עם stopwatch — מודד כמה זמן לקח לך לפתור תרגיל, אבל לא מפריע לפתרון עצמו. interceptor יושב סביב המתודה — לפני ואחרי.",
        soldier:
          "Interceptor = @Injectable + intercept(context, next). next.handle() = call handler + return Observable. אפשר לטפל ב-before/after עם RxJS operators (tap, map, catchError). usage: @UseInterceptors(MyInterceptor).",
        student:
          "Interceptors built on RxJS Observables. Capabilities: bind extra logic before/after, transform result, transform exception, override entirely (caching). Built-in: ClassSerializerInterceptor (DTO serialization), CacheInterceptor, FileInterceptor (multer). Order: applied LIFO סביב handler.",
        junior:
          "Use cases אמת: 1) Logging time + result. 2) Transform response: { data: result } wrapper. 3) Cache aside (Redis lookup → if hit return; else handler + store). 4) Sentry transactions. 5) Transactional decorator: ts.startTransaction → handler → commit/rollback. 6) Avoid heavy compute — RxJS chains הופכים סבוכים.",
        professor:
          "Interceptors implement Aspect-Oriented Programming (AOP) cross-cutting concerns within Nest's pipeline. Built atop RxJS, they support synchronous and asynchronous transformations, error handling, and stream manipulation. The intercept signature receives ExecutionContext + CallHandler returning Observable<any>. The Observable model enables composition (pipe operators) and lazy evaluation; useful for streaming responses (SSE, WebSocket).",
      },
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
      levels: {
        grandma:
          "exception filter זה כמו רשת ביטחון מתחת לאקרובט: גם אם הוא נופל — הוא לא נשבר. error בקוד = נפילה; filter תופס ומחזיר תגובה מסודרת.",
        child:
          "כמו אמא שעונה לטלפון מבית-הספר אם משהו השתבש: לא לוקחים את הסערה, אלא מתרגמים: 'הילד יחזור הביתה'. filter מתרגם error לתשובה מובנת.",
        soldier:
          "Exception Filter = @Catch(ExceptionType) class implementing ExceptionFilter. catch(exception, host): התגובה. Built-in: HttpException → status + message JSON. Custom: log + format. usage: @UseFilters() או globally.",
        student:
          "Hierarchy: HttpException → BadRequestException, UnauthorizedException, NotFoundException, etc. Custom errors: extend HttpException או custom + filter. ArgumentsHost: getType() (http/ws/rpc). Global filter ב-bootstrap: app.useGlobalFilters(new AllExceptionsFilter()).",
        junior:
          "Real life: 1) AllExceptionsFilter ב-@Catch() (catch-all) לlogging. 2) BusinessLogicFilter ל-domain errors (DomainError → 422). 3) Hide internal details בproduction — מיפוי מ-stack trace ל-{message:'Internal error', requestId}. 4) Sentry integration ב-filter. 5) WS/GraphQL exceptions = different format. 6) Order: specific filters first, catch-all last.",
        professor:
          "Exception filters implement the Chain of Responsibility for error handling. Nest's exception layer normalizes errors into HTTP responses. The filter ordering follows decorator stack semantics: closest scope wins. ArgumentsHost abstracts the protocol context (HTTP/WS/RPC) enabling protocol-specific responses. Global filters provide last-resort handling, critical for security (preventing stack trace leakage).",
      },
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
      levels: {
        grandma:
          "repository זה כמו ספרן: את לא מחפשת את הספר במחסן — את שואלת את הספרן. הוא יודע איפה הכל. אם יחליפו את המחסן — את עדיין שואלת את הספרן.",
        child:
          "כמו שיש מתווך: רוצה לקנות בית? לא הולך מבית לבית — קורא למתווך. service קורא ל-repository, ו-repository יודע מה לעשות מול ה-DB.",
        soldier:
          "Repository = abstraction מעל data layer. CRUD methods: findById, findAll, create, update, delete. Implementation: TypeORM, Prisma, Drizzle, MongoDB driver. Service depends on Repository interface, not on ORM directly.",
        student:
          "Repository pattern (Fowler PoEAA): mediates between domain and data mapping using collection-like interface. Benefits: 1) testability (mock repo). 2) Swap ORM without rewriting services. 3) domain-driven naming (findActiveCustomers vs raw SQL). Implementation choices: TypeORM @EntityRepository, Prisma wrapped בservice, custom interface + adapter.",
        junior:
          "Practice: 1) Repository per aggregate root (DDD). 2) Custom methods reflecting domain language: findOverdueTasks(), not findByDateLessThan(). 3) Pagination opaque token (cursor) > offset. 4) Specifications pattern לcomplex queries — encapsulate. 5) Don't expose ORM types — return domain entities. 6) Unit tests עם in-memory repo, integration עם real DB.",
        professor:
          "Repository pattern (Evans, DDD; Fowler, PoEAA) provides collection-like access to aggregates, mediating between the domain layer and persistence. It enforces aggregate boundaries (one repository per aggregate root) and abstracts ORM specifics. Generic vs specific: generic repos (CRUD) reduce boilerplate but obscure intent; specific repos (findByEmailVerified) align with ubiquitous language.",
      },
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
      levels: {
        grandma:
          "testing module זה כמו לבדוק מתכון בקדרה קטנה לפני שמכינים סיר ענק לאירוע: בודקים הכל בקטן, מתקנים, ואז עושים בגדול.",
        child:
          "כמו לשחק עם דמיון לפני שמתחילים פרויקט אמיתי. testing module בונה גרסה קטנה של ה-app רק לבדיקה, בלי DB אמיתי או שרת.",
        soldier:
          "Test.createTestingModule({ imports, providers, controllers }).compile() → TestingModule. .get(Token) לקבל instance. .overrideProvider(X).useValue(mock) לhmock. supertest על app instance ל-e2e.",
        student:
          "Two test types: 1) unit (service alone, mock dependencies). 2) E2E (full app via supertest). useFactory לcomplex mocks. INestApplication: createNestApplication() למלא bootstrap. afterEach: app.close(). DB strategy: in-memory SQLite, testcontainers, or mocked repositories.",
        junior:
          "Production tests: 1) ALWAYS unit + E2E + integration. 2) factories (test-data-bot) לentities. 3) DB reset בbeforeEach (TRUNCATE + seed). 4) Faker.js לrealistic data. 5) snapshot tests לresponse shape. 6) coverage threshold (jest.config) — services 90%+. 7) avoid testing trivial getters; focus business logic.",
        professor:
          "Testing in Nest leverages the same DI container with provider overrides. The TestingModule's compile() phase resolves the dependency graph for the test scope. Strategy decisions: London-style (mockist, isolated units) vs Detroit-style (sociable, real collaborators) — Nest accommodates both via overrideProvider. Integration tests with testcontainers approach production fidelity at CI cost.",
      },
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
