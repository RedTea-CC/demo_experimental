// 数组原生方法：增删改查的自定义实现 (Custom Implementations of Native Array Methods: CRUD)

/**
 * 本文件提供了 JavaScript 数组原型上常用的 CRUD (创建、读取、更新、删除) 方法的自定义实现。
 * 这些实现旨在模拟原生方法的功能，帮助理解其底层工作原理。
 * 所有这些方法都会修改原始数组（in-place）。
 */

/**
 * 模拟 `Array.prototype.push()` 方法。
 * 将一个或多个元素添加到数组的末尾，并返回修改后数组的新长度。
 * 该方法会修改原始数组。
 *
 * @param {...any} args - 要添加到数组末尾的元素。
 * @returns {number} 修改后数组的新长度。
 * @example
 * const arr = [1, 2, 3];
 * console.log(arr.myPush(4, 5)); // 5
 * console.log(arr); // [1, 2, 3, 4, 5]
 */
Array.prototype.myPush = function (...args) {
  let len = this.length; // 获取当前数组长度
  for (let i = 0; i < args.length; i++) {
    this[len + i] = args[i]; // 将传入的元素依次添加到数组末尾
  }
  return this.length; // 返回新长度
};

/**
 * 模拟 `Array.prototype.pop()` 方法。
 * 从数组中删除最后一个元素，并返回该元素的值。此方法会修改原始数组的长度。
 * 如果数组为空，则返回 `undefined`。
 *
 * @returns {any | undefined} 被删除的最后一个元素的值；如果数组为空，则为 `undefined`。
 * @example
 * const arr = [1, 2, 3];
 * console.log(arr.myPop()); // 3
 * console.log(arr); // [1, 2]
 *
 * const emptyArr = [];
 * console.log(emptyArr.myPop()); // undefined
 * console.log(emptyArr); // []
 */
Array.prototype.myPop = function () {
  let len = this.length;
  if (len === 0) return undefined; // 数组为空，返回 undefined

  let lastElement = this[len - 1]; // 获取最后一个元素
  this.length = len - 1; // 减小数组长度，从而删除最后一个元素
  // 注意: 在严格模式下，或对于非可配置属性，直接 delete this[len - 1] 可能会失败
  // 但设置 length 通常是更安全的做法，它会自动处理数组元素的删除。
  return lastElement;
};

/**
 * 模拟 `Array.prototype.unshift()` 方法。
 * 将一个或多个元素添加到数组的开头，并返回数组的新长度。
 * 该方法会修改原始数组。它会将现有元素向后移动以腾出空间。
 *
 * @param {...any} args - 要添加到数组开头的元素。
 * @returns {number} 修改后数组的新长度。
 * @example
 * const arr = [3, 4];
 * console.log(arr.myUnshift(1, 2)); // 4
 * console.log(arr); // [1, 2, 3, 4]
 */
Array.prototype.myUnshift = function (...args) {
  const currentLength = this.length; // 原始数组长度
  const argsCount = args.length; // 要添加的元素数量

  if (argsCount === 0) {
    return currentLength;
  }

  // 将现有元素向后移动，为新元素腾出空间
  // 从后向前遍历，避免覆盖尚未移动的元素
  for (let i = currentLength - 1; i >= 0; i--) {
    // 将当前元素移动到新位置 (原索引 + argsCount)
    this[i + argsCount] = this[i];
  }

  // 将新元素插入到数组的开头
  for (let i = 0; i < argsCount; i++) {
    this[i] = args[i];
  }

  // 更新数组长度
  this.length = currentLength + argsCount;
  return this.length;
};

/**
 * 模拟 `Array.prototype.shift()` 方法。
 * 从数组中删除第一个元素，并返回该元素的值。此方法会修改原始数组的长度。
 * 如果数组为空，则返回 `undefined`。
 *
 * @returns {any | undefined} 被删除的第一个元素的值；如果数组为空，则为 `undefined`。
 * @example
 * const arr = [1, 2, 3];
 * console.log(arr.myShift()); // 1
 * console.log(arr); // [2, 3]
 *
 * const emptyArr = [];
 * console.log(emptyArr.myShift()); // undefined
 * console.log(emptyArr); // []
 */
Array.prototype.myShift = function () {
  let len = this.length;
  if (len === 0) return undefined; // 数组为空，返回 undefined

  let firstElement = this[0]; // 获取第一个元素

  // 将所有元素向前移动一个位置，覆盖第一个元素
  for (let i = 0; i < len - 1; i++) {
    this[i] = this[i + 1];
  }

  // 减小数组长度，从而删除最后一个冗余元素
  this.length = len - 1;
  return firstElement;
};
