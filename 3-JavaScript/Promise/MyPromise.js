// Promise/A+ 规范的自定义实现 (Custom Implementation of Promises/A+ Specification)

// 定义 Promise 的三种状态常量
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 检查给定值是否为函数。
 * @param {any} fn - 要检查的值。
 * @returns {boolean} 如果是函数则返回 true，否则返回 false。
 */
const isFunction = (fn) => typeof fn === "function";

/**
 * 检查给定值是否为非 null 的对象。
 * @param {any} obj - 要检查的值。
 * @returns {boolean} 如果是对象且不为 null 则返回 true，否则返回 false。
 */
const isObject = (obj) => obj !== null && typeof obj === "object";

/**
 * 检查给定值是否为 thenable 对象（即具有 callable `then` 方法的对象或函数）。
 * @param {any} obj - 要检查的值。
 * @returns {boolean} 如果是 thenable 则返回 true，否则返回 false。
 */
const isThenable = (obj) => isObject(obj) && isFunction(obj.then);

const isPromise = (obj) => obj instanceof MyPromise;
const isThenablePromise = (obj) => isThenable(obj) && isPromise(obj);
const isSamePromise = (promise1, promise2) => promise1 === promise2;
const isSameThenable = (thenable1, thenable2) => thenable1 === thenable2;
const isSameThenablePromise = (thenable, promise) =>
  isSameThenable(thenable, promise) && isThenablePromise(promise);

/**
 * `MyPromise` 类实现了 Promises/A+ 规范。\
 * 它提供了异步操作的结构化处理，通过 `resolve` 和 `reject` 回调来管理异步操作的成功或失败。
 */
class MyPromise {
  // 私有字段，存储 Promise 的内部状态、成功值或失败原因。
  #state = PENDING; // Promise 的当前状态：pending, fulfilled 或 rejected
  #value = undefined; // Promise 成功时的值
  #reason = undefined; // Promise 失败时的原因

  // 回调函数队列，用于存储在 Promise 状态变为 fulfilled 或 rejected 时需要执行的回调。
  #onFulfilledCallbacks = []; // 存储成功回调
  #onRejectedCallbacks = []; // 存储失败回调

  /**
   * MyPromise 构造函数。\
   * 接收一个 `executor` 函数作为参数，该函数在 Promise 被创建时立即同步执行。\
   * `executor` 接收两个函数作为参数：`resolve` 和 `reject`。\
   * - `resolve(value)`: 当异步操作成功时调用，将 Promise 的状态从 pending 变为 fulfilled，并设置成功值。\
   * - `reject(reason)`: 当异步操作失败时调用，将 Promise 的状态从 pending 变为 rejected，并设置失败原因。
   *
   * @param {Function} executor - 一个在 Promise 构造时立即执行的函数，包含异步操作的逻辑。
   * @throws {TypeError} 如果 executor 不是一个函数。
   */
  constructor(executor) {
    if (!isFunction(executor)) {
      throw new TypeError("Promise resolver " + executor + " is not a function");
    }

    /**
     * 内部 resolve 函数，用于将 Promise 状态从 pending 转换为 fulfilled。
     * @param {any} value - Promise 成功时的值。
     */
    const resolve = (value) => {
      // 状态只能从 pending 变为 fulfilled
      if (this.#state !== PENDING) return;
      this.#state = FULFILLED;
      this.#value = value;

      // 使用 queueMicrotask 确保回调在当前任务结束后，下一个微任务队列中执行，
      // 这符合 Promises/A+ 规范的异步性要求。
      queueMicrotask(() => {
        this.#onFulfilledCallbacks.forEach((callback) => {
          callback(this.#value);
        });
      });
    };

    /**
     * 内部 reject 函数，用于将 Promise 状态从 pending 转换为 rejected。
     * @param {any} reason - Promise 失败时的原因。
     */
    const reject = (reason) => {
      // 状态只能从 pending 变为 rejected
      if (this.#state !== PENDING) return;
      this.#state = REJECTED;
      this.#reason = reason;

      // 使用 queueMicrotask 确保回调在当前任务结束后，下一个微任务队列中执行。
      queueMicrotask(() => {
        this.#onRejectedCallbacks.forEach((callback) => {
          callback(this.#reason);
        });
      });
    };

    // 立即同步执行 executor 函数，捕获可能抛出的同步错误。
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error); // 捕获错误并将其作为 Promise 的拒绝原因。
    }
  }

  /**
   * `then` 方法用于注册 Promise 状态改变时的回调函数。\
   * 它返回一个新的 Promise，允许进行链式调用。\
   * 如果 `onFulfilled` 或 `onRejected` 不是函数，它们将被忽略（透传）。
   *
   * @param {Function} [onFulfilled] - 当 Promise 状态变为 fulfilled 时执行的回调函数。接收成功值作为参数。
   * @param {Function} [onRejected] - 当 Promise 状态变为 rejected 时执行的回调函数。接收失败原因作为参数。
   * @returns {MyPromise} 一个新的 Promise，其状态和值/原因由 `onFulfilled` 或 `onRejected` 的返回值决定。
   */
  then(onFulfilled, onRejected) {
    // 确保 onFulfilled 是函数，否则使用一个透传函数（传递值不变）
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : (value) => value;
    // 确保 onRejected 是函数，否则使用一个透传并抛出错误的函数（将错误继续向下传递）
    onRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    // 返回一个新的 Promise，以支持链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 辅助函数：处理回调执行逻辑
      const handleCallback = (callback, valueOrReason) => {
        queueMicrotask(() => {
          try {
            // 执行回调，获取返回值 x
            const x = callback(valueOrReason);
            // 根据 Promises/A+ 规范解析 promise2
            this.#resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 如果回调执行中抛出错误，则拒绝 promise2
            reject(error);
          }
        });
      };

      // 根据当前 Promise 的状态决定如何处理 then 回调
      if (this.#state === FULFILLED) {
        handleCallback(onFulfilled, this.#value);
      } else if (this.#state === REJECTED) {
        handleCallback(onRejected, this.#reason);
      } else {
        // 如果当前 Promise 仍在 pending 状态，则将回调存储起来
        this.#onFulfilledCallbacks.push(() => handleCallback(onFulfilled, this.#value));
        this.#onRejectedCallbacks.push(() => handleCallback(onRejected, this.#reason));
      }
    });

    return promise2;
  }

  /**
   * 辅助方法：Promises/A+ 规范中的 Promise Resolution Procedure [[Resolve]](promise, x)。\
   * 用于根据 `x` (then 方法回调的返回值) 来解析 `promise2` (then 方法返回的新 Promise)。
   *
   * @param {MyPromise} promise2 - `then` 方法返回的新 Promise。
   * @param {any} x - `onFulfilled` 或 `onRejected` 回调的返回值。
   * @param {Function} resolve - `promise2` 的 `resolve` 函数。
   * @param {Function} reject - `promise2` 的 `reject` 函数。
   * @private
   */
  #resolvePromise(promise2, x, resolve, reject) {
    // 2.3.1 如果 promise2 和 x 指向同一个对象，以 TypeError 为拒因拒绝 promise
    if (promise2 === x) {
      return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
    }

    // 2.3.2 如果 x 是一个 Promise
    if (x instanceof MyPromise) {
      // 采用 x 的状态，递归解析
      x.then(
        (y) => {
          this.#resolvePromise(promise2, y, resolve, reject);
        },
        (err) => {
          reject(err);
        }
      );
      return;
    }

    // 2.3.3 如果 x 是一个对象或函数 (即可能是 thenable)
    let called = false; // 确保 resolvePromise 或 rejectPromise 只被调用一次

    if (isObject(x) || isFunction(x)) {
      try {
        // 尝试获取 x.then
        const then = x.then;

        // 2.3.3.3 如果 then 是一个函数 (x 是一个 thenable)
        if (isFunction(then)) {
          // 调用 then，并将 x 作为其 this 值。前两个参数分别是 resolvePromise 和 rejectPromise。
          then.call(
            x,
            (y) => {
              // 2.3.3.3.1 如果 resolvePromise 或 rejectPromise 已经被调用过，则忽略后续调用
              if (called) return;
              called = true;
              // 递归解析 promise2 和 y
              this.#resolvePromise(promise2, y, resolve, reject);
            },
            (err) => {
              // 2.3.3.3.2 如果 resolvePromise 或 rejectPromise 已经被调用过，则忽略后续调用
              if (called) return;
              called = true;
              reject(err); // 拒绝 promise2
            }
          );
        } else {
          // 2.3.3.4 如果 then 不是一个函数，则以 x 为成功值执行 promise2
          resolve(x);
        }
      } catch (error) {
        // 2.3.3.2 如果在取 x.then 时抛出错误 error
        if (called) return; // 如果 resolvePromise 或 rejectPromise 已经被调用过，则忽略
        called = true;
        reject(error); // 拒绝 promise2
      }
    } else {
      // 2.3.4 如果 x 不为对象或函数，以 x 为成功值执行 promise2
      resolve(x);
    }
  }

  /**
   * `catch` 方法是 `then(null, onRejected)` 的语法糖。\
   * 它用于注册 Promise 失败时的回调函数。
   *
   * @param {Function} onRejected - 当 Promise 状态变为 rejected 时执行的回调函数。接收失败原因作为参数。
   * @returns {MyPromise} 一个新的 Promise，其状态和值/原因由 `onRejected` 的返回值决定。
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * `MyPromise.resolve(value)` 静态方法返回一个以给定值解析的 Promise 对象。\
   * 如果值是 Promise 自身，则直接返回该 Promise。\
   * 如果值是 thenable（即具有 `then` 方法），返回的 Promise 会"采用"该 thenable 的状态。\
   * 否则，返回的 Promise 将以该值fulfilled。
   *
   * @param {any} value - 用于解析 Promise 的值或 thenable 对象。
   * @returns {MyPromise} 一个以给定值解析的新 Promise 对象。
   */
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    // 对于 thenable 和非 Promise 值，创建一个新的 Promise 并以 value 解析
    return new MyPromise((resolve) => resolve(value));
  }

  /**
   * `MyPromise.reject(reason)` 静态方法返回一个以给定原因拒绝的 Promise 对象。\
   * 返回的 Promise 永远不会被 resolve。
   *
   * @param {any} reason - Promise 拒绝的原因。
   * @returns {MyPromise} 一个以给定原因拒绝的新 Promise 对象。
   */
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// 导出 MyPromise 类，使其可以在其他模块中使用。
export default MyPromise;
