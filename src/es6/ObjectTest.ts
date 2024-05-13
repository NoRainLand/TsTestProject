
export class ObjectTest {
    private static tableA = [[11, 12], [21, 22]];
    private static title = ["bb", "cc"];
    private static fun2Obj: any;
    static getDb(tableName: string, index: number): any {
        let obj = {};
        obj["$tableName"] = tableName;
        obj["$index"] = index;
        obj["table"] = this.tableA;
        if (!this.fun2Obj) {
            this.fun2Obj = {};
            for (let i = 0; i < this.title.length; i++) {
                let key = this.title[i];
                this.fun2Obj[key] = function () {
                    return this.table[this.$index][i];
                }
                Object.defineProperty(obj, key, {
                    get: this.fun2Obj[key]
                })
            }
        }
        return obj;
    }
}
export class myView {
    get a() {
        console.log(this);
        return 12;
    }
    constructor() {
        let obj: aa = ObjectTest.getDb("tableA", 1);
        console.log(obj.bb);
        console.log(obj.cc);
        console.log(obj);
        obj["dsd"] = 100;
        console.log(Object.getPrototypeOf(this));
        // console.log(obj.dsd);报错，但是实际上能编译
        console.log(this.get.name);

    }

    get() {
        // this.get["name"] = "123123";//只读
        return 12;
    }
}
type aa = { bb: number, cc: number }


export class ObjectTest2 {

}

