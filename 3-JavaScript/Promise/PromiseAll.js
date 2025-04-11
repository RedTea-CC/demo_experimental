// Example usage of promiseAll function
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 resolved");
  }, 3000);
});

promiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

// Promise.all implementation

/**
 * 实现Promise.all()函数的功能
 * @param {Promise[]} promises - Promise对象数组
 * @returns {Promise} 返回一个新的Promise对象，所有promise成功则返回结果数组，任一失败则返回第一个失败原因
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 1. 参数校验优化：同时检查是否为数组且不为null
    if (!promises || !Array.isArray(promises)) {
      return reject(new TypeError("promises must be an array"));
    }

    const results = new Array(promises.length); // 预分配数组空间，性能优化
    let completedPromises = 0;

    // 2. 空数组快速返回
    if (promises.length === 0) {
      return resolve(results);
    }

    // 3. 优化遍历方式，使用forEach替代for循环，代码更简洁
    promises.forEach((promise, index) => {
      // 4. 使用Promise.resolve包装，支持处理非Promise值
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedPromises++;

          // 所有promise完成时才resolve
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // 5. 简化错误处理写法
    });
  });
}
