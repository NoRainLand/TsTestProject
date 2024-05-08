export default class ResMgr {
    private static _instance: ResMgr;
    public static get instance(): ResMgr {
        return this._instance ? this._instance : this._instance = new ResMgr();
    }
    load(url: string, callback: Function) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback(xhr.response);
            } else {
                console.error(xhr.statusText);
            }
        };
        xhr.onerror = () => {
            console.error(xhr.statusText);
        };
        xhr.send();
    }
}