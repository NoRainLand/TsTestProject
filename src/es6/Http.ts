export class Http {
    static request(url: string, cb: (data: any) => void, method: string = "GET", type: XMLHttpRequestResponseType = "json") {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = type;
        xhr.onload = function () {
            if (this.status === 200) {
                if (type == "text") {
                    cb(this.responseText);
                } else {
                    cb(this.response);
                }
            }
        };
        xhr.onerror = function (e) {
            console.log("error", e);
        }
        xhr.send();
    }
}