let json = {
	json1: [
		{ age: 14, name: "张三", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取1%的吸血" },
		{ age: 14, name: "李四", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取3%的吸血" },
	],
	json2: {
		head: ["age", "name", "sex", "data", "msg", "json", "eff"],
		data: [
			[14, "张三", 1, "士大夫大是大非", [1, 2], { a: 1, b: "尽快咯山东境内的" }, "获取1%的吸血"],
			[14, "李四", 1, "士大夫大是大非", [1, 2], { a: 1, b: "尽快咯山东境内的" }, "获取3%的吸血"],
		],
	},
	json3: {
		head: ["age", "name", "sex", "data", "msg", "json", "eff"],
		data: [
			[14, "张三", 1, 999001, [1, 2], { a: 1, b: 999002 }, "获取1%的吸血"],
			[14, "李四", 1, 999001, [1, 2], { a: 1, b: 999002 }, "获取3%的吸血"],
		],
		exp: ["士大夫大是大非", "尽快咯山东境内的"],
	},
	json4: {
		head: ["age", "name", "sex", "data", "msg", "json", "eff"],
		type: ["num", "str", "str", "str", "arr", "json", "temp"],
		data: [
			[14, "张三", 1, 999001, [1, 2], { a: 1, b: 999002 }, [999003, 1]],
			[14, "李四", 1, 999001, [1, 2], { a: 1, b: 999002 }, [999003, 3]],
		],
		exp: ["士大夫大是大非", "尽快咯山东境内的", "获取$%的吸血"], //怎么做？
	},
};

let json1 = [
	{ age: 14, name: "张三", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取$%的吸血,$%减伤", eff_data: [1, 2] },
	{ age: 14, name: "李四", sex: 1, data: "士大夫大是大非", msg: [1, 2], json: { a: 1, b: "尽快咯山东境内的" }, eff: "获取$%的吸血,$%减伤", eff_data: [3, 3] },
];

let data = ['age', 'data', 'eff', 'json', 'msg', 'name', 'sex'];
let data2 = [14, "士大夫大是大非", "获取1%的吸血", { "a": 1, "b": "尽快咯山东境内的" }, [1, 2], "张三", 1];

export class jsonclass {
	age: number;
	name: string;
	sex: number;
	data: string;
	msg: number[];
	json: json2;
	_eff_index: number;
	_eff_temp: string;
	get eff(): string {
		return tempClass.getTemp(this._eff_temp, [this._eff_index]);
	}
}
export class json2 {
	a: number;
	b: number;
}

export class tempClass {
	static getTemp(temp: string, data: any[]): string {
		temp.replace(/\$(\d+)/g, (word, index) => {
			return data[index];
		});
		return temp;
	}
}