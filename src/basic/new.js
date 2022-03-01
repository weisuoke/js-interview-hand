// new 就是创建一个新对象

function objectFactory() {
  // 创建一个空的对象
  let obj = new Object();
  // 获取构造函数：取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数。
  let Constructor = [].shift.call(arguments);
  // 设置空对象的原型
  obj.__proto__ = Constructor.prototype;
  // 绑定 `this` 并执行构造函数
  let ret = Constructor.apply(obj, arguments);
  // 确保返回值是对象
  return typeof ret === 'object' ? ret : obj;
}