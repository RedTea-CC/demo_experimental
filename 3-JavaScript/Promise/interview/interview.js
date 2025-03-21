let resolvePromise = new Promise((resolve) => {
  let resolvedPromise = Promise.resolve();
  resolve(resolvedPromise);
  // 提示:resolve(resolvedPromise) 等同于:
  // Promise.resolve().then(() => resolvedPromise.then(resolve));
});
resolvePromise.then(() => {
  console.log("resolvePromise resolved");
});

let resolvedPromiseThen = Promise.resolve().then((res) => {
  console.log("promise1");
});
resolvedPromiseThen
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  });
