/**
 * 对数组的每个元素执行一次提供的函数。
 *
 * @param {Array} array - 需要遍历的数组。
 * @param {function} callback - 对每个元素执行的函数，接收三个参数：
 *      1. currentValue - 当前正在处理的元素。
 *      2. index (可选) - 当前正在处理的元素的索引。
 *      3. array (可选) - forEach 方法被调用的数组。
 */
function nativeForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }

  return array;
}

Array.prototype.forEach = function (callback) {
  const len = this.length;

  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  let k = 0;

  while (k < len) {
    // 把k转为字符串，js不需要这么做
    // let Pk = toString.call(k);

    // k是否存在于this中
    if (k in this) {
      callback.call(this, this[k], k, this);
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
 * 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
 *
 * @param {Array} array - 需要映射的数组。
 * @param {function} callback - 创建新数组元素的函数，接收三个参数：
 *      1. currentValue - 当前正在处理的元素。
 *      2. index (可选) - 当前正在处理的元素的索引。
 *      3. array (可选) - map 方法被调用的数组。
 * @returns {Array} 一个由原数组每个元素执行回调函数的结果组成的新数组。
 */
function map(array, callback) {
  let len = array.length;
  if (len === 0) return;
  let newAry = [];
  for (let i = 0; i < len; i++) {
    newAry.push(callback(array[i], i, array));
  }
  return newAry;
}

const array1 = [1, 4, 9, 16];
const map1 = map(array1, (x) => x * 2);
console.log(map1); // Expected output: Array [2, 8, 18, 32]
