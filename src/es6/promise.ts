class myTimeout {
    private _step: number;
    private _callbackPool: Array<() => void>;
    private _timeoutPool: Array<number>;
    private _isRunning: boolean;
    constructor() {
        this._step = 0;
        this._callbackPool = [];
        this._timeoutPool = [];
        this._isRunning = false;
    }
    next(callback: () => void, timeout: number) {
        this._callbackPool.push(callback);
        this._timeoutPool.push(timeout);
        if (!this._isRunning) {
            setTimeout(this._next.bind(this), timeout);
            this._isRunning = true;
        }
        return this;
    }
    private _next() {
        if (this._step < this._callbackPool.length) {
            this._callbackPool[this._step]();
            let timeout = this._timeoutPool[this._step];
            this._step++;
            if (this._step < this._callbackPool.length) {
                setTimeout(this._next.bind(this), timeout);
            } else {
                //回收对象
            }
        }
    }
}
class Test {
    constructor() {
        this.promiseTest2();
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
            }).finally(() => {//不管成功还是失败都会执行 //需要ES2018
                console.log('finally');
            });
    }
    //模拟一个异步函数
    promiseTest(resole: Function, reject: Function) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resole('success');
            } else {
                reject('error');
            }
        }, 1000);
    }

    async promiseTest2() {
        console.log("------1--------");

        await new Promise(this.promiseTest)
        setTimeout(() => {
            console.log("------3--------");
        }, 3000);
        console.log("------4--------");
    }
}
new Test();