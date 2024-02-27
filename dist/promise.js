"use strict";
class myTimeout {
    constructor() {
        this._step = 0;
        this._callbackPool = [];
        this._timeoutPool = [];
        this._isRunning = false;
    }
    next(callback, timeout) {
        this._callbackPool.push(callback);
        this._timeoutPool.push(timeout);
        if (!this._isRunning) {
            setTimeout(this._next.bind(this), timeout);
            this._isRunning = true;
        }
        return this;
    }
    _next() {
        if (this._step < this._callbackPool.length) {
            this._callbackPool[this._step]();
            let timeout = this._timeoutPool[this._step];
            this._step++;
            if (this._step < this._callbackPool.length) {
                setTimeout(this._next.bind(this), timeout);
            }
            else {
                //回收对象
            }
        }
    }
}
class Test {
    constructor() {
        new Promise(this.promiseTest)
            // .then((res) => {
            //     new Promise(this.promiseTest);
            //     console.log(res);
            // })
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log('finally');
        });
    }
    //模拟一个异步函数
    promiseTest(resole, reject) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resole('success');
            }
            else {
                reject('error');
            }
        }, 1000);
    }
}
new Test();
