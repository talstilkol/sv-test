# Nest.js Bridge - Modules, Controllers, Providers ו-DI — דף סיכום למבחן

**מודול SVCollege:** Frameworks צד-שרת - Nest.js modules + dependency injection

**תיאור:** איך Nest.js בונה שרת Node מסודר מעל Express/Fastify: modules, controllers, services, dependency injection ו-validation.

**מספר מושגים:** 16

---

## מושגים בסיכום

### 1. Nest.js

**רמת קושי:** 5/10

**מה זה:** Nest.js הוא framework ל-Node.js שמארגן backend גדול בעזרת classes, decorators, modules ו-dependency injection.

**למה Full Stack:** אחרי Express בסיסי, Nest נותן מבנה קבוע לפרויקטים גדולים: איפה routes, איפה business logic ואיפה חיבורי data.

**דוגמה:**
```
@Module({ controllers: [TasksController], providers: [TasksService] })
export class TasksModule {}
```

**הסבר:** ה-module מחבר controller שמקבל HTTP requests עם service שמכיל את הלוגיקה.

⚠️ **טעות נפוצה:** לחשוב ש-Nest מחליף Node. הוא רץ על Node ומוסיף שכבת ארגון מעל HTTP framework.

**תלוי ב:** `lesson_17::Express`

---

### 2. module

**רמת קושי:** 5/10

**מה זה:** module הוא קופסה שמאגדת חלק של המערכת: controllers, providers ו-imports שקשורים לאותו תחום.

**למה Full Stack:** מודולים מונעים app.js ענקי ומאפשרים לפצל backend לפי תחומים כמו auth, tasks, users ו-billing.

**דוגמה:**
```
@Module({ imports: [AuthModule], controllers: [TasksController], providers: [TasksService] })
export class TasksModule {}
```

**הסבר:** TasksModule משתמש ב-AuthModule ומצהיר אילו controllers ו-services שייכים אליו.

⚠️ **טעות נפוצה:** לזרוק את כל ה-providers ב-AppModule במקום לבנות modules לפי domain.

**תלוי ב:** `lesson_nestjs::Nest.js`

---

### 3. controller

**רמת קושי:** 4/10

**מה זה:** controller הוא class שמגדיר endpoints ומתרגם HTTP request לקריאה לפונקציית service.

**למה Full Stack:** הוא שומר על גבול נקי: controller מטפל ב-HTTP, service מטפל בלוגיקה.

**דוגמה:**
```
@Controller('tasks')
export class TasksController {
  @Get()
  findAll() { return this.tasksService.findAll(); }
}
```

**הסבר:** @Controller מגדיר prefix ל-route, ו-@Get מגדיר endpoint מסוג GET.

⚠️ **טעות נפוצה:** לכתוב business logic כבדה בתוך controller במקום להעביר אותה ל-service.

**תלוי ב:** `lesson_17::Route`

---

### 4. provider

**רמת קושי:** 5/10

**מה זה:** provider הוא class שניתן להזרקה לתוך classes אחרים, בדרך כלל service, repository או adapter.

**למה Full Stack:** Providers מאפשרים להחליף מימושים, לבדוק קוד בקלות ולשמור על תלות מפורשת במקום imports מפוזרים.

**דוגמה:**
```
@Injectable()
export class TasksService {
  findAll() { return this.repo.findAll(); }
}
```

**הסבר:** @Injectable מסמן ל-Nest שה-class יכול להיות מנוהל על ידי container ולהיכנס דרך constructor.

⚠️ **טעות נפוצה:** ליצור provider ידנית עם new במקום לתת ל-Nest להזריק אותו.

**תלוי ב:** `lesson_nestjs::dependency injection`

---

### 5. service

**רמת קושי:** 4/10

**מה זה:** service הוא provider שמרכז business logic: חוקים, חישובים, בדיקות והרכבת פעולות.

**למה Full Stack:** כש-controller נשאר דק ו-service מחזיק את הלוגיקה, קל יותר לבדוק ולתחזק backend.

**דוגמה:**
```
@Injectable()
export class TasksService {
  create(dto) { return this.repo.create(dto); }
}
```

**הסבר:** ה-service מקבל DTO אחרי validation ומבצע פעולה דרך repository.

⚠️ **טעות נפוצה:** לשים validation, הרשאות ושמירה ישירות ב-controller במקום לחלק אחריות.

**תלוי ב:** `lesson_nestjs::provider`

---

### 6. dependency injection

**רמת קושי:** 6/10

**מה זה:** dependency injection הוא מנגנון שבו Nest מספק ל-class את התלויות שלו דרך constructor במקום שה-class ייצור אותן בעצמו.

**למה Full Stack:** DI מקטין coupling ומאפשר להחליף database, mock בבדיקה או provider בלי לשנות את כל הקוד.

**דוגמה:**
```
constructor(private readonly tasksService: TasksService) {}
```

**הסבר:** ה-controller מצהיר שהוא צריך TasksService, ו-Nest injects אותו בזמן יצירת ה-controller.

⚠️ **טעות נפוצה:** להסתיר תלות בתוך קובץ בעזרת import ו-new, ואז לגלות שקשה לבדוק או להחליף אותה.

**תלוי ב:** `lesson_13::class`

---

### 7. decorator

**רמת קושי:** 5/10

**מה זה:** decorator הוא סימון מעל class, method או parameter שמוסיף metadata ש-Nest קורא בזמן runtime.

**למה Full Stack:** Decorators נותנים syntax קצר ל-routes, guards, validation ו-injection בלי לרשום routing table ידנית.

**דוגמה:**
```
@Post()
create(@Body() dto: CreateTaskDto) { return this.tasksService.create(dto); }
```

**הסבר:** @Post מגדיר method כ-endpoint, ו-@Body אומר מאיפה לקחת את הנתונים.

⚠️ **טעות נפוצה:** לזכור decorators כמו קסם במקום להבין שהם metadata שמחבר HTTP לקוד.

**תלוי ב:** `lesson_26::TypeScript`

---

### 8. DTO

**רמת קושי:** 5/10

**מה זה:** DTO הוא אובייקט שמתאר את צורת הנתונים שנכנסים או יוצאים מה-API.

**למה Full Stack:** DTO נותן חוזה ברור בין client ל-server ומאפשר validation לפני שהמידע נכנס ללוגיקה.

**דוגמה:**
```
export class CreateTaskDto {
  title: string;
  done?: boolean;
}
```

**הסבר:** ה-DTO מתאר אילו fields מותר לקבל כשנוצרת משימה.

⚠️ **טעות נפוצה:** לקבל כל body מהלקוח בלי להגביל fields ובלי חוזה קלט ברור.

**תלוי ב:** `lesson_26::interface`

---

### 9. validation pipe

**רמת קושי:** 6/10

**מה זה:** validation pipe בודק וממיר קלט לפני שהוא מגיע ל-controller או service.

**למה Full Stack:** קלט מהדפדפן אינו אמין. validation pipe מונע שמירה של נתונים חסרים, לא צפויים או מסוכנים.

**דוגמה:**
```
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

**הסבר:** ה-pipe הגלובלי בודק DTOs ומסיר fields שאינם מוגדרים כאשר whitelist פעיל.

⚠️ **טעות נפוצה:** להגדיר DTO בלי להפעיל ValidationPipe, ואז לצפות שהבדיקות יקרו לבד.

**תלוי ב:** `lesson_18::validation`

---

### 10. guard

**רמת קושי:** 6/10

**מה זה:** guard מחליט אם request מורשה להמשיך ל-route מסוים.

**למה Full Stack:** guards מתאימים ל-auth, roles והרשאות לפני שה-controller מפעיל business logic.

**דוגמה:**
```
@UseGuards(JwtAuthGuard)
@Get('me')
profile() { return this.usersService.current(); }
```

**הסבר:** לפני שה-route רץ, JwtAuthGuard בודק אם הבקשה מאומתת.

⚠️ **טעות נפוצה:** לבדוק הרשאות ידנית בכל method במקום ליצור guard עקבי.

**תלוי ב:** `lesson_auth_security::authorization`

---

### 11. pipe

**רמת קושי:** 5/10

**מה זה:** pipe הוא שלב ביניים שמקבל value, יכול לבדוק או להמיר אותו, ואז להעביר אותו הלאה.

**למה Full Stack:** Pipes טובים ל-parse של params, validation של DTOs והפיכת קלט גולמי לערך מובן.

**דוגמה:**
```
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) { return this.tasksService.findOne(id); }
```

**הסבר:** ParseIntPipe ממיר id מה-URL ממחרוזת למספר לפני הקריאה ל-service.

⚠️ **טעות נפוצה:** להניח ש-id מה-URL הוא מספר רק כי כתבת TypeScript annotation.

**תלוי ב:** `lesson_17::Query Parameters`

---

### 12. middleware

**רמת קושי:** 5/10

**מה זה:** middleware רץ לפני route ומטפל בבקשה ברמה כללית, למשל logging, correlation id או parsing.

**למה Full Stack:** Middleware מתאים לפעולות רוחביות שלא שייכות ל-controller מסוים.

**דוגמה:**
```
consumer.apply(RequestLoggerMiddleware).forRoutes('*');
```

**הסבר:** ה-consumer מחבר middleware לכל routes או לקבוצה מסוימת.

⚠️ **טעות נפוצה:** להשתמש ב-middleware כדי לקבל החלטות הרשאה מורכבות; לזה guard מתאים יותר.

**תלוי ב:** `lesson_17::middleware`

---

### 13. interceptor

**רמת קושי:** 6/10

**מה זה:** interceptor עוטף קריאה ל-route ויכול לשנות response, למדוד זמן או להוסיף behavior סביב הפעולה.

**למה Full Stack:** Interceptors שימושיים ללוגים, serialization, caching ותבניות response עקביות.

**דוגמה:**
```
@UseInterceptors(ClassSerializerInterceptor)
@Get()
findAll() { return this.tasksService.findAll(); }
```

**הסבר:** ה-interceptor רץ סביב ה-handler ויכול להשפיע על מה שחוזר ללקוח.

⚠️ **טעות נפוצה:** לערבב interceptor עם guard. guard מחליט אם להמשיך; interceptor עוטף פעולה שממשיכה.

**תלוי ב:** `lesson_nestjs::controller`

---

### 14. exception filter

**רמת קושי:** 6/10

**מה זה:** exception filter תופס errors והופך אותם ל-HTTP response עקבי.

**למה Full Stack:** ב-backend אמיתי חשוב שמשתמש יקבל status ותיאור ברור, ולא stack trace גולמי.

**דוגמה:**
```
@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {}
```

**הסבר:** @Catch מגדיר איזה סוג חריגה ה-filter מטפל בו.

⚠️ **טעות נפוצה:** להחזיר errors ידנית בכל route במקום להשתמש במנגנון exceptions עקבי.

**תלוי ב:** `lesson_15::Error`

---

### 15. repository pattern

**רמת קושי:** 6/10

**מה זה:** repository pattern מבודד את גישת הנתונים מאחורי class או interface, במקום לפזר SQL/ORM בכל service.

**למה Full Stack:** כך אפשר להחליף Prisma, Drizzle או מקור נתונים אחר בלי לשכתב controllers.

**דוגמה:**
```
@Injectable()
export class TasksRepository {
  findAll() { return this.db.task.findMany(); }
}
```

**הסבר:** ה-service קורא ל-repository, וה-repository מכיר את ה-database/ORM.

⚠️ **טעות נפוצה:** לתת לכל service לדבר ישירות עם כל טבלת DB ואז ליצור coupling גבוה.

**תלוי ב:** `lesson_sql_orm::ORM`

---

### 16. testing module

**רמת קושי:** 6/10

**מה זה:** testing module הוא סביבת בדיקה שבה Nest יוצר module קטן עם providers אמיתיים או מוחלפים.

**למה Full Stack:** כך בודקים controller או service בלי להרים את כל השרת ובלי לגעת ב-database אמיתי.

**דוגמה:**
```
const moduleRef = await Test.createTestingModule({ providers: [TasksService, fakeRepo] }).compile();
```

**הסבר:** Test.createTestingModule בונה container קטן לבדיקות ומאפשר להחליף תלויות.

⚠️ **טעות נפוצה:** לבדוק Nest רק דרך server מלא, ואז לקבל בדיקות איטיות ושבירות.

**תלוי ב:** `react_blueprint::Testing Strategies`

---
