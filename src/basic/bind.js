/*
  bind的特性
  1. 传递的第一个参数作为调用它的函数的 this 指向
    - 如果第一个参数传递的是基础数据类型，则调用他的函数的this指向该基础类型的包装类实例化对象
    - 若第一个参数为null或undefined，则调用它的函数的this指向window
  2. bind的第二个之后的参数为调用它的幻术的参数列表。
  3. bind方法会返回一个新的方法，并且该方法满足柯里化，仍可以传递参数，但这个方法的 this 不可被 call、apply、bind 改变
  4. bind方法返回的新方法，如果使用 new 实例化，那么原本通过 bind 绑定的 this 指向的对象会失效，this将指向到新实例化的对象上，且可以使用原方法原型链上的属性或方法
 */

/**
 * slice
 *  - 从已有的数组中返回选定的元素
 *  - 可提取字符串的某个部分，并以新的字符串返回被提取的部分
 * splice
 *  - 添加或删除数组中的元素，会影响原数组
 */

Function.prototype.bind2 = function(context) {
  var self = this;  // this 是一个函数 fn.bind(obj) fn 就是这里的 this
  // NOTE: 这里是要获取从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);  // 这里是一个数组

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this，指向该实例上，可以让实例获得来自绑定函数的值
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  fBound.prototype = this.prototype;
  return fBound
}

const obj = {
  name: '我是obj'
}

function sayHello(age, sex, hobby) {
  this.hobby = hobby;
  console.log('我的this指向：', this);
  console.log(`Hello, ${this.name}, age: ${age}, sex: ${sex}, hobby: ${hobby}`);
}

sayHello.prototype.father = '我爸是Function'
const fun = sayHello.bind(obj, 32, 'male')

// fun(18, 'female', 'bike')
// console.log('🆚', fun.father)

const f = new fun('female')
console.log('🆚2', f.father)
