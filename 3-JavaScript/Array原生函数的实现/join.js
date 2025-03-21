/**
 * 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
 * 如果数组只有一个项目，那么将返回该项目而不使用分隔符。
 *
 * @param {Array} array - 需要连接的数组。
 * @param {string} [separator=','] - 用作分隔符的字符串。如果省略了该参数，默认使用逗号作为分隔符。
 * @returns {string} 由数组中的每个元素转换成的字符串，这些字符串被分隔符连接并返回。
 */
function join(array, separator = ",") {
  if (array.length === 0) return "";
  let char = array[0];
  for (let i = 1; i < array.length; i++) {
    let element = array[i];
    if (element === undefined || element === null) element = "";
    char += separator + element;
  }
  return char;
}

const elements = ["Fire", "Air", null, undefined];

console.log(join(elements)); // Expected output: "Fire,Air,Water"
console.log(join(elements, "")); // Expected output: "FireAirWater"
console.log(join(elements, "-")); // Expected output: "Fire-Air-Water"

/**
 * 返回一个表示数组及其元素的字符串。
 *
 * @returns {string} 数组及其元素的字符串表示。
 */
function toString(array) {
  return array.join();
}

const array1 = [1, 2, "a", "1a"];

console.log(array1.toString()); // Expected output: "1,2,a,1a"
