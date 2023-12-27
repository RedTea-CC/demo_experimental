// path模块
const path = require('path');
//获取路径分隔符
console.log('路径分隔符',path.sep);
//拼接绝对路径
console.log('__dirname',__dirname);
console.log('拼接绝对路径',path.resolve(__dirname, 'test'));
//解析路径
let pathname = 'D:/program file/nodejs/node.exe';
console.log('解析路径',path.parse(pathname));
//获取路径基础名称
console.log('路径基础名称',path.basename(pathname))
//获取路径的目录名
console.log('路径的目录名',path.dirname(pathname));
//获取路径的扩展名
console.log('路径的扩展名',path.extname(pathname));