## Promise 说明

### 流程说明

1. `new Promise`时，需要传递一个 `executor` 执行器，执行器立即执行
2. `executor` 接受两个参数，分别是 `resolve` 和 `reject`
3. `promise` 只能从 pending 到 rejected， 或者从 pending 到 fulfilled
4. `promise` 的状态一旦确定，就不会再改变
5. `promise` 都有 `then` 方法，`then` 方法接收两个参数，分别是 promise 成功的回调onFulFilled，和promise失败的回调onRejected
6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
    - 如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
    - 如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
7. then 的参数 onFulfilled 和 onRejected 可以缺省
8. promise 可以then多次，promise 的then 方法返回一个 promise
9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
11. 如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，就走下一个then的成功，如果失败，就走下一个then的失败.