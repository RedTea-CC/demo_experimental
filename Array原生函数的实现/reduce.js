/**
 * reduce通过为数组中的每个元素调用回调函数将数组简化为单个值。
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
const Reduce = (array, callback, initialValue) => {
  let curIndex = 0;
  let len = array.length;
  let accumulator = initialValue ? initialValue : array[curIndex++];

  while (curIndex < len) {
    if (curIndex in array) {
      accumulator = callback.call(
        array,
        accumulator,
        array[curIndex],
        curIndex,
        array
      );
    }
    curIndex++;
  }
  return accumulator;
};

let result = Reduce(
  [1, 2, 3],
  (accumulator, currentValue, currentIndex, array) => {
    console.log(accumulator, currentValue, currentIndex, array);
    return accumulator + currentValue;
  }
);
console.log("result:", result);

// ---------
/**
 * reduceRight() works just like reduce(), except that it processes the array from right-to-left.
 */
Array.prototype.reduceRight = function (callback, initialValue) {
  const len = this.length;

  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  if (len === 0 && !initialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let k = len - 1;
  let accumulator = initialValue;

  if (!accumulator) {
    accumulator = this[k--];
  }

  while (k >= 0) {
    if (k in this) {
      accumulator = callback.call(this, accumulator, this[k], k, this);
    }
    k--;
  }

  return accumulator;
};
