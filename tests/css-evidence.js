function normalizeCssText(value) {
  return String(value || "")
    .replace(/\s*([{}:;,>!])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .trim();
}

function cssIncludes(css, snippet) {
  const normalizedCss = normalizeCssText(css);
  const normalizedSnippet = normalizeCssText(snippet);
  return normalizedCss.includes(normalizedSnippet);
}

function cssHasMaxWidthMedia(css, px) {
  const normalizedCss = normalizeCssText(css);
  return cssIncludes(css, `@media (max-width: ${px}px)`) || normalizedCss.includes(`@media (width<=${px}px)`);
}

function cssHasMinWidthMedia(css, px) {
  const normalizedCss = normalizeCssText(css);
  return cssIncludes(css, `@media (min-width: ${px}px)`) || normalizedCss.includes(`@media (width>=${px}px)`);
}

function cssBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  return normalizeCssText(match ? match[1] : "");
}

module.exports = {
  cssBlock,
  cssHasMaxWidthMedia,
  cssHasMinWidthMedia,
  cssIncludes,
  normalizeCssText,
};
