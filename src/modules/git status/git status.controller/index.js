
  const Git status = require('@modules/git status/git status.model');
  
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
  
  module.exports = {
    create,
    get,
    modify,
  };
  