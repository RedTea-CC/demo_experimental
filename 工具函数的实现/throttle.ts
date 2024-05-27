function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let previous = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - previous >= wait) {
      func.apply(this, args);
      previous = now;
    }
  };
}

// 定义一个带参数的函数，用于测试 throttle 函数
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

// 使用 throttle 函数创建一个受节流控制的函数
const throttledGreet = throttle(greet, 1000);

// 多次调用受节流控制的函数，在每次调用之后至少间隔 1000 毫秒
throttledGreet("Alice"); // 输出 "Hello, Alice!"
throttledGreet("Bob"); // （1 秒后）输出 "Hello, Bob!"
throttledGreet("Charlie"); // （1 秒后）输出 "Hello, Charlie!"
