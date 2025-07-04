/**
 * @file `forEach` 和 `map` 数组方法的自定义实现
 * @description 本文件提供了 `forEach` 和 `map` 两个常用数组方法的自定义 JavaScript 实现，
 * 以及 `Array.prototype.forEach` 的兼容性实现。
 * 这些实现旨在帮助理解这些方法在底层是如何工作的，同时提供了详细的 JSDoc 注释以增强可读性和可维护性。
 */

/**
 * `nativeForEach()` 函数：对数组的每个元素执行一次提供的函数。
 * 这是一个简单的迭代函数，不处理稀疏数组或 `this` 上下文。
 *
 * @param {Array<any>} array - 需要遍历的数组。
 * @param {function(any, number, Array<any>): void} callback - 对每个元素执行的函数，接收三个参数：
 *   - `currentValue`: 当前正在处理的元素。
 *   - `index`: 当前正在处理的元素的索引。
 *   - `array`: `nativeForEach` 方法被调用的数组。
 * @returns {Array<any>} 原始数组（出于链式调用的可能性，尽管 `forEach` 通常不返回新数组）。
 * @example
 * const numbers = [1, 2, 3];
 * nativeForEach(numbers, (value, index) => {
 *   console.log(`Value: ${value}, Index: ${index}`);
 * });
 * // Expected output:
 * // Value: 1, Index: 0
 * // Value: 2, Index: 1
 * // Value: 3, Index: 2
 */
function nativeForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
  return array; // For consistency, though forEach typically returns undefined
}

/**
 * 为 `Array.prototype` 添加一个自定义的 `forEach` 方法。
 * 这个实现更接近原生 `Array.prototype.forEach` 的行为，包括处理稀疏数组和 `this` 上下文。
 *
 * @param {function(any, number, Array<any>): void} callback - 对每个元素执行的函数，接收三个参数：
 *   - `currentValue`: 当前正在处理的元素。
 *   - `index`: 当前正在处理的元素的索引。
 *   - `array`: `forEach` 方法被调用的数组。
 * @param {Object} [thisArg] - 可选。执行 `callback` 时用作 `this` 的值。
 * @throws {TypeError} 如果 `callback` 不是一个函数。
 * @returns {void} 不返回任何值（`undefined`），这是原生 `forEach` 的行为。
 * @example
 * // 示例1: 遍历普通数组
 * const items = ['a', 'b', 'c'];
 * items.forEach((item, index) => {
 *   console.log(`Item ${item} at index ${index}`);
 * });
 * // Expected output:
 * // Item a at index 0
 * // Item b at index 1
 * // Item c at index 2
 *
 * // 示例2: 遍历稀疏数组
 * const sparseArray = [, 'hello', , 'world'];
 * sparseArray.forEach((value, index) => {
 *   console.log(`Sparse Array Item: ${value} at index ${index}`);
 * });
 * // Expected output (注意跳过了空洞):
 * // Sparse Array Item: hello at index 1
 * // Sparse Array Item: world at index 3
 *
 * // 示例3: 绑定 this 上下文
 * const obj = { multiplier: 2 };
 * [1, 2, 3].forEach(function(num) {
 *   console.log(num * this.multiplier);
 * }, obj);
 * // Expected output:
 * // 2
 * // 4
 * // 6
 */
Array.prototype.forEach = function (callback, thisArg = undefined) {
  const O = Object(this); // 确保是对象
  const len = O.length >>> 0; // 无符号右移0位，确保是正整数并处理非数值长度

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let k = 0;

  while (k < len) {
    // 检查属性是否存在于对象本身或其原型链中
    if (k in O) {
      // 使用 call 方法确保 callback 中的 this 上下文正确
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
};

// let arry = [1, 2, 3];
let arry = [, , 3];
// nativeForEach(arry, (value, index, array) => {
//   console.log(value, index, array);
// });

// arry.forEach((value, index, array) => {
//   console.log(value, index, array);
// });

/**
 * `map()` 函数：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
 * 该方法不会改变原数组。
 *
 * @param {Array<any>} array - 需要映射的数组。
 * @param {function(any, number, Array<any>): any} callback - 创建新数组元素的函数，接收三个参数：
 *   - `currentValue`: 当前正在处理的元素。
 *   - `index`: 当前正在处理的元素的索引。
 *   - `array`: `map` 方法被调用的数组。
 * @param {Object} [thisArg] - 可选。执行 `callback` 时用作 `this` 的值。
 * @returns {Array<any>} 一个由原数组每个元素执行回调函数的结果组成的新数组。
 * @example
 * const array1 = [1, 4, 9, 16];
 * const map1 = map(array1, (x) => x * 2);
 * console.log(map1); // Expected output: Array [2, 8, 18, 32]
 *
 * const numbers = [5, 10, 15];
 * const doubledNumbers = map(numbers, (num) => num * 2);
 * console.log(doubledNumbers); // [10, 20, 30]
 *
 * const words = ['apple', 'banana', 'cherry'];
 * const wordLengths = map(words, (word) => word.length);
 * console.log(wordLengths); // [5, 6, 6]
 */
function map(array, callback, thisArg = undefined) {
  let len = array.length;
  // 对于 map，即使是空数组也应该返回一个空数组，而不是 undefined
  if (len === 0) return [];

  let newArray = [];
  for (let i = 0; i < len; i++) {
    // 使用 call 方法确保 callback 中的 this 上下文正确
    newArray.push(callback.call(thisArg, array[i], i, array));
  }
  return newArray;
}

// 以下为原始文件中的示例调用，现已注释掉，并将示例整合到各自函数的JSDoc中。
// const array1 = [1, 4, 9, 16];
// const map1 = map(array1, (x) => x * 2);
// console.log(map1); // Expected output: Array [2, 8, 18, 32]
