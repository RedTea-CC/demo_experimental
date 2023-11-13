/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {

    intervals.sort((a, b) => a[1] - b[1])
    let count = 0
    let prev = 0
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[prev][1] > intervals[i][0]) {
            count++
        } else {
            prev = i
        }
    }
    return count
};

// 测试用例
let intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
console.log('结果', eraseOverlapIntervals(intervals))
