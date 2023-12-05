const createControllerTpl = (moduleName) => {
  return `
  const ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} = require('@modules/${moduleName}/${moduleName}.model');
  
  const get = async (ctx) => {
    try {
      ctx.body = '获取列表接口';
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
      console.log('error', error);
    }
  }
  
  const create = async (ctx) => {
    try {
      ctx.body = '创建项目';
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
      console.log('error', error);
    }
  }
  
  const modify = async (ctx) => {
    try {
      ctx.body = '更新列表接口';
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
      console.log('error', error);
    }
  }
  
  const delete = async (ctx) => {
    try {
      ctx.body = '删除项目';
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error };
      console.log('error', error);
    }
  }
  
  module.exports = {
    create,
    get,
    modify,
    delete
  };
  `;
}

const createModelTpl = (moduleName) => {
  const moduleNamePack =  moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
  return `
  const { Sequelize, DataTypes, Model } = require('sequelize')
  const { sequelize } = require('@config/database')
  const ${moduleNamePack}  = require('@modules/${moduleName}/${moduleName}.model')

  const TABLE_NAME = ${moduleName};
  // 定义模型
  const  ${moduleName} = sequelize.define(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    gender: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    updated_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: false,
    freezeTableName: true                           // 禁用自动添加 "s" 后缀
  })

  module.exports = moduleNamePack
  `
}

const createModuleTpl = (moduleName) => {
  const moduleNamePack =  moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
  return `
  const Router = require('koa-router');
  const ${moduleNamePack}Controller = require('@modules/${moduleName}/${moduleName}.controller');

  const ${moduleName}Router = new Router();

  ${moduleName}Router.get('/get', ${moduleNamePack}Controller.get);
  ${moduleName}Router.post('/create', ${moduleNamePack}Controller.create);
  ${moduleName}Router.delete('/delete', ${moduleNamePack}Controller.delete);

  module.exports = {
    ${moduleName}Router
  }
  `
}

export {
  createModelTpl,
  createControllerTpl
}