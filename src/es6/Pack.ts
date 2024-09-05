export class Pack {
    constructor() {

        // this.init();
        this.load();
    }

    async load(){
        let msgpack = (<any>window).msgpack5();
        let pako = (<any>window).pako;
        console.time("load");
        let pro = await fetch("../../res/data1.bin");
        let buffer = await pro.arrayBuffer();
        buffer = pako.ungzip(new Uint8Array(buffer));
        let text = msgpack.decode(buffer);
        console.log(typeof text, text);
        console.timeEnd("load");


        console.time("load2");
        let pro2 = await fetch("../../res/data1.json");
        let text2 = await pro2.text();
        console.log(typeof text2, text2);
        console.timeEnd("load2");
    }



    async init() {
        let msgpack = (<any>window).msgpack5();
        let pako = (<any>window).pako;

        let pro = await fetch("../../res/data1.json");
        let text = await pro.text();
        console.log(text);


        let buffer = msgpack.encode(text);
        console.log(buffer);
        buffer = pako.gzip(buffer);
        this.saveUint8ArrayAsBinaryFile(buffer, "data1.bin");
    }

    saveUint8ArrayAsBinaryFile(data: Uint8Array, fileName: string) {
        // 步骤1: 创建Blob对象
        const blob = new Blob([data], { type: 'application/octet-stream' });

        // 步骤2: 创建Blob URL
        const url = URL.createObjectURL(blob);

        // 步骤3: 创建<a>元素
        const a = document.createElement('a');
        a.href = url;

        // 步骤4: 设置下载文件名
        a.download = fileName;

        // 步骤5: 触发下载
        document.body.appendChild(a); // 需要添加到文档中才能触发点击
        a.click();

        // 步骤6: 清理
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}