export class jsonzilb {
    constructor() {
        var zlib = require('zlib');
        let json1 = [
            { age: 14, name: "张三", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取$%的吸血,$%减伤", eff_data: [1, 2] },
            { age: 14, name: "李四", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取$%的吸血,$%减伤", eff_data: [3, 3] },
        ];
        let str = JSON.stringify(json1);
        zlib.gzip(str, (err, buffer) => {
            if (!err) {
                console.log(buffer.toString("base64"));
            }
        });

        let str2 =
            "H4sIAAAAAAAACouuVkpMT1WyMjTRUcpLzAWylJ7uWfBkR6eSjlJxagVQQkcpJbEkESS+ePXTJcufLgGRz2asB5Iv584DKsstTleyijbUMYrVUcoqzs9TsgKaCdaYBNK1Ye/T/aufTlr/dOPGJzvmPF3U/LSt9fmsFqVaHaXUtDSgihd925/2T1NRBQo+nbDjxcIGHRXVp+39T/YsUQIriYfYD7ahVgfTvc/m9j2dPXvwuddYxzi2NhYABbvBYGEBAAA=";

        zlib.gunzip(Buffer.from(str2, "base64"), (err, buffer) => {
            if (!err) {
                console.log(buffer.toString());
            }
        });
    }
}
new jsonzilb();