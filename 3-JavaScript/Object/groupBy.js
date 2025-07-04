// Object.groupBy() 方法的用法示例 (Usage Example of Object.groupBy())

/**
 * Object.groupBy() 方法用于创建一个新的对象，其中键（key）是回调函数对数组中每个元素返回的值，
 * 而值（value）是满足该回调函数条件的原始数组元素的集合（数组）。
 * 这个方法非常适用于根据某个属性或条件对数组中的对象进行分类和分组。
 *
 * 兼容性注意：这是一个相对较新的 JavaScript 功能，需要 Node.js 21.0.0 或更高版本，
 * 或支持该功能的现代浏览器环境。
 */

// 示例数据：库存列表
const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];

/**
 * 回调函数，用于确定每个库存项的分组键。
 * 如果 `quantity` 大于 5，则分组为 'more'；否则为 'less'。
 *
 * @param {object} item - 库存中的单个项。
 * @param {number} item.quantity - 库存项的数量。
 * @returns {string} 返回分组键，'more' 或 'less'。
 */
function myCallback({ quantity }) {
  return quantity > 5 ? "more" : "less";
}

/**
 * 使用 Object.groupBy() 对库存进行分组。
 * @example
 * const result = Object.groupBy(inventory, myCallback);
 * console.log(result);
 * // 预期输出:
 * // {
 * //   less: [
 * //     { name: "芦笋", type: "蔬菜", quantity: 5 },
 * //     { name: "香蕉", type: "水果", quantity: 0 },
 * //     { name: "樱桃", type: "水果", quantity: 5 }
 * //   ],
 * //   more: [
 * //     { name: "山羊", type: "肉", quantity: 23 },
 * //     { name: "鱼", type: "肉", quantity: 22 }
 * //   ]
 * // }
 */
const result = Object.groupBy(inventory, myCallback);

// 在实际应用中，你可能会这样使用 result 对象：
// console.log(result.less);
// console.log(result.more);
