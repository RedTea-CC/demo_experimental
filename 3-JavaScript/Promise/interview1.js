let a = 2;
const p = new Promise((resolve, reject) => {
  console.log("promise start");
  setTimeout(() => {
    console.log("promise resolved");
    a++;
    resolve("ok");
    console.log("resolved", a);
  }, 0.1);
});

p.then((res) => {
  console.log("promise then");
  a++;
  console.log("then", a);
});
setTimeout(() => {
  console.log("setTimeout");
  console.log(a);
}, 0);

/*
 promise start
 promise resolved
 resolved 3
 promise then
 then 4
 setTimeout
 4 */

//  为什么setTimeout的0.1比0先执行？

// setTimeout曲型延迟范围:在现代浏览器中通常为 1-4ms:根据嵌套层级和执行代码消耗时间有关
// 根据 HTML5 规范，定时器的最小延迟为4ms(当嵌套层级超过5层时)

/*
当两个setTimeout的时间相差很大时，输出如下
promise start
setTimeout
2
promise resolved
resolved 3
promise then
then 4 */
