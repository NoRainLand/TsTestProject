export default class json2Buffer {
    constructor() {
        const fs = require('fs');
        let json = fs.readFileSync('input.json', 'utf8'); //读取JSON文件
        let str = JSON.stringify(json); //将JSON对象转化为字符串

        let buffer = Buffer.from(str, 'utf8'); //将字符串转为二进制Buffer对象

        //将Buffer二进制数据写入文件
        fs.writeFile('output.bin', buffer, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}
new json2Buffer();