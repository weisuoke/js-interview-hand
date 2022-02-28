// 观察者模式

class Observer {
  constructor(cb) {
    if (typeof cb === 'function') {
      this.cb = cb
    } else {
      throw new Error('Observer 构造器必须传入函数')
    }
  }
  update() {
    this.cb();
  }
}

class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) {
    this.observerList.push(observer)
  }

  notify() {
    this.observerList.forEach(observer => {
      observer.update();
    })
  }
}