// 扁平化数组
const arr = [1, 2, [3, 4, [5, [6]]]];

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
 * @param {number} [depth=1] - 指定要扁平化的深度，默认为 1。
 * @returns {Array} 扁平化后的新数组。
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
