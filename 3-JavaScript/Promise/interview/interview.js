// Promise 解析与微任务队列行为演示 (Promise Resolution and Microtask Queue Behavior Demonstration)

/**
 * 本文件旨在演示 JavaScript Promise 的两种核心行为：
 * 1. 当一个 Promise (`resolvePromise`) 被另一个 Promise (`resolvedPromise`) 解析时，其行为如何。
 * 2. `Promise.resolve().then().then()` 链式调用中，回调函数的执行顺序，这体现了微任务队列的特性。
 */

// 示例 1: Promise 被另一个 Promise 解析
// 当 Promise A 被 Promise B 解析时 (即 resolve(PromiseB))，Promise A 将"采纳" Promise B 的状态。
// 这意味着 Promise B 成功，Promise A 也成功；Promise B 失败，Promise A 也失败。
let resolvePromise = new Promise((resolve) => {
  // 创建一个立即解决的 Promise
  let resolvedPromise = Promise.resolve();
  // 将 resolvePromise 这个 Promise 通过 resolvedPromise 解析
  resolve(resolvedPromise);
  // 提示: resolve(resolvedPromise) 等同于以下更详细的链式调用，
  // 它确保 resolvedPromise 解决后，才触发 resolvePromise 的解决。
  // Promise.resolve().then(() => resolvedPromise.then(resolve));
});

resolvePromise.then(() => {
  // 这个回调将在 resolvedPromise 解决之后，作为一个微任务执行。
  // console.log("resolvePromise resolved"); // 预期输出: "resolvePromise resolved"
});

// 示例 2: Promise 链式调用与微任务队列
// Promise.resolve() 创建一个已解决的 Promise，其后的 .then() 回调会被加入微任务队列。
// 每一次 .then() 都会返回一个新的 Promise，并且其回调也会被调度到微任务队列的尾部。
let resolvedPromiseThen = Promise.resolve().then((res) => {
  // 这将是第一个在微任务队列中执行的回调
  // console.log("promise1"); // 预期输出: "promise1"
});

resolvedPromiseThen
  .then(() => {
    // 这个回调将在 "promise1" 之后执行
    // console.log("promise2"); // 预期输出: "promise2"
  })
  .then(() => {
    // 这个回调将在 "promise2" 之后执行
    // console.log("promise3"); // 预期输出: "promise3"
  });

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
promise1
resolvePromise resolved
promise2
promise3

注意：
1. `resolvedPromiseThen` 的第一个 `.then()` 回调 (`promise1`) 会先于 `resolvePromise` 的回调执行。
   这是因为 `resolvePromise` 的 `resolve(resolvedPromise)` 实际上是一个异步过程（虽然很快），
   它需要等待 `resolvedPromise` 自身解决，然后其回调才会被调度。
   而 `resolvedPromiseThen` 的创建和其第一个 `.then()` 的调度几乎是同步发生的，因此它会更早进入微任务队列。
2. 微任务队列中的回调是按顺序执行的，因此 `promise1` -> `promise2` -> `promise3` 的顺序是确定的。
*/
