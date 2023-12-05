import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer';
import util from 'util';
import { createControllerTpl, createModelTpl } from './tpl.js'

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile)

const initAction = () => {
  inquirer.prompt([{
    type: 'input',
    message: '请输入新增的名称',
    name: 'name'
  }]).then(answer => { 
    console.log('要增加模块的名称为：', answer.name)
    console.log('正在创建项目， 请稍等')
    createModules(answer.name)
  })
}

const createModules = async (name) => {
  const targetPath = path.join('src', 'modules')
  try {
    if(fs.existsSync(targetPath)) {
      // 1. 创建模块文件夹
      await mkdir(path.join(targetPath, name))
      // 2. 模块.controller
      await mkdir(path.join(targetPath, name, `${name}.controller`))
      // 3. 创建并写入 模块.controller 入口文件
      await writeFile(path.join(targetPath, name, `${name}.controller/index.js`), createControllerTpl(name))
      // 4. 模块.model
      await mkdir(path.join(targetPath, name, `${name}.model`))
      // 5. 创建并写入 模块.model 入口文件
      await writeFile(path.join(targetPath, name, `${name}.model/index.js`), createModelTpl(name))
      // 6. 写入模块文件夹入口文件
      // 7. 在 src 文件下的入口文件导入 router 文件
    }
  } catch (err) {
    console.log(err)
  }
}

// 1. 创建模块目录结构 
// 2. 创建 模块.controller 和 模块.controller
// 3. 写入 index.js

const createModule = (program) => {
  program
  .command('create')
  .description('创建模块')
  .action(initAction)
}

export default createModule

