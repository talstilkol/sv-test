
const fs = require('fs');
const path = require('path');
const FilePackage = require('./solution.js');
const checks = [];
function isPromise(value) {
  return value && typeof value.then === 'function';
}
async function maybeAwait(value) {
  return isPromise(value) ? await value : value;
}
async function run() {
try {
  const filePath = path.join(__dirname, 'leaf_file.txt');
  const renamedPath = path.join(__dirname, 'renamed_leaf_file.txt');
  const copiedPath = path.join(__dirname, 'copied_leaf_file.txt');
  const renamedName = 'renamed_leaf_file.txt';
  const copiedName = 'copied_leaf_file.txt';
  const instance = new FilePackage(filePath);
  await new Promise((resolve) => setTimeout(resolve, 20));
  checks.push({ name: 'constructor creates file', ok: fs.existsSync(filePath) });
  if (typeof instance.appendContent === 'function') await maybeAwait(instance.appendContent('hello world'));
  checks.push({ name: 'append content', ok: fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8').includes('hello world') });
  const searchResult = typeof instance.searchWord === 'function' ? await maybeAwait(instance.searchWord('world')) : false;
  checks.push({ name: 'search word', ok: searchResult === true });
  if (typeof instance.rename === 'function') await maybeAwait(instance.rename(renamedName));
  checks.push({ name: 'rename file', ok: fs.existsSync(renamedPath) });
  if (typeof instance.copy === 'function') await maybeAwait(instance.copy(copiedName));
  checks.push({ name: 'copy file', ok: fs.existsSync(copiedPath) || fs.readdirSync(__dirname).some((name) => name.includes('copy')) });
} catch (error) {
  checks.push({ name: 'node file runtime', ok: false, error: String(error && error.stack ? error.stack : error) });
}
process.stdout.write(JSON.stringify({ checks }));
}
run();
