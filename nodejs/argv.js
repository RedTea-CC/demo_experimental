const fs = require('fs')
const path = require('path')

// 参数
console.log(`参数`,process.argv);
// splice 从第三个开始截取 会改变原数组
let arguments = process.argv.splice(2)
console.log(`参数 ${arguments}`,process.argv.splice(2));


// let arguments2 = process.argv.slice(2)
// console.log(`参数2 ${arguments2}`,process.argv);
let [watchStr, app, pkg] = arguments