// iterator
class Iterator {
  constructor(array, type) {
    this.data = array;
    this.currentIndex = 0;
    this.type = type;
  }
  next() {
    if (this.currentIndex < this.data.length) {
      return {
        value:
          this.type == "entries"
            ? [this.currentIndex, this.data[this.currentIndex++]]
            : this.type == "keys"
                ? [this.currentIndex++]
                : [this.data[this.currentIndex++]],
        done: false,
      };
    } else {
      return { done: true };
    }
  }
  // 可选的return方法，提前结束迭代
  return(value) {
    console.log("Iteration terminated early with value:", value);
    return { value, done: true };
  }
  [Symbol.iterator]() {
    return this;
  }
}

/**
 * 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
 *
 * @returns {Iterator} 一个新的 Array iterator 对象。
 */
Array.prototype.entries = function () {
  return new Iterator(this, "entries");
};

/**
 * 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键。
 *
 * @returns {Iterator} 一个新的 Array iterator 对象。
 */
Array.prototype.keys = function () {
  return new Iterator(this, "keys");
};

/**
 * 返回一个新的Array Iterator对象，该对象包含数组中每个索引的值。
 *
 * @returns {Iterator} 一个新的 Array iterator 对象。
 */
Array.prototype.values = function () {
  return new Iterator(this, "values");
};

const array1 = ["a", "b"];
const iterator1 = array1.entries();

console.log(iterator1.next().value); // Expected output: Array [0, "a"]
console.log(iterator1.next().value); // Expected output: Array [1, "b"]
console.log(iterator1.next().value); // undefined

const a = ["a", "b", "c"];

for (const [index, element] of a.entries()) {
  console.log(index, element);
}
