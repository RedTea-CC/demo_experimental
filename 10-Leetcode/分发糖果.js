/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
    let candy = new Array(ratings.length).fill(1)

    // 从左往右
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candy[i] = candy[i - 1] + 1
        }
    }

    // 从右往左
    for (let i = ratings.length - 2; i < ratings.length; i--) {
        
    }

    return candy.reduce((a, b) => a + b)
};

ratings = [1, 0, 2];
console.log("candy:", candy(ratings));