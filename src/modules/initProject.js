import fs from 'fs';
import inquirer from 'inquirer';

const initAction = () => { 
  inquirer.prompt([{
    type: 'input',
    message: '请输入模块名称',
    name: 'name'
  }]).then(answer => { 
    console.log('模块名称为：', answer.name)
    fs.mkdirSync(answer.name)
    console.log('正在创建项目， 请稍等')
  })
}


const initProject = (program) => {
  program
  .command('init')
  .description('初始化项目')
  .action(initAction)
}

export default initProject