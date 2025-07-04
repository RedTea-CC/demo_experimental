/**
 * @file 数组 `reduce` 和 `reduceRight` 方法的自定义实现
 * @description 本文件提供了 `Array.prototype.reduce()`, `Array.prototype.reduceRight()` 方法的自定义 JavaScript 实现，
 * 以及一个独立的 `Reduce` 函数。
 * 这些实现旨在帮助深入理解这些高阶函数在底层是如何工作的，同时提供了详细的 JSDoc 注释以增强可读性和可维护性。
 */

/**
 * `Array.prototype.reduce()`：通过为数组中的每个元素调用回调函数将数组简化为单个值。
 * 回调函数依次处理数组中的每个元素，将前一个回调的返回值作为累积值继续计算。
 *
 * @param {function(any, any, number, Array<any>): any} callback - 用于处理数组每个元素的函数。它接收四个参数：
 *   - `accumulator`: 累加器，或者上次回调函数返回的值，或者 `initialValue`。
 *   - `currentValue`: 数组中当前正在处理的元素。
 *   - `currentIndex`: 数组中当前正在处理的元素的索引。
 *   - `array`: `reduce` 方法被调用的数组。
 * @param {any} [initialValue] - 可选。作为第一次调用 `callback` 函数时的第一个参数的值。
 *   如果未提供 `initialValue`，则将使用数组的第一个元素作为累加器的初始值，
 *   并且 `currentValue` 将从第二个元素开始。
 * @returns {any} 累积计算的最终结果。
 * @throws {TypeError} 如果 `callback` 不是一个函数，或者在空数组上调用且未提供 `initialValue`。
 * @example
 * // 示例1: 对数字数组求和
 * const numbers = [1, 2, 3, 4, 5];
 * const sum = numbers.reduce((acc, current) => acc + current, 0);
 * console.log(sum); // Expected output: 15
 *
 * // 示例2: 扁平化数组数组
 * const flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 *   (acc, cur) => acc.concat(cur),
 *   [],
 * );
 * console.log(flattened); // Expected output: [0, 1, 2, 3, 4, 5]
 *
 * // 示例3: 计算数组中每个元素出现的次数
 * const names = ['Alice', 'Bob', 'Tiff', 'Alice'];
 * const countedNames = names.reduce((allNames, name) => {
 *   const currCount = allNames[name] ?? 0;
 *   return { ...allNames, [name]: currCount + 1 };
 * }, {});
 * console.log(countedNames); // Expected output: { Alice: 2, Bob: 1, Tiff: 1 }
 */
Array.prototype.reduce = function (callback, initialValue) {
  const O = Object(this); // 确保是对象
  const len = O.length >>> 0; // 无符号右移0位，确保是正整数

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let k = 0;
  let accumulator;

  // 处理 initialValue 的情况
  if (arguments.length > 1) { // 检查是否提供了 initialValue
    accumulator = initialValue;
  } else {
    // 没有提供 initialValue，从第一个非空元素开始
    while (k < len && !(k in O)) {
      k++;
    }
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[k++];
  }

  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O); // reduce 回调的 this 为 undefined
    }
    k++;
  }

  return accumulator;
};

let arry = [1, 2, 3];
// arry.reduce((accumulator, currentValue, currentIndex, array) => {
//   console.log(accumulator, currentValue, currentIndex, array);
//   return accumulator + currentValue;
// }, 0);

//
const Reduce = (array, callback, initialValue) => {
  const O = Object(array); // 确保是对象
  const len = O.length >>> 0; // 无符号右移0位，确保是正整数

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let curIndex = 0;
  let accumulator;

  if (arguments.length > 2) { // 检查是否提供了 initialValue (arguments[2]对应initialValue)
    accumulator = initialValue;
  } else {
    // 没有提供 initialValue，从第一个非空元素开始
    while (curIndex < len && !(curIndex in O)) {
      curIndex++;
    }
    if (curIndex >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[curIndex++];
  }

  while (curIndex < len) {
    if (curIndex in O) {
      accumulator = callback.call(
        undefined, // `this` 上下文应为 undefined
        accumulator,
        O[curIndex],
        curIndex,
        O
      );
    }
    curIndex++;
  }
  return accumulator;
};

let result = Reduce(
  [1, 2, 3],
  (accumulator, currentValue, currentIndex, array) => {
    console.log(accumulator, currentValue, currentIndex, array);
    return accumulator + currentValue;
  }
);
console.log("result:", result);

// ---------
/**
 * `Array.prototype.reduceRight()`：工作方式与 `reduce()` 类似，但它从数组的右侧（即最后一个元素）开始向左处理。
 * 回调函数依次处理数组中的每个元素，将前一个回调的返回值作为累积值继续计算。
 *
 * @param {function(any, any, number, Array<any>): any} callback - 用于处理数组每个元素的函数。它接收四个参数：
 *   - `accumulator`: 累加器，或者上次回调函数返回的值，或者 `initialValue`。
 *   - `currentValue`: 数组中当前正在处理的元素。
 *   - `currentIndex`: 数组中当前正在处理的元素的索引。
 *   - `array`: `reduceRight` 方法被调用的数组。
 * @param {any} [initialValue] - 可选。作为第一次调用 `callback` 函数时的第一个参数的值。
 *   如果未提供 `initialValue`，则将使用数组的最后一个元素作为累加器的初始值，
 *   并且 `currentValue` 将从倒数第二个元素开始。
 * @returns {any} 累积计算的最终结果。
 * @throws {TypeError} 如果 `callback` 不是一个函数，或者在空数组上调用且未提供 `initialValue`。
 * @example
 * // 示例1: 从右到左连接字符串
 * const words = ['the', 'quick', 'brown', 'fox'];
 * const combined = words.reduceRight((acc, word) => acc + ' ' + word);
 * console.log(combined); // Expected output: "fox brown quick the"
 *
 * // 示例2: 从右到左进行计算
 * const numbers = [1, 2, 3, 4];
 * const result = numbers.reduceRight((acc, val) => acc - val, 10); // 10 - 4 - 3 - 2 - 1
 * console.log(result); // Expected output: 0
 */
Array.prototype.reduceRight = function (callback, initialValue) {
  const O = Object(this); // 确保是对象
  const len = O.length >>> 0; // 无符号右移0位，确保是正整数

  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let k = len - 1;
  let accumulator;

  // 处理 initialValue 的情况
  if (arguments.length > 1) { // 检查是否提供了 initialValue
    accumulator = initialValue;
  } else {
    // 没有提供 initialValue，从最后一个非空元素开始
    while (k >= 0 && !(k in O)) {
      k--;
    }
    if (k < 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[k--];
  }

  while (k >= 0) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O); // reduceRight 回调的 this 为 undefined
    }
    k--;
  }

  return accumulator;
};
