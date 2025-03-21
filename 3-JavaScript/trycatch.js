try {
  console.log("外层 try 开始");

  try {
    console.log("内层 try 开始");
    // 抛出一个错误
    throw new Error("内层错误");
  } catch (innerError) {
    console.log("内层 catch 捕获到错误:", innerError.message);
    // 如果需要，可以选择不处理错误，或者重新抛出
    throw new Error("重新抛出错误");
  }

  console.log("内层 try 结束"); // 这行不会执行
} catch (outerError) {
  console.log("外层 catch 捕获到错误:", outerError.message);
}

console.log("程序继续运行");

// 外层 try 开始
// 内层 try 开始
// 内层 catch 捕获到错误: 内层错误
// 外层 catch 捕获到错误: 重新抛出错误
// 程序继续运行

// --------------

/* 注意事项：
如果内层 catch 没有重新抛出错误，外层 catch 就不会捕获到任何错误。
嵌套 try...catch 时，错误的传播路径是从内到外，逐层检查是否有 catch 块处理错误。 */
