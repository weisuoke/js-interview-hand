const PENDING = 'PENDING';  // 等待态
const FULFILLED = 'FULLFILLED';  // 成功态
const REJECT = 'REJECT';  // 失败态

function resolvePromise(x, promise2, resolve, reject) {
  if (x === promise2) {
    // 为什么要报这个错误？promise2 会一直处于 pending 状态，就卡死了
    return reject(new TypeError('循环引用'));
  }

  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    let called;
    try {
      let then = x.then;  // 尝试取 then 方法
      if (typeof then === 'function') {
        then.call(x, (y) => { // y 有可能还是一个 promise, 所以要再次进行解析流程
          if (called) return;
          called = true;
          resolvePromise(y, promise2, resolve, reject);
        }, (r) => {
          if (called) return
          called = true;
          reject(r)
        })
      } else {
        if (called) return;
        called = true;
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    // x 是一个普通值
    resolve(x)
  }

  // 如果 x 是一个普通值则直接调用 resolve 即可；

  // 如果 x 是一个promise 那么应该采用这个 promise 的状态决定调用的是 resolve 还是 reject
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject);  // 默认 new Promise 中的函数会立即执行
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
    // 每次调用 then 方法，都必须返回一个全新的 promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // NOTE: x 就是上一个 then 成功或失败的返回值，这个 x 决定 promise2 走成功还是走失败
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECT) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = []
    let index = 0;

    function process(v, k) {
      result[k] = v;
      if (++index === promises.length) {  // 解决多个异步并发问题，只能用计数器
        resolve(result)
      }
    }

    for(let i = 0; i < promises.length; i++) {
      let p = promises[i];
      if (p && typeof p.then === 'function') {
        p.then(data => {
          process(data, i)
        }, reject)  // 如果有一个 promise 失败了，那么就执行最后的失败的逻辑
      } else {
        process(p, i)
      }
    }
  })
}

module.exports = Promise