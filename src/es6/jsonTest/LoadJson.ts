
export default class LoadJson {
    arr = ["../../../res/data1.json", "../../../res/data2.json"];
    arr2 = ["../../../output/output1.json", "../../../output/output2.json"];
    zipUrl = "../../../res/res.zip";

    stringTest = ["../../../res/stringTest1.json", "../../../res/stringTest2.json"];

    skinUrl = "../../../res/skill.json";

    constructor() {

        window["loadNew"] = this.loadNew.bind(this);
        window["loadOld"] = this.loadOld.bind(this);
        window["loadZip"] = this.loadZip.bind(this);
        window["loadStr"] = this.loadStr.bind(this);

        window["loadSkillOld"] = this.loadSkillOld.bind(this);
        window["loadSkillNew"] = this.loadSkillNew.bind(this);
    }


    loadSkillOld() {
        window["jsonSkillOld"] = {};
        this.downloadJson(this.skinUrl, window["jsonSkillOld"], () => {
            let skill = window["jsonSkillOld"][this.skinUrl];
            console.log(skill);
        });
    }

    loadSkillNew() {
        window["jsonSkillOld"] = {};
        this.downloadJson(this.skinUrl, window["jsonSkillOld"], () => {
            let skill = window["jsonSkillOld"][this.skinUrl];
            for (let i = 0; i < skill.length; i++) {
                Object.defineProperty(skill[i], 'desc', {
                    get: function () {
                        return "hehe";
                    }
                });
            }
        });
    }


    loadStr() {
        window["strJson"] = {};
        this.downloadJson(this.stringTest, window["strJson"], () => {
            let str1 = window["strJson"][this.stringTest[0]];
            let str2 = window["strJson"][this.stringTest[1]];
            console.log(str1);
            console.log(str2);


        });
    }



    loadNew() {
        window["newJson"] = {};
        this.downloadJson(this.arr2, window["newJson"]);
    }

    loadOld() {
        window["oldJson"] = {};
        this.downloadJson(this.arr, window["oldJson"]);
    }

    loadZip() {
        window["jsonZip"] = {};

        this.downloadZip(this.zipUrl, window["jsonZip"], () => {
            let zip = new window["JSZip"]();
            let data = window["jsonZip"][this.zipUrl];
            zip.loadAsync(data, {
                base64: true
            }).then((zip) => {
                console.log(zip);
                window["jsonZip"][this.zipUrl] = zip;
                console.time("upZipOne");
                // for (let key in zip.files) {
                //     console.log(key);
                    zip.files["skill.json"].async('string').then(function (data) {
                        // console.log(data);
                        // if(key =="skill.json"){
                            console.timeEnd("upZipOne");
                        // }
                    });
                // }
            });
        });
    }




    downloadZip(url, obj, cb?: () => void) {
        this.request(url, (data) => {
            obj[url] = data;
            cb && cb();
        }, "GET", "arraybuffer");
    }

    downloadJson(urls: string | string[], obj: any, cb?: () => void, index: number = 0) {
        if (typeof urls === "string") {
            this.request(urls, (data) => {
                obj[urls] = data;
                cb && cb();
            });
        } else {
            this.request(urls[index], (data) => {
                obj[urls[index]] = data;
                index++;
                if (index < urls.length) {
                    this.downloadJson(urls, obj, cb, index);
                } else {
                    cb && cb();
                }
            });
        }
    };



    request(url: string, cb: (data: any) => void, method: string = "GET", type: XMLHttpRequestResponseType = "json") {
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