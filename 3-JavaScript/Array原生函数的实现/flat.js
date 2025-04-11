// **`flat()`** 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。
// 参数depth，指定要提取嵌套数组的结构深度，默认值为 1。

[1, [2, [3]]].flat(2); // 输出 [1, 2, 3]
[1, 2].flatMap((x) => [x * 2]); // 输出 [2, 4]

function myFlat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? myFlat(val, depth - 1) : val), [])
    : arr.slice();
}

const arr = [1, 2, [3, 4, [5, 6]]];
console.log(myFlat(arr)); // 输出: [1, 2, 3, 4, [5, 6]]
console.log(myFlat(arr, 2)); // 输出: [1, 2, 3, 4, 5, 6]
console.log(myFlat(arr, Infinity)); // 输出: [1, 2, 3, 4, 5, 6]

Array.prototype.myFlat = function (depth = 1) {
  return depth > 0
    ? this.reduce((acc, value) => {
        return acc.concat(Array.isArray(value) ? value.myFlat(depth - 1) : value);
      }, [])
    : [...this];
};
