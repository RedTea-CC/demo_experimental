// Description: groupBy() 方法创建一个对象，key 是回调函数返回的值，value 是满足回调函数的元素数组。
// 兼容性：Node.js 21.0.0

const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];

function myCallback({ quantity }) {
  return quantity > 5 ? "more" : "less";
}

const result2 = Object.groupBy(inventory, myCallback);

console.log(result2);
/* 结果是：
  {
    less: [
      { name: "芦笋", type: "蔬菜", quantity: 5 },
      { name: "香蕉", type: "水果", quantity: 0 },
      { name: "樱桃", type: "水果", quantity: 5 }
    ],
    more: [
      { name: "山羊", type: "肉", quantity: 23 },
      { name: "鱼", type: "肉", quantity: 22 }
    ]
  }
  */
