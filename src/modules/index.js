const {userRouter}  = require('@modules/user')
const {testRouter}  = require('@modules/test')
const {userInfoRouter}  = require('@modules/userInfo')
const combineRouters = require('koa-combine-routers')


module.exports = combineRouters(
    testRouter,
    userRouter,
    userInfoRouter,
)