/**
 * @file 数组原生方法的自定义实现
 * @description 本文件包含了一些常用数组原生方法（如 `some`, `every`, `indexOf`, `lastIndexOf`, `filter`）的自定义 JavaScript 实现。
 * 这些实现旨在帮助理解这些方法在底层是如何工作的，同时提供了一致的 JSDoc 注释以增强可读性和可维护性。
 */

/**
 * `mySome()` 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。
 * 如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。
 * 它不会修改数组。
 * @param {Array<any>} arr - 待测试的数组。
 * @param {function(any, number, Array<any>): boolean} callback - 用于测试每个元素的函数，接受三个参数：
 *   - `currentValue`: 数组中当前正在处理的元素。
 *   - `index`: 数组中当前正在处理的元素的索引。
 *   - `array`: `some` 方法正在操作的数组。
 * @param {Object} [thisArg] - 可选。执行 `callback` 时用作 `this` 的值。
 * @returns {boolean} 如果数组中至少有一个元素通过了 `callback` 函数的测试，则返回 `true`；否则返回 `false`。
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const hasEven = mySome(numbers, num => num % 2 === 0); // true (因为 2 和 4 是偶数)
 * console.log(hasEven);
 *
 * const words = ['apple', 'banana', 'cherry'];
 * const hasLongWord = mySome(words, word => word.length > 7); // true (因为 'banana' 和 'cherry' 长度都大于7)
 * console.log(hasLongWord);
 */
function mySome(arr, callback, thisArg = undefined) {
  for (let i = 0; i < arr.length; i++) {
    // 使用 call 方法确保 callback 中的 this 上下文正确
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

/**
 * `myEvery()` 方法测试一个数组内的所有元素是否都能通过指定函数的测试。
 * 如果数组中的每个元素都通过了测试，则返回 true；否则返回 false。
 * 它不会修改数组。
 * 如果是空数组，则返回 true。
 * @param {Array<any>} arr - 待测试的数组。
 * @param {function(any, number, Array<any>): boolean} callback - 用于测试每个元素的函数，接受三个参数：
 *   - `currentValue`: 数组中当前正在处理的元素。
 *   - `index`: 数组中当前正在处理的元素的索引。
 *   - `array`: `every` 方法正在操作的数组。
 * @param {Object} [thisArg] - 可选。执行 `callback` 时用作 `this` 的值。
 * @returns {boolean} 如果数组中的所有元素都通过了 `callback` 函数的测试，则返回 `true`；否则返回 `false`。
 * @example
 * const numbers = [2, 4, 6, 8];
 * const allEven = myEvery(numbers, num => num % 2 === 0); // true
 * console.log(allEven);
 *
 * const words = ['dog', 'cat', 'bird'];
 * const allShortWords = myEvery(words, word => word.length < 5); // true
 * console.log(allShortWords);
 */
function myEvery(arr, callback, thisArg = undefined) {
  for (let i = 0; i < arr.length; i++) {
    // 使用 call 方法确保 callback 中的 this 上下文正确
    if (!callback.call(thisArg, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

/**
 * `indexOf()` 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1。
 *
 * @param {Array<any>} array - 需要搜索的数组。
 * @param {any} searchElement - 需要查找的元素。
 * @param {number} [fromIndex=0] - 可选。开始搜索的位置（索引）。可以是负数，表示从数组末尾开始的偏移量。
 * @returns {number} 返回找到的元素的第一个索引，如果没有找到则返回 -1。
 * @example
 * const arr = [1, 2, 3, 2, 5];
 * console.log(indexOf(arr, 2));      // 1
 * console.log(indexOf(arr, 2, 2));   // 3 (从索引2开始搜索)
 * console.log(indexOf(arr, 6));      // -1
 * console.log(indexOf([], 1));       // -1 (空数组)
 * console.log(indexOf([1, 2], 1, 5)); // -1 (fromIndex超出数组长度)
 * console.log(indexOf([1, 2, 3], 1, -2)); // 0 (fromIndex = 3 + (-2) = 1, 从索引1开始找)
 */
function indexOf(array, searchElement, fromIndex = 0) {
  let len = array.length;
  // 如果数组为空，直接返回 -1
  if (len === 0) return -1;

  // 如果 fromIndex >= array.length，直接返回 -1
  if (fromIndex >= len) return -1;

  // 如果 fromIndex < 0，计算实际的起始位置
  // 如果 fromIndex + len 结果小于 0，则实际起始位置为 0
  let start = fromIndex < 0 ? Math.max(0, fromIndex + len) : fromIndex;

  for (let i = start; i < len; i++) {
    // 使用严格相等 (===) 进行比较
    if (searchElement === array[i]) {
      return i;
    }
  }

  // 没有找到元素，返回 -1
  return -1;
}

/**
 * `lastIndexOf()` 返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。
 * 该方法从 `fromIndex` 开始向前（倒序）搜索数组。
 *
 * @param {Array<any>} array - 需要搜索的数组。
 * @param {any} searchElement - 需要查找的元素。
 * @param {number} [fromIndex=array.length - 1] - 可选。从该索引处开始向后搜索。可以是负数，表示从数组末尾开始的偏移量。
 * @returns {number} 返回找到的元素的最后一个索引，如果没有找到则返回 -1。
 * @example
 * const arr = [1, 2, 3, 2, 5];
 * console.log(lastIndexOf(arr, 2));      // 3
 * console.log(lastIndexOf(arr, 2, 2));   // 1 (从索引2开始向前搜索)
 * console.log(lastIndexOf(arr, 6));      // -1
 * console.log(lastIndexOf([], 1));       // -1 (空数组)
 * console.log(lastIndexOf([1, 2], 1, -1)); // 0 (fromIndex = 2 + (-1) = 1, 从索引1开始向前找)
 */
function lastIndexOf(array, searchElement, fromIndex = array.length - 1) {
  let len = array.length;

  // 如果数组为空，直接返回 -1
  if (len === 0) return -1;

  // 如果 fromIndex >= array.length，设置为 len - 1
  // 如果 fromIndex 是负数，计算实际的起始位置，如果结果小于 0，则设置为 -1 (表示找不到)
  let start = fromIndex < 0 ? Math.max(-1, fromIndex + len) : Math.min(fromIndex, len - 1);

  // 从 start 位置开始向前搜索
  for (let i = start; i >= 0; i--) {
    // 使用严格相等 (===) 进行比较
    if (array[i] === searchElement) { // 修正：element 应该为 searchElement
      return i;
    }
  }

  // 没有找到元素，返回 -1
  return -1;
}

/**
 * `filter()` 创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
 * 该方法不会改变原数组。
 * @param {Array<any>} array - 需要过滤的数组。
 * @param {function(any, number, Array<any>): boolean} callback - 测试每个元素的函数。接受三个参数：
 *   - `currentValue`: 数组中当前正在处理的元素。
 *   - `index`: 数组中当前正在处理的元素的索引。
 *   - `array`: `filter` 方法正在操作的数组。
 *   返回 `true` 以保留元素，返回 `false` 则丢弃。
 * @param {Object} [thisArg] - 可选。执行 `callback` 时用作 `this` 的值。
 * @returns {Array<any>} 返回一个新的、由通过 `callback` 函数测试的元素组成的数组。
 * @example
 * const words = ["spray", "elite", "exuberant", "destruction", "present"];
 * const result = filter(words, (word) => word.length > 6);
 * console.log(result); // ["exuberant", "destruction", "present"]
 *
 * const numbers = [10, 20, 30, 40, 50];
 * const greaterThan25 = filter(numbers, num => num > 25);
 * console.log(greaterThan25); // [30, 40, 50]
 */
function filter(array, callback, thisArg = undefined) {
  let newArray = []; // 修正：变量名统一为 newArray
  for (let i = 0; i < array.length; i++) {
    // 使用 call 方法确保 callback 中的 this 上下文正确
    if (callback.call(thisArg, array[i], i, array)) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

