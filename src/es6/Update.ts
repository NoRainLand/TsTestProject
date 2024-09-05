export class Update {
    constructor() {
        // this._fixedUpdate();
        // this._update();
        // setInterval(() => {
        //     console.log(this.FPS);
        //     this.FPS = 0;
        // }, 1000)
        // this.start();
        // this.test();
    }

    private _update() {
        this.__update();
        setInterval(() => {
            console.log(this.FPS);
            this.FPS = 0;
        }, 1000)
    }

    private FPS: number = 0;
    private __update = () => {
        ++this.FPS;
        requestAnimationFrame(this.__update);
    }


    private async _fixedUpdate() {

        const unitTime = 1000 / 350;

        function getTime() { return (new Date()).getTime(); }
        function wait() { return new Promise(resolve => { setTimeout(resolve, 10); }); }

        let lastFrame = 0;
        let startTime = getTime();
        setInterval(() => {
            // console.log(this.FPS);
            this.FPS = 0;
        }, 1000)
        loop:
        while (true) {
            const currentFrame = Math.floor((getTime() - startTime) / unitTime);
            while (lastFrame < currentFrame) {
                this.__fixedUpdate();
                // if (this.stopping) break loop;
                ++lastFrame;
                ++this.FPS;
            }
            await wait();
        }

    }
    private stopping = false;

    async start() {


        const unitTime = 1000 / 60;

        function getTime() { return (new Date()).getTime(); }
        function wait() { return new Promise(resolve => { setTimeout(resolve, 10); }); }


        let lastFrame = 0;
        let startTime = getTime();
        loop:
        while (true) {
            const currentFrame = Math.floor((getTime() - startTime) / unitTime);
            
            while (lastFrame < currentFrame) {
                // this.__fixedUpdate();
                if (this.stopping) break loop;
                ++lastFrame;
                ++this.FPS;
            }
            await wait();
        }
        this.stopping = false;
    }


    async test() {
        function wait() { return new Promise(resolve => { setTimeout(resolve, 1000); }); }
        while (true) {

            // while (true) {
            //     console.log(true)
            // }
            await wait();
        }
    }

    private __fixedUpdate() {
        console.log(this.FPS)
    }

}