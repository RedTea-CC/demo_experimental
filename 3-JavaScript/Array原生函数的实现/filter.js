// some()方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。
function mySome(arry, callback, thisArg = undefined) {
  for (let i = 0; i < arry.length; i++) {
    if (callback(arry[i], i, arry)) {
      return true;
    }
  }
  return false;
}

/**
 * every()方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。
 * 如果数组中的每个元素都通过了测试，则返回 true；否则返回 false。它不会修改数组。
 * 如果是空数组，则返回 true。
 */
function myEvery(arry, callback, thisArg = undefined) {
  for (let i = 0; i < arry.length; i++) {
    if (!callback(arry[i], i, arry)) {
      return false;
    }
  }
  return true;
}

/**
 * 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
 *
 * @param {Array} array - 需要搜索的数组。
 * @param {*} searchElement - 需要查找的元素。
 * @param {number} [fromIndex=0] - 开始搜索的位置。
 * @returns {number} 返回找到的元素的索引，如果没有找到则返回 -1。
 */
function indexOf(array, searchElement, fromIndex = 0) {
  let len = array.length;
  // 如果数组为空，直接返回 -1
  if (len === 0) return -1;

  // 如果 fromIndex >= array.length，直接返回 -1
  if (fromIndex >= len) return -1;

  // 如果 fromIndex < 0，计算实际的起始位置
  let start = fromIndex < 0 ? fromIndex + len : fromIndex;

  // 如果 fromIndex < -array.length，设置为 0
  if (start < 0) start = 0;
  for (let i = start; i < len; i++) {
    if (searchElement === array[i]) {
      return i;
    }
  }

  // 没有找到元素，返回 -1
  return -1;
}

/**
 * 返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。该方法从 fromIndex 开始向前搜索数组。
 *
 * @param {Array} array - 需要搜索的数组。
 * @param {*} searchElement - 需要查找的元素。
 * @param {number} [fromIndex=array.length-1] - 开始搜索的位置。
 * @returns {number} 返回找到的元素的最后一个索引，如果没有找到则返回 -1。
 */
function lastIndexOf(array, searchElement, fromIndex = array.length - 1) {
  let len = array.length;

  // 如果数组为空，直接返回 -1
  if (len === 0) return -1;

  // 如果 fromIndex >= array.length，设置为 len - 1
  if (fromIndex >= len) fromIndex = len - 1;

  // 如果 fromIndex < 0，计算实际的起始位置
  let start = fromIndex < 0 ? fromIndex + len : fromIndex;

  // 如果 fromIndex < -array.length，设置为 -1
  if (start < 0) start = -1;

  // 从 start 位置开始向前搜索
  for (let i = start; i >= 0; i--) {
    if (array[i] === element) {
      return i;
    }
  }

  // 没有找到元素，返回 -1
  return -1;
}

/**
 * 创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
 *
 * @param {Array} array - 需要过滤的数组。
 * @param {function} callback - 测试每个元素的函数。返回 true 以保留元素，false 否则。
 * @returns {Array} 返回一个新的、由通过测试的元素组成的数组。
 */
function filter(array, callback, thisArg = undefined) {
  let newArry = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      newArry.push(array[i]);
    }
  }
  return newArry;
}

const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = filter(words, (word) => word.length > 6);
console.log(result);
