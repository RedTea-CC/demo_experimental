// Promise 状态不可变性演示 (Promise Immutability Demonstration)

/**
 * 本文件演示了 JavaScript Promise 的一个重要特性：状态一旦确定（从 `pending` 变为 `fulfilled` 或 `rejected`），
 * 就不能再次改变。这意味着在 Promise 的 `executor` 函数中，
 * 如果 `resolve` 和 `reject` 被同时或连续调用，只有第一次调用会生效。
 */

// 创建一个 Promise 实例。
const promise = new Promise((resolve, reject) => {
  // 第一次调用 resolve() 会将 Promise 的状态设置为 fulfilled。
  resolve();
  // 尽管 reject() 随后被调用，但由于 Promise 的状态已经改变为 fulfilled，
  // 这次 reject() 调用将被忽略，不会产生任何效果。
  reject();
  // 这条 console.log 语句会立即执行，因为 executor 函数是同步的。
  console.log("Promise executor 同步输出: resolve");
});

// 注册 Promise 的成功和失败回调。
promise
  .then(() => {
    // 由于 Promise 最终是 fulfilled 状态，这个回调将在微任务队列中执行。
    // console.log("Promise 成功回调输出: promise1");
  })
  .catch(() => {
    // 由于 Promise 最终是 fulfilled 状态，这个回调将不会执行。
    // console.log("Promise 失败回调输出: catch");
  });

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
Promise executor 同步输出: resolve
Promise 成功回调输出: promise1

注意：
1. `executor` 函数是同步执行的，所以其中的 `console.log` 会首先输出。
2. Promise 的状态一旦从 `pending` 变为 `fulfilled` 或 `rejected`，就不能再改变。
   因此，`resolve()` 优先于 `reject()` 生效。
3. `then` 和 `catch` 中的回调函数都是异步的，会在当前同步任务执行完毕后，作为微任务执行。
*/
