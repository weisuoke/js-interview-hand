Function.prototype.call2 = function(context) {
  var context = context || window;
  // 首先要获取调用 call 的函数，用 this 可以获取。 fn.call(obj) => fn就是this. fn中的this就指向了obj
  context.fn = this;
  // 获取第二个参数
  var args = [];
  for (var i = i, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // 执行调用call的那个函数
  eval('context.fn(' + args + ')')
  // 从对象上把 fn 删除，因为 fn 是第一行代码加上的
  delete context.fn;
}