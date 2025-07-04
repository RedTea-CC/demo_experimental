/**
 * @file 数组 `join` 和 `toString` 方法的自定义实现
 * @description 本文件提供了 `Array.prototype.join()` 和 `Array.prototype.toString()` 方法的自定义 JavaScript 实现。
 * 这些实现旨在帮助理解这些方法在底层是如何工作的，同时提供了详细的 JSDoc 注释以增强可读性和可维护性。
 */

/**
 * `join()` 函数：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
 * 如果数组只有一个项目，那么将返回该项目而不使用分隔符。
 * `null` 和 `undefined` 元素会被转换为空字符串。
 *
 * @param {Array<any>} array - 需要连接的数组。
 * @param {string} [separator=','] - 可选。用作分隔符的字符串。如果省略了该参数，默认使用逗号（","）作为分隔符。
 * @returns {string} 由数组中的每个元素转换成的字符串，这些字符串被分隔符连接并返回。
 * @example
 * const elements1 = ["Fire", "Air", "Water"];
 * console.log(join(elements1));         // Expected output: "Fire,Air,Water"
 * console.log(join(elements1, ""));      // Expected output: "FireAirWater"
 * console.log(join(elements1, "-"));      // Expected output: "Fire-Air-Water"
 *
 * const elements2 = ["Fire", "Air", null, undefined, "Water"];
 * console.log(join(elements2));         // Expected output: "Fire,Air,,Water" (null/undefined转换为空字符串)
 * console.log(join(elements2, "-"));      // Expected output: "Fire-Air--Water"
 *
 * const singleElementArray = [123];
 * console.log(join(singleElementArray)); // Expected output: "123"
 *
 * const emptyArray = [];
 * console.log(join(emptyArray));        // Expected output: ""
 */
function join(array, separator = ",") {
  if (array.length === 0) {
    return "";
  }

  let result = "";
  // 处理第一个元素
  result += (array[0] === undefined || array[0] === null) ? "" : String(array[0]);

  for (let i = 1; i < array.length; i++) {
    let element = array[i];
    // 将 undefined 或 null 转换为字符串''
    if (element === undefined || element === null) {
      element = "";
    }
    result += separator + String(element);
  }
  return result;
}

const elements = ["Fire", "Air", null, undefined];

console.log(join(elements)); // Expected output: "Fire,Air,Water"
console.log(join(elements, "")); // Expected output: "FireAirWater"
console.log(join(elements, "-")); // Expected output: "Fire-Air-Water"

/**
 * `toString()` 函数：返回一个表示数组及其元素的字符串。
 * 该方法内部调用了原生 `Array.prototype.join()` 方法，不接受任何参数。
 *
 * @param {Array<any>} array - 需要转换为字符串表示的数组。
 * @returns {string} 数组及其元素的字符串表示，元素之间用逗号分隔。
 * @example
 * const array1 = [1, 2, "a", "1a"];
 * console.log(toString(array1)); // Expected output: "1,2,a,1a"
 *
 * const array2 = ['hello', null, undefined, 42];
 * console.log(toString(array2)); // Expected output: "hello,,,",42" (null/undefined转换为空字符串)
 *
 * const emptyArray = [];
 * console.log(toString(emptyArray)); // Expected output: ""
 */
function toString(array) {
  return array.join();
}

const array1 = [1, 2, "a", "1a"];

console.log(array1.toString()); // Expected output: "1,2,a,1a"
