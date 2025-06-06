#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import inquirer from 'inquirer'
import chalk from 'chalk'

// 获取当前模块路径
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

// 工具描述信息
console.log(chalk.blue.bold('🚀 Vue 3 + TypeScript 项目创建工具'))

// 获取项目名称
const projectName = process.argv[2]
if (!projectName) {
  console.error(chalk.red('❌ 错误：请指定项目名称'))
  console.log(`示例: pnpm create gaowenhan-vtw ${chalk.green('<project-name>')}`)
  process.exit(1)
}

// 定义路径
const templateDir = path.join(__dirname, '../template')
const projectDir = path.join(process.cwd(), projectName)

// 检查目录是否存在
if (fs.existsSync(projectDir)) {
  console.error(chalk.red(`❌ 目录 ${projectName} 已存在，请更换项目名`))
  process.exit(1)
}

// 创建项目目录
fs.mkdirSync(projectDir)
console.log(chalk.green(`✅ 创建项目目录: ${projectName}`))

// 复制模板文件函数
function copyTemplate(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }
    fs.readdirSync(src).forEach(file => {
      copyTemplate(path.join(src, file), path.join(dest, file))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// 自动生成 .gitignore 文件
function createGitIgnore() {
  const gitIgnoreContent = `
# Node.js dependencies
node_modules/
dist/
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Build outputs
/public/build

# Editor directories and files
/.DS_Store
.DS_Store
*.mocha.opts
`

  fs.writeFileSync(path.join(projectDir, '.gitignore'), gitIgnoreContent.trim())
}

// 开始复制模板
try {
  console.log(chalk.cyan(`📁 正在复制模板文件...`))
  copyTemplate(templateDir, projectDir)
  console.log(chalk.green(`✅ 模板文件复制完成`))

  // 👇 新增：生成 .gitignore
  createGitIgnore()
  console.log(chalk.green(`✅ 已生成 .gitignore 文件`))
} catch (err) {
  console.error(chalk.red(`❌ 模板复制失败: ${err.message}`))
  process.exit(1)
}

// 初始化项目
try {
  console.log(chalk.cyan(`📦 正在安装依赖...`))
  process.chdir(projectDir)
  execSync('pnpm install', { stdio: 'pipe' })
  console.log(chalk.green(`✅ 依赖安装完成`))
} catch (err) {
  console.error(chalk.red(`❌ 依赖安装失败: ${err.message}`))
  process.exit(1)
}

// 成功提示
console.log(chalk.greenBright('\n🎉 项目创建成功！\n'))
console.log(`🔗 进入项目目录: ${chalk.blue(`cd ${projectName}`)}`)
console.log(`🔥 启动开发服务器: ${chalk.blue('pnpm dev')}\n`)

// 可选：交互式初始化 Git
inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'initGit',
      message: '是否要初始化 Git 并启用 Husky?',
      default: true
    }
  ])
  .then(answers => {
    if (answers.initGit) {
      try {
        // 👇 更安全的 stdio 设置
        execSync('git init && git add . && git commit -m "Initial commit"', {
          stdio: 'pipe'
        })
        execSync('pnpm prepare', { stdio: 'pipe' })
        console.log(chalk.green(`✅ Git 和 Husky 初始化完成`))
      } catch (err) {
        console.error(chalk.yellow(`⚠️ Git 初始化失败或 husky 配置异常（非致命）`))
      }
    }

    // 最终提示
    console.log(chalk.blueBright('\n✨ 祝你开发愉快！如有问题欢迎反馈。\n'))
  })
