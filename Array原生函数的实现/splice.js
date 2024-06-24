/**
 * 通过删除或替换现有元素或者添加新的元素来修改数组，并以一个数组的形式返回被修改的内容。
 *
 * @param {Array} array - 需要修改的数组。
 * @param {number} start - 开始修改的位置，如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末尾开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则会从索引0开始添加内容。
 * @param {number} [deleteCount=array.length - start] - 整数，表示要移除的数组元素的个数。如果 deleteCount 被省略了，或者它的值大于等于 array.length - start(也就是说，如果它大于或者等于那么剩下的元素个数)，那么从 start 位置开始的所有元素都会被删除。
 * @param {*} [item1, item2, ...] - 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
 * @returns {Array} 由被删除的元素组成的数组。如果没有删除元素，则返回一个空数组。
 */
function splice(array, start, deleteCount = array.length - start, ...items) {
  let len = array.length;

  // 处理负索引
  //   if (begin > len) begin = len;
  //   let start = begin < 0 ? begin + len : begin;
  //   if (start < 0) start = 0;
  start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);

  // 处理删除计数
  deleteCount = Math.min(Math.max(deleteCount, 0), len - start);

  // 保存要删除的元素
  const deletedItems = array.slice(start, start + deleteCount);

  // 尾部元素
  const endPart = array.slice(start + deleteCount);

  // 修改原数组
  array.length = start;
  array.push(...items, ...endPart);

  return deletedItems;
}

// toSplice()返回一个新数组
function toSplice(array, start, deleteCount = array.length - start, ...items) {
  let len = array.length;

  // 处理负索引
  start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);

  // 处理删除计数
  deleteCount = Math.min(Math.max(deleteCount, 0), len - start);

  // 新数组
  const newArray = array.slice(0, start);

  // 尾部元素
  const endPart = array.slice(start + deleteCount);

  newArray.push(...items, ...endPart);

  return newArray;
}

const months = ["Jan", "March", "April", "June"];
splice(months, 1, 0, "Feb"); // Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

splice(months, 4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
