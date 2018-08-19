// 基数排序

/**
 * 基数排序
 * 时间复杂度：O(d(n+rd))
 * 空间复杂度：O(n)
 * 算法稳定性：稳定
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function radixSort(arr, order = "ASC") {
  const max = Math.max(...arr);   // 寻找最大值，确定位数
  let digit = `${max}`.length;  // 最大值的位数
  for (let start = 10, buckets = []; digit > 0; buckets = [], digit--, start *= 10) {   // 对每一位都进行分配和收集过程
    for (let i = 0; i < arr.length; i++) {    // 进行一趟分配
      const index = arr[i] % start;
      if (!buckets[index]) buckets[index] = [];
      buckets[index].push(arr[i]);
    }
    arr.splice(0, arr.length);    // 清空arr
    arr = Array.prototype.concat.apply(arr, buckets).filter(Number);   // 进行一趟收集
    // for (let i = 0; i < buckets.length; i++) {   // 进行一趟收集
    //   if (buckets[i]) arr = arr.concat(buckets[i]);
    // }
  }
  return arr;
}

const arr = [1, 10, 100, 1000, 98, 67, 3, 28, 67, 888, 777]
console.log(radixSort(arr))