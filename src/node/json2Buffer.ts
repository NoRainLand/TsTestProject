import * as fs from 'fs';
import * as path from 'path';
export default class json2Buffer {
    constructor() {
        let jsonUrl = path.join(__dirname, '../../res/data1.json');
        let outputUrl = path.join(__dirname, '../../output/');
        let json = fs.readFileSync(jsonUrl, 'utf8'); //读取JSON文件
        let str = JSON.stringify(json); //将JSON对象转化为字符串

        let buffer = Buffer.from(json, 'utf8'); //将字符串转为二进制Buffer对象

        //将Buffer二进制数据写入文件
        fs.writeFile(outputUrl + 'output.bin', buffer, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}
new json2Buffer();