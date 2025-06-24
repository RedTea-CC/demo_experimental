// 题目要求：用js实现一个方法在一个数组中去掉一个最高分和一个最低分取其他值的平均值

function averageExcludingMinMax(arr) {
  const length = arr.length;
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (const element of arr) {
    sum += element;
    if (element < min) {
      min = element;
    }
    if (element > max) {
      max = element;
    }
  }
  return (sum - max - min) / (length - 2);
}

// 示例用法
const scores = [80, 90, 70, 100, 60];
const average = averageExcludingMinMax(scores);
console.log(average); // 输出 80
