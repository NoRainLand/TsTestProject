function SleepSort(arr: number[]): Promise<number[]> {
    return new Promise((resolve, reject) => {
        if (!arr || arr.length === 0) {
            resolve([]);
        } else {
            let result: number[] = [];
            arr.forEach((item) => {
                setTimeout(() => {
                    result.push(item);
                    if (result.length === arr.length) {
                        resolve(result);
                    }
                }, item);
            });
        }
    });
}
//测试
let arr = [-5, 3, 9, 1, -5, 4, 1, 5, 9, 2, 6, 5, 3];//实际操作下来有BUG,太小的话顺序会乱,比如-5和1
SleepSort(arr).then((res) => {
    console.log(res);
});