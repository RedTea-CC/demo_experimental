const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const isFunction = (fn) => typeof fn === "function";
const isObject = (obj) => obj !== null && typeof obj === "object";
const isThenable = (obj) => isObject(obj) && isFunction(obj.then);
const isPromise = (obj) => obj instanceof MyPromise;
const isThenablePromise = (obj) => isThenable(obj) && isPromise(obj);
const isSamePromise = (promise1, promise2) => promise1 === promise2;
const isSameThenable = (thenable1, thenable2) => thenable1 === thenable2;
const isSameThenablePromise = (thenable, promise) => isSameThenable(thenable, promise) && isThenablePromise(promise);

class MyPromise {
  // Initial state
  #state = PENDING;
  #value = undefined;
  #reason = undefined;
  // Success and failure callbacks storage
  #onFulfilledCallbacks = [];
  #onRejectedCallbacks = [];

  constructor(executor) {
    const resolve = (value) => {
      // 如果状态是pending，才可以改变状态
      if (this.#state !== PENDING) return;
      this.#state = FULFILLED;
      this.#value = value;

      // 执行所有存储的成功回调
      this.#onFulfilledCallbacks.forEach((callback) => callback(this.#value));
    };

    const reject = (reason) => {
      // 如果状态是pending，才可以改变状态
      if (this.#state !== PENDING) return;
      this.#state = REJECTED;
      this.#reason = reason;
      // 执行所有存储的失败回调
      this.#onRejectedCallbacks.forEach((callback) => callback(this.#reason));
    };

    // 立即执行回调函数
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // Ensure callbacks are functions or return passthroughs
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {});

    return promise2;
  }

  // Helper method to resolve the promise
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError("检测到承诺的链接周期"));
    }

    let called;
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (err) => {
              if (called) return;
              called = true;
              reject(err);
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

  // catch : then方法的特例
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // Static resolve method
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise((resolve) => resolve(value));
  }

  // Static reject method
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

export default MyPromise;
