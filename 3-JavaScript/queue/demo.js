const { Worker } = require("worker_threads");
const os = require("os");

class ThreadPool {
  constructor(maxWorkers = os.cpus().length) {
    this.maxWorkers = maxWorkers; // 最大并行Worker数量
    this.taskQueue = []; // 待处理任务队列
    this.activeWorkers = 0; // 当前活跃Worker数量
  }

  /**
   * 添加任务到线程池
   * @param {*} taskData 任务数据（传递给Worker的数据）
   * @returns {Promise} 任务完成后的结果Promise
   */
  addTask(taskData) {
    return new Promise((resolve, reject) => {
      // 将任务加入队列
      this.taskQueue.push({ taskData, resolve, reject });
      // 尝试触发任务处理
      this._processNextTask();
    });
  }

  /**
   * 内部方法：处理下一个任务
   */
  _processNextTask() {
    // 达到最大并行数或队列为空时停止
    if (this.activeWorkers >= this.maxWorkers || this.taskQueue.length === 0) return;

    // 取出队列中的任务
    const { taskData, resolve, reject } = this.taskQueue.shift();
    this.activeWorkers++;

    // 创建Worker并执行任务
    const worker = new Worker("./worker-script.js", { workerData: taskData });

    // 监听Worker消息（任务完成）
    worker.on("message", (result) => {
      resolve(result);
      this._cleanupWorker(worker);
    });

    // 监听错误
    worker.on("error", (err) => {
      reject(err);
      this._cleanupWorker(worker);
    });

    // 监听退出事件
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
      this._cleanupWorker(worker);
    });
  }

  /**
   * 清理Worker并触发下一个任务
   * @param {Worker} worker 要终止的Worker实例
   */
  _cleanupWorker(worker) {
    worker.terminate(); // 终止Worker
    this.activeWorkers--;
    this._processNextTask(); // 继续处理下一个任务
  }

  /**
   * 等待所有任务完成（可选扩展）
   */
  async drain() {
    while (this.activeWorkers > 0 || this.taskQueue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

// 使用示例
async function main() {
  // 创建线程池（默认使用CPU核心数）
  const pool = new ThreadPool();

  // 添加100个任务
  const tasks = Array.from({ length: 100 }, (_, i) => i);
  const promises = tasks.map((task) => pool.addTask(task));

  // 等待所有任务完成
  const results = await Promise.all(promises);
  console.log("All tasks completed:", results);

  // 或者使用drain方法
  // await pool.drain();
}

main().catch(console.error);
