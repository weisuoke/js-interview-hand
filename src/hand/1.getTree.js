/*
  应用场景：
  1. 管理后台侧边栏，展平数组转成树形结构
 */

// 源数组
let arr = [
  { id: 1, content: 'A', pid: 0 },
  { id: 2, content: 'B', pid: 1 },
  { id: 3, content: 'C', pid: 1 },
  { id: 4, content: 'D', pid: 2 }
]

// 输出数组
let arr2 = [
  {
    id: 1,
    content: 'A',
    pid: 0,
    children: [
      { id: 2, content: 'B', pid: 1, children: { id: 4, content: 'D', pid: 2 } },
      { id: 3, content: 'C', pid: 1 },
    ]
  }
]

// 实现方法
function listToTree(list) {
  var map = {}, node, tree = [], i;

  for (i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
    list[i].children = [];
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pid !== 0) {
      map[node.pid].children.push(node)
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// 实现方法2，递归，这种实现方式属于 DFS
function listToTreeWithLevel(list, parent, level) {
  var out = [];
  for (var node of list) {
    if (node.pid === parent) {
      var children = listToTreeWithLevel(list, node.id, level + 1)
      if (children.length) {
        node.children = children
      }
      out.push(node)
    }
  }

  return out;
}

// console.log(JSON.stringify(listToTreeWithLevel(arr, 0, 0)))

// 参考阅读：https://segmentfault.com/a/1190000017214328