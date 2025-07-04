/**
 * concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 */
function concat(...args) {
  let result = [];
  for (let ags of args) {
    if (Array.isArray(ags)) {
      for (let i = 0; i < ags.length; i++) {
        result.push(ags[i]);
      }
    } else {
      result.push(ags);
    }
  }
  return result;
}

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [[7, 8, 9]];
console.log(concat(arr1, arr2, arr3)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 自定义 Array.prototype.concat() 实现 (Custom Array.prototype.concat() Implementation)

/**
 * 模拟 `Array.prototype.concat()` 方法。\
 * 该方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 * 它将当前数组与提供的值（可以是单个值或数组）连接起来。
 *
 * @param {Array} baseArray - 作为连接操作基础的数组。
 * @param {...(Array|any)} args - 要连接到 `baseArray` 的一个或多个数组或值。
 * @returns {Array} 包含 `baseArray` 和所有 `args` 中元素的新的 `Array` 实例。
 * @example
 * const arr1 = [1, 2];
 * const arr2 = [3, 4];
 * const arr3 = [5, 6];
 *
 * // 连接多个数组
 * console.log(customConcat(arr1, arr2, arr3)); // [1, 2, 3, 4, 5, 6]
 *
 * // 连接数组和非数组值
 * console.log(customConcat(arr1, 3, [4, 5])); // [1, 2, 3, 4, 5]
 *
 * // 连接单个非数组值
 * console.log(customConcat(arr1, 'hello', { key: 'value' })); // [1, 2, 'hello', { key: 'value' }]
 *
 * // 原始数组不会被修改
 * console.log(arr1); // [1, 2]
 */
function customConcat(baseArray, ...args) {
  // 创建一个新数组来存储结果，避免修改原数组
  const result = [...baseArray];

  for (let i = 0; i < args.length; i++) {
    const currentArg = args[i];
    if (Array.isArray(currentArg)) {
      // 如果当前参数是数组，则将其所有元素添加到结果数组
      result.push(...currentArg);
    } else {
      // 如果当前参数不是数组，则直接将其添加到结果数组
      result.push(currentArg);
    }
  }
  return result;
}

// 为了使其可以在其他文件中导入和使用
// module.exports = customConcat;
