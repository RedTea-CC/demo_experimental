// JavaScript 事件循环进阶：宏任务与微任务的复杂交互演示 (Advanced JavaScript Event Loop: Macro-task & Micro-task Interaction Demo)

/**
 * 本文件通过嵌套的 `setTimeout` (宏任务) 和 `Promise.resolve().then()` (微任务) 的组合，
 * 深入演示了 JavaScript 事件循环机制。
 * 理解不同任务源（宏任务队列和微任务队列）的调度优先级，对于编写高性能和可预测的异步代码至关重要。
 */

// 宏任务 1: 第一个 setTimeout，延迟 0ms。将在当前所有同步代码和微任务执行完毕后，作为第一个宏任务执行。
setTimeout(() => {
  console.log(1); // 输出 1

  // 宏任务 4 (嵌套): 在宏任务 1 内部定义的 setTimeout，延迟 0ms。
  // 它将排队到下一个宏任务队列，在宏任务 1 内部的所有微任务执行完毕后才可能执行。
  setTimeout(() => {
    // 微任务 2 (嵌套): 在宏任务 4 内部定义的 Promise.then()。
    // 它将排队到宏任务 4 执行时的微任务队列中。
    Promise.resolve().then(() => {
      console.log(9); // 输出 9
    });
  }, 0);

  // 微任务 3: 在宏任务 1 内部定义的 Promise.then()。
  // 它将立即排队到当前宏任务（宏任务 1）执行完毕后的微任务队列中。
  Promise.resolve().then(() => {
    console.log(7); // 输出 7
  });
}, 0);

// 同步任务 1: 立即执行
console.log(2); // 输出 2

// 微任务 1: 立即排队到当前事件循环的微任务队列。
Promise.resolve().then(() => {
  console.log(3); // 输出 3
});

// 宏任务 2: 第二个 setTimeout，延迟 0ms。排队到宏任务队列中，在宏任务 1 之后。
setTimeout(() => {
  console.log(8); // 输出 8

  // 宏任务 5 (嵌套): 在宏任务 2 内部定义的 setTimeout，延迟 0ms。
  // 它将排队到下一个宏任务队列。
  setTimeout(() => {
    console.log(5); // 输出 5
  }, 0);
}, 0);

// 宏任务 3: 第三个 setTimeout，延迟 0ms。排队到宏任务队列中，在宏任务 2 之后。
setTimeout(() => {
  // 微任务 4: 在宏任务 3 内部定义的 Promise.then()。
  // 它将排队到宏任务 3 执行时的微任务队列中。
  Promise.resolve().then(() => {
    console.log(4); // 输出 4
  });
}, 0);

// 同步任务 2: 立即执行
console.log(6); // 输出 6

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
2
6
3
1
7
8
4
9
5

详细执行步骤：

1.  **初始同步代码执行：**
    *   `console.log(2)` -> **输出: 2**
    *   `console.log(6)` -> **输出: 6**
    *   所有 `setTimeout` (宏任务 1, 2, 3) 被添加到宏任务队列。
    *   `Promise.resolve().then(() => { console.log(3); })` (微任务 1) 被添加到微任务队列。

2.  **第一个微任务队列清空：**
    *   执行微任务 1: `console.log(3)` -> **输出: 3**

3.  **第一个宏任务（宏任务 1）执行：**
    *   执行 `setTimeout` 的回调：`console.log(1)` -> **输出: 1**
    *   `setTimeout` (宏任务 4) 被添加到宏任务队列。
    *   `Promise.resolve().then(() => { console.log(7); })` (微任务 2) 被添加到微任务队列。

4.  **第二个微任务队列清空：**
    *   执行微任务 2: `console.log(7)` -> **输出: 7**

5.  **第二个宏任务（宏任务 2）执行：**
    *   执行 `setTimeout` 的回调：`console.log(8)` -> **输出: 8**
    *   `setTimeout` (宏任务 5) 被添加到宏任务队列。

6.  **第三个宏任务（宏任务 3）执行：**
    *   执行 `setTimeout` 的回调：`Promise.resolve().then(() => { console.log(4); })` (微任务 3) 被添加到微任务队列。

7.  **第三个微任务队列清空：**
    *   执行微任务 3: `console.log(4)` -> **输出: 4**

8.  **第四个宏任务（宏任务 4）执行：**
    *   执行 `setTimeout` 的回调：`Promise.resolve().then(() => { console.log(9); })` (微任务 4) 被添加到微任务队列。

9.  **第四个微任务队列清空：**
    *   执行微任务 4: `console.log(9)` -> **输出: 9**

10. **第五个宏任务（宏任务 5）执行：**
    *   执行 `setTimeout` 的回调：`console.log(5)` -> **输出: 5**

至此，所有任务执行完毕。
*/

// 2 6 3 1 7 8 4 9 5