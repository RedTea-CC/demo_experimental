/**
 * 对数组的元素进行排序，并返回数组。排序不一定是稳定的。如果没有提供比较函数，默认按转换为字符串后按 Unicode 顺序排序。
 *
 * @param {Array} array - 需要排序的数组。
 * @param {function} [compareFunction] - 指定排序顺序的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
 *      1. firstEl - 第一个用于比较的元素。
 *      2. secondEl - 第二个用于比较的元素。
 * @returns {Array} 排序后的数组。请注意，数组已原地排序，并且不进行复制。
 */
function mySort(arr, callback = (a, b) => a - b) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 比较函数返回值大于 0 时，交换位置
      if (callback(arr[minIndex], arr[j]) > 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      // 通过解构赋值交换两个元素的位置
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

const array1 = [1, 30, 4, 21, 100000];

console.log(mySort(array1));

Array.prototype.mySort = function (compareFn) {
  const arr = this;
  const len = arr.length;

  // 如果没有提供比较函数，默认按转换为字符串后按 Unicode 顺序排序
  if (typeof compareFn !== "function") {
    compareFn = function (a, b) {
      let A = String(a);
      let B = String(b);
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    };
  }

  // 对小区间使用插入排序（提高小数组排序效率）
  function insertionSort(left, right) {
    for (let i = left + 1; i <= right; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= left && compareFn(arr[j], key) > 0) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }

  // 快速排序（原地排序，采用三数取中作为 pivot 选择）
  function quickSort(left, right) {
    if (left >= right) return;
    // 小区间用插入排序
    if (right - left < 10) {
      insertionSort(left, right);
      return;
    }

    // 三数取中，选择 pivot
    let mid = left + ((right - left) >> 1);
    if (compareFn(arr[left], arr[mid]) > 0) {
      [arr[left], arr[mid]] = [arr[mid], arr[left]];
    }
    if (compareFn(arr[left], arr[right]) > 0) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    if (compareFn(arr[mid], arr[right]) > 0) {
      [arr[mid], arr[right]] = [arr[right], arr[mid]];
    }
    // 将 pivot 移到 right-1 位置
    [arr[mid], arr[right - 1]] = [arr[right - 1], arr[mid]];
    let pivot = arr[right - 1];

    // 双指针扫描
    let i = left,
      j = right - 1;
    while (true) {
      while (compareFn(arr[++i], pivot) < 0) {}
      while (compareFn(arr[--j], pivot) > 0) {}
      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // 恢复 pivot 的正确位置
    [arr[i], arr[right - 1]] = [arr[right - 1], arr[i]];

    quickSort(left, i - 1);
    quickSort(i + 1, right);
  }

  quickSort(0, len - 1);
  return arr;
};

// 测试示例
let nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(nums.mySort((a, b) => a - b)); // [1, 1, 2, 3, 4, 5, 6, 9]

let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.mySort()); // ["Apple", "Banana", "Mango", "Orange"]
