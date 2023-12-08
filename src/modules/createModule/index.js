import fs from 'fs'
import path from 'path'
import util from 'util';
import inquirer from 'inquirer';
import { inserDepToModuleIndex } from './utils.js'
import { createControllerTpl, createModelTpl, createModuleTpl } from './tpl.js'

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile)
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

  const srcPath = path.join('src')
  const modulesPath = path.join('src', 'modules')
  const modulesNamePath = path.join(modulesPath, name)
  
  try {
    if(fs.existsSync(modulesPath)) {
      // 1. 创建模块文件夹
      await mkdir(modulesNamePath)
      // // 2. 模块.controller
      await mkdir(path.join(modulesNamePath, `${name}.controller`))
      // 3. 创建并写入 模块.controller 入口文件
      await writeFile(path.join(modulesNamePath, `${name}.controller/index.js`), createControllerTpl(name))
      // 4. 模块.model
      await mkdir(path.join(modulesNamePath, `${name}.model`))
      // 5. 创建并写入 模块.model 入口文件
      await writeFile(path.join(modulesNamePath, `${name}.model/index.js`), createModelTpl(name))
      // 6. 写入模块文件夹入口文件
      await  writeFile(path.join(modulesNamePath, `index.js`), createModuleTpl(name))
      // 7. 在 src 文件下的入口文件导入 router 文件
      await inserDepToModuleIndex(srcPath, name)
    } else {
      console.log(`${modulesPath} 不存在`)
    }
  } catch (err) {
    console.log(err)
  }
}


const createModule = (program) => {
  program
  .command('create')
  .description('创建业务模块')
  .action(initAction)
}

export default createModule

