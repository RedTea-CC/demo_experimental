// reverse 函数的实现

/**
 * reverse() 方法就地反转数组中的元素。
 * @returns {Array} 返回同一数组的引用
 */
Array.prototype.myReverse = function () {
  let left = 0;
  let right = this.length - 1;

  while (left < right) {
    [this[left], this[right]] = [this[right], this[left]];
    left++;
    right--;
  }
  return this;
};

// 测试
let array = [1, 2, 3, 4, 5];
console.log(array.myReverse()); // [5, 4, 3, 2, 1]

// ---------------------------------------------------

// toReverse 函数的实现
/**
 * 将数组中的元素顺序反转
 * @param {Array} arr - 待反转的数组
 * @returns {Array} 返回一个新的数组
 */
function toReverse(arr) {
  let left = 0;
  let right = arr.length - 1;
  //   let res = arr.slice();
  let res = [...arr];

  while (left < right) {
    [res[left], res[right]] = [res[right], res[left]];
    left++;
    right--;
  }
  return res;
}
