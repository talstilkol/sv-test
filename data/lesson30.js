// data/lesson30.js — שיעור 30: Clean Backend + Tests
// ארכיטקטורה ובדיקות. מבחן: 5-7 שאלות צפויות.
var LESSON_30 = {
  id: "lesson_30",
  title: "שיעור 30 — Clean Backend Architecture + Tests",
  description:
    "Layered architecture, Repository pattern, Dependency Injection, Jest/Vitest, supertest.",
  concepts: [
    {
      conceptName: "Layered Architecture",
      difficulty: 6,
      levels: {
        grandma: "חלוקת הקוד לשכבות — controller (קלט/פלט), service (לוגיקה), repository (DB). כל שכבה אחראית לדבר אחד.",
        child: "כמו מסעדה: מלצר (controller), שף (service), מקרר (repository). כל אחד מתמחה במשהו.",
        soldier: "Layers: Controller → Service → Repository → DB. Separation of concerns. Each layer talks only to next.",
        student: "Layered architecture: presentation (controllers/routes), business logic (services), data access (repositories). One-direction dependency. Test each layer in isolation.",
        junior: "פעם הכל היה ב-controller — DB queries, logic, validation. impossible לבדוק. עברתי ל-layered: service מחזיק logic, repository מחזיק DB. 80% מהקוד נבדק.",
        professor: "Clean Architecture (Robert Martin): entities, use cases, interface adapters, frameworks. Dependency rule: outer depends on inner, not vice-versa. Hexagonal/Ports & Adapters variations.",
      },
      illustration:
        "🏗️ Layered:\n  Controller (HTTP)\n   ↓\n  Service (Business Logic)\n   ↓\n  Repository (DB Access)\n   ↓\n  DB",
      codeExample:
        "// userController.ts\nimport { userService } from './userService';\n\nexport async function createUser(req, res) {\n  const user = await userService.create(req.body);\n  res.status(201).json(user);\n}\n\n// userService.ts\nimport { userRepo } from './userRepo';\nimport bcrypt from 'bcrypt';\n\nexport const userService = {\n  async create({ email, password }) {\n    const hashedPw = await bcrypt.hash(password, 10);\n    return userRepo.insert({ email, password: hashedPw });\n  },\n};\n\n// userRepo.ts\nimport { db } from './db';\n\nexport const userRepo = {\n  async insert(data) {\n    const [user] = await db('users').insert(data).returning('*');\n    return user;\n  },\n  async findByEmail(email) {\n    return db('users').where({ email }).first();\n  },\n};",
      codeExplanation: "Controller = HTTP only. Service = business logic + cross-cutting (auth, hashing). Repository = SQL/ORM only. Each testable independently.",
    },
    {
      conceptName: "Repository Pattern",
      difficulty: 6,
      levels: {
        grandma: "אובייקט שמסתיר את הפרטים של הDB — הקוד שלך לא יודע אם זה Postgres או Mongo.",
        child: "כמו מתורגמן בין השפה שלך לשפת ה-DB. אתה רק אומר 'תן משתמש 5'.",
        soldier: "Repository מספק interface לdata access (findById, save, delete). Implementation מוחבא.",
        student: "Repository pattern: encapsulates data access logic. Methods like findById, findAll, create, update, delete. Easy to swap DB (test with in-memory).",
        junior: "התחלתי עם DB queries בכל service — קושי לעבור מ-Mongo ל-Postgres. עם repository: שינוי implementation בלבד, services לא נגענו.",
        professor: "Repository (DDD pattern): collection-like interface for aggregates. Hides ORM/SQL details. Critical for testability (mock repository = no DB needed).",
      },
      illustration:
        "📦 Repository:\n  service.findUser(5)\n   ↓\n  userRepo.findById(5)\n   ↓\n  [implementation: SQL/Mongo/in-memory]",
      codeExample:
        "// IUserRepo — interface\ninterface IUserRepo {\n  findById(id: number): Promise<User | null>;\n  create(data: NewUser): Promise<User>;\n  delete(id: number): Promise<void>;\n}\n\n// PostgresUserRepo — production\nclass PostgresUserRepo implements IUserRepo {\n  async findById(id) {\n    return db('users').where({ id }).first();\n  }\n  async create(data) {\n    const [u] = await db('users').insert(data).returning('*');\n    return u;\n  }\n  async delete(id) {\n    await db('users').where({ id }).delete();\n  }\n}\n\n// InMemoryUserRepo — for tests\nclass InMemoryUserRepo implements IUserRepo {\n  users = new Map();\n  async findById(id) { return this.users.get(id) ?? null; }\n  async create(data) {\n    const u = { id: Date.now(), ...data };\n    this.users.set(u.id, u);\n    return u;\n  }\n  async delete(id) { this.users.delete(id); }\n}",
      codeExplanation: "Interface מגדיר contract. Implementations שונות (Postgres ל-prod, in-memory ל-tests). Service מחבר עם DI.",
    },
    {
      conceptName: "Dependency Injection",
      difficulty: 7,
      levels: {
        grandma: "במקום שכל פונקציה תיצור את הDB connection בעצמה — מקבלת אותה מבחוץ. גמיש יותר.",
        child: "כמו לקבל את הצעצועים מאמא במקום להביא בעצמך.",
        soldier: "DI = component receives dependencies, doesn't create them. Constructor injection or function args.",
        student: "Dependency Injection: invert dependency creation. Don't `new Repository()` inside service — pass it. Benefits: testability (mock), flexibility (swap), explicit deps. Frameworks: Nest.js, InversifyJS.",
        junior: "פעם service מ-import של db מ-singleton — בדיקות נוראות. עברתי ל-DI: service מקבל repo בconstructor. עכשיו mock = pass mockRepo.",
        professor: "DI = Inversion of Control principle. Three flavors: constructor, setter, interface. Container-based DI (Spring, Nest.js) auto-resolves. Manual DI in functional code: pass deps as args.",
      },
      illustration:
        "💉 DI:\n  ❌ Service { repo = new Repo(); }     // tight coupling\n  ✅ Service(repo) { this.repo = repo; }   // injected → flexible",
      codeExample:
        "// ❌ Without DI — hard to test\nclass UserService {\n  private repo = new PostgresUserRepo();\n  async getUser(id) { return this.repo.findById(id); }\n}\n\n// ✅ With DI\nclass UserService {\n  constructor(private repo: IUserRepo) {}\n  async getUser(id) { return this.repo.findById(id); }\n}\n\n// Production\nconst userService = new UserService(new PostgresUserRepo());\n\n// Test\nconst userService = new UserService(new InMemoryUserRepo());\n\n// Functional DI\nfunction createUserService(repo: IUserRepo) {\n  return {\n    async getUser(id) { return repo.findById(id); },\n  };\n}\nconst service = createUserService(repo);",
      codeExplanation: "Constructor injection (class) או factory (function). Service לא יודע איזה repo מגיע — רק ה-interface. Test = pass mock. Prod = pass real.",
    },
    {
      conceptName: "Jest / Vitest",
      difficulty: 5,
      levels: {
        grandma: "ספריות שעוזרות לכתוב 'בודקים' לקוד שלך — אוטומטיים, רצים בכל שינוי.",
        child: "כמו מורה שתמיד בודקת שכל השיעור נכון, גם שינוי קטן.",
        soldier: "Jest (Facebook) / Vitest (Vite team) — test runners + assertions + mocks.",
        student: "Both: describe/it/expect API. Vitest: faster (esbuild), Vite-native. Jest: mature ecosystem. Either works for unit tests, integration tests.",
        junior: "התחלתי עם Jest. עברתי ל-Vitest כי הפרויקט שלי ב-Vite — אותה תשתית, מהירות x10. API כמעט זהה.",
        professor: "Jest: snapshot testing, mocking, coverage built-in. Uses jsdom for DOM. Vitest: ESM native, watch mode fast (HMR-style), Vite plugin pipeline. Both compatible with most React Testing Library code.",
      },
      illustration: "🧪 Test structure:\n  describe('User', () => {\n    it('should create', () => {\n      expect(...).toBe(...);\n    });\n  });",
      codeExample:
        "// userService.test.ts (Vitest or Jest, same syntax)\nimport { describe, it, expect, beforeEach } from 'vitest';\nimport { UserService } from './userService';\nimport { InMemoryUserRepo } from './userRepo.memory';\n\ndescribe('UserService', () => {\n  let service: UserService;\n  let repo: InMemoryUserRepo;\n\n  beforeEach(() => {\n    repo = new InMemoryUserRepo();\n    service = new UserService(repo);\n  });\n\n  it('creates a user', async () => {\n    const user = await service.create({ email: 'a@b.com', password: 'x' });\n    expect(user.email).toBe('a@b.com');\n    expect(user.password).not.toBe('x');  // hashed\n  });\n\n  it('hashes the password', async () => {\n    const user = await service.create({ email: 'a@b.com', password: '12345678' });\n    expect(user.password.startsWith('$2b$')).toBe(true);\n  });\n\n  it('throws if email exists', async () => {\n    await service.create({ email: 'a@b.com', password: 'x' });\n    await expect(service.create({ email: 'a@b.com', password: 'y' })).rejects.toThrow();\n  });\n});",
      codeExplanation: "describe קבוצה. it = test. beforeEach לreset state. expect/.toBe/.rejects.toThrow לassertions. בדיקה רצה ב-isolation.",
    },
    {
      conceptName: "supertest",
      difficulty: 6,
      levels: {
        grandma: "ספרייה שעוזרת לבדוק את ה-API שלך — שולחת בקשות HTTP מדומות, בודקת תשובות.",
        child: "כמו לבדוק את הדלת — לשלוח 'שלום!' ולראות אם נפתחת.",
        soldier: "supertest = HTTP integration tests. בלי לרוץ server אמיתי — הבדיקה משתמשת ב-Express app object.",
        student: "supertest wraps Express/Koa app, simulates HTTP requests. Chain: request(app).post('/api/users').send(data).expect(201). Integration test layer.",
        junior: "פעם בדקתי endpoints ידני (Postman). אחרי כל refactor — שעות retesting. עם supertest: 30 בדיקות אוטומטיות, רצות בשנייה.",
        professor: "supertest provides high-level abstraction over node:http. Avoids actual port binding (uses ephemeral). Combines with Jest/Vitest. Ideal for API contract testing.",
      },
      illustration:
        "🧪 supertest flow:\n  request(app) → .post('/api') → .send(data) → .expect(201)\n  → asserts status, headers, body",
      codeExample:
        "// app.ts\nimport express from 'express';\nexport const app = express();\napp.use(express.json());\napp.post('/users', (req, res) => {\n  res.status(201).json({ id: 1, ...req.body });\n});\n\n// app.test.ts\nimport { describe, it, expect } from 'vitest';\nimport request from 'supertest';\nimport { app } from './app';\n\ndescribe('POST /users', () => {\n  it('creates a user', async () => {\n    const res = await request(app)\n      .post('/users')\n      .send({ name: 'Tal', email: 'tal@x.com' })\n      .expect(201);\n\n    expect(res.body.id).toBeDefined();\n    expect(res.body.name).toBe('Tal');\n  });\n\n  it('rejects invalid data', async () => {\n    await request(app)\n      .post('/users')\n      .send({})\n      .expect(400);\n  });\n});",
      codeExplanation: "request(app) עוטף Express. .post/.send/.set ל-headers. .expect לstatus או assertion על body. אין צורך ב-port — wrapper על http.",
    },
  ],
};
