#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Vue 3 + TypeScript项目模板创建工具');

const projectName = process.argv[2];
if (!projectName) {
  console.error('请指定项目名称: pnpm create gaowenhan-vtw <project-name>');
  process.exit(1);
}

const templateDir = path.join(process.cwd(), 'template');
const projectDir = path.join(process.cwd(), projectName);

// 创建项目目录
if (fs.existsSync(projectDir)) {
  console.error(`目录 ${projectName} 已存在`);
  process.exit(1);
}

fs.mkdirSync(projectDir);

// 复制模板文件
function copyTemplate(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(file => {
      copyTemplate(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyTemplate(templateDir, projectDir);

// 初始化项目
process.chdir(projectDir);
execSync('pnpm install', { stdio: 'inherit' });

console.log(`项目 ${projectName} 创建成功！`);
console.log(`进入项目目录: cd ${projectName}`);
console.log('启动开发服务器: pnpm dev');
