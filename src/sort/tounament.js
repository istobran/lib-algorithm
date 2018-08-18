/**
 * 树节点 TreeNode 类
 */
class TreeNode {
  constructor(data, index, active) {
    this.data = data;   // 二叉树的数据
    this.index = index;   // 起始的叶子节点位置 index
    this.active = active;   // 是否参选
  }
}

/**
 * 比较树中两个数的值谁大谁小
 * @param {Array} tree 待比较二叉树
 * @param {Number} a 左节点下标a
 * @param {Number} b 右节点下标b
 * @param {String} order 升序/降序
 * @return {TreeNode}
 */
function compare(tree, a, b, order) {
  // 比赛对手判空
  if (!tree[a].active || !tree[b].active) {
    if (tree[a].active) {      // a 可参选，a 胜
      return tree[a];
    } else {      // 否则 b 胜
      return tree[b];
    }
  } else {    // 双方都可参选
    // 获取胜者
    if (order === "ASC") {  // 关键字较小者胜
      return tree[a].data <= tree[b].data ? tree[a] : tree[b];
    } else {  // 关键字较大者胜
      return tree[a].data >= tree[b].data ? tree[a] : tree[b];
    }
  }
}

/**
 * 锦标赛排序
 * @param {Array} arr 待排序数组
 * @param {String} order 升序/降序
 * @return {Array}
 */
function tournamentSort(arr, order = "ASC") {
  var leafSize = 1;
  while (leafSize < arr.length) {   // 求出叶子节点的个数
    leafSize *= 2;
  }
  var treeSize = 2 * leafSize - 1;        // 胜者数的所有节点个数
  var leafStart = leafSize - 1;           // 叶子节点存放的起始位置
  var tree = new Array(treeSize);         // 构建满二叉树存放区

  // 把待排序节点复制到胜者树的叶子节点中
  for (let i = leafStart, j = 0; i < tree.length; i++, j++) {
    if (j < arr.length) {
      tree[i] = new TreeNode(arr[j], i, true);      // 节点复制
    } else {
      tree[i] = new TreeNode(null, null, false);      // 空节点填充二叉树
    }
  }

  // 生成胜者树
  for (let i = leafStart; i > 0; i = Math.floor((i-1)/2)) {   // 遍历各层节点
    for (let j = i; j < 2*i; j+=2) {   // 处理各队比赛者
      tree[Math.floor((j-1)/2)] = compare(tree, j, j+1, order);
    }
  }

  // 处理剩余的 n-1 个记录
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = tree[0].data;                // 冠军赋值进数组
    tree[tree[0].index].active = false;   // 设置冠军节点不再参赛
    updateTree(tree, tree[0].index, order);      // 调整胜者树
  }
  arr[arr.length - 1] = tree[0].data;
  return arr;
}

/**
 * 重新计算胜者树
 * @param {Array} tree 胜者树列表
 * @param {Number} idx 前冠军的index
 */
function updateTree(tree, idx, order) {
  var dad = Math.floor((idx-1) / 2);
  if (idx % 2 === 0) {    // idx 为偶数，说明是右节点，则左节点晋升
    tree[dad] = tree[idx-1];
  } else {    // idx 为奇数，说明是左节点，则右节点晋升
    tree[dad] = tree[idx+1];
  }

  // 更新胜者树
  for (let i = dad; i > 0; i = Math.floor((i-1)/2)) {
    var enemy;
    if (i % 2 === 0) {    // i 为偶数，说明是右节点，对手是左节点
      enemy = i - 1;
    } else {    // i 为奇数，说明是左节点，对手是右节点
      enemy = i + 1;
    }
    tree[Math.floor((i-1)/2)] = compare(tree, i, enemy, order);
  }
}