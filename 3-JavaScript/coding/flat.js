// 扁平化数组 (Array Flattening)

/**
 * 使用递归方式扁平化数组，不限制深度。
 * 该方法会创建一个新的扁平化数组，不会修改原数组。
 *
 * @param {Array} array - 需要扁平化的数组。
 * @returns {Array} 扁平化后的新数组。
 * @example
 * const arr1 = [1, 2, [3, 4, [5, [6]]]];
 * console.log(cusFlat(arr1)); // [1, 2, 3, 4, 5, 6]
 */
function cusFlat(array) {
  let newArray = [];
  function flat(params) {
    params.forEach((element) => {
      if (Array.isArray(element)) {
        flat(element);
      } else {
        newArray.push(element);
      }
    });
  }
  flat(array);
  return newArray;
}

/**
 * 实现一个类似于 Array.prototype.flat 的方法。
 * 接收一个数组和一个指定的深度，返回一个新的扁平化数组。
 *
 * @param {Array} array - 要扁平化的数组。
 * @param {number} [depth=1] - 指定要扁平化的深度，默认为 1。如果为 Infinity，则完全扁平化。
 * @returns {Array} 扁平化后的新数组。
 * @example
 * const arr2 = [1, 2, [3, 4, [5, [6]]]];
 * console.log(cusFlat2(arr2, 1)); // [1, 2, 3, 4, [5, [6]]]
 * console.log(cusFlat2(arr2, Infinity)); // [1, 2, 3, 4, 5, 6]
 */
function cusFlat2(array, depth = 1) {
  return depth > 0
    ? array.reduce((acc, value) => {
        return acc.concat(Array.isArray(value) ? cusFlat2(value, depth - 1) : value);
      }, [])
    : [...array];
}

const flatArray = cusFlat2(arr);
console.log(arr);
console.log(flatArray);
