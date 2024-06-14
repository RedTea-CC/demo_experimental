/**
 * 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
 *
 * @param {Array} array - 需要搜索的数组。
 * @param {*} searchElement - 需要查找的元素。
 * @param {number} [fromIndex=0] - 开始查找的位置。如果该值为负值，将其作为数组末尾的一个偏移量。
 * @returns {boolean} 如果数组中存在该元素，则返回 true，否则返回 false。
 */
function includes(array, searchElement, fromIndex = 0) {
  let len = array.length;
  // 处理负索引
  start = start < 0 ? Math.max(len + fromIndex, 0) : start;
  if (start >= len) return false;
  for (let i = start; i < array.length; i++) {
    const element = array[i];
    if (element === searchElement) return true;
  }
  return false;
}

const array1 = [1, 2, 3];
console.log(array1.includes(2)); // Expected output: true
const pets = ["cat", "dog", "bat"];
console.log(pets.includes("cat")); // Expected output: true
console.log(pets.includes("at")); // Expected output: false

/**
 * 在数组中查找符合测试函数条件的第一个元素的值。如果没有找到符合条件的元素，则返回undefined。
 *
 * @param {Array} array - 需要搜索的数组。
 * @param {function} callback - 用来测试每个元素的函数。调用时使用参数 (element, index, array)。返回 true 表示找到了符合条件的元素，停止搜索。
 * @param {*} [thisArg] - 执行 callback 时使用的 this 值。
 * @returns {*} 返回数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。
 */
function find(array, callback, thisArg = undefined) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (callback.call(thisArg, element, i, array)) return element;
  }
  return undefined;
}

/**
 * 在数组中查找符合测试函数条件的元素的索引。如果没有找到符合条件的元素，则返回-1。
 *
 * @param {Array} array - 需要搜索的数组。
 * @param {function} callback - 用来测试每个元素的函数。调用时使用参数 (element, index, array)。返回 true 表示找到了符合条件的元素，停止搜索。
 * @param {*} [thisArg] - 执行 callback 时使用的 this 值。
 * @returns {number} 返回数组中第一个满足所提供测试函数的元素的索引，否则返回 -1。
 */
Array.prototype.findIndex = function (array, callback, thisArg = undefined) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (callback.call(thisArg, element, i, array)) return i;
  }
  return -1;
};

/**
 * 用一个固定值填充数组中从起始索引到终止索引内的全部元素。
 *
 * @param {Array} array - 需要填充的数组。
 * @param {*} value - 用来填充数组元素的值。
 * @param {number} [start=0] - 开始填充位置。
 * @param {number} [end=array.length] - 结束填充位置（不包含）。
 * @returns {Array} 修改后的数组。
 */
Array.prototype.fill = function (value, start = 0, end = array.length) {
  let len = this.length;
  // 处理负索引
  let start = begin < 0 ? Math.max(len + begin, 0) : Math.min(begin, len);
  let stop = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);


};
