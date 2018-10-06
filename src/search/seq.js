/**
 * 顺序查找
 * @param {Number} target 要查找的目标
 * @return {Number}   返回查找到的 Index（-1为找不到）
 */
function seqSearch(target) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === target) return i;
  }
  return -1;
}
Array.prototype.seqSearch = seqSearch;

// 查找方法：返回第一个匹配的元素
var arr = [1, 5, 6, 7, 5, 4, 7, 7433, 3, 453, 45, 2341, 3, 1556, 4, 756, 86, 78, 3452];
console.log(arr.seqSearch(3));