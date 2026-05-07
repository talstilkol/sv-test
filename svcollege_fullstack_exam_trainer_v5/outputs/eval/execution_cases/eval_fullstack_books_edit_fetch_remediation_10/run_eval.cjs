const express = require('express');
const supertest = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/supertest@7.2.2/node_modules/supertest");
const router = require('./router.cjs');

async function run() {
  const app = express();
  app.use(express.json());
  app.use('/api/books', router);

  const checks = [];

  const res1 = await supertest(app).get('/api/books/1');
  checks.push({
    name: 'GET existing by id',
    ok: res1.status === 200 && res1.body && res1.body._id === '1'
  });

  const res2 = await supertest(app).get('/api/books/999');
  checks.push({
    name: 'GET missing by id',
    ok: res2.status === 404
  });

  const res3 = await supertest(app).post('/api/books/borrow/1');
  checks.push({
    name: 'Borrow available book',
    ok: res3.status === 200 && res3.body && res3.body.isAvailable === false
  });

  const res4 = await supertest(app).post('/api/books/borrow/2');
  checks.push({
    name: 'Borrow unavailable book',
    ok: res4.status === 400
  });

  const pass = checks.filter((c) => c.ok).length;
  const total = checks.length;
  process.stdout.write(JSON.stringify({ pass, total, checks }));
}

run().catch((error) => {
  process.stdout.write(JSON.stringify({
    pass: 0,
    total: 4,
    checks: [],
    runtimeError: String(error && error.stack ? error.stack : error)
  }));
  process.exit(1);
});
