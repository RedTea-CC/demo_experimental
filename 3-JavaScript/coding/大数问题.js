// 大数问题 (Big Number Operations)

/**
 * 实现大数相加功能，通过字符串模拟加法运算。
 * 该方法适用于任意长度的非负整数字符串相加，克服了 JavaScript Number 类型精度限制。
 *
 * @param {string} num1 - 第一个非负整数的字符串表示。
 * @param {string} num2 - 第二个非负整数的字符串表示。
 * @returns {string} 两个大数相加后的结果字符串。
 * @example
 * console.log(addBigNumbers("123", "456")); // "579"
 * console.log(addBigNumbers("1", "99")); // "100"
 * console.log(addBigNumbers("999", "1")); // "1000"
 * console.log(addBigNumbers("12345678901234567890", "98765432109876543210")); // "111111111022222222100"
 */
function addBigNumbers(num1, num2) {
  // 将数字字符串反转并转换为字符数组，方便从个位开始计算
  const arr1 = num1.split('').reverse();
  const arr2 = num2.split('').reverse();
  const maxLength = Math.max(arr1.length, arr2.length);
  const result = [];
  let carry = 0; // 进位

  for (let i = 0; i < maxLength; i++) {
    const digit1 = i < arr1.length ? parseInt(arr1[i], 10) : 0;
    const digit2 = i < arr2.length ? parseInt(arr2[i], 10) : 0;

    const sum = digit1 + digit2 + carry;
    result.push(sum % 10); // 取和的个位作为当前位结果
    carry = Math.floor(sum / 10); // 计算进位
  }

  // 处理最高位的进位
  if (carry > 0) {
    result.push(carry);
  }

  // 将结果数组反转并连接成字符串
  return result.reverse().join('');
}

/**
 * 使用 JavaScript 内置的 BigInt 类型进行大数相加。
 * BigInt 是 JavaScript 中的一种新数据类型，可以表示任意精度的整数。
 * 适用于需要处理超出 Number 类型安全整数范围的场景。
 *
 * 注意: BigInt 只能处理整数，不能处理小数。
 *
 * @param {string} num1 - 第一个整数的字符串表示（会被转换为 BigInt）。
 * @param {string} num2 - 第二个整数的字符串表示（会被转换为 BigInt）。
 * @returns {string} 两个 BigInt 相加后的结果字符串。
 * @example
 * console.log(addBigInt("123456789012345678901234567890", "1")); // "123456789012345678901234567891"
 * console.log(addBigInt("98765432109876543210", "12345678901234567890")); // "111111111022222222100"
 */
function addBigInt(num1, num2) {
  // 将字符串转换为 BigInt 类型，进行加法运算，然后将结果转回字符串。
  return (BigInt(num1) + BigInt(num2)).toString();
}
