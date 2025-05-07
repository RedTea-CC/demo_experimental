export class Pool {
  /**
   * 任务池类，用于管理任务的并行执行，控制同时执行的任务数量。
   */
  /**
   * 构造函数，初始化任务池。
   * @param {number} [maxWorkers=3] - 最大并行任务数。
   */
  constructor(maxWorkers = 3) {
    // 最大并行任务数
    this.maxWorkers = maxWorkers;
    // 待执行的任务队列
    this.taskQueue = [];
    // 当前正在执行的任务数量
    this.activeWorkers = 0;
  }

  /**
   * 向任务池添加一个新任务。
   * @param {Function} task - 要执行的任务函数。
   * @returns {Promise} - 一个 Promise，当任务完成或失败时解析。
   */
  addTask(task) {
    return new Promise((resolve, reject) => {
      // 将任务及其回调添加到队列中
      this.taskQueue.push({ task, resolve, reject });
      // 尝试处理下一个任务
      this._processNextTask();
    });
  }

  /**
   * 内部方法，处理队列中的下一个任务。
   */
  _processNextTask() {
    // 如果达到最大并行任务数或队列为空，则不处理
    if (this.activeWorkers >= this.maxWorkers || this.taskQueue.length === 0) return;

    // 从队列中取出一个任务
    const { task, resolve, reject } = this.taskQueue.shift();
    // 增加活跃任务数
    this.activeWorkers++;

    try {
      // 执行任务
      const result = task();
      // 确保任务结果是一个 Promise，并处理结果
      Promise.resolve(result)
        .then(resolve)
        .catch(reject)
        .finally(() => this._cleanup());
    } catch (err) {
      // 捕获同步错误并拒绝 Promise
      reject(err);
      // 清理资源
      this._cleanup();
    }
  }

  /**
   * 内部方法，清理资源并尝试处理下一个任务。
   */
  _cleanup() {
    // 减少活跃任务数
    this.activeWorkers--;
    // 尝试处理下一个任务
    this._processNextTask();
  }

  /**
   * 等待所有任务完成。
   */
  async drain() {
    // 循环等待，直到所有任务完成
    while (this.activeWorkers > 0 || this.taskQueue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

// 创建实例
const taskQueue = new Pool();

// 添加任务
for (let i = 1; i <= 10; i++) {
  taskQueue.addTask(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = `Task ${i} result`;
        // console.log(`${result} completed`);
        resolve(result);
      }, Math.random() * 1000);
    }).then((result) => {
      console.log(`Task ${i} result: ${result}`);
    });
  });
}
