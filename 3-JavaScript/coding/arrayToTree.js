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

function arrayToTree1(array) {
  const idMap = {};
  const result = [];
  array.forEach((item) => {
    idMap[item.id] = { ...item, children: [] };
  });
  array.forEach((item) => {
    if (item.parent === null) {
      result.push(idMap[item.id]);
    } else {
      idMap[item.parent].children.push(idMap[item.id]);
    }
  });
  return result;
}

// `idMap` 中存储的是新对象的引用。后续你在 `idMap[parentId].children.push(...)` 时，实际上是修改了这个对象的 `children` 属性。
// 而 `result.push(idMap[item.id])` 时，`result` 里存放的也是同一个对象的引用。
// 所以，无论你通过 `idMap` 还是 `result` 访问这个对象，看到的都是同一个对象，修改它的属性会同步反映在所有引用上。

let tree = arrayToTree([
  { id: 1, value: 1, parent: null },
  { id: 2, value: 2, parent: 1 },
  { id: 3, value: 3, parent: 1 },
  { id: 4, value: 4, parent: 2 },
  { id: 5, value: 5, parent: 2 },
]);

console.log(tree);
