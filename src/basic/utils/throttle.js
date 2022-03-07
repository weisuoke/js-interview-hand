// Throttle 函数写法一： 根据时间戳来判断
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
    var now = +new Date();
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now;
    }
  }
}

// Throttle 函数写法二： 使用定时器
function throttle2(func, wait) {
  let timeout
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(this)
      }, wait)
    }
  }
}