/**
 * 二分查找
 * - 二分查找法依赖于有序数组
 * - 所以二分查找法在查找前必须先排序
 * @param {Number}  target  要查找的目标
 * @return {Number}  返回查找到的 Index（-1为找不到）
 */
function binarySearch(target) {
  var low = 0, high = this.length - 1;      // 查找范围的上下界
  while (low <= high) {     // 这里必须是 <= 而不是 <，因为可能会漏掉边界值
    let mid = Math.floor((low + high) / 2);
    if (this[mid] === target) {
      return mid;
    } else if (this[mid] < target) {      // 在后半段
      low = mid + 1;
    } else {    // 在前半段
      high = mid - 1;
    }
  }
  return -1;      // 循环完了还没触发 return，说明找不到
}
Array.prototype.binarySearch = binarySearch;

var arr = [11, 22, 33, 44, 55, 66, 77, 88, 99, 111];
console.log(arr.binarySearch(99));