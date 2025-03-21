Promise.resolve()
  .then(() => {
    console.log(0);
    // resolve静态方法value不是promise，new MyPromise((resolve) => { resolve(value);});
    return Promise.resolve(4);
    // 先判断返回值是否Promise，是的话：result.then(resolve, reject);内部机制会调用该Promise的.then()方法来将其结果传递到新的Promise上，从而实现链式调用和状态传递。
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })

  // [0,1,Promise.resolve(4),2,解析Promise.resolve(4),3,4,5]