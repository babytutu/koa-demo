const koaBody = require('koa-body')()

module.exports = (router) => {
  // 整合请求地址
  router.get('/hello/:name', require('../controllers/hello')),
    router.post('/link', koaBody, require('../controllers/link')),
    router.get('/outside', require('../controllers/outside'))
}
