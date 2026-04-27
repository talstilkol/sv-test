// data/lesson34.js — שיעור 34: Nest.js — Modules + DI
// Backend framework. מבחן: 5-7 שאלות צפויות.
var LESSON_34 = {
  id: "lesson_34",
  title: "שיעור 34 — Nest.js — Modules, DI, Decorators",
  description:
    "Nest.js: opinionated Node.js framework בהשראת Angular. Modules, Providers, Controllers, DI, Guards.",
  concepts: [
    {
      conceptName: "Nest.js",
      difficulty: 6,
      levels: {
        grandma: "Nest.js = framework מסודר ל-Node — דומה ל-Angular אבל לbackend. מתאים לפרויקטים גדולים.",
        child: "כמו ארגז כלים מסודר עם תוויות — לא צריך לחפש מה איפה.",
        soldier: "Nest.js = Node.js framework. TypeScript-first. Modular: Controller-Service-Module pattern.",
        student: "Nest = opinionated framework. Built on Express/Fastify. Modules group features. Dependency Injection via decorators. CLI scaffolding. Testing built-in.",
        junior: "Express עם 50 endpoints = קושי לארגן. עברתי ל-Nest — modules מסודרים, DI מובנית, generators. כל פיצ'ר במודול נפרד = clean.",
        professor: "Nest.js by Kamil Mysliwiec, inspired by Angular. Decorator-based metadata + reflect-metadata. Modular architecture: graphs of providers + module imports/exports. Scales to large monorepos.",
      },
      illustration:
        "🏗️ Nest.js structure:\n  AppModule (root)\n   ├── UsersModule\n   │   ├── UsersController\n   │   ├── UsersService\n   │   └── UsersRepository\n   └── AuthModule\n       ├── AuthController\n       └── AuthService",
      codeExample:
        "# התקנה\nnpm i -g @nestjs/cli\nnest new my-app\ncd my-app\nnpm run start:dev    # localhost:3000\n\n# generate scaffolding\nnest generate module users\nnest generate controller users\nnest generate service users\n# או shortcut:\nnest generate resource users\n\n// app.module.ts (root)\nimport { Module } from '@nestjs/common';\nimport { UsersModule } from './users/users.module';\n\n@Module({\n  imports: [UsersModule],\n})\nexport class AppModule {}\n\n// main.ts (entry)\nimport { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  await app.listen(3000);\n}\nbootstrap();",
      codeExplanation: "CLI יוצר מבנה. modules מקבצים features. main.ts = entry. NestFactory.create(AppModule) → app instance. nest g resource = full CRUD scaffolding.",
    },
    {
      conceptName: "Module",
      difficulty: 6,
      levels: {
        grandma: "Module = יחידה לוגית של פיצ'ר — Users, Posts, Auth. כולל הכל הקשור: controller, service, repo.",
        child: "כמו תיק נפרד לכל מקצוע — שיעורי בית של חשבון בתיק אחד, של ספרות בתיק אחר.",
        soldier: "@Module decorator עם imports, controllers, providers, exports.",
        student: "Module groups related providers/controllers. imports = משתמש ב-modules אחרים. exports = מאפשר ל-modules אחרים להשתמש. controllers = HTTP endpoints. providers = services + repositories.",
        junior: "פעם בלבול: שירות מ-Module A הזריקו ל-Module B אבל לא עבד. הבנתי: צריך לexport ב-A ו-import ב-B. עכשיו תמיד providers שצריך share — exports.",
        professor: "Modules implement encapsulation. Singleton scope by default per module. Dynamic modules (forRoot, forFeature) for configurable libraries. Global modules (@Global) bypass import requirement.",
      },
      illustration:
        "📦 Module:\n  @Module({\n    imports: [DBModule],          // depends on\n    controllers: [UsersController], // HTTP\n    providers: [UsersService],     // logic\n    exports: [UsersService],       // shareable\n  })",
      codeExample:
        "// users.module.ts\nimport { Module } from '@nestjs/common';\nimport { UsersController } from './users.controller';\nimport { UsersService } from './users.service';\nimport { TypeOrmModule } from '@nestjs/typeorm';\nimport { User } from './user.entity';\n\n@Module({\n  imports: [TypeOrmModule.forFeature([User])],  // import דרוש\n  controllers: [UsersController],\n  providers: [UsersService],\n  exports: [UsersService],  // אחרים יכולים להזריק UsersService\n})\nexport class UsersModule {}\n\n// auth.module.ts — משתמש ב-UsersService\n@Module({\n  imports: [UsersModule],  // ← זה מה שעושה את UsersService זמין\n  providers: [AuthService],\n})\nexport class AuthModule {}",
      codeExplanation: "imports = depends on. controllers = HTTP. providers = injectable. exports = share with importers. שימוש שירות ממודול אחר דורש: export ב-A + import ב-B.",
    },
    {
      conceptName: "Controller",
      difficulty: 5,
      levels: {
        grandma: "Controller = שכבת HTTP. מקבל request, מעביר ל-service, מחזיר response.",
        child: "כמו מלצר — מעביר את ההזמנה למטבח ומביא את האוכל ללקוח.",
        soldier: "@Controller('path') decorator. Route handlers: @Get, @Post, @Put, @Delete. Params: @Param, @Body, @Query.",
        student: "Controllers handle HTTP. Decorators: @Controller, @Get/@Post/etc, @Param/@Body/@Query/@Headers, @Req/@Res. Return value auto-serialized to JSON.",
        junior: "Express: req.body, res.json — manual. Nest: @Body() body — clean, typed. גם validation דרך @UsePipes(ValidationPipe).",
        professor: "Controllers receive incoming requests, delegate to providers. Decorator metadata maps to route handlers. Pipes (validation, transformation), Guards (auth), Interceptors (logging) chain via decorators.",
      },
      illustration:
        "🎯 Controller flow:\n  HTTP → @Controller(...) → @Get/Post → @Body/Param → service.method() → return → auto JSON",
      codeExample:
        "// users.controller.ts\nimport { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';\nimport { UsersService } from './users.service';\nimport { AuthGuard } from '../auth/auth.guard';\n\n@Controller('users')  // → /users\nexport class UsersController {\n  constructor(private readonly usersService: UsersService) {}\n\n  @Get()  // GET /users\n  findAll() {\n    return this.usersService.findAll();\n  }\n\n  @Get(':id')  // GET /users/:id\n  findOne(@Param('id') id: string) {\n    return this.usersService.findById(+id);\n  }\n\n  @Post()  // POST /users\n  @UseGuards(AuthGuard)\n  create(@Body() data: CreateUserDto) {\n    return this.usersService.create(data);\n  }\n}",
      codeExplanation: "@Controller route prefix. @Get/Post/etc methods. @Param/Body/Query decorators מחלקים req. constructor DI = service injected. @UseGuards למיגון.",
    },
    {
      conceptName: "Provider (Service)",
      difficulty: 6,
      levels: {
        grandma: "Service = הלוגיקה — מטפל בנתונים, מחשבים, טוב/רע.",
        child: "כמו השף במטבח — מבין מה לבשל ואיך.",
        soldier: "@Injectable() class. Holds business logic. Injected via constructor.",
        student: "Provider = anything that can be injected. @Injectable() decorator. Default singleton scope. Can also be values, factories, async providers.",
        junior: "פעם service יצר instance של DB ידני (new DBClient()). עברתי ל-DI: @Inject('DB') db — testing easy עם mock.",
        professor: "Providers form DI graph. Resolved by Nest's IoC container. Token-based (class or string). Scopes: DEFAULT (singleton per app), REQUEST (per request), TRANSIENT (new each inject).",
      },
      illustration:
        "💉 Service injection:\n  @Injectable()\n  class UsersService { ... }\n   ↓\n  @Controller class { constructor(private svc: UsersService) {} }\n   ↓\n  Nest IoC resolves and injects",
      codeExample:
        "// users.service.ts\nimport { Injectable, NotFoundException } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { User } from './user.entity';\n\n@Injectable()  // ← decorator קריטי\nexport class UsersService {\n  constructor(\n    @InjectRepository(User)\n    private readonly userRepo: Repository<User>,\n  ) {}\n\n  async findAll() {\n    return this.userRepo.find();\n  }\n\n  async findById(id: number) {\n    const user = await this.userRepo.findOneBy({ id });\n    if (!user) throw new NotFoundException(`User ${id} not found`);\n    return user;\n  }\n\n  async create(data: CreateUserDto) {\n    return this.userRepo.save(data);\n  }\n}",
      codeExplanation: "@Injectable() = ניתן להזרקה. constructor receives deps. @InjectRepository = TypeORM-specific injection. Exceptions: NotFoundException → 404 אוטומטית.",
    },
    {
      conceptName: "Guards",
      difficulty: 7,
      levels: {
        grandma: "שומר שבודק לפני שמגיעים ל-controller — אם לא מוסמך, חוסם.",
        child: "כמו השומר במועדון — בודק תעודת זהות לפני שנכנסים.",
        soldier: "@Injectable() class with canActivate(context). Returns boolean. @UseGuards(MyGuard).",
        student: "Guards = authorization logic. Run before route handler. canActivate(ExecutionContext) → boolean | Promise<boolean>. Common: AuthGuard (JWT), RolesGuard (RBAC).",
        junior: "פעם בכל route בדקתי req.user manually. עכשיו: @UseGuards(AuthGuard) ב-controller. כל route מוגן אוטומטית. clean.",
        professor: "Guards execute after Middleware, before Pipes/Interceptors. ExecutionContext provides type-safe access to request. Reflector for metadata-driven guards (e.g., @Roles('admin')).",
      },
      illustration:
        "🛡️ Guard flow:\n  request → AuthGuard.canActivate?\n    yes → RolesGuard.canActivate?\n      yes → controller\n    no → 401/403 thrown",
      codeExample:
        "// auth/auth.guard.ts\nimport { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';\nimport { JwtService } from '@nestjs/jwt';\n\n@Injectable()\nexport class AuthGuard implements CanActivate {\n  constructor(private jwtService: JwtService) {}\n\n  async canActivate(context: ExecutionContext): Promise<boolean> {\n    const req = context.switchToHttp().getRequest();\n    const auth = req.headers.authorization;\n    if (!auth?.startsWith('Bearer ')) {\n      throw new UnauthorizedException();\n    }\n    try {\n      const payload = await this.jwtService.verifyAsync(auth.slice(7));\n      req.user = payload;\n      return true;\n    } catch {\n      throw new UnauthorizedException('Invalid token');\n    }\n  }\n}\n\n// users.controller.ts — usage\n@Controller('users')\nexport class UsersController {\n  @Get('me')\n  @UseGuards(AuthGuard)\n  getMe(@Req() req) {\n    return req.user;\n  }\n}\n\n// או global\napp.useGlobalGuards(new AuthGuard(jwtService));",
      codeExplanation: "implements CanActivate. canActivate מחזיר true/false. throw exception → status auto. @UseGuards per route או global. context.switchToHttp() = HTTP-specific.",
    },
  ],
};
