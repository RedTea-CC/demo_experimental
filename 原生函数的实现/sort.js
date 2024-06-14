/**
 * 对数组的元素进行排序，并返回数组。排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。
 *
 * @param {Array} array - 需要排序的数组。
 * @param {function} [compareFunction] - 指定排序顺序的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
 *      1. firstEl - 第一个用于比较的元素。
 *      2. secondEl - 第二个用于比较的元素。
 * @returns {Array} 排序后的数组。请注意，数组已原地排序，并且不进行复制。
 */
function mySort(arry, callback = (a, b) => a - b) {
  let len = arry.length;
  let left = 0;
  let right = 1;
  while (left < len) {
    if (right < len) {
      if (callback(arry[left], arry[right]) > 0) {
        [arry[left], arry[right]] = [arry[right], arry[left]];
      }
      right++;
    } else {
      left++;
      right = left + 1;
    }
  }
  return arry;
}

const array1 = [1, 30, 4, 21, 100000];

console.log(mySort(array1));
