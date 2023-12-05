import fs from 'fs'
import path from 'path'
import util from 'util';
import inquirer from 'inquirer';
import { createControllerTpl, createModelTpl, createModuleTpl } from './tpl.js'

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

const insertCodeToModuleIndex = async (srcPath, name) => {
  const newPath = path.join(srcPath, 'index.js')
  const oriData = await readFile(newPath, 'utf8')
  // 插入到顶部
  const importModule = `const {${name}Router} = require('@modules/${name}');\n`;
  // 插入到 combineRouters 的参数中
  const insertCode = `${name}Router, \n`;
  const modifiedData = oriData.replace(
    /module.exports\s*=\s*combineRouters\(([\s\S]*?)\)/,
    (match, routers) => {
      const updatedRouters = `${insertCode}${routers.trim()}`;
      return `module.exports = combineRouters(\n${updatedRouters}\n)`;
    }
  )
  const result = importModule + modifiedData
  await writeFile(newPath, result, 'utf8')
}

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
  const modulesPath = path.join('src', 'modules')
  const srcPath = path.join('src')
  try {
    if(fs.existsSync(targetPath)) {
      // 1. 创建模块文件夹
      await mkdir(path.join(modulesPath, name))
      // // 2. 模块.controller
      await mkdir(path.join(modulesPath, name, `${name}.controller`))
      // 3. 创建并写入 模块.controller 入口文件
      await writeFile(path.join(modulesPath, name, `${name}.controller/index.js`), createControllerTpl(name))
      // 4. 模块.model
      await mkdir(path.join(modulesPath, name, `${name}.model`))
      // 5. 创建并写入 模块.model 入口文件
      await writeFile(path.join(modulesPath, name, `${name}.model/index.js`), createModelTpl(name))
      // 6. 写入模块文件夹入口文件
      await  writeFile(path.join(modulesPath, name, `index.js`), createModuleTpl(name))
      // 7. 在 src 文件下的入口文件导入 router 文件
      await insertCodeToModuleIndex(srcPath, name)

    }
  } catch (err) {
    console.log(err)
  }
}


const createModule = (program) => {
  program
  .command('create')
  .description('创建模块')
  .action(initAction)
}

export default createModule

