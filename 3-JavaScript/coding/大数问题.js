// 大数问题

/**
 * 实现大数相加
 * @param {string} num1
 * @param {string} num2
 */
function addBigNumbers(num1, num2) {
  const string1 = num1.split("").reverse();
  const string2 = num2.split("").reverse();
  const maxLength = Math.max(string1.length, string2.length);
  const result = [];
  let carry = 0;

  return;
}

// 测试
console.log(addBigNumbers("1234567890", "9876543210")); // '11111111100'

// 使用bigint
function addBigInt(num1, num2) {
  console.log(BigInt(num1));
  console.log(BigInt(num2));
  return (BigInt(num1) + BigInt(num2)).toString();
}

// 测试
console.log(addBigInt("1234567890", "9876543210")); // '11111111100'
