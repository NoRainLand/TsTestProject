import fs from 'fs';
import path from 'path';
export default class checkStr {

    private strMap: Map<string, number> = new Map();
    private strSet: Set<string> = new Set();
    constructor() {
        let jsonUrl = path.join(__dirname, '../../res/data1.json');
        let outputUrl = path.join(__dirname, '../../output/');
        let json = fs.readFileSync(jsonUrl, 'utf8'); //读取JSON文件
        json = this.checkJson(JSON.parse(json));

        fs.writeFile(outputUrl + 'output1.json', JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

        let arr = Array.from(this.strSet);

        fs.writeFile(outputUrl + 'output2.json', JSON.stringify(arr), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });

    }


    checkJson(obj: any) {
        if (typeof obj === "object") {
            for (let key in obj) {
                let data = obj[key];
                if (typeof data === "string") {
                    if (!this.strSet.has(data)) {
                        this.strSet.add(data);
                        this.strMap.set(data, this.strSet.size + 999000000);
                    }
                    obj[key] = this.strMap.get(data);

                } else {
                    obj[key] = this.checkJson(data);
                }
            }
        }
        return obj;
    }


}
new checkStr();