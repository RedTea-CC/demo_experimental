/**
 * Executes a provided function once for each element in the array, in order.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callback - The function to execute for each element.
 * @return {Array} - The original array.
 */
nativeForEach = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }

  return array;
};

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

arry.forEach((value, index, array) => {
  console.log(value, index, array);
});
