const promise = new Promise((resolve, reject) => {
  resolve();
  reject();
  console.log("resolve");
});

promise
  .then(() => {
    console.log("promise1");
  })
  .catch(() => {
    console.log("catch");
  });
