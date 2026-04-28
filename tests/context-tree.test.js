describe("Context tree view helpers", () => {
  let contextTree;

  beforeAll(async () => {
    contextTree = await import("../src/views/context-tree.js");
  });

  const tree = [
    {
      id: "react",
      label: "React",
      children: [
        { id: "useState", label: "useState", level: "3/7" },
        { id: "useEffect", label: "useEffect", meta: "4 שאלות" },
      ],
    },
    {
      id: "node",
      label: "Node.js",
      children: [
        { id: "express", label: "Express Router" },
      ],
    },
  ];

  it("counts leaf nodes across nested branches", () => {
    expect(contextTree.countContextLeaves(tree)).toBe(3);
  });

  it("filters by child label and opens matching branches", () => {
    const result = contextTree.filterContextNodes(tree, "effect");

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("react");
    expect(result[0].forceOpen).toBe(true);
    expect(result[0].children.map((node) => node.id)).toEqual(["useEffect"]);
  });

  it("keeps all children when the parent branch matches", () => {
    const result = contextTree.filterContextNodes(tree, "react");

    expect(result).toHaveLength(1);
    expect(result[0].children.map((node) => node.id)).toEqual(["useState", "useEffect"]);
  });

  it("builds stable action ids from path and node identity", () => {
    expect(contextTree.contextActionId([0, 1], { id: "React Hooks" })).toBe("ctx-0-1-React_Hooks");
    expect(contextTree.contextActionId([2], { label: "Express Router" })).toBe("ctx-2-Express_Router");
  });

  it("builds human tree numbers from zero-based paths", () => {
    expect(contextTree.contextNumber([0])).toBe("1");
    expect(contextTree.contextNumber([0, 0])).toBe("1.1");
    expect(contextTree.contextNumber([0, 0, 0])).toBe("1.1.1");
    expect(contextTree.contextNumber([0, 0, 0, 0])).toBe("1.1.1.1");
    expect(contextTree.contextNumber([1, 2, 12])).toBe("2.3.13");
  });
});
