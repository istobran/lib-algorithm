// 入口文件
void function(global) {
  var AgFactory = global.AgFactory = Object.create();
  const SEARCH = Symbol()
  const SORT = Symbol()
  Object.defineProperty(AgFactory, 'SEARCH', { value: SEARCH,  writable: false });
  Object.defineProperty(AgFactory, 'SORT', { value: SORT,  writable: false });
  AgFactory.prototype.createAg = function(type, name) {
    if (typeof type !== typeof Symbol()) {
      throw "type is invalid!"
    }
    switch (type) {
      case SEARCH: break;
      case SORT: break;
    }
  }
}(window)

// 查找算法
// 排序算法
// 线性表
// 动态规划问题