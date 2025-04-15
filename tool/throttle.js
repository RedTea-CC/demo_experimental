/**
 * throttle函数实现
 * @description 节流函数，用于限制函数在一定时间间隔内只能执行一次
 * @param {Function} func - 需要节流的函数
 * @param {number} wait - 时间间隔，单位毫秒
 * @returns {Function} - 返回节流处理后的函数
 */
function throttle(func, wait) {
  let lastTime = 0; // 上一次执行的时间戳

  return function (...args) {
    const now = Date.now(); // 当前时间戳
    const context = this;

    // 如果距离上一次执行的时间超过了设定的间隔时间
    if (now - lastTime >= wait) {
      lastTime = now; // 更新上一次执行的时间戳
      func.apply(context, args); // 执行目标函数
    }
  };
}

// 测试用例

// 定义一个带参数的函数，用于测试 throttle 函数
function greet(name) {
  console.log("Hello, ".concat(name, "!"), "Time:", new Date().toISOString());
}

// 使用 throttle 函数创建一个受节流控制的函数
const throttledGreet = throttle(greet, 1000);

// 模拟多次调用受节流控制的函数
throttledGreet("Alice"); // 输出 "Hello, Alice!"，并打印时间
setTimeout(() => throttledGreet("Bob"), 500); // 不会输出，因为间隔小于 1000 毫秒
setTimeout(() => throttledGreet("Charlie"), 1000); // 输出 "Hello, Charlie!"，并打印时间
setTimeout(() => throttledGreet("Dave"), 1500); // 不会输出，因为间隔小于 1000 毫秒
setTimeout(() => throttledGreet("Eve"), 2000); // 输出 "Hello, Eve!"，并打印时间
