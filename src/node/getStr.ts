import fs from 'fs';
import path from 'path';
export default class checkStr {


    constructor() {
        let jsonUrl = path.join(__dirname, '../../res/testjson.json');
        let json = fs.readFileSync(jsonUrl, 'utf8'); //读取JSON文件

        let flat = [].concat(...json);
        // console.log(flat);
        console.log(this.longestCommonSubstring(flat));
    }


    longestCommonSubstring(arr) {
        let A = arr.concat().sort(),
            a1 = A[0], a2 = A[A.length - 1], L = a1.length, i;
        while (i = a1.indexOf(a2, i + 1))
            if (i == -1)
                return a1;
        a1 = a1.substring(0, --L);
        return '';
    }
}
new checkStr();