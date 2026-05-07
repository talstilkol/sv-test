
const mod = require('./solution.js');
const checks = [];
try {
  checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
  if (typeof mod.solve === 'function') {
    
checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
checks.push({ name: 'does not throw on representative input', ok: (() => { try { mod.solve([1,2,3,4], [1,3]); return true; } catch (_) { return false; } })() });

  }
} catch (error) {
  checks.push({ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
