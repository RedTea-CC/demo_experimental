// MyPromise 示例用法 (MyPromise Example Usage)

/**
 * 本文件演示了如何使用自定义实现的 MyPromise。
 * 创建一个 MyPromise 实例，并在异步操作成功后解析。
 * 然后使用 .then() 方法来处理 Promise 的结果。
 */

import MyPromise from "./MyPromise.js";

// 创建一个新的 MyPromise 实例。
// executor 函数在 Promise 创建时立即执行。
const myPromise = new MyPromise((resolve, reject) => {
  // 模拟一个异步操作，例如网络请求或定时器。
  // 1 秒后，Promise 将以 "foo" 值解决。
  setTimeout(() => {
    resolve("foo");
  }, 1000);
});

// 注册一个成功回调函数，当 Promise 解决时执行。
myPromise.then((value) => {
  // console.log("onFulfilled--", value); // 预期输出: "onFulfilled-- foo"
});

// 可以继续链式调用更多的 .then() 或 .catch()
/*
myPromise
  .then((value) => {
    console.log("第一个 then: ", value);
    return value + "bar";
  })
  .then((newValue) => {
    console.log("第二个 then: ", newValue);
    throw new Error("Something went wrong");
  })
  .catch((error) => {
    console.log("捕获到错误: ", error.message);
  });
*/
