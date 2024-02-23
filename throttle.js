function throttle(func, wait) {
    var previous = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (now - previous >= wait) {
            func.apply(this, args);
            previous = now;
        }
    };
}
// 定义一个带参数的函数，用于测试 throttle 函数
function greet(name) {
    console.log("Hello, ".concat(name, "!"));
}
// 使用 throttle 函数创建一个受节流控制的函数
var throttledGreet = throttle(greet, 1000);
// 多次调用受节流控制的函数，在每次调用之后至少间隔 1000 毫秒
throttledGreet('Alice'); // 输出 "Hello, Alice!"
throttledGreet('Bob'); // （1 秒后）输出 "Hello, Bob!"
throttledGreet('Charlie'); // （1 秒后）输出 "Hello, Charlie!"
