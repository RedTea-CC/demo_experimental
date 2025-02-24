function arrayToTree(arr) {
  // Create a map of id to node
  const idMap = new Map();
  arr.forEach((node) => idMap.set(node.id, node));

  // 根节点
  const roots = [];
  arr.forEach((node) => {
    if (node.parent === null) {
      roots.push(node);
    } else {
      const parent = idMap.get(node.parent);
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    }
  });
  return roots;
}

let tree = arrayToTree([
  { id: 1, value: 1, parent: null },
  { id: 2, value: 2, parent: 1 },
  { id: 3, value: 3, parent: 1 },
  { id: 4, value: 4, parent: 2 },
  { id: 5, value: 5, parent: 2 },
]);

console.log(tree);
