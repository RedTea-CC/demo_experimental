/**
 * Reduces an array to a single value by calling the callback function for each element in the array.
 *
 * @param {Function} callback
 * @param {*} initialValue
 * @return {*}
 */
Array.prototype.reduce = function (callback, initialValue) {
  const len = this.length;

  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  if (len === 0 && !initialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let k = 0;
  let accumulator = initialValue;

  if (!accumulator) {
    accumulator = this[k++];
  }

  while (k < len) {
    if (k in this) {
      accumulator = callback.call(this, accumulator, this[k], k, this);
    }
    k++;
  }

  return accumulator;
};

let arry = [1, 2, 3];
// arry.reduce((accumulator, currentValue, currentIndex, array) => {
//   console.log(accumulator, currentValue, currentIndex, array);
//   return accumulator + currentValue;
// }, 0);

//
Reduce = (array, callback, initialValue) => {
  let curIndex = 0;
  let len = array.length;
  let accumulator = initialValue ? initialValue : array[curIndex++];

  while (curIndex < len) {
    if (curIndex in array) {
        accumulator = callback.call(array, accumulator, array[curIndex], curIndex, array);
    }
    curIndex++;
  }
  return accumulator;
}

let result = Reduce([1, 2, 3], (accumulator, currentValue, currentIndex, array) => {
  console.log(accumulator, currentValue, currentIndex, array);
  return accumulator + currentValue;
});
console.log("result:",result);