
const mod = require('./solution.js');
const checks = [];
try {
  checks.push({ name: 'exports solve', ok: typeof mod.solve === 'function' });
  if (typeof mod.solve === 'function') {
    
checks.push({ name: 'sort digits', ok: mod.solve(642531) === 123456 || mod.solve(642531) === '123456' });
checks.push({ name: 'sort repeated digits', ok: ['1255', '01255'].includes(String(mod.solve(55021))) || mod.solve(55021) === 1255 });

  }
} catch (error) {
  checks.push({ name: 'js runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
