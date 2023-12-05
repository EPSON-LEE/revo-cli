
  const Router = require('koa-router');
  const Git statusController = require('@modules/git status/git status.controller');

  const git statusRouter = new Router();

  git statusRouter.get('/get', Git statusController.get);
  git statusRouter.post('/create', Git statusController.create);

  module.exports = {
    git statusRouter
  }
  