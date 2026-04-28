# Session 1 Integration Note - SQL/ORM

Owner branch: `codex/svcollege-sql-orm`

## Files Added

- `data/lesson_sql_orm.js`
- `data/svcollege_questions_sql_orm.js`
- `data/svcollege_traces_sql_orm.js`
- `data/svcollege_builds_sql_orm.js`
- `data/svcollege_prerequisites_sql_orm.js`
- `tests/svcollege-sql-orm-content.test.js`

## Globals

- `LESSON_SQL_ORM`
- `SVCOLLEGE_SQL_ORM_QUESTIONS`
- `SVCOLLEGE_SQL_ORM_TRACES`
- `SVCOLLEGE_SQL_ORM_BUILDS`
- `SVCOLLEGE_SQL_ORM_PREREQUISITES`

Browser bridges are included:

- MC/Fill append into `window.QUESTIONS_BANK.mc` and `window.QUESTIONS_BANK.fill` when `QUESTIONS_BANK` already exists.
- Bug Hunt appends into `window.QUESTIONS_BUG`.
- Code Trace appends into `window.QUESTIONS_TRACE` and mirrors into `window.QUESTIONS_BANK.trace`.
- Mini Build appends into `window.QUESTIONS_BUILD`.
- Prerequisites append into `window.CONCEPT_PREREQUISITES`.

## Lesson ID

`lesson_sql_orm`

## SVCollege Module To Mark Covered

`בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle`

Reason: the existing portal has MongoDB/Mongoose coverage, but this session adds the missing SQL/PostgreSQL/Prisma/Drizzle concepts: schema, table/row/column, primary key, foreign key, relation, JOIN, migration, ORM tradeoffs, Prisma CRUD, Drizzle query building, CRUD and transaction.

## Coordinator Integration Checklist

### 1. Script Tags In Required Order

The bridge files append into existing globals, so load them only after the base files they extend. Do not move base files later, because later base scripts can overwrite bridge arrays.

```html
<!-- Lesson data: load with the other lesson data before loader/app startup. -->
<script src="data/lesson_sql_orm.js?v=svcollege-sql-orm-v1"></script>

<!-- After data/questions_bank.js and data/questions_bug.js. -->
<script src="data/svcollege_questions_sql_orm.js?v=svcollege-sql-orm-v1"></script>

<!-- After data/questions_trace.js. -->
<script src="data/svcollege_traces_sql_orm.js?v=svcollege-sql-orm-v1"></script>

<!-- After data/questions_build.js. -->
<script src="data/svcollege_builds_sql_orm.js?v=svcollege-sql-orm-v1"></script>

<!-- After data/prerequisites.js. -->
<script src="data/svcollege_prerequisites_sql_orm.js?v=svcollege-sql-orm-v1"></script>
```

### 2. Loader And Tree Wiring

- Add `LESSON_SQL_ORM` to the lesson loader/registry that builds the portal lesson list.
- Expose `lesson_sql_orm` in the SVCollege lesson tree under the database module.
- Verify the concept jumper can navigate to all 17 `lesson_sql_orm::*` concept keys.
- Verify the practice surfaces see the appended MC, Fill, Trace, Mini Build and Bug Hunt entries.
- Keep this branch's bridge files as data-only; no shared wiring file was edited here.

### 3. Readiness Wiring

- Connect the SQL/ORM lesson and practice counts to the SVCollege readiness calculation.
- Confirm the database module has lesson, MC, Fill, Trace, Mini Build and Bug Hunt coverage after the portal loads.
- Do not change readiness reports before the browser/UI verification step passes.

### 4. Blueprint Status Gate

- The module `בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle` may move from `partial` to `covered` only after the SQL/ORM lesson appears in the UI and the relevant tabs show its practice items.
- Required visible checks before `covered`:
  - Lessons tree shows `lesson_sql_orm`.
  - Lesson body renders `LESSON_SQL_ORM`.
  - MC/Fill practice counts include SQL/ORM items.
  - Code Trace tab includes `trace_svsql_*`.
  - Mini Build tab includes `build_svsql_*`.
  - Bug Hunt flow includes `bug_svsql_*`.
  - Readiness report includes the SQL/PostgreSQL/Prisma/Drizzle bridge as actual coverage, not just declared data.

### 5. Post-Integration Test Commands

Run these after Coordinator wiring:

```bash
node --check app.js
node --check content-loader.js
node --check data/course_blueprints.js
node --check data/lesson_sql_orm.js
node --check data/svcollege_questions_sql_orm.js
node --check data/svcollege_traces_sql_orm.js
node --check data/svcollege_builds_sql_orm.js
node --check data/svcollege_prerequisites_sql_orm.js
npm test -- --run tests/svcollege-sql-orm-content.test.js tests/no-native-random.test.js
npm run svcollege:readiness:write
npm run build
```

## Counts

- Concepts: 17
- MC: 18
- Fill: 10
- Code Trace: 3
- Mini Build: 3
- Bug Hunt: 2

## Quality Notes

- Prisma and Drizzle are taught as tools above SQL, not mandatory defaults.
- Raw SQL versus ORM tradeoffs are explicit: control/performance versus safety/maintainability.
- MongoDB is explicitly not treated as enough for the SVCollege SQL requirement because relational modeling, JOIN, foreign keys, migrations and transactions are separate skills.
- SQL-specific source asset in the local lesson inventory is `unknown/unavailable`; this branch adds a bridge lesson and does not invent a source document.

## Session 1B Validation Commands

```bash
node --check data/svcollege_builds_sql_orm.js
node --check tests/svcollege-sql-orm-content.test.js
npm test -- --run tests/svcollege-sql-orm-content.test.js tests/no-native-random.test.js
npm run build
```
