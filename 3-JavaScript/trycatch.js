// JavaScript `try...catch` 块及错误传播示例 (JavaScript `try...catch` Blocks and Error Propagation Example)

/**
 * 本文件演示了 JavaScript 中 `try...catch` 语句的嵌套使用，
 * 以及错误如何在嵌套的 `try...catch` 块之间传播。
 * 理解错误传播机制对于编写健壮的异步和同步代码至关重要。
 */

try {
  console.log("外层 try 开始执行");

  try {
    console.log("内层 try 开始执行");
    // 在内层 try 块中故意抛出一个错误。
    throw new Error("这是内层错误");
    // 注意：一旦抛出错误，当前 try 块中剩余的代码将不再执行。
    // console.log("内层 try 结束"); // 这行代码将不会被执行到
  } catch (innerError) {
    // 内层 catch 块捕获到内层 try 块中抛出的错误。
    console.log("内层 catch 捕获到错误:", innerError.message);
    // 在内层 catch 块中重新抛出一个新的错误。
    // 这会导致该错误被外层的 catch 块捕获，从而实现错误的向外传播。
    throw new Error("内层处理后重新抛出的错误");
  }

  // 如果内层 catch 没有重新抛出错误，这行代码将在此处执行。
  // 但由于内层 catch 重新抛出了错误，外层 try 会立即停止，所以这行也不会执行。
  // console.log("内层 try 结束后的外层 try 代码");
} catch (outerError) {
  // 外层 catch 块捕获到从内层 catch 块重新抛出的错误。
  console.log("外层 catch 捕获到错误:", outerError.message);
}

// 无论 Promise 是成功解决还是失败拒绝， finally 块都会执行。
console.log("程序继续在 try...catch 块之后运行");

/*
预期控制台输出 (Expected Console Output):
------------------------------------------
外层 try 开始执行
内层 try 开始执行
内层 catch 捕获到错误: 这是内层错误
外层 catch 捕获到错误: 内层处理后重新抛出的错误
程序继续在 try...catch 块之后运行

注意事项：
1. 如果内层 catch 没有重新抛出错误，那么外层 catch 就不会捕获到任何错误。
   在这种情况下，程序流程会在内层 catch 执行完毕后，继续执行外层 try 块中剩余的代码。
2. 嵌套 try...catch 时，错误的传播路径是从内到外，逐层检查是否有 catch 块能够处理该错误。
*/

// --------------

/* 注意事项：
如果内层 catch 没有重新抛出错误，外层 catch 就不会捕获到任何错误。
嵌套 try...catch 时，错误的传播路径是从内到外，逐层检查是否有 catch 块处理错误。 */
