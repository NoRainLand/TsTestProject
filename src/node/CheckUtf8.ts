import * as fs from 'fs/promises';
import * as path from 'path';

// 获取文件夹路径，默认为当前文件夹
const folderPath = process.argv[2] || "../bin";

// 定义后缀过滤列表
const allowedExtensions = ['.txt', '.js', '.ts', '.json', '.html', '.css', '.md', '.atlas'];

// 递归遍历文件夹
const checkUtf8 = async (folder) => {
    try {
        const files = await fs.readdir(folder);

        for (const file of files) {
            const filePath = path.join(folder, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                await checkUtf8(filePath); // 递归检查子文件夹
            } else if (stats.isFile()) {
                const ext = path.extname(file);
                if (allowedExtensions.includes(ext)) {
                    const data = await fs.readFile(filePath);
                    try {
                        new TextDecoder('utf-8', { fatal: true }).decode(data);
                    } catch (e) {
                        console.log(`文件 ${filePath} 不是 UTF-8 编码`);
                    }
                }
            }
        }
    } catch (err) {
        console.error(`无法处理文件夹: ${folder}`, err);
    }
};

checkUtf8(folderPath);