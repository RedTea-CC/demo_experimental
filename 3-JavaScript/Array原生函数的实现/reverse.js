/**
 * @file 数组反转（`reverse`）方法的自定义实现
 * @description 本文件提供了两种数组反转方法的自定义 JavaScript 实现：
 *   1. `Array.prototype.myReverse()`：模拟原生 `Array.prototype.reverse()`，原地反转数组。
 *   2. `toReverse()`：一个纯函数，返回一个反转后的新数组而不修改原数组。
 * 提供了详细的 JSDoc 注释以增强代码的可读性和可维护性。
 */

/**
 * `Array.prototype.myReverse()` 方法：就地反转数组中的元素。
 * 这是对原生 `Array.prototype.reverse()` 的模拟实现，会修改原数组。
 *
 * @returns {Array<any>} 返回同一数组的引用，即被反转后的原数组。
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * console.log(array1.myReverse()); // Expected output: [5, 4, 3, 2, 1]
 * console.log(array1);              // Expected output: [5, 4, 3, 2, 1] (原数组被修改)
 *
 * const array2 = ['a', 'b', 'c'];
 * console.log(array2.myReverse()); // Expected output: ['c', 'b', 'a']
 */
Array.prototype.myReverse = function () {
  let left = 0;
  let right = this.length - 1;

  while (left < right) {
    // 使用解构赋值交换元素
    [this[left], this[right]] = [this[right], this[left]];
    left++;
    right--;
  }
  return this;
};

// ---------------------------------------------------

/**
 * `toReverse()` 函数：将数组中的元素顺序反转，并返回一个新的数组。
 * 这是一个纯函数，它不会修改原始数组。
 *
 * @param {Array<any>} arr - 待反转的数组。
 * @returns {Array<any>} 返回一个包含反转后元素的新数组。
 * @example
 * const originalArray1 = [1, 2, 3, 4, 5];
 * const reversedArray1 = toReverse(originalArray1);
 * console.log(reversedArray1); // Expected output: [5, 4, 3, 2, 1]
 * console.log(originalArray1); // Expected output: [1, 2, 3, 4, 5] (原数组未被修改)
 *
 * const originalArray2 = ['apple', 'banana', 'cherry'];
 * const reversedArray2 = toReverse(originalArray2);
 * console.log(reversedArray2); // Expected output: ['cherry', 'banana', 'apple']
 */
function toReverse(arr) {
  let left = 0;
  let right = arr.length - 1;
  // 创建数组的浅拷贝，避免修改原数组
  let res = [...arr];

  while (left < right) {
    [res[left], res[right]] = [res[right], res[left]];
    left++;
    right--;
  }
  return res;
}
