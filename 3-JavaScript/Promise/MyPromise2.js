// Promise/A+ 规范的自定义实现 (Custom Implementation of Promises/A+ Specification)

// 定义 Promise 的三种状态常量
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * `MyPromise` 类实现了 Promises/A+ 规范。
 * 它提供了异步操作的结构化处理，通过 `resolve` 和 `reject` 回调来管理异步操作的成功或失败。
 * 额外增加了 `finally`, `all`, `race` 等静态方法以完善功能。
 */
class MyPromise {
  // 私有字段，存储 Promise 的内部状态、结果值（成功或失败）和待处理的回调队列。
  #state = PENDING; // Promise 的当前状态：pending, fulfilled 或 rejected
  #result = undefined; // Promise 成功时的值或失败时的原因
  #thenables = []; // 存储在 Promise 处于 pending 状态时注册的 then 回调及其对应的 resolve/reject 函数

  /**
   * MyPromise 构造函数。
   * 接收一个 `executor` 函数作为参数，该函数在 Promise 被创建时立即同步执行。
   * `executor` 接收两个函数作为参数：`resolve` 和 `reject`。
   * - `resolve(value)`: 当异步操作成功时调用，将 Promise 的状态从 pending 变为 fulfilled，并设置成功值。
   * - `reject(reason)`: 当异步操作失败时调用，将 Promise 的状态从 pending 变为 rejected，并设置失败原因。
   *
   * @param {Function} executor - 一个在 Promise 构造时立即执行的函数，包含异步操作的逻辑。
   * @throws {TypeError} 如果 executor 不是一个函数。
   */
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver ' + executor + ' is not a function');
    }

    /**
     * 内部 resolve 函数，用于将 Promise 状态从 pending 转换为 fulfilled。
     * @param {any} value - Promise 成功时的值。
     */
    const resolve = (value) => {
      this.#changeStatus(FULFILLED, value);
    };

    /**
     * 内部 reject 函数，用于将 Promise 状态从 pending 转换为 rejected。
     * @param {any} error - Promise 失败时的原因。
     */
    const reject = (error) => {
      this.#changeStatus(REJECTED, error);
    };

    // 立即同步执行 executor 函数，捕获可能抛出的同步错误。
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * 内部方法：用于改变 Promise 的状态和设置结果。
   * 状态只能从 `pending` 变为 `fulfilled` 或 `rejected`，并且只能改变一次。
   *
   * @param {string} state - 目标状态 (FULFILLED 或 REJECTED)。
   * @param {any} result - 成功时传入的值或失败时传入的原因。
   * @private
   */
  #changeStatus(state, result) {
    // 状态只能从 pending 变为 fulfilled 或 rejected
    if (this.#state !== PENDING) return;

    this.#state = state;
    this.#result = result;
    // 状态改变后，执行所有存储的回调
    this.#run();
  }

  /**
   * 内部方法：处理单个回调函数的执行。
   * 确保回调在微任务中执行，并处理回调的返回值和可能抛出的错误。
   *
   * @param {Function} callback - 要执行的 `onFulfilled` 或 `onRejected` 回调函数。
   * @param {Function} resolve - 关联 `promise2` 的 `resolve` 函数。
   * @param {Function} reject - 关联 `promise2` 的 `reject` 函数。
   * @private
   */
  #handleCallback(callback, resolve, reject) {
    // 如果回调不是函数，则实现状态穿透（值或错误直接传递）
    if (typeof callback !== "function") {
      queueMicrotask(() => {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
      });
      return;
    }
    // 将回调的执行放入微任务队列，确保异步性
    queueMicrotask(() => {
      try {
        // 执行回调，获取返回值 `result`
        const result = callback(this.#result);
        // 根据 `result` 的类型解析下一个 Promise (promise2)
        this.#resolvePromise(result, resolve, reject);
      } catch (error) {
        // 如果回调执行中抛出错误，则拒绝下一个 Promise
        reject(error);
      }
    });
  }

  /**
   * 内部方法：Promises/A+ 规范中的 Promise Resolution Procedure [[Resolve]](promise, x)。
   * 用于根据 `x` (then 方法回调的返回值) 来解析 `promise2` (then 方法返回的新 Promise)。
   * 确保 Promise 的正确链式行为和状态转换。
   *
   * @param {any} result - `onFulfilled` 或 `onRejected` 回调的返回值。
   * @param {Function} resolve - 关联 `promise2` 的 `resolve` 函数。
   * @param {Function} reject - 关联 `promise2` 的 `reject` 函数。
   * @private
   */
  #resolvePromise(result, resolve, reject) {
    // 2.3.1 如果 promise2 和 result 指向同一个对象，以 TypeError 为拒因拒绝 promise。
    // 这里的 `this` 指的是当前 `MyPromise` 实例，如果 result 就是这个实例本身，则形成循环。
    if (result === this) {
      return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
    }

    // 2.3.2 如果 `result` 是一个 Promise 实例。
    if (result instanceof MyPromise) {
      // 采用 `result` 的状态：当 `result` 解决或拒绝时，`promise2` 也随之解决或拒绝。
      result.then(resolve, reject);
      return;
    }

    // 2.3.3 如果 `result` 是一个对象或函数 (即可能是 thenable)。
    let called = false; // 确保 `resolvePromise` 或 `reject` 只被调用一次。

    if (result !== null && (typeof result === "object" || typeof result === "function")) {
      try {
        // 尝试获取 `result.then`。
        const then = result.then;

        // 2.3.3.3 如果 `then` 是一个函数 (result 是一个 thenable)。
        if (typeof then === "function") {
          // 调用 `then`，并将 `result` 作为其 `this` 值。
          // `then` 的前两个参数是处理其自身解决或拒绝的函数。
          then.call(
            result,
            (value) => {
              // 2.3.3.3.1 如果 `resolve` 或 `reject` 已经被调用过，则忽略后续调用。
              if (called) return;
              called = true;
              // 递归解析 `promise2` 和 `value` (thenable 的解决值)。
              this.#resolvePromise(value, resolve, reject);
            },
            (reason) => {
              // 2.3.3.3.2 如果 `resolve` 或 `reject` 已经被调用过，则忽略后续调用。
              if (called) return;
              called = true;
              reject(reason); // 拒绝 `promise2`。
            }
          );
        } else {
          // 2.3.3.4 如果 `then` 不是一个函数，则以 `result` 为成功值执行 `promise2`。
          resolve(result);
        }
      } catch (error) {
        // 2.3.3.2 如果在取 `result.then` 时抛出错误 `error`。
        if (called) return; // 如果 `resolve` 或 `reject` 已经被调用过，则忽略。
        called = true;
        reject(error); // 拒绝 `promise2`。
      }
    } else {
      // 2.3.4 如果 `result` 不为对象或函数，以 `result` 为成功值执行 `promise2`。
      resolve(result);
    }
  }

  /**
   * 内部方法：当 Promise 的状态从 pending 变为 fulfilled 或 rejected 时，执行队列中所有等待的回调。
   * 这是一个微任务队列，确保回调的异步执行顺序。
   * @private
   */
  #run() {
    // 只有当 Promise 状态不是 pending 时才执行回调
    if (this.#state === PENDING) return;

    // 循环处理所有排队等待的回调函数
    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#thenables.shift();

      if (this.#state === FULFILLED) {
        this.#handleCallback(onFulfilled, resolve, reject);
      } else {
        this.#handleCallback(onRejected, resolve, reject);
      }
    }
  }

  /**
   * `then` 方法用于注册 Promise 状态改变时的回调函数。\
   * 它返回一个新的 Promise，允许进行链式调用。\
   * `onFulfilled` 和 `onRejected` 参数是可选的，如果不是函数，它们将被忽略（透传）。
   *
   * @param {Function} [onFulfilled] - 当 Promise 状态变为 fulfilled 时执行的回调函数。接收成功值作为参数。
   * @param {Function} [onRejected] - 当 Promise 状态变为 rejected 时执行的回调函数。接收失败原因作为参数。
   * @returns {MyPromise} 一个新的 Promise，其状态和值/原因由 `onFulfilled` 或 `onRejected` 的返回值决定。
   */
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      // 将 `onFulfilled`, `onRejected` 以及新 Promise 的 `resolve`, `reject` 推入队列。
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      // 启动队列处理，如果 Promise 已经 settled，会立即执行；否则等待状态改变。
      this.#run();
    });

    return promise2;
  }

  /**
   * `catch` 方法是 `then(null, onRejected)` 的语法糖。\
   * 它用于注册 Promise 失败时的回调函数，使得错误处理更加简洁。
   *
   * @param {Function} onRejected - 当 Promise 状态变为 rejected 时执行的回调函数。接收失败原因作为参数。
   * @returns {MyPromise} 一个新的 Promise，其状态和值/原因由 `onRejected` 的返回值决定。
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * `finally` 方法用于注册一个回调函数，无论 Promise 最终是 fulfilled 还是 rejected，都会执行。
   * 它不接收任何参数，并且返回一个与原 Promise 状态和结果相同的新 Promise。
   * 这对于执行清理操作非常有用。
   *
   * @param {Function} callback - 无论 Promise 成功或失败都会执行的回调函数。
   * @returns {MyPromise} 一个新的 Promise，其状态和值/原因与原 Promise 相同。
   */
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }

  /**
   * `MyPromise.resolve(value)` 静态方法返回一个以给定值解析的 Promise 对象。\
   * 如果值是 Promise 自身，则直接返回该 Promise。\
   * 如果值是 thenable（即具有 `then` 方法），返回的 Promise 会"采用"该 thenable 的状态。\
   * 否则，返回的 Promise 将以该值 fulfilled。
   *
   * @param {any} value - 用于解析 Promise 的值或 thenable 对象。
   * @returns {MyPromise} 一个以给定值解析的新 Promise 对象。
   */
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    // 对于 thenable 和非 Promise 值，创建一个新的 Promise 并以 value 解析
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  /**
   * `MyPromise.reject(reason)` 静态方法返回一个以给定原因拒绝的 Promise 对象。\
   * 返回的 Promise 永远不会被 resolve。
   *
   * @param {any} reason - Promise 拒绝的原因。
   * @returns {MyPromise} 一个以给定原因拒绝的新 Promise 对象。
   */
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  /**
   * `MyPromise.all(promises)` 静态方法接收一个 Promise 可迭代对象（如数组）作为输入。
   * 当所有输入的 Promise 都被成功解决时，它返回一个包含所有 Promise 解决值的新 Promise。
   * 返回的 Promise 解决值的顺序与输入的可迭代对象的 Promise 顺序一致。
   * 如果任何一个输入的 Promise 被拒绝，则 `MyPromise.all` 返回的 Promise 也会立即被拒绝，
   * 并且拒绝的原因是第一个被拒绝的 Promise 的原因。
   *
   * @param {Iterable<Promise<any>>} promises - 一个可迭代对象（如数组），包含多个 Promise 或非 Promise 值。
   * @returns {MyPromise<Array<any>>} 一个新的 Promise，解析为所有输入 Promise 的结果数组。
   *   如果输入的可迭代对象为空，则立即解析为一个空数组。
   *   如果输入的任何 Promise 拒绝，则返回一个拒绝的 Promise。
   */
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      // 检查输入是否为可迭代对象
      if (!Array.isArray(promises) && typeof promises[Symbol.iterator] !== 'function') {
        return reject(new TypeError('promises must be an iterable (e.g., an array)'));
      }

      const results = [];
      let completedCount = 0;
      const totalPromises = Array.from(promises).length; // 将可迭代对象转换为数组以获取长度

      // 如果输入是空数组，立即解析为空数组
      if (totalPromises === 0) {
        return resolve([]);
      }

      // 遍历所有 Promise
      Array.from(promises).forEach((promise, index) => {
        // 使用 MyPromise.resolve 确保处理非 Promise 值
        MyPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            completedCount++;

            // 当所有 Promise 都完成时，解决主 Promise
            if (completedCount === totalPromises) {
              resolve(results);
            }
          },
          (reason) => {
            // 任何一个 Promise 失败，主 Promise 立即失败
            reject(reason);
          }
        );
      });
    });
  }

  /**
   * `MyPromise.race(promises)` 静态方法接收一个 Promise 可迭代对象（如数组）作为输入。
   * 它返回一个 Promise，这个 Promise 一旦迭代器中的某个 Promise 解决或拒绝，
   * 那么它就会采取"率先"解决或拒绝的 Promise 的值或原因。
   *
   * @param {Iterable<Promise<any>>} promises - 一个可迭代对象（如数组），包含多个 Promise 或非 Promise 值。
   * @returns {MyPromise<any>} 一个新的 Promise，其状态和结果由率先解决或拒绝的 Promise 决定。
   *   如果输入的可迭代对象为空，返回的 Promise 将永远处于 pending 状态。
   */
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      // 检查输入是否为可迭代对象
      if (!Array.isArray(promises) && typeof promises[Symbol.iterator] !== 'function') {
        return reject(new TypeError('promises must be an iterable (e.g., an array)'));
      }

      // 如果是空的可迭代对象，Promise 将永远处于 pending 状态
      if (Array.from(promises).length === 0) {
        return; // 根据规范，空数组不会解决也不会拒绝
      }

      // 遍历所有 Promise，只要有一个 Promise 解决或拒绝，就立即决定 `race` Promise 的状态
      Array.from(promises).forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }
}

// 导出 MyPromise 类，使其可以在其他模块中使用。
export default MyPromise;

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
