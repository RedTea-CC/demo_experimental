// Promise 链式调用与微任务队列并发执行演示 (Promise Chaining & Concurrent Microtask Execution Demonstration)

/**
 * 本文件旨在深入理解 JavaScript Promise 在链式调用和并发执行时的行为。
 * 它展示了 `return Promise.resolve(value)` 如何影响 Promise 链的控制流，
 * 以及多个独立的 Promise 链如何在同一个事件循环的微任务队列中竞争执行。
 */

// 示例 1: 返回一个 Promise 的链式调用
// 这个 Promise 链的第一个 then 回调会立即执行，并返回一个新的 Promise.resolve(4)。
// 这个返回的 Promise 会被"解包"，其解决值（4）会传递给下一个 then 回调。
Promise.resolve()
  .then(() => {
    // 这个回调会首先执行，因为它在第一个 Promise 链中
    console.log(0);
    // 返回 Promise.resolve(4) 会导致当前 Promise 解决为一个 Promise。
    // 根据 Promises/A+ 规范，这个内部 Promise 会被"解包"，
    // 它的解决值 (4) 会被传递给下一个 .then()，并且其解决过程是异步的 (微任务)。
    return Promise.resolve(4);
  })
  .then((res) => {
    // 这个回调会稍后执行，因为它依赖于 Promise.resolve(4) 的解决。
    // console.log(res); // 预期输出: 4
  });

// 示例 2: 独立的 Promise 链
// 这个 Promise 链是独立于第一个示例的，它们的 `.then()` 回调会按它们被添加到微任务队列的顺序执行。
// 由于这些 `.then()` 是直接从 `Promise.resolve()` 调用的，它们会在第一个链的 `return Promise.resolve(4)`
// 引起的微任务之前进入队列。
Promise.resolve()
  .then(() => {
    // 这个回调会紧随第一个链的 `console.log(0)` 之后执行
    console.log(1);
  })
  .then(() => {
    // console.log(2); // 预期输出: 2
  })
  .then(() => {
    // console.log(3); // 预期输出: 3
  })
  .then(() => {
    // console.log(5); // 预期输出: 5
  });

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
0
1
2
3
4
5

解释:
1.  **同步代码执行**: 没有任何同步的 `console.log`。
2.  **第一个事件循环的微任务队列阶段**:
    *   `Promise.resolve()` 的第一个 `.then()` 回调 (打印 `0`) 被添加到微任务队列。
    *   `Promise.resolve()` 的第二个 `.then()` 回调 (打印 `1`) 被添加到微任务队列。
3.  **微任务队列执行**:
    *   打印 `0` (来自第一个链)。在 `0` 回调中，返回 `Promise.resolve(4)`。
        这导致一个新的微任务被调度，用于解析 `Promise.resolve(4)` 的值 `4`。
    *   打印 `1` (来自第二个链)。
    *   打印 `2` (来自第二个链)。
    *   打印 `3` (来自第二个链)。
    *   打印 `4` (来自第一个链，这是 `Promise.resolve(4)` 解包后的结果)。
    *   打印 `5` (来自第二个链)。

关键点：
*   `Promise.resolve().then()` 会将回调推送到微任务队列。
*   在一个 `.then()` 回调中 `return Promise.resolve(value)` 会导致该 `value` 在下一个微任务周期中被"解包"并传递给后续的 `.then()`。
*   多个独立的 Promise 链的回调会按照它们被创建并推入微任务队列的顺序执行。
*/

  // [0,1,Promise.resolve(4),2,解析Promise.resolve(4),3,4,5]