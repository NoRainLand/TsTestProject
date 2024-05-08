import ResMgr from "./ResMgr";

export default class index {
    constructor() {
        ResMgr.instance.load("res/test.json", (data: any) => {
            console.log(data);
        });
    }
}