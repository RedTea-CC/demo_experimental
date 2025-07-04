/**
 * 实现一个类似于 Promise.all 的方法。
 * 接收一个包含多个 Promise 的可迭代对象，返回一个新的 Promise。
 * 当所有 Promise 都成功时，返回一个包含所有结果的数组，其顺序与输入的可迭代对象的 Promise 顺序一致。
 * 如果有任何一个 Promise 失败，则返回第一个失败的原因。
 *
 * @param {Iterable<Promise<any>>} promises - 一个可迭代对象（如数组），包含多个 Promise 或非 Promise 值。
 * @returns {Promise<Array<any>>} 一个新的 Promise，解析为所有输入 Promise 的结果数组。
 *   如果输入的可迭代对象为空，则立即解析为一个空数组。
 *   如果输入的任何 Promise 拒绝，则返回一个拒绝的 Promise。
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 确保输入是可迭代的
    if (!Array.isArray(promises) && typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('Promise.all accepts an iterable argument'));
    }

    const results = [];
    let completedCount = 0;
    const totalPromises = promises.length;

    // 如果输入是空数组，立即解析为一个空数组
    if (totalPromises === 0) {
      return resolve([]);
    }

    promises.forEach((promise, index) => {
      // 使用 Promise.resolve 确保处理非 Promise 值
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedCount++;

          // 当所有 Promise 都完成时，解析主 Promise
          if (completedCount === totalPromises) {
            resolve(results);
          }
        })
        .catch(reject); // 任何一个 Promise 失败，主 Promise 立即失败
    });
  });
}
