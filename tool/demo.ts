// 实现一个重试方法，要求传入一个异步函数和n(重试次数)，当函数执行n次失败停止执行
const retry = async (fn: () => Promise<any>, n: number) => {
  let i = 0;
  while (i < n) {
    try {
      return await fn();
    } catch (e) {
      i++;
    }
  }
};

const mockFn = async () => {
  console.log("try");
  return Promise.reject("error");
};

retry(mockFn, 3)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
