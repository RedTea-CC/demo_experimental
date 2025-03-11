const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  // Initial state
  #state = PENDING;
  #result = undefined;
  #thenables = [];

  constructor(executor) {
    const resolve = (value) => {
      this.#changeStatus(FULFILLED, value);
    };

    const reject = (error) => {
      this.#changeStatus(REJECTED, error);
    };

    // 立即执行回调函数
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeStatus(state, result) {
    // 状态是pending，才可以改变状态
    if (this.#state !== PENDING) return;

    this.#state = state;
    this.#result = result;
    this.#run();
  }

  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== "function") {
      // 状态穿透
      queueMicrotask(() => {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
      });
      return;
    }
    queueMicrotask(() => {
      try {
        const result = callback(this.#result);
        this.#resolvePromise(result, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 添加 Promise 解析过程
  #resolvePromise(result, resolve, reject) {
    // 避免循环引用
    if (result === this) {
      return reject(new TypeError("Chaining cycle detected for promise"));
    }

    // 处理返回的是 Promise 实例的情况
    if (result instanceof MyPromise) {
      result.then(resolve, reject);
      return;
    }

    // 处理返回的是 thenable 对象的情况
    if (result !== null && (typeof result === "object" || typeof result === "function")) {
      let then;
      try {
        then = result.then;
      } catch (error) {
        return reject(error);
      }

      if (typeof then === "function") {
        let called = false;
        try {
          then.call(
            result,
            (value) => {
              if (called) return;
              called = true;
              this.#resolvePromise(value, resolve, reject);
            },
            (reason) => {
              if (called) return;
              called = true;
              reject(reason);
            }
          );
        } catch (error) {
          if (!called) {
            reject(error);
          }
        }
        return;
      }
    }

    // 普通值直接 resolve
    resolve(result);
  }

  #run() {
    if (this.#state === PENDING) return;

    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#thenables.shift();

      if (this.#state === FULFILLED) {
        this.#handleCallback(onFulfilled, resolve, reject);
      } else {
        this.#handleCallback(onRejected, resolve, reject);
      }
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      // 启动队列处理
      this.#run();
    });

    return promise2;
  }

  // catch : then方法的特例
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // 添加 finally 方法
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }

  // 添加静态方法
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("promises must be an array"));
      }

      const results = [];
      let completed = 0;

      if (promises.length === 0) {
        return resolve(results);
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completed++;

            if (completed === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("promises must be an array"));
      }

      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }
}

const p = new MyPromise((resolve, reject) => {
  resolve(1);
});

p.then(
  (data) => {
    console.log(data);
    return data + 1;
  },
  (err) => {
    console.log(err);
  }
).then((data) => {
  console.log(data);
});
