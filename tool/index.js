/**
 * kb转换为KB MG GB TB PB
 * @param {number} kb - 输入的千字节数
 * @returns {string} - 格式化后的大小字符串
 */
function formatSizeUnits(kb) {
  if (kb === 0) return "0 KB";

  const units = ["KB", "MB", "GB", "TB", "PB"];
  const base = 1024;
  let size = Math.abs(kb);
  let unitIndex = 0;

  while (size >= base && unitIndex < units.length - 1) {
    size /= base;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

console.log(formatSizeUnits(10000))