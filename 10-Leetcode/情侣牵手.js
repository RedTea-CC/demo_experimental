/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {

    let count = 0, index = 0

    for (let i = 0; i < row.length - 1; i += 2) {
        // 偶数 
        if (row[i] % 2 == 0 || i==0) {
            if (row[i + 1] == row[i] + 1) {
                // 不用交换位置
                continue;
            }
            // 交换位置
            index = row.indexOf(row[i] + 1);
            [row[index],row[i+1]] = [row[i+1],row[index]];
        } else {
            // 奇数   
            if (row[i + 1] == row[i] - 1) {
                continue;
            }
            index = row.indexOf(row[i] - 1);
            [row[index],row[i+1]] = [row[i+1],row[index]];
            count++
        }
    }

    return count
};

// 测试用例
let row = [0,2,1,3]
// let row = [5, 6, 3, 0, 1, 2, 4, 7]
//    5,4,3,0,1 2 6 7
//     5  4 3 2 1 0 6 7   
let result = 1
console.log('输入：', minSwapsCouples(row), "预期结果:", result)


