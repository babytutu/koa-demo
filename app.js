const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')()
const logger = require('koa-logger')()
const app = new Koa()

app.use(logger)

// 统一的错误处理
app.use(async(ctx, next) => {
  try {
    await next()
  } catch(e) {
    ctx.body = {
      code: '-1',
      description: '大哥，你迷路了么？？？'
    }
  }
})

// 来一个闹钟
const sleep = (time, type = 0) => {
  return new Promise((yes, no) => {
    setTimeout(() => {
      switch (type) {
        case 1:
          no('起床失败，重启ing')
          break
        case 2:
          no('重启失败，强制重启')
        default:
          yes('起床成功。。。')
          break
      }
    }, time)
  })
}

// 这是一个寒冬的早上，要起来上班了
router.get('/hello/:name', async(ctx, next) => {
  await next()
  let name = ctx.params.name
  ctx.body = `<h1>Hello, ${name}!</h1>`
  
  // 第一次肯定起不来
  try {
    const data = await sleep(100, 1)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
  
  // 第二次还是失败了
  try {
    const data = await sleep(200, 2)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
  
  // 好了，一二不过三，可以起来了
  try {
    const data = await sleep(300)
    console.log(name + data)
  } catch (e) {
    console.log(name + e)
  }
})

// 包装成一个正经的返回结果
router.post('/link', koaBody, async(ctx, next) => {
  await next()
    ctx.body = {
      code: '0',
      description: 'ok',
      result: ctx.request.body
    }
  }
})

// add router middleware:
app.use(router.routes())

app.listen(3000)
console.log('app started at port 3000...')
