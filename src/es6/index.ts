import ClipboardJS from "clipboard";
import QRCode from "qrcode";
import VConsole from 'vconsole';
import "../html/css/style.scss";
import { myView } from "./ObjectTest.js";
export default class index {
    constructor() {
        // new LoadJson();
        new myView();
        // TestHuffman.test();
        // new LoadSk();
        new ClipboardJS('.btn');
        QRCode.toDataURL('I am a pony!')
            .then(url => {
                console.log(url)
            })
            .catch(err => {
                console.error(err)
            })

        const vConsole = new VConsole();

        // 接下来即可照常使用 `console` 等方法
        console.log('Hello world');
    }
}
new index();