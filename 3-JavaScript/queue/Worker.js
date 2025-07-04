// Node.js 线程池实现 (Node.js Thread Pool Implementation)

/**
 * 本文件实现了基于 Node.js `worker_threads` 模块的线程池（Thread Pool）。
 * 线程池用于管理和复用工作线程 (Worker Threads)，从而高效地执行 CPU 密集型任务，
 * 避免主线程阻塞，提高应用程序的响应性。
 *
 * 重要提示：此线程池需要一个名为 `worker-script.js` 的文件，该文件将作为工作线程的入口点。
 * `worker-script.js` 应包含处理 `workerData` 和使用 `parentPort.postMessage` 返回结果的逻辑。
 */

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const os = require("os");

/**
 * `ThreadPool` 类用于管理一组工作线程，以并行执行任务。
 * 它控制最大并发工作者数量，并将任务排队等待执行。
 */
class ThreadPool {
  /**
   * 构造函数，初始化线程池。
   * @param {number} [maxWorkers=os.cpus().length] - 最大并行工作线程数。默认为 CPU 核心数。
   */
  constructor(maxWorkers = os.cpus().length) {
    /**
     * @private
     * @type {number} 最大并行工作线程数量。
     */
    this.maxWorkers = maxWorkers;
    /**
     * @private
     * @type {Array<Object>} 待处理的任务队列。
     * 每个任务对象包含：`taskData` (传递给 Worker 的数据), `resolve` (任务成功时调用的 Promise resolve 函数), `reject` (任务失败时调用的 Promise reject 函数)。
     */
    this.taskQueue = [];
    /**
     * @private
     * @type {number} 当前正在活跃（执行任务）的工作线程数量。
     */
    this.activeWorkers = 0;
  }

  /**
   * 向线程池添加一个新任务。
   * 任务将被加入队列，并在有空闲工作线程时自动开始执行。
   *
   * @param {any} taskData - 要传递给工作线程的任务数据。此数据将通过 `workerData` 属性在工作线程中可用。
   * @returns {Promise<any>} 一个 Promise，当任务在工作线程中完成时以其结果解析，或当工作线程失败时以其错误拒绝。
   * @example
   * // 假设 worker-script.js 简单地返回 workerData
   * // import { parentPort, workerData } from 'worker_threads';
   * // parentPort.postMessage(workerData);
   *
   * async function runExample() {
   *   const pool = new ThreadPool(2); // 最多同时运行 2 个工作线程
   *   const results = await Promise.all([
   *     pool.addTask('data1'),
   *     pool.addTask('data2'),
   *     pool.addTask('data3'),
   *   ]);
   *   console.log('所有任务完成:', results);
   *   // 预期输出: 所有任务完成: ['data1', 'data2', 'data3'] (顺序可能因任务完成时间而异)
   *   await pool.drain(); // 等待所有 worker 终止
   * }
   * runExample().catch(console.error);
   */
  addTask(taskData) {
    return new Promise((resolve, reject) => {
      // 将任务的数据和其对应的 Promise 的 resolve/reject 函数加入队列
      this.taskQueue.push({ taskData, resolve, reject });
      // 尝试处理队列中的下一个任务
      this._processNextTask();
    });
  }

  /**
   * @private
   * 内部方法：负责从任务队列中取出任务并创建工作线程执行。
   * 仅当未达到最大并行工作者数量且任务队列不为空时才会创建新工作线程。
   * 每个工作线程创建后，会监听其消息、错误和退出事件。
   */
  _processNextTask() {
    // 如果当前活跃工作者数量已达到上限，或者任务队列已空，则停止处理。
    if (this.activeWorkers >= this.maxWorkers || this.taskQueue.length === 0) return;

    // 从队列中移除并获取下一个待处理任务
    const { taskData, resolve, reject } = this.taskQueue.shift();
    this.activeWorkers++; // 增加活跃工作者计数

    // 创建一个新的 Worker 线程。
    // `./worker-script.js` 是工作线程的入口文件，`workerData` 是传递给 Worker 的数据。
    const worker = new Worker("./worker-script.js", { workerData: taskData });

    // 监听 Worker 线程发送的 'message' 事件。
    // 当工作线程通过 `parentPort.postMessage()` 发送数据时触发，表示任务成功完成。
    worker.on("message", (result) => {
      resolve(result); // 解决外部 Promise，传递任务结果
      this._cleanupWorker(worker); // 清理当前 Worker 线程并尝试处理下一个任务
    });

    // 监听 Worker 线程发送的 'error' 事件。
    // 当工作线程内部发生未捕获的异常时触发。
    worker.on("error", (err) => {
      reject(err); // 拒绝外部 Promise，传递错误信息
      this._cleanupWorker(worker); // 清理当前 Worker 线程
    });

    // 监听 Worker 线程的 'exit' 事件。
    // 当工作线程退出时触发。`code` 为 0 表示正常退出，非 0 表示异常退出。
    worker.on("exit", (code) => {
      if (code !== 0) {
        // 如果 Worker 非正常退出，且之前没有通过 'error' 事件拒绝 Promise，则拒绝 Promise。
        // 避免重复拒绝，因为 'error' 也会触发 'exit'。
        if (!worker.__handledError) { // 使用一个内部标记防止双重拒绝
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      }
      this._cleanupWorker(worker); // 清理当前 Worker 线程
    });
  }

  /**
   * @private
   * 内部方法：清理工作线程资源，并触发队列中下一个任务的处理。
   * @param {Worker} worker - 要终止并清理的 Worker 实例。
   */
  _cleanupWorker(worker) {
    // 标记 Worker 已处理过错误，避免在 exit 事件中重复拒绝 Promise。
    if (this.activeWorkers > 0) {
      this.activeWorkers--; // 减少活跃工作者计数
    }
    worker.terminate(); // 终止工作线程，释放系统资源
    this._processNextTask(); // 尝试处理队列中的下一个任务
  }

  /**
   * 等待线程池中所有任务完成 (包括队列中的任务和正在执行的任务)。
   * 通过轮询检查活跃工作者数量和任务队列长度，直到它们都为 0。
   * 这对于确保所有任务在程序退出前完成非常有用。
   * @returns {Promise<void>} 一个 Promise，当所有任务都已完成且池空闲时解决。
   */
  async drain() {
    // 循环等待，直到所有任务（包括正在执行的和队列中的）都已完成
    while (this.activeWorkers > 0 || this.taskQueue.length > 0) {
      // 每隔一段时间检查一次，避免过度占用 CPU
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}

// 导出 ThreadPool 类，使其可以在其他模块中使用
module.exports = { ThreadPool };

/*
// 示例用法：
async function runThreadPoolExample() {
  // 创建线程池（默认使用 CPU 核心数，例如 4 核 CPU 会创建 4 个 Worker）
  const pool = new ThreadPool(os.cpus().length > 1 ? os.cpus().length - 1 : 1); // 留一个核心给主线程

  console.log(`线程池已启动，最大并发数: ${pool.maxWorkers}`);

  // 定义一个模拟任务函数，实际中这会在 worker-script.js 中执行
  // worker-script.js 示例内容 (假设处理数字并返回平方):
  // const { parentPort, workerData } = require('worker_threads');
  // const num = workerData;
  // const result = num * num;
  // parentPort.postMessage(result);

  // 添加 10 个任务到线程池
  const tasks = Array.from({ length: 10 }, (_, i) => i + 1); // 任务数据 1 到 10
  const promises = tasks.map((taskData) => {
    console.log(`添加任务: ${taskData}`);
    return pool.addTask(taskData);
  });

  console.log('所有任务已添加到队列，等待完成...');

  try {
    // 等待所有任务完成并获取结果
    const results = await Promise.all(promises);
    console.log('所有任务完成，结果:', results);
  } catch (error) {
    console.error('有任务失败:', error);
  }

  // 确保所有 worker 都已终止
  await pool.drain();
  console.log('线程池已清空并关闭所有 Worker。');
}

// 调用示例函数
// runThreadPoolExample().catch(console.error);
*/
