// ------数组转树

function arrayToTree(array) {
  const idMap = new Map();
  array.forEach((item) => idMap.set(item.id, { ...item, children: [] }));

  const roots = [];
  array.forEach((item) => {
    if (item.parent === null) {
      roots.push(idMap.get(item.id));
    } else {
      idMap.get(item.parent).children.push(item);
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

// ------end
