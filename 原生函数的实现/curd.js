// 数组方法：增删改查

/**
 * push() 方法将指定的元素添加到数组的末尾，并返回新的数组长度。
 * @param  {...any} args
 * @returns {number}
 */
Array.prototype.myPush = function (...args) {
  let len = this.length;
  for (let i = 0; i < args.length; i++) {
    this[len + i] = args[i];
  }
  return this.length;
};

// let arry = [1, 2, 3];
// arry.myPush(4, 5, 6);
// console.log(arry);

// pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
Array.prototype.myPop = function () {
  let len = this.length;
  if (len === 0) return undefined;
  let last = this[len - 1];
  this.length = len - 1;
  return last;
};

// const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];
// console.log(plants.myPop(), plants);

// unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。
Array.prototype.myUnshift = function (...args) {
  let len = this.length;
  let argCount = args.length;
  if (argCount > 0) {
    let k = len;
    while (k > 0) {
      let from = k - 1;
      let to = k + argCount - 1;
      let fromPresent = this.hasOwnProperty(from);
      if (fromPresent) {
        this[to] = this[from];
      } else {
        delete this[to];
      }
      k = k - 1;
    }
    for (let i = 0; i < argCount; i++) {
      this[i] = args[i];
    }
  }
  return this.length;
};

// const array1 = [1, 2, 3];
// console.log(array1.myUnshift(4, 5),array1);

// shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
Array.prototype.myShift = function () {
  let len = this.length;
  if (len === 0) return undefined;
  let first = this[0];
  for (let i = 0; i < len - 1; i++) {
    this[i] = this[i + 1];
  }
  this.length = len - 1;
  return first;
};

// const array1 = [1, 2, 3];
// console.log(array1.myShift(), array1);
