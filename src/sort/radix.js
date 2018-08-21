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
  let mirror = arr.slice(0);      // 复制一份一模一样的数组
  const max = Math.max(...mirror);   // 寻找最大值，确定位数
  let digit = `${max}`.length;  // 最大值的位数
  for (let start = 10, buckets = []; digit > 0; buckets = [], digit--, start *= 10) {   // 对每一位都进行分配和收集过程
    for (let i = 0; i < mirror.length; i++) {    // 进行一趟分配
      const index = mirror[i] % start;
      if (!buckets[index]) buckets[index] = [];
      buckets[index].push(mirror[i]);
    }
    mirror.splice(0, mirror.length);
    if (order === "ASC") {   // 进行一趟收集，升序
      mirror = Array.prototype.concat.apply(mirror, buckets).filter(v => !isNaN(Number(v)));    // 防止 0 被过滤
    } else {  // 进行一趟收集，降序
      for (let i = buckets.length - 1; i >= 0; i--) {
        while(Array.isArray(buckets[i]) && buckets[i].length) {    // 倒序插入值
          mirror.push(buckets[i].pop());
        }
      }
    }
  }
  arr.splice(0, arr.length, ...mirror);
  return arr;
}

export {
  radixSort
}