const Koa = require('koa')
const router = require('koa-router')()
const logger = require('koa-logger')()
const error = require('./utils/error')
const links = require('./routes/router')
const app = new Koa()
  
// Development style logger middleware for Koa.
app.use(logger)

// 统一的错误处理
app.use(error)

// add router middleware:
app.use(router.routes(links(router)))

app.listen(3000)
console.log('app started at port 3000...')
