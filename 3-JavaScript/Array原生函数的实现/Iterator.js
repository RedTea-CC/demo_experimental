/**
 * @file 数组迭代器（Iterator）的自定义实现
 * @description 本文件提供了一个自定义的 `Iterator` 类，并为 `Array.prototype` 实现了 `entries()`, `keys()`, 和 `values()` 方法。
 * 这些实现旨在模拟 JavaScript 原生迭代器行为，帮助理解迭代器协议的工作原理。
 * 提供了详细的 JSDoc 注释以增强代码的可读性和可维护性。
 */

/**
 * `Iterator` 类：一个自定义的迭代器实现，用于遍历数组的键、值或键值对。
 * 该类遵循 ES6 迭代器协议，包含 `next()` 方法和 `Symbol.iterator` 方法。
 */
class Iterator {
  /**
   * 创建一个 `Iterator` 实例。
   * @param {Array<any>} array - 要迭代的数组。
   * @param {"entries" | "keys" | "values"} type - 迭代器类型，决定 `next()` 方法返回的内容。
   *   - `"entries"`: 返回 `[index, value]` 键值对。
   *   - `"keys"`: 返回 `[index]` 键。
   *   - `"values"`: 返回 `[value]` 值。
   */
  constructor(array, type) {
    this.data = array;
    this.currentIndex = 0;
    this.type = type;
  }

  /**
   * 返回迭代器中的下一个结果。
   * @returns {Object} 包含 `value` 和 `done` 属性的对象。
   *   - `value`: 迭代到的当前值（根据 `type` 参数可能为键、值或键值对数组）。
   *   - `done`: 布尔值，表示迭代是否完成。
   * @example
   * // 使用 entries 迭代器
   * const arr = ['a', 'b'];
   * const it = new Iterator(arr, 'entries');
   * console.log(it.next()); // { value: [0, 'a'], done: false }
   * console.log(it.next()); // { value: [1, 'b'], done: false }
   * console.log(it.next()); // { value: undefined, done: true }
   */
  next() {
    if (this.currentIndex < this.data.length) {
      const value = this.data[this.currentIndex];
      const index = this.currentIndex;
      this.currentIndex++; // 移动到下一个索引

      let resultValue;
      switch (this.type) {
        case "entries":
          resultValue = [index, value];
          break;
        case "keys":
          resultValue = index; // 修正：原生 keys() 返回的是键本身，而不是数组
          break;
        case "values":
          resultValue = value; // 修正：原生 values() 返回的是值本身，而不是数组
          break;
        default:
          resultValue = value; // 默认返回值为原始值
      }

      return { value: resultValue, done: false };
    } else {
      return { value: undefined, done: true }; // 迭代完成后，value 为 undefined
    }
  }

  /**
   * 可选的 `return()` 方法：当迭代器提前终止时被调用。
   * 例如，在 `for...of` 循环中使用 `break`, `return`, `throw` 或在解构赋值不完全时。
   * @param {any} [value] - 提前终止时传递给 `return` 方法的值。
   * @returns {Object} 包含 `value` 和 `done: true` 的对象。
   * @example
   * const arr = [1, 2, 3];
   * const it = new Iterator(arr, 'values');
   * try {
   *   for (const val of it) {
   *     console.log(val);
   *     if (val === 2) {
   *       break; // 调用 return 方法
   *     }
   *   }
   * } finally {
   *   // 确保迭代器被正确关闭
   *   if (typeof it.return === 'function') {
   *     it.return('finished early');
   *   }
   * }
   * // Expected console output:
   * // 1
   * // 2
   * // Iteration terminated early with value: finished early
   */
  return(value) {
    // console.log("Iteration terminated early with value:", value);
    return { value: value, done: true };
  }

  /**
   * 实现 `Symbol.iterator` 方法，使得该类的实例可被 `for...of` 循环迭代。
   * @returns {Iterator} 返回 `this` 实例本身。
   */
  [Symbol.iterator]() {
    return this;
  }
}

/**
 * 为 `Array.prototype` 添加 `entries()` 方法。
 * 返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的键/值对。
 * @returns {Iterator} 一个新的 `Array Iterator` 对象。
 * @example
 * const a = ['a', 'b', 'c'];
 * const iterator1 = a.entries();
 *
 * console.log(iterator1.next().value); // Expected output: [0, 'a']
 * console.log(iterator1.next().value); // Expected output: [1, 'b']
 *
 * for (const [index, element] of a.entries()) {
 *   console.log(`Index: ${index}, Element: ${element}`);
 * }
 * // Expected output:
 * // Index: 0, Element: a
 * // Index: 1, Element: b
 * // Index: 2, Element: c
 */
Array.prototype.entries = function () {
  return new Iterator(this, "entries");
};

/**
 * 为 `Array.prototype` 添加 `keys()` 方法。
 * 返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的键（即索引值）。
 * @returns {Iterator} 一个新的 `Array Iterator` 对象。
 * @example
 * const arr = ['a', 'b', 'c'];
 * const iterator = arr.keys();
 *
 * console.log(iterator.next().value); // Expected output: 0
 * console.log(iterator.next().value); // Expected output: 1
 *
 * for (const key of arr.keys()) {
 *   console.log(`Key: ${key}`);
 * }
 * // Expected output:
 * // Key: 0
 * // Key: 1
 * // Key: 2
 */
Array.prototype.keys = function () {
  return new Iterator(this, "keys");
};

/**
 * 为 `Array.prototype` 添加 `values()` 方法。
 * 返回一个新的 `Array Iterator` 对象，该对象包含数组中每个索引的值。
 * @returns {Iterator} 一个新的 `Array Iterator` 对象。
 * @example
 * const arr = ['a', 'b', 'c'];
 * const iterator = arr.values();
 *
 * console.log(iterator.next().value); // Expected output: 'a'
 * console.log(iterator.next().value); // Expected output: 'b'
 *
 * for (const value of arr.values()) {
 *   console.log(`Value: ${value}`);
 * }
 * // Expected output:
 * // Value: a
 * // Value: b
 * // Value: c
 */
Array.prototype.values = function () {
  return new Iterator(this, "values");
};

// 以下为原始文件中的测试代码，现已注释掉并整合到各自的JSDoc示例中。
// const array1 = ["a", "b"];
// const iterator1 = array1.entries();
// console.log(iterator1.next().value); // Expected output: Array [0, "a"]
// console.log(iterator1.next().value); // Expected output: Array [1, "b"]
// console.log(iterator1.next().value); // undefined
// const a = ["a", "b", "c"];
// for (const [index, element] of a.entries()) {
//   console.log(index, element);
// }
