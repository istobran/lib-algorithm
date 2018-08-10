// 插入排序

export default {
  /**
   * 直接插入排序
   * 1. 从第一个元素开始，该元素可以认为已经被排序
   * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
   * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
   * 4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置
   * 5. 将新元素插入到该位置后
   * 6. 重复步骤 2~5
   * 空间复杂度：O(1)
   * 时间复杂度：O(n^2)
   * 算法稳定性：稳定
   * @param {Array} arr 待排序数组
   * @param {Number} order 升序/降序
   * @return {Array}
   */
  straightInsertionSort(arr, order = "ASC") {
    var i, j, val;
    for (i = 1; i < arr.length; i++) {      // 默认0位元素为有序序列，所以从1开始遍历
      val = arr[i];
      for (j = i - 1; j >= 0; j--) {    // 如果是升序，比 val 大的数需要后移，如果是降序，比 val 小的数需要后移
        if (order === "ASC" && arr[j] <= val) {    // 升序
          break;
        }
        if (order === "DESC" && arr[j] >= val) {    // 降序
          break;
        }
        arr[j+1] = arr[j];
      }
      arr[j+1] = val;
    }
    return arr;
  },
  /**
   * 希尔排序
   * 通过加入缩小增量的概念改进插入排序算法
   * 空间复杂度：O(1)
   * 时间复杂度：O(n*log2(n))
   * 算法稳定性：不稳定，因为在根据子表进行插入排序的过程中，相同记录的顺序有可能会被交换，即 55a 55b 有可能变成 55b 55a
   * @param {Array} arr 待排序数组
   * @param {Number} order 升序/降序
   * @return {Array}
   */
  shellSort(arr, order = "ASC") {
    var i, j, gap, val;
    for (gap = arr.length / 2; gap > 0; gap /= 2) {     // 按照每次缩小两倍的规则动态生成增量
      for (i = 1; gap*i < arr.length; i++) {      // 根据增量遍历子表
        val = arr[gap*i];
        for (j = i - 1; j >= 0; j--) {      // 跟插入排序一样，需要右移数据，只不过仅在子表右移
          if (order === "ASC" && arr[gap*j] <= val) {    // 升序
            break;
          }
          if (order === "DESC" && arr[gap*j] >= val) {    // 降序
            break;
          }
          arr[gap*(j+1)] = arr[gap*j];
        }
        arr[gap*(j+1)] = val;
      }
    }
    return arr;
  }
}