function modifyReturn(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;
    // console.log(this.arr);
    // console.log(this.str);
    descriptor.get = function () {
        let arr = target.arr.pop();
        return target.str.replace(/\$/g, () => target.arr.shift());
    }
    return descriptor;
}
export class Skill {

    constructor() {
        let text = "开场时，获得一个强力护盾，自身文心低于30%时再获得一个强力护盾并净化3层持续伤害（强力护盾：免疫持续伤害，可抵挡文心上限18%的伤害）";
        let regex = /\d+/g;
        let numbers = text.match(regex);
        let replacedText = text.replace(regex, "$");

        // console.log(numbers); // 输出: [ '30', '3', '18' ]
        // console.log(replacedText); // 输出: "开场时，获得一个强力护盾，自身文心低于$%时再获得一个强力护盾并净化$层持续伤害（强力护盾：免疫持续伤害，可抵挡文心上限$%的伤害）"
    }

    //text = "开场时，获得一个强力护盾，自身文心低于30%时再获得一个强力护盾并净化3层持续伤害（强力护盾：免疫持续伤害，可抵挡文心上限18%的伤害）";
    str = ["开场时，获得一个强力护盾，自身文心低于$%时再获得一个强力护盾并净化$层持续伤害（强力护盾：免疫持续伤害，可抵挡文心上限$%的伤害）"]
    arr = ['30', '3', '18',0];

    @modifyReturn
    public get desc(): string {
        return "";
    }
}






