function treeToArray1(tree) {
  const result = [];

  function parse(array) {
    for (const item of array) {
      result.push(item);
      if (item.children?.length) {
        parse(item.children);
      }
    }
  }
  parse(tree);

  return result;
}
function treeToArray(tree) {
  const result = [];
  for (const item of tree) {
    result.push(item);
    if (item.children?.length) {
      result.push(...treeToArray(item.children));
    }
    delete item.children;
  }
  return result;
}

// 示例树形结构
const inputTree = [
  {
    id: 1,
    parentId: null,
    name: "Node 1",
    children: [
      {
        id: 2,
        parentId: 1,
        name: "Node 1.1",
        children: [
          {
            id: 4,
            parentId: 2,
            name: "Node 1.1.1",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: "Node 1.2",
        children: [],
      },
    ],
  },
  {
    id: 5,
    parentId: null,
    name: "Node 2",
    children: [
      {
        id: 6,
        parentId: 5,
        name: "Node 2.1",
        children: [],
      },
    ],
  },
];

// 转换树形结构为数组
const array = treeToArray(inputTree);

console.log(array);
