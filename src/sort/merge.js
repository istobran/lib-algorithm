/**
 * 归并排序
 * 1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
 * 2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
 * 3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
 * 4. 重复步骤3直到某一指针到达序列尾
 * 5. 将另一序列剩下的所有元素直接复制到合并序列尾
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * 算法稳定性：稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function mergeSort(arr, order = "ASC") {
  var merge = function(left, right) {   // 归并函数
    var result = [];
    while (left.length && right.length) {     // 直到 left 或 right 中任意一个为空数组为止
      if (order === "ASC") {    // 升序
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
      } else {      // 降序
        result.push(left[0] >= right[0] ? left.shift() : right.shift());
      }
    }
    return result.concat(left.concat(right));   // 返回合并后的数组
  }
  if (arr.length < 2) {     // 数组长度为 1 时，直接返回
    return arr;
  }
  var mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid), order), mergeSort(arr.slice(mid), order));
}

export {
  mergeSort
}