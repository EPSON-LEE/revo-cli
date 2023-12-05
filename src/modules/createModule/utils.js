import fs from 'fs'
import util from 'util'
import path from 'path'


const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

const insertCodeToModuleIndex = async (srcPath, name) => {
  const newPath = path.join(srcPath, 'index.js')
  const oriData = await readFile(newPath, 'utf8')
  // 目标位置进行分割
  const splitRegx = /module.exports\s*=\s*combineRouters\(([\s\S]*?)\)/
  // 导入的代码 插入到顶部
  const importModule = `const {${name}Router} = require('@modules/${name}');\n`;
  // 插入到 combineRouters 的参数中
  const insertCode = `${name}Router, \n`;
  const modifiedData = oriData.replace(
    splitRegx,
    (match, routers) => {
      const updatedRouters = `${insertCode}${routers.trim()}`;
      return `module.exports = combineRouters(\n${updatedRouters}\n)`;
    }
  )
  const result = importModule + modifiedData
  await writeFile(newPath, result, 'utf8')
}

export {
  insertCodeToModuleIndex
}