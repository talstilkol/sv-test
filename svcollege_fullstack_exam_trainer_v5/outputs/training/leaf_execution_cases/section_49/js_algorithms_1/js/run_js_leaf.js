
const mod = require('./solution.js');
const checks = [];
try {
  checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
  if (typeof mod.solve === 'function') {
    
checks.push({ name: 'solve callable', ok: typeof mod.solve === 'function' });

  }
} catch (error) {
  checks.push({ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
