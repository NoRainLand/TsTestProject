import { Http } from "./Http.js";

export class HuffmanCoding {
    static huffmanCoding(hfStr: string) {
        let frequencyMap = new Map<string, number>();
        for (let char of hfStr) {
            frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
        }

        const priorityQueue: HfNode[] = Array.from(frequencyMap.entries()).map(([character, frequency]) => new HfNode(character, frequency));

        while (priorityQueue.length > 1) {
            priorityQueue.sort((a, b) => a.frequency - b.frequency);
            let left = priorityQueue.shift()!;
            let right = priorityQueue.shift()!;
            let newHfNode = new HfNode(left.character + right.character, left.frequency + right.frequency, left, right);
            priorityQueue.push(newHfNode);
        }

        const huffmanCodes = new Map<string, string>();
        this.generateHuffmanCodes(priorityQueue[0], '', huffmanCodes);

        const huffmanCodesObj: Record<string, string> = {};
        huffmanCodes.forEach((value, key) => {
            huffmanCodesObj[key] = value;
        });

        return huffmanCodesObj;
    }

    static generateHuffmanCodes(HfNode: HfNode | null, currentCode: string, huffmanCodes: Map<string, string>) {
        if (!HfNode) return;

        if (!HfNode.left && !HfNode.right) {
            huffmanCodes.set(HfNode.character, currentCode);
        }

        this.generateHuffmanCodes(HfNode.left, currentCode + '0', huffmanCodes);
        this.generateHuffmanCodes(HfNode.right, currentCode + '1', huffmanCodes);
    }

    static encode(text: string, obj: any) {
        let binaryString = '';
        for (let i = 0; i < text.length; i++) {
            for (let key in obj) {
                if (key === text[i]) {
                    binaryString += obj[key];
                    break;
                }
            }
        }
        return binaryString;
    }

    static decode(binaryString: string, obj: any) {
        let result = '';
        let temp = '';
        for (let i = 0; i < binaryString.length; i++) {
            temp += binaryString[i];
            for (let key in obj) {
                if (obj[key] === temp) {
                    result += key;
                    temp = '';
                    break;
                }
            }
        }
        return result;
    }
}
class HfNode {
    character: string;
    frequency: number;
    left: HfNode | null;
    right: HfNode | null;

    constructor(character: string, frequency: number, left: HfNode | null = null, right: HfNode | null = null) {
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }
}

export class TestHuffman {
    // static data = ["间隔3回合释放1次技能，治疗恢复主角攻击力29.38%的生命，24%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力30.02%的生命，26%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力30.67%的生命，28%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力31.32%的生命，30%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力31.97%的生命，32%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力32.62%的生命，34%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力33.26%的生命，36%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力33.91%的生命，38%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合12%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力33.7%的生命，20%概率解除主角的眩晕状态，使主角下回合免控，并提升主角下回合16.8%伤害（免控：免疫敌人的击晕、冰冻等控制效果）。", "间隔3回合释放1次技能，治疗恢复主角攻击力34.47%的生命，22%概率解除主角的眩晕状态"];



    static test() {
        Http.request("../../output/output2.json", (data) => {

            console.log(this.encode(data));
        });

    }


    static encode(data: any) {
        let hfData = {};
        let encodeString = JSON.stringify(data)
        let han2bite = HuffmanCoding.huffmanCoding(encodeString);
        console.log(han2bite);
        hfData["han2bite"] = han2bite;
        let bite = HuffmanCoding.encode(encodeString, han2bite);
        // let bite2bite = HuffmanCoding.huffmanCoding(bite);
        // hfData["bite2bite"] = bite2bite;
        // bite = HuffmanCoding.encode(bite, bite2bite);
        hfData["bite"] = bite;
        console.log(bite);
        return hfData;
    }
}