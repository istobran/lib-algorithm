// 选择排序
import { tournamentSort } from "./tournament";


/**
 * 直接选择排序
 * 直接选择排序是最直观的也是最容易想出来的排序，但是在性能上存在欠缺
 * 1. 开始时整个线性表为无序表,有序表为空.
 * 2. 将无序表的第一个元素A[0]与其后的每个元素A[i] (i=1,2,3…n)作比较, 若A[0]较大,将A[i]交换.最后得到的第一个元素将是整个线性表中最小的元素.这样有序表元素+1,无序表元素-1;
 * 3. 重复第 2 步,直到无序表长度为0;
 * 空间复杂度：O(1)
 * 时间复杂度：O(n^2)
 * 算法稳定性：不稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function straightSelectionSort(arr, order = "ASC") {
  var i, j, tmp, tmpidx;
  for (i = 0; i < arr.length - 1; i++) {    // 外循环只需执行 n-1 次，因为前面排好后，最后一个数必定有序
    tmpidx = i;
    for (j = i+1; j < arr.length; j++) {
      if (order === "ASC" && arr[tmpidx] > arr[j]) {
        tmpidx = j;
      }
      if (order === "DESC" && arr[tmpidx] < arr[j]) {
        tmpidx = j;
      }
    }
    if (tmpidx !== i) {   // 对找到的最值与当前位置的值进行交换
      tmp = arr[i];
      arr[i] = arr[tmpidx];
      arr[tmpidx] = tmp;
    }
  }
  return arr;
}

/**
 * 堆排序
 * 对锦标赛排序的一种改进，引入了堆的概念，使得空间复杂度得以缩减
 * 堆排序的好处是对于任意一个数组，可以通过下标直接形成堆关系，不需重新构建一个完整二叉树空间
 * 对于任意一个节点，堆有以下性质：
 * 1. 左子节点的位置：(2*i+1)
 * 2. 右子节点的位置：(2*i+2)
 * 3. 父节点所在位置：floor((i-1)/2)
 * 空间复杂度：O(1)
 * 时间复杂度：O(nlogn)
 * 算法稳定性：不稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function heapSort(arr, order = "ASC") {
  /**
   * 对数组内两个数进行交换
   * @param {Number} a 待交换下标1
   * @param {Number} b 待交换下标2
   */
  function swap(a, b) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
  /**
   * 筛选法堆调整
   * 调整区间示意图：[start, end)
   * @param {Number} start 调整下标上界
   * @param {Number} end 调整下标下界
   */
  function sift(start, end) {
    var dad = start, son = start * 2 + 1;
    if (son >= end) return;   // 初次调用过程中不可能发生 son >= end，但递归过程中会发生 son >= end
    if (order === "ASC") {  // 如果要升序，则构建大顶堆
      if (son+1 < end && arr[son+1] > arr[son]) {   // 比较子节点的兄弟节点
        son++;      // 把下标移到兄弟节点位置
      }
      if (arr[son] > arr[dad]) {    // 比较父子节点
        swap(dad, son);
        sift(son, end);     // 对子节点再进行堆调整
      }
    } else if (order === "DESC") {    // 如果要降序，则构建小顶堆
      if (son+1 < end && arr[son+1] < arr[son]) {   // 比较子节点的兄弟节点
        son++;      // 把下标移到兄弟节点位置
      }
      if (arr[son] < arr[dad]) {    // 比较父子节点
        swap(dad, son);
        sift(son, end);     // 对子节点再进行堆调整
      }
    }
  }
  // 自底向上法建立初始堆
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    sift(i, arr.length)
  }
  // 将顶点值与最后值进行交换，再重新调整堆
  for (let i = arr.length - 1; i > 0; i--) {
    swap(0, i);       // 0 是顶点值，i 是有序数组存放点
    sift(0, i);       // 要注意，sift 函数的 end 是开区间，所以这里应该传入 i 而不是 i-1
  }
  return arr;
}

export {
  straightSelectionSort,
  tournamentSort,
  heapSort
}