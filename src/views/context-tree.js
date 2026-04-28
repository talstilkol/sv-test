export function contextNodeText(node) {
  return [node && node.label, node && node.meta, node && node.level]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function countContextLeaves(nodes) {
  return (nodes || []).reduce((sum, node) => {
    if (node.children && node.children.length) {
      return sum + countContextLeaves(node.children);
    }
    return sum + 1;
  }, 0);
}

export function filterContextNodes(nodes, query) {
  const normalizedQuery = String(query || "").toLowerCase().trim();
  if (!normalizedQuery) return nodes || [];

  return (nodes || [])
    .map((node) => {
      const selfMatch = contextNodeText(node).includes(normalizedQuery);
      if (!node.children || !node.children.length) {
        return selfMatch ? node : null;
      }

      const children = selfMatch
        ? node.children
        : filterContextNodes(node.children, normalizedQuery);

      if (!children.length) return null;
      return { ...node, children, forceOpen: true };
    })
    .filter(Boolean);
}

export function contextActionId(path, node) {
  const suffix = String((node && (node.id || node.label)) || "leaf").replace(/\s+/g, "_");
  return `ctx-${path.join("-")}-${suffix}`;
}
