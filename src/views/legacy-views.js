export const LEGACY_VIEW_IDS = Object.freeze([
  "welcome-screen",
  "active-lesson",
  "knowledge-map-view",
  "study-mode-view",
  "trainer-view",
  "guide-view",
  "grandma-knowledge-view",
  "flashcards-view",
  "code-anatomy-view",
  "codeblocks-view",
  "trace-view",
  "mock-exam-view",
  "comparator-view",
  "gap-matrix-view",
]);

export function findMountedLegacyViews(root = document) {
  return LEGACY_VIEW_IDS.filter((id) => Boolean(root.getElementById(id)));
}
