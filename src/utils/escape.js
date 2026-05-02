/**
 * String Escaping Utilities — Security-critical helpers
 *
 * Extracted from app.js (esc at line 32614, cssEscape at line 32119).
 * These are used in 150+ places across app.js for safe interpolation
 * into HTML strings and CSS selectors.
 *
 * Security note: these helpers are the FIRST line of defense against
 * XSS. They must:
 *   - Never be bypassed in template literals that produce HTML
 *   - Be applied to ANY untrusted data (user input, API responses,
 *     localStorage values that may have been tampered with)
 *   - Pass through DOMPurify for richer content (innerHTML with markup)
 *
 * Pure functions — no side effects, no I/O, no DOM access.
 */

/**
 * Escape a string for safe inclusion in HTML text content or
 * single/double-quoted attribute values.
 *
 * Encodes: & < > " '
 *
 * Note: this is stricter than the legacy esc() in app.js, which only
 * encoded & < > ". The single quote (') is added because attribute
 * values may be single-quoted, and unescaped ' could break out.
 *
 * @param {*} value - any input; null/undefined return ""
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Legacy-compatible escape (matches app.js esc() exactly).
 * Use escapeHtml() for new code — this is for parity during migration.
 */
export function escapeHtmlLegacy(value) {
  if (!value) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Escape a string for safe use inside a CSS selector value.
 * Specifically: escapes ", ', and \ which would otherwise break
 * the selector or enable injection.
 *
 * Example:
 *   document.querySelector(`[data-x="${escapeCss(userInput)}"]`)
 *
 * For attribute selectors with special chars beyond these, prefer
 * CSS.escape() in modern browsers — but this helper is safe for
 * the common case of escaping into a quoted string.
 *
 * @param {*} value
 * @returns {string}
 */
export function escapeCss(value) {
  return String(value).replace(/(["'\\])/g, "\\$1");
}

/**
 * Escape a string for safe use as a JS string literal.
 * Quotes the result with double quotes.
 *
 * Example:
 *   `const x = ${escapeJsString(userInput)};`
 *   //          ^^ produces "..." with proper escapes
 */
export function escapeJsString(value) {
  return JSON.stringify(String(value === null || value === undefined ? "" : value));
}

/**
 * Escape a value for safe inclusion in a URL query string.
 * Wrapper around encodeURIComponent that handles null/undefined.
 */
export function escapeUrl(value) {
  if (value === null || value === undefined) return "";
  return encodeURIComponent(String(value));
}

/**
 * Strip all HTML tags from a string. Useful for converting HTML
 * content to plain text for screen readers, exports, or analytics.
 *
 * Note: this is a string-level strip, not a DOM-level one. For
 * untrusted HTML you should still pass through DOMPurify.
 */
export function stripHtmlTags(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/<[^>]*>/g, "");
}

/**
 * Truncate a string to maxLength, optionally appending ellipsis.
 * Counts code units (UTF-16), not graphemes — sufficient for most
 * Latin/Hebrew text. For emoji-heavy strings use Intl.Segmenter.
 */
export function truncate(value, maxLength, ellipsis = "…") {
  const s = value === null || value === undefined ? "" : String(value);
  if (s.length <= maxLength) return s;
  if (maxLength <= ellipsis.length) return s.slice(0, maxLength);
  return s.slice(0, maxLength - ellipsis.length) + ellipsis;
}
