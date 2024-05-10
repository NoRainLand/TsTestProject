import { Http } from "./Http.js";

export class LoadSk {
    constructor() {
        let url = "https://test-cdn-shjmini.kgogame.com/box_mini_zhifubao/res/sk/9138/show_229.skel";
        Http.request(url, (data) => {
            console.log(data);
            function buffer2string(buffer) {
                return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
            }
            let str = buffer2string(data);
            console.log(str);

            function string2buffer(text) {
                var typedArray = new Uint8Array(
                    text.match(/[\da-f]{2}/gi).map(function (h) {
                        return parseInt(h, 16);
                    })
                );
                return typedArray.buffer;
            }

            let obj = string2buffer(str);
            console.log(obj);
        }, "GET", "arraybuffer");
    }
}