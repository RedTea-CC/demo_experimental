/**
 * 返回一个新的数组对象，这个对象是一个由 begin 和 end（不包括 end）决定的原数组的浅拷贝。
 * 原始数组不会被改变。
 *
 * @param {Array} array - 需要切片的数组。
 * @param {number} [begin=0] - 起始索引，从该索引开始提取原数组中的元素（包含该元素）。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice，从该索引开始提取原数组中的元素（包含该元素）。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素。
 * @param {number} [end=array.length] - 结束索引，从该索引前的位置结束提取原数组元素（不包含该元素）。如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。
 * @returns {Array} 一个新的数组，包含从 begin 到 end （不包括 end）的 array 对象的元素。
 */
function mySlice(array, begin = 0, end = array.length) {
  let len = array.length;
  if (len === 0) return [];

  // 起始索引处理
  if (begin >= len) return [];
  let start = begin < 0 ? begin + len : begin;
  if (start < 0) return [];

  // 结束索引处理
  if (end > len) end = len;
  let finish = end < 0 ? end + len : end;
  if (finish < 0) return [];

  let newArray = [];
  for (let i = start; i < finish; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function slice(array, begin = 0, end = array.length) {
  const len = array.length;
  const result = [];

  // 处理负索引
  let start = begin < 0 ? Math.max(len + begin, 0) : Math.min(begin, len);
  let stop = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);

  // 遍历并添加元素到结果数组
  for (let i = start; i < stop; i++) {
    result.push(array[i]);
  }

  return result;
}

const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"]

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
