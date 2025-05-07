class TaskQueue {
  // 私有字段
  #queue = [];
  #runningCount = 0;
  #maxConcurrent = 5;

  add(task) {
    // 将任务添加到队列中
    this.#queue.push(task);
    // 执行下一个任务
    this.#next();
  }

  // 私有方法
  #next() {
    // 如果当前正在执行的任务数量小于最大并发数，并且队列中有任务，则执行下一个任务
    while (this.#runningCount < this.#maxConcurrent && this.#queue.length > 0) {
      // 取出队列中的第一个任务
      const task = this.#queue.shift();
      // 执行任务
      task().then(() => {
        // 任务执行完成后，将正在执行的任务数量减1
        this.#runningCount--;
        // 执行下一个任务
        this.#next();
      });
      // 将正在执行的任务数量加1
      this.#runningCount++;
    }
  }
}

// 创建实例
const taskQueue = new TaskQueue();

// 添加任务
for (let i = 1; i <= 10; i++) {
  taskQueue.add(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${i} completed`);
        resolve();
      }, Math.random() * 1000);
    });
  });
}
