import MyPromise from "./MyPromise.js";

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 1000);
});

myPromise.then((value) => {
  console.log("onFulfilled--", value);
});
