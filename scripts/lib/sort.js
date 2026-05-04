"use strict";

// Canonical sort utility for data-file load order.
//
// PROBLEM: `Array.prototype.sort()` and `Array.prototype.sort((a,b)=>a.localeCompare(b))`
// can produce DIFFERENT orderings for the same input. Specifically the underscore
// codepoint ('_' = 0x5F) sorts BEFORE digits/letters in default codepoint order
// but AFTER them under locale rules — which silently caused `questions_trace.js`
// and `questions_trace_phase2.js` to load in the wrong order, dropping 151 traces
// from the coverage report (commit 1233782).
//
// USE: import `byFilename` whenever code reads `fs.readdirSync(...)` and needs
// to load multiple data files in a stable order. Browser-side scripts should
// rely on the explicit `<script src=>` order in `index.html` instead.

/**
 * Codepoint-only comparison. Identical results across locales, runtimes, and
 * Node versions. Files starting with `_` or `zz_` will sort exactly as their
 * codepoints dictate.
 */
function byFilename(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/**
 * Sort an array in-place using `byFilename`. Returns the array for chaining.
 */
function sortInPlace(arr) {
  return arr.sort(byFilename);
}

/**
 * Return a NEW sorted copy.
 */
function sorted(arr) {
  return arr.slice().sort(byFilename);
}

module.exports = { byFilename, sortInPlace, sorted };
