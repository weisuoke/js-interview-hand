class PubSub {
  constructor() {
    // 维护事件及订阅行为
    this.events = {}
  }

  /**
   * 注册事件订阅行为
   * @param type
   * @param cb
   */
  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(cb)
  }

  /**
   * 发布事件
   * @param type 事件类型
   * @param args 参数列表
   */
  publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(...args))
    }
  }

  /**
   * 移除某个事件的一个订阅行为
   * @param type
   * @param cb
   */
  unsubscribe(type, cb) {
    if (this.events[type]) {
      const targetIndex = this.events[type].findIndex(item => item === cb);
      if (targetIndex !== -1) {
        this.events[type].splice(targetIndex, 1);
      }
      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
  }

  /**
   * 移除某个事件的所有订阅行为
   * @param type
   */
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type]
    }
  }
}

let pubsub = new PubSub();
function cb2() {
  console.log('type1 cb2')
}
pubsub.subscribe('type1', () => {
  console.log('type1 cb1')
})
pubsub.subscribe('type1', cb2)

pubsub.publish('type1')

pubsub.unsubscribe('type1', cb2)

pubsub.publish('type1')