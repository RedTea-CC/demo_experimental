const buffer = 5; // 根据需要调整缓冲值

function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}
function scrollToast() {
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  // 判断是否滑动到接近底部
  if (scrollTop + clientHeight >= scrollHeight - buffer) {
    console.log("已滑动到底部");
    // 在此处添加你想要执行的操作
  }
}

container.addEventListener("scroll", throttle(scrollToast, 500));
