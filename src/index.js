#!/usr/bin/env node

import fs from 'fs'
import inquirer from 'inquirer';
import { program } from 'commander'
import { loadJSONFile } from './utils/index.js'
import initProject from './modules/initProject.js'
import createModule from './modules/createModule/index.js'

const pkg = await loadJSONFile('./package.json');

program.version(pkg.version)

// 初始化
initProject(program)
// 创建业务模块
createModule(program)

program.parse(process.argv)




