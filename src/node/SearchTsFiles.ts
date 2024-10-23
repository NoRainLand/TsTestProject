/**
 * 搜索包含所有关键字的.ts文件
 * NoRain
 * 2024/9/2
 * 使用方式：
 * node SearchTsFiles.ts 关键字1 关键字2 ...
 */

import * as fs from 'fs';
import * as path from 'path';

// 获取命令行参数作为关键字列表
const keywords = process.argv.slice(2);

// 检查是否提供了关键字
if (keywords.length === 0) {
    console.error('请提供至少一个关键字作为参数。');
    process.exit(1);
}

// 递归读取目录中的所有文件
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

// 过滤出所有的.ts文件
function getTsFiles(dirPath: string): string[] {
    const allFiles = getAllFiles(dirPath);
    return allFiles.filter((file) => path.extname(file) === '.ts');
}

// 搜索同时包含所有关键字的.ts文件
function searchFilesWithKeywords(dirPath: string, keywords: string[]): string[] {
    const tsFiles = getTsFiles(dirPath);
    const resultFiles: string[] = [];

    tsFiles.forEach((file) => {
        const content = fs.readFileSync(file, 'utf8');
        if (keywords.every((keyword) => content.includes(keyword))) {
            resultFiles.push(file);
        }
    });

    return resultFiles;
}

// 指定当前目录路径（使用绝对路径）
const dirPath = path.resolve('../src');

// 搜索并输出结果
const resultFiles = searchFilesWithKeywords(dirPath, keywords);
console.log('包含所有关键字的文件:', resultFiles);