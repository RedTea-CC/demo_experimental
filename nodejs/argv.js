const fs = require('fs')
const path = require('path')

// 参数
console.log(`参数`,process.argv);
let arguments = process.argv.splice(2)
console.log(`参数 ${arguments}`,process.argv.splice(2));


// let arguments2 = process.argv.slice(2)
// console.log(`参数2 ${arguments2}`,process.argv);
let [watchStr, app, pkg] = arguments