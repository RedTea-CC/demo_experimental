/**
 * concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 */
function concat(...args) {
  let result = [];
  for (let ags of args) {
    if (Array.isArray(ags)) {
      for (let i = 0; i < ags.length; i++) {
        result.push(ags[i]);
      }
    } else {
      result.push(ags);
    }
  }
  return result;
}

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [[7, 8, 9]];
console.log(concat(arr1, arr2, arr3)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
