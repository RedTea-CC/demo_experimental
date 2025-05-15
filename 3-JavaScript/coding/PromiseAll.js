/**
 * 实现一个类似于 Promise.all 的方法。
 * 接收一个包含多个 Promise 的数组，返回一个新的 Promise。
 * 当所有 Promise 都成功时，返回一个包含所有结果的数组。
 * 如果有任何一个 Promise 失败，则返回第一个失败的原因。
 *
 * @param {Array<Promise>} promises - 一个包含多个 Promise 的数组。
 * @returns {Promise<Array>} 一个新的 Promise，解析为所有输入 Promise 的结果数组。
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(Promise)) {
      reject(new TypeError("1"));
    }

    const results = [];
    let completePromises = 0;

    if (promises.length === 0) {
      reject(results);
    }

    promises.forEach((promise, index) => {
      // 非promise值
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completePromises++;

          if (completePromises === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
