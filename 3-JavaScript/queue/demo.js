// 任务池实现 (Task Pool Implementation)

/**
 * `Pool` 类用于管理任务的并行执行，控制同时执行的任务数量。
 * 它维护一个任务队列和当前活跃的工作者数量，确保不会超过设定的最大并行数。
 */
export class Pool {
  /**
   * 构造函数，初始化任务池。
   * @param {number} [maxWorkers=3] - 可同时执行的最大并行任务数。默认为 3。
   */
  constructor(maxWorkers = 3) {
    /**
     * @private
     * @type {number} 最大并行任务数。
     */
    this.maxWorkers = maxWorkers;
    /**
     * @private
     * @type {Array<Object>} 待执行的任务队列。
     * 每个任务对象包含：`task` (任务函数), `resolve` (任务成功时调用的 Promise resolve 函数), `reject` (任务失败时调用的 Promise reject 函数)。
     */
    this.taskQueue = [];
    /**
     * @private
     * @type {number} 当前正在执行的任务数量。
     */
    this.activeWorkers = 0;
  }

  /**
   * 向任务池添加一个新任务。
   * 任务会被加入队列，并在有空闲工作者时自动开始执行。
   *
   * @param {Function} task - 要执行的任务函数。该函数应该返回一个 Promise 或一个普通值。
   * @returns {Promise<any>} - 一个 Promise，当任务完成时以其结果解析，或当任务失败时以其错误拒绝。
   * @example
   * const pool = new Pool(2);
   * pool.addTask(() => {
   *   return new Promise(resolve => {
   *     setTimeout(() => {
   *       console.log('Task 1 completed');
   *       resolve('Result 1');
   *     }, 1000);
   *   });
   * }).then(result => console.log(result)); // 输出: Result 1 (1秒后)
   *
   * pool.addTask(() => Promise.resolve('Immediate Task Result'))
   *     .then(result => console.log(result)); // 输出: Immediate Task Result (几乎立即)
   */
  addTask(task) {
    return new Promise((resolve, reject) => {
      // 将任务及其关联的 Promise resolve/reject 回调添加到队列中
      this.taskQueue.push({ task, resolve, reject });
      // 尝试处理队列中的下一个任务
      this._processNextTask();
    });
  }

  /**
   * @private
   * 内部方法，负责从任务队列中取出任务并执行。
   * 仅当未达到最大并行任务数且任务队列不为空时才会执行任务。
   * 任务执行后，会调用 `_cleanup` 方法来减少活跃工作者计数并尝试处理更多任务。
   */
  _processNextTask() {
    // 如果当前活跃任务数已达到上限，或者任务队列已空，则停止处理。
    if (this.activeWorkers >= this.maxWorkers || this.taskQueue.length === 0) {
      return;
    }

    // 从队列中移除并获取下一个待处理任务
    const { task, resolve, reject } = this.taskQueue.shift();
    // 增加活跃任务计数，表示有一个新任务开始执行
    this.activeWorkers++;

    try {
      // 执行任务函数。任务函数可以返回一个 Promise 或一个同步值。
      const result = task();
      // 将任务的返回值包装成 Promise (如果它不是 Promise)，并处理其结果。
      // 无论任务成功或失败，最后都会调用 _cleanup 方法。
      Promise.resolve(result)
        .then(resolve) // 任务成功，解决外部 Promise
        .catch(reject) // 任务失败，拒绝外部 Promise
        .finally(() => this._cleanup()); // 无论成功失败，都执行清理
    } catch (err) {
      // 捕获任务函数在同步执行时抛出的错误，并拒绝外部 Promise
      reject(err);
      // 清理资源，因为同步错误也算作任务完成
      this._cleanup();
    }
  }

  /**
   * @private
   * 内部方法，用于在任务完成（无论成功或失败）后进行清理工作。
   * 减少活跃工作者计数，并尝试处理队列中的下一个任务。
   */
  _cleanup() {
    // 减少当前正在执行的任务数量
    this.activeWorkers--;
    // 任务完成，检查并处理队列中的下一个任务
    this._processNextTask();
  }

  /**
   * 等待任务池中所有任务完成 (包括队列中的任务和正在执行的任务)。
   * 通过轮询检查活跃任务数和任务队列长度，直到它们都为 0。
   * @returns {Promise<void>} 一个 Promise，当所有任务都已完成时解决。
   * @example
   * async function runTasks() {
   *   const pool = new Pool(2);
   *   for (let i = 1; i <= 5; i++) {
   *     pool.addTask(() => new Promise(res => setTimeout(() => {
   *       console.log(`Task ${i} done`);
   *       res();
   *     }, 500 * i)));
   *   }
   *   console.log('All tasks added, waiting for drain...');
   *   await pool.drain();
   *   console.log('All tasks completed!');
   * }
   * runTasks();
   */
  async drain() {
    // 循环等待，直到所有任务（包括正在执行的和队列中的）都已完成
    while (this.activeWorkers > 0 || this.taskQueue.length > 0) {
      // 每隔一段时间检查一次，避免过度占用 CPU
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

// 示例用法：创建任务池并添加任务
// const taskPoolInstance = new Pool(3); // 最多同时执行 3 个任务

// for (let i = 1; i <= 10; i++) {
//   taskPoolInstance.addTask(() => {
//     return new Promise((resolve) => {
//       const delay = Math.random() * 1000 + 100; // 随机延迟 100ms 到 1100ms
//       setTimeout(() => {
//         console.log(`任务 ${i} 完成，耗时 ${delay.toFixed(0)}ms`);
//         resolve(`任务 ${i} 的结果`);
//       }, delay);
//     });
//   })
//   .then(result => {
//     // console.log(`任务 ${i} 外部处理: ${result}`);
//   })
//   .catch(error => {
//     console.error(`任务 ${i} 失败:`, error);
//   });
// }

// // 等待所有任务完成
// taskPoolInstance.drain().then(() => {
//   console.log('所有任务都已完成！');
// });
