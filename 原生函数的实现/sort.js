// sort() 方法用于对数组的元素进行排序。

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