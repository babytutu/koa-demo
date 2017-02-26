### 来一起跑个小例子
#### 从package.json开始
> Koa2走起，node升级到7，新世界很美好，当然node6也可以玩

```json
{
  "name": "koa-demo",
  "version": "1.0.0",
  "description": "learn koa",
  "main": "app.js",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "koa": "2.0.0"
  },
  "engines" : {
    "node" : ">=6.0.0"
  }
}
```

#### 来个app.js文件跑跑

```js
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello Koa2'
})

app.listen(3000)
```

#### 安装npm依赖包
```bash
npm i
```

#### Koa2跑跑跑
```bash
npm start
```

#### 验收成果
> 浏览器访问http://localhost:3000 出来个Hello Koa2

#### 给控制台输出信息添砖加瓦
```js
// 控制台输出接口类型，地址，返回时间
app.use((ctx, next) => {
  const start = new Date()
  return next().then(() => {
    const ms = new Date() - start
    console.log(`${ctx.method} -> ${ctx.url} - ${ms}ms`)
  })
})
```
> 控制台显示

```bash
GET -> / - 5ms
```

#### 结合gulp的nodejs的自动重启神器 --- [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon)
> node不会自动重启，不要问我为什么，反正它就是那么任性，那我们就来个gulp任务让它监控下代码变化然后自动重启

```js
let gulp = require('gulp')
let nodemon = require('gulp-nodemon')

// nodemon 修改服务端代码自动重启
gulp.task('nodemon', () => nodemon({ script: 'app.js' }))
```

> package.json要加2个客人，gulp，gulp-nodemon，顺便把这个gulp用起来

```json
{
  "name": "koa-demo",
  "version": "1.0.0",
  "description": "learn koa",
  "main": "app.js",
  "private": true,
  "scripts": {
    "start": "gulp nodemon"
  },
  "dependencies": {
    "koa": "2.0.0",
    "gulp": "3.9.1",
    "gulp-nodemon": "2.2.1"
  },
  "engines" : {
    "node" : ">=6.0.0"
  }
}
```

### 常用插件
> 热身完毕，开工，说说需求是个啥？就是一个简单的get/post请求过来，我给你响应

#### 设置路由，说白了就是有个导游 --- [koa-router](https://www.npmjs.com/package/koa-router)

```js
const router  = require('koa-router')()

router.get('/hello/:name', ctx => {
  let name = ctx.params.name
  ctx.body = `<h1>Hello, ${name}!</h1>`
})

app.use(router.routes())

```
> 访问http://localhost:3000/hello/x 出来个Hello, x!
> 不深入，get是小菜，接下来说post

#### 解析请求数据 --- [koa-body](https://www.npmjs.com/package/koa-body)
> 官方说明：A full-feature koa body parser middleware

```js
const koaBody = require('koa-body')()

router.post('/link', koaBody, ctx => {
  ctx.body = {
    code: '0',
    description: 'ok',
    result: ctx.request.body
  }
})

```

用DHC模拟个post，地址'localhost:3000/link'，body类型选json，DHC会自动加上Content-Type:application/json的请求头
> DHC是一款使用chrome模拟REST客户端向服务器发送测试数据的谷歌浏览器插件。

```json
{
  "name": "x"
}

```
返回啥呢?
```json
{
  "code": "0",
  "description": "ok",
  "result": {
    "name": "x"
  }
}
```

#### logger信息再优化下 -- [koa-logger](https://www.npmjs.com/package/koa-logger)

```bash
npm i koa-logger --save
```

> 项目内用起来

```js
const logger = require('koa-logger')()
app.use(logger)
```

### 重要特性async/await，加料了！！！
#### 暂时还要babel来帮忙，引入以下的package

```bash
npm install babel-core --save
npm install babel-preset-es2015 --save
npm install babel-preset-stage-3 --save
```

#### babel入口文件

```js
// index.js 
// 用于引入babel，并且启动app.js

require('babel-core/register')({
  presets: ['stage-3']
})
require('./app.js')
```

> gulp任务的监控对象也从app.js变成了index.js

#### 引入环境变量，便于本地调试查看错误信息
> 为了兼容win和mac，要加个cross-env，同时加入环境变量

```json
    "start": "cross-env NODE_ENV=dev gulp nodemon"
```
> 调用方式
```js
const IS_DEBUG = process.env.NODE_ENV === 'dev'
if (IS_DEBUG) console.log('现在是开发环境')
```

#### 有人走错路怎么办？
```js
// 统一的错误处理
app.use(async(ctx, next) => {
  try {
    await next()
    let status = ctx.status
    if (status === 200) return
    let msg
    switch (status) {
      case 401:
        msg = '登陆失效'
        break
      case 403:
        msg = '没有权限进行该操作'
        break
      case 404:
        msg = `请求地址出错: ${ctx.url}`
        break
      case 500:
        msg = '服务器错误'
        break
      case 503:
        msg = '服务器错误'
        break
      default:
        msg = '未知错误'
    }
    ctx.body = {
      code: '-1',
      description: msg
    }
  } catch (e) {
    if (IS_DEBUG) ctx.throw(e)
    ctx.body = {
      code: '-1',
      description: '大哥，你迷路了么？？？'
    }
  }
})
```

#### 把之前的get变成一个栗子
```js
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
router.get('/hello/:name', async(ctx) => {
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
```

#### 好了，可以去叫床～哦不，起床。。。
> 访问http://localhost:3000/hello/koa 出来个Hello, koa!

> 别等了，料加在汤里～哦不，控制台里了

```bash
koa起床失败，重启ing
koa重启失败，强制重启
koa起床成功。。。
  --> GET /hello/koa 200 630ms 20b
```

#### 我要从其他地方调用接口获取数据，封装后再返回
> 加入request包
> 简单封装下请求接口的方法,http.js

```js
// 简单封装下接口，供需要的地方调用
const request = require('request')

module.exports = (url, type = 'get', data = {} ) => {
  return new Promise((yes, no) => {
    request[type]({ url: url, data }, (err, res, body) => {
      if (res.statusCode === 200) {
        yes(JSON.parse(body))
      } else {
        no(err)
      }
    })
  })
}
```
> 让开，我开始装逼了

```js
const getData = require('./http')

// 获取其他接口返回的参数
router.post('/outside', koaBody, async(ctx) => {
  try {
    const data = await getData('http://apis.io/api/maintainers')
    ctx.body = {
      code: '0',
      description: 'ok',
      result: data.data
    }
  } catch (e) {
    ctx.throw(e)
  }
})
```
