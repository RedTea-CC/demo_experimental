// Promise 和 setTimeout 执行顺序与事件循环演示 (Promise and setTimeout Execution Order & Event Loop Demonstration)

/**
 * 本文件旨在深入探讨 JavaScript 事件循环中宏任务 (Macro-tasks) 和微任务 (Micro-tasks) 的执行顺序。
 * 它通过 Promise (微任务) 和 setTimeout (宏任务) 的嵌套和链式调用，演示了它们之间的优先级和调度机制。
 * 特别关注了 setTimeout 零延迟或极小延迟时的行为。
 */

let a = 2;

// 示例 1: Promise 内部的异步操作与外部的 setTimeout
const p = new Promise((resolve, reject) => {
  // Promise 构造函数是同步执行的，所以这行会立即输出。
  console.log("promise start");

  // setTimeout 是一个宏任务，即使延迟为 0.1ms (非常小)，它也会被调度到下一个宏任务队列。
  // Promise 的 resolve 操作将在该宏任务执行时才被触发。
  setTimeout(() => {
    console.log("promise resolved");
    a++; // 此时 a 变为 3
    resolve("ok"); // Promise 状态变为 fulfilled，其 .then() 回调会被加入微任务队列。
    console.log("resolved", a); // 此时 a 仍为 3，因为 then 回调尚未执行。
  }, 0.1);
});

// .then() 回调是一个微任务，它会在当前宏任务执行完毕后，立即执行。
// 即使有延迟为 0 的 setTimeout，Promise 的 then 也会先于它执行。
p.then((res) => {
  console.log("promise then");
  a++; // 此时 a 变为 4
  console.log("then", a);
});

// 这是一个宏任务，延迟为 0ms。它会被调度到宏任务队列中，在所有微任务执行完毕后才执行。
setTimeout(() => {
  console.log("setTimeout");
  console.log(a); // 此时 a 已经经过 Promise then 的修改，所以是 4。
}, 0);

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
promise start
promise resolved
resolved 3
promise then
then 4
setTimeout
4

解释:
1. `promise start` (同步执行)
2. 队列中：
   - 宏任务队列: [setTimeout(0.1ms, resolve Promise), setTimeout(0ms, console.log(a))]
   - 微任务队列: []
3. 执行 `setTimeout(0.1ms, resolve Promise)` 宏任务。
   - 输出 `promise resolved`
   - `a` 变为 `3`
   - `resolve("ok")` 将 `p.then()` 的回调添加到微任务队列。
   - 输出 `resolved 3`
   - 此时队列中：
     - 宏任务队列: [setTimeout(0ms, console.log(a))]
     - 微任务队列: [p.then() 回调]
4. 检查微任务队列，发现 `p.then()` 回调，立即执行。
   - 输出 `promise then`
   - `a` 变为 `4`
   - 输出 `then 4`
   - 此时队列中：
     - 宏任务队列: [setTimeout(0ms, console.log(a))]
     - 微任务队列: []
5. 微任务队列清空，检查宏任务队列，执行 `setTimeout(0ms, console.log(a))` 宏任务。
   - 输出 `setTimeout`
   - 输出 `a` 的值 `4`

关于 setTimeout 的 "0.1ms" 和 "0ms" 延迟：
在现代浏览器中，`setTimeout` 的实际最小延迟通常为 1-4ms，即使指定为 0ms。这被称为"最小延迟"或"节流"。
因此，即使指定为 0.1ms 或 0ms，它们实际上都会被推迟到下一个可用的宏任务周期，并且它们的相对顺序可能会受到其他宏任务或浏览器内部调度的影响，但微任务总是优先于下一个宏任务。

当两个 setTimeout 的时间相差很大时 (例如一个 0ms，一个 100ms)，执行顺序可能会变化，因为 0ms 的宏任务可能在 0.1ms 的宏任务之前被调度。
例如，如果将 0.1ms 改为 100ms，并且 0ms 保持不变，则输出将是：
promise start
setTimeout
2
promise resolved
resolved 3
promise then
then 4
*/

//  为什么setTimeout的0.1比0先执行？

// setTimeout曲型延迟范围:在现代浏览器中通常为 1-4ms:根据嵌套层级和执行代码消耗时间有关
// 根据 HTML5 规范，定时器的最小延迟为4ms(当嵌套层级超过5层时)

/*
当两个setTimeout的时间相差很大时，输出如下
promise start
setTimeout
2
promise resolved
resolved 3
promise then
then 4 */
