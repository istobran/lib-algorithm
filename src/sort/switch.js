// 交换排序

/**
 * 对数组内两个数进行交换
 * @param {Number} a 待交换下标1
 * @param {Number} b 待交换下标2
 */
function swap(a, b) {
  var tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
}

/**
 * 冒泡排序
 * 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 * 3. 针对所有的元素重复以上的步骤，除了最后一个。
 * 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 空间复杂度：O(1)
 * 时间复杂度：O(n^2)
 * 算法稳定性：稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function bubbleSort(arr, order = "ASC") {
  var i, j, flag = true;      // flag 用于表示该趟排序是否发生了交换，若未发生交换则说明数组已有序
  for (i = 1; i < arr.length && flag; i++) {      // flag为true时表示有交换，则再进行排序，否则终止循环
    flag = false;
    for (j = 0; j < arr.length - i; j++) {
      if (order === "ASC" && arr[j] > arr[j+1]) {
        swap.call(arr, j, j+1);
        flag = true;
      }
      if (order === "DESC" && arr[j] < arr[j+1]) {
        swap.call(arr, j, j+1);
        flag = true;
      }
    }
  }
  return arr;
}

/**
 * 快速排序单次划分支点
 * @param {Number} low      index 下限
 * @param {Number} high     index 上限
 * @return {Number}
 */
function partition(low, high) {
  var pivot = this[low];
  while (low < high) {    // low === high 时说明找到支点，中断循环
    while (low < high && pivot < this[high]) high--; // 找一个比 pivot 小的数
    if (low < high) {
      this[low] = this[high]
      low++;
    }
    while (low < high && pivot > this[low]) low++;    // 找一个比 pivot 大的数
    if (low < high) {
      this[high] = this[low];
      high--;
    }
  }
  this[low] = pivot;      // 支点
  return low;
}

/**
 * 对子表 arr[low...high] 进行快速排序
 * @param {Number} low      index 下限
 * @param {Number} high     index 上限
 */
function qSplit(low, high) {
  if (low < high) {
    var pivotIndex = partition.call(this, low, high);
    qSplit.call(this, low, pivotIndex - 1);
    qSplit.call(this, pivotIndex + 1, high);
  }
  return this;
}

// quickSort(arr, order = "ASC") {     // 类似 java 的写法
//   return qSplit.call(arr, 0, arr.length - 1);
// }

/**
 * 快速排序
 * 采用分治策略将原问题拆分成若干个更小的子问题，各个子问题通过递归调用自身去解决，再将子问题的解组合起来形成原问题的解
 * 空间复杂度：平均 O(logn)
 * 时间复杂度：平均 O(nlogn)
 * 算法稳定性：不稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function quickSort(arr, order = "ASC") {
  const len = arr.length;
  if (len < 2) return arr;
  const pivot = arr[0], left = [], right = [];
  for(let i = 1; i < len; i++) {
    const iv = arr[i];
    if (order === "ASC") {
      iv >= pivot && right.push(iv); // to avoid repeatly element.
      iv < pivot && left.push(iv);
    }
    if (order === "DESC") {
      iv <= pivot && right.push(iv); // to avoid repeatly element.
      iv > pivot && left.push(iv);
    }
  }
  return quickSort(left, order).concat(pivot, quickSort(right, order));
}

export default {
  bubbleSort,
  quickSort
}