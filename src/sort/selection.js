// 选择排序

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
 * @param {Number} order 升序/降序
 * @return {Array}
 */
function straightSelectionSort(arr, order="ASC") {
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

export default {
  straightSelectionSort,
}