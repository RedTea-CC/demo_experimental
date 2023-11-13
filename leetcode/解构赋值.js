
/* 解构赋值语句前后必须有; 否则解释器执行报错 */
// let a = 1;
// let b =2;
// console.log('前',a,b)
// [a,b] = [b,a]
// console.log('后',a,b)

/* 正确写法 */
let a = 1, b = 2;
console.log('前', a, b);
[a,b] = [b,a];
console.log('后', a, b);
