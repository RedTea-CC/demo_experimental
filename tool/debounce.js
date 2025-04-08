/**
 * debounce函数实现
 * @description 防抖函数，用于限制函数在一定时间内只能被调用一次
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间，单位毫秒
 * @param {boolean} [immediate=false] - 是否立即执行
 * @returns {Function} - 返回防抖处理后的函数，带有取消功能
 */
function debounce(fn, delay, immediate = false) {
  let timer = null;

  const debounced = function (...args) {
    const context = this;
    // 在`clearTimeout(timer)` 之后，`timer` 的值保持不变。
    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) return fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };

  debounced.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced;
}

// 测试用例
if (typeof window !== "undefined") {
  // 模拟一个频繁触发的函数
  function handleInput(e) {
    console.log("Input value:", e.target.value);
  }

  // 使用debounce包装函数
  const debouncedHandle = debounce(handleInput, 500);

  // 添加输入框用于测试
  const input = document.createElement("input");
  input.addEventListener("input", debouncedHandle);
  document.body.appendChild(input);
}

// Node环境下的测试用例
if (typeof process !== "undefined") {
  let counter = 0;
  const mockFn = () => {
    counter++;
    console.log("函数被调用，当前计数:", counter);
  };

  const debouncedMockFn = debounce(mockFn, 1000, true);

  debouncedMockFn();
  debouncedMockFn();
  debouncedMockFn();

  // setTimeout(() => {
  //   debouncedMockFn();
  // }, 1500);

  // setTimeout(() => {
  //   debouncedMockFn.cancel();
  //   console.log("防抖函数已取消");
  // }, 2000);
}
